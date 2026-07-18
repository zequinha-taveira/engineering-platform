# API Standards

> Padrões para design e implementação de APIs.

## REST API

### Endpoints
- Usar substantivos no plural: `/users`, `/orders`
- Versão na URL: `/v1/users`
- Recursos aninhados com moderação: `/users/{id}/orders`

### Métodos HTTP
- `GET` — Leitura (sem efeito colateral)
- `POST` — Criação
- `PUT` — Atualização completa
- `PATCH` — Atualização parcial
- `DELETE` — Remoção

### Códigos de Resposta
- `200` — Sucesso
- `201` — Criado
- `204` — Sem conteúdo
- `400` — Requisição inválida
- `401` — Não autenticado
- `403` — Não autorizado
- `404` — Não encontrado
- `409` — Conflito
- `422` — Entidade não processável
- `500` — Erro interno

### Formato de Resposta
```json
{
  "data": {},
  "meta": {
    "timestamp": "2026-01-01T00:00:00Z",
    "version": "1.0"
  },
  "pagination": {
    "page": 1,
    "perPage": 20,
    "total": 100
  }
}
```

### Erros
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

## Autenticação

### JWT Tokens
- Access token: 15 minutos
- Refresh token: 7 dias
- Tokens são stateless

### API Keys
- Prefixo identificador: `ep_`
- Rotação periódica
- Rate limiting por key

## Rate Limiting

### Limites
- 100 requests/minuto por IP
- 1000 requests/hora por API key
- Headers de rate limit em toda resposta

### Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Versioning

### Estratégia
- Versionamento na URL: `/v1/`, `/v2/`
- Deprecation headers para versões anteriores
- Mínimo 6 meses de suporte a versão anterior

## Documentação

### OpenAPI
- Toda API possui spec OpenAPI
- Specs são geradas automaticamente
- Documentação interativa disponível
