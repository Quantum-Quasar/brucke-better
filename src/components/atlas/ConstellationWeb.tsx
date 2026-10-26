"use client";

import React from "react";
import { ShiftPair } from "@/components/common/ShiftPair";
import { useAppStore } from "@/lib/store";
import { hashSeed, mulberry32 } from "@/lib/prng";
import type { CompendiumData, ShiftFamily } from "@/lib/types";

interface ConstellationWebProps {
  family: ShiftFamily;
  data: CompendiumData;
  onPracticeBranch: () => void;
}

interface WebNode {
  x: number;
  y: number;
}

interface WebEdge {
  a: number;
  b: number;
}

const WIDTH = 640;
const HEIGHT = 520;
const VISIBLE_CAP = 20;
const LABEL_HEIGHT = 26;

/**
 * Seeded, irregular "actual web" layout: nodes are scattered on a jittered
 * grid (no single central hub), edges form a random spanning tree so every
 * node is reachable, plus extra cross-links that create chains, loops and
 * clusters — one node linking to two, two linking to three, etc.
 */
function buildWeb(
  familyId: string,
  words: { id: string; english_cognate?: string; target_word?: string }[],
): { nodes: WebNode[]; edges: WebEdge[] } {
  const visible = words.slice(0, VISIBLE_CAP);
  const ids = visible.map((w) => w.id);
  const n = ids.length;
  if (n === 0) return { nodes: [], edges: [] };

  const rng = mulberry32(hashSeed(familyId + ":" + ids.join(",")));

  // Jittered-grid node positions (random web, but deterministic per family).
  // Labels are wider than nodes, so x is clamped by the estimated label half
  // width and overlapping labels are separated vertically below.
  const labelHalfWidths = visible.map((w) => {
    const label = `${w.english_cognate ?? ""} → ${w.target_word ?? ""}`;
    return Math.min(120, Math.max(36, (label.length * 6.6 + 22) / 2));
  });
  const cols = Math.max(2, Math.ceil(Math.sqrt(n * (WIDTH / HEIGHT))));
  const rows = Math.max(2, Math.ceil(n / cols));
  const cellW = WIDTH / cols;
  const cellH = HEIGHT / rows;
  const nodes: WebNode[] = ids.map((id, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const jx = (rng() - 0.5) * cellW * 0.6;
    const jy = (rng() - 0.5) * cellH * 0.55;
    const half = labelHalfWidths[i];
    return {
      x: Math.min(WIDTH - half - 8, Math.max(half + 8, (col + 0.5) * cellW + jx)),
      y: Math.min(HEIGHT - 30, Math.max(30, (row + 0.5) * cellH + jy)),
    };
  });

  // Greedy label separation: push overlapping labels apart on the y axis.
  for (let iter = 0; iter < 80; iter++) {
    let moved = false;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = Math.abs(a.x - b.x);
        const dy = Math.abs(a.y - b.y);
        if (dx >= labelHalfWidths[i] + labelHalfWidths[j] + 6) continue;
        if (dy >= LABEL_HEIGHT) continue;
        const push = (LABEL_HEIGHT - dy) / 2 + 1;
        if (a.y <= b.y) {
          a.y = Math.max(30, a.y - push);
          b.y = Math.min(HEIGHT - 30, b.y + push);
        } else {
          a.y = Math.min(HEIGHT - 30, a.y + push);
          b.y = Math.max(30, b.y - push);
        }
        moved = true;
      }
    }
    if (!moved) break;
  }
  for (const node of nodes) {
    node.x = Math.round(node.x);
    node.y = Math.round(node.y);
  }

  // Shuffle index order for tree construction so links cross the canvas
  const order = nodes.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  const edges: WebEdge[] = [];
  const edgeSet = new Set<string>();
  const addEdge = (a: number, b: number) => {
    if (a === b) return;
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (edgeSet.has(key)) return;
    edgeSet.add(key);
    edges.push({ a: Math.min(a, b), b: Math.max(a, b) });
  };

  // Random spanning tree: every node links to an earlier node in shuffled order
  for (let i = 1; i < n; i++) {
    addEdge(order[i], order[Math.floor(rng() * i)]);
  }
  // Extra links: some nodes get 2+ connections, most get 1 more — creates
  // chains, clusters and occasional loops rather than a hub-and-spoke star
  for (let i = 0; i < n; i++) {
    const links = rng() < 0.55 ? 1 : rng() < 0.7 ? 2 : 0;
    for (let k = 0; k < links; k++) {
      addEdge(i, Math.floor(rng() * n));
    }
  }
  // Close a couple of loops on purpose
  const loops = Math.min(3, Math.floor(n / 5));
  for (let l = 0; l < loops; l++) {
    const a = Math.floor(rng() * n);
    addEdge(a, Math.floor(rng() * n));
  }

  return { nodes, edges };
}

