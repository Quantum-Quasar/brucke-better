# `scripts/`

Build and audit tooling. Nothing here is imported by the app at runtime — `bun run
build` calls `parse-compendium.ts` and `export-client-data.ts` before `next build`.
The four content audits also run in CI on every push (see *Audits*); the rest are
run by hand.

---

## Build pipeline

| Script | Run via | What it does |
| --- | --- | --- |
| `parse-compendium.ts` | `bun run parse-data` | Regenerates the committed German source snapshots `src/data/compendium.json` and `src/data/insights.json`, plus the one-line-per-word review index `src/data/compendium-digest.md`, from [`word_connections.md`](../word_connections.md), before export in production builds. |
| `export-client-data.ts` | `bun run export-data` | Exports each language's compendium, compact lesson index (including exercise counts) and one trimmed payload per lesson to ignored `public/data/<lang>/`, plus frequency attribution. Regenerates committed `src/data/shift-names.json` and `lesson-exercise-counts.json`; these tiny manifests let navigation show names/effort without fetching a course index. `dev`, `build` and `test` run it automatically. |
| `append-words.mjs` | `bun scripts/append-words.mjs <json…>` | Batch-appends word records to §2 of `word_connections.md` (numbered after the current max; dedupes by German headword; keeps the section inventory count honest). A record may carry `"sense": "noun"` to teach a second sense of an existing headword as `Essen#noun` (id `essen#noun`), and any bad record aborts the whole batch before a byte is written. Run `parse-data` afterwards. |
| `generate-frequency.ts` | `bun scripts/generate-frequency.ts` | Fetches pinned FrequencyWords/OpenSubtitles lists, verifies SHA-256 checksums, and writes committed `src/data/frequency-ranks.json` and `src/data/frequency-provenance.json`. Run when the vocabulary inventory changes, then run `export-data` to publish both the ranks and attribution. No corpus download happens in ordinary builds. |
| `generate-english-hook-words.ts` | `bun scripts/generate-english-hook-words.ts` | Verifies the pinned English OpenSubtitles list's SHA-256 and writes committed `src/data/english-hook-words.json` — the English forms a lesson hook may name as a twin the learner already owns. Run only when the hook-word limit or pinned revision changes; no build touches the network. |

`word_connections.md` is the hand-maintained source of truth for every word,
shift family, compound, trap, and insight. `compendium.json` is **generated** —
edit the markdown, never the JSON. `scripts/append-words.mjs` is the batch helper
for adding records to §2 of that markdown.

The parser requires all five sections and their declared inventory counts, complete
shift definitions, and exact table widths (9 / 7 / 6 / 5 columns for sections 2–5).
Invalid rows, translations, ids or duplicates stop the build with a source line
before either generated file is written. Shift prose comes from section 1, not a
second hardcoded copy.

> `bun run build` already chains `parse-data && export-data && next build`. You only
> need `bun run parse-data` by itself when iterating on the compendium.

The parse pipeline is **German-only**. French, Spanish and Dutch are typed modules in
`src/data/<lang>/` (see [`docs/courses.md`](../docs/courses.md)); `export-client-data.ts`
is what writes all four languages' payloads to `public/data/<lang>/`. The entire
`public/data/` directory is generated and ignored, not a second content source.
Keep `word_connections.md`, the committed German compendium/insights, typed sibling
language modules, lesson sources and frequency rank/provenance sources in git.
CI's source-sync check diffs the compendium/insights, the compendium digest and both compact metadata manifests.

A fresh checkout needs `bun run export-data` before commands that serve public
assets directly. `bun run dev`, `bun run build` and `bun run test` already do this;
CI also generates assets after installing dependencies. Exporting uses committed
local sources, creates missing directories and requires no network. The export
boundary tests additionally generate their own temporary output from an empty
directory, so direct Vitest runs do not depend on previously built payloads.

Lesson authoring is per-file (`src/data/lessons/<id>.ts` for German;
`src/data/<language>/lessons/<id>.ts` for the sibling courses). Ordered aggregates
are build/audit inputs only. Exporting still creates one JSON payload per lesson;
splitting source files does not make the browser download the full course.

