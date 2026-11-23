"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MistakeNotebook } from "@/components/common/MistakeNotebook";

export default function MistakesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 font-sans">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>back to trail</span>
        </Link>
        <span className="text-[11px] font-mono text-[var(--sub-color)]">
          stored locally in this browser
        </span>
      </div>

      <MistakeNotebook />
    </div>
  );
}
