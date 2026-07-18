# AI Agent Catalog

> Catálogo de agentes de IA especializados para engenharia de software.

## Visão Geral

Cada agente possui responsabilidades específicas, templates de prompt dedicados e acesso a contextos relevantes da plataforma.

## Princípios

1. **Especialização** — Cada agente faz uma coisa bem
2. **Composição** — Agentes trabalham juntos via orquestração
3. **Contexto** — Cada agente recebe o contexto adequado
4. **Rastreabilidade** — Ações dos agentes são logadas

## Catálogo de Agentes

| Agente | Responsabilidade | Fase |
|--------|------------------|------|
| [Planner](#planner) | Planejar tarefas e projetos | P |
| [Architect](#architect) | Decisões de arquitetura | P/R |
| [Developer](#developer) | Implementar código | E |
| [Reviewer](#reviewer) | Revisar código | R/V |
| [Security](#security) | Auditoria de segurança | R/V |
| [QA](#qa) | Garantia de qualidade | V |
| [DevOps](#devops) | Automação e deploy | E/C |
| [Documentation](#documentation) | Criar documentação | Todas |

## Agentes Detalhados

### Planner

**Responsabilidade:** Planejar tarefas, projetos e sprints.

**Entradas:**
- Requisitos do usuário
- Restrições de tempo
- Recursos disponíveis

**Saídas:**
- Plano de desenvolvimento
- Lista de tarefas
- Cronograma

**Templates de Prompt:**
- `prompts/templates/specification.md`
- `prompts/templates/planning.md`

**Uso:**
```
/planner "Planejar feature de autenticação"
```

---

### Architect

**Responsabilidade:** Tomar decisões de arquitetura e design.

**Entradas:**
- Requisitos funcionais e não-funcionais
- Restrições técnicas
- Decisões anteriores

**Saídas:**
- Architecture Decision Records (ADRs)
- Diagramas de arquitetura
- Especificações de design

**Templates de Prompt:**
- `prompts/templates/architecture.md`

**Uso:**
```
/architect "Decidir protocolo de comunicação entre microsserviços"
```

---

### Developer

**Responsabilidade:** Implementar código seguindo padrões.

**Entradas:**
- Especificação
- Contrato do módulo
- Standards aplicáveis

**Saídas:**
- Código implementado
- Testes unitários
- Documentação inline

**Templates de Prompt:**
- `prompts/templates/specification.md`
- `prompts/templates/debugging.md`

**Uso:**
```
/developer "Implementar endpoint de login"
```

---

### Reviewer

**Responsabilidade:** Revisar código para qualidade e boas práticas.

**Entradas:**
- Código para revisar
- Standards aplicáveis
- Contrato do módulo

**Saídas:**
- Relatório de revisão
- Lista de problemas
- Recomendações

**Templates de Prompt:**
- `prompts/templates/code-review.md`

**Uso:**
```
/reviewer "Revisar PR #123"
```

---

### Security

**Responsabilidade:** Auditar segurança do código e infraestrutura.

**Entradas:**
- Código para auditoria
- Padrões de segurança
- Requisitos de compliance

**Saídas:**
- Relatório de vulnerabilidades
- Recomendações de correção
- Checklist de segurança

**Templates de Prompt:**
- `prompts/templates/security-audit.md`

**Uso:**
```
/security "Auditar autenticação da API"
```

---

### QA

**Responsabilidade:** Garantir qualidade通过测试.

**Entradas:**
- Especificação
- Código implementado
- Requisitos de teste

**Saídas:**
- Plano de testes
- Casos de teste
- Relatório de cobertura

**Templates de Prompt:**
- `prompts/templates/testing.md`

**Uso:**
```
/qa "Criar testes para módulo de pagamento"
```

---

### DevOps

**Responsabilidade:** Automação, CI/CD e infraestrutura.

**Entradas:**
- Requisitos de deploy
- Infraestrutura atual
- Padrões de automação

**Saídas:**
- Pipelines de CI/CD
- Scripts de automação
- Configurações de infraestrutura

**Templates de Prompt:**
- `prompts/templates/automation.md`

**Uso:**
```
/devops "Configurar pipeline de deploy"
```

---

### Documentation

**Responsabilidade:** Criar e manter documentação.

**Entradas:**
- Código implementado
- Especificações
- Decision records

**Saídas:**
- READMEs
- Guias de uso
- Referência de API

**Templates de Prompt:**
- `prompts/templates/documentation.md`

**Uso:**
```
/documentation "Criar README do módulo de auth"
```

## Orquestração

### Fluxo de Trabalho

```
Planner → Architect → Developer → Reviewer → QA → DevOps → Documentation
```

### Handoffs

| De | Para | Artefato |
|----|------|----------|
| Planner | Architect | Plano aprovado |
| Architect | Developer | ADR + Design |
| Developer | Reviewer | Código + Testes |
| Reviewer | QA | Código revisado |
| QA | DevOps | Testes passando |
| DevOps | Documentation | Deploy realizado |
