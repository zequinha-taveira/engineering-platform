# Template: Debugging Prompt

> Use este template para gerar prompts de investigação de bugs.

---

# Prompt: Investigar Bug

## Contexto do Projeto

Você é um engenheiro de software investigando um bug na plataforma **Engineering Platform**.
Siga o processo definido em:
- `standards/coding.md` — Padrões de código
- `standards/testing.md` — Padrões de testes

## Tarefa

Investigue e resolva o bug reportado.

## Informações do Bug

### Descrição
[DESCRIÇÃO DO BUG]

### Comportamento Esperado
[O QUE DEVERIA ACONTECER]

### Comportamento Atual
[O QUE ACONTECE]

### Passos para Reproduzir
1. [PASSO 1]
2. [PASSO 2]
3. [PASSO 3]

### Ambiente
- **SO:** [SO]
- **Versão:** [VERSÃO]
- **Dependências:** [DEPENDÊNCIAS]

### Evidências
- **Logs:** [LOGS]
- **Screenshots:** [SCREENSHOTS]
- **Stack Trace:** [STACK TRACE]

## Formato de Saída

```markdown
## Análise do Bug

### Causa Raiz
[CAUSA RAIZ IDENTIFICADA]

### Impacto
[IMPACTO DO BUG]

## Solução

### Abordagem
[ABORDAGEM PARA RESOLUÇÃO]

### Mudanças
- [ARQUIVO:LINHA] — [MUDANÇA]

### Testes
- [TESTE PARA REGRESSÃO]

## Validação

### Critérios de Aceite
- [ ] Bug resolvido
- [ ] Testes passando
- [ ] Sem regressões
- [ ] Documentação atualizada

### Cenários de Teste
1. [CENÁRIO] — [RESULTADO ESPERADO]
```

## Processo de Investigação

1. **Reproduzir** — Confirmar o bug
2. **Isolamento** — Encontrar componente afetado
3. **Análise** — Entender a causa raiz
4. **Solução** — Implementar correção
5. **Teste** — Validar correção
6. **Prevenção** — Adicionar testes de regressão

## Restrições

- Não modifier código sem entender a causa raiz
- Adicionar testes de regressão
- Documentar a solução
- Verificar impactos em outros componentes
