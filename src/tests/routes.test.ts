import { describe, expect, test } from "vitest";
import { lessonHref, parseLessonHref } from "@/lib/routes";

describe("language-scoped lesson URLs", () => {
  test("encode the language and lesson id", () => {
    expect(lessonHref("de", 1)).toBe("/trail/de/1");
    expect(lessonHref("fr", 1102)).toBe("/trail/fr/1102");
    expect(lessonHref("es", 30)).toBe("/trail/es/30");
  });

  test("parses language-scoped lesson hrefs", () => {
    expect(parseLessonHref("/trail/de/1")).toEqual({ languageId: "de", lessonId: 1 });
    expect(parseLessonHref("/trail/fr/1102/")).toEqual({ languageId: "fr", lessonId: 1102 });
    expect(parseLessonHref("/trail/1")).toBeNull();
    expect(parseLessonHref("/atlas/x")).toBeNull();
    expect(parseLessonHref("/trail/de/not-a-number")).toBeNull();
  });
});
