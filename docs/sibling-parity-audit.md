# Sibling parity audit — French / Spanish / Dutch

> Measured 2026-11-14 against the current tree, deliberately ignoring the numbers
> quoted by older audit notes (recent commits expanded all three courses, and the
> old claims were stale). Every number below was produced by running a script over
> the typed modules (`frenchCompendium` / `spanishCompendium` / `dutchCompendium`,
> `FR_LESSONS` / `ES_LESSONS` / `NL_LESSONS`, German `LESSONS` as the reference),
> not copied from prose.

## 1. What the measurement found

### 1.1 Compendium metadata coverage (the "metadata-light" claim)

| field | French (306 words) | Spanish (293 words) | Dutch (390 words) |
| --- | --- | --- | --- |
| `ipa` | 306/306 | 293/293 | 390/390 |
| `context_phrase` | 306/306 | 293/293 | 390/390 |
| `context_translation` | 306/306 | 293/293 | 390/390 |
| `etymology_derivation` | 306/306 | 293/293 | 390/390 |
| `english_cognate` | 306/306 | 293/293 | 390/390 |
| `domain` | 306/306 | 293/293 | 390/390 |
| `shift_rule` | 306/306 | 293/293 | 390/390 |
| `gender` (null) | 219 null | 212 null | 221 null |

**Verdict: there was nothing to fill.** Every metadata field is complete in all
three sibling compendia. The `gender` nulls were spot-checked per language: they
are verbs, pronouns, adjectives, prepositions, numbers, days/months and
participles — all legitimately genderless (`WordEntity.gender` is nullable by
design, and the per-language content tests pin the allowed article values).
Word ids are unique in all three courses (306/293/390 unique ids).

### 1.2 Exercise-type inventory (of the 13 engine types)

| | German (ref) | French | Spanish | Dutch |
| --- | --- | --- | --- | --- |
| distinct types used | 13 | 13 | 13 | **5 → 8 after this run** |
| lessons | 179 | 133 | 133 | 85 |
| five-exercise contract | ✓ | ✓ | ✓ | ✓ |
| twist in every lesson | ✓ | ✓ | ✓ | ✓ |
| sequence variety | ~90 sequences | formulaic bookends | formulaic bookends | **1 → 6 sequences after this run** |

- French and Spanish already practise all 13 exercise types; their sequences
  lean heavily on `matching_pairs` opens (121/133 and 132/133) and `dictation`
  closes (130/133 and 87/133), but the middles vary. That is a style, not a gap.
- Dutch was the confirmed second-class course: **all 85 lessons ran the identical
  sequence** `matching_pairs → shift_select → transcribe → literal_gloss →
  dictation`, produced by `lesson-factory.ts`. No sentence assembly
  (`syntax_builder`), no bridge conversion (`derive`), no English-shape
  (`variant_english`) practice existed anywhere in the course.

### 1.3 Template repetition in Dutch

