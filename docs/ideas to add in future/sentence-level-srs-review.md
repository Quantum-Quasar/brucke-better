# Sentence-level spaced repetition — what is still open

> **Status:** partly shipped. The Review Hub already has a **Sentence Patterns** deck: lesson
> example sentences become review entities (`src/lib/word-entities-core.ts`,
> `src/lib/review-decks.ts`, `src/app/review/page.tsx`). What follows is the part that is **not**
> built.

## The remaining gap

`SRSCard` is keyed by `word_id`, so SM-2 schedules *words and example sentences as items*, but it
never reschedules the **processes** a learner got wrong — the `transcribe`, `literal_gloss`,
`syntax_builder` and twist exercises that grade a whole thought. A learner can have every card at a
long interval and still be unable to order two clauses, because the sentence-building law decays
and nothing schedules it.

## What to build

1. **Exercise-replay cards (additive).** One `SentenceCard` per *exercise* (`${lessonId}:${exerciseId}`),
   created the first time the learner completes that exercise **incorrectly** — i.e. exactly when a
   process isn't installed. Same SM-2 fields as `SRSCard`, stored in a new `sentenceCards` record
   beside `srsCards`. Additive only: existing word decks must not change behaviour.
2. **Replay through the existing widgets** — no new exercise UI. A `transcribe` replays with a
   **cleared cue ladder** and collapsed `idea_parts`; the learner rebuilds the thought from nothing.
3. **Surface variation on replay.** Extend `src/lib/retry-variation.ts` with generated variants:
   person swap, tense swap (only where both are taught), object swap, negate, front a constituent,
   main clause → `dass`-clause. Variants are generated from the stored exercise at replay time, so
   no extra authoring; every token of a generated sentence must resolve through the
   `audit-word-refs` resolver at runtime, otherwise fall back to replaying the original. Grade
   leniently on the swing and route wrong inflections through the shift-diagnosis path.
4. **Deck rules.** Show the deck only when non-empty; cap at 15 per session (a full backlog drain
   turns the hub into a wall); keep sentence cards **out of the star/mastery economy** entirely.

## Effort

Schema + store + deck ordering: small. The variant generator is the real work (~medium); it wants an
optional authored `variants` array on `ExerciseItem` with the generic patterns as a fallback.
Tests: reuse `srs-timezone.test.ts` patterns for due dates, plus a golden German sentence per swing.
