# Brücke (Bridge) — Etymological German Learning Platform

> **German language acquisition through historical sound shifts, living English cognates, and multi-modal spaced repetition.**

---

## Overview

**Brücke** is an open-source web application designed to help English speakers learn German rapidly by decoding the underlying linguistic mechanics that connect both languages. 

Rather than relying on rote memorization or gamified streaks without substance, Brücke leverages the **Second High German Consonant Shift (500–800 AD)** to reveal that English speakers already understand hundreds of German words.

- **Comprehensive Audit Manifest**: See [`AUDIT_MANIFEST.md`](./AUDIT_MANIFEST.md) for full architectural specifications, data schemas, and audit instructions.
- **Design Specification**: See [`docs/german_learning_platform_design-final.md`](./docs/german_learning_platform_design-final.md).

---

## Tech Stack & Architecture

- **Runtime**: [Bun](https://bun.com) v1.4+
- **Framework**: [Next.js](https://nextjs.org) 16.3.4 (App Router, Turbopack, 100% Static Site Generation)
- **UI Library**: React 19.2 + TypeScript
- **Styling**: Tailwind CSS v4 (native CSS tokens, dark mode default)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) 5 (dual `localStorage` + size-guarded cookie persistence)
- **Icons**: Lucide React
- **Testing**: Vitest / `bun run test` (37 test files, 367 automated tests) <!-- corrected 2026-10-08 against the actual vitest run; counts pinned by src/tests/docs-sync.test.ts -->
- **Audio Engine**: Zero-dependency browser-native Web Speech API (`window.speechSynthesis`) + a Web Audio sample engine that plays bundled `.wav` packs

---

## Quick Start

### Installation

```bash
bun install
```

### Compile Knowledge Compendium

Compiles raw markdown dictionaries into `/src/data/compendium.json`:

```bash
bun run parse-data
```

### Run Automated Tests

Executes the full Vitest suite — 37 test files, 367 automated tests:

```bash
bun run test
```

### Production Build

Pre-renders every route to static HTML (`● SSG`): 8 static routes, 28 `/atlas/[family]` pages (one per family id across the three atlases), one page per authored lesson (178 `/trail/[id]` pages — 169 German ids plus 9 French/Spanish-only ids), and language-scoped aliases at `/trail/[lang]/[id]` so shared lesson links carry their course; unknown ids 404 via `dynamicParams = false`:

```bash
bun run build
```

### Start Development Server

```bash
bun run dev
```

### Deploy

See [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) for the Vercel setup, the
`NEXT_PUBLIC_SITE_URL` social-metadata variable, and the pre-deploy audit checklist.

Visit `http://localhost:3000` in your browser.

---

## Core Features

1. **The Trail Map (`/` — the homepage)**:
   - Baba Is You-style node map: 30 topic clusters on one linear spine, with skip-able extra-practice nodes ("sprigs") and support-material branches hanging off each cluster.
   - All adjacent nodes unlock at once when a node is completed; the spine itself stays strictly ordered.
   - Read the map top-to-bottom from topic 1; the pulsing theme-colored selector marks your recommended node.
   - The entire curriculum is authored: 30 cores + 79 sprigs + 60 branch lessons = **169 lessons** (`src/data/curriculum.ts`, `src/data/lessons.ts`).
   - Custom DOM+SVG renderer (no game libraries) with `content-visibility` windowing per topic cluster, sized for hundreds of future lessons.
   - 5-part card-by-card lesson wizard (Hook, Pattern, Transformation Table, Bite-Sized Practice, Summary & Retries) at `/trail/[id]`.
   - Scaffolded exercises (morpheme tiles, matching pairs, shift select, syntax builder, derivation typing).
   - **Production drills** (`transcribe`): a thought and a lexicon in, German out - with a scaled cue ladder that reveals on demand or on failure, and an optional "break the thought up" step before the builder.
   - **Direct translations** (`literal_gloss`): pick the English that is built the German way.
   - **Listening drills** (`dictation`): the sentence is played, not written - capped replays, and a one-tap "I can't listen right now" that silences every dictation for 15 minutes and degrades it to an ordinary on-page exercise.
   - **Family grids** (`family_matrix`): a prefix x base matrix - one cell is graded, the whole family is revealed.
   - **Variant-English drills** (`variant_english`): one German sentence, every honest English rendering, and the word-match traps marked wrong.
   - **Trap notes**: the over-simplification your mind will offer, named before you offer it.
   - **Foreshadow / payoff**: a reference left deliberately open, resolved by a later lesson.
   - Pre-exercise vocabulary hints (`vocab_hints`) for auxiliary words (e.g., `mit`).
   - End-of-lesson Retry Queue ensuring mastery before progression; a flawless first-try run earns a **purple star** (gold otherwise).
   - **Rotating retry surfaces** - the same missed thought, freshly arranged. "Don't remember where the answer was - work it out again."
   - **"I guessed"** on a *correct* answer: honest uncertainty re-grades the word as Hard and brings it back sooner.
   - **30-second detour**: an ungraded, skippable tangent at the lesson's mid-point - the load-reset trough.
   - **Learning consciousness**: one re-whispered line about how to take the course, on roughly one lesson in seven.
   - **Sound import** on the transformation table: "you already make this sound", with the English word that contains it.

2. **Grammar Panorama (`/panorama`)** - NEW:
   - The second Atlas: five consultable diagrams of German *structure* instead of sound.
   - Opt-in reference layer - no levels, no progress, no gating, nothing unlocks.
   - The articles as pronouns (`der` = D- + *er*), the verb bracket, the adjective's definite feeling, the tense map, the consonant bridges.

3. **Sound Shift Atlas (`/atlas` & `/atlas/[family]`)**:
   - Radial spatial spoke visualization for 9 consonant shift families ($TH \rightarrow D$, $P \rightarrow FF/PF$, $T \rightarrow SS/S/Z$, etc.).
   - Philological background, literature sources, and 5-question branch practice drills.

4. **Multi-Modal Review Hub (`/review`)**:
   - Algorithmic spaced repetition powered by SuperMemo SM-2.
   - 5 playable decks: *Due Today*, *By Shift Family*, *Weakest Words*, *Recent Lessons*, and *Compound Calques & False Friends*.
   - 4 selectable review styles: *Quick Flip*, *Multiple Choice (MCQ)*, *Tile Builder*, and *Derivation Typing*.
   - Anti-spoiler gender shields: Front card prompts with `[ der / die / das ? ]` instead of leaking the article before recall.
   - Desktop keyboard navigation (`1`–`4`, `Space`, `Enter`, `Backspace`, `←`/`→` back and forward between cards, `[R]` audio replay, `Esc`).

5. **3-Color Grammatical Gender System**:
   - `der` (Masculine): Azure Blue
   - `die` (Feminine): Vivid Rose
   - `das` (Neuter): Emerald Green
   - Educational onboarding & dismissible gender guide banners.

6. **Multi-Language Ready**:
   - Switch the learning language from Settings or onboarding (German fully authored; French trail open — 30 topics, 123 authored lessons, 9 conversion-bridge families; Spanish trail open — 30 topics, 123 authored lessons, 9 conversion-bridge families).
   - Each language keeps its own progress slice, SRS queue, and onboarding intro (`src/data/language-content.ts`).
   - Components render language-scoped content; languages without authored content show coming-soon states instead of stale German words.

---

## Project Structure

```
src/
├── app/                  # Next.js App Router (100% SSG static pre-rendered routes)
│   ├── page.tsx          # Homepage = the Baba-style trail map
│   ├── atlas/            # Sound Shift Atlas pages
│   ├── panorama/         # Grammar Panorama — the structure reference layer
│   ├── review/           # Multi-modal SRS Review Hub
│   ├── trail/            # /trail redirects to /; /trail/[id] lesson wizard
│   ├── settings/ about/  # Settings & About (linked from the bottom dock)
│   ├── layout.tsx        # App layout and global shell
├── components/
│   ├── atlas/            # Radial constellation and drill components
│   ├── common/           # GenderBadge, ShiftPair, WordCardDrawer, CharBar, Onboarding
│   ├── lesson/           # 5-step wizard, exercise widgets, retry queue, feedback sheets
│   ├── navigation/       # Game-style bottom dock (all destinations), slim TopNav, Footer
│   └── trail/            # TrailMap, MapNode, LessonNodeDrawer (the homepage map)
├── data/
│   ├── compendium.json   # 1226 core words, 9 shifts, 32 compounds, 16 traps, 28 insights
│   ├── curriculum.ts     # 30 topic clusters: cores, sprigs, branches + star gates
│   ├── lessons.ts        # All 169 authored lessons (cores 1–30, sprigs, branches 50xx–53xx)
│   └── ...               # themes, fonts, settings, phonetics, insights, languages
├── lib/
│   ├── audio.ts          # Native speech pronunciation engine
│   ├── gender.ts         # 3-color gender metadata & styling
│   ├── lemmatizer.ts     # English inflection normalizer
│   ├── letter-diff.ts    # Letter-by-letter diff comparison
│   ├── review-modes.ts   # Question generators for review styles
│   ├── shift-annotator.ts# Sound shift letter aligner with memoization
│   ├── srs.ts            # SuperMemo SM-2 interval scheduler
│   ├── listening.ts      # 15-minute listening-skip window (environment honesty)
│   ├── retry-variation.ts # deterministic surface rotation for retries (§1.7/§1.9)
│   ├── store.ts          # Zustand store with dual persistence (+ lessonStars)
│   ├── trail-map.ts      # Map graph, responsive layout engine, unlock/recommend logic
│   └── types.ts          # Core domain TypeScript interfaces
└── tests/                # 37 test files (Vitest)
```

---

## Repository Layout & Documentation

The `src/` tree above is the app. Everything else in the repo:

| Path | What it is |
| --- | --- |
| `word_connections.md` | **The source of truth for all content data.** The hand-maintained compendium — every word, shift family, compound, false-friend trap, and insight, each derivation cited. Parsed by `scripts/parse-compendium.ts` into `src/data/compendium.json`. Edit the markdown, never the generated JSON. Tracked on purpose: the build depends on it. |
| `src/data/compendium.json` | **Generated.** Do not hand-edit — run `bun run parse-data`. |
| `scripts/` | Build and audit tooling. See [`scripts/README.md`](./scripts/README.md). |
| `tests/` | Playwright browser smoke suite (`bun run test:e2e`). Unit and integration tests live in `src/tests/`. |
| `docs/` | Specifications, audits, and design notes. See [`docs/README.md`](./docs/README.md) — the longer, correction-tracked twin of this file. |
| `docs/dont open untill mentioned/` | Live working notes and in-flight thinking. Tracked for handoff; **not** reference material. See its [`README.md`](./docs/dont%20open%20untill%20mentioned/README.md). |
| `AUDIT_MANIFEST.md` | Architectural spec and data schemas. |
| `TRAIL.md` | Trail map / curriculum export. |

### Deliberately not in this repository

Some material is local-only and gitignored: `pitch/` (investor material),
`docs/thinking-method-images/`, `auditreview.md`, superseded copies under
`old documentation/` and `documented docs/`, and local agent config
(`CLAUDE.md`, `REBALANCE_PROMPT.md`, `.zcodeignore`). See `.gitignore` for the
current list. If a fresh clone is missing something you expected, it is
deliberate.

---

## Architecture Invariants

- **No Third-Party Component Bloat**: The UI strictly avoids component libraries like Radix, Headless UI, or Framer Motion. Standard DOM and Tailwind CSS are used.
- **Zero Cloud TTS Dependency**: Pronunciation uses the browser's native `window.speechSynthesis` (`de-DE`), avoiding external API costs, latency, or asset downloads.
- **Durable Local Storage**: Progress is preserved across sessions using `localStorage` with a size-guarded cookie backup (the lean payload is written only if it URL-encodes to ≤ 2048 bytes) and field-level fallback merging between the two stores.
- **All Routes Static**: Every route in `/app` must pre-render via `generateStaticParams()` to guarantee instant navigation; dynamic segments set `dynamicParams = false` so unknown params 404 instead of server-rendering.
