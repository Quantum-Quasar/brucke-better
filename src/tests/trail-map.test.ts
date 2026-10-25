import { describe, it, expect, beforeEach } from "vitest";
import { TOPICS, TRAIL_BRANCHES, TOTAL_TOPICS, flattenTrailNodes, getNextPlayableLessonId } from "../data/curriculum";
import { LESSONS } from "../data/lessons";
import {
  buildTrailEdgePairs,
  buildTrailLayout,
  getTrailState,
  trailNodeOrder,
  FIRST_NODE_ID,
} from "../lib/trail-map";
import { useAppStore } from "../lib/store";

describe("Curriculum structure", () => {
  // Raised each time a new topic core is authored; shells beyond it stay hollow.
  const AUTHORED_SPINE_LIMIT = 30;

  it("has exactly 30 topics with core ids matching topic ids", () => {
    expect(TOPICS).toHaveLength(TOTAL_TOPICS);
    TOPICS.forEach((topic, i) => {
      expect(topic.id).toBe(i + 1);
      expect(topic.core.id).toBe(topic.id);
      expect(topic.blurb.length).toBeGreaterThan(0);
    });
  });

  it("keeps cluster sizes within the 1–8 lesson budget", () => {
    for (const topic of TOPICS) {
      expect(topic.sprigs.length).toBeLessThanOrEqual(7);
    }
  });

  it("has authored content up to the frontier and hollow shells beyond", () => {
    for (const topic of TOPICS) {
      const authored = LESSONS.find((l) => l.id === topic.core.id);
      if (topic.id <= AUTHORED_SPINE_LIMIT) {
        expect(authored, `topic ${topic.id} core must be authored`).toBeDefined();
        expect(topic.core.authored).toBe(true);
        expect(authored!.title).toBe(topic.core.title);
        // the map signpost shows the cluster title — it must match the authored lesson too
        expect(topic.title).toBe(authored!.title);
      } else {
        expect(authored, `topic ${topic.id} core must not exist yet`).toBeUndefined();
        expect(topic.core.authored).toBeFalsy();
      }
    }
  });

  it("gives every shell a unique id and a non-empty authoring plan", () => {
    const nodes = flattenTrailNodes();
    const ids = new Set(nodes.map((n) => n.id));
    expect(ids.size).toBe(nodes.length);
    for (const node of nodes) {
      expect(node.title.length).toBeGreaterThan(0);
      expect(node.plan.length).toBeGreaterThan(0);
    }
  });

  it("derives the next playable lesson along the authored spine", () => {
    expect(getNextPlayableLessonId(1)).toBe(2);
    expect(getNextPlayableLessonId(9)).toBe(10);
    expect(getNextPlayableLessonId(11)).toBe(12);
    expect(getNextPlayableLessonId(15)).toBe(16);
    expect(getNextPlayableLessonId(AUTHORED_SPINE_LIMIT)).toBeNull();
  });
});

describe("Trail graph", () => {
  const edges = buildTrailEdgePairs();
  const has = (a: number, b: number) => edges.some((e) => (e.a === a && e.b === b) || (e.a === b && e.b === a));

  it("chains every core to the next along the spine", () => {
    for (let t = 1; t < TOTAL_TOPICS; t++) expect(has(t, t + 1), `spine edge ${t}→${t + 1}`).toBe(true);
  });

  it("hangs every sprig directly off its own topic core", () => {
    for (const topic of TOPICS) {
      for (const sprig of topic.sprigs) expect(has(topic.core.id, sprig.id)).toBe(true);
    }
  });

  it("chains branch lessons off their attach node", () => {
    for (const branch of TRAIL_BRANCHES) {
      let prev = branch.attach;
      for (const lesson of branch.lessons) {
        expect(has(prev, lesson.id)).toBe(true);
        prev = lesson.id;
      }
    }
  });
});

