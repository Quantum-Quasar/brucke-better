import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import { THEMES, THEME_LIST, POPULAR_THEMES, applyTheme, isColorDark, filterThemes } from "@/data/themes";
import {
  DEFAULT_THEME,
  THEME_COUNT,
  themeDisplayName,
  applyTheme as applyRuntimeTheme,
  THEME_VARS_CACHE_KEY,
} from "@/lib/theme-runtime";
import { TOPICS, TRAIL_BRANCHES, getNextPlayableLessonId } from "@/data/curriculum";
import { spineNodeIds } from "@/data/curriculum-core";
import { getGenderInfo } from "@/lib/gender";
import { LESSONS } from "@/data/lessons";
import { DEFAULT_SETTINGS } from "@/data/settings";
import { applyAppearanceSettings } from "@/lib/theme-runtime";

describe("Theme Architecture & Contrast Verification", () => {
  let mockElement: {
    style: { [key: string]: any; setProperty: (k: string, v: string) => void; colorScheme?: string };
    attributes: Record<string, string>;
    setAttribute: (name: string, value: string) => void;
    removeAttribute: (name: string) => void;
    hasAttribute: (name: string) => boolean;
    classList: {
      classes: Set<string>;
      add: (c: string) => void;
      remove: (c: string) => void;
      contains: (c: string) => boolean;
    };
  };

  beforeAll(() => {
    mockElement = {
      style: {
        setProperty(k: string, v: string) {
          (this as any)[k] = v;
        },
      },
      attributes: {},
      setAttribute(name: string, value: string) {
        this.attributes[name] = value;
      },
      removeAttribute(name: string) {
        delete this.attributes[name];
      },
      hasAttribute(name: string) {
        return name in this.attributes;
      },
      classList: {
        classes: new Set<string>(),
        add(c: string) {
          this.classes.add(c);
        },
        remove(c: string) {
          this.classes.delete(c);
        },
        contains(c: string) {
          return this.classes.has(c);
        },
      },
    };

    (globalThis as any).document = {
      documentElement: mockElement,
    };
  });

  afterAll(() => {
    delete (globalThis as any).document;
  });

  it("contains all 187 Monkeytype color themes", () => {
    expect(Object.keys(THEMES).length).toBe(187);
    expect(THEME_LIST.length).toBe(187);
    expect(THEME_COUNT).toBe(THEME_LIST.length);
    // the trigger derives the label without loading the theme table
    expect(themeDisplayName("serika_dark")).toBe("Serika Dark");
    expect(THEMES[DEFAULT_THEME]).toBeDefined();
    expect(THEMES["serika_dark"].bg).toBe("#323437");
  });

  it("accurately classifies 3-digit, 6-digit, and 8-digit hex colors with isColorDark", () => {
    // 3-digit hex dark edge cases
    expect(isColorDark("#000")).toBe(true);
    expect(isColorDark("#111")).toBe(true);
    expect(isColorDark("#001")).toBe(true);

    // 6-digit hex dark colors
    expect(isColorDark("#323437")).toBe(true);
    expect(isColorDark("#1f232a")).toBe(true);
    expect(isColorDark("#000000")).toBe(true);

    // Light colors
    expect(isColorDark("#ffffff")).toBe(false);
    expect(isColorDark("#eeebe2")).toBe(false);
    expect(isColorDark("#f2e9e1")).toBe(false);
    expect(isColorDark("#eceff4")).toBe(false);

    // Invalid / empty fallbacks
    expect(isColorDark("")).toBe(true);
    expect(isColorDark(null as any)).toBe(true);
  });

  it("verifies that 3-digit hex themes in THEME_LIST (dark, phantom, rgb, shadow) are correctly marked isDark: true", () => {
    const darkTheme = THEME_LIST.find((t) => t.id === "dark");
    expect(darkTheme).toBeDefined();
    expect(darkTheme?.isDark).toBe(true);

    const phantomTheme = THEME_LIST.find((t) => t.id === "phantom");
    expect(phantomTheme).toBeDefined();
    expect(phantomTheme?.isDark).toBe(true);

    const rgbTheme = THEME_LIST.find((t) => t.id === "rgb");
    expect(rgbTheme).toBeDefined();
    expect(rgbTheme?.isDark).toBe(true);

    const shadowTheme = THEME_LIST.find((t) => t.id === "shadow");
    expect(shadowTheme).toBeDefined();
    expect(shadowTheme?.isDark).toBe(true);
  });

  it("verifies 100% consistency between THEME_LIST isDark flags and isColorDark calculation", () => {
    for (const theme of THEME_LIST) {
      const expected = isColorDark(theme.bg);
      expect(theme.isDark).toBe(expected);
    }
  });

  it("applies theme CSS custom variables and toggles .dark/.light class on documentElement", () => {
    // Apply dark theme
    applyTheme("serika_dark");
    expect(mockElement.style["--bg-color"]).toBe("#323437");
    expect(mockElement.style["--main-color"]).toBe("#e2b714");
    expect(mockElement.attributes["data-theme"]).toBe("serika_dark");
    expect(mockElement.classList.contains("dark")).toBe(true);
    expect(mockElement.classList.contains("light")).toBe(false);
    expect(mockElement.style.colorScheme).toBe("dark");

    // Apply light theme
    applyTheme("9009");
    expect(mockElement.style["--bg-color"]).toBe("#eeebe2");
    expect(mockElement.style["--main-color"]).toBe("#080909");
    expect(mockElement.attributes["data-theme"]).toBe("9009");
    expect(mockElement.classList.contains("light")).toBe(true);
    expect(mockElement.classList.contains("dark")).toBe(false);
    expect(mockElement.style.colorScheme).toBe("light");

    // Apply 3-digit hex theme "dark"
    applyTheme("dark");
    expect(mockElement.style["--bg-color"]).toBe("#111");
    expect(mockElement.attributes["data-theme"]).toBe("dark");
    expect(mockElement.classList.contains("dark")).toBe(true);
    expect(mockElement.classList.contains("light")).toBe(false);

    // An unknown id falls back to the default palette and its attribute id
    applyTheme("not_a_theme");
    expect(mockElement.attributes["data-theme"]).toBe(DEFAULT_THEME);
  });

  it("applies the optional increased-contrast override without changing the selected theme", () => {
    applyAppearanceSettings({ ...DEFAULT_SETTINGS, increasedContrast: true });
    expect(mockElement.attributes["data-contrast"]).toBe("increased");

    applyAppearanceSettings(DEFAULT_SETTINGS);
    expect(mockElement.attributes["data-contrast"]).toBeUndefined();
    expect(DEFAULT_THEME).toBe("alduin");
  });

  it("provides high-contrast gender badge classes with dark: modifiers for light and dark themes", () => {
    const derInfo = getGenderInfo("der");
    expect(derInfo?.badgeClass).toContain("dark:text-blue-300");
    expect(derInfo?.badgeClass).toContain("text-blue-700");

    const dieInfo = getGenderInfo("die");
    expect(dieInfo?.badgeClass).toContain("dark:text-rose-300");
    expect(dieInfo?.badgeClass).toContain("text-rose-700");

    const dasInfo = getGenderInfo("das");
    expect(dasInfo?.badgeClass).toContain("dark:text-emerald-300");
    expect(dasInfo?.badgeClass).toContain("text-emerald-700");
  });

  it("verifies authored lesson count and spine advancement", () => {
    // every authored shell on the map must have a full Lesson behind it
    const authoredShells = [
      ...TOPICS.flatMap((t) => [t.core, ...(t.stories ?? []), ...t.sprigs]),
      ...TRAIL_BRANCHES.flatMap((b) => b.lessons),
    ].filter((s) => s.authored).length;
    expect(LESSONS.length).toBe(authoredShells);
    const spine = spineNodeIds(TOPICS);
    for (let i = 0; i < spine.length - 1; i++) {
      expect(getNextPlayableLessonId(spine[i])).toBe(spine[i + 1]);
    }
    // past the final story there is no next stop
    expect(getNextPlayableLessonId(spine[spine.length - 1])).toBeNull();
  });

  it("sets alduin as the default theme and keeps the pre-paint CSS fallback identical", () => {
    expect(DEFAULT_THEME).toBe("alduin");
    expect(THEMES["alduin"].bg).toBe("#1c1c1c");
    expect(THEMES["alduin"].main).toBe("#dfd7af");

    // globals.css is what paints a first visit before the palette table loads
    // (theme-runtime deliberately skips the default theme). If the two copies
    // drift, the default theme's muted text silently loses contrast.
    const css = fs.readFileSync(path.resolve(__dirname, "../app/globals.css"), "utf-8");
    const rootBlock = css.match(/:root\s*\{([\s\S]*?)\}/)?.[1] ?? "";
    const cssVar = (name: string) =>
      rootBlock.match(new RegExp(`${name}:\\s*([^;]+);`))?.[1].trim();

    const alduin = THEMES["alduin"];
    expect(cssVar("--bg-color")).toBe(alduin.bg);
    expect(cssVar("--main-color")).toBe(alduin.main);
    expect(cssVar("--caret-color")).toBe(alduin.caret);
    expect(cssVar("--sub-color")).toBe(alduin.sub);
    expect(cssVar("--sub-alt-color")).toBe(alduin.subAlt);
    expect(cssVar("--text-color")).toBe(alduin.text);
    expect(cssVar("--error-color")).toBe(alduin.error);
  });

  it("searches across all themes regardless of category tab when a search query is entered", () => {
    // Even if tab is 'light', searching for dark theme 'alduin' returns it
    const searchFromLight = filterThemes("alduin", "light");
    expect(searchFromLight.some((t) => t.id === "alduin")).toBe(true);

    // Even if tab is 'popular', searching for non-popular theme returns matches from full list
    const searchFromPopular = filterThemes("nord", "popular");
    expect(searchFromPopular.some((t) => t.id === "nord_light")).toBe(true);

    // Empty query respects the tab filter
    expect(filterThemes("", "popular").every((t) => POPULAR_THEMES.includes(t.id))).toBe(true);
    expect(filterThemes("", "dark").every((t) => t.isDark)).toBe(true);
    expect(filterThemes("", "light").every((t) => !t.isDark)).toBe(true);
    expect(filterThemes("", "all").length).toBe(THEME_LIST.length);
  });

  describe("lazy palette loading", () => {
    let cache: Record<string, string>;
    const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

    beforeEach(() => {
      cache = {};
      (globalThis as any).window = {
        localStorage: {
          getItem: (key: string) => cache[key] ?? null,
          setItem: (key: string, value: string) => {
            cache[key] = value;
          },
        },
      };
      mockElement.attributes = {};
      mockElement.style = {
        setProperty(k: string, v: string) {
          (this as any)[k] = v;
        },
      };
      mockElement.classList.classes.clear();
    });

    afterEach(() => {
      delete (globalThis as any).window;
    });

    it("does not load the palette table on a first visit", async () => {
      applyRuntimeTheme(DEFAULT_THEME);
      await tick();
      // globals.css already paints Alduin; the 187-theme chunk stays unloaded
      expect(mockElement.attributes["data-theme"]).toBeUndefined();
      expect(mockElement.style["--bg-color"]).toBeUndefined();
    });

    it("loads the palette for a non-default theme without a cache", async () => {
      applyRuntimeTheme("serika_dark");
      await tick();
      expect(mockElement.attributes["data-theme"]).toBe("serika_dark");
      expect(mockElement.style["--bg-color"]).toBe("#323437");
    });

    it("skips the table when the head script already restored the same palette", async () => {
      cache[THEME_VARS_CACHE_KEY] = JSON.stringify({ id: "serika_dark", vars: {} });
      mockElement.attributes = { "data-theme": "serika_dark" };

      applyRuntimeTheme("serika_dark");
      await tick();
      expect(mockElement.style["--bg-color"]).toBeUndefined();
    });
  });
});

