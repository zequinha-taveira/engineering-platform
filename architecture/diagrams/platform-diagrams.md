# Diagramas de Arquitetura

> Diagramas Mermaid da Engineering Platform.

## Arquitetura Geral

```mermaid
graph TB
    subgraph Interface["Camada de Interface"]
        MCP["MCP Server<br/>(TypeScript)"]
        CLI["CLI Tools"]
    end

    subgraph Core["Camada Core"]
        CONST["Constitution<br/>Princípios & Governança"]
        STD["Standards<br/>Padrões Técnicos"]
        TMPL["Templates<br/>Artefatos Reutilizáveis"]
        SCH["Schemas<br/>Validação JSON"]
    end

    subgraph Content["Camada de Conteúdo"]
        PROMPT["Prompt System<br/>Templates & Gerador"]
        AGENT["Agent Catalog<br/>8 Agentes Especializados"]
        CONTRACT["Contracts<br/>Interfaces de Módulos"]
        SPEC["Specifications<br/>Funcionalidades"]
    end

    subgraph Knowledge["Camada de Conhecimento"]
        KB["Knowledge Base<br/>Glossário, Patterns, Decisões"]
        PB["Playbooks<br/>Guias Operacionais"]
        AUTO["Automation<br/>CI/CD, Scripts"]
    end

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

## Pipeline de Agentes

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

    subgraph Resources["Resources (8)"]
        R1["platform://architecture"]
        R2["platform://constitution"]
        R3["platform://standards"]
        R4["platform://specifications"]
        R5["platform://contracts"]
        R6["platform://prompts"]
        R7["platform://agents"]
        R8["platform://knowledge"]
    end

    subgraph Tools["Tools (5)"]
        T1["create_spec"]
        T2["create_plan"]
        T3["generate_prompt"]
        T4["review_code"]
        T5["validate_project"]
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
