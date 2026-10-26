# Brücke — Codebase Audit Manifest & System Architecture Reference

> **Auditor Quickstart**: This document is the primary reference manifest for any AI agent or human engineer conducting a comprehensive audit of the Brücke codebase. It outlines the project's locations, design goals, functional specifications, data schemas, invariants, and verification steps.

---

## 1. Project Locations & Working Directories

| Role | Path | Description |
|---|---|---|
| **Primary Codebase (Working Dir)** | `.` (project root) | Complete Next.js 16 + React 19 + TypeScript + Bun application. All source code, tests, and build scripts live here. |
| **Master Design & Reference Archive** | `docs/` | Master design document (`german_learning_platform_design-final.md`), historical survey transcripts, and early notes. |
| **Synchronized Design Document** | `docs/german_learning_platform_design-final.md` | In-repo copy of the 16-section master design specification, kept in sync with the reference archive. |

---

## 2. Executive Product Concept: What Brücke Does

**Brücke** ("Bridge") is an etymological, sound-shift-based German learning platform for English speakers. 

### Core Pedagogical Premise
English and German are sibling West Germanic languages sharing over 60% of core vocabulary. High German underwent the **Second (High German) Consonant Shift** between 500–800 AD, altering specific consonants in predictable patterns (e.g. $TH \rightarrow D$, $P \rightarrow FF/PF$, $T \rightarrow SS/S/Z$, $K \rightarrow CH$). Rather than forcing brute-force vocabulary memorization, Brücke teaches English speakers to **reverse-engineer German words from the English words they already speak every day**.

### Core Philosophy: The "Pony-tail" Lean Architecture
- **Zero Heavy Framework Bloat**: No Radix UI, Headless UI, Framer Motion, Axios, or Lodash. Standard web platform APIs, Tailwind CSS v4, and minimal custom primitives.
- **100% Client-Side Fast + SSG**: All app routes build to pre-rendered static HTML (`● SSG`). Zero server execution latency at runtime.
- **Offline Durability**: Local state persists across sessions via dual-storage: primary `localStorage` with a fallback cookie backup.

---

## 3. Four Core Functional Pillars

### Pillar 1: The Trail (`/trail` and `/trail/[id]`)
- **Curriculum Scope**: 30 topic clusters with the entire curriculum authored — 30 cores + 79 sprigs + 60 branch lessons = **169 lessons**, all fully interactive. Unknown lesson ids 404 at the router level (`dynamicParams = false`).
- **5-Segment Card-by-Card Wizard (`LessonReader.tsx`)**:
  1. **Part 01: The Hook**: Historical intuition and living English cognate framing.
  2. **Part 02: The Pattern**: Mechanical shift rules, suffix patterns (`-en`), with margin philological notes.
  3. **Part 03: Transformation Table**: Interactive `ShiftPair` grid highlighting shifted letters in cyan and target words in amber. Includes a bridge card to the Sound Shift Atlas (`/atlas/[family]`).
  4. **Part 04: Interactive Practice**: Exactly **ONE bite-sized problem mounted at a time** with Duolingo-style progress indicator dots. Starting exercises are never cold typing (scaffolded with morpheme tiles, matching pairs, and multiple choice). Features explicit vocabulary hint chips (`vocab_hints`) for auxiliary words (e.g. `mit`).
  5. **Part 05: Summary & Retries**: Key takeaway, curiosity teaser, Sound Shift Atlas deep-dive link, and an end-of-lesson **Retry Queue** ensuring 100% mastery before completion.

