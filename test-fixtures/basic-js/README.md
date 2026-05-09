# Basic JavaScript Fixture

Tiny app fixture used to smoke-test the Shipcheck GitHub Action.

The fixture is intentionally small, but it includes the release signals Shipcheck expects from a normal JavaScript repository:

- committed lockfile
- CI workflow
- build, lint, and test scripts
- local release-check instructions
- no committed runtime secrets

## Usage

```js
import { summarizeRelease } from "./src/index.js";

const report = summarizeRelease([{ severity: "medium" }]);
console.log(report.ready);
```

## Release Check

Run the fixture checks before release:

```bash
npm run build
npm run lint
npm test
```
