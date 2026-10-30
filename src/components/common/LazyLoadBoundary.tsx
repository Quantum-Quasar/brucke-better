"use client";

import { catchError, type ErrorInfo } from "next/error";
import { isChunkLoadError } from "@/lib/chunk-errors";
import { MENU_PANEL_FRAME } from "@/components/common/menu-panel";

interface LazyLoadFallbackProps {
  /** What failed, used in the message for non-chunk errors. */
  label?: string;
  /** Compact layout for menus and other small lazy boundaries. */
  inline?: boolean;
}

function LazyLoadFallback({ label = "this content", inline = false }: LazyLoadFallbackProps, { error, retry }: ErrorInfo) {
  const chunkError = isChunkLoadError(error);
  return (
    <div
      role="alert"
      className={
        inline
          ? `${MENU_PANEL_FRAME} p-4 font-mono text-[11px] text-[var(--sub-color)] space-y-2`
          : "py-10 text-center font-mono text-xs text-[var(--sub-color)] space-y-3"
      }
    >
      <p>
        {chunkError
          ? "A new version of Brücke is available — reload to continue."
          : `${label} could not be loaded.`}
      </p>
      <button
        type="button"
        onClick={() => {
          if (chunkError) window.location.reload();
          else retry();
        }}
        className="px-3 py-1.5 rounded border border-[var(--main-color)]/40 bg-[var(--main-color)]/10 text-[var(--main-color)] font-mono font-bold text-[11px] transition cursor-pointer hover:bg-[var(--main-color)]/20"
      >
        {chunkError ? "reload" : "try again"}
      </button>
    </div>
  );
}

export const LazyLoadBoundary = catchError(LazyLoadFallback);
