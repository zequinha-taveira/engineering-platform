# Diagramas de Arquitetura

> Diagramas Mermaid da Engineering Platform.

## Arquitetura Geral

```mermaid
graph TB
    subgraph Interface["Camada de Interface"]
        MCP["MCP Server<br/>(TypeScript)"]
        CLI["CLI Tools"]
    end

    subgraph Orchestration["Camada de Orquestração"]
        RUNTIME["AgentRuntime<br/>7 Agentes Especializados"]
        ORCH["Orchestrator<br/>Pipeline Linear + Hierárquico"]
        TASK["TaskNode Tree<br/>Decomposição de Subtarefas"]
    end

    subgraph Core["Camada Core"]
        CONST["Constitution<br/>Princípios & Governança"]
        STD["Standards<br/>Padrões Técnicos"]
        TMPL["Templates<br/>Artefatos Reutilizáveis"]
        SCH["Schemas<br/>Validação JSON"]
    end

    subgraph Content["Camada de Conteúdo"]
        PROMPT["Prompt System<br/>Templates & Gerador"]
        AGENT["Agent Catalog<br/>Perfis & Responsabilidades"]
        CONTRACT["Contracts<br/>Interfaces de Módulos"]
        SPEC["Specifications<br/>Funcionalidades"]
    end

    subgraph Knowledge["Camada de Conhecimento"]
        KB["Knowledge Base<br/>Glossário, Patterns, Decisões"]
        PB["Playbooks<br/>Guias Operacionais"]
        AUTO["Automation<br/>CI/CD, Scripts"]
    end

    MCP --> ORCH
    CLI --> ORCH
    ORCH --> RUNTIME
    ORCH --> TASK
    TASK --> RUNTIME

    RUNTIME --> AGENT
    RUNTIME --> PROMPT
    RUNTIME --> STD
    RUNTIME --> CONTRACT

    MCP --> CONST
    MCP --> STD
    MCP --> SPEC
    MCP --> CONTRACT
    MCP --> PROMPT
    MCP --> AGENT
    MCP --> KB

    CLI --> TMPL
    CLI --> SCH

    AGENT --> PROMPT
    PROMPT --> TMPL
    PROMPT --> STD
    PROMPT --> CONTRACT

    CONTRACT --> SCH
    SPEC --> SCH

    AUTO --> STD
    AUTO --> SCH
```

## Fluxo de Desenvolvimento

```mermaid
flowchart LR
    A["💡 Ideia"] --> B["📋 Plano"]
    B --> C["📄 Especificação"]
    C --> D["🏗️ Arquitetura"]
    D --> E["📑 Contratos"]
    E --> F["💬 Prompts"]
    F --> G["🤖 Agentes"]
    G --> H["💻 Implementação"]
    H --> I["🧪 Testes"]
    I --> J["🔍 Revisão"]
    J --> K["⚙️ CI/CD"]
    K --> L["🚀 Release"]

    style A fill:#4CAF50,color:#fff
    style L fill:#2196F3,color:#fff
```

## Pipeline Linear de Agentes

```mermaid
sequenceDiagram
    participant U as Usuário/Orquestrador
    participant P as Planner
    participant A as Architect
    participant D as Developer
    participant R as Reviewer
    participant Q as QA
    participant O as DevOps
    participant Doc as Documentation

    U->>P: Requisitos
    P->>P: Cria plano + tarefas
    P->>A: Plano aprovado

    A->>A: Cria ADR + Design
    A->>D: ADR + Especificações

    D->>D: Implementa código + testes
    D->>R: Código + Testes unitários

    R->>R: Revisa qualidade & padrões
    R->>Q: Código revisado

    Q->>Q: Executa testes + cobertura
    Q->>O: Testes passando

    O->>O: Deploy + CI/CD
    O->>Doc: Deploy realizado

    Doc->>Doc: Gera documentação
    Doc->>U: Documentação atualizada
```

## Orquestração Hierárquica de Subagentes

```mermaid
graph TD
    ROOT["🎯 Tarefa Principal<br/>(Planner)"]

    subgraph Phase1["Fase 1 — Planejamento & Design"]
        SUB1A["📋 Definir Requisitos<br/>(Planner)"]
        SUB1B["🏗️ Projetar Arquitetura<br/>(Architect)"]
    end

    subgraph Phase2["Fase 2 — Desenvolvimento & Validação"]
        SUB2A["💻 Implementar Código<br/>(Developer)"]
        SUB2B["🔍 Revisão de Código<br/>(Reviewer)"]
        SUB2C["🧪 Garantia de Qualidade<br/>(QA)"]
    end

    subgraph Phase3["Fase 3 — Deploy & Documentação"]
        SUB3A["⚙️ Configurar Pipelines<br/>(DevOps)"]
        SUB3B["📚 Gerar Documentação<br/>(Documentation)"]
    end

    ROOT --> Phase1
    ROOT --> Phase2
    ROOT --> Phase3

    SUB1A -->|"Plano"| SUB1B
    SUB1B -->|"ADR + Design"| SUB2A
    SUB2A -->|"Código"| SUB2B
    SUB2B -->|"Código revisado"| SUB2C
    SUB2C -->|"Testes passando"| SUB3A
    SUB3A -->|"Deploy"| SUB3B

    style ROOT fill:#FF9800,color:#fff
    style SUB1A fill:#4CAF50,color:#fff
    style SUB1B fill:#4CAF50,color:#fff
    style SUB2A fill:#2196F3,color:#fff
    style SUB2B fill:#2196F3,color:#fff
    style SUB2C fill:#2196F3,color:#fff
    style SUB3A fill:#9C27B0,color:#fff
    style SUB3B fill:#9C27B0,color:#fff
```

## Estrutura do MCP Server

```mermaid
graph LR
    subgraph Client["AI Agent / IDE"]
        REQ["Request"]
    end

    subgraph MCP["MCP Server"]
        direction TB
        RES["Resources Handler"]
        TOOLS["Tools Handler"]
    end

    subgraph Resources["Resources (9)"]
        R1["platform://architecture"]
        R2["platform://constitution"]
        R3["platform://standards"]
        R4["platform://specifications"]
        R5["platform://contracts"]
        R6["platform://prompts"]
        R7["platform://agents"]
        R8["platform://knowledge"]
        R9["platform://glossary"]
    end

    subgraph Tools["Tools (8)"]
        T1["create_spec"]
        T2["create_plan"]
        T3["generate_prompt"]
        T4["review_code"]
        T5["validate_project"]
        T6["create_contract"]
        T7["create_adr"]
        T8["search_knowledge"]
    end

    REQ --> MCP
    RES --> Resources
    TOOLS --> Tools
```

## Fluxo de Validação de Artefatos

```mermaid
flowchart TD
    A["Artefato Criado<br/>(spec, contract, ADR)"] --> B{"Tem Schema?"}
    B -->|Sim| C["Validar contra<br/>JSON Schema"]
    B -->|Não| D["⚠️ Sem validação"]

    C --> E{"Válido?"}
    E -->|Sim| F["✅ Aceito"]
    E -->|Não| G["❌ Rejeitado<br/>com erros"]
    G --> H["Corrigir artefato"]
    H --> C

    F --> I["CI/CD verifica<br/>em cada PR"]
```

