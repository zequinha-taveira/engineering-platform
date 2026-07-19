#!/usr/bin/env ts-node

/**
 * ADR Generator — Engineering Platform
 *
 * Generates a new Architecture Decision Record from the template.
 *
 * Usage:
 *   npx ts-node tools/generate-adr.ts "Decision Title"
 *   npx ts-node tools/generate-adr.ts "Decision Title" --status accepted
 */

import { readFileSync, readdirSync, writeFileSync, existsSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const DECISIONS_DIR = join(ROOT, "architecture", "decisions");
const TEMPLATE_PATH = join(ROOT, "templates", "adr.md");

interface ADROptions {
  title: string;
  status?: "proposed" | "accepted" | "rejected" | "deprecated";
  author?: string;
}

function getNextADRNumber(): number {
  if (!existsSync(DECISIONS_DIR)) {
    return 1;
  }

  const files = readdirSync(DECISIONS_DIR).filter((f) =>
    /^\d+-/.test(f)
  );

  if (files.length === 0) return files.length + 1;

  const numbers = files.map((f) => {
    const match = f.match(/^(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  });

  return Math.max(...numbers) + 1;
}

function formatNumber(n: number): string {
  return n.toString().padStart(3, "0");
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function generateADR(options: ADROptions): string {
  const template = readFileSync(TEMPLATE_PATH, "utf-8");
  const number = getNextADRNumber();
  const date = new Date().toISOString().split("T")[0];
  const status = options.status ?? "proposed";
  const author = options.author ?? "@engineering-platform";

  // Replace placeholders in template
  let content = template
    // Remove the template header
    .replace(/^# Template:.*\n\n>.*\n\n---\n\n/, "")
    // Replace ADR number and title
    .replace("[Número]", formatNumber(number))
    .replace("[Título]", options.title)
    // Set status
    .replace(
      `[ ] Proposta\n[ ] Aceita\n[ ] Rejeitada\n[ ] Obsoleta`,
      [
        status === "proposed" ? "[x] Proposta" : "[ ] Proposta",
        status === "accepted" ? "[x] Aceita" : "[ ] Aceita",
        status === "rejected" ? "[x] Rejeitada" : "[ ] Rejeitada",
        status === "deprecated" ? "[x] Obsoleta" : "[ ] Obsoleta",
      ].join("\n")
    )
    // Set date
    .replace("YYYY-MM-DD", date)
    // Set author in history
    .replace("@author", author);

  return { content, number, date } as any;
}

function main(): void {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "--help") {
    console.log(`
ADR Generator — Engineering Platform

Usage:
  npx ts-node tools/generate-adr.ts <title> [options]

Options:
  --status <status>   Set initial status (proposed|accepted|rejected|deprecated)
                      Default: proposed
  --author <name>     Set author name
                      Default: @engineering-platform

Examples:
  npx ts-node tools/generate-adr.ts "Use TypeScript for all tools"
  npx ts-node tools/generate-adr.ts "Adopt MCP Protocol" --status accepted
`);
    process.exit(0);
  }

  const title = args[0];
  let status: ADROptions["status"] = "proposed";
  let author = "@engineering-platform";

  for (let i = 1; i < args.length; i++) {
    if (args[i] === "--status" && args[i + 1]) {
      status = args[i + 1] as ADROptions["status"];
      i++;
    } else if (args[i] === "--author" && args[i + 1]) {
      author = args[i + 1];
      i++;
    }
  }

  const number = getNextADRNumber();
  const date = new Date().toISOString().split("T")[0];
  const slug = slugify(title);
  const filename = `${formatNumber(number)}-${slug}.md`;
  const filepath = join(DECISIONS_DIR, filename);

  const template = readFileSync(TEMPLATE_PATH, "utf-8");

  // Build content from template
  let content = template
    .replace(/^# Template:.*\n\n>.*\n\n---\n\n/, "")
    .replace("[Número]", formatNumber(number))
    .replace("[Título]", title)
    .replace(
      "[ ] Proposta\n[ ] Aceita\n[ ] Rejeitada\n[ ] Obsoleta",
      [
        status === "proposed" ? "[x] Proposta" : "[ ] Proposta",
        status === "accepted" ? "[x] Aceita" : "[ ] Aceita",
        status === "rejected" ? "[x] Rejeitada" : "[ ] Rejeitada",
        status === "deprecated" ? "[x] Obsoleta" : "[ ] Obsoleta",
      ].join("\n")
    )
    .replaceAll("YYYY-MM-DD", date)
    .replace("@author", author);

  writeFileSync(filepath, content, "utf-8");

  console.log(`✅ ADR created: ${filepath}`);
  console.log(`   Number: ${formatNumber(number)}`);
  console.log(`   Title:  ${title}`);
  console.log(`   Status: ${status}`);
  console.log(`   Date:   ${date}`);
}

main();
