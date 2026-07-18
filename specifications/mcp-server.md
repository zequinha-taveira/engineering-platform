# Specification: MCP Server

> Servidor Model Context Protocol para integração com agentes de IA.

## Purpose

Fornecer contexto e ferramentas via MCP para agentes de IA, permitindo acesso a templates, contratos, specs e padrões.

## Resources

| Resource | URI | Description |
|----------|-----|-------------|
| Architecture | mcp://architecture | Architecture docs |
| Specifications | mcp://specifications | Feature specs |
| Contracts | mcp://contracts | Module contracts |
| Standards | mcp://standards | Technical standards |

## Tools

| Tool | Description |
|------|-------------|
| create_spec | Create new specification |
| create_plan | Create development plan |
| create_tasks | Break down tasks |
| generate_prompt | Generate prompt from template |
| review_code | Review code |
| validate_project | Validate project structure |

## Architecture

```
AI Agent ↔ MCP Protocol ↔ MCP Server ↔ File System
```

## Implementation

- Language: TypeScript
- Framework: MCP SDK
- Storage: File system
- Auth: None (local)
