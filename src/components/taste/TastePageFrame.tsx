"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface TastePageFrameProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function TastePageFrame({
  eyebrow,
  title,
  description,
  backHref = "/taste",
  backLabel = "Trail",
  actions,
  children,
}: TastePageFrameProps) {
  return (
    <div className="taste-wrap py-6 sm:py-8 space-y-6">
      {(eyebrow || title || description || backHref) && (
        <header className="border-b border-[var(--taste-border)] pb-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {backHref ? (
              <Link
                href={backHref}
                className="taste-mono inline-flex min-h-11 sm:min-h-8 items-center gap-1.5 text-xs text-[var(--taste-muted)] hover:text-[var(--taste-accent)] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{backLabel}</span>
              </Link>
            ) : (
              <span />
            )}
            {eyebrow && (
              <span className="taste-mono text-[11px] uppercase tracking-widest text-[var(--taste-accent)] font-semibold">
                {eyebrow}
              </span>
            )}
          </div>

          {(title || actions) && (
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                {title && (
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--taste-ink)]">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="text-sm text-[var(--taste-muted)] leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
              {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
            </div>
          )}
        </header>
      )}

      <div className="min-w-0">{children}</div>
    </div>
  );
}