### Pillar 2: Sound Shift Atlas (`/atlas` and `/atlas/[family]`)
- **Visual Exploration**: Radial spatial spoke constellation visualization connecting English cognate seeds to German words.
- **Scope**: 9 German shift families (each atlas also renders an `unshifted` direct-cognate layer):
  1. $TH \rightarrow D$ (`think` $\rightarrow$ `denken`, `brother` $\rightarrow$ `Bruder`)
  2. $D \rightarrow T$ (`drink` $\rightarrow$ `trinken`, `day` $\rightarrow$ `Tag`)
  3. $P \rightarrow PF / F / FF$ (`pepper` $\rightarrow$ `Pfeffer`, `ship` $\rightarrow$ `Schiff`)
  4. $T \rightarrow S / SS / Z / ß$ (`water` $\rightarrow$ `Wasser`, `two` $\rightarrow$ `zwei`)
  5. $K \rightarrow CH$ (`make` $\rightarrow$ `machen`, `book` $\rightarrow$ `Buch`)
  6. $V / F \rightarrow B$ (`seven` $\rightarrow$ `sieben`, `half` $\rightarrow$ `halb`)
  7. $Y / GH \rightarrow G / CH$ (`day` $\rightarrow$ `Tag`, `night` $\rightarrow$ `Nacht`)
  8. $-ate / -ize \rightarrow -ieren$ (`organize` $\rightarrow$ `organisieren`)
  9. Ablaut vowels (`sing / sang / sung` $\rightarrow$ `singen / sang / gesungen`)
- **Interactive Drill**: 5-question modal practice drill per constellation family.

### Pillar 3: Spaced Repetition Review Hub (`/review`)
- **Algorithm**: Unified SuperMemo SM-2 interval scheduler (`src/lib/srs.ts`) tracking repetitions, ease factors, lapses, intervals, and due dates.
- **5 Playable Decks**:
  1. **Due Today Deck**: Spaced repetition queue filtered by algorithmic due date.
  2. **By Shift Family Deck**: Filterable practice by individual consonant shift.
  3. **Weakest Words Deck**: High-lapse words requiring immediate consolidation.
  4. **Recent Lessons Deck**: Fast reinforcement of the last 20 words encountered on The Trail.
  5. **Compound Calques & Traps Deck**: 48 specialized cards covering 32 compound calques (*Handschuh*, *Kühlschrank*, *Flugzeug*) and 16 false friend traps (*Gift*, *bald*, *bekommen*).
- **4 Selectable Review Styles**:
  - `flashcard` (Quick Flip): Recall in mind $\rightarrow$ Space/Enter reveals $\rightarrow$ 1–4 SM-2 grade.
  - `mcq` (Multiple Choice): Pick target word from 4 options (hotkeys 1–4).
  - `tiles` (Tile Builder): Assemble morphemes into words (mouse click or desktop keyboard typing + Backspace).
  - `typing` (Derivation Typing): Type full derivation with on-screen umlaut bar.
- **Active Recall Shield**: Front card hides gender article badges, displaying neutral placeholder `Gender: [ der / die / das ? ]` to avoid leaking answers before recall. Full color badge and pronunciation reveal on card flip.
- **Review Style Prompt**: Deck launch opens a four-style selector before the session; styles can also be changed mid-session via the header dropdown.

---

## 4. Supporting Systems & Ergonomics

1. **3-Color Grammatical Gender System (`src/lib/gender.ts`, `GenderBadge.tsx`)**:
   - `der` (Masculine): Azure Blue (`#0ea5e9` / `text-sky-300 bg-sky-500/20 border-sky-400/50`)
   - `die` (Feminine): Vivid Rose (`#f43f5e` / `text-rose-200 bg-rose-500/25 border-rose-400/60`)
   - `das` (Neuter): Emerald Green (`#10b981` / `text-emerald-200 bg-emerald-500/25 border-emerald-400/60`)
   - Introduced via an educational dismissible banner (`GenderGuideBanner.tsx`) and onboarding.
2. **Zero-Dependency Native Speech Synthesis (`src/lib/audio.ts`)**:
   - Uses `window.speechSynthesis` with `de-DE` locale, German voice matching, and `0.92x` learner pace.
   - Zero MP3 bundles, zero cloud API keys, zero network latency.
   - Embedded speaker buttons across `ShiftPair`, `WordCardDrawer`, `ReviewPage`, and `LessonReader`, plus keyboard shortcut `[R]` / `[A]`.