- The factory's **prompt frames** are stable labels repeated across lessons
  ("Build the thought in Dutch:" ×85, "Which English sentence is built the Dutch
  way?" ×85, "Listen and write the whole sentence." ×85). Per
  `scripts/audit-wording.ts` doctrine, this is deliberate: a stable widget label
  is a cue the learner is *meant* to learn, and the sibling prose tests
  (`does not copy long prose between lessons`) only police strings > 60 chars,
  which interpolated explanations satisfy by construction. Not rot; left alone.
- The rot that *was* real: a handful of authored spec sentences collide across
  lessons (e.g. "The ice is cold." asked in 3 lessons — all < 60 chars, so the
  tests cannot see it). Not fixed in this run (it is content churn, not a
  learner-blocker); noted for a future authoring pass.
- `scripts/audit-wording.ts` remains German-only. The sibling suites enforce
  their own prose-uniqueness rule (> 60 chars, exact match), which is the
  sibling equivalent. Extending the audit to siblings is judged unnecessary for
  now (see the memo).

### 1.4 Feature parity table (before this run)

| feature | German | French | Spanish | Dutch |
| --- | --- | --- | --- | --- |
| stories (9xxx reading lessons) | 5 | 0 | 0 | 0 |
| recurrence floor (`audit-recurrence --strict`) | ✓ | – | – | – |
| sentence review | ✓ | storage is language-scoped | language-scoped | language-scoped |
| grammar branches | 15 branches | 15 (29 lessons) | 15 (29 lessons) | 15 (19 lessons) |
| frequency ranks | `frequency-ranks.json` | 0 words | 0 words | 0 words |

Items still missing for siblings are dispositioned in the decision memo (§4),
not built in this run.

## 2. What changed in this run

### 2.1 Dutch: spec-level exercise variety (`src/data/dutch/lesson-factory.ts`)

- Added `DutchExerciseSpec`, an optional per-lesson exercise plan: the default
  five-slot layout is preserved for every spec without `exercises`, and plans
  may reorder the existing kinds or use three new ones:
  - `build` — `syntax_builder`: assemble the Dutch sentence from a word bank
    (with an optional authored `bank` so a lesson can plant its own tempting
    wrong chip, e.g. `niet` beside `geen`, `werkt` beside `werken`).
  - `derive` — convert one English word through a correspondence bridge
    (`ship → schip`, `three → drie`, `father → vader`, `night → nacht`,
    `book → boek`, `yellow → geel`, `shoe → schoen`), mirroring the German
    `derive` shape (`english_hint`, `shift_hint`, authored explanation).
  - `variants` — `variant_english`: pick every English shape that really says
    the Dutch sentence (renderings + traps), used where English genuinely has
    more than one shape.
- Exercise ids keep the positional `nl<lessonId>_e<n>` convention; the first
  slot stays a recognition exercise in every plan; all plans keep five graded
  exercises and ≥ 3 distinct types.

### 2.2 Dutch: retrofitted specs (16 lessons)

- Bridge cores get a `derive` slot: **2, 3, 4, 5, 6, 7** and sprig **201**.
  Each derivation stays inside the lesson's own taught twins (e.g. lesson 3's
  trap says the rule is for recognition, so its `derive` uses only twins the
  lesson names: three/drie, denken, dank).
