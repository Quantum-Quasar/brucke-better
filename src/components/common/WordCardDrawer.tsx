"use client";

// ponytail: native css slide-over drawer and mobile bottom sheet with zero heavy drawer libs

import { WordFrequency } from "@/components/common/WordFrequency";
import { WordCardContextDetails, WordCardShiftDetails } from "@/components/common/WordCardLearningDetails";
import React, { useMemo, useRef } from "react";
import Link from "next/link";
import { X, ExternalLink, Compass, BookOpen, CheckCircle2, Circle, Disc, Minus, Volume2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { isModifiedClick, useAppNavigation } from "@/lib/app-navigation";
import { GenderBadge } from "@/components/common/GenderBadge";
import { playTargetAudio } from "@/lib/audio";
import { getLanguageDefinition } from "@/data/languages";
import { displayArticle } from "@/lib/gender";
import { useCompendium, useLessonIndex } from "@/lib/content-client";
import { buildWordEntityMaps, lookupWordEntity } from "@/lib/word-entities-core";
import { lessonHref } from "@/lib/routes";
import { useDialogFocus } from "@/lib/use-dialog-focus";
import { useBackDismiss } from "@/lib/use-back-dismiss";

export const WordCardDrawer: React.FC = () => {
  const activeWordId = useAppStore((s) => s.activeWordDrawerId);
  if (!activeWordId) return null;
  return <WordCardDrawerContent activeWordId={activeWordId} />;
};

const WordCardDrawerContent: React.FC<{ activeWordId: string }> = ({ activeWordId }) => {
  const closeDrawer = useAppStore((s) => s.closeWordDrawer);
  const { openLesson, openAtlasFamily } = useAppNavigation();
  const mastery = useAppStore((s) =>
    activeWordId ? s.wordMastery[activeWordId] || "unexplored" : "unexplored"
  );
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);
  const compendium = useCompendium(activeLanguageId);
  const lessonIndex = useLessonIndex(activeLanguageId);
  const wordEntityMaps = useMemo(
    () =>
      compendium.data
        ? buildWordEntityMaps(activeLanguageId, compendium.data, lessonIndex.data ?? [])
        : null,
    [activeLanguageId, compendium.data, lessonIndex.data]
  );
  const dialogRef = useRef<HTMLDivElement>(null);

  useBackDismiss(true, closeDrawer);

  useDialogFocus({
    open: true,
    containerRef: dialogRef,
    onEscape: closeDrawer,
  });

  if (compendium.error || lessonIndex.error) {
    return (
      <div ref={dialogRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Word details unavailable"
          className="bg-[var(--bg-color)] border border-[var(--sub-color)]/30 p-6 rounded-lg max-w-sm w-full text-center space-y-3"
        >
          <p className="text-sm font-mono text-[var(--sub-color)]">word details could not be loaded.</p>
          <button
            onClick={closeDrawer}
            className="px-4 py-1.5 bg-[var(--main-color)] text-[var(--bg-color)] font-mono font-bold rounded text-xs"
          >
            close
          </button>
        </div>
      </div>
    );
  }

  if (!compendium.data || !lessonIndex.data || !wordEntityMaps) {
    return (
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Loading word details"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      >
        <div className="bg-[var(--bg-color)] border border-[var(--sub-color)]/30 p-6 rounded-lg max-w-sm w-full text-center space-y-3">
          <p className="text-sm font-mono text-[var(--sub-color)]" role="status">
            loading word…
          </p>
          <button
            onClick={closeDrawer}
            className="px-4 py-1.5 bg-[var(--main-color)] text-[var(--bg-color)] font-mono font-bold rounded text-xs"
          >
            close
          </button>
        </div>
      </div>
    );
  }

  const data = compendium.data;
  const word = lookupWordEntity(wordEntityMaps, activeWordId);

  if (!word) {
    return (
      <div ref={dialogRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Word details unavailable"
          className="bg-[var(--bg-color)] border border-[var(--sub-color)]/30 p-6 rounded-lg max-w-sm w-full text-center space-y-3"
        >
          <p className="text-sm font-mono text-[var(--sub-color)]">word details not found for &quot;{activeWordId}&quot;</p>
          <button
            onClick={closeDrawer}
            className="px-4 py-1.5 bg-[var(--main-color)] text-[var(--bg-color)] font-mono font-bold rounded text-xs"
          >
            close
          </button>
        </div>
      </div>
    );
  }

  // le/la collapse to l' before a vowel — speak the elided form the French do
  const spokenArticle = word.gender ? displayArticle(word.gender, word.target_word, activeLanguageId) : null;
  const spokenWord =
    spokenArticle === null
      ? word.target_word
      : spokenArticle.endsWith("'")
        ? `${spokenArticle}${word.target_word}`
        : `${spokenArticle} ${word.target_word}`;

  const shiftFamily = word.sound_shift_ids[0] ? data.shifts[word.sound_shift_ids[0]] : null;
  const lessonId = wordEntityMaps.wordLesson[word.id];
  const sourceLesson = lessonId
    ? lessonIndex.data.find((lesson) => lesson.id === lessonId)
    : undefined;
  const lessonLabel = sourceLesson
    ? sourceLesson.spineStory
      ? `Story ${sourceLesson.label ?? ""} — ${sourceLesson.title}`
      : sourceLesson.id <= 30
      ? `Topic ${sourceLesson.id} — ${sourceLesson.title}`
      : sourceLesson.id >= 5000
      ? `Branch — ${sourceLesson.title}`
      : `Topic ${Math.floor(sourceLesson.id / 100)} · Sprig ${sourceLesson.id % 100} — ${sourceLesson.title}`
    : lessonId
    ? `Lesson ${lessonId}`
    : null;
  const relatedCompounds = data.compounds.filter(
    (c) => c.compound.toLowerCase().includes(word.target_word.toLowerCase()) || c.literal_morphemes.toLowerCase().includes(word.target_word.toLowerCase())
  );

  const getMasteryBadge = () => {
    switch (mastery) {
      case "mastered":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-bold border border-[var(--main-color)]/40 bg-[var(--main-color)]/10 text-[var(--main-color)]">
            <CheckCircle2 className="w-3 h-3" /> mastered
          </span>
        );
      case "encountered":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-bold border border-[var(--sub-color)]/40 bg-[var(--sub-color)]/10 text-[var(--sub-color)]">
            <Disc className="w-3 h-3" /> encountered
          </span>
        );
      case "explored":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-bold border border-[var(--text-color)]/40 bg-[var(--text-color)]/10 text-[var(--text-color)]">
            <Circle className="w-3 h-3" /> explored
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono border border-[var(--sub-color)]/20 bg-[var(--sub-alt-color)] text-[var(--sub-color)]">
            <Minus className="w-3 h-3" /> unexplored
          </span>
        );
    }
  };

  return (
    <div ref={dialogRef} className="fixed inset-0 z-50 flex justify-end bg-black/80 transition-opacity animate-in fade-in duration-200">
      {/* Backdrop click to dismiss */}
      <div className="absolute inset-0" onClick={closeDrawer} />

      {/* Drawer Panel: Slide-over on desktop, bottom-sheet on mobile */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="word-drawer-title"
        className="relative z-10 flex flex-col w-full sm:max-w-md h-full sm:h-auto sm:min-h-full bg-[var(--bg-color)] border-l border-[var(--sub-color)]/20 shadow-2xl overflow-y-auto overscroll-contain"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[var(--bg-color)] border-b border-[var(--sub-color)]/20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--sub-color)]">word</span>
            {getMasteryBadge()}
          </div>
          <button
            onClick={closeDrawer}
            className="min-h-11 min-w-11 justify-center p-2 -mr-1 rounded text-[var(--sub-color)] hover:text-[var(--text-color)] hover:bg-[var(--sub-alt-color)] transition flex items-center gap-1"
            aria-label="Close word drawer"
          >
            <span className="keycap text-[10px]">esc</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Word Content */}
        <div className="p-6 pb-safe space-y-6">
          {/* Main Word + Pronunciation */}
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <GenderBadge gender={word.gender} size="lg" showLabel />
              <h2
                id="word-drawer-title"
                className="min-w-0 flex-1 break-words text-2xl leading-tight font-mono font-bold text-[var(--main-color)] tracking-tight sm:text-3xl"
              >
                {word.target_word}
              </h2>
              <button
                type="button"
                onClick={() => playTargetAudio(spokenWord, language.ttsLocale)}
                className="shrink-0 p-1.5 rounded bg-[var(--sub-alt-color)] hover:bg-[var(--main-color)]/10 text-[var(--main-color)] border border-[var(--sub-color)]/20 transition cursor-pointer"
                title={`Listen to "${spokenWord}"`}
                aria-label={`Listen to ${language.name} pronunciation of ${spokenWord}`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[var(--sub-color)] font-mono">
              <span>{word.ipa}</span>
              <span>·</span>
              <span className="text-[var(--text-color)]">&quot;{word.english_meaning}&quot;</span>
            </div>
            <WordFrequency word={word} />
          </div>

          <WordCardShiftDetails word={word} />

          {/* Cross-Layer Links */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--sub-color)]">connections</div>
            <div className="grid grid-cols-1 gap-2">
              {lessonId && (
                <Link
                  href={lessonHref(activeLanguageId, lessonId)}
                  onClick={(event) => {
                    if (isModifiedClick(event)) return;
                    event.preventDefault();
                    closeDrawer();
                    openLesson(activeLanguageId, lessonId);
                  }}
                  className="flex items-center justify-between p-3 rounded-lg bg-[var(--sub-alt-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/20 text-xs font-mono text-[var(--text-color)] transition group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <BookOpen className="w-4 h-4 text-[var(--main-color)] shrink-0" />
                    <span className="truncate">{lessonLabel}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--sub-color)] group-hover:text-[var(--main-color)] transition" />
                </Link>
              )}

              {shiftFamily && (
                <Link
                  href={`/atlas/${shiftFamily.id}`}
                  onClick={(event) => {
                    if (isModifiedClick(event)) return;
                    event.preventDefault();
                    closeDrawer();
                    openAtlasFamily(shiftFamily.id);
                  }}
                  className="flex items-center justify-between p-3 rounded-lg bg-[var(--sub-alt-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/20 text-xs font-mono text-[var(--text-color)] transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-[var(--main-color)]" />
                    <span>atlas: {shiftFamily.symbol} constellation</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--sub-color)] group-hover:text-[var(--main-color)] transition" />
                </Link>
              )}
            </div>
          </div>

          <WordCardContextDetails word={word} language={language} relatedCompounds={relatedCompounds} />
        </div>
      </div>
    </div>
  );
};
