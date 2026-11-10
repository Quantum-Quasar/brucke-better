# Brücke (Bridge) — Etymological German Learning Platform

> **German language acquisition through historical sound shifts, living English cognates, and multi-modal spaced repetition.**

---

## Overview

**Brücke** is a self-contained web application designed to help English speakers learn German rapidly by decoding the underlying linguistic mechanics that connect both languages.

Rather than relying on rote memorization or gamified streaks without substance, Brücke leverages the **Second High German Consonant Shift (500–800 AD)** to reveal that English speakers already understand hundreds of German words.

- **Docs index**: [`docs/INDEX.md`](./docs/INDEX.md) maps every maintained doc to the task it serves. Agents: read [`AGENTS.md`](./AGENTS.md) and [`docs/NORTH_STAR.md`](./docs/NORTH_STAR.md) first.
- **Audit Manifest**: [`AUDIT_MANIFEST.md`](./AUDIT_MANIFEST.md) — data schemas, performance notes and the auditor checklist.
- **Architecture**: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — how the app is put together and which constraints are load-bearing.

---

## Tech Stack & Architecture

- **Runtime**: [Bun](https://bun.com) v1.4.4 (pinned in CI)
- **Framework**: [Next.js](https://nextjs.org) 16.4.1 (App Router, Turbopack, 100% Static Site Generation)
- **UI Library**: React 19.2 + TypeScript
- **Styling**: Tailwind CSS v4 (native CSS tokens, dark mode default)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) 5 (dual `localStorage` + size-guarded cookie persistence)
- **Icons**: Lucide React
- **Testing**: Vitest / `bun run test` (49 test files, 494 automated tests)
- **Audio Engine**: Zero-dependency browser-native Web Speech API (`window.speechSynthesis`) + a Web Audio sample engine that plays bundled `.wav` packs. Pronunciation prefers an exact locale voice, then another voice for the same language.

---

## Quick Start

### Installation

```bash
bun install
```

### Compile Knowledge Compendium

Compiles the markdown compendium into `src/data/compendium.json` and `src/data/insights.json`:

```bash
bun run parse-data
```

### Run Automated Tests

Executes the full Vitest suite — 49 test files, 494 automated tests:

```bash
bun run test
```

### Production Build

`bun run build` runs `parse-data`, then `export-data` (per-language payloads under `public/data/<lang>/`), then `next build`. It pre-renders every route to static HTML (`● SSG`): 6 static routes — the six top-level tabs `/`, `/atlas`, `/panorama`, `/review`, `/settings`, `/about`. Lessons and atlas details are in-page client views, so opening them adds no URL and no browser-history entry: 188 unique lesson ids ship as 500 per-lesson payloads, and the four atlases expose 37 atlas families. Legacy `/trail/...`, `/trail/<id>`, `/atlas/<family>` and `/atlas/master` links are redirected into the matching in-page state:

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
   - Topic 1 starts at the bottom; the learner climbs upward. The pulsing selector and minimalist next-lesson bar share the same recommendation.
   - The entire curriculum is authored: 30 cores + 79 sprigs + 65 branch lessons + 5 required reading stories = **179 lessons** (`src/data/curriculum.ts`, `src/data/lessons.ts`). The required spine is 35 lessons.
   - Recommendations cover every authored lesson in topic order: core, sprigs, attached support branches, then story. Missed lessons come first; **Continue ahead** bypasses them without awarding completion. After three explicit bypasses, those lessons stop resurfacing automatically but remain on the map. Preferences stay language-scoped and reset with a progress reset.
   - From the unfocused trail, **Tab** focuses the bar and **Enter** starts the recommendation; subsequent Tab presses retain normal navigation. Existing star/checkpoint gates are unchanged.
   - Custom DOM+SVG renderer (no game libraries) with `content-visibility` windowing per topic cluster, sized for hundreds of future lessons.
   - Trail gates require the stretch's stars and a passed checkpoint test based on its required spine lessons.
   - 5-part card-by-card lesson wizard (Hook, Pattern, Transformation Table, Bite-Sized Practice, Summary & Retries) in the in-page lesson reader.
   - Lesson 1 starts with familiar German words and a verb to build; historical and linguistic background is optional, collapsed disclosure content.
   - Scaffolded exercises (morpheme tiles, matching pairs, shift select, syntax builder, derivation typing, reverse-cognate typing; the full list is `ExerciseType` in `src/lib/types.ts`).
   - **Production drills** (`transcribe`): a thought and a lexicon in, German out, with a scaled cue ladder and optional thought breakdown. Authored `accepted_answers` allow valid complete alternatives without guessing which word orders are grammatical.
   - **Direct translations** (`literal_gloss`): pick the English that is built the German way.
   - **Listening drills** (`dictation`): the sentence is played, not written - capped replays, and a one-tap "I can't listen right now" that silences every dictation for 15 minutes and degrades it to an ordinary on-page exercise.
   - **Family grids** (`family_matrix`): a prefix x base matrix - one cell is graded, the whole family is revealed.
   - **Variant-English drills** (`variant_english`): one German sentence, every honest English rendering, and the word-match traps marked wrong.
   - **Trap notes**: the over-simplification your mind will offer, named before you offer it.
   - **Foreshadow / payoff**: a reference left deliberately open, resolved by a later lesson.
   - Pre-exercise vocabulary hints (`vocab_hints`) for auxiliary words (e.g., `mit`).
   - End-of-lesson Retry Queue: grammatical omissions do not pass, and a repeated spelling error cannot clear reinforcement. Correct it or use the guided re-learn; a flawless first-try run earns a **purple star** (gold otherwise).
   - **Rotating retry surfaces** - the same missed thought, freshly arranged. "Don't remember where the answer was - work it out again."
   - **"I guessed"** on a *correct* answer: honest uncertainty re-grades the word as Hard and brings it back sooner.
   - **30-second detour**: an ungraded, skippable tangent at the lesson's mid-point - the load-reset trough.
   - **Learning consciousness**: one re-whispered line about how to take the course, on roughly one lesson in seven.
   - **Sound import** on the transformation table: "you already make this sound", with the English word that contains it.

2. **Grammar Panorama (`/panorama`)** - NEW:
   - The second Atlas: five consultable diagrams of German *structure* instead of sound.
   - Opt-in reference layer - no levels, no progress, no gating, nothing unlocks.
   - The articles as pronouns (`der` = D- + *er*), the verb bracket, the adjective's definite feeling, the tense map, the consonant bridges.

3. **Sound Shift Atlas (`/atlas`)** (family detail and the master web open in-page):
   - Radial spatial spoke visualization for 9 consonant shift families ($TH \rightarrow D$, $P \rightarrow FF/PF$, $T \rightarrow SS/S/Z$, etc.).
   - Philological background, literature sources, and 5-question branch practice drills.

4. **Multi-Modal Review Hub (`/review`)**:
   - Algorithmic spaced repetition powered by SuperMemo SM-2.
   - Start with **Continue lesson**, **Review learned words**, or **Practise difficult words**. Due reviews stay prominent; **More practice options** opens family/domain filters, recent lessons, compounds/traps, sentence patterns, article drills and everything.
   - The article drill covers the usual singular definite article for gendered nouns in German, Dutch, French and Spanish; a fixed-width blank marks the missing article. It does not practise cases or articles in sentence context.
   - 4 selectable review styles: *Quick Flip*, *Multiple Choice (MCQ)*, *Tile Builder*, and *Derivation Typing*.
   - Typing and tile modes use the same acceptance policy: exact answers suggest Good, spelling near-misses suggest Hard with corrective feedback, and grammatical omissions suggest Again.
   - Anti-spoiler gender shields: Front card prompts with `[ der / die / das ? ]` instead of leaking the article before recall.
   - Desktop keyboard navigation (`1`–`4`, `Space`, `Enter`, `Backspace`, `←`/`→` back and forward between cards, `[R]` audio replay, `Esc`).

5. **3-Color Grammatical Gender System**:
   - `der` (Masculine): Azure Blue
   - `die` (Feminine): Vivid Rose
   - `das` (Neuter): Emerald Green
   - Educational onboarding & dismissible gender guide banners.

6. **Multi-Language Ready**:
   - Switch the learning language from Settings or onboarding (German fully authored; French trail open — 30 topics, 123 authored lessons, 9 conversion-bridge families; Spanish trail open — 30 topics, 123 authored lessons, 9 conversion-bridge families; Dutch trail open — 30 topics, 75 authored Dutch lessons, 9 correspondence families, 390 words).
   - Each language keeps its own progress slice, SRS queue, and onboarding intro (`src/data/language-content.ts`).
   - Components render language-scoped content; languages without authored content show coming-soon states instead of stale German words.

---

## Project Structure

```
src/
├── app/                  # Next.js App Router (100% SSG static pre-rendered routes)
│   ├── page.tsx          # Homepage = the trail map + in-page lesson reader
│   ├── atlas/            # Sound Shift Atlas (families + master open in-page)
│   ├── panorama/         # Grammar Panorama — the structure reference layer
│   ├── review/           # Multi-modal SRS Review Hub
│   ├── settings/ about/  # Settings & About (linked from the bottom dock)
│   ├── layout.tsx        # App layout and global shell
├── components/
│   ├── atlas/            # Radial constellation and drill components
│   ├── common/           # GenderBadge, ShiftPair, WordCardDrawer, GermanCharBar, Onboarding, AppShell
│   ├── lesson/           # LessonView/LessonReader, exercise widgets, retry queue, feedback sheets
│   ├── review/           # Review controller, deck selector, session card, answer entry and style dialog
│   ├── navigation/       # Game-style bottom dock (all destinations), slim TopNav
│   └── trail/            # TrailMap (incl. star-gate pills), LessonNodeDrawer (the homepage map)
├── data/
│   ├── compendium.json   # 1226 core words, 9 shifts, 32 compounds, 16 traps, 28 insights
│   ├── curriculum.ts     # 30 topic clusters: cores, sprigs, branches + star gates
│   ├── lessons.ts        # ordered German aggregate; individual lessons in lessons/<id>.ts
│   ├── french/ spanish/ dutch/  # typed modules for the sibling courses (see docs/courses.md)
│   └── ...               # themes, fonts, settings, phonetics, insights, languages, word-counts
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
│   ├── store.ts, store/  # composed Zustand slices, validation and persistence
│   ├── trail-map.ts      # Map graph, responsive layout engine, unlock/recommend logic
│   └── types.ts          # Core domain TypeScript interfaces
└── tests/                # 49 test files (Vitest)
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
| `docs/` | Maintained documentation — start at [`docs/INDEX.md`](./docs/INDEX.md). [`docs/README.md`](./docs/README.md) is the longer feature-by-feature twin of this file. |
| `docs/dont open untill mentioned/` | Working notes (the long Thinking Method design). Tracked for handoff; **not** reference material. See its [`README.md`](./docs/dont%20open%20untill%20mentioned/README.md). |
| `AUDIT_MANIFEST.md` | Data schemas, performance notes and the auditor checklist. |
| `TRAIL.md` | **Generated** trail map / curriculum export (`bun run trail`). |

### Deliberately not in this repository

Some material is local-only and gitignored: `pitch/` (investor material),
`docs/thinking-method-images/`, `auditreview.md`, superseded copies under
`old documentation/` and `documented docs/`, and local agent config
(`CLAUDE.md`, `.zcodeignore`). See `.gitignore` for the
current list. If a fresh clone is missing something you expected, it is
deliberate.

---

## Architecture Invariants

- **No Third-Party Component Bloat**: The UI strictly avoids component libraries like Radix, Headless UI, or Framer Motion. Standard DOM and Tailwind CSS are used.
- **Zero Cloud TTS Dependency**: Pronunciation uses the browser's native `window.speechSynthesis` (`de-DE`), avoiding external API costs, latency, or asset downloads.
- **Durable Local Storage**: Progress is preserved across sessions using `localStorage` with a size-guarded cookie backup (the lean payload is written only if it URL-encodes to ≤ 2048 bytes) and field-level fallback merging between the two stores.
- **Local-first recovery**: After progress exists, the app offers JSON backup downloads and reminds learners weekly. Settings can request persistent storage; neither it nor installing the app protects against browser-data deletion or device loss.
- **Installable and selectively offline**: In production over HTTPS, install from the browser menu. The service worker caches visited pages, lesson payloads and lazy exercise chunks, not the whole course. Unopened or evicted content needs a connection; open each segment online before relying on it offline. No accounts or cross-device sync.
- **All Routes Static**: Every route in `/app` must pre-render via `generateStaticParams()` to guarantee instant navigation; dynamic segments set `dynamicParams = false` so unknown params 404 instead of server-rendering.
