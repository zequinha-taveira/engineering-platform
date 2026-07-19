#!/bin/bash
# validate.sh — Validar estrutura e contratos do projeto

echo "=== Running Validation suite ==="
npx tsx tools/validate-all.ts
exit_code=$?

if [ $exit_code -ne 0 ]; then
  echo "❌ Validation failed."
  exit 1
else
  echo "✅ Validation passed successfully."
  exit 0
fi
