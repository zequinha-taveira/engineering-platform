import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const TEMPLATE_PATH = join(ROOT, "templates", "contract.md");
const CONTRACTS_DIR = join(ROOT, "contracts");

interface ContractOptions {
  title: string;
  name: string;
  version?: string;
  owner?: string;
  description?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === "--help") {
    console.log(`
Contract Generator — Engineering Platform

Usage:
  npx ts-node tools/generate-contract.ts <title> [options]

Options:
  --name <name>         kebab-case name of the module (e.g. auth-service)
  --version <version>   Initial version (default: 1.0.0)
  --owner <owner>       Module owner (default: @team)
  --desc <description>  Brief description of the module

Examples:
  npx ts-node tools/generate-contract.ts "Auth Service" --name auth-service --owner @security-team --desc "Service for auth"
`);
    process.exit(0);
  }

  const title = args[0];
  let name = slugify(title);
  let version = "1.0.0";
  let owner = "@team";
  let description = "Breve descrição do propósito do módulo.";

  for (let i = 1; i < args.length; i++) {
    if (args[i] === "--name" && args[i + 1]) {
      name = args[i + 1];
      i++;
    } else if (args[i] === "--version" && args[i + 1]) {
      version = args[i + 1];
      i++;
    } else if (args[i] === "--owner" && args[i + 1]) {
      owner = args[i + 1];
      i++;
    } else if ((args[i] === "--desc" || args[i] === "--description") && args[i + 1]) {
      description = args[i + 1];
      i++;
    }
  }

  if (!existsSync(TEMPLATE_PATH)) {
    console.error(`❌ Contract template not found at: ${TEMPLATE_PATH}`);
    process.exit(1);
  }

  try {
    const template = readFileSync(TEMPLATE_PATH, "utf-8");

    // Replace placeholders in template
    let content = template
      .replace(/^# Template:.*\n\n>.*\n\n---\n\n/, "") // strip template header
      .replace("[Nome do Módulo]", title)
      .replace("module-name", name)
      .replace("1.0.0", version)
      .replace("@team", owner)
      .replace("Breve descrição do propósito do módulo.", description);

    if (!existsSync(CONTRACTS_DIR)) {
      mkdirSync(CONTRACTS_DIR, { recursive: true });
    }

    const filename = `${name}.md`;
    const outputPath = join(CONTRACTS_DIR, filename);

    writeFileSync(outputPath, content, "utf-8");

    console.log(`✅ Contract created successfully at: ${outputPath}`);
    process.exit(0);
  } catch (error: any) {
    console.error(`❌ Error generating contract: ${error.message}`);
    process.exit(1);
  }
}

main();
