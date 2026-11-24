# Muse Suggestions (Remaining Backlog)

Verified against [NORTH_STAR.md](./NORTH_STAR.md) and [USER_TESTING.md](./USER_TESTING.md). Implemented fixes, features, stale claims, and rejected proposals have been trimmed, while partially completed and open items remain tracked honestly below.

## 1. Held for Discussion & Remaining Open Work
- **"German: Your First Week" survival path (held for later discussion):** Build a short 5-session entry sequence from existing lessons, audio, and dialogues focused on everyday useful exchanges (ordering a drink, introducing yourself, making a plan) before diving deep into sound shifts.
- **Tune #18 "What's next" thresholds & trail 3-bypass counter (held for later discussion):** Unified recommendation engine (`src/lib/next-action.ts`) is shipped with defaults (5+ due cards promotes Review; 5+ unresolved mistakes shows a secondary pill). Revisit thresholds and whether to remove the hidden 3-bypass counter in `trail-map.ts` after testing in the app.
- **Adaptive / band-scored placement:** Placement unlocks earlier topics monotonically, but scoring is not yet adaptive or band-gated.
- **Article-context coverage & high-failure variants:** ~42% of German nouns have sentence-context article clozes; remaining nouns still fall back to bare-noun prompts.
- **Post-build user evaluation:** Run the five-beginner phone test in [USER_TESTING.md](./USER_TESTING.md).

## 2. Explicitly Deferred / Out of Scope
- **Full Lesson/Curriculum Rewrite (Deferred):** Reordering German cores/survival topics, 7–8 word caps, 40% production/1 listening item per core, 30 reading stories, early pronunciation cores (`docs/brucke-lesson-generation-prompt_001.md`).

---

> **Pre-patch audit notes.** These notes describe the app before the audit fixes. Use the backlog above for current status.

But the product currently feels optimized for someone who already understands and trusts the method. A true beginner gets recognition practice, etymology, and a large curriculum map before consistently getting the things they actually want: “What do I say now?”, “Was that correct German?”, and “What should I do tomorrow?”

rewrite lesson suggesiion

"German: Your First Week" survival path: Today, the first everyday useful phrase ("Ein Glas Wasser, bitte") doesn't appear until Lesson 5. Should we add a short 5-session starter path—built from existing lessons and dialogues—focused on ordering a drink, introducing yourself, and handling basic exchanges before diving into sound shifts?

-------------------------

I’m bringing in parallel reviewers for the learner journey, teaching quality, and engineering reliability. The audit will be judged from a beginner’s seat: “Can I understand this, finish it, remember it, and know what to do next?”—not just whether the code passes.

I’ll start with the project’s learning priorities and content safeguards, then trace the early curriculum from lesson content through exercises, grading, retries, and review. This will remain strictly read-only.

I’ll map the shipped learner journey against the stated promise, then trace the relevant routes and components for concrete evidence. I’ll keep the audit read-only and distinguish observed behavior from hypotheses.

The docs describe a very large learning system, but the North Star is much narrower: a finished lesson should produce usable German and a desire to continue. I’m now checking whether the first-session flow, review loop, and navigation actually deliver that, rather than merely exposing more features.

The early cores already show a tension: Brücke’s “familiar words first” promise is strong, but several production exercises require verb endings, object forms, and clause punctuation before those systems are explained. I’m checking whether this is isolated or systematic, and whether optional side lessons are doing essential prerequisite work.

# Product-direction audit

## Verdict

Brücke has a **strong learning engine but an unfocused front door**.

The authoritative promise is to teach German to English speakers, using familiar words as memory aids so learners can “read, build, say and remember some German”—and want another lesson (`docs/NORTH_STAR.md:3`). The implementation substantially supports recognition, structured production and review. It does not yet reliably turn a beginner’s first session into a useful exchange, nor establish that the method improves retention or return behavior.

The project has earned depth before distribution. Its next challenge is not adding capability; it is proving and concentrating the experience.

## Evidence versus assumptions

**Verified in the shipped implementation**

- Starting is unusually low-friction: the homepage offers “Start topic 1” immediately, with onboarding optional (`src/app/page.tsx:115`).
- Lessons have a consistent five-segment structure, exactly five graded exercises, supported retries and saved progress.
- Spaced review is mechanically serious: FSRS-4.5 scheduling, tomorrow’s first review, weak-word ordering and sentence-process replay (`src/lib/srs.ts:42`).
- Production is present, not merely multiple choice: dictation, typed sentence construction and spoken-turn replies exist.
- Progress is durable locally, without accounts or telemetry.
- German has substantial authored breadth: 30 topics, 179 lessons and 1,227 indexed words (`docs/README.md:17`, `docs/README.md:138`).

**Not established**

- That familiar-word connections produce better retention than ordinary beginner teaching.
- That completing authored lessons produces communicative ability.
- That learners return because of stars, insights or the due badge.
- That 179 lessons form the right sequence for actual beginners.
- That four courses strengthen the German product rather than divide attention.
- That SEO and shareable lesson pages generate qualified learners.

The repository’s tests protect content and mechanics, not learning efficacy. No beginner-session results are present in the reviewed materials. The prescribed validation is five observed first-time testers, including unaided production and next-day return (`docs/USER_TESTING.md:25`, `docs/USER_TESTING.md:44`).

## The beginner experience

### First session: a small win, not yet a useful one

Lesson 1’s stated outcome is recognizing infinitives and using one in a sentence. Its payoff is **“Ich lerne Deutsch mit Brücke”** (`src/data/lessons/1.ts:170`). That is real progress, but it is product-centered rather than something the learner needs in an interaction.

Lesson 2 delivers the personally useful **“Ich kann morgen kommen”** (`src/data/lessons/2.ts:158`). The first clear transaction—**“Ein Glas Wasser, bitte”**—arrives in lesson 5 (`src/data/lessons/5.ts:186`).

A skeptical learner wants to leave session one able to understand and say something worth saying: order an item, introduce themselves, or make a plan. The current sequence asks them to trust that recognition work will become communication later.

### First week: retrieval exists, but the payoff is fragmented

The ingredients are good: short lessons, repeated retrieval, tomorrow’s due queue and correction after mistakes. What is missing is a compact promise such as: **“In five short sessions, you will handle three basic exchanges.”**

The early curriculum is still organized heavily around correspondences and sound shifts. Its breadth is valuable, but the learner needs situations and successful outputs to organize that knowledge. Personalization does not currently change lesson content or difficulty; goals are reminders and daily minutes mainly adjust review budget (`src/components/common/LearningPreferences.tsx:17`).

### Real communication: partial support

