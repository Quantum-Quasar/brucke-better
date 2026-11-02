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
English cognate against its German twin with a fixed ordered rule list (bounded 500-entry
cache); `ShiftPair.tsx` renders the highlighted result.

## 2. Rendering model

- **Next.js App Router, 100% static.** Every route is pre-rendered; dynamic segments use
  `generateStaticParams()` with `dynamicParams = false`. The six top-level routes are
  `/`, `/atlas`, `/panorama`, `/review`, `/settings`, `/about` (the bottom dock has the
  matching six tabs).
- **Lessons and atlas details are in-page views, not routes.** They are loaded
  dynamically by `AppShell.tsx` (`LessonView`, `ConstellationDetailClient`), so opening
  one adds no URL or history entry. Legacy `/trail`, `/trail/:id`, `/trail/:lang/:id`,
  `/atlas/:family` and `/atlas/master` are redirects defined in `next.config.mjs`.
- **Per-language data is fetched, not bundled.** `bun run export-data`
  (`scripts/export-client-data.ts`, run by `dev` and `build`) writes each language's
  compendium, a compact lesson index and one payload per lesson to `public/data/<lang>/`,
  so heavy lesson data stays out of the shared chunk.
- **Root layout:** an inline pre-paint script reads `localStorage` / the fallback cookie
  and applies theme variables before first paint (no FOUC); `darkreader-lock` protects
  the calibrated palettes; a `storage` listener re-hydrates every open tab when
  progress changes; modal components (`WordCardDrawer`, `OnboardingModal`, the theme and
  font selectors) are dynamically imported.

## 3. Content pipeline

```
word_connections.md ──scripts/parse-compendium.ts──▶ src/data/compendium.json
                                                      src/data/insights.json
                                    scripts/export-client-data.ts ──▶ public/data/<lang>/…
```

`word_connections.md` is the hand-maintained source of truth for the German words, shift
laws, compounds, false friends and insights; the generated JSON is never hand-edited.
`bun run build` is `parse-data && export-data && next build`. French, Spanish and Dutch
are typed TS modules under `src/data/<lang>/`, not parsed from markdown. Details:
[`scripts/README.md`](../scripts/README.md).

## 4. The trail (homepage)

- A Baba-Is-You-style node graph built by `src/lib/trail-map.ts` and drawn by
  `src/components/trail/TrailMap.tsx` (custom DOM + SVG, no game library).
- **Nodes:** 30 spine cores (ids 1–30, strictly ordered), **sprigs** (`topicId*100+n`,
  skippable extra practice), support **branches** (`5000+n*10+lesson`, never reconnect
  to the spine) and five required reading stories (9001–9005) on the spine.
- **Unlock rule (OR-join):** a node unlocks when *any* adjacent node is completed; node 1
  starts unlocked; sprigs and branches are always skippable.
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
  per cluster, deterministic decorative glyphs. A recommendation cascade (next core →
  nearest core/sprig → nearest branch lesson) drives the pulsing selector.
- **Topic ids are welded** into lesson ids, spine edges, gate positions, store progress
  and tests — never renumber or insert before 30 (see `AGENT_PRECAUTIONS.md` §3.1).

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
- **Three-tier grading** (`src/lib/letter-diff.ts`): `exact`; `almost` (capitalisation,
  umlaut/digraph substitution such as `ae`/`ss`, missing infinitive ending or article,
  single-character typo on words ≥ 4 letters, commas ignored) — a pass that queues the
  item for reinforcement when caused by a typo; `incorrect` with a letter-by-letter diff
  and shift diagnosis (`src/lib/shift-diagnosis.ts`). Multiple-choice exercises compare
  the selected option directly with the authored answer, without spelling tolerance.
- **Retry queue:** missed items replay at the end of Practice and must drain before
  Summary unlocks; touching it forfeits the purple star. Pending exercise IDs and
  the reinforcement position persist with lesson progress, so leaving or reloading
  cannot bypass retries. Retries rotate their surface deterministically
  (`src/lib/retry-variation.ts`); an "I guessed" flag on a correct answer re-grades
  the word as Hard.
