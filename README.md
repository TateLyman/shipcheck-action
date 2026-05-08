# Shipcheck AI App Scanner

GitHub Action wrapper for [shipcheck-cli](https://www.npmjs.com/package/shipcheck-cli), a release-readiness and AI-app exposure scanner for JavaScript and TypeScript repositories.

Marketplace listing: https://github.com/marketplace/actions/shipcheck-ai-app-scanner

Shipcheck checks common pre-launch risks in AI-built apps: exposed private-looking env vars, hardcoded provider keys, unsigned Stripe webhooks, missing Firebase/Supabase rule evidence, debug routes, missing AI usage guardrails, missing CI, loose dependency versions, and thin release docs.

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

Demo repo with uploaded code scanning alerts:

https://github.com/TateLyman/shipcheck-demo-ai-app

## Manual Review

Shipcheck is a defensive static scanner, not a penetration test. Run it only on repositories you own or are authorized to inspect.

If the report finds blockers in an app you own, manual app-rescue reviews are available from the tool page:

https://tatelyman.github.io/tate-web-services/shipcheck.html

For action support and vulnerability reporting, see:

- https://github.com/TateLyman/shipcheck-action/blob/main/SUPPORT.md
- https://github.com/TateLyman/shipcheck-action/blob/main/SECURITY.md

## Links

- npm: https://www.npmjs.com/package/shipcheck-cli
- CLI repo: https://github.com/TateLyman/shipcheck-cli
- Tool page: https://tatelyman.github.io/tate-web-services/shipcheck.html
