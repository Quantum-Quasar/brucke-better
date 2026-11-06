# Agent Precautions — Brücke Repository

> **Read this before editing anything.** Every entry below was learned the hard way — each
> corresponds to an actual incident or a structural landmine in this codebase. Entries are
> grouped by area, and each states the **condition** under which it applies. If your task
> doesn't trigger any condition, proceed normally. If it triggers one, follow the action.

**Validation baseline (always applicable):** `bun run parse-data && bun run test && bun run lint && bun run typecheck` must be green before you start and after every batch. Full `bun run build` (`parse-data && export-data && next build`) at phase boundaries. CI runs exactly these, plus the four audits below — never declare done without all of them.

**The audit tools (always applicable at the end of content work; CI runs the first four):**
- `bun scripts/audit-word-refs.ts` — every word reference resolves (exits 1 on failure)
- `bun scripts/audit-teasers.ts` — must report `title drift: 0 | teaser flags: 0`. It never sets a failing exit code, so read the output yourself; `⚠` means "look at this", not "broken"
- `bun scripts/audit-wording.ts` — no prose copy-pasted between neighbouring lessons
- `bun scripts/audit-vocab-balance.ts --strict` — words are taught before they are used; new-word bands and floors hold
- `bun run trail` (`scripts/export-trail.ts`) — regenerates `TRAIL.md`; run it after any lesson/teaser change

The audits and the `lessons.ts` rules below are **German-only**. French, Spanish and Dutch are authored as typed modules under `src/data/<lang>/` and guarded by their own `*-content.test.ts` files; see [`courses.md`](./courses.md).

Docs map and off-limits folders: [`INDEX.md`](./INDEX.md).

---

## 1. Compendium (`word_connections.md`) — applies when you touch §2–§5

### 1.1 §2 table format is machine-parsed and strict
- **Applies when:** adding or editing any row in §2 (the vocabulary table).
- **Action:** rows have 9 columns: `| # | **German** | cognate | der (m)/die (f)/das (n)/- | /IPA/ | \`shift_id\` | Phrase *("Translation.")* | Derivation | domain |`. The parser accepts 8 cells and silently defaults the missing `domain` to `general`, which empties the *By Domain* review deck for that word — always write the 9th column. The shift column may only contain the exact ids (`th_to_d`, `d_to_t`, `p_to_pf_f`, `t_to_s_ss_z`, `k_to_ch`, `v_to_b`, `y_gh_to_g_ch`, `latin_ieren`, `strong_verbs_ablaut`) or `` `Direct Cognate` ``. The context phrase MUST end with `*("...")*` — the parser regex-extracts the translation. The gender cell must start with `der`/`die`/`das` or be `-`.
- **Known incident:** a row with the article inside the German word cell (`**das Gift** (trap)`) produced the id `das gift` and silently broke every lesson referencing `gift`.

### 1.2 Word ids are the German word lowercased — check for duplicates
- **Applies when:** adding ANY new word.
- **Action:** `grep -i "word" word_connections.md` before writing the row. The id is the German word lowercased; a duplicate id silently overwrites the earlier entry and only surfaces as a mysterious count mismatch (a previous run added `bekommen` twice and the parser emitted 310 rows for 311).

### 1.3 Count sync happens ONCE, at the end of a content run
- **Applies when:** you are adding words across multiple batches.
- **Action:** do NOT update the §2 header (`All N Words`), the inventory block, or `TOTAL_COMPENDIUM_WORDS` in `src/lib/types.ts` per batch. Sync all of them once, to the true final count, at the very end (also `WORD_COUNTS.de` / `COURSE_COUNTS.de` in `src/data/word-counts.ts`, which `languages.test.ts` pins to the data, and the counts quoted in the README files, which `docs-sync.test.ts` pins). Per-batch syncing causes test churn and wasted context. (The count test in `compendium.test.ts` is deliberately tolerant — `≥ TOTAL_COMPENDIUM_WORDS` — do not "fix" it back to strict equality without syncing.)

### 1.4 Section regexes vs. section headers
- **Applies when:** editing any `##` section header in `word_connections.md`.
- **Action:** the parser regexes are count-agnostic (`All \d+ Words`), so they won't break — but the headers must still be updated to the true count at final sync, and `compendium.test.ts` asserts 32 compounds / 16 false friends / 28 insights. If you add §3/§4/§5 rows, update those headers AND the test expectations deliberately — never silently.

