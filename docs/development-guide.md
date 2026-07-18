# Development Guide

## Workflow

1. **Read the specification** — understand what needs to be built
2. **Create a plan** — break work into phases
3. **Implement** — write code following standards
4. **Review** — self-review against standards
5. **Test** — run tests and validate
6. **Document** — update docs as needed

## Branch Strategy

- `main` — production-ready code
- Feature branches: `feat/<name>`, `fix/<name>`, `chore/<name>`

## Conventional Commits

```
feat(scope): add new feature
fix(scope): resolve bug
docs(scope): update documentation
chore(scope): maintenance tasks
test(scope): add or update tests
```

## Code Standards

Refer to `standards/coding.md` for full details. Key rules:

- TypeScript strict mode
- No `any` types
- Functions under 50 lines
- Max file size 500 lines

## Testing

```bash
npm run test                    # Run all tests
npm run test -- --watch         # Watch mode
```

Tests live in `tests/`. Use vitest with `describe`/`it` blocks.

## Adding a New Agent

1. Create `agents/<name>.md` following the template
2. Update `agents/README.md` index
3. Add tests in `tests/mcp-server.test.ts`

## Adding a New Standard

1. Create `standards/<name>.md`
2. Update `standards/README.md`
3. Reference in relevant templates

## MCP Server Development

The MCP server is in `mcp/src/index.ts`. To add:

- **New resource**: add to `ListResourcesRequestSchema` handler and map in `ReadResourceRequestSchema`
- **New tool**: add to `ListToolsRequestSchema` handler and handle in `CallToolRequestSchema`

```bash
npm run build    # Rebuild after changes
npm run test     # Verify tests pass
```

## PR Checklist

- [ ] Tests pass (`npm run test`)
- [ ] TypeScript compiles (`npm run build`)
- [ ] Follows conventional commits
- [ ] Docs updated if needed
- [ ] No secrets or keys committed