- Word-order cores get a `build` slot: **11** (bank plants `niet` beside
  `geen`), **12** (assembles the inverted V2 sentence), **13** (bank plants
  `werkt` — the lesson's own trap), **20** (bank plants `zal`), **25**, **27**,
  sprigs **1101** (plants `niet`) and **2501**.
- Relative clauses core **26** gets the `variants` slot (who/that both valid in
  English; word-for-word and wrong-connector traps).
- Result: 5 → 8 distinct types, 1 → 6 distinct sequences, 69/85 lessons on the
  default layout, 16 varied. Total exercise counts per lesson unchanged (5),
  so `lesson-exercise-counts.json` shape is untouched.

### 2.3 Honest course labels

- `LanguageDefinition` gained a `courseTier` ("full course" | "starter course" |
  "compact course"): German full, French and Spanish starter, Dutch compact.
- The picker card shows the tier as a small uppercase line under the language
  name — a badge, not a redesign.
- Fixed the stale picker blurbs, which stated counts that were no longer true:
  French/Spanish said "123 lessons" (real: 133), Dutch said "75 lessons" (real:
  85), German said "9 shift families" (the atlas pins 10). Blurbs now quote
  topics/lessons/words only — numbers that are machine-pinned in
  `src/data/word-counts.ts`.

### 2.4 What was deliberately NOT changed

- No sibling compendium metadata was rewritten — it measured complete.
- No stories, grammar branches, recurrence audit or frequency ranks were built
  (memo below).
- The stable factory prompt frames were kept (audit-wording doctrine).
- No counts changed: no lessons or words were added, so `word-counts.ts`,
  `languages.test.ts` and the READMEs needed no edits (docs-sync still pins
  them; suite green).

## 3. Verification

Ran after the Dutch batch and again after the labels batch (all green):

```bash
bun run typecheck        # ✓
bun run test             # ✓ 63 files / 722 tests (incl. dutch-content, languages, docs-sync)
bun run lint             # ✓ 0 errors (11 pre-existing warnings in protected components)
bun scripts/audit-word-refs.ts            # ✓
bun scripts/audit-teasers.ts              # ✓ drift 0 / flags 0
bun scripts/audit-wording.ts              # ✓
bun scripts/audit-vocab-balance.ts --strict  # ✓
bun run trail            # ✓ TRAIL.md unchanged (German-only export)
NEXT_PUBLIC_SITE_URL=http://localhost:3111 ALLOW_LOCAL_SITE_URL=1 bun run build   # ✓
```

(A bare `bun run build` fails on the production site-URL guard in
`src/lib/site-url.ts`; the loopback invocation above is the one documented in
`docs/DEPLOYMENT.md` for local verification.)

## 4. Decision memo — remaining parity items

Recommendations per item per language. "Cost" is rough agent-session effort,
not calendar time. Overriding principle (`NORTH_STAR.md`): build only what
helps a learner understand, remember, use, or keep wanting to learn; a feature
that exists to make siblings *look* equal to German is not a learner win.

### Stories (5 reading lessons, German only)

- **French / Spanish — later.** A starter course of 133 lessons can carry 2–3
  reading lessons once the starter's word floor feels dense to a beginner.
  Cost: high per story (long authored prose must satisfy the prose-uniqueness,
  word-coverage and teaser rules; roughly one session per 2 stories per
  language). Do it after the starter courses have grown their vocabulary
  breadth, not before.
- **Dutch — never for now.** De Brug is labelled a compact course; 85 lessons
  that end with a Twist card already give it a distinct shape. A reading
  lesson doubles the course's longest content for one language while the
  exercise-type gap was the real deficit (now closed). Revisit only if the
  compact label starts feeling like an excuse rather than a description.

### Recurrence floor (every taught word retrieved in ≥ 2 distinct lessons)

- **French / Spanish / Dutch — later, report-only first.** The floor is a
  genuine integrity feature (it catches words taught once and never practised
  again). But `curriculum-recurrence.ts` + `audit-recurrence.ts` are built
  against the German trail; siblings were authored without it, so a strict run
  today would likely fail and demand a content pass across all three courses.
  Cost: medium for the script extension, high for the content repairs it
  uncovers. Sequence: extend the audit to siblings in report-only mode, look at
  the numbers, then decide whether the fix pass is worth scheduling.

### Sentence review (failed sentence processes, scheduled separately)

- **French / Spanish / Dutch — already parity at the storage layer; verify
  before building anything.** `SentenceCard` is keyed per language and
  `evaluateAnswerAccuracy` is language-aware, so sibling lessons that queue
  sentence retries should already land in a language-scoped deck. Cost to
  verify: low (one e2e pass picking a wrong syntax_builder/transcribe answer in
  each sibling language and confirming the review deck offers it). If the deck
  is already wired, this item is done, not a build.

### Grammar branches

- **French / Spanish / Dutch — at parity in structure.** All four courses run
  15 branches (fr/es carry 29 branch lessons, Dutch 19). No build. If anything
  deserves work it is *content* depth in the Dutch branches, which is ordinary
  lesson authoring, not a parity feature.

### Frequency ranks

- **French / Spanish / Dutch — never for the current courses.** German's ranks
  come from pinned, checksum-verified corpus lists (`generate-frequency.ts`);
  reproducing that per sibling language means sourcing and pinning corpora for
  three more languages. The sibling courses are built on the cognate/bridge
  engine, not on frequency ordering; a rank badge would add a data pipeline
  (the highest-risk area per `AGENTS.md`) without changing what a learner does.
  Revisit only if the Review Hub ever needs frequency-based decks.

## 5. How this audit was produced

Measurement script (throwaway, since deleted) imported the four lesson
aggregates and three compendia through bun and printed: per-field emptiness
counts, exercise-type usage and per-lesson sequences, first-exercise slots,
prose strings shared by > 1 lesson (≥ 25 chars), story-lesson ids (≥ 9000),
`frequencyRank` fill, and family/compound/false-friend counts. Gender nulls
were listed per language and eyeballed for stray nouns (none found).