The app teaches more than pattern recognition. It includes listening, typed production and conversational replies. However

- Only three German lessons use `spoken_turn_reply`, all much later: 1301, 1901 and 2401.
- Practice dialogues default to “Pick reply,” always show English, and follow authored scripts (`src/components/practice/DialoguePractice.tsx:28`, `src/components/practice/DialoguePractice.tsx:242`).
- Typed dialogue acceptance is authored-variant word overlap, not open-ended understanding (`src/lib/practice-studio.ts:1043`).
- Reading Lens highlights known, course and unknown words, but does not translate unknown words or check comprehension.
- Shadowing and dialogues do not feed durable lesson or review progress.

This is good **constrained production**, not yet evidence of spontaneous communication.

### Returning tomorrow: the strongest existing signal is the due badge

New words correctly join review the next day, and the Review hub explains the empty day-zero state clearly (`src/components/review/ReviewDeckSelector.tsx:119`). That is a credible habit trigger.

But the lesson summary primarily promotes the next lesson and Atlas exploration, without explicitly connecting completion to tomorrow’s review (`src/components/lesson/segments/SummarySegment.tsx:35`, `src/components/lesson/segments/SummarySegment.tsx:114`). Progress feedback is also inconsistent: seen-word and star counters are desktop-only (`src/components/navigation/TopNav.tsx:128`), while the Daily Insight is an etymology card hidden on phones (`src/components/common/DailyInsightCard.tsx:125`).

## Over-built versus under-built

**Over-built relative to the North Star:** four courses, two atlases, 12 review decks, 179 German lessons, 187 themes, 43 fonts and extensive settings (`docs/README.md:163`, `docs/README.md:194`). These should mostly be preserved as optional depth, not expanded.

**Under-built:** the first useful exchange, unaided output, transfer beyond authored frames, one obvious daily action, durable practice results, learner validation and distribution.

German focus is diluted by equal four-language onboarding and metadata (`src/components/common/OnboardingModal.tsx:168`, `src/app/layout.tsx:10`), while Dialogues, Gender Lab and Can-do are German-specific. The About page also claims learners bridge “thousands of cognates in days,” without supporting efficacy evidence (`src/app/about/page.tsx:77`).

## The next three product bets

### 1. Build a German “first-week survival path” from existing assets

Do not rewrite the trail. Create a short entry sequence that reuses current sentences, audio, exercises and dialogues around three outcomes

1. Order or request something.
2. Introduce yourself and make a plan.
3. Understand a simple question and answer it.

Each session should end with one **no-tiles, no-hint production**, followed by a small variation the learner has not seen verbatim. Cognate explanations should support the exchange, not become its purpose.

**Success criteria:** median time to first productive response under eight minutes; at least 4/5 observed beginners produce the target sentence unaided immediately and next day; at least 4/5 can state what they can now do; at least 70% complete four of the first five sessions.

### 2. Make “Today” the product

Unify the existing recommendation, due review and one short transfer task into a single daily plan. On lesson completion, say exactly what becomes reviewable tomorrow. Persist dialogue and shadowing outcomes into review or the mistake notebook. Put one meaningful progress signal on mobile—such as “you can now do three things”—rather than only stars and etymology.

**Success criteria:** at least 80% of returning testers start the intended action within 15 seconds; at least 50% return voluntarily on day two without notifications; at least 70% complete their chosen review budget; at least 4/5 can explain their next action after finishing a lesson.

### 3. Validate German-first positioning and distribution before adding infrastructure

Lead with German everywhere; retain other languages behind a secondary switch. Turn the canonical first-lesson page into a shareable demonstration of the survival-path outcome. Run the five prescribed observed sessions first, fixing repeated breakdowns before instrumenting anything. Then distribute that URL to a narrowly defined audience—English-speaking beginners preparing for travel, work or relocation to Germany.

Sitemap, canonical lesson routes and Open Graph assets already exist (`src/app/sitemap.ts:7`). Marketing and outreach, not another discovery system, are the missing distribution work (`docs/ideas to add in future/open-ideas.md:38`).

**Success criteria:** five completed observations; fixes only for breakdowns repeated by at least three learners; then, among 30 qualified visitors, at least 30% finish the first productive task and 25% voluntarily return on day two, with recorded reasons for both behaviors.

## Do not build yet

- Accounts, cloud sync or cross-device recovery.
- An AI tutor or open-ended conversation engine.
- More languages or substantially more content.
- More themes, fonts, review decks or export formats.
- Push notifications, heavy streaks or additional gamification.
- Adaptive-difficulty or CEFR claims before performance is measured.
- More etymology depth or citation work.

The immediate opportunity is to make Brücke’s existing depth produce a visible, useful German win—and then prove that someone comes back for it.

Read-only audit; no files were changed and no builds were run.

# Brücke first-time UX and accessibility audit

**Method:** Static code and test review only. No browser, screen reader, device testing, or build was run, and no files were changed. “Verified” below means directly established from source; actual learner and assistive-technology impact is explicitly separated.

## Overall assessment

The core learning loop is unusually strong: one clear recommended lesson, short segmented lessons, persistent retry queues, explanatory feedback, and a shared recommendation policy across Trail, Summary, and Review. Native `<dialog>` focus trapping, inert backgrounds, isolated keyboard shortcuts, offline recovery, and local progress protection are solid foundations.

The main weakness is **accessibility continuity between states**: language semantics, focus, announcements, and some control labeling. The main UX uncertainty is whether the trail’s vocabulary and simultaneous navigation choices help or overwhelm a genuine beginner.

## Verified issues

### High

1. **German prose is exposed under an English document language.**  
   The root is permanently `lang="en"`, while the lesson article and substantial German-containing prose have no language override. Screen readers can therefore apply English pronunciation rules to German text.  
   Evidence: `src/app/layout.tsx:53`, `src/components/lesson/LessonReader.tsx:24`, `src/components/lesson/segments/HookSegment.tsx:42`, `src/components/lesson/segments/PatternSegment.tsx:205`, `src/components/lesson/segments/SummarySegment.tsx:37`.  
   Individual inputs and some review fronts are correctly tagged, so this is inconsistent rather than absent throughout.

2. **Normal lesson advancement and review grading do not reliably preserve focus or announce the new task.**  
   Continuing success closes the feedback sheet and immediately advances. The next exercise is remounted with a different key, while modal cleanup restores focus only if the original opener remains connected. Retry errors explicitly restore input focus, but ordinary successful advancement does not.  
   Evidence: `src/components/lesson/ClassicExercise.tsx:225-230`, `src/components/lesson/segments/PracticeSegment.tsx:159-160`, `src/components/common/ModalDialog.tsx:113-126`.  
   Review similarly increments the card without moving focus or announcing it; only typing mode auto-focuses. The card counter and revealed answer are not live.  
   Evidence: `src/components/review/review-grading.ts:123-136`, `src/components/review/use-review-answers.ts:173-181`, `src/components/review/ReviewSessionCard.tsx:29-31`, `src/components/review/ReviewSessionCard.tsx:275-286`.

