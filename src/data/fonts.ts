// All 43 fonts extracted from Monkeytype
// Supports on-demand @font-face injection so only the active/previewed font is downloaded.


export interface FontMeta {
  id: string;
  name: string;
  category: "sans" | "mono" | "display";
  family: string;
  systemFont?: boolean;
  woff2?: string;
}

export const DEFAULT_FONT = "Lexend_Deca";

const FONT_WOFF2_BY_ID: Record<string, string> = {
  Roboto_Mono: "/webfonts/RobotoMono-Regular.woff2",
  JetBrains_Mono: "/webfonts/JetBrainsMono-Regular.woff2",
  Fira_Code: "/webfonts/FiraCode-Regular.woff2",
  Source_Code_Pro: "/webfonts/SourceCodePro-Regular.woff2",
  Inconsolata: "/webfonts/Inconsolata-Regular.woff2",
  Cascadia_Mono: "/webfonts/CascadiaMono-Regular.woff2",
  IBM_Plex_Mono: "/webfonts/IBMPlexMono-Regular.woff2",
  Ubuntu_Mono: "/webfonts/UbuntuMono-Regular.woff2",
  Overpass_Mono: "/webfonts/OverpassMono-Regular.woff2",
  Hack: "/webfonts/Hack-Regular.woff2",
  CommitMono: "/webfonts/CommitMono-Regular.woff2",
  Mononoki: "/webfonts/Mononoki-Regular.woff2",
  Geist_Mono: "/webfonts/GeistMono-Medium.woff2",
  Iosevka: "/webfonts/Iosevka-Regular.woff2",
  Proto: "/webfonts/0xProto-Regular.woff2",
  Adwaita_Mono: "/webfonts/AdwaitaMono-Regular.woff2",
  Lexend_Deca: "/webfonts/LexendDeca-Regular.woff2",
  IBM_Plex_Sans: "/webfonts/IBMPlexSans-SemiBold.woff2",
  Roboto: "/webfonts/Roboto-Regular.woff2",
  Montserrat: "/webfonts/Montserrat-Regular.woff2",
  Titillium_Web: "/webfonts/TitilliumWeb-Regular.woff2",
  Oxygen: "/webfonts/Oxygen-Regular.woff2",
  Nunito: "/webfonts/Nunito-Bold.woff2",
  Lato: "/webfonts/Lato-Regular.woff2",
  Ubuntu: "/webfonts/Ubuntu-Regular.woff2",
  Parkinsans: "/webfonts/Parkinsans-Regular.woff2",
  Geist: "/webfonts/Geist-Medium.woff2",
  Inter_Tight: "/webfonts/InterTight-Regular.woff2",
  Space_Grotesk: "/webfonts/SpaceGrotesk-Regular.woff2",
  Atkinson_Hyperlegible: "/webfonts/AtkinsonHyperlegible-Regular.woff2",
  Comfortaa: "/webfonts/Comfortaa-Regular.woff2",
  Coming_Soon: "/webfonts/ComingSoon-Regular.woff2",
  Itim: "/webfonts/Itim-Regular.woff2",
  Open_Dyslexic: "/webfonts/OpenDyslexic-Regular.woff2",
  Lalezar: "/webfonts/Lalezar-Regular.woff2",
  Boon: "/webfonts/Boon-Regular.woff2",
  Sarabun: "/webfonts/Sarabun-Bold.woff2",
  Kanit: "/webfonts/Kanit-Regular.woff2",
  Noto_Naskh_Arabic: "/webfonts/NotoNaskhArabic-Regular.woff2",
  Noto_Sans_Lao: "/webfonts/NotoSansLao-Regular.woff2",
};

