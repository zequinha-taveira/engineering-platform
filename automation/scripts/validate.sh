#!/bin/bash
# validate.sh — Validar estrutura do projeto

echo "=== Validating Engineering Platform ==="

# Verificar diretórios obrigatórios
required_dirs=(
  "constitution" "standards" "architecture" "specifications"
  "contracts" "prompts" "agents" "templates"
  "knowledge" "playbooks" "automation" "mcp" "docs"
)

echo "Checking required directories..."
for dir in "${required_dirs[@]}"; do
  if [ -d "$dir" ]; then
    echo "  ✅ $dir"
  else
    echo "  ❌ $dir (missing)"
  fi
done

# Verificar arquivos obrigatórios
required_files=(
  "constitution/README.md"
  "standards/coding.md"
  "standards/api.md"
  "standards/testing.md"
  "README.md"
)

echo "Checking required files..."
for file in "${required_files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (missing)"
  fi
done

echo "=== Validation complete ==="
