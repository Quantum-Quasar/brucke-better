# Grammar gap placement

Seven grammar gaps (imperative, adjective declension, Präteritum of sein/haben/modals,
reflexives, Konjunktiv II, relative clauses, als/wenn/ob) were closed by authoring lessons into
existing trail shells — sprigs and branches only, never renumbering the spine. All are shipped;
this page keeps the **why here** so nobody moves them. For the live map see `TRAIL.md` (generated
by `bun run trail`) and `src/data/curriculum.ts`.

| Gap | Where | Why there |
|---|---|---|
| Imperative | Branch **5060** (attach topic 9): 5061–5063 | Right after conjugation roots — the imperative is the bare stem plus endings already taught. |
| Präteritum `sein`/`haben`/modals | Sprigs **1904, 1905** on topic 19 | Ablaut home turf — *konnte ↔ could* is the ablaut hook. |
| Adjective declension | Sprigs **2403, 2404** on topic 24 | Predicate adjectives and comparison already live there; 2403 covers weak + mixed, 2404 the strong declension. |
| Reflexives | Sprigs **1603, 1604** on topic 16 | Prefix machinery (15–16) has just finished; present tense only — Perfekt is topic 18. |
| Konjunktiv II | Branch **5080** (attach topic 30): 5081–5082 | Post-capstone synthesis; *möchte* (lesson 201) is the on-ramp. |
| Relative clauses | Branch **5100** (attach topic 30): 5101–5102 | Reuses demonstrative *der/die/das* (topic 11) and basement word order (topic 14). |
| als / wenn / ob | Branch **5110** (attach topic 30): 5111–5112 | *wann* exists (13) and *als = than* exists (2402); the three-whens split completes the set. |

## Constraints that shaped the placement

- A topic holds a core plus at most seven sprigs; topics 16, 19 and 24 stay inside that budget.
- The three post-capstone branches stack below topic 30's cluster; the trail-map layout tests
  cover that at narrow, medium and wide widths.
- Branch ids 5070 and 5090 were already taken by unrelated vocabulary branches, so the
  post-capstone grammar branches use 5080 / 5100 / 5110.
- Only `curiosity_teaser` strings were edited on existing lessons (1903 → 1904, 1602 → 1603,
  2403 → 2404 and so on); branch teasers chain within their own branch. After any edit here run
  `bun scripts/audit-teasers.ts` and expect `title drift: 0 | teaser flags: 0`.

## Implemented — required grammar (final mapping)

The seven gaps are **required**: a learner can no longer "complete" the app without meeting
imperative, Präteritum of sein/haben/modals, reflexives, adjective declension, Konjunktiv II,
relative clauses, and als/wenn/ob. Nothing was renumbered, moved between topics, or given new
ids — requiredness is a flag on the existing shells (`required` on the sprig shells and the
branch specs), pinned by id in `src/tests/required-grammar.test.ts`.

| Grammar | Ids | Treatment | Unlock |
|---|---|---|---|
| Imperative | branch 5060 (5061–5063) | required in place — map pocket beside topic 9 | first lesson after core 9 (existing rule) |
| Präteritum `sein`/`haben`/modals | sprigs 1904, 1905 | required in place | after core 19 (existing rule) |
| Adjective declension | sprigs 2403, 2404 | required in place | after core 24 (existing rule) |
| Reflexives | sprigs 1603, 1604 | required in place | after core 16 (existing rule) |
| Konjunktiv II | branch 5080 (5081–5082) | required — **Part 2** region | after the pre-capstone spine (through story 9005) |
| Relative clauses | branch 5100 (5101–5102) | required — **Part 2** region | after the pre-capstone spine |
| als / wenn / ob | branch 5110 (5111–5112) | required — **Part 2** region | after the pre-capstone spine |

How it behaves:

- **Part 2: Complex sentences.** The three post-capstone branches render as their own labeled
  region below topic 30 (top of the flipped map). The trail visibly continues past the capstone:
  a required branch's first lesson unlocks from the attach topic's last spine node, so Part 2
  opens only once the pre-capstone spine (cores 1–30 + the five stories) is complete. 100%
  completion is impossible without it.
- **No bypass.** Required lessons are bypass-immune: stored per-lesson bypass counts are ignored
  (not migrated, not cleared) and never incremented, so "Continue ahead" cannot suppress them.
  Star gates are unaffected — requiredness introduces no new star quotas.
- **Recommendation priority.** Required-first: the next incomplete required lesson whose region
  is done surfaces before missed optional lessons; then missed optional lessons; then the next
  available lesson in trail order. Required sprigs/branches keep their existing unlock rule
  (outward from their attachment), so mid-trail flow still walks trail order until a required
  lesson is the outstanding gap.
- **Dependency soundness.** Structural prerequisites of the Part 2 branches are spine-required
  (weil/dass basement = core 14; demonstrative der/die/das = core 11; Perfekt = core 18). The two
  optional conveniences named above (möchte = sprig 201; als = "than" drilled in sprig 2402) are
  re-taught inside 5081/5111 themselves, so no optional prerequisite had to be promoted — the
  Part 2 nodes unlock with the topic-30 region instead.
- **Auditor coverage.** `scripts/audit-teasers.ts` walks the required branch chains with the
  same 0-flags rule (inner links must reference the next branch lesson; the last link may point
  back to the spine or close the branch, per §3.4 of AGENT_PRECAUTIONS).
