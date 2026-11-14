// Native-speaker naturalness review packet writer (spec:
// docs/ideas to add in future/native-speaker-naturalness-audit.md, Option B).
//
// Writes the checker-facing review packet to naturalness-review/:
//   <bucket>.md          one review grid per structure bucket
//   all-sentences.csv    the same rows for spreadsheet users
//   SUMMARY.md           totals, bucket counts, provenance coverage, method notes
//   SPEAKER-BRIEFING.md  the condensed protocol the speakers must follow
//
// Read-only on content: nothing under src/data/ is touched, nothing is
// auto-fixed — the packet is a list of suspects to discuss with humans.
// Run on demand (bun scripts/export-naturalness-review.ts); NOT part of
// build, test or CI. The logic lives in src/lib/naturalness-extract.ts so
// src/tests/naturalness-extract.test.ts pins the same extraction.
//
// Deterministic: no timestamps, stable sort and ids — re-runs diff cleanly.

import fs from "fs";
import path from "path";
import {
  BUCKETS,
  bucketName,
  extractNaturalnessRows,
} from "../src/lib/naturalness-extract";

const OUT_DIR = path.resolve(__dirname, "../naturalness-review");

const mdCell = (s: string) => s.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
const csvCell = (s: string) => `"${s.replace(/"/g, '""')}"`;

const { rows, stats } = extractNaturalnessRows();

fs.mkdirSync(OUT_DIR, { recursive: true });

// --- pass 1: one sentence grid per bucket, pass 2: prose skim --------------

for (const bucket of BUCKETS) {
  const bucketRows = rows.filter((r) => r.bucket === bucket.slug);
  const out: string[] = [];
  const pass = bucket.slug === "mixed-prose" ? "pass 2 — prose skim" : "pass 1 — sentence grids";
  out.push(`# ${bucketName(bucket.slug)} — ${pass}`);
  out.push("");

  if (bucket.slug === "mixed-prose") {
    // Whole paragraphs read better as a list than as table rows.
    out.push(`${bucketRows.length} whole teaching paragraphs (lesson hooks, pattern sections, vocab-hint notes) with German embedded in English prose. This is a **skim, not a grid**: read the German inside each paragraph and write any German a speaker wouldn't say under it — quote the fragment. Leave clean paragraphs untouched.`);
    out.push("");
    for (const row of bucketRows) {
      out.push(`## ${row.id} — ${row.sources.join(" + ")}`);
      out.push("");
      out.push(`> ${row.german.replace(/\r?\n/g, " ")}`);
      out.push("");
      out.push("**Would you say the German here? (free text — quote any unnatural fragment):**");
      out.push("");
    }
    fs.writeFileSync(path.join(OUT_DIR, `${bucket.slug}.md`), out.join("\n") + "\n", "utf-8");
    continue;
  }

  out.push(`${bucketRows.length} rows. Read SPEAKER-BRIEFING.md first: for each row answer in free text — *would you say this, and if not, what would you say?* Leave a row blank if it is natural.`);
  if (bucket.slug === "single-words-phrases") {
    out.push("");
    out.push("*Short items — judge the word or phrase itself, as you would hear it in conversation. Register counts: flag anything that is grammatically fine but would sound odd coming from a real speaker.*");
  }
  out.push("");
  out.push("| # | German | English | source | would you say this? (free text) | what would you say instead? (free text) |");
  out.push("| --- | --- | --- | --- | --- | --- |");
  for (const row of bucketRows) {
    const german = row.originals.length > 1
      ? `${mdCell(row.german)}<br>*(also: ${row.originals.slice(1).map(mdCell).join(" · ")})*`
      : mdCell(row.german);
    const english = row.english ? mdCell(row.english) : "—";
    const sources = row.sources.map(mdCell).join("<br>");
    out.push(`| ${row.id} | ${german} | ${english} | ${sources} |  |  |`);
  }
  fs.writeFileSync(path.join(OUT_DIR, `${bucket.slug}.md`), out.join("\n") + "\n", "utf-8");
}

// --- CSV -------------------------------------------------------------------

