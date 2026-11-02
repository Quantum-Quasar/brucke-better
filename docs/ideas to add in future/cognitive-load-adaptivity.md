# Cognitive-load adaptivity — the tension-contour engine

> **Status:** idea, specified, **not implemented** (no `src/lib/load-contour.ts`; lessons keep a
> fixed `e1…e5` load shape for every learner).

## The idea

Load should be a **contour** — peaks and troughs — not a rising gradient, and the app can do
what a classroom teacher does by reading the room: measure the learner and shape the contour
around what it observes. Three instruments:

1. **Artificial friction** — leave something slightly harder than necessary (same material, one
   deliberate step up).
2. **The trough** — an interesting, ungraded offshoot that resets load.
3. **Never panic, never boredom** — too high and the learner clutches at key facts; too low and
   they drift.

## Signals (mostly already in the app)

| Signal | Where | Reads as |
|---|---|---|
| consecutive first-try successes | `LessonReader` local run | under-load |
| cue-ladder reveals | `TranscribeExercise` `cuesRevealed` | over-load |
| retry-queue depth | `retryQueue` | over-load |
| "I guessed" flags | store (`flagGuessed`, shipped) | right but unsure |
| time-to-first-keystroke | **new, to measure** | too fast = autopilot, too slow = stuck |

## Engine sketch

A pure function, no React or store, trivially testable:

```ts
// src/lib/load-contour.ts
nextContourMove(signal: LoadSignal): ContourMove
// { kind: "none" } | { kind: "friction", extraDistractors, dropCues } | { kind: "trough", … }
```

Rules (all within **one lesson**):

- `queued >= 2` or `cuesUsed >= 3` → next production exercise becomes a recognition-only trough
  (ungraded for the star).
- `cleanStreak >= 3` → friction on the next production exercise (`extraDistractors: 2`,
  `dropCues: 1`).
- `guesses >= 2` → fire the trough once regardless of streak.
- `medianLatencyMs < 900` → treat as under-load even if wrong; friction on the *next* item, never
  re-grade the current one.
- Everything else → `none`. The default is the fixed shape; the engine only intervenes.

Hook points: before rendering the next exercise (reuse `retry-variation.ts` shuffling, plus
authored `variants` where present), and the existing twist/detour machinery for troughs.

## Guard rails

- Friction never changes grading; only the surface changes.
- At most one friction move per lesson; never remove the last cue rung.
- Troughs never gate, and are not announced as such.
- If the learner is struggling the engine makes the next thing *easier* — it never repeats the hard thing.
- Within-lesson only for v1: cross-lesson adaptation risks reordering the trail
  (`AGENT_PRECAUTIONS.md` §3.1).

## Effort

`load-contour.ts` + tests: small. Signal wiring (latency is the fiddly part — measure
first keystroke, not first render): small–medium. Authored `variants` on ~12 high-value
exercises: medium. No new routes, no gate/star/`trail-map.ts` changes.
