import { resolve } from "path";
import { Orchestrator, TaskNode } from "../mcp/src/core/agent-runtime";

const ROOT = resolve(import.meta.dirname, "..");

function printTaskTree(node: TaskNode, indent: string = "") {
  const statusEmoji = 
    node.status === "completed" ? "✅" : 
    node.status === "in_progress" ? "⏳" : 
    node.status === "failed" ? "❌" : "💤";

  console.log(`${indent}${statusEmoji} [${node.assignedAgent}] ${node.name}`);
  if (node.subtasks && node.subtasks.length > 0) {
    node.subtasks.forEach(sub => printTaskTree(sub, indent + "  │ "));
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === "--help") {
    console.log(`
Hierarchical Multi-Agent Orchestrator — Engineering Platform

Usage:
  npx tsx tools/run-hierarchical-pipeline.ts "<requirements>"

Examples:
  npx tsx tools/run-hierarchical-pipeline.ts "Implementar autenticação JWT de dois fatores"
`);
    process.exit(0);
  }

  const requirements = args.join(" ");
  console.log(`🚀 Starting Hierarchical Multi-Agent Pipeline for requirements:`);
  console.log(`"${requirements}"\n`);

  const orchestrator = new Orchestrator(ROOT);
  try {
    const rootTask = orchestrator.decomposeTask(requirements);
    
    console.log("📋 Decomposição Inicial das Subtarefas:");
    printTaskTree(rootTask);
    console.log("\n⚡ Executando Tarefas e Subagentes...\n");

    const resultTree = await orchestrator.executeHierarchicalPipeline(requirements);

    console.log("\n📊 Resultado Final da Execução Hierárquica:");
    printTaskTree(resultTree);

    console.log(`\n🎉 Pipeline completed successfully!`);
    console.log(`Check details and saved workflow logs inside .context/runtime/workflows/`);
    process.exit(0);
  } catch (error: any) {
    console.error(`\n❌ Pipeline failed: ${error.message}`);
    process.exit(1);
  }
}

main();
