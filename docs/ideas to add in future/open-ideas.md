# Open ideas

A short backlog of things that are **not built**, gathered from older planning documents
after they were checked against the code. Each line says what is missing; none is a commitment.
Longer specs: [`cognitive-load-adaptivity.md`](./cognitive-load-adaptivity.md),
[`native-speaker-naturalness-audit.md`](./native-speaker-naturalness-audit.md).
Check each against [`../NORTH_STAR.md`](../NORTH_STAR.md) before starting: does it help a learner
understand, remember, use or keep wanting to learn German?

Completed sentence-process review is documented in [`../SENTENCE_REVIEW.md`](../SENTENCE_REVIEW.md);
frequency ranks, the German recurrence floor and core mixed-pattern practice are also shipped.

## Curriculum and content

- **Lighter early cores.** The first eight core lessons still carry 9–14 `word_ids` and 16–18 table
  ids; an earlier review proposed 5–6 new words per early lesson. Treat as a hypothesis and test with
  real beginners ([`../USER_TESTING.md`](../USER_TESTING.md)) before cutting content.
- **Systematic recall openers.** Lessons open on a new concept; there is no `recall` field or
  convention that starts a lesson by bridging back to earlier material (some hooks do it ad hoc).
- **Explicit payoff arcs for hard words** (`vergessen`, `tief`): foreshadow/payoff exists generically
  (`tm6-ideas.test.ts`), but these words have no typed multi-lesson arc.
- **External syllabus audit.** No mapping of the trail against a CEFR/Goethe checklist. Use courses
  such as Language Transfer, Nicos Weg or Menschen to audit *mechanism coverage and difficulty ramps*,
  never to copy their word lists or replace Brücke's organising principle.
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
- **Optional accounts and cross-device recovery — deferred evaluation only.** Consider whether an
  opt-in way to recover progress or continue on another device would help learners. This is not
  implemented or a commitment: it introduces no current accounts, sync, recovery service, or
  changes to existing backup behavior.

## Beginner learning evaluation — deferred ideas only

- **Test with real beginners.** Consider observing whether a beginner can start, finish, understand
  and remember an early lesson before deciding what to simplify. This records a future evaluation
  idea, not a testing rollout or a current product change.
- **Optional, privacy-respecting tracking.** Only if useful for that evaluation, consider opt-in,
  minimal measurements such as lessons started/finished, retry depth, time to first keystroke and
  the point where a learner stops. Any proposal should avoid third-party SDKs and user, device or
  session identifiers; evaluate whether anonymous aggregate measurements or observation alone
  suffice. No telemetry is added or enabled by this idea, and no current tracking behavior changes.

## Settled — do not re-litigate without a learner-facing symptom

These were investigated and deliberately left as they are. The per-finding audit log that
recorded them has been removed, so the dispositions live here; re-open only with an observed
learner problem, not with a preference.

- **`word_ids` entries taught in prose with no exercise line** (e.g. `hundert`/`minute` @5122,
  `zeit`/`morgen`/`garten` @5132, `bad` @5212): removing them would breach the taught-word floor,
  and adding exercise pairs would breach the 12-pair matching cap. Keep until a learner-facing
  reason appears.
- **Lesson and atlas history** uses shareable query URLs with replacement, not extra history
  entries, on desktop and touch devices. Browser Back follows actual tab history; close/Escape
  dismisses the current view. Transient dialogs retain their touch-only Back sentinel.
- **26/179 lessons introduce no new word** (14.5%). Revision lessons intentionally consolidate
  known German and stay inside the strict 25% bound; unclassified zero-new lessons are still
  rejected.
- **Overlay measurements** are already `requestAnimationFrame`-throttled and skip unchanged state.
- **Etymology precision** — shift-badge nuance, root reconstructions, loan-chain detail, softening
  a partly-true claim, source citations — is drift: `../NORTH_STAR.md` wins. Cut a shaky
  connection or replace it with plain German teaching instead of deepening or hedging it.
- **Matching pairs repeated between a core lesson and its side lesson** are the recap design.
