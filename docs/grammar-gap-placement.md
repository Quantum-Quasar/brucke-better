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
