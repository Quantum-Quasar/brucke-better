# Muse Suggestions (Triaged Backlog)

Verified against the current codebase and [NORTH_STAR.md](./NORTH_STAR.md). Stale, already-shipped, factually incorrect, and rejected proposals have been removed.

## 1. Fix First (Confirmed Learner-Facing Bugs & Content Defects)

- **German lesson content & blurb fixes**
  - Fix wrong dictation meaning in `1003` (*the table and the hand and the book*).
  - Fix unnatural/incorrect German in `1001` (*stellen* for chair), `5291` (*in die Schweiz*), `2901` (impersonal *es* + comma), `2603` (natural sentence for `sagen`/`Weg`), `5311` (natural phrasing for *stolz*), and `2401` (comma + clear superlative context).
  - Rewrite off-topic/broken template Twists in `1604`, `5171`, `1802`, and `5071` so each practices its lesson's real point.
  - Use ordinary English meanings (not cognates) in translation matching pairs for `1901` (*write*), `1902` (*drive / travel*), `1903` (*hit / beat*), and `2301` (*bird / birds*, *cow / cows*); keep the `1901` word-family question coherent.
  - Fix four swapped English/German matching fields in `5031` (`l5031_e3`).
  - Fix stale curriculum blurbs in `src/data/curriculum.ts` for `5121` (remove `Tag/day` from T→S) and `5311` (remove `der Zorn` / `-ung`).
  - Fix stale "20 picture-prompt sentences" copy in `5052` and avoid speaking bare country names with an article (*das Österreich*, *das Polen*, *das Frankreich*) in default audio.
  - Model Duden-correct commas in subordinate clauses (`Ich weiß, dass …`), indirect questions, and relative clauses while keeping grading punctuation-tolerant.
- **Capitalization feedback (`src/lib/letter-diff.ts`)**
  - Distinguish sentence-initial capitalization from noun capitalization so lowercase *ich* at the start of a sentence does not trigger `"German nouns are capitalized"`.
- **Synthetic article review cards (`src/lib/word-entities-core.ts`)**
  - Keep the article as the quiz answer, but show and speak the full noun phrase (`der Tisch`, `l'heure`) after reveal instead of `der` alone or `la l'`.
- **Review "Everything / All" reload persistence (`src/lib/review-session.ts`)**
  - Align `MAX_CARDS` (currently 2,000) with the full German deck (~2,179 cards) so reloading a full session does not discard progress, and add a regression test.
- **SM-2 Hard / Good / Easy scheduling (`src/lib/srs.ts`)**
  - Keep `Good`'s progression intact, make `Hard` schedule sooner and `Easy` later on both new and mature cards (matching the Review UI copy), leave existing due dates untouched until reviewed, and test mastery + sentence review.
- **Whole-course `exercise.id` uniqueness guard**
  - Add a test asserting every `exercise.id` is unique across all lessons without renumbering existing IDs.
- **Service Worker cache isolation (`public/sw.js`)**
  - Separate versioned app-shell/route/JS/CSS responses from lesson payloads, fonts, and sounds so media cannot evict app chunks, preserving paired previous-build retention for open tabs, with eviction and update tests.

## 2. UX & Polish Improvements

- **Compact sticky lesson header (`src/components/lesson/LessonReader.tsx`)**
  - Keep only the compact top bar (Back + progress bar) sticky so the title and subtitle scroll away on mobile screens.
- **Readable lesson prose typography (`src/components/lesson/LessonReader.tsx`)**
  - Render multi-paragraph lesson prose in sans-serif rather than `font-mono` (keep monospace for typing inputs, diffs, and keycaps).
- **Review Hub hierarchy (`src/components/review/ReviewDeckSelector.tsx`)**
  - Put the primary Due Today / Start Review action above the session-length radio picker.
- **Settings visibility & diagnostics**
  - Show app/data build version and a visible `"Last backup download started"` timestamp + one-tap Export in Settings.
  - Add a user-triggered diagnostic report helper (lesson/exercise IDs + build versions, no private progress/answers) for bug reports.
- **Mobile & offline refinements**
  - Verify compact mobile search tap target (≥44px) in `TopNav.tsx`, per-item listening skip alongside the 15-minute quiet mode, and `TRAIL.md` drift check.

## 3. Post-User-Test Pilots & Backlog

Run the 5-beginner phone test in [USER_TESTING.md](./USER_TESTING.md) (including next-day unaided recall) before committing to structural or large feature changes:

- Shorten the five history-heavy branch hooks (`5291`, `5292`, `5231`, `5212`, `5312`) so they lead with usable German.
- Pilot a small reviewed batch of recorded German audio clips if phone testing shows browser TTS is a real blocker.
- Pilot selective practice upgrades: a pre-reveal prediction prompt in shift cores, a few sound-first prompts, sentence-context article practice, targeted diagnosis feedback for specific common errors, and a small set of authored sentence-review variants.
- Backlog ideas (non-urgent): Panorama deep links from relevant lessons, named side-path links without hijacking spine teasers, shorter relearn flow for linked leeches, reading lens / curated compound practice / listening review deck, and Atlas graph jump-to-word.
