# Brücke — Codebase Audit Manifest & System Architecture Reference

> **Auditor Quickstart**: This document is the primary reference manifest for any AI agent or human engineer conducting a comprehensive audit of the Brücke codebase. It outlines the project's locations, design goals, functional specifications, data schemas, invariants, and verification steps.

---

## 1. Project Locations & Working Directories

| Role | Path | Description |
|---|---|---|
| **Primary Codebase (Working Dir)** | `.` (project root) | Complete Next.js 16 + React 19 + TypeScript + Bun application. All source code, tests, and build scripts live here. |
| **Documentation** | `docs/` | Canonical project guide: [`docs/README.md`](docs/README.md). Task index: [`docs/INDEX.md`](docs/INDEX.md). Architecture: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). Sibling courses: [`docs/courses.md`](docs/courses.md). |
| **Content source of truth** | `word_connections.md` | Hand-maintained German compendium; parsed into `src/data/compendium.json` + `insights.json` (generated). |

The app teaches German and also ships French, Spanish and Dutch courses on the same engine (typed modules in `src/data/<lang>/`). The rest of this manifest describes the German course unless it says otherwise.

---

## 2. Executive Product Concept: What Brücke Does

**Brücke** ("Bridge") helps English speakers learn German through short lessons, familiar-word connections and recall practice.

### Core Pedagogical Premise
Use a familiar word or a clear pattern to make new German easier to remember, then practise understanding and producing it. Connections such as *water → Wasser* are teaching aids, not universal word-conversion rules. Keep explanations short and grounded in meaning and examples. If a historical connection is shaky, cut it or teach the word plainly; historical derivation verification is not a lesson-writing requirement.

### Core Philosophy: The "Pony-tail" Lean Architecture
- **Zero Heavy Framework Bloat**: No Radix UI, Headless UI, Framer Motion, Axios, or Lodash. Standard web platform APIs, Tailwind CSS v4, and minimal custom primitives.
- **100% Client-Side Fast + SSG**: All app routes build to pre-rendered static HTML (`● SSG`). Zero server execution latency at runtime.
- **Local-first storage**: Progress persists primarily in `localStorage`, with a size-guarded cookie fallback and manual JSON backup. This is not an account or cross-device recovery service.

---

## 3. Four Core Functional Pillars

### Pillar 1: The Trail (`/` and the in-page lesson reader)
- **Curriculum Scope**: 30 topic clusters with the entire curriculum authored — 30 cores + 79 sprigs + 65 branch lessons + 5 required reading stories = **179 lessons**, all fully interactive. Unknown lesson ids open the reader's "Coming Soon" state instead of creating a route.
- **Recommendation bar**: every authored lesson, including sprigs and branches, in topic order. Earlier gaps are offered first; Continue ahead suppresses automatic gap reminders after three explicit bypasses without awarding progress. Tab from an unfocused trail focuses Start; Enter launches it. Map layout and gate thresholds are unchanged.
- **5-Segment Card-by-Card Wizard (`LessonReader.tsx`)**:
  1. **Part 01: The Hook**: Familiar German first; historical notes are optional disclosures.
  2. **Part 02: The Pattern**: Mechanical shift rules and suffix patterns (`-en`), with optional linguistic background.
  3. **Part 03: Transformation Table**: Interactive `ShiftPair` grid highlighting shifted letters in cyan and target words in amber. Includes a bridge card to the Sound Shift Atlas family view (`/atlas`).
  4. **Part 04: Interactive Practice**: Exactly **ONE bite-sized problem mounted at a time** with Duolingo-style progress indicator dots. Starting exercises are never cold typing (scaffolded with morpheme tiles, matching pairs, and multiple choice). Features explicit vocabulary hint chips (`vocab_hints`) for auxiliary words (e.g. `mit`).
  5. **Part 05: Summary & Retries**: Key takeaway, curiosity teaser, Atlas link, and persisted reinforcement. Grammatical omissions cannot pass; repeated spelling errors do not clear a retry. Guided re-learning remains available.