3. **The visible Review Exit control is not keyboard-operable through the control itself.**  
   It has `tabIndex={-1}` and suppresses Enter/Space. Escape is an alternative, but revealed-card “quick restart” can consume the first Escape.  
   Evidence: `src/components/review/ReviewSessionCard.tsx:119-131`.

### Medium

4. **Some important inputs and settings lack explicit programmatic labels.**  
   Review typing uses placeholder-only identification; Settings search does the same. Placeholder text is fragile as an accessible name and disappears during entry.  
   Evidence: `src/components/review/ReviewAnswerEntry.tsx:170-201`, `src/app/settings/page.tsx:178-185`.  
   Settings rows also do not associate controls with their visible title/description, so direct control navigation can lose context.  
   Evidence: `src/components/settings/SettingItem.tsx:25-49`.

5. **Onboarding starts on Skip and does not manage focus or announcements between steps.**  
   No initial-focus target is supplied, so the shared modal focuses its first enabled button. Step content changes without focusing the new heading or announcing the step. Pointer-only progress dots are 6px high and hidden from assistive technology.  
   Evidence: `src/components/common/OnboardingModal.tsx:132`, `src/components/common/OnboardingModal.tsx:159-283`, `src/components/common/OnboardingModal.tsx:355-368`.  
   It also visibly promises “an sm-2 review queue” despite the FSRS implementation: `src/components/common/OnboardingModal.tsx:329`.

6. **Touch sizing is inconsistent.**  
   Several controls are line-height-only or roughly 28–32px high: section navigation, lesson revisit controls, Back, previous problem, review tiles, and dialogue audio.  
   Evidence: `src/components/navigation/SectionSubNav.tsx:65-69`, `src/components/lesson/ProgressBar5.tsx:60-73`, `src/components/lesson/segments/PatternSegment.tsx:242-249`, `src/components/lesson/segments/PracticeSegment.tsx:212-230`, `src/components/review/ReviewAnswerEntry.tsx:123-154`.  
   These are below the 44px platform recommendation; whether they fail WCAG’s 24px target-size requirement depends on spacing and needs browser measurement.

7. **Practice Studio has an incomplete ARIA tab pattern and weak failure states.**  
   Tabs lack IDs, `aria-controls`, arrow-key/roving-tabindex behavior, and associated tabpanels. Weekly Test shows a load error without Retry or alert semantics. Gender Guess Lab returns `null` when its deck is unavailable, potentially leaving a blank panel during loading or failure.  
   Evidence: `src/app/practice/page.tsx:65-100`, `src/components/practice/WeeklyMixedTest.tsx:64-70`, `src/components/practice/GenderGuessLab.tsx:41-45`, `src/components/practice/GenderGuessLab.tsx:93`.

8. **Progress and completion wording overstates what has been demonstrated.**  
   The lesson bar is already 80% full when Practice begins. Summary says “lesson mastered” for lesson completion, while CEFR can-do items are checked from lesson completion rather than independent performance.  
   Evidence: `src/components/lesson/ProgressBar5.tsx:27-44`, `src/components/lesson/segments/SummarySegment.tsx:127-130`, `src/app/cando/page.tsx:79`.

9. **The completion-to-review loop is unnecessarily hidden.**  
   Bottom navigation disappears during lessons; Summary offers Next and Atlas, but no direct Review action. A learner must infer that newly learned words should be reviewed elsewhere.  
   Evidence: `src/components/navigation/BottomNav.tsx:38-40`, `src/components/lesson/segments/SummarySegment.tsx:114-160`.

10. **Mistake removal is destructive without adequate confirmation or feedback.**  
    Clearing a group is immediate; resolving removes the row without undo or live confirmation and can discard focus when the button unmounts.  
    Evidence: `src/components/common/MistakeNotebook.tsx:172-178`, `src/components/common/MistakeNotebook.tsx:214-221`.

## Risks requiring browser or novice testing

- **First-run competition:** the hero, fixed next-lesson bar, bottom dock, mistake link, full trail, eight-item legend, and daily insight coexist. The hero and fixed bar both invite starting lesson 1. See `src/app/page.tsx:115-171` and `src/components/trail/TrailMap.tsx:208-248`.
- **Mental-model fit:** “Learn / Review / Explore / Me” leads to atlas, panorama, read, practice, can-do, and mistakes; lessons add “Core Shift,” “Sprig,” “reinforcement,” and “transformation table.” Whether beginners understand these categories is unknown.
- **Mobile duplication:** inline actions and a fixed sticky action can both be visible. Test accidental taps, obscured content, and which action appears primary.
- **Shared-link surprise:** opening another language’s lesson switches the active course and automatically completes onboarding. This is verified behavior; whether it feels helpful or disorienting needs testing. See `src/lib/app-navigation.ts:37-45`.
- **Review discovery and return:** do novices find Review after finishing, understand retries, and voluntarily return? Advanced terminology is largely collapsed, which is promising.
- Test real-device accuracy for small controls, two-column matching, inline Reading Lens words, long trails, and narrow layouts.

## What the tests establish—and miss

Coverage is strong for keyboard task completion, accessible exercise names, input `lang`, modal isolation, retry persistence, scheduling, offline reload/resume, Search empty/error/retry states, and mobile overflow on several routes.

However, the “fresh learner” Lesson 1 test seeds a returning learner and explicitly tabs to the next input after feedback, masking focus loss: `tests/e2e/product-quality.spec.ts:31-38`, `tests/e2e/product-quality.spec.ts:57-88`. Mobile tests check a 40px lesson CTA and 43px dock, not all targets: `tests/e2e/mobile.spec.ts:78-143`. No test uses a real screen reader, verifies post-feedback focus, audits language semantics, or observes five genuine first-time users.

## Highest-impact next changes

1. **Fix accessibility continuity first:** language-tag lesson content, explicitly label Review/Settings inputs, manage focus and live announcements after feedback/reveal/grade, and restore native Exit operability.
2. **Make the first loop singular:** subordinate or remove the duplicate first-run start prompt; add “Review these words” to Summary; show problem-level practice progress; replace “mastered” and automatic can-do claims with honest completion wording.
3. **Reduce friction without redesigning:** retain collapsed advanced decks, make secondary touch controls consistently usable, complete the Practice tab semantics, and give every secondary tool an explanatory loading/error state.
4. **Run the existing five-novice protocol before structural changes**, adding screen-reader and focus assertions to the browser suite. Measure Review discovery, retry comprehension, terminology, shared-language links, and mobile action selection rather than guessing.