- **Anti-spoilers:** matching columns are cyclically shifted so pairs never align;
  `syntax_builder` banks strip trailing punctuation; review cards hide the gender colour
  behind `[ der / die / das ? ]` until recall.

## 6. Atlas, Panorama, Review

- **Atlas (`/atlas`)** is open from day 1: four atlases (one per language) show each
  family as a radial constellation. Every word is in one of four states — unexplored,
  explored (word card opened), encountered (its lesson opened), mastered.
- **Panorama (`/panorama`)** is the opt-in structure reference (articles as pronouns,
  the verb bracket, adjective endings, tense map); no levels, no gating.
  [`german-panorama.md`](./german-panorama.md) is its repo-side map, read by
  `src/tests/tm6-ideas.test.ts`.
- **Review Hub (`/review`)** runs SM-2 (`src/lib/srs.ts`) over unified word entities
  (`src/lib/word-entities-core.ts`: words, compounds, false-friend traps and lesson
  example sentences). Grades 1/3/4/5; below 3 resets repetitions, interval to 1 day and
  adds a lapse; ease factor `EF' = EF + 0.1 − (5−g)(0.08 + (5−g)·0.02)` floored at 1.3;
  a word is **mastered** at `repetitions ≥ 3 && interval ≥ 7`. Decks and styles live in
  `src/lib/review-decks.ts` / `src/lib/review-modes.ts` (due, by shift family, by domain,
  weakest, recent lessons, compounds & traps, sentence patterns, article & gender drill,
  everything; four styles: flip, MCQ, tile builder, derivation typing).
  Focused buttons and links retain their native Enter and Space activation instead of
  triggering review's reveal or quick-grade shortcuts.

## 7. Personalisation, audio, settings

- **187 Monkeytype themes** (`src/data/themes.ts`), each WCAG-contrast-checked by
  `src/tests/themes.test.ts`; an increased-contrast toggle strengthens muted text and
  errors. **43 self-hosted fonts** (`src/data/fonts.ts`, `src/app/fonts.css`).
- **Two independent audio paths, zero cloud TTS:** pronunciation is browser-native
  `window.speechSynthesis` (voice locale chosen per language, speech rate 0.92); the
  keyboard-click engine (`src/lib/sound.ts`) decodes bundled `.wav` packs from
  `public/sounds/` with a bounded buffer cache and negative-URL caching.
- **Typing mechanics** (`/settings`, six sections): stop-on-error, confidence mode (no
  backspace), lazy mode (`ae`/`oe`/`ue`/`ss`), capitalisation tolerance, caps-lock
  warning, quick restart (`off`/`esc`), German character bar (focus-preserving).
- **JSON backup export/import** and a two-step danger zone (reset settings / reset
  progress).

## 8. Storage and safety

- Progress is `localStorage` plus a **≤ 2048-byte URL-encoded cookie fallback** merged
  field-by-field (`src/lib/store.ts`); over the cap, only `{theme, font}` is written, to
  avoid HTTP 431. Each language keeps its own progress slice and SRS queue.
- Backup import allow-lists review modes and drops `__proto__`/`constructor`/`prototype`
  keys (`src/tests/store-security.test.ts`).
- `evaluateAnswerAccuracy` (`src/lib/letter-diff.ts`) rejects inputs over 200 characters
  before any diff, preventing quadratic CPU lockups on pasted text.

## 9. Deliberately not built

- No PWA / service worker / offline sync; no backend, accounts or cross-device sync; no
  analytics or telemetry; no push notifications (daily insights rotate by date); no cloud
  TTS; no third-party component libraries.
- No adaptive difficulty — exercise order is fixed and authored. A specified-but-unbuilt
  design is in [`ideas to add in future/cognitive-load-adaptivity.md`](./ideas%20to%20add%20in%20future/cognitive-load-adaptivity.md).

## 10. Guard rails

`bun run test` (includes the docs-drift guard, solvability and playability checks),
`bun run lint`, `bun run typecheck`, and the four content audits in
[`scripts/README.md`](../scripts/README.md) run in CI on every push; the Playwright smoke
suite (`bun run test:e2e`) runs as a separate job.
