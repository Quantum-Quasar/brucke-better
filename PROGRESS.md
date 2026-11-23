# PROGRESS — required-grammar promotion (shipped in `4e32632`)

Completed campaign record: promoted core grammar out of "skippable" (see `docs/grammar-gap-placement.md`).
Previous campaign's record (sibling parity) is complete and lives in `docs/sibling-parity-audit.md`.

## Final mapping (implemented)

| Grammar | Ids | Container | Treatment | Unlock |
|---|---|---|---|---|
| Imperative | branch 5060 (5061–5063) | branch on topic 9 | required in place (pocket beside topic 9) | first lesson after core 9 (topic 9 has no stories) |
| Präteritum sein/haben/modals | sprigs 1904, 1905 | topic 19 | required in place | after core 19 (existing rule) |
| Adjective declension | sprigs 2403, 2404 | topic 24 | required in place | after core 24 (existing rule) |
| Reflexives | sprigs 1603, 1604 | topic 16 | required in place | after core 16 (existing rule) |
| Konjunktiv II | branch 5080 (5081–5082) | branch on topic 30 | required — **Part 2 region** | after the pre-capstone spine (through story 9005) |
| Relative clauses | branch 5100 (5101–5102) | branch on topic 30 | required — **Part 2 region** | after the pre-capstone spine |
| als / wenn / ob | branch 5110 (5111–5112) | branch on topic 30 | required — **Part 2 region** | after the pre-capstone spine |

Dependency soundness: structural prerequisites of the Part 2 branches are spine-required
(weil/dass basement = core 14, demonstratives = core 11, Perfekt = core 18). The two optional
conveniences named in the placement doc (möchte = sprig 201, als = "than" drilled in sprig 2402)
are re-taught inside 5081/5111 themselves, so no optional prerequisite needs promoting; the Part 2
nodes unlock with the topic-30 region, satisfying criterion (c) via the task's stated alternative.

## Status

- [x] Mapping recorded (this file)
- [x] Batch 1 — data & engine (`src/lib/types.ts`, `src/data/curriculum.ts`,
      `src/data/curriculum-core.ts`, `src/lib/trail-map.ts`, `src/lib/use-course-recommendation.ts`)
- [x] Batch 2 — UI (`TrailMap.tsx`, `TrailMapNode.tsx`, `LessonNodeDrawer.tsx`, `NextLessonBar.tsx`)
- [x] Batch 3 — tests (`src/tests/required-grammar.test.ts` (14 tests), `src/tests/trail-map.test.ts`
      branch-chain test updated for required branches), `scripts/audit-teasers.ts` (required
      branch chains — 0 flags verified), `scripts/export-trail.ts` (Part 2 section), `TRAIL.md` regen
- [x] Batch 4 — docs (`AGENT_PRECAUTIONS.md` §3.4/§3.5, `docs/grammar-gap-placement.md`
      "Implemented", `docs/README.md`, `docs/ARCHITECTURE.md`, `AUDIT_MANIFEST.md`,
      `scripts/README.md`, OnboardingModal copy)
- [x] Final verification (test/lint/typecheck/build + 4 audits + `bun run trail`)
      — 738 tests pass, lint clean, tsc clean, all four audits green
      (`title drift: 0 | teaser flags: 0`), production build prerenders all routes
      (local build needs `ALLOW_LOCAL_SITE_URL=1 NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3000`;
      CI supplies its own origin). Playwright e2e not run here (separate CI job, needs a browser).

## Notes for a replacement agent

- Engine semantics decided: required sprigs/branches are bypass-immune (stored bypass counts
  ignored, never incremented); recommendation priority is required-first
  (`pendingRequired` → missed optional → next available). Unlock graph unchanged except required
  branches' first lesson prereq/edge = the attach topic's last spine node (so Part 2 unlocks only
  after story 9005).
- `TrailState.requiredIds` is the by-id record of the mapping; `src/tests/required-grammar.test.ts`
  pins it — do not weaken those assertions.
- Part 2 renders via a synthetic layout group (`groupId = totalTopics + 1`, epilogue anchor);
  state logic still treats those nodes as topic 30 (gate 6 still locks them while closed).
- Existing test updated deliberately: trail-map.test.ts "chains branch lessons off their attach
  node" now expects required branches to chain from the attach topic's spine end (matches the new
  prereq/edge rule). Everything else must stay green unchanged.
