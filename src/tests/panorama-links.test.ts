import { describe, test, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// ponytail: the panorama's footer claims "where this is taught". Every link
// must point at the lesson that teaches that structure *in that language*, and
// the "Topic N" it advertises must be the topic the lesson id encodes. The bug
// this pins shut: the footer used to write `/trail/N` by hand beside a
// hand-written label, and both drifted (German dative is 20 not 19, French
// negation is 4 not 12, Spanish ser/estar is 5 not 9, …).

import { getLanguageContent } from "@/data/language-content";
import {
  PANORAMA_LINK_SPECS,
  PANORAMA_LINKS,
  findLessonByTitle,
  topicNumberOfLessonId,
  type PanoramaLink,
} from "@/data/panorama-links";
import { PANORAMA_LANGUAGE_IDS } from "@/data/panorama-data";

const PAGE_SOURCE = readFileSync(resolve(__dirname, "../app/panorama/page.tsx"), "utf8");
const VIEW_SOURCE = readFileSync(resolve(__dirname, "../app/panorama/PanoramaView.tsx"), "utf8");

const LABEL_PATTERN = /^Topic (\d+) · (.+)$/;

const lessonLinks = (languageId: (typeof PANORAMA_LANGUAGE_IDS)[number]): PanoramaLink[] =>
  PANORAMA_LINKS[languageId].filter((link) => link.lessonId !== null);

describe("panorama lesson links", () => {
  test("the lesson id scheme decodes cores and sprigs", () => {
    expect(topicNumberOfLessonId(1)).toBe(1);
    expect(topicNumberOfLessonId(30)).toBe(30);
    expect(topicNumberOfLessonId(202)).toBe(2);
    expect(topicNumberOfLessonId(1003)).toBe(10);
    expect(topicNumberOfLessonId(2403)).toBe(24);
    expect(topicNumberOfLessonId(3003)).toBe(30);
    // branch ids (5000 + n * 10) carry their attach topic, not their own
    expect(topicNumberOfLessonId(5041)).toBeNull();
    expect(topicNumberOfLessonId(0)).toBeNull();
    expect(topicNumberOfLessonId(-1)).toBeNull();
    expect(topicNumberOfLessonId(10.5)).toBeNull();
  });

  test("every authored link spec resolves — nothing is silently dropped", () => {
    for (const languageId of PANORAMA_LANGUAGE_IDS) {
      const specs = PANORAMA_LINK_SPECS[languageId];
      const links = PANORAMA_LINKS[languageId];
      expect(links.length, `${languageId}: unresolved link specs`).toBe(specs.length);
      for (const spec of specs) {
        if (spec.kind !== "lesson") continue;
        expect(
          findLessonByTitle(languageId, spec.lessonTitle),
          `${languageId}: no lesson titled "${spec.lessonTitle}"`
        ).toBeDefined();
      }
    }
  });

  test("each language keeps a real link list plus the phonological atlas", () => {
    for (const languageId of PANORAMA_LANGUAGE_IDS) {
      expect(lessonLinks(languageId).length, `${languageId}: lesson links`).toBeGreaterThanOrEqual(3);
      // the phonological atlas is the one cross-language destination
      expect(PANORAMA_LINKS[languageId].some((link) => link.href === "/atlas")).toBe(true);
      // no duplicated destination inside one panorama
      const hrefs = PANORAMA_LINKS[languageId].map((link) => link.href);
      expect(new Set(hrefs).size, `${languageId}: duplicate href`).toBe(hrefs.length);
    }
  });

  test("every link exists, resolves to its own topic, and its label names the real lesson", () => {
    for (const languageId of PANORAMA_LANGUAGE_IDS) {
      const content = getLanguageContent(languageId);
      const authoredLessonIds = new Set(content.lessons.map((lesson) => lesson.id));

      for (const link of PANORAMA_LINKS[languageId]) {
        if (link.lessonId === null) {
          // page links (/atlas) must not masquerade as a trail topic
          expect(link.topic).toBeNull();
          expect(link.label).not.toMatch(/^Topic \d+/);
          expect(link.href.startsWith("/")).toBe(true);
          continue;
        }

        const match = link.label.match(LABEL_PATTERN);
        expect(match, `${languageId}: label "${link.label}" must be "Topic N · <title>"`).not.toBeNull();
        const claimedTopic = Number(match![1]);
        const claimedTitle = match![2];

        // 1. the lesson exists in this language's own curriculum
        const entry = findLessonByTitle(languageId, claimedTitle);
        expect(entry, `${languageId}: no lesson titled "${claimedTitle}"`).toBeDefined();

        // 2. the href is that lesson's id, by construction and by assertion
        expect(link.href).toBe(`/trail/${languageId}/${entry!.id}`);
        expect(link.lessonId).toBe(entry!.id);

        // 3. the claimed topic is the topic the lesson id encodes
        const encodedTopic = topicNumberOfLessonId(entry!.id);
        expect(encodedTopic, `${languageId}: ${entry!.id} is not a core or sprig`).not.toBeNull();
        expect(claimedTopic, `${languageId}: "${claimedTitle}" claims topic ${claimedTopic}`).toBe(encodedTopic);
        expect(link.topic).toBe(claimedTopic);

        // 4. that topic is a real cluster in this language, and the lesson lives in it
        const topic = content.topics.find((cluster) => cluster.id === claimedTopic);
        expect(topic, `${languageId}: topic ${claimedTopic} does not exist`).toBeDefined();
        const clusterLessonIds = [topic!.core.id, ...topic!.sprigs.map((sprig) => sprig.id)];
        expect(clusterLessonIds, `${languageId}: ${entry!.id} is not in topic ${claimedTopic}`).toContain(entry!.id);

        // 5. the destination has content, not a "coming soon" shell
        expect(
          authoredLessonIds.has(entry!.id),
          `${languageId}: /trail/${languageId}/${entry!.id} has no authored lesson`
        ).toBe(true);
      }
    }
  });

  test("the reported mismatches stay fixed (old wrong id → real id)", () => {
    // [language, lesson title shown in the link, correct id, id the panorama used to point at]
    const regressions: Array<[(typeof PANORAMA_LANGUAGE_IDS)[number], string, number, number]> = [
      ["de", "The Dative Case", 20, 19],
      ["fr", "Ne...Pas: The Sandwich", 4, 12],
      ["fr", "Pronouns Walk Left", 23, 20],
      ["es", "Ser & Estar: The Two Beings", 5, 9],
      ["es", "The -ado / -ido Past", 17, 19],
    ];

    for (const [languageId, title, expectedId, oldWrongId] of regressions) {
      const link = PANORAMA_LINKS[languageId].find((candidate) => candidate.label.endsWith(` · ${title}`));
      expect(link, `${languageId}: no link for "${title}"`).toBeDefined();
      expect(link!.lessonId, `${languageId}: "${title}"`).toBe(expectedId);
      expect(link!.href).toBe(`/trail/${languageId}/${expectedId}`);
      expect(link!.lessonId).not.toBe(oldWrongId);
      // the label is the lesson's own title, so it describes where it lands
      expect(link!.label).toBe(`Topic ${expectedId} · ${title}`);
    }
  });

  test("the French past links to both auxiliaries, not one id with both claims", () => {
    const french = lessonLinks("fr");
    const pastIds = french
      .filter((link) => ["The -é Past", "Motion Takes être"].some((title) => link.label.endsWith(` · ${title}`)))
      .map((link) => link.lessonId);
    expect(pastIds).toEqual([17, 18]);
  });
});

describe("panorama page wiring", () => {
  test("the page no longer hand-writes trail ids", () => {
    expect(PAGE_SOURCE).not.toMatch(/\/trail\/\d+/);
    expect(VIEW_SOURCE).not.toMatch(/\/trail\/\d+/);
  });

  test("language tabs are view-only; opening a lesson is the explicit switch", () => {
    expect(VIEW_SOURCE).toContain("setViewedLanguageId(languageId)");
    expect(VIEW_SOURCE).not.toContain("setSelectedLang");
    // picking a tab changes only the viewed panorama
    expect(VIEW_SOURCE).toMatch(/onClick=\{\(\) => view\(lid\)\}/);
    expect(VIEW_SOURCE).not.toMatch(/setActiveLanguage\(languageId\)/);
    // opening a lesson is the explicit course switch (openLesson switches the
    // course for the lesson's own language before showing it in-page)
    expect(VIEW_SOURCE).toContain("parseLessonHref");
    expect(VIEW_SOURCE).toMatch(/openLesson\(target\.languageId, target\.lessonId\)/);
  });

  test("link resolution stays on the server so lessons stay out of this chunk", () => {
    expect(PAGE_SOURCE).not.toContain('"use client"');
    expect(PAGE_SOURCE).toContain('@/data/panorama-links');
    expect(VIEW_SOURCE).not.toContain("language-content");
    expect(VIEW_SOURCE).not.toMatch(/@\/data\/lessons/);
  });
});
