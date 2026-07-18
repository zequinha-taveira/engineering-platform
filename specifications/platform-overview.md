# Specification: Engineering Platform Overview

> Visão geral da plataforma, componentes e arquitetura.

## Purpose

Define a estrutura e os componentes da Engineering Platform, estabelecendo a base para todos os módulos e agentes.

## Components

| Component | Description | Status |
|-----------|-------------|--------|
| Constitution | Identity and governance | Done |
| Standards | Technical standards | Done |
| Prompt System | Prompt generation | Done |
| Agent Catalog | Specialized AI agents | Done |
| Contract System | Module contracts | Done |
| Knowledge Base | Shared knowledge | Done |
| MCP Server | Model Context Protocol server | Pending |
| Automation | CI/CD and scripts | Pending |

## Architecture

```
User / AI Agent
      |
   MCP Server
      |
   Prompt System
      |
   Agent Catalog
      |
   Contract System
      |
   Knowledge Base
```

## Dependencies

- MCP Server depends on Prompt System
- Agent Catalog depends on Contract System
- Automation depends on all components
