"use client";

import React from "react";
import { ArrowLeft, X } from "lucide-react";
import { ModalDialog } from "@/components/common/ModalDialog";

interface DesignSubviewSheetProps {
  label: string;
  eyebrow?: string;
  onClose: () => void;
  dockClearance?: boolean;
  children: React.ReactNode;
}

export function DesignSubviewSheet({
  label,
  eyebrow = "Atelier Session",
  onClose,
  dockClearance = false,
  children,
}: DesignSubviewSheetProps) {
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
      className="design-subview-sheet safe-x open:flex flex-col z-50 inset-0 w-full h-full max-w-none max-h-none m-0 p-0 overflow-hidden outline-none"
    >
      <div className="design-subview-header sticky top-0 z-20 flex items-center justify-between gap-3 px-4 sm:px-6 py-2.5 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 inline-flex items-center gap-1.5 px-3 rounded-full bg-[var(--design-well)] border border-[var(--design-border)] text-xs font-semibold text-[var(--design-ink)] hover:border-[var(--design-sapphire-border)] hover:text-[var(--design-sapphire)] transition cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back</span>
          </button>
          <div className="min-w-0 leading-tight">
            <span className="block design-mono text-[10px] uppercase tracking-[0.14em] text-[var(--design-sapphire)] font-semibold truncate">
              {eyebrow}
            </span>
            <span className="block text-sm font-semibold text-[var(--design-ink)] truncate">
              {label}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${label}`}
          className="min-h-11 min-w-11 flex items-center justify-center rounded-full bg-[var(--design-well)] border border-[var(--design-border)] text-[var(--design-ink-muted)] hover:text-[var(--design-ink)] transition cursor-pointer shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className={dockClearance ? "pb-28" : "pb-safe-lg"}>{children}</div>
      </div>
    </ModalDialog>
  );
}
