# Plano de Desenvolvimento — Engineering Platform

> Plano estruturado em etapas (Task List para IA) para guiar a implementação incremental da Engineering Platform.

---

## 🏗️ Fase 1 — Fundação (Constitution + Standards + Architecture)
> **Status:** ✅ Concluída

- [x] **Adicionar versionamento semântico à Constitution**
  - *Arquivo:* [README.md](file:///c:/engineering-platform-main/constitution/README.md)
  - *Critério de Aceite:* Presença da seção de versionamento MAJOR.MINOR.PATCH e Changelog.
- [x] **Criar JSON Schemas para os standards**
  - *Arquivo:* [standard.schema.json](file:///c:/engineering-platform-main/schemas/standard.schema.json)
  - *Critério de Aceite:* Schema genérico capaz de validar coding, api, testing, security, e documentation.
- [x] **Automatizar geração de ADR a partir do template**
  - *Arquivo:* [generate-adr.ts](file:///c:/engineering-platform-main/tools/generate-adr.ts)
  - *Critério de Aceite:* Executar `npx tsx tools/generate-adr.ts "Título"` gera uma nova ADR sequencial em `architecture/decisions/`.
- [x] **Criar diagramas Mermaid reais**
  - *Arquivo:* [platform-diagrams.md](file:///c:/engineering-platform-main/architecture/diagrams/platform-diagrams.md)
  - *Critério de Aceite:* Diagramas em Mermaid legíveis representando a arquitetura do projeto.
- [x] **Popular `schemas/` com schemas de validação dos componentes**
  - *Diretório:* [schemas/](file:///c:/engineering-platform-main/schemas/)
  - *Critério de Aceite:* Contém schemas para `constitution`, `specification`, `adr`, `plan`, `standard`, `prompt-template` e `agent`.

---

## 📑 Fase 2 — Contratos + Templates + Especificações
> **Status:** ✅ Concluída

- [x] **Criar validador de contratos CLI**
  - *Arquivo:* [validate-contract.ts](file:///c:/engineering-platform-main/tools/validate-contract.ts)
  - *Critério de Aceite:* Executar `npx tsx tools/validate-contract.ts <caminho_do_contrato.md>` faz o parse do markdown e o valida contra o JSON Schema.
- [x] **Criar gerador de contratos CLI**
  - *Arquivo:* [generate-contract.ts](file:///c:/engineering-platform-main/tools/generate-contract.ts)
  - *Critério de Aceite:* `npx tsx tools/generate-contract.ts <título> --name <nome>` gera o contrato na pasta `contracts/`.
- [x] **Criar gerador de especificações CLI**
  - *Arquivo:* [generate-spec.ts](file:///c:/engineering-platform-main/tools/generate-spec.ts)
  - *Critério de Aceite:* `npx tsx tools/generate-spec.ts <título> --desc <descrição>` gera a especificação na pasta `specifications/`.
- [x] **Popular `examples/` com exemplos end-to-end**
  - *Diretório:* [examples/](file:///c:/engineering-platform-main/examples/)
  - *Critério de Aceite:* Contém exemplos práticos e validados de contratos, especificações e ADRs.
- [x] **Implementar engine de templates parametrizáveis**
  - *Arquivo:* [template-engine.ts](file:///c:/engineering-platform-main/tools/template-engine.ts)
  - *Critério de Aceite:* Substituição de placeholders em formato `[VAR]` e `{{var}}` funcionando de forma centralizada.

---

## 💬 Fase 3 — Prompt System + Knowledge Base
> **Status:** ✅ Concluída

- [x] **Criar gerador de prompts funcional**
  - *Arquivo:* `tools/generate-prompt.ts`
  - *Critério de Aceite:* CLI que lê um template em `prompts/templates/` e preenche as variáveis de contexto automaticamente.
- [x] **Implementar motor de templates com interpolação `{{PLACEHOLDER}}`**
  - *Critério de Aceite:* Uso da `TemplateEngine` no fluxo de prompts para formatar o output final enviado aos agentes de IA.
- [x] **Implementar busca e indexação na knowledge base**
  - *Critério de Aceite:* Script de busca local por palavras-chave na pasta `knowledge/` e `playbooks/`.
- [x] **Adicionar resource `platform://glossary` ao MCP Server**
  - *Critério de Aceite:* Servidor MCP expõe o conteúdo do glossário como um recurso consumível por IAs.
- [x] **Expandir `knowledge/patterns/` com padrões de engenharia reais**
  - *Critério de Aceite:* Documentação de padrões comuns (Repository, Singleton, etc.) estruturada.

---

## 🔌 Fase 4 — MCP Server Funcional (Remoção de Stubs)
> **Status:** ✅ Concluída

- [x] **Implementar `create_spec` real**
  - *Critério de Aceite:* A tool cria um arquivo markdown físico em `specifications/` com o template correto.
- [x] **Implementar `create_plan` real**
  - *Critério de Aceite:* A tool cria o plano de desenvolvimento em `.context/plans/`.
- [x] **Implementar `generate_prompt` real**
  - *Critério de Aceite:* A tool interpola o template solicitado e retorna o texto completo do prompt.
- [x] **Implementar `review_code` real**
  - *Critério de Aceite:* A tool lê o arquivo de código e o valida contra os schemas/regras definidos em `standards/`.
- [x] **Implementar `validate_project` real**
  - *Critério de Aceite:* A tool varre a estrutura do projeto e aponta diretórios ou arquivos ausentes/inválidos.
- [x] **Adicionar novas tools no MCP**
  - *Critério de Aceite:* Inclusão de `create_contract`, `create_adr` e `search_knowledge` nos handlers do servidor.
- [x] **Escrever suíte de testes unitários e de integração**
  - *Critério de Aceite:* Mínimo de 80% de cobertura de código no servidor MCP.

---

## 🤖 Fase 5 — Catálogo de Agentes + Orquestração
> **Status:** ✅ Concluída

- [x] **Implementar agent runtime**
  - *Critério de Aceite:* Executor de agentes que lê as definições em `agents/` e gerencia a execução de tarefas.
- [x] **Definir handoff protocol entre agentes**
  - *Critério de Aceite:* Modelo estruturado de transição de artefatos (ex: Planner envia plano aprovado para Architect).
- [x] **Implementar orquestrador de pipeline**
  - *Critério de Aceite:* Orquestração automática que encadeia a execução de agentes de forma sequencial.
- [x] **Implementar injeção de contexto automática**
  - *Critério de Aceite:* Garantir que cada agente receba os standards e contratos do módulo como parte das suas instruções de sistema.

---

## ⚙️ Fase 6 — Automação + CI/CD + Security
> **Status:** ✅ Concluída

- [x] **Criar GitHub Actions CI**
  - *Critério de Aceite:* Execução automática de `npm run test` e `npm run typecheck` em todo Pull Request.
- [x] **Implementar validação automática de artefatos no CI**
  - *Critério de Aceite:* CI rejeita PRs que contenham contratos, especificações ou ADRs inválidos (falhas nos validadores/schemas).
- [x] **Integrar ferramenta de análise estática e segurança (linting/sec)**
  - *Critério de Aceite:* Varredura de secrets e bugs conhecidos.
