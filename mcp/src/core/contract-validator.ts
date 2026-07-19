import { readFileSync, existsSync } from "fs";
import { join, resolve } from "path";
import AjvModule from "ajv";
import addFormatsModule from "ajv-formats";

const Ajv = (AjvModule as any).default || AjvModule;
const addFormats = (addFormatsModule as any).default || addFormatsModule;

const ajv = new Ajv({ allErrors: true, useDefaults: true });
addFormats(ajv);

interface TableRow {
  [key: string]: string;
}

function parseMarkdownTable(lines: string[]): TableRow[] {
  const tableLines = lines.filter(line => line.trim().startsWith("|"));
  if (tableLines.length < 3) return [];

  const headers = tableLines[0]
    .split("|")
    .map(h => h.trim())
    .filter(h => h !== "");

  const rows: TableRow[] = [];
  for (let i = 2; i < tableLines.length; i++) {
    const cells = tableLines[i]
      .split("|")
      .map(c => c.trim())
      .filter((_, idx) => idx > 0 && idx <= headers.length);

    const row: TableRow = {};
    headers.forEach((header, index) => {
      row[header] = cells[index] || "";
    });
    rows.push(row);
  }
  return rows;
}

function parseMarkdownList(lines: string[]): string[] {
  return lines
    .map(line => line.trim())
    .filter(line => line.startsWith("- ") || line.startsWith("* "))
    .map(line => line.substring(2).trim());
}