describe("Unlock & recommendation logic", () => {
  const available = (completed: number[]) => {
    const state = getTrailState(completed, {});
    return [...state.nodes.entries()].filter(([, v]) => v.status === "available").map(([id]) => id);
  };

  it("starts with only the first node available", () => {
    expect(available([])).toEqual([FIRST_NODE_ID]);
    expect(getTrailState([], {}).recommendedId).toBe(1);
  });

  it("unlocks all adjacent nodes at once (Baba OR-join)", () => {
    const next = available([1]).sort((a, b) => a - b);
    // topic 1 core done → topic 2 core + all topic 1 sprigs + branch 5070's first lesson unlock together
    expect(next).toEqual([2, 101, 102, 103, 5071]);
  });

  it("keeps sprigs skippable and the spine strict", () => {
    // skipping all sprigs: completing cores 1 and 2 must reach core 3
    expect(available([1, 2])).toContain(3);
    // branch lessons attached to topic 2 unlock with core 2
    expect(available([1, 2])).toContain(5011);
    // but branch lesson 2 needs branch lesson 1
    expect(available([1, 2])).not.toContain(5012);
  });

  it("recommends the next authored spine core while one exists", () => {
    expect(getTrailState([1, 2, 3], {}).recommendedId).toBe(4);
    // reaching core 10 in real play requires the Shift Gate open (14★ in topics 1–7)
    const reachable = [...Array.from({ length: 9 }, (_, i) => i + 1), 101, 102, 103, 201, 202, 301, 302];
    expect(getTrailState(reachable, {}).recommendedId).toBe(10);
  });

  it("falls back to the hollow frontier once the authored spine is done", () => {
    const allAuthored = Array.from({ length: 10 }, (_, i) => i + 1);
    const rec = getTrailState(allAuthored, {}).recommendedId;
    // the Shift Gate (14★ of topics 1–7) is still closed at 7 stars, so the selector
    // points at mop-up side lessons inside the gated stretch instead of past the gate
    expect(rec).toBe(702);
    // with both gates open, the frontier recommendation is the first hollow core
    const gatesOpen = [...allAuthored, 101, 102, 103, 201, 202, 301, 302, 801, 802, 901];
    expect(getTrailState(gatesOpen, {}).recommendedId).toBe(11);
  });

  it("never recommends a locked node", () => {
    const state = getTrailState([], {});
    const rec = state.nodes.get(state.recommendedId!);
    expect(rec?.status).toBe("available");
  });
});

describe("Star gates", () => {
  const coreRange = (from: number, to: number) =>
    Array.from({ length: to - from + 1 }, (_, i) => from + i);

  it("stays closed on cores alone and locks everything beyond it", () => {
    const state = getTrailState(coreRange(1, 7), {});
    const gate1 = state.gates.get(1)!;
    expect(gate1.open).toBe(false);
    expect(gate1.stars).toBe(7);
    const core8 = state.nodes.get(8)!;
    expect(core8.status).toBe("locked");
    expect(core8.gate?.title).toBe("The Shift Gate");
    expect(core8.gate?.requiredStars).toBe(14);
    // nodes before the gate are unaffected
    expect(state.nodes.get(7)!.status).toBe("completed");
    // and the spine edge across the gate is dark
    expect(state.litEdges.has("7-8")).toBe(false);
  });

  it("opens once the stretch has enough stars and releases the next stretch", () => {
    // 7 cores + 7 side lessons across topics 1–7 = 14 stars
    const completed = [...coreRange(1, 7), 101, 102, 103, 201, 202, 301, 302];
    const state = getTrailState(completed, {});
    expect(state.gates.get(1)!.open).toBe(true);
    expect(state.nodes.get(8)!.status).toBe("available");
    expect(state.nodes.get(8)!.gate).toBeUndefined();
    expect(state.litEdges.has("7-8")).toBe(true);
    expect(state.recommendedId).toBe(8);
  });

  it("counts stars only inside its own stretch", () => {
    // 14 stars, but every one of them earned beyond the Shift Gate's stretch (topics 8–19)
    const completed = [...coreRange(8, 10), 141, 142, 151, 152, 161, 162, 171, 172, 181, 182, 191];
    const state = getTrailState(completed, {});
    expect(state.gates.get(1)!.stars).toBe(0);
    expect(state.gates.get(1)!.open).toBe(false);
    // nodes 8–10 are already completed, so the closed gate cannot lock them retroactively
    expect(state.nodes.get(8)!.status).toBe("completed");
  });

  it("places every gate between two real cores", () => {
    const layout = buildTrailLayout(640);
    expect(layout.gates).toHaveLength(6);
    for (const gate of layout.gates) {
      const a = layout.nodes.find((n) => n.id === gate.afterTopic)!;
      const b = layout.nodes.find((n) => n.id === gate.afterTopic + 1)!;
      expect(a && b).toBeTruthy();
      // the pill sits between the two cores vertically
      expect(gate.y).toBeGreaterThanOrEqual(Math.min(a.y, b.y) - 60);
      expect(gate.y).toBeLessThanOrEqual(Math.max(a.y, b.y) + 60);
    }
  });
});

