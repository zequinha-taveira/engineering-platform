# Template: Specification Prompt

> Use este template para gerar prompts de criação de especificações.

---

# Prompt: Criar Especificação de [NOME DA FEATURE]

## Contexto do Projeto

Você é um engenheiro de software trabalhando na plataforma **Engineering Platform**.
Siga os padrões definidos em:
- `constitution/README.md` — Princípios e governança
- `standards/` — Padrões técnicos
- `templates/specification.md` — Formato da especificação

## Tarefa

Crie uma especificação completa para a funcionalidade **[NOME DA FEATURE]**.

## Informações Necessárias

### Feature
- **Nome:** [NOME]
- **Descrição:** [DESCRIÇÃO BREVE]
- **Prioridade:** [Alta/Média/Baixa]

### Problema
- **Problema que resolve:** [PROBLEMA]
- **Usuários afetados:** [USUÁRIOS]
- **Impacto atual:** [IMPACTO]

### Requisitos
- **Funcionais:** [LISTA]
- **Não-funcionais:** [LISTA]

## Formato de Saída

Gere a especificação seguindo o template em `templates/specification.md`:

1. **Visão Geral** — Descrição clara e concisa
2. **Objetivos** — Lista de objetivos mensuráveis
3. **Requisitos** — Tabela de requisitos funcionais e não-funcionais
4. **Usuários** — Personas e user stories
5. **Fluxos** — Fluxos principal, alternativos e de exceção
6. **Dados** — Modelo de dados e regras de negócio
7. **API** — Endpoints se aplicável
8. **UI/UX** — Wireframes ou referências
9. **Segurança** — Requisitos de segurança
10. **Testing** — Cenários de teste
11. **Riscos** — Riscos identificados
12. **Cronograma** — Estimativas

## Restrições

- Formato Markdown
- Incluir tabelas para dados estruturados
- Referenciar standards aplicáveis
- Incluir critérios de aceite claros
- Manter linguagem técnica acessível

## Exemplo de Contexto

```
Project: Engineering Platform
Module: Prompt System
Feature: Template versioning
Priority: High
Users: Developers, AI Agents
```