### Pillar 2: Sound Shift Atlas (`/atlas`, with in-page family detail and master web)
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
- **Accessible alternative**: each family exposes a semantic English/target/shift/example table with the same drill. Atlas nodes and Trail lesson buttons are keyboard reachable with visible focus; reduced motion disables animated/pulsing decoration.

### Pillar 3: Spaced Repetition Review Hub (`/review`)
- **Algorithm**: Unified SuperMemo SM-2 interval scheduler (`src/lib/srs.ts`) tracking repetitions, ease factors, lapses, intervals, and due dates.
- **10 review deck types** for vocabulary/example entities (`DECK_CAPABILITIES` in `src/lib/review-decks.ts`); beginner actions lead, advanced filters are disclosed on demand. Failed sentence processes have a separate additive queue:
  1. **Due Today**: Spaced repetition queue filtered by algorithmic due date.
  2. **By Shift Family**: Filterable practice by individual consonant shift.
  3. **By Domain**: Words grouped by the `domain` column of the compendium.
  4. **Weakest Words**: High-lapse words requiring immediate consolidation.
  5. **Recent Lessons**: Words from the most recently completed lessons.
  6. **Compounds & Traps**: 48 specialized cards covering 32 compound calques (*Handschuh*, *Kühlschrank*, *Flugzeug*) and 16 false friend traps (*Gift*, *bald*, *bekommen*).
  7. **Sentence Patterns**: Lesson example sentences as review items.
  8. **Article & Gender Drill**: The usual singular definite article for gendered nouns in German, Dutch, French and Spanish, with a fixed-width blank. It does not teach cases or articles in sentence context.
  9. **Everything**: The full pool.
  10. **Learned Words**: Encountered/mastered words, independent of advanced new-word filters.
  All ordinary decks use the learner's 5/10/20/All session limit (default 10), rather than a hidden Learned-only cap. Suspend persists until manual resumption; Bury lasts through the current local day. Five lapses since relearning move the card to the separate Relearn queue; mapped cards link back to a teaching lesson, dictionary-only cards offer contextual relearning. Mastery does not stop future scheduling.
- **4 review styles overall** (Article & Gender uses MCQ only; other decks support all four):
  - `flashcard` (Quick Flip): Recall in mind $\rightarrow$ Space/Enter reveals $\rightarrow$ 1–4 SM-2 grade.
  - `mcq` (Multiple Choice): Pick target word from 4 options (hotkeys 1–4).
  - `tiles` (Tile Builder): Assemble morphemes into words (mouse click or desktop keyboard typing + Backspace).
  - `typing` (Derivation Typing): Type full derivation with on-screen umlaut bar.
- **Active Recall Shield**: Front card hides gender article badges, displaying neutral placeholder `Gender: [ der / die / das ? ]` to avoid leaking answers before recall. Full color badge and pronunciation reveal on card flip.
- **Review Style Prompt**: Multi-style decks open a selector before the session and allow style changes in-session. The article drill goes straight to MCQ.
- **Failed sentence processes**: one language-scoped `SentenceCard` per `${lessonId}:${exerciseId}`, created on incorrect answers and persisted with progress. Replays use existing widgets, cap sessions at 15, and do not alter stars, lesson completion or word mastery. Assistance/near-miss replays grade Hard; wrong replays grade Again. See [`docs/SENTENCE_REVIEW.md`](docs/SENTENCE_REVIEW.md).
- **Vocabulary frequency**: exact-form subtitle-corpus ranks enrich lexical entities; missing forms remain unranked. Due date and ease factor take precedence over frequency ordering. Provenance, pinned source revision and CC BY-SA attribution ship in `public/data/frequency-provenance.json`.
- **Practice coverage**: German cores 5–30 include mixed-pattern recognition; the recurrence guard requires assessed retrieval of each taught word in two distinct lessons, excluding declaration-only appearances and duplicate surfaces.

---

## 4. Supporting Systems & Ergonomics

1. **3-Color Grammatical Gender System (`src/lib/gender.ts`, `GenderBadge.tsx`)**:
   - `der` (Masculine): Azure Blue (`#0ea5e9` / `text-sky-300 bg-sky-500/20 border-sky-400/50`)
   - `die` (Feminine): Vivid Rose (`#f43f5e` / `text-rose-200 bg-rose-500/25 border-rose-400/60`)
   - `das` (Neuter): Emerald Green (`#10b981` / `text-emerald-200 bg-emerald-500/25 border-emerald-400/60`)
   - Introduced via an educational dismissible banner (`GenderGuideBanner.tsx`) and onboarding.
   - The article and readable gender cue accompany colour; colour is never the sole badge label.
