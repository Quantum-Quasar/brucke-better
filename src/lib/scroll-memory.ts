"use client";

// Remember the window scroll position per tab path for the life of the tab.
// In-page overlays keep their parent tab mounted; route switches do not, so
// this is what makes "back to atlas" land where you left off.

import { useEffect } from "react";

const SCROLL_KEY = "brucke_scroll_state_v1";
const visited = new Set<string>();
let pendingCapture: { pathname: string; y: number; at: number } | null = null;

function readAll(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(SCROLL_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return {};
    const result: Record<string, number> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (key.length > 0 && key.length <= 200 && typeof value === "number" && Number.isFinite(value) && value >= 0) {
        result[key] = value;
      }
    }
    return result;
  } catch {
    return {};
  }
}

function save(pathname: string, y: number): void {
  if (typeof window === "undefined") return;
  const all = readAll();
  all[pathname] = Math.max(0, Math.round(y));
  try {
    sessionStorage.setItem(SCROLL_KEY, JSON.stringify(all));
  } catch {
    // ignore blocked/full storage
  }
}

/** Save the current window position before a route change starts. */
export function captureScroll(pathname: string): void {
  if (typeof window === "undefined") return;
  const y = Math.max(0, Math.round(window.scrollY));
  pendingCapture = { pathname, y, at: Date.now() };
  save(pathname, y);
}

export function useScrollMemory(pathname: string): void {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastY = window.scrollY;
    let frame = 0;
    let restoreFrame1 = 0;
    let restoreFrame2 = 0;
    let restoreTimer = 0;

    if (visited.has(pathname)) {
      const target = readAll()[pathname];
      if (typeof target === "number" && target > 0) {
        const restore = () => window.scrollTo({ top: target, behavior: "auto" });
        restoreFrame1 = requestAnimationFrame(() => {
          restoreFrame2 = requestAnimationFrame(restore);
        });
        // Data-heavy tabs (review, atlas) can grow after the first paint.
        restoreTimer = window.setTimeout(restore, 250);
      }
    }
    visited.add(pathname);

    const onScroll = () => {
      lastY = window.scrollY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        save(pathname, lastY);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (restoreFrame1) cancelAnimationFrame(restoreFrame1);
      if (restoreFrame2) cancelAnimationFrame(restoreFrame2);
      if (restoreTimer) window.clearTimeout(restoreTimer);
      window.removeEventListener("scroll", onScroll);
      // The router may have already scrolled to top while committing the next
      // route. Prefer the position captured by the navigation click; otherwise
      // never overwrite a real position with a reset event.
      const captured =
        pendingCapture &&
        pendingCapture.pathname === pathname &&
        Date.now() - pendingCapture.at < 2000
          ? pendingCapture.y
          : null;
      if (captured !== null) {
        save(pathname, captured);
        pendingCapture = null;
      } else if (lastY > 0) {
        save(pathname, lastY);
      }
    };
  }, [pathname]);
}
