import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const TEMPLATE_PATH = join(ROOT, "templates", "specification.md");
const SPECS_DIR = join(ROOT, "specifications");

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
Specification Generator — Engineering Platform

Usage:
  npx ts-node tools/generate-spec.ts <title> [options]

Options:
  --desc <description>  Brief description of the feature

Examples:
  npx ts-node tools/generate-spec.ts "User Profile" --desc "Allows users to update their profile information."
`);
    process.exit(0);
  }

  const title = args[0];
  let description = "Breve descrição da funcionalidade e seu propósito.";

  for (let i = 1; i < args.length; i++) {
    if ((args[i] === "--desc" || args[i] === "--description") && args[i + 1]) {
      description = args[i + 1];
      i++;
    }
  }

  if (!existsSync(TEMPLATE_PATH)) {
    console.error(`❌ Specification template not found at: ${TEMPLATE_PATH}`);
    process.exit(1);
  }

  try {
    const template = readFileSync(TEMPLATE_PATH, "utf-8");

    // Replace placeholders in template
    let content = template
      .replace(/^# Template:.*\n\n>.*\n\n---\n\n/, "") // strip template header
      .replace("[Nome da Funcionalidade]", title)
      .replace("Breve descrição da funcionalidade e seu propósito.", description);

    if (!existsSync(SPECS_DIR)) {
      mkdirSync(SPECS_DIR, { recursive: true });
    }

    const name = slugify(title);
    const filename = `${name}.md`;
    const outputPath = join(SPECS_DIR, filename);

    writeFileSync(outputPath, content, "utf-8");

    console.log(`✅ Specification created successfully at: ${outputPath}`);
    process.exit(0);
  } catch (error: any) {
    console.error(`❌ Error generating specification: ${error.message}`);
    process.exit(1);
  }
}

main();