describe("Theme Contrast Guarantees", () => {
  const wcagLum = (hex: string): number => {
    let h = hex.replace("#", "");
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    else if (h.length >= 8) h = h.substring(0, 6);
    const f = (v: number) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(parseInt(h.slice(0, 2), 16)) + 0.7152 * f(parseInt(h.slice(2, 4), 16)) + 0.0722 * f(parseInt(h.slice(4, 6), 16));
  };
  const wcagContrast = (a: string, b: string): number => {
    const la = wcagLum(a), lb = wcagLum(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  };

  it("keeps reading text at WCAG-legible contrast on both surfaces in all 187 themes", () => {
    for (const [id, t] of Object.entries(THEMES)) {
      for (const surface of [t.bg, t.subAlt]) {
        expect(wcagContrast(t.text, surface), `${id}: text on ${surface}`).toBeGreaterThanOrEqual(4.5);
        expect(wcagContrast(t.sub, surface), `${id}: sub on ${surface}`).toBeGreaterThanOrEqual(4.2);
      }
    }
  });

  it("keeps accent color visible against both surfaces in all 187 themes", () => {
    for (const [id, t] of Object.entries(THEMES)) {
      for (const surface of [t.bg, t.subAlt]) {
        expect(wcagContrast(t.main, surface), `${id}: main on ${surface}`).toBeGreaterThanOrEqual(2.5);
      }
    }
  });

  it("suggests only themes that clear the contrast floors", () => {
    expect(POPULAR_THEMES.length).toBeGreaterThanOrEqual(16);
    for (const id of POPULAR_THEMES) {
      const t = THEMES[id];
      expect(t, `${id} must exist in THEMES`).toBeDefined();
      for (const surface of [t.bg, t.subAlt]) {
        expect(wcagContrast(t.text, surface), `${id}: text on ${surface}`).toBeGreaterThanOrEqual(4.5);
        expect(wcagContrast(t.sub, surface), `${id}: sub on ${surface}`).toBeGreaterThanOrEqual(4.2);
        expect(wcagContrast(t.main, surface), `${id}: main on ${surface}`).toBeGreaterThanOrEqual(2.5);
      }
    }
  });
});
