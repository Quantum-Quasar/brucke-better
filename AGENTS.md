# AGENTS.md — working agreements for AI agents on this repo

This file is the only thing that makes the "don't open X" instructions
below enforceable. `.gitignore` gates **git**, not the filesystem: a tracked
file is in every clone, and a directory name is a label, not a control. If you
are an agent, read this before you open anything.

## Do not open unless the user explicitly asks

- **`docs/dont open untill mentioned/`** — live working notes, not reference
  material. Tracked so the work travels; several files contradict the shipped
  code. `thinking-method.md` alone is 691 KB and will flood your context.
  If the user asks for a broad sweep ("read everything", "be thorough"),
  this folder is still excluded unless named.
- **`docs/thinking-method-images/`** — gitignored, local only.

## Never commit

`pitch/` · `docs/thinking-method-images/` · `auditreview.md` ·
`old documentation/` · `documented docs/` · `CLAUDE.md` ·
`REBALANCE_PROMPT.md` · `.zcodeignore` · `.freebuff/` · `.fractal/` ·
`.worktrees/` · `test-results/` · `playwright-report/` · `*.tsbuildinfo` ·
`.next/` · `node_modules/` · `gui-test-screenshots/`

The full list is `.gitignore`. Do not add exceptions to it without being asked.

## Never gitignore

- **`word_connections.md`** — the build reads it. If it disappears,
  `bun run parse-data` and therefore `bun run build` fail.
- **`bun.lock`** — the lockfile belongs in git; CI installs with
  `--frozen-lockfile`.
- **`.github/workflows/ci.yml`**

## Content pipeline — the highest-risk area

`word_connections.md` (repo root, hand-maintained markdown) is the **single
source of truth** for every word, shift family, compound, false-friend trap,
and insight.

```
word_connections.md  ──parse-compendium.ts──▶  src/data/compendium.json
                                              src/data/insights.json
```

- `src/data/compendium.json` and `src/data/insights.json` are **generated**.
  Never hand-edit them. Edit the markdown, then `bun run parse-data`.
- `bun run build` is `parse-data && next build` — the parse step is not optional.
- Use `scripts/append-words.mjs` to batch-append records to §2 of the markdown
  rather than editing it by hand.
- `scripts/README.md` documents every script and what it writes.

## Counts are test-pinned — do not "fix" this by weakening the test

`src/tests/docs-sync.test.ts` asserts that `README.md`, `AUDIT_MANIFEST.md`,
`docs/README.md` and `pitch/*.md` quote the current word/lesson/test/theme/font
counts. When the data changes the test **fails by design**.

- `TEST_FILE_COUNT`, `THEME_COUNT`, `FONT_COUNT` are derived from the data.
- `TEST_COUNT` and `TAUGHT_WORDS` are maintained **by hand** in that file — they
  are the two numbers you must update yourself.
- If the suite fails on a count, update the number **in the docs**, not the
  assertion. If a doc quotes a stale figure, that is the bug being reported.
- `pitch/` is private, so the three pitch assertions self-skip via
  `it.skipIf(!PITCH_PRESENT)`. Do not "fix" that skip by making them required.

⚠️ **`README.md` and `docs/README.md` are near-duplicates that have drifted.**
`docs/README.md` is the longer, correction-tracked copy and covers more of the
shipped surface. Both are pinned by the same test, so a count change must be
applied to **both**. Prefer editing one and mirroring, not diverging further.

## Architecture invariants

These are load-bearing constraints, not preferences — changing them breaks
tests or the build:

- **Every route is static.** Dynamic segments use `generateStaticParams()` and
  set `dynamicParams = false` so unknown ids 404 instead of server-rendering.
- **No third-party component libraries.** No Radix, Headless UI, Framer Motion.
  Standard DOM + Tailwind v4.
- **Zero cloud TTS.** Pronunciation is browser-native `window.speechSynthesis`
  (`de-DE`); the click engine is bundled `.wav` under `public/sounds/`.
- **Durable local storage.** `localStorage` with a ≤ 2048-byte URL-encoded
  cookie fallback, merged field-by-field (`src/lib/store.ts`).
- **No cargo-cult repetition.** `scripts/audit-wording.ts` blocks prose
  copy-pasted between neighbouring lessons, with an allowlist for widget labels
  that are *meant* to match.

## Commands

```bash
bun install                # deps
bun run parse-data         # regenerate compendium.json + insights.json
bun run dev                # dev server :3000
bun run build              # parse-data + next build (production SSG)
bun run test               # vitest — 32 test files in src/tests/
bun run lint               # eslint
bun run typecheck          # tsc --noEmit
bun run test:e2e           # playwright smoke suite (tests/e2e/)
bun run trail              # scripts/export-trail.ts
```

CI runs **test, lint, typecheck** on every push to `main`. All three must pass.

## Conventions

- Tests live in `src/tests/*.test.ts` (Vitest), E2E in `tests/e2e/*.spec.ts`.
- A correctness rule belongs in a test, not in a manual audit script — an audit
  script nobody runs is not a guard.
- Prefer Bun + TypeScript; keep tooling dependency-free.
- Generated files are never hand-edited. If you find yourself editing
  `src/data/compendium.json` directly, stop.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
