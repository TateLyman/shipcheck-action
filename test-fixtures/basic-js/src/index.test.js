import assert from "node:assert/strict";
import { summarizeRelease } from "./index.js";

assert.deepEqual(
  summarizeRelease([
    { severity: "medium" },
    { severity: "low" }
  ]),
  { total: 2, high: 0, ready: true }
);

assert.equal(summarizeRelease([{ severity: "high" }]).ready, false);
