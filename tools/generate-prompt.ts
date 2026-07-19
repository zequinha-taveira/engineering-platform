import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from "fs";
import { join, resolve } from "path";
import { TemplateEngine } from "../mcp/src/core/template-engine";

const ROOT = resolve(import.meta.dirname, "..");
const TEMPLATES_DIR = join(ROOT, "prompts", "templates");

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === "--help") {
    console.log(`
Prompt Generator — Engineering Platform

Usage:
  npx tsx tools/generate-prompt.ts <template-name> [options]

Options:
  --out <file-path>       Save the generated prompt to a file (default: stdout)
  --var <name>=<value>    Provide a variable value for interpolation

Examples:
  npx tsx tools/generate-prompt.ts specification --var "NOME DA FEATURE=Auth Service" --var "NOME=auth-service" --var "DESCRIÇÃO BREVE=Autenticação"
`);
    process.exit(0);
  }

  const templateName = args[0];
  const templateFilename = templateName.endsWith(".md") ? templateName : `${templateName}.md`;
  const templatePath = join(TEMPLATES_DIR, templateFilename);

  if (!existsSync(templatePath)) {
    console.error(`❌ Template not found: ${templatePath}`);
    console.error(`Available templates:`);
    if (existsSync(TEMPLATES_DIR)) {
      readdirSync(TEMPLATES_DIR).forEach(f => console.error(`  - ${f.replace(".md", "")}`));
    }
    process.exit(1);
  }

  const variables: Record<string, string> = {};
  let outPath: string | null = null;

  for (let i = 1; i < args.length; i++) {
    if (args[i] === "--var" && args[i + 1]) {
      const parts = args[i + 1].split("=");
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join("=").trim();
        variables[key] = value;
      }
      i++;
    } else if (args[i] === "--out" && args[i + 1]) {
      outPath = args[i + 1];
      i++;
    }
  }

  try {
    const templateContent = readFileSync(templatePath, "utf-8");
    const detected = TemplateEngine.detectPlaceholders(templateContent);

    const missing = detected.filter(p => variables[p] === undefined);
    if (missing.length > 0) {
      console.warn(`⚠️ Warning: Missing values for placeholders: ${missing.join(", ")}`);
      missing.forEach(p => {
        variables[p] = `[${p}]`;
      });
    }

    const rendered = TemplateEngine.render(templateContent, variables);

    if (outPath) {
      const absoluteOutPath = resolve(outPath);
      const parentDir = join(absoluteOutPath, "..");
      if (!existsSync(parentDir)) {
        mkdirSync(parentDir, { recursive: true });
      }
      writeFileSync(absoluteOutPath, rendered, "utf-8");
      console.log(`✅ Prompt successfully generated at: ${absoluteOutPath}`);
    } else {
      console.log(rendered);
    }
    process.exit(0);
  } catch (error: any) {
    console.error(`❌ Error generating prompt: ${error.message}`);
    process.exit(1);
  }
}

main();
