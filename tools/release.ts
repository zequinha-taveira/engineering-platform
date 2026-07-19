import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, join } from "path";
import { execSync } from "child_process";

const ROOT = resolve(import.meta.dirname, "..");

function main() {
  const args = process.argv.slice(2);
  const bumpType = args[0] || "patch";

  if (args[0] === "--help" || !["major", "minor", "patch"].includes(bumpType)) {
    console.log(`
Release Automation — Engineering Platform

Usage:
  npx tsx tools/release.ts [major|minor|patch]

Examples:
  npx tsx tools/release.ts patch
`);
    process.exit(0);
  }

  console.log("=== Starting Release Process ===");

  try {
    // 1. Run validation
    console.log("Running validation...");
    execSync("npx tsx tools/validate-all.ts", { stdio: "inherit", cwd: ROOT });

    // 2. Run tests
    console.log("\nRunning unit tests...");
    execSync("npm run test", { stdio: "inherit", cwd: ROOT });

    // 3. Rebuild
    console.log("\nBuilding package...");
    execSync("npm run build", { stdio: "inherit", cwd: ROOT });

    // 4. Bump version in package.json
    console.log(`\nBumping version (${bumpType})...`);
    const pkgPath = join(ROOT, "package.json");
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
    const currentVersion = pkg.version;
    const parts = currentVersion.split(".").map((x: string) => parseInt(x, 10));

    if (bumpType === "major") {
      parts[0] += 1;
      parts[1] = 0;
      parts[2] = 0;
    } else if (bumpType === "minor") {
      parts[1] += 1;
      parts[2] = 0;
    } else {
      parts[2] += 1;
    }

    const newVersion = parts.join(".");
    pkg.version = newVersion;
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf-8");

    console.log(`✅ Version bumped from ${currentVersion} to ${newVersion}.`);
    console.log(`\n🎉 Release process finished. Ready to git commit and publish.`);
    process.exit(0);
  } catch (error: any) {
    console.error(`\n❌ Release process failed: ${error.message}`);
    process.exit(1);
  }
}

main();
