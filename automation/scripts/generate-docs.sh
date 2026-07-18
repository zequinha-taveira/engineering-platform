#!/bin/bash
# generate-docs.sh — Gerar documentação automática

echo "=== Generating Documentation ==="

# Indexar specifications
echo "# Specifications Index" > docs/specifications-index.md
for file in specifications/*.md; do
  name=$(basename "$file" .md)
  echo "- [$name]($file)" >> docs/specifications-index.md
done

# Indexar architecture decisions
echo "# Architecture Decisions" > docs/adr-index.md
for file in architecture/decisions/*.md; do
  name=$(basename "$file" .md)
  echo "- [$name]($file)" >> docs/adr-index.md
done

echo "=== Documentation generated ==="