3. **Desktop Keyboard First Ergonomics**:
   - `1`, `2`, `3`, `4`: Select MCQ options or grade SM-2 cards (Again, Hard, Good, Easy).
   - `Space` / `Enter`: Reveal cards, advance lessons, check answers.
   - `Backspace`: Unpick tiles in Tile Builder.
   - `[a-z, ä, ö, ü, ß]`: Type directly to snap matching tiles in Tile Builder.
   - `[R]` / `[A]`: Replay native German pronunciation audio.
   - `Escape`: Cleanly exit review sessions and dismiss drawers/modals.

---

## 5. File Structure & Component Map

```
/home/shaurya/gemini-tmp/german-app-thinking-method/
├── package.json               # Next 16.3.4, React 19.2.8, Tailwind v4, Zustand 5, Vitest 5, Bun
├── next.config.mjs            # Next.js configuration with React strict mode
├── tsconfig.json              # TypeScript config with '@/*' path aliases
├── scripts/
│   ├── parse-compendium.ts    # Parses markdown dictionaries into compendium.json
│   ├── audit-word-refs.ts     # Every vocabulary reference resolves (incl. family grids and the new types)
│   ├── audit-teasers.ts       # Title + curiosity_teaser chain drift must stay 0
│   ├── audit-wording.ts       # No copy-pasted prose/prompt formulas between neighbours
│   ├── audit-vocab-balance.ts # Taught-word balance across the trail
│   ├── contrast-audit.ts      # One-off theme-contrast fixer (WCAG is enforced by tests)
│   ├── export-trail.ts        # `bun run trail` — export the trail graph
│   ├── capture-demo-images.ts # Local demo screenshots
│   └── append-words.mjs       # Batch helper for word_connections.md §2
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root HTML structure, dark background, TopNav & BottomNav
│   │   ├── page.tsx           # Dashboard / Home: Streak stats, Daily Insight, Quick Start
│   │   ├── globals.css        # Tailwind v4 theme, custom dark tokens, font setup
│   │   ├── trail/
│   │   │   ├── page.tsx       # Trail overview: 5 learning phases & 30 lesson milestones
│   │   │   └── [id]/page.tsx  # Server component exporting generateStaticParams()
│   │   ├── atlas/
│   │   │   ├── page.tsx       # Atlas index: grid of 9 consonant shift families
│   │   │   └── [family]/page.tsx # Server component exporting generateStaticParams()
│   │   ├── panorama/
│   │   │   └── page.tsx       # Grammar Panorama: five consultable structure diagrams
│   │   └── review/
│   │       └── page.tsx       # Multi-modal SRS Review Hub with 4 styles & 5 decks
│   ├── components/
│   │   ├── common/
│   │   │   ├── ShiftPair.tsx          # Memoized cognate pair with letter highlights & audio
│   │   │   ├── GenderBadge.tsx        # Memoized 3-color gender indicator pill
│   │   │   ├── GenderGuideBanner.tsx  # Educational dismissible gender color guide
│   │   │   ├── WordCardDrawer.tsx     # Slide-over word detail sheet with etymology & audio
│   │   │   ├── GermanCharBar.tsx      # One-click umlaut & eszett input chips
│   │   │   ├── DailyInsightCard.tsx   # Dashboard cultural insight widget
│   │   │   ├── OnboardingModal.tsx    # 4-step interactive first-time onboarding modal
│   │   │   └── DonutChart.tsx         # SVG progress breakdown ring
│   │   ├── lesson/
│   │   │   ├── LessonDetailClient.tsx # Client boundary for [id]/page.tsx
│   │   │   ├── LessonReader.tsx       # 5-step wizard container with progress bar & Atlas bridge
│   │   │   ├── ProgressBar5.tsx       # 5-segment interactive step navigation bar
│   │   │   ├── ExerciseWidgets.tsx    # Morpheme tiles, matching pairs, shift select, syntax builder, dictation, family grid, variant English
│   │   │   ├── exercise-tiles.ts      # Deterministic hash/shuffle/tile-order helpers (imported by the widget and every per-type chunk)
│   │   │   ├── DictationExercise.tsx  # TM-6 played-audio listening drill with a capped replay budget
│   │   │   ├── FamilyMatrixExercise.tsx # TM-6 prefix × base grid: one cell graded, the family revealed
│   │   │   ├── VariantEnglishExercise.tsx # TM-6 every honest English rendering + word-match traps
│   │   │   ├── SuccessFeedbackSheet.tsx # Explicit answer meaning & explanation sheet
│   │   │   ├── ErrorFeedbackSheet.tsx # Letter-by-letter diff comparison sheet
│   │   │   └── RetryQueue.tsx         # End-of-lesson reinforcement queue
│   │   ├── atlas/
│   │   │   ├── ConstellationDetailClient.tsx # Client boundary for [family]/page.tsx
│   │   │   ├── RadialConstellation.tsx       # SVG radial spoke graph with animated nodes
│   │   │   └── BranchDrillModal.tsx          # 5-question shift practice drill modal
│   │   └── navigation/
│   │       ├── TopNav.tsx             # Desktop top navigation header
│   │       └── BottomNav.tsx          # Mobile bottom tab navigation bar
│   ├── lib/
│   │   ├── types.ts           # Core TypeScript interfaces & domain types
│   │   ├── store.ts           # Zustand store, mastery state machine, dual persistence
│   │   ├── srs.ts             # SuperMemo SM-2 spaced repetition calculation engine
│   │   ├── gender.ts          # Color mapping & metadata for der / die / das
│   │   ├── shift-annotator.ts # Memoized letter-by-letter consonant shift aligner
│   │   ├── review-modes.ts    # Question generator for MCQ, Tile Builder, and Typing
│   │   ├── lemmatizer.ts      # English inflection normalizer (verbs, nouns, participles)
│   │   ├── letter-diff.ts     # Character-by-character typo alignment & diffing
│   │   └── audio.ts           # Web Speech API German speech synthesis wrapper
│   ├── data/
│   │   ├── compendium.json    # 1226 words, 9 shifts, 32 compounds, 16 false friends, 28 insights
│   │   └── lessons.ts         # All 169 authored lesson definitions, exercises, and clues
│   └── tests/                 # 37 test files (Vitest) — whole-curriculum integrity, timezone boundaries, persistence merging, security
│       ├── store.test.ts
│       ├── exercises.test.ts
│       ├── letter-diff.test.ts
│       ├── lemmatizer.test.ts
│       ├── review-modes.test.ts
│       ├── gender.test.ts
│       ├── compendium.test.ts
│       ├── review.test.ts
│       ├── audio.test.ts
│       ├── srs.test.ts
│       └── shift-annotator.test.ts
```

