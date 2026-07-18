# Coding Standards

> Padrões de código para todo o projeto.

## Convenções de Nomenclatura

### Variáveis e Funções
- `camelCase` para variáveis e funções
- Nomes descritivos e significativos
- Evitar abreviações exceto padrões estabelecidos

### Classes e Interfaces
- `PascalCase` para classes e interfaces
- Interfaces sem prefixo `I`
- Classes com substantivo ou substantivo + adjetivo

### Constantes
- `UPPER_SNAKE_CASE` para constantes globais
- `camelCase` para constantes locais

### Arquivos
- `kebab-case` para nomes de arquivos
- Extensão adequada ao conteúdo

## Estrutura de Código

### Organização
- Um conceito por arquivo
- Imports ordenados: externos, internos, relativos
- Exportações no final do arquivo

### Funções
- Máximo 30 linhas por função
- Um nível de abstração por função
- Parâmetros máximos: 3

### Classes
- Máximo 300 linhas por classe
- Princípio de responsabilidade única
- Composição sobre herança

## Padrões

### Error Handling
```typescript
// Usar Result<T, E> para operações que podem falhar
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }

// Nunca usar try/catch silencioso
try {
  await riskyOperation()
} catch (error) {
  logger.error('Operation failed', { error })
  throw new AppError('OPERATION_FAILED', { cause: error })
}
```

### Null Handling
```typescript
// Usar null para ausência intencional
// Usar undefined para valores não inicializados
// Preferir optional chaining over null checks
const name = user?.profile?.name ?? 'Unknown'
```

### Imutabilidade
```typescript
// Usar const por padrão
// Usar readonly para propriedades de classe
// Evitar mutação direta de objetos
const updated = { ...original, field: newValue }
```

## Revisão de Código

### Checklist
- [ ] Código segue convenções de nomenclatura
- [ ] Funções são pequenas e focused
- [ ] Não há código duplicado
- [ ] Tratamento de erros adequado
- [ ] Testes cobrem casos principais
- [ ] Documentação está atualizada
