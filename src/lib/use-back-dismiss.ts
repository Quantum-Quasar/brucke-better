"use client";

// Make the browser/Android Back gesture close an in-page overlay instead of
// leaving the site. Subviews deliberately do not change the URL, so without a
// sentinel history entry the system Back button has nothing to pop. Opening a
// dialog pushes a marker; Back pops it and closes the dialog; closing from the
// UI pops the same marker. Nested dialogs each own one entry.
//
// The push and the pop are deferred by a few milliseconds. React StrictMode
// runs effects twice in development: a synchronous push/back pair would fight
// the router and can drop the overlay. Deferring lets the second pass reuse the
// sentinel instead of popping the real history entry.

import { useEffect, useRef } from "react";

let nextOverlayId = 0;

interface OverlayHistoryState {
  bruckeOverlay?: string;
}

const PUSH_DELAY_MS = 32;
const POP_DELAY_MS = 64;

/**
 * The sentinel consumes a history position (Back moves past it, it is not
 * removed). Keep the desktop history guarantee intact: only touch devices,
 * where a system Back gesture exists, arm the sentinel. Desktops keep using
 * Escape and the visible close controls, exactly as before.
 */
function supportsBackGesture(): boolean {
  if (typeof window === "undefined") return false;
  if (navigator.maxTouchPoints > 0) return true;
  return typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches;
}

export function useBackDismiss(open: boolean, onClose: () => void): void {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const idRef = useRef<string>("");
  if (!idRef.current) idRef.current = `brucke-overlay-${++nextOverlayId}`;

  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const sentinelPushedRef = useRef(false);
  const sentinelPathRef = useRef("");

  useEffect(() => {
    if (!open || typeof window === "undefined" || !supportsBackGesture()) return;
    const id = idRef.current;

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }

    openTimerRef.current = window.setTimeout(() => {
      openTimerRef.current = null;
      const state = window.history.state as OverlayHistoryState | null;
      // StrictMode's second pass finds the first pass's sentinel already on
      // top and reuses it.
      if (state?.bruckeOverlay === id) {
        sentinelPushedRef.current = true;
        return;
      }
      sentinelPathRef.current = window.location.pathname + window.location.search;
      const currentState = (window.history.state ?? {}) as Record<string, unknown>;
      window.history.pushState(
        { ...currentState, bruckeOverlay: id } satisfies OverlayHistoryState,
        "",
        window.location.href
      );
      sentinelPushedRef.current = true;
    }, PUSH_DELAY_MS);

    let closedByBack = false;
    const handlePop = () => {
      // A dialog stacked above this one popped first. Only close when this
      // dialog's own sentinel is no longer the current history entry.
      const state = window.history.state as OverlayHistoryState | null;
      if (state?.bruckeOverlay === id) return;
      closedByBack = true;
      onCloseRef.current();
    };
    window.addEventListener("popstate", handlePop);

    return () => {
      window.removeEventListener("popstate", handlePop);
      if (openTimerRef.current !== null) {
        window.clearTimeout(openTimerRef.current);
        openTimerRef.current = null;
      }
      if (closedByBack) return;
      closeTimerRef.current = window.setTimeout(() => {
        closeTimerRef.current = null;
        if (!sentinelPushedRef.current) return;
        const state = window.history.state as OverlayHistoryState | null;
        if (state?.bruckeOverlay !== id) return;
        const currentPath = window.location.pathname + window.location.search;
        if (currentPath !== sentinelPathRef.current) return;
        sentinelPushedRef.current = false;
        window.history.back();
      }, POP_DELAY_MS);
    };
  }, [open]);
}
