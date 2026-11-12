# Architecture

How Brücke is put together and which design decisions are load-bearing. Deliberately
light on counts — those rot. Current totals live in `src/data/word-counts.ts`
(`COURSE_COUNTS`), are pinned by `src/tests/languages.test.ts` and
`src/tests/docs-sync.test.ts`, and are quoted in [`README.md`](./README.md).
Schemas live in [`AUDIT_MANIFEST.md`](../AUDIT_MANIFEST.md) and `src/lib/types.ts`;
the code is the final authority if anything here disagrees.

## 1. Thesis

English and German share a West Germanic ancestor. Between 500 and 800 AD, southern
and central German dialects underwent the Second High German Consonant Shift; English
kept the ancestral consonants. Learners decode English cognates into German through
regular sound correspondences instead of rote memorisation. The same engine teaches
French (Norman doublets), Spanish and Dutch — see [`courses.md`](./courses.md).

The north star is that Brücke **teaches German**; etymology is the memory hook
([`NORTH_STAR.md`](./NORTH_STAR.md)).

The nine German shift families (ids as they appear in `word_connections.md`):
`th_to_d`, `d_to_t`, `p_to_pf_f`, `t_to_s_ss_z`, `k_to_ch`, `v_to_b`, `y_gh_to_g_ch`,
`strong_verbs_ablaut`, `latin_ieren`. The atlas adds one virtual "unshifted" family
(hence ten per language in `COURSE_COUNTS`). `src/lib/shift-annotator.ts` aligns an
English cognate against its German twin using whole-word weighted alignment of known
correspondences (bounded 500-entry cache). It highlights both parts of a double shift,
leaves unrelated edits uncoloured and declines unanchored guesses. Twenty golden pairs
pin the actual coloured spans; `ShiftPair.tsx` renders the result.

## 2. Rendering model

- **Next.js App Router, 100% static.** Every route is pre-rendered; dynamic segments use
  `generateStaticParams()` with `dynamicParams = false`. The six top-level routes are
  `/`, `/atlas`, `/panorama`, `/review`, `/settings`, `/about` (the bottom dock has the
  matching six tabs).
- **Lessons and atlas details are shareable in-page views.** Practice stays dynamically
  loaded by `AppShell.tsx` (`LessonView`, `ConstellationDetailClient`).
  Opening, changing or closing a view replaces the current URL without adding history:
  `/?lesson=1&lang=de`, `/atlas?family=th_to_d&lang=de`, `/atlas?master=1&lang=de`.
  Reloads and copied links restore the view and course. Browser Back/Forward follows
  actual tab history, restoring the destination's view; lesson overlays do not push
  touch-device sentinels. Crossing tabs still pushes one normal entry.
  Legacy `/trail`, `/trail/:id`, `/atlas/:family` and `/atlas/master` links restore
  matching views. Canonical `/trail/:lang/:id` pages additionally pre-render authored
  lesson introductions, patterns, vocabulary and outcomes with `LearningResource`
  structured data. Their practice links open the existing overlay. `sitemap.xml`
  lists available lessons; `robots.txt` points to it.
- **Per-language data is fetched, not bundled.** `bun run export-data`
  (`scripts/export-client-data.ts`, run by `dev` and `build`) writes each language's
  compendium, a compact lesson index and one payload per lesson to `public/data/<lang>/`,
  so heavy lesson data stays out of the shared chunk. Only authored exercise counts
  are bundled via generated `src/data/lesson-exercise-counts.json`; trail effort
  estimates require no JSON request, while lesson headers use the loaded exercises.
- **Lesson code is split by segment and input.** `LessonReader` renders lazy
  `segments/` views; `use-lesson-session.ts` owns progression and retries.
  `ExerciseWidgets` dispatches to lazy exercise implementations; classic input
  surfaces live in `inputs/` with a shared grading controller.
- **Root layout:** an inline pre-paint script reads `localStorage` / the fallback cookie
  and applies theme variables before first paint (no FOUC); `darkreader-lock` protects
  the calibrated palettes; a `storage` listener re-hydrates every open tab when
  progress changes; modal components (`WordCardDrawer`, `OnboardingModal`, the theme and
  font selectors) are dynamically imported.
- **Search** lives in the top navigation. `/` opens it outside editable controls
  and blocking dialogs. The language-scoped index loads on demand; word, meaning,
  English cognate, family, domain and lesson searches open a word card or teaching
  lesson. A missing teaching reference is not replaced by a guessed lesson.

## 3. Content pipeline

```
word_connections.md ──scripts/parse-compendium.ts──▶ src/data/compendium.json
                                                      src/data/insights.json
                                    scripts/export-client-data.ts ──▶ public/data/<lang>/…
```