2. **Zero-Dependency Native Speech Synthesis (`src/lib/audio.ts`)**:
   - Uses `window.speechSynthesis` with the active language's locale (`de-DE` for German), voice matching, and `0.92x` learner pace.
   - No app-operated speech API or speech MP3 bundles. Device voices may still need installation or a connection; a missing target-language voice triggers guidance and a warning. Keyboard samples load only when played from the selected pack.
   - Embedded speaker buttons across `ShiftPair`, `WordCardDrawer`, `ReviewPage`, and `LessonReader`, plus keyboard shortcut `[R]` / `[A]`.
   - Optional browser speech recognition is explicitly enabled and started by the learner, with a provider/online-processing disclosure. Transcript feedback is lenient and non-gating; the app stores no audio/transcripts.
3. **Desktop Keyboard First Ergonomics**:
   - `1`, `2`, `3`, `4`: Select MCQ options or grade SM-2 cards (Again, Hard, Good, Easy).
   - `Space` / `Enter`: Reveal cards, advance lessons, check answers.
   - `Backspace`: Unpick tiles in Tile Builder.
   - `[a-z, ä, ö, ü, ß]`: Type directly to snap matching tiles in Tile Builder.
   - `[R]` / `[A]`: Replay native German pronunciation audio.
   - `Escape`: Cleanly exit review sessions and dismiss drawers/modals.

---

## 5. File Structure & Component Map

A short map of where things live; list the directories yourself for the full tree (it rots when written out here).

```
.
├── package.json               # Next.js 16.4.1 (declared ^16.4.1; bun.lock resolves 16.4.1), React 19.2.8, Tailwind v4, Zustand 5, Vitest 5, Bun
├── next.config.mjs            # Redirects for legacy /trail and /atlas URLs; cache headers
├── word_connections.md        # German content source of truth (parsed into src/data/*.json)
├── scripts/                   # Build + audit tooling — see scripts/README.md
├── public/data/<lang>/        # Generated per-language payloads (bun run export-data)
├── src/
│   ├── app/                   # Six static routes: /, /atlas, /panorama, /review, /settings, /about
│   ├── components/            # common/ (AppShell, ShiftPair, WordCardDrawer…), lesson/ (LessonView,
│   │                          #   LessonReader, one widget per exercise type), atlas/, trail/, navigation/
│   ├── lib/                   # types.ts, store.ts, srs.ts, letter-diff.ts, shift-annotator.ts,
│   │                          #   trail-map.ts, review-decks.ts, review-modes.ts, word-entities-core.ts, audio.ts, sound.ts
│   ├── data/                  # compendium.json (1226 words, 9 shifts, 32 compounds, 16 false friends, 28 insights),
│   │                          #   lessons/<id>.ts (all 179 authored German lessons), ordered lessons.ts, curriculum.ts
│   └── tests/                 # Vitest — whole-curriculum integrity, timezone boundaries,
│                              #   persistence merging, security, docs-sync
└── tests/e2e/                 # Playwright smoke suite
```

In-page views: lessons and atlas details are rendered by `AppShell.tsx` (`LessonView`, `ConstellationDetailClient`); there are no `/trail/[id]` or `/atlas/[family]` pages. Language-explicit query URLs restore these client-rendered views when copied or reloaded.

---

## 6. Key Data Entities & Schemas (`src/lib/types.ts`)

