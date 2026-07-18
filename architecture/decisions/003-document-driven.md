# ADR-003: Document-Driven Architecture

## Status

Accepted

## Date

2026-07-17

## Context

A plataforma precisa armazenar e versionar todo o conhecimento do projeto de forma acessível para humanos e agentes.

## Decision

**Chosen:** Document-driven com Markdown versionado

### Options

| Option | Pros | Cons |
|--------|------|------|
| Markdown + Git | Versionado, acessível, universal | Sem queries complexas |
| Database | Queries, relações | Ops overhead, não versionado |
| CMS | UI amigável | Vendor lock-in |

### Rationale

Markdown + Git foi escolhido por:
1. Versionamento nativo (Git)
2. Acessível para humanos e agentes
3. Sem dependência externa
4. Integração com GitHub

## Consequences

- Estrutura de diretórios padronizada
- Documentação como código
- Validação via schemas
- Busca via grep/tools
