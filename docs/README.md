# Brücke — learn German through familiar words

> **Short lessons, useful patterns, and spaced repetition for English speakers.**

This is the canonical project README. The root [`README.md`](../README.md) is a
quick-start pointer; [`INDEX.md`](./INDEX.md) maps task-specific documentation.
`src/tests/docs-sync.test.ts` checks documented facts against runtime data and package metadata.

---

## Overview

**Brücke** helps English speakers learn to understand and produce German, using familiar English words as a starting point.

Sound correspondences, compounds and sentence patterns are memory aids, not a requirement to study historical linguistics. Start with usable words, try the exercises, and revisit difficult words in review. Keep explanations short and grounded in the actual meaning and example; if a connection is shaky, drop it or teach the word plainly rather than demanding a research pass.

The German compendium contains **1226 words**. Use the lesson examples and pronunciation, then practise recall; the atlas and historical notes are optional reference material.

**French course (open trail).** The same engine teaches French through the Norman doublets — 1066 left English and French sharing thousands of cognates, and the French trail decodes them the same way: 30 topics (123 lessons authored), 9 conversion-bridge families (`-ion`, `-ation→-er`, `-ité`, `-ance`, `-é`, `-ment`, `-eur`, `-able`, doublets), a 306-word compendium with 16 compound calques and 16 false friends, and its own trail/atlas/review layers. Authored as typed modules in `src/data/french/` (not parsed from `word_connections.md`).

**Spanish course (open trail).** Spanish keeps the Latin stems English borrowed: 30 topics (123 lessons authored), 9 conversion-bridge families (`-ción`, `-dad`, `-mente`, the `-ar` verb engine, `-ico`, `-al`, and three historical shifts: `f→h`, `-ct-→-ch-`, `pl/cl/fl→ll`), and a 293-word compendium. Typed modules in `src/data/spanish/`.

**Dutch course (open trail).** Dutch is the West Germanic twin English kept closest: it is Low Franconian and skipped the High German consonant shift, so *water* stays *water*, *ship* becomes *schip*, and *book* becomes *boek*. The Dutch trail has 30 topics, 75 Dutch lessons, 9 correspondence families, and a 390-word compendium with 16 compound calques and 18 false friends. Typed modules in `src/data/dutch/`.

Per-language design notes, shared method and test constraints: [`courses.md`](./courses.md).

- **Docs index**: [`INDEX.md`](./INDEX.md).
- **North Star**: [`NORTH_STAR.md`](./NORTH_STAR.md) — Brücke teaches German; word connections support learning rather than becoming the subject.
- **Architecture**: [`ARCHITECTURE.md`](./ARCHITECTURE.md) — how the app is put together and which constraints are load-bearing.
- **Audit Manifest**: [`AUDIT_MANIFEST.md`](../AUDIT_MANIFEST.md) — data schemas, performance notes and the auditor checklist.
- **Grammar Panorama**: [`german-panorama.md`](./german-panorama.md) — every German structure mapped to the lesson ids that teach it, with a `taught` / `inferred` / `partial` column. The repo artifact companion to `/panorama`; `inferred` rows are the honest backlog.

---

## Tech Stack & Architecture