const csvLines: string[] = [];
csvLines.push(["id", "pass", "bucket", "german", "english", "sources", "would you say this? (free text)", "what would you say instead? (free text)"].map(csvCell).join(","));
for (const row of rows) {
  const pass = row.bucket === "mixed-prose" ? "pass-2-prose-skim" : "pass-1-sentence-grids";
  csvLines.push([row.id, pass, bucketName(row.bucket), row.originals.join(" | "), row.english, row.sources.join(" | "), "", ""].map(csvCell).join(","));
}
fs.writeFileSync(path.join(OUT_DIR, "all-sentences.csv"), csvLines.join("\n") + "\n", "utf-8");

// --- SUMMARY ---------------------------------------------------------------

const withEnglish = rows.length - stats.rowsWithoutEnglish;
const englishShare = Math.round((withEnglish / rows.length) * 100);
const pass1Count = rows.filter((r) => r.bucket !== "mixed-prose").length;
const pass2Count = rows.length - pass1Count;
const summary: string[] = [];
summary.push("# Naturalness review export — summary");
summary.push("");
summary.push("Checker-facing review packet for the native-speaker naturalness audit (Option B of");
summary.push("`docs/ideas to add in future/native-speaker-naturalness-audit.md`). Generated by");
summary.push("`bun scripts/export-naturalness-review.ts`; deterministic — re-running reproduces these");
summary.push("files byte-for-byte. Output is a list of suspects to discuss, never auto-fixes.");
summary.push("");
summary.push("## The packet is two passes");
summary.push("");
summary.push(`- **Pass 1 — sentence grids (${pass1Count} rows, ${BUCKETS.length - 1} files).** Authored German sentences and phrases, grouped by structure. This is the core review: one grid per law, English beside German, two free-text columns. A sitting or two of focused judgment.`);
summary.push(`- **Pass 2 — prose skim (\`mixed-prose.md\`, ${pass2Count} rows).** Whole teaching paragraphs (lesson hooks, pattern sections, vocab-hint notes) with German embedded in English prose. A different mode of reading — skim the German inside each paragraph in trail order and quote anything a speaker wouldn't say. Separating it keeps the sentence grids pure; a speaker can do both passes in one weekend or in different sittings.`);
summary.push("");
summary.push("## Totals");
summary.push("");
summary.push(`- **${rows.length} distinct German sentences/phrases** from ${stats.occurrences} learner-facing occurrences (of which ${stats.excludedNotGerman} were authored English — gloss answers on `);
summary.push(`  \`shift_select\` / \`reverse_cognate\` / \`variant_english\` / \`literal_gloss\` \`target_answer\` — and are not part of the packet).`);
summary.push(`- **${withEnglish} rows (${englishShare}%) carry an English pairing** from the data; ${stats.rowsWithoutEnglish} rows show "—" (the pass-2 prose rows have no per-fragment English by construction).`);
summary.push("- The spec estimated ~1,400 distinct sentences; the extraction is larger. The gap comes from surfaces the estimate did not itemize: matching-pair cards (~700 distinct single words/phrases), the whole teaching prose fields (506 rows) and the per-exercise single-word answers (`derive`, `shift_select`). Nothing was trimmed to fit the estimate.");
summary.push("");
summary.push("## Per-bucket counts");
summary.push("");
summary.push("| Bucket | Rows | File |");
summary.push("| --- | ---: | --- |");
for (const bucket of BUCKETS) {
  summary.push(`| ${bucketName(bucket.slug)} | ${stats.perBucket[bucket.slug] ?? 0} | \`${bucket.slug}.md\` |`);
}
summary.push(`| **Total** | **${rows.length}** | \`all-sentences.csv\` |`);
summary.push("");
summary.push("## Surface inventory");
summary.push("");
summary.push("| Surface | Occurrences | Included | Excluded (not German) |");
summary.push("| --- | ---: | ---: | ---: |");
for (const s of stats.perSurface) {
  summary.push(`| \`${s.surface}\` | ${s.occurrences} | ${s.included} | ${s.excluded} |`);
}
summary.push("");
summary.push("## Method notes");
summary.push("");
summary.push("- **Corpus.** The spec's corpus table, plus typed German fields the table predates: `variant_english.german`, `spoken_turn_reply.spoken_question`, `pronoun_compression.full_sentence`, `transcribe.accepted_answers` and the individual `matching_pairs` cards, plus the compendium surfaces (`compound · example_sentence`, `false_friend · example_sentence`, `daily_insight · german_expression`). `matching_pairs.target_answer` itself is a comma-joined serialization of those cards and is deliberately not extracted as a row (the cards carry the same German plus an English pairing).");
summary.push("- **English-by-design answers.** `reverse_cognate`, `variant_english` and `literal_gloss` have authored-English `target_answer`s (glosses, word-for-word renderings); their German lives on other fields that are extracted. Stray English answers on German-by-design types (e.g. shift_select gloss answers like \"yon\") are filtered out by the German test below.");
summary.push("- **German test.** An unambiguous English marker word excludes a string; otherwise a German marker (function word, taught word via the word-reference resolver, grammar-form supplement) or a bare umlaut includes it, with an authored-German default for multi-word answers. Single unknown tokens stay excluded.");
summary.push("- **Prose.** `hook.content`, `pattern.content` and `vocab_hints[].note` are authored mixed EN/DE paragraphs; they are kept whole-field in the *Mixed prose* pass-2 skim rather than segmented (segmentation prototypes produced ~30% junk fragments), presented trail-ordered as blockquotes so reviewers check the German embedded in each paragraph. They have no English pairing by construction.");
summary.push("- **Pairing.** English meaning comes from the data's own pairing field per surface (`meaning`, `idea`, `question_meaning`, `english_hint`, `prompt`, `natural`, card/cell English, compound/false-friend `example_translation`, insight `english_meaning`, twist prompt, where present), else \"—\".");
summary.push("- **Dedupe.** Normalized key = trim + collapse whitespace + strip trailing punctuation, lowercased. All original spellings are kept on the row and listed when they differ; provenance lists every occurrence (`<lessonId> · <surface>` or `compendium:<id> · <surface>`).");
summary.push("- **Bucketing.** Keyword + pattern heuristics, first match wins, priority: relative clauses → Konjunktiv II → subordinate clauses → questions & word order → negation → modals → Perfekt/Präteritum → imperative → verb bracket → two-way prepositions → dative → adjective endings → single words & short phrases (≤ 4 tokens). *Mixed prose* and *Other* are the two catch-alls; *Other* held " + (stats.perBucket["other"] ?? 0) + " rows — mostly subordinate-clause variants without a marker, fixed expressions and multi-word card lists.");
summary.push("- **Ordering.** Sentence rows sort alphabetically within their bucket (groups similar sentences for pattern-spotting); pass-2 prose rows sort in trail order (lesson 1's hook, pattern, notes, then lesson 2's …).");
summary.push("- **Determinism.** Stable sort and ids (`<bucket>-<n>`), no timestamps.");
summary.push("");
summary.push("## Reading order");
summary.push("");
summary.push("1. `SPEAKER-BRIEFING.md` — give this to every speaker before anything else.");
summary.push("2. **Pass 1:** one `<bucket>.md` sentence grid per structure, or `all-sentences.csv` (`pass` column) for spreadsheet users.");
summary.push(`3. **Pass 2:** \`mixed-prose.md\` — the prose skim.`);
summary.push("4. Collect the free-text answers back; a pattern across several speakers is worth a lot, a single confident correction is worth very little.");
fs.writeFileSync(path.join(OUT_DIR, "SUMMARY.md"), summary.join("\n") + "\n", "utf-8");

