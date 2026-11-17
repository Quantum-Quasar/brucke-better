// Trail-chain audit — run with: bun scripts/audit-teasers.ts
//
// 1. Title drift check: every authored lesson's title must match its curriculum shell
//    (catches an agent silently changing the topic a lesson is built around).
// 2. Teaser chain check: prints the trail reading order (core → that topic's sprigs →
//    next core) with each authored lesson's curiosity_teaser, and heuristically flags
//    teasers that don't reference the node that actually follows them.
// 3. Required grammar branches (5060/5080/5100/5110 — see docs/grammar-gap-placement.md)
//    are spine-adjacent, so their chains get the same 0-flags rule: each lesson's teaser
//    must reference the next lesson of its branch. The last lesson may point back toward
//    the spine or close the branch (AGENT_PRECAUTIONS §3.4), so it is only checked for
//    existence.
import { LESSONS } from "../src/data/lessons";
import { TOPICS, TRAIL_BRANCHES } from "../src/data/curriculum";

type Node = { id: number; title: string; topic: number; plan: string };
const order: Node[] = [];
for (const t of TOPICS) {
  order.push({ id: t.core.id, title: t.core.title, topic: t.id, plan: t.core.plan });
  for (const s of t.sprigs) order.push({ id: s.id, title: s.title, topic: t.id, plan: s.plan });
}
const byId = new Map(LESSONS.map((l) => [l.id, l]));

const STOP: Record<string, true> = {
  the: true, a: true, an: true, and: true, of: true, in: true, to: true, next: true, with: true, for: true,
  your: true, its: true, into: true, from: true, prove: true, where: true, what: true, when: true, both: true,
  english: true, german: true, germans: true, lesson: true, lessons: true,
};
const tokens = (s: string) =>
  s.toLowerCase().replace(/[^\p{L}\p{N} ]/gu, " ").split(/\s+/).filter((w) => w.length >= 5 && !STOP[w]);

console.log(`authored lessons: ${LESSONS.length} / ${order.length} trail nodes\n`);

let drift = 0;
let flagged = 0;

type Shell = { id: number; title: string; plan: string };

const checkLink = (curId: number, curTitle: string, teaserRaw: string, next: Shell, context: string): boolean => {
  const teaser = teaserRaw.toLowerCase();
  // titles like "will ≠ will" or "Wie geht's?" yield no >=5-char tokens —
  // fall back to the shell's plan line so the check stays passable
  const titleTokens = tokens(next.title);
  const probe = titleTokens.length > 0 ? next.title : next.plan;
  const probeNote = titleTokens.length > 0 ? "" : " (plan fallback)";
  const hits = tokens(probe).filter((w) => teaser.includes(w));
  const nextAuthored = byId.get(next.id);
  const mark = nextAuthored === undefined ? "?" : hits.length > 0 ? "✓" : "⚠";
  if (mark !== "✓") flagged++;
  console.log(
    `${mark} [${curId}] ${curTitle}${context}` +
      `\n     teaser → ${teaser.slice(0, 100)}` +
      `\n     next   → [${next.id}] ${next.title}${nextAuthored ? "" : " (hollow)"}${probeNote}`
  );
  return mark === "✓";
};

for (let i = 0; i < order.length; i++) {
  const node = order[i];
  const cur = byId.get(node.id);
  const next = order[i + 1];

  if (!cur) {
    console.log(`· HOLLOW  [${node.id}] (t${node.topic}) ${node.title}`);
    continue;
  }

  // 1. title drift: the lesson's own title must match the designed shell title
  if (cur.title !== node.title) {
    drift++;
    console.log(`✗ DRIFT   [${node.id}] lesson title "${cur.title}" != shell title "${node.title}"`);
    continue;
  }

  if (!next) {
    console.log(`✓ [${node.id}] ${node.title} — trail end`);
    continue;
  }

  // 2. teaser should reference the node that actually follows in trail order
  checkLink(node.id, node.title, cur.summary.curiosity_teaser, next, "");
}

// 3. required grammar branches: same rule inside the branch chain
for (const branch of TRAIL_BRANCHES) {
  if (!branch.required) continue;
  console.log(`\n— required branch ${branch.id} · ${branch.title} —`);
  for (let i = 0; i < branch.lessons.length; i++) {
    const shell = branch.lessons[i];
    const cur = byId.get(shell.id);
    if (!cur) {
      console.log(`· HOLLOW  [${shell.id}] (branch ${branch.id}) ${shell.title}`);
      continue;
    }
    if (cur.title !== shell.title) {
      drift++;
      console.log(`✗ DRIFT   [${shell.id}] lesson title "${cur.title}" != shell title "${shell.title}"`);
      continue;
    }
    const nextShell = branch.lessons[i + 1];
    if (!nextShell) {
      // last lesson of the chain — its teaser may point back to the spine or
      // close the branch (§3.4), so only its existence is checked
      if (!cur.summary.curiosity_teaser) flagged++;
      console.log(`✓ [${shell.id}] ${shell.title} — branch end`);
      continue;
    }
    checkLink(shell.id, shell.title, cur.summary.curiosity_teaser, nextShell, " (required branch)");
  }
}

console.log(`\n=== title drift: ${drift} | teaser flags: ${flagged} (heuristic — ⚠ means "read it, the pointer may skip a node") ===`);
if (drift > 0 || flagged > 0) process.exitCode = 1;
