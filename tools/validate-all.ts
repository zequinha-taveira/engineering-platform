import { resolve, join } from "path";
import { readdirSync, existsSync } from "fs";
import { validateProjectStructure } from "../mcp/src/core/project-validator";
import { validateContract } from "../mcp/src/core/contract-validator";

const ROOT = resolve(import.meta.dirname, "..");
const CONTRACT_SCHEMA_PATH = join(ROOT, "contracts", "schema.json");

function main() {
  console.log("=== Running Project Validation ===");
  const projectReport = validateProjectStructure(ROOT);
  
  if (!projectReport.valid) {
    console.error("❌ Project structure validation failed:");
    projectReport.errors.forEach(err => console.error(`  - ${err}`));
    process.exit(1);
  }
  console.log("✅ Project structure is valid.");

  console.log("\n=== Running Module Contracts Validation ===");
  const contractsDir = join(ROOT, "contracts");
  const examplesDir = join(ROOT, "examples");
  
  const contractFiles: string[] = [];

  // Find all contract files in contracts/
  if (existsSync(contractsDir)) {
    readdirSync(contractsDir)
      .filter(f => f.endsWith(".md") && f !== "README.md")
      .forEach(f => contractFiles.push(join(contractsDir, f)));
  }

  // Find contract files in examples/
  if (existsSync(examplesDir)) {
    readdirSync(examplesDir)
      .filter(f => f.endsWith("-contract.md"))
      .forEach(f => contractFiles.push(join(examplesDir, f)));
  }

  let allContractsValid = true;

  contractFiles.forEach(filePath => {
    const relativePat = filePath.replace(ROOT + "\\", "").replace(ROOT + "/", "");
    console.log(`Checking ${relativePat}...`);
    const result = validateContract(filePath, CONTRACT_SCHEMA_PATH);
    if (!result.valid) {
      allContractsValid = false;
      console.error(`  ❌ Validation failed:`);
      result.errors?.forEach(err => console.error(`    - ${err}`));
    } else {
      console.log(`  ✅ Valid.`);
    }
  });

  if (!allContractsValid) {
    console.error("\n❌ Contract validation failed.");
    process.exit(1);
  }

  console.log("\n✅ All module contracts are valid.");
  console.log("\n🎉 Verification passed successfully.");
  process.exit(0);
}

main();