export function parseContractMarkdown(content: string): any {
  const lines = content.split(/\r?\n/);
  const result: any = {
    identity: {},
    description: "",
    interfaces: {
      api: [],
      events: { emits: [], consumes: [] }
    },
    dependencies: { internal: [], external: [] },
    constraints: { technical: [], business: [], security: [] },
    performance: {},
    testing: { coverage: {}, criticalScenarios: [] },
    monitoring: { metrics: [], alerts: [] }
  };

  let currentH2 = "";
  let currentH3 = "";
  let sectionLines: string[] = [];

  const flushSection = () => {
    if (sectionLines.length === 0) return;
    const h2Lower = currentH2.toLowerCase();
    const h3Lower = currentH3.toLowerCase();

    if (h2Lower.includes("identidade")) {
      const table = parseMarkdownTable(sectionLines);
      table.forEach(row => {
        const key = Object.keys(row)[0];
        const valKey = Object.keys(row)[1];
        if (key && valKey) {
          const field = row[key].toLowerCase();
          const value = row[valKey];
          if (field.includes("nome")) result.identity.name = value;
          else if (field.includes("vers") && field.includes("o")) result.identity.version = value;
          else if (field.includes("respons")) result.identity.owner = value;
          else if (field.includes("status")) {
            const statusMap: Record<string, string> = {
              "ativo": "active",
              "active": "active",
              "rascunho": "draft",
              "draft": "draft",
              "obsoleto": "deprecated",
              "deprecated": "deprecated"
            };
            result.identity.status = statusMap[value.toLowerCase()] || "draft";
          }
        }
      });
    } else if (h2Lower.includes("descri")) {
      result.description = sectionLines
        .map(l => l.trim())
        .filter(l => l !== "" && !l.startsWith(">"))
        .join(" ");
    } else if (h2Lower.includes("interface")) {
      if (h3Lower.includes("api")) {
        const codeLines: string[] = [];
        let inCode = false;
        sectionLines.forEach(l => {
          if (l.trim().startsWith("```")) inCode = !inCode;
          else if (inCode) codeLines.push(l);
        });
        const methodRegex = /(\w+)\(([^)]*)\)\s*:\s*([^;]+)/g;
        const codeText = codeLines.join("\n");
        let match;
        while ((match = methodRegex.exec(codeText)) !== null) {
          result.interfaces.api.push({
            name: match[1],
            method: "POST",
            path: `/${match[1]}`,
            description: `TypeScript interface method: ${match[1]}`,
            parameters: match[2] ? match[2].split(",").map(p => ({ name: p.trim().split(":")[0].trim(), type: p.trim().split(":")[1]?.trim() || "any" })) : [],
            returns: { type: match[3].trim() }
          });
        }
      } else if (h3Lower.includes("emitidos")) {
        const table = parseMarkdownTable(sectionLines);
        table.forEach(row => {
          const keys = Object.keys(row);
          if (keys.length >= 2) {
            result.interfaces.events.emits.push({
              name: row[keys[0]] || "",
              payload: { type: "object" },
              description: row[keys[2]] || row[keys[1]] || ""
            });
          }
        });
      } else if (h3Lower.includes("consumidos")) {
        const table = parseMarkdownTable(sectionLines);
        table.forEach(row => {
          const keys = Object.keys(row);
          if (keys.length >= 2) {
            result.interfaces.events.consumes.push({
              name: row[keys[0]] || "",
              source: row[keys[1]] || "",
              description: row[keys[2]] || ""
            });
          }
        });
      }
    } else if (h2Lower.includes("depend")) {
      if (h3Lower.includes("interno")) {
        const table = parseMarkdownTable(sectionLines);
        table.forEach(row => {
          const keys = Object.keys(row);
          if (keys.length >= 2) {
            result.dependencies.internal.push({
              module: row[keys[0]],
              version: row[keys[1]],
              required: (row[keys[2]] || "").toLowerCase().includes("sim") || (row[keys[2]] || "").toLowerCase().includes("yes") || true
            });
          }
        });
      } else if (h3Lower.includes("externo")) {
        const table = parseMarkdownTable(sectionLines);
        table.forEach(row => {
          const keys = Object.keys(row);
          if (keys.length >= 2) {
            result.dependencies.external.push({
              service: row[keys[0]],
              purpose: row[keys[1]],
              fallback: row[keys[2]] || ""
            });
          }
        });
      }
    } else if (h2Lower.includes("restri")) {
      const list = parseMarkdownList(sectionLines);
      if (h3Lower.includes("téc") || h3Lower.includes("tec")) result.constraints.technical = list;
      else if (h3Lower.includes("neg") || h3Lower.includes("bus")) result.constraints.business = list;
      else if (h3Lower.includes("seg") || h3Lower.includes("sec")) result.constraints.security = list;
    } else if (h2Lower.includes("desempenho") || h2Lower.includes("performance")) {
      const table = parseMarkdownTable(sectionLines);
      table.forEach(row => {
        const keys = Object.keys(row);
        if (keys.length >= 2) {
          const metric = row[keys[0]].toLowerCase();
          const target = row[keys[1]];
          if (metric.includes("lat")) result.performance.latency = target;
          else if (metric.includes("through") || metric.includes("vaz")) result.performance.throughput = target;
          else if (metric.includes("dispon") || metric.includes("avail")) result.performance.availability = target;
        }
      });
    } else if (h2Lower.includes("teste")) {
      if (h3Lower.includes("cobertura")) {
        const list = parseMarkdownList(sectionLines);
        list.forEach(item => {
          const parts = item.split(":");
          if (parts.length >= 2) {
            const key = parts[0].toLowerCase();
            const val = parts[1].trim();
            if (key.includes("unit")) result.testing.coverage.unit = val;
            else if (key.includes("integ")) result.testing.coverage.integration = val;
          }
        });
      } else if (h3Lower.includes("crí") || h3Lower.includes("cri")) {
        result.testing.criticalScenarios = parseMarkdownList(sectionLines);
      }
    } else if (h2Lower.includes("monitor")) {
      if (h3Lower.includes("mét") || h3Lower.includes("met")) result.monitoring.metrics = parseMarkdownList(sectionLines);
      else if (h3Lower.includes("alert")) {
        const table = parseMarkdownTable(sectionLines);
        table.forEach(row => {
          const keys = Object.keys(row);
          if (keys.length >= 2) {
            result.monitoring.alerts.push({
              metric: row[keys[0]],
              threshold: row[keys[1]],
              action: row[keys[2]] || ""
            });
          }
        });
      }
    }
    sectionLines = [];
  };

  lines.forEach(line => {
    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);
    if (h2Match) {
      flushSection();
      currentH2 = h2Match[1].trim();
      currentH3 = "";
    } else if (h3Match) {
      flushSection();
      currentH3 = h3Match[1].trim();
    } else {
      sectionLines.push(line);
    }
  });
  flushSection();
  return result;
}

export function validateContract(filePath: string, schemaPath: string): { valid: boolean; errors?: string[] } {
  if (!existsSync(filePath)) return { valid: false, errors: [`File not found: ${filePath}`] };
  if (!existsSync(schemaPath)) return { valid: false, errors: [`Schema file not found: ${schemaPath}`] };

  try {
    const mdContent = readFileSync(filePath, "utf-8");
    const contractData = parseContractMarkdown(mdContent);
    const schema = JSON.parse(readFileSync(schemaPath, "utf-8"));
    const validate = ajv.compile(schema);
    const valid = validate(contractData);

    if (valid) return { valid: true };
    return {
      valid: false,
      errors: validate.errors?.map((err: any) => `Path: ${err.instancePath} | Message: ${err.message}`) || []
    };
  } catch (error: any) {
    return { valid: false, errors: [error.message] };
  }
}
