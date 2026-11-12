import { describe, expect, it } from "vitest";
import { getLanguageContent } from "@/data/language-content";
import { buildSearchIndex, searchIndex } from "@/lib/search-index";
import { buildTeachingLessonMap } from "@/lib/teaching-lessons";
import { getPublishedLesson, getPublishedLessonRoutes, lessonLearningResource } from "@/lib/lesson-catalog";
import { parseLessonHref } from "@/lib/routes";

const german = getLanguageContent("de");
const index = buildSearchIndex("de", german.compendium!, german.lessons);

describe("search using authored course content", () => {
  it("finds Gift's actual meaning, vergessen and dative lessons", () => {
    const gift = searchIndex(index, "Gift").find((entry) => entry.kind === "word" && entry.title === "Gift");
    expect(gift?.description.toLowerCase()).toContain("poison");
    expect(searchIndex(index, "poison")).toContainEqual(gift);
    const vergessen = searchIndex(index, "vergessen").find((entry) => entry.kind === "word" && entry.title === "vergessen");
    expect(vergessen?.description.toLowerCase()).toContain("forget");
    expect(vergessen?.lessons.length).toBeGreaterThan(0);
    expect(searchIndex(index, "dative").some((entry) => entry.kind === "lesson" && /dative/i.test(entry.title))).toBe(true);
  });

  it("searches cognates and scopes every result and lesson link to its course", () => {
    for (const lang of ["de", "fr", "es", "nl"]) {
      const data = getLanguageContent(lang);
      const entries = buildSearchIndex(lang, data.compendium!, data.lessons);
      const word = Object.values(data.compendium!.words).find((item) => item.english_cognate.trim());
      expect(word).toBeDefined();
      expect(searchIndex(entries, word!.english_cognate, entries.length).some((entry) => entry.id === word!.id && entry.kind === "word")).toBe(true);
      for (const entry of entries) {
        expect(entry.languageId).toBe(lang);
        for (const link of entry.lessons) {
          expect(parseLessonHref(link.href)).toEqual({ languageId: lang, lessonId: link.id });
          expect(getPublishedLesson(lang, String(link.id))?.title).toBe(link.title);
          if (entry.kind === "word") {
            const lesson = getPublishedLesson(lang, String(link.id))!;
            expect([...lesson.word_ids, ...lesson.table_word_ids]).toContain(entry.id);
          }
        }
      }
    }
  });

  it("maps table words, articles and sentences without inventing teaching lessons", () => {
    const map = buildTeachingLessonMap(german.lessons);
    const lesson = german.lessons.find((item) => item.table_word_ids.some((id) => !item.word_ids.includes(id)))!;
    const tableOnly = lesson.table_word_ids.find((id) => !lesson.word_ids.includes(id))!;
    expect(map.get(tableOnly)).toContain(lesson.id);
    expect(map.get(`article_${tableOnly}`)).toEqual(map.get(tableOnly));
    expect(map.get(`sentence_${lesson.id}`)).toEqual([lesson.id]);
    expect(map.get("not-authored")).toBeUndefined();
    expect(searchIndex(index, "totally absent vocabulary 987654321")).toEqual([]);
    expect(searchIndex(index, "   ")).toEqual([]);
  });
});

describe("crawlable lesson catalog", () => {
  it("only publishes real authored route targets", () => {
    const routes = getPublishedLessonRoutes();
    expect(routes.length).toBeGreaterThan(0);
    expect(new Set(routes.map((route) => route.href)).size).toBe(routes.length);
    for (const route of routes) expect(getPublishedLesson(route.lang, route.id)).not.toBeNull();
    for (const [lang, id] of [["zz", "1"], ["de", "0"], ["de", "9999999"], ["de", "1oops"], ["de", "01"]]) expect(getPublishedLesson(lang, id)).toBeNull();
  });

  it("describes visible authored learning content without fabricated SEO claims", () => {
    const lesson = getPublishedLesson("de", "1")!;
    const resource = lessonLearningResource(lesson, "de", "https://example.com/trail/de/1");
    expect(resource["@type"]).toBe("LearningResource");
    expect(resource.name).toBe(lesson.title);
    expect(resource.description).toBe(lesson.subtitle);
    expect(resource.teaches).toEqual([lesson.summary.outcome, lesson.summary.takeaway]);
    expect(resource).not.toHaveProperty("aggregateRating");
    expect(resource).not.toHaveProperty("timeRequired");
  });
});
