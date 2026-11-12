import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { FONT_LIST, DEFAULT_FONT, applyFont, ensureFontLoaded, FONTS_BY_ID, filterFonts } from "@/data/fonts";
import { useAppStore } from "@/lib/store";

describe("Monkeytype Fonts Architecture & Engine", () => {
  beforeEach(() => {
    (globalThis as any).document = {
      documentElement: {
        style: {
          setProperty: (prop: string, val: string) => {
            (document.documentElement.style as any)[prop] = val;
          },
        },
        setAttribute: (attr: string, val: string) => {
          (document.documentElement as any)[attr] = val;
        },
      },
    };
  });

  afterAll(() => {
    delete (globalThis as any).document;
  });

  it("contains all 43 Monkeytype fonts across sans, mono, and display categories", () => {
    expect(FONT_LIST.length).toBe(43);
    expect(DEFAULT_FONT).toBe("Lexend_Deca");

    const categories = new Set(FONT_LIST.map((f) => f.category));
    expect(categories.has("sans")).toBe(true);
    expect(categories.has("mono")).toBe(true);
    expect(categories.has("display")).toBe(true);

    // Verify key flagship fonts
    expect(FONTS_BY_ID["Roboto_Mono"]).toBeDefined();
    expect(FONTS_BY_ID["JetBrains_Mono"]).toBeDefined();
    expect(FONTS_BY_ID["Fira_Code"]).toBeDefined();
    expect(FONTS_BY_ID["Lexend_Deca"]).toBeDefined();
    expect(FONTS_BY_ID["Geist"]).toBeDefined();
    expect(FONTS_BY_ID["Atkinson_Hyperlegible"]).toBeDefined();
    expect(FONTS_BY_ID["Comic_Sans_MS"]).toBeDefined();
  });

  it("applies font CSS variables and attributes via applyFont", () => {
    applyFont("JetBrains_Mono");
    expect((document.documentElement.style as any)["--font-app"]).toContain("JetBrains_Mono");
    expect((document.documentElement as any)["data-font"]).toBe("JetBrains_Mono");

    applyFont("Lexend_Deca");
    expect((document.documentElement.style as any)["--font-app"]).toContain("Lexend_Deca");
    expect((document.documentElement as any)["data-font"]).toBe("Lexend_Deca");
  });

  it("injects only the explicitly previewed font, once, without loading other families", () => {
    const styles: Array<{ id: string; textContent: string }> = [];
    const mockDocument = document as unknown as {
      head: { appendChild: (style: { id: string; textContent: string }) => void };
      getElementById: (id: string) => unknown;
      createElement: () => { id: string; textContent: string };
    };
    mockDocument.head = { appendChild: (style) => { styles.push(style); } };
    mockDocument.getElementById = (id) => styles.find((style) => style.id === id);
    mockDocument.createElement = () => ({ id: "", textContent: "" });

    expect(styles).toEqual([]);
    ensureFontLoaded(DEFAULT_FONT);
    ensureFontLoaded("Comic_Sans_MS");
    expect(styles).toEqual([]);
    ensureFontLoaded("Sarabun");
    ensureFontLoaded("Sarabun");
    expect(styles).toHaveLength(1);
    expect(styles[0].textContent).toContain("/webfonts/Sarabun-Bold.woff2");
    expect(styles[0].textContent).not.toContain("/webfonts/JetBrainsMono-Regular.woff2");
  });

  it("searches across all fonts regardless of category tab when query is entered", () => {
    // Searching for a mono font while 'sans' tab is active returns the mono font
    const searchFromSans = filterFonts("JetBrains", "sans");
    expect(searchFromSans.some((f) => f.id === "JetBrains_Mono")).toBe(true);

    // Searching for a display font while 'mono' tab is active returns the display font
    const searchFromMono = filterFonts("Comic", "mono");
    expect(searchFromMono.some((f) => f.id === "Comic_Sans_MS")).toBe(true);

    // Empty query respects the category tab
    expect(filterFonts("", "mono").every((f) => f.category === "mono")).toBe(true);
    expect(filterFonts("", "sans").every((f) => f.category === "sans")).toBe(true);
    expect(filterFonts("", "display").every((f) => f.category === "display")).toBe(true);
    expect(filterFonts("", "all").length).toBe(FONT_LIST.length);
  });

  it("updates and persists font selection in useAppStore", () => {
    const store = useAppStore.getState();
    expect(store.font).toBe("Lexend_Deca");

    store.setFont("Fira_Code");
    expect(useAppStore.getState().font).toBe("Fira_Code");

    store.setFont("Geist");
    expect(useAppStore.getState().font).toBe("Geist");
  });
});