### 1.5 Real Unicode, not escape sequences
- **Applies when:** writing German text into `.ts` source files.
- **Action:** write ä/ö/ü/ß as literal characters. `\u00df`-style escapes are valid TS but break plain-text audits, greps, and diff review (`stra\u00dfe` once masked a word-id mismatch).

---

## 2. Etymology — applies when you add words or write cognate hooks

### 2.1 The no-invention rule
- **Applies when:** writing any derivation, etymology hook, or "philosophy" claim about a word pair.
- **Action:** verify against en.wiktionary.org (German entry, Etymology section) and cite `[wiktionary]` in the derivation cell. If unverifiable: drop the word, or keep it with `[UNVERIFIED — check]` and list it in your report. LLM-generated etymology is plausible-sounding nonsense more often than almost anything else — this rule is the brand.

### 2.2 Known etymology traps (do not repeat these mistakes)
- **Applies when:** writing hooks for these specific pairs.
- **Action / facts:**
  - **Vater/father is NOT the V→B family.** It is `*fadēr` with Verner's-law voicing; German V=[f] corresponds to English f. An external analysis claimed "V→B shift!" — that is wrong.
  - **heute is NOT cognate with today** as a compound (English's twin *hēodæġ* died out). Present it as "on this day" — honest, not a twin claim.
  - **von** has a disputed etymology — keep it as a vocab hint, never a compendium claim.
  - **treffen ↔ drape** (pre-existing row 101) is thin — flagged for human verification; do not build new content on it without a second source.
  - **bald ↔ bold** (`*balþaz`) is standard but semantically surprising — spot-check before reusing the hook.

### 2.3 Research subagents report; they never edit
- **Applies when:** fanning out research to subagents.
- **Action:** subagents return per-word records (verdict, reconstruction, one-line derivation, IPA, gender, source quote). The main agent writes all file changes. Never let a subagent edit files, and never parallelize writes to shared files (`lessons.ts` is one).

---

## 3. Structure (trail map) — applies when you add shells or change order

### 3.1 Never renumber or insert topics
- **Applies when:** a proposal says "insert topic 10.5", "move the umlaut clinic earlier", or anything that reorders the spine.
- **Action:** topic ids are welded into lesson ids, spine edges, gate `afterTopic` positions, store progress, and layout tests. Implement inserts as **sprigs on adjacent topics** or **branches** instead. Appending new topics **after 30** is safe (gates are unaffected); inserting before 30 is not.

### 3.2 Cluster budget: max 8 lessons per topic
- **Applies when:** adding sprigs to a topic.
- **Action:** core + up to 7 sprigs. Check the topic's current count before adding. Sprig ids are `topicId * 100 + nextIndex`; branch ids are `5000 + n*10` with lessons `+1, +2`.

### 3.3 Gate math
- **Applies when:** adding any lesson.
- **Action:** more side lessons only ever make gates easier — never weaken a gate threshold, never touch `TRAIL_GATES` fields. More authored content before a gate is always safe.

### 3.4 Branch lessons are side material
- **Applies when:** authoring branch lessons or their teasers.
- **Action:** branch teasers chain within their own branch (lesson i → lesson i+1); the last one may point back toward the spine. Spine teasers must never point into a branch. The teaser auditor only walks the spine — branch chains are your own responsibility.

---

## 4. Lessons (`src/data/lessons/<id>.ts`) — applies when you author or edit lessons

### 4.1 Schema discipline (tests enforce most of this)
- **Applies when:** authoring a lesson or editing exercises.
- **Action:**
  - Exactly 5 graded exercises. The classic types are `morpheme_tiles`, `matching_pairs`, `shift_select`, `derive`, `reverse_cognate`, `syntax_builder`; the full union (`ExerciseType` in `src/lib/types.ts`) also has `transcribe`, `literal_gloss`, `dictation`, `family_matrix`, `variant_english`, `pronoun_compression` and `spoken_turn_reply`. `src/tests/exercises.test.ts` pins the per-type rules (e.g. a lesson never opens with `transcribe`/`literal_gloss`); read it before using a newer type.
  - **First exercise must be** `morpheme_tiles`, `matching_pairs`, or `shift_select` — never cold typing (`derive` first has failed a test before).
  - `syntax_builder`: `word_bank` must contain every word of `target_answer`; untaught auxiliary words need `vocab_hints`; no trailing periods/punctuation in targets.
  - `morpheme_tiles`: tiles must be able to form the answer.

### 4.2 Reuse density follows TRAIL order, not id order
- **Applies when:** writing example sentences or exercise targets.
- **Action:** you may only use vocabulary from lessons **earlier in trail order** — core → that topic's sprigs (in id order) → next core — plus function words introduced via `vocab_hints`. Sprig 402 comes *before* core 5 in trail order even though `402 > 5` numerically. Violating this makes exercises unfair even when tests pass.

### 4.3 Title consistency
- **Applies when:** authoring any lesson.
- **Action:** the lesson's `title` must equal the curriculum shell's `title` character-for-character (the map signpost and lesson page must never disagree). The auditor catches drift (a past incident: "Double-Shift" vs "Double Shift").

### 4.4 Teaser chain
- **Applies when:** writing or editing any `curiosity_teaser`.
- **Action:** the teaser must point at the **actual next node in trail order** and name it recognizably (the auditor matches ≥5-char tokens from the next node's title; titles like "will ≠ will" fall back to the shell's plan line). Run `bun scripts/audit-teasers.ts` until 0 flags. Re-point by changing **only** the teaser string.

### 4.5 Do not touch authored lessons or protected files
- **Applies when:** you feel like "improving" existing content.
- **Action:** treat authored lessons as frozen unless the human asks you to change them. Surgical learner-facing fixes (wrong German, unfinishable exercise, untaught word, stale text) are allowed under [`NORTH_STAR.md`](./NORTH_STAR.md); never change a lesson's `id`/`slug`/`title`/`phase`/`shift_categories`/position. Also protected unless the task is about them: `src/lib/trail-map.ts`, `src/lib/store.ts`, `src/components/**` (report rendering bugs instead of fixing them), `TRAIL_GATES` thresholds, theme data. The compendium's §1 shift definitions are parser-anchored — edit only with extreme care. If a prompt from the human grants an explicit override, that prompt wins for that task.

---

## 5. Code & tooling — applies when running or changing code

### 5.1 The `parallel` sandbox cannot see `node_modules`
- **Applies when:** running tests/builds.
- **Action:** run validation commands sequentially. Running them via GNU `parallel` (or any sandboxed wrapper) once produced `vitest: command not found` and a cascade of false errors. Sequential in the repo root always works.

### 5.2 `node_modules` can vanish
- **Applies when:** commands suddenly fail with "module not found" after working before.
- **Action:** check `ls node_modules`; if empty/missing, `bun install` (bun.lock is committed). Don't debug phantom errors first — check the obvious.

### 5.3 TS1128 at the last line is usually NOT a bracket problem
- **Applies when:** bulk-appending content to `lessons.ts` (or any TS array file) and tsc reports "Declaration or statement expected" at the final lines.
- **Action:** first search for a **newline inside a string literal** or an unterminated string earlier in the appended block — a raw line break inside a quoted string cascades to errors at the file end. Only then check for stray closing brackets. (Known incident: a python-append left `]\n];` at the file end — happened three times; check for it by name.)
- **Related:** `TS2561 ... does not exist in type 'LessonSection'` means a typo'd object key (`footones` for `footnotes`) — passes runtime, fails tsc.

### 5.4 Individual lesson authoring
- **Applies when:** adding or editing lesson sources.
- **Action:** edit the typed module `src/data/lessons/<id>.ts` (including stories 9001–9005). `src/data/lessons.ts` is only the ordered build-time aggregate: add its import and array entry without moving existing entries. Sibling courses use `<language>/lessons/<id>.ts`; Dutch files remain `DutchLessonSpec` inputs to the factory. Run `bun run typecheck` and `bun run export-data`; never edit generated `public/data` JSON by hand.

### 5.5 Audit word references before declaring done
- **Applies when:** you added lessons and/or words.
- **Action:** run `bun scripts/audit-word-refs.ts`. It verifies every `word_ids` / `table_word_ids` entry resolves against the compendium (a missing word = broken lesson page at runtime). The same logic runs inside `bun run test` via `src/lib/word-refs-audit.ts` / `src/tests/word-refs.test.ts`, so a failure there is the same bug.

### 5.6 AI prose self-review
- **Applies when:** you generated long prose (hooks, patterns, summaries).
- **Action:** re-read your own output for "self-correcting" garbage that leaks from generation: `"...wait — ..."`, `"...? no — ..."`, half-deleted alternatives, sentence fragments mid-explanation. These pass all tests and embarrass the product. Several such passages had to be repaired post-hoc; catch them before commit.

---

## 6. Process — applies to any multi-batch content run

### 6.1 Batch discipline
- **Applies when:** authoring more than ~2 lessons or ~30 words.
- **Action:** batches of max 5 lessons (or ~30–40 words), each followed by the validation baseline. Full build at phase boundaries. Never author a large amount of content before the first validation — errors compound.

### 6.2 Report honestly
- **Applies when:** writing your final summary.
- **Action:** list (1) content added with ids, (2) words with sources, (3) structural changes, (4) every `[UNVERIFIED]` item and every dropped candidate, (5) validation results, (6) what you deliberately did not do and why. "Done and verified" is only claimed when it is.

### 6.3 Subagents are for reading and research, not writing
- **Applies when:** the task is big enough to parallelize.
- **Action:** fan out verification/analysis to subagents, but file writes stay with the main agent. Lesson aggregates are ordered and single-writer.

---

## 7. Thinking Method surfaces (`transcribe`, `literal_gloss`, `twist`) — applies when you author or edit the TM content

> These surfaces shipped with the Thinking Method upgrade, which also amends §4.5: surgical
> edits to existing lessons are permitted (never `id`/`slug`/`title`/`phase`/`shift_categories`/
> position; at most one exercise swap per lesson per batch; lessons 1–10 are add-only).
> The method's design rationale lives in `docs/dont open untill mentioned/thinking-method-short.md`
> (large; open it only when the task is about the method itself).

### 7.1 `transcribe` invariants (tests enforce most of this)
- **Applies when:** authoring a production drill.
- **Action:** `word_bank` must contain every word of `target_answer` **and** be strictly
  longer than the target's word count (≥ 1 distractor — a transcribe without distractors is
  a syntax_builder in disguise). `cues` is 1–3 scaled prompts (topic band 2–7 → 3, 8–16 → 2,
  17–30 → 1). `idea` must pin every German form (person, tense, object) in natural English.
  No trailing punctuation on `target_answer` or bank chips. Never in the first exercise slot.

