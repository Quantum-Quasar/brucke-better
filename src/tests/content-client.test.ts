import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// The client content loader is the boundary between the JS bundle and the
// per-language JSON under public/data. These tests pin the URL shape, the
// one-fetch-per-language cache, unsupported-language fallbacks and the retry
// behaviour after a failed request.

const COMPENDIUM = {
  words: {
    arm: { id: "arm" },
    hand: { id: "hand" },
  },
  shifts: {},
  compounds: [],
  falseFriends: [],
  dailyInsights: [],
};

const LESSON_INDEX = [{ id: 1, title: "One", word_ids: ["arm"] }];

const LESSON_PAYLOAD = {
  lesson: { id: 1, title: "One" },
  compendium: {
    words: { arm: { id: "arm" } },
    shifts: {},
    compounds: [],
    falseFriends: [],
    dailyInsights: [],
  },
};

function response(payload: unknown, ok = true, status = 200): Response {
  return { ok, status, json: async () => payload } as Response;
}

let requests: string[];
let fetchMock: ReturnType<typeof vi.fn>;
const originalFetch = globalThis.fetch;
const originalVersion = process.env.NEXT_PUBLIC_CONTENT_VERSION;

beforeEach(() => {
  requests = [];
  fetchMock = vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input);
    requests.push(url);
    return response(
      url.includes("lesson-index")
        ? LESSON_INDEX
        : url.includes("/lessons/")
        ? LESSON_PAYLOAD
        : COMPENDIUM
    );
  });
  (globalThis as { fetch: typeof fetch }).fetch = fetchMock as unknown as typeof fetch;
  delete process.env.NEXT_PUBLIC_CONTENT_VERSION;
  vi.resetModules();
});

afterEach(() => {
  (globalThis as { fetch: typeof fetch }).fetch = originalFetch;
  if (originalVersion === undefined) delete process.env.NEXT_PUBLIC_CONTENT_VERSION;
  else process.env.NEXT_PUBLIC_CONTENT_VERSION = originalVersion;
});

describe("client content loading", () => {
  it("loads a compendium once per language and derives wordList", async () => {
    const { loadCompendium } = await import("../lib/content-client");
    const [first, second] = await Promise.all([loadCompendium("de"), loadCompendium("de")]);

    expect(requests).toEqual(["/data/de/compendium.json"]);
    expect(first.wordList.map((word) => word.id)).toEqual(["arm", "hand"]);
    expect(second.wordList.map((word) => word.id)).toEqual(["arm", "hand"]);
  });

  it("returns empty content for languages without an authored bundle", async () => {
    const { loadCompendium, loadLessonIndex } = await import("../lib/content-client");

    const compendium = await loadCompendium("it");
    const lessons = await loadLessonIndex("it");

    expect(compendium.words).toEqual({});
    expect(compendium.wordList).toEqual([]);
    expect(lessons).toEqual([]);
    expect(requests).toEqual([]);
  });

  it("appends the build content version to every data URL", async () => {
    process.env.NEXT_PUBLIC_CONTENT_VERSION = "abc123";
    vi.resetModules();
    const { loadCompendium, loadLessonIndex } = await import("../lib/content-client");

    await loadCompendium("de");
    await loadLessonIndex("fr");

    expect(requests).toEqual([
      "/data/de/compendium.json?v=abc123",
      "/data/fr/lesson-index.json?v=abc123",
    ]);
  });

  it("loads the compact lesson index", async () => {
    const { loadLessonIndex } = await import("../lib/content-client");

    await expect(loadLessonIndex("fr")).resolves.toEqual(LESSON_INDEX);
    expect(requests).toEqual(["/data/fr/lesson-index.json"]);
  });

  it("loads one lesson payload and caches it per id", async () => {
    const { loadLesson } = await import("../lib/content-client");

    const [first, second] = await Promise.all([loadLesson("de", 7), loadLesson("de", 7)]);

    expect(requests).toEqual(["/data/de/lessons/7.json"]);
    expect(first?.lesson.id).toBe(1);
    expect(second).toEqual(first);
  });

  it("returns null for an unsupported language or invalid lesson id", async () => {
    const { loadLesson } = await import("../lib/content-client");

    await expect(loadLesson("it", 1)).resolves.toBeNull();
    await expect(loadLesson("de", 0)).resolves.toBeNull();
    await expect(loadLesson("de", Number.NaN)).resolves.toBeNull();
    expect(requests).toEqual([]);
  });

  it("versions lesson payload URLs", async () => {
    process.env.NEXT_PUBLIC_CONTENT_VERSION = "abc123";
    vi.resetModules();
    const { loadLesson } = await import("../lib/content-client");

    await loadLesson("nl", 3);

    expect(requests).toEqual(["/data/nl/lessons/3.json?v=abc123"]);
  });

  it("propagates the HTTP status and evicts the failed cache entry", async () => {
    let failing = true;
    fetchMock.mockImplementation(async (input: RequestInfo | URL) => {
      requests.push(String(input));
      return failing ? response({}, false, 404) : response(COMPENDIUM);
    });
    const { loadCompendium } = await import("../lib/content-client");

    await expect(loadCompendium("de")).rejects.toMatchObject({ status: 404 });
    failing = false;
    await expect(loadCompendium("de")).resolves.toBeTruthy();

    expect(requests).toHaveLength(2);
  });

  it("warms review and atlas payloads without throwing on failure", async () => {    const { prefetchAtlasContent, prefetchReviewContent } = await import("../lib/content-client");

    prefetchReviewContent("de");
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(requests).toEqual(
      expect.arrayContaining(["/data/de/compendium.json", "/data/de/lesson-index.json"])
    );

    prefetchAtlasContent("fr");
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(requests).toContain("/data/fr/compendium.json");

    // failures are swallowed on purpose; the destination route reports them
    fetchMock.mockRejectedValue(new Error("offline"));
    expect(() => prefetchReviewContent("es")).not.toThrow();
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  it("reloads at most once for a missing dataset, then retries in place", async () => {
    const session = new Map<string, string>();
    const reload = vi.fn();
    (globalThis as any).window = {
      sessionStorage: {
        getItem: (key: string) => session.get(key) ?? null,
        setItem: (key: string, value: string) => {
          session.set(key, String(value));
        },
      },
      location: { reload },
    };
    try {
      const { attemptMissingContentReload } = await import("../lib/content-client");
      expect(attemptMissingContentReload("compendium:de")).toBe(true);
      expect(attemptMissingContentReload("compendium:de")).toBe(false);
      expect(reload).toHaveBeenCalledTimes(1);
    } finally {
      delete (globalThis as any).window;
    }
  });
});
