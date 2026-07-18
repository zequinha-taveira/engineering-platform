# Engineering Platform

> AI-Assisted Software Engineering Platform — a document-driven platform for AI agent collaboration.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/zequinha-taveira/engineering-platform.git
cd engineering-platform

# Install dependencies
npm install

# Build the MCP server
npm run build

# Run tests
npm run test

# Start MCP server (stdio transport)
npm start
```

## What Is This?

The Engineering Platform provides:

- **Standards** — coding, API, testing, documentation, security guidelines
- **Templates** — reusable specification, plan, contract, and ADR templates
- **Agents** — 8 specialized AI agent personas (planner, architect, developer, reviewer, security, QA, DevOps, documentation)
- **Prompts** — structured prompt templates and examples for AI collaboration
- **Contracts** — interface contracts with JSON Schema validation
- **Knowledge Base** — glossary, patterns, and Architecture Decision Records
- **Architecture** — system design docs and ADRs
- **MCP Server** — Model Context Protocol server exposing platform data via tools and resources
- **Automation** — validation and doc generation scripts
- **Playbooks** — step-by-step guides for development, review, and release workflows

## Project Structure

```
engineering-platform/
├── architecture/       # System architecture docs and ADRs
├── automation/         # Validation and doc generation scripts
├── contracts/          # Interface contracts and JSON Schema
├── constitution/       # Core principles and governance
├── docs/               # User-facing documentation
├── knowledge/          # Glossary, patterns, decisions
├── mcp/                # MCP Server (TypeScript)
├── playbooks/          # Operational workflow guides
├── prompts/            # Prompt templates and examples
├── security/           # Security checklists
├── standards/          # Coding, API, testing, docs, security standards
├── specifications/     # Feature specifications
├── templates/          # Reusable document templates
└── tests/              # Test suite
```

## MCP Server

The MCP server exposes 8 resources and 5 tools:

| Resource | Description |
|----------|-------------|
| `platform://architecture` | System architecture documentation |
| `platform://constitution` | Core principles |
| `platform://standards` | Technical standards |
| `platform://specifications` | Feature specifications |
| `platform://contracts` | Interface contracts |
| `platform://prompts` | Prompt templates |
| `platform://agents` | Agent catalog |
| `platform://knowledge` | Knowledge base |

| Tool | Description |
|------|-------------|
| `create_spec` | Create a new specification |
| `create_plan` | Create a development plan |
| `generate_prompt` | Generate a prompt from a template |
| `review_code` | Review code against standards |
| `validate_project` | Validate project structure |

## Development

```bash
npm run build        # Compile TypeScript
npm run test         # Run test suite (51 tests)
npm run typecheck    # Type-check without emitting
```

## License

MIT
