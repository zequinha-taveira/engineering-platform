import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");

describe("MCP Server", () => {
  describe("Project Structure", () => {
    const requiredDirs = [
      "architecture",
      "automation",
      "contracts",
      "constitution",
      "knowledge",
      "mcp",
      "playbooks",
      "prompts",
      "standards",
      "templates",
    ];

    it.each(requiredDirs)("should have directory: %s", (dir) => {
      const dirPath = join(ROOT, dir);
      expect(existsSync(dirPath)).toBe(true);
      expect(statSync(dirPath).isDirectory()).toBe(true);
    });

    it("should have package.json", () => {
      expect(existsSync(join(ROOT, "package.json"))).toBe(true);
    });

    it("should have tsconfig.json", () => {
      expect(existsSync(join(ROOT, "tsconfig.json"))).toBe(true);
    });
  });

  describe("Constitution", () => {
    it("should have README.md", () => {
      const path = join(ROOT, "constitution/README.md");
      expect(existsSync(path)).toBe(true);
      const content = readFileSync(path, "utf-8");
      expect(content).toContain("Engineering Platform");
    });
  });

  describe("Standards", () => {
    const requiredStandards = ["coding", "api", "testing", "documentation", "security"];

    it.each(requiredStandards)("should have standard: %s.md", (std) => {
      const path = join(ROOT, `standards/${std}.md`);
      expect(existsSync(path)).toBe(true);
      const content = readFileSync(path, "utf-8");
      expect(content.length).toBeGreaterThan(50);
    });
  });

  describe("Agents", () => {
    const requiredAgents = [
      "planner",
      "architect",
      "developer",
      "reviewer",
      "security",
      "qa",
      "devops",
      "documentation",
    ];

    it.each(requiredAgents)("should have agent: %s.md", (agent) => {
      const path = join(ROOT, `agents/${agent}.md`);
      expect(existsSync(path)).toBe(true);
      const content = readFileSync(path, "utf-8");
      expect(content).toContain("Agent");
    });
  });

  describe("Templates", () => {
    const requiredTemplates = ["specification", "plan", "contract", "adr"];

    it.each(requiredTemplates)("should have template: %s.md", (tpl) => {
      const path = join(ROOT, `templates/${tpl}.md`);
      expect(existsSync(path)).toBe(true);
    });
  });

  describe("Prompts", () => {
    it("should have README.md", () => {
      expect(existsSync(join(ROOT, "prompts/README.md"))).toBe(true);
    });

    it("should have templates directory", () => {
      expect(existsSync(join(ROOT, "prompts/templates"))).toBe(true);
    });

    it("should have at least one example", () => {
      const examplesDir = join(ROOT, "prompts/examples");
      expect(existsSync(examplesDir)).toBe(true);
      const files = readdirSync(examplesDir);
      expect(files.length).toBeGreaterThan(0);
    });
  });

  describe("Contracts", () => {
    it("should have README.md", () => {
      expect(existsSync(join(ROOT, "contracts/README.md"))).toBe(true);
    });

    it("should have schema.json", () => {
      expect(existsSync(join(ROOT, "contracts/schema.json"))).toBe(true);
      const schema = readFileSync(join(ROOT, "contracts/schema.json"), "utf-8");
      const parsed = JSON.parse(schema);
      expect(parsed.$schema).toBeDefined();
    });
  });

  describe("Knowledge", () => {
    it("should have README.md", () => {
      expect(existsSync(join(ROOT, "knowledge/README.md"))).toBe(true);
    });

    it("should have glossary", () => {
      expect(existsSync(join(ROOT, "knowledge/glossary.md"))).toBe(true);
    });
  });

  describe("Architecture", () => {
    it("should have README.md", () => {
      expect(existsSync(join(ROOT, "architecture/README.md"))).toBe(true);
    });

    it("should have ADRs", () => {
      const adrDir = join(ROOT, "architecture/decisions");
      expect(existsSync(adrDir)).toBe(true);
      const files = readdirSync(adrDir);
      expect(files.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("Specifications", () => {
    it("should have at least 5 spec files", () => {
      const specsDir = join(ROOT, "specifications");
      expect(existsSync(specsDir)).toBe(true);
      const files = readdirSync(specsDir).filter((f) => f.endsWith(".md"));
      expect(files.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe("Automation", () => {
    it("should have validate.sh", () => {
      expect(existsSync(join(ROOT, "automation/scripts/validate.sh"))).toBe(true);
    });

    it("should have generate-docs.sh", () => {
      expect(existsSync(join(ROOT, "automation/scripts/generate-docs.sh"))).toBe(true);
    });
  });

  describe("Playbooks", () => {
    const requiredPlaybooks = ["development", "review", "release"];

    it.each(requiredPlaybooks)("should have playbook: %s.md", (pb) => {
      expect(existsSync(join(ROOT, `playbooks/${pb}.md`))).toBe(true);
    });
  });

  describe("TypeScript Build", () => {
    it("should have built MCP server dist", () => {
      const distPath = join(ROOT, "mcp/dist/index.js");
      expect(existsSync(distPath)).toBe(true);
    });

    it("should have valid TypeScript source", () => {
      const srcPath = join(ROOT, "mcp/src/index.ts");
      expect(existsSync(srcPath)).toBe(true);
      const content = readFileSync(srcPath, "utf-8");
      expect(content).toContain("Server");
      expect(content).toContain("ListResourcesRequestSchema");
    });
  });

  describe("Package Configuration", () => {
    let pkg: ReturnType<typeof JSON.parse>;

    beforeAll(() => {
      pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf-8"));
    });

    it("should have correct package name", () => {
      expect(pkg.name).toBe("@engineering-platform/mcp-server");
    });

    it("should be ES module", () => {
      expect(pkg.type).toBe("module");
    });

    it("should have MCP SDK dependency", () => {
      expect(pkg.dependencies["@modelcontextprotocol/sdk"]).toBeDefined();
    });

    it("should have build and test scripts", () => {
      expect(pkg.scripts.build).toBe("tsc");
      expect(pkg.scripts.test).toBeDefined();
    });
  });
});