- **Runtime**: [Bun](https://bun.com) v1.4.4 (pinned in CI)
- **Framework**: [Next.js 16.4.1](https://nextjs.org) (declared `^16.4.1` in `package.json`, resolved in `bun.lock`; App Router and Turbopack). Top-level tabs are statically pre-rendered; lesson content is loaded and rendered in the browser.
- **UI Library**: React 19.2 + TypeScript
- **Styling**: Tailwind CSS v4 (native CSS tokens, dark mode default)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) 5 (dual `localStorage` + size-guarded cookie persistence)
- **Icons**: Lucide React
- **Testing**: Vitest 5 (`bun run test` → `vitest run`). The runner reports current file and test totals; these are not maintained by hand. There is no `bun test` script.
- **Audio Engine**: Two independent zero-dependency browser-native paths: `window.speechSynthesis` for pronunciation (voice locale chosen per language, 0.92x, preferring an exact locale voice and then another voice for the same language), and a Web Audio **sample** engine (`src/lib/sound.ts`) that decodes bundled Monkeytype mechanical-keyboard `.wav` packs with a 24-entry buffer cache and negative URL caching.

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

Executes the full Vitest suite and reports its current totals:

```bash
bun run test
```

Browser smoke suite (Playwright) — onboarding, segment progression, SRS persistence, static routes, the `/panorama` surfaces, and the non-German course path (`tests/e2e/language-routes.spec.ts`: French/Spanish review + atlas fetch their own `/data/<lang>/*.json`):

```bash
bun run test:e2e
```

Production product checks (build first): `NEXT_PUBLIC_SITE_URL=https://your-public-origin.example bun run build && bun run test:product`.
They cover keyboard-only Lesson 1 completion with a blocking word drawer, shortcut
isolation, accessible controls/error feedback for all exercise types, and cold mobile
4G/4× CPU budgets for homepage readiness and the real Lesson 1 payload. Browser tests
also cover failed-process persistence/replay, shareable links, and a listening pause
surviving reload, tab closure and expiry without restarting its timer.

### Production Build

Pre-renders six top-level tabs — 6 static routes: `/`, `/atlas`, `/panorama`, `/review`, `/settings`, `/about` — plus canonical lesson reference pages at `/trail/<lang>/<id>`. There are 188 unique ids (179 German plus 9 French/Spanish-only ids; Dutch reuses the shared lesson-id space), 500 per-lesson payloads, and 37 atlas families. Practice and atlas details still open as instant overlays: opening, changing or closing one replaces the current history entry with a language-explicit query URL (`/?lesson=1&lang=de`, `/atlas?family=th_to_d&lang=de`, `/atlas?master=1&lang=de`). Reload restores that view; Back follows top-level tab history. Canonical lesson pages render introductions, patterns, vocabulary and outcomes for readers and search engines, with `LearningResource` structured data, `sitemap.xml` and `robots.txt`. `bun run build` regenerates ignored `public/data/` payloads before `next build`; these distribution copies are not committed.

```bash
NEXT_PUBLIC_SITE_URL=https://your-public-origin.example bun run build
```

### Start Development Server

```bash
bun run dev
```

Visit `http://localhost:3000` in your browser. Deployment: [`DEPLOYMENT.md`](./DEPLOYMENT.md).

---

## Core Features

1. **The Trail Map (`/` — the homepage)**:
   - Baba Is You-style node map: 30 topic clusters on one linear spine, with skip-able extra-practice nodes ("sprigs") and support-material branches hanging off each cluster.
   - Required spine cores and reading stories unlock sequentially; optional sprigs/branches cannot bypass a missing core. Each gate also requires its stretch's star quota and a passed checkpoint test.
   - Topic 1 starts at the bottom; the learner climbs upward. The pulsing selector and minimalist next-lesson bar share the same recommendation.
   - The entire curriculum is authored — 30 cores + 79 sprigs + 65 branch lessons + 5 required reading stories = 179 lessons, each with a title, plan and full `Lesson` object (`src/data/curriculum.ts`, `src/data/lessons.ts`).
   - Recommendations visit every authored lesson: core, sprigs, attached support branches, then story. Earlier missed lessons come first; **Continue ahead** bypasses them without marking completion. Three explicit bypasses stop automatic reminders for those gaps; the lessons remain available on the map. Preferences are language-scoped and reset with progress.
   - From the unfocused trail, **Tab** focuses the next-lesson bar and **Enter** starts it. Further Tab presses work normally; existing gates remain in force.
   - The first lesson leads with usable German. Historical notes, margin notes and linguistic background are collapsed optional disclosures.
   - Custom DOM+SVG renderer (no game libraries) with `content-visibility` windowing per topic cluster.
   - Every German core from Topic 5 includes mixed-pattern recognition using previously taught words, without naming the answer's pattern in the prompt.
   - Taught German vocabulary has assessed retrieval in at least two distinct trail lessons. Declarations, hints, banks and duplicate surfaces do not count; `bun scripts/audit-recurrence.ts --strict` reports the encounter map by lesson and exercise type. This is a minimum practice floor, not a promise of retention.
   - 5-part card-by-card lesson wizard (Hook, Pattern, Transformation Table, Bite-Sized Practice, Summary & Retries) in the in-page lesson reader.
   - Scaffolded exercises across 13 types (`ExerciseType` in `src/lib/types.ts`): morpheme tiles, matching pairs, shift select, syntax builder, derivation typing, reverse-cognate typing, **transcribe** production drills (thought + lexicon + cue ladder), **literal gloss** direct translations, **dictation** listening drills (played audio, capped replays, a 15-minute listening skip), **family grid** prefix × base matrices, **variant English** "every honest rendering" drills, **pronoun compression**, and **spoken turn reply**.
   - Every authored lesson ends with an ungraded, skippable **Twist** card and may whisper up to two **posture cues**. Onboarding offers optional goals, daily minutes and a ten-question placement recommendation; placement never invents completion or opens a locked core. Lesson previews show approximate time, exercise count and the possibility of retries.
   - Pre-exercise vocabulary hints (`vocab_hints`) for auxiliary words (e.g., `mit`).
   - End-of-lesson Retry Queue: grammatical omissions do not pass, and spelling mistakes must be corrected during reinforcement or resolved through guided re-learning. A flawless first-try run earns a **purple star** (gold otherwise).

2. **Sound Shift Atlas (`/atlas`)** (family detail and the master web open in-page):
   - Radial spatial spoke visualization for the consonant shift families ($TH \rightarrow D$, $P \rightarrow FF/PF$, $T \rightarrow SS/S/Z$, etc.).
   - Short pattern explanations, word examples and 5-question branch practice drills. Historical background is optional; remembering and using the word comes first.
   - Family tables expose English, target word, shift and example sentence alongside the same drill. Graph nodes have keyboard focus, animations respect reduced motion, and gender cues include readable text rather than colour alone.

3. **Grammar Panorama (`/panorama`)**: the second atlas — consultable diagrams of German *structure* instead of sound. Opt-in reference layer: no levels, no progress, no gating.

4. **Multi-Modal Review Hub (`/review`)**:
   - Algorithmic spaced repetition powered by SuperMemo SM-2.
   - Beginner actions are **Continue lesson**, **Review learned words**, and **Practise difficult words**, followed by Due Today. **More practice options** contains family/domain filters, recent lessons, compounds/traps, sentence patterns, article drills and everything.
   - There are **10 review deck types** for vocabulary and example-sentence entities: due, learned, shift family, domain, weakest words, recent lessons, compounds & traps, sentence patterns, article & gender, and everything (`DECK_CAPABILITIES` in `src/lib/review-decks.ts`). Failed sentence processes use a separate replay queue, not another word deck or review style.
   - Word-review sessions offer 5 / 10 / 20 / All cards (default 10), including Learned Words; the old special 20-card cap is gone. Bury hides a card until the next local day; Suspend requires manual resumption. Five lapses move a card to **Relearn**, outside normal queues, with a teaching-lesson link where available and explicit resumption after relearning. Mastery does not stop future scheduling.
   - The article drill covers the usual singular definite article for gendered nouns in German, Dutch, French and Spanish; a fixed-width blank marks the missing article. It does not practise cases or articles in sentence context.
   - 4 review styles are available overall: *Quick Flip*, *Multiple Choice (MCQ)*, *Tile Builder*, and *Derivation Typing*. Article & Gender uses MCQ only; other decks support all four.
   - Typing and tiles share grading: exact → Good, spelling near-miss → Hard with a correction, grammatical omission → Again. Authored `accepted_answers` support valid complete alternatives in free-production exercises.
   - Anti-spoiler gender shields: front card prompts with `[ der / die / das ? ]` instead of leaking the article before recall.
   - Desktop keyboard navigation (`1`–`4`, `Space`, `Enter`, `Backspace`, `←`/`→` back and forward between cards, `[R]` audio replay, `Esc`).
   - **Sentence process review** schedules incorrectly answered sentence exercises, not just their words. Cards are language-scoped, durable and replayed through the existing widgets, up to 15 per session. Correct-only work creates no card; replay changes neither stars nor word mastery. [Scheduling, recovery and conservative variation rules](./SENTENCE_REVIEW.md).
   - Corpus-backed `frequencyRank` metadata covers exact vocabulary forms across all four languages. Due date and learning difficulty retain priority; frequency only breaks ties. The word drawer explains subtitle-corpus limits and unranked forms. [Source and CC BY-SA attribution](../src/data/frequency-provenance.json).

5. **3-Color Grammatical Gender System**:
   - `der` (Masculine): Azure Blue
   - `die` (Feminine): Vivid Rose
   - `das` (Neuter): Emerald Green
   - Educational onboarding & dismissible gender guide banners.

6. **Six Star Gates on the spine** (`TRAIL_GATES` in `src/data/curriculum.ts`):
   - Gates sit at the natural family boundaries of the curriculum and close the stretch of topics the next stretch is built on, so the spine cannot be rushed past weak ground.
   - *The Shift Gate* (after topic 7, 14★), *The Grammar Gate* (after 10, 6★), *The Verb-Complex Gate* (after 16, 11★), *The Past Gate* (after 20, 9★), *The Atlas Gate* (after 26, 11★), and *The Capstone Gate* (after 29, 9★).
   - Each gate is drawn on the map as a checkpoint pill reading `★ earned/required`; clicking it opens a panel explaining what the stretch covers and why the next one depends on it.
   - A closed gate hard-locks the spine edge but leaves every already-reachable node playable. Earn the required stars and reach the checkpoint to take its test; a failed test can be retried.

7. **Multi-Language**: switch the learning language from Settings or onboarding. Each language keeps its own progress slice, SRS queue, and onboarding intro (`src/data/language-content.ts`).

---

## Personalization & Progression

The whole surface is themeable and typable, and the app never leaves the browser to do it.

- **187 Monkeytype color themes** (`src/data/themes.ts`): the picker starts with 12 curated dark, light and high-contrast choices; **Show all** and search retain the complete collection. A saved non-curated selection stays visible. Each theme supplies CSS tokens and an `isDark` flag; `alduin` remains the default.
- **WCAG contrast auditing is enforced, not aspirational**: `src/tests/themes.test.ts` walks all 187 themes and asserts `text` ≥ 4.5:1 and `sub` ≥ 4.2:1 against both `bg` and `subAlt`, and `main` ≥ 2.5:1. `scripts/contrast-audit.ts` is the one-off fixer that nudged failing colors' lightness while preserving hue and saturation, and regenerated `POPULAR_THEMES` from the passing set.
- **43 selectable self-hosted fonts** (`src/data/fonts.ts`): six recommended choices first, then **More fonts** or global search. Saved non-curated choices remain available. Only the default faces are declared initially; other faces load when selected or previewed. `Lexend Deca` remains the default.
- **`/settings`**, organised into six sections (behavior, input, sound, theme, visibility, danger zone) with a `/`-to-focus search box:
  - *behavior* — quick restart (`off` / `esc`), lazy mode (accepts `ae`/`oe`/`ue`/`ss` for `ä`/`ö`/`ü`/`ß` on US keyboards), capitalization tolerance for lowercase German nouns.
  - *input* — stop-on-error (`off` / `letter`), confidence mode, German character bar visibility (`always` / `on_focus` / `off`).
  - *sound* — master volume, click pack, error cue, with inline preview playback of every option.
  - *theme* — theme and font pickers, plus an increased-contrast toggle that strengthens muted text and error colors without discarding the selected theme (`src/lib/appearance.ts`).
  - *visibility* — key tips, caps-lock warning, and the `mastered / total` counter badge in the top nav.
  - *danger zone* — JSON backup export/import, reset settings, reset learning progress.
- **JSON backup import/export** (`src/components/settings/`): backups include settings, per-language learning progress, word SRS and sentence-process cards. Imports validate the payload and remain compatible with older backups. The settings page composes separate behavior, input, sound, theme, visibility and danger-zone components.
- **Mechanical-keyboard sound engine** (`src/lib/sound.ts`): selectable Monkeytype click packs (`cherrymx black abs`, `tealios v2`, `razer green`, …) plus `off`, and 4 error cues, shipped as real `.wav` files under `public/sounds/` and served with a one-year immutable `Cache-Control`. Decoded buffers are held in a 24-entry cache and failed URLs are negatively cached so a missing sample is never refetched in a loop. Every pack and cue is verified on disk by `src/tests/assets-and-routes.test.ts`.
- **Six-tab bottom dock** (`src/components/navigation/BottomNav.tsx`): trail, atlas, panorama, review (with a due-count badge), settings, about.
- **Word and lesson search** in the top nav (`/` outside inputs/dialogs): target words, English cognates/meanings, lesson titles, shift families and domains. Results open the word drawer or the lesson that teaches it; language indexes load on demand.
- **Optional speaking practice** in sound settings uses browser recognition when supported. Feedback is lenient and never gates progress. Starting requires an explicit gesture and warns that the browser/provider may process audio online; the app stores no recordings or transcripts. Missing target-language TTS voices trigger a one-time install guide and fallback warning, not a learning block.

The regenerated `public/` inventory is **16,938,345 raw bytes (16.15 MiB), 711 files**.
This is available disk content, not an initial download: only requested lesson data,
selected sound samples and selected/previewed fonts load. Reproduce with
`bun run export-data && bun run audit:assets`; [category breakdown](../scripts/README.md#public-asset-inventory-and-request-audit).

---

## Project Structure

```
src/
├── app/                  # Next.js App Router (100% SSG static pre-rendered routes)
│   ├── page.tsx          # Homepage = trail map + DailyInsightCard + in-page lesson reader
│   ├── atlas/            # Sound Shift Atlas (family detail + master web open in-page)
│   ├── panorama/         # Grammar Panorama — structure reference layer
│   ├── review/           # Multi-modal SRS Review Hub
│   ├── settings/ about/  # Settings & About (linked from the bottom dock)
│   ├── error.tsx         # Global error boundary (client)
│   ├── fonts.css         # @font-face declarations over public/webfonts
│   ├── globals.css       # Tailwind v4 entry + theme CSS custom properties
│   └── layout.tsx        # App layout, global shell, TopNav + BottomNav
├── components/
│   ├── atlas/            # Radial constellation, master web and drill components
│   ├── common/           # AppShell, GenderBadge, ShiftPair, WordCardDrawer, GermanCharBar,
│   │                     # OnboardingModal, theme/font selectors, DailyInsightCard
│   ├── lesson/           # LessonView/LessonReader, exercise widgets (Transcribe, LiteralGloss,
│   │                     # Dictation, FamilyMatrix, VariantEnglish, PronounCompression,
│   │                     # SpokenTurnReply, TwistCard), retry queue, feedback sheets
│   ├── review/           # Session controller, deck selector, answer entry, card and style dialog
│   ├── navigation/       # Game-style bottom dock (all destinations) + slim TopNav
│   ├── settings/         # SettingItem and cohesive settings sections
│   └── trail/            # TrailMap (incl. star-gate pills), LessonNodeDrawer
├── data/
│   ├── compendium.json   # Generated from word_connections.md (never hand-edit)
│   ├── compendium.ts     # Typed view over the raw JSON
│   ├── curriculum.ts     # 30 topic clusters: cores, sprigs, branches, 6 star gates
│   ├── lessons.ts        # ordered German aggregate; individual lessons in lessons/<id>.ts, including stories
│   ├── insights.json     # Daily insights (generated by parse-data)
│   ├── french/ spanish/ dutch/   # Typed modules for the sibling courses (docs/courses.md)
│   ├── word-counts.ts    # Cheap per-language counts for the nav chrome (pinned by tests)
│   ├── consciousness.ts, posture-cues.ts, sound-imports.ts, shift-diagnosis-table.ts   # Thinking Method data
│   └── ...               # themes, fonts, settings, phonetics, languages, panorama
├── lib/
│   ├── audio.ts          # Native speech pronunciation engine
│   ├── sound.ts          # Web Audio sample engine for click/error .wav packs
│   ├── letter-diff.ts    # Letter-by-letter diff + three-tier grading
│   ├── shift-annotator.ts, shift-diagnosis.ts   # Sound-shift aligner; wrong-answer diagnosis
│   ├── review-decks.ts, review-modes.ts, review-session.ts   # Review decks, styles, lifecycle
│   ├── srs.ts            # SuperMemo SM-2 interval scheduler
│   ├── sentence-review*.ts # Failed-process scheduling and resumable replay sessions
│   ├── store.ts, store/  # composed Zustand slices, validation and persistence
│   ├── trail-map.ts      # Map graph, responsive layout engine, unlock/recommend/gate logic
│   ├── word-entities-core.ts # Unified word / compound / trap / sentence entities
│   ├── retry-variation.ts, listening.ts   # Retry surface rotation; 15-minute listening skip
│   ├── types.ts          # Core domain TypeScript interfaces
│   └── ...
└── tests/                # Vitest unit and integration suites
```

---

## Architecture Invariants

- **No Third-Party Component Bloat**: The UI strictly avoids component libraries like Radix, Headless UI, or Framer Motion. Standard DOM and Tailwind CSS are used.
- **No app-operated cloud TTS service**: Pronunciation uses native `window.speechSynthesis`; installed voices and their offline/network behaviour depend on the device. Optional speech recognition may use a browser/provider service, disclosed before microphone use.
- **Durable Local Storage**: Progress is preserved using `localStorage` with a size-guarded cookie fallback: progress is included only when the payload URL-encodes to ≤ 2048 bytes. Otherwise the cookie retains preferences, onboarding/reset markers and `storageFailed`, and the warning offers a JSON backup (`src/lib/store/persistence.ts`). A cookie cannot preserve unlimited progress.
- **Recovery and offline**: A reminder offers JSON backups after progress exists and weekly thereafter. Settings requests persistent storage. Installation uses the browser menu; production caches visited pages, lesson payloads and lazy chunks, not the entire course. Unopened or evicted content needs a connection. Neither installation nor persistent storage prevents manual deletion or device loss; there are no accounts or cloud sync.
- **Cross-tab fallback**: When localStorage rejects writes, BroadcastChannel shares the full in-memory snapshot with other open tabs, including progress too large for the cookie. Versioned progress/reset merging still applies. Without BroadcastChannel, cookie-only writes cannot notify other tabs. This is not disk persistence: heed the storage warning and export a JSON backup.
- **Static references, lazy practice**: Top-level tabs and canonical lesson reference pages pre-render at build time. Practice and atlas details retain short shareable overlays without adding lesson-by-lesson history. Production builds require a valid public site origin; successful staging/preview deployments trigger smoke verification.
- **Deferred Ideas Live in `docs/ideas to add in future/`**: specified-but-unimplemented work. These are write-ups, not commitments — nothing in them is wired into the app.