### 7.2 `literal_gloss` invariants
- **Applies when:** authoring a direct-translation exercise.
- **Action:** `options` unique, 3–4, contains `target_answer` (the word-for-word rendering);
  the other options must be natural or *differently* wrong — author them natural first.
  `explanation` names the cluster's taught law in the trail's voice. Only in the seven
  word-order clusters (topics 2, 12, 13, 14, 15, 20, 27) and their drilled sprigs — outside
  word order it becomes a gimmick (TM-2 limit 2). Never in the first exercise slot.

### 7.3 The `twist` is ungraded and outside the 5-exercise contract
- **Applies when:** authoring or touching `lesson.twist`.
- **Action:** exactly one optional twist per lesson; it never counts toward the 5 exercises,
  never touches `everQueued`, the retry queue, star logic, or completion gating. Its
  `target_answer` obeys the no-trailing-punctuation rule; its `word_bank` (if present) must
  contain every target word. Grading a twist would turn a deliberate tangent into a test — do not.

### 7.4 Word-reference audit is wider now
- **Applies when:** any content batch.
- **Action:** run `bun scripts/audit-word-refs.ts` alongside the baseline — it checks
  `word_ids`/`table_word_ids` **and** every German token in `transcribe` (answer + bank),
  `twist`, and `literal_gloss.german` against the compendium, vocab hints, and a documented
  function-word/inflection table. A new unresolved token is either a bug or a new allowlist
  entry you must justify in the batch report.

### 7.5 Feedback fields ride on exercises, not on sweeps
- **Applies when:** authoring affirmations or diagnoses.
- **Action:** `affirmation` (≤ 140 chars, restates the process, only true claims) and
  `diagnosis: { slip, cue }` (authored override for the common wrong answer) are authored
  per batch alongside exercises, never as a separate sweep. Authored diagnosis wins over
  the computed one (`src/lib/shift-diagnosis.ts` + `src/data/shift-diagnosis-table.ts`);
  the table is data — new rows are allowed but every cue must state a real law (P7).

### 7.6 Duplicate exercise ids were a live bug — keep checking
- **Applies when:** editing exercises in individual lesson modules.
- **Action:** the id convention is `l<lessonId>_e<n>`; sprig 202's e5 shipped as `l2_e5`
  (duplicate of core 2's) and was only found when a regex edit landed on the wrong block.
  Check exercise ids across the German lesson modules, including generated reading
  lessons; duplicate ids can cause one missed exercise to hide another in retries.

---

*If you find a new trap, add it here with its condition — this file is the institutional memory that keeps agents from re-learning the same lessons.*
