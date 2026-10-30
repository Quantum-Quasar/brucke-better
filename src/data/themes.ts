// All 187 themes extracted directly from Monkeytype (open-source typing speed platform)
// Supports dynamic CSS variable injection across the entire application.

import { DEFAULT_THEME, THEME_VARS_CACHE_KEY, themeDisplayName } from "@/lib/theme-runtime";

export interface MonkeytypeTheme {
  bg: string;
  main: string;
  caret: string;
  sub: string;
  subAlt: string;
  text: string;
  error: string;
  errorExtra: string;
  colorfulError?: string;
  colorfulErrorExtra?: string;
}

export interface ThemeMeta extends MonkeytypeTheme {
  id: string;
  name: string;
  isDark: boolean;
}

export const THEMES: Record<string, MonkeytypeTheme> = {
  "8008": {
    "bg": "#333a45",
    "caret": "#f44c7f",
    "main": "#f44c7f",
    "sub": "#939eae",
    "subAlt": "#2e343d",
    "text": "#e9ecf0",
    "error": "#da3333",
    "errorExtra": "#791717",
    "colorfulError": "#c5da33",
    "colorfulErrorExtra": "#849224"
  },
  "9009": {
    "bg": "#eeebe2",
    "caret": "#7fa480",
    "main": "#080909",
    "sub": "#605c4d",
    "subAlt": "#d3cfc1",
    "text": "#080909",
    "error": "#c87e74",
    "errorExtra": "#a56961",
    "colorfulError": "#c87e74",
    "colorfulErrorExtra": "#a56961"
  },
  "80s_after_dark": {
    "bg": "#1b1d36",
    "caret": "#99d6ea",
    "main": "#fca6d1",
    "sub": "#99d6ea",
    "subAlt": "#17182c",
    "text": "#e1e7ec",
    "error": "#fffb85",
    "errorExtra": "#fffb85",
    "colorfulError": "#fffb85",
    "colorfulErrorExtra": "#fffb85"
  },
  "aether": {
    "bg": "#101820",
    "caret": "#eedaea",
    "main": "#eedaea",
    "sub": "#cf6bdd",
    "subAlt": "#292136",
    "text": "#eedaea",
    "error": "#ff5253",
    "errorExtra": "#e3002b",
    "colorfulError": "#ff5253",
    "colorfulErrorExtra": "#e3002b"
  },
  "alduin": {
    "bg": "#1c1c1c",
    "caret": "#e3e3e3",
    "main": "#dfd7af",
    "sub": "#a0a0a0",
    "subAlt": "#242424",
    "text": "#f5f3ed",
    "error": "#af5f5f",
    "errorExtra": "#4d2113",
    "colorfulError": "#af5f5f",
    "colorfulErrorExtra": "#4d2113"
  },
  "alpine": {
    "bg": "#6c687f",
    "caret": "#585568",
    "main": "#ffffff",
    "sub": "#f7f6f9",
    "subAlt": "#77738c",
    "text": "#ffffff",
    "error": "#e32b2b",
    "errorExtra": "#a62626",
    "colorfulError": "#e32b2b",
    "colorfulErrorExtra": "#a62626"
  },
  "anti_hero": {
    "bg": "#00002e",
    "caret": "#ffffff",
    "main": "#ffadad",
    "sub": "#ff3d8b",
    "subAlt": "#060548",
    "text": "#f1deef",
    "error": "#8fecff",
    "errorExtra": "#558cab",
    "colorfulError": "#8fecff",
    "colorfulErrorExtra": "#558cab"
  },
  "arch": {
    "bg": "#0c0d11",
    "caret": "#7ebab5",
    "main": "#7ebab5",
    "sub": "#787ca2",
    "subAlt": "#171a25",
    "text": "#f6f5f5",
    "error": "#ff4754",
    "errorExtra": "#b02a33",
    "colorfulError": "#ff4754",
    "colorfulErrorExtra": "#b02a33"
  },
  "aurora": {
    "bg": "#011926",
    "caret": "#00e980",
    "main": "#00e980",
    "sub": "#348698",
    "subAlt": "#000c13",
    "text": "#fff",
    "error": "#b94da1",
    "errorExtra": "#9b3a76",
    "colorfulError": "#b94da1",
    "colorfulErrorExtra": "#9b3a76"
  },
  "beach": {
    "bg": "#ffeead",
    "caret": "#ffcc5c",
    "main": "#418c69",
    "sub": "#875d00",
    "subAlt": "#f7dc8f",
    "text": "#4f685b",
    "error": "#ff6f69",
    "errorExtra": "#ff6f69",
    "colorfulError": "#ff6f69",
    "colorfulErrorExtra": "#ff6f69"
  },
  "bento": {
    "bg": "#2d394d",
    "caret": "#ff7a90",
    "main": "#ff7a90",
    "sub": "#78a2b8",
    "subAlt": "#263041",
    "text": "#fffaf8",
    "error": "#ee2a3a",
    "errorExtra": "#f04040",
    "colorfulError": "#fc2032",
    "colorfulErrorExtra": "#f04040"
  },
  "bingsu": {
    "bg": "#b8a7aa",
    "caret": "#ebe6ea",
    "main": "#614852",
    "sub": "#45353b",
    "subAlt": "#ab989e",
    "text": "#3d313b",
    "error": "#921341",
    "errorExtra": "#640b2c",
    "colorfulError": "#921341",
    "colorfulErrorExtra": "#640b2c"
  },
  "bliss": {
    "bg": "#262727",
    "caret": "#f0d3c9",
    "main": "#f0d3c9",
    "sub": "#a09290",
    "subAlt": "#343231",
    "text": "#fff",
    "error": "#bd4141",
    "errorExtra": "#883434",
    "colorfulError": "#bd4141",
    "colorfulErrorExtra": "#883434"
  },
  "blue_dolphin": {
    "bg": "#003950",
    "caret": "#00bcd4",
    "main": "#ffcefb",
    "sub": "#00e4ff",
    "subAlt": "#014961",
    "text": "#82eaff",
    "error": "#ffbde6",
    "errorExtra": "#ff8188",
    "colorfulError": "#d1a5fd",
    "colorfulErrorExtra": "#ff8188"
  },
  "blueberry_dark": {
    "bg": "#212b42",
    "caret": "#962f7e",
    "main": "#add7ff",
    "sub": "#738fb2",
    "subAlt": "#1b2334",
    "text": "#91b4d5",
    "error": "#df4576",
    "errorExtra": "#d996ac",
    "colorfulError": "#df4576",
    "colorfulErrorExtra": "#d996ac"
  },
  "blueberry_light": {
    "bg": "#dae0f5",
    "caret": "#df4576",
    "main": "#506477",
    "sub": "#455974",
    "subAlt": "#c1c7df",
    "text": "#455666",
    "error": "#df4576",
    "errorExtra": "#d996ac",
    "colorfulError": "#df4576",
    "colorfulErrorExtra": "#d996ac"
  },
  "botanical": {
    "bg": "#7b9c98",
    "caret": "#abc6c4",
    "main": "#eaf1f3",
    "sub": "#232928",
    "subAlt": "#72908d",
    "text": "#18262a",
    "error": "#f6c9b4",
    "errorExtra": "#f59a71",
    "colorfulError": "#f6c9b4",
    "colorfulErrorExtra": "#f59a71"
  },
  "bouquet": {
    "bg": "#173f35",
    "caret": "#eaa09c",
    "main": "#eaa09c",
    "sub": "#6bbca8",
    "subAlt": "#1f4e43",
    "text": "#e9e0d2",
    "error": "#d44729",
    "errorExtra": "#8f2f19",
    "colorfulError": "#d44729",
    "colorfulErrorExtra": "#8f2f19"
  },
  "breeze": {
    "bg": "#e8d5c4",
    "caret": "#7d67a9",
    "main": "#7d67a9",
    "sub": "#286a81",
    "subAlt": "#f6e6da",
    "text": "#1b4c5e",
    "error": "#7d67a9",
    "errorExtra": "#9f3e6d",
    "colorfulError": "#f9f871",
    "colorfulErrorExtra": "#67dfa1"
  },
  "bushido": {
    "bg": "#242933",
    "caret": "#ec4c56",
    "main": "#ec4c56",
    "sub": "#828b9d",
    "subAlt": "#1c222d",
    "text": "#f6f0e9",
    "error": "#ec4c56",
    "errorExtra": "#9b333a",
    "colorfulError": "#ecdc4c",
    "colorfulErrorExtra": "#bdb03d"
  },
  "cafe": {
    "bg": "#ceb18d",
    "caret": "#14120f",
    "main": "#14120f",
    "sub": "#423f3e",
    "subAlt": "#bba180",
    "text": "#14120f",
    "error": "#c82931",
    "errorExtra": "#ac1823",
    "colorfulError": "#c82931",
    "colorfulErrorExtra": "#ac1823"
  },
  "camping": {
    "bg": "#faf1e4",
    "caret": "#618c56",
    "main": "#618c56",
    "sub": "#706351",
    "subAlt": "#e7dccb",
    "text": "#3c403b",
    "error": "#ad4f4e",
    "errorExtra": "#7e3a39",
    "colorfulError": "#ad4f4e",
    "colorfulErrorExtra": "#7e3a39"
  },
  "carbon": {
    "bg": "#313131",
    "caret": "#f66e0d",
    "main": "#f66e0d",
    "sub": "#939393",
    "subAlt": "#2b2b2b",
    "text": "#f5e6c8",
    "error": "#e72d2d",
    "errorExtra": "#7e2a33",
    "colorfulError": "#e72d2d",
    "colorfulErrorExtra": "#7e2a33"
  },
  "catppuccin": {
    "bg": "#1e1e2e",
    "caret": "#f2cdcd",
    "main": "#cba6f7",
    "sub": "#7f849c",
    "subAlt": "#181825",
    "text": "#cdd6f4",
    "error": "#f38ba8",
    "errorExtra": "#eba0ac",
    "colorfulError": "#f38ba8",
    "colorfulErrorExtra": "#eba0ac"
  },
  "chaos_theory": {
    "bg": "#141221",
    "caret": "#dde5ed",
    "main": "#fd77d7",
    "sub": "#79809b",
    "subAlt": "#1e1d2f",
    "text": "#dde5ed",
    "error": "#fd77d7",
    "errorExtra": "#b03c47",
    "colorfulError": "#ff5869",
    "colorfulErrorExtra": "#b03c47"
  },
  "cheesecake": {
    "bg": "#fdf0d5",
    "caret": "#892948",
    "main": "#8e2949",
    "sub": "#c91a78",
    "subAlt": "#f3e2bf",
    "text": "#3a3335",
    "error": "#5cf074",
    "errorExtra": "#5cf074",
    "colorfulError": "#5cf074",
    "colorfulErrorExtra": "#5cf074"
  },
  "cherry_blossom": {
    "bg": "#323437",
    "caret": "#ffffff",
    "main": "#d65ccc",
    "sub": "#92979b",
    "subAlt": "#2d2f31",
    "text": "#d1d0c5",
    "error": "#ca4754",
    "errorExtra": "#d32738",
    "colorfulError": "#ec182d",
    "colorfulErrorExtra": "#6e0c16"
  },
  "comfy": {
    "bg": "#4a5b6e",
    "caret": "#9ec1cc",
    "main": "#f8cdc6",
    "sub": "#b2ced7",
    "subAlt": "#425366",
    "text": "#f5efee",
    "error": "#c9465e",
    "errorExtra": "#c9465e",
    "colorfulError": "#c9465e",
    "colorfulErrorExtra": "#c9465e"
  },
  "copper": {
    "bg": "#442f29",
    "caret": "#c25c42",
    "main": "#b46a55",
    "sub": "#7ebab5",
    "subAlt": "#50362e",
    "text": "#e7e0de",
    "error": "#a32424",
    "errorExtra": "#ec0909",
    "colorfulError": "#a32424",
    "colorfulErrorExtra": "#ec0909"
  },
  "creamsicle": {
    "bg": "#ff9869",
    "caret": "#5b5b27",
    "main": "#5b5b27",
    "sub": "#782600",
    "subAlt": "#fe8954",
    "text": "#40401c",
    "error": "#6a0dad",
    "errorExtra": "#6a0dad",
    "colorfulError": "#6a0dad",
    "colorfulErrorExtra": "#6a0dad"
  },
  "cy_red": {
    "bg": "#6e2626",
    "caret": "#541d1d",
    "main": "#e55050",
    "sub": "#ff7a7a",
    "subAlt": "#3f1616",
    "text": "#ffaaaa",
    "error": "#919fd9",
    "errorExtra": "#4d5d9e",
    "colorfulError": "#919fd9",
    "colorfulErrorExtra": "#4d5d9e"
  },
  "cyberspace": {
    "bg": "#181c18",
    "caret": "#00ce7c",
    "main": "#00ce7c",
    "sub": "#9578d3",
    "subAlt": "#131613",
    "text": "#c2fbe1",
    "error": "#ff5f5f",
    "errorExtra": "#d22a2a",
    "colorfulError": "#ff5f5f",
    "colorfulErrorExtra": "#d22a2a"
  },
  "dark": {
    "bg": "#111",
    "caret": "#eee",
    "main": "#eee",
    "sub": "#7c7c7c",
    "subAlt": "#191919",
    "text": "#eee",
    "error": "#da3333",
    "errorExtra": "#791717",
    "colorfulError": "#da3333",
    "colorfulErrorExtra": "#791717"
  },
  "dark_magic_girl": {
    "bg": "#091f2c",
    "caret": "#a288d9",
    "main": "#f5b1cc",
    "sub": "#93e8d3",
    "subAlt": "#071823",
    "text": "#a288d9",
    "error": "#e45c96",
    "errorExtra": "#e45c96",
    "colorfulError": "#00b398",
    "colorfulErrorExtra": "#e45c96"
  },
  "dark_note": {
    "bg": "#1f1f1f",
    "caret": "#e3dce0",
    "main": "#f2c17b",
    "sub": "#768f95",
    "subAlt": "#141414",
    "text": "#d2dff4",
    "error": "#ff0000",
    "errorExtra": "#588498",
    "colorfulError": "#ff0000",
    "colorfulErrorExtra": "#588498"
  },
  "darling": {
    "bg": "#fec8cd",
    "caret": "#6e6e6e",
    "main": "#6e6e6e",
    "sub": "#a30000",
    "subAlt": "#f2babd",
    "text": "#545454",
    "error": "#2e7dde",
    "errorExtra": "#2e7dde",
    "colorfulError": "#2e7dde",
    "colorfulErrorExtra": "#2e7dde"
  },
  "deku": {
    "bg": "#058b8c",
    "caret": "#571917",
    "main": "#571917",
    "sub": "#081314",
    "subAlt": "#098586",
    "text": "#090703",
    "error": "#b63530",
    "errorExtra": "#530e0e",
    "colorfulError": "#ddca1f",
    "colorfulErrorExtra": "#8f8610"
  },
  "desert_oasis": {
    "bg": "#fff2d5",
    "caret": "#3a87fe",
    "main": "#a17901",
    "sub": "#005bef",
    "subAlt": "#eddebc",
    "text": "#332800",
    "error": "#76bb40",
    "errorExtra": "#4e7a27",
    "colorfulError": "#76bb40",
    "colorfulErrorExtra": "#4e7a27"
  },
  "dev": {
    "bg": "#1b2028",
    "caret": "#4b5975",
    "main": "#23a9d5",
    "sub": "#7082a4",
    "subAlt": "#151a21",
    "text": "#ccccb5",
    "error": "#b81b2c",
    "errorExtra": "#84131f",
    "colorfulError": "#b81b2c",
    "colorfulErrorExtra": "#84131f"
  },
  "diner": {
    "bg": "#537997",
    "caret": "#ad5145",
    "main": "#dcd1a0",
    "sub": "#f2f5f8",
    "subAlt": "#4d6f8b",
    "text": "#fdfdfc",
    "error": "#ad5145",
    "errorExtra": "#7e2a33",
    "colorfulError": "#ad5145",
    "colorfulErrorExtra": "#7e2a33"
  },
  "dino": {
    "bg": "#ffffff",
    "caret": "#229d4b",
    "main": "#229d4b",
    "sub": "#707070",
    "subAlt": "#cafad8",
    "text": "#1d221f",
    "error": "#ff5f5f",
    "errorExtra": "#d22a2a",
    "colorfulError": "#ff5f5f",
    "colorfulErrorExtra": "#d22a2a"
  },
  "discord": {
    "bg": "#313338",
    "caret": "#5a65ea",
    "main": "#5a65ea",
    "sub": "#93959f",
    "subAlt": "#2b2d31",
    "text": "#dcdee3",
    "error": "#df4f4b",
    "errorExtra": "#df4f4b",
    "colorfulError": "#df4f4b",
    "colorfulErrorExtra": "#df4f4b"
  },
  "dmg": {
    "bg": "#dadbdc",
    "caret": "#384693",
    "main": "#ae185e",
    "sub": "#3846b1",
    "subAlt": "#bec1d2",
    "text": "#414141",
    "error": "#ae185e",
    "errorExtra": "#93335c",
    "colorfulError": "#80a053",
    "colorfulErrorExtra": "#306230"
  },
  "dollar": {
    "bg": "#e4e4d4",
    "caret": "#424643",
    "main": "#5f785f",
    "sub": "#556040",
    "subAlt": "#cbd0bf",
    "text": "#545955",
    "error": "#d60000",
    "errorExtra": "#f68484",
    "colorfulError": "#ca4754",
    "colorfulErrorExtra": "#7e2a33"
  },
  "dots": {
    "bg": "#121520",
    "caret": "#fff",
    "main": "#fff",
    "sub": "#79809b",
    "subAlt": "#1b1e2c",
    "text": "#fff",
    "error": "#da3333",
    "errorExtra": "#791717",
    "colorfulError": "#da3333",
    "colorfulErrorExtra": "#791717"
  },
  "dracula": {
    "bg": "#282a36",
    "caret": "#bd93f9",
    "main": "#bd93f9",
    "sub": "#7d8bb4",
    "subAlt": "#20222c",
    "text": "#f8f8f2",
    "error": "#ff5555",
    "errorExtra": "#f1fa8c",
    "colorfulError": "#ff5555",
    "colorfulErrorExtra": "#f1fa8c"
  },
  "drowning": {
    "bg": "#191826",
    "caret": "#4f85e8",
    "main": "#4a6fb5",
    "sub": "#6a84aa",
    "subAlt": "#1e1f2f",
    "text": "#9393a7",
    "error": "#be555f",
    "errorExtra": "#7e2a33",
    "colorfulError": "#be555f",
    "colorfulErrorExtra": "#7e2a33"
  },
  "dualshot": {
    "bg": "#737373",
    "caret": "#212222",
    "main": "#212222",
    "sub": "#f3f3f3",
    "subAlt": "#646464",
    "text": "#f9f9f9",
    "error": "#c82931",
    "errorExtra": "#ac1823",
    "colorfulError": "#c82931",
    "colorfulErrorExtra": "#ac1823"
  },
  "earthsong": {
    "bg": "#292521",
    "caret": "#1298ba",
    "main": "#509452",
    "sub": "#f5ae2d",
    "subAlt": "#1d1b18",
    "text": "#e6c7a8",
    "error": "#7e2a33",
    "errorExtra": "#ff645a",
    "colorfulError": "#7e2a33",
    "colorfulErrorExtra": "#ff645a"
  },
  "everblush": {
    "bg": "#141b1e",
    "caret": "#6cbfbf",
    "main": "#8ccf7e",
    "sub": "#878c8b",
    "subAlt": "#232a2d",
    "text": "#dadada",
    "error": "#e57474",
    "errorExtra": "#ef7e7e",
    "colorfulError": "#e57474",
    "colorfulErrorExtra": "#ef7e7e"
  },
  "evil_eye": {
    "bg": "#0084c2",
    "caret": "#f7f2ea",
    "main": "#f7f2ea",
    "sub": "#00101e",
    "subAlt": "#087cbf",
    "text": "#040404",
    "error": "#ca4754",
    "errorExtra": "#7e2a33",
    "colorfulError": "#ca4754",
    "colorfulErrorExtra": "#7e2a33"
  },
  "ez_mode": {
    "bg": "#0068c6",
    "caret": "#4ddb47",
    "main": "#fca2e6",
    "sub": "#cae5fd",
    "subAlt": "#005bac",
    "text": "#ffffff",
    "error": "#4ddb47",
    "errorExtra": "#42ba3b",
    "colorfulError": "#4ddb47",
    "colorfulErrorExtra": "#42ba3b"
  },
  "fire": {
    "bg": "#0f0000",
    "caret": "#b31313",
    "main": "#b31313",
    "sub": "#af6060",
    "subAlt": "#200a0a",
    "text": "#ffffff",
    "error": "#2f3cb6",
    "errorExtra": "#434a8f",
    "colorfulError": "#2f3cb6",
    "colorfulErrorExtra": "#434a8f"
  },
  "fledgling": {
    "bg": "#3b363f",
    "caret": "#474747",
    "main": "#fc6e83",
    "sub": "#bc8f9e",
    "subAlt": "#332e38",
    "text": "#e6d5d3",
    "error": "#f52443",
    "errorExtra": "#bd001c",
    "colorfulError": "#ff0a2f",
    "colorfulErrorExtra": "#000000"
  },
  "fleuriste": {
    "bg": "#c6b294",
    "caret": "#8a785b",
    "main": "#405a52",
    "sub": "#5d3348",
    "subAlt": "#b4a389",
    "text": "#091914",
    "error": "#990000",
    "errorExtra": "#8a1414",
    "colorfulError": "#a63a3a",
    "colorfulErrorExtra": "#bd4c4c"
  },
  "floret": {
    "bg": "#00272c",
    "caret": "#c3bd40",
    "main": "#ffdd6d",
    "sub": "#7a9299",
    "subAlt": "#173033",
    "text": "#e5e5e5",
    "error": "#8a4000",
    "errorExtra": "#00708d",
    "colorfulError": "#8a4000",
    "colorfulErrorExtra": "#628b96"
  },
  "froyo": {
    "bg": "#e1dacb",
    "caret": "#7b7d7d",
    "main": "#7b7d7d",
    "sub": "#695a32",
    "subAlt": "#d3cdc1",
    "text": "#565858",
    "error": "#f28578",
    "errorExtra": "#d56558",
    "colorfulError": "#f28578",
    "colorfulErrorExtra": "#d56558"
  },
  "frozen_llama": {
    "bg": "#9bf2ea",
    "caret": "#ffffff",
    "main": "#6d44a6",
    "sub": "#7127fb",
    "subAlt": "#7fe7dd",
    "text": "#5d5d5d",
    "error": "#e42629",
    "errorExtra": "#e42629",
    "colorfulError": "#e42629",
    "colorfulErrorExtra": "#e42629"
  },
  "fruit_chew": {
    "bg": "#d6d3d6",
    "caret": "#b92221",
    "main": "#5c1e5f",
    "sub": "#654d66",
    "subAlt": "#cabfca",
    "text": "#282528",
    "error": "#bd2621",
    "errorExtra": "#a62626",
    "colorfulError": "#bd2621",
    "colorfulErrorExtra": "#a62626"
  },
  "fundamentals": {
    "bg": "#727474",
    "caret": "#196378",
    "main": "#c2d4c3",
    "sub": "#f3f2f1",
    "subAlt": "#666868",
    "text": "#fafafa",
    "error": "#5e477c",
    "errorExtra": "#413157",
    "colorfulError": "#5e477c",
    "colorfulErrorExtra": "#413157"
  },
  "future_funk": {
    "bg": "#2e1a47",
    "caret": "#f7f2ea",
    "main": "#f7f2ea",
    "sub": "#c18fff",
    "subAlt": "#27173c",
    "text": "#f7f2ea",
    "error": "#f04e98",
    "errorExtra": "#bd1c66",
    "colorfulError": "#f04e98",
    "colorfulErrorExtra": "#bd1c66"
  },
  "github": {
    "bg": "#212830",
    "caret": "#41ce5c",
    "main": "#41ce5c",
    "sub": "#808a8d",
    "subAlt": "#141b23",
    "text": "#ccdae6",
    "error": "#c23e3a",
    "errorExtra": "#c23e3a",
    "colorfulError": "#c23e3a",
    "colorfulErrorExtra": "#c23e3a"
  },
  "godspeed": {
    "bg": "#eae4cf",
    "caret": "#f4d476",
    "main": "#4d819d",
    "sub": "#686453",
    "subAlt": "#ded9c9",
    "text": "#5d5e61",
    "error": "#ca4754",
    "errorExtra": "#7e2a33",
    "colorfulError": "#ca4754",
    "colorfulErrorExtra": "#7e2a33"
  },
  "graen": {
    "bg": "#303c36",
    "caret": "#601420",
    "main": "#a59682",
    "sub": "#9aaca1",
    "subAlt": "#36453c",
    "text": "#b8ac9d",
    "error": "#601420",
    "errorExtra": "#5f0715",
    "colorfulError": "#601420",
    "colorfulErrorExtra": "#5f0715"
  },
  "grand_prix": {
    "bg": "#36475c",
    "caret": "#c0d036",
    "main": "#c0d036",
    "sub": "#b7c0cb",
    "subAlt": "#42536b",
    "text": "#c1c7d7",
    "error": "#fc5727",
    "errorExtra": "#fc5727",
    "colorfulError": "#fc5727",
    "colorfulErrorExtra": "#fc5727"
  },
  "grape": {
    "bg": "#2c003e",
    "caret": "#ff8f00",
    "main": "#ff8f00",
    "sub": "#c749ac",
    "subAlt": "#1f002d",
    "text": "#fff",
    "error": "#ff4081",
    "errorExtra": "#bf2054",
    "colorfulError": "#ff4081",
    "colorfulErrorExtra": "#bf2054"
  },
  "gruvbox_dark": {
    "bg": "#282828",
    "caret": "#fabd2f",
    "main": "#d79921",
    "sub": "#94877d",
    "subAlt": "#212121",
    "text": "#ebdbb2",
    "error": "#fb4934",
    "errorExtra": "#cc241d",
    "colorfulError": "#cc241d",
    "colorfulErrorExtra": "#9d0006"
  },
  "gruvbox_light": {
    "bg": "#fbf1c7",
    "caret": "#527e53",
    "main": "#527e53",
    "sub": "#685b4a",
    "subAlt": "#daceae",
    "text": "#3c3836",
    "error": "#cc241d",
    "errorExtra": "#9d0006",
    "colorfulError": "#cc241d",
    "colorfulErrorExtra": "#9d0006"
  },
  "hammerhead": {
    "bg": "#030613",
    "caret": "#4fcdb9",
    "main": "#4fcdb9",
    "sub": "#4781b2",
    "subAlt": "#0a1928",
    "text": "#e2f1f5",
    "error": "#e32b2b",
    "errorExtra": "#a62626",
    "colorfulError": "#e32b2b",
    "colorfulErrorExtra": "#a62626"
  },
  "hanok": {
    "bg": "#d8d2c3",
    "caret": "#513a2a",
    "main": "#513a2a",
    "sub": "#655043",
    "subAlt": "#cdc0af",
    "text": "#393b3b",
    "error": "#ca4754",
    "errorExtra": "#7e2a33",
    "colorfulError": "#ca4754",
    "colorfulErrorExtra": "#7e2a33"
  },
  "hedge": {
    "bg": "#415e31",
    "caret": "#f2efbb",
    "main": "#85b36a",
    "sub": "#ede5b4",
    "subAlt": "#38502a",
    "text": "#f7f1d6",
    "error": "#ca3d3f",
    "errorExtra": "#782832",
    "colorfulError": "#e76f51",
    "colorfulErrorExtra": "#f4a261"
  },
  "honey": {
    "bg": "#f2aa00",
    "caret": "#795200",
    "main": "#5f5a00",
    "sub": "#5f3d00",
    "subAlt": "#e19e00",
    "text": "#463f10",
    "error": "#df3333",
    "errorExtra": "#6d1f1f",
    "colorfulError": "#df3333",
    "colorfulErrorExtra": "#6d1f1f"
  },
  "horizon": {
    "bg": "#1c1e26",
    "caret": "#bbbbbb",
    "main": "#c4a88a",
    "sub": "#db886f",
    "subAlt": "#17181f",
    "text": "#bbbbbb",
    "error": "#d55170",
    "errorExtra": "#ff3d3d",
    "colorfulError": "#d55170",
    "colorfulErrorExtra": "#d55170"
  },
  "husqy": {
    "bg": "#000000",
    "caret": "#c58aff",
    "main": "#c58aff",
    "sub": "#9d3cff",
    "subAlt": "#1e001e",
    "text": "#ebd7ff",
    "error": "#da3333",
    "errorExtra": "#791717",
    "colorfulError": "#da3333",
    "colorfulErrorExtra": "#791717"
  },
  "iceberg_dark": {
    "bg": "#161821",
    "caret": "#d2d4de",
    "main": "#84a0c6",
    "sub": "#8186a0",
    "subAlt": "#232531",
    "text": "#c6c8d1",
    "error": "#e27878",
    "errorExtra": "#e2a478",
    "colorfulError": "#e27878",
    "colorfulErrorExtra": "#e2a478"
  },
  "iceberg_light": {
    "bg": "#e8e9ec",
    "caret": "#262a3f",
    "main": "#2d539e",
    "sub": "#555b76",
    "subAlt": "#ccceda",
    "text": "#33374c",
    "error": "#cc517a",
    "errorExtra": "#cc3768",
    "colorfulError": "#cc517a",
    "colorfulErrorExtra": "#cc3768"
  },
  "incognito": {
    "bg": "#0e0e0e",
    "caret": "#ff9900",
    "main": "#ff9900",
    "sub": "#7a7a7a",
    "subAlt": "#151515",
    "text": "#c6c6c6",
    "error": "#e44545",
    "errorExtra": "#e44545",
    "colorfulError": "#b13535",
    "colorfulErrorExtra": "#b13535"
  },
  "ishtar": {
    "bg": "#202020",
    "caret": "#c58940",
    "main": "#da2312",
    "sub": "#948778",
    "subAlt": "#272727",
    "text": "#fae1c3",
    "error": "#bb1e10",
    "errorExtra": "#791717",
    "colorfulError": "#c5da33",
    "colorfulErrorExtra": "#849224"
  },
  "iv_clover": {
    "bg": "#a0a0a0",
    "caret": "#8d8d8d",
    "main": "#573e40",
    "sub": "#353535",
    "subAlt": "#bebebe",
    "text": "#3b2d3b",
    "error": "#937173",
    "errorExtra": "#987678",
    "colorfulError": "#ad8d60",
    "colorfulErrorExtra": "#b7976a"
  },
  "iv_spade": {
    "bg": "#0c0c0c",
    "caret": "#bebebe",
    "main": "#b7976a",
    "sub": "#787878",
    "subAlt": "#121212",
    "text": "#d3c2c3",
    "error": "#9d7b7d",
    "errorExtra": "#a78587",
    "colorfulError": "#b7976a",
    "colorfulErrorExtra": "#c1a174"
  },
  "joker": {
    "bg": "#1a0e25",
    "caret": "#99de1e",
    "main": "#99de1e",
    "sub": "#896bb3",
    "subAlt": "#14081f",
    "text": "#e9e2f5",
    "error": "#e32b2b",
    "errorExtra": "#a62626",
    "colorfulError": "#e32b2b",
    "colorfulErrorExtra": "#a62626"
  },
  "laser": {
    "bg": "#221b44",
    "caret": "#009eaf",
    "main": "#009eaf",
    "sub": "#de4f80",
    "subAlt": "#1e173b",
    "text": "#dbe7e8",
    "error": "#a8d400",
    "errorExtra": "#668000",
    "colorfulError": "#a8d400",
    "colorfulErrorExtra": "#668000"
  },
  "lavender": {
    "bg": "#ada6c2",
    "caret": "#514e63",
    "main": "#514e63",
    "sub": "#3b3948",
    "subAlt": "#a19bb9",
    "text": "#2f2a41",
    "error": "#ca4754",
    "errorExtra": "#7e2a33",
    "colorfulError": "#ca4754",
    "colorfulErrorExtra": "#7e2a33"
  },
  "leather": {
    "bg": "#a86948",
    "caret": "#ef6d49",
    "main": "#ffe4bc",
    "sub": "#1a0e09",
    "subAlt": "#a66847",
    "text": "#0a0600",
    "error": "#ca4754",
    "errorExtra": "#7e2a33",
    "colorfulError": "#ca4754",
    "colorfulErrorExtra": "#7e2a33"
  },
  "lil_dragon": {
    "bg": "#ebe1ef",
    "caret": "#212b43",
    "main": "#8a5bd6",
    "sub": "#6a5283",
    "subAlt": "#dac7e2",
    "text": "#212b43",
    "error": "#f794ca",
    "errorExtra": "#f279c2",
    "colorfulError": "#f794ca",
    "colorfulErrorExtra": "#f279c2"
  },
  "lilac_mist": {
    "bg": "#fffbfe",
    "caret": "#e099d6",
    "main": "#b94189",
    "sub": "#b43481",
    "subAlt": "#ecdcee",
    "text": "#5c2954",
    "error": "#ff6f69",
    "errorExtra": "#ff6f69",
    "colorfulError": "#bc7fc0",
    "colorfulErrorExtra": "#bc41b1"
  },
  "lime": {
    "bg": "#7c878e",
    "caret": "#e1eecb",
    "main": "#e1eecb",
    "sub": "#161819",
    "subAlt": "#737d82",
    "text": "#0c1116",
    "error": "#ea4221",
    "errorExtra": "#7e2a33",
    "colorfulError": "#ea4221",
    "colorfulErrorExtra": "#7e2a33"
  },
  "luna": {
    "bg": "#221c35",
    "caret": "#f67599",
    "main": "#f67599",
    "sub": "#9e7cc3",
    "subAlt": "#2f2346",
    "text": "#ffe3eb",
    "error": "#efc050",
    "errorExtra": "#c5972c",
    "colorfulError": "#efc050",
    "colorfulErrorExtra": "#c5972c"
  },
  "macroblank": {
    "bg": "#b2d2c8",
    "caret": "#766f71",
    "main": "#c13117",
    "sub": "#565c5a",
    "subAlt": "#c6ddd3",
    "text": "#490909",
    "error": "#c13117",
    "errorExtra": "#fff5f5",
    "colorfulError": "#fff5f5",
    "colorfulErrorExtra": "#ffe9c2"
  },
  "magic_girl": {
    "bg": "#ffffff",
    "caret": "#e45c96",
    "main": "#e95791",
    "sub": "#1c8268",
    "subAlt": "#f2f2f2",
    "text": "#007c65",
    "error": "#ffe495",
    "errorExtra": "#e45c96",
    "colorfulError": "#ffe485",
    "colorfulErrorExtra": "#e45c96"
  },
  "mashu": {
    "bg": "#2b2b2c",
    "caret": "#76689a",
    "main": "#76689a",
    "sub": "#d8a0a6",
    "subAlt": "#27242c",
    "text": "#f1e2e4",
    "error": "#d44729",
    "errorExtra": "#8f2f19",
    "colorfulError": "#d44729",
    "colorfulErrorExtra": "#8f2f19"
  },
  "matcha_moccha": {
    "bg": "#523525",
    "caret": "#7ec160",
    "main": "#7ec160",
    "sub": "#c3967d",
    "subAlt": "#422b1e",
    "text": "#ecddcc",
    "error": "#fb4934",
    "errorExtra": "#cc241d",
    "colorfulError": "#fb4934",
    "colorfulErrorExtra": "#cc241d"
  },
  "material": {
    "bg": "#263238",
    "caret": "#80cbc4",
    "main": "#80cbc4",
    "sub": "#85a2ae",
    "subAlt": "#2e3c43",
    "text": "#e6edf3",
    "error": "#fb4934",
    "errorExtra": "#cc241d",
    "colorfulError": "#fb4934",
    "colorfulErrorExtra": "#cc241d"
  },
  "matrix": {
    "bg": "#000000",
    "caret": "#15ff00",
    "main": "#15ff00",
    "sub": "#009300",
    "subAlt": "#032000",
    "text": "#d1ffcd",
    "error": "#da3333",
    "errorExtra": "#791717",
    "colorfulError": "#da3333",
    "colorfulErrorExtra": "#791717"
  },
  "menthol": {
    "bg": "#00c18c",
    "caret": "#99fdd8",
    "main": "#4c4c4c",
    "sub": "#0f3e2a",
    "subAlt": "#17ae7d",
    "text": "#323232",
    "error": "#e03c3c",
    "errorExtra": "#b12525",
    "colorfulError": "#e03c3c",
    "colorfulErrorExtra": "#b12525"
  },
  "metaverse": {
    "bg": "#232323",
    "caret": "#d82934",
    "main": "#d82934",
    "sub": "#848484",
    "subAlt": "#1d1d1d",
    "text": "#e8e8e8",
    "error": "#da3333",
    "errorExtra": "#791717",
    "colorfulError": "#d7da33",
    "colorfulErrorExtra": "#737917"
  },
  "metropolis": {
    "bg": "#0f1f2c",
    "caret": "#56c3b7",
    "main": "#56c3b7",
    "sub": "#4188ab",
    "subAlt": "#0b1822",
    "text": "#e4edf1",
    "error": "#d44729",
    "errorExtra": "#8f2f19",
    "colorfulError": "#d44729",
    "colorfulErrorExtra": "#8f2f19"
  },
  "mexican": {
    "bg": "#f8ad34",
    "caret": "#eee",
    "main": "#b12189",
    "sub": "#333",
    "subAlt": "#f9b951",
    "text": "#4c4c4c",
    "error": "#da3333",
    "errorExtra": "#791717",
    "colorfulError": "#da3333",
    "colorfulErrorExtra": "#791717"
  },
  "miami": {
    "bg": "#f35588",
    "caret": "#a3f7bf",
    "main": "#013d3b",
    "sub": "#360f1c",
    "subAlt": "#db4979",
    "text": "#1c1317",
    "error": "#fff591",
    "errorExtra": "#b9b269",
    "colorfulError": "#fff591",
    "colorfulErrorExtra": "#b9b269"
  },
  "miami_nights": {
    "bg": "#18181a",
    "caret": "#e4609b",
    "main": "#e4609b",
    "sub": "#47bac0",
    "subAlt": "#0f0f10",
    "text": "#fff",
    "error": "#fff591",
    "errorExtra": "#b6af68",
    "colorfulError": "#fff591",
    "colorfulErrorExtra": "#b6af68"
  },
  "midnight": {
    "bg": "#0b0e13",
    "caret": "#60759f",
    "main": "#60759f",
    "sub": "#677da5",
    "subAlt": "#141a24",
    "text": "#9fadc6",
    "error": "#c27070",
    "errorExtra": "#c28b70",
    "colorfulError": "#c27070",
    "colorfulErrorExtra": "#c28b70"
  },
  "milkshake": {
    "bg": "#ffffff",
    "caret": "#212b43",
    "main": "#212b43",
    "sub": "#17798e",
    "subAlt": "#ddeff3",
    "text": "#212b43",
    "error": "#f19dac",
    "errorExtra": "#e58c9d",
    "colorfulError": "#f19dac",
    "colorfulErrorExtra": "#e58c9d"
  },
  "mint": {
    "bg": "#05385b",
    "caret": "#5cdb95",
    "main": "#5cdb95",
    "sub": "#3ca2d2",
    "subAlt": "#07324e",
    "text": "#edf5e1",
    "error": "#f35588",
    "errorExtra": "#a3385a",
    "colorfulError": "#f35588",
    "colorfulErrorExtra": "#a3385a"
  },
  "mizu": {
    "bg": "#afcbdd",
    "caret": "#736626",
    "main": "#736626",
    "sub": "#385365",
    "subAlt": "#9fc1d4",
    "text": "#1a2633",
    "error": "#bf616a",
    "errorExtra": "#793e44",
    "colorfulError": "#bf616a",
    "colorfulErrorExtra": "#793e44"
  },
  "modern_dolch": {
    "bg": "#2d2e30",
    "caret": "#7eddd3",
    "main": "#7eddd3",
    "sub": "#8b9095",
    "subAlt": "#242527",
    "text": "#e3e6eb",
    "error": "#d36a7b",
    "errorExtra": "#994154",
    "colorfulError": "#d36a7b",
    "colorfulErrorExtra": "#994154"
  },
  "modern_dolch_light": {
    "bg": "#dbdbdb",
    "caret": "#388978",
    "main": "#388978",
    "sub": "#656363",
    "subAlt": "#e8e8e8",
    "text": "#454545",
    "error": "#ea8a9a",
    "errorExtra": "#e0556d",
    "colorfulError": "#ea8a9a",
    "colorfulErrorExtra": "#e0556d"
  },
  "modern_ink": {
    "bg": "#ffffff",
    "caret": "#ff0000",
    "main": "#ff360d",
    "sub": "#6e6e6e",
    "subAlt": "#ececec",
    "text": "#000000",
    "error": "#d70000",
    "errorExtra": "#b00000",
    "colorfulError": "#000000",
    "colorfulErrorExtra": "#000000"
  },
  "monokai": {
    "bg": "#272822",
    "caret": "#66d9ef",
    "main": "#a6e22e",
    "sub": "#e6db74",
    "subAlt": "#1f201b",
    "text": "#e2e2dc",
    "error": "#f92672",
    "errorExtra": "#fd971f",
    "colorfulError": "#f92672",
    "colorfulErrorExtra": "#fd971f"
  },
  "moonlight": {
    "bg": "#191f28",
    "caret": "#8f744b",
    "main": "#c69f68",
    "sub": "#7082a4",
    "subAlt": "#141a22",
    "text": "#ccccb5",
    "error": "#b81b2c",
    "errorExtra": "#84131f",
    "colorfulError": "#b81b2c",
    "colorfulErrorExtra": "#84131f"
  },
  "mountain": {
    "bg": "#0f0f0f",
    "caret": "#f5f5f5",
    "main": "#e7e7e7",
    "sub": "#7e7e7e",
    "subAlt": "#1a1a1a",
    "text": "#e7e7e7",
    "error": "#ac8c8c",
    "errorExtra": "#c49ea0",
    "colorfulError": "#aca98a",
    "colorfulErrorExtra": "#c4c19e"
  },
  "mr_sleeves": {
    "bg": "#d1d7da",
    "caret": "#8fadc9",
    "main": "#ac5840",
    "sub": "#555a5c",
    "subAlt": "#bfcbd1",
    "text": "#1d1d1d",
    "error": "#bf6464",
    "errorExtra": "#793e44",
    "colorfulError": "#8fadc9",
    "colorfulErrorExtra": "#667c91"
  },
  "ms_cupcakes": {
    "bg": "#ffffff",
    "caret": "#303030",
    "main": "#0e9bbe",
    "sub": "#d33389",
    "subAlt": "#edf8fa",
    "text": "#0a282f",
    "error": "#a4dd32",
    "errorExtra": "#90bd34",
    "colorfulError": "#a4dd32",
    "colorfulErrorExtra": "#87b330"
  },
  "muted": {
    "bg": "#525252",
    "caret": "#b1e4e3",
    "main": "#c5b4e3",
    "sub": "#b7bfc9",
    "subAlt": "#494949",
    "text": "#b1e4e3",
    "error": "#edc1cd",
    "errorExtra": "#edc1cd",
    "colorfulError": "#edc1cd",
    "colorfulErrorExtra": "#edc1cd"
  },
  "nautilus": {
    "bg": "#132237",
    "caret": "#ebb723",
    "main": "#ebb723",
    "sub": "#148cc6",
    "subAlt": "#0e1a29",
    "text": "#1cbaac",
    "error": "#da3333",
    "errorExtra": "#791717",
    "colorfulError": "#da3333",
    "colorfulErrorExtra": "#791717"
  },
  "nebula": {
    "bg": "#212135",
    "caret": "#78c729",
    "main": "#be3c88",
    "sub": "#19b3b8",
    "subAlt": "#191928",
    "text": "#878a8a",
    "error": "#ca4754",
    "errorExtra": "#7e2a33",
    "colorfulError": "#ca4754",
    "colorfulErrorExtra": "#7e2a33"
  },
  "night_runner": {
    "bg": "#212121",
    "caret": "#feff04",
    "main": "#feff04",
    "sub": "#8878bf",
    "subAlt": "#1a1a1a",
    "text": "#e8e8e8",
    "error": "#da3333",
    "errorExtra": "#791717",
    "colorfulError": "#da3333",
    "colorfulErrorExtra": "#791717"
  },
  "nord": {
    "bg": "#242933",
    "caret": "#eceff4",
    "main": "#88c0d0",
    "sub": "#929aaa",
    "subAlt": "#2e3440",
    "text": "#d8dee9",
    "error": "#bf616a",
    "errorExtra": "#793e44",
    "colorfulError": "#bf616a",
    "colorfulErrorExtra": "#793e44"
  },
  "nord_light": {
    "bg": "#eceff4",
    "caret": "#518786",
    "main": "#518786",
    "sub": "#5c677e",
    "subAlt": "#d8dee9",
    "text": "#3f6968",
    "error": "#bf616a",
    "errorExtra": "#793e44",
    "colorfulError": "#bf616a",
    "colorfulErrorExtra": "#793e44"
  },
  "norse": {
    "bg": "#242425",
    "caret": "#3c8599",
    "main": "#3c8599",
    "sub": "#89979a",
    "subAlt": "#303333",
    "text": "#ccc2b1",
    "error": "#7e2a2a",
    "errorExtra": "#771d1d",
    "colorfulError": "#ca4754",
    "colorfulErrorExtra": "#7e2a33"
  },
  "oblivion": {
    "bg": "#313231",
    "caret": "#a5a096",
    "main": "#a5a096",
    "sub": "#9ba0a1",
    "subAlt": "#3a3b3b",
    "text": "#f7f5f1",
    "error": "#dd452e",
    "errorExtra": "#9e3423",
    "colorfulError": "#dd452e",
    "colorfulErrorExtra": "#9e3423"
  },
  "olive": {
    "bg": "#e9e5cc",
    "caret": "#747658",
    "main": "#747658",
    "sub": "#605c47",
    "subAlt": "#d4cfbc",
    "text": "#373731",
    "error": "#cf2f2f",
    "errorExtra": "#a22929",
    "colorfulError": "#cf2f2f",
    "colorfulErrorExtra": "#a22929"
  },
  "olivia": {
    "bg": "#1c1b1d",
    "caret": "#deaf9d",
    "main": "#deaf9d",
    "sub": "#987e7e",
    "subAlt": "#262223",
    "text": "#f2efed",
    "error": "#bf616a",
    "errorExtra": "#793e44",
    "colorfulError": "#e03d4e",
    "colorfulErrorExtra": "#aa2f3b"
  },
  "onedark": {
    "bg": "#2f343f",
    "caret": "#61afef",
    "main": "#61afef",
    "sub": "#eceff4",
    "subAlt": "#262b34",
    "text": "#98c379",
    "error": "#e06c75",
    "errorExtra": "#d62436",
    "colorfulError": "#d62436",
    "colorfulErrorExtra": "#ff0019"
  },
  "our_theme": {
    "bg": "#ce1226",
    "caret": "#fcd116",
    "main": "#fcd116",
    "sub": "#fad8dc",
    "subAlt": "#9f1020",
    "text": "#ffffff",
    "error": "#fcd116",
    "errorExtra": "#fcd116",
    "colorfulError": "#1672fc",
    "colorfulErrorExtra": "#1672fc"
  },
  "pale_nimbus": {
    "bg": "#433e4c",
    "caret": "#9efffd",
    "main": "#94ffc2",
    "sub": "#ffb1a8",
    "subAlt": "#694f5e",
    "text": "#feffdb",
    "error": "#ff5c5c",
    "errorExtra": "#ff0000",
    "colorfulError": "#ff3874",
    "colorfulErrorExtra": "#c2386f"
  },
  "paper": {
    "bg": "#eeeeee",
    "caret": "#444444",
    "main": "#444444",
    "sub": "#666666",
    "subAlt": "#dddddd",
    "text": "#444444",
    "error": "#d70000",
    "errorExtra": "#d70000",
    "colorfulError": "#d70000",
    "colorfulErrorExtra": "#d70000"
  },
  "passion_fruit": {
    "bg": "#7c2142",
    "caret": "#ffffff",
    "main": "#f4a3b4",
    "sub": "#c2bfd4",
    "subAlt": "#833c5e",
    "text": "#ffffff",
    "error": "#deb80b",
    "errorExtra": "#deb80b",
    "colorfulError": "#deb80b",
    "colorfulErrorExtra": "#deb80b"
  },
  "pastel": {
    "bg": "#e0b2bd",
    "caret": "#655b06",
    "main": "#655b06",
    "sub": "#004968",
    "subAlt": "#d29fab",
    "text": "#483d49",
    "error": "#ff6961",
    "errorExtra": "#c23b22",
    "colorfulError": "#ff6961",
    "colorfulErrorExtra": "#c23b22"
  },
  "peach_blossom": {
    "bg": "#292929",
    "caret": "#616161",
    "main": "#99b898",
    "sub": "#979797",
    "subAlt": "#2a363b",
    "text": "#fecea8",
    "error": "#ff6961",
    "errorExtra": "#e84a5f",
    "colorfulError": "#ff6961",
    "colorfulErrorExtra": "#e84a5f"
  },
  "peaches": {
    "bg": "#e0d7c1",
    "caret": "#c34b2a",
    "main": "#c34b2a",
    "sub": "#8d4b1e",
    "subAlt": "#e2caaf",
    "text": "#5f4c41",
    "error": "#ff6961",
    "errorExtra": "#c23b22",
    "colorfulError": "#ff6961",
    "colorfulErrorExtra": "#c23b22"
  },
  "phantom": {
    "bg": "#001",
    "caret": "#bb9af7",
    "main": "#7aa2f7",
    "sub": "#8089b0",
    "subAlt": "#24283b",
    "text": "#c0caf5",
    "error": "#f7768e",
    "errorExtra": "#db4b4b",
    "colorfulError": "#ff7a93",
    "colorfulErrorExtra": "#ff9e64"
  },
  "pink_lemonade": {
    "bg": "#f6d992",
    "caret": "#fcfcf8",
    "main": "#df3112",
    "sub": "#a73c0e",
    "subAlt": "#f6cc93",
    "text": "#5d5d28",
    "error": "#ff6f69",
    "errorExtra": "#ff6f69",
    "colorfulError": "#ff6f69",
    "colorfulErrorExtra": "#ff6f69"
  },
  "pulse": {
    "bg": "#181818",
    "caret": "#17b8bd",
    "main": "#17b8bd",
    "sub": "#787c82",
    "subAlt": "#121212",
    "text": "#e5f4f4",
    "error": "#da3333",
    "errorExtra": "#791717",
    "colorfulError": "#da3333",
    "colorfulErrorExtra": "#791717"
  },
  "purpleish": {
    "bg": "#1e1e32",
    "caret": "#7a52cc",
    "main": "#7a52cc",
    "sub": "#7d7db1",
    "subAlt": "#181829",
    "text": "#a3a3cc",
    "error": "#ff6666",
    "errorExtra": "#ff6666",
    "colorfulError": "#ff6666",
    "colorfulErrorExtra": "#ff6666"
  },
  "rainbow_trail": {
    "bg": "#f5f5f5",
    "caret": "#0d0d0d",
    "main": "#363636",
    "sub": "#4f4f4f",
    "subAlt": "#e0e0e0",
    "text": "#1f1f1f",
    "error": "#ff0008",
    "errorExtra": "#ff0008",
    "colorfulError": "#ff0008",
    "colorfulErrorExtra": "#ff0008"
  },
  "red_dragon": {
    "bg": "#1a0b0c",
    "caret": "#ff3a32",
    "main": "#ff3a32",
    "sub": "#e2a528",
    "subAlt": "#0e0506",
    "text": "#777c7d",
    "error": "#771b1f",
    "errorExtra": "#591317",
    "colorfulError": "#771b1f",
    "colorfulErrorExtra": "#591317"
  },
  "red_samurai": {
    "bg": "#84202c",
    "caret": "#c79e6e",
    "main": "#c79e6e",
    "sub": "#e898a2",
    "subAlt": "#751d26",
    "text": "#e2dad0",
    "error": "#33bbda",
    "errorExtra": "#176b79",
    "colorfulError": "#33bbda",
    "colorfulErrorExtra": "#176779"
  },
  "repose_dark": {
    "bg": "#2f3338",
    "caret": "#d6d2bc",
    "main": "#d6d2bc",
    "sub": "#a1a098",
    "subAlt": "#3a3c3d",
    "text": "#d6d2bc",
    "error": "#ff4a59",
    "errorExtra": "#c43c53",
    "colorfulError": "#ff4a59",
    "colorfulErrorExtra": "#c43c53"
  },
  "repose_light": {
    "bg": "#efead0",
    "caret": "#5f605e",
    "main": "#5f605e",
    "sub": "#63625a",
    "subAlt": "#dbd6c4",
    "text": "#333538",
    "error": "#c43c53",
    "errorExtra": "#a52632",
    "colorfulError": "#c43c53",
    "colorfulErrorExtra": "#a52632"
  },
  "retro": {
    "bg": "#dad3c1",
    "caret": "#1d1b17",
    "main": "#1d1b17",
    "sub": "#58544b",
    "subAlt": "#c8c3b3",
    "text": "#1d1b17",
    "error": "#bf616a",
    "errorExtra": "#793e44",
    "colorfulError": "#bf616a",
    "colorfulErrorExtra": "#793e44"
  },
  "retrocast": {
    "bg": "#07737a",
    "caret": "#88dbdf",
    "main": "#88dbdf",
    "sub": "#fbf5bd",
    "subAlt": "#1d8086",
    "text": "#ffffff",
    "error": "#ff585d",
    "errorExtra": "#c04455",
    "colorfulError": "#ff585d",
    "colorfulErrorExtra": "#c04455"
  },
  "rgb": {
    "bg": "#111",
    "caret": "#eee",
    "main": "#eee",
    "sub": "#7d7d7d",
    "subAlt": "#1a1a1a",
    "text": "#eee",
    "error": "#eee",
    "errorExtra": "#b3b3b3",
    "colorfulError": "#eee",
    "colorfulErrorExtra": "#b3b3b3"
  },
  "rose_pine": {
    "bg": "#1f1d27",
    "caret": "#f6c177",
    "main": "#9ccfd8",
    "sub": "#c4a7e7",
    "subAlt": "#282533",
    "text": "#e0def4",
    "error": "#eb6f92",
    "errorExtra": "#ebbcba",
    "colorfulError": "#eb6f92",
    "colorfulErrorExtra": "#ebbcba"
  },
  "rose_pine_dawn": {
    "bg": "#fffaf3",
    "caret": "#ea9d34",
    "main": "#56949f",
    "sub": "#894fcf",
    "subAlt": "#f0e9df",
    "text": "#286983",
    "error": "#b4637a",
    "errorExtra": "#d7827e",
    "colorfulError": "#b4637a",
    "colorfulErrorExtra": "#d7827e"
  },
  "rose_pine_moon": {
    "bg": "#2a273f",
    "caret": "#f6c177",
    "main": "#9ccfd8",
    "sub": "#c4a7e7",
    "subAlt": "#211f32",
    "text": "#e0def4",
    "error": "#eb6f92",
    "errorExtra": "#ebbcba",
    "colorfulError": "#eb6f92",
    "colorfulErrorExtra": "#ebbcba"
  },
  "rudy": {
    "bg": "#1a2b3e",
    "caret": "#af8f5c",
    "main": "#af8f5c",
    "sub": "#708eb2",
    "subAlt": "#152231",
    "text": "#c9c8bf",
    "error": "#bf616a",
    "errorExtra": "#793e44",
    "colorfulError": "#bf616a",
    "colorfulErrorExtra": "#793e44"
  },
  "ryujinscales": {
    "bg": "#081426",
    "caret": "#ef6d49",
    "main": "#f17754",
    "sub": "#ffbc90",
    "subAlt": "#040e1d",
    "text": "#ffe4bc",
    "error": "#ca4754",
    "errorExtra": "#7e2a33",
    "colorfulError": "#ca4754",
    "colorfulErrorExtra": "#7e2a33"
  },
  "serika": {
    "bg": "#e1e1e3",
    "caret": "#8e730d",
    "main": "#8e730d",
    "sub": "#5b6066",
    "subAlt": "#d1d3d8",
    "text": "#323437",
    "error": "#da3333",
    "errorExtra": "#791717",
    "colorfulError": "#da3333",
    "colorfulErrorExtra": "#791717"
  },
  "serika_dark": {
    "bg": "#323437",
    "caret": "#e2b714",
    "main": "#e2b714",
    "sub": "#949699",
    "subAlt": "#2c2e31",
    "text": "#d1d0c5",
    "error": "#ca4754",
    "errorExtra": "#7e2a33",
    "colorfulError": "#ca4754",
    "colorfulErrorExtra": "#7e2a33"
  },
  "sewing_tin": {
    "bg": "#241963",
    "caret": "#fbdb8c",
    "main": "#f2ce83",
    "sub": "#7893e1",
    "subAlt": "#2a277a",
    "text": "#ffffff",
    "error": "#c6915e",
    "errorExtra": "#c6915e",
    "colorfulError": "#c6915e",
    "colorfulErrorExtra": "#c6915e"
  },
  "sewing_tin_light": {
    "bg": "#ffffff",
    "caret": "#fbdb8c",
    "main": "#2d2076",
    "sub": "#3155ba",
    "subAlt": "#c8cedf",
    "text": "#2d2076",
    "error": "#f2ce83",
    "errorExtra": "#f2ce83",
    "colorfulError": "#f2ce83",
    "colorfulErrorExtra": "#f2ce83"
  },
  "shadow": {
    "bg": "#000",
    "caret": "#eee",
    "main": "#eee",
    "sub": "#7b7b7b",
    "subAlt": "#171717",
    "text": "#eee",
    "error": "#fff",
    "errorExtra": "#d8d8d8",
    "colorfulError": "#fff",
    "colorfulErrorExtra": "#d8d8d8"
  },
  "shoko": {
    "bg": "#ced7e0",
    "caret": "#287693",
    "main": "#287693",
    "sub": "#3e5b6e",
    "subAlt": "#b7cada",
    "text": "#3b4c58",
    "error": "#bf616a",
    "errorExtra": "#793e44",
    "colorfulError": "#bf616a",
    "colorfulErrorExtra": "#793e44"
  },
  "slambook": {
    "bg": "#fffdde",
    "caret": "#367e18",
    "main": "#03001c",
    "sub": "#17698c",
    "subAlt": "#c6dce4",
    "text": "#13005a",
    "error": "#f900bf",
    "errorExtra": "#ce1212",
    "colorfulError": "#ce1212",
    "colorfulErrorExtra": "#3ec70b"
  },
  "snes": {
    "bg": "#bfbec2",
    "caret": "#523793",
    "main": "#553d94",
    "sub": "#523796",
    "subAlt": "#b5b0c2",
    "text": "#2e2e2e",
    "error": "#ca4754",
    "errorExtra": "#7e2a33",
    "colorfulError": "#ca4754",
    "colorfulErrorExtra": "#7e2a33"
  },
  "soaring_skies": {
    "bg": "#fff9f2",
    "caret": "#1e107a",
    "main": "#1087b3",
    "sub": "#1e107a",
    "subAlt": "#e5ddd4",
    "text": "#1d1e1e",
    "error": "#fb5745",
    "errorExtra": "#b03c30",
    "colorfulError": "#fb5745",
    "colorfulErrorExtra": "#b03c30"
  },
  "solarized_dark": {
    "bg": "#002b36",
    "caret": "#dc322f",
    "main": "#859900",
    "sub": "#2aa198",
    "subAlt": "#00222b",
    "text": "#3094da",
    "error": "#d33682",
    "errorExtra": "#9b225c",
    "colorfulError": "#d33682",
    "colorfulErrorExtra": "#9b225c"
  },
  "solarized_light": {
    "bg": "#fdf6e3",
    "caret": "#dc322f",
    "main": "#718200",
    "sub": "#1d6e68",
    "subAlt": "#e2d8be",
    "text": "#181819",
    "error": "#d33682",
    "errorExtra": "#9b225c",
    "colorfulError": "#d33682",
    "colorfulErrorExtra": "#9b225c"
  },
  "solarized_osaka": {
    "bg": "#00141a",
    "caret": "#b58900",
    "main": "#859900",
    "sub": "#2aa198",
    "subAlt": "#00222b",
    "text": "#eee8d5",
    "error": "#dc322f",
    "errorExtra": "#9b225c",
    "colorfulError": "#d33682",
    "colorfulErrorExtra": "#9b225c"
  },
  "sonokai": {
    "bg": "#2c2e34",
    "caret": "#f38c71",
    "main": "#9ed072",
    "sub": "#e7c664",
    "subAlt": "#232429",
    "text": "#e2e2e3",
    "error": "#fc5d7c",
    "errorExtra": "#ecac6a",
    "colorfulError": "#fc5d7c",
    "colorfulErrorExtra": "#ecac6a"
  },
  "spiderman": {
    "bg": "#0d1219",
    "caret": "#e23636",
    "main": "#e23636",
    "sub": "#047afa",
    "subAlt": "#0b1c2e",
    "text": "#f0f0f0",
    "error": "#0476f2",
    "errorExtra": "#0353a8",
    "colorfulError": "#0476f2",
    "colorfulErrorExtra": "#0353a8"
  },
  "stealth": {
    "bg": "#010203",
    "caret": "#e25303",
    "main": "#596269",
    "sub": "#6e7981",
    "subAlt": "#121212",
    "text": "#737f87",
    "error": "#e25303",
    "errorExtra": "#73280c",
    "colorfulError": "#e25303",
    "colorfulErrorExtra": "#73280c"
  },
  "strawberry": {
    "bg": "#f37f83",
    "caret": "#4b4b20",
    "main": "#4b4b20",
    "sub": "#6a0e1d",
    "subAlt": "#ef6e77",
    "text": "#303015",
    "error": "#fcd23f",
    "errorExtra": "#d7ae1e",
    "colorfulError": "#fcd23f",
    "colorfulErrorExtra": "#d7ae1e"
  },
  "striker": {
    "bg": "#124883",
    "caret": "#d7dcda",
    "main": "#d7dcda",
    "sub": "#84b3e7",
    "subAlt": "#104176",
    "text": "#d6dbd9",
    "error": "#fb4934",
    "errorExtra": "#cc241d",
    "colorfulError": "#fb4934",
    "colorfulErrorExtra": "#cc241d"
  },
  "suisei": {
    "bg": "#3b4a62",
    "caret": "#bef0ff",
    "main": "#bef0ff",
    "sub": "#fe9944",
    "subAlt": "#313e55",
    "text": "#dbdeeb",
    "error": "#ed2939",
    "errorExtra": "#ce122c",
    "colorfulError": "#ed2939",
    "colorfulErrorExtra": "#ce122c"
  },
  "sunset": {
    "bg": "#211e24",
    "caret": "#ffca99",
    "main": "#f79777",
    "sub": "#817daf",
    "subAlt": "#161319",
    "text": "#f4e0c9",
    "error": "#66a1ff",
    "errorExtra": "#376ca4",
    "colorfulError": "#66a1ff",
    "colorfulErrorExtra": "#376ca4"
  },
  "superuser": {
    "bg": "#262a33",
    "caret": "#43ffaf",
    "main": "#43ffaf",
    "sub": "#778fa1",
    "subAlt": "#1f232c",
    "text": "#e5f7ef",
    "error": "#ff5f5f",
    "errorExtra": "#d22a2a",
    "colorfulError": "#ff5f5f",
    "colorfulErrorExtra": "#d22a2a"
  },
  "sweden": {
    "bg": "#0058a3",
    "caret": "#b5b5b5",
    "main": "#ffcc02",
    "sub": "#9cceea",
    "subAlt": "#024f8e",
    "text": "#ffffff",
    "error": "#e74040",
    "errorExtra": "#a22f2f",
    "colorfulError": "#f56674",
    "colorfulErrorExtra": "#e33546"
  },
  "tangerine": {
    "bg": "#ffede0",
    "caret": "#5d8500",
    "main": "#dc4901",
    "sub": "#b63b00",
    "subAlt": "#fdd3bf",
    "text": "#3d1705",
    "error": "#7fb500",
    "errorExtra": "#5f8700",
    "colorfulError": "#7fb500",
    "colorfulErrorExtra": "#5f8700"
  },
  "taro": {
    "bg": "#b3baff",
    "caret": "#00e9e5",
    "main": "#130f1a",
    "sub": "#434258",
    "subAlt": "#a3a7df",
    "text": "#130f1a",
    "error": "#ffe23e",
    "errorExtra": "#fff1c3",
    "colorfulError": "#ffe23e",
    "colorfulErrorExtra": "#fff1c3"
  },
  "terminal": {
    "bg": "#191a1b",
    "caret": "#79a617",
    "main": "#79a617",
    "sub": "#7b7d80",
    "subAlt": "#141516",
    "text": "#e7eae0",
    "error": "#a61717",
    "errorExtra": "#731010",
    "colorfulError": "#a61717",
    "colorfulErrorExtra": "#731010"
  },
  "terra": {
    "bg": "#0c100e",
    "caret": "#89c559",
    "main": "#89c559",
    "sub": "#60893b",
    "subAlt": "#0f1d18",
    "text": "#f0edd1",
    "error": "#d3ca78",
    "errorExtra": "#89844d",
    "colorfulError": "#d3ca78",
    "colorfulErrorExtra": "#89844d"
  },
  "terrazzo": {
    "bg": "#f1e5da",
    "caret": "#c95423",
    "main": "#c95423",
    "sub": "#4b6667",
    "subAlt": "#e3d3c6",
    "text": "#023e3b",
    "error": "#a01034",
    "errorExtra": "#a01034",
    "colorfulError": "#a01034",
    "colorfulErrorExtra": "#a01034"
  },
  "terror_below": {
    "bg": "#0b1e1a",
    "caret": "#66ac92",
    "main": "#66ac92",
    "sub": "#028e81",
    "subAlt": "#041715",
    "text": "#dceae5",
    "error": "#bf616a",
    "errorExtra": "#793e44",
    "colorfulError": "#bf616a",
    "colorfulErrorExtra": "#793e44"
  },
  "tiramisu": {
    "bg": "#cfc6b9",
    "caret": "#7d5448",
    "main": "#87603b",
    "sub": "#6a4c2e",
    "subAlt": "#d0bca7",
    "text": "#68463c",
    "error": "#e9632d",
    "errorExtra": "#e9632d",
    "colorfulError": "#e9632d",
    "colorfulErrorExtra": "#e9632d"
  },
  "trackday": {
    "bg": "#464d66",
    "caret": "#475782",
    "main": "#e87d6e",
    "sub": "#a7b9d9",
    "subAlt": "#3d4359",
    "text": "#cfcfcf",
    "error": "#e44e4e",
    "errorExtra": "#fd3f3f",
    "colorfulError": "#ff2e2e",
    "colorfulErrorExtra": "#bb2525"
  },
  "trance": {
    "bg": "#00021b",
    "caret": "#e51376",
    "main": "#e51376",
    "sub": "#7386ba",
    "subAlt": "#18214c",
    "text": "#fff",
    "error": "#02d3b0",
    "errorExtra": "#3f887c",
    "colorfulError": "#02d3b0",
    "colorfulErrorExtra": "#3f887c"
  },
  "tron_orange": {
    "bg": "#0d1c1c",
    "caret": "#f0e800",
    "main": "#f0e800",
    "sub": "#ff6600",
    "subAlt": "#15211f",
    "text": "#ffffff",
    "error": "#ff0000",
    "errorExtra": "#ff0000",
    "colorfulError": "#ff0000",
    "colorfulErrorExtra": "#ff0000"
  },
  "vaporwave": {
    "bg": "#a4a7ea",
    "caret": "#28cafe",
    "main": "#8e1a85",
    "sub": "#37395b",
    "subAlt": "#989bd9",
    "text": "#453045",
    "error": "#573ca9",
    "errorExtra": "#3d2b77",
    "colorfulError": "#28cafe",
    "colorfulErrorExtra": "#25a9ce"
  },
  "vesper": {
    "bg": "#101010",
    "caret": "#99ffe4",
    "main": "#ffc799",
    "sub": "#a0a0a0",
    "subAlt": "#1c1c1c",
    "text": "#ffffff",
    "error": "#ff8080",
    "errorExtra": "#b25959",
    "colorfulError": "#ff8080",
    "colorfulErrorExtra": "#b25959"
  },
  "vesper_light": {
    "bg": "#ffffff",
    "caret": "#067a6e",
    "main": "#fb7100",
    "sub": "#787878",
    "subAlt": "#fff8f4",
    "text": "#000000",
    "error": "#ed2839",
    "errorExtra": "#ff6c72",
    "colorfulError": "#ed2839",
    "colorfulErrorExtra": "#ff6c72"
  },
  "viridescent": {
    "bg": "#2c3333",
    "caret": "#f0d3c9",
    "main": "#95d5b2",
    "sub": "#84a98c",
    "subAlt": "#232828",
    "text": "#e9f5db",
    "error": "#ff4646",
    "errorExtra": "#ab2f2f",
    "colorfulError": "#bd4141",
    "colorfulErrorExtra": "#883434"
  },
  "voc": {
    "bg": "#190618",
    "caret": "#e0caac",
    "main": "#e0caac",
    "sub": "#bc54b3",
    "subAlt": "#2c0c28",
    "text": "#eeeae4",
    "error": "#af3735",
    "errorExtra": "#7e2a29",
    "colorfulError": "#af3735",
    "colorfulErrorExtra": "#7e2a29"
  },
  "vscode": {
    "bg": "#1e1e1e",
    "caret": "#569cd6",
    "main": "#007acc",
    "sub": "#808080",
    "subAlt": "#191919",
    "text": "#d4d4d4",
    "error": "#f44747",
    "errorExtra": "#f44747",
    "colorfulError": "#f44747",
    "colorfulErrorExtra": "#f44747"
  },
  "watermelon": {
    "bg": "#1f4437",
    "caret": "#d6686f",
    "main": "#d6686f",
    "sub": "#76baa2",
    "subAlt": "#244d3f",
    "text": "#cdc6bc",
    "error": "#c82931",
    "errorExtra": "#ac1823",
    "colorfulError": "#c82931",
    "colorfulErrorExtra": "#ac1823"
  },
  "wavez": {
    "bg": "#1c292f",
    "caret": "#6bde3b",
    "main": "#6bde3b",
    "sub": "#349db2",
    "subAlt": "#1b3238",
    "text": "#e9efe6",
    "error": "#ca4754",
    "errorExtra": "#7e2a33",
    "colorfulError": "#ca4754",
    "colorfulErrorExtra": "#7e2a33"
  },
  "witch_girl": {
    "bg": "#f3dbda",
    "caret": "#afc5bd",
    "main": "#56786a",
    "sub": "#8c4b36",
    "subAlt": "#e7c8be",
    "text": "#435d52",
    "error": "#b29a91",
    "errorExtra": "#b29a91",
    "colorfulError": "#b29a91",
    "colorfulErrorExtra": "#b29a91"
  }
};
export function isColorDark(color: string): boolean {
  if (!color || typeof color !== "string") return true;
  let clean = color.replace("#", "").trim();
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  } else if (clean.length === 4) {
    clean = clean.substring(0, 3).split("").map((c) => c + c).join("");
  } else if (clean.length >= 8) {
    clean = clean.substring(0, 6);
  }
  if (clean.length !== 6) return true;
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return true;
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