# Brücke learner-reliability audit

Read-only audit completed; no files were changed. Builds, tests, and dependency advisory checks were not run, per instruction. Findings below are confirmed by code paths unless identified as risks.

## Bottom line

The core lesson and review mechanics are unusually well defended: boot hydration avoids default-state overwrites, retries survive reloads, review undo is version-aware, and canonical static routes reject unknown IDs. The largest reliability gaps are **storage recovery, the offline “full course” promise, and backup/import behavior**. Device loss remains unrecoverable without an external JSON backup.

## Confirmed bugs and high-impact limitations

1. **High — corrupt storage can silently become an empty profile and then be overwritten.**  
   Invalid JSON returns `null`, indistinguishable from missing or blocked storage: `src/lib/store/persistence.ts:37-54,73-126`. A valid preferences-only cookie can therefore hydrate empty progress while preserving onboarding flags. Boot hydration then immediately writes that state back: `src/lib/store/hydration-slice.ts:167-176`. The learner sees lost progress with no corruption warning or recovery opportunity.  
   **Remediation:** distinguish absent, blocked, malformed, and schema-invalid storage; quarantine the original payload; show a persistent recovery banner; require an explicit choice before overwriting it.

2. **High — the cookie fallback does not preserve normal-sized progress.**  
   When localStorage fails, progress is written to the cookie only if its encoded form is at most 2048 bytes; otherwise only preferences/reset metadata survive: `src/lib/store/persistence.ts:276-313`. Thus blocked storage loses all progress from first use, while a transient quota failure can restore an older localStorage snapshot and lose every newer review. The banner states that progress is not being saved, but storage health only reflects the current write attempt: `src/components/common/StorageWarningBanner.tsx:12-25`, `src/lib/storage-health.ts:9-20`.  
   **Remediation:** use IndexedDB or another durable browser store for progress, retain cookies only for preferences, persist a durability-failure marker, and surface it on subsequent boots.

3. **High — “download full course for offline” does not download the lesson application code.**  
   The downloader caches only indexes, compendium, word details, and lesson JSON: `src/lib/offline.ts:38-86`. Lesson and exercise components are lazy chunks: `src/components/lesson/LessonReader.tsx:13-17`. A learner who downloads before first opening practice can still go offline and fail to load the lesson UI, despite the promise at `src/components/settings/LocalDataControls.tsx:71`.  
   **Remediation:** prefetch the complete route/chunk dependency graph or change the feature and copy to “lesson data only; open lessons online once.”

4. **Medium — downloaded courses become stale after content updates without any warning.**  
   Downloads use content-hash URLs but share one static cache: `src/lib/offline.ts:51-69`. The worker matches exact requests, so a new content hash will not find the old download: `public/sw.js:123-146`.  
   **Remediation:** key course caches by content version, record downloadable-version metadata, prune old versions, and show “update required” in Settings.

5. **Medium — canonical lesson URLs have no service-worker offline-navigation handling.**  
   The handled route set excludes `/trail/[lang]/[id]`: `public/sw.js:8-19,105-108`. Online canonical routes are correct and static, but direct offline navigation is not guaranteed a cached shell or fallback.  
   **Remediation:** handle canonical lesson navigations explicitly and test visited canonical URLs offline.

6. **High — imports can create unusable lesson/review state while reporting complete success.**  
   Validation accepts any positive lesson ID and any nonnegative `practiceIndex`, without checking the authored exercise count: `src/lib/store/schema.ts:98-139`. An oversized index makes `currentExercise` undefined and renders no practice widget: `src/components/lesson/use-lesson-session.ts:300-304`, `src/components/lesson/LessonReader.tsx:117-119`. SRS IDs are also unrestricted, and due cards absent from current content cannot render: `src/lib/store/schema.ts:499-509`, `src/app/review/page.tsx:179-183`. Mixed valid/junk imports still return success and claim everything was restored: `src/components/settings/DangerZoneSettings.tsx:71-79`.  
   **Remediation:** validate against the current course catalog, strictly validate calendar dates, clamp or repair positions, quarantine orphaned cards, and return an import preview/report of dropped or repaired entries.

7. **High — importing progress in one tab can discard newer progress in another.**  
   Every progress-bearing import advances a global reset epoch, even a partial import merged into existing state: `src/lib/store/backup-slice.ts:231-248,273-276`. Another tab treats that epoch as wholesale replacement and discards its local snapshot; pending saves are cancelled during rehydration: `src/lib/store/hydration-slice.ts:22,52-83`.  
   **Remediation:** separate deletion epochs from import epochs, use a three-way merge against the backup’s base snapshot, and warn when other tabs are open.

8. **Medium — replay completion and twist reinforcement are not fully durable.**  
   `autoCompletedRef` latches after the first summary and is not reset when replay starts: `src/components/lesson/use-lesson-session.ts:214-225,242-267`. A second run can reach summary without automatically recording completion or a perfected star. Twist “meet again” state is explicitly memory-only: `src/components/lesson/use-lesson-session.ts:57-61,145-155`.  
   **Remediation:** reset completion guards per run and persist pending twist resurfacing.

## Fragile design

- **High, deliberate:** progress is browser-local only; installation, persistent-storage requests, and offline caches do not protect against device loss or browser-data deletion: `docs/ARCHITECTURE.md:308-312`. JSON backup is the sole recovery path. Provide a clearer recovery workflow and consider optional user-controlled encrypted sync.
- **Medium:** backup schema `version` is exported but neither app/content build versions nor import-version compatibility checks exist: `src/lib/progress-backup.ts:14-33`, `src/lib/store/backup-slice.ts:120-144`. This contradicts `docs/ARCHITECTURE.md:269-275` and makes future/downgraded content risky.
- **Medium:** every changed versioned map is compared entry-by-entry with `JSON.stringify`, then the entire multilingual profile is serialized: `src/lib/store/persistence.ts:176-185,228-253`. Large SRS stores may cause main-thread jank. Track changed keys directly and consider incremental/IndexedDB persistence.
- **Medium:** application CSP and HSTS are absent; only the service worker receives CSP: `next.config.mjs:61-90`. Deployed protection depends on hosting. Add an application CSP with nonce/hash support and verify HSTS at the deployment layer.
- **Low:** diagnostics are mostly transient or swallowed: `src/app/error.tsx:16-18`, `src/components/common/OfflineSupport.tsx:51`, `src/lib/review-session.ts:228-234`. Add a privacy-preserving local diagnostics/export panel rather than telemetry.

