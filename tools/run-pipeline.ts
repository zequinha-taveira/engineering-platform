import { resolve } from "path";
import { Orchestrator } from "../mcp/src/core/agent-runtime";

const ROOT = resolve(import.meta.dirname, "..");

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === "--help") {
    console.log(`
Multi-Agent Pipeline Orchestrator — Engineering Platform

Usage:
  npx tsx tools/run-pipeline.ts "<requirements>"

Examples:
  npx tsx tools/run-pipeline.ts "Implementar módulo de autenticação de dois fatores (MFA)"
`);
    process.exit(0);
  }

  const requirements = args.join(" ");
  console.log(`🚀 Starting Multi-Agent Pipeline for requirements:`);
  console.log(`"${requirements}"\n`);

  const orchestrator = new Orchestrator(ROOT);
  try {
    const steps = await orchestrator.executePipeline(requirements);

    steps.forEach((step, idx) => {
      console.log(`--- [Step ${idx + 1}] Agent: ${step.agentName} ---`);
      step.log.forEach(line => console.log(line));
      console.log("");
    });

    console.log(`🎉 Pipeline completed successfully!`);
    console.log(`Check details and saved workflow logs inside .context/runtime/workflows/`);
    process.exit(0);
  } catch (error: any) {
    console.error(`❌ Pipeline failed: ${error.message}`);
    process.exit(1);
  }
}

main();
