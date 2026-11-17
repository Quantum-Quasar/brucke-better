### 3. Your two most important content docs directly contradict each other
`NORTH_STAR.md`: Do not do etymology-precision work. If a connection is shaky, cut it or replace it with plain German teaching. Do not research it.

`content-agent-prompt.md` + `AGENT_PRECAUTIONS.md`: Every derivation must be verified against Wiktionary / Etymonline / Kluge, cite the source, list `[UNVERIFIED]` items.

An agent following both will oscillate forever. **Fix:** Declare the winner in one line at the top of both files: North Star wins, practical reading is “do not state anything false, and if in doubt, say less.” Delete the verification-pass requirement. Your own `open-ideas.md` already says etymology precision is drift.


(okay so the thing is I do not care about etymology precision the other two documents that are saying that we should verify everything against vacationary whatever the fuck remove like I do not want them those were created by a like AI agent who thought precision is necessary I don't know why remove the mention of those and similar instructions from documentation And what not only remove them but in place of where wherever those instructions were that verify everything just Insert the instruction that do not be etymologically precise if connections are shaky key cut it whatever and the main purpose of the app is not to teach etymology it is just to give some grounding or give some something to connect to for learning languages it should not be etymologically precise it should not be complex it should just be like a fun little thing that is like that inspires you to understand and that makes it makes you think that it is not just a like thing to be done it is you should think about it like it is not the thing to be just learned and shove down your brain but it is to be like understood etc)

### 4. No accounts means no recovery, and your backup story is too weak for the stakes
Progress lives in the browser. Cookie fallback only holds preferences once progress grows past 2048 bytes. BroadcastChannel helps across tabs, not across devices or a cleared profile. The weekly JSON backup reminder is nonblocking and easy to snooze.

A learner who does 40 lessons and loses their browser loses everything. That is not a privacy win, it is a churn event.

**Bold fix:** Do not build full accounts yet if you do not want them. Do build one of these: (a) optional encrypted cloud sync with a passphrase, (b) automatic background export to a file the user chose, or (c) at minimum, an export-on-completion prompt after every gate, not a weekly snoozable reminder. Local-first is a feature. Local-only-and-easy-to-lose is a bug.
(Add the account thing to the future ideas documentation I have like and Just Not do the account thing currently And don't do anything about this)
(DOOOOOOOOOOOOO ITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT)

### 5. You have zero evidence a beginner survives Lesson 1
`USER_TESTING.md` is excellent: 5 fresh beginners, think-aloud, no rescuing for 60 seconds, time to first lesson, unaided recall next day, mobile pass at 390x844. There is no result file in Drive showing those sessions happened.

Meanwhile you have no analytics or telemetry by design. So you cannot answer: where do people drop, which exercise type fails most, does the retry queue feel fair or punitive, does the 3-bypass rule feel understandable?

**Bold fix:** Run the 5-person test *before* you build anything new. Record it. Then add privacy-preserving, opt-in, local-first telemetry: lesson started / finished, retry depth, time to first keystroke, drop point. No identifiers, no third-party SDK. If you refuse telemetry, the user test is not optional, it is your only signal.

(Don't do anything about this now, just add it to future ideas things to add tracking or whatever.)
(DOOOOOOOOOOOOO ITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT)

## Audit: high-priority findings

### 6. Early lessons are overloaded by your own admission
`open-ideas.md` notes the first eight cores still carry 9 to 14 `word_ids` and 16 to 18 table ids, while an earlier review proposed 5 to 6 new words per early lesson. That violates your own “one thought at a time” principle.

Also: 26 of 179 lessons (14.5%) introduce no new word. Docs justify this as revision within a 25% bound. A learner does not experience a bound, they experience a lesson that feels like a stall.

**Fix:** Cap early cores at 5 to 6 new words, move the rest to sprigs. Audit the 26 zero-new lessons: are they true consolidation with a payoff, or filler? If they do not teach a new *ability*, cut or merge them.

(will make ai check it out later) (DOOOOOOOOOOOOO ITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT)

### 8. No frequency, no recurrence map, no mixed-shift discrimination
- `WordEntity` has no frequency tier or corpus rank. You cannot order introductions by usefulness or weight SRS by usefulness.
- No per-word encounter map with a floor. `word-refs.test.ts` proves references resolve, not that each word recurs enough to stick.
- Mixed-shift discrimination drills exist only in optional sprigs. Recognizing *which* rule applies without the lesson labeling it is the real skill, and cores do not test it.

**Fix:** Add frequency from a real list, add an encounter floor (lesson x exercise type), and move one mixed-shift discrimination item into every core from Topic 5 onward. Do not promise a rigid “seven encounters,” just enforce a floor.

(done maybe partially)

## Audit: medium findings

### 12. Docs are becoming a second product
`AGENTS.md`, `ARCHITECTURE.md`, `AUDIT_MANIFEST.md`, two READMEs, `courses.md`, `content-agent-prompt.md`, `AGENT_PRECAUTIONS.md`, plus a 131KB `thinking-method-short.md` in a folder literally named “dont open untill mentioned.”

`AGENTS.md` admits the truth: `.gitignore` gates git, not the filesystem. A directory name is a label, not a control. If you do not want agents reading it, move it out of the repo, as its own README says.

**Fix:** Move `dont open` out of the repo. Merge `AUDIT_MANIFEST.md` into `ARCHITECTURE.md` (schemas + checklist in one place). Keep `AGENT_PRECAUTIONS.md` as the only trap list. Delete the rest or demote them to appendices.

(no, i wont)

### 13. Test suite is strong on content, thin on product
494 tests are mostly content integrity, docs-sync, solvability, playability, themes, and store security. Playwright has 6 specs: smoke, learning-flow, language-routes, local-first, mobile, verify-tm6.

Missing: accessibility tests (focus trap, screen reader labels, touch targets), visual regression, performance budget (bundle size, time to interactive on a mid phone), SRS edge cases beyond timezone, and a test that a lesson URL actually resolves.

**Fix:** Add 3 tests: (a) keyboard-only completion of Lesson 1, (b) screen-reader labels on all exercise widgets, (c) performance budget for homepage + Lesson 1 payload on throttled 4G. Do not add more etymology tests.



### 14. Deployment has one foot-gun
`NEXT_PUBLIC_SITE_URL` defaults to `http://localhost:3000` for OG metadata if unset. That will ship broken social cards if someone forgets it.

**Fix:** Fail the build if `NEXT_PUBLIC_SITE_URL` is unset in production, or at least warn loudly in CI. Add a staging deploy that runs the Playwright smoke suite against the deployed URL (your `DEPLOYMENT.md` already describes the command, make it automatic).

### 15. Tooling debt you already know about
`scripts/capture-demo-images.ts` hardcodes a deployed URL and a machine-specific Chromium path. Per `scripts/README.md`, you must edit those first. That script will break on every fresh machine.

**Fix:** Read URL and Chromium path from env vars with a clear error if missing, or delete the script and use Playwright’s built-in screenshot in CI.

-----------------------------------------------------------

## 10. Feedback goes nowhere, and the app has no version

`ErrorFeedbackSheet.tsx` exists (7KB). `error.tsx` is 1,364 bytes, `not-found.tsx` is 1,760 bytes. No backend, no analytics, no error reporting. So a learner who hits a broken exercise, taps “report,” and gets… what? A local toast? A file that goes nowhere?

Same for version: Service Worker is build-versioned, but there is no visible app version in Settings / About. Bug reports will say “it broke” with no version, no lesson id, no browser.

**Bold fix:** (a) Make feedback produce something useful even with no backend: copy a pre-filled bug report (lesson id, app version, browser, store version) to clipboard + `mailto:` with that text. (b) Show app version + data version in Settings footer. (c) Make `error.tsx` and `not-found.tsx` real: “Go home, resume lesson, export backup” — not a dead end.

(DOOOOOOOOOOOOO ITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT)

## 11. The Thinking Method whisper system is ~5KB of data

- `consciousness.ts` is 1,917 bytes, `posture-cues.ts` is 3,089 bytes. The whole Thinking Method whisper system is ~5KB of data. That is either elegantly minimal or too sparse to matter. Check: how many lessons actually get a whisper cue, and do learners notice?

## 12. Small gaps that are cheap and high-leverage

- **No Anki / CSV export.** Learners love Anki. Exporting the SRS queue to Anki / CSV is a weekend build and turns Brücke into a feeder for the tool power users already trust.
- **No “My words” notebook / favorites.** Learned deck is capped at 20 and algorithmic. Let learners star a word. Starred words get their own deck. Zero algorithm, high motivation.
- **No Panorama deep links from lessons.** Panorama is 21KB of data + 9KB of links, but lessons link to Atlas, not to Panorama. When a pattern teaches the verb bracket, link to that Panorama section. Otherwise Panorama is a reference no one finds.
- **No “What’s new” / changelog.** No `CHANGELOG.md`, no in-app “What’s new.” Contributors and learners cannot tell what changed. Add a changelog, show it once per version.
- **No LICENSE, no SECURITY.md, no CONTRIBUTING.md.** No LICENSE file was found in Drive. If this is open source, pick one. If it is not, say so. Right now anyone can copy it and you have no statement.
- **No CEFR / Goethe mapping.** `open-ideas.md` already flags this. A learner who needs B1 for work does not care about shift families, they care about “am I B1 yet?” Map lessons to CEFR in `TRAIL.md`, even if it is approximate and labeled as such.
- **No daily goal / habit view.** Weekly activity is tracked for backup, but there is no habit UI. No streak, no “you did 3 days this week.” You deliberately avoid gamified streaks, good, but a quiet “3 of 5 days” is accountability, not gamification.
- **No print / PDF.** Teachers and offline learners want a printable lesson. A print stylesheet for LessonReader is cheap and unlocks classroom use.
- **`DailyInsightCard.tsx` is 4KB and dead.** Daily insight rotates by date, no save, no share, no interaction. Let learners save an insight, or share it as an image card. Otherwise it is decoration.
- **`DeepLinkRestorer.tsx` (2,581 bytes) + `OfflineSupport.tsx` (2,994 bytes) are tiny for the job.** Your own settled list says desktop Back uses a touch-only history sentinel that consumes a history entry even after the overlay closes. That is a known papercut. Fix it when you fix URLs in Pass 1, not as a separate project.
- **CI is 1,875 bytes.** `ci.yml` is tiny. No mention of Lighthouse, bundle-size budget, or preview deploys in the docs. Add a bundle-size check: fail if `public/` grows by more than 5% without a note, and fail if homepage JS grows.

(see it later not now) (DOOOOOOOOOOOOO ITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT)

------

## Pass 3: The deep pass — pipeline fragility, gate erosion, and what TRAIL.md actually shows

Pass 1 was strategy. Pass 2 was inventory. This pass is the one I did by reading `TRAIL.md` itself (223KB, generated from your lessons), plus `AGENT_PRECAUTIONS.md` (18,705 bytes), `courses.md`, and the scripts folder. TRAIL.md is the most honest document you have, because it is generated, not written. It shows bugs your audits do not catch.

Nothing here repeats Pass 1 or Pass 2 except where Pass 3 adds a new angle. I am still not claiming I read `.ts` source line by line, Drive does not let me open code as text. Sizes + docs + generated output are the evidence.

## What TRAIL.md proves on page 1

### 1. Your tables are vocab dumps, not proof tables

Lesson 1 table: 16 entries. Lesson 101: 16 entries. Lesson 102: 16 entries. Lesson 2: 18 entries.

But look at what is in Lesson 2, which is supposed to teach modals + `T → S / SS / Z`:

`können, müssen, wollen, haben, sein, senden, der Wolf, das Eis, der Zoll, das Europa, zahlen, das Rindfleisch, gegen, das Esszimmer, die Hitze, der Zweig, die Haselnuss`

Only a few of those prove the shift. `das Rindfleisch` (beef), `das Esszimmer` (dining room), `die Haselnuss` (hazelnut) are just vocab. Same in Lesson 5: `die Erdnuss` (peanut), `der Wasserfall` (waterfall) appear before compounds are taught in Topic 21.

**Bold fix:** Split every table into two labeled groups: **Proof words** (these prove this lesson's law, 5 to 7 max) and **Vocab** (the rest, if you must keep them). Right now the learner cannot tell which words matter for the law and which are filler, so they try to memorize all 16. That is the overload from Pass 1, but now with the mechanism: the table is doing two jobs and failing at both.

(DOOOOOOOOOOOOO ITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT)(DOOOOOOOOOOOOO ITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT)

### 5. Your audit scripts have no tests

`audit-vocab-balance.ts` is 33,467 bytes, the largest script. `capture-demo-images.ts` is 32,259 bytes. `parse-compendium.ts` is 10,693 bytes. `audit-wording.ts` is 5,036 bytes.

None of them have a dedicated test file in `src/tests/`. You test the lessons with audits, but you do not test the audits.

If `audit-vocab-balance.ts` has a false negative, you ship an untaught word and think you are safe. If it has a false positive, you block a good lesson and waste a batch.

**Bold fix:** Add one test per audit: a tiny fake compendium + fake lesson that should pass, and one that should fail. Test the tests. This is cheaper than any new lesson.

### 6. Export rewrites 500 files every build

`export-client-data.ts` (4,717 bytes) + `export-trail.ts` (4,940 bytes) write 500 per-lesson payloads + lesson index + compendiums on every build.

**Bold fix:** Make export incremental: hash the source lesson, skip unchanged payloads. Dev loop gets faster, CI gets faster, and you stop churning 500 files in git diffs for a one-word fix.

## Gate integrity: adding content makes gates easier

### 7. Gates are absolute stars, not percentages, and that erodes them

From TRAIL.md: “Shift Gate: 14 stars required (earned across topics up to 7). Topics 1 to 7 build your decode engine… bank 14 of the 31 lessons in this stretch before moving on.”

14 of 31 is 45%. When the course had fewer branches, 14 stars meant more. As you add branches and sprigs, `AGENT_PRECAUTIONS.md` §3.3 says: “more side lessons only ever make gates easier — never weaken a gate threshold.”

That sentence is backwards. Adding content should not make the gate easier. It should keep difficulty constant.

**Bold fix:** Change gates to percentages: e.g., 60% of available stars in the stretch, or 60% of core lessons + any sprigs. Recalculate on every content addition. Otherwise every new branch you author silently devalues the gate you designed to protect learners.

### 8. Gate failure has no remediation loop

`gate-assessment.ts` is 2,523 bytes, `gate-assessment.test.ts` is 3,036 bytes. Tiny. From the docs, a gate is a star quota + checkpoint test.

What happens when a learner fails the checkpoint twice? Three times? There is no file for “gate failure remediation.” No targeted review deck, no “go back to Lesson X” recommendation, no diagnosis.

**Bold fix:** On gate failure, generate a remediation deck: the 5 words / 3 laws the learner missed most in that stretch, with links back to the lessons that teach them. A gate that just says “try again” is a wall. A gate that says “here is exactly what to redo” is teaching.

### 9. Branch teasers are unaudited, spine teasers are linear

`AGENT_PRECAUTIONS.md` §3.4: “Branch teasers chain within their own branch… The teaser auditor only walks the spine — branch chains are your own responsibility.”

Translation: branch teaser drift is unchecked. And spine teasers are linear: Lesson 1 → Hidden Twins → First Sentences Gym → Living -en → Modal Bracket → will ≠ will → Bracket in the Wild → P → F shift, etc. The teaser chain never points to a branch.

So a learner who follows teasers, which is what you want them to do, never discovers branches. Branches are where Essen, Introductions, Imperative, False Friends live. Your best content is invisible to the linear path.

**Bold fix:** (a) Extend `audit-teasers.ts` to walk branch chains too, same 0-flags rule. (b) Every 3rd spine teaser should point to a branch, not the next core: “Next: the False Friends Preview — Gift is poison.” You already have the branches, you just do not advertise them.

## Topic coherence: branches dilute the topic they sit in

From TRAIL.md:

- Topic 6 is “Velar Shift (K → CH)” but contains Essen I, Essen II, Essen III, Frühstück (5221, 5222, 5231, 5232). Food has nothing to do with K → CH.
- Topic 2 is “Modal Auxiliaries” but contains First Introductions (5071, 5072). Introductions have nothing to do with modals.
- Topic 9 is “Conjugation Roots” but contains Umlaut Clinic (5031) + Imperative (5061-5063). Imperative is a separate grammar point.

A learner opening Topic 6 expects velar shift. They get fish, cheese, soup, then sugar, honey, chocolate. The topic label lies.

**Bold fix:** Do not label branches by topic. Label them by what they are: “Side path — Essen,” “Side path — Introductions.” You already do this in TRAIL.md with the 🌿 emoji, but in the app the TrailMap clusters them under the topic. Separate the visual cluster: core + sprigs under the topic, branches in a “Side paths” rail below. Topic coherence is a learning issue, not a UI polish issue.

## Stories: required reading with no mastery check

Stories 9001 to 9005 are “required reading” per docs, but from the file sizes, `9001.ts` is 7,039 bytes, `9001.json` is 14,570 bytes. No graded exercises are described for stories in the 5-exercise contract. The 5-exercise contract applies to lessons, stories are separate.

So: a story is click-through. A learner can skim Max läuft weg, click “done,” and get credit, even if they understood nothing. And story vocab (Hund, Stadt, laufen, schnell, braun, müde) appears in the story table but is it taught elsewhere? If not, the story is the only exposure, and it is ungraded.

**Bold fix:** Give every story 3 graded checks, not 5 full exercises: 1 comprehension (what happened?), 1 vocab (what does `laufen` mean here?), 1 production (rebuild one sentence). If stories are required, they need to be checked. If they are not checked, call them optional and stop gating on them.

## Exercise system: manual ids, cue ambiguity, twist loss

### 10. Exercise ids are manual and already duplicated once

`AGENT_PRECAUTIONS.md` §7.6: “Sprig 202's e5 shipped as `l2_e5` (duplicate of core 2's) and was only found when a regex edit landed on the wrong block. Check exercise ids across the German lesson modules, including generated reading lessons; duplicate ids can cause one missed exercise to hide another in retries.”

Manual ids + regex edits = duplicate ids. It already happened.

**Bold fix:** Auto-generate exercise ids at build time from `lessonId + index`. Never hand-write them. Add a test that fails on any duplicate id across all lessons, including stories and branches. You already have the incident, do not wait for the second one.

### 11. Cue ladder vs star is ambiguous

Transcribe cues are 1 to 3 scaled prompts. From Pass 1, cue reveals are used as an overload signal. But does using a cue cost a star? Does it affect mastery? Docs do not say clearly.

If cues are free, learners will spam them. If cues cost a star, learners will avoid them and get stuck. Either way, the current ambiguity means learners cannot make an informed choice.

**Bold fix:** Write the rule in one sentence in the lesson UI: “Cues help you finish, they do not cost a star, but they do not count as first-try.” Or the opposite, but write it. Do not leave the most important grading rule implicit.

### 12. Twist foreshadowing is lost if the twist is skipped

Twist is ungraded, outside the 5-exercise contract, never touches retry queue, star, or completion. Good for low stakes, bad for foreshadowing: if a twist foreshadows a future lesson and the learner skips the twist, the payoff fails. The future lesson assumes a thread the learner never saw.

**Bold fix:** Rule: a twist may never be the *only* foreshadow for a future lesson. Every foreshadow must also appear in the lesson body (hook or summary). Twist is bonus, not infrastructure.

### 13. Prose uniqueness audit fights spaced repetition

`audit-wording.ts` (5,036 bytes) blocks prose copy-pasted between neighbouring lessons. `courses.md` says the same for siblings: no hook, pattern, summary copy-pasted.

But spaced repetition *requires* repetition. Foreshadow / payoff *requires* repeating a thread. If you block all repetition, you block the payoff.

**Bold fix:** Add an allowlist for intentional repetition: foreshadow sentences, payoff sentences, and key law statements (e.g., “Verb in position 2”) are allowed to repeat verbatim. Audit the *unintentional* copy-paste, not the intentional teaching repetition. Right now the audit cannot tell the difference.

## Language courses: field name lies and auto-ship

### 14. `german_expression` lies for French, Spanish, Dutch

`courses.md`: “Shared field names such as `german_expression` stay as they are (the generated German JSON depends on them); the sibling courses fill them with their own language's content.”

So French data has a field called `german_expression` that contains French. Every new contributor will be confused. Every refactor that renames it will break the German JSON.

**Bold fix:** Add an alias: keep `german_expression` for backward compat in the exporter, but author new content with `target_expression`. Migrate German in one batch, then delete the alias. Do not leave a lying field name in the schema because you are afraid of one migration.

### 15. German leakage regex is fragile

`courses.md`: no prose may match `nicht|ich|wir|aber|auch|noch|schon|haben|werden|ist` or `ä ö ü ß`. Dutch `worden` is fine, avoid `werden`.

Does the regex use word boundaries? If not, Spanish `listo` contains `ist`? No, `listo` is l-i-s-t-o, not i-s-t. But English “history” contains `ist`? Actually `history` contains `ist` as substring. If the regex is substring, not word-boundary, you will get false positives on English words inside French / Spanish lessons. And Dutch `ist`? Dutch has `is`, not `ist`, but `mist`? Dutch `mist` contains `ist`.

**Bold fix:** Test the leakage regex with 20 false-positive cases: English words, Dutch words, French words that contain those substrings. If any false-positive exists, add word boundaries + an allowlist. Do not trust a regex you have not fuzzed.

### 16. New languages auto-appear in onboarding

`courses.md`: “The onboarding picker reads LANGUAGES, so a new language appears there automatically.”

That means adding a language to code ships it to learners, even if it has 10 lessons, no review decks, no naturalness pass.

**Bold fix:** Add a feature flag: `LANGUAGES` (all) vs `SHIPPED_LANGUAGES` (onboarding). A language appears in onboarding only when it passes: 30 cores + review decks + naturalness pass + docs counts. Auto-ship is a footgun.

## Process and DX: the precautions that are now the bottleneck

### 17. “Protected: `src/components/**` — report bugs, do not fix them”

`AGENT_PRECAUTIONS.md` §4.5: treat authored lessons as frozen, and “protected unless the task is about them: `src/lib/trail-map.ts`, `src/lib/store.ts`, `src/components/**` (report rendering bugs instead of fixing them).”

That was a guard against agents breaking rendering. Now it is a bottleneck: a real rendering bug in a component cannot be fixed without an override, so bugs pile up in reports.

**Bold fix:** Replace the freeze with CODEOWNERS + a test: components are editable, but any change to `TrailMap`, `LessonReader`, `ReviewSessionCard` must include a Playwright test for that component. Freeze the *behavior* with tests, not the *file* with a rule.

### 18. “Lessons 1 to 10 are add-only” contradicts North Star

§7: “surgical edits to existing lessons are permitted… lessons 1 to 10 are add-only.”

But NORTH_STAR.md says: “An exercise a learner cannot finish, or that grades a correct answer as wrong… German that is wrong… do it.” If Lesson 2 has wrong German, “add-only” says you cannot fix it, North Star says you must.

**Bold fix:** Resolve the contradiction in writing: Lessons 1 to 10 are *structure-frozen* (no id / title / phase / position changes), but *content-fixable* (wrong German, unfinishable exercise, untaught word can be fixed surgically). One sentence, in both docs.

### 19. AI prose leakage needs a detector, not a reminder

§5.6: “re-read your own output for ‘self-correcting’ garbage: ‘...wait — ...’, ‘...? no — ...’, half-deleted alternatives, sentence fragments.”

That is a human reminder. Humans forget.

**Bold fix:** Add a regex to `audit-wording.ts`: flag `wait —`, `? no`, `actually,`, `or rather`, `hmm`, double spaces, half-deleted brackets. If AI prose is the risk, automate the check for AI prose tics. Do not rely on self-review.

### 20. Hydration + persistence is the most complex code, with the least learner-visible value

From sizes: `persistence.ts` 15,943 bytes, `hydration-slice.ts` 10,078 bytes, `schema.ts` 20,951 bytes, `backup-slice.ts` 13,911 bytes, `store-persistence.test.ts` 25,918 bytes, `store-boot-hydration.test.ts` 18,083 bytes. That is ~100KB of code + tests just to keep localStorage + cookie + BroadcastChannel + backup in sync.

And yet: from Pass 1, if the browser clears data, the learner still loses everything. All that complexity buys you *best-effort* durability, not *guaranteed* durability.

**Bold fix:** Do not add more persistence complexity. Add one thing that makes the complexity worth it: a visible “Last backup: 2 days ago, 142 stars, 38 lessons” in Settings, with a one-tap Export. If the learner can see the backup is fresh, they will trust the system. If they cannot see it, 100KB of persistence code is invisible.

## New quick wins from Pass 3, ranked

**Do this week:**
1. Add duplicate-article test (`der der`) + duplicate exercise id test.
2. Change gates to percentages, not absolute stars.
3. Extend teaser auditor to branches.
4. Fix `german_expression` alias + German leakage regex fuzz test.
5. Add feature flag for shipped languages.

**Do next:**
6. Split tables into Proof vs Vocab, cap proof at 7.
7. Give stories 3 graded checks.
8. Add AI-prose-tic regex to wording audit.
9. Resolve Lessons 1 to 10 contradiction in writing.
10. Add visible “Last backup” + one-tap Export in Settings.

**Kill list for Pass 3:**
- Do not split `word_connections.md` in a big bang. Split by one shift family first, prove the merge works, then continue.
- Do not add more persistence code until you have the visible backup indicator.
- Do not add a new language until the auto-ship flag exists.

Want me to turn Pass 3 into a concrete migration plan for the two riskiest items — the `word_connections.md` id collision (`essen` verb vs `Essen` noun) and the gate-as-percentage change — with the exact test cases to add first so neither breaks existing progress?

-------------


Bold product recommendations

Run the beginner kit before building anything new. USER_TESTING.md already specifies a 5-beginner protocol. The engineering is ahead of validated learning — put it in front of five real beginners and watch where the etymology hook actually lands before adding features.
Freeze sibling-language expansion. French/Spanish/Dutch run on the same engine — so the retry-wipe and SRS bugs are currently multiplied across four languages. Fix the German core loop first; expansion just copies the defects.
Ship output: 'export'. It matches your static architecture, erases three critical RCEs, and simplifies hosting. Highest-leverage single change in the repo.
Dedupe the shifts payload (−38% German lesson weight) and harden the parser to fail loud — both protect the content pipeline that everything else depends on.

Per the North Star, everything above is tagged blocks-learner / wrong-German / clarity (do) — except the 1901 scribe-family note, which is etymology precision (log, don't do), and which I'm flagging specifically so you don't act on the existing misdiagnosis.
No code was changed — this was a read-only audit. If you want, I can turn Tier 1 into a concrete fix plan with regression tests, or draft the output: 'export' migration.


----------------

 Findings

 ### 1. P1 — Article review cards pronounce the article twice and never the noun

 src/lib/word-entities-core.ts:79-82 builds synthetic article cards as:

 - target_word = the article (der, la, l')
 - gender = the noun's article (der, la, le)
 - english_cognate = "- Tisch" etc.

 Every reveal/audio path then concatenates gender + target_word: ShiftPair.tsx:105, ReviewSessionCard.tsx:198, use-review-controller.ts:1022. The learner hears/sees “der der”, “la la”, or
 “le l'”, never “der Tisch” or “l'heure”.

 Counts from buildWordEntityMaps: 727 German, 87 French, 81 Spanish, 169 Dutch article cards = 1,064. 1,042 repeat the identical article; 22 French elided nouns produce the wrong pair
 le/la l'. The same bug affects the three normal German article lemmas (der, die, das), whose source rows set self-referential gender (word_connections.md:116-118): table, atlas,
 word-card audio and review audio all produce der der.

 Fix: give article entities an explicit full spoken/display form (der Tisch, l'heure), keep gender as display metadata only or null it for article targets, exclude the three article
 lemmas from the synthetic article deck, and add an invariant test over every generated article card.

 ### 2. P1 — French elision is fixed in exactly one render path

 WordCardDrawer.tsx:124-130 correctly calls displayArticle() and speaks l'heure. The other spoken/visible paths use raw ${gender} ${word}:

 - ShiftPair.tsx:105 — lesson tables and review reveal
 - ReviewSessionCard.tsx:198 and use-review-controller.ts:1022 — review audio
 - ConstellationDetailClient.tsx:174 — atlas sample text

 22 French compendium words require elision (eau, heure, hôpital, histoire, ami, acteur, …), so those surfaces produce “le hôpital”/“la eau” and, in the article deck, le l'. Centralize a
 spokenWordForm(word, language) helper and use it everywhere; test at least one le and one la vowel-initial noun.

 ### 3. P1 — scripts/append-words.mjs writes a compendium its own parser rejects

 Reproduced in a temp copy:

 ```text
Appended 1 rows (1227–1227)
FAILED: word_connections.md:72ista: section 2: inventory says 1226, parsed 1227 rows
 ```

 The script appends §2 rows but does not update the section heading inventory, the top database inventory, TOTAL_COMPENDIUM_WORDS, WORD_COUNTS/COURSE_COUNTS, or docs. parseCompendium
 correctly rejects the result. It also warns about an UNVERIFIED record but still writes it.

 Fix: update all declared counts transactionally, fail on UNVERIFIED/missing [wiktionary] unless explicitly allowed, and add a temp-file round-trip test (append → parseCompendium →
 languages/docs guards). The script is currently a content-corruption path, not a helper.

 ### 4. P2 — “Review everything / all” cannot survive a reload

 src/lib/review-session.ts:12 caps restoration at MAX_CARDS = 2000; line 142 rejects a larger snapshot. German “everything” is 2,180 cards.

 Reproduced in Chromium: selecting all + review everything showed CARD 1 / 2180; the stored snapshot was 289,427 bytes with 2,180 cards; after /review reload there was no session counter.
 Session data was discarded despite being well under normal sessionStorage quota.

 Fix: raise the cap above the largest possible deck or stop persisting the full card list (persist deck + order/index and rebuild). Add preference of full session survives. A regression
 test for everything + all should cover this.

 ### 5. P2 — The generated-data sync guard covers only 2 of its generated outputs

 CI diffs only src/data/compendium.json and src/data/insights.json (.github/workflows/ci.yml:45). The repo also commits generated src/data/shift-names.json, public/data/ (508 files, 7.7
 MB newly), and `TRA








 ### 3. use-review-controller.ts is a 900-line god hook

 763 lines in one function, 30+ destructured dependencies feeding createReviewGrading. The 12 lint warnings are all here. It's split into helpers (use-review-answers, review-grading,
 use-review-lifecycle) but the controller still owns deck state, session state, grading orchestration, keyboard, and language chrome.

 This is the file where the next bug will live, and the file nobody will want to touch. The preGradeSnapshots + sessionGrades + sessionEpoch interaction is exactly the kind of state that
 needs three reads to reason about.

 ### 4. The German compendium ships 1227 words to every German learner

 public/data/de/compendium.json is 624 KB (152–172 KB for the other languages — German is 4× heavier). Lesson payloads are fine (11.6 KB each), but /review and /atlas fetch the whole
 compendium. frequencyRanks alone is 17.3 KB of it.
 Given you already proved you can split per-lesson payloads, the compendium is the obvious next cut: a lean index for decks, full detail on demand.


--------------------------------------------------------------------------------------

I'll start with the required docs (NORTH_STAR, INDEX, AGENT_PRECAUTIONS), get the lay of the land, then dig into the lessons and the philosophy doc.

The repo guidance is clear. Now let me get the full picture: the philosophy doc (131 KB — I'll delegate a detailed digest), the curriculum structure, and the actual lesson content.

The `flash-explorer` agent type failed to start (model config issue) — I'll retry with `general-purpose` agents. Two in flight: one digesting the philosophy doc, one sweeping all 179 lesson files. Meanwhile I'll read the curriculum spine and trail content myself.

Both subagents delivered strong material. The philosophy digest is revealing: `thinking-method-short.md` is a condensed Language Transfer guidebook for *Socratic audio courses* — it contains **no exercise taxonomy, no "TM-2" rules, no lesson template**. That's an important finding already. Now let me read the course spine (curriculum.ts), sample the trail prose mid/late-course, and check where the "TM-2/TM-3/P7" numbers the repo cites actually live.

Now the rest of the curriculum (branches + gates), the voice/schema doc, and where the repo's "TM-2/TM-3/P7" rule numbers live.

The TM numbering mystery is solved — `src/lib/types.ts` maps guidebook sections to app-level "TM-n" names. Let me read the voice doc, the schema's TM mapping, and sample the learner-facing prose mid-course and at the capstone.

The rule-number provenance is confirmed — `types.ts` encodes guidebook sections as "TM-n" app devices. One last primary-source sample: the phase-3 prose (Perfekt/Ablaut stretch) as the learner actually sees it.

I've now read the philosophy doc (via a full-coverage digest), the curriculum spine with all gates/branches, the schema's TM mapping in `src/lib/types.ts`, the voice/authoring docs, a scripted sweep of all 179 lesson files, and sampled the learner-facing trail prose from topic 1 through the Berufe/Ablaut stretch. Here's the full analysis.

---

# Brücke German course — full review

**Verdict up front:** The corpus is in exceptional mechanical health, the German-side teaching doctrine is genuinely guidebook-grade, and the content pipeline discipline is better than anything I've seen in a content repo. The real gap is elsewhere: **the app faithfully ported the Thinking Method's *content* doctrine (import, reframe, weave) but only partially ported its *interaction* doctrine (solicit-first, produce-aloud, process-affirming correction)** — and the guidebook explicitly says the interaction IS the method.

One framing note first: `thinking-method-short.md` is a condensed Language Transfer guidebook for **Socratic audio courses**. It contains no exercise taxonomy, no "TM-2", no lesson template — the repo's TM-n numbers are `src/lib/types.ts`'s own encoding of guidebook *sections* (§1.9 → TM-3, §0.3 → TM-6, etc.). That's fine, but it should be documented in one place (see Tier 4), because `AGENT_PRECAUTIONS.md` §7.2 cites "TM-2 limit 2" as if it were a doc rule, and a maintainer reading the source doc will search for it in vain.

## What's genuinely excellent — protect these

1. **The Germanic import spine is the best thing in the course.** The guidebook's German doctrine (§3.4: use the Germanic side of English; -(E)N as the launchpad before shifts; shifts as *hints*, not rules) is executed at scale with real coherence: `-en` launchpad (topic 1) → shifts as decode engine (3–7) → "Shakespeare conjugates German" thou/`-st` (9) → the Him-Case via he/him (10) → separable prefixes as phrasal verbs (15) → `ge-`/`y-`/yclept (18) → sing/sang/sung Ablaut (19) → wäre/were (5081). This is not decoration; each topic's exercises actually run on the imported knowledge.
2. **The reframes are guidebook-grade.** "Articles are pronouns wearing a hat" (1003), the word-order sandwich and "the basement" (14), umlaut as English's living i-mutation (23), the twin suppletions gut/besser (24), "Do → haben. Go → sein" with the KJV's *he is come* logic (1802). And the `trap_note` fields — *"Your mind will offer: der becomes den because masculine. The rule is smaller…"* — are guidebook §1.10 ("describe and counter shortcuts learners make") verbatim.
3. **Weaving is audited, not aspirational.** The teaser chain is machine-checked, foreshadow/payoff pairs all resolve, the recurrence floor forces every word into two retrieval lessons, `audit-vocab-balance --strict` enforces taught-before-use, and `german-panorama.md`'s taught/inferred table operationalizes the trust promise. The honest backlog containing exactly one item (passive, declared out of scope) is a strong signal.
4. **Mechanical discipline.** 179/179 lessons complete, 895 exercises, zero cold-open violations, zero duplicate ids, full word-bank coverage, no copy-pasted prose, no self-correcting AI garbage, correct German in every sample I read. `AGENT_PRECAUTIONS.md` is exemplary institutional memory.
5. **Scope honesty.** Konjunktiv II, relative clauses and als/wenn/ob sit in post-capstone *optional* branches, keeping the spine A1-complete; the five required stories sit on the spine and zigzag into optional reading branches via the teaser chain — elegant.
6. **Contours exist.** Gates demand ~45% of each stretch with `why` texts framed as promises ("everything ahead assumes…"), which is the right cueing, not test framing.

## Where the course drifts from its own philosophy — ranked

**1. The Socratic engine is missing. Teach-then-practice, never guess-first.** (Guidebook §1.8, §1.2, §3.x: "How might you say X?" *before* showing; "finding, not remembering"; the first lesson teaches the method.) Every lesson shows the pattern card first, then exercises. The learner never gets the chance to *derive* the German and be right. This is ironic because the shift system is the one content in all of language learning where prediction is mechanically derivable — English word → apply the law → the German is a payoff, not a lecture. The closest existing device is the twist, and it's *post*-lesson.

**2. The correction doctrine runs at 4% coverage.** §1.9 ("We Correct Correctly") is one of the ten things. Authored affirmations exist on 36 of 895 exercises, diagnoses on 15, concentrated in phase-1/2 cores. The shift-diagnosis table covers shift exercises; the systematic-error zones of grammar (dative objects, Perfekt auxiliary choice, subclause verb position, kein/nicht) mostly fall back to generic praise. The absurd part: **the `trap_note`s already name the predictable wrong process** — the diagnoses are sitting next to the exercises unwritten.

**3. The template hardened exactly where the guidebook forbids templates.** §0.1/§1: "no fixed recipe can exist… No one-size-fits-all." The app enforces exactly 5 graded exercises + 1 twist everywhere, and the result shows: 26 branch vocab gyms share one identical exercise sequence; all 10 reading stories share one skeleton; 2202/3002 are 4×shift_select + dictation; 74% of all lessons open with `matching_pairs`. The player contract is load-bearing (retry queue, stars), so keep the 5 slots — but the *sequence contract* per lesson family can diversify without touching the player.

**4. Branch vocab lessons are drifting into the exact failure mode your own NORTH_STAR names.** ("Etymology-only depth is the drift.") Branch hooks average 809 chars vs the cores' 453; lesson 5291's hook is a ~300-word single-paragraph loan-chain essay (ingénieur → ingenium → …), and its compass line contains **zero usable German** — pure loan history. A learner opening "Berufe III" wants to say what they do for a living; they get a shipping-history of five words. The tables are fine; the prose is the drift. Same pattern in 5292 (Muses → musica → mousikē), 5231, 5212, 5312.

**5. Sound and speech are nearly absent — in an audio method's descendant.** The guidebook is uncompromising: work with *sound*, never let spelling knowledge intrude; answer aloud. The app teaches shifts as letter pairs (D→T) in text exercises; `spoken_turn_reply` exists as a type but appears in exactly **3 lessons** (1301, 1901, 2401) — an orphan. Dictation (14 lessons) and browser speechSynthesis exist, so the machinery is there.

**6. The day-one personal win lives in a skippable branch.** *ich heiße / ich komme aus / ich wohne* — the single most motivating first-conversation toolkit — sits in branch 5071, skippable. A spine-only learner never says their own name. NORTH_STAR's own test ("want to do the next lesson") argues for putting this on the spine.

**7. Twist replay is split-quality.** 116 twists are verbatim re-assemblies of an exercise target ("without looking back — rebuild…"); 63 are true variations (every core 2–30: swap the article, change the person, front the adverb). The variation style is clearly better replay value and it's already written into all cores — sprigs and branches just never got it.

## Course-structure verdict

The 30-topic order is **defensible, and mostly structurally forced** — the two placements that look conventional are actually dependency-driven, which is exactly how the guidebook wants sequencing decided: negation at 12 because `kein` declines like `ein` (needs 11's article grid); case-carrying prepositions at 27 because motion/location needs the dative (20). Modals-before-conjugation (2 before 9) matches the guidebook's first-person-first doctrine. Post-capstone A2 branches keep the spine's promise honest. I would **not** reorder the spine — and per AGENT_PRECAUTIONS §3.1 you can't cheaply anyway.

The one structural question worth a deliberate decision: the A1 vocabulary expansion (branches 5120–5310, ~35 lessons) is currently pure recognition gyms with etymology-essay hooks. As *review decks* they're fine; as the app's answer to "can I actually use this week's German?", they're thin — none of them practice the structures the spine taught (ordering, cases) on the new nouns beyond one syntax_builder. The natural fix is sequence diversification (#3) plus one production closer themed to the branch (e.g. Berufe III already has the perfect key sentence: *Was sind Sie von Beruf?*).

## Data hygiene (small, concrete)

- **`5031.ts:90-110` — inverted matching fields**: first four pairs hold German in the `english` field. Works by symmetry, wrong in the data model.
- **Story exercise ids** use legacy `l53xx_*` instead of `l900x_*`; five dictation ids use letter suffixes (`l14_e4d`) while nine others don't.
- **Two punctuation conventions for graded German**: dictation keeps `?`/`!`, transcribe/syntax strip. Document one rule and pin it in a test.
- **14 transcribe exercises off the cue-band ladder** (mostly one cue too many, topics 17–30); the band exists in prose only.
- **Country names render as `das Österreich`, `das Polen`, `das Frankreich`** in branch tables (5281/5282/5291/5292). If this is a deliberate gender-flag convention, decide it consciously — as displayed German, article-less country names are standard (except die Schweiz/die Türkei), and this is learner-visible.
- `variants` field: 0 uses corpus-wide — remove it or start using it; `idea_parts` in only 23 lessons.
- Reading-check matching targets are joined blobs (`"Paul hat einen Hund., Max ist klein, …"`) — never graded, but raw.

---

# Recommendations (bold, prioritized)

## Tier 1 — mechanical, do this week
1. Fix `5031_e3` field inversion; normalize story/dictation ids; resolve the 14 cue-band drifts; pick and enforce one punctuation rule for graded targets.
2. **Rewrite the five worst branch hooks** (5291, 5292, 5231, 5212, 5312): hook-first = "you can use this at the job center / at breakfast *now*," one etymology line max, history demoted to `linguist_note`/footnotes where it's opt-in. Then decide whether a hook-length cap (~150 words) goes into `audit-wording.ts`.
3. Decide the country-article convention and either fix the tables or document it.

## Tier 2 — next content campaign (high yield, low risk)
4. **Author a `diagnosis` for every exercise a `trap_note` predicts** — the trap text literally names the wrong process; this is a mechanical batch over ~12 lessons plus the big grammar cores (18 auxiliary choice, 14 basement, 20 dative verbs, 12 kein/nicht). Then **author affirmations on the production closers of all 30 cores**. This takes §1.9 coverage from 4% to meaningful without touching the schema.
5. **Spread the variation-twist style** to sprigs/branches; ban pure verbatim replay when a one-word variation is possible.
6. **Give each lesson family 2–3 sequence templates**: rotate the branch-vocab 26× sequence; vary the story closers (9002/9003 could take dictation instead of the reading-check clone); break 2202/3002's monotony with one production item.
7. **Rewrite the literal_gloss rule**: the five "violators" (stories, 5061) are right on content and wrong per the letter. Change AGENT_PRECAUTIONS §7.2 to "wherever German's information order differs from English (not just word-order clusters), cap ~2 per lesson" — that preserves the anti-gimmick intent while matching how §0.3/§1.4 actually use direct translation as negative import.

## Tier 3 — product bets (your call; these are the ones I'd actually fight for)
8. **Pilot guess-first in the shift cores.** Before the pattern card reveals the law, one ungraded "predict aloud" prompt: English word shown, learner says their German guess, then the reveal makes the shift law the *payoff* of their own attempt instead of a lecture. This is the single highest-fidelity port of the guidebook's engine into a static app — and the twist infrastructure (ungraded, word-banked) is 80% of the plumbing. Five lessons (cores 3–7) is a cheap experiment; USER_TESTING.md exists, use it.
9. **Move the introductions onto the spine.** Weave *ich heiße / ich komme aus / ich wohne* into lesson 2's production ideas (or promote 5071 to a required story-style stop after topic 1). Day-one personal sentences are the cheapest motivation win available.
10. **Make sound-first real in the shift drills.** A `shift_select` variant where the learner *hears* the German (speechSynthesis, already in the product) and picks the English twin — at minimum in the five discrimination sprigs (302, 402, 502, 602, 702). Spelling-first shift teaching is the one place the app flatly contradicts the guidebook's sound doctrine.
11. **Decide `spoken_turn_reply`: build out or retire.** Natural home: the five spine stories ("answer Max's question aloud"). Three orphan uses is the worst of both worlds.

## Tier 4 — docs
12. **Add a one-table TM mapping** (TM-2/3/5/6 → guidebook section → schema field → audit rule) to `docs/ARCHITECTURE.md`, and re-point AGENT_PRECAUTIONS §7's "TM-2 limit 2" / "P7" citations at it. Right now the repo cites rule numbers that exist in `types.ts` comments only.

---

**Bottom line:** this course already does the hard part — the Germanic import doctrine, the reframes, and the weaving discipline are what a Language Transfer course writer would recognize as their method, and the mechanical quality bar (solvability, taught-before-use, teaser integrity) is enviable. The gap is that the app *tells* the method instead of *staging* it: no guess-first moment, correction feedback at 4%, one template everywhere, and speech almost absent. Tier 1–2 are a week of mechanical work; Tier 3's guess-first pilot is where Brücke stops being a beautifully engineered coursebook and starts being the Thinking Method in app form.



-------------------


I went through your `brucke-code` folder in Drive. I could fully open the docs — README, `courses.md`, `german-panorama.md`, `BRUCKE_DESCRIPTION.md`, `ARCHITECTURE.md`, `USER_TESTING.md`, and the compendium digest — but the actual lesson `.ts` files don't open as Docs, so I judged the lesson design from those docs plus the panorama mapping and the 1227-word compendium, not by reading every lesson line by line. I also skipped the `dont open untill mentioned` folder.

## How your course is built right now

German is the flagship, and it shows in the size:

| Course | Lessons | Words | Shape |
| --- | --- | --- | --- |
| German | 179 | 1227 | 30 cores + 79 sprigs + 65 branches + 5 stories |
| French | 123 | 306 | 30 cores + 72 sprigs + 15 branches |
| Spanish | 123 | 293 | Same shape as French |
| Dutch | 75 | 390 | 30 cores + 30 sprigs + 15 branches |

German lessons follow a fixed 5-part flow: Hook, Pattern, Transformation Table, Practice with exactly 5 graded exercises, Summary, plus an ungraded Twist card at the end. There are 13 exercise types, 6 star gates after topics 7, 10, 16, 20, 26, and 29, and a Review Hub with SM-2 scheduling, 10 deck types, and 4 review styles.

The core idea is clear and genuinely different: English and German share an ancestor, German went through the High German consonant shift, English didn't, so you teach learners to decode cognates instead of memorizing from zero. Wasser/water, Hand/glove type connections are the hook.

## What is genuinely strong

- **The bridge is a real learning advantage, not a gimmick.** Teaching th to d, p to pf/f, t to z/ss as a system is smarter than teaching 1227 words as isolated flashcards.
- **The Panorama is honest.** Your `german-panorama.md` maps every structure to the lesson that teaches it, and marks passive as inferred / out of scope instead of pretending it is covered. That taught vs inferred column is rare and it builds trust.
- **You have anti-spoiler and anti-guessing design.** Gender hidden behind [ der / die / das ? ], matching columns shifted so pairs never align, retry queue that must drain before Summary unlocks, and an "I guessed" flag that re-grades as Hard. That is thoughtful.
- **Recurrence floor.** Every taught word gets assessed retrieval in at least 2 distinct lessons. Most apps claim spaced repetition, you actually audited it.
- **Review is well specified.** SM-2, bury vs suspend, Relearn after 5 lapses instead of an infinite fail loop, and a separate failed-sentence queue that doesn't touch stars or mastery. That separation is correct.

## Where it will lose learners

**1. The course is organized by linguistics, not by what a learner needs to say.**
Topics follow shift families and grammar structures. A new learner does not wake up wanting Topic 4 th to d. They want to introduce themselves, order food, ask for directions, understand a train announcement. Right now survival language is buried inside shift lessons. If the first 7 topics feel like a linguistics course, a lot of people will quit before the Grammar Gate.

**2. 179 lessons plus 6 hard gates will feel like a grind.**
A closed gate hard-locks the spine. Stars are earned only inside that stretch, plus a checkpoint test. That is motivating for completists, punishing for someone who just wants to get to Topic 12 because they need past tense for a trip. And the purple star for a flawless first try rewards not making mistakes, which is the opposite of how language learning works.

**3. Some English hooks will confuse more than they help.**
The compendium is strong on everyday words, but a chunk of the hooks use rare English: Darm glossed as gut / tharm, Pferd as horse / palfrey, Tharm, palfrey, stead, tharm, bleak for Blitz. If a learner does not know the obscure English twin, the bridge collapses. For non-native English speakers this is even riskier, because the whole method assumes a big English vocabulary.

**4. Gender is taught, but not in sentences.**
You teach der/die/das as a system, and the article drill is MCQ only and explicitly does not practise cases or articles in sentence context. Learners will pass the drill and still freeze on "Ich sehe ___ Mann" in real speech. The Panorama says accusative, dative, two-way prepositions are taught, but the review drill does not reinforce them in context.

**5. No real speaking or conversation loop.**
Pronunciation is system TTS, dictation has capped replays, speaking is optional browser recognition with lenient feedback that never gates completion. That is honest, but it means there is no shadowing, no minimal-pair work for ä/ö/ü, ch, r, no dialogue production. The 5 stories are required, but 5 stories across 179 lessons is too few for reading fluency.

**6. Too much choice in Review.**
10 decks plus 4 styles is a lot for a beginner. Your docs say beginner actions come first and advanced options are tucked away, but a learner who opens Review and sees shift family, domain, weakest words, compounds and traps, sentence patterns, article and gender, everything will still stall.

## Suggestions to improve

### Course structure

- **Add a survival spine on top of the shift spine.** Keep the 30 topics, but label the first 10 lessons as a "First 7 days in Germany" track: hello, please/thanks, numbers, ordering, directions, tickets, apartment. Teach the shift inside those phrases, not before them. Example: teach Wasser, Brot, Kaffee in a cafe dialogue first, then show t to z/ss as the pattern behind it.
- **Soften the gates.** Keep 3 gates instead of 6, or make a failed checkpoint open a short teaching reteach instead of just locking. Show learners exactly which 2 to 3 lessons will unlock the gate, not just a star count.
- **Add CEFR-style can-do labels.** Right now there is no A1/A2 mapping, and placement is a 10-question check that recommends a topic but is not validated. Add a simple label per stretch: "After Topic 10 you can..." That helps learners who are learning for an exam or a visa.
- **Cut the purple star pressure.** Keep gold for completion, make purple a nice bonus that is hidden until the end, not something learners chase by avoiding hard lessons.

### Deutsch lessons

- **Make the Hook 1 usable sentence, not 1 etymology lecture.** Best pattern: Hook shows "Ich habe Hunger" and gets the learner to say it. Pattern then explains why Hunger looks familiar. Transformation Table then shows the family. If the Hook starts with history, learners will skip it.
- **Order practice from recognition to production.** First exercise should be recognition, last exercise should be production without tiles or banks. Right now the docs say 5 exercises of at least 3 types, but they do not enforce that progression. Add it as a rule: Exercise 1 recognize, Exercise 5 produce cold.
- **Give the Transformation Table audio on every cell.** Learners need to hear Wasser, Brot, Buch, not just see the letters. If TTS is the only voice, add a slow and normal toggle.
- **Use the Twist card for culture and real use.** It is currently ungraded and skippable, so most people will skip the most memorable part. Make it a 30-second real-life task: "Ask for water in a cafe" or "Read this sign" instead of just a fun fact.

### Words and hooks

- **Audit every hook for transparency.** Keep a hook only if the English word is common, the sound change is regular, and the meaning is the same. Drop or demote hooks like tharm, palfrey, stead. Teach those German words plainly with a picture or sentence instead of forcing a bridge.
- **Order early vocab by frequency, not by shift.** You already have frequencyRank for tie-breaking in review. Use it to order Topic 1 to 7. High-frequency words like haben, sein, werden, machen, gehen should come early even if their shift is messy.
- **Add sentence-context article practice.** Keep the MCQ article drill, but add a second mode: fill the article in a short sentence with case cues. "Ich sehe ___ Hund" teaches accusative in a way isolated "___ Hund" never will.
- **Add minimal-pair pronunciation drills.** Especially for ä/ö/ü, ch in ich vs ach, and final devoicing. A 2-minute drill per shift family would fix the biggest listening problem.

### Review and retention

- **Default to one deck.** For the first 2 weeks, Review should default to Due Today, with one button: Review learned words. Hide the other 8 decks until Topic 10. Choice is good for advanced learners, paralysis is bad for beginners.
- **Add a next-day unaided recall check.** Your USER_TESTING doc already asks for this: after a lesson, ask learners to write the German sentence without tiles, then again the next day. Build that as a 1-minute check inside the app, not just a test script. That is the metric that predicts retention.
- **Make adaptive difficulty a real roadmap item, not just a deferred idea.** Docs say there is no adaptive difficulty and exercise order is fixed. You do not need full AI adaptivity, but you can do simple branching: if a learner fails a shift twice, show one extra guided example before the retry.

### Product

- **Run the 5-person test in your USER_TESTING doc before you add more features.** No analytics, no accounts, just watch 5 beginners do Lesson 1, find Review, and come back the next day. Your doc already says not to turn one tester's preference into a rule, look for breakdowns across at least 3 people. That is the right call. Do it now, before you build more decks or themes.
- **Fix the duplication risk.** German is parsed from `word_connections.md`, siblings are typed TS, and Panorama, courses.md, and README all restate counts and structures. Docs say code is the authority, but learners will read the docs. Keep one source for lesson order and let docs link to it.

## If I had to fix 3 things first

1. **Reframe Topics 1 to 7 as survival first, shift second.** Same content, different order and framing. This is the highest leverage change for retention.
2. **Rewrite the Hook and last exercise of every core lesson.** Hook equals 1 usable sentence. Last exercise equals cold production. That alone will make the course feel like learning German, not studying about German.
3. **Audit the compendium hooks and add sentence-context article practice.** Prune obscure English twins, keep the bridges that are actually helpful.

Overall verdict: the concept is stronger than most language apps because the system is real and you have been honest about what is taught vs inferred. The risk is not the idea, it is that the structure teaches linguistics before it teaches communication, and the grind of 179 lessons plus gates will filter out everyone except the most motivated.

Want me to rewrite Topic 1 / Lesson 1 using the survival-first Hook plus cold-production last exercise, so you can see what that version would look like?


-----------------


Second pass, and this time I read the stuff I skipped last time: your own backlog in `ideas to add in future/open-ideas.md`, the cognitive-load spec, the native-speaker audit spec, `NORTH_STAR.md`, `AGENT_PRECAUTIONS.md`, `content-agent-prompt.md`, `grammar-gap-placement.md`, and `SENTENCE_REVIEW.md`. I still did not open `dont open untill mentioned/` — your `AGENTS.md` says it stays excluded unless you name it.

A lot of what follows is already in your docs as "known, not shipped." That is the pattern: the diagnosis is good, the fix is deferred.

## What your own backlog already admits

These are not my guesses, they are your open ideas:

**Early lessons are overloaded.** The first eight cores still carry 9 to 14 `word_ids` and 16 to 18 table ids. An earlier review proposed 5 to 6 new words per early lesson. That has not been cut yet, and it is listed as "test with real beginners before cutting." For a beginner, 14 new words plus a table of 18 plus 5 exercises in one sitting is not a lesson, it is a cram session.

**There is no recall opener.** Lessons open on a new concept. There is no recall field or convention that starts a lesson by bridging back to earlier material. Some hooks do it ad hoc. That is a strange gap for an app built on SRS. The lesson itself should do spaced retrieval, not just the Review Hub.

**No payoff arcs for hard words.** Foreshadow/payoff exists generically, but hard words like `vergessen` and `tief` have no typed multi-lesson arc. They just reappear. A learner who keeps failing `vergessen` does not get a story that makes it stick, they get another flashcard.

**No external syllabus audit.** No mapping against a CEFR / Goethe checklist, or against `Language Transfer`, `Nicos Weg`, or `Menschen` for mechanism coverage and difficulty ramp. You say to use them as an audit, never to copy word lists. That audit still has not happened, so you do not actually know if a learner who finishes Topic 20 is missing something a Goethe A1 learner would know cold.

**Small nits that signal bigger sequencing debt.** Lesson 2's `t_to_s_ss_z` shift tag is still off. Plurals sit at Topic 23, moving them earlier was proposed and not done. GH to CH and Y to G still share a topic though V to B got its own. None of these is fatal alone, together they mean the spine is hard to fix because of your own rule: never renumber or insert before Topic 30.

## Du vs Sie is not mapped

Your Panorama does not list as taught: du vs Sie, formal vs informal pragmatics, and how to actually address people. For real life in Germany, that matters more than another shift family. If it is taught, it is not mapped. If it is not taught, add it early, in Topic 2 or 3, with real dialogues, not as a footnote.

## Cognitive load is fixed, not adaptive

Your `cognitive-load-adaptivity.md` describes a tension-contour engine that was specified but never built. Lessons keep a fixed e1 to e5 load shape for every learner.

The signals already exist in the app: consecutive first-try successes, cue-ladder reveals, retry-queue depth, "I guessed" flags. Time to first keystroke does not exist yet.

The proposed engine is small and well-guarded: if queued is 2 or more or cues used is 3 or more, next production exercise becomes a recognition-only trough, ungraded for the star. If clean streak is 3 or more, add friction with extra distractors and drop one cue. If guesses are 2 or more, fire a trough once. At most one friction move per lesson. Friction never changes grading, troughs never gate.

Without this, a struggling learner gets the same hard next exercise as a bored learner. The retry queue helps, but it is reactive. The contour engine is proactive.

**Fix:** Ship the within-lesson version only, no cross-lesson reordering. That respects your "never renumber" rule. Measure time to first keystroke as the one new signal. That alone will tell you who is stuck vs who is on autopilot.

## Review is smarter on paper than in practice

**Sentence review variation is too narrow.** `SENTENCE_REVIEW.md` says the conservative variation can do person, present/past, negation, and dass fragments for short copular clauses, object swaps among known drink nouns, and fronting a final time adverb. Everything else retains the original answer with a reshuffled surface. That means most sentence replays are memorization of the exact same sentence, not transfer. A learner can pass the replay by remembering the sentence, not by understanding the pattern.

**Fix:** Author 2 to 3 real variants for the 30 highest-failure sentence exercises, instead of relying on generated variation. Track which variants fail again. If the same learner fails all variants of one structure, that structure needs a reteach lesson, not another replay.

**Review appears only when cards exist.** The sentence-review section appears only when cards exist. That is clean, but it means a new learner never learns it exists until they fail. Add a one-line preview in the lesson summary: "If you miss a sentence here, it will come back in Review." That teaches the system before it is needed.

**Words taught in prose only.** Your settled list in `open-ideas.md` admits some `word_ids` are taught in prose with no exercise line, like `hundert` / `minute` at 5122, `zeit` / `morgen` / `garten` at 5132, `bad` at 5212. The note says removing them would breach the taught-word floor, and adding exercise pairs would breach the 12-pair matching cap. So they stay. But "taught in prose" is not taught. If a word has no assessed retrieval, do not count it toward the 2-lesson floor. Either give it a real exercise or move it to Atlas-only vocabulary.

**26 lessons with no new word.** 26 of 179 lessons introduce no new word, 14.5 percent. You say revision lessons intentionally consolidate and stay inside a 25 percent bound. That is defensible, but a learner does not see the bound, they see three lessons in a row with no new word and feel stalled. Label those lessons explicitly in the UI as "Consolidation: no new words, just fluency" so the lack of novelty feels intentional, not like a bug.

## Product and tech debt that will slow you down

**Local-first is fragile for a 179-lesson course.** Progress is localStorage plus a cookie fallback that only writes if the payload URL-encodes to 2,048 bytes or less. Otherwise only preferences are written. Backup is manual JSON export/import, with a reminder after progress exists and weekly after that. There are no accounts, no cloud recovery, no cross-device sync.

That is a principled privacy choice, but it is a motivation risk: one browser-data clear, one new phone, one shared computer, and months of stars and SRS intervals are gone. The `open-ideas.md` lists optional accounts and cross-device recovery as deferred evaluation only. You do not need full accounts. You need a less fragile story: auto-download a dated backup after every 10 completed lessons, not just a reminder, and show a visible "Last backup: 12 days ago" chip in Settings. Make the backup file name include the language and date so learners can find it later.

**You are flying blind on drop-off.** No analytics, no telemetry, by design. The deferred idea is opt-in, minimal, anonymous aggregate measurements: lessons started/finished, retry depth, time to first keystroke, point where learner stops. No third-party SDKs, no user/device/session identifiers. Right now you cannot answer the most important product question: where do real beginners quit? The 5-person `USER_TESTING.md` protocol is good, but 5 people is not a funnel. Ship the opt-in aggregate counters, even if it is just local counts the learner can export. Otherwise every improvement is a guess.

**Settings and appearance are a second app.** 187 themes, 43 fonts, plus 6 settings sections with stop-on-error, confidence mode, lazy mode, capitalization tolerance, caps-lock warning, German character bar, master volume, click packs, error cues, increased-contrast toggle, key tips, mastered/total badge, and danger zone. The docs proudly say WCAG contrast is enforced across all themes. That is impressive engineering, but it is not learning. A beginner does not need 187 themes. They need one readable default and a dark/light toggle. Keep the full collections, but hide them behind "Advanced appearance" and stop testing every theme on every change. Your maintenance cost here is stealing time from content.

**Mobile is second-class.** Keyboard-first ergonomics are excellent on desktop: 1 to 4, Space, Enter, Backspace, R for replay, Esc. On mobile at 390 by 844, those shortcuts do not exist. Tile builder typing, syntax builder banks, and family matrices are fiddly on a small screen. Your own test kit says to repeat tasks 1 to 3 on mobile, but the app is designed desktop-first. If most learners will be on phones, add a mobile-specific pass: larger tap targets for tiles, a sticky "Check" button that never scrolls off, and a swipe alternative for card grading.

**History and Back are non-standard.** Lessons and atlas details replace the current history entry with a query URL instead of pushing a new entry. Browser Back follows actual tab history. Transient dialogs retain a touch-only Back sentinel. That is clever, but it will confuse learners who expect Back to close a lesson. Add an explicit, always-visible Close button that does what Back should do, and do not rely on Back as the primary exit.

**Docs and count sync are a tax on every edit.** Two near-duplicate READMEs, both pinned by `docs-sync.test.ts`. Counts pinned in `word-counts.ts`, `TOTAL_COMPENDIUM_WORDS` in `types.ts`, headers in `word_connections.md` at 357 KB, plus `TRAIL.md` generated, plus teaser audits, wording audits, vocab-balance audits. Your `AGENTS.md` warns: if a doc quotes a stale figure, that is the bug. That is correct, but it means adding 5 words requires updating 5 places. That friction will make you avoid small improvements. Consolidate to one README, generate the counts table from code at build time instead of hand-maintaining it, and let the test check the generated table, not prose.

**AI prose garbage.** `AGENT_PRECAUTIONS.md` section 5.6 calls this out: re-read generated prose for self-correcting garbage like "...wait — ...", "...? no — ...", half-deleted alternatives, fragments mid-explanation. Several passages had to be repaired post-hoc. That is still a risk because it passes all tests. Add a simple lint for those patterns: "wait —", "? no", double alternatives, unfinished sentences. Do not ship a lesson that contains them.

**Fragile ids.** Word ids are derived from the German cell, with sense tags like `essen#noun`. A row with the article inside the cell once produced `das gift` and broke every reference. Duplicate exercise ids were a live bug: sprig 202's e5 shipped as `l2_e5`. These are not learner-facing today, but they are landmines. Keep the existing checks, and add a pre-commit check for duplicate exercise ids across all lesson modules, not just within one file.

**Atlas constellation may be decoration.** The radial spoke visualization is beautiful, but your own docs say every family also exposes a semantic table with the same drill, keyboard focus, and reduced-motion support. Have you checked which one learners actually use? If 90 percent use the table, the constellation is costing build complexity and first-load attention for little learning. Keep it, but measure clicks on constellation vs table before you invest more in it.

**No reader, no free writing, no real listening.** You have 5 required stories, a `Readlang`-style reader is listed as an idea, not built. Dictation is the only listening type, with capped replays and TTS at 0.92x. There is no dialogue listening at natural speed, no varied speakers, no free writing or journaling. Transcribe and literal gloss are good for sentence production, but they are still closed exercises. Add one open task per topic: "Write 3 sentences about your day using today's pattern" with a self-check checklist, not grading. That is the bridge from exercises to real use.

## What I would fix next from this pass

Not repeating last pass. From this pass alone:

1. **Add a recall opener and cut early cores to 5 to 6 new words.** Start every lesson with 1 minute of retrieval from 2 lessons ago, then teach the new pattern. That plus the lighter load will do more for retention than another deck type.

Want me to draft the recall-opener template for a core lesson?

-------


Checked the whole `brucke-code` folder — this is way more than a side project. It's a full language-learning app.

### What it is

**Brücke** — learn German through English cognates, using the Second High German Consonant Shift as the memory hook instead of rote memorisation.

- **Stack:** Next.js 16.4.1 + React 19.2 + Tailwind v4 + Zustand 5 + Bun, Vitest 5, 100% static pre-rendered routes
- **German:** 1,227 words, 179 lessons (30 cores + 79 sprigs + 65 branches + 5 stories), 9 shift families, 6 star gates
- **Siblings reusing the same engine:** French (123 lessons / 306 words), Spanish (123 / 293), Dutch (75 / 390)
- **Core loops:** Trail map, Sound Shift Atlas, Grammar Panorama, SM-2 Review Hub with 10 deck types + 4 review styles, 13 exercise types
- **Local-first:** No accounts, no backend, no cloud TTS — progress in localStorage + JSON backup, pronunciation via `speechSynthesis`, click sounds via bundled .wav packs

I read `README.md`, `ARCHITECTURE.md`, `courses.md`, `AGENTS.md`, `DEPLOYMENT.md`, `USER_TESTING.md`, `german-panorama.md`, and `open-ideas.md`, plus the structure of `src/`, `scripts/`, `tests/`, `public/`, `docs/` and `wiki/`. I deliberately didn't open `docs/dont open untill mentioned/` — your own `AGENTS.md` says not to unless you ask.

### What's genuinely strong

- **Thesis is crystal clear.** "English and German share an ancestor, German shifted its consonants" is a teachable idea, not just content. Same for French (Norman doublets), Spanish (Latin stems), Dutch (the unshifted twin). That makes the 4 languages feel like one product, not 4 apps.
- **Honesty in the docs.** `german-panorama.md` marks passive as `inferred / out of scope` instead of pretending it's taught. `open-ideas.md` has a "Settled — do not re-litigate" section. That's rare and it will save you from endless rewrites.
- **Docs are test-pinned.** `docs-sync.test.ts` fails if README counts drift from code. Painful, but it's the reason your docs actually match the app.
- **No bloat on purpose.** No Radix / Framer / component library, no cloud TTS, no analytics. Custom DOM+SVG trail map, 187 themes all WCAG-checked, 43 fonts lazy-loaded.
- **Safety thinking is real.** 200-char cap on grading input to avoid quadratic diff lockups, `__proto__` stripping on backup import, ≤2048-byte cookie fallback, 15-min listening pause as an absolute timestamp not a timer.
- **Testing is not an afterthought.** Store persistence, boot hydration, review lifecycle, guess-and-undo, languages, assets-and-routes — plus Playwright e2e for smoke, learning flow, local-first, product-quality.

### What needs fixing

**1. The Drive copy is duplicated — this is the biggest mess right now**
Almost every file exists twice: the real file + a `.txt` copy.

`package.json` (1,549 bytes) + `package.json.txt` (1,450 bytes), `layout.tsx` + `layout.tsx.txt`, `README.md` + `README.md.txt`, `word_connections.md` (357KB) + `word_connections.md.txt`, `compendium.json.txt` (751KB), etc.

They're not identical sizes, so they've already diverged. Which one is source of truth? If you edit the `.txt` in Drive, your real repo won't see it, and vice versa. Drive is not git — it can't show you a diff.

Fix: Treat GitHub as the only source of truth. Delete the `.txt` duplicates from Drive, or if you need Drive as a readable backup, keep *one* export and never edit it there.

**2. Docs duplication**
`README.md` and `docs/README.md` are near-duplicates, and you have both `muse-suggesions.md` (54KB) + `.muse-suggesions-archive.md` (59KB) in `docs/`. Your own `AGENTS.md` already warns about this. Pick one canonical README, make the other a pointer.

Same in `wiki/`: `_index.md` + `_index.md.txt`, plus `.obsidian` and `.wiki` folders that don't belong in a shipped repo view.

**3. Early lessons are still heavy**
Your own backlog admits it: first 8 cores carry 9-14 `word_ids` and 16-18 table ids, when an earlier review proposed 5-6 new words per early lesson. And there's no systematic recall opener — lessons start on a new concept instead of bridging back.

Don't cut blindly. Run the 5-person test in `USER_TESTING.md` first — time to first lesson, where they get stuck, what they can produce *without tiles* the next day. That will tell you if it's actually too heavy or just feels heavy to you.

**4. Local-first is great until someone loses their phone**
No accounts = no sync, no recovery. Your backup reminder helps, but most users will ignore it until it's too late. The reminder after progress exists + weekly is good, but make export dead-obvious after first lesson completion, not just in Settings > Danger Zone.

### Suggestions, in priority order

**P0 — Clean up**
- Delete `.txt` duplicates, fix the typo folder name `dont open untill mentioned` → `until` (it shows up in docs and looks unfinished)
- Add a CI check or a script that fails if a `*.txt` duplicate of a source file appears again
- Decide: `docs/README.md` is canonical, root `README.md` is just quick-start pointer — you already say this in README, now enforce it

**P1 — Prove it with beginners**
- Do those 5 unaided tests before any content cut. Specifically watch: do they notice which language they're in when they open a shared lesson URL? Do they find Review without hunting? Do they understand the 3-bypass rule for skipped lessons?
- Add the opt-in, anonymous measurement idea from `open-ideas.md` — lessons started/finished, retry depth, time to first keystroke. No SDKs, no IDs. You currently have zero signal on where people actually drop off.

**P2 — Lighten the start, don't rewrite the course**
- Test a 5-6 word version of Lesson 1-2 as an A/B, not a rewrite of all 8 cores
- Add a 1-field recall opener: "Last time you learned X — type it" before the new hook. It fits your "weave" principle and costs almost no new content.
- Keep the systematic CEFR / Goethe audit as a *checklist* audit, not a re-organisation. Your organising principle (shifts > CEFR order) is the differentiator — don't flatten it to match a textbook.

**P3 — Polish the product edges**
- TTS is your weakest dependency. `speechSynthesis` voices vary wildly by device, especially for Dutch/French. Keep the one-time install guide, but also add a "voice sounds wrong? try this" fallback in the lesson itself, not just settings.
- 187 themes + 43 fonts is choice overload for a beginner. Curated 12 + 6 is right — hide "Show all" behind one more tap after onboarding, not during it.
- Make the backup story part of the happy path: after first star, show "Want a backup file? Takes 2 seconds" — once, dismissible.

**P4 — Decide what Brücke is *not***
Your backlog is honest about this: no adaptive difficulty, no reader integration, no Norwegian yet, no accounts. Don't add all of them. If I had to pick one next big bet, it'd be the Readlang-style reader — real German text with tap-to-translate feeding Review. It turns Brücke from "course you finish" into "tool you keep using."

Overall: the architecture and pedagogy are unusually disciplined for a solo project. The main risk isn't code quality — it's that Drive duplication + docs duplication will make you edit the wrong copy, and that you’ll keep polishing content before you’ve watched 5 real beginners get lost.

Want me to turn the P0 cleanup into a checklist you can run through, or draft the lighter Lesson 1 test version to compare against the current one?

------------

Second pass — this time I went past the main docs into the guardrails, the ideas backlog, the scripts README, the store/components/data layout, and the wiki/CI stuff. I still didn't open `dont open untill mentioned/` — your `AGENTS.md` still says not to.

One honest limit: Drive lets me read the `.md` files fully, but not the `.ts/.tsx` files directly. So the code feedback below is from structure, sizes, and what the docs *say* the code does, not a line-by-line code review.

Here are the things I missed last time:

### 1. You have a docs problem, not just a duplication problem

Last time I flagged the `.txt` duplicates. This time the bigger issue is the *guardrail* docs:

- `AGENT_PRECAUTIONS.md` — 24.5KB
- `content-agent-prompt.md` — 19.3KB
- `AUDIT_MANIFEST.md` — 18.6KB
- `scripts/README.md` — 12.5KB
- `NORTH_STAR.md` — 2.9KB

That's ~78KB of prose just to stop an agent (or you) from breaking the app. If you need 78KB to not break it, the app is too fragile. The docs are doing the job tests should do.

And they're starting to contradict each other:

- **Adaptive vs fixed:** `ARCHITECTURE.md` says "No adaptive difficulty — exercise order is fixed." `ideas/cognitive-load-adaptivity.md` proposes an adaptive friction / trough engine that changes the next exercise based on streak, cues, guesses, latency. Both can't be true. Pick one, delete or update the other.
- **Sentence review:** `SENTENCE_REVIEW.md` says "Status: shipped." `ideas/sentence-level-srs-review.md` says "Status: partly shipped. What follows is the part that is not built." One of those is stale. Merge and delete the old one.
- **Stale suggestions:** `muse-suggesions.md` (54KB, and yes the filename typo is `suggesions`) + `.muse-suggesions-archive.md` (59KB) = 113KB of AI suggestions with no accept / reject / why. That's a second backlog. Triage it once: keep 10, reject the rest with one line each, delete the archive.

Quick win: delete `content-agent-prompt.md` as a separate doc. It's 80% duplicate of `AGENT_PRECAUTIONS.md`. Keep one canonical guardrail file, link it from `INDEX.md`, and move any real rule that isn't in a test *into* a test.

### 2. The content pipeline has two systems, and you pay for both

- German: `word_connections.md` → `parse-compendium.ts` → `compendium.json` (751KB) → `export-client-data.ts` → `public/data/de/`
- French / Spanish / Dutch: typed TS modules in `src/data/<lang>/` → same exporter

Every audit now needs two implementations: German audits (`audit-word-refs`, `audit-vocab-balance`, `audit-wording`, `audit-teasers`, `audit-recurrence`) + sibling `*-content.test.ts` suites. Every new language repeats that work.

It works, but it's the reason adding a 5th language (Norwegian is in `open-ideas.md`) feels heavy. Long-term, you want one validator that runs over a *unified* lesson shape, even if the sources stay different. Short-term, at least document: "If you add a rule for German, you must add the equivalent for siblings here."

Same split shows up in sizes: `curriculum.ts` is 54KB, `compendium-fr.ts` is 144KB, `compendium.json` is 751KB. Those are not "files," they're databases in code. That's fine for SSG, but editing them by hand is error-prone — which is why you needed the 24KB precautions file.

### 3. Your store is doing too much, and the tests prove it

From folder sizes:

- `src/lib/store/schema.ts` — 24KB
- `backup-slice.ts` — 14.5KB
- `hydration-slice.ts` — 10KB
- `store-persistence.test.ts` — 25KB, `store-boot-hydration.test.ts` — 17KB

A 25KB test for persistence means persistence is complicated: localStorage + ≤2048-byte cookie fallback + field-by-field merge + BroadcastChannel cross-tab + versioned reset merging + sentence cards + per-language slices.

That complexity is *correct* for local-first, but it's also where bugs will live. Two concrete improvements:

- **Property-based / fuzz test for merge:** instead of more hand-written merge cases, generate random old + new snapshots and assert merge never loses a field, never borrows another language's cards, never crashes on `__proto__`. You already have `store-security.test.ts` — extend it.
- **Corruption test:** what happens if `localStorage` has truncated JSON, or a backup from 2 versions ago, or a cookie over 2048 bytes? `USER_TESTING.md` doesn't cover it, and E2E doesn't either. Add one E2E: corrupt storage → app recovers to a clean state with a "we couldn't restore, here's your backup" message, not a white screen.

Also: `AGENT_PRECAUTIONS.md` says "do not touch `src/lib/store.ts`, `src/lib/trail-map.ts`, `src/components/**`". That makes you the single point of failure. If only you can fix rendering bugs, document *why* they're frozen (e.g. "trail-map layout is covered by 3 width tests, change it here") instead of a blanket ban.

### 4. The learner sees 4 overlapping economies

This is the product issue I missed last time:

- **Stars:** gold vs purple (flawless first-try), 6 gates with star quotas
- **SRS:** SM-2 with Due / Learned / Weakest / Relearn, Bury / Suspend
- **Retry queue:** missed items replay at end of lesson, must drain before Summary
- **Sentence cards:** failed processes replay up to 15 per session, no stars, no mastery

Each one is well-designed alone. Together, a beginner asks: "Did I pass? What do I do next?" The answer is in 4 places.

Fix isn't to delete systems — it's to make one surface the answer. The next-lesson bar already tries to do this. Audit it: does it ever say "You have 3 due cards + 1 failed sentence + you're 2 stars from the gate — do this one thing next"? If not, that's the unification to build. And per your own `NORTH_STAR.md` test, label it: this is *clarity*, so it's worth doing. Etymology polish is not.

Same for onboarding: placement (10 questions) + goals + daily minutes + language picker + theme/font pickers before first German word is a lot. Goal: first lesson in <60 seconds. Defer theme/font/placement to *after* Lesson 1, when the learner already has a win.

### 5. Run the AI prose-leakage grep sweep now

`AGENT_PRECAUTIONS.md` §5.6 warns about AI prose leakage — "...wait — ...", "...? no — ...", half-deleted alternatives. That means it happened. Run a grep sweep for `wait —`, `no —`, `...?` across all `src/data/lessons/` now, before you author more.

### 6. Assets: you're shipping dead weight

From `scripts/README.md` inventory:

- All `public/` — 711 files, 16,938,345 bytes
- `sounds/` — 155 files, 5,374,430 bytes
- `webfonts/` — 42 files, 4,417,824 bytes
- `data/` — 509 files, 7,047,086 bytes

Two specifics:

- **Iosevka is 1,494,892 bytes and is not a default font.** Why is it in `public/` at all? If it's only for preview, load it on demand, don't ship it in the build.
- **Sounds:** "No unused packs were deleted." That means you're shipping packs nobody selected. Audit which packs are actually selected in the wild (or just keep 3 + off, delete the rest, re-add on request).

Also: `TRAIL.md` is 221KB generated. It's in the repo and in Drive, and it pollutes search. It should be generated, not browsed. Either gitignore it or move it out of the main docs search path.

### 7. Repo hygiene you can fix in an hour

- **Wiki / Obsidian leakage:** `wiki/.wiki/cache/`, `wiki/.wiki/obsidian/`, `wiki/.obsidian/plugins/`, `community-plugins.json` (43 bytes) — these are editor artifacts, not content. They belong in `.gitignore`. Same for `.fractal/`, `.zcode/` that `INDEX.md` already lists as local-only.
- **Typos in names that break search:** `dont open untill mentioned` (should be `until`), `muse-suggesions` (should be `suggestions`). Small, but you search by filename constantly.
- **No LICENSE / CHANGELOG visible:** I didn't see a `LICENSE` in the Drive listing. If this is meant to be shared / open, add one. If it's private, say so in README. And add a tiny `CHANGELOG.md` — "what changed for learners" — otherwise you have no release story.
- **Demo script papercut:** `capture-demo-images.ts` hardcodes a deployed URL + machine-specific Chromium path, per `scripts/README.md`. Make those env vars (`DEMO_BASE_URL` already exists, `CHROMIUM_PATH` too) so a fresh clone can run it.

### 8. Mobile + accessibility: keyboard-first is not mobile-first

Your keyboard ergonomics are excellent on desktop: `1-4`, `Space`, `Enter`, `Backspace`, `[R]`, `Esc`, `Tab → Enter` to start.

Language apps live on phones. `mobile.spec.ts` covers 390×844, but check these specifically:

- **Trail map on touch:** serpentine SVG + content-visibility windowing — does pinch / scroll / tap on a node work without accidental activation? Is the next-lesson bar thumb-reachable?
- **Atlas constellation:** radial spoke viz is visual. You have a table alternative — is it *equal* (same drill, same words) or a degraded fallback? Screen-reader order for the trail should be trail order, not DOM order.
- **Dictation + TTS on mobile:** iOS Safari `speechSynthesis` voices are different from desktop Chrome. Your missing-voice guide helps, but test Lesson 1 on iOS + Android with no German voice installed.

### What I'd do next, in order

**Quick wins (today):**
1. Delete the stale `sentence-level-srs-review.md`, decide adaptive vs fixed and update one doc
2. Triage `muse-suggesions.md` — keep 10, delete the rest
3. Grep for AI prose leakage (`wait —`, `no —`) across lessons
4. Gitignore `wiki/.wiki/`, `wiki/.obsidian/`, `.fractal/`, `.zcode/`, `TRAIL.md` if it's purely generated

**Medium (this week):**
5. Onboarding: first lesson in <60s, defer theme/font/placement
6. Audit `public/` — remove Iosevka + unused sound packs, re-run `audit:assets`

**Hard (decide, don't just build):**
7. Unify the "what's next" surface across stars / SRS / retry / sentence cards
8. One validator for German + siblings, so a new language doesn't mean a new audit suite

Want me to draft the triage for the `muse-suggesions` file — accept / reject with one-line reasons?

---------------


Third pass — and this one found the stuff the first two missed because it's *not* in the German course. It's in the deployment, the testing kit, and one file in your root that is actively misleading every AI agent that opens it.

### 1. `CLAUDE.md` is a trap — fix it today

I read it. It's 3.4KB of wrong instructions:

- It tells an agent to use `Bun.serve()`, `bun:sqlite`, `Bun.file`, HTML imports with `Bun.serve()` — none of that is how this app works. This is a Next.js 16 App Router app.
- It tells an agent to use `bun:test` — you use Vitest (`bun run test` = `vitest run`).
- It includes a `<!-- BEGIN:nextjs-agent-rules -->` block that says "This is NOT the Next.js you know" and to read docs in `node_modules/next/dist/docs/` — that block is auto-generated by `next dev` and should never be committed as guidance.
- It only says "Read `docs/NORTH_STAR.md` first" and then contradicts it with generic Bun advice.

Any new agent (or you, in a new session) that opens `CLAUDE.md` first will do the wrong thing. Delete it and replace it with 5 lines:

> Read `NORTH_STAR.md`, then `AGENTS.md`, then `docs/INDEX.md`. Use `bun run test` (Vitest), `bun run build` (Next.js). Don't touch `src/lib/trail-map.ts` / `store` / `components` without a learner-facing bug.

That's a *blocks the learner* fix, because a misled agent ships wrong German.

### 3. Monkeytype leftovers: 187 themes, 43 fonts, 25 click packs

`ARCHITECTURE.md` is honest: 187 themes, 43 fonts, click sounds. All of that is Monkeytype inspiration. Ask the North Star test for each:

- **187 themes:** Does a 187th theme help a learner remember German? No. You pay for it in WCAG contrast tests, `ThemeBrowser.tsx` (7.6KB), `ThemeSelectorModal` + `ThemeDropdownPanel` + `FontSelectorModal` (another ~14KB), and maintenance. Keep 12 curated + maybe 8 more. Delete the rest.
- **43 fonts:** Same. German needs: a clear sans for lessons, a serif for reading stories, a mono for typing. That's 3, not 43. Keep 8 max.
- **Click packs:** I found `click2`, `click3`, `click4`, `click6`, `click15`, `click16`, `click22`, `click23`, `click24`, `click25` — at least 10 packs in `public/sounds/`, likely 25 total. That's 5.3MB of keyboard click sounds for a language app. Click sounds don't teach German. Keep 2-3 + off, delete the rest, save the 5MB and the `sound-imports.ts` (10.5KB) complexity.
- **Typing mechanics:** `/settings` has 6 sections, 7 toggles: stop-on-error, confidence mode (no backspace), lazy mode (ae/oe/ue/ss), capitalisation tolerance, caps-lock warning, quick restart, German character bar. That's a typing *game*, not a language app. A beginner doesn't know what "confidence mode" means. Replace with 3 presets — Beginner (forgiving), Intermediate, Strict — and hide the 7 toggles under Advanced.

If you cut themes/fonts/clicks, you also cut the biggest chunk of `public/` (16.9MB total) without touching a single lesson.

### 4. Panorama vs Atlas vs Trail — the learner doesn't know which to use when

You have three reference layers:

- **Trail:** "what do I do next"
- **Atlas:** phonological panorama (9 shifts)
- **Panorama:** grammatical panorama (cases, verb bracket, adjective endings, tense)

`german-panorama.md` is excellent — it even has an honest backlog. But two holes:

- **Passive is missing.** The doc marks passive as "inferred / out of declared scope." Passive is B1 German (`wird gemacht`). If Panorama claims to be "every structure German is built from," omitting passive is dishonest. Either add a passive sprig, or change Panorama's promise to "structures we teach" and list passive as "not taught, you'll see it in real German."
- **Genitive gap:** Genitive is taught in 1003 (topic 10 sprig) and revisited in 5102 (branch attached to topic 30). That's a 20-topic gap between introduction and revisit. That's not spaced repetition, that's forgetting. Add a genitive revisit around topic 20, or move 5102 earlier.

And in the UI, make the choice explicit: "Stuck on a *sound* → Atlas. Stuck on *grammar* → Panorama. Stuck on *what to do next* → Trail." Right now the learner has to discover that.

### 5. Placement vs gates — they can contradict each other

`ARCHITECTURE.md` §7: placement is a 10-item check that "recommends a topic, with an override. This is not a validated CEFR assessment and does not fabricate prior completion or unlocks."

But gates require stars *earned inside their stretch*. So if placement says "start at topic 15," the learner still hasn't earned stars for topics 1-14, and the gate after topic 7 (14★) will hard-lock them.

You have two options, pick one and document it:

- **Placement is advisory only:** "We think you're ready for topic 15, but you'll still need to earn stars from earlier topics to unlock gates. Here's a fast path." 
- **Placement unlocks:** Placement passing a checkpoint test actually unlocks that stretch (with stars awarded or waived).

Right now it's ambiguous, and a confident learner who places high will hit a locked gate and think the app is broken. That's a *blocks the learner* bug.

### 6. Offline, backup, and PWA — good bones, missing signals

From `DEPLOYMENT.md` + `ARCHITECTURE.md`:

- **Cache cap is 240 entries.** You have 500 lesson payloads (179 + 123 + 123 + 75). So offline *cannot* hold the whole course. That's fine by design ("only requested pages are cached"), but the learner doesn't know it. Add a per-lesson badge: "Available offline" vs "Needs connection," and a Settings control: "Clear offline data."
- **Backup reminder:** "appears after learning progress exists, then weekly after download, snoozes for 1 day." Where does it appear? If it's a modal that interrupts a lesson, it's annoying. If it's only in Settings, nobody sees it. Make it a non-blocking banner on the Trail, not a modal.
- **15-minute listening pause:** "persisted absolute timestamp, not a component timer." Why 15 minutes? Is it to prevent TTS abuse, or listening fatigue? The learner doesn't know. If they pause, do they resume where they left off? Document the *why* in the UI: "Take a break — your ears need it" is better than a mysterious timer.
- **Speech recognition:** Optional, lenient, no storage — good privacy. But browser `de-DE` recognition is poor on some browsers. If it mis-hears correct German as wrong, the learner loses trust. Show confidence ("We heard ~80% — sounds good, keep going") instead of binary right/wrong.

### 7. Deployment + SEO: duplicate URLs for the same lesson

You have two URLs for the same lesson:

- `/?lesson=1&lang=de` (overlay)
- `/trail/de/1` (canonical page)

Plus legacy `/trail/1`, `/trail/:id`, `/atlas/:family`.

`DEPLOYMENT.md` says canonical links + sitemap use `NEXT_PUBLIC_SITE_URL`. Good. But:

- Are the `/?lesson=` URLs canonicalized to `/trail/de/1`, or will Google index both and split ranking?
- Do canonical lesson pages have per-lesson OG images, or one global `og-brucke.png` (74KB) for all 500 lessons? If it's one global image, sharing a specific lesson on social looks generic. Generate per-lesson OG (title + topic) or at least per-topic.
- `DEPLOYMENT_SMOKE_ORIGINS` is correct (no wildcard, fail closed), but smoke only checks "key routes, hydration, uncaught errors." It doesn't check lesson completion, review, backup, or language switch. Add one smoke test per language: "open lesson 1 in French, complete 1 exercise, no error."

Also: your example domain is `brucke.example.com` everywhere. What's the real domain? If you haven't deployed yet, that's fine — but don't let `example.com` leak into a real build. `NEXT_PUBLIC_SITE_URL` validation already rejects localhost without the override, which is good.

### 8. Review is now the biggest surface — and the most complex

Sizes:

- `use-review-controller.ts` — 37.9KB
- `ReviewDeckSelector.tsx` — 23.2KB
- `ReviewSessionCard.tsx` — 16.9KB
- `ReviewAnswerEntry.tsx` — 11.5KB
- `ReviewStyleDialog.tsx` — 9.2KB
- Total ~99KB for Review UI alone, vs `TrailMap.tsx` 20KB

Review has its own state machine that duplicates lesson session logic (grading, retries, assistance). That's why you needed a 25KB persistence test.

Two improvements:

- **One grading policy:** `letter-diff.ts` + `lesson-grading.ts` + review grading should be one function, not three that happen to agree. If they drift, a word graded "Good" in a lesson is graded "Hard" in review, and the learner thinks the app is inconsistent.
- **Review controller split:** 37KB is too big for one hook. Split by deck type (word vs sentence vs article) — sentence review is additive and has different rules (15 cap, no stars), so it shouldn't live in the same controller as word review.

Atlas is similar: `MasterConstellation.tsx` 21KB + `ConstellationDetailClient.tsx` 16KB + `ConstellationWeb.tsx` 10KB + `BranchDrillModal.tsx` 8KB = 55KB. Master view does layout + rendering + interaction. Memoize or split layout from rendering — you already memoize `ShiftPair` and `GenderBadge`, do the same for constellation nodes.

### 9. E2E: smoke is not smoke anymore

- `smoke.spec.ts` — 23.8KB
- `product-quality.spec.ts` — 16KB
- `verify-tm6.spec.ts` — 16.8KB
- `language-routes.spec.ts` — 12.1KB
- `learning-flow.spec.ts` — 10KB
- `mobile.spec.ts` — 9.8KB
- `local-first.spec.ts` — 5KB

Smoke at 23KB is not smoke. Smoke should be: "6 routes load, no uncaught errors, lesson 1 opens." That's <5KB. Move the rest to `product-quality` or `learning-flow`. A bloated smoke suite is slow, flaky, and nobody runs it before deploying — which defeats its purpose.

Also missing E2E: language switch mid-lesson. Lesson IDs share one numeric space across languages, progress is language-scoped "in practice." Test it: start German lesson 1, switch to French mid-lesson, switch back — does German progress leak? Does the UI show the right language? That's the exact bug the "in practice" hedge is hiding.

### 10. Frequency + hook words: 2018 data, unknown coverage

`ARCHITECTURE.md` §6: frequency comes from pinned OpenSubtitles 2018 lists, CC BY-SA, checksums. Same 2018 list yields `english-hook-words.json` (top 5,000 English forms).

Two questions you haven't answered in docs:

- **Coverage:** What % of your 1227 German words actually have a rank? If it's 60%, frequency is useful. If it's 30%, it's mostly `null` and you're ordering by due date anyway. Publish the coverage number in `frequency-provenance.json` — "1227 words, 847 ranked (69%), 380 unranked" — so an author knows when to trust it.
- **Staleness:** 2018 subtitles don't have 2026 slang, COVID words, AI words, etc. That's fine for A1/A2 core vocabulary (Wasser, Haus, gehen haven't changed), but don't use 2018 frequency to decide whether to teach a *new* word in 2026. For new words, use a 2024+ list or human judgment.

And: do French/Spanish/Dutch have frequency at all? If not, their review ordering is arbitrary. Either add it or document that siblings don't use frequency.

### 11. `USER_TESTING.md` — have you actually run it?

The kit is great: 5 people, fresh profile, think aloud, 60-second rescue rule, don't ask "do you like it," look for repeated breakdowns across 3+ people, test share/resume with a non-German lesson URL, test skipped lessons + 3-bypass policy.

But it also says: "Do not add analytics or accounts before the first five sessions are reviewed." That implies the five sessions haven't happened yet. If they haven't, *every* improvement in passes 1-3 is a guess.

Run it this week, and add three tasks the kit is missing:

- **Settings:** "Change the theme, turn on lazy mode, export a backup" — does anyone find Settings?
- **Search:** "Find the word *Wasser* without doing a lesson" — is search discoverable?
- **Language switch:** "You're in German, switch to French, then back" — does the learner know what language they're in? The kit asks "whether they notice the language" but doesn't test switching.

One more: the kit tests "unaided recall" immediately + next day. That's the *only* retention measure you have. If recall is low, the fix isn't more content — it's more spaced review, or lighter early lessons (your `open-ideas.md` already flags early cores have 9-14 word_ids, proposed 5-6). Test first, then cut.

### 12. Small papercuts that add up

- **`german_expression` field name:** `courses.md` admits "Shared field names such as `german_expression` stay as they are (the generated German JSON depends on them); the sibling courses fill them with their own language's content." So French lessons have a field called `german_expression` holding French text. That's confusing for every future dev. Rename to `target_expression` with a migration alias, or at least document it at the top of `types.ts`.
- **No German leakage regex:** blocks `nicht|ich|wir|aber|auch|noch|schon|haben|werden|ist`. It's a blocklist, not an allowlist. What about `Ich` capital, or `Haben` at sentence start? Is the regex case-insensitive? And Dutch `worden` is explicitly allowed, but what about Dutch `ist` — is `ist` a Dutch word? No, but the test might false-positive on a Dutch word containing `ist` as substring (e.g., `bist`?). Check the regex boundaries.
- **`LessonPracticeLink.tsx` — 642 bytes.** A whole file for a 642-byte link. Meanwhile `use-review-controller.ts` is 37KB. Your modularization is inconsistent: tiny files for trivial things, giant files for complex things. Aim for 3-8KB per component — split the giants, inline the trivial.
- **TopNav + BottomNav:** Both exist (8.5KB + 4.4KB). On desktop, do you show both? If so, it's double navigation. On mobile, top nav (search + language) + bottom nav (6 tabs) makes sense. On desktop, bottom nav is wasted vertical space. Hide bottom nav on desktop, or make top nav the single nav.
- **Shared ID space:** "Lesson ids share one numeric space across languages; progress, SRS and word maps are language-scoped first, so ids never collide in practice." The phrase "in practice" is doing a lot of work. Make it "by construction" — add a test that creates German lesson 1 progress + French lesson 1 progress and asserts they don't merge.
- **28 insights:** German has 28 insights, French/Spanish/Dutch insights files are 15-19KB each — are they translations of the same 28, or language-specific? If they're translations, a French learner gets German cultural insights in French. If they're original, great — but document it.

### What I'd do in order now

**Today (30 min):**
1. Rewrite `CLAUDE.md` to 5 lines pointing to `NORTH_STAR.md` + `AGENTS.md`
2. Decide placement vs gates — write one paragraph in `ARCHITECTURE.md` §7, implement it
3. Check `german_expression` rename vs document — pick one

**This week:**
4. Run the 5-person user test from `USER_TESTING.md` — no new features until you have data
5. Cut themes to ~20, fonts to ~8, click packs to 3 — re-run `audit:assets`, should drop ~6MB
6. Publish frequency coverage % in `frequency-provenance.json`

**This month:**
7. Split `use-review-controller.ts` (37KB) and `MasterConstellation.tsx` (21KB)
8. Fix duplicate URL canonicalization + per-lesson OG images

Want me to draft the new `CLAUDE.md`?

---------------


Parsed all 179 lesson files (895 graded exercisesRev), the trail map, the compendium and frequency data, and read the prose of these lessons plus the lessons in this table. The content craft is above average; the pedagogy has three structural problems that the current audits cannot see.

## The short verdict

The app teaches **the history of German** more rigorously than it teaches **German**. One idea per lesson, English-twin hooks, and the “Him-Case”/“-en”/“Satzklammer” naming are genuinely good. But the syllabus is sequenced by sound law, practice is ~80% recognition, and the only unscaffolded output is an ungraded twist card that is sometimes wrong German.

## What the numbers say

| Measure | Value |
|---|---|
| Trail | 179 lessons, 30 topics, 895 exercises |
| Exercises per lesson | exactly 5, in all 179 |
| Exercise types | shift_select 285 · matching_pairsWall 173 · syntax_builder 105 · reverse_cognate 99 · morpheme_tiles 68 · transcribe 60 · derive 56 · literal_gloss 18 · dictation 14 · variant_english 7 · family_matrix 6 · spoken 3 · pronoun_compression 1 |
| Listening / speaking | dictation in 14 lessons (7.8%); a spoken reply in 3 (1.7%); **162 lessons (90.5%) have neither** |
| Scaffolding | all 60 transcribe and 105 syntax_builder items ship a word bank; all 60 transcribe also ship cues. **6 of 895 items ask for a German sentence with no tiles** |
| Matching_pairs burden | 1,424 slots; 330 (23.2%) are canned “recall” pairs; 79 are “Wir können …” |
| Twist | 20/179 are template-generated; 9 are the identical sentence “Heute ist das sehr gut” |
| New words | mean 13.7, max 40 (5271); branch lessons average 2× the core |
| Vocabulary frequency | median rank 2,424; 30.3% of taught words rank >5,000; 170 rank >10,000 |
| Prose | mean 252 words of hook+pattern (max 553), then 230 words of exercise explanation |
| Accepted alternatives | 1 across the corpus (1201 only) |
| Grammar before teaching | dative appears in 37 lessons before topic 20 (16 ask the learner to produce it); accusative in 6 lessons before topic 10 |

## What is working, and should not be thrown away

- **One law per lesson.** Titles point at a single derivable pattern, not a topic. That is rarer than it looks and is the app's main instructional asset.
- **The English twin as a retrieval cue.** “Him-Case”, “-en is English’s to”, “schlagen/slay”, “Fenster/window”, “Zunge/tongue” give the learner a handle they already own. That is the right use of etymology: an encoding cue for the word, notuned a replacement for the rule.
- **Naming the pattern.** “The Him-Case”, “the bracket”, “the -en infinite”, “dative feelings” are better than “the accusative case” for a beginner. Keep this.
- **The audit lattice.** Word refs, teasers, wording repetition, vocab balance, recurrence, solvability, playability. That is real content engineering and it catches prose drift that most courses never see.
- **The gender-as-color and per-lesson pattern card.** The article grid lesson (11) is structurally sound; color gives a retrieval handle that pure declension tables do not.
- **The error taxonomy is already there** (word order vs wrong word vs umlaut vs article). It is used too weakly.

## What I would change, in priority order

### yar P0 — Correctness: every model sentence is the product

Several graded or modelled sentences are not German, and the suites pass green because no audit can see grammar. This is the most damaging class of defect: a beginner copies the model exactly and gets it wrong.

| Lesson | Surface | Problem | Fix |
|---|---|---|---|---|
| 1003 | dictation `meaning` | “the woman and the man and the child” vs spoken “Der Tisch und die Hand und das Buch” | “the table and the hand and the book” |
| 1001 | syntax_builder | “Wir setzen den Stuhl” — *setzen* seats a person; a chair is *gestellt* | “Wir stellen den Stuhl hin und zeigen den Löffel.” |
| 5291 | matching pair | “Der Pilot fliegt zur Schweiz” | “Der Pilot fliegt in die Schweiz.” |
| 2901 | twist | “Gestern war kalt aber heute ist gut” — missing impersonal *es* and comma | “Gestern war es kalt, aber heute ist es gut.” |
| 2603 | syntax_builder | “Ich sagte den Weg gestern” — *sagen* does not take *den Weg* like that; sentence exists to hit three y→g words | “Ich sagte gestern, wo der Weg ist.” |
| 5311 | matching pair | “Der Bauer hat Stolz” — noun *Stolz* is not had like an object | “Der Bauer ist stolz.” (or “Der Bauer hat seinen Stolz.”) |
| 1604 299 | twist | “Wir anziehen heute hier” — separable prefix stranded, no reflexive | “Wir ziehen uns heute hier an.” |
| 5171 | twist | “Wir hinten heute hier” — *hinten* is anVan adverb, no verb | “Wir sind heute hier hinten.” |
| 1802 | twist | “Wir haben heute hier” — *haben* without object | “Wir haben heute hier Zeit.” |
| 5071 | twist | “We be called here today” is not English; “Wir heißen heute hier” is not German | “Wir sind heute hier.” / “Wir heißen Anna und Ben.” |
| 1901 | matching pair + MCQ | *schreiben* glossed “describe (scribe family)” — it means **write**; *describe* is a Latin relative | pair with “write / wrote / written”; move *scribe/describe* to the note |
| 1902 | matching pair | *fahren* glossed “fare / fared” — means **drive/travel/go**; *fare* is a false friend | pair with “drive / drove / driven”; footnote the *fare* cognate |
| 1903 | matching pair | *schlagen* glossed “slay / slew / slain” — means **hit/beat**; *slay* is a cognate, not a translation | pair with “hit / beat”; footnote *slay* |
| 2301 | matching pair | *Vogel* glossed “fowl (and its archaic kin)” — means **bird**; the plural pair *Vögel/fowl* is especially misleading | pair with “bird / birds”; footnote *fowl* |
| 2401 | syntax_builder | “Das Buch ist besser aber der Film ist am besten” — comma missing; *am besten* used for a two-item comparison | “Das Buch ist gut, aber der Film ist besser.” |

That is not nitpicking three sentences: 190/190/230 are exactly the lessons whose job is to make the learner trust the twin system. When the twin is a **cognate** but is presented as a **translation**, the learner builds a false lexicon. The English column in `matching_pairs` should be one thing only — the meaning. Cognate labels belong in the explanation/footnote, or in a separate `cognate_match` type. Right now the app asks the learner to do both jobs with one string, and the learner will choose the wrong one.

Likewise, **twists must not be generated by slotting a lesson word into a template**. “Wir anziehen heute hier” is a template artifact, not a sentence. The fact that 20 of 179 — and 9 of them identical — are machine-shaped is visible to the learner and it undermines the “every sentence is deliberate” promise. Either author a transfer sentence per lesson opposite  some other content, or mark the twist “off” for that lesson. Do not ship filler.

### สP1 — Production is assembly, not retrieval

159/179 lessons have exactly **one** production exercise. 8 have **none**. No lesson has three. The one is nearly always a tile bank containing the answer, or a transcribe with cues that describe the answer. The learner is choosing/ordering, not recalling.

Fix the shape, not the marketing:

- **Every lesson gets two unscaffolded outputs.** One typed (dictation or free transcribe with no bank), one spoken (prompt + reply idea, no bank).
- **Fade support after the first attempt.** The retry already exists; on retry, remove the bank and one cue. The first attempt can be scaffolded; the second must be retrieval.
- **Gold star means no bank.** Currently the star seems tied to completion. Make a gold star require at least one no-cue production item. This is one field and one renderer check, and it changes what the learner optimises for.
- **Accepted alternatives.** One alternative in the whole corpus is not a grading policy. For every transcribe item, add at least the natural variants: optional sentence-initial *und*, dropped repeated subject pronoun (“Wir singen und wandern”), time phrase before/after the subject where both are V2, and the article forms the lesson explicitly accepts. The grader is character-level; it cannot infer grammar. Use `accepted_answers` deliberately.
- **Fix the case warning.** For “ich kann morgen kommen” vs “Ich kann morgen kommen”, the app says “German nouns are capitalized”, which is false about that token. Distinguish sentence-initial capitalisation from noun capitalisation; do not teach a wrong rule through feedback.
- **Do not hide commas.** The grader already folds commas; the display should still show them. “Weißt du wo der Kaffee ist” and “Der Mann der Deutsch lernt trinkt Kaffee” are showing the learner incorrect written German. Put the comma-bearing target in the target string and let `foldCommas` do its job at grading time. This one change fixes ~all subordinate-clause and relative-clause punctuation in the course.

### P2 — The load is inverted

A learner gets 40 new words and 5 exercises in 5271. They get 553 words of prose and 5 exercises in 1003. The strong lessons get the same practice budget as the overloaded ones, because “5” is a constant, not a design. That is not a curriculum; it is a layout.

Concrete limits I would enforce in content review, not just comment:

- **8–10 new words** in the first half, **12–15** later. 20+ requires a two-lesson split.
- **At least one production item per 4 new words**, and not tile-only.
- **Rare words are recognition-only.** The compendium already has the concept of “optional reference-only” (556 words). Extend it: any word with frequency rank >5,000 does not get a production target and does not appear as a transcribe answer. Keep *Birke*, *Zinn*, *Wespe*, *Pflug*, *Augenbraue*, *Vorfreude*, *Fußballspieler*, *Sandale*, *Haselnuss* as shift exhibits in tables/notes; do not make a beginner produce them while *wissen*, *können*, *müssen*, *noch*, *schon*, *weil*, *dass* wait for later lessons.
- **Add `plural` to `WordEntity` and show `der Schuh / die Schuhe` in every noun table.** Right now the compendium has no plural field at all. Gender is a colour; plural is absent; both are lexical properties of the noun. Topic 23 then teaches “plurals” as a late special topic instead of as a habit from lesson 1.
- **Every noun string in an exercise carries its article** until the article grid is secure. `Arm → arm` in lesson 1's pair is a missed retrieval; `der Arm → arm` is the same exercise plus the fact the learner will need foreverCalif.

### P3 — The sequence is the grammar, and the grammar is late

By lesson 40 (end of topic 9Rev) the learner has had no negation, no yes/no question, no plural, no named case, no past, no numbers, no formal address. They have had six sound-shift topics. That is not “connections as support”; that is “history as spine”.

My bold recommendation: **stop letting the shift taxonomy determine grammar order**. Keep the shift topics as the app’s identity and its vocabulary engine, but sequence the 30 topics by **what the learner can do**, and let each shift topic attach to a functional structure rather than precede it.

Minimum reorder that preserves the existing lesson files:

1. Topic 1 · Core + **survival sprigs**: `ich bin / ich habe / ich möchte`, yes/no question (verb first), `nicht/kein`. (Uses only taught words.)
2. Topic 2 · Modals + bracket (already functional).
3. Topic 9 · Conjugation (already here) — fold into 1–2 as a sprig rather than a standalone late topic.
4. Topic 11 · Article grid, then **10 accusative**, then **23 plurals**, then **20 dative**. These four are one system; splitting them across the trail by 80 lessons is the single biggest pedagogical cost.
5. Topic 17 · Numbers/time immediately after 11 (you need articles and plurals to say prices and times).
6. Topic 18 · Perfekt immediately after 10/11 (you need accusative to have objects in the past).
7. Topic 24 · adjective endings immediately after 20 (they are dative/accusative endings applied to adjectives).
8. Topics 3–8, 19, 21–22, 25–30 become the **lab rail** interleaved: a shift lab per two function topics, using already-taught structures. They keep the identity, but they stop g Byron the gate.

If a full reorder is too expensive: add a **parallel “Function Rail”** of 10 short compulsory sprigs (one per topic pair), and compute branch unlock from declared structure dependencies rather than attach topic. That fixes the worst symptom — branch vocab lessons graded on untaught dative (`5281 Der Arzt hilft dem Kind`) — without touching the main line. `5221/5231` currently attach at topic 6 and contain *auf dem Brot*, *zum Kaffee*, *aus dem Ofen*; either move those branches after 20 or make those read-only chunks with a footnote and no case-choice item.

### P4 — The prose is explaining, not teaching

The pattern cards are usually accurate and vivid, but they answer “why is this word like this?” before “what do I say tomorrow?”. The learner who is uncertain is not served by Proto-Indo-European; the learner who is curious can open the linguist note. Two changes:

- **Add a “Say it” block to every pattern card**: three sentences the learner can use today, with audio. The historical paragraph stays, but after itCalif.
- **Cap the historical explanation** at ~120 words per lesson, and move PIE/etymology above that into `linguist_note`. 1003 currently gives a beginner 553 words of prose before one dictation. That is an essay, not a lesson.

The North Star says “If in doubt, say less.” The course’s prose follows the opposite rule: each lesson says everything the author knows. Cutting the history by half would not make the app less distinctive; it would make the German more visible.

### P5 — Ear and mouth are almost absent, in an app about sound

Dictation is the only listening task: gil 14 lessons, 8 of them with a word bank. Speaking is 3 exercises. There is no explicit phoneme syllabus. A learner can finish topic 9 and still read *Wein* to rhyme with English “wine”, *Vogel* with a /v/, *Zeit* with a /z/, and *Tag* with a /g/ — because the app teaches sound **laws** but not German **letters**.

Add a short, compulsory pronunciation thread (6–8 lessons, one anchor word set each), early:

| Contrast | Anchor |
|---|---|
| `w` = /v/, `v` = /f/ | *Wasser*, *Vogel* vs *Vater* |
| `z` = /ts/ | *Zeit*, *zwei* (already 501, but make it a unit) |
| `s` before vowel = /z/, `ß/ss` = /s/ | *Sonne*, *singen* vs *Fuß* |
| `ch`: ich-Laut vs Ach-Laut | *ich*, *Buch* (601 has this; front-load it) |
| `ei / ie / eu / äu` | *Wein / Wien*, *neu / neu?* — use real pairs |
| Umlauts + final devoicing | *Hüte/Hütte*, *Tag/Tage* (5031, too late) |
| Stress | *Brücke*, *verstehen* |

Then make dictation a regular rhythm: every third lesson, not every twelfth. The TTS is free; the marginal cost is authoring the sentence. For a course whose whole thesis is sound correspondence, 7.8% ear training is the wrong ratio.

**Audio quality risk:** browser `speechSynthesis` German voices differ widely, and a beginner cannot tell a bad model from a good one. Bundle 50–100 anchor words as recorded `.wav` (the app already ships click sounds) and use TTS only for generated sentences. Otherwise the pronunciation thread will be a lottery by OS.

### P6 — The twist is the right idea, implemented as a placeholder

The twist is the only free-production slot in a lesson. At its best (1003, 2001, 2404) it forces the learner to rebuild a sentence from meaning. At its worst (9× “Heute ist das sehr gut”; 1604, 5171, 1802) it has nothing to do with the lesson and is not German팀. And it is ungraded, so a wrong answer is displayed in grey beside a wrong model and the learner moves on.

Fix:

- **One authored transfer sentence per lesson**, using the lesson's structure in a *new* proposition, with `< 2` old words. For 240签署1 it must contain a comparative; for 5052 a two-way preposition; for 1402 a *weil/dass* clause.
- **A content test**: every `twist.target_answer` must either appear as an exercise target in that lesson or be listed in a small reviewed allowlist. That one test would have failed the 20 templates and forced authorship Belt.
- **Grade it.** Show the model only after the input, and make the input part of the lesson star. The “ungraded” badge is honest but it is also an abdication: this is the only place the learner produces from meaning, so it should be the most attended160.
- **No sentence-level template reuse** across topics. Same *structure* is fine; same *sentence* is not.

## What I would do first if I were you

| Order | Change | Cost | Why |
|---|---|---|---|
| 1 | Fix the 15 defect rows above; add the twist-target test | content review, 1 test | stops teaching wrong German |
| 2 | Comma-bearing targets + sentence-initial case message + `accepted_answers` on all 60 transcribes | writer + 1 day code | removes “correct answer marked wrong” |
| 3 | Require  shoot 1 unbanked production per lesson; gold star only with no bank | renderer + content | turns the app from recognition to recall |
| 4 | Cap new words at 10 / split branch 5271, 5261, 5302; add `plural` field | content +  migration | load is currently impossible |
| 5 | Move dative (20Rev) after article grid; plural (23) and accusative (10) adjacent; numbers (17) and Perfekt (18) earlier | curriculum rewire | the biggest comprehension gain per move |
| 6 | Add the 7-lesson pronunciation thread + dictation every 3rd lesson | content + audio | the app is about sound but doesn't train the ear |
| 7 | Rewrite pattern cards with “Say it” + 120-word history cap | editorial pass | history is currently the explanation |

If only one thing: do **#3**. This is a good course for *understanding* how German and English are related, and a thin one for *saying* German. The gap is not the writing — the writing is the best part — it is that 162 of 179 lessons end without the learner having to recall a single sentence unaided. Close that gap and the existing content gets much more valuable; the etymology becomes the hook it was meant to be instead of the thing being tested.



-------------------------


All lessons, the compendium, the teaching engine, grading logic, review system, and the audits are now read and cross-checked. Here is the full pedagogical review.

# How Brücke teaches German — review & suggestions

## What the method is (as shipped)

Cognate-first lexical instruction: every word arrives via a documented English sound-shift (TH→D, P→FF, T→SS/Z, K→CH…), compounds are taught as literal morphology ("Seeschlange = sea-snake"), and grammar is taught as small recurring "laws" (verb in position 2, the "basement" after weil/dass, the Perfekt bracket, dative = "the giving case"). Structure: 30 core topics → 79 sprigs (remedial drills) → 65 branch lessons (imperative, Konjunktiv II, relatives, two-way prepositions…) → 5 reading stories. 179 authored lessons, 1,227-word compendium, 895 exercises, 28 daily insight cards.

Each lesson runs the same loop: **hook** (familiar-words entry) → **pattern** (one law) → **table** (word bank) → **practice** (~5 exercises) → **summary** (transfer sentence) → **twist** (spaced re-retrieval of an older lesson's item). Lesson length is ~4–6 min by the app's own effort model. Gates after topics 7/10/14/21/26 require mastery before continuing.

## What's genuinely strong

| Strength | Evidence |
|---|---|
| Bitesized, consistent lesson shape | All 179 lessons have hook/pattern/table/practice/summary/twist + a "use it tomorrow" sentence |
| Spaced retrieval is built into the spine, not bolted on | Every lesson's *twist* pulls a prior lesson's item; SRS (SM-2) seeds on completion; recurrence floor of 2 lessons per word is **tested** (`curriculum-recurrence.test.ts`) |
| Grading is honest | Case/umlaut/ß/typo tolerance with `warningNote`; tile exercises can't grade a missing infinitive ending as Good (there's a dedicated e2e test for exactly that trap) |
| Frequency grounding | All top-300 English words covered; median corpus rank 2,430 — the vocabulary is mostly what a beginner actually needs |
| Solvability & audits | Every exercise is tested solvable; word-reference, teaser, wording-drift and vocab-balance audits run in CI |
| False friends handled explicitly | *Rat/fast/bald/Gift* get dedicated trap notes and review categories |
| Zero-cloud, accessible | Browser TTS with graceful voice-missing fallback, listening skip for quiet environments, localStorage + cookie fallback |

This is a well-engineered curriculum. The issues below are refinements, not structural flaws.

## Findings & suggestions (ranked by impact)

### 1. The table-word pipeline tests words it never taught — in the hardest direction

This is the biggest pedagogical inconsistency I found.

- 1,226 words appear in lesson tables; only 671 are ever in `word_ids` (formally taught + assessed). **555 words are table-only** ("optional reference material" per the docs).
- **477 table words never appear in any exercise anywhere** (verified by scanning all 895 exercises) — examples: *Anzug, Adresse, Angebot, Amerikanisch…*
- Yet `use-lesson-session.ts:203` seeds **all** `table_word_ids` into the SM-2 queue on lesson completion, and review flashcards prompt **English → German production** ("suit" → *Anzug*).

So a learner can be asked to *produce* a German word they've only ever seen passively in a table — the exact "word used before taught" violation NORTH_STAR warns about, just relocated into review.

**Suggestion:** make the first SRS review of a table-only word recognition-direction (DE→EN or audio→EN), and promote it to EN→DE production only after it's appeared in 1–2 exercises or been reviewed once correctly. That turns the table from a liability into a proper recognition→production funnel, and it matches how the app already treats *article_* and *sentence_* cards differently.

### 2. Production is only ~27% of exercises, and listening/speaking are nearly absent

Exercise mix: `shift_select` 285, `matching_pairs` 173, `syntax_builder` 105, `reverse_cognate` 99, `morpheme_tiles` 68, `transcribe` 60, `derive` 56, `dictation` **14** (8 lessons), `spoken_turn_reply` **3** lessons, everything else small. ~238 of 895 items require actual production (34% if you count tile-assembly).

For an app whose north star is "read, build, say, remember," the *say* and *hear* pillars are thin, especially after topic 15 where the grammar gets productive fast.

**Suggestions:**
- Add 1 dictation or `spoken_turn_reply` to late-phase sprigs (16+), where vocab is known and sentences are rich — cheap to author since they reuse lesson sentences.
- Add a **listening deck** to review (audio → type/choose), reusing existing TTS + the 14 dictation items as seed content. This also gives the 15-minute listening skip a place to live without nuking all dictation.

### 3. One "skip listening" press silences dictation for 15 minutes

`LISTENING_SKIP_MS = 15 * 60 * 1000` applies globally. A learner on a train who skips one dictation loses all audio practice for the rest of a session (typically 15–30 min of study). **Suggestion:** per-exercise skip (skip *this* item, offer the next), or a much shorter default window. The spirit (don't force audio in a library) is right; the granularity punishes normal use.

### 4. Word recycling sits at its own minimum for half the lexicon

The recurrence audit sets floor=2, target=3 ("three lessons is the authoring target, not an exemption"). Distribution: 310 words assessed in exactly 2 lessons (floor), 200 in 3, 9 in exactly 1 (*treffen, tot, angst, anrufen, beginnen, stehlen, zwischen, datum, tomate* — at least these are all in tables, so they get SRS exposure).

**Suggestion:** prioritize the function-word backbone (*zwischen, anrufen, beginnen, tot*) for a third retrieval — these are the words later sentences silently assume. The audit already computes exactly this; a "target=3 for the top-200 frequency words" mode would turn the current floor into a ratchet.

### 5. ~50 words are used in exercises before any lesson teaches them

The `PRE_EXISTING` allowlist in `audit-vocab-balance.ts` documents drift like *weiß* (used in lesson 2, formally taught with *wissen* later), *jetzt, auto, kaffee, schreiben, werden*. It's honest bookkeeping, but every entry is a small "use before teach" event.

**Suggestion:** most of these are ultra-high-frequency function words — promoting them into the relevant `word_ids` (one extra exercise) resolves the allowlist properly instead of shrinking it annotation by annotation.

### 6. German punctuation is inconsistent in target answers

Grading deliberately ignores commas (reasonable — tiles can't carry them). But the *model text* flips: lesson 14's multi-answer item uses `Ich weiß, dass du kommst` while its dictation/twist items use `Ich weiß dass du Deutsch lernst`, `Sie weiß dass ich das Tier mag`. Since learners see target sentences repeatedly, pick the Duden-correct form (**comma before dass/weil**) everywhere — it costs nothing and models correct written German.

### 7. Small content-quality nits

- Table vocab can be topically random: lesson 5211 (a restaurant/kitchen table) includes *Anzug* (suit) and *zäh* (tough) with zero connection to the lesson. Domain-tagging tables (the compendium already has `domain`) would let review offer "food words" / "travel words" decks that feel coherent.
- `estimateLessonEffort` counts 2 min reading + 20 s/exercise — realistic for cores, but branch drill lessons (e.g., 5052 "Sentence Gym", 20 picture sentences) will run long; consider per-lesson authored overrides.

## What I'd do first, if I were prioritizing

1. **Recognition-first review for table-only words** (fixes 555 words' worth of over-claimed knowledge; moderate engine change in `use-review-controller.ts` + `seedSrsCards`).
2. **Listening deck in review + per-exercise listening skip** (fixes the thinnest skill and the 15-minute blanket).
3. **Comma-before-dass cleanup + resolve the `PRE_EXISTING` list by teaching those words** (pure content polish, low risk, directly aligns with NORTH_STAR's "taught before used" test).

Everything above is verified against the shipped data (lesson files, `compendium.json`, `use-lesson-session.ts`, `use-review-controller.ts`, `review-decks.ts`, `srs.ts`, `audit-vocab-balance.ts`, and the test suite). The single strongest asset this app has is that its discipline is *tested* — the suggestions above mostly mean extending existing audits/tests to cover the recognition→production gap, not building new machinery.


------------



## Verified additions and corrections to the course review

### Fix two misleading curriculum blurbs

- **Lesson 5121:** In `src/data/curriculum.ts`, the plan groups `Tag/day` with `zehn/ten` and `zwei/two` under T→S. Remove `Tag/day` from that comparison: the course itself places it in D→T. Keep a relevant example such as `zwei/two`.
- **Lesson 5311:** Its curriculum plan describes `Freude` and `Liebe` as examples of `-ung` and mentions `der Zorn`, which is not among the lesson's `word_ids`. Replace the blurb with the feeling words and constructions actually taught in `src/data/lessons/5311.ts`; do not invent an `-ung` connection.

### Explain the present-tense translation early

In an early lesson using `ich lerne`, explicitly show that it can mean both “I learn” and “I am learning,” depending on context. Lesson 702 explains the contrast for `ich trinke`, but that explanation is in an optional sprig; earlier access would help learners interpret the English progressive without importing an English-style construction into German.

### Connect separable verbs to the existing bracket

Lesson 15 calls German separable verbs English phrasal verbs and already shows that `aufstehen` stays together after a modal. Strengthen the explanation by treating `auf` as part of the German verb and showing how the separated piece carries meaning at the end in `Ich mache das Fenster auf`, alongside the intact infinitive in `Ich will das Fenster aufmachen`. Avoid claiming that English phrasal verbs and German separable verbs behave identically. This is a teaching refinement, not evidence that the current lesson lacks a bracket explanation.

### Corrections to the submitted audit

- **Early questions are not absent:** lesson 2 already practises `Kann ich morgen kommen?` with a verb-first cue. Lesson 8 also uses `nicht` with an explanation. A fuller early modal-negation explanation may still be useful; the earlier sequence proposal above already covers that direction. Do not renumber topics: `AGENT_PRECAUTIONS.md` requires stable topic and lesson IDs.
- **The recurrence explanation is wrong:** `src/lib/curriculum-recurrence.ts` counts assessed exercise surfaces, not `table_word_ids`. The oversized lesson 1/2 tables and lesson 5271's 42-entry table are real and already flagged above, but the audit does not establish why they were populated. `word_ids` includes words a lesson drills, including review words; 40 IDs in 5271 do not mean 40 newly introduced words.
- **The article reframe already exists:** lesson 11 explicitly gives `D- + er/sie/es`; sprig 1003 develops it, and lesson 20's payoff applies it to `D- + ihr → der`. Do not add a duplicate reframe.
- **Lesson 2403 is a required sprig**, not an optional one: `curriculum.ts` marks it `required: true`. It is not on the linear spine, but it is required for trail completion.
- **`sp-` and `st-` are not missing:** lesson 5072 explains their initial “shp” and “sht” sounds. It is an optional branch; the earlier pronunciation-thread suggestion already covers the broader sound-system concern.
- **Story tables are reading word banks**, not necessarily memorisation lists. Their 17–21 entries are real, but that alone does not establish that removing them would improve comprehension; retain reading support unless learner evidence supports a change.

---

## Source-checked suggestions: review, offline and accessibility

These are recommendations, not claims that the proposed fixes have been implemented or that every reported impact has been measured.

### 1. Make sentence review distractors unambiguous

`src/lib/review-modes.ts` generates sentence MCQ distractors by rearranging words, without checking whether another order is grammatical or has the same meaning. The sentence-pattern deck supports MCQ (`src/lib/review-decks.ts`). Review actual sentence cards for ambiguous options and use authored or otherwise demonstrably invalid distractors; do not grade a valid alternative as wrong. The proposed `Ich komme heute` → `Heute komme ich` example illustrates valid alternative order, but is **not** produced by the stated `swapFront` operation.

The same generator only lowercases a fixed set of sentence-initial words before moving them; German adverbs such as `Natürlich` and `Vielleicht` are absent, potentially giving away a distractor. Fix capitalization without lowercasing German nouns. `STRUCTURAL_FOILS` also has no Dutch-specific section; it supplies **tile** distractors, not MCQ distractors, and Dutch fallback words already exist. Add language-appropriate foils only where they improve real exercises, without mixing languages or introducing another valid answer.

### 2. Protect useful offline content from cache competition

`public/sw.js` limits one versioned cache to 240 entries, excluding `/offline.html`. Routes, Next.js assets, lesson payloads, fonts and sounds compete for that space; an older saved lesson or chunk can be evicted. The worker refreshes asset recency on a hit, so this is not simply a cache that never updates recency. The exact “a few packs and 40 lessons” failure was not demonstrated.

Give essential shell assets and lesson content separate, bounded policies, with a quota-aware fallback and tests for updates, old tabs and offline navigation. Preserve the existing policy of caching requested content only; do not promise the entire course offline. The data allowlist is hardcoded to `de|fr|es|nl`, so a future course requires a worker update; keep it synchronized with the course registry. `/data/frequency-provenance.json`, linked from `WordFrequency`, is also outside the allowlist; decide whether that optional source link should be available offline. The earlier offline-status suggestion at §6 already covers telling learners what is saved.

### 3. Make relearning easier to find and complete

After five lapses, `src/lib/srs.ts` excludes a card from regular review. `ReviewCardManagement.tsx` already opens the relearn details when cards exist; for a linked lesson it requires finishing that lesson before resuming, while dictionary-only cards use a meaning-and-example flow. Add a prominent Review Hub entry for cards needing relearning and a short, meaningful relearn path where appropriate, while preserving progress and making the return to regular review explicit. Do not describe the existing panel as always hidden or its Resume button as immediately available.

### 4. Let learners choose a usable browser voice and rate

`src/lib/audio.ts` uses `speechSynthesis`, rate `0.92`, and the first exact-locale voice or first same-language regional voice. Extend the existing sound/voice settings with an optional available-voice selector and slow/normal/faster playback. Save the preference per language, handle voices loading asynchronously or disappearing, and retain the existing missing-voice and text-only fallbacks. Voice quality and availability depend on the device; do not promise neural voices or network-free speech on every browser. This extends the slow/normal suggestion already noted above.

### 5. Improve atlas navigation without treating performance as proven

The desktop family web in `ConstellationWeb.tsx` selects the first 20 words; mobile shows the first 40 in its vertical tree, and the remaining words have a roster below. Select a useful mix of encountered/mastered and nearby unseen words for the visual sample, while keeping the complete roster accessible and making the selection understandable.

`MasterConstellation.tsx` has a searchable table view, but no search that locates and centers a word in the graph. Add a graph jump-to-word control, keeping the table and keyboard access. The graph is 2600×2000 and renders interactive SVG nodes, but a mobile performance problem and a specific node count were not measured; profile on representative devices before choosing an optimization. The graph already distinguishes mastery visually, so a “fog of war” would be a refinement rather than a new capability.

### 6. Improve compact mobile search

`TopNav.tsx` uses a 64px-wide, read-only search input below the `sm` breakpoint with the placeholder `Search… /`. Check the actual small-screen presentation and, if it is cramped, use an accessible 44px-or-larger search icon button on mobile while retaining a visible label for assistive technology and the existing keyboard/dialog behavior. Truncation and a layout improvement have not been visually verified.

### 7. Harden HTML with a deployable CSP

`next.config.mjs` defines a CSP for `/sw.js`, but not for the general HTML route headers. Assess an HTML CSP against the actual deployment headers and static Next.js output, including framework-generated inline scripts and the pre-paint script. Test in report-only mode and then enforce a policy that preserves hydration, themes, fonts, audio, imports and offline behavior. A hash for only the pre-paint script is not evidence that a strict policy will work; the absence of this config header alone does not prove an exploitable XSS.

### 8. Optional future learning tools grounded in the existing data

- **Reading lens:** use the existing compendium, word-token resolver and mastery data to highlight reliably matched words in pasted German text, with links to their cards and known false-friend entries. Mark unmatched or ambiguous forms as unknown; the existing shift aligner does not prove that arbitrary unseen words can be decoded into English cognates.
- **Compound practice:** build a small optional exercise around curated German compounds and their component meanings, using the existing compounds deck/data. Teach the final noun's gender for the curated examples; do not imply arbitrary assembled pieces are necessarily real German words.
- **Context recall:** `clozeSentence()` already supplies a pre-reveal context clue in `ReviewSessionCard.tsx`, so the claim that cloze is not exposed is wrong. A distinct optional exercise could ask for the missing inflected form in context, but needs reliable sentence/answer pairs and alternatives rather than assuming the current heuristic blank always supplies an answerable prompt.
- **Audio review:** an optional prompt–pause–answer listening session could extend existing browser speech. Keep on-screen controls and a non-audio fallback; background playback, lock-screen controls and headset gestures vary by browser and cannot be assumed.

### Not accepted as established findings

- The alignment cache **does evict** its oldest entry at 500; it does not stop caching. Dutch-specific patterns are absent from the shared alignment list, but adding rules solely for etymological parity is not a priority under `NORTH_STAR.md`; existing shared rules can already match some Dutch pairs.
- The SM-2 formula does reduce ease by `0.14` for Hard and leaves it unchanged for Good, with no interval fuzzing. That does not establish actual learner “ease hell” or avalanche frequency; do not adopt arbitrary recovery or jitter values without evidence and scheduling/migration tests.
- Both CI jobs build separately. Sharing an artifact may save work but could serialize otherwise parallel jobs and add transfer time; measure total CI duration before changing it.
- QR/URL transfer has not been shown to fit realistic progress payloads. Encrypted links are copies, not ongoing sync, and URLs can leak through sharing/history; backup and cross-device recovery are already discussed above. The suggested time-machine and cross-language cognate views also risk prioritizing linguistic decoration over learning German.
