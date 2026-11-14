# PROGRESS — sibling parity campaign (French / Spanish / Dutch)

**Status: complete.** Full record in `docs/sibling-parity-audit.md`. No commits —
the working tree is left for human review.

## What was found (measured, not trusted from old audits)

- **The "metadata-light" claim was stale.** All three sibling compendia are
  100% filled on `ipa`, `context_phrase`, `context_translation`,
  `etymology_derivation`, `english_cognate`, `domain`, `shift_rule`; `gender`
  nulls were verified to be all non-nouns. Nothing to fill.
- **The real Dutch gap was exercise monotony:** all 85 lessons ran the identical
  five-type sequence from the factory; no sentence-assembly, bridge-conversion
  or English-shape practice existed.
- **Stale learner-facing counts** in the picker blurbs (French/Spanish said 123
  lessons, Dutch 75 — real numbers 133/133/85; German said 9 shift families
  where the atlas pins 10).

## What changed

1. `src/data/dutch/lesson-factory.ts` — optional `DutchExerciseSpec` plan per
   lesson: default layout preserved; new `build` (syntax_builder, with optional
   authored trap bank), `derive` (bridge conversion), `variants`
   (variant_english) kinds.
2. 16 Dutch specs retrofitted — cores 2–7 + sprig 201 (derive), cores
   11/12/13/20/25/27 + sprigs 1101/2501 (build, with trap chips planted where
   the lesson's own trap names one), core 26 (variants). Dutch course: 5 → 8
   distinct exercise types, 1 → 6 distinct sequences, 69/85 lessons on the
   default layout.
3. Honest tier labels: `courseTier` on `LanguageDefinition` (full / starter /
   compact), shown as a small line on the picker card; blurbs corrected to
   machine-pinned counts.
4. `docs/sibling-parity-audit.md` — measurement tables, changes, and the
   decision memo (stories / recurrence floor / sentence review / grammar
   branches / frequency ranks: build later / later+report-only / verify / at
   parity / never).

## Verification (all green)

- `bun run typecheck` ✓
- `bun run test` — 63 files / 722 tests ✓ (incl. dutch-content, languages, docs-sync)
- `bun run lint` — 0 errors (11 pre-existing warnings in protected components)
- Four content audits (word-refs / teasers / wording / vocab-balance --strict) ✓
- `bun run trail` — TRAIL.md unchanged ✓
- `bun run build` — ✓ with the documented local invocation
  `NEXT_PUBLIC_SITE_URL=http://localhost:3111 ALLOW_LOCAL_SITE_URL=1 bun run build`
  (a bare `bun run build` fails on the missing `NEXT_PUBLIC_SITE_URL`; that is
  the repo's production guard, not a code problem)

## Deliberately not done

- No sibling compendium rewrites (nothing to fill).
- No stories / recurrence audit / frequency ranks built (memo dispositions).
- Stable factory prompt frames kept — `audit-wording.ts` doctrine treats them
  as deliberate learner cues, not rot.
- Count sync files untouched: no lesson/word counts changed, so
  `word-counts.ts` and both READMEs stayed as-is (docs-sync green).
