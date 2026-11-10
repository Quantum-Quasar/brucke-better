# Audit triage — October 2026

The October audit of lessons 5121–5312 produced 39 findings. They were sorted with the
rule in [`NORTH_STAR.md`](./NORTH_STAR.md): fix what blocks or misleads a learner of German;
log (don't do) what only refines etymology.

## Done

| Area | What changed |
|---|---|
| Unfinishable exercises | 8 tile exercises could not be completed (a word needed twice with one tile, or a pronoun with no tile): l901_e1, l902_e1, l5162_e5, l5192_e4, l5201_e4, l5202_e4, l5211_e5, l5252_e4. Tiles added. |
| Grading | Commas inside a sentence are ignored (tiles can't produce them; l5211_e4 / l5212_e4 were marked wrong on a perfect answer). `das`+`Wass`+`er` is read as one word (lessons 5, 102, 901, 902 were graded "almost" + forced retry). |
| Playability | 11 matching exercises with 13–23 pairs trimmed to 12 (median is 6); each lesson's headline words kept. |
| German correctness | küssst → küsst, tringe → trinke, "Manchmal trinke ich immer Kaffee", "geradeaus nach rechts", Schwarz und Weiß, "Himmel the ceiling", false "zu = too, nach = to" hint, 5272 mixed frames. |
| Taught-first | 5291 `schneidet` (untaught), 5021_e3/e5 untaught antidote words, `langweilig` credited in l2903. |
| Practice matches lesson | l202_e5 restored to a bracket sentence; l301_e5 / l401_e5 restored to their shift-bearing lines. |
| Presence | suppe (5222), abfahrt/ankunft (5261), socke (5292), Französisch (5291) now appear in an exercise. |
| Text matches lesson | 5211 teaser + 5212 blurb (Ofen), stale sentence counts, garbled shell blurbs, 5251 footnote, 501_e5 explanation. |
| Guards | Tests: tile exercises solvable, matching ≤ 12 pairs, grader comma/tile behaviour. |

## Essence pass — anti-drift (North Star audit)

Six exercises had drifted into etymology trivia where the answer required knowledge
unrelated to German (Middle English phonology, Latin/Greek roots, KJV English) and no
corresponding German was practised. Converted to German practice; the connection stays as
a one-line hook in the explanation:

- l18_e2 (Middle English y-) → pick the ge- participle that closes the Perfekt bracket (gemacht).
- l1905_e4 (KJV "wist") → which verb freezes to wusste (wissen).
- l5171_e3 (Latin aurora) → Osten's everyday English twin (east).
- l5181_e2 (clavichord) → which instrument das Klavier names (piano).
- l5182_e3 (Greek théatron → theory) → which place das Theater names (theater).
- l5232_e3 (Greek "honey-apple") → which spread die Marmelade names (jam).

Deliberately left: reverse-cognate twins that are taught in-lesson and map to the German
word being learned (warum↔wherefore, wohin↔whither, heiße↔hight, genug/enough, methinks),
and all loan-vs-native classification quizzes — the prose teaches them; the recall
reinforces the German word.

## Deliberately not done (etymology precision — see North Star)

- #14 shift-badge nuance (Dezember z, hinten d→t, …)
- #15 Zucker / Arabic loan chain
- #30 `shift_categories` orphans (frozen field; prose-only etymologies)
- #32 `reverse_cognate` dual-use relabelling and option-label leaks
- #33 "soften the partly-true set" (dort, Computer, Kanne, lila, …)
- #34 blurb nits that were purely etymological (kept only the ones that were garbled or false on the page)
- #35 beyond the "four prefixes" wording; #36 cosmetics about Latin/Greek labels and Kleid↔cloth hedging
- #37 / #38 watch-item and a cosmetic slug (`l5151`, frozen)
- #21 `Rad` is already glossed inline in 5251 — no change needed

## Left as is, on purpose

- #29 `word_ids` "dead" entries (hundert, minute @5122; zeit, morgen, garten @5132; bad @5212): the words are taught in the
  lesson prose but have no exercise line. Removing them risks the 650-word floor; adding pairs would break the 12-pair cap.
  Revisit only if a learner-facing reason appears. The "used-but-unlisted" words (regnen, fallen, wand) are already taught earlier.
- Matching pairs duplicated between a core lesson and its side lesson (single-word recap pairs) — that is the recap design.

## November 2026 — interrupted audit follow-through

The exported session `Repo_audit_and_suggestions_2026-11-10_18-06.md` approved
Tier 1–5 fixes, not the separate product recommendations. Its partial edits were
preserved and completed.

| Area | Resolution |
|---|---|
| Lesson/SRS integrity | Preserve the retry ledger on table detours; scope guesses to retrieved words and reconcile mastery; refuse undo over a newer card version. |
| Durability | Reject malformed backup progress before replacement; merge fallback language maps; retain the existing storage-warning/export UI. BroadcastChannel now carries full snapshots when localStorage rejects writes, including progress omitted by the cookie's size cap. Received merges are not rebroadcast. |
| Offline updates | Offer a user-controlled reload for waiting workers; touch cached assets on access for LRU eviction. This caches visited content, not an entire course. |
| Dependencies/payloads | Upgrade vulnerable dependencies without switching hosting architecture. Lesson payloads carry the primary shift and a separate total-family count instead of every shift. |
| Accessibility | Keyboard-activate graph nodes; use theme colors and distinct node/legend shapes; enlarge graph/character/settings targets; expose selected settings through pressed state and checkmarks; ignore invisible focus-trap targets. |
| Character input | Insert at the saved caret/selection, including keyboard activation of character buttons; migrate the missed review caller. |
| Content pipeline | Parse shift prose from markdown section 1. Require all sections, inventory counts, exact table widths, valid translations/shift ids and unique identifiers; stop before writing on malformed input. |
| German clarity | Correct learner-facing Ablaut typos (keep the 1902 slug). Remove lesson 1901's false shared-melody claim without changing the valid scribe-family clue. Remove leaked drafting fragments from the capstone reading. Regenerate payloads and the trail. |
| CI/docs | Pin Bun to 1.4.4; fail teaser audits on drift; guard each sibling course's published counts and the longer README's test counts. |

### Findings that are not mechanical bug fixes

- **Desktop Back:** kept the documented touch-only history sentinel. Desktop uses
  Escape/close; a sentinel consumes browser history even after closing and cannot
  be treated as a free, behavior-preserving fix. No silent navigation redesign.
- **Zero-new lessons:** 26/179 (14.5%) is within the existing strict 25% bound.
  Revision lessons intentionally consolidate known German; the audit separately
  rejects unclassified zero-new lessons. No filler vocabulary added.
- **Legacy recurrence:** the vocabulary audit still reports 152 legacy words below
  two later lesson references. This is an unresolved curriculum-weaving backlog,
  not repaired by adding ids or pinning the current count. The campaign's stricter
  recurrence/exposure rules remain intact; SRS scheduling is separate from authored
  contextual reuse. See the recurrence-plan item in `ideas to add in future/open-ideas.md`.
- **Overlay measurements:** already requestAnimationFrame-throttled and avoid
  unchanged state updates; no demonstrated observer-churn defect to fix.
- **Deferred product choices:** static-export migration, beginner testing and
  language-expansion policy remain deferred as requested.

### Verification

- Existing unit suites plus focused parser, hydration and docs regressions.
- Chromium: reinforcement → table → resume retains the retry ledger; keyboard
  character insertion replaces a selection and restores the caret; graph Enter
  opens the word drawer; settings expose pressed state and 44px targets.
- Two real Chromium tabs with localStorage writes blocked and an oversized
  fallback: lesson segments synchronize in both directions despite a prefs-only
  cookie; receiving tabs do not echo the incoming broadcast.
- Dependency audit: no vulnerabilities across 301 packages.
- All four content audits pass; teaser title drift and pointer flags are zero.
- Production build succeeds with all six tab routes statically prerendered.
  In Chromium, a newly installed worker displays the update prompt, the reload
  activates that worker, and the visited Settings page reloads offline.

