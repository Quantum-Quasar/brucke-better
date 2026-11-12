"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useAppNavigation, isModifiedClick } from "@/lib/app-navigation";
import { loadCompendium, loadLessonIndex } from "@/lib/content-client";
import { useDialogFocus } from "@/lib/use-dialog-focus";
import { useBackDismiss } from "@/lib/use-back-dismiss";
import { getLanguageDefinition } from "@/data/languages";
import { buildSearchIndex, searchIndex, type SearchEntry } from "@/lib/search-index";

const indexes = new Map<string, Promise<SearchEntry[]>>();
function loadIndex(languageId: string): Promise<SearchEntry[]> {
  const cached = indexes.get(languageId);
  if (cached) return cached;
  const pending = Promise.all([loadCompendium(languageId), loadLessonIndex(languageId)])
    .then(([data, lessons]) => buildSearchIndex(languageId, data, lessons))
    .catch((error: unknown) => { indexes.delete(languageId); throw error; });
  indexes.set(languageId, pending);
  return pending;
}

export default function SearchDialog({ onClose }: { onClose: () => void }) {
  const languageId = useAppStore((state) => state.activeLanguageId);
  const openWordDrawer = useAppStore((state) => state.openWordDrawer);
  const { openLesson } = useAppNavigation();
  const language = getLanguageDefinition(languageId);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [query, setQuery] = React.useState("");
  const [index, setIndex] = React.useState<SearchEntry[] | null>(null);
  const [error, setError] = React.useState(false);
  const [attempt, retry] = React.useReducer((n: number) => n + 1, 0);
  useDialogFocus({ open: true, containerRef: dialogRef, initialFocusRef: inputRef, onEscape: onClose });
  useBackDismiss(true, onClose);

  React.useEffect(() => {
    let cancelled = false;
    setIndex(null);
    setError(false);
    void loadIndex(languageId).then((entries) => {
      if (!cancelled) setIndex(entries);
    }).catch(() => { if (!cancelled) setError(true); });
    return () => { cancelled = true; };
  }, [languageId, attempt]);

  const results = React.useMemo(() => index ? searchIndex(index, query) : [], [index, query]);
  const open = (id: number) => { onClose(); openLesson(languageId, id); };
  return (
    <div className="fixed inset-0 z-[80] bg-black/70 flex items-start justify-center px-3 pt-[max(1rem,env(safe-area-inset-top))] sm:pt-[10vh]" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="search-title" className="w-full max-w-2xl max-h-[80dvh] flex flex-col rounded-xl border border-[var(--sub-color)]/40 bg-[var(--bg-color)] shadow-xl">
        <div className="flex items-center justify-between px-4 pt-3">
          <h2 id="search-title" className="text-sm font-bold">Search {language.name} words & lessons</h2>
          <button type="button" aria-label="Close search" onClick={onClose} className="min-h-11 min-w-11 flex items-center justify-center"><X size={18} /></button>
        </div>
        <div className="px-4 pb-3">
          <label htmlFor="course-search" className="sr-only">Word, meaning, cognate or lesson</label>
          <input ref={inputRef} id="course-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Gift, vergessen or dative" autoComplete="off" className="w-full rounded-lg border border-[var(--sub-color)]/40 bg-[var(--sub-alt-color)] px-3 py-3 text-base outline-none focus:border-[var(--main-color)]" aria-controls="search-results" />
          <p className="mt-2 text-xs text-[var(--sub-color)]">Tab to a result, Enter to open. Escape to close.</p>
        </div>
        <div id="search-results" className="overflow-y-auto px-4 pb-4">
          <p role="status" className="text-sm text-[var(--sub-color)] py-2">
            {error ? "Search could not be loaded. Check your connection and try again." : !index ? "Loading search…" : !query.trim() ? "Search words, English meanings, cognates, lesson titles, sound shifts or domains." : results.length ? `${results.length}${results.length === 40 ? "+" : ""} results` : `No results for “${query}” in ${language.name}. Try another word or meaning.`}
          </p>
          {error && <button type="button" onClick={retry} className="min-h-11 underline text-[var(--main-color)]">Retry search</button>}
          <ul className="space-y-2">
            {results.map((entry) => (
              <li key={`${entry.kind}:${entry.id}`} className="rounded-lg border border-[var(--sub-color)]/20 p-3">
                {entry.kind === "word" ? (
                  <button type="button" className="text-left min-h-11 w-full rounded focus-visible:outline-2 focus-visible:outline-[var(--main-color)]" onClick={() => { onClose(); openWordDrawer(entry.id); }}>
                    <span className="block font-bold text-[var(--main-color)]">{entry.title}</span>
                    <span className="block text-sm">{entry.description}</span>
                    <span className="text-xs text-[var(--sub-color)]">Open word details</span>
                  </button>
                ) : (
                  <Link href={entry.lessons[0].href} onClick={(event) => { if (isModifiedClick(event)) return; event.preventDefault(); open(Number(entry.id)); }} className="block min-h-11 rounded focus-visible:outline-2 focus-visible:outline-[var(--main-color)]">
                    <span className="block font-bold text-[var(--main-color)]">Lesson {entry.id}: {entry.title}</span>
                    <span className="block text-sm">{entry.description}</span>
                  </Link>
                )}
                {entry.kind === "word" && entry.lessons.length > 0 && <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1" aria-label={`Lessons teaching ${entry.title}`}>
                  {entry.lessons.map((lesson) => <Link key={lesson.id} href={lesson.href} onClick={(event) => { if (isModifiedClick(event)) return; event.preventDefault(); open(lesson.id); }} className="inline-flex min-h-11 items-center text-xs underline text-[var(--sub-color)]">Lesson {lesson.id}: {lesson.title}</Link>)}
                </div>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
