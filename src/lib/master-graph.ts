import type { CompendiumData } from "@/lib/types";
import { hashSeed, mulberry32 } from "@/lib/prng";

type MasterNodeKind = "word" | "phrase" | "compound" | "falsefriend" | "insight";

export interface MasterNode {
  id: string;
  kind: MasterNodeKind;
  label: string;
  sub: string;
  /** compendium word id when this node maps to one */
  wordId?: string;
  x: number;
  y: number;
}

export type MasterEdgeKind = "family" | "phrase" | "compound" | "falsefriend" | "insight";

export interface MasterEdge {
  a: number;
  b: number;
  kind: MasterEdgeKind;
}

const WIDTH = 2600;
const HEIGHT = 2000;
const NON_LETTER_RE = /[^\p{L}\s-]/gu;
const WS_RE = /\s+/;

function tokensOf(s: string): string[] {
  const parts = s.toLowerCase().replace(NON_LETTER_RE, " ").split(WS_RE);
  const out: string[] = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].length >= 2) out.push(parts[i]);
  }
  return out;
}

/** Cheap fuzzy whole-word match: exact, prefix, or ~1 edit (catches "tut"/"tun", "Türen"/"Tür"). */
function tokenMatches(token: string, word: string): boolean {
  if (token === word) return true;
  const tl = token.length;
  const wl = word.length;
  const minLen = tl < wl ? tl : wl;
  if (minLen >= 3 && (token.startsWith(word) || word.startsWith(token))) return true;
  const lenDiff = tl > wl ? tl - wl : wl - tl;
  if (lenDiff > 1 || minLen < 3) return false;
  let diff = lenDiff;
  for (let i = 0; i < minLen; i++) {
    if (token.charCodeAt(i) !== word.charCodeAt(i)) {
      if (++diff > 1) return false;
    }
  }
  return true;
}

export interface MasterGraph {
  nodes: MasterNode[];
  edges: MasterEdge[];
  edgesByKind: [MasterEdgeKind, string][];
}

const graphCache = new WeakMap<CompendiumData, MasterGraph>();

export function buildMasterGraph(data: CompendiumData): MasterGraph {
  const hit = graphCache.get(data);
  if (hit) return hit;
  const graph = buildMasterGraphUncached(data);
  graphCache.set(data, graph);
  return graph;
}