`word_connections.md` is the hand-maintained source of truth for the German words, shift
laws, compounds, false friends and insights; the generated JSON is never hand-edited.
`bun run build` is `parse-data && export-data && next build`; `public/data/` is an ignored
distribution artifact, regenerated before tests, development and builds. The committed
frequency attribution in `src/data/frequency-provenance.json` is copied into that output.
French, Spanish and Dutch are typed TS modules, not parsed from markdown. Details:
[`scripts/README.md`](../scripts/README.md).

Authored lessons are individual typed modules: German in `src/data/lessons/<id>.ts`,
the sibling courses in `src/data/<language>/lessons/<id>.ts`. The existing
`lessons.ts` / `lessons-xx.ts` modules are ordered build-time aggregates.
Dutch still expands each `DutchLessonSpec` through its existing factory.
Browser views never import these aggregates and never prefetch the next lesson
automatically; only opening a lesson or showing pointer/keyboard intent fetches it.

## 4. The trail (homepage)

- A Baba-Is-You-style node graph built by `src/lib/trail-map.ts` and drawn by
  `src/components/trail/TrailMap.tsx` (custom DOM + SVG, no game library).
- **Nodes:** 30 spine cores (ids 1–30, strictly ordered), **sprigs** (`topicId*100+n`,
  skippable extra practice), support **branches** (`5000+n*10+lesson`, never reconnect
  to the spine) and five required reading stories (9001–9005) on the spine.
- **Unlock rule:** required spine cores and stories require all preceding spine nodes;
  node 1 starts unlocked. Optional sprigs/branches remain skippable and cannot substitute
  for a missing core; applicable gates must also pass. Completing an already-reachable
  side lesson does not unlock the next topic around its core.
- **Six star gates** (`TRAIL_GATES` in `src/data/curriculum.ts`) sit at family boundaries
  and count stars earned only inside their stretch, plus a passed checkpoint test:
  Shift (after topic 7, 14★), Grammar (10, 6★), Verb-Complex (16, 11★), Past (20, 9★),
  Atlas (26, 11★), Capstone (29, 9★). A closed gate hard-locks the spine edge but leaves
  already-reachable nodes playable; extra side lessons only ever make a gate easier.
  (French/Spanish/Dutch define their own gates in `curriculum-<lang>.ts`.)
- **Stars:** gold for completing a lesson; **purple** for a flawless first-try run
  (retry queue never touched) — never downgraded on replay.
- **Layout:** topic 1 at the bottom, the learner climbs upward; a serpentine spine,
  responsive width via `ResizeObserver` (no CSS scaling), `content-visibility` windowing
  per cluster, deterministic decorative glyphs. `use-course-recommendation.ts` drives the
  selector, next-lesson bar, Review continuation and lesson-summary continuation from one policy.
- **Recommendation order:** each topic's core, sprigs, attached support branches and stories;
  every authored lesson participates. Earlier incomplete lessons are recommended before the
  frontier. Continue ahead increments language-scoped view preferences for those gaps; after
  three explicit bypasses they stop resurfacing but remain incomplete and manually playable.
  A progress-reset epoch invalidates those preferences. The bar also opens reached checkpoints.
  Tab from the unfocused trail targets Start; Enter launches it; ordinary focus navigation remains intact.
- **Topic ids are welded** into lesson ids, spine edges, gate positions, store progress
  and tests — never renumber or insert before 30 (see `AGENT_PRECAUTIONS.md` §3.1).
- Off-screen topic graphics, badges and watermark details mount as the viewport approaches;
  lesson buttons remain mounted and usable. Node styling does not animate layout properties
  during responsive sizing. Optional daily-insight data loads separately from the primary action.
- German cores 5–30 include mixed-pattern recognition. `curriculum-recurrence.ts`
  counts distinct assessed German surfaces by lesson/exercise type, excluding declarations,
  banks, hints and duplicate surfaces. Every taught word meets a two-distinct-lesson floor;
  three or more lessons is an authoring target, not a guaranteed retention claim.

## 5. Lessons and grading

- **Five segments:** Hook → Pattern → Transformation table (+ Atlas bridge card) →
  Practice (exactly 5 graded exercises, one at a time) → Summary (outcome, example,
  takeaway, `curiosity_teaser`). Every lesson also ends with an ungraded, skippable
  **Twist** card outside the 5-exercise contract.
- **Exercise types:** the `ExerciseType` union in `src/lib/types.ts` (classic tiles,
  matching, shift select, derive, reverse cognate, syntax builder, plus the Thinking
  Method types: transcribe, literal gloss, dictation, family grid, variant English,
  pronoun compression, spoken turn reply). Per-type authoring rules:
  [`AGENT_PRECAUTIONS.md`](./AGENT_PRECAUTIONS.md) §4 and §7.