export const ConstellationWeb: React.FC<ConstellationWebProps> = ({
  family,
  data,
  onPracticeBranch,
}) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  const persistedMastery = useAppStore((s) => s.wordMastery);
  const openWordDrawer = useAppStore((s) => s.openWordDrawer);
  // keep mastery-derived classes/counts at defaults on the hydrating render so SSG
  // output and the first client render agree (avoids hydration mismatch)
  const wordMastery = mounted ? persistedMastery : {};

  const words = React.useMemo(
    () => family.word_ids.map((id) => data.words[id]).filter(Boolean),
    [data, family],
  );

  // Stats calculation
  const masteredCount = words.filter((w) => wordMastery[w.id] === "mastered").length;
  const encounteredCount = words.filter((w) => wordMastery[w.id] === "encountered").length;
  const exploredCount = words.filter((w) => wordMastery[w.id] === "explored").length;
  const unexploredCount = words.length - (masteredCount + encounteredCount + exploredCount);

  const web = React.useMemo(() => buildWeb(family.id, words), [family.id, words]);
  const visibleWords = words.slice(0, VISIBLE_CAP);

  return (
    <div className="space-y-4 font-sans">
      {/* Desktop Web Canvas */}
      <div className="hidden md:block relative w-full h-[520px] bg-[var(--sub-alt-color)] rounded-lg border border-[var(--sub-color)]/20 overflow-auto">
        <div className="relative" style={{ width: WIDTH, height: HEIGHT }}>
          <svg className="absolute inset-0 pointer-events-none" width={WIDTH} height={HEIGHT}>
          {web.edges.map((e, i) => (
            <line
              key={i}
              x1={web.nodes[e.a].x}
              y1={web.nodes[e.a].y}
              x2={web.nodes[e.b].x}
              y2={web.nodes[e.b].y}
              stroke="var(--sub-color)"
              strokeOpacity="0.3"
              strokeWidth="1.25"
            />
          ))}
        </svg>

        {/* Family chip in the corner instead of a central hub */}
        <div className="absolute top-2.5 left-2.5 z-10 px-2 py-1 rounded bg-[var(--bg-color)] border border-[var(--main-color)] flex items-center gap-2 shadow-sm">
          <span className="text-xs font-bold text-[var(--main-color)] font-mono">{family.symbol}</span>
          <span className="text-[10px] text-[var(--sub-color)] font-mono">{words.length} roots</span>
          {words.length > VISIBLE_CAP && (
            <span className="text-[9px] text-[var(--main-color)] font-mono">
              showing {VISIBLE_CAP} · +{words.length - VISIBLE_CAP} in the roster below
            </span>
          )}
        </div>

        {/* Word nodes, centered exactly where their edges meet them */}
        {web.nodes.map((node, i) => {
          const w = visibleWords[i];
          if (!w) return null;
          const m = wordMastery[w.id] || "unexplored";
          let badgeBorder = "border-[var(--sub-color)]/30 bg-[var(--bg-color)] text-[var(--text-color)]";
          if (m === "mastered") badgeBorder = "border-[var(--main-color)] bg-[var(--bg-color)] text-[var(--main-color)] font-bold";
          else if (m === "encountered") badgeBorder = "border-[var(--text-color)]/60 bg-[var(--bg-color)] text-[var(--text-color)]";

          return (
            <button
              key={w.id}
              type="button"
              onClick={() => openWordDrawer(w.id)}
              style={{ left: node.x, top: node.y, transform: "translate(-50%, -50%)" }}
              className={`absolute z-20 px-2.5 py-1 rounded border text-xs font-mono transition cursor-pointer hover:border-[var(--main-color)] ${badgeBorder}`}
            >
              <span className="text-[var(--sub-color)]">{w.english_cognate}</span>
              <span className="mx-1 text-[var(--sub-color)]">→</span>
              <span className="text-[var(--text-color)] font-medium">{w.target_word}</span>
            </button>
          );
        })}
        </div>
      </div>

      {/* Mobile Expandable Vertical Tree */}
      <div className="md:hidden space-y-2.5">
        <div className="p-3.5 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-center space-y-0.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--sub-color)]">Shift Family</span>
          <h2 className="text-base font-bold text-[var(--main-color)] font-mono">{family.name}</h2>
          <p className="text-xs text-[var(--sub-color)]">{family.phonetic_rule}</p>
        </div>

        <div className="space-y-1.5">
          {words.slice(0, 40).map((w) => (
            <div key={w.id} className="p-2.5 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 flex items-center justify-between">
              <ShiftPair
                english={w.english_cognate}
                german={w.target_word}
                gender={w.gender}
                rule={w.shift_rule}
                wordId={w.id}
              />
            </div>
          ))}
          {words.length > 40 && (
            <p className="text-[11px] font-mono text-[var(--sub-color)]">
              +{words.length - 40} more in the roster below.
            </p>
          )}
        </div>
      </div>

      {/* Status Bar & Sandbox Practice Trigger */}
      <div className="p-3.5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        {/* Status Counters */}
        <div className="flex flex-wrap items-center gap-3 text-[var(--sub-color)]">
          <span className="text-[var(--main-color)] font-bold">{masteredCount} mastered</span>
          <span>·</span>
          <span>{encounteredCount} in course</span>
          <span>·</span>
          <span>{exploredCount} explored</span>
          <span>·</span>
          <span>{unexploredCount} unseen</span>
        </div>

        {/* Practice Branch Button */}
        <button
          type="button"
          onClick={onPracticeBranch}
          className="w-full sm:w-auto px-4 py-1.5 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-xs font-mono transition cursor-pointer hover:opacity-90"
        >
          practice this branch (5 questions) →
        </button>
      </div>
    </div>
  );
};
