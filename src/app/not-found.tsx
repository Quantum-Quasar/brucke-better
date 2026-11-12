import Link from "next/link";
import { Compass, Home } from "lucide-react";
import type { Metadata } from "next";

// Replaces Next's built-in 404 template, whose own <title> merged with the root
// layout's metadata and produced two <title> tags on every real 404.
export const metadata: Metadata = {
  title: "Page not found — Brücke",
  description: "That trail node does not exist. Head back to the map and pick up where you left off.",
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full p-6 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/30 text-center space-y-5 shadow-2xl">
        <div className="w-12 h-12 rounded bg-[var(--main-color)]/10 text-[var(--main-color)] flex items-center justify-center mx-auto border border-[var(--main-color)]/20">
          <Compass className="w-6 h-6" />
        </div>

        <div className="space-y-1 font-mono">
          <h2 className="text-lg font-bold text-[var(--text-color)]">off the trail</h2>
          <p className="text-xs text-[var(--sub-color)]">
            this node does not exist — the map only has authored lessons and shift families.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2 font-mono">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-bold text-xs transition cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>back to the trail</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
