# ADR-001: TypeScript Stack

## Status

Accepted

## Date

2026-07-17

## Context

A Engineering Platform precisa de uma stack que suporte tipagem estática, tenha ecossistema maduro e permita compartilhamento de código.

## Decision

**Chosen:** TypeScript + Node.js

### Options

| Option | Pros | Cons |
|--------|------|------|
| TypeScript | Typagem, ecossistema, MCP SDK | Build step |
| Python | Simplicidade, IA/ML | Performance |
| Go | Performance, concorrência | Ecossistema menor |

### Rationale

TypeScript foi escolhido por:
1. MCP SDK nativo
2. Tipagem estática para segurança
3. Ecossistema maduro de ferramentas
4. Reuso entre frontend e backend

## Consequences

- Build step necessário
- Setup de ESLint/Prettier
- Documentação de tipos
