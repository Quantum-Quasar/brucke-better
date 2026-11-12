// Fast preflight for word_connections.md: collects every row-level problem
// instead of stopping at the first one, and writes nothing.
// The same checks run inside `bun run test` via src/tests/compendium.test.ts.
// Run: bun run check:compendium   (or: bun scripts/check-compendium.ts)

import fs from "fs";
import path from "path";
import { analyzeCompendium } from "./parse-compendium";

const mdPath = path.resolve(__dirname, "../word_connections.md");
const { compendium, issues } = analyzeCompendium(fs.readFileSync(mdPath, "utf-8"));

if (compendium && issues.length === 0) {
  console.log(
    `✓ word_connections.md parses: ${Object.keys(compendium.words).length} words, ` +
      `${compendium.compounds.length} compounds, ${compendium.falseFriends.length} false friends, ` +
      `${compendium.dailyInsights.length} insights`
  );
  process.exit(0);
}

for (const issue of issues) console.log(`✗ word_connections.md:${issue.line}: ${issue.message}`);
console.log(`\n${issues.length} issue(s). Nothing was written.`);
process.exit(1);