describe("Purple star persistence", () => {
  beforeEach(() => {
    useAppStore.getState().resetProgress();
  });

  it("awards purple for perfect runs and never downgrades it", () => {
    const store = useAppStore.getState();
    store.completeLesson(1, { perfect: true });
    expect(useAppStore.getState().lessonStars[1]).toBe("purple");

    useAppStore.getState().completeLesson(1); // flawed replay
    expect(useAppStore.getState().lessonStars[1]).toBe("purple");

    useAppStore.getState().completeLesson(2); // ordinary completion
    expect(useAppStore.getState().lessonStars[2]).toBe("gold");
  });

  it("resets stars with progress", () => {
    useAppStore.getState().completeLesson(1, { perfect: true });
    useAppStore.getState().resetProgress();
    expect(useAppStore.getState().lessonStars).toEqual({});
  });
});

describe("Trail layout", () => {
  const widths = [375, 640, 900];

  it.each(widths)("fits every node inside the canvas at width %i", (width) => {
    const layout = buildTrailLayout(width);
    for (const node of layout.nodes) {
      expect(node.x).toBeGreaterThanOrEqual(9);
      expect(node.x + node.w).toBeLessThanOrEqual(width - 9);
      expect(node.y).toBeGreaterThanOrEqual(0);
      expect(node.y + node.h).toBeLessThanOrEqual(layout.height);
    }
  });

  it.each(widths)("never overlaps two nodes at width %i", (width) => {
    const layout = buildTrailLayout(width);
    const pad = 2;
    for (let i = 0; i < layout.nodes.length; i++) {
      for (let j = i + 1; j < layout.nodes.length; j++) {
        const a = layout.nodes[i];
        const b = layout.nodes[j];
        const separated =
          a.x + a.w + pad <= b.x ||
          b.x + b.w + pad <= a.x ||
          a.y + a.h + pad <= b.y ||
          b.y + b.h + pad <= a.y;
        expect(separated, `${a.id} (${a.kind}) overlaps ${b.id} (${b.kind}) at width ${width}`).toBe(true);
      }
    }
  });

  it("starts at the bottom and climbs upward", () => {
    const layout = buildTrailLayout(640);
    const first = layout.nodes.find((n) => n.id === 1)!;
    const last = layout.nodes.find((n) => n.id === 30)!;
    expect(first.y).toBeGreaterThan(last.y);
  });

  it("contains every curriculum node exactly once", () => {
    const layout = buildTrailLayout(640);
    const order = trailNodeOrder();
    expect(layout.nodes).toHaveLength(order.length);
    expect(new Set(layout.nodes.map((n) => n.id)).size).toBe(order.length);
  });
});

// --- Thinking Method upgrade (TM-1/TM-2): trail-wide content invariants ---

describe("Thinking Method trail invariants", () => {
  it("gives every core lesson from topic 2 on at least one transcribe production drill", () => {
    for (let topic = 2; topic <= TOTAL_TOPICS; topic++) {
      const core = LESSONS.find((l) => l.id === topic);
      expect(core, `core lesson ${topic} exists`).toBeDefined();
      const transcribes = core!.exercises.filter((e) => e.type === "transcribe");
      expect(transcribes.length, `core ${topic} has a transcribe`).toBeGreaterThanOrEqual(1);
    }
  });

  it("gives all seven word-order clusters at least one literal_gloss", () => {
    const WORD_ORDER_CLUSTERS = [2, 12, 13, 14, 15, 20, 27];
    for (const topic of WORD_ORDER_CLUSTERS) {
      const core = LESSONS.find((l) => l.id === topic);
      expect(core, `core lesson ${topic} exists`).toBeDefined();
      const glosses = core!.exercises.filter((e) => e.type === "literal_gloss");
      expect(glosses.length, `core ${topic} has a literal_gloss`).toBeGreaterThanOrEqual(1);
    }
  });

  it("gives every core lesson from topic 2 on exactly one ungraded twist", () => {
    for (let topic = 2; topic <= TOTAL_TOPICS; topic++) {
      const core = LESSONS.find((l) => l.id === topic);
      expect(core, `core lesson ${topic} exists`).toBeDefined();
      expect(core!.twist, `core ${topic} has a twist`).toBeDefined();
    }
  });
});
