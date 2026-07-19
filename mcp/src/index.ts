import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { join, resolve } from "path";

// Core imports
import { TemplateEngine } from "./core/template-engine.js";
import { searchKnowledgeBase } from "./core/knowledge-search.js";
import { validateProjectStructure } from "./core/project-validator.js";
import { reviewCodeSnippet } from "./core/code-reviewer.js";

const ROOT = resolve(import.meta.dirname, "../..");

const server = new Server(
  { name: "engineering-platform", version: "1.0.0" },
  { capabilities: { resources: {}, tools: {} } }
);

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    { uri: "platform://architecture", name: "Architecture", mimeType: "text/markdown" },
    { uri: "platform://constitution", name: "Constitution", mimeType: "text/markdown" },
    { uri: "platform://standards", name: "Standards", mimeType: "text/markdown" },
    { uri: "platform://specifications", name: "Specifications", mimeType: "text/markdown" },
    { uri: "platform://contracts", name: "Contracts", mimeType: "text/markdown" },
    { uri: "platform://prompts", name: "Prompts", mimeType: "text/markdown" },
    { uri: "platform://agents", name: "Agents", mimeType: "text/markdown" },
    { uri: "platform://knowledge", name: "Knowledge Base", mimeType: "text/markdown" },
    { uri: "platform://glossary", name: "Glossary", mimeType: "text/markdown" },
  ],
}));

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const map: Record<string, string> = {
    "platform://architecture": join(ROOT, "architecture/README.md"),
    "platform://constitution": join(ROOT, "constitution/README.md"),
    "platform://standards": join(ROOT, "standards"),
    "platform://specifications": join(ROOT, "specifications"),
    "platform://contracts": join(ROOT, "contracts/README.md"),
    "platform://prompts": join(ROOT, "prompts/README.md"),
    "platform://agents": join(ROOT, "agents/README.md"),
    "platform://knowledge": join(ROOT, "knowledge/README.md"),
    "platform://glossary": join(ROOT, "knowledge/glossary.md"),
  };

  const path = map[request.params.uri];
  if (!path) throw new Error(`Resource not found: ${request.params.uri}`);

  const stat = statSync(path);
  let content: string;
  if (stat.isDirectory()) {
    content = readdirSync(path).join("\n");
  } else {
    content = readFileSync(path, "utf-8");
  }

  return {
    contents: [{ uri: request.params.uri, mimeType: "text/markdown", text: content }],
  };
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "create_spec",
      description: "Create a new specification from template",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Title of the specification" },
          description: { type: "string", description: "Brief description of the feature" }
        },
        required: ["name"],
      },
    },
    {
      name: "create_plan",
      description: "Create a development plan",
      inputSchema: {
        type: "object",
        properties: {
          feature: { type: "string", description: "Title of the feature" },
          summary: { type: "string", description: "Brief summary of the plan" }
        },
        required: ["feature"],
      },
    },
    {
      name: "generate_prompt",
      description: "Generate a prompt from a template",
      inputSchema: {
        type: "object",
        properties: {
          template: { type: "string", description: "Template name (e.g. specification, code-review)" },
          variables: { type: "object", description: "Variables to interpolate in template" }
        },
        required: ["template"],
      },
    },
    {
      name: "review_code",
      description: "Review code against standards",
      inputSchema: {
        type: "object",
        properties: {
          code: { type: "string", description: "The source code to analyze" },
          language: { type: "string", description: "Programming language (default: typescript)" }
        },
        required: ["code"],
      },
    },
    {
      name: "validate_project",
      description: "Validate project structure",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
    {
      name: "create_contract",
      description: "Create a new module contract",
      inputSchema: {
        type: "object",
        properties: {
          title: { type: "string", description: "Title of the module (e.g. Auth Service)" },
          name: { type: "string", description: "kebab-case name of the module" },
          owner: { type: "string", description: "Owner team (default: @team)" },
          description: { type: "string", description: "Brief module description" }
        },
        required: ["title", "name"]
      }
    },
    {
      name: "create_adr",
      description: "Create a new Architecture Decision Record (ADR)",
      inputSchema: {
        type: "object",
        properties: {
          title: { type: "string", description: "Title of the decision" },
          status: { type: "string", enum: ["proposed", "accepted", "rejected", "deprecated"], default: "proposed" },
          author: { type: "string", description: "Author name/team" }
        },
        required: ["title"]
      }
    },
    {
      name: "search_knowledge",
      description: "Search the knowledge base",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query keywords" }
        },
        required: ["query"]
      }
    }
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const typedArgs = (args || {}) as Record<string, any>;

  switch (name) {
    case "create_spec": {
      const title = typedArgs.name;
      const desc = typedArgs.description || "Breve descrição da funcionalidade e seu propósito.";
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const templatePath = join(ROOT, "templates/specification.md");
      const outputPath = join(ROOT, "specifications", `${slug}.md`);

      if (!existsSync(templatePath)) {
        throw new Error(`Specification template missing at ${templatePath}`);
      }

      const templateContent = readFileSync(templatePath, "utf-8");
      const rendered = templateContent
        .replace(/^# Template:.*\n\n>.*\n\n---\n\n/, "")
        .replace("[Nome da Funcionalidade]", title)
        .replace("Breve descrição da funcionalidade e seu propósito.", desc);

      mkdirSync(join(ROOT, "specifications"), { recursive: true });
      writeFileSync(outputPath, rendered, "utf-8");

      return {
        content: [{ type: "text", text: `✅ Specification "${title}" created successfully at specifications/${slug}.md` }]
      };
    }

    case "create_plan": {
      const feature = typedArgs.feature;
      const summary = typedArgs.summary || "Breve descrição do que será implementado e por quê.";
      const slug = feature.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const templatePath = join(ROOT, "templates/plan.md");
      
      // Save plans under .context/plans/ as per policy/standards
      const outputDir = join(ROOT, ".context/plans");
      const outputPath = join(outputDir, `${slug}.md`);

      if (!existsSync(templatePath)) {
        throw new Error(`Plan template missing at ${templatePath}`);
      }

      const templateContent = readFileSync(templatePath, "utf-8");
      const rendered = templateContent
        .replace(/^# Template:.*\n\n>.*\n\n---\n\n/, "")
        .replace("[Nome da Feature]", feature)
        .replace("Breve descrição do que será implementado e por quê.", summary);

      mkdirSync(outputDir, { recursive: true });
      writeFileSync(outputPath, rendered, "utf-8");

      return {
        content: [{ type: "text", text: `✅ Development plan for "${feature}" created successfully at .context/plans/${slug}.md` }]
      };
    }

    case "generate_prompt": {
      const template = typedArgs.template;
      const vars = (typedArgs.variables || {}) as Record<string, string>;
      const templatePath = join(ROOT, `prompts/templates/${template}.md`);

      if (!existsSync(templatePath)) {
        throw new Error(`Prompt template "${template}" not found.`);
      }

      const templateContent = readFileSync(templatePath, "utf-8");
      const rendered = TemplateEngine.render(templateContent, vars);

      return {
        content: [{ type: "text", text: rendered }]
      };
    }

    case "review_code": {
      const code = typedArgs.code;
      const lang = typedArgs.language || "typescript";
      const report = reviewCodeSnippet(code, lang);

      return {
        content: [{ type: "text", text: JSON.stringify(report, null, 2) }]
      };
    }

    case "validate_project": {
      const report = validateProjectStructure(ROOT);
      return {
        content: [{ type: "text", text: JSON.stringify(report, null, 2) }]
      };
    }

    case "create_contract": {
      const title = typedArgs.title;
      const moduleName = typedArgs.name;
      const owner = typedArgs.owner || "@team";
      const desc = typedArgs.description || "Breve descrição do propósito do módulo.";
      const templatePath = join(ROOT, "templates/contract.md");
      const outputPath = join(ROOT, "contracts", `${moduleName}.md`);

      if (!existsSync(templatePath)) {
        throw new Error(`Contract template missing at ${templatePath}`);
      }

      const templateContent = readFileSync(templatePath, "utf-8");
      const rendered = templateContent
        .replace(/^# Template:.*\n\n>.*\n\n---\n\n/, "")
        .replace("[Nome do Módulo]", title)
        .replace("module-name", moduleName)
        .replace("@team", owner)
        .replace("Breve descrição do propósito do módulo.", desc);

      mkdirSync(join(ROOT, "contracts"), { recursive: true });
      writeFileSync(outputPath, rendered, "utf-8");

      return {
        content: [{ type: "text", text: `✅ Contract created successfully at contracts/${moduleName}.md` }]
      };
    }

    case "create_adr": {
      const title = typedArgs.title;
      const status = typedArgs.status || "proposed";
      const author = typedArgs.author || "@engineering-platform";
      const decisionsDir = join(ROOT, "architecture/decisions");
      const templatePath = join(ROOT, "templates/adr.md");

      if (!existsSync(templatePath)) {
        throw new Error(`ADR template missing at ${templatePath}`);
      }

      // Determine next sequence number
      let nextNum = 1;
      if (existsSync(decisionsDir)) {
        const files = readdirSync(decisionsDir).filter(f => /^\d+-/.test(f));
        if (files.length > 0) {
          const numbers = files.map(f => parseInt(f.split("-")[0], 10));
          nextNum = Math.max(...numbers) + 1;
        }
      }

      const formatNum = nextNum.toString().padStart(3, "0");
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const filename = `${formatNum}-${slug}.md`;
      const outputPath = join(decisionsDir, filename);

      const templateContent = readFileSync(templatePath, "utf-8");
      const date = new Date().toISOString().split("T")[0];
      const rendered = templateContent
        .replace(/^# Template:.*\n\n>.*\n\n---\n\n/, "")
        .replace("[Número]", formatNum)
        .replace("[Título]", title)
        .replace(
          "[ ] Proposta\n[ ] Aceita\n[ ] Rejeitada\n[ ] Obsoleta",
          [
            status === "proposed" ? "[x] Proposta" : "[ ] Proposta",
            status === "accepted" ? "[x] Aceita" : "[ ] Aceita",
            status === "rejected" ? "[x] Rejeitada" : "[ ] Rejeitada",
            status === "deprecated" ? "[x] Obsoleta" : "[ ] Obsoleta",
          ].join("\n")
        )
        .replaceAll("YYYY-MM-DD", date)
        .replace("@author", author);

      mkdirSync(decisionsDir, { recursive: true });
      writeFileSync(outputPath, rendered, "utf-8");

      return {
        content: [{ type: "text", text: `✅ ADR created successfully at architecture/decisions/${filename}` }]
      };
    }

    case "search_knowledge": {
      const query = typedArgs.query;
      const searchDirs = ["knowledge", "playbooks", "docs", "standards", "constitution", "architecture"];
      const results = searchKnowledgeBase(ROOT, query, searchDirs);
      
      return {
        content: [{ type: "text", text: JSON.stringify(results, null, 2) }]
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio");
}

main().catch((err) => {
  console.error("Server error:", err);
  process.exit(1);
});
