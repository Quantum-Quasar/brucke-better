import { describe, it, expect } from "vitest";
import { TOPICS, TRAIL_BRANCHES, flattenTrailNodes } from "../data/curriculum";
import { requiredLessonIds } from "../data/curriculum-core";
import { getTrailState, buildTrailLayout } from "../lib/trail-map";

// The required-grammar mapping (docs/grammar-gap-placement.md, "Implemented"):
// seven core-grammar topics promoted out of the skippable containers. Demoting
// one of these ids back to optional is a curriculum decision — it must fail
// loudly here, never slip through silently.
const REQUIRED_SPRIG_IDS = [1603, 1604, 1904, 1905, 2403, 2404];
const REQUIRED_BRANCH_LESSONS: Record<number, number[]> = {
  5060: [5061, 5062, 5063],
  5080: [5081, 5082],
  5100: [5101, 5102],
  5110: [5111, 5112],
};
const REQUIRED_BRANCH_IDS = Object.keys(REQUIRED_BRANCH_LESSONS).map(Number);
const ALL_REQUIRED_IDS = [
  ...REQUIRED_SPRIG_IDS,
  ...REQUIRED_BRANCH_IDS.flatMap((id) => REQUIRED_BRANCH_LESSONS[id]),
].sort((a, b) => a - b);

const coreRange = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

// Side lessons that top each gate's star quota up from cores alone (14/6/11/9/11/9).
const GATE_FILLERS = [
  101, 201, 301, 401, 501, 601, 701,
  801, 901, 1001,
  1101, 1201, 1301, 1401, 1501,
  1701, 1801, 1901, 1902, 2001,
  2101, 2201, 2301, 2401, 2501,
  2701, 2702, 2703, 2801, 2802, 2901,
];
const ALL_GATE_IDS = [1, 2, 3, 4, 5, 6];
// The pre-capstone spine: every core and required reading story, topics 1–30.
const PRE_CAPSTONE_SPINE = [...coreRange(1, 30), 9001, 9002, 9003, 9004, 9005];
const SPINE_READY = [...PRE_CAPSTONE_SPINE, ...GATE_FILLERS];
const authoredIds = () => flattenTrailNodes().filter((n) => n.authored).map((n) => n.id);

describe("required grammar mapping", () => {
  it("marks exactly the seven grammar gaps required, asserted by id", () => {
    expect([...getTrailState([], {}).requiredIds].sort((a, b) => a - b)).toEqual(ALL_REQUIRED_IDS);
    expect([...requiredLessonIds(TOPICS, TRAIL_BRANCHES)].sort((a, b) => a - b)).toEqual(ALL_REQUIRED_IDS);
  });

  it("flags the four branch specs and leaves every other branch optional", () => {
    for (const branch of TRAIL_BRANCHES) {
      expect(branch.required === true, `branch ${branch.id}`).toBe(REQUIRED_BRANCH_IDS.includes(branch.id));
    }
  });

  it("marks the six sprig shells required", () => {
    const sprigIds = TOPICS.flatMap((t) => t.sprigs.filter((s) => s.required).map((s) => s.id));
    expect(sprigIds.sort((a, b) => a - b)).toEqual(REQUIRED_SPRIG_IDS);
  });
});

describe("completion requires every required lesson", () => {
  it("cannot reach completion while a required lesson is incomplete — each one alone keeps the trail open", () => {
    for (const id of ALL_REQUIRED_IDS) {
      const completed = authoredIds().filter((x) => x !== id);
      const state = getTrailState(completed, {}, undefined, undefined, ALL_GATE_IDS);
      expect(state.recommendedId, `trail must still point at required lesson ${id}`).toBe(id);
    }
  });

  it("reports the trail done only when everything, including Part 2, is complete", () => {
    expect(getTrailState(authoredIds(), {}, undefined, undefined, ALL_GATE_IDS).recommendedId).toBeNull();
  });
});

describe("required lessons cannot be bypassed", () => {
  it("ignores stored bypass counts on required lessons", () => {
    // a learner who skipped 1603 three times before it became required
    const completed = authoredIds().filter((id) => id !== 1603);
    const state = getTrailState(completed, {}, undefined, undefined, ALL_GATE_IDS, { bypasses: { 1603: 3 } });
    expect(state.recommendedId).toBe(1603);
    expect(state.nodes.get(1603)?.status).toBe("available");
  });

  it("never lists a required lesson in missedIds, so Continue ahead cannot suppress it", () => {
    // one optional gap (101) and one required gap (1603) behind the frontier
    const completed = authoredIds().filter((id) => id !== 101 && id !== 1603);
    const state = getTrailState(completed, {}, undefined, undefined, ALL_GATE_IDS);
    expect(state.missedIds).toContain(101);
    expect(state.missedIds).not.toContain(1603);
    // required-first: the recommendation is the required grammar, not the missed optional lesson
    expect(state.recommendedId).toBe(1603);
  });
});