## Untested risks

- No real-browser coverage for corrupt-storage recovery, quota exhaustion followed by recovery, or oversized-cookie progress loss; current tests primarily use storage mocks.
- No production E2E for “download full course before first lesson,” offline canonical URLs, or reopening after a content-version update. Existing offline coverage correctly opens practice online first: `tests/e2e/local-first.spec.ts:6-69`.
- Review sessions allow 5000 cards plus undo snapshots and synchronously serialize them; failures are silent: `src/lib/review-session.ts:12,228-234`. Actual sessionStorage quota behavior is untested.
- Cross-tab versions use millisecond timestamps plus random actor suffixes, so same-millisecond conflicts are resolved arbitrarily rather than causally: `src/lib/store/persistence.ts:216-220`.
- CI has strong unit/content/SSG/Chromium coverage, but no dependency audit, bundle budget, Lighthouse, Firefox, or WebKit job: `.github/workflows/ci.yml:29-88`. Local Playwright may also reuse a stale server: `playwright.config.ts:41`.

## Prioritized next steps

1. **P0:** make progress durability observable and recoverable; quarantine corrupt data and add a real durable fallback.
2. **P0:** either implement complete versioned offline downloads or accurately narrow the current promise.
3. **P1:** harden backup/import validation, version compatibility, and multi-tab merge semantics.
4. **P1:** add regression tests for replay completion, twist reloads, malformed restored positions, orphaned SRS IDs, and import races.
5. **P2:** add deployment-header verification, local diagnostics, performance budgets, dependency auditing, and Safari/Firefox offline coverage.

# Brücke learning-design audit

## Verdict

Brücke is a strong **recognition and pattern-noticing course**, but not yet a dependable route from beginner to usable German. Its central problem is not missing features: it is **sequencing, contradictory instruction, and overstated production**. Beginners are asked to use grammar before it is taught, sometimes taught the wrong rule, and then rewarded in ways that do not demonstrate independent control.

The next investment should be a correctness pass, self-contained early lessons, and one honest recall loop—not more etymology or more lessons.

I inspected all core and sprig lessons for topics 1–8, sampled later cores and stories, read the required grammar, inventoried 179 lessons/895 exercises, and traced grading, retries, SRS, and sentence review. This was read-only.

## What already works

- The North Star correctly prioritizes understanding, remembering, and using German over etymology.
- Required grammar is generally explicit and bypass-immune: reflexives, modal pasts, adjective declension, imperatives, Konjunktiv II, relatives, and `als`/`wenn`/`ob` form a coherent later spine.
- Stories such as `9001` and `9002` provide cohesive, mostly natural reading after their principal grammar prerequisites.
- Optional table vocabulary is visually separated from focus words.
- Retry queues, scaled cues, “walk me through it,” sentence cards, and typed review are genuinely useful foundations.

## Verified defects

### High: the core path assumes knowledge it does not reliably teach

A beginner reaching lesson 1’s final item must produce `Ich lerne Deutsch mit Brücke`, including `ich -e`, before the dedicated conjugation topic. The word bank supplies `lerne`, but the initial recall-first attempt hides that bank; this tests guessing or prior knowledge rather than taught conjugation.

The same pattern recurs: lesson 6 requires `Was machst du...` before the conjugation circuit, and lesson 8 requires `nicht` before the dedicated negation topic. Core 2 also recalls `warnen` and `hungern`, introduced in skippable sprig 103. Yet the authored spine deliberately excludes sprigs.

**Beginner scenario:** A learner skips the optional side path, reaches core 2, and sees `Wir müssen warnen`. They can perhaps infer “warn,” but the app has not taught the word or given a retrieval-friendly reason to remember it.

Evidence
- `src/data/lessons/1.ts:136-167`
- `src/data/lessons/6.ts:149-186`
- `src/data/lessons/8.ts:161-195`
- `src/data/lessons/2.ts:112-124`
- `src/data/lessons/103.ts:10-17`
- `src/data/curriculum-core.ts:29-39`

### High: incorrect comma instruction is taught, then accepted

Lesson 3 explicitly says there is **no comma** between `Ich hoffe` and `du hast Lust`; its own summary supplies the comma. Lesson 302 repeats the problem. Required grammar later repeats it: the final targets in 5081, 5101, and 5111 omit clause commas while their meanings, affirmations, or explanations require them.

The grader removes every internal comma before comparison, so the incorrect production passes.

**Beginner scenario:** A learner types `Ich hoffe du hast Lust`, receives success, then sees `Ich hoffe, du hast Lust` in the summary. The app appears arbitrary; worse, the learner has practised an incorrect written form.

Evidence
- `src/data/lessons/3.ts:168-196`
- `src/data/lessons/302.ts:158-186`
- `src/data/lessons/5101.ts:164-168`
- `src/data/lessons/5111.ts:152-177`
- `src/lib/letter-diff.ts:321-332`

### High: several explanations teach false mental models

Lesson 601 tells the learner to anchor `Zunge` in position 2, although `Die Zunge` is the whole first-position subject phrase and `findet` is the verb in position 2. Lesson 701 says `Dampf` changes initial D to T even though the word retains D. Lesson 302 asks for `drape` as the English twin of `treffen`, despite presenting `treffen` as “meet/strike.”

**Beginner scenario:** A learner generalizes the 601 cue and starts treating the second noun as the verb position, or learns `treffen = drape` as a usable meaning. Both are durable misconceptions.

Evidence
- `src/data/lessons/601.ts:154-185`
- `src/data/lessons/701.ts:55-59`
- `src/data/lessons/302.ts:147-151`

### High: guided success is too easily mistaken for production

Across 895 exercises, 613 are matching, shift selection, derivation, or reverse-cognate items—about 68%. Only 14 are dictation and three are spoken-turn replies. Most lessons therefore offer extensive recognition practice but little listening or speaking retrieval.

Final recall items do hide the word bank, which is good, but vocabulary clues remain visible. Sentence-review replay uses the ordinary widget without `recallFirst`, so review can be easier than the original failure.

**Beginner scenario:** A learner types the final sentence by assembling visible clues, passes, and cannot produce it the next day without those clues. The app records success, but the evidence only supports recognition and assembly.

Evidence
- `src/components/lesson/TranscribeExercise.tsx:149-217`
- `src/components/review/SentenceReviewDeck.tsx:71-88`
- Inventory of `src/data/lessons/`

### Medium: feedback is thin and sometimes falsely labelled

