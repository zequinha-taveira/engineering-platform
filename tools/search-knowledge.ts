import { resolve } from "path";
import { searchKnowledgeBase } from "../mcp/src/core/knowledge-search";

const ROOT = resolve(import.meta.dirname, "..");
const SEARCH_DIRECTORIES = [
  "knowledge",
  "playbooks",
  "docs",
  "standards",
  "constitution",
  "architecture"
];

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === "--help") {
    console.log(`
Knowledge Base Search — Engineering Platform

Usage:
  npx tsx tools/search-knowledge.ts <query>

Examples:
  npx tsx tools/search-knowledge.ts "autenticação"
  npx tsx tools/search-knowledge.ts "REST API"
`);
    process.exit(0);
  }

  const query = args.join(" ");
  console.log(`🔍 Searching knowledge base for: "${query}"...\n`);

  const results = searchKnowledgeBase(ROOT, query, SEARCH_DIRECTORIES);

  if (results.length === 0) {
    console.log("❌ No matches found.");
    process.exit(0);
  }

  console.log(`Found ${results.length} matching file(s):\n`);

  results.forEach(res => {
    console.log(`📄 ${res.relativePat} (Score: ${res.score})`);
    res.matches.forEach(m => {
      console.log(`  Line ${m.lineNumber}: ${m.content}`);
    });
    console.log("");
  });
}

main();
