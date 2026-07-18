# SOLID Principles

> Princípios SOLID aplicados na Engineering Platform.

## Visão Geral

SOLID é um acrônimo para cinco princípios de design orientado a objetos que tornam o software mais compreensível, flexível e manutenível.

## Princípios

### S — Single Responsibility Principle

> Uma classe deve ter apenas uma razão para mudar.

**Aplicação:**
- Funções com uma única responsabilidade
- Módulos com propósito claro
- Serviços com escopo definido

**Exemplo:**
```typescript
// ❌ Ruim — múltiplas responsabilidades
class UserService {
  createUser() { /* ... */ }
  sendEmail() { /* ... */ }
  generateReport() { /* ... */ }
}

// ✅ Bom — responsabilidade única
class UserService {
  createUser() { /* ... */ }
}

class EmailService {
  sendEmail() { /* ... */ }
}

class ReportService {
  generateReport() { /* ... */ }
}
```

### O — Open/Closed Principle

> Entidades de software devem ser abertas para extensão, fechadas para modificação.

**Aplicação:**
- Interfaces para extensão
- Plugins e extensões
- Strategy pattern

**Exemplo:**
```typescript
// ✅ Aberto para extensão
interface Validator {
  validate(data: any): boolean
}

class EmailValidator implements Validator {
  validate(data: any): boolean { /* ... */ }
}

class AgeValidator implements Validator {
  validate(data: any): boolean { /* ... */ }
}
```

### L — Liskov Substitution Principle

> Objetos de uma subclasses devem ser substituíveis por objetos da superclass.

**Aplicação:**
- Contratos claros
- Comportamento consistente
- Testes de subtipagem

### I — Interface Segregation Principle

> Clientes não devem ser forçados a depender de interfaces que não utilizam.

**Aplicação:**
- Interfaces pequenas e específicas
- Composição sobre herança
- Módulos desacoplados

**Exemplo:**
```typescript
// ❌ Ruim — interface grande
interface Repository {
  create(): void
  read(): void
  update(): void
  delete(): void
  list(): void
  count(): void
}

// ✅ Bom — interfaces segregadas
interface Readable {
  read(): void
}

interface Writable {
  create(): void
  update(): void
  delete(): void
}
```

### D — Dependency Inversion Principle

> Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações.

**Aplicação:**
- Injeção de dependência
- Interfaces sobre implementações
- Controle de inversão

**Exemplo:**
```typescript
// ❌ Ruim — dependência direta
class UserService {
  private db = new PostgresDatabase()
}

// ✅ Bom — dependência de abstração
class UserService {
  constructor(private db: Database) {}
}
```

## Benefícios

- Código mais fácil de manter
- Testes mais simples
- Extensibilidade
- Reutilização
- Comunicação clara
