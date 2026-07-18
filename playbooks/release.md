# Release Playbook

> Guia para releases na Engineering Platform.

## Versionamento

Semantic Versioning (SemVer):
- **MAJOR** — Mudanças incompatíveis
- **MINOR** — Novas funcionalidades
- **PATCH** — Bug fixes

## Fluxo

### 1. Preparar
- Verificar CHANGELOG
- Atualizar versão em package.json
- Executar testes completos

### 2. Commitar
```bash
git add .
git commit -m "chore(release): v1.0.0"
git tag v1.0.0
```

### 3. Publicar
```bash
git push origin main --tags
```
