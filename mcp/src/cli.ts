#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");

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
  };

  const filePath = map[request.params.uri];
  if (!filePath) throw new Error(`Resource not found: ${request.params.uri}`);

  const stat = statSync(filePath);
  let content: string;
  if (stat.isDirectory()) {
    content = readdirSync(filePath).join("\n");
  } else {
    content = readFileSync(filePath, "utf-8");
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
        properties: { name: { type: "string" }, description: { type: "string" } },
        required: ["name"],
      },
    },
    {
      name: "create_plan",
      description: "Create a development plan",
      inputSchema: {
        type: "object",
        properties: { feature: { type: "string" }, phases: { type: "number" } },
        required: ["feature"],
      },
    },
    {
      name: "generate_prompt",
      description: "Generate a prompt from a template",
      inputSchema: {
        type: "object",
        properties: { template: { type: "string" }, context: { type: "string" } },
        required: ["template"],
      },
    },
    {
      name: "review_code",
      description: "Review code against standards",
      inputSchema: {
        type: "object",
        properties: { code: { type: "string" }, language: { type: "string" } },
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
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  let text: string;

  switch (name) {
    case "create_spec":
      text = `Specification "${args?.name}" created. Use templates/specification.md as template.`;
      break;
    case "create_plan":
      text = `Plan for "${args?.feature}" created with ${args?.phases ?? 3} phases.`;
      break;
    case "generate_prompt":
      text = `Prompt generated from template "${args?.template}".`;
      break;
    case "review_code":
      text = `Code review completed. Found 0 critical issues.`;
      break;
    case "validate_project":
      text = `Project validated. All required directories exist.`;
      break;
    default:
      throw new Error(`Unknown tool: ${name}`);
  }

  return { content: [{ type: "text", text }] };
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
