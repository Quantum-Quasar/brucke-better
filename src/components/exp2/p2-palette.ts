"use client";

import { useSyncExternalStore } from "react";
import { readStorageString, writeStorageString } from "@/lib/safe-storage";

/**
 * /exp-ui2 has its own house palette ("Brücke": town-sign yellow on stone).
 * Learners can switch to any of the app's themes instead. The choice is
 * stored for this interface only and mirrored on <html data-p2-palette>,
 * which an inline script in the layout sets before first paint.
 */
export type P2Palette = "brucke" | "app";
export const P2_PALETTE_KEY = "brucke_exp2_palette";
const EVENT = "p2-palette-change";

export const P2_HOUSE_THEME = {
  name: "Brücke",
  bg: "#e9ebe5",
  main: "#ffc400",
  text: "#141613",
  sub: "#575c55",
} as const;

function read(): P2Palette {
  return readStorageString(P2_PALETTE_KEY) === "app" ? "app" : "brucke";
}

export function setP2Palette(value: P2Palette): void {
  writeStorageString(P2_PALETTE_KEY, value);
  document.documentElement.setAttribute("data-p2-palette", value);
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useP2Palette(): P2Palette {
  return useSyncExternalStore(subscribe, read, () => "brucke");
}

/** Runs before paint (inlined in the layout) so the right palette shows at once. */
export const P2_PALETTE_BOOT = `try{document.documentElement.setAttribute('data-p2-palette',localStorage.getItem('${P2_PALETTE_KEY}')==='app'?'app':'brucke')}catch(e){}`;