// ponytail: derive list dynamically instead of duplicating 2,850 lines of theme objects
export const THEME_LIST: ThemeMeta[] = Object.entries(THEMES).map(([id, t]) => ({
  id,
  name: themeDisplayName(id),
  isDark: isColorDark(t.bg),
  ...t,
}));

export const POPULAR_THEMES: string[] = [
  "serika_dark",
  "carbon",
  "nord",
  "dracula",
  "gruvbox_dark",
  "catppuccin",
  "monokai",
  "matrix",
  "botanical",
  "milkshake",
  "8008",
  "solarized_dark",
  "retro",
  "taro",
  "modern_ink",
  "bingsu",
  "cafe",
  "arch",
  "moonlight",
  "shadow",
  "laser",
  "alduin",
];

export type ThemeFilterTab = "popular" | "all" | "dark" | "light";

/** Single source of truth for theme filtering, shared by the dropdown, the grid modal, and tests. */
export function filterThemes(query: string, tab: ThemeFilterTab): ThemeMeta[] {
  // When searching, search across all themes regardless of selected tab
  if (query.trim()) {
    const q = query.toLowerCase().trim();
    return THEME_LIST.filter((t) => t.name.toLowerCase().includes(q) || t.id.toLowerCase().includes(q));
  }
  if (tab === "popular") return THEME_LIST.filter((t) => POPULAR_THEMES.includes(t.id));
  if (tab === "dark") return THEME_LIST.filter((t) => t.isDark);
  if (tab === "light") return THEME_LIST.filter((t) => !t.isDark);
  return THEME_LIST;
}