---

## 6. Key Data Entities & Schemas (`src/lib/types.ts`)

- **`WordEntity`**: Primary vocabulary item. Fields: `id`, `target_word`, `english_cognate`, `english_meaning`, `gender` (`der` | `die` | `das` | `null`), `ipa`, `sound_shift_ids`, `shift_rule`, `context_phrase`, `context_translation`, `etymology_derivation`.
- **`ShiftFamily`**: Consonant shift definition. Fields: `id`, `name`, `symbol`, `phonetic_rule`, `historical_linguistics`, `philological_note`, `literature_source`, `word_ids`.
- **`SRSCard`**: Spaced repetition tracking card. Fields: `word_id`, `interval`, `repetitions`, `ease_factor`, `due_date`, `lapses`, `last_reviewed`.
- **`Lesson`**: Curriculum unit. Fields: `id`, `slug`, `title`, `subtitle`, `phase`, `shift_categories`, `word_ids`, `hook`, `pattern`, `table_word_ids`, `exercises`, `summary`.
- **`CompoundCalque`**: Transparent compound nouns. Fields: `id`, `compound`, `gender`, `literal_morphemes`, `real_meaning`, `english_counterpart`, `lore`.
- **`FalseFriend`**: Deceptive cognate traps. Fields: `id`, `german_word`, `looks_like`, `actual_meaning`, `trap_note`.