const RAW_FONTS: [string, string, "sans" | "mono" | "display", string?, boolean?][] = [
  // Monospace
  ["Roboto_Mono", "Roboto Mono", "mono"],
  ["JetBrains_Mono", "JetBrains Mono", "mono"],
  ["Fira_Code", "Fira Code", "mono"],
  ["Source_Code_Pro", "Source Code Pro", "mono"],
  ["Inconsolata", "Inconsolata", "mono"],
  ["Cascadia_Mono", "Cascadia Mono", "mono"],
  ["IBM_Plex_Mono", "IBM Plex Mono", "mono"],
  ["Ubuntu_Mono", "Ubuntu Mono", "mono"],
  ["Overpass_Mono", "Overpass Mono", "mono"],
  ["Hack", "Hack", "mono"],
  ["CommitMono", "CommitMono", "mono"],
  ["Mononoki", "Mononoki", "mono"],
  ["Geist_Mono", "Geist Mono", "mono"],
  ["Iosevka", "Iosevka", "mono"],
  ["Proto", "0xProto", "mono"],
  ["Adwaita_Mono", "Adwaita Mono", "mono"],
  ["Courier", "Courier", "mono", "Courier, monospace", true],

  // Sans-Serif
  ["Lexend_Deca", "Lexend Deca", "sans"],
  ["IBM_Plex_Sans", "IBM Plex Sans", "sans"],
  ["Roboto", "Roboto", "sans"],
  ["Montserrat", "Montserrat", "sans"],
  ["Titillium_Web", "Titillium Web", "sans"],
  ["Oxygen", "Oxygen", "sans"],
  ["Nunito", "Nunito", "sans"],
  ["Lato", "Lato", "sans"],
  ["Ubuntu", "Ubuntu", "sans"],
  ["Parkinsans", "Parkinsans", "sans"],
  ["Geist", "Geist", "sans"],
  ["Inter_Tight", "Inter Tight", "sans"],
  ["Space_Grotesk", "Space Grotesk", "sans"],
  ["Atkinson_Hyperlegible", "Atkinson Hyperlegible", "sans"],

  // Display
  ["Comfortaa", "Comfortaa", "display", "'Comfortaa', cursive, sans-serif"],
  ["Coming_Soon", "Coming Soon", "display", "'Coming_Soon', cursive, sans-serif"],
  ["Itim", "Itim", "display", "'Itim', cursive, sans-serif"],
  ["Open_Dyslexic", "OpenDyslexic", "display", "'Open_Dyslexic', sans-serif"],
  ["Lalezar", "Lalezar", "display", "'Lalezar', cursive, sans-serif"],
  ["Boon", "Boon (ไทย)", "display", "'Boon', sans-serif"],
  ["Sarabun", "Sarabun", "display", "'Sarabun', sans-serif"],
  ["Kanit", "Kanit", "display", "'Kanit', sans-serif"],
  ["Noto_Naskh_Arabic", "Noto Naskh Arabic", "display", "'Noto_Naskh_Arabic', serif"],
  ["Noto_Sans_Lao", "Noto Sans Lao (ລາວ)", "display", "'Noto_Sans_Lao', sans-serif"],
  ["Georgia", "Georgia", "display", "Georgia, serif", true],
  ["Comic_Sans_MS", "Comic Sans MS", "display", "'Comic Sans MS', cursive, sans-serif", true],
];

export const FONT_LIST: FontMeta[] = RAW_FONTS.map(([id, name, category, customFamily, systemFont]) => ({
  id,
  name,
  category,
  family: customFamily ?? (category === "mono" ? `'${id}', monospace` : `'${id}', sans-serif`),
  ...(systemFont ? { systemFont: true } : {}),
  ...(FONT_WOFF2_BY_ID[id] ? { woff2: FONT_WOFF2_BY_ID[id] } : {}),
}));

export const FONTS_BY_ID: Record<string, FontMeta> = Object.fromEntries(
  FONT_LIST.map((f) => [f.id, f])
);

export type FontFilterTab = "all" | "mono" | "sans" | "display";

/** Single source of truth for font filtering, shared by the selector modal and tests. */
export function filterFonts(query: string, tab: FontFilterTab): FontMeta[] {
  if (query.trim()) {
    const q = query.toLowerCase().trim();
    return FONT_LIST.filter((f) => f.name.toLowerCase().includes(q) || f.id.toLowerCase().includes(q));
  }
  if (tab === "all") return FONT_LIST;
  return FONT_LIST.filter((f) => f.category === tab);
}

const injectedFonts = new Set<string>(["Lexend_Deca", "Roboto_Mono"]);

/**
 * Injects the @font-face rule for `fontId` on demand so the browser only downloads
 * a webfont file when the user actually selects or previews that font.
 */
export function ensureFontLoaded(fontId: string): void {
  if (typeof document === "undefined" || !document.head) return;
  const font = FONTS_BY_ID[fontId];
  if (!font || font.systemFont || !font.woff2 || injectedFonts.has(font.id)) return;

  injectedFonts.add(font.id);
  try {
    const styleId = `brucke-font-${font.id}`;
    if (document.getElementById(styleId)) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
@font-face {
  font-family: "${font.id}";
  src: url("${font.woff2}") format("woff2");
  font-display: swap;
}
@font-face {
  font-family: "${font.name}";
  src: url("${font.woff2}") format("woff2");
  font-display: swap;
}`;
    document.head.appendChild(style);
  } catch {}
}

export function applyFont(fontId: string): void {
  if (typeof document === "undefined" || !document.documentElement?.style) return;
  const font = FONTS_BY_ID[fontId] || FONTS_BY_ID[DEFAULT_FONT];
  if (!font) return;

  ensureFontLoaded(font.id);
  document.documentElement.style.setProperty("--font-app", font.family);
  document.documentElement.setAttribute("data-font", font.id);
}
