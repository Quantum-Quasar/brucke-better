// Curated 12-theme subset kept in the main bundle; the remaining 175 themes
// in src/data/themes.ts load dynamically when the user searches or opens "All".

export interface MonkeytypeTheme {
  bg: string;
  main: string;
  caret: string;
  sub: string;
  subAlt: string;
  text: string;
  error: string;
}

export interface ThemeMeta extends MonkeytypeTheme {
  id: string;
  name: string;
  isDark: boolean;
}

export type ThemeFilterTab = "popular" | "dark" | "light" | "all";

export const TOTAL_THEME_COUNT = 187;

export const POPULAR_THEMES_META: ThemeMeta[] = [
  {
    "id": "alduin",
    "name": "Alduin",
    "isDark": true,
    "bg": "#1c1c1c",
    "caret": "#e3e3e3",
    "main": "#dfd7af",
    "sub": "#a0a0a0",
    "subAlt": "#242424",
    "text": "#f5f3ed",
    "error": "#af5f5f"
  },
  {
    "id": "botanical",
    "name": "Botanical",
    "isDark": false,
    "bg": "#7b9c98",
    "caret": "#abc6c4",
    "main": "#eaf1f3",
    "sub": "#232928",
    "subAlt": "#72908d",
    "text": "#18262a",
    "error": "#f6c9b4"
  },
  {
    "id": "catppuccin",
    "name": "Catppuccin",
    "isDark": true,
    "bg": "#1e1e2e",
    "caret": "#f2cdcd",
    "main": "#cba6f7",
    "sub": "#7f849c",
    "subAlt": "#181825",
    "text": "#cdd6f4",
    "error": "#f38ba8"
  },
  {
    "id": "dark",
    "name": "Dark",
    "isDark": true,
    "bg": "#111",
    "caret": "#eee",
    "main": "#eee",
    "sub": "#7c7c7c",
    "subAlt": "#191919",
    "text": "#eee",
    "error": "#da3333"
  },
  {
    "id": "dracula",
    "name": "Dracula",
    "isDark": true,
    "bg": "#282a36",
    "caret": "#bd93f9",
    "main": "#bd93f9",
    "sub": "#7d8bb4",
    "subAlt": "#20222c",
    "text": "#f8f8f2",
    "error": "#ff5555"
  },
  {
    "id": "gruvbox_dark",
    "name": "Gruvbox Dark",
    "isDark": true,
    "bg": "#282828",
    "caret": "#fabd2f",
    "main": "#d79921",
    "sub": "#94877d",
    "subAlt": "#212121",
    "text": "#ebdbb2",
    "error": "#fb4934"
  },
  {
    "id": "milkshake",
    "name": "Milkshake",
    "isDark": false,
    "bg": "#ffffff",
    "caret": "#212b43",
    "main": "#212b43",
    "sub": "#17798e",
    "subAlt": "#ddeff3",
    "text": "#212b43",
    "error": "#f19dac"
  },
  {
    "id": "modern_ink",
    "name": "Modern Ink",
    "isDark": false,
    "bg": "#ffffff",
    "caret": "#ff0000",
    "main": "#ff360d",
    "sub": "#6e6e6e",
    "subAlt": "#ececec",
    "text": "#000000",
    "error": "#d70000"
  },
  {
    "id": "nord",
    "name": "Nord",
    "isDark": true,
    "bg": "#242933",
    "caret": "#eceff4",
    "main": "#88c0d0",
    "sub": "#929aaa",
    "subAlt": "#2e3440",
    "text": "#d8dee9",
    "error": "#bf616a"
  },
  {
    "id": "nord_light",
    "name": "Nord Light",
    "isDark": false,
    "bg": "#eceff4",
    "caret": "#518786",
    "main": "#518786",
    "sub": "#5c677e",
    "subAlt": "#d8dee9",
    "text": "#3f6968",
    "error": "#bf616a"
  },
  {
    "id": "serika",
    "name": "Serika",
    "isDark": false,
    "bg": "#e1e1e3",
    "caret": "#8e730d",
    "main": "#8e730d",
    "sub": "#5b6066",
    "subAlt": "#d1d3d8",
    "text": "#323437",
    "error": "#da3333"
  },
  {
    "id": "serika_dark",
    "name": "Serika Dark",
    "isDark": true,
    "bg": "#323437",
    "caret": "#e2b714",
    "main": "#e2b714",
    "sub": "#949699",
    "subAlt": "#2c2e31",
    "text": "#d1d0c5",
    "error": "#ca4754"
  }
];
