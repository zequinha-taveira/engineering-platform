# Architecture

> Documentação da arquitetura da Engineering Platform.

## Visão Geral

A Engineering Platform é uma plataforma modular baseada em documentos, onde cada componente é definido por contratos, especificações e padrões versionados. O motor de execução suporta tanto pipelines lineares sequenciais quanto orquestração hierárquica de subtarefas com subagentes.

## Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────┐
│                    User / AI Agent                   │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│                    MCP Server                        │
│  ┌────────────────────────────────────────────────┐ │
│  │  Resources: arch, specs, contracts, standards  │ │
│  │  Tools: create_spec, generate_prompt, review   │ │
│  │         create_contract, create_adr, search    │ │
│  └────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│              Orchestration Engine                     │
│  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │  AgentRuntime    │  │  Orchestrator            │ │
│  │  (7 agents)      │  │  ├ executePipeline()     │ │
│  │                  │  │  ├ decomposeTask()       │ │
│  │                  │  │  └ executeHierarchical() │ │
│  └──────────────────┘  └──────────────────────────┘ │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│                  Platform Core                       │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────┐  │
│  │ Constitution│ │  Standards   │ │  Templates   │  │
│  └─────────────┘ └──────────────┘ └──────────────┘  │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────┐  │
│  │   Prompts   │ │   Agents     │ │  Contracts   │  │
│  └─────────────┘ └──────────────┘ └──────────────┘  │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────┐  │
│  │  Knowledge  │ │   Playbooks  │ │  Automation  │  │
│  └─────────────┘ └──────────────┘ └──────────────┘  │
└──────────────────────────────────────────────────────┘
```

## Componentes

### Camada de Interface
- **MCP Server** — Ponto de entrada para agentes de IA (9 resources, 8 tools)
- **CLI/Tools** — Ferramentas para desenvolvedores (`run-pipeline`, `run-hierarchical-pipeline`, geradores)

### Camada de Orquestração
- **AgentRuntime** — Motor de execução que carrega perfis dos 7 agentes e processa cada fase
- **Orchestrator** — Suporta execução linear (`executePipeline`) e hierárquica (`executeHierarchicalPipeline`) com decomposição em `TaskNode`

### Camada Core
- **Constitution** — Identidade técnica e governança
- **Standards** — Padrões técnicos
- **Templates** — Artefatos reutilizáveis

### Camada de Conteúdo
- **Prompts** — Sistema de geração de prompts com contexto consolidado
- **Agents** — Catálogo de 7 agentes especializados
- **Contracts** — Contratos de módulos com validação JSON Schema

### Camada de Conhecimento
- **Knowledge** — Base de conhecimento (glossário, padrões, decisões)
- **Playbooks** — Guias operacionais
- **Automation** — Scripts e CI/CD

## Fluxo de Dados

### 1. Fluxo Linear Sequencial
```
1. AI Agent faz requisição via MCP
2. MCP Server busca recursos solicitados
3. Recursos são montados com contexto
4. Resposta é enviada ao agente
5. Agente executa tarefa
6. Resultado é armazenado
```

### 2. Fluxo Hierárquico de Subtarefas
```
1. Requisitos são divididos em árvore de subtarefas (TaskNode)
2. Para cada subtarefa, o orquestrador dispara subagentes focados
3. Contexto e artefatos de saída de subtarefas concluídas são propagados às seguintes
4. Logs e artefatos de saída são agregados recursivamente para a tarefa pai
```

## Decisões de Arquitetura (ADRs)

Todas as principais decisões de design técnico da plataforma são registradas como ADRs em `decisions/`:
- [ADR-001: TypeScript Stack](decisions/001-typescript-stack.md) — Escolha do TypeScript e Node.js.
- [ADR-002: Model Context Protocol (MCP)](decisions/002-mcp-protocol.md) — Adoção do MCP para integração.
- [ADR-003: Document-Driven Development](decisions/003-document-driven.md) — Padrão de document-driven para guiar IAs.
- [ADR-004: Orquestrador Hierárquico de Subagentes e Subtarefas](decisions/004-orquestrador-hierarquico-de-subagentes-e-subtarefas.md) — Implementação de execução em árvore.

## Princípios de Arquitetura

- Modular: cada componente tem responsabilidade única
- Versionado: todo artefato está no repositório
- Acessível: humanos e agentes acessam o mesmo conteúdo
- Extensível: novos componentes seguem os mesmos padrões

