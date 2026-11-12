import { TOPICS, TRAIL_BRANCHES, TRAIL_GATES, TOTAL_TOPICS } from "@/data/curriculum";
import { orderedTrailLessons, spineNodeIds } from "@/data/curriculum-core";
import type { LessonProgress, LessonStar, TopicCluster, TrailBranch, TrailGate } from "./types";

// ---------------------------------------------------------------------------
// Baba-style trail map engine — pure, deterministic, testable.
//
// The engine is language-agnostic: every function takes a TrailData bundle
// (topics + branches + gates) and defaults to the German trail, so existing
// callers and tests keep working unchanged. The French trail passes its own
// bundle from data/french/curriculum-fr.ts via the language-content registry.
//
// Graph rules:
//   · each required spine node needs every earlier core/story completed
//   · sprigs and branches unlock outward from their attachment, never backward
//   · side lessons remain optional; gates additionally require stars and a pass
//
// Layout rules (bottom → top, like climbing a trail):
//   · topic 1 sits at the bottom, so the map starts where a learner starts
//     and progress visibly climbs upward through the later topics
//   · a gentle serpentine swings the spine sideways on wide canvases
//   · sprigs fan out beside their core (left, right, then second row)
//   · branches chain horizontally on the freer side, tucking into a pocket
//     beside the cluster
// ---------------------------------------------------------------------------

/** Everything the engine needs about one language's trail. */
export interface TrailData {
  topics: TopicCluster[];
  branches: TrailBranch[];
  gates: TrailGate[];
  totalTopics: number;
}

export const GERMAN_TRAIL_DATA: TrailData = {
  topics: TOPICS,
  branches: TRAIL_BRANCHES,
  gates: TRAIL_GATES,
  totalTopics: TOTAL_TOPICS,
};

export type NodeKind = "core" | "story" | "sprig" | "branch";
export type NodeStatus = "completed" | "available" | "locked";

