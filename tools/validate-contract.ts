import { existsSync } from "fs";
import { join, resolve } from "path";
import { validateContract } from "../mcp/src/core/contract-validator";

const ROOT = resolve(import.meta.dirname, "..");
const CONTRACT_SCHEMA_PATH = join(ROOT, "contracts", "schema.json");

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === "--help") {
    console.log(`
Contract Validator — Engineering Platform

Usage:
  npx tsx tools/validate-contract.ts <contract-markdown-file>
`);
    process.exit(0);
  }

  const filePath = resolve(args[0]);
  if (!existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }

  const result = validateContract(filePath, CONTRACT_SCHEMA_PATH);

  if (result.valid) {
    console.log(`✅ Contract "${filePath}" is valid according to schema.`);
    process.exit(0);
  } else {
    console.error(`❌ Contract validation failed:`);
    result.errors?.forEach(err => {
      console.error(`  - ${err}`);
    });
    process.exit(1);
  }
}

main();
