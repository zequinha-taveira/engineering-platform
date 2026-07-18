# Template: Module Contract

> Use este template para definir contratos de módulos.

---

# Contrato: [Nome do Módulo]

## Identidade

| Campo | Valor |
|-------|-------|
| Nome | module-name |
| Versão | 1.0.0 |
| Responsável | @team |
| Status | Ativo |

## Descrição

Breve descrição do propósito do módulo.

## Responsabilidades

- Responsabilidade 1
- Responsabilidade 2
- Responsabilidade 3

## Interfaces

### API Pública

```typescript
// Interface principal
interface ModuleName {
  method1(param: Type): ReturnType
  method2(param: Type): ReturnType
}
```

### Eventos Emitidos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| entity.created | { id: string } | Quando entidade é criada |
| entity.updated | { id: string } | Quando entidade é atualizada |

### Eventos Consumidos

| Evento | Origem | Descrição |
|--------|--------|-----------|
| external.event | OtherModule | Quando evento externo ocorre |

## Dependências

### Módulos Internos

| Módulo | Versão | Obrigatório |
|--------|--------|-------------|
| auth-service | ^1.0.0 | Sim |

### Serviços Externos

| Serviço | Propósito | Fallback |
|---------|-----------|----------|
| Redis | Cache | Memory cache |

## Restrições

### Técnicas
- Não pode usar mais de 100MB de memória
- Latência máxima: 50ms
- Throughput mínimo: 1000 req/s

### Regras de Negócio
- Validação obrigatória de entrada
- Transações atômicas
- Audit trail completo

## Requisitos de Segurança

- Autenticação: JWT obrigatório
- Autorização: RBAC
- Validação: Schema validation
- Logging: Audit logs

## Requisitos de Desempenho

| Métrica | Target | Alerta |
|---------|--------|--------|
| Latência p99 | < 100ms | > 200ms |
| Throughput | > 500 rps | < 200 rps |
| Error rate | < 0.1% | > 1% |

## Testes

### Cobertura
- Unitários: 90%
- Integração: 80%
- E2E: Fluxos críticos

### Cenários Críticos
- Happy path
- Error handling
- Rate limiting
- Concorrência

## Monitoring

### Métricas
- Request count
- Latency histogram
- Error count
- Cache hit rate

### Alertas
- Error rate > 1%
- Latency p99 > 500ms
- Memory > 80%

## Aprovação

| Aprovador | Data | Versão |
|-----------|------|--------|
| Tech Lead | - | - |
| Security | - | - |
| SRE | - | - |