Frequency metadata is attached during export, not imported as a corpus by the browser.
Missing forms stay `null`; ranks describe subtitle surface forms, not lemma frequency
or general usefulness. Author candidates can be ranked with
`bun scripts/generate-frequency.ts --suggestions=words.json --language=de`;
the input is an array such as `[{"target_word":"Wasser"}]`. Attribution and source
limits are committed in `src/data/frequency-provenance.json` and published by every
export to `public/data/frequency-provenance.json`.

The English side of a twin claim — a `(twin: …)` annotation in a compendium cognate
cell, a pair label, an exercise `meaning`, a twist prompt — must be a word the learner
already owns. `scripts/generate-english-hook-words.ts` pins that list
(`src/data/english-hook-words.json`, the top 5,000 forms of the English subtitle list);
`scripts/parse-compendium.ts` fails on a violating row with its source line and
`src/tests/english-hooks.test.ts` sweeps every authored string. Rare or archaic twins
belong in the derivation, `explanation` or `footnotes`, never in the hook slot.

## Audits

These read the codebase and report. `audit-word-refs`, `audit-teasers`, `audit-wording` and
`audit-vocab-balance --strict` run in CI (`.github/workflows/ci.yml`), and the word-reference
logic is also enforced inside `bun run test` by `src/tests/word-refs.test.ts`. All four audit
German data only; the sibling courses are guarded by their own `*-content.test.ts` suites.
`audit-teasers` exits nonzero on title drift or flagged teaser pointers; the clean
summary is `title drift: 0 | teaser flags: 0`.

| Script | What it checks |
| --- | --- |
| `check-compendium.ts` | **Fast table preflight** (`bun run check:compendium`): parses `word_connections.md` in memory and prints *every* row-level issue with its source line — column counts, duplicate ids, unknown shift ids, unknown domains, bad id-sense tags, inventory drift. Writes nothing, so it is safe before a batch and on save; `bun run test` enforces the same checks and `.githooks/pre-commit` calls it when the table is staged. |
| `audit-vocab-balance.ts` | Vocabulary legality and balance — that exercise-surface tokens resolve to words introduced *before* the lesson that uses them, new-word bands, and the zero-new share. Also the authority for the "unique taught words" figure quoted in the docs. |
| `audit-wording.ts` | **No cargo-cult repetition.** Blocks `explanation` strings, prose sentences, and prompt formulas copy-pasted between neighbouring lessons, while an allowlist protects widget labels that are *meant* to stay identical. |
| `audit-word-refs.ts` | Word-reference integrity — every lesson/exercise token reference resolves; exits 1 on failure. |
| `audit-teasers.ts` | Lesson title drift and `curiosity_teaser` chaining: each teaser must point at the next node in trail order; the required grammar branch chains (5060/5080/5100/5110) get the same rule inside the branch, with the chain's last lesson only checked for existence (it may point back to the spine). |
| `audit-recurrence.ts` | Assessed German retrieval by word, lesson and exercise type. `--strict` enforces two distinct lessons; `--all`/`--json` expose the map. Declarations, banks, hints, duplicate surfaces and ungraded twists do not count. The same helper is enforced by `curriculum-recurrence.test.ts` in CI. |
| `contrast-audit.ts` | One-off fixer for theme contrast. Walks all themes and nudges failing colors' lightness while preserving hue and saturation, then regenerates `POPULAR_THEMES` from the passing set. The WCAG thresholds are *enforced* by `src/tests/themes.test.ts`, so this is only needed when adding or editing a theme. |
| `audit-public-assets.ts` | Raw-byte inventory of every public asset, grouped by data, sounds, fonts and language, with a complete per-file JSON report via `bun run audit:assets --json`. See the request audit below. |

### Public asset inventory and request audit

Run `bun run export-data && bun run audit:assets` for the current inventory, or
`bun run audit:assets --json` for every file's raw byte count. Missing generated
data is an error, not a misleading zero-byte result. This script does not fetch,
delete or rewrite assets. File count is the number of available asset URLs, **not**
the number of requests made at startup; raw disk bytes are not gzip/Brotli transfer
bytes and exclude Next's separately built JavaScript/CSS.

Inventory after the audio, font, image and JSON optimisations:

| Public group | Files / available URLs | Raw bytes |
| --- | ---: | ---: |
| All `public/` | 729 | 8,350,829 |
| `data/` | 539 | 7,283,524 |
| `sounds/` | 145 | 274,068 |
| `webfonts/` | 40 | 758,916 |
| Other public files | 5 | 34,321 |

The largest public asset is the German compendium (647,639 bytes); a learner who
opens a lesson fetches its smaller lesson payload instead. Regenerate and rerun
the audit when content changes.

Source inspection establishes the following request boundaries; these are not
claims that every file was downloaded in a browser session:

- **Data:** `src/lib/content-client.ts` only fetches the requested language and
  payload, with an in-memory promise cache and build-versioned URLs. One lesson
  uses one trimmed lesson payload, not the whole course; review requests that
  language's compendium and lesson index. Intent prefetches use the same cache.
  Lesson 1 fetches a trimmed lesson vocabulary payload, not the full compendium.
  Export and client-loader tests pin this boundary.
- **Sounds:** `src/lib/sound.ts` does not download packs at module import.
  Hydration arms a first-interaction listener, then fetches only the selected
  click pack's `1.mp3` (Cherry MX Black ABS: 646 bytes). Further variations
  load during playback; an error cue loads when played. Explicit pack changes
  preload that selected primary sample. The unused `click16` pack and two
  unreferenced WAV cues were removed.
  `sound.test.ts` guards the interaction gate and one-shot preload.
- **Fonts:** only Lexend Deca and Roboto Mono have baseline rules in
  `src/app/globals.css` (15,116 and 15,380 bytes). The root layout preloads Lexend
  Deca; CSS alone fetches a font only when rendered text uses it.
  `src/data/fonts.ts` injects other families only when selected or previewed.
  `FontSelectorModal.tsx` previews one hovered/focused choice; downloading every
  preview requires the explicit “Load all previews” action. `fonts.test.ts`
  pins single-family injection.
- **Offline:** `public/sw.js` installs only the offline page, manifest and two
  app icons. Fonts, sounds and data enter the bounded 200-entry media cache while routes and Next chunks enter the separate 120-entry shell cache, only
  after requests (including already-requested bootstrap assets). There is no
  whole-course, sound-pack or font-catalog precache. A warm asset hit in the
  current cache avoids another Cache Storage write and eviction scan.

## Output

| Script | Run via | What it writes |
| --- | --- | --- |
| `export-trail.ts` | `bun run trail` | Writes `TRAIL.md` at the repo root — the German trail in reading order. Run it after any lesson or teaser change. |
| `export-naturalness-review.ts` | `bun run audit:naturalness-export` | Writes the checker-facing **naturalness review packet** to `naturalness-review/`, organized as **two passes**: pass 1 — one sentence grid per structure bucket (`<bucket>.md`), pass 2 — `mixed-prose.md`, a trail-ordered skim of the whole teaching paragraphs. Plus `all-sentences.csv` (with a `pass` column), `SUMMARY.md` (totals, bucket counts, provenance coverage, method notes) and `SPEAKER-BRIEFING.md` (the protocol every speaker gets). Every learner-facing German sentence in the German course plus the compendium example sentences, with English pairing, per-row provenance (`<lessonId> · <surface>` / `compendium:<id> · <surface>`) and free-text speaker fields. Read-only on content; output is a list of suspects to discuss, never auto-fixes. Run on demand by the human before a speaker round — deliberately **not** wired into build, test or CI, and the generated packet (`naturalness-review/`) is gitignored. Logic lives in `src/lib/naturalness-extract.ts` and is pinned by `src/tests/naturalness-extract.test.ts`; the export is deterministic, so re-runs diff cleanly. |

---

## Adding a script

- Prefer Bun + TypeScript to match the rest; keep them dependency-free (the app
  ships no runtime dependencies beyond React/Next/Zustand).
- If a new script writes into `src/data/`, add it to the `build` script in
  `package.json` if it is required for the build to succeed.
- If a new script becomes a correctness gate, move the assertion into
  `src/tests/` instead — a manual audit script that nobody runs is not a guard.
  `check-compendium.ts` is a thin CLI over the parser's own checks (`analyzeCompendium`),
  pinned by `src/tests/compendium.test.ts`; a new table rule belongs there, never in a
  second regex copy that drifts.