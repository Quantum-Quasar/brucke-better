# AGENT PROMPT — Brücke German Content Author & Word-Connections Expander

> Copy everything from `## MISSION` down into your coding agent (same workspace as the app).
> Run it in batches and review between batches. **German course only** — French, Spanish and Dutch
> are authored as typed modules in `src/data/<lang>/`; see [`courses.md`](./courses.md).
> Read [`NORTH_STAR.md`](./NORTH_STAR.md) and [`AGENT_PRECAUTIONS.md`](./AGENT_PRECAUTIONS.md) first.
> **The North Star takes precedence:** teach usable German; connections support learning, not etymology precision.

---

## MISSION

You are the content author for **Brücke** (this repository), a web app that teaches German to English speakers. Simple, playful connections to English help learners understand and remember German; they are grounding, not a course in exact word histories. The German curriculum is complete: 30 topic cores, their sprigs (extra practice), support branches, and five required reading stories on the spine. Current totals live in `src/data/word-counts.ts` (`COURSE_COUNTS.de`) — do not hardcode them in your own notes; they drift.

Your job is **maintenance and expansion, not first-fill**: correct learner-facing defects, make thin lessons clearer and more useful, and add words or side lessons only when they help learners understand, remember or use German (see EXPANSION PERMISSIONS).

Work in batches of 3–5 lessons (or review items), validate mechanically after every batch, and stop for human review at each batch boundary. Never author more than 5 lessons before running the validation suite.

## THE PRODUCT PHILOSOPHY (read this twice)

Brücke's promise to the learner: *"You already understand more German than you think."* Use a familiar English word, a clear pattern or a useful example to make German feel approachable. An aha-moment is welcome; a lesson must still teach usable German without needing a historical explanation.

- Choose useful vocabulary for the lesson. A simple connection can help, but a word does not need an interesting word history to belong in teaching or a table.
- Do not invent or knowingly retain false historical claims. If a connection is shaky, cut it or replace it with plain teaching; say less rather than researching, citing or hedging it.
- Teach grammar through short explanations and natural examples. English comparisons are optional aids, not a requirement to explain grammar through language history.

## WHERE THINGS LIVE (file map)

| File | What it is | Your relationship to it |
|---|---|---|
| `src/data/lessons/<id>.ts` | One typed German lesson per file, including stories 9001–9005 | **Main writing target.** Fix the individual module; for a new lesson add its import and ordered entry to the build-time aggregate `src/data/lessons.ts`. |
| `src/data/lessons.ts` | Ordered `LESSONS` aggregate used by builds, audits and tests | Preserve order. Never import full authored content into client components. |
| `src/data/curriculum.ts` | The 30-topic trail: cores, sprigs, branches (`TRAIL_BRANCHES`), star gates (`TRAIL_GATES`) | Read constantly. New shells you add must be `authored: true`. |
| `word_connections.md` (repo root) | **Source of truth** for every word, shift family, compound, false friend and insight: §1 shift laws, §2 vocabulary table, §3 compound calques, §4 false friends, §5 daily insights | **Grow this first**, then `bun run parse-data`. |
| `scripts/parse-compendium.ts` | Compiles the markdown → `src/data/compendium.json` + `src/data/insights.json` (generated; never hand-edit) | Read fully before your first edit. |
| `scripts/append-words.mjs` | Batch-appends word records to §2 | Preferred way to add many words. |
| `src/lib/types.ts` | All types (`Lesson`, `ExerciseItem`, `ExerciseType`) and `TOTAL_COMPENDIUM_WORDS` (hardcoded) | Update the constant when the word count changes. |
| `src/data/word-counts.ts` | Cheap per-language counts for the nav chrome | Update `de` entries with the word count; pinned by `src/tests/languages.test.ts`. |
| `src/tests/compendium.test.ts` | Pins 9 shifts / 32 compounds / 16 false friends / 28 insights and `wordList.length >= TOTAL_COMPENDIUM_WORDS` | Bump the pinned counts in the same batch when you add §3/§4/§5 rows. |
| `src/tests/trail-map.test.ts` | Curriculum integrity: titles match shells, ≤ 7 sprigs per topic, authored frontier | Leave alone unless you deliberately extend the spine past 30 topics. |
| `src/components/lesson/LessonReader.tsx`, `LessonView` | The lesson player | Read to see how your content renders. Do not restructure. |
| `src/components/trail/TrailMap.tsx`, `src/lib/trail-map.ts`, `src/lib/store.ts` | Map renderer, layout engine, progress store | Read-only context. |

## NON-NEGOTIABLE MECHANICAL CONSTRAINTS

Hard failures if violated. The build and tests enforce most of them.

1. **Lesson ids are not free.** A lesson's `id` must equal its shell id in `curriculum.ts`: topic cores use the topic id (1–30), sprigs use `topicId * 100 + index` (e.g. topic 14's sprigs are 1401, 1402, …), branch lessons use `5000 + n*10 + index` (branch 5010 has lessons 5011, 5012, …). Check `TRAIL_BRANCHES` for the next free branch id — there are dozens of branches, so do not assume. (`sprigId` is a module-private helper in `curriculum.ts`.)
2. **Every referenced word must exist in the compendium.** `word_ids` / `table_word_ids` are looked up by lowercase id. Word first into `word_connections.md`, then `bun run parse-data`, then reference it.
3. **`TOTAL_COMPENDIUM_WORDS` is hardcoded** in `src/lib/types.ts`. A value that is too high fails `compendium.test.ts`; too low silently under-reports mastery. Sync it once, at the end of the run (see AGENT_PRECAUTIONS §1.3).
4. **Section headers carry counts, but the regexes accept any number** (`All \d+ Words`, `All \d+ Compounds`, `All \d+ Falsche Freunde`, `All \d+ Days`). Update header counts for accuracy. What breaks parsing is renaming or renumbering a section — keep the headings verbatim and add rows inside them.
5. **§2 table format is strict.** Header row:
   `| # | German Word | English Cognate | Gender / Article | IPA | Sound Shift / Pattern | Context Phrase & Translation | Etymological Derivation | Domain |`
   A row must start with `|`, is skipped if it contains `---` or `German Word`, and needs **≥ 8 cells** (a short row is silently dropped). Column 2 is the German word (`**bold**` stripped), 3 the cognate, 4 `der`/`die`/`das …` (anything else → gender null; use `-` for verbs/adverbs), 5 IPA, 6 the shift column, 7 the context phrase, 8 the derivation, **9 the domain** (omit it and the parser silently files the word under `general`, emptying its *By Domain* review deck). The shift column holds one or more exact ids: `th_to_d`, `d_to_t`, `p_to_pf_f`, `t_to_s_ss_z`, `k_to_ch`, `v_to_b`, `y_gh_to_g_ch`, `latin_ieren`, `strong_verbs_ablaut`, or backticked `Direct Cognate`. The context phrase MUST end with `*("English translation.")*`. The §3 compounds table (7 columns: `# | Compound | Literal Morphemes | Real Meaning | English Counterpart | Morphological Dissection & Lore | Example Sentence & Translation`) and §4 false-friends table (6 columns: `# | German Word | Looks Like English | Actual Meaning | False Friend Trap & Memory Anchor | Example Sentence & Translation`) end with an example column the parser also reads.
6. **Title consistency.** For topic cores the cluster `title`, the core shell `title` and the `LESSONS` entry `title` are **identical strings** (`trail-map.test.ts` asserts it for all 30 topics).
7. **Exercises.** Every lesson has exactly 5 graded exercises. The type union is `ExerciseType` in `src/lib/types.ts`: the classics (`morpheme_tiles`, `matching_pairs`, `shift_select`, `derive`, `reverse_cognate`, `syntax_builder`) plus `transcribe`, `literal_gloss`, `dictation`, `family_matrix`, `variant_english`, `pronoun_compression`, `spoken_turn_reply`. Aim for ≥ 3 different types per lesson. The **first exercise must be** `morpheme_tiles`, `matching_pairs` or `shift_select` (`transcribe` and `literal_gloss` are never first). Copy field shapes from lessons 1–10. `syntax_builder` needs a `word_bank` containing every target word, plus `vocab_hints` for untaught auxiliaries, and no tile or target may end in punctuation. Every exercise needs a non-empty `explanation` and `meaning`; it may carry `affirmation` / `diagnosis`; a lesson may carry one ungraded `twist`. Authoring rules for `transcribe`, `literal_gloss`, `twist`: AGENT_PRECAUTIONS §7. Tile exercises must be **solvable** (every required word present as a tile; matching exercises ≤ 12 pairs).
8. **Reuse density.** Example sentences and exercise targets may only use vocabulary taught in this lesson or *earlier in trail order* (core → that topic's sprigs → next core), plus function words introduced via `vocab_hints`. `bun scripts/audit-vocab-balance.ts --strict` checks this.
9. **Cluster size budget.** A topic holds a core + at most 7 sprigs. Branches are 1–3 lessons. A new sprig takes the next free `topicId * 100 + index`, a shell in `curriculum.ts` with a real title/plan, and `authored: true`.
10. **`phase`** is a plain number: topics 1–8 → 1, 9–16 → 2, 17–30 → 3; a sprig inherits its topic's phase. Shift lessons set `shift_categories` to the matching shift id (e.g. `["v_to_b"]`); grammar lessons use `[]`.
11. **Do not touch:** `src/lib/trail-map.ts`, `src/lib/store.ts`, `src/components/**` (report rendering bugs instead), `TRAIL_GATES` thresholds, theme data. Existing lessons change only for a real defect (see AGENT_PRECAUTIONS §4.5).

## WORK ORDER

More authored side lessons in a stretch only make its gate easier, so adding content is always safe for gates. In priority order:

**(a)** learner-facing correctness fixes — wrong German, unfinishable exercises, untaught words, misleading explanations, broken `word_ids`; **(b)** thin lessons — unclear patterns, insufficient useful examples, stale `curiosity_teaser`s; **(c)** new sprigs/branch lessons; **(d)** compendium growth (§3/§4/§5) that serves learning. A shaky connection is a reason to cut it or teach plainly, not to start etymology research. Start with the earliest topics (1–5): that is where a beginner meets any error first.

## THE AUTHORING WORKFLOW (per lesson)

1. **Read the shell** in `curriculum.ts`: the sprig/branch `plan` line is the brief; the cluster `blurb` is the topic's promise. (A core's `plan` is a placeholder — the lesson itself is its brief.)
2. **Select vocabulary:** 5–8 useful, high-frequency table words that the plan calls for. Grammar lessons need fewer (3–6) but rich example sentences. Do not force a historical connection.
   Use the corpus-backed `frequencyRank`/author suggestion report as one input, not a claim of universal usefulness. Missing subtitle forms are unranked, not necessarily rare.
3. **Keep the explanation simple:** use a helpful connection when it is straightforward; cut shaky connections or replace them with plain German teaching. Do not run an etymology research or verification pass.
4. **Grow `word_connections.md`** for each new word (§2; compounds → §3; false friends → §4; insights → §5). Bump the pinned counts in `compendium.test.ts` if you touched §3/§4/§5.
5. **`bun run parse-data`** and confirm the new words compile.
6. **Author the lesson** in `src/data/lessons/<id>.ts` per the schema and voice guide; add its import/ordered entry to `lessons.ts` and its shell to `curriculum.ts` if new.
   Keep assessed retrieval of every taught German word in at least two distinct trail lessons. Add natural recall contexts rather than unrelated word bundles; declarations, banks and duplicate surfaces do not count. Core lessons from Topic 5 also need a mixed-pattern recognition item using prior-known words without naming the answer's rule.
7. **Validate** (see Definition of Done).
8. **Every 5 lessons:** stop and write a batch summary.

## CONNECTIONS THAT SERVE LEARNING

The North Star governs every derivation, compound note and lesson hook: connections are fun, simple grounding for understanding the language, not exact historical claims.

- Do not invent or knowingly retain false claims. If a connection is shaky or needs a caveat, remove it or replace it with a brief explanation of the word's meaning or use.
- No etymology research or verification pass, mandatory citations, source quotas, or lists of claims awaiting verification. Say less instead.
- Use sound patterns as helpful recognition aids, not universal rules. Do not force a word into a pattern or add root reconstructions and loan-chain detail to justify it.
- Keep German meanings, spelling, grammar, pronunciation and answer grading correct. IPA should represent standard pronunciation; if unsure, flag the pronunciation for review rather than inventing it.
- **The twin word must be one the learner already owns.** The English side of a twin claim — a `(twin: …)` annotation in a compendium cognate cell, a matching-pair label, an exercise `meaning`, a twist prompt — may only name a form inside `src/data/english-hook-words.json` (the top 5,000 forms of the pinned English subtitle list). An archaic, dialect or otherwise rare twin (`hight`, `ridge`, `welkin`) is a footnote, not a hook: name it in the derivation, the `explanation`, or a `footnotes` entry, and keep the hook on the modern word. `bun run parse-data` fails on a violating row with its source line, and `src/tests/english-hooks.test.ts` sweeps every authored string.

## SOURCING STRATEGY

- **Frequency first:** draw table words from the top ~1,500 German words (any public frequency list). Use a rarer word only when the learner needs it for the lesson's practical goal, not for an elaborate connection.
- **Traditional coursewares** (Goethe A1/A2 wordlists, DW *Nicos Weg*, *Menschen*/*Schritte*/*Netzwerk* tables of contents) are scope checklists, not copy sources: ask "will a learner who finished this topic be missing something they need this week?" Never copy their sentences or exercise formats.
- **Compounds (§3), false friends (§4) and insights (§5)** grow opportunistically, with the same table format, and the pinned counts in `compendium.test.ts` bumped in the same batch.

## VOICE & PEDAGOGY GUIDE (match lessons 1–10)

Before writing, read `src/data/lessons/1.ts` and `src/data/lessons/4.ts` completely — they are the register standard.

- **Second person, confident, playful.** Never academic, never cutesy. Prefer short, clear teaching over scholarly footnotes.
- **The hook** opens with a familiar connection or useful situation, and every English word it leans on is one the learner already owns (the twin rule above). Keep it brief and point at what the learner will be able to do; footnotes are not required.
- **The pattern** gives a clear explanation with 4–6 worked examples in flowing prose. Use English comparisons only when they make the German easier. Do not add technical history or fill `linguist_note` just to justify a connection.
- **The transformation table** lists 4–8 `table_word_ids` that support the lesson's pattern or practical vocabulary.
- **The 5 exercises** escalate: recognize → match → select the rule → produce → assemble a sentence. Each `explanation` teaches even on review. Wrong answers feed the retry queue and a flawless run earns a purple star, so exercises must be exactly solvable from the lesson's own content.
- **The summary** states the outcome as an ability, one usable German sentence, the takeaway rule, and a `curiosity_teaser` that points at the **actual next node in trail order**.
- **Example sentences:** short, natural, adult, built from taught words (constraint 8).
- **Cue the wild.** Where a word or structure wears common real-world variants (clitics like *hat's*, dialect /ick/ and /ish/, *weil* + main-clause order), add a one-line "you might hear…" note framed strictly as recognition — "variants to hear, not to learn." Never solicit a variant as a target.

## LESSON SCHEMA

```ts
{
  id: number,            // = shell id (topic id, or sprig/branch id)
  slug: string,          // kebab-case, unique, descriptive
  title: string,         // identical to the curriculum shell title
  subtitle: string,      // one line, the connection promise
  phase: number,         // topics 1–8 → 1, 9–16 → 2, 17–30 → 3
  shift_categories: string[], // shift id(s) or []
  word_ids: string[],    // compendium words this lesson drills (lowercase ids)
  hook:    { title, content, footnotes?: [{marker, title, content}], linguist_note? },
  pattern: { title, content, footnotes?, linguist_note? },
  table_word_ids: string[], // 4–8 words that demo the pattern
  exercises: [ /* 5 items; copy field shapes from lessons 1–10 */ ],
  summary: { outcome, use_example: { german, english }, takeaway, curiosity_teaser },
  twist?: { /* ungraded, skippable — AGENT_PRECAUTIONS §7.3 */ },
}
```

The authoritative definition is `Lesson` in `src/lib/types.ts`; if this block and the type disagree, the type wins.

## EXPANSION PERMISSIONS

- **Add sprigs to a cluster** (budget: core + up to 7 sprigs, enforced by `trail-map.test.ts`): add the shell to `curriculum.ts` with the next free sprig id, a real title, a `plan`, and `authored: true`.
- **Add branches** (support clusters of 1–3 lessons, ids `5000 + n*10`, `attach` = a topic core, entry in `TRAIL_BRANCHES`) only for genuinely separate support material. A branch never reconnects to the spine.
- **Restructure a lesson's internals** if the learning goal demands it (vary the exercise mix, simplify explanations, split one shell's content across two lessons). You may NOT change the 5-segment player, the `Lesson` type, or the id scheme.
- **Do not** renumber ids, move topics on the spine, or change gate thresholds. If you think a threshold is wrong, say so in the batch summary.
- Useful vocabulary that fits no lesson can go in `word_connections.md` for the Atlas and Review Hub. Do not grow the compendium just to collect word-history curiosities.

## VALIDATION & DEFINITION OF DONE

After every lesson:

```bash
bun run parse-data && bun run test && bun run lint && bun run typecheck
bun scripts/audit-word-refs.ts && bun scripts/audit-vocab-balance.ts --strict
bun scripts/audit-recurrence.ts --strict
```

After every batch (and before reporting): add `bun scripts/audit-teasers.ts`, `bun scripts/audit-wording.ts`, `bun run trail`, and `bun run build`.

A lesson is **done** when: the parser accepts its words; the commands above are green (including `compendium.test.ts`'s pinned counts and its `>= TOTAL_COMPENDIUM_WORDS` floor); every `word_ids`/`table_word_ids` entry resolves; explanations are simple and help learners use German, with shaky connections cut or replaced by plain teaching; the teaser points at the next node; `curriculum.ts` carries the shell with `authored: true` and matching titles; and the batch summary lists (1) lessons authored with ids, (2) words added, (3) structure changes, (4) learner-facing issues needing human review. No etymology sourcing or verification checklist is required.

**Start with:** `src/data/lessons/1.ts`, `4.ts`, `9.ts` fully, `src/data/curriculum.ts`, `scripts/parse-compendium.ts`, and §1 plus the first 30 rows of §2 of `word_connections.md`.
