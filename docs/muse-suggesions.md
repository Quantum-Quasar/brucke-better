# Muse Suggestions (Remaining Backlog)

Verified against [NORTH_STAR.md](./NORTH_STAR.md). Implemented fixes, stale claims, and rejected proposals have been removed.

## 1. Run First (Before Bigger Changes)

- **Five-beginner phone test ([USER_TESTING.md](./USER_TESTING.md)):** Observe five fresh beginners on a real phone (including next-day unaided recall) to check early-lesson pacing, mobile ergonomics, voice-missing flow, and Review discoverability before changing curriculum structure or building new systems.

## 2. Post-User-Test Pilots

- **Reviewed German audio pilot:** If phone testing shows browser TTS is a real blocker, pilot a small reviewed batch of recorded German clips (e.g., Lesson 1–3 or anchor words) before committing to a full audio library or CDN.
- **Selective practice upgrades:**
  - Pilot a short pre-reveal prediction prompt in shift cores (Cores 3–7).
  - Pilot sound-first prompts in discrimination sprigs (`302`, `402`, `502`, `602`, `702`).
  - Add targeted diagnosis feedback for specific common errors (dative objects, Perfekt auxiliary choice, subclause verb position, `kein`/`nicht`) rather than copying every `trap_note`.
  - Add a sentence-context article exercise mode and a small set of authored sentence-review variants for high-failure items.
- **CI `TRAIL.md` drift guard:** Add `TRAIL.md` to the CI generated-file sync check if you want `TRAIL.md` guaranteed in sync on every PR.

## 3. Future Backlog (Non-Urgent)

- Panorama deep links from relevant lessons (e.g., linking verb-bracket lessons to the Panorama section).
- Named side-path links without hijacking spine teasers.
- Shorter relearn path for linked leech cards in Review.
- Optional learning tools grounded in existing data: reading lens for pasted German text, curated compound practice, and a listening review deck.
- Atlas graph jump-to-word search and representative-device profiling before any graph optimization.
