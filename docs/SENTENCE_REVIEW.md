# Sentence-process spaced review

**Status: shipped.** The word/example-sentence decks remain separate. This queue
revisits the sentence exercise that failed, using its existing widget.

## Scheduling and progress

- One `SentenceCard` per `${lessonId}:${exerciseId}`, stored in the language's
  `sentenceCards` record beside word `srsCards`.
- Incorrect answers in `transcribe`, `literal_gloss`, `syntax_builder`, `dictation`,
  `variant_english`, `pronoun_compression` and `spoken_turn_reply` create cards.
  Correct-only answers, previews and ungraded twists do not.
- A first failure is due immediately. Failure notification and lesson retry queueing
  are separate callbacks: one wrong answer counts once, even though a widget also
  requests reinforcement. Later lesson success does not erase the process card.
- Replays use SM-2/local calendar dates: wrong answers grade Again, assisted or
  spelling-near-miss answers grade Hard, otherwise correct answers grade Good.
  Continuing from wrong-answer feedback cannot overwrite the saved Again grade.
- Replays never award lesson completion, stars or word mastery, and do not alter
  word SRS cards.

## Review and recovery

The section appears only when cards exist. Due sessions contain at most 15
processes. Each replay loads its authored lesson and mounts the normal exercise
widget with fresh input, unrevealed cues and collapsed thought parts.

Per-language session storage retains the current process, attempt and assistance
state. Language/reset guards reject stale callbacks and sessions. A removed exercise
can be skipped without changing its schedule; loading failures offer retry/skip.
Cards persist, merge across tabs and participate in JSON backup/import/reset.
Older backups remain compatible.

## Conservative variation

`src/lib/retry-variation.ts` can select a complete authored `variants` entry or
generate a small, checked German variation:

- Person, present/past, negation and `dass` fragments for short supported copular
  clauses, using explicit conjugations and forms present in lesson practice.
- Object swaps among known drink nouns in simple clauses.
- Fronting a final time adverb in supported simple verb-second clauses.

Generated German must pass the taught-surface token resolver. English answer
labels and sound-rule labels are not German vocabulary. There is no general
inflection or clause parser. Unsupported sentences retain their original answer
with a reshuffled surface; this is preferable to inventing grammar. Other languages
use the original exercise or a validated authored variant.

## Code and checks

- `src/lib/sentence-review.ts`: process eligibility, scheduling and session cap.
- `src/lib/sentence-review-session.ts`: resumable state and one scheduling step
  per replay, including persisted assistance.
- `src/components/review/SentenceReviewDeck.tsx`: replay UI and lesson loading.
- Store schema, persistence, backup and merge modules: durable language isolation.
- `src/tests/sentence-review.test.ts`: scheduling, recovery, isolation and safe swings.
- `tests/e2e/learning-flow.spec.ts`: one real failed attempt survives reload and
  replays once without awarding lesson or word progress.

