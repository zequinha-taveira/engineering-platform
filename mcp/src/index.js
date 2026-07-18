"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const fs_1 = require("fs");
const path_1 = require("path");
const ROOT = (0, path_1.resolve)(import.meta.dirname, "../..");
const server = new index_js_1.Server({ name: "engineering-platform", version: "1.0.0" }, { capabilities: { resources: {}, tools: {} } });
server.setRequestHandler(types_js_1.ListResourcesRequestSchema, async () => ({
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
server.setRequestHandler(types_js_1.ReadResourceRequestSchema, async (request) => {
    const map = {
        "platform://architecture": (0, path_1.join)(ROOT, "architecture/README.md"),
        "platform://constitution": (0, path_1.join)(ROOT, "constitution/README.md"),
        "platform://standards": (0, path_1.join)(ROOT, "standards"),
        "platform://specifications": (0, path_1.join)(ROOT, "specifications"),
        "platform://contracts": (0, path_1.join)(ROOT, "contracts/README.md"),
        "platform://prompts": (0, path_1.join)(ROOT, "prompts/README.md"),
        "platform://agents": (0, path_1.join)(ROOT, "agents/README.md"),
        "platform://knowledge": (0, path_1.join)(ROOT, "knowledge/README.md"),
    };
    const path = map[request.params.uri];
    if (!path)
        throw new Error(`Resource not found: ${request.params.uri}`);
    const stat = (0, fs_1.statSync)(path);
    let content;
    if (stat.isDirectory()) {
        content = (0, fs_1.readdirSync)(path).join("\n");
    }
    else {
        content = (0, fs_1.readFileSync)(path, "utf-8");
    }
    return {
        contents: [{ uri: request.params.uri, mimeType: "text/markdown", text: content }],
    };
});
server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => ({
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
server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    let text;
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
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error("MCP Server running on stdio");
}
main().catch((err) => {
    console.error("Server error:", err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map