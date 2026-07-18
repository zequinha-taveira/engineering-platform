# Testing Standards

> Padrões para testes de código.

## Pirâmide de Testes

```
        /  E2E  \
       / Integração \
      /   Unitários   \
```

### Distribuição
- 70% Unitários
- 20% Integração
- 10% E2E

## Testes Unitários

### Convenções
- Um teste por comportamento
- Nome: `deve_[comportamento]_[condição]`
- AAA: Arrange, Act, Assert
- Um assertion por teste (quando possível)

### Exemplo
```typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('deve criar usuário com dados válidos', async () => {
      // Arrange
      const userData = { name: 'João', email: 'joao@example.com' }
      const mockRepo = createMockUserRepository()

      // Act
      const result = await userService.createUser(userData)

      // Assert
      expect(result.ok).toBe(true)
      expect(result.value.name).toBe('João')
    })
  })
})
```

### Cobertura
- Mínimo 80% para código de produção
- 100% para código crítico (segurança, pagamentos)
- Cobertura de branches

## Testes de Integração

### O que testar
- Integração com banco de dados
- Integração com APIs externas
- Fluxos completos de negócio

### Setup
- Usar containers para dependências
- Dados de teste isolados
- Cleanup após cada teste

## Testes E2E

### O que testar
- Fluxos críticos do usuário
- Caminhos felizes
- Error handling visível

### Ferramentas
- Playwright ou Cypress
- Screenshots em falhas
- Relatórios de execução

## Mocking

### Princípios
- Mockar dependências externas
- Não mockar código próprio
- Usar interfaces para mockar

### Estratégias
- Mocks manuais para testes simples
- Libraries de mock para complexidade
- Fakes para integração

## CI/CD

### Execução
- Testes rodam em todo push
- Fail fast: parar no primeiro erro
- Retry automático para testes flaky

### Relatórios
- Cobertura por PR
- Histórico de cobertura
- Alertas para queda de cobertura
