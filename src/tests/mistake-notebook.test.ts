import { describe, expect, it } from "vitest";
import {
  classifyMistakeType,
  clearAllMistakes,
  clearMistakesByType,
  groupMistakesByType,
  loadMistakes,
  MAX_STORED_MISTAKES_PER_LANGUAGE,
  recordMistake,
  resolveMistake,
} from "@/lib/mistake-notebook";
import {
  clearPracticeDates,
  countPracticeDaysInLast7Days,
  getWeeklyPracticeSummary,
  loadPracticeDates,
  recordPracticeDay,
  toLocalDateKey,
} from "@/lib/weekly-practice";

function createMemoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear() {
      map.clear();
    },
    getItem(key: string) {
      return map.get(key) ?? null;
    },
    key(index: number) {
      return [...map.keys()][index] ?? null;
    },
    removeItem(key: string) {
      map.delete(key);
    },
    setItem(key: string, value: string) {
      map.set(key, value);
    },
  };
}

describe("mistake notebook", () => {
  it("classifies word_order, gender, umlaut, capitalization, and spelling errors", () => {
    expect(
      classifyMistakeType({
        languageId: "de",
        attempt: "Ich morgen gehe nach Hause",
        expected: "Ich gehe morgen nach Hause",
      }),
    ).toBe("word_order");

    expect(
      classifyMistakeType({
        languageId: "de",
        attempt: "die Haus",
        expected: "das Haus",
      }),
    ).toBe("gender");

    expect(
      classifyMistakeType({
        languageId: "de",
        attempt: "Tur",
        expected: "Tür",
      }),
    ).toBe("umlaut");

    expect(
      classifyMistakeType({
        languageId: "de",
        attempt: "das wasser",
        expected: "das Wasser",
      }),
    ).toBe("capitalization");

    expect(
      classifyMistakeType({
        languageId: "de",
        attempt: "Schip",
        expected: "Schiff",
      }),
    ).toBe("spelling");
  });

  it("scopes article matching by languageId and classifies single-token article clozes", () => {
    // French preposition "de" should not be treated as a Dutch article swap
    expect(
      classifyMistakeType({
        languageId: "fr",
        attempt: "de café",
        expected: "du café",
      }),
    ).toBe("spelling");

    // Spanish article swap (el vs la) is classified as gender
    expect(
      classifyMistakeType({
        languageId: "es",
        attempt: "el casa",
        expected: "la casa",
      }),
    ).toBe("gender");

    // Single-token article cloze (der vs das) is classified as gender
    expect(
      classifyMistakeType({
        languageId: "de",
        attempt: "der",
        expected: "das",
      }),
    ).toBe("gender");
  });

  it("records, deduplicates, groups by error type, and resolves/clears mistakes", () => {
    const storage = createMemoryStorage();

    const first = recordMistake(
      {
        languageId: "de",
        prompt: "Translate 'the house'",
        attempt: "die Haus",
        expected: "das Haus",
        now: new Date(2026, 10, 20, 10, 0, 0),
      },
      storage,
    );
    const duplicate = recordMistake(
      {
        languageId: "de",
        prompt: "Translate 'the house'",
        attempt: "die Haus",
        expected: "das Haus",
        now: new Date(2026, 10, 21, 10, 0, 0),
      },
      storage,
    );
    recordMistake(
      {
        languageId: "de",
        prompt: "Build the sentence",
        attempt: "Heute ich komme",
        expected: "Heute komme ich",
        now: new Date(2026, 10, 21, 11, 0, 0),
      },
      storage,
    );
    recordMistake(
      {
        languageId: "fr",
        prompt: "Translate 'the book'",
        attempt: "la livre",
        expected: "le livre",
        now: new Date(2026, 10, 21, 12, 0, 0),
      },
      storage,
    );

    expect(first?.id).toBe(duplicate?.id);
    expect(duplicate?.count).toBe(2);

    const all = loadMistakes(storage);
    const deGrouped = groupMistakesByType(all, "de");
    expect(deGrouped.gender).toHaveLength(1);
    expect(deGrouped.gender[0].count).toBe(2);
    expect(deGrouped.word_order).toHaveLength(1);
    expect(deGrouped.spelling).toHaveLength(0);

    resolveMistake(first!.id, storage);
    expect(groupMistakesByType(loadMistakes(storage), "de").gender).toHaveLength(0);

    clearMistakesByType("word_order", "de", storage);
    expect(groupMistakesByType(loadMistakes(storage), "de").word_order).toHaveLength(0);
    // French entry stays intact
    expect(groupMistakesByType(loadMistakes(storage), "fr").gender).toHaveLength(1);

    clearAllMistakes("fr", storage);
    expect(loadMistakes(storage)).toHaveLength(0);
  });

  it("caps stored mistakes per language so heavy usage in one language does not evict another", () => {
    const storage = createMemoryStorage();
    recordMistake(
      {
        languageId: "fr",
        prompt: "Translate 'the book'",
        attempt: "la livre",
        expected: "le livre",
      },
      storage,
    );
    for (let i = 0; i < MAX_STORED_MISTAKES_PER_LANGUAGE + 5; i += 1) {
      recordMistake(
        {
          languageId: "de",
          prompt: `Item ${i}`,
          attempt: `wrong${i}`,
          expected: `right${i}`,
        },
        storage,
      );
    }
    const all = loadMistakes(storage);
    const deCount = all.filter((e) => e.languageId === "de").length;
    const frCount = all.filter((e) => e.languageId === "fr").length;
    expect(deCount).toBe(MAX_STORED_MISTAKES_PER_LANGUAGE);
    expect(frCount).toBe(1);
  });
});

describe("weekly practice tracker", () => {
  it("counts unique local calendar dates within the rolling 7-day window", () => {
    const today = new Date(2026, 10, 23, 14, 0, 0); // 2026-11-23
    const dates = [
      "2026-11-15", // 8 days ago -> outside 7-day window
      "2026-11-16", // 7 days ago -> outside 7-day window (window is Nov 17..23)
      "2026-11-17", // day 1 of window
      "2026-11-19",
      "2026-11-19", // duplicate
      "2026-11-23", // today
    ];
    expect(countPracticeDaysInLast7Days(dates, today)).toBe(3);
  });

  it("records practice days idempotently, summarizes the week, and clears cleanly", () => {
    const storage = createMemoryStorage();
    const day1 = new Date(2026, 10, 20, 9, 30, 0);
    const day2a = new Date(2026, 10, 23, 8, 0, 0);
    const day2b = new Date(2026, 10, 23, 21, 15, 0);

    recordPracticeDay(day1, storage);
    recordPracticeDay(day2a, storage);
    recordPracticeDay(day2b, storage);

    expect(loadPracticeDates(storage)).toEqual([
      toLocalDateKey(day1),
      toLocalDateKey(day2a),
    ]);

    const summary = getWeeklyPracticeSummary(day2b, storage);
    expect(summary.daysPracticed).toBe(2);
    expect(summary.windowDays).toBe(7);
    expect(summary.practicedToday).toBe(true);

    clearPracticeDates(storage);
    expect(loadPracticeDates(storage)).toEqual([]);
  });
});
