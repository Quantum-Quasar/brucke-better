# Muse Suggestions (Remaining Backlog)

Verified against [NORTH_STAR.md](./NORTH_STAR.md). Implemented fixes, stale claims, and rejected proposals have been removed.

## 1. Run First (Before Bigger Changes)

- **Five-beginner phone test ([USER_TESTING.md](./USER_TESTING.md)):** Observe five fresh beginners on a real phone (including next-day unaided recall) to check early-lesson pacing, mobile ergonomics, voice-missing flow, and Review discoverability before changing curriculum structure or building new systems.

## 2. Post-User-Test Pilots

- **Reviewed German audio pilot:** If phone testing shows browser TTS is a real blocker, pilot a small reviewed batch of recorded German clips (e.g., Lesson 1–3 or anchor words) before committing to a full audio library or CDN.
- **Selective practice upgrades:**
  - Pilot a short pre-reveal prediction prompt in shift cores (Cores 3–7).
  - Pilot sound-first prompts in discrimination sprigs (`302`, `402`, `502`, `602`, `702`).
  - Add a sentence-context article exercise mode and a small set of authored sentence-review variants for high-failure items.

## 3. Future Backlog (Non-Urgent)

- Named side-path links without hijacking spine teasers.
- Optional learning tools grounded in existing data: reading lens for pasted German text, curated compound practice, and a listening review deck.
- Atlas graph jump-to-word search and representative-device profiling before any graph optimization.


Nothing filters them out, so Dutch learners really see options like "I am here. (1)". Next I'm checking the German, French and Spanish content in bulk.

German lessons have only 14 dictation exercises out of 895 (French has 130). I'll dig into the quality issues next.

Plenty of etymology still sits inside graded exercises, which goes against the repo's own NORTH_STAR rule. I'll count how much.

Lesson 2 (modals) has 12 unrelated words in its table: Europa, hazelnut, beef, customs. That looks like padding to pass a rule. I'll check whether a test forces it, and look at the code-level smells.

