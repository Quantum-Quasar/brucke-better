"use client";

// A fixed in-page view that sits below the app header. The tab underneath
// stays mounted, so closing an overlay restores its scroll position and local
// state without any router round-trip. Each subview carries its own back /
// close control.

import React, { useEffect, useRef } from "react";

interface SubviewOverlayProps {
  label: string;
  /** Leave room for the fixed bottom dock (atlas overlays keep it visible). */
  dockClearance?: boolean;
  children: React.ReactNode;
}

export function SubviewOverlay({
  label,
  dockClearance = false,
  children,
}: SubviewOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const previous = document.activeElement;
    restoreFocusRef.current = previous instanceof HTMLElement ? previous : null;
    panelRef.current?.focus({ preventScroll: true });
    return () => {
      restoreFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, []);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
      className="fixed inset-x-0 top-14 bottom-0 z-30 overflow-y-auto overscroll-contain bg-[var(--bg-color)] outline-none"
    >
      <div className={dockClearance ? "pb-28" : "pb-8"}>{children}</div>
    </div>
  );
}
