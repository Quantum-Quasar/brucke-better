"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Check, NotebookPen, Trash2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { getLanguageDefinition } from "@/data/languages";
import {
  clearAllMistakes,
  clearMistakesByType,
  groupMistakesByType,
  loadMistakes,
  MISTAKE_ERROR_META,
  MISTAKE_ERROR_TYPES,
  MISTAKE_NOTEBOOK_EVENT,
  MISTAKE_NOTEBOOK_STORAGE_KEY,
  resolveMistake,
  type MistakeEntry,
  type MistakeErrorType,
} from "@/lib/mistake-notebook";

interface MistakeNotebookProps {
  compact?: boolean;
}

export const MistakeNotebook: React.FC<MistakeNotebookProps> = ({ compact = false }) => {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);
  const [entries, setEntries] = useState<MistakeEntry[]>([]);
  const [mounted, setMounted] = useState(false);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  useEffect(() => {
    setMounted(true);
    const refresh = () => setEntries(loadMistakes());
    refresh();
    const onStorage = (event: StorageEvent) => {
      if (!event.key || event.key === MISTAKE_NOTEBOOK_STORAGE_KEY) refresh();
    };
    window.addEventListener(MISTAKE_NOTEBOOK_EVENT, refresh);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(MISTAKE_NOTEBOOK_EVENT, refresh);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    setConfirmClearAll(false);
  }, [activeLanguageId]);

  const grouped = useMemo(
    () => groupMistakesByType(entries, activeLanguageId),
    [entries, activeLanguageId],
  );

  const activeGroups = useMemo(
    () =>
      MISTAKE_ERROR_TYPES.map((type) => ({
        type,
        items: grouped[type],
      })).filter((group) => group.items.length > 0),
    [grouped],
  );

  const totalCount = activeGroups.reduce((sum, group) => sum + group.items.length, 0);

  const [undoSnapshot, setUndoSnapshot] = useState<{ label: string; previous: MistakeEntry[] } | null>(null);

  const handleResolve = (id: string) => {
    const prev = entries;
    setEntries(resolveMistake(id));
    setUndoSnapshot({ label: "Marked mistake resolved.", previous: prev });
  };

  const handleClearGroup = (type: MistakeErrorType) => {
    const prev = entries;
    setEntries(clearMistakesByType(type, activeLanguageId));
    setUndoSnapshot({ label: `Cleared ${MISTAKE_ERROR_META[type].label.toLowerCase()} mistakes.`, previous: prev });
  };

  const handleUndo = () => {
    if (!undoSnapshot) return;
    try {
      window.localStorage.setItem(MISTAKE_NOTEBOOK_STORAGE_KEY, JSON.stringify(undoSnapshot.previous));
      window.dispatchEvent(new Event(MISTAKE_NOTEBOOK_EVENT));
    } catch {
      // Ignore storage errors
    }
    setEntries(undoSnapshot.previous);
    setUndoSnapshot(null);
  };

  const handleClearAll = () => {
    if (!confirmClearAll) {
      setConfirmClearAll(true);
      return;
    }
    setEntries(clearAllMistakes(activeLanguageId));
    setConfirmClearAll(false);
  };

  if (!mounted) {
    return (
      <div className="p-6 rounded-xl bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-xs font-mono text-[var(--sub-color)]">
        Loading mistake notebook…
      </div>
    );
  }

  return (
    <section
      aria-label="Mistake Notebook"
      className={compact ? "space-y-4" : "space-y-6"}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <NotebookPen className="w-4 h-4 text-[var(--main-color)]" aria-hidden="true" />
            <h2 className="text-base font-bold font-mono text-[var(--text-color)]">
              Mistake Notebook · {language.name}
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 text-[11px] font-mono text-[var(--sub-color)]">
              {totalCount} open
            </span>
          </div>
          <p className="text-xs text-[var(--sub-color)] leading-relaxed">
            Wrong answers from exercises are grouped by pattern so you can spot recurring habits and clear them once they click.
          </p>
        </div>

        {totalCount > 0 && (
          <div className="inline-flex items-center gap-2">
            {confirmClearAll && (
              <button
                type="button"
                onClick={() => setConfirmClearAll(false)}
                className="px-2.5 py-1.5 rounded-lg border border-[var(--sub-color)]/25 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={handleClearAll}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition cursor-pointer ${
                confirmClearAll
                  ? "border-[var(--error-color)]/60 bg-[var(--error-color)]/10 text-[var(--error-color)] font-bold"
                  : "border-[var(--sub-color)]/25 text-[var(--sub-color)] hover:text-[var(--text-color)] hover:border-[var(--sub-color)]/50"
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{confirmClearAll ? "Confirm clear all" : "Clear all"}</span>
            </button>
          </div>
        )}
      </div>

      {undoSnapshot && (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[var(--main-color)]/35 bg-[var(--sub-alt-color)] px-4 py-2.5 text-xs font-mono text-[var(--text-color)]"
        >
          <span>{undoSnapshot.label}</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleUndo}
              className="font-bold text-[var(--main-color)] underline underline-offset-2 hover:opacity-80 cursor-pointer"
            >
              undo
            </button>
            <button
              type="button"
              onClick={() => setUndoSnapshot(null)}
              className="text-[var(--sub-color)] hover:text-[var(--text-color)] cursor-pointer"
            >
              dismiss
            </button>
          </div>
        </div>
      )}

      {totalCount === 0 ? (
        <div className="p-6 rounded-xl bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-center space-y-2">
          <p className="text-sm font-mono font-semibold text-[var(--text-color)]">
            No open mistakes for {language.name}.
          </p>
          <p className="text-xs text-[var(--sub-color)] max-w-md mx-auto leading-relaxed">
            When you miss an exercise item, it will land here grouped by word order, gender, spelling, umlauts, or capitalization.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeGroups.map(({ type, items }) => {
            const meta = MISTAKE_ERROR_META[type];
            const visibleItems = compact ? items.slice(0, 5) : items;
            return (
              <div
                key={type}
                className="rounded-xl bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-[var(--sub-color)]/15 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--main-color)]">
                        {meta.label}
                      </h3>
                      <span className="text-[11px] font-mono text-[var(--sub-color)]">
                        ({items.length})
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--sub-color)]">{meta.description}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleClearGroup(type)}
                    className="text-[11px] font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] underline decoration-dotted cursor-pointer"
                  >
                    clear group
                  </button>
                </div>

                <ul className="divide-y divide-[var(--sub-color)]/15">
                  {visibleItems.map((entry) => (
                    <li
                      key={entry.id}
                      className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1 min-w-0">
                        {entry.prompt && (
                          <p className="text-xs text-[var(--sub-color)] line-clamp-2">
                            {entry.prompt}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono">
                          <span className="line-through text-[var(--error-color)] break-words">
                            {entry.attempt}
                          </span>
                          <span className="text-[var(--sub-color)]">→</span>
                          <span className="font-bold text-[var(--main-color)] break-words">
                            {entry.expected}
                          </span>
                          {entry.count > 1 && (
                            <span className="px-1.5 py-0.5 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/20 text-[10px] text-[var(--sub-color)]">
                              ×{entry.count}
                            </span>
                          )}
                        </div>
                        {entry.note && (
                          <p className="text-[11px] text-[var(--sub-color)] leading-relaxed">
                            {entry.note}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleResolve(entry.id)}
                        className="shrink-0 inline-flex items-center gap-1.5 self-start sm:self-center px-2.5 py-1.5 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/25 hover:border-[var(--main-color)]/60 text-[11px] font-mono text-[var(--text-color)] transition cursor-pointer"
                      >
                        <Check className="w-3 h-3 text-[var(--main-color)]" aria-hidden="true" />
                        <span>Resolved</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
