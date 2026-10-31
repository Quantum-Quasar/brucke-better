"use client";

import React, { useMemo, useRef, useState } from "react";
import { Search, X, Check, Type, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { FONT_LIST, filterFonts, ensureFontLoaded, type FontMeta } from "@/data/fonts";
import { useDialogFocus } from "@/lib/use-dialog-focus";
import { useBackDismiss } from "@/lib/use-back-dismiss";

type FontFilterTab = "all" | "mono" | "sans" | "display";

const SAMPLE_TEXT = "Wasser · université · nación";

export const FontSelectorModal: React.FC = () => {
  const isOpen = useAppStore((s) => s.isFontSelectorOpen);
  const closeFontSelector = useAppStore((s) => s.closeFontSelector);
  const currentFont = useAppStore((s) => s.font);
  const setFont = useAppStore((s) => s.setFont);

  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FontFilterTab>("all");
  const [previewedIds, setPreviewedIds] = useState<Set<string>>(() => new Set([currentFont]));
  const [loadAllPreviews, setLoadAllPreviews] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useBackDismiss(isOpen, closeFontSelector);

  useDialogFocus({
    open: isOpen,
    containerRef: dialogRef,
    initialFocusRef: searchInputRef,
    onEscape: closeFontSelector,
  });

  const filteredFonts = useMemo(() => filterFonts(query, activeTab), [activeTab, query]);

  if (!isOpen) return null;

  const previewFont = (fontId: string) => {
    ensureFontLoaded(fontId);
    setPreviewedIds((prev) => {
      if (prev.has(fontId)) return prev;
      const next = new Set(prev);
      next.add(fontId);
      return next;
    });
  };

  const handleLoadAllPreviews = () => {
    for (const f of FONT_LIST) {
      ensureFontLoaded(f.id);
    }
    setLoadAllPreviews(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="font-selector-title"
        className="w-full max-w-3xl max-h-[85dvh] flex flex-col rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/25 text-[var(--text-color)] shadow-2xl overflow-hidden font-sans"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[var(--sub-color)]/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-[var(--main-color)]" />
            <span id="font-selector-title" className="text-sm font-bold font-mono">
              typeface
            </span>
          </div>

          <div className="flex items-center gap-3">
            {!loadAllPreviews && (
              <button
                type="button"
                onClick={handleLoadAllPreviews}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 text-[11px] font-mono text-[var(--sub-color)] hover:text-[var(--main-color)] transition cursor-pointer"
                title="Load all 43 font previews at once"
              >
                <Sparkles className="w-3 h-3" />
                <span>load all previews</span>
              </button>
            )}
            <span className="text-xs font-mono text-[var(--sub-color)] hidden sm:inline">[esc] to close</span>
            <button
              type="button"
              onClick={closeFontSelector}
              className="inline-flex h-11 w-11 items-center justify-center rounded text-[var(--sub-color)] hover:text-[var(--text-color)] hover:bg-[var(--sub-alt-color)] transition cursor-pointer"
              aria-label="Close font selector"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search and Tabs */}
        <div className="p-4 border-b border-[var(--sub-color)]/15 space-y-3 bg-[var(--sub-alt-color)]/40">
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--sub-color)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fonts by name (e.g. fira, lexend, comic)..."
              className="min-h-11 w-full pl-9 pr-4 py-2 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/30 text-sm font-mono text-[var(--text-color)] placeholder-[var(--sub-color)] outline-none focus:border-[var(--main-color)] transition"
            />
          </div>

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
              {(["all", "mono", "sans", "display"] as FontFilterTab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded transition cursor-pointer ${
                    activeTab === tab
                      ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold"
                      : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
                  }`}
                >
                  {tab} ({tab === "all" ? FONT_LIST.length : FONT_LIST.filter((f) => f.category === tab).length})
                </button>
              ))}
            </div>
            <span className="text-[10px] font-mono text-[var(--sub-color)]">
              fonts load on demand when hovered or selected
            </span>
          </div>
        </div>

        {/* Fonts Grid */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredFonts.map((font: FontMeta) => {
            const isSelected = currentFont === font.id;
            const isLoaded =
              loadAllPreviews ||
              isSelected ||
              Boolean(font.systemFont) ||
              font.id === "Lexend_Deca" ||
              font.id === "Roboto_Mono" ||
              previewedIds.has(font.id);

            return (
              <button
                key={font.id}
                type="button"
                onMouseEnter={() => previewFont(font.id)}
                onFocus={() => previewFont(font.id)}
                onClick={() => {
                  ensureFontLoaded(font.id);
                  setFont(font.id);
                }}
                className={`p-3 rounded text-left transition border cursor-pointer ${
                  isSelected
                    ? "border-[var(--main-color)] bg-[var(--sub-alt-color)] shadow-sm"
                    : "border-[var(--sub-color)]/20 hover:border-[var(--sub-color)]/60 bg-[var(--bg-color)] hover:bg-[var(--sub-alt-color)]/50"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-medium truncate">{font.name}</span>
                  <span className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-mono text-[var(--sub-color)]">{font.category}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[var(--main-color)]" />}
                  </span>
                </div>
                <div
                  className="mt-1.5 truncate text-lg"
                  style={isLoaded ? { fontFamily: font.family } : undefined}
                >
                  {SAMPLE_TEXT}
                </div>
              </button>
            );
          })}

          {filteredFonts.length === 0 && (
            <div className="col-span-full py-12 text-center text-sm text-[var(--sub-color)] font-mono">
              No fonts matching &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 border-t border-[var(--sub-color)]/20 bg-[var(--sub-alt-color)]/60 flex items-center justify-between text-xs font-mono text-[var(--sub-color)]">
          <span>
            Current: <span className="text-[var(--main-color)] font-bold">{currentFont.replace(/_/g, " ")}</span>
          </span>
          <span>On-demand webfont · Auto-saved</span>
        </div>
      </div>
    </div>
  );
};
