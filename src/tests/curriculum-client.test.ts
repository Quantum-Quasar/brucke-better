import { describe, expect, it, vi } from "vitest";

// German is bundled so the landing page and trail can paint without a request;
// French and Spanish are dynamic chunks. These tests pin both halves and the
// per-language cache.

async function freshModule() {
  vi.resetModules();
  return import("../data/curriculum-client");
}

describe("lazy curriculum client", () => {
  it("exposes German synchronously", async () => {
    const { peekCurriculum } = await freshModule();
    const german = peekCurriculum("de");

    expect(german).not.toBeNull();
    expect(german!.topics.length).toBe(30);
    expect(german!.totalTopics).toBe(30);
    expect(german!.lessonCount).toBe(179);
  });

  it("loads French on demand and caches the result", async () => {
    const { loadCurriculum, peekCurriculum } = await freshModule();
    expect(peekCurriculum("fr")).toBeNull();

    const first = await loadCurriculum("fr");
    expect(first.topics.length).toBe(30);
    expect(first.totalTopics).toBe(30);
    expect(first.lessonCount).toBe(123);
    expect(peekCurriculum("fr")).toBe(first);

    const second = await loadCurriculum("fr");
    expect(second).toBe(first);
  });

  it("loads Spanish on demand", async () => {
    const { loadCurriculum } = await freshModule();
    const spanish = await loadCurriculum("es");

    expect(spanish.topics.length).toBe(30);
    expect(spanish.lessonCount).toBe(123);
  });

  it("returns the empty curriculum for unknown languages", async () => {
    const { loadCurriculum, peekCurriculum } = await freshModule();

    const unknown = await loadCurriculum("it");
    expect(unknown.topics).toEqual([]);
    expect(unknown.totalTopics).toBe(0);
    expect(peekCurriculum("it")).toBe(unknown);
  });
});
