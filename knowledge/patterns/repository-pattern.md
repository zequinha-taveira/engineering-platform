# Repository Pattern

> Padrão de acesso a dados utilizando Repository.

## Visão Geral

O Repository Pattern encapsula a lógica de acesso a dados, abstraindo a fonte de dados e fornecendo uma interface uniforme para consulta e manipulação.

## Quando Usar

- Múltiplas fontes de dados
- Necessidade de testabilidade
- Lógica de negócio complexa
- Troca de tecnologia de dados

## Estrutura

```typescript
// Interface
interface Repository<T> {
  findById(id: string): Promise<T | null>
  findAll(filter?: Filter): Promise<T[]>
  create(entity: Omit<T, 'id'>): Promise<T>
  update(id: string, data: Partial<T>): Promise<T>
  delete(id: string): Promise<void>
}

// Implementação
class PostgresUserRepository implements Repository<User> {
  async findById(id: string): Promise<User | null> {
    // implementação específica
  }
}
```

## Componentes

### Entity
Entidade de domínio que representa um objeto do negócio.

### Repository Interface
Contrato que define operações de acesso a dados.

### Repository Implementation
Implementação específica para uma fonte de dados.

### Unit of Work
Coordena transações e garante consistência.

## Exemplo Completo

```typescript
// Entity
interface User {
  id: string
  name: string
  email: string
}

// Repository Interface
interface UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | null>
}

// Implementation
class PostgresUserRepository implements UserRepository {
  constructor(private db: Database) {}

  async findById(id: string): Promise<User | null> {
    return this.db.query('SELECT * FROM users WHERE id = $1', [id])
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.db.query('SELECT * FROM users WHERE email = $1', [email])
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    return this.db.query('INSERT INTO users ...')
  }
}

// Usage
class UserService {
  constructor(private userRepo: UserRepository) {}

  async getUser(id: string): Promise<User | null> {
    return this.userRepo.findById(id)
  }
}
```

## Benefícios

- **Testabilidade** — Fácil de mockar
- **Flexibilidade** — Troca de fonte de dados
- **Organização** — Lógica de dados isolada
- **Reutilização** — Múltiplos consumidores

## Validação

```typescript
// Teste com mock
const mockRepo: UserRepository = {
  findById: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByEmail: jest.fn()
}

const service = new UserService(mockRepo)
```
