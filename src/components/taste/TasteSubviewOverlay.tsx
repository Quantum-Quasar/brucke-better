"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { ModalDialog } from "@/components/common/ModalDialog";

export interface TasteSubviewOverlayProps {
  label: string;
  onClose: () => void;
  dockClearance?: boolean;
  children: React.ReactNode;
}

export function TasteSubviewOverlay({
  label,
  onClose,
  dockClearance = false,
  children,
}: TasteSubviewOverlayProps) {
  const [top, setTop] = useState(60);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const header = document.querySelector(".taste-ui header");
        const bottom = header ? header.getBoundingClientRect().bottom : 60;
        const next = Math.max(0, Math.round(bottom));
        setTop((previous) => (previous === next ? previous : next));
      });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    const header = document.querySelector(".taste-ui header");
    if (header) observer.observe(header);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  return (
    <ModalDialog
      onClose={onClose}
      aria-label={label}
      blocksGlobalShortcuts={false}
      shouldHandleEscape={(event) => {
        const target = event.target;
        return !(
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement ||
          (target instanceof HTMLElement && target.isContentEditable)
        );
      }}
      style={{ top, height: "auto" }}
      className="safe-x open:block z-30 overflow-y-auto overscroll-contain bg-[var(--taste-bg)] text-[var(--taste-ink)] outline-none"
    >
      <div className="sticky top-0 z-20 border-b border-[var(--taste-border)] bg-[var(--taste-bg)]/95 backdrop-blur-sm">
        <div className="taste-wrap flex items-center justify-between py-2">
          <span className="taste-mono text-xs uppercase tracking-wider text-[var(--taste-muted)]">
            {label}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${label}`}
            className="taste-btn-ghost min-h-11 min-w-11 sm:min-h-9 sm:min-w-0 px-2.5"
          >
            <X className="w-4 h-4" aria-hidden="true" />
            <span className="text-xs taste-mono">Close</span>
          </button>
        </div>
      </div>

      <div className={dockClearance ? "pb-24 lg:pb-12" : "pb-safe-lg"}>{children}</div>
    </ModalDialog>
  );
}
