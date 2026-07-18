# Knowledge Base

> Base de conhecimento compartilhada entre humanos e agentes de IA.

## Visão Geral

A Knowledge Base centraliza padrões, decisões, glossário e lições aprendidas para garantir consistência em todo o projeto.

## Princípios

1. **Single source of truth** — Conhecimento está versionado no repositório
2. **Acessível** — Humanos e agentes acessam o mesmo conteúdo
3. **Evolutivo** — Conhecimento é atualizado continuamente
4. **Buscável** — Conteúdo é indexado e pesquisável

## Estrutura

```
knowledge/
├── README.md           # Este arquivo
├── patterns/           # Padrões de design
│   ├── solid.md
│   ├── repository-pattern.md
│   └── event-driven.md
├── decisions/          # Decisões técnicas
│   ├── 001-typescript.md
│   ├── 002-mcp-server.md
│   └── 003-testing.md
└── glossary.md         # Glossário do domínio
```

## Categorias

### Patterns
Padrões de design e arquitetura utilizados no projeto.

### Decisions
Decisões técnicas documentadas via ADRs.

### Glossary
Terminologia do domínio e definições.

### Playbooks
Guias operacionais para tarefas comuns.

### Lessons
Lições aprendidas e best practices.

## Como Contribuir

### Para Desenvolvedores
1. Ao tomar decisão significativa, criar ADR
2. Ao identificar padrão, documentar em patterns/
3. Ao aprender lição, adicionar em lessons/

### Para Agentes de IA
1. Consultar knowledge base antes de agir
2. Seguir padrões documentados
3. Atualizar quando necessário

## Busca

### Por Categoria
- `/knowledge/patterns/` — Padrões de design
- `/knowledge/decisions/` — ADRs
- `/knowledge/glossary.md` — Terminologia

### Por Tag
Cada arquivo pode conter tags para facilitar busca:
```yaml
tags: [security, authentication, jwt]
```

## Qualidade

### Checklist
- [ ] Conteúdo preciso
- [ ] Exemplos funcionais
- [ ] Links verificados
- [ ] Tags definidas
- [ ] Data de última atualização
