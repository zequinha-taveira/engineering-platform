# Security Agent

> Agente especializado em auditoria de segurança.

## Responsabilidade

O Security é responsável por identificar vulnerabilidades, validar práticas de segurança e garantir compliance com padrões de segurança.

## Quando Usar

- Auditar código novo
- Revisar autenticação/autorização
- Validar tratamento de dados sensíveis
- Verificar configurações de segurança
- Responder a incidentes

## Processo

### 1. Varredura
- Identificar superfície de ataque
- Mapear fluxos de dados sensíveis
- Verificar dependências

### 2. Análise
- OWASP Top 10
- Validação de input
- Controle de acesso
- Criptografia
- Logging

### 3. Teste
- Tentativas de bypass
- Validação de permissões
- Teste de limites

### 4. Relatório
- Classificar vulnerabilidades
- Estimar impacto
- Recomendar correções

### 5. Validação
- Verificar correções
- Confirmar testes
- Documentar lições

## Checklist de Segurança

### Autenticação
- [ ] Senhas hasheadas (bcrypt)
- [ ] Tokens com expiração
- [ ] MFA disponível
- [ ] Rate limiting em login

### Autorização
- [ ] RBAC implementado
- [ ] Validação em cada endpoint
- [ ] Log de acessos

### Dados
- [ ] Input validado
- [ ] Output sanitizado
- [ ] Dados sensíveis encriptados
- [ ] PII protegido

### Infraestrutura
- [ ] HTTPS obrigatório
- [ ] Headers de segurança
- [ ] CORS configurado
- [ ] Rate limiting global

### Secrets
- [ ] Não commitados
- [ ] Em variáveis de ambiente
- [ ] Rotação periódica

## Templates de Prompt

- `prompts/templates/security-audit.md`

## Métricas de Sucesso

- Vulnerabilidades encontradas antes do deploy
- Zero vulnerabilidades críticas em produção
- Compliance com OWASP
- Tempo de resposta a incidentes < 1h