describe("Part 2 unlocks with the pre-capstone spine", () => {
  const PART2_FIRST_LESSONS = [5081, 5101, 5111];

  it("keeps Part 2 locked while the capstone story 9005 is incomplete", () => {
    const withoutCapstoneStory = SPINE_READY.filter((id) => id !== 9005);
    const state = getTrailState(withoutCapstoneStory, {}, undefined, undefined, ALL_GATE_IDS);
    expect(state.nodes.get(9005)?.status).toBe("available");
    for (const id of PART2_FIRST_LESSONS) {
      expect(state.nodes.get(id)?.status, `node ${id}`).toBe("locked");
    }
  });

  it("opens Part 2 once the pre-capstone spine (cores 1–30 + stories) completes", () => {
    const state = getTrailState(SPINE_READY, {}, undefined, undefined, ALL_GATE_IDS);
    for (const id of PART2_FIRST_LESSONS) {
      expect(state.nodes.get(id)?.status, `node ${id}`).toBe("available");
    }
    // branch lesson 2 still chains within its branch
    expect(state.nodes.get(5082)?.status).toBe("locked");
  });

  it("unlocks required sprigs and the imperative branch outward from their topics", () => {
    const state = getTrailState(SPINE_READY, {}, undefined, undefined, ALL_GATE_IDS);
    for (const id of [1603, 1904, 2403, 5061]) {
      expect(state.nodes.get(id)?.status, `node ${id}`).toBe("available");
    }
  });

  it("surfaces the next required grammar lesson once its region is done", () => {
    // just finished core 16 (imperative branch already done): the required
    // reflexives sprigs surface even though optional sprigs of earlier topics
    // remain unplayed
    const completed = [
      ...coreRange(1, 16),
      9001,
      101, 201, 301, 401, 501, 601, 701, 801, 901, 1001,
      1101, 1201, 1301, 1401, 1501,
      5061, 5062, 5063,
    ];
    const state = getTrailState(completed, {}, undefined, undefined, [1, 2]);
    expect(state.nodes.get(1603)?.status).toBe("available");
    expect(state.nodes.get(1601)?.status).toBe("available");
    expect(state.recommendedId).toBe(1603);
  });
});

describe("Part 2 renders as its own labeled region", () => {
  const layout = buildTrailLayout(640);

  it("groups the three post-capstone branches under an epilogue anchor", () => {
    const anchor = layout.topicAnchors.find((a) => a.epilogue);
    expect(anchor?.title).toBe("Part 2: Complex sentences");
    const part2 = layout.nodes.filter((n) => REQUIRED_BRANCH_LESSONS[5080].concat(REQUIRED_BRANCH_LESSONS[5100], REQUIRED_BRANCH_LESSONS[5110]).includes(n.id));
    expect(part2).toHaveLength(6);
    const capstone = layout.nodes.find((n) => n.id === 30)!;
    for (const node of part2) {
      expect(node.required).toBe(true);
      expect(node.groupId).toBe(anchor!.topicId);
      // the region sits beyond topic 30 (the trail climbs upward)
      expect(node.y).toBeLessThan(capstone.y);
    }
  });

  it("keeps the imperative branch required in topic 9's pocket", () => {
    for (const id of REQUIRED_BRANCH_LESSONS[5060]) {
      const node = layout.nodes.find((n) => n.id === id)!;
      expect(node.required).toBe(true);
      expect(node.topicId).toBe(9);
      expect(node.groupId).toBeUndefined();
    }
  });

  it("marks required sprigs on the map and leaves neighbouring sprigs optional", () => {
    for (const id of REQUIRED_SPRIG_IDS) {
      expect(layout.nodes.find((n) => n.id === id)!.required, `sprig ${id}`).toBe(true);
    }
    expect(layout.nodes.find((n) => n.id === 1601)!.required).toBeFalsy();
    expect(layout.nodes.find((n) => n.id === 1903)!.required).toBeFalsy();
    expect(layout.nodes.find((n) => n.id === 2402)!.required).toBeFalsy();
  });
});
