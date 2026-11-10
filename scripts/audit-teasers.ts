// Trail-chain audit — run with: bun scripts/audit-teasers.ts
//
// 1. Title drift check: every authored lesson's title must match its curriculum shell
//    (catches an agent silently changing the topic a lesson is built around).
// 2. Teaser chain check: prints the trail reading order (core → that topic's sprigs →
//    next core) with each authored lesson's curiosity_teaser, and heuristically flags
//    teasers that don't reference the node that actually follows them.
import { LESSONS } from "../src/data/lessons";
import { TOPICS } from "../src/data/curriculum";

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
  const teaser = cur.summary.curiosity_teaser.toLowerCase();
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
    `${mark} [${node.id}] ${node.title}` +
      `\n     teaser → ${teaser.slice(0, 100)}` +
      `\n     next   → [${next.id}] ${next.title}${nextAuthored ? "" : " (hollow)"}${probeNote}`
  );
}

console.log(`\n=== title drift: ${drift} | teaser flags: ${flagged} (heuristic — ⚠ means "read it, the pointer may skip a node") ===`);
if (drift > 0 || flagged > 0) process.exitCode = 1;
