import { existsSync, readdirSync } from "fs";
import { join } from "path";

const REQUIRED_DIRECTORIES = [
  "constitution",
  "standards",
  "architecture",
  "specifications",
  "contracts",
  "prompts",
  "agents",
  "templates",
  "knowledge",
  "playbooks",
  "automation",
  "mcp",
  "docs",
  "examples",
  "schemas",
  "tools",
  "tests"
];

const REQUIRED_FILES = [
  "README.md",
  "package.json",
  "tsconfig.json",
  "vitest.config.ts",
  "constitution/README.md",
  "standards/api.md",
  "standards/coding.md",
  "standards/documentation.md",
  "standards/security.md",
  "standards/testing.md",
  "contracts/schema.json",
  "templates/adr.md",
  "templates/contract.md",
  "templates/plan.md",
  "templates/specification.md"
];

export interface ValidationReport {
  valid: boolean;
  missingDirectories: string[];
  missingFiles: string[];
  errors: string[];
}

export function validateProjectStructure(rootDir: string): ValidationReport {
  const missingDirectories: string[] = [];
  const missingFiles: string[] = [];
  const errors: string[] = [];

  // Check directories
  REQUIRED_DIRECTORIES.forEach(dir => {
    const dirPath = join(rootDir, dir);
    if (!existsSync(dirPath)) {
      missingDirectories.push(dir);
      errors.push(`Directory missing: ${dir}/`);
    }
  });

  // Check files
  REQUIRED_FILES.forEach(file => {
    const filePath = join(rootDir, file);
    if (!existsSync(filePath)) {
      missingFiles.push(file);
      errors.push(`File missing: ${file}`);
    }
  });

  const valid = missingDirectories.length === 0 && missingFiles.length === 0;

  return {
    valid,
    missingDirectories,
    missingFiles,
    errors
  };
}