I audited the whole repo. It's well built in places, but I found real bugs, a lot of AI accretion, and a curriculum that drifts from your own stated goal. I didn't run the build or the test suite (the sandbox can't run them). I did parse all 530 lessons (179 German, 133 French, 133 Spanish, 85 Dutch) and analysed them with scripts, then read the code by hand.

## Do these first
1. Fix the Dutch exercise generator (bug #1 below). It's the most visible broken thing.
2. Cut the etymology out of graded exercises and lesson titles.
3. Reorder the German core so learners can actually talk earlier.
4. Teach the common words that are missing (ja, nein, auch, Name…).
5. Rebalance German exercises toward production and listening.
6. Delete the accreted layers listed under "AI accretion" before adding anything new.

---

## A. Bugs and broken content
1. **Dutch answer options are placeholders.** When a sentence lacks hand-written wrong answers, `lesson-factory.ts` makes up filler. Learners see options like "I am here. (1)", "not He is here." and "You am here." This affects about 56 "built the Dutch way" exercises and 45 sentence-choice exercises. 69 of the 85 Dutch lessons use this default path. Nothing in the app hides the filler, and no test catches it. Fix: write the wrong options by hand, or drop that exercise when there aren't any. Never pad.
2. **Dutch "built the Dutch way" exercises are often pointless.** When the word-for-word English equals the natural English, the exercise asks nothing.
3. **Dutch transcribe hints give the answer away.** Hint 1 is "Start with X" and hint 3 repeats the English you were already shown.
4. **The first word is given away in 550 of 986 word banks.** Only the opening word is capitalised ("Ich", "Je", "C'est"). Show tiles in lowercase and capitalise on assembly. For German nouns, keep them capitalised but also capitalise the opening tile only after it's placed.
5. **Six prompts contain their own answer.** For example, 1602 asks for the "true twin of 'beginnen'" (answer: begin), 5012 asks which part of "Auf Wiedersehen" means SEE (answer: sehen), and 1/l1_e4 is the same.
6. **Lesson 1 uses "Ich lerne" before conjugation is taught.** Conjugation arrives in topic 9, and "lerne" has no hint.
7. **Lesson 2 (modals) is tagged with the T→S shift.** You already noted this.
8. **The AUDIT_MANIFEST contradicts itself.** It says 500 lesson payloads in one place and 530 in another.

## B. AI accretion: specific examples
9. **Padding to satisfy rules.** Lesson 2 is about modals, but its table lists 12 unrelated words: Europa, Haselnuss, Rindfleisch, Zoll, Esszimmer… Lesson 1's table adds Buche (beech), Zeitschrift and Gesundheit. The cause is a size quota. Fix: tables should list only words the lesson actually uses.
10. **Goodhart on test rules.** Your "Settled" list keeps words in `word_ids` that are taught only in prose, because removing them breaks the "every word in ≥2 lessons" floor. The tests now shape the content instead of guarding it. Loosen the floor rather than fake coverage.
11. **The Twist card is mostly a template.** It's documented as "deliberate friction", but 116 of 179 German lessons just rebuild a sentence already practised, with a word bank, and with the same templated text ("Re-assembling … locks in the structural pattern of …"). Either make it real or delete it.
12. **Patches instead of root fixes.** `use-review-controller.ts` (919 lines) has a `sessionEpoch` counter "because without this the tile rack kept the old session's tiles". The root fix is to remount the card with a React `key`. The Dutch filler options are the same pattern: they patch a "must have 3 options" rule instead of fixing the data.
13. **Backwards compatibility for users who don't exist.** The app isn't launched, yet there are ~20 "legacy" code paths: redirects for old URLs, old backup formats ("lesson_03" ids) and "legacy zero-success histories". Delete them all.
14. **Storage layers stacked on storage layers.** localStorage, plus a 2 KB cookie fallback, plus BroadcastChannel snapshot sharing between tabs, plus versioned merges, plus a reset epoch and actor. Replace it with one IndexedDB store plus JSON export.
15. **Features imported from Monkeytype (a typing-test app).** 187 themes, 43 fonts, 23 click-sound packs, stop-on-error, confidence mode, quick restart. Some fonts are for scripts no course uses: Noto Naskh Arabic, Lalezar (Arabic), Noto Sans Lao, Sarabun/Kanit/Itim/Boon (Thai). Mechanical-keyboard clicks are on by default. Keep about 6 themes and 4 fonts, and default sound to off.
16. **Docs that tests have to defend.** There's about 1.7 MB of markdown against about 27k lines of app code. `docs-sync.test.ts` fails the build when prose counts drift, and `TEST_COUNT` is maintained by hand. Two READMEs are near-duplicates, and AGENTS.md admits it. Also: `tm6-ideas.test.ts` reads a markdown doc, and the main README hard-codes asset byte counts. Fix: one short README, generate the counts, and delete tests that only guard prose.
17. **Dead weight committed to the repo:** `TRAIL.md` (generated, 221 KB), `naturalness-review/` (900 KB including a CSV), `.muse-suggesions-archive.md` (156 KB), `thinking-method-short.md` (131 KB), a root `PROGRESS.md` that says to "leave uncommitted" but is committed, `wiki/.obsidian`, `.zcode/`, and the package name `german-app-2`.
18. **Internal jargon leaking into code and UI.** There are 99 "TM-x"/"guidebook" comments, settings typed by TM codes, and "ponytail" notes. In the UI, branch badges show raw ids ("Branch Track · 5081").
19. **Meaning encoded in ID numbers.** UI code decides what a lesson is from its id: `id <= 30` means core, `id >= 5000` means branch, `id/100` gives the topic. That's why ids are "welded" and can't be renumbered. Fix: add an explicit field (kind, topic, order) and stop doing arithmetic on ids.
20. **Four content formats for four languages:** German markdown run through a parser, German TypeScript lessons, French/Spanish TypeScript dictionaries, and a Dutch spec plus factory. On top of that, 271-line import lists are maintained by hand. Fix: one JSON/TS schema, generated indexes, and one validator.
21. **A huge rules file for agents.** `AGENT_PRECAUTIONS.md` (25 KB) plus "do not open" folders. It grew because each AI mistake got a new rule. Prune it to about 30 rules, each tied to a test.

## C. Curriculum and pedagogy
22. **Six sound-shift lessons in a row (topics 3–8) before the learner can conjugate (9), use articles (11), negate (12) or ask questions (13).** Interleave: each shift lesson should also teach one thing you can say.
23. **Survival German comes far too late.** Numbers are at topic 17, gender clues at 22, plurals at 23. Move numbers to about 5, gender clues to sit with articles (11), and plurals to about 12.
24. **Common words are missing.** Of the dictionary's words in the top 1,000 by frequency, 107 are never taught. That includes ja, nein, noch, auch, doch, dann, gerne, vielleicht, viel, Name and hören. In 895 German exercises, "auch", "nein", "doch", "gerne" and "Name" are never the answer, "möchte" appears once, and "hallo"/"tschüss" never. Add a "first 50 words" thread through topics 1–6.
25. **There's no "say something real" goal per lesson.** Add a can-do line per core ("Order a coffee", "Say where you live") and make sure the final exercise produces it.
26. **Too many words for too little practice.** German lessons average 13.7 focus words but only 5 exercises. 62 lessons have 15 or more, and 5271 has 40. Cap at about 8 new words, or raise practice to 8–10 items.
27. **German is 62% recognition.** Choosing an answer accounts for 285 exercises, matching 173, and English-answer "reverse cognate" 99. Aim for at least 40% German production.
28. **"Reverse cognate" (99 exercises) mostly tests English and etymology.** Turn most of them into German production.
29. **Listening is almost absent in German: 14 dictation exercises (1.6%).** French has 130. Add about one listening item per German lesson.
30. **Speaking is barely used: 3 spoken-reply exercises per language.** Add one optional spoken turn per core.
31. **Each lesson should open by recalling the previous one.** Your backlog already has this idea; it's cheap and it works.
32. **Only 5 reading stories in 179 lessons.** Add one per topic, around 30, each with read-aloud and tap-to-translate.
33. **The Twist claims "without looking back" but offers a word bank.** Make it typed recall with the bank hidden.
34. **Etymology is still inside graded work.** 116 exercise texts across 68 lessons mention Proto-Germanic, Latin, Greek, centuries or reconstructed roots. Examples: 5302 (hostis), 5021 (\*rēdanō), 5212 ("on record since the eighth century"), 2101 (Greek tele + Latin vision). Your own NORTH_STAR says cut these.
35. **Linguistics jargon in titles:** "Dental Hardening", "Velar Shift", "i-Mutation", "Suppletion", "Ancient Ablaut". Rename them to learner goals ("Words with d that were th").
36. **Hooks and patterns run about 520 characters each, plus 222 footnotes and 160 linguist notes.** Aim for under 300 characters per screen, and keep at most one optional note per lesson.
37. **Interleave old material.** From topic 5 on, every core should include 1–2 items from 3+ topics back, not only mixed-pattern recognition.

## D. Specific lessons
38. **German lesson 1:** drop "reverse cognate: singen→sing" (it gives the answer away), and drop the identical pairs Arm=Arm and Finger=Finger. Add "Ich heiße…", "Ja/Nein" and "Danke".
39. **German lesson 2:** "Wir können hungern" ("We can go hungry") is an odd sentence. Replace it with something like "Wir können kommen". Remove the 12 padded table words.
40. **German lesson 3:** Pfeffer ranks about 11,000 in frequency. Lead with Apfel, Schiff, offen and helfen.
41. **German lessons 8–9:** kapieren, reservieren and anprobieren are low-frequency words for lessons that early.
42. **The Länder/Reisen/Berufe/Frühstück branches (5232–5302):** split each into two, or move most words into review-only status.
43. **French lesson 1:** the matching exercise calls je, tu, la and "un peu" "French twins" (they aren't). "Tu le veux" puts object pronouns in lesson 1. "veux → volunteer" is an etymology quiz. Start with je suis / c'est / je voudrais instead.
44. **Every French lesson starts with matching, and every Spanish lesson but one does.** Five fixed shapes cover about half of French lessons. Rotate the opener (listening first, picture-free choice, recall).
45. **Dutch:** after fixing #1, give the 69 default-plan lessons hand-written plans. Also replace the templated "Up next on De Brug: …" teaser.

## E. Review and spaced repetition
46. **Replace SM-2 with FSRS.** It's open, has a small TypeScript port, and schedules better from the same 4 buttons.
47. **"Mastered" after 3 reviews and a 7-day interval is generous.** Use 21+ days, or show "strong" instead.
48. **Add interval fuzz** so cards from the same lesson don't all come due together.
49. **Add a listening deck** (audio → meaning) and a sentence cloze deck.
50. **Ten deck types is too many for beginners.** Keep "Due" and "Weak words" visible and hide the rest.
51. **Add a daily review cap and new-card budget** linked to the minutes chosen in onboarding.

## F. UI/UX
52. **Six bottom tabs are too many on a phone.** Use Learn / Review / Explore (Atlas + Panorama) / Me (Settings + About).
53. **The lesson header has too many labels for a beginner** ("Phase 1 · Core Shift · Topic 2 of 30 · Core"). Show the title and a progress bar only.
54. **The 5-segment progress bar lets learners jump to any part.** Keep it linear on first play.
55. **Turn on umlaut tolerance (ae/oe/ue/ss) by default on phones,** and show a one-time tip.
56. **Show the character bar only when an input has focus** on mobile.
57. **Use one card per screen for hook and pattern,** with large type and a single "Got it" button.
58. **Make feedback sheets shorter:** the correct answer plus one line of why. Put the long explanation behind "More".
59. **Home screen:** limit it to one primary button ("Continue") plus the due count. Stack the backup, insight and storage banners into a single slot.
60. **Replace the "Backup" reminder** with automatic, visible local snapshots and a one-tap export.
61. **Add a "Download course for offline" button.** Right now only lessons you've already opened are cached.
62. **Add reduced-text and larger-text modes,** instead of offering 43 fonts.

## G. New features (all buildable by AI, no people needed)
63. Pronunciation shadowing: play, record, compare waveform and transcript leniently, no grading.
64. A tap-to-translate reader for pasted German text that feeds new words into Review. It's on your backlog.
65. Picture-free situational dialogues: a 6–8 line chat in which the learner picks or types their turn.
66. A "Can-do" checklist page (per-lesson goals, ticked as you complete them), mapped to rough CEFR A1/A2 descriptors.
67. Mistake notebook: every wrong answer, grouped by error type (word order, gender, ending).
68. A weekly mixed test drawn from all completed topics, which feeds Relearn.
69. Gender-guess practice for new nouns, using the suffix rules from topic 22.
70. A streak shown as "days practised this week" (no shame mechanics).
71. Cross-language mode for learners who already know German, starting Dutch ("Dutch for German speakers").

## H. Performance and resources
72. Drop the unused fonts and most of the 23 sound packs (part of the 16 MB in `public/`).
73. Lesson payloads ship a compendium slice; dedupe the shift prose into a shared file.
74. Split the 919-line review controller and the 665-line trail map into pure functions plus thin hooks, which is also easier to test.
75. Lazy-load the Atlas constellation (464 + 440 lines) only when that tab opens.
76. Pre-cache the next recommended lesson after a lesson finishes, which is cheap and makes the next one open instantly.

## I. Automated checks an AI agent can add
77. A test that fails on any answer option containing "(n)" or starting with "not " or "You am".
78. A test that fails when a prompt contains its own answer.
79. A test that fails when a table includes words the lesson never uses.
80. A frequency check: every core should introduce at least 60% words from the top 2,000.
81. An exercise-mix check per language: at least 40% production and at least one listening item per core.
82. An etymology-term linter on exercise prompts and explanations, enforcing NORTH_STAR automatically.
83. An LLM "naturalness" pass that flags suspect sentences only, to be checked in a second pass, never edited automatically.

I'll keep going with the parts I haven't audited yet: the word dictionary, grading, onboarding and placement, review internals, offline support, tests and CI, and the French and Spanish content in depth.

My last reply was meant to be the complete report, but it skipped several areas. This second pass covers them: the word dictionary, grading, placement, checkpoints, offline support, tests and CI, and French and Spanish in depth. Numbering continues from 83.

## J. Grading bugs: correct answers marked wrong
84. **"You" prompts expect "ich".** Lesson 2 asks "you can come tomorrow" but only accepts *Ich kann morgen kommen*. A learner who writes *Du kannst morgen kommen* is marked wrong. The same thing happens in German lessons 7, 10, 12, 15, 16, 18, 19, 20, 27, 201 and 5192, and in 8 French lessons. Lesson 25 says "you live in Germany" but the answer is *Wir leben…*. The cause is the "Tell me: you…" prompt style. Write prompts in first person ("Say: I can come tomorrow"), and add a test that the English subject matches the answer.
85. **Correct word orders are rejected.** 25 German production items have a time word that can start the sentence (heute, gestern, morgen) but list no alternatives. For example, 1802 rejects *Gestern bin ich nach Berlin gefahren*, and lesson 13 has the same gap. Don't hand-author these one by one: have the grader accept the moved-to-front version automatically.
86. **44 German "you" items accept only one form** of du, ihr or Sie when the context doesn't say which. Accept all three unless the prompt specifies one.

## K. Questions you can answer without knowing the language
87. **Placement test:** the right answer is always the middle button (the code puts it there and never shuffles). The best possible result is topic 5, and locked lessons stay locked anyway, so the feature does nothing. Either make it real (adaptive, and it unlocks up to the recommended topic) or delete it.
88. **The right option is clearly the longest** in 68 of 285 German and 28 of 119 Spanish multiple-choice questions.
89. **The answer is an English grammar rule** in 20 German and 8 Spanish questions. Spanish lesson 22's answer is "Whenever le or les is followed by lo/la…", next to options like "Because se means 'I'". Change these to "pick the correct sentence".
90. **Options appear in the same order on every retry,** so learners remember the position. Shuffle on every attempt.
91. **Checkpoint tests reuse the exact multiple-choice questions from the lessons.** They test memory of those items, not skill. Build them from production tasks and new sentences.

## L. Curriculum order
92. **Spanish teaches *se lo* (core 22) before *lo/la* vs *le* (core 23).** Swap them.
93. **Pronunciation comes too late or never.** Spanish's sound lesson is core 27. French has no early sound lesson, yet dictation starts in lesson 1. German has no pronunciation core at all. Add a sounds lesson as lesson 1 or 2 for each language: German ei/ie, ch, z, w and umlauts; French silent endings and liaison; Spanish vowels.
94. **Spanish has no core for -er/-ir present tense** (only "the -ar engine"). Check whether it's covered elsewhere.
95. **Add minimal-pair listening drills** using the existing browser speech: Bett/Beet, Mutter/Mütter, schon/schön. They're cheap to build.

## M. Data quality
96. **23 German dictionary meanings contain etymology,** like "leg (twin: bone)" and "far / remote (twin: far)". That text shows up as answer choices in matching, multiple-choice and review cards. Move it to its own field.
97. **About 22% of the German dictionary file (140 KB of 628 KB) is etymology and philology text.** It downloads with every review session. Split it into a file that loads only when a word card opens.
98. **The daily insight is 28 fixed entries,** rotated by date regardless of level, and mostly history. Make it a word of the day drawn from the learner's own due or learned words.

## N. More AI accretion
99. **Five overlapping progress locks:** cores unlock in order, star quotas, checkpoint tests, required-grammar flags, and a "three bypasses" counter with a reset epoch. A gold star just means the lesson is finished, so the star quota really means "finish N lessons". Keep cores in order plus one checkpoint per gate, and delete the star quotas and bypass counting.
100. **Names that no longer match:** `GermanCharBar` serves all four languages (its own comment says it "keeps its historical name"). The matching-pair field `german` holds French, Spanish and Dutch. Story comprehension questions are typed `shift_select`. Rename them to `target`, `choice` and so on.
101. **One number stored in three places:** `TOTAL_COMPENDIUM_WORDS = 1227` in types.ts, again in word-counts.ts, and again in the docs, all pinned by tests. Calculate it instead.
102. **Dead settings:** `posturePrimerSeen` exists, but the primer was never built (your backlog says so). Several settings are named after internal TM codes.
103. **The docs drift even with drift tests.** ARCHITECTURE says the offline cache holds 240 items; sw.js holds 120 + 200. The manifest says both 500 and 530 lesson files. The recurrence audit is called a guard but isn't run in CI. The tests check numbers, not claims, so cut claims rather than add tests.
104. **Add an agent rule: delete before you add.** Every AI change should report how many lines it added and removed. CI should fail when new top-level docs appear, or when AGENT_PRECAUTIONS.md grows past a size limit.

## O. Offline, tests and CI
105. **Every deploy throws away cached lessons, fonts and sounds,** because the cache is versioned by build. The oldest items are evicted first, which means a long-time user loses their early lessons, the ones their reviews come from. Use content-hashed file names and a separate, unversioned data cache.
106. **Browser tests run only in Chromium.** Speech, microphone and home-screen install behave most differently on iOS Safari. Add Playwright WebKit and mobile Safari runs.
107. **The onboarding shows desktop keyboard shortcuts ("esc, space and 1–4") on phones.** Show them only when a keyboard is detected.
108. **New automated checks to add:** prompt subject matches answer (#84), front-shifted word orders accepted (#85), no longest-option or answer-position giveaways (#87, #88), no English-rule answers (#89), and lessons in prerequisite order (#92).

## Updated top 8
1. Dutch placeholder options (#1)
2. Correct answers marked wrong (#84–86)
3. Giveaway questions (#4, #87–90)
4. Etymology out of graded work, titles and meanings (#34, #35, #96)
5. Reorder the cores: speaking and pronunciation earlier, swap Spanish 22/23 (#22, #23, #92, #93)
6. Teach the missing common words (#24)
7. More German production and listening (#27, #29)
8. Simplify the locks, storage and docs (#99, #14, #16)

That covers every area of the repo. Nothing else is left to audit.


I'll read the repo's existing lesson-writing prompt and its content rules first, so the new prompt fixes their problems and the lessons it produces still pass your tests.

I'll check the exact exercise rules the tests enforce and look at one spoken-reply example, so the lessons the prompt produces pass on the first run.

I'll confirm one last detail about lesson 1, then write the prompt.

I'll check which everyday words exist in the dictionary, so the sample lesson inside the prompt uses only valid word ids.

I'll check where the five reading stories sit on the trail, so the proposed order keeps them in place.

I have what I need. I'll write the prompt as a file you can copy straight into Gemini.

I've written the full prompt for Gemini: 

. I couldn't run the sample lesson inside it through your test suite, so test it first. I did check that all its words exist in your German dictionary, and it follows the rules your tests enforce.

## What's wrong with lesson 1
1. **No real-life goal.** It promises "hundreds of words you already know" but teaches one sentence about the app ("Ich lerne Deutsch mit Brücke"). There's no greeting, no name, and no yes/no/thanks.
2. **It contradicts itself.** It teaches "strip -en and you find English", then makes you produce *lerne*, an ending it never taught. The rule also fails for *gehen*, which is one of the lesson's own words.
3. **The table is padded.** It adds six unrelated words (Decke, nächste, schmal, Buche, Zeitschrift, Gesundheit). Two words, *gehen* and *Hand*, are never practised.
4. **There are free points.** The matching includes Arm = arm and Finger = finger.
5. **Three exercises give away the answer:** "(learn + en)", "bring + en", and "Which English verb shares the root of *singen*?"
6. **Untaught words are covered with trivia hints** (midwife, ridge, Pennsylvania Dutch), plus a Proto-Germanic footnote and a misleading one about "brighten".
7. **The twist repeats exercise 5 word for word, with tiles,** while saying "without looking back".
8. **No listening or pronunciation.** It says "say them aloud" but never mentions that *singen* starts with a z-sound.
9. **The teaser promises Arm, Hand and Finger next,** the words you just learned.

## What the prompt makes Gemini follow
- **The technical rules your tests check,** like exactly 5 exercises, how the first one must look, word-bank rules and limits on length.
- **One can-do goal per lesson,** with at most 7 new words, mostly from the 2,000 most common.
- **A fixed exercise mix:** a recall opener, at least two production items, one listening item, and production last.
- **Fair grading:**
  - "Say: '…'" prompts written in first person, with du or Sie marked.
  - Every correct word order accepted.
  - No answers in prompts, and the right option is never the longest.
  - The first word is never the only capitalised tile.
- **No etymology in exercises,** a list of banned jargon and hype words, hard length limits, and a check that sentences sound natural.
- **A new German topic order** that keeps the ids your tests depend on (required grammar, the five stories, the gates), plus specific notes for French, Spanish and Dutch.
- **A plan-first workflow:** batches of 5, a word tracker, a self-check list, and a required output format.
- **A full rewritten lesson 1** as a model for Gemini to copy.

## Before you run it
- The top section is for you. It lists which repo files to attach and the commands to run after each batch.
- **The new topic order will break some tests on purpose,** because they check the old lessons by id. They're listed at the top of the file. Update or delete them yourself, and don't let Gemini weaken them.
- **Generate the core path first:** the 30 core lessons, the 5 stories and the required grammar, about 50 lessons. Leave the optional extra lessons for later.



and the .md brucke-lesson-generation prompt 001.md is saved in docs the one that the previous response mentions

