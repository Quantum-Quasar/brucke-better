// Refresh: bun scripts/generate-english-hook-words.ts
// Writes the committed list of English words a lesson hook may name as a known
// twin. The source is the same pinned FrequencyWords revision the course ranks
// come from, so no new corpus or dependency enters the repo, and no network call
// happens in ordinary builds — only in this script.
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseFrequencySource } from "./lib/frequency-source";
import {
  ENGLISH_FREQUENCY_CHECKSUM,
  ENGLISH_HOOK_WORD_LIMIT,
  FREQUENCY_REVISION,
  englishFrequencySourceUrl,
} from "./lib/frequency-manifest";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
if (args.length) throw new Error(`Unknown argument: ${args[0]}`);

const url = englishFrequencySourceUrl();
const response = await fetch(url);
if (!response.ok) throw new Error(`English frequency source: HTTP ${response.status}`);
const bytes = new Uint8Array(await response.arrayBuffer());
const checksum = createHash("sha256").update(bytes).digest("hex");
if (checksum !== ENGLISH_FREQUENCY_CHECKSUM) throw new Error("English frequency source: checksum mismatch");

const source = parseFrequencySource(new TextDecoder().decode(bytes));
if (Object.keys(source).length !== 50_000) throw new Error("English frequency source: expected 50,000 unique forms");
const ranked = Object.entries(source).filter(([, rank]) => rank <= ENGLISH_HOOK_WORD_LIMIT);
/** Subtitle tokenization leaves forms like `'all`, `'d` and `1945`; no twin is ever one of those. */
const words = ranked
  .map(([form]) => form)
  .filter((form) => /^[a-z][a-z'-]*$/.test(form))
  .sort();
if (words.length !== new Set(words).size) throw new Error("English hook words: duplicate forms");
const dropped = ranked.length - words.length;

const output = {
  title: `English hook words: the plain words inside the top ${ENGLISH_HOOK_WORD_LIMIT} subtitle forms`,
  attribution: "Hermit Dave, FrequencyWords; generated from the OPUS OpenSubtitles 2018 tokenized corpus.",
  source: url,
  sourceReadme: `https://github.com/hermitdave/FrequencyWords/blob/${FREQUENCY_REVISION}/README.md`,
  corpus: "https://opus.nlpl.eu/OpenSubtitles.php",
  revision: FREQUENCY_REVISION,
  checksum,
  license: "CC-BY-SA-4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  notice: "The source content and this derived word list are licensed under CC BY-SA 4.0, provided without warranties. No endorsement is implied.",
  modifications: `Kept only the first ${ENGLISH_HOOK_WORD_LIMIT} ranked surface forms, then dropped ${dropped} that are not plain words (leading-apostrophe, numeric and punctuation forms); lowercased, NFC-normalized and sorted for a stable diff. Counts and ranks omitted.`,
  limits: `A rank is the position in the 50,000-form English subtitle list, not a general-language vocabulary. Subtitle dialogue, names and spelling affect it. The list is intentionally conservative: a form outside the top ${ENGLISH_HOOK_WORD_LIMIT} is not assumed known to a learner, so that twin belongs in a derivation or footnote instead of a hook.`,
  generatedBy: "bun scripts/generate-english-hook-words.ts",
  limit: ENGLISH_HOOK_WORD_LIMIT,
  words,
};

fs.writeFileSync(path.join(root, "src/data/english-hook-words.json"), `${JSON.stringify(output, null, 2)}\n`);
console.log(`${words.length} hook words written (${dropped} non-word forms dropped); checksum ${checksum.slice(0, 12)}…`);
