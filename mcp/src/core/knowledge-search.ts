import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import { join } from "path";

interface SearchResult {
  filePath: string;
  relativePat: string;
  score: number;
  matches: { lineNumber: number; content: string }[];
}

function getAllMarkdownFiles(dirPath: string): string[] {
  let results: string[] = [];
  if (!existsSync(dirPath)) return results;

  const list = readdirSync(dirPath);
  list.forEach(file => {
    const fullPath = join(dirPath, file);
    const stat = statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(fullPath));
    } else if (file.endsWith(".md")) {
      results.push(fullPath);
    }
  });
  return results;
}

export function searchKnowledgeBase(rootDir: string, query: string, targetDirs: string[]): SearchResult[] {
  const lowercaseQuery = query.toLowerCase();
  const searchResults: SearchResult[] = [];

  const absoluteTargetDirs = targetDirs.map(dir => join(rootDir, dir));
  let allFiles: string[] = [];
  absoluteTargetDirs.forEach(dir => {
    allFiles = allFiles.concat(getAllMarkdownFiles(dir));
  });

  allFiles.forEach(filePath => {
    try {
      const content = readFileSync(filePath, "utf-8");
      const lines = content.split(/\r?\n/);
      let score = 0;
      const fileMatches: { lineNumber: number; content: string }[] = [];

      const relativePat = filePath.replace(rootDir + "\\", "").replace(rootDir + "/", "");
      if (relativePat.toLowerCase().includes(lowercaseQuery)) {
        score += 10;
      }

      lines.forEach((line, idx) => {
        if (line.toLowerCase().includes(lowercaseQuery)) {
          score += 1;
          if (fileMatches.length < 5) {
            fileMatches.push({ lineNumber: idx + 1, content: line.trim() });
          }
        }
      });

      if (score > 0) {
        searchResults.push({
          filePath,
          relativePat,
          score,
          matches: fileMatches
        });
      }
    } catch (e: any) {
      // ignore
    }
  });

  return searchResults.sort((a, b) => b.score - a.score);
}
