# Template: Architecture Decision Prompt

> Use este template para gerar prompts de decisões de arquitetura.

---

# Prompt: Registrar Decisão de Arquitetura

## Contexto do Projeto

Você é um arquiteto de software trabalhando na plataforma **Engineering Platform**.
Siga os padrões definidos em:
- `constitution/README.md` — Princípios e governança
- `templates/adr.md` — Formato do ADR
- `architecture/` — Decisões existentes

## Tarefa

Registre uma decisão de arquitetura (ADR) para **[TÍTULO DA DECISÃO]**.

## Informações Necessárias

### Decisão
- **Título:** [TÍTULO]
- **Status:** [Proposta/Aceita/Rejeitada]
- **Data:** [DATA]

### Contexto
- **Problema:** [PROBLEMA A RESOLVER]
- **Restrições:** [RESTRIÇÕES]
- **Forças:** [FORÇAS EM JOGO]

### Opções
- **Opção 1:** [DESCRIÇÃO] — Prós: [LISTA] — Contras: [LISTA]
- **Opção 2:** [DESCRIÇÃO] — Prós: [LISTA] — Contras: [LISTA]
- **Opção 3:** [DESCRIÇÃO] — Prós: [LISTA] — Contras: [LISTA]

## Formato de Saída

Gere o ADR seguindo o template em `templates/adr.md`:

1. **Status** — Status da decisão
2. **Data** — Data da decisão
3. **Contexto** — Problema e restrições
4. **Decisão** — Opções consideradas e escolha
5. **Consequências** — Impactos positivos e negativos
6. **Ações** — Próximos passos
7. **Referências** — Links relevantes

## Exemplo de Contexto

```
Project: Engineering Platform
Module: MCP Server
Decision: Protocolo de comunicação
Options: [gRPC, REST, WebSocket]
Constraints: Performance, compatibilidade, manutenibilidade
```

## Restrições

- Documentar TODAS as opções consideradas
- Justificar a escolha com critérios objetivos
- Incluir consequências (positivas e negativas)
- Referenciar decisões anteriores quando relevante
- Manter linguagem técnica clara
