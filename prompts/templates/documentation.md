# Template: Documentation Prompt

> Use este template para gerar prompts de documentação.

---

# Prompt: Criar Documentação

## Contexto do Projeto

Você é um documentador técnico trabalhando na plataforma **Engineering Platform**.
Siga os padrões definidos em:
- `standards/documentation.md` — Padrões de documentação
- `constitution/README.md` — Princípios do projeto

## Tarefa

Crie documentação para **[COMPONENTE/FUNCIONALIDADE]**.

## Informações Necessárias

### Componente
- **Nome:** [NOME]
- **Tipo:** [Módulo/API/Tool/Service]
- **Público-alvo:** [DEVS/USUÁRIOS/OPS]

### Conteúdo
- **Propósito:** [O QUE FAZ]
- **Como usar:** [EXEMPLOS]
- **Configuração:** [OPÇÕES]
- **Limitações:** [LIMITES]

## Formato de Saída

Gere documentação seguindo `standards/documentation.md`:

### Para Módulo
```markdown
# [Nome do Módulo]

> Breve descrição

## Visão Geral
[DESCRIÇÃO DETALHADA]

## Uso
[EXEMPLOS DE CÓDIGO]

## Configuração
[TABELA DE OPÇÕES]

## API
[REFERÊNCIA DA API]

## Arquitetura
[DIAGRAMA OU DESCRIÇÃO]

## Contribuindo
[GUIA]
```

### Para API
```markdown
# API Reference

## Endpoints
[MÉTODOS E PATHS]

## Autenticação
[COMO AUTENTICAR]

## Request/Response
[EXEMPLOS]

## Erros
[CÓDIGOS E TRATAMENTO]

## Rate Limits
[LIMITES]
```

## Restrições

- Incluir exemplos testados
- Manter atualizado com código
- Usar linguagem clara
- Incluir links internos
- Versionar com o código
