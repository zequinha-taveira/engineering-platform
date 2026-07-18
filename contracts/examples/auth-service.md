# Contrato: Auth Service

> Exemplo de contrato de módulo para o serviço de autenticação.

---

## Identidade

| Campo | Valor |
|-------|-------|
| Nome | auth-service |
| Versão | 1.0.0 |
| Responsável | @security-team |
| Status | Ativo |

## Descrição

Serviço responsável por autenticação e autorização de usuários. Fornece login, logout, refresh tokens e validação de sessões.

## Responsabilidades

- Autenticar usuários (login/logout)
- Gerenciar tokens JWT
- Validar sessões
- Rate limiting em tentativas de login
- Log de tentativas de acesso

## Interfaces

### API Pública

```typescript
interface AuthService {
  login(credentials: LoginRequest): Promise<Result<AuthResponse, AuthError>>
  logout(token: string): Promise<Result<void, AuthError>>
  refreshToken(refreshToken: string): Promise<Result<AuthResponse, AuthError>>
  validateToken(token: string): Promise<Result<TokenPayload, AuthError>>
}
```

### Eventos Emitidos

| Evento | Payload | Descrição |
|--------|---------|-----------|
| user.logged_in | { userId: string, timestamp: Date } | Quando usuário faz login |
| user.logged_out | { userId: string, timestamp: Date } | Quando usuário faz logout |
| auth.failed | { email: string, reason: string } | Quando autenticação falha |

### Eventos Consumidos

| Evento | Origem | Descrição |
|--------|--------|-----------|
| user.created | user-service | Para criar primeiro token |
| user.deactivated | user-service | Para invalidar sessões |

## Dependências

### Módulos Internos

| Módulo | Versão | Obrigatório |
|--------|--------|-------------|
| user-service | ^1.0.0 | Sim |

### Serviços Externos

| Serviço | Propósito | Fallback |
|---------|-----------|----------|
| Redis | Cache de tokens | In-memory cache |
| PostgreSQL | Armazenamento de usuários | - |

## Restrições

### Técnicas
- Tokens expiram em 15 minutos
- Refresh tokens expiram em 7 dias
- Máximo 5 tentativas de login por minuto

### Regras de Negócio
- Senhas devem ter mínimo 8 caracteres
- MFA opcional mas disponível
- Conta bloqueada após 10 tentativas falhas

### Segurança
- Senhas hasheadas com bcrypt (cost 12)
- Tokens assinados com RS256
- Rate limiting obrigatório
- Logs de auditoria

## Requisitos de Desempenho

| Métrica | Target | Alerta |
|---------|--------|--------|
| Latência p99 | < 100ms | > 200ms |
| Throughput | > 1000 rps | < 500 rps |
| Error rate | < 0.1% | > 1% |
| Disponibilidade | 99.9% | < 99.5% |

## Testes

### Cobertura
- Unitários: 90%
- Integração: 85%
- E2E: Fluxos de login/logout

### Cenários Críticos
- Login com credenciais válidas
- Login com credenciais inválidas
- Refresh token
- Token expirado
- Rate limiting
- Concurrent logins

## Monitoring

### Métricas
- login_attempts_total
- login_success_total
- login_failure_total
- token_refresh_total
- active_sessions

### Alertas
| Métrica | Threshold | Ação |
|---------|-----------|------|
| login_failure_rate | > 5% | Alert time |
| latency_p99 | > 500ms | Page on-call |
| error_rate | > 1% | Alert team |

## Aprovação

| Aprovador | Data | Versão |
|-----------|------|--------|
| Tech Lead | 2026-01-15 | 1.0.0 |
| Security | 2026-01-15 | 1.0.0 |
| SRE | 2026-01-16 | 1.0.0 |
