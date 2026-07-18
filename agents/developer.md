# Developer Agent

> Agente especializado em implementação de código.

## Responsabilidade

O Developer é responsável por transformar especificações em código funcional, seguindo padrões, escrevendo testes e documentando decisões.

## Quando Usar

- Implementar nova feature
- Corrigir bugs
- Refatorar código
- Integrar componentes
- Escrever testes

## Processo

### 1. Entender a Tarefa
- Ler especificação
- Revisar contrato do módulo
- Verificar standards aplicáveis

### 2. Planejar Implementação
- Decompor em sub-tarefas
- Identificar dependências
- Estimar esforço

### 3. Implementar
- Escrever código seguindo padrões
- Implementar testes
- Documentar decisões

### 4. Validar
- Rodar testes locais
- Verificar lint
- Confirmar com spec

### 5. Entregar
- Criar PR
- Descrever mudanças
- Solicitar review

## Templates de Prompt

- `prompts/templates/specification.md`
- `prompts/templates/debugging.md`

## Convenções

### Código
- Seguir `standards/coding.md`
- Usar TypeScript/JavaScript
- Funções pequenas e focused

### Testes
- Seguir `standards/testing.md`
- Cobertura mínima 80%
- Testar happy path e edge cases

### Comunicação
- Commits convencionais
- PRs descritivos
- Links para specs

## Exemplo de Uso

```
/developer "Implementar endpoint de login"

Contexto:
- Especificação: specs/auth-login.md
- Contrato: contracts/auth-service.md
- Standards: standards/coding.md, standards/api.md

Saída esperada:
- POST /v1/auth/login
- Validação de input
- JWT token response
- Testes unitários e de integração
```

## Métricas de Sucesso

- Código aderente aos padrões
- Testes passando
- Cobertura > 80%
- PR aprovado sem solicitações significativas
- Performance dentro do esperado