Only 29 of 895 exercises contain authored diagnosis. Fallback diagnosis mainly identifies word order, a wrong bank word, or a phonological shift. For an English-prompt error without a shift rule, the interface defaults to the badge **“Consonant Shift.”**

**Beginner scenario:** A learner mishandles verb-final order or an adjective ending and is told “Consonant Shift.” That feedback sends them back to the wrong concept.

Evidence
- `src/lib/exercise-grading.ts:17-36`
- `src/components/lesson/ErrorFeedbackSheet.tsx:107-116`

### Medium: stated outcomes often exceed what is assessed

Lesson 301 promises practice inside a modal bracket, but its final sentence contains no modal. Lesson 401 promises saying what you like, showing `Ich mag das Kleid`, while all final production is `Ich danke dir`. Lesson 24 promises `-er/-ste` production, but the sampled production practises comparatives, not a superlative.

**Beginner scenario:** A learner finishes believing they can express preference or build a superlative, then discovers they have only recognised the forms or copied a frame.

Evidence
- `src/data/lessons/301.ts:173-203`
- `src/data/lessons/401.ts:167-196`
- `src/data/lessons/24.ts:163-167`

### Medium: “optional” vocabulary becomes mandatory review load

The table calls extra words optional and says they need not be memorised. On completion, however, every `table_word_ids` entry is seeded into SRS alongside focus words.

**Beginner scenario:** A learner ignores the collapsed extras, finishes lesson 1, and tomorrow receives review cards for six words the lesson explicitly said were optional. Optionality feels false, and review load grows unnecessarily.

Evidence
- `src/components/lesson/segments/TableSegment.tsx:101-119`
- `src/components/lesson/use-lesson-session.ts:196-207`

### Medium: broad rules are presented as safer than they are

The course says English D systematically becomes German T, despite its own `Dampf` example; says German spells as it sounds with one sound per vowel letter; and implies every English `-ate`/`-ize` verb already has a German `-ieren` counterpart.

**Beginner scenario:** A learner treats these as productive algorithms, invents a German word, or misreads an unfamiliar spelling. Pattern recognition becomes overconfidence.

Evidence
- `src/data/lessons/7.ts:206-212`
- `src/data/lessons/701.ts:55-59`
- `src/data/lessons/6.ts:62-65`
- `src/data/lessons/801.ts:48-63`

## Hypotheses requiring beginner testing

These are plausible, but not proven by code inspection

- **Vocabulary load:** the eight cores contain 77 unique focus words; all 25 early core/sprig lessons contain 149. That may be reasonable, excessive, or uneven. Test the actual skip path rather than assuming a number.
- **Monotony:** the repeated four-recognition-plus-one-production rhythm may feel busy without producing fluency.
- **Illusory mastery:** visible clues may make learners feel more capable than they are until an unhinted next-day attempt.
- **Motivation:** sentences such as “Die Zunge findet den Kuchen süß” may be memorable grammar vehicles, but could also feel unnatural and irrelevant.
- **Story transfer:** stories may produce supported comprehension rather than unaided retelling.
- **Curriculum balance:** the sound-shift organising principle may crowd out high-frequency communicative German.

## Prioritised recommendations

1. **P0 — Correct the German and add regression tests.** Fix the comma instruction and targets, the 601 V2 cue, the `Dampf` explanation, and the `treffen` meaning exercise. Make authored targets, cues, meanings, and summaries agree. Keep tile grading comma-insensitive if necessary, but do not teach punctuation and then erase it from transcription grading.

2. **P1 — Make the early core path self-contained.** Either teach the minimum grammar before requiring it or use taught chunks. Core lessons must not depend on skippable sprigs. Introduce `du` endings, basic V2, negation, and accusative determiners before asking learners to retrieve them.

3. **P1 — Reuse existing infrastructure for honest transfer.** Require one genuinely unhinted final recall per lesson, with help available only after an attempt. Replay failed sentence cards under the same conditions. Add a small number of meaning-to-listening and meaning-to-speaking checks rather than more recognition variants.

4. **P2 — Repair feedback and retention.** Replace the default “Consonant Shift” label with neutral feedback or an exercise-specific diagnosis. Author diagnosis for final production items. Seed only focus words into SRS unless the learner explicitly opts into extras.

5. **P2 — Run the documented five-beginner test.** Observe immediate and next-day unaided production, including the sprig-skipping path. Measure whether learners can produce, understand, and self-correct—not whether they liked the lesson.

**Bottom line:** preserve the required grammar, stories, retry system, and typed review. The project’s next breakthrough should be making success mean “the learner can use this German,” not merely “the learner completed the widget.”

The first pass found a meaningful gap: the app is mechanically impressive, but some “success” states reward recognition and guided assembly more than independent German use. I’m verifying the most serious content and reliability findings now, then I’ll test the real first-run flow in a browser.

The browser pass exposed a concrete first-run problem: on a fresh homepage, Topic 1 is roughly 8,200 pixels below the top, while the first visible map nodes are locked Topics 27–30. The “Start” button works, but the map itself presents the end of the course before the beginning.

The full Lesson 1 path works, but the handoff is telling: it ends on “lesson mastered” and Next Lesson, with no direct review action. The final recall also keeps vocabulary clues on screen, so “produced it” does not necessarily mean “retrieved it independently.”

# Audit verdict

**Brücke has a strong learning engine, but an unfocused beginner experience.** The cognate-and-sound-shift method is genuinely distinctive, the lesson structure is coherent, and the engineering is unusually careful for a local-first app.

But the product currently feels optimized for someone who already understands and trusts the method. A true beginner gets recognition practice, etymology, and a large curriculum map before consistently getting the things they actually want: “What do I say now?”, “Was that correct German?”, and “What should I do tomorrow?”

**The next need is not more content. It is trust, immediate usefulness, and a daily loop that produces independent German.**

## What is already working

- **The teaching model is memorable.** Hook → Pattern → Table → Practice → Summary gives each lesson a clear rhythm.
- **The app rewards understanding rather than pure memorization.** English cognates and sound correspondences can make German feel decodable instead of arbitrary.
- **Mistakes are treated as part of learning.** Retries, reinforcement, “I guessed — bring this one back sooner,” and review undo are thoughtful features.
- **Local-first is a good foundation.** No account wall, durable browser progress, JSON backup, browser-native pronunciation, and static delivery all fit the product.
- **The core loop is well tested.** Keyboard lesson completion, reload recovery, retry persistence, review behavior, mobile navigation, and most exercise types have real browser coverage.

# The experience from a new learner’s perspective

## 1. The promise is excellent, but the first win comes too late

