import { readFileSync } from "fs";

export class TemplateEngine {
  static render(template: string, variables: Record<string, string>): string {
    let result = template;
    Object.entries(variables).forEach(([key, value]) => {
      const escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const regexBracket = new RegExp(`\\[${escapedKey}\\]`, "g");
      const regexCurly = new RegExp(`\\{\\{${escapedKey}\\}\\}`, "g");
      
      result = result.replace(regexBracket, value);
      result = result.replace(regexCurly, value);
    });
    return result;
  }

  static renderFile(filePath: string, variables: Record<string, string>): string {
    const templateContent = readFileSync(filePath, "utf-8");
    return this.render(templateContent, variables);
  }

  static detectPlaceholders(template: string): string[] {
    const placeholders = new Set<string>();
    const bracketRegex = /\[([A-Z0-9_/]+(?:\s+[A-Z0-9_/]+)*)\]/g;
    let match;
    while ((match = bracketRegex.exec(template)) !== null) {
      if (match[1]) placeholders.add(match[1]);
    }
    const curlyRegex = /\{\{([a-zA-Z0-9_-]+)\}\}/g;
    while ((match = curlyRegex.exec(template)) !== null) {
      if (match[1]) placeholders.add(match[1]);
    }
    return Array.from(placeholders);
  }
}
