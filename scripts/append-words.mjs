// Batch-append verified vocabulary records to §2 of word_connections.md.
// Usage: bun scripts/append-words.mjs /tmp/etym/family.json /tmp/etym/food.json ...
// Each JSON file = array of records {german, english, gender, ipa, shifts,
// context_phrase, context_translation, derivation, sense?}. Domain comes from the
// file name. "sense" ("noun" | "verb" | "adj" | "adv") teaches a second sense of a
// headword already in §2: it writes "Essen#noun", whose id is essen#noun.
//
// The batch is re-parsed in memory before anything is written, so a bad record
// aborts the run with its source line and leaves the markdown on disk untouched.
import fs from "fs";
import path from "path";
import { analyzeCompendium } from "./parse-compendium.ts";
import { parseWordIdCell, WORD_ID_SUFFIXES } from "../src/lib/word-id.ts";

const mdPath = path.resolve(process.cwd(), "word_connections.md");
const content = fs.readFileSync(mdPath, "utf-8");
const section2 = content.match(/## 2\. Exhaustive Core Vocabulary Dictionary \(All \d+ Words\)([\s\S]*?)## 3\./);
if (!section2) throw new Error("§2 not found");

const existing = new Map();
const bases = new Map();
let maxRow = 0;
for (const line of section2[1].split("\n")) {
  const match = line.match(/^\|\s*(\d+)\s*\|\s*\*\*(.+?)\*\*/);
  if (!match) continue;
  const parsed = parseWordIdCell(match[2]);
  if (!parsed.ok) throw new Error(`§2 row ${match[1]}: ${parsed.problem}`);
  const id = `${parsed.headword.toLowerCase()}${parsed.suffix ? `#${parsed.suffix}` : ""}`;
  existing.set(id, Number(match[1]));
  const siblings = bases.get(parsed.headword.toLowerCase()) ?? new Set();
  siblings.add(id);
  bases.set(parsed.headword.toLowerCase(), siblings);
  maxRow = Math.max(maxRow, Number(match[1]));
}

const problems = [];
const skipped = [];
const unverified = [];
const appended = [];
let nextRow = maxRow + 1;

for (const filePath of process.argv.slice(2)) {
  const domain = path.basename(filePath, ".json");
  const records = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  for (const record of records) {
    const base = String(record.german).toLowerCase();
    const sense = record.sense;
    const name = `${record.german} (${domain})`;
    if (sense !== undefined && !WORD_ID_SUFFIXES.includes(sense)) {
      problems.push(`${name}: unknown sense "${sense}" — expected ${WORD_ID_SUFFIXES.join(", ")}`);
      continue;
    }
    const id = sense ? `${base}#${sense}` : base;
    if (existing.has(id)) {
      skipped.push(`${name} — ${id} already in §2 at row ${existing.get(id)}`);
      continue;
    }
    const taken = [...(bases.get(base) ?? [])];
    if (taken.length > 0 && !sense) {
      problems.push(`${name}: "${base}" already exists in §2 as ${taken.join(", ")} — add a "sense" to teach another one`);
      continue;
    }
    if (record.verdict === "UNVERIFIED") unverified.push(`${name} — verdict UNVERIFIED`);
    if (typeof record.derivation !== "string" || !record.derivation.includes("[wiktionary]")) {
      unverified.push(`${name} — missing [wiktionary] tag`);
    }
    const shiftsCell = Array.isArray(record.shifts)
      ? record.shifts.map((shift) => `\`${shift}\``).join(", ")
      : `\`${record.shifts}\``;
    const cell = sense ? `${record.german}#${sense}` : record.german;
    appended.push(
      `| ${nextRow} | **${cell}** | ${record.english} | ${record.gender} | ${record.ipa} | ${shiftsCell} | ` +
        `${record.context_phrase} *("${record.context_translation}")* | ${record.derivation} | ${domain} |`
    );
    existing.set(id, nextRow);
    if (taken.length === 0) bases.set(base, new Set([id]));
    else bases.get(base).add(id);
    nextRow++;
  }
}

if (problems.length > 0) {
  console.error(`Refusing to append: ${problems.length} problem(s)\n - ${problems.join("\n - ")}`);
  process.exit(1);
}

if (appended.length === 0) {
  console.log("No rows to append.");
  if (skipped.length) console.log("Skipped:\n - " + skipped.join("\n - "));
  process.exit(0);
}

const insertAnchor = content.indexOf("## 3.");
if (insertAnchor === -1) throw new Error("§3 anchor not found");
const separator = content.slice(0, insertAnchor).lastIndexOf("---");
if (separator === -1) throw new Error("§2 terminator not found");

const block = appended.join("\n") + "\n\n";
let updated = content.slice(0, separator) + block + content.slice(separator);
const header = new RegExp("(## 2\\. Exhaustive Core Vocabulary Dictionary \\(All )\\d+( Words\\))");
if (!header.test(updated)) throw new Error("§2 header not found");
updated = updated.replace(header, `$1${nextRow - 1}$2`);
// The document's own inventory bullet is a second, hand-written count.
const inventory = /(> - \*\*)\d+(\*\* Core Vocabulary Words)/;
if (inventory.test(updated)) updated = updated.replace(inventory, `$1${nextRow - 1}$2`);

const { issues } = analyzeCompendium(updated);
if (issues.length > 0) {
  console.error(`Refusing to write: ${issues.length} issue(s)`);
  for (const issue of issues) console.error(` - word_connections.md:${issue.line}: ${issue.message}`);
  process.exit(1);
}

fs.writeFileSync(mdPath, updated, "utf-8");
console.log(`Appended ${appended.length} rows (${maxRow + 1}-${nextRow - 1}); §2 inventory now ${nextRow - 1} words.`);
if (skipped.length) console.log("Skipped:\n - " + skipped.join("\n - "));
if (unverified.length) console.log("UNVERIFIED flags:\n - " + unverified.join("\n - "));
