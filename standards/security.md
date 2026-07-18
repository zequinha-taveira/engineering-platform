# Security Standards

> Padrões de segurança para o projeto.

## Princípios

### Defense in Depth
Múltiplas camadas de segurança. Nenhuma camada é suficiente sozinha.

### Least Privilege
Acessar apenas o necessário. Permissões mínimas para cada role.

### Secure by Default
Configurações seguras por padrão. Opt-in para funcionalidades inseguras.

## Autenticação

### Senhas
- Mínimo 8 caracteres
- Hash com bcrypt (cost 12)
- Nunca armazenar senhas em plaintext

### Tokens
- JWT com RS256
- Curta duração (15 min)
- Refresh tokens com rotação

### MFA
- Suporte a TOTP
- Recovery codes criptografados
- Rate limiting em tentativas

## Autorização

### RBAC
- Roles definidas centralmente
- Permissões granulares
- Audit trail de acessos

### Resource-level
- Validação de ownership
- Row-level security quando possível
- Check em cada endpoint

## Input Validation

### Regras
- Validar todos os inputs
- Whitelist over blacklist
- Sanitizar output
- Usar schemas para validação

### Ferramentas
- Zod ou Yup para schemas
- Parameterized queries
- Content Security Policy

## Secrets

### Armazenamento
- Variáveis de ambiente
- Vault para produção
- Nunca em código ou config files

### Rotação
- Chaves rotacionadas periodicamente
- Processo automatizado
- Sem downtime

## Logging

### O que logar
- Autenticação (sucesso e falha)
- Mudanças de dados
- Erros de sistema

### O que NÃO logar
- Senhas ou tokens
- Dados pessoais sensíveis
- Stack traces completos em produção

## Auditoria

### Frequência
- Diária: logs de acesso
- Semanal: revisão de permissões
- Mensal: auditoria completa

### Checklist
- [ ] Sem secrets no repositório
- [ ] Todas as entradas validadas
- [ ] Autenticação em endpoints sensíveis
- [ ] Rate limiting configurado
- [ ] Logs de auditoria ativos
