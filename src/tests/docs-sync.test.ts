import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { LESSONS } from "../data/lessons";
import { FR_LESSONS } from "../data/french/lessons-fr";
import { ES_LESSONS } from "../data/spanish/lessons-es";
import { NL_LESSONS } from "../data/dutch/lessons-nl";
import { compendium } from "../data/compendium";
import { frenchCompendium } from "../data/french/compendium-fr";
import { spanishCompendium } from "../data/spanish/compendium-es";
import { dutchCompendium } from "../data/dutch/compendium-nl";
import { THEMES } from "../data/themes";
import { FONT_LIST } from "../data/fonts";
import { getAtlasFamilies } from "../lib/atlas-families";
import { DECK_CAPABILITIES } from "../lib/review-decks";

const ROOT = path.resolve(__dirname, "../..");
const FACT_DOCS = ["docs/README.md", "AUDIT_MANIFEST.md", "BRUCKE_DESCRIPTION.md"];

function readRootDoc(name: string): string {
  return fs.readFileSync(path.join(ROOT, name), "utf-8");
}

function countStaticRoutes(dir: string): number {
  return fs.readdirSync(dir, { withFileTypes: true }).reduce((count, entry) => {
    if (entry.isDirectory()) {
      return count + (entry.name.startsWith("[") ? 0 : countStaticRoutes(path.join(dir, entry.name)));
    }
    return count + (entry.name === "page.tsx" ? 1 : 0);
  }, 0);
}

describe("Documentation stays in sync with authoritative sources", () => {
  it("the documented Twist coverage matches every authored lesson", () => {
    for (const lesson of [...LESSONS, ...FR_LESSONS, ...ES_LESSONS, ...NL_LESSONS]) {
      expect(lesson.twist, `lesson ${lesson.id} must end with a Twist card`).toBeTruthy();
    }
  });

  it.each(FACT_DOCS)("%s quotes the current German word and lesson counts", (doc) => {
    const text = readRootDoc(doc);
    expect(text).toContain(`${Object.keys(compendium.words).length} words`);
    expect(text).toContain(`${LESSONS.length} lessons`);
  });

  it.each(FACT_DOCS)("%s quotes the runtime review deck count", (doc) => {
    const counts = Array.from(
      readRootDoc(doc).matchAll(/\b(\d+) review deck types\b/gi),
      (match) => Number(match[1])
    );
    expect(counts).not.toHaveLength(0);
    for (const count of counts) {
      expect(count).toBe(Object.keys(DECK_CAPABILITIES).length);
    }
  });

  it("documented Next.js versions match the declaration and locked framework", () => {
    const packageJson = JSON.parse(readRootDoc("package.json"));
    const lockedVersion = readRootDoc("bun.lock").match(/"next":\s*\["next@([^"]+)"/)?.[1];
    expect(lockedVersion, "bun.lock must resolve the Next.js framework").toBeDefined();
    for (const doc of FACT_DOCS) {
      const text = readRootDoc(doc);
      const versions = Array.from(text.matchAll(/\bNext(?:\.js)? (\d+\.\d+\.\d+)\b/g), (match) => match[1]);
      expect(versions, `${doc} must document the locked Next.js version`).not.toHaveLength(0);
      for (const version of versions) {
        expect(version, `${doc} Next.js version`).toBe(lockedVersion);
      }
      expect(text, `${doc} Next.js dependency declaration`).toContain(packageJson.dependencies.next);
    }
  });

  it("the canonical README quotes current sibling-course counts", () => {
    const readme = readRootDoc("docs/README.md");
    for (const [name, lessons, course] of [
      ["French", FR_LESSONS, frenchCompendium],
      ["Spanish", ES_LESSONS, spanishCompendium],
      ["Dutch", NL_LESSONS, dutchCompendium],
    ] as const) {
      const paragraph = readme.split(`**${name} course`)[1]?.split("\n")[0] ?? "";
      expect(paragraph, `${name} lesson count`).toContain(
        name === "Dutch" ? `${lessons.length} Dutch lessons` : `${lessons.length} lessons authored`
      );
      expect(paragraph, `${name} word count`).toContain(`${Object.keys(course.words).length}-word compendium`);
      if (name !== "Spanish") {
        expect(paragraph).toContain(`${course.compounds.length} compound calques`);
        expect(paragraph).toContain(`${course.falseFriends.length} false friends`);
      }
    }
  });

  it("route and payload documentation matches the exported course data", () => {
    const allLessons = [...LESSONS, ...FR_LESSONS, ...ES_LESSONS, ...NL_LESSONS];
    const lessonIdCount = new Set(allLessons.map((lesson) => lesson.id)).size;
    const familyIdCount = new Set(
      [compendium, frenchCompendium, spanishCompendium, dutchCompendium].flatMap((data) =>
        getAtlasFamilies(data).map((family) => family.id)
      )
    ).size;
    const routeCount = countStaticRoutes(path.join(ROOT, "src", "app"));

    for (const doc of ["docs/README.md", "AUDIT_MANIFEST.md"]) {
      const text = readRootDoc(doc);
      expect(text).toContain(`${routeCount} static routes`);
      expect(text).toContain(`${lessonIdCount} unique ${doc === "docs/README.md" ? "ids" : "lessons"}`);
      expect(text).toContain(`${allLessons.length} per-lesson payloads`);
      expect(text).toContain(`${familyIdCount} atlas families`);
    }
  });

  it("the canonical README quotes current theme and font counts", () => {
    const readme = readRootDoc("docs/README.md");
    expect(readme).toMatch(new RegExp(`\\*\\*${Object.keys(THEMES).length}\\b[^*\\n]*\\bthemes\\*\\*`));
    expect(readme).toMatch(new RegExp(`\\*\\*${FONT_LIST.length}\\b[^*\\n]*\\bfonts\\*\\*`));
  });
});
