# ADR-002: MCP Protocol

## Status

Accepted

## Date

2026-07-17

## Context

A plataforma precisa de um protocolo padronizado para comunicação entre agentes de IA e ferramentas da plataforma.

## Decision

**Chosen:** Model Context Protocol (MCP)

### Options

| Option | Pros | Cons |
|--------|------|------|
| MCP | Padrão aberto, suporte a resources/tools | Novo ecossistema |
| REST API | Simples, universal | Sem contexto para IA |
| GraphQL | Flexível, tipado | Complexidade desnecessária |

### Rationale

MCP foi escolhido por:
1. Padrão aberto para integração com IA
2. Suporte nativo a resources e tools
3. Contexto enriquecido para agentes
4. Adoção crescente pela comunidade

## Consequences

- Servidor MCP dedicado
- Dependência do MCP SDK
- Documentação do protocolo
