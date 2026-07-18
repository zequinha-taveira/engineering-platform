# Security Checklist

## Pre-Commit

- [ ] No secrets, API keys, or tokens in code
- [ ] No hardcoded passwords or credentials
- [ ] No `.env` files committed
- [ ] Sensitive data not logged
- [ ] Input validation present on all external inputs

## Dependencies

- [ ] No known critical vulnerabilities (`npm audit`)
- [ ] Dependencies from trusted sources only
- [ ] Lock file (`package-lock.json`) committed
- [ ] Regular dependency updates scheduled

## Code Review

- [ ] No SQL injection vectors
- [ ] No XSS vulnerabilities
- [ ] No path traversal risks
- [ ] No unsafe deserialization
- [ ] Proper error handling (no stack traces exposed)

## MCP Server

- [ ] No sensitive data exposed via resources
- [ ] Tool inputs validated before use
- [ ] File system access restricted to project root
- [ ] No arbitrary code execution via tools

## Data Handling

- [ ] PII not stored in plaintext
- [ ] Data classification applied
- [ ] Retention policies documented
- [ ] Encryption at rest and in transit

## Compliance

- [ ] MIT license applied
- [ ] No proprietary code included without permission
- [ ] Attribution for third-party code
- [ ] GDPR considerations documented (if applicable)

## Operational

- [ ] No production credentials in repository
- [ ] CI/CD secrets stored in vault
- [ ] Access logs reviewed regularly
- [ ] Incident response contacts documented
