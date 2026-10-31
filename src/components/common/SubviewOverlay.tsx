"use client";

// A fixed in-page view that sits below the app header. The tab underneath
// stays mounted, so closing an overlay restores its scroll position and local
// state without any router round-trip. It is a modal dialog: focus is trapped,
// Escape closes it, and the lesson's input-level Escape still wins.

import React, { useEffect, useRef, useState } from "react";
import { useDialogFocus } from "@/lib/use-dialog-focus";
import { useBackDismiss } from "@/lib/use-back-dismiss";

interface SubviewOverlayProps {
  label: string;
  onClose: () => void;
  /** Leave room for the fixed bottom dock (atlas overlays keep it visible). */
  dockClearance?: boolean;
  children: React.ReactNode;
}

export function SubviewOverlay({
  label,
  onClose,
  dockClearance = false,
  children,
}: SubviewOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(56);

  useBackDismiss(true, onClose);

  useDialogFocus({
    open: true,
    containerRef: panelRef,
    onEscape: onClose,
    shouldHandleEscape: (event) => {
      const target = event.target;
      // Inside a text field, Escape belongs to the lesson (restart/lose input),
      // not to the overlay.
      return !(
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      );
    },
  });

  // The app header is sticky, but its offset changes when the storage banner
  // is visible or the underlying document scrolls. Measure it instead of
  // hard-coding `top-14`.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const header = document.querySelector("header");
        const bottom = header ? header.getBoundingClientRect().bottom : 56;
        const next = Math.max(0, Math.round(bottom));
        setTop((previous) => (previous === next ? previous : next));
      });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    const header = document.querySelector("header");
    if (header) observer.observe(header);
    const banner = document.querySelector('[role="alert"]');
    if (banner) observer.observe(banner);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
      style={{ top }}
      className="safe-x fixed inset-x-0 bottom-0 z-30 overflow-y-auto overscroll-contain bg-[var(--bg-color)] outline-none"
    >
      <div className={dockClearance ? "pb-28" : "pb-safe-lg"}>{children}</div>
    </div>
  );
}
