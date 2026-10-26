"use client";

import { useEffect } from "react";
import Link from "next/link";
import { isChunkLoadError } from "@/lib/chunk-errors";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const chunkError = isChunkLoadError(error);

  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4 font-mono" role="alert">
      <p className="text-sm text-[var(--sub-color)]">
        {chunkError
          ? "A new version of Brücke is available. Reload to pick up the new files."
          : "something went wrong on this page."}
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => (chunkError ? window.location.reload() : retry())}
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-xs"
        >
          {chunkError ? "reload" : "try again"}
        </button>
        <Link
          href="/"
          className="px-4 py-2 rounded border border-[var(--sub-color)]/30 text-[var(--sub-color)] font-bold text-xs hover:text-[var(--text-color)]"
        >
          go home
        </Link>
      </div>
    </div>
  );
}
