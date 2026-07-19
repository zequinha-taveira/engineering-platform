# Pattern: Result Pattern

> Padrão de retorno para tratamento seguro de erros sem lançar exceções não controladas.

---

## Visão Geral

O Result Pattern substitui o lançamento de exceções (`throw`) por retornos explícitos contendo o resultado de sucesso ou a descrição da falha. Ele aumenta a segurança de tipos e obriga o chamador do método a lidar explicitamente com a possibilidade de erro.

## Definição do Tipo

```typescript
export type Result<T, E = Error> = 
  | { ok: true; value: T; error?: never } 
  | { ok: false; value?: never; error: E };
```

### Funções Utilitárias Helper

```typescript
export const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
export const fail = <E>(error: E): Result<never, E> => ({ ok: false, error });
```

---

## Como Utilizar

### 1. Definindo Retornos em Funções

```typescript
import { Result, ok, fail } from "./result";

interface User {
  id: string;
  name: string;
}

class UserNotFoundError extends Error {
  constructor(userId: string) {
    super(`User with ID ${userId} was not found.`);
    this.name = "UserNotFoundError";
  }
}

async function getUser(id: string): Promise<Result<User, UserNotFoundError>> {
  const user = await db.users.findUnique({ where: { id } });
  if (!user) {
    return fail(new UserNotFoundError(id));
  }
  return ok(user);
}
```

### 2. Consumindo os Resultados

O chamador deve verificar a propriedade `ok` antes de acessar `value` ou `error`.

```typescript
const result = await getUser("usr_123");

if (result.ok) {
  // TypeScript faz o type narrowing: result.value está disponível com segurança
  console.log(`User name is: ${result.value.name}`);
} else {
  // TypeScript sabe que result.error existe e possui o tipo correto
  console.error(`Failed to retrieve user: ${result.error.message}`);
}
```

---

## Boas Práticas

1. **Evitar Try/Catch Silenciosos**:
   Use try/catch apenas no limite da aplicação (ex: infraestrutura, chamadas de rede ou IO) para envelopar exceções e convertê-las em `Result` de falha.
2. **Erros Fortemente Tipados**:
   Defina classes de erro específicas para regras de negócio (ex: `PaymentRefusedError`, `SessionExpiredError`) ao invés de usar `Error` genérico.
3. **Imutabilidade**:
   Os objetos de retorno `Result` devem ser tratados como somente leitura.
