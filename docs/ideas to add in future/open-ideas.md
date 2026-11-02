# Open ideas

A short backlog of things that are **not built**, gathered from older planning documents
after they were checked against the code. Each line says what is missing; none is a commitment.
Longer specs: [`cognitive-load-adaptivity.md`](./cognitive-load-adaptivity.md),
[`sentence-level-srs-review.md`](./sentence-level-srs-review.md),
[`native-speaker-naturalness-audit.md`](./native-speaker-naturalness-audit.md).
Check each against [`../NORTH_STAR.md`](../NORTH_STAR.md) before starting: does it help a learner
understand, remember, use or keep wanting to learn German?

## Curriculum and content

- **Lighter early cores.** The first eight core lessons still carry 9–14 `word_ids` and 16–18 table
  ids; an earlier review proposed 5–6 new words per early lesson. Treat as a hypothesis and test with
  real beginners ([`../USER_TESTING.md`](../USER_TESTING.md)) before cutting content.
- **Frequency data.** `WordEntity` has no frequency tier or corpus rank. Adding one from a real
  frequency list would let the compendium order introductions and weight SRS by usefulness.
- **Mixed-shift discrimination in the core lessons.** Drills where the learner must *identify* the
  shift without the lesson naming it exist only in optional sprigs. The distinction matters:
  applying a rule when the lesson labels it is easier than recognising which rule applies.
- **Systematic recall openers.** Lessons open on a new concept; there is no `recall` field or
  convention that starts a lesson by bridging back to earlier material (some hooks do it ad hoc).
- **Recurrence plan with a test.** `word-refs.test.ts` proves references resolve, not that each word
  *recurs* enough. A per-word encounter map (lesson × exercise type) with a floor would catch words
  that are taught once and never seen again. Do not promise a rigid "seven encounters".
- **Explicit payoff arcs for hard words** (`vergessen`, `tief`): foreshadow/payoff exists generically
  (`tm6-ideas.test.ts`), but these words have no typed multi-lesson arc.
- **External syllabus audit.** No mapping of the trail against a CEFR/Goethe checklist. Use courses
  such as Language Transfer, Nicos Weg or Menschen to audit *mechanism coverage and difficulty ramps*,
  never to copy their word lists or replace Brücke's organising principle.
- **Known lesson defect (learner-facing, worth fixing first):** `l1901_e2` in `src/data/lessons.ts` asks
  which English verb shares *schreiben*'s strong class but keys `describe / described`, marks
  `write/wrote`, `ride/rode` and `drive/drove` wrong, and its explanation ("write/wrote is a different
  class entirely") is false — *schreiben* and *write* are both class I (ei–ie–ie ↔ i–o–i). The
  October audit proposed options `["write / wrote", "sing / sang", "drink / drank", "give / gave"]`
  with target `write / wrote`; re-check the ablaut class before applying so the fix doesn't conflate
  class with cognacy.
- **Small known nits:** lesson 2's `t_to_s_ss_z` shift tag; plurals sit at topic 23 (moving them
  earlier was proposed); `GH→CH` and `Y→G` still share a topic though `V→B` has its own.
- **Standalone posture primer.** The Thinking Method design called for a one-time four-card primer;
  what shipped teaches posture in context (whisper cues, twist, a short onboarding summary).
  Decide whether a separate primer is still wanted.

## Product

- **More languages** beyond German, French, Spanish and Dutch (Norwegian — "the Viking half of
  English" — was the top candidate on the shortlist in `../dont open untill mentioned/future plans.md`).
- **Readlang-style reader integration:** read real German text with tap-to-translate feeding the
  Review Hub.
- **Typing challenges and ranks** — speed-typing competitions on top of the typing mechanics.
- **Marketing and outreach** — distribution, not code.
- **Full UI translation** and a native-speaker pass on non-German courses (human-dependent).
