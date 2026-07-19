export interface ReviewIssue {
  ruleId: string;
  severity: "error" | "warning" | "info";
  message: string;
  line?: number;
  snippet?: string;
}

export interface ReviewReport {
  valid: boolean;
  score: number; // 0 to 100
  issues: ReviewIssue[];
}

export function reviewCodeSnippet(code: string, language: string = "typescript"): ReviewReport {
  const issues: ReviewIssue[] = [];
  const lines = code.split(/\r?\n/);

  // SEC-01: Secrets detection
  const secretKeywords = [
    /password\s*[:=]\s*['"`][^'"`]+['"`]/i,
    /secret\s*[:=]\s*['"`][^'"`]+['"`]/i,
    /api[-_]?key\s*[:=]\s*['"`][^'"`]+['"`]/i,
    /token\s*[:=]\s*['"`][^'"`]+['"`]/i
  ];

  lines.forEach((line, idx) => {
    // 1. Secrets check
    secretKeywords.forEach(regex => {
      if (regex.test(line)) {
        issues.push({
          ruleId: "SEC-01",
          severity: "error",
          message: "Potential hardcoded secret or credential detected.",
          line: idx + 1,
          snippet: line.trim()
        });
      }
    });

    // 2. Try/Catch silent checks (CODE-02)
    if (line.includes("catch") && line.includes("{")) {
      // Look at the next few lines for empty block or no logs/rethrow
      let blockContent = "";
      for (let j = 1; j <= 3; j++) {
        if (lines[idx + j]) blockContent += lines[idx + j];
      }
      if (blockContent.trim() === "" || blockContent.trim() === "}" || (!blockContent.includes("throw") && !blockContent.includes("logger") && !blockContent.includes("console"))) {
        issues.push({
          ruleId: "CODE-02",
          severity: "error",
          message: "Silent or empty catch block detected. All errors must be logged or rethrown.",
          line: idx + 1,
          snippet: line.trim()
        });
      }
    }

    // 3. Simple Result pattern suggestion (CODE-03)
    if (line.includes("throw new Error(")) {
      issues.push({
        ruleId: "CODE-03",
        severity: "warning",
        message: "Consider using the Result pattern (ok/fail) instead of throwing plain Errors.",
        line: idx + 1,
        snippet: line.trim()
      });
    }

    // 4. Maximum parameters check (CODE-04)
    const funcMatch = line.match(/(?:function\s+\w+|const\s+\w+\s*=\s*(?:\([^)]*\)|[^=]+)\s*=>|\w+\s*\([^)]*\)\s*\{)/);
    if (funcMatch) {
      const paramsPart = line.substring(line.indexOf("(") + 1, line.indexOf(")"));
      if (paramsPart) {
        const paramsCount = paramsPart.split(",").map(p => p.trim()).filter(p => p !== "").length;
        if (paramsCount > 3) {
          issues.push({
            ruleId: "CODE-04",
            severity: "warning",
            message: `Function has ${paramsCount} parameters. Maximum allowed by standard is 3. Consider destructuring or options object.`,
            line: idx + 1,
            snippet: line.trim()
          });
        }
      }
    }
  });

  // Check function line length (approximate block length)
  // Let's count maximum consecutive lines between braces (simplistic function length)
  let consecutiveLines = 0;
  let inBraces = false;
  lines.forEach((line, idx) => {
    if (line.includes("{")) {
      inBraces = true;
      consecutiveLines = 0;
    }
    if (inBraces) {
      consecutiveLines++;
      if (consecutiveLines > 30) {
        // Warning if block exceeds 30 lines
        issues.push({
          ruleId: "CODE-05",
          severity: "warning",
          message: `Code block exceeds 30 lines. Consider splitting into smaller functions.`,
          line: idx + 1
        });
        inBraces = false;
      }
    }
    if (line.includes("}")) {
      inBraces = false;
    }
  });

  const errorsCount = issues.filter(i => i.severity === "error").length;
  const warningsCount = issues.filter(i => i.severity === "warning").length;
  
  // Calculate score
  let score = 100 - (errorsCount * 15) - (warningsCount * 5);
  if (score < 0) score = 0;

  return {
    valid: errorsCount === 0,
    score,
    issues
  };
}
