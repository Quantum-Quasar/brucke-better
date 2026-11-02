# North Star — read this before you change anything

Brücke exists to **teach German to English speakers**. Etymology and cognates are a
*memory hook and a motivator* ("you already know this word"), not the subject of the app.
Nobody is here to learn linguistics. A learner who finishes a lesson should be able to
read, build, say and remember some German — and want to do the next lesson.

## The one test

> Does this change help a learner understand, remember, use, or keep wanting to learn German?

If the honest answer is "no, it only makes an etymology claim more precise, deeper,
better sourced or more carefully hedged" — **don't do it.** Log it and move on.

## What counts as a good change

- An exercise a learner cannot finish, or that grades a correct answer as wrong.
- German that is wrong, unnatural, misspelled, or means something other than stated.
- A word or rule used in practice before the learner has been taught it.
- Text that contradicts the lesson, or states something that is no longer true (stale counts, wrong teaser).
- An exercise that has stopped practising the lesson's own German point.
- Anything that makes a lesson shorter, clearer, more varied or more motivating.

## What to leave alone

- Etymological nuance: which shift badge fits best, root reconstructions, loan-chain detail,
  "soften this partly-true claim", footnotes, source citations. Depth here is the drift.
- A connection that is shaky or needs a caveat to be safe: **cut it or replace it with plain
  German teaching.** Do not research it, expand it, or add a hedge paragraph.
- New etymology-only exercises standing in for German practice.

## Audit and "give me suggestions" loops

Audits are useful; unlimited audits slowly turn the app into an etymology reference.

1. Before implementing any suggestion, label it: **blocks the learner / wrong German /
   clarity** (do it) or **etymology precision** (log it, don't do it).
2. Don't start another corpus-wide etymology verification pass. Audit the *learner's*
   experience instead: can I finish every exercise, is every word taught first, is it
   clear and encouraging?
3. If a rule in an older doc (for example "every etymological claim must be verifiable" in
   `content-agent-prompt.md`) pushes you toward more etymology work, this page wins. The practical reading of that rule is: *don't state anything false — and if
   in doubt, say less.*

## Guard rails that already exist (keep them green)

`bun run test` · `bun run typecheck` · `bun run lint` · `bun scripts/audit-word-refs.ts` ·
`bun scripts/audit-teasers.ts` · `bun scripts/audit-wording.ts` ·
`bun scripts/audit-vocab-balance.ts --strict`.
The tests include solvability (every tile exercise can be completed) and playability
(matching exercises have at most 12 pairs).
