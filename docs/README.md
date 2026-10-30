> **Corrected copy — verified against the implementation on 2026-09-30.**
> The original append-only version was kept in `old documentation/`, now removed as superseded.
> Every correction applied here, with its `path:line` evidence, is listed in [`CORRECTIONS.md`](./dont open untill mentioned/CORRECTIONS.md).

# Brücke (Bridge) — Etymological German Learning Platform

> **German language acquisition through historical sound shifts, living English cognates, and multi-modal spaced repetition.**

---

## Overview

**Brücke** is a self-contained web application designed to help English speakers learn German rapidly by decoding the underlying linguistic mechanics that connect both languages. <!-- corrected 2026-09-30: was "an open-source web application" — package.json:4 marks the package private and the repo ships no LICENSE file -->

Rather than relying on rote memorization or gamified streaks without substance, Brücke leverages the **Second High German Consonant Shift (500–800 AD)** to reveal that English speakers already understand hundreds of German words.

**French course (open trail).** The same engine now teaches French through the Norman doublets — 1066 left English and French sharing thousands of cognates, and the French trail decodes them the same way: 30 topics (123 lessons authored so far), 9 conversion-bridge families (`-ion`, `-ation→-er`, `-ité`, `-ance`, `-é`, `-ment`, `-eur`, `-able`, doublets), a 306-word compendium with 16 compound calques and 16 false friends, and its own trail/atlas/review layers. It is authored as typed modules in `src/data/french/` (not parsed from `word_connections.md`); the design doc is [`french-course/french-course-design.md`](./french-course/french-course-design.md). <!-- added 2026-10-13 with the French course launch -->

- **Comprehensive Audit Manifest**: See [`AUDIT_MANIFEST.md`](../AUDIT_MANIFEST.md) for full architectural specifications, data schemas, and audit instructions.
- **North Star**: See [`NORTH_STAR.md`](./NORTH_STAR.md) — Brücke teaches German; etymology is the hook, not the subject. Read before changing content.
- **Grammar Panorama**: See [`german-panorama.md`](./german-panorama.md) — every German structure mapped to the lesson ids that teach it, with a `taught` / `inferred` / `partial` column. The repo artifact companion to `/panorama`; `inferred` rows are the honest backlog.
- **Design Specification**: See [`german_learning_platform_design-final.md`](./german_learning_platform_design-final.md). <!-- corrected 2026-09-30: was "./docs/german_learning_platform_design-final.md" — there is no docs/ directory -->

---

## Tech Stack & Architecture

