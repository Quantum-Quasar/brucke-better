"use client";

import { useSyncExternalStore } from "react";
import { readStorageString, writeStorageString } from "@/lib/safe-storage";

/**
 * /exp-ui3 has its own house palette ("Nacht": a lantern-lit map at night).
 * Learners can switch to any of the app's themes instead. The choice is
 * stored for this interface only and mirrored on <html data-p3-palette>,
 * which an inline script in the layout sets before first paint.
 */
export type P3Palette = "nacht" | "app";
export const P3_PALETTE_KEY = "brucke_exp3_palette";
const EVENT = "p3-palette-change";

export const P3_HOUSE_THEME = {
  name: "Nacht",
  bg: "#10141f",
  main: "#f2b53a",
  text: "#eef0e6",
  sub: "#8d95a8",
} as const;

function read(): P3Palette {
  return readStorageString(P3_PALETTE_KEY) === "app" ? "app" : "nacht";
}

export function setP3Palette(value: P3Palette): void {
  writeStorageString(P3_PALETTE_KEY, value);
  document.documentElement.setAttribute("data-p3-palette", value);
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

export function useP3Palette(): P3Palette {
  return useSyncExternalStore(subscribe, read, () => "nacht");
}

/** Runs before paint (inlined in the layout) so the right palette shows at once. */
export const P3_PALETTE_BOOT = `try{document.documentElement.setAttribute('data-p3-palette',localStorage.getItem('${P3_PALETTE_KEY}')==='app'?'app':'nacht')}catch(e){}`;
