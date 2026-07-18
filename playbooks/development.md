# Development Playbook

> Guia para desenvolvimento na Engineering Platform.

## Setup

```bash
# Clonar repositório
git clone https://github.com/zequinha-taveira/engineering-platform.git

# Instalar dependências (quando houver)
npm install
```

## Fluxo de Desenvolvimento

### 1. Planejar
- Criar especificação em `specifications/`
- Seguir template `templates/specification.md`

### 2. Implementar
- Seguir `standards/coding.md`
- Criar ou atualizar contrato em `contracts/`
- Adicionar testes em `tests/`

### 3. Revisar
- Solicitar code review
- Revisor verifica checklist em `standards/coding.md`

### 4. Commitar
- Seguir Conventional Commits
- Exemplo: `feat(auth): add login endpoint`

### 5. Integrar
- Push para branch
- CI executa testes
- Merge após aprovação
