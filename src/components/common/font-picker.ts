import { FONT_LIST, filterFonts, type FontFilterTab } from "@/data/fonts";

export const RECOMMENDED_FONTS = [
  "Lexend_Deca",
  "Atkinson_Hyperlegible",
  "Roboto_Mono",
  "JetBrains_Mono",
  "Geist",
  "Open_Dyslexic",
];

export type FontPickerTab = "recommended" | FontFilterTab;

export function filterPickerFonts(query: string, tab: FontPickerTab, selectedFont?: string) {
  if (query.trim() || tab !== "recommended") {
    return filterFonts(query, tab === "recommended" ? "all" : tab);
  }
  return FONT_LIST.filter((font) => RECOMMENDED_FONTS.includes(font.id) || font.id === selectedFont);
}