function buildMasterGraphUncached(data: CompendiumData): MasterGraph {
  const rng = mulberry32(hashSeed("master-graph-v1"));
  const nodes: MasterNode[] = [];
  const edges: MasterEdge[] = [];
  const edgeSet = new Set<number>();
  const nodeIndex = new Map<string, number>();

  if (!data.wordList.length) return { nodes, edges, edgesByKind: [] };

  const addNode = (n: Omit<MasterNode, "x" | "y">, x: number, y: number) => {
    nodeIndex.set(n.id, nodes.length);
    nodes.push({ ...n, x, y });
  };
  const addEdge = (aId: string, bId: string) => {
    const a = nodeIndex.get(aId);
    const b = nodeIndex.get(bId);
    if (a === undefined || b === undefined || a === b) return;
    const lo = a < b ? a : b;
    const hi = a < b ? b : a;
    const key = lo * 65536 + hi;
    if (edgeSet.has(key)) return;
    edgeSet.add(key);
    const ka = nodes[a].kind;
    const kb = nodes[b].kind;
    const kind: MasterEdgeKind =
      ka === "word" && kb === "word" ? "family" : ka === "word" ? (kb as MasterEdgeKind) : (ka as MasterEdgeKind);
    edges.push({ a: lo, b: hi, kind });
  };

  const words = data.wordList;

  // Prefix index: target prefixes (len >= 3) -> word ids, plus exact map and
  // words grouped by target length for the edit-distance fallback. This avoids
  // an O(phrases × words) fuzzy scan over the whole dictionary.
  const prefixIndex = new Map<string, Set<string>>();
  const exactIndex = new Map<string, string>();
  const byLength = new Map<number, { id: string; target: string }[]>();
  for (const w of words) {
    const t = w.target_word.toLowerCase();
    exactIndex.set(t, w.id);
    for (let len = 3; len <= t.length; len++) {
      const p = t.slice(0, len);
      let set = prefixIndex.get(p);
      if (!set) prefixIndex.set(p, (set = new Set()));
      set.add(w.id);
    }
    const bucket = byLength.get(t.length) ?? [];
    bucket.push({ id: w.id, target: t });
    byLength.set(t.length, bucket);
  }

  const matchedWords = (text: string, cap: number): string[] => {
    const out: string[] = [];
    const seen = new Set<string>();
    const push = (id: string) => {
      if (!seen.has(id)) {
        seen.add(id);
        out.push(id);
      }
    };
    for (const tok of tokensOf(text)) {
      const exact = exactIndex.get(tok);
      if (exact) push(exact);
      if (tok.length >= 3) {
        // target starts with the token ("Türen" matches "Tür")
        for (const id of prefixIndex.get(tok) ?? []) push(id);
        // token continues past the target ("Häusern" matches "Haus")
        for (let len = 3; len < tok.length; len++) {
          const id = exactIndex.get(tok.slice(0, len));
          if (id) push(id);
        }
      }
      // edit-distance-1 fallback (catches inflections like "tut"/"tun")
      for (let len = Math.max(3, tok.length - 1); len <= tok.length + 1; len++) {
        for (const w of byLength.get(len) ?? []) {
          if (!seen.has(w.id) && tokenMatches(tok, w.target)) push(w.id);
        }
      }
      if (out.length >= cap) return out.slice(0, cap);
    }
    return out.slice(0, cap);
  };

  // Only "important" phrases earn a node: ones that genuinely wire words
  // together (matching >= 2 other words), capped to the strongest 60.
  const keptPhrases: { owner: (typeof words)[number]; hits: string[] }[] = [];
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    if (!w.context_phrase || w.context_phrase.trim().length < 4) continue;
    const hits = matchedWords(w.context_phrase, 6).filter((id) => id !== w.id);
    if (hits.length >= 2) keptPhrases.push({ owner: w, hits });
  }
  keptPhrases.sort((a, b) => b.hits.length - a.hits.length);
  const topPhrases = keptPhrases.slice(0, 60);

  // Precompute & reuse matched hits for compounds, false friends, and insights
  // instead of running fuzzy matching twice.
  const compoundHits = data.compounds.map((c) => matchedWords(`${c.compound} ${c.literal_morphemes}`, 6));
  const ffHits = data.falseFriends.map((f) => matchedWords(f.german_word, 4));
  const insightHits = data.dailyInsights.map((ins) => matchedWords(ins.german_expression, 6));

  const keptWords = new Set<string>();
  for (const family of Object.values(data.shifts)) {
    for (const id of family.word_ids) keptWords.add(id);
  }
  for (const p of topPhrases) {
    keptWords.add(p.owner.id);
    for (const h of p.hits) keptWords.add(h);
  }
  for (const hits of compoundHits) for (const h of hits) keptWords.add(h);
  for (const hits of ffHits) for (const h of hits) keptWords.add(h);
  for (const hits of insightHits) for (const h of hits) keptWords.add(h);

  const keptList = words.filter((w) => keptWords.has(w.id));
  for (let i = 0; i < keptList.length; i++) {
    const w = keptList[i];
    addNode(
      { id: `w:${w.id}`, kind: "word", label: w.target_word, sub: w.english_cognate, wordId: w.id },
      WIDTH / 2 + (rng() - 0.5) * 1400,
      HEIGHT / 2 + (rng() - 0.5) * 1000,
    );
  }

  const near = (anchorWordId: string | undefined, spread = 60): { x: number; y: number } => {
    const anchorIdx = anchorWordId ? nodeIndex.get(`w:${anchorWordId}`) : undefined;
    const px = anchorIdx !== undefined ? nodes[anchorIdx].x : WIDTH / 2;
    const py = anchorIdx !== undefined ? nodes[anchorIdx].y : HEIGHT / 2;
    const ang = rng() * Math.PI * 2;
    const r = 30 + rng() * spread;
    return {
      x: px + Math.cos(ang) * r,
      y: py + Math.sin(ang) * r,
    };
  };

  // --- context phrases -----------------------------------------------------
  for (const { owner, hits } of topPhrases) {
    const p = near(owner.id);
    addNode(
      { id: `p:${owner.id}`, kind: "phrase", label: owner.context_phrase, sub: owner.context_translation },
      p.x,
      p.y,
    );
    addEdge(`p:${owner.id}`, `w:${owner.id}`);
    const lim = hits.length < 4 ? hits.length : 4;
    for (let i = 0; i < lim; i++) {
      if (keptWords.has(hits[i])) addEdge(`p:${owner.id}`, `w:${hits[i]}`);
    }
  }

  // --- compounds -----------------------------------------------------------
  for (let i = 0; i < data.compounds.length; i++) {
    const c = data.compounds[i];
    const hits = compoundHits[i];
    const lim = hits.length < 4 ? hits.length : 4;
    const anchor = hits[0];
    const p = near(anchor ?? keptList[Math.floor(rng() * keptList.length)]?.id, 90);
    addNode(
      { id: `c:${c.id}`, kind: "compound", label: c.compound, sub: c.real_meaning },
      p.x,
      p.y,
    );
    for (let j = 0; j < lim; j++) addEdge(`c:${c.id}`, `w:${hits[j]}`);
  }

  // --- false friends -------------------------------------------------------
  for (let i = 0; i < data.falseFriends.length; i++) {
    const f = data.falseFriends[i];
    const hits = ffHits[i];
    const lim = hits.length < 3 ? hits.length : 3;
    const anchor = hits[0];
    const p = near(anchor ?? keptList[Math.floor(rng() * keptList.length)]?.id, 90);
    addNode(
      { id: `f:${f.id}`, kind: "falsefriend", label: f.german_word, sub: `looks like "${f.looks_like}"` },
      p.x,
      p.y,
    );
    for (let j = 0; j < lim; j++) addEdge(`f:${f.id}`, `w:${hits[j]}`);
  }

  // --- daily insight expressions -------------------------------------------
  for (let i = 0; i < data.dailyInsights.length; i++) {
    const ins = data.dailyInsights[i];
    const hits = insightHits[i];
    const lim = hits.length < 4 ? hits.length : 4;
    const anchor = hits[0];
    const p = near(anchor ?? keptList[Math.floor(rng() * keptList.length)]?.id, 90);
    addNode(
      { id: `i:${ins.day}`, kind: "insight", label: ins.german_expression, sub: ins.english_meaning },
      p.x,
      p.y,
    );
    for (let j = 0; j < lim; j++) addEdge(`i:${ins.day}`, `w:${hits[j]}`);
  }

  // --- word↔word edges within each shift family ----------------------------
  for (const family of Object.values(data.shifts)) {
    const ids = family.word_ids.filter((id) => nodeIndex.has(`w:${id}`));
    for (let i = 1; i < ids.length; i++) addEdge(`w:${ids[i - 1]}`, `w:${ids[i]}`);
    const extras = Math.min(4, Math.floor(ids.length / 6));
    for (let i = 0; i < extras; i++) {
      const a = ids[Math.floor(rng() * ids.length)];
      const b = ids[Math.floor(rng() * ids.length)];
      if (a && b) addEdge(`w:${a}`, `w:${b}`);
    }
  }

  // --- force-directed layout (zero-allocation flat typed arrays + spatial grid) ---
  const ITERATIONS = 260;
  const cx = WIDTH / 2;
  const cy = HEIGHT / 2;
  const n = nodes.length;
  const radii = new Float64Array(n);
  const vx = new Float64Array(n);
  const vy = new Float64Array(n);
  const xs = new Float64Array(n);
  const ys = new Float64Array(n);

  for (let i = 0; i < n; i++) {
    const node = nodes[i];
    radii[i] = node.kind === "word" ? 9 : Math.min(110, Math.max(14, node.label.length * 2.6 + 16));
    xs[i] = node.x;
    ys[i] = node.y;
  }

  const m = edges.length;
  const edgeA = new Int32Array(m);
  const edgeB = new Int32Array(m);
  const edgeLen = new Float64Array(m);
  for (let i = 0; i < m; i++) {
    const e = edges[i];
    edgeA[i] = e.a;
    edgeB[i] = e.b;
    edgeLen[i] = e.kind === "family" ? 135 : e.kind === "phrase" ? 85 : 105;
  }

  // Flat linked-list spatial hash grid: WIDTH=2600, HEIGHT=2000, cellSize=100 => 27 x 21 = 567 cells
  const cellSize = 100;
  const invCell = 1 / cellSize;
  const gridCols = Math.ceil(WIDTH / cellSize) + 1;
  const gridRows = Math.ceil(HEIGHT / cellSize) + 1;
  const gridHead = new Int32Array(gridCols * gridRows);
  const gridNext = new Int32Array(n);
  const nodeCellX = new Int32Array(n);
  const nodeCellY = new Int32Array(n);

  for (let it = 0; it < ITERATIONS; it++) {
    const alpha = 1 - it / ITERATIONS;
    const repFactor = 0.5 * (0.4 + alpha);
    const springFactor = 0.045 * (0.4 + alpha);
    const gravFactor = 0.0012 * alpha;

    // Populate flat spatial grid (zero allocations)
    gridHead.fill(-1);
    for (let i = 0; i < n; i++) {
      let gx = xs[i] < 0 ? 0 : (xs[i] * invCell) | 0;
      let gy = ys[i] < 0 ? 0 : (ys[i] * invCell) | 0;
      if (gx >= gridCols) gx = gridCols - 1;
      if (gy >= gridRows) gy = gridRows - 1;
      nodeCellX[i] = gx;
      nodeCellY[i] = gy;
      const cell = gy * gridCols + gx;
      gridNext[i] = gridHead[cell];
      gridHead[cell] = i;
    }

    // Collision / short-range repulsion
    for (let i = 0; i < n; i++) {
      const gx = nodeCellX[i];
      const gy = nodeCellY[i];
      const xi = xs[i];
      const yi = ys[i];
      const ri = radii[i];
      const xMin = gx > 0 ? gx - 1 : 0;
      const xMax = gx + 1 < gridCols ? gx + 1 : gridCols - 1;
      const yMin = gy > 0 ? gy - 1 : 0;
      const yMax = gy + 1 < gridRows ? gy + 1 : gridRows - 1;

      for (let cyIdx = yMin; cyIdx <= yMax; cyIdx++) {
        const rowOff = cyIdx * gridCols;
        for (let cxIdx = xMin; cxIdx <= xMax; cxIdx++) {
          let j = gridHead[rowOff + cxIdx];
          while (j !== -1) {
            if (j > i) {
              let dx = xs[j] - xi;
              let dy = ys[j] - yi;
              const minDist = ri + radii[j] + 10;
              const distSq = dx * dx + dy * dy;
              if (distSq < minDist * minDist) {
                let dist = Math.sqrt(distSq);
                if (dist < 0.01) {
                  dx = (i - j) * 0.5;
                  dy = (i % 7) - 3;
                  dist = Math.sqrt(dx * dx + dy * dy) || 1;
                }
                const push = ((minDist - dist) / dist) * repFactor;
                const px = dx * push;
                const py = dy * push;
                vx[i] -= px;
                vy[i] -= py;
                vx[j] += px;
                vy[j] += py;
              }
            }
            j = gridNext[j];
          }
        }
      }
    }

    // Springs
    for (let i = 0; i < m; i++) {
      const a = edgeA[i];
      const b = edgeB[i];
      const dx = xs[b] - xs[a];
      const dy = ys[b] - ys[a];
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const pull = ((dist - edgeLen[i]) / dist) * springFactor;
      const px = dx * pull;
      const py = dy * pull;
      vx[a] += px;
      vy[a] += py;
      vx[b] -= px;
      vy[b] -= py;
    }

    // Gentle gravity + damping + clamp
    const maxX = WIDTH - 40;
    const maxY = HEIGHT - 40;
    for (let i = 0; i < n; i++) {
      const nvx = vx[i] + (cx - xs[i]) * gravFactor;
      const nvy = vy[i] + (cy - ys[i]) * gravFactor;
      let nx = xs[i] + nvx;
      let ny = ys[i] + nvy;
      if (nx < 40) nx = 40;
      else if (nx > maxX) nx = maxX;
      if (ny < 40) ny = 40;
      else if (ny > maxY) ny = maxY;
      xs[i] = nx;
      ys[i] = ny;
      vx[i] = nvx * 0.6;
      vy[i] = nvy * 0.6;
    }
  }

  for (let i = 0; i < n; i++) {
    nodes[i].x = xs[i];
    nodes[i].y = ys[i];
  }

  // Pre-join edges into one path string per kind so the SVG renders ~5 <path>
  // elements instead of thousands of <line> nodes.
  const byKind = new Map<MasterEdgeKind, string[]>();
  for (let i = 0; i < m; i++) {
    const e = edges[i];
    const a = nodes[e.a];
    const b = nodes[e.b];
    let arr = byKind.get(e.kind);
    if (!arr) {
      arr = [];
      byKind.set(e.kind, arr);
    }
    arr.push(`M${a.x.toFixed(1)} ${a.y.toFixed(1)}L${b.x.toFixed(1)} ${b.y.toFixed(1)}`);
  }
  const edgesByKind = [...byKind.entries()].map(([kind, parts]) => [kind, parts.join("")] as [MasterEdgeKind, string]);

  return { nodes, edges, edgesByKind };
}
