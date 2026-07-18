# Specification: Agent Catalog

> Catálogo de agentes de IA especializados.

## Purpose

Definir responsabilidades, interfaces e fluxos de orquestração dos agentes de IA.

## Agents

| Agent | Phase | Responsibility |
|-------|-------|---------------|
| Planner | P | Task planning and decomposition |
| Architect | P/R | Architecture decisions and ADRs |
| Developer | E | Code implementation |
| Reviewer | R/V | Code review |
| Security | R/V | Security audit |
| QA | V | Quality assurance |
| DevOps | E/C | CI/CD and automation |
| Documentation | All | Documentation |

## Orchestration

```
Planner → Architect → Developer → Reviewer → Security → QA → DevOps → Documentation
```

## Handoffs

| From | To | Artifact |
|------|----|----------|
| Planner | Architect | Approved plan |
| Architect | Developer | ADR + Design |
| Developer | Reviewer | Code + Tests |
| Reviewer | QA | Reviewed code |
| QA | DevOps | Passing tests |
| DevOps | Documentation | Deployed system |
