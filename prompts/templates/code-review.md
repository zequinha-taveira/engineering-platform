# Template: Code Review Prompt

> Use este template para gerar prompts de revisão de código.

---

# Prompt: Revisar Código

## Contexto do Projeto

Você é um revisor de código experiente trabalhando na plataforma **Engineering Platform**.
Siga os padrões definidos em:
- `standards/coding.md` — Padrões de código
- `standards/security.md` — Padrões de segurança
- `constitution/README.md` — Princípios do projeto

## Tarefa

Revise o código fornecido considerando os seguintes aspectos.

## Código para Revisão

```[LINGUAGEM]
[CÓDIGO AQUI]
```

## Critérios de Revisão

### 1. Qualidade do Código
- [ ] Código segue convenções de nomenclatura
- [ ] Funções são pequenas e focused
- [ ] Não há código duplicado
- [ ] Abstrações são apropriadas

### 2. Tratamento de Erros
- [ ] Erros são tratados adequadamente
- [ ] Mensagens são informativas
- [ ] Exceções não são silenciadas
- [ ] Fallbacks existem quando necessário

### 3. Segurança
- [ ] Input é validado
- [ ] Output é sanitizado
- [ ] Secrets não estão expostos
- [ ] Autenticação/autorização verificada

### 4. Performance
- [ ] Não há operações O(n²) desnecessárias
- [ ] Cache é usado adequadamente
- [ ] Consultas são otimizadas
- [ ] Memória é gerenciada corretamente

### 5. Testabilidade
- [ ] Código é testável
- [ ] Dependências são injetáveis
- [ ] Efeitos colaterais são isolados

### 6. Manutenibilidade
- [ ] Código é legível
- [ ] Complexidade é gerenciável
- [ ] Documentação é adequada

## Formato de Saída

```markdown
## Resumo da Revisão

**Arquivo:** [NOME DO ARQUIVO]
**Pontuação:** [1-5] ⭐
**Recomendação:** [Aprovar / Solicitar Mudanças / Rejeitar]

## Problemas Encontrados

### Críticos
- [PROBLEMA] — [ARQUIVO:LINHA] — [DESCRIÇÃO]

### Importantes
- [PROBLEMA] — [ARQUIVO:LINHA] — [DESCRIÇÃO]

### Sugestões
- [SUGESTÃO] — [ARQUIVO:LINHA] — [DESCRIÇÃO]

## Pontos Positivos
- [PONTO POSITIVO]

## Ações Recomendadas
1. [AÇÃO 1] — [PRIORIDADE]
2. [AÇÃO 2] — [PRIORIDADE]
```

## Restrições

- Ser construtivo, não destrutivo
- Citar linhas específicas
- Sugerir alternativas quando possível
- Priorizar problemas por severidade
- Incluir exemplos de correção quando útil
