"use client";

import React from "react";

/**
 * Layout-preserving skeleton shown while the active course curriculum loads
 * on slow connections (mirrors the welcome hero + climbing trail structure).
 */
export function HomeSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading course"
      className="mt-2 space-y-6 animate-pulse"
    >
      <span className="sr-only">loading course…</span>

      {/* Hero skeleton */}
      <div className="rounded-xl border border-[var(--sub-color)]/20 bg-[var(--sub-alt-color)] p-5 sm:p-7 space-y-4">
        <div className="h-3 w-24 rounded bg-[var(--sub-color)]/20" />
        <div className="h-7 w-3/4 max-w-md rounded bg-[var(--sub-color)]/25" />
        <div className="space-y-2 max-w-xl">
          <div className="h-3.5 w-full rounded bg-[var(--sub-color)]/15" />
          <div className="h-3.5 w-5/6 rounded bg-[var(--sub-color)]/15" />
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <div className="h-10 w-36 rounded bg-[var(--main-color)]/30" />
          <div className="h-10 w-36 rounded bg-[var(--sub-color)]/15" />
        </div>
      </div>

      {/* Climbing trail skeleton */}
      <div className="mx-auto max-w-xl space-y-6 py-2">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex items-center justify-center gap-4">
            <div className="h-12 w-24 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/15" />
            <div className="h-16 w-40 rounded-xl bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25" />
            <div className="h-12 w-24 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/15" />
          </div>
        ))}
      </div>
    </div>
  );
}
