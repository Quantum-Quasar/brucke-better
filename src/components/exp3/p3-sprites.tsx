import React from "react";

/**
 * Pixel sprites for the map. Each sprite is a grid of characters; every
 * character is a colour role (a CSS class, so the house palette and every
 * app theme can recolour the whole world). "." is transparent.
 */
export interface SpriteArt {
  rows: string[];
}

const ROLE: Record<string, string> = {
  g: "s-leaf",
  d: "s-leaf-dk",
  l: "s-leaf-lt",
  t: "s-trunk",
  s: "s-stone",
  S: "s-stone-dk",
  w: "s-snow",
  y: "s-lamp",
  r: "s-roof",
  b: "s-wall",
  h: "s-timber",
  o: "s-fish",
  j: "s-jelly",
  J: "s-jelly-dk",
  f: "s-flower",
  F: "s-flower-2",
  k: "s-ink",
  a: "s-accent",
  p: "s-cursor",
  m: "s-mount",
  M: "s-mount-dk",
  u: "s-water",
  U: "s-water-lt",
};

function art(rows: string[]): SpriteArt {
  return { rows };
}

/** One merged rect per horizontal run, so a 16×16 sprite stays a handful of nodes. */
export function Sprite({ art: sprite, scale = 4, className, style }: { art: SpriteArt; scale?: number; className?: string; style?: React.CSSProperties }) {
  const h = sprite.rows.length;
  const w = Math.max(...sprite.rows.map((r) => r.length));
  const rects: React.ReactNode[] = [];
  sprite.rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      if (ch === "." || ch === " ") {
        x += 1;
        continue;
      }
      let end = x + 1;
      while (end < row.length && row[end] === ch) end += 1;
      rects.push(<rect key={`${y}-${x}`} x={x} y={y} width={end - x} height={1} className={ROLE[ch] ?? "s-ink"} />);
      x = end;
    }
  });
  return (
    <svg
      className={`q-sprite ${className ?? ""}`}
      viewBox={`0 0 ${w} ${h}`}
      width={w * scale}
      height={h * scale}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      style={style}
    >
      {rects}
    </svg>
  );
}

/* ------------------------------------------------------------ the world */

export const ART = {
  grass: art([
    ".l...l.",
    ".g.l.g.",
    "gd.g.dg",
    ".dgdgd.",
  ]),
  flower: art([
    ".f.",
    "fFf",
    ".f.",
    ".g.",
    "gg.",
    ".g.",
  ]),
  flowers: art([
    ".F......f.",
    "FyF....fyf",
    ".F..f...f.",
    ".g.fyf..g.",
    ".gg.f..gg.",
    "..g.g..g..",
  ]),
  stone: art([
    "..sss.",
    ".sssSs",
    "sssSSS",
  ]),
  pine: art([
    "....l....",
    "...lgg...",
    "..lgggd..",
    "...ggd...",
    "..lggdd..",
    ".lgggddd.",
    "...ggd...",
    "..lgggdd.",
    ".lggggddd",
    "lgggggdddd",
    "....tt....",
    "....tt....",
  ]),
  bush: art([
    "..lgg..",
    ".lgggd.",
    "lggggdd",
    ".gdddd.",
  ]),
  mushroom: art([
    ".rrr.",
    "rbrbr",
    "..b..",
    "..b..",
  ]),
  seaweed: art([
    ".gg..",
    "gg...",
    "g....",
    "gg...",
    ".gg..",
    "..gg.",
    "...g.",
    "..gg.",
    ".gg..",
    "gg...",
    "g....",
    "gg...",
  ]),
  jelly: art([
    "..jjjjj..",
    ".jjjjjjj.",
    "jjJjjjJjj",
    "jjjjjjjjj",
    "j.J.j.J.j",
    "j.j.J.j.j",
    ".j.j.j.j.",
    ".j.J.j.J.",
    "j.j.j.j..",
  ]),
  fish: art([
    "..ooo..o",
    ".ooooooo",
    "ooko.oo.",
    ".ooooooo",
    "..ooo..o",
  ]),
  bubble: art([
    ".U.",
    "U.U",
    ".U.",
  ]),
  column: art([
    "sssssss",
    ".SSSSS.",
    ".s.s.s.",
    ".s.s.s.",
    ".s.s.s.",
    ".s.s.s.",
    ".s.s.s.",
    ".s.s.s.",
    ".SSSSS.",
    "sssssss",
  ]),
  ruin: art([
    "s.....s..........",
    "s.s...s.ss...s...",
    "sSsss.sSssss.sS.s",
    "ssSSsssssSsssssss",
  ]),
  house: art([
    "....rr.....",
    "...rrrr....",
    "..rrrrrr...",
    ".rrrrrrrr..",
    "rrrrrrrrrr.",
    ".hbhhbhhbh.",
    ".hyhbhbyh..",
    ".hhhbhhhh..",
    ".hbhhthbh..",
    ".hhhhthhh..",
  ]),
  houses: art([
    "...rr.......rr.....",
    "..rrrr.....rrrr....",
    ".rrrrrr...rrrrrr...",
    "rrrrrrrr.rrrrrrrr..",
    "hbhbhbhh.hbhhbhhbh.",
    "hyhbhyhh.hyhbhbhyh.",
    "hhhbhhhh.hhhhbhhhh.",
    "hbhhthbh.hbhhtthbh.",
    "hhhhthhh.hhhhtthhh.",
  ]),
  lamp: art([
    "yyy",
    "yay",
    "yyy",
    ".h.",
    ".h.",
    ".h.",
    ".h.",
    ".h.",
    "hhh",
  ]),
  peak: art([
    ".......w.......",
    "......www......",
    ".....wwMww.....",
    "....mmwmMMm....",
    "...mmmmmmMMm...",
    "..mmmmmmMMMMm..",
    ".mmmmmmmMMMMMm.",
    "mmmmmmmMMMMMMMm",
  ]),
  hill: art([
    "....ww.....",
    "...wmMm....",
    "..mmmMMm...",
    ".mmmmMMMm..",
    "mmmmmMMMMm.",
  ]),
  star: art([
    "..y..",
    ".yyy.",
    "yyyyy",
    ".yyy.",
    ".y.y.",
  ]),
  twinkle: art(["y"]),
  wave: art([
    ".UU....UU....",
    "U..U..U..U..U",
  ]),
  reed: art([
    "t.....t",
    "t..t..g",
    "g..t.g.",
    ".g.g.g.",
    ".ggggg.",
  ]),
  bird: art([
    "k...k",
    ".k.k.",
  ]),
  lock: art([
    "..kkk..",
    ".k...k.",
    ".k...k.",
    "kkkkkkk",
    "kkk.kkk",
    "kkk.kkk",
    "kkkkkkk",
  ]),
  open: art([
    "..kkk..",
    ".k...k.",
    ".k.....",
    "kkkkkkk",
    "kkk.kkk",
    "kkk.kkk",
    "kkkkkkk",
  ]),
  book: art([
    ".kk...kk.",
    "k..k.k..k",
    "k..k.k..k",
    "k..k.k..k",
    ".kkkkkkk.",
  ]),
  check: art([
    "......k",
    ".....kk",
    "k...kk.",
    "kk.kk..",
    ".kkk...",
    "..k....",
  ]),
  arrow: art([
    "ppppppp",
    ".ppppp.",
    "..ppp..",
    "...p...",
  ]),
  mark: art([
    "..kkkkkk..",
    ".kkkkkkkk.",
    "kkk....kkk",
    "kk......kk",
    "kk......kk",
    "kk......kk",
  ]),
} satisfies Record<string, SpriteArt>;