“You already know more German than you think” is a strong opening. The problem is that the first lessons primarily teach the learner how Brücke works.

The first clearly transactional phrase, **“Ein Glas Wasser, bitte,” does not arrive until Lesson 5** in [Lesson 5](src/data/lessons/5.ts).

A beginner usually wants to order something, greet someone, ask for help, or say “I don’t understand” before learning why *water* became *Wasser*.

**Recommendation:** let the first session produce a useful phrase within two minutes, then reveal the linguistic method as the explanation for why that phrase was easy to learn.

## 2. “I can finish the lesson” currently means more than “I can use German”

Lesson 1 contains ten focus words plus six optional table words. Its final sentence is

> Ich lerne Deutsch mit Brücke.

The word bank supplies *lerne*, but the learner has not received a systematic lesson on personal verb endings. The pattern also overgeneralizes that stripping *-en* reveals an English word.

Similar sequencing pressure appears earlier: Lesson 2 uses *wir müssen* and *wir können* before their support branch, while Lessons 6 and 8 use *machst* and *funktioniert nicht* before their dedicated topics. These are scaffolded, so they are not catastrophic, but they rely on inline hints rather than secure prior understanding.

The final recall also explicitly says

> Vocabulary clues stay available below.

That is humane, but it is **assisted production**, not independent retrieval. See [TranscribeExercise](src/components/lesson/TranscribeExercise.tsx).

## 3. The curriculum teaches recognition much more than production

Across 179 lessons, I counted

- 895 exercises
- 285 shift-selection exercises
- 173 matching exercises
- 113 sentence builders
- 60 transcription exercises
- 14 dictation exercises
- Only 3 spoken-turn reply exercises
- Only 29 exercises with authored diagnosis

That is a strong recognition foundation, but not yet a dependable route to saying or writing German spontaneously.

The problem is amplified in review: [SentenceReviewDeck](src/components/review/SentenceReviewDeck.tsx) replays sentence exercises without preserving the original `recallFirst` condition. A learner can fail an independent-recall task, then review it under easier conditions.

## 4. Error feedback can teach the wrong mental model

Only 29 of 895 exercises have authored diagnosis. When an English-prompt error has no shift rule, [ErrorFeedbackSheet](src/components/lesson/ErrorFeedbackSheet.tsx) displays

```tsx
{shiftRule || "Consonant Shift"}
```

That means a grammar or word-order mistake can be labeled as a consonant-shift mistake.

For a beginner, this is worse than generic feedback. It actively attaches the wrong explanation to the error.

## 5. The end of a lesson does not tell the learner what to do next

The Summary says **“lesson mastered ✓”** and primarily offers **Next Lesson**. There is no direct “Review these words now” action in [SummarySegment](src/components/lesson/segments/SummarySegment.tsx).

Meanwhile, [the Cando page](src/app/cando/page.tsx) says topic completion automatically ticks CEFR can-do descriptors.

That overstates the evidence. Completing guided exercises does not establish that a learner can perform the skill independently, in a new context, or tomorrow.

**Better language:**

- “Lesson complete”
- “These words are ready for review”
- “Recognized with help”
- “Produced independently”
- “Can-do evidence: not tested yet”

# Verified defects to fix before adding features

## P0 — German correctness and grading

[Lesson 3](src/data/lessons/3.ts) explicitly teaches

> Ich hoffe du hast Lust

Its cue says there is no comma, but its own Summary and Twist use

> Ich hoffe, du hast Lust.

The Twist correctly explains that two clauses require a comma.

Worse, [letter-diff.ts](src/lib/letter-diff.ts) removes internal commas before grading, so the incorrectly taught answer passes.

Related verified content problems

- Lesson 302 repeats the no-comma error.
- Lesson 302 presents *drape* as the modern English twin of *treffen*, which trains a misleading meaning.
- Lesson 701 says *Dampf* undergoes D → T even though the word visibly retains D.
- Lesson 601’s verb-position labels can reinforce the wrong verb-second model.

**This is release-blocking.** A language app cannot ask learners to trust its patterns while teaching incorrect German.

## P0 — Misclassified mistakes

Replace the fallback “Consonant Shift” label with a neutral message such as “Check the sentence pattern,” or introduce a real diagnosis taxonomy

- Sound shift
- Word order
- Grammar
- Article or case
- Spelling
- Vocabulary choice

Do not pretend to have a diagnosis when none was authored.

## P1 — The homepage misses its own performance budget

The production browser suite failed twice on simulated 4G with 4× CPU throttling

- First run: **11.49 seconds**, budget 8 seconds
- Isolated rerun: **12.11 seconds**, budget 8 seconds

The transferred data was not the problem

- Homepage: about 315 KB compressed
- Homepage plus usable Lesson 1: about 409 KB
- Lesson 1 payload: 4.5 KB compressed

The bottleneck is therefore likely hydration, script execution, or unnecessary early work rather than content download size. The exact cause needs profiling. See [the performance test](tests/e2e/product-quality.spec.ts).

This matters because the homepage is the first impression, especially on mid-range phones.

## P1 — A fixed card blocks the primary action at tablet widths

At **819×748**, the fixed Etymology card covers the fixed **Start** button. Both use `z-index: 30`, and the card sits above the button.

Keyboard activation still works, but pointer users cannot click through it. I reproduced this directly.

The fix is straightforward: keep the primary action above informational cards, prevent their rectangles from overlapping, and add a regression test around the affected width range.

## P1 — Progress corruption can look like a fresh account

[persistence.ts](src/lib/store/persistence.ts) converts malformed JSON into `null`. The store then treats it like missing data, and hydration writes the empty/default state back.

A learner with corrupted storage can silently lose progress without ever being told.

The app needs

- Corruption detection distinct from “no save exists”
- Quarantine of the damaged payload
- A visible recovery message
- Raw-backup preservation
- A safe “start fresh” action that does not immediately destroy recoverable data

The cookie fallback also cannot preserve normal progress once the encoded state exceeds 2,048 bytes. That limitation should be communicated clearly.

## P1 — The offline promise exceeds the implementation

[LocalDataControls](src/components/settings/LocalDataControls.tsx) promises that downloading the course makes lessons, vocabulary, and the Atlas work offline.

However, [offline.ts](src/lib/offline.ts) downloads course JSON but does not clearly cache all lazy lesson/exercise JavaScript chunks. Canonical `/trail/[lang]/[id]` offline navigation is also not clearly covered.

Either complete the offline shell or narrow the promise. **Overpromising offline reliability damages trust more than honestly supporting visited lessons only.**

## P1 — “Mastered” and automatic can-do claims are too strong

The exercise inventory is recognition-heavy, final recall often retains clues, and review can be easier than the original task.

