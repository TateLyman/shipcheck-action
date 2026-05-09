export function summarizeRelease(findings) {
  const total = findings.length;
  const high = findings.filter((finding) => finding.severity === "high").length;
  return { total, high, ready: high === 0 };
}