/** The goal at the top of the map: a stone bridge over the river. */
export const BRIDGE: SpriteArt = (() => {
  const w = 49;
  const h = 15;
  const deck = 4;
  const arches = [
    { cx: 8.5, r: 5.5 },
    { cx: 24, r: 7.5 },
    { cx: 39.5, r: 5.5 },
  ];
  const rows: string[] = [];
  for (let y = 0; y < h; y += 1) {
    let row = "";
    for (let x = 0; x < w; x += 1) {
      if (y === 0) row += x % 4 === 0 || x === w - 1 ? "s" : ".";
      else if (y === 1) row += "s";
      else if (y === 2) row += "S";
      else if (y < deck) row += "s";
      else {
        const dy = h - y;
        const hole = arches.some((a) => (x + 0.5 - a.cx) ** 2 + (dy * 1.05) ** 2 < a.r ** 2 * 1.35);
        if (hole) row += y >= h - 2 ? (Math.floor(x / 2) % 3 === 0 ? "U" : "u") : ".";
        else row += y % 3 === 0 && (x + (y % 6 === 0 ? 0 : 3)) % 6 === 0 ? "S" : "s";
      }
    }
    rows.push(row);
  }
  return { rows };
})();

/** Which scenery each part of the journey grows. */
export const BIOME_DECOR: Record<string, (keyof typeof ART)[]> = {
  heath: ["grass", "flower", "grass", "stone", "flowers", "bush"],
  forest: ["pine", "pine", "mushroom", "bush", "grass", "pine"],
  lake: ["seaweed", "jelly", "fish", "bubble", "seaweed", "column"],
  town: ["house", "lamp", "bush", "house", "lamp", "flower"],
  mountains: ["peak", "hill", "pine", "stone", "peak", "bird"],
  river: ["reed", "wave", "fish", "reed", "bush", "bird"],
};

/** Larger pieces for the wide margins beside the map on big screens. */
export const BIOME_BIG: Record<string, (keyof typeof ART)[]> = {
  heath: ["flowers", "bush", "stone", "grass"],
  forest: ["pine", "pine", "bush", "mushroom"],
  lake: ["ruin", "column", "jelly", "seaweed"],
  town: ["houses", "lamp", "house", "bush"],
  mountains: ["peak", "hill", "peak", "bird"],
  river: ["wave", "reed", "fish", "wave"],
};

/** Small seeded generator so the scenery is the same on every visit. */
export function seeded(seed: number) {
  let s = (seed * 2654435761) >>> 0;
  return () => {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}
