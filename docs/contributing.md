# Contributing Guide

## Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes
4. Run tests: `npm run test`
5. Commit using conventional commits
6. Push and open a Pull Request

## Development Setup

```bash
git clone https://github.com/<your-fork>/engineering-platform.git
cd engineering-platform
npm install
npm run build
npm run test
```

## Code Style

- TypeScript strict mode
- Prefer named exports
- Use `readonly` for immutable data
- No `any` types — use `unknown` if type is unclear
- Max function length: 50 lines
- Max file length: 500 lines

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(prompts): add code review template
fix(mcp): handle missing resource gracefully
docs(readme): update quick start section
test(contracts): add schema validation tests
```

## Pull Request Process

1. Ensure all tests pass
2. Update documentation if behavior changes
3. Add tests for new functionality
4. Request review from appropriate agent (see `agents/`)
5. Address feedback promptly

## Reporting Issues

Open an issue with:

- Clear title and description
- Steps to reproduce (if bug)
- Expected vs actual behavior
- Relevant logs or screenshots

## Architecture Decisions

For significant design changes, create an ADR in `architecture/decisions/` using the template at `templates/adr.md`.
