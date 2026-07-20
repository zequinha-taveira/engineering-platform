# Prompt System

> Sistema completo de geração de prompts profissionais para engenharia de software assistida por IA.

## Visão Geral

O Prompt System fornece templates reutilizáveis e um processo estruturado para criar prompts de alta qualidade que geram resultados consistentes e acionáveis.

> [!NOTE]
> Em resumo: um bom sistema de Prompt Engineering organiza contexto, responsabilidades, artefatos e processos para que cada agente execute apenas a parte do trabalho que lhe cabe, mantendo alinhamento com a arquitetura e os padrões do projeto.

## Princípios

1. **Templates sobre manuais** — Prompts são derivados de templates, não escritos do zero
2. **Contexto sempre incluído** — Todo prompt referencia standards, contratos e especificações
3. **Estrutura consistente** — Mesmo formato para mesma categoria de tarefa
4. **Iteração documentada** — Variações são versionadas e testadas

## Estrutura

```
prompts/
├── README.md              # Este arquivo
├── context-summary.md     # Resumo de contexto consolidado para injeção em prompts
├── templates/             # Templates por categoria
│   ├── specification.md   # Template para specs
│   ├── code-review.md     # Template para reviews
│   ├── architecture.md    # Template para decisões
│   ├── debugging.md       # Template para debugging
│   └── documentation.md   # Template para docs
├── examples/              # Exemplos preenchidos
│   ├── example-spec.md
│   ├── example-review.md
│   └── example-adr.md
└── generator.md           # Guia de geração
```

## Categorias de Prompts

| Categoria | Template | Uso |
|-----------|----------|-----|
| Especificação | `specification.md` | Criar especificações de feature |
| Code Review | `code-review.md` | Revisar código |
| Arquitetura | `architecture.md` | Decisões de design |
| Debugging | `debugging.md` | Investigar bugs |
| Documentação | `documentation.md` | Gerar docs |
| Testing | `testing.md` | Criar testes |
| Refactoring | `refactoring.md` | Melhorar código |

## Como Usar

### 1. Identificar a Categoria
Qual tipo de tarefa você precisa executar?

### 2. Selecionar o Template
Escolha o template correspondente à categoria.

### 3. Preencher os Placeholders
Substitua `[PLACEHOLDER]` pelos dados específicos do seu contexto.

### 4. Adicionar Contexto
Inclua referências a:
- Constitution do projeto
- Standards aplicáveis
- Contratos de módulos
- Especificações existentes

### 5. Executar e Validar
Execute o prompt e valide se o resultado atende aos critérios.

## Geração Automática

O `generator.md` descreve como:
- Gerar prompts a partir de especificações
- Variar prompts para diferentes contextos
- Validar qualidade dos prompts gerados