export function applyTheme(themeId: string): void {
  if (typeof document === "undefined" || !document?.documentElement?.style) return;
  const resolvedId = THEMES[themeId] ? themeId : DEFAULT_THEME;
  const theme = THEMES[resolvedId];
  if (!theme) return;

  const root = document.documentElement;
  if (typeof root.setAttribute === "function") {
    root.setAttribute("data-theme", resolvedId);
  }
  if (root.style && typeof root.style.setProperty === "function") {
    root.style.setProperty("--bg-color", theme.bg);
    root.style.setProperty("--main-color", theme.main);
    root.style.setProperty("--caret-color", theme.caret);
    root.style.setProperty("--sub-color", theme.sub);
    root.style.setProperty("--sub-alt-color", theme.subAlt);
    root.style.setProperty("--text-color", theme.text);
    root.style.setProperty("--error-color", theme.error);
    root.style.setProperty("--error-extra-color", theme.errorExtra);
    root.style.setProperty("--colorful-error-color", theme.colorfulError || theme.error);
    root.style.setProperty("--colorful-error-extra-color", theme.colorfulErrorExtra || theme.errorExtra);
  }

  // Set color-scheme and dark/light class
  const isDark = isColorDark(theme.bg);

  if (root.classList) {
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
      if (root.style) root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      if (root.style) root.style.colorScheme = "light";
    }
  }

  // Persist the resolved palette so the blocking head script can restore it before
  // first paint on the next hard load (otherwise a non-default theme flashes Alduin).
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(
        THEME_VARS_CACHE_KEY,
        JSON.stringify({
          id: resolvedId,
          vars: {
            "--bg-color": theme.bg,
            "--main-color": theme.main,
            "--caret-color": theme.caret,
            "--sub-color": theme.sub,
            "--sub-alt-color": theme.subAlt,
            "--text-color": theme.text,
            "--error-color": theme.error,
            "--error-extra-color": theme.errorExtra,
            "--colorful-error-color": theme.colorfulError || theme.error,
            "--colorful-error-extra-color": theme.colorfulErrorExtra || theme.errorExtra,
          },
          scheme: isDark ? "dark" : "light",
        })
      );
    } catch {}
  }
}