export interface TrailNode {
  id: number;
  kind: NodeKind;
  topicId: number;
  title: string;
  blurb?: string;
  plan: string;
  authored: boolean;
  /** display label for required spine stories, e.g. "s1" */
  label?: string;
  spineStory?: boolean;
  /** top-left corner in final (flipped) map space */
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface TrailEdge {
  a: number;
  b: number;
}

export interface Decoration {
  x: number;
  y: number;
  char: string;
  size: number;
  rotate: number;
}

export interface TopicAnchor {
  topicId: number;
  x: number;
  y: number;
  title: string;
  blurb: string;
}

/** A star gate rendered as a checkpoint pill on the spine between two topic clusters. */
export interface GateMarker extends TrailGate {
  x: number;
  y: number;
}

export interface TrailLayout {
  width: number;
  height: number;
  nodes: TrailNode[];
  edges: TrailEdge[];
  decorations: Decoration[];
  topicAnchors: TopicAnchor[];
  gates: GateMarker[];
}

export const FIRST_NODE_ID = 1;

const CORE_W = 152;
const CORE_H = 58;
const STORY_W = 152;
const STORY_H = 48;
const SPRIG_W = 56;
const SPRIG_H = 46;
const BRANCH_W = 150;
const BRANCH_H = 44;
const GATE_W = 168;
const GATE_H = 40;
const LABEL_H = 30;
const TOPIC_GAP = 50;
const SIDE_GAP = 16;
const EDGE_PAD = 10;
const TOP_PAD = 54;
const BOTTOM_PAD = 64;
const ANCHOR_H = 20;

export const nodeSize = (kind: NodeKind) =>
  kind === "core"
    ? { w: CORE_W, h: CORE_H }
    : kind === "story"
    ? { w: STORY_W, h: STORY_H }
    : kind === "sprig"
    ? { w: SPRIG_W, h: SPRIG_H }
    : { w: BRANCH_W, h: BRANCH_H };

const clampX = (x: number, w: number, width: number) => Math.min(Math.max(x, EDGE_PAD), width - EDGE_PAD - w);

/** Unique undirected edge pairs of the trail graph (id-space only, layout-free). */
export function buildTrailEdgePairs(data: TrailData = GERMAN_TRAIL_DATA): TrailEdge[] {
  const edges: TrailEdge[] = [];
  const spine = spineNodeIds(data.topics);
  for (let i = 0; i < spine.length - 1; i++) {
    edges.push({ a: spine[i], b: spine[i + 1] });
  }
  for (const topic of data.topics) {
    for (const sprig of topic.sprigs) edges.push({ a: topic.core.id, b: sprig.id });
  }
  for (const branch of data.branches) {
    let prev = branch.attach;
    for (const lesson of branch.lessons) {
      edges.push({ a: prev, b: lesson.id });
      prev = lesson.id;
    }
  }
  return edges;
}

/** Directed prerequisites; decorative undirected edges must never grant access. */
export function buildTrailPrerequisites(data: TrailData = GERMAN_TRAIL_DATA): Map<number, number | null> {
  const prerequisites = new Map<number, number | null>();
  const spine = spineNodeIds(data.topics);
  spine.forEach((id, index) => prerequisites.set(id, index === 0 ? null : spine[index - 1]));
  for (const topic of data.topics) {
    for (const sprig of topic.sprigs) prerequisites.set(sprig.id, topic.core.id);
  }
  for (const branch of data.branches) {
    let previous = branch.attach;
    for (const lesson of branch.lessons) {
      prerequisites.set(lesson.id, previous);
      previous = lesson.id;
    }
  }
  return prerequisites;
}

const GERMAN_EDGES = buildTrailEdgePairs(GERMAN_TRAIL_DATA);

/** Unique undirected edge pairs of the German trail (legacy export, German-bound). */
export const TRAIL_EDGE_PAIRS: TrailEdge[] = GERMAN_EDGES;


/**
 * Full layout for a given canvas width. Deterministic — same width, same map.
 * `decoChars` scatters the faint watermark characters (per-language).
 */
export function buildTrailLayout(width: number, data: TrailData = GERMAN_TRAIL_DATA, decoChars?: string[]): TrailLayout {
  const safeWidth = Number.isFinite(width) ? width : 640;
  const w = Math.min(Math.max(Math.round(safeWidth), 320), 980);
  const centerX = w / 2;
  const swing = Math.min(150, Math.max(0, (w - 380) / 2));
  const nodes: TrailNode[] = [];
  const anchors: TopicAnchor[] = [];

  let cursor = TOP_PAD;

  for (const topic of data.topics) {
    const clusterTop = cursor;
    const coreX = clampX(centerX + swing * Math.sin(topic.id * 1.7), CORE_W, w);
    const coreY = clusterTop + LABEL_H;

    // ideal positions relative to the core, then the whole cluster is group-clamped
    // into the canvas so the serpentine can never push a sprig off-screen or on top
    // of its core (offsets are edge-to-edge, not center-to-center)
    const cluster: TrailNode[] = [];
    cluster.push({
      id: topic.core.id,
      kind: "core",
      topicId: topic.id,
      title: topic.title,
      blurb: topic.blurb,
      plan: topic.core.plan,
      authored: Boolean(topic.core.authored),
      x: coreX,
      y: coreY,
      w: CORE_W,
      h: CORE_H,
    });

    topic.sprigs.forEach((sprig, j) => {
      const side = j % 2 === 0 ? -1 : 1;
      const row = Math.floor(j / 2);
      // sprigs sit symmetrically around the core center: 16px gaps on both flanks,
      // extra rows stacked directly below their row-0 sibling
      cluster.push({
        id: sprig.id,
        kind: "sprig",
        topicId: topic.id,
        title: sprig.title,
        plan: sprig.plan,
        authored: Boolean(sprig.authored),
        x: coreX + (side === 1 ? CORE_W + SIDE_GAP : -(SPRIG_W + SIDE_GAP)),
        y: coreY + (CORE_H - SPRIG_H) / 2 + row * (SPRIG_H + 9),
        w: SPRIG_W,
        h: SPRIG_H,
      });
    });

    // single-pass group clamp: push the cluster fully into the canvas when it fits
    // (span 296 ≤ usable width for every supported canvas), pinning left otherwise
    let left = Math.min(...cluster.map((n) => n.x));
    let right = Math.max(...cluster.map((n) => n.x + n.w));
    let shift = 0;
    if (right > w - EDGE_PAD) shift = w - EDGE_PAD - right;
    if (left + shift < EDGE_PAD) shift = EDGE_PAD - left;
    if (shift !== 0) for (const n of cluster) n.x += shift;

    nodes.push(...cluster);
    const shiftedCore = cluster[0];
    anchors.push({
      topicId: topic.id,
      x: shiftedCore.x,
      y: clusterTop + 4,
      title: topic.title,
      blurb: topic.blurb,
    });

    let clusterBottom = Math.max(...cluster.map((n) => n.y + n.h));

    // Required stories sit on the spine directly below the core cluster and
    // before any optional branches, so the main path visibly passes through them.
    for (const story of topic.stories ?? []) {
      const sy = clusterBottom + 12;
      nodes.push({
        id: story.id,
        kind: "story",
        topicId: topic.id,
        title: story.title,
        plan: story.plan,
        authored: Boolean(story.authored),
        label: story.label,
        spineStory: true,
        x: clampX(shiftedCore.x, STORY_W, w),
        y: sy,
        w: STORY_W,
        h: STORY_H,
      });
      clusterBottom = Math.max(clusterBottom, sy + STORY_H);
    }

    for (const branch of data.branches) {
      if (branch.attach !== topic.core.id && !topic.sprigs.some((lesson) => lesson.id === branch.attach) && !(topic.stories ?? []).some((lesson) => lesson.id === branch.attach)) continue;
      // branches tuck into a side pocket below the cluster (sprigs own the flanks)
      const sprigSides = topic.sprigs.map((_, j) => (j % 2 === 0 ? -1 : 1));
      const side = sprigSides.filter((s) => s === 1).length <= sprigSides.filter((s) => s === -1).length ? 1 : -1;
      let bx = clampX(shiftedCore.x + side * 12, BRANCH_W, w);
      let by = clusterBottom + 12;
      branch.lessons.forEach((lesson, i) => {
        if (i > 0) {
          const nextX = bx + side * (BRANCH_W + 24);
          if (nextX < EDGE_PAD || nextX + BRANCH_W > w - EDGE_PAD) {
            bx = clampX(shiftedCore.x + side * 12, BRANCH_W, w);
            by += BRANCH_H + 9;
          } else {
            bx = nextX;
          }
        }
        nodes.push({
          id: lesson.id,
          kind: "branch",
          topicId: topic.id,
          title: lesson.title,
          plan: lesson.plan,
          authored: Boolean(lesson.authored),
          x: bx,
          y: by,
          w: BRANCH_W,
          h: BRANCH_H,
        });
        clusterBottom = Math.max(clusterBottom, by + BRANCH_H);
      });
    }

    cursor = clusterBottom + TOPIC_GAP;
  }

  const height = cursor - TOPIC_GAP + BOTTOM_PAD;

  // The trail climbs: topic 1 sits at the bottom. Build top-down for simple
  // stacking, then mirror the whole map around its horizontal midline.
  // Integer geometry keeps SSR and client SVG/CSS output byte-identical.
  for (const node of nodes) {
    node.x = Math.round(node.x);
    node.y = Math.round(height - node.y - node.h);
  }
  for (const anchor of anchors) {
    anchor.x = Math.round(anchor.x);
    anchor.y = Math.round(height - anchor.y - ANCHOR_H);
  }

  const decorations = buildDecorations(w, height, decoChars).map((decoration) => ({
    ...decoration,
    y: Math.max(0, Math.round(height - decoration.y - decoration.size)),
  }));

  // gate checkpoint pills sit between the stretch's last spine node (a story
  // when one is inserted there) and the next core.
  const nodeById = new Map(nodes.map((n) => [n.id, n]));
  const gates: GateMarker[] = [];
  for (const gate of data.gates) {
    const topicIndex = data.topics.findIndex((topic) => topic.id === gate.afterTopic);
    const topic = data.topics[topicIndex];
    const stories = topic?.stories ?? [];
    const lowerId = stories.length > 0 ? stories[stories.length - 1].id : topic?.core.id;
    const upperId = data.topics[topicIndex + 1]?.core.id;
    const a = lowerId === undefined ? undefined : nodeById.get(lowerId);
    const b = upperId === undefined ? undefined : nodeById.get(upperId);
    if (!a || !b) continue;
    const midX = (a.x + a.w / 2 + b.x + b.w / 2) / 2 - GATE_W / 2;
    const midY = (a.y + a.h / 2 + b.y + b.h / 2) / 2 - GATE_H / 2;
    gates.push({
      ...gate,
      x: Math.round(clampX(midX, GATE_W, w)),
      y: Math.round(Math.min(Math.max(midY, EDGE_PAD), height - EDGE_PAD - GATE_H)),
    });
  }

  return { width: w, height, nodes, edges: buildTrailEdgePairs(data), decorations, topicAnchors: anchors, gates };
}

const GERMAN_DECO_CHARS = ["ß", "ü", "ö", "ä", "ß", "§"];

function buildDecorations(width: number, height: number, chars?: string[]): Decoration[] {
  const decoChars = chars && chars.length > 0 ? chars : GERMAN_DECO_CHARS;
  const count = Math.floor(height / 150);
  const out: Decoration[] = [];
  let seed = 42;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  for (let i = 0; i < count; i++) {
    out.push({
      x: Math.round(24 + rand() * (width - 48)),
      y: Math.round(rand() * height),
      char: decoChars[i % decoChars.length],
      size: 34 + Math.floor(rand() * 80),
      rotate: Math.round(rand() * 50 - 25),
    });
  }
  return out;
}

// ---------------------------------------------------------------------------
// State computation
// ---------------------------------------------------------------------------

/** Gate info attached to nodes sitting beyond a closed gate (the gate is closed by definition). */
export interface NodeGateInfo {
  id: number;
  title: string;
  why: string;
  requiredStars: number;
  stars: number;
  fromTopic: number;
  toTopic: number;
}

export interface NodeView {
  status: NodeStatus;
  star?: LessonStar;
  /** set when the node sits beyond a closed star gate */
  gate?: NodeGateInfo;
}

export interface GateView {
  open: boolean;
  passed: boolean;
  stars: number;
  fromTopic: number;
  toTopic: number;
}

export interface TrailState {
  nodes: Map<number, NodeView>;
  /** edge is lit when it touches completed territory or opens available ground */
  litEdges: Set<string>;
  recommendedId: number | null;
  forwardId: number | null;
  missedIds: number[];
  gates: Map<number, GateView>;
}

const edgeKey = (a: number, b: number) => `${Math.min(a, b)}-${Math.max(a, b)}`;

/**
 * Trail state for a language's graph. `data` defaults to the German trail so
 * existing callers (and tests) are unaffected; the French trail passes its own.
 */
export function getTrailState(
  completed: number[],
  stars: Record<number, LessonStar> = {},
  nodes?: Array<Pick<TrailNode, "id" | "kind" | "topicId">>,
  data: TrailData = GERMAN_TRAIL_DATA,
  passedGateIds: number[] = [],
  recommendation: {
    lessonProgress?: Record<number, LessonProgress>;
    bypasses?: Record<number, number>;
  } = {}
): TrailState {
  const completedSet = new Set(completed);
  const view = new Map<number, NodeView>();
  const topicByLesson = new Map<number, number>();
  for (const topic of data.topics) {
    for (const lesson of [topic.core, ...(topic.stories ?? []), ...topic.sprigs]) {
      topicByLesson.set(lesson.id, topic.id);
    }
  }
  for (const branch of data.branches) {
    const topicId = topicByLesson.get(branch.attach);
    if (topicId !== undefined) {
      for (const lesson of branch.lessons) topicByLesson.set(lesson.id, topicId);
    }
  }
  const fallback: Array<Pick<TrailNode, "id" | "kind" | "topicId">> = [
    ...data.topics.flatMap((t) => [
      { id: t.core.id, kind: "core" as const, topicId: t.id },
      ...(t.stories ?? []).map((s) => ({ id: s.id, kind: "story" as const, topicId: t.id })),
      ...t.sprigs.map((s) => ({ id: s.id, kind: "sprig" as const, topicId: t.id })),
    ]),
    ...data.branches.flatMap((b) => b.lessons.map((l) => ({ id: l.id, kind: "branch" as const, topicId: topicByLesson.get(l.id) ?? b.attach }))),
  ];
  const allNodes = nodes ?? fallback;

  const gates = data.gates;
  const edgePairs = buildTrailEdgePairs(data);
  const prerequisites = buildTrailPrerequisites(data);
  const prerequisiteCache = new Map<number, boolean>();
  const prerequisitesComplete = (id: number): boolean => {
    const cached = prerequisiteCache.get(id);
    if (cached !== undefined) return cached;
    const previous = prerequisites.get(id);
    const ready = previous === null || (previous !== undefined && completedSet.has(previous) && prerequisitesComplete(previous));
    prerequisiteCache.set(id, ready);
    return ready;
  };

  // Required spine completion, region stars and a checkpoint pass all matter.
  const topicById = new Map(allNodes.map((n) => [n.id, n.topicId]));
  const gateViews = new Map<number, GateView>();
  const passedGates = new Set(passedGateIds);
  gates.forEach((gate, i) => {
    const { fromTopic, toTopic } = gateRegion(gates, i);
    const regionStars = Array.from(completedSet).filter((id) => {
      const t = topicById.get(id);
      return t !== undefined && t >= fromTopic && t <= toTopic;
    }).length;
    const passed = passedGates.has(gate.id);
    const spineComplete = data.topics
      .filter((topic) => topic.id <= gate.afterTopic)
      .every((topic) => [topic.core, ...(topic.stories ?? [])].every((lesson) => completedSet.has(lesson.id)));
    gateViews.set(gate.id, { open: spineComplete && regionStars >= gate.requiredStars && passed, passed, stars: regionStars, fromTopic, toTopic });
  });
  // the first closed gate at or before a node's topic blocks it (the spine is strict,
  // so a closed gate locks everything beyond it)
  const closedGateBefore = (topicId: number) => {
    for (let i = 0; i < gates.length; i++) {
      if (gates[i].afterTopic < topicId && !gateViews.get(gates[i].id)!.open) {
        const { fromTopic, toTopic } = gateRegion(gates, i);
        return { gate: gates[i], stars: gateViews.get(gates[i].id)!.stars, fromTopic, toTopic };
      }
    }
    return null;
  };

  for (const node of allNodes) {
    const blocked = closedGateBefore(node.topicId);
    const status: NodeStatus = completedSet.has(node.id)
      ? "completed"
      : blocked
      ? "locked"
      : prerequisitesComplete(node.id)
      ? "available"
      : "locked";
    view.set(node.id, {
      status,
      star: stars[node.id],
      gate: blocked
        ? {
            id: blocked.gate.id,
            title: blocked.gate.title,
            why: blocked.gate.why,
            requiredStars: blocked.gate.requiredStars,
            stars: blocked.stars,
            fromTopic: blocked.fromTopic,
            toTopic: blocked.toTopic,
          }
        : undefined,
    });
  }

  const litEdges = new Set<string>();
  const gateBoundaryLower = (topicId: number) => {
    const topic = data.topics.find((t) => t.id === topicId);
    const stories = topic?.stories ?? [];
    return stories.length > 0 ? stories[stories.length - 1].id : topic?.core.id;
  };
  for (const { a, b } of edgePairs) {
    const sa = view.get(a)?.status ?? "locked";
    const sb = view.get(b)?.status ?? "locked";
    const crossesClosedGate = gates.some((g) => {
      if (gateViews.get(g.id)!.open) return false;
      const lower = gateBoundaryLower(g.afterTopic);
      const topicIndex = data.topics.findIndex((topic) => topic.id === g.afterTopic);
      const upper = data.topics[topicIndex + 1]?.core.id;
      return (a === lower && b === upper) || (b === lower && a === upper);
    });
    if (crossesClosedGate) continue;
    if (sa === "completed" || sb === "completed" || (sa === "available" && sb === "available")) {
      litEdges.add(edgeKey(a, b));
    }
  }

  const ordered = orderedTrailLessons(data.topics, data.branches).filter((lesson) => lesson.authored);
  const started = recommendation.lessonProgress ?? {};
  const bypasses = recommendation.bypasses ?? {};
  let frontier = 0;
  ordered.forEach((lesson, index) => {
    if (completedSet.has(lesson.id)) frontier = Math.max(frontier, index + 1);
    else if (started[lesson.id]) frontier = Math.max(frontier, index);
  });
  const available = ordered.filter((lesson) => view.get(lesson.id)?.status === "available");
  const missedIds = ordered.slice(0, frontier)
    .filter((lesson) => view.get(lesson.id)?.status === "available" && (bypasses[lesson.id] ?? 0) < 3)
    .map((lesson) => lesson.id);
  const forwardId = ordered.slice(frontier)
    .find((lesson) => view.get(lesson.id)?.status === "available")?.id ?? null;
  const recommendedId = missedIds[0] ??
    available.find((lesson) => (bypasses[lesson.id] ?? 0) < 3)?.id ?? null;

  return { nodes: view, litEdges, recommendedId, forwardId, missedIds, gates: gateViews };
}

/** topic range each gate closes: (previous gate's afterTopic, gate.afterTopic] */
const gateRegion = (gates: TrailGate[], index: number): { fromTopic: number; toTopic: number } => ({
  fromTopic: index === 0 ? 1 : gates[index - 1].afterTopic + 1,
  toTopic: gates[index].afterTopic,
});

/** The same full-course order used by recommendations and lesson continuation. */
export const trailNodeOrder = (data: TrailData = GERMAN_TRAIL_DATA): number[] =>
  orderedTrailLessons(data.topics, data.branches).map((lesson) => lesson.id);
