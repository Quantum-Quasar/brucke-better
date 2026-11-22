// Wording-variation audit — run with: bun scripts/audit-wording.ts
//
// Reconsidered version of the "flag repeated prompt formulas" idea (originally
// suggestion #18). The first design was wrong, and this file records why:
//
//   · Flagging repeated `prompt` strings punishes a feature. The guidebook asks for
//     the opposite in one place — "we can also make an effort to be consistent in the
//     way we cue, so that the learner picks up on our cues more intuitively
//     throughout the length of a course" (§1.8). A stable widget label ("Which
//     English is built the German way?") is a cue the learner is *meant* to learn.
//
//   · Masked repetition (§1.7) is about not feeling repetitive, not about never
//     saying the same sentence. A lint on boilerplate trains agents to add noise
//     to silence it, which is strictly worse than the rot it was meant to catch.
//
// What actually rots is *explanatory prose*: an `explanation` copied verbatim into
// two lessons, or a pattern sentence pasted unchanged into adjacent lessons. That is
// decay an author cannot see, and it makes the trail feel machine-assembled.
//
// This audit therefore checks three things, exact-match only (no fuzzy thresholds —
// no false positives, no noise to argue about):
//
//   1. `explanation` strings repeated in ≥2 lessons that are adjacent in trail order.
//   2. Sentences in `pattern.content` / `hook.content` repeated in adjacent lessons.
//   3. An identical `prompt` for the same exercise type in ≥4 consecutive trail
//      nodes — a cap, with an explicit allowlist for the deliberately-stable labels.
//
// Zero drift is the goal: not "every string unique", but "no prose is copy-pasted
// between neighbours".

import { LESSONS } from "../src/data/lessons";
import { TOPICS } from "../src/data/curriculum";

type Node = { id: number; title: string; plan: string; lesson?: (typeof LESSONS)[number] };
const order: Node[] = [];
for (const t of TOPICS) {
  order.push({ id: t.core.id, title: t.core.title, plan: t.core.plan });
  for (const s of t.sprigs) order.push({ id: s.id, title: s.title, plan: s.plan });
}
const byId = new Map(LESSONS.map((l) => [l.id, l]));

/** The deliberately-stable widget labels. Consistency is the cue here (§1.8). */
const STABLE_PROMPTS = new Set([
  "Which English is built the German way?",
  "Match each separable verb with its phrasal twin:",
]);

const sentences = (s: string): string[] =>
  s
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 40); // only substantial sentences; short ones legitimately recur

let problems = 0;
const report = (kind: string, text: string, a: number, b: number) => {
  problems++;
  console.log(`✗ ${kind}\n    ${a} ↔ ${b}\n    "${text.slice(0, 140)}"`);
};

// 1. identical explanations in adjacent authored lessons
const explanations = new Map<string, number>();
for (let i = 0; i < order.length - 1; i++) {
  const here = byId.get(order[i].id);
  const next = byId.get(order[i + 1].id);
  if (!here || !next) continue;
  for (const ex of here.exercises) {
    if (!ex.explanation) continue;
    explanations.set(ex.explanation, here.id);
    for (const nx of next.exercises) {
      if (nx.explanation && nx.explanation === ex.explanation) {
        report("explanation copied verbatim into the next node", ex.explanation, here.id, next.id);
      }
    }
  }
}

// 2. identical prose sentences in adjacent authored lessons
const prose = (l: (typeof LESSONS)[number]) => [
  ...sentences(l.hook.content),
  ...sentences(l.pattern.content),
];
for (let i = 0; i < order.length - 1; i++) {
  const here = byId.get(order[i].id);
  const next = byId.get(order[i + 1].id);
  if (!here || !next) continue;
  const nextSentences = new Set(prose(next));
  for (const s of prose(here)) {
    if (nextSentences.has(s)) report("prose sentence copied verbatim into the next node", s, here.id, next.id);
  }
}

// 3. the same prompt for the same exercise type across four consecutive nodes
let runType = "";
let runPrompt = "";
let runLen = 0;
let runStart = 0;
for (const node of order) {
  const l = byId.get(node.id);
  if (!l) continue;
  for (const ex of l.exercises) {
    const stable = STABLE_PROMPTS.has(ex.prompt);
    if (stable) continue;
    if (ex.type === runType && ex.prompt === runPrompt) {
      runLen++;
      if (runLen >= 4) {
        report(
          `the same ${ex.type} prompt repeats across 4+ consecutive nodes`,
          ex.prompt,
          runStart,
          node.id
        );
        runLen = 0;
      }
    } else {
      runType = ex.type;
      runPrompt = ex.prompt;
      runLen = 1;
      runStart = node.id;
    }
  }
}

// 4. AI self-correction prose leakage ("...wait — ...", "...? no — ...", "or rather,")
const AI_TIC_RE = /\.\.\.\s*wait\s*[—–-]|\?\s*no\s*[—–-]/;
for (const l of LESSONS) {
  const fields: Array<[string, string | undefined]> = [
    ["hook", l.hook.content],
    ["pattern", l.pattern.content],
    ["twist", l.twist?.explanation],
    ...l.exercises.map((ex): [string, string | undefined] => [ex.id, ex.explanation]),
  ];
  for (const [label, text] of fields) {
    if (text && AI_TIC_RE.test(text)) {
      report(`possible AI self-correction prose tic (${label})`, text, l.id, l.id);
    }
  }
}

if (problems === 0) {
  console.log("✓ no copy-pasted prose between neighbouring lessons (explanations, hook/pattern sentences, prompt formulas)");
} else {
  console.log(`\n${problems} wording problem${problems === 1 ? "" : "s"} — change the wording, keep the action (§1.7/§1.8)`);
  process.exit(1);
}