---

## 7. Performance & Resource Optimization Highlights

1. **100% Pre-rendered Static Site Generation (SSG)**:
   - Dynamic parameter routes `/atlas/[family]` (28 pages across the three atlases) and `/trail/[id]` (178 unique pages — 169 German plus 9 French/Spanish-only ids) export `generateStaticParams()` and set `dynamicParams = false`, so unknown params 404 instead of triggering dynamic server rendering.
   - All app routes build to static HTML. Navigation between lessons and atlas families is instantaneous with zero runtime server latency.
2. **Shift Alignment Memoization**:
   - `alignShiftPair` in `src/lib/shift-annotator.ts` uses an in-memory `Map` cache. Redundant letter parsing is eliminated; test suite executes in < 200ms.
3. **Storage I/O Deduplication & Cookie Guard**:
   - `saveState` in `src/lib/store.ts` checks `lastSerialized` to prevent redundant writes to `localStorage` and `document.cookie`.
   - Cookie storage is size-gated (lean payload written only if it URL-encodes to ≤ 2048 bytes) with a minimal fallback to prevent cookie truncation and HTTP request header bloat.
   - `loadSavedState` parses both stores and merges them field-by-field (localStorage wins; the cookie fills gaps), so a truncated localStorage payload can no longer bury recoverable cookie data.
4. **Leaf Component Memoization**:
   - `ShiftPair` and `GenderBadge` are wrapped in `React.memo` to eliminate unnecessary DOM recalculations when sibling states update.

---

## 8. Verification Commands

All commands should be executed from `/home/shaurya/gemini-tmp/german-app-thinking-method`:

```bash
# 1. Run Data Compilation Pipeline
bun run parse-data

# 2. Run All Automated Test Suites (37 test files / 375 tests)
bun run test

# 3. Compile Production Build (Turbopack + SSG verification)
bun run build

# 4. Launch Local Development Server
bun run dev

# 5. Run the content integrity audits (all must stay green)
bun scripts/audit-word-refs.ts    # every word/table_word/transcribe/dictation/family_matrix/variant_english/twist/literal_gloss reference resolves
bun scripts/audit-teasers.ts      # title + curiosity_teaser chain drift (must be 0)
bun scripts/audit-wording.ts      # no copy-pasted prose or prompt formulas between neighbouring lessons
bun scripts/audit-vocab-balance.ts --strict

# 6. Browser smoke suite (Playwright; starts its own dev server on :3111)
bun run test:e2e
```

---

## 9. Checklist for Incoming Auditor Agent

When auditing the codebase, verify:
- [ ] **Architecture Integrity**: No external UI component frameworks or CSS-in-JS libraries installed.
- [ ] **Pedagogical Integrity**:
  - Lessons never start with cold typing exercises.
  - Review Hub front cards never display gender badges before recall.
  - Auxiliary words (like `mit`) contain clear `vocab_hints`.
- [ ] **Accessibility & Keyboard Flow**:
  - Modal and card hotkeys (1–4, Space, Enter, Backspace, [R], Esc) function without key collision.
  - Interactive inputs auto-focus without forcing auto-scroll jumps.
- [ ] **State Durability**:
  - State changes in Zustand persist to `localStorage`.
  - Cookie backup stays within safe browser limits (lean payload ≤ 2048 URL-encoded bytes).
- [ ] **Build & Tests**:
  - `bun run test` (Vitest) passes with 0 failures across all 37 test files (375 tests).
  - `bun run build` generates all static pages (8 static routes + 28 atlas family pages + 178 lesson pages) without TypeScript or Turbopack errors.