- **Grading:** `letter-diff.ts` diagnoses exact, near and incorrect answers;
  `lesson-grading.ts` applies the learning policy. Missing infinitive endings or articles
  do not satisfy production. Initial spelling near-misses queue reinforcement; repeated
  spelling errors cannot drain it. Configured casing/digraph tolerances remain respected.
  Free-production `accepted_answers` are explicitly authored, with exact alternatives preferred
  over near matches to the canonical target. Multiple-choice grading remains direct equality.
- **Retry queue:** missed items replay at the end of Practice and must drain before
  Summary unlocks; touching it forfeits the purple star. Pending exercise IDs and
  the reinforcement position persist with lesson progress, so leaving or reloading
  cannot bypass retries. Retries rotate their surface deterministically
  (`src/lib/retry-variation.ts`); an "I guessed" flag on a correct answer re-grades
  the word as Hard.
  Matching counts each reinforcement miss so guided re-learning is reachable after two misses.
  Historical notes, margin notes and linguistic background use closed native disclosures.
- **Anti-spoilers:** matching columns are cyclically shifted so pairs never align;
  `syntax_builder` banks strip trailing punctuation; review cards hide the gender colour
  behind `[ der / die / das ? ]` until recall.

## 6. Atlas, Panorama, Review

- **Atlas (`/atlas`)** is open from day 1: four atlases (one per language) show each
  family as a radial constellation. Every word is in one of four states — unexplored,
  explored (word card opened), encountered (its lesson opened), mastered.
  Every family also offers a semantic English/target/shift/example table and the same
  drill. Atlas and Trail controls remain keyboard reachable with visible focus.
  Reduced-motion mode removes animation/pulses without removing content or layout;
  gender badges carry a readable article and gender cue as well as colour.
- **Panorama (`/panorama`)** is the opt-in structure reference (articles as pronouns,
  the verb bracket, adjective endings, tense map); no levels, no gating.
  [`german-panorama.md`](./german-panorama.md) is its repo-side map, read by
  `src/tests/tm6-ideas.test.ts`.
- **Review Hub (`/review`)** runs SM-2 (`src/lib/srs.ts`) over unified word entities
  (`src/lib/word-entities-core.ts`: words, compounds, false-friend traps and lesson
  example sentences). Grades 1/3/4/5; below 3 resets repetitions, interval to 1 day and
  adds a lapse; ease factor `EF' = EF + 0.1 − (5−g)(0.08 + (5−g)·0.02)` floored at 1.3;
  a word is **mastered** at `repetitions ≥ 3 && interval ≥ 7`. Decks and styles live in
  `src/lib/review-decks.ts` / `src/lib/review-modes.ts` (due, learned, by shift family, by domain,
  weakest, recent lessons, compounds & traps, sentence patterns, article & gender drill,
  everything; four styles: flip, MCQ, tile builder, derivation typing).
  Focused buttons and links retain their native Enter and Space activation instead of
  triggering review's reveal or quick-grade shortcuts.
  `components/review/` separates the session controller, deck selection, answer entry,
  session card and style dialog. Beginner actions precede a closed advanced-options disclosure.
  The learned-word deck is independent of the advanced scope filter. Tiles and typing use
  the same grading policy: exact Good, spelling near-miss Hard with feedback, grammar omission Again.
  Session limits are 5/10/20/All (default 10), shared by ordinary word decks including
  Learned Words. Suspend excludes a card until manual resumption; Bury excludes it
  until the next local calendar day, including DST changes. Five lapses since relearning
  move the card to a separate Relearn management queue rather than another failed loop.
  Mapped cards link to their teaching lesson and require a new completion before explicit
  resumption; dictionary-only cards offer contextual relearning without invented links.
  Relearning preserves lesson completion, stars and mastery. Mastered words still schedule.
- **Sentence process review** is additive to the word/entity decks: first incorrect
  sentence answers create language-scoped `SentenceCard`s; existing widgets replay
  at most 15 due processes per session. Failure scheduling and lesson retry queueing
  are separate callbacks, so one wrong answer cannot count twice. Replay never awards
  lesson completion, stars or word mastery. See [`SENTENCE_REVIEW.md`](./SENTENCE_REVIEW.md).
- **Frequency** comes from pinned FrequencyWords/OpenSubtitles 2018 lists, with
  checksums and CC BY-SA provenance in `src/data/frequency-provenance.json`,
  published to `public/data/frequency-provenance.json` on export.
  Build-time subsets enrich fetched lexical entities; no full corpus is imported
  by client code. Exact normalized forms get ranks; missing forms, sentence and
  article-drill entities remain unranked. Frequency breaks equal due-date/ease ties only.
  Review lifecycle, ordering, grading and answer entry have separate modules.
  The same pinned revision also yields `src/data/english-hook-words.json`: the English
  forms a hook may name as a twin the learner already owns, checked by
  `src/lib/english-hooks.ts`, the compendium parser and `english-hooks.test.ts`.

