# Shipcheck Repo Scanner

[![npm version](https://img.shields.io/npm/v/shipcheck-cli.svg)](https://www.npmjs.com/package/shipcheck-cli)

GitHub Action wrapper for [shipcheck-cli](https://www.npmjs.com/package/shipcheck-cli), a release-readiness and app exposure scanner for JavaScript, TypeScript, package, and MCP repositories.

Shipcheck checks common pre-launch risks in modern full-stack apps and developer tools: exposed private-looking env vars, hardcoded provider keys, unsigned Stripe webhooks, missing Firebase/Supabase rule evidence, debug routes, missing usage guardrails, missing CI, loose dependency versions, thin release docs, missing MCP smoke-test proof, and unclear remote-server auth boundaries.

## Usage

```yaml
name: shipcheck

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  shipcheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: TateLyman/shipcheck-action@v1
        with:
          fail-on: medium
          strict: true
```

## Inputs

| Input | Default | Description |
| --- | --- | --- |
| `path` | `.` | Repository path to scan. |
| `format` | `text` | Output format: `text`, `markdown`, `json`, or `sarif`. |
| `output` | empty | Optional file path to write the report, such as `shipcheck.sarif`. |
| `fail-on` | `high` | Lowest severity that fails the workflow: `info`, `low`, `medium`, or `high`. |
| `strict` | `false` | Set to `true` for stricter release-readiness checks. |
| `version` | `latest` | npm version of `shipcheck-cli` to run. |

## Verification

This repository runs the Marketplace action against a small fixture on every push and pull request, including a SARIF output check. The fixture keeps the public action wrapper tested without requiring users to install anything beyond the workflow step.

## GitHub Code Scanning

Use SARIF output when you want Shipcheck findings to appear in GitHub's code scanning UI:

```yaml
permissions:
  contents: read
  security-events: write

jobs:
  shipcheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: TateLyman/shipcheck-action@v1
        with:
          format: sarif
          output: shipcheck.sarif
          fail-on: medium
          strict: true
      - uses: github/codeql-action/upload-sarif@v4
        if: always()
        with:
          sarif_file: shipcheck.sarif
```

## Manual Review

Shipcheck is a defensive static scanner, not a penetration test. Run it only on repositories you own or are authorized to inspect.

If the report finds blockers in an app you own, manual app-rescue reviews are available from the tool page:

https://tateprograms.com/shipcheck.html

For action support and vulnerability reporting, see:

- https://github.com/TateLyman/shipcheck-action/blob/main/SUPPORT.md
- https://github.com/TateLyman/shipcheck-action/blob/main/SECURITY.md

## Links

- npm: https://www.npmjs.com/package/shipcheck-cli
- CLI repo: https://github.com/TateLyman/shipcheck-cli
- Tool page: https://tateprograms.com/shipcheck.html
