# Documentation Standards

> Padrões para documentação do projeto.

## Tipos de Documentação

### README
Todo diretório principal possui README.md com:
- Descrição do componente
- Como usar
- Exemplos
- Links relevantes

### API Documentation
- OpenAPI/Swagger specs
- Exemplos de request/response
- Códigos de erro

### Architecture Decision Records
- Decisões significativas
- Contexto e alternativas
- Consequências

### Code Comments
- Explicam por quê, não o quê
- TODOs com issue associada
- Evitar comments óbvios

## Formato

### Markdown
- Headers hierárquicos
- Código com syntax highlighting
- Tabelas para dados estruturados
- Links internos relativos

### Exemplo de README
```markdown
# Component Name

> Breve descrição

## Visão Geral

Descrição detalhada do componente.

## Uso

\`\`\`typescript
import { Component } from './component'
const c = new Component()
\`\`\`

## Configuração

| Opção | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| name  | string | - | Nome do componente |

## Arquitetura

Diagrama ou descrição da arquitetura.

## Contribuindo

Link para guia de contribuição.
```

## Manutenção

### Revisão
- Documentação revisada a cada release
- Exemplos testados e funcionais
- Links verificados periodicamente

### Automação
- Geração automática de API docs
- Validação de links
- Spell checking

## Tradução

### Idiomas
- Português: documentação principal
- Inglês: documentação técnica e API

### Processo
- Tradução manual para documentos-chave
- Machine translation para docs auxiliares
- Revisão humana sempre
