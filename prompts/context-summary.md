# Resumo de Contexto — Engineering Platform
> Este arquivo serve como o bloco de contexto consolidado (context summary) para ser injetado em prompts de IA durante o desenvolvimento neste repositório.

---

## 🛠️ 1. Visão Geral do Projeto
A **Engineering Platform** é uma plataforma aberta para engenharia de software assistida por IA, baseada em processos document-driven, agentes especializados e Model Context Protocol (MCP).
- **Stack:** Node.js, TypeScript (ES Modules), Vitest, MCP SDK.
- **Filosofia:** *Arquitetura e Planejamento primeiro, Código depois.*

---

## 📂 2. Estrutura de Diretórios
Ao instruir a IA, utilize este mapa simplificado do repositório:
- `constitution/`: Princípios fundamentais, governança e regras de qualidade do projeto.
- `standards/`: Guias estritos de [coding](file:///C:/engineering-platform-main/standards/coding.md), [api](file:///C:/engineering-platform-main/standards/api.md), [testing](file:///C:/engineering-platform-main/standards/testing.md), [security](file:///C:/engineering-platform-main/standards/security.md) e [documentation](file:///C:/engineering-platform-main/standards/documentation.md).
- `architecture/`: Documentação de design de sistemas e ADRs (Architecture Decision Records).
- `contracts/`: Definições de interfaces e contratos de módulos validados contra JSON Schema.
- `specifications/`: Especificações funcionais das features.
- `templates/`: Templates markdown reutilizáveis para criar novas specs, planos, contratos e ADRs.
- `prompts/`: Templates de prompts parametrizáveis.
- `agents/`: Catálogo de personas e responsabilidades dos agentes de IA.
- `mcp/src/`: Código fonte do servidor MCP, ferramentas e motor de runtime de agentes.
- `tools/`: Scripts utilitários CLI (validador de contratos, gerador de ADR, executor de pipelines).

---

## 📜 3. Diretrizes de Engenharia e Padrões (Standards)
Ao interagir com o código ou criar documentações, a IA deve sempre seguir:
1. **Qualidade de Código (TypeScript):** Evitar `any`, tratar erros explicitamente (proibido blocos catch vazios), usar ES Modules, tipagem forte e validação prévia.
2. **Git & Commits:** Seguir estritamente Conventional Commits (ex: `feat(mcp): add validation tools` ou `docs(readme): update guides`).
3. **Automação & Validação:** Rodar `npm run typecheck`, `npm run build` e `npm run test` antes de propor alterações produtivas.
4. **Handoffs & Contratos:** Alterações de interface exigem atualização de contrato em `contracts/` e validação com o CLI `validate-contract.ts`.

---

## 🤖 4. Catálogo de Agentes e Fluxo Hierárquico
A plataforma utiliza agentes especializados para cada fase do ciclo de vida:
- **Planner:** Planeja tarefas, estima esforço e gera especificações/subtarefas.
- **Architect:** Toma decisões de design, desenha diagramas e cria ADRs.
- **Developer:** Escreve código limpo seguindo os standards e testes unitários.
- **Reviewer:** Realiza code review para conformidade e qualidade.
- **QA:** Cria cenários de testes e garante cobertura adequada.
- **DevOps:** Configura automações, pipelines CI/CD e infraestrutura.
- **Documentation:** Mantém READMEs, documentação técnica de APIs e guias de uso.

*Nota:* O motor suporta execução sequencial linear e decomposição hierárquica recursiva (onde uma tarefa é dividida em árvore de subtarefas atribuídas a diferentes subagentes).

---

## 💡 5. Como usar este Contexto no Prompt Engineering
Ao formular prompts para novos desenvolvimentos no repositório, inclua a seguinte seção de cabeçalho:
```markdown
[CONTEXTO DO REPOSITÓRIO]
Você está atuando dentro do repositório 'Engineering Platform'.
Stack: TypeScript, Vitest, MCP SDK.
Princípio: Engenharia primeiro (planejamento -> especificações -> arquitetura -> contratos -> implementação -> testes -> revisão).
Documentação de referência:
- Padrões Técnicos: standards/coding.md, standards/testing.md
- Guia de Início Rápido: docs/getting-started.md
- Fluxo de Agentes: agents/README.md
- Hierarquia de Subtarefas: interactive-tutorial/capitulo-12-futuro-da-trilha.md
```
