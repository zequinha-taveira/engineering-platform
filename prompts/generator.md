# Prompt Generator Guide

> Guia para geração automática de prompts de alta qualidade.

## Visão Geral

O gerador de prompts transforma inputs estruturados em prompts prontos para uso, seguindo templates e padrões definidos.

## Processo de Geração

### 1. Coleta de Inputs

O sistema coleta:
- **Categoria** — Tipo de tarefa
- **Contexto** — Projeto, módulo, feature
- **Requisitos** — O que precisa ser feito
- **Restrições** — Limitações e preferências

### 2. Seleção de Template

Com base na categoria, seleciona o template adequado:

| Input | Template |
|-------|----------|
| "Criar especificação" | `templates/specification.md` |
| "Revisar código" | `templates/code-review.md` |
| "Decidir arquitetura" | `templates/architecture.md` |
| "Investigar bug" | `templates/debugging.md` |
| "Criar documentação" | `templates/documentation.md` |

### 3. Preenchimento de Placeholders

O sistema identifica e preenche placeholders:

```
[NOME DA FEATURE]  →  "Sistema de Autenticação"
[DESCRIÇÃO]         →  "Implementação de JWT para APIs"
[PRIORIDADE]        →  "Alta"
```

### 4. Validação

Antes de entregar, valida:
- Todos os placeholders obrigatórios preenchidos
- Formato correto por template
- Referências a standards existentes
- Linguagem técnica adequada

### 5. Entrega

Gera o prompt final em formato Markdown, pronto para uso.

## Estratégias de Geração

### Template Filling
Preenche template existente com dados específicos.

### Composition
Combina múltiplos templates para prompts complexos.

### Variation
Cria variações de templates para contextos diferentes.

### Iteration
Refina prompt baseado em feedback do usuário.

## Qualidade do Prompt

### Checklist
- [ ] Contexto claro e completo
- [ ] Objetivo específico e mensurável
- [ ] Formato de saída definido
- [ ] Restrições documentadas
- [ ] Exemplos incluídos

### Métricas
- **Clareza** — Entendível sem ambiguidade
- **Completude** — Todos os inputs necessários
- **Ação** — Resultado claro e verificável
- **Eficiência** — Mínimo de tokens para máximo de resultado

## Integração com Agentes

### Para AI Agents
1. Agent identifica tarefa
2. Sistema seleciona template
3. Agent fornece contexto
4. Sistema gera prompt
5. Agent executa prompt
6. Resultado é validado

### Para Humanos
1. Humano seleciona categoria
2. Sistema apresenta template
3. Humano preenche campos
4. Sistema valida e gera
5. Humano usa prompt
