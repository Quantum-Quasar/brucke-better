# Native-speaker naturalness verification

> **Status:** idea, not implemented — deliberately deferred by the human, who is
> "sceptic on the implementation".
> **Source:** guidebook §4.3, "Working with Native Speakers" (the whole section).

## Why this exists at all

Brücke's content audits check word references, teaser pointers, vocabulary reuse and
exercise solvability. They do not establish whether a German sentence sounds natural.
A naturalness error is learner-facing: a sentence no speaker would say, or a correct
sentence used where it means something else.

This proposal concerns usable German, not etymology. Under [`../NORTH_STAR.md`](../NORTH_STAR.md),
connections stay simple; shaky ones are cut or replaced with plain teaching, not researched.

§4.3 is about naturalness, and it is blunt about why it is hard: "working
with native speakers can be tricky, frustrating and treacherous, and expecting it to be
so from the outset will help us stay patient."

## The honest reason for deferring

The guidebook's technique is a **conversation protocol**, not a checklist:

> "Rather than asking if our learner would use the present tense when they say X, Y or
> Z, we should give them a situational context, and ask them what they would say in that
> context. Otherwise, depending on the native speaker, they may be prone to saying that
> many things which do not sound natural in the target language *are* indeed natural."

That does not automate. A script can produce the list to be checked; it cannot ask the
question the right way, detect writer bias, or tell a real objection from an imagined
context. Building a half-version of this — a form with "does this sentence sound
natural? yes/no" — would be *worse than nothing*, because it would manufacture
confidence without producing the guidebook's safeguard. The guidebook itself says the
only thing you can trust is "the limits of your own critical thinking and
investigations".

So this document specifies the **process**, not a feature, and the process is what a
human decides to run.

## The corpus to check

A script can already extract it. Every learner-facing German string in the app:

| Surface | Where |
|---|---|
| graded answers | `target_answer` on every exercise, all 7+ types |
| spoken dictation | `spoken` |
| twist answers | `twist.target_answer` |
| direct translations | `literal_gloss.german` |
| display sentences | `use_example.german`, `pattern.content`, `hook.content` |
| family grids | `family_matrix` cells |
| vocab hints | `vocab_hints[].note` |

Rough estimate: **~1,400 distinct German sentences and phrases**. That is a weekend's
skim for a native speaker who knows what to look for, and it is a month's misery for one
who does not.

## The protocol (the guidebook's, condensed)

1. **Never ask a yes/no question about a rule.** Give a *situation*: "your friend says
   'see you next week', you're reminding them about your party tomorrow — what do you
   say?" The answer you want is the sentence, not the opinion.
2. **Withhold the hypothesis.** Do not tell the checker what you think is true. People
   look for affirmation of the asker's theory; the guidebook calls this "writer bias"
   and treats it as the primary failure mode.
3. **Ask the same thing three ways, of different people.** One volunteer saying "wrong"
   is never enough. §4.3's Turkish example: a single reviewer nearly caused a whole
   course rewrite, and he turned out to be a heritage speaker who had never heard the
   expression.
4. **Mind the dialect.** Get speakers from different regions *and* generations. The
   Greek example — younger speakers dropping an N that older speakers keep — is exactly
   the case where naive editing would have destroyed correct content.
5. **Flag "false natives".** Someone who grew up abroad in another language will give
   confident, wrong corrections, usually from negative transfer out of their other
   language.
6. **Watch for imagined context.** A checker who "knows" what the sentence means will
   approve it for that reason. Re-ask with a different sentence carrying the same
   structure to see whether the verdict holds.

## What a partial automation would buy

Honest assessment of the three options:

**A. Leave this deferred.** Existing tests protect grading, solvability and content structure;
they do not prove naturalness. A human naturalness review could add value, but only with
the right process. Deferral does not mean that learner-reported German errors should wait.

**B. A checker-facing checklist app.** Export the 1,400 sentences grouped by structure
(one grid per law — negation, dative, Perfekt, relative clauses, subjunctive) with the
*English* beside them, so a native speaker can skim one structure at a time and mark
suspect ones. Do **not** ask "is this grammatical?" — ask "would you say this, and if
not, what would you say?" The free-text field is the value; the yes/no field is noise.
Effort: ~1 day. Value: real, but only with the right human.

**C. Full automation.** Not possible. Naturalness is not a rule you can encode, and any
system that claims to check it will check spelling instead. Do not build this.

## Recommendation

Option **B**, run once, by the human, with 2–3 speakers from different regions — and
treat the output as a *list of suspects to discuss*, not a list of bugs to fix. The
guidebook's central lesson about this whole stage is that a single confident correction
is worth very little, and a pattern across several speakers is worth a lot.

Effort for B: one export script (~100 lines, reuses the existing audit traversal) plus
the human's time. Everything else is judgement.
