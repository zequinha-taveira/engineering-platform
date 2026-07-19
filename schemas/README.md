# Schemas — Engineering Platform

> Schemas JSON para validação de artefatos da plataforma.

## Visão Geral

Cada tipo de artefato na plataforma possui um JSON Schema correspondente que define sua estrutura, campos obrigatórios e regras de validação. Isso permite:

- **Validação automatizada** — CI/CD verifica artefatos automaticamente
- **Geração assistida** — Geradores criam artefatos que já aderem ao schema
- **Documentação viva** — Schemas servem como especificação dos formatos

## Schemas Disponíveis

| Schema | Arquivo | Valida |
|--------|---------|--------|
| Constitution | `constitution.schema.json` | Documentos de constituição do projeto |
| Contract | `../contracts/schema.json` | Contratos de módulos |
| Standard | `standard.schema.json` | Padrões técnicos (coding, api, testing, security, docs) |
| Specification | `specification.schema.json` | Especificações de funcionalidades |
| ADR | `adr.schema.json` | Architecture Decision Records |
| Plan | `plan.schema.json` | Planos de desenvolvimento |
| Prompt Template | `prompt-template.schema.json` | Templates de prompt |
| Agent | `agent.schema.json` | Definições de agentes de IA |

## Uso

### Validação Manual
```bash
# Usando ajv-cli
npx ajv validate -s schemas/specification.schema.json -d my-spec.json
```

### Validação Programática
```typescript
import Ajv from "ajv";
import specSchema from "./schemas/specification.schema.json";

const ajv = new Ajv();
const validate = ajv.compile(specSchema);
const valid = validate(mySpecData);

if (!valid) {
  console.error(validate.errors);
}
```

### No CI/CD
Os schemas são verificados automaticamente em cada PR via GitHub Actions. Veja `automation/workflows/` para detalhes.
