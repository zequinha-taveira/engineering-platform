import { describe, it, expect } from "vitest";
import { join, resolve } from "path";
import { writeFileSync, unlinkSync, existsSync } from "fs";

import { TemplateEngine } from "../mcp/src/core/template-engine";
import { validateContract } from "../mcp/src/core/contract-validator";
import { searchKnowledgeBase } from "../mcp/src/core/knowledge-search";
import { validateProjectStructure } from "../mcp/src/core/project-validator";
import { reviewCodeSnippet } from "../mcp/src/core/code-reviewer";

import { AgentRuntime, Orchestrator } from "../mcp/src/core/agent-runtime";

const ROOT = resolve(import.meta.dirname, "..");

describe("Core Logic Modules", () => {
  describe("Agent Runtime & Orchestration", () => {
    it("should retrieve Planner agent profile", () => {
      const runtime = new AgentRuntime(ROOT);
      const agent = runtime.getAgent("Planner");
      expect(agent).toBeDefined();
      expect(agent?.name).toBe("Planner");
      expect(agent?.phase).toBe("P");
    });

    it("should run agent execution with inputs", () => {
      const runtime = new AgentRuntime(ROOT);
      const res = runtime.runAgent("Planner", { "Requisitos do usuário": "auth service" });
      expect(res.agentName).toBe("Planner");
      expect(res.outputArtifacts["Plano de desenvolvimento"]).toBeDefined();
      expect(res.log.some(l => l.includes("Starting Agent"))).toBe(true);
    });

    it("should execute full orchestrator pipeline successfully", async () => {
      const orchestrator = new Orchestrator(ROOT);
      const steps = await orchestrator.executePipeline("Criar autenticação JWT");
      expect(steps.length).toBe(7);
      expect(steps[0].agentName).toBe("Planner");
      expect(steps[6].agentName).toBe("Documentation");
    });

    it("should decompose requirements into a hierarchical subtask tree", () => {
      const orchestrator = new Orchestrator(ROOT);
      const rootTask = orchestrator.decomposeTask("Implementar MFA");
      expect(rootTask).toBeDefined();
      expect(rootTask.id).toBe("root");
      expect(rootTask.subtasks).toBeDefined();
      expect(rootTask.subtasks?.length).toBe(3);
      expect(rootTask.subtasks?.[0].subtasks?.length).toBe(2);
    });

    it("should execute hierarchical subtask pipeline successfully and aggregate outputs", async () => {
      const orchestrator = new Orchestrator(ROOT);
      const resultTree = await orchestrator.executeHierarchicalPipeline("Implementar Auth MFA");
      expect(resultTree.status).toBe("completed");
      expect(resultTree.outputArtifacts).toBeDefined();
      // Verificando se os artefatos de saída do Developer e DevOps foram agregados ao root
      expect(resultTree.outputArtifacts["Código"]).toBeDefined();
      expect(resultTree.outputArtifacts["Configuração CI/CD"]).toBeDefined();
      // Verificando se os logs dos subagentes foram agregados ao log principal do root
      expect(resultTree.log.some(line => line.includes("🤖 Starting Agent: Planner"))).toBe(true);
      expect(resultTree.log.some(line => line.includes("🤖 Starting Agent: DevOps"))).toBe(true);
    });
  });

  describe("TemplateEngine", () => {
    it("should render variables in brackets [VAR] and curly braces {{var}}", () => {
      const template = "Hello [NAME] and {{FRIEND}}!";
      const vars = { NAME: "Alice", FRIEND: "Bob" };
      const result = TemplateEngine.render(template, vars);
      expect(result).toBe("Hello Alice and Bob!");
    });

    it("should detect placeholders correctly", () => {
      const template = "Hello [NAME] and {{FRIEND}}! [ROLE]";
      const detected = TemplateEngine.detectPlaceholders(template);
      expect(detected).toContain("NAME");
      expect(detected).toContain("FRIEND");
      expect(detected).toContain("ROLE");
      expect(detected.length).toBe(3);
    });
  });

  describe("Project Validator", () => {
    it("should validate that the current workspace has required directories", () => {
      const report = validateProjectStructure(ROOT);
      expect(report.valid).toBe(true);
      expect(report.missingDirectories.length).toBe(0);
      expect(report.missingFiles.length).toBe(0);
    });
  });

  describe("Code Reviewer", () => {
    it("should detect hardcoded secrets", () => {
      const code = `const apiKey = "ep_abc123xyz";`;
      const report = reviewCodeSnippet(code);
      expect(report.valid).toBe(false);
      expect(report.issues.some(i => i.ruleId === "SEC-01")).toBe(true);
    });

    it("should detect empty/silent catch blocks", () => {
      const code = `
        try {
          doSomething();
        } catch (e) {
          // silent error
        }
      `;
      const report = reviewCodeSnippet(code);
      expect(report.valid).toBe(false);
      expect(report.issues.some(i => i.ruleId === "CODE-02")).toBe(true);
    });

    it("should score a perfect clean code 100", () => {
      const code = `
        function calculateTotal(price: number, quantity: number): number {
          return price * quantity;
        }
      `;
      const report = reviewCodeSnippet(code);
      expect(report.valid).toBe(true);
      expect(report.score).toBe(100);
      expect(report.issues.length).toBe(0);
    });
  });

  describe("Knowledge Search", () => {
    it("should find matches in glossary and constitution", () => {
      const results = searchKnowledgeBase(ROOT, "governança", ["knowledge", "constitution"]);
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].relativePat).toBeDefined();
    });
  });

  describe("Contract Validator", () => {
    it("should validate a valid contract markdown file against schema", () => {
      const contractPath = join(ROOT, "examples/payment-service-contract.md");
      const schemaPath = join(ROOT, "contracts/schema.json");
      const result = validateContract(contractPath, schemaPath);
      expect(result.valid).toBe(true);
    });
  });
});
