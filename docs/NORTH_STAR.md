# North Star — read this before you change anything

Brücke exists to **teach German to English speakers**. Connections to English are fun,
simple grounding for understanding and remembering the language, not exact historical
claims or the subject of the app. Nobody is here to learn linguistics. A learner who
finishes a lesson should be able to read, build, say and remember some German — and want
to do the next lesson.

## The one test

> Does this change help a learner understand, remember, use, or keep wanting to learn German?

If the honest answer is "no, it only makes an etymology claim more precise, deeper,
better sourced or more carefully hedged" — **don't do it.**

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
   clarity** (do it) or **etymology precision** (leave it alone).
2. Don't start an etymology research or verification pass, for individual connections or
   the whole corpus. Audit the *learner's* experience instead: can I finish every exercise,
   is every word taught first, is it clear and encouraging?
3. This page takes precedence over other author instructions. Keep connections simple;
   do not invent or knowingly retain false claims. If a connection is shaky, cut it or
   replace it with plain teaching. **If in doubt, say less** — not more research,
   citations, caveats, or a list of claims awaiting verification.

## Guard rails that already exist (keep them green)

`bun run test` · `bun run typecheck` · `bun run lint` · `bun scripts/audit-word-refs.ts` ·
`bun scripts/audit-teasers.ts` · `bun scripts/audit-wording.ts` ·
`bun scripts/audit-vocab-balance.ts --strict`.
The tests include solvability (every tile exercise can be completed) and playability
(matching exercises have at most 12 pairs).
