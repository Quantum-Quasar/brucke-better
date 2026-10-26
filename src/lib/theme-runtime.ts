// Lightweight theme plumbing for the root bundle. The full palette table
// (src/data/themes.ts, ~190 themes) is loaded on demand: the blocking head
// script already restores the last palette before first paint, so a normal
// boot never needs it.

export const DEFAULT_THEME = "alduin";
export const THEME_VARS_CACHE_KEY = "brucke_theme_vars";

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
  if (typeof window !== "undefined" && cachedThemeId() === themeId && document.documentElement?.hasAttribute?.("data-theme")) {
    return;
  }
  void import("@/data/themes").then((m) => m.applyTheme(themeId));
}