- **Runtime**: [Bun](https://bun.com) v1.4+
- **Framework**: [Next.js](https://nextjs.org) 16.3.4 (App Router, Turbopack, 100% Static Site Generation)
- **UI Library**: React 19.2 + TypeScript
- **Styling**: Tailwind CSS v4 (native CSS tokens, dark mode default)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) 5 (dual `localStorage` + size-guarded cookie persistence)
- **Icons**: Lucide React
- **Testing**: Vitest 5 (`bun run test` → `vitest run`) — 41 test files, 399 automated tests. There is no `bun test` script. <!-- corrected 2026-09-30: was "Vitest / `bun test` (21 test suites, 119 automated tests)" — package.json:12 defines only "test": "vitest run"; counts updated 2026-10-03 with the whole-curriculum integrity, timezone-boundary, persistence-merging, and docs-drift suites -->
- **Audio Engine**: Two independent zero-dependency browser-native paths: `window.speechSynthesis` for German pronunciation (`de-DE`, 0.92x) and a Web Audio **sample** engine (`src/lib/sound.ts`) that decodes bundled Monkeytype mechanical-keyboard `.wav` packs with a 24-entry buffer cache and negative URL caching. <!-- corrected 2026-09-30: was "Web Audio click synthesizer" — there is no synthesis; src/lib/sound.ts:48-53 -->

---

## Quick Start

### Installation

```bash
bun install
```

### Compile Knowledge Compendium

Compiles the raw markdown dictionaries into `/src/data/compendium.json` and `/src/data/insights.json`: <!-- corrected 2026-09-30: also writes src/data/insights.json (scripts/parse-compendium.ts:291-292) -->

```bash
bun run parse-data
```

### Run Automated Tests

Executes the full Vitest suite — 41 test files, 399 automated tests: <!-- corrected 2026-09-30: was "119 unit and integration tests across 21 suites"; counts updated 2026-10-03 -->

```bash
bun run test
```

Browser smoke suite (Playwright) — onboarding, segment progression, SRS persistence, static
routes, the TM-6 surfaces (`/panorama`, sprig 1003, the dictation skip, the trap note), and the
non-German course path (`tests/e2e/language-routes.spec.ts`: French/Spanish review + atlas fetch
their own `/data/<lang>/*.json`):

```bash
bun run test:e2e
```

### Production Build

Pre-renders every route to static HTML (`● SSG`): the 8 static routes, 28 `/atlas/[family]` pages (union of the three atlases), one `/trail/[id]` page per authored lesson (178 unique ids: 169 German plus 9 French/Spanish-only ids), and language-scoped aliases at `/trail/[lang]/[id]` for every authored lesson in each available course. `bun run build` re-runs `parse-data` first. <!-- corrected 2026-10-22: was 9 family pages and 168 trail pages; /trail/[id]/page.tsx now unions de/fr/es ids. Unknown /trail/[id] or /atlas/[family] params 404 via dynamicParams = false. -->

```bash
bun run build
```

### Start Development Server

```bash
bun run dev
```

Visit `http://localhost:3000` in your browser.

---

## Core Features

1. **The Trail Map (`/` — the homepage)**:
   - Baba Is You-style node map: 30 topic clusters on one linear spine, with skip-able extra-practice nodes ("sprigs") and support-material branches hanging off each cluster.
   - All adjacent nodes unlock at once when a node is completed; the spine itself stays strictly ordered, but a **closed star gate** blocks the spine at its topic boundary until the stretch's star quota is met.
   - Read the map top-to-bottom from topic 1; the pulsing theme-colored selector marks your recommended node.
   - 1 core lesson per topic plus 2–3 sprigs; the entire curriculum is authored — 30 cores + 79 sprigs + 60 branch lessons = 169 lessons, each with a title, plan and full `Lesson` object (`src/data/curriculum.ts`, `src/data/lessons.ts`). <!-- corrected 2026-09-30: was "topics 1–10 fully authored, 11–30 shipped as titled shells with authoring plans" — no shells remain; composition updated 2026-10-03 from "30 + 72 + 7 = 109" -->
   - Custom DOM+SVG renderer (no game libraries) with `content-visibility` windowing per topic cluster, sized for hundreds of future lessons.
   - 5-part card-by-card lesson wizard (Hook, Pattern, Transformation Table, Bite-Sized Practice, Summary & Retries) at `/trail/[id]`.
   - Scaffolded exercises across 11 types (`src/lib/types.ts`): morpheme tiles, matching pairs, shift select, syntax builder, derivation typing, reverse-cognate typing, **transcribe** production drills (thought + lexicon + cue ladder), **literal gloss** direct translations, **dictation** listening drills (played audio, capped replays, a 15-minute listening skip), **family grid** prefix × base matrices, and **variant English** "every honest rendering" drills (TM-1/TM-2/TM-6, `docs/THINKING_METHOD_UPGRADE.md`). <!-- updated 2026-10-02: added the Thinking Method exercise types (was "6 types") -->
   - Every authored lesson (cores, sprigs, and branches) ends with an ungraded, skippable **Twist** card (deliberate friction, outside the 5-exercise contract) and may whisper up to two **posture cues** per lesson; the 3-step intro closes with a short posture summary instead of a separate six-step gate (TM-4/TM-5, same document). <!-- corrected 2026-10-23: onboarding cut to 3 steps; all 169 German lessons have a twist -->
   - Pre-exercise vocabulary hints (`vocab_hints`) for auxiliary words (e.g., `mit`).
   - End-of-lesson Retry Queue ensuring mastery before progression; a flawless first-try run earns a **purple star** (gold otherwise).

2. **Sound Shift Atlas (`/atlas` & `/atlas/[family]`)**:
   - Radial spatial spoke visualization for 9 consonant shift families ($TH \rightarrow D$, $P \rightarrow FF/PF$, $T \rightarrow SS/S/Z$, etc.).
   - Philological background, literature sources, and 5-question branch practice drills.

3. **Multi-Modal Review Hub (`/review`)**:
   - Algorithmic spaced repetition powered by SuperMemo SM-2.
   - 5 playable decks: *Due Today*, *By Shift Family*, *Weakest Words*, *Recent Lessons*, and *Compound Calques & False Friends*.
   - 4 selectable review styles: *Quick Flip*, *Multiple Choice (MCQ)*, *Tile Builder*, and *Derivation Typing*.
   - Anti-spoiler gender shields: Front card prompts with `[ der / die / das ? ]` instead of leaking the article before recall.
   - Desktop keyboard navigation (`1`–`4`, `Space`, `Enter`, `Backspace`, `←`/`→` back and forward between cards, `[R]` audio replay, `Esc`).

4. **3-Color Grammatical Gender System**:
   - `der` (Masculine): Azure Blue
   - `die` (Feminine): Vivid Rose
   - `das` (Neuter): Emerald Green
   - Educational onboarding & dismissible gender guide banners.

5. **Six Star Gates on the spine** (`src/data/curriculum.ts:695`):
   - Gates sit at the natural family boundaries of the curriculum and close the stretch of topics the next stretch is built on, so the spine cannot be rushed past weak ground.
   - *The Shift Gate* (after topic 7, 14★ of 22), *The Grammar Gate* (after 10, 6★ of 9), *The Verb-Complex Gate* (after 16, 11★ of 22), *The Past Gate* (after 20, 9★ of 18), *The Atlas Gate* (after 26, 11★ of 22), and *The Capstone Gate* (after 29, 9★ of 11).
   - Each gate is drawn on the map as a checkpoint pill reading `★ earned/required`; clicking it opens a panel explaining what the stretch covers and why the next one depends on it (`src/components/trail/TrailMap.tsx:203`).
   - A closed gate hard-locks the spine edge but leaves every already-reachable node playable — you can always go back and farm the stars you are missing. <!-- added 2026-09-30: the star-gate system was undocumented -->

---

## Personalization & Progression

The whole surface is themeable and typable, and the app never leaves the browser to do it.

- **187 Monkeytype color themes** (`src/data/themes.ts`): each theme supplies `bg`, `subAlt`, `text`, `sub`, `main`, `caret` and `error` as CSS custom properties, plus an `isDark` flag that drives the `.dark`/`.light` class on `<html>`. `alduin` is the default.
- **WCAG contrast auditing is enforced, not aspirational**: a test walks all 187 themes and asserts `text` ≥ 4.5:1 and `sub` ≥ 4.2:1 against both `bg` and `subAlt`, and `main` ≥ 2.5:1, on both surfaces (`src/tests/themes.test.ts:213`). `scripts/contrast-audit.ts` is the one-off fixer that nudged failing colors' lightness while preserving hue and saturation, and regenerated `POPULAR_THEMES` from the passing set.
- **43 selectable fonts** (`src/data/fonts.ts`): monospace, sans and display families declared as real `@font-face` rules in `src/app/fonts.css` against self-hosted `.woff2` files in `public/webfonts/`, each verified to exist and be non-empty (`src/tests/assets-and-routes.test.ts:16`). `Lexend Deca` is the default.
- **`/settings`**, organised into six sections (behavior, input, sound, theme, visibility, danger zone) with a `/`-to-focus search box:
  - *behavior* — quick restart (`off` / `esc` / `tab`), lazy mode (accepts `ae`/`oe`/`ue`/`ss` for `ä`/`ö`/`ü`/`ß` on US keyboards), capitalization tolerance for lowercase German nouns.
  - *input* — stop-on-error (`off` / `letter`), confidence mode, German character bar visibility (`always` / `on_focus` / `off`).
  - *sound* — master volume, click pack, error cue, with inline preview playback of every option.
  - *theme* — theme and font pickers, plus an increased-contrast toggle that strengthens muted text and error colors without discarding the selected theme (`src/lib/appearance.ts`).
  - *visibility* — key tips, caps-lock warning, and the `mastered / total` counter badge in the top nav.
  - *danger zone* — JSON backup export/import, reset settings, reset learning progress.
- **JSON backup import/export** (`src/app/settings/page.tsx:110`): export writes a versioned `brucke_backup_YYYY-MM-DD.json` containing settings, completed lessons, per-lesson progress and stars, word mastery, SRS cards, weekly activity, review mode, onboarding flags, theme and font. Import validates the payload and hands it to `importBackupState`, which reports success or a missing-data failure.
- **Mechanical-keyboard sound engine** (`src/lib/sound.ts`): 18 selectable Monkeytype click packs (`cherrymx black abs`, `tealios v2`, `razer green`, …) plus `off`, and 4 error cues, shipped as real `.wav` files under `public/sounds/` and served with a one-year immutable `Cache-Control`. Decoded buffers are held in a 24-entry LRU-ish cache and failed URLs are negatively cached so a missing sample is never refetched in a loop. Every pack and cue is verified on disk by `src/tests/assets-and-routes.test.ts:47`.
- **Five-tab bottom dock** (`src/components/navigation/BottomNav.tsx`): map, atlas, review (with a due-count badge), settings, about.

---

## Project Structure

```
src/
├── app/                  # Next.js App Router (100% SSG static pre-rendered routes)
│   ├── page.tsx          # Homepage = the Baba-style trail map + DailyInsightCard
│   ├── atlas/            # Sound Shift Atlas pages (/atlas, /atlas/[family])
│   ├── review/           # Multi-modal SRS Review Hub
│   ├── trail/            # /trail redirects to /; /trail/[id] lesson wizard
│   ├── settings/ about/  # Settings & About (linked from the bottom dock)
│   ├── error.tsx         # Global error boundary (client)
│   ├── fonts.css         # 43 @font-face declarations over public/webfonts
│   ├── globals.css       # Tailwind v4 entry + theme CSS custom properties
│   └── layout.tsx        # App layout, global shell, TopNav + BottomNav
├── components/
│   ├── atlas/            # Radial constellation and drill components
│   ├── common/           # GenderBadge, ShiftPair, WordCardDrawer, GermanCharBar,
│   │                     # OnboardingModal, theme/font selectors, DailyInsightCard
│   ├── lesson/           # 5-step wizard, exercise widgets (incl. TranscribeExercise,
│   │                     # LiteralGloss, TwistCard, DictationExercise,
│   │                     # FamilyMatrixExercise, VariantEnglishExercise), retry queue,
│   │                     # feedback sheets
│   ├── navigation/       # Game-style bottom dock (all destinations) + slim TopNav
│   ├── settings/         # SettingItem row primitive
│   └── trail/            # TrailMap (incl. star-gate pills), LessonNodeDrawer
├── data/
│   ├── compendium.json   # 1226 core words, 9 shifts, 32 compounds, 16 traps, 28 insights
│   ├── compendium.ts     # Typed view over the raw JSON (derives wordList at runtime)
│   ├── curriculum.ts     # 30 topic clusters: cores, sprigs, 11 branches, 6 star gates
│   ├── lessons.ts        # All 169 authored lessons (cores 1–30, sprigs, branches 50xx–53xx)
│   ├── insights.json     # 28 daily insights (generated by parse-data)
│   ├── consciousness.ts  # TM-6 learning-consciousness lines, re-whispered ~1 lesson in 7
│   ├── posture-cues.ts   # TM-4b whisper-cue pools + deterministic per-lesson picker
│   ├── sound-imports.ts  # "you already make this sound" — the English source word per sound
│   ├── shift-diagnosis-table.ts # TM-3 slip messages keyed by shift-family id
│   └── ...               # themes, fonts, settings, phonetics, languages
├── lib/
│   ├── appearance.ts     # Applies the increased-contrast / appearance settings
│   ├── audio.ts          # Native speech pronunciation engine
│   ├── gender.ts         # 3-color gender metadata & styling
│   ├── lemmatizer.ts     # English inflection normalizer
│   ├── letter-diff.ts    # Letter-by-letter diff comparison
│   ├── review-modes.ts   # Question generators for review styles
│   ├── shift-annotator.ts# Sound shift letter aligner with memoization
│   ├── shift-diagnosis.ts# TM-3 wrong-answer → shift-law diagnosis + affirmation fallback
│   ├── sound.ts          # Web Audio sample engine for click/error .wav packs
│   ├── listening.ts      # 15-minute listening-skip window (environment honesty)
│   ├── retry-variation.ts # TM-6 deterministic surface rotation for retry attempts
│   ├── srs.ts            # SuperMemo SM-2 interval scheduler
│   ├── store.ts          # Zustand store with dual persistence (+ lessonStars)
│   ├── trail-map.ts      # Map graph, responsive layout engine, unlock/recommend/gate logic
│   ├── types.ts          # Core domain TypeScript interfaces
│   ├── use-dialog-focus.ts # Shared Esc-to-close + focus-trap hook
│   └── word-entities.ts  # Merges compounds + false friends onto the WordEntity map
└── tests/                # 41 test files (Vitest) <!-- updated 2026-10-03: whole-curriculum integrity + timezone + persistence suites (was "24", already stale before) -->
```
<!-- corrected 2026-09-30: tree previously omitted app/error.tsx, app/fonts.css, app/globals.css, components/settings/, data/compendium.ts, data/insights.json, lib/sound.ts, lib/appearance.ts, lib/word-entities.ts and lib/use-dialog-focus.ts; it also claimed 218 compendium words, lessons "ids 1–10", a "Footer" component that does not exist, "MapNode" (folded into TrailMap.tsx) and "(Vitest / Bun)". Updated 2026-10-03: 619 words, 128 lessons, lib/word-refs-audit.ts added. -->

---

## Architecture Invariants

- **No Third-Party Component Bloat**: The UI strictly avoids component libraries like Radix, Headless UI, or Framer Motion. Standard DOM and Tailwind CSS are used.
- **Zero Cloud TTS Dependency**: Pronunciation uses the browser's native `window.speechSynthesis` (`de-DE`), avoiding external API costs, latency, or asset downloads.
- **Durable Local Storage**: Progress is preserved across sessions using `localStorage` with a size-guarded cookie fallback: the lean payload is only written if it URL-encodes to ≤ 2048 bytes, otherwise a minimal `{theme, font}` cookie is written instead (`src/lib/store.ts:179-197`). <!-- corrected 2026-09-30: was "< 3800 bytes" — the guard is 2048, pinned by src/tests/store-security.test.ts:64 -->
- **No Cargo-Cult Repetition**: `bun scripts/audit-wording.ts` blocks `explanation` strings, prose sentences and prompt formulas copy-pasted between neighbouring lessons, while an explicit allowlist protects the widget labels that are *meant* to stay identical (guidebook §1.7/§1.8).
- **Deferred Ideas Live in `docs/ideas to add in future/`**: fully-specified but unimplemented work (sentence-level SRS, cognitive-load adaptivity, native-speaker naturalness audit, finishing the Thinking Method upgrade). These are write-ups, not commitments — nothing in them is wired into the app.
- **All Routes Static**: Every route in `/app` must pre-render via `generateStaticParams()` to guarantee instant navigation.
