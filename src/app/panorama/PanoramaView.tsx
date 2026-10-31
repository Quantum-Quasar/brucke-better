"use client";

// ponytail: the interactive half of /panorama. The server page resolves the
// "where this is taught" links from each language's curriculum and hands them
// over as plain data, so this chunk stays small.

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Languages } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useAppNavigation } from "@/lib/app-navigation";
import { parseLessonHref } from "@/lib/routes";
import {
  PANORAMA_BY_LANG,
  PANORAMA_LANGUAGE_IDS,
  isPanoramaLanguageId,
  type PanoramaLanguageId,
} from "@/data/panorama-data";
import type { PanoramaLink } from "@/data/panorama-links";

interface PanoramaViewProps {
  linksByLanguage: Record<PanoramaLanguageId, PanoramaLink[]>;
}

export function PanoramaView({ linksByLanguage }: PanoramaViewProps) {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const { openLesson } = useAppNavigation();

  // The store is the source of truth for the app's language, but it is hydrated
  // from localStorage on the client. Render the server's language first, then
  // adopt the active one after mount — that keeps hydration byte-identical
  // while making the panorama open on whichever course is actually active.
  const [viewedLanguageId, setViewedLanguageId] = useState<PanoramaLanguageId>("de");

  useEffect(() => {
    if (isPanoramaLanguageId(activeLanguageId)) {
      setViewedLanguageId(activeLanguageId);
    }
  }, [activeLanguageId]);

  const current = PANORAMA_BY_LANG[viewedLanguageId];
  const links = linksByLanguage[current.id] ?? [];

  // Tabs are view-only. The old behaviour silently moved the learner's whole
  // course (and SRS context) just to read another language's grammar page.
  // Opening a "where this is taught" link is the explicit switch.
  const view = (languageId: PanoramaLanguageId) => {
    setViewedLanguageId(languageId);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10 font-mono text-[var(--text-color)]">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-xs text-[var(--sub-color)] hover:text-[var(--main-color)] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> back to the trail
          </Link>

          <div className="flex flex-col items-end gap-1">
            <div className="flex flex-wrap items-center gap-1.5 bg-[var(--sub-alt-color)] p-1 rounded-lg border border-[var(--sub-color)]/20">
              {PANORAMA_LANGUAGE_IDS.map((lid) => {
              const p = PANORAMA_BY_LANG[lid];
              const active = current.id === lid;
              return (
                <button
                  key={lid}
                  type="button"
                  onClick={() => view(lid)}
                  className={`min-h-11 px-3 py-2 rounded text-xs font-mono transition cursor-pointer ${
                    active
                      ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold"
                      : "text-[var(--sub-color)] hover:text-[var(--text-color)]"
                  }`}
                >
                  {p.name.toLowerCase()}
                </button>
                );
              })}
            </div>
            <span className="text-[10px] text-[var(--sub-color)]">
              viewing only · opening a lesson below switches your course
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--main-color)] font-semibold">
          <Compass className="w-4 h-4" /> {current.name.toLowerCase()} grammar panorama
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight">
          The whole {current.name} structure, on one page
        </h1>
        <p className="text-sm sm:text-base text-[var(--sub-color)] leading-relaxed max-w-2xl">
          {current.intro}
        </p>
      </header>

      <div className="space-y-12">
        {current.grids.map((grid) => (
          <section key={grid.title} className="space-y-4">
            <div className="space-y-1.5">
              <h2 className="text-lg sm:text-xl font-bold font-sans text-[var(--text-color)]">
                {grid.title}
              </h2>
              <p className="text-xs text-[var(--sub-color)] leading-relaxed max-w-3xl">
                {grid.why}
              </p>
            </div>

            <p className="sm:hidden text-[10px] text-[var(--sub-color)] text-right">
              swipe the table sideways to see all columns →
            </p>
            <div
              className="overflow-x-auto rounded-lg border border-[var(--sub-color)]/20 bg-[var(--sub-alt-color)]"
              tabIndex={0}
              role="region"
              aria-label={`${grid.title} — scroll horizontally to see every column`}
            >
              <table className="w-full min-w-[560px] table-fixed text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--sub-color)]/20">
                    <th className="sticky left-0 z-10 w-[140px] max-w-[140px] bg-[var(--sub-alt-color)] px-3 py-2.5 text-[var(--sub-color)] uppercase tracking-wider text-[10px] font-semibold border-r border-[var(--sub-color)]/20 whitespace-normal">
                      {grid.rowHead}
                    </th>
                    {grid.columnHead.map((h) => (
                      <th
                        key={h}
                        className="px-3 py-2.5 text-[var(--main-color)] uppercase tracking-wider text-[10px] font-semibold"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {grid.rows.map((row) => (
                    <tr key={row.head} className="border-b border-[var(--sub-color)]/10 last:border-0">
                      <th className="sticky left-0 z-10 w-[140px] max-w-[140px] bg-[var(--sub-alt-color)] px-3 py-3 font-medium text-[var(--text-color)] align-top whitespace-normal break-words border-r border-[var(--sub-color)]/20">
                        {row.head}
                      </th>
                      {row.cells.map((cell, i) => (
                        <td key={i} className="px-3 py-3 align-top">
                          <div className="text-[var(--main-color)] font-bold">{cell.label}</div>
                          {cell.note && (
                            <div className="text-[10px] text-[var(--sub-color)] mt-0.5 leading-tight">
                              {cell.note}
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>

      <footer className="pt-6 border-t border-[var(--sub-color)]/15 space-y-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--main-color)] font-semibold">
          <Languages className="w-4 h-4" /> where this is taught
        </div>
        <ul className="text-xs text-[var(--sub-color)] space-y-1.5 leading-relaxed">
          {links.map((item) => (
            <li key={item.href + item.label}>
              <Link
                href={item.href}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  const target = parseLessonHref(item.href);
                  if (!target) return;
                  event.preventDefault();
                  openLesson(target.languageId, target.lessonId);
                }}
                title={`Open this lesson in ${current.name} (switches your active course)`}
                className="text-[var(--main-color)] hover:underline"
              >
                {item.label}
              </Link>{" "}
              — {item.desc}
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
