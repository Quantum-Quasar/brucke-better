# `scripts/`

Build and audit tooling. Nothing here is imported by the app at runtime — `bun run
build` calls `parse-compendium.ts` and `export-client-data.ts` before `next build`,
the rest are run by hand.

---

## Build pipeline

| Script | Run via | What it does |
| --- | --- | --- |
| `parse-compendium.ts` | `bun run parse-data` | **The one script that must run before `next build`.** Parses [`word_connections.md`](../word_connections.md) into `src/data/compendium.json` and `src/data/insights.json`. |
| `export-client-data.ts` | `bun run export-data` | Exports each language's compendium and compact lesson index to `public/data/<lang>/`, plus the generated `src/data/shift-names.json`. `dev` and `build` run it automatically. |
| `append-words.mjs` | `bun scripts/append-words.mjs <json…>` | Batch-appends verified records to §2 of `word_connections.md` (numbered after the current max; dedupes by German headword). Run `parse-data` afterwards. |

`word_connections.md` is the hand-maintained source of truth for every word,
shift family, compound, trap, and insight. `compendium.json` is **generated** —
edit the markdown, never the JSON. `scripts/append-words.mjs` is the batch helper
for adding records to §2 of that markdown.

> `bun run build` already chains `parse-data && next build`. You only need
> `bun run parse-data` by itself when iterating on the compendium.

## Audits

These read the codebase and report; none of them are wired into `bun run test`.

| Script | What it checks |
| --- | --- |
| `audit-vocab-balance.ts` | Vocabulary legality and campaign bookkeeping — that exercise-surface tokens resolve to words introduced *before* the lesson that uses them, with an explicit allowlist for pre-existing drift. Also the authority for the "unique taught words" figure quoted in the docs. |
| `audit-wording.ts` | **No cargo-cult repetition.** Blocks `explanation` strings, prose sentences, and prompt formulas copy-pasted between neighbouring lessons, while an allowlist protects widget labels that are *meant* to stay identical. |
| `audit-word-refs.ts` | Word-reference integrity — reports lesson/exercise token references that do not resolve. |
| `audit-teasers.ts` | Atlas teaser tokenisation and overlap. |
| `contrast-audit.ts` | One-off fixer for theme contrast. Walks all themes and nudges failing colors' lightness while preserving hue and saturation, then regenerates `POPULAR_THEMES` from the passing set. The WCAG thresholds are *enforced* by `src/tests/themes.test.ts`, so this is only needed when adding or editing a theme. |

## Output

| Script | Run via | What it writes |
| --- | --- | --- |
| `export-trail.ts` | `bun run trail` | Exports the Trail map structure from `src/data/curriculum.ts` and the lesson data. |
| `capture-demo-images.ts` | `bun scripts/capture-demo-images.ts` | Captures seeded demo screenshots into `demo-images/` (run by hand; not part of the build). |

---

## Adding a script

- Prefer Bun + TypeScript to match the rest; keep them dependency-free (the app
  ships no runtime dependencies beyond React/Next/Zustand).
- If a new script writes into `src/data/`, add it to the `build` script in
  `package.json` if it is required for the build to succeed.
- If a new script becomes a correctness gate, move the assertion into
  `src/tests/` instead — a manual audit script that nobody runs is not a guard.