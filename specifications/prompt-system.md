# Specification: Prompt System

> Sistema de templates e geração de prompts.

## Purpose

Fornecer templates reutilizáveis e um processo estruturado para criar prompts de alta qualidade.

## Features

| ID | Feature | Priority |
|----|---------|----------|
| PS-01 | Template catalog with categories | High |
| PS-02 | Placeholder substitution engine | High |
| PS-03 | Template versioning | Medium |
| PS-04 | Prompt quality validation | Medium |

## Architecture

```
User Input → Template Selector → Placeholder Filler → Validator → Prompt Output
```

## Templates

| Category | Template | Status |
|----------|----------|--------|
| Specification | specification.md | Done |
| Code Review | code-review.md | Done |
| Architecture | architecture.md | Done |
| Debugging | debugging.md | Done |
| Documentation | documentation.md | Done |

## Data Model

```typescript
interface PromptTemplate {
  id: string
  name: string
  category: string
  content: string
  placeholders: string[]
  version: string
}
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /templates | List templates |
| POST | /templates | Create template |
| POST | /generate | Generate prompt |