Lesson completion should be celebrated, but it should not be equated with mastery or independent CEFR ability.

## P2 — Accessibility gaps remain in ordinary use

Verified issues include

- After successful matching, focus falls to `<body>`.
- The visible Review Exit button has `tabIndex={-1}` and prevents its own Enter/Space activation.
- Settings search and some review inputs rely on placeholder-only labels.
- The root document stays `lang="en"` even when displaying substantial German.
- Onboarding initially focuses the first enabled button, effectively Skip, and does not clearly announce step changes.
- Practice tabs lack full tab semantics and arrow-key behavior.
- Several controls remain below common 44px touch-target guidance.

The native dialog implementation and most lesson keyboard behavior are good. These are targeted repairs, not a rewrite.

## P2 — Optional words and replay state create hidden inconsistencies

[use-lesson-session](src/components/lesson/use-lesson-session.ts) seeds both focus words and collapsed optional table words into review, despite presenting the latter as optional extras.

Its completion guard also does not reset clearly when a completed lesson is replayed, so a second run may reach Summary without recording a new perfected result. Twist “meet again” state is memory-only.

These are smaller than the correctness issues, but they weaken the meaning of progress.

# What Brücke should build next

## Phase 1: A one-week trust patch

Freeze new content and features briefly. Fix the foundations

1. Audit all transcription answers and high-risk shift explanations against the rule being taught.
2. Add a correctness test ensuring that when a lesson teaches punctuation, the grader evaluates it consistently.
3. Replace false fallback diagnoses with neutral or genuinely categorized feedback.
4. Change “mastered” and automatic can-do language to evidence-based states.
5. Fix focus movement, Review Exit, placeholder labels, language tagging, and the tablet-width overlap.
6. Bring the homepage inside its 8-second budget, ideally targeting roughly 4 seconds on comparable hardware.
7. Add corrupt-storage quarantine and honest offline messaging.

**Exit criterion:** five beginners can use the app without encountering incorrect German, a blocked primary action, or a false mastery signal.

## Phase 2: Build “German: Your First Week”

This should be the flagship new feature, assembled largely from existing assets rather than another large content expansion.

The path should answer real beginner goals

- Greet someone and introduce yourself
- Say please, thank you, and excuse me
- Order water or coffee
- Ask where something is
- Say “I don’t understand”
- Ask someone to repeat
- Express a simple preference
- Complete a short, supported exchange

Each mission should end with a phrase the learner can actually use.

**Bold product promise:**

> Understand your first German sentence in 60 seconds. Use your first real phrase in five minutes.

That is more compelling than “179 lessons across 30 topics.”

## Phase 3: Replace the Trail homepage with a “Today” loop

For returning learners, the primary question is not “Where am I in 30 topics?” It is “What should I do now?”

A daily screen should combine

- **Review:** a small due set, around 5–10 minutes
- **Learn:** the next recommended lesson, around 4 minutes
- **Use:** one short transfer task, around 60 seconds
- **One primary button:** Start today’s session

Keep the Trail as the curriculum map, not the daily operating system.

At lesson Summary, offer

- Review these words now
- Use this in a new sentence
- Continue to next lesson

The current Next Lesson-only handoff wastes the moment when the learner is most ready to consolidate.

## Phase 4: Make retrieval and transfer the next learning engine

The current app is very good at helping learners arrive at answers. The next leap is helping them retrieve and use those answers independently.

Add

- A delayed recall round with no clues or word bank
- Clear labeling of assisted versus independent answers
- Confidence ratings: “knew it,” “guessed,” or “needed help”
- Review replays that preserve the original difficulty
- Error-specific feedback for word order, grammar, articles, spelling, and shifts
- Short personalized sentence tasks
- Optional spoken responses without making microphone access mandatory
- Tiny reading and listening tasks built from recently learned vocabulary

The goal is not an AI tutor. It is a tighter evidence loop

**Taught → practiced with help → retrieved independently → used in a new context → reviewed at the right time.**

# What I would not build yet

- Accounts or cloud sync before proving day-seven retention
- An AI tutor before improving error diagnosis
- More languages before German has a dependable beginner loop
- More etymology depth, themes, fonts, or decks
- Heavy streaks or push notifications as substitutes for usefulness
- Automatic CEFR claims
- A large adaptive-difficulty engine before measuring where learners actually struggle

Those are not bad ideas. They are premature investments that would make the current experience more complex before making it more effective.

# How to validate the direction

Use the existing five-beginner protocol in [USER_TESTING.md](docs/USER_TESTING.md), without adding accounts or analytics first.

I would measure

- Time to the first useful phrase
- Unassisted Lesson 1 completion
- Ability to reproduce the target sentence after ten minutes without clues
- Twenty-four-hour and seven-day recall
- Whether learners return to a clear “Today” plan
- Whether learners can explain the taught rule in their own words
- Whether they can use the vocabulary in a sentence they have not seen before
- Confidence compared with actual performance

A strong initial target would be at least four of five beginners completing the first lesson unaided, zero learners repeating an incorrectly taught rule, and most learners able to produce at least one useful German phrase without the word bank.

# Validation performed

| Check | Result |
|---|---|
| Lint | Passed; five React Hooks dependency warnings |
| TypeScript | Passed |
| Unit/integration tests | 920 passed across 81 files |
| Content audits | All passed; 26 of 179 lessons introduce zero new words |
| Production build | Passed; 546 static pages and 530 lesson payloads |
| Production Playwright | 98 passed, 5 skipped, 1 failed |
| Failure | Homepage keyboard-ready performance budget |
| Manual browser audit | Completed Lesson 1, mobile homepage, desktop/tablet geometry, focus behavior |
| Repository changes | None |

# Bottom line

**Brücke does not need another hundred lessons. It needs a clearer promise and a more honest learning loop.**

My recommended order is

1. **Fix trust:** correct German, accurate feedback, safe progress, reliable performance.
2. **Create immediate utility:** a German first-week survival path.
3. **Unify the habit:** one Today loop combining learning, review, and use.
4. **Prove transfer:** independent recall and novel sentence production.
5. **Only then expand:** accounts, AI, more languages, and additional content.

The app already has the hard part: a distinctive teaching idea and a solid technical core. The next version should make a beginner feel, “I can actually use this,” rather than merely, “I completed another lesson.”





"German: Your First Week" survival path: Today, the first everyday useful phrase ("Ein Glas Wasser, bitte") doesn't appear until Lesson 5. Should we add a short 5-session starter path—built from existing lessons and dialogues—focused on ordering a drink, introducing yourself, and handling basic exchanges before diving into sound shifts?
