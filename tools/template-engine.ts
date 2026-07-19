import { readFileSync } from "fs";

/**
 * Robust template engine to interpolate placeholders in template files.
 * Supports both [PLACEHOLDER] and {{PLACEHOLDER}} style variables.
 */
export class TemplateEngine {
  /**
   * Render a template string with given variables.
   *
   * @param template The template content string
   * @param variables Key-value pairs of variable names and their replacements
   */
  static render(template: string, variables: Record<string, string>): string {
    let result = template;

    // Replace {{PLACEHOLDER}} format
    Object.entries(variables).forEach(([key, value]) => {
      const escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const regexBracket = new RegExp(`\\[${escapedKey}\\]`, "g");
      const regexCurly = new RegExp(`\\{\\{${escapedKey}\\}\\}`, "g");
      
      result = result.replace(regexBracket, value);
      result = result.replace(regexCurly, value);
    });

    return result;
  }

  /**
   * Render a template file from the filesystem.
   *
   * @param filePath Path to the template file
   * @param variables Key-value pairs of variable names and their replacements
   */
  static renderFile(filePath: string, variables: Record<string, string>): string {
    const templateContent = readFileSync(filePath, "utf-8");
    return this.render(templateContent, variables);
  }

  /**
   * Detects all placeholders in a template string.
   * Returns placeholders without the surrounding brackets/braces.
   */
  static detectPlaceholders(template: string): string[] {
    const placeholders = new Set<string>();
    
    // Find [VARIABLE]
    const bracketRegex = /\[([A-Z0-9_/]+(?:\s+[A-Z0-9_/]+)*)\]/g;
    let match;
    while ((match = bracketRegex.exec(template)) !== null) {
      if (match[1]) {
        placeholders.add(match[1]);
      }
    }

    // Find {{variable}}
    const curlyRegex = /\{\{([a-zA-Z0-9_-]+)\}\}/g;
    while ((match = curlyRegex.exec(template)) !== null) {
      if (match[1]) {
        placeholders.add(match[1]);
      }
    }

    return Array.from(placeholders);
  }
}
