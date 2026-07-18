# ADR-001: Usar TypeScript como Linguagem Principal

## Status

Aceita

## Data

2026-01-15

## Contexto

A Engineering Platform precisa de uma linguagem de programação que:
- Suporte a typagem estática
- Tenha boa ecossistema de ferramentas
- Permita reutilização entre frontend e backend
- Tenha amplo suporte da comunidade

## Decisão

### Opções Consideradas

#### Opção 1: TypeScript
- **Prós:** Typagem estática, JavaScript compatível, grande ecossistema
- **Contras:** Complexidade de build, learning curve

#### Opção 2: Python
- **Prós:** Simples, grande ecossistema de IA/ML
- **Contras:** Performance menor, tipagem opcional

#### Opção 3: Go
- **Prós:** Performance, concorrência, simplicidade
- **Contras:** Ecossistema menor, menos flexível

### Escolha

Decidimos pela **Opção 1: TypeScript** porque:
1. Typagem estática ajuda a prevenir bugs
2. Compatível com JavaScript existente
3. Ecossistema robusto para web e ferramentas
4. MCP SDK disponível em TypeScript
5. Facilita compartilhamento de código entre componentes

## Consequências

### Positivas
- Código mais seguro com typagem
- Melhor experience de desenvolvimento
- Reutilização entre frontend/backend
- Grande comunidade e suporte

### Negativas
- Build step necessário
- Complexidade de configuração
- Dependência de DefinitelyTyped para libs sem tipos

### Neutras
- Necessário setup de ESLint/Prettier
- Aprendizado para devs Python/Go

## Ações

- [x] Configurar tsconfig.json
- [x] Configurar ESLint e Prettier
- [x] Documentar convenções em standards/coding.md
- [ ] Treinar time em TypeScript avançado

## Referências

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [MCP SDK](https://github.com/modelcontextprotocol)

## Histórico

| Data | Autor | Mudança |
|------|-------|---------|
| 2026-01-15 | @architect | Criação do ADR |