- **`WordEntity`**: Primary vocabulary item with meaning, pronunciation, context, domain and optional `frequencyRank` (`null` for an unmatched corpus form). Article and example-sentence entities do not borrow a lexical rank.
- **`ShiftFamily`**: Consonant shift definition. Fields: `id`, `name`, `symbol`, `phonetic_rule`, `historical_linguistics`, `philological_note`, `literature_source`, `word_ids`.
- **`SRSCard`**: Spaced repetition tracking card. Fields: `word_id`, `interval`, `repetitions`, `ease_factor`, `due_date`, `lapses`, `last_reviewed`.
- **`SentenceCard`**: Failed-process schedule keyed by `id`, with `lessonId`, `exerciseId` and SM-2 interval/repetition/ease/lapse/date fields. Stored separately from word `srsCards` in the active language slice.
- **`Lesson`**: Curriculum unit. Fields: `id`, `slug`, `title`, `subtitle`, `phase`, `shift_categories`, `word_ids`, `hook`, `pattern`, `table_word_ids`, `exercises` (typed by `ExerciseType`), `summary`, and an optional `twist`.
- **`CompoundCalque`**: Transparent compound nouns. Fields: `id`, `compound`, `gender`, `literal_morphemes`, `real_meaning`, `english_counterpart`, `lore`.
- **`FalseFriend`**: Deceptive cognate traps. Fields: `id`, `german_word`, `looks_like`, `actual_meaning`, `trap_note`.

---

## 7. Performance & Resource Optimization Highlights

1. **100% Pre-rendered Static Site Generation (SSG)**:
   - The app ships 6 static routes (`/`, `/atlas`, `/panorama`, `/review`, `/settings`, `/about`), plus canonical `/trail/<lang>/<id>` lesson reference pages with introductions, patterns, vocabulary and outcomes. Lessons (188 unique lessons across 500 per-lesson payloads) and atlas families (37 atlas families across four atlases) retain instant practice/reference overlays.
   - Overlays replace the current history entry with language-explicit query URLs; copied links and reloads restore them. Canonical lesson pages carry `LearningResource` data and appear in the sitemap; robots points to it. Builds regenerate ignored `public/data/` distribution files from committed content, rather than storing those copies in git.
2. **Shift Alignment Memoization**:
   - `alignShiftPair` aligns whole spellings before highlighting known correspondences, handles double shifts and uses a bounded 500-entry cache. Twenty golden alignments pin the actual highlighted spans, including V/F→B and Y/GH→G/CH.
3. **Storage I/O Deduplication & Cookie Guard**:
   - `saveState` in `src/lib/store/persistence.ts` checks `lastSerialized` to prevent redundant writes to `localStorage` and `document.cookie`.
   - Cookie storage is size-gated (lean payload written only if it URL-encodes to ≤ 2048 bytes) with a minimal fallback to prevent cookie truncation and HTTP request header bloat.
   - `loadSavedState` parses both stores and merges them field-by-field (localStorage wins; the cookie fills gaps), so a truncated localStorage payload can no longer bury recoverable cookie data.
4. **Leaf Component Memoization**:
   - `ShiftPair` and `GenderBadge` are wrapped in `React.memo` to eliminate unnecessary DOM recalculations when sibling states update.

---

## 8. Verification Commands

All commands run from the repository root:

```bash
# 1. Run Data Compilation Pipeline
bun run parse-data

# 2. Run the full Vitest suite (the runner reports live totals), then lint and typecheck
bun run test
bun run lint
bun run typecheck

# 3. Compile Production Build (parse-data + export-data + next build; SSG verification)
bun run build

# 4. Launch Local Development Server
bun run dev

# 5. Run the content integrity audits (all must stay green)
bun scripts/audit-word-refs.ts    # every word/table_word/transcribe/dictation/family_matrix/variant_english/twist/literal_gloss reference resolves
bun scripts/audit-teasers.ts      # title + curiosity_teaser chain drift (must be 0)
bun scripts/audit-wording.ts      # adjacent-lesson wording report; not a mandate to prove historical derivations
bun scripts/audit-vocab-balance.ts --strict
bun scripts/audit-recurrence.ts --strict # assessed German retrieval floor, including lesson/exercise-type report

# 6. Browser smoke suite (Playwright; starts its own dev server on :3111)
bun run test:e2e
bun run test:product             # after build: keyboard completion, widget accessibility, mobile 4G budgets
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
  - `bun run test` (Vitest) passes with 0 failures; use its report for current test and file totals.
  - `bun run build` generates all static pages (6 static routes + 500 lesson payloads) without TypeScript or Turbopack errors.