// --- SPEAKER-BRIEFING ------------------------------------------------------

const briefing: string[] = [];
briefing.push("# Speaker briefing — German naturalness review");
briefing.push("");
briefing.push("You are checking whether German sentences in a learning app sound like something a real");
briefing.push("speaker would say. The app's own tests already prove the exercises work; what they cannot");
briefing.push("prove is naturalness — that is exactly what your ear adds.");
briefing.push("");
briefing.push("## About you (fill in before starting)");
briefing.push("");
briefing.push("- Region(s) lived in (where you grew up and lived longest):");
briefing.push("");
briefing.push("- Age band (under 25 / 25–40 / 41–60 / over 60):");
briefing.push("");
briefing.push("- Grew up abroad in another language? (yes / no):");
briefing.push("");
briefing.push("Different regions and generations disagree — that disagreement is data, not noise.");
briefing.push("");
briefing.push("## The packet has two passes — take them in either order, or in separate sittings");
briefing.push("");
briefing.push(`- **Pass 1 — sentence grids.** The \`<bucket>.md\` files (one structure per file: negation, dative,`);
briefing.push("  Perfekt & Präteritum, modals, …). One row = one German sentence or phrase with its English.");
briefing.push("  Judge each row: *would you say this?* Pure sentence judgment.");
briefing.push(`- **Pass 2 — prose skim (\`mixed-prose.md\`).** Whole teaching paragraphs with German embedded in`);
briefing.push("  English prose. Read the German inside each paragraph and quote anything unnatural. This is");
briefing.push("  reading, not row-by-row judgment — a different mode, and fine as its own sitting.");
briefing.push("");
briefing.push("## The one question — and what it is not");
briefing.push("");
briefing.push("For every row, answer in your own words: **\"Would you say this? And if not — what would you say?\"**");
briefing.push("");
briefing.push("- Answer in **free text**. The second column is where the value is; a yes/no answer is noise.");
briefing.push("- Never asked to judge grammar rules — judge sentences. If a sentence is unnatural, write the");
briefing.push("  one you would actually say.");
briefing.push("- Where you can, imagine the situation the sentence lives in (ordering food, asking a friend,");
briefing.push("  describing yesterday) and answer as if you were in it. If you cannot imagine any situation");
briefing.push("  where someone would say it, say so — that is a finding.");
briefing.push("");
briefing.push("## The rules that make this reliable");
briefing.push("");
briefing.push("1. **Situations, not opinions.** \"Your friend says 'see you next week', you're reminding them");
briefing.push("   about your party tomorrow — what do you say?\" The answer you want is the sentence, not a");
briefing.push("   verdict about the sentence.");
briefing.push("2. **The hypothesis is withheld.** Nobody will tell you what we suspect about a row, because");
briefing.push("   people look for affirmation of the asker's theory. Answer before asking us anything.");
briefing.push("3. **One voice is never enough.** The same grids go to 2–3 speakers from different regions and");
briefing.push("   generations. A single \"wrong\" is worth very little; a pattern across speakers is worth a lot.");
briefing.push("4. **Mind the dialect.** Say plainly when something is correct in your region but not another,");
briefing.push("   or common in your generation but not others — do not silently \"correct\" it to your own.");
briefing.push("5. **False natives.** If you grew up abroad in another language, be extra careful: confident");
briefing.push("   corrections from negative transfer are the classic failure of this kind of review. The header");
briefing.push("   fields above let us weigh your answers honestly.");
briefing.push("6. **Watch for imagined context.** If you \"know\" what a sentence must mean, you may approve it");
briefing.push("   for that meaning alone. We will re-ask with a different sentence carrying the same structure");
briefing.push("   to see whether your verdict holds.");
briefing.push("");
briefing.push("## What happens to your answers");
briefing.push("");
briefing.push("Your answers are collected as **suspects to discuss**, not bugs to auto-fix. Rows flagged by");
briefing.push("several speakers get talked through with context; rows flagged once usually stay untouched.");
briefing.push("");
briefing.push("## Practicalities");
briefing.push("");
briefing.push("- Pass 1: work one `<bucket>.md` file at a time (one structure per file); pass 2: read");
briefing.push("  `mixed-prose.md` top to bottom. `all-sentences.csv` mirrors everything with a `pass` column");
briefing.push("  if you prefer a spreadsheet. Fill the free-text fields; leave natural rows blank.");
briefing.push("- Rows show a source like `1103 · dictation · spoken` (lesson · surface) or");
briefing.push("  `compendium:kühlschrank · compound · example_sentence` — quote the row id when a sentence");
briefing.push("  needs discussion.");
fs.writeFileSync(path.join(OUT_DIR, "SPEAKER-BRIEFING.md"), briefing.join("\n") + "\n", "utf-8");

// --- console summary ---------------------------------------------------------

const bucketSummary = BUCKETS.map((b) => `${b.slug} ${stats.perBucket[b.slug] ?? 0}`).join(", ");
console.log(`naturalness-review: ${rows.length} distinct sentences (${stats.occurrences} occurrences) — ${bucketSummary}`);
console.log(`naturalness-review: pass 1 sentence grids ${pass1Count} rows | pass 2 prose skim ${pass2Count} rows | ${stats.rowsWithoutEnglish} rows without an English pairing (${Math.round((stats.rowsWithoutEnglish / rows.length) * 100)}%) — written to ${OUT_DIR}`);
