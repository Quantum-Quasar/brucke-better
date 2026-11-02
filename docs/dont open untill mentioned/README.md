# Working notes — read me first

> **Folder name is a warning, not a description.** These are working documents, not
> reference material, and they may contradict the shipped code. Do not open anything here
> unless the task is about it. Current, maintained docs are indexed in
> [`../INDEX.md`](../INDEX.md).

## What is in here

| File | Size | Purpose |
| --- | --- | --- |
| `thinking-method-short.md` | ~130 KB | The Thinking Method design and its rationale (production drills, literal gloss, posture cues, twists, dictation, family grids, variant English). **Large — open it only when the task is about the method itself.** Left as written on purpose; where it disagrees with the code, the code wins. |
| `future plans.md` | ~8 KB | A language shortlist (Norwegian / French / Dutch / Spanish) and a table of YouTube course playlists, kept as raw notes. |

Older planning documents that used to live here (a chat transcript of curriculum
suggestions, a changelog of doc corrections, a Trail map spec, the long-form Thinking
Method) were removed once their ideas shipped. Whatever was still open was distilled into
[`../ideas to add in future/open-ideas.md`](../ideas%20to%20add%20in%20future/open-ideas.md).

## Known issues

- **The diagrams are not in git.** `thinking-method-short.md` may link images under
  `docs/thinking-method-images/` (gitignored, local only); they will not resolve in a fresh clone.
- **Nothing here is test-covered.** `src/tests/docs-sync.test.ts` guards the counts quoted in
  the root README files and `AUDIT_MANIFEST.md`, not the prose in this folder.

## Enforcement

Nothing technically stops an agent from reading this folder: `.gitignore` gates git, not the
filesystem. The real protection is the instruction in `AGENTS.md`. To keep these documents
unread by default, move the folder outside the repository working tree.
