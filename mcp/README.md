# MCP Server

> Servidor Model Context Protocol para integração com agentes de IA.

## Visão Geral

Fornece recursos e ferramentas via MCP para agentes de IA acessarem a plataforma.

## Recursos

| URI | Descrição |
|-----|-----------|
| `platform://architecture` | Documentação de arquitetura |
| `platform://constitution` | Constitution do projeto |
| `platform://standards` | Padrões técnicos |
| `platform://specifications` | Especificações |
| `platform://contracts` | Contratos de módulos |
| `platform://prompts` | Sistema de prompts |
| `platform://agents` | Catálogo de agentes |
| `platform://knowledge` | Base de conhecimento |

## Ferramentas

| Ferramenta | Descrição |
|------------|-----------|
| `create_spec` | Criar especificação |
| `create_plan` | Criar plano |
| `generate_prompt` | Gerar prompt |
| `review_code` | Revisar código |
| `validate_project` | Validar estrutura |

## Instalação

```bash
npm install
npm run build
```

## Uso

```bash
# Iniciar servidor MCP
npm start

# Ou modo dev
npm run dev
```

## Configuração no opencode.json

```json
{
  "mcpServers": {
    "engineering-platform": {
      "command": "node",
      "args": ["mcp/dist/index.js"]
    }
  }
}
```
