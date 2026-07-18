# Contract System

> Sistema de contratos para definição de interfaces e responsabilidades de módulos.

## Visão Geral

Contratos definem o que cada módulo faz, como se comunica e quais são suas restrições. Eles servem como acordo entre desenvolvedores e agentes de IA.

## Princípios

1. **Contrato como documento vivo** — Contratos evoluem com o código
2. **Single source of truth** — Contrato define o comportamento esperado
3. **Validação automática** — Contratos podem ser validados
4. **Composição** — Módulos se comunicam via contratos

## Estrutura

```
contracts/
├── README.md           # Este arquivo
├── schema.json         # Schema de validação
├── examples/           # Exemplos de contratos
│   ├── auth-service.md
│   ├── user-service.md
│   └── payment-service.md
```

## Componentes de um Contrato

### 1. Identidade
- Nome do módulo
- Versão
- Responsável
- Status

### 2. Descrição
- Propósito do módulo
- Responsabilidades
- Limites

### 3. Interfaces
- API pública (métodos, parâmetros, retorno)
- Eventos emitidos
- Eventos consumidos

### 4. Dependências
- Módulos internos
- Serviços externos
- Bibliotecas

### 5. Restrições
- Técnicas (memória, CPU, latência)
- Regras de negócio
- Segurança

### 6. Requisitos de Desempenho
- Latência
- Throughput
- Disponibilidade

### 7. Testes
- Cobertura esperada
- Cenários críticos

### 8. Monitoring
- Métricas
- Alertas

## Schema de Validação

O `schema.json` define a estrutura válida de um contrato:

```json
{
  "type": "object",
  "required": ["identity", "interfaces"],
  "properties": {
    "identity": {
      "type": "object",
      "required": ["name", "version"],
      "properties": {
        "name": { "type": "string" },
        "version": { "type": "string", "pattern": "^\\d+\\.\\d+\\.\\d+$" },
        "owner": { "type": "string" },
        "status": { "type": "string", "enum": ["active", "deprecated", "draft"] }
      }
    },
    "description": { "type": "string" },
    "interfaces": { "type": "object" },
    "dependencies": { "type": "object" },
    "constraints": { "type": "object" },
    "performance": { "type": "object" },
    "testing": { "type": "object" },
    "monitoring": { "type": "object" }
  }
}
```

## Como Usar

### Para Desenvolvedores
1. Antes de implementar, criar contrato
2. Seguir template em `templates/contract.md`
3. Validar contra schema
4. Manter atualizado com código

### Para Agentes de IA
1. Ler contrato antes de implementar
2. Respeitar interfaces definidas
3. Verificar restrições
4. Atualizar contrato se necessário

### Para Revisão
1. Comparar código com contrato
2. Verificar aderência
3. Identificar desvios
4. Atualizar se necessário
