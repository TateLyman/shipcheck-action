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
| `format` | `text` | Output format: `text`, `markdown`, or `json`. |
| `fail-on` | `high` | Lowest severity that fails the workflow: `info`, `low`, `medium`, or `high`. |
| `strict` | `false` | Set to `true` for stricter release-readiness checks. |
| `version` | `latest` | npm version of `shipcheck-cli` to run. |

## Manual Review

Shipcheck is a defensive static scanner, not a penetration test. Run it only on repositories you own or are authorized to inspect.

If the report finds blockers in an app you own, manual app-rescue reviews are available from the tool page:

https://tatelyman.github.io/tate-web-services/shipcheck.html

## Links

- npm: https://www.npmjs.com/package/shipcheck-cli
- CLI repo: https://github.com/TateLyman/shipcheck-cli
- Tool page: https://tatelyman.github.io/tate-web-services/shipcheck.html
