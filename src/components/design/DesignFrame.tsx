"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { getLanguageDefinition } from "@/data/languages";

interface DesignFrameProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  showBackToTrail?: boolean;
  showLanguageBadge?: boolean;
  maxWidth?: "3xl" | "4xl" | "5xl" | "6xl";
  headerRight?: React.ReactNode;
  children: React.ReactNode;
}

const WIDTH_CLASS: Record<NonNullable<DesignFrameProps["maxWidth"]>, string> = {
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
};

export function DesignFrame({
  eyebrow,
  title,
  subtitle,
  showBackToTrail = false,
  showLanguageBadge = true,
  maxWidth = "5xl",
  headerRight,
  children,
}: DesignFrameProps) {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);

  return (
    <div className={`${WIDTH_CLASS[maxWidth]} mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6`}>
      <header className="space-y-3 pb-4 border-b border-[var(--design-border)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            {showBackToTrail && (
              <Link
                href="/design"
                className="min-h-11 inline-flex items-center gap-1.5 px-3 rounded-full bg-[var(--design-well)] border border-[var(--design-border)] text-xs font-semibold text-[var(--design-ink-muted)] hover:text-[var(--design-sapphire)] hover:border-[var(--design-sapphire-border)] transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Trail</span>
              </Link>
            )}
            <span className="design-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--design-sapphire)]">
              {eyebrow}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {showLanguageBadge && (
              <span className="design-pill bg-[var(--design-surface)] border border-[var(--design-border)] text-[var(--design-ink)]">
                <span aria-hidden="true">{language.flag}</span>
                <span>{language.name}</span>
              </span>
            )}
            {headerRight}
          </div>
        </div>

        <div className="space-y-1.5">
          <h1 className="design-serif text-3xl sm:text-4xl font-bold text-[var(--design-ink)] leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base text-[var(--design-ink-muted)] max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </header>

      <div className="min-w-0">{children}</div>
    </div>
  );
}
