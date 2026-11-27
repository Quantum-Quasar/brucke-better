import { describe, expect, it } from "vitest";
import { GERMAN_CHAPTERS, GERMAN_FINISH, GERMAN_LESSON_CHAPTER, GERMAN_WORLD } from "../data/german-trail";
import { LESSONS } from "../data/lessons";
import { connectedStops, type TrailKey } from "../lib/branching-trail-graph";
import { getGermanTrailProgress, recommendGermanLesson } from "../lib/german-trail-progress";
import { GERMAN_ROUTE_A, GERMAN_ROUTE_B } from "./fixtures/german-trail-routes";

/** Clearing any route into a world junction suffices. Every chapter on that
 * route contributes its threshold of disjoint, distinct lesson completions. */
function worldLowerBound() {
  const cost = new Map<TrailKey, number>();
  for (const { key, value } of GERMAN_WORLD.stops) {
    const before = key === GERMAN_WORLD.entry ? 0 : Math.min(...(GERMAN_WORLD.incoming.get(key) ?? []).map((from) => cost.get(from)!));
    cost.set(key, before + (value === null ? 0 : GERMAN_CHAPTERS[value].clearCount));
  }
  return cost.get(GERMAN_FINISH);
}

const lessonStatus = (done: readonly number[], id: number) => getGermanTrailProgress(done).nodes.get(id)?.status;

describe("German chapter Trail", () => {
  it("opens both arms from 4 but never travels past an uncompleted lesson", () => {
    expect(lessonStatus([1, 2], 6)).toBe("locked");
    expect(lessonStatus([1, 2], 8)).toBe("locked");
    const done = [1, 2, 4];
    expect(connectedStops(GERMAN_CHAPTERS.first.map, 4, "outgoing")).toEqual([6, 202, 8]);
    for (const id of [3, 5, 6, 8]) expect(lessonStatus(done, id)).toBe("available");
    expect(lessonStatus(done, 7)).toBe("locked");
    expect(lessonStatus([...done, 8], 7)).toBe("locked");
    expect(lessonStatus([...done, 6], 7)).toBe("available");
    expect(lessonStatus([1, 3], 5)).toBe("available");
    expect(lessonStatus([1, 3, 5], 6)).toBe("available");
    expect(lessonStatus([1, 102, 201], 8)).toBe("available");
  });

  it("counts distinct completions locally and requires the named skill alternatives", () => {
    const sevenWithoutModals = [1, 102, 3, 5, 6, 7, 8];
    const missing = getGermanTrailProgress(sevenWithoutModals);
    expect(missing.chapters.get("first")).toMatchObject({ count: 7, status: "available", skills: [true, false] });
    expect(missing.chapters.get("sounds")?.status).toBe("locked");
    const six = GERMAN_ROUTE_A[0].slice(0, 6);
    expect(getGermanTrailProgress([...six, six[0], 9005]).chapters.get("first")).toMatchObject({ count: 6, status: "available" });
    for (const done of [GERMAN_ROUTE_A[0], GERMAN_ROUTE_B[0]]) {
      const clear = getGermanTrailProgress(done);
      expect(clear.chapters.get("first")?.status).toBe("completed");
      expect(clear.chapters.get("sounds")?.status).toBe("available");
      expect(clear.chapters.get("words")?.status).toBe("available");
      expect(clear.chapters.get("plans")?.status).toBe("locked");
    }
    expect(lessonStatus(GERMAN_ROUTE_A[0], 5)).toBe("available");
    expect(lessonStatus(GERMAN_ROUTE_B[0], 2)).toBe("available");
  });

  it("keeps old completions and stars without opening disconnected chapters", () => {
    const restored = getGermanTrailProgress([9005, 6], { 9005: "purple" });
    expect(restored.nodes.get(9005)).toEqual({ status: "completed", star: "purple" });
    expect(restored.chapters.get("bridge")).toMatchObject({ status: "locked", count: 1 });
    expect(restored.finished).toBe(false);
    expect(restored.nodes.get(30)?.status).toBe("locked");
    expect(restored.nodes.get(7)?.status).toBe("available");
  });

  it("keeps every published lesson exactly once and reachable without saved progress", () => {
    const assigned = Object.values(GERMAN_CHAPTERS).flatMap(({ map }) => map.stops.flatMap(({ value }) => value === null ? [] : [value]));
    expect(assigned.sort((a, b) => a - b)).toEqual(LESSONS.map(({ id }) => id).sort((a, b) => a - b));
    for (const [chapterId, chapter] of Object.entries(GERMAN_CHAPTERS)) {
      for (const skill of chapter.skills) expect(skill.lessons.every((id) => GERMAN_LESSON_CHAPTER.get(id) === chapterId)).toBe(true);
    }
    const done: number[] = [];
    while (true) {
      const playable = [...getGermanTrailProgress(done).nodes].filter(([, node]) => node.status === "available");
      if (!playable.length) break;
      done.push(...playable.map(([id]) => id));
    }
    expect(done.sort((a, b) => a - b)).toEqual(assigned);
  });

  it("has a provably shortest finish of 85, with two substantially different legal routes", () => {
    const lowerBound = worldLowerBound();
    expect(lowerBound).toBe(85);
    for (const route of [GERMAN_ROUTE_A, GERMAN_ROUTE_B]) {
      const done: number[] = [];
      for (const chapter of route) {
        for (const id of chapter) {
          const progress = getGermanTrailProgress(done);
          expect(progress.finished, `early finish before ${id}`).toBe(false);
          expect(progress.nodes.get(id)?.status, `cannot start lesson ${id}`).toBe("available");
          done.push(id);
        }
        expect(getGermanTrailProgress(done).chapters.get(GERMAN_LESSON_CHAPTER.get(chapter[0])!)?.status).toBe("completed");
      }
      expect(new Set(done).size).toBe(lowerBound);
      const finish = getGermanTrailProgress(done);
      expect(finish.finished).toBe(true);
      expect(finish.chapters.get(route === GERMAN_ROUTE_A ? "words" : "sounds")?.status).toBe("available");
      expect(finish.chapters.get(route === GERMAN_ROUTE_A ? "travel" : "home")?.status).toBe("available");
    }
    const a = new Set(GERMAN_ROUTE_A.flat());
    expect(GERMAN_ROUTE_B.flat().filter((id) => !a.has(id)).length).toBeGreaterThanOrEqual(55);
  });

  it("suggests an open path into the next chapter instead of resurfacing unfinished side lessons", () => {
    const done = GERMAN_ROUTE_A[0];
    const progress = getGermanTrailProgress(done);
    const recommendation = recommendGermanLesson(progress, {});
    expect([301, 401, 501, 21, 2102, 101]).toContain(recommendation);
    expect(progress.nodes.get(recommendation!)?.status).toBe("available");
    expect(progress.nodes.get(5)?.status).toBe("available");
  });
});