## 7. Personalisation, audio, settings

- **187 Monkeytype themes** (`src/data/themes.ts`), each WCAG-contrast-checked by
  `src/tests/themes.test.ts`: 12 curated choices first, with all themes searchable.
  An increased-contrast toggle remains available. **43 self-hosted fonts**:
  six recommendations, then More fonts; non-default faces load on selection/preview.
  Existing non-curated preferences remain visible rather than being replaced.
- **Independent audio paths:** pronunciation uses `window.speechSynthesis` (language
  locale, rate 0.92); missing target-language voices get a one-time install guide and
  fallback warning. System voices can depend on installed packages or a connection.
  Keyboard-click samples load only when played from the selected pack, with bounded
  decoded-buffer and negative-URL caches; no sound collection downloads at startup.
- **Speaking is optional:** sound settings enable browser speech recognition where
  supported. Start is an explicit user gesture with a provider/online-processing
  disclosure. Lenient transcript feedback never gates completion; the app saves no
  audio or transcripts. Unsupported/denied microphones leave ordinary exercises usable.
- **Personal starting point:** optional goals and daily minutes suggest a word-review
  session size; a ten-item language-specific placement check recommends a topic,
  with an override. This is not a validated CEFR assessment and does not fabricate
  prior completion or unlocks. Lesson cards show estimated minutes and exercise counts;
  retries and individual reading pace can extend them.
- **Typing mechanics** (`/settings`, six sections): stop-on-error, confidence mode (no
  backspace), lazy mode (`ae`/`oe`/`ue`/`ss`), capitalisation tolerance, caps-lock
  warning, quick restart (`off`/`esc`), German character bar (focus-preserving).
  The page composes separate behavior, input, sound, theme, visibility and danger-zone sections.
- **JSON backup export/import** and a two-step danger zone (reset settings / reset
  progress).
- **Local-first safety:** a nonblocking reminder offers a portable JSON backup
  after learning progress exists, then weekly after download; dismissal snoozes
  for a day. Settings can request persistent storage, but explicitly warns that
  it cannot prevent manual deletion or device loss.
- **Install/offline:** `manifest.webmanifest` enables home-screen installation.
  Production registers `public/sw.js` over HTTPS (localhost works for testing).
  A build-versioned cache keeps requested pages, data and chunks, capped at 240
  entries plus the offline fallback. Installation fetches only the fallback,
  manifest and icons—not lessons. Open segments and exercises online before
  relying on them offline; unopened or evicted content still needs a connection.
  Activation retains the previous build for offline navigation and exact asset URLs; older caches
  are pruned on activation only when no tabs may need them. Cached navigation also survives
  transient HTTP 5xx failures without masking legitimate 404 responses.
  Native pronunciation depends on installed device voices.
  The 15-minute listening pause is a persisted absolute timestamp, not a component
  timer; reload/tab closure preserve it and expiry does not renew it.

## 8. Storage and safety

- Progress is `localStorage` plus a **≤ 2048-byte URL-encoded cookie fallback** merged
  field-by-field (`src/lib/store/persistence.ts`); over the cap, only preferences are written, to
  avoid HTTP 431. Each language keeps its own progress slice and SRS queue.
- Backup import allow-lists review modes and drops `__proto__`/`constructor`/`prototype`
  keys (`src/tests/store-security.test.ts`).
  Imports reject wrong-type carried progress fields before mutation and restore SRS snapshots
  without retaining unrelated current cards or borrowing another course's active cards.
- `evaluateAnswerAccuracy` (`src/lib/letter-diff.ts`) rejects inputs over 200 characters
  before any diff, preventing quadratic CPU lockups on pasted text.
- `src/lib/store.ts` only composes Zustand slices. `store/` owns settings,
  progress, review, backup import/reset, hydration, validated schemas and
  versioned cross-tab merging. Persistence receives the store getter at startup,
  avoiding a runtime import cycle. Existing saved keys remain; sentence-process cards
  are additive fields in each language slice, with validation and per-card merge versions.

## 9. Deliberately not built

- No backend, accounts or cross-device sync; no analytics or telemetry; no push
  notifications (daily insights rotate by date); no cloud TTS; no third-party
  component libraries. The offline cache is not a progress backup.
- No adaptive difficulty — exercise order is fixed and authored. A specified-but-unbuilt
  design is in [`ideas to add in future/cognitive-load-adaptivity.md`](./ideas%20to%20add%20in%20future/cognitive-load-adaptivity.md).

## 10. Guard rails

`bun run test` (includes the docs-drift guard, solvability and playability checks),
`bun run lint`, `bun run typecheck`, and the four content audits in
[`scripts/README.md`](../scripts/README.md) run in CI on every push; the Playwright smoke
suite (`bun run test:e2e`) runs as a separate job.
