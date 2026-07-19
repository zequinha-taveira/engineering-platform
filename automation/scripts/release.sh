#!/bin/bash
# release.sh — Automatizar processo de release

bump_type=${1:-patch}

echo "=== Running Release Automation ==="
npx tsx tools/release.ts "$bump_type"
exit_code=$?

if [ $exit_code -ne 0 ]; then
  echo "❌ Release failed."
  exit 1
else
  echo "✅ Release successfully compiled."
  exit 0
fi
