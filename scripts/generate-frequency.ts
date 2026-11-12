// Refresh: bun scripts/generate-frequency.ts
// Author report: bun scripts/generate-frequency.ts --suggestions=words.json --language=de
// Candidate JSON: [{ "target_word": "Wasser" }, { "target_word": "trinken" }]
// Reports use the full pinned corpus in memory; only app vocabulary is persisted.
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { compendium as de } from "../src/data/compendium";
import { frenchCompendium as fr } from "../src/data/french/compendium-fr";
import { spanishCompendium as es } from "../src/data/spanish/compendium-es";
import { dutchCompendium as nl } from "../src/data/dutch/compendium-nl";
import { orderVocabularySuggestions } from "../src/lib/frequency";
import { appFrequencyForms, compactFrequencyRanks, parseFrequencySource } from "./lib/frequency-source";
import { FREQUENCY_CHECKSUMS, FREQUENCY_LANGUAGES, FREQUENCY_REVISION, frequencySourceUrl } from "./lib/frequency-manifest";
import type { FrequencyLanguage } from "./lib/frequency-manifest";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const compendiums = { de, fr, es, nl };
const args = process.argv.slice(2);
const suggestionsPath = args.find((arg) => arg.startsWith("--suggestions="))?.slice("--suggestions=".length);
const language = args.find((arg) => arg.startsWith("--language="))?.slice("--language=".length) ?? "de";
if (!FREQUENCY_LANGUAGES.includes(language as FrequencyLanguage)) throw new Error(`Unknown language: ${language}`);
for (const arg of args) {
  if (!arg.startsWith("--suggestions=") && !arg.startsWith("--language=")) throw new Error(`Unknown argument: ${arg}`);
}

const output: Record<string, Record<string, number | null>> = {};
for (const lang of suggestionsPath ? [language as FrequencyLanguage] : FREQUENCY_LANGUAGES) {
  const response = await fetch(frequencySourceUrl(lang));
  if (!response.ok) throw new Error(`Frequency source ${lang}: HTTP ${response.status}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  const checksum = createHash("sha256").update(bytes).digest("hex");
  if (checksum !== FREQUENCY_CHECKSUMS[lang]) throw new Error(`Frequency source ${lang}: checksum mismatch`);
  const source = parseFrequencySource(new TextDecoder().decode(bytes));
  if (Object.keys(source).length !== 50_000) throw new Error(`Frequency source ${lang}: expected 50,000 unique forms`);
  if (suggestionsPath) {
    const candidates: unknown = JSON.parse(fs.readFileSync(suggestionsPath, "utf8"));
    if (!Array.isArray(candidates) || !candidates.every((candidate) => candidate && typeof candidate.target_word === "string")) {
      throw new Error("Candidate file must be an array of objects with target_word strings");
    }
    console.log(JSON.stringify({
      language: lang,
      attribution: "Hermit Dave / FrequencyWords / OpenSubtitles 2018",
      source: frequencySourceUrl(lang),
      license: "CC-BY-SA-4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      modifications: "Exact case-normalized surface-form ranks, ordered candidates, explicit null for unmatched forms.",
      candidates: orderVocabularySuggestions(candidates, source),
    }, null, 2));
  } else {
    output[lang] = compactFrequencyRanks(appFrequencyForms(compendiums[lang]), source);
    const ranked = Object.values(output[lang]).filter((rank) => rank !== null).length;
    console.log(`${lang}: ${ranked} ranked / ${Object.keys(output[lang]).length} app forms`);
  }
}

if (!suggestionsPath) {
  fs.writeFileSync(path.join(root, "src/data/frequency-ranks.json"), `${JSON.stringify(output)}\n`);
  const provenance = {
    title: "App vocabulary surface-form frequency ranks",
    attribution: "Hermit Dave, FrequencyWords; generated from the OPUS OpenSubtitles 2018 tokenized corpus.",
    source: `https://github.com/hermitdave/FrequencyWords/tree/${FREQUENCY_REVISION}/content/2018`,
    sourceReadme: `https://github.com/hermitdave/FrequencyWords/blob/${FREQUENCY_REVISION}/README.md`,
    corpus: "https://opus.nlpl.eu/OpenSubtitles.php",
    revision: FREQUENCY_REVISION,
    license: "CC-BY-SA-4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    licenseText: "https://creativecommons.org/licenses/by-sa/4.0/legalcode.txt",
    notice: "The source content and this derived rank subset are licensed under CC BY-SA 4.0, provided without warranties. No endorsement is implied. The source repository's MIT license applies to its code, not these data.",
    modifications: "Selected only app vocabulary; converted source line positions to ranks; NFC-normalized and lowercased exact surface-form lookup; explicit null for absent forms. Counts omitted. No lemmatization or inferred inflection frequencies.",
    limits: "Ranks are positions in each language's 50,000-form subtitle list, not general-language or lemma frequencies. Subtitle dialogue, names, spelling and corpus selection affect ranks. Missing means not matched, not necessarily rare. Sentences are not ranked.",
    generatedBy: "bun scripts/generate-frequency.ts",
    sources: Object.fromEntries(FREQUENCY_LANGUAGES.map((lang) => [lang, { url: frequencySourceUrl(lang), sha256: FREQUENCY_CHECKSUMS[lang], forms: 50_000 }])),
  };
  fs.writeFileSync(path.join(root, "public/data/frequency-provenance.json"), `${JSON.stringify(provenance, null, 2)}\n`);
}
