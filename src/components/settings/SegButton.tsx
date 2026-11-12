"use client";

import type { ReactNode } from "react";
/** One option in a settings segmented control. aria-pressed conveys the selected
 * state to assistive tech (color alone does not), and the 44px floor keeps the
 * target tappable. */
export function SegButton({
  selected,
  onClick,
  disabled = false,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      disabled={disabled}
      className={`min-h-[44px] px-3 py-1.5 rounded text-xs font-mono transition ${
        disabled
          ? "bg-[var(--sub-alt-color)] text-[var(--sub-color)] opacity-40 cursor-not-allowed"
          : selected
            ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold shadow-xs cursor-pointer"
            : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)] cursor-pointer"
      }`}
    >
      {children}
      <span aria-hidden="true" className={`ml-1.5 ${selected ? "visible" : "invisible"}`}>✓</span>
    </button>
  );
}
