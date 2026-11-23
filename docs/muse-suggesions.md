# Muse Suggestions (Remaining Backlog)

Verified against [NORTH_STAR.md](./NORTH_STAR.md) and [USER_TESTING.md](./USER_TESTING.md). Implemented fixes, features, stale claims, and rejected proposals have been trimmed, while partially completed and open items remain tracked honestly below.

## 1. Held for Discussion & Remaining Open Work
- **Unify the "What's next" surface (`NextLessonBar.tsx`):** Combine checkpoints, FSRS Due cards, Retry Queues, and Failed Sentence Cards into one clear priority recommendation (held for design discussion on priority rules).
- **Adaptive / band-scored placement:** Placement unlocks earlier topics monotonically, but scoring is not yet adaptive or band-gated.
- **Article-context coverage & high-failure variants:** ~42% of German nouns have sentence-context article clozes; remaining nouns still fall back to bare-noun prompts.
- **Trail 3-bypass counter cleanup:** Checkpoint gates now use spine completion + checkpoint pass (star quotas removed), while the 3-bypass counter remains in `trail-map.ts`.
- **Post-build user evaluation:** Run the five-beginner phone test in [USER_TESTING.md](./USER_TESTING.md).

## 2. Explicitly Deferred / Out of Scope
- **Full Lesson/Curriculum Rewrite (Deferred):** Reordering German cores/survival topics, 7–8 word caps, 40% production/1 listening item per core, 30 reading stories, early pronunciation cores (`docs/brucke-lesson-generation-prompt_001.md`).
