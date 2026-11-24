# Muse Suggestions (Remaining Backlog)

Verified against [NORTH_STAR.md](./NORTH_STAR.md) and [USER_TESTING.md](./USER_TESTING.md). Implemented fixes, features, stale claims, and rejected proposals have been trimmed, while partially completed and open items remain tracked honestly below.

## 1. Held for Discussion & Remaining Open Work
- **"German: Your First Week" survival path (held for later discussion):** Build a short 5-session entry sequence from existing lessons, audio, and dialogues focused on everyday useful exchanges (ordering a drink, introducing yourself, making a plan) before diving deep into sound shifts.
- **Tune #18 "What's next" thresholds & trail 3-bypass counter (held for later discussion):** Unified recommendation engine (`src/lib/next-action.ts`) is shipped with defaults (5+ due cards promotes Review; 5+ unresolved mistakes shows a secondary pill). Revisit thresholds and whether to remove the hidden 3-bypass counter in `trail-map.ts` after testing in the app.
- **Adaptive / band-scored placement:** Placement unlocks earlier topics monotonically, but scoring is not yet adaptive or band-gated.
- **Article-context coverage & high-failure variants:** ~42% of German nouns have sentence-context article clozes; remaining nouns still fall back to bare-noun prompts.
- **Post-build user evaluation:** Run the five-beginner phone test in [USER_TESTING.md](./USER_TESTING.md).

## 2. Explicitly Deferred / Out of Scope
- **Full Lesson/Curriculum Rewrite (Deferred):** Reordering German cores/survival topics, 7–8 word caps, 40% production/1 listening item per core, 30 reading stories, early pronunciation cores (`docs/brucke-lesson-generation-prompt_001.md`).
