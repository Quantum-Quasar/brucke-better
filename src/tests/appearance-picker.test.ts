import { describe, expect, it } from "vitest";
import { THEME_LIST, filterThemes } from "@/data/themes";
import { DEFAULT_THEME } from "@/lib/theme-runtime";
import { DEFAULT_FONT, FONT_LIST } from "@/data/fonts";
import { filterPickerFonts } from "@/components/common/font-picker";

describe("appearance picker discovery", () => {
  it("starts with twelve themes including the saved default, light and high-contrast choices", () => {
    const themes = filterThemes("", "popular", DEFAULT_THEME);
    expect(themes).toHaveLength(12);
    expect(themes.some((theme) => theme.id === DEFAULT_THEME)).toBe(true);
    expect(themes.filter((theme) => !theme.isDark).length).toBeGreaterThanOrEqual(3);
    expect(themes.some((theme) => theme.id === "dark")).toBe(true);
  });

  it("keeps a saved non-curated theme visible without adding it to search results", () => {
    const themes = filterThemes("", "popular", "laser");
    expect(themes).toHaveLength(13);
    expect(themes.some((theme) => theme.id === "laser")).toBe(true);
    expect(filterThemes("milkshake", "popular", "laser").map((theme) => theme.id)).toEqual(["milkshake"]);
  });

  it("retains all themes through show-all and searches beyond the curated choices", () => {
    expect(filterThemes("", "all")).toEqual(THEME_LIST);
    expect(filterThemes("laser", "popular").map((theme) => theme.id)).toEqual(["laser"]);
    expect(filterThemes("not-a-theme", "popular", "laser")).toEqual([]);
  });

  it("offers six font choices with the saved selection and a monospace option", () => {
    const fonts = filterPickerFonts("", "recommended", DEFAULT_FONT);
    expect(fonts).toHaveLength(6);
    expect(fonts.some((font) => font.id === DEFAULT_FONT)).toBe(true);
    expect(fonts.some((font) => font.category === "mono")).toBe(true);
  });

  it("keeps a saved non-curated font visible until the learner chooses another", () => {
    const fonts = filterPickerFonts("", "recommended", "Comic_Sans_MS");
    expect(fonts).toHaveLength(7);
    expect(fonts.some((font) => font.id === "Comic_Sans_MS")).toBe(true);
    expect(filterPickerFonts("lexend", "recommended", "Comic_Sans_MS").map((font) => font.id)).toEqual([DEFAULT_FONT]);
  });

  it("retains all fonts through more-fonts and global search from every category", () => {
    expect(filterPickerFonts("", "all")).toEqual(FONT_LIST);
    for (const tab of ["recommended", "mono", "sans", "display"] as const) {
      expect(filterPickerFonts("Comic", tab).some((font) => font.id === "Comic_Sans_MS")).toBe(true);
    }
    expect(filterPickerFonts("", "mono").every((font) => font.category === "mono")).toBe(true);
    expect(filterPickerFonts("not-a-font", "recommended", DEFAULT_FONT)).toEqual([]);
  });
});
