// Lightweight theme plumbing for the root bundle. The full palette table
// (src/data/themes.ts, ~190 themes) is loaded on demand: the blocking head
// script already restores the last palette before first paint, so a normal
// boot never needs it.

export const DEFAULT_THEME = "alduin";
export const THEME_VARS_CACHE_KEY = "brucke_theme_vars";

/**
 * Keep the browser chrome (Android status bar / address bar) in step with the
 * active palette. Falls back to the current --bg-color when no color is given.
 */
export function syncThemeColor(color?: string): void {
  if (typeof document === "undefined") return;
  if (typeof document.querySelector !== "function" || typeof document.createElement !== "function") {
    return;
  }
  let value = color;
  if (!value && typeof window !== "undefined" && typeof window.getComputedStyle === "function") {
    value = window.getComputedStyle(document.documentElement).getPropertyValue("--bg-color").trim();
  }
  if (!value) return;

  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", value);
}

/** The only non-theme root attribute the settings screen owns. */
export function applyAppearanceSettings(settings: import("@/data/settings").CustomizationSettings): void {
  if (typeof document === "undefined" || !document?.documentElement) return;
  const root = document.documentElement;
  if (settings.increasedContrast) {
    root.setAttribute("data-contrast", "increased");
  } else {
    root.removeAttribute("data-contrast");
  }
}

/** Number of themes in data/themes.ts, for copy that does not need the table. */
export const THEME_COUNT = 187;

/** Same derivation as THEME_LIST[].name in data/themes.ts. */
export function themeDisplayName(id: string): string {
  return id.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function cachedThemeId(): string | null {
  try {
    const cached = JSON.parse(window.localStorage.getItem(THEME_VARS_CACHE_KEY) || "null");
    return cached && typeof cached.id === "string" ? cached.id : null;
  } catch {
    return null;
  }
}

/**
 * Apply a theme. When the palette cache already holds this theme the head
 * script has painted it, so nothing is downloaded; otherwise the theme table
 * is imported on demand.
 */
export function applyTheme(themeId: string): void {
  if (typeof document === "undefined") return;
  const cachedId = typeof window !== "undefined" ? cachedThemeId() : null;
  // globals.css already paints Alduin, so a first visit (no cached palette)
  // needs no table until the learner picks a different theme.
  if (cachedId === null && themeId === DEFAULT_THEME) return;
  if (
    typeof window !== "undefined" &&
    cachedId === themeId &&
    document.documentElement?.hasAttribute?.("data-theme")
  ) {
    return;
  }
  void import("@/data/themes").then((m) => m.applyTheme(themeId));
}
