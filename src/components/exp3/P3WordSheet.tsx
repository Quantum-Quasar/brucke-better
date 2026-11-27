"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Volume2, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useCompendium, useLessonIndex } from "@/lib/content-client";
import { buildWordEntityMaps, lookupWordEntity } from "@/lib/word-entities-core";
import { getLanguageDefinition } from "@/data/languages";
import { pluralForWord } from "@/data/noun-plurals";
import { playTargetAudio } from "@/lib/audio";
import { spokenWordEntity } from "@/lib/gender";
import { useAppNavigation } from "@/lib/app-navigation";
import { ShiftedWord } from "./p3-kit";

/** A plain modal sheet: focus moves in, Escape and the backdrop close it, focus returns. */
export function P3Sheet({
  label,
  onClose,
  head,
  children,
}: {
  label: string;
  onClose: () => void;
  head: React.ReactNode;
  children: React.ReactNode;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    sheetRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        closeRef.current();
      } else if (event.key === "Tab" && sheetRef.current) {
        const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey, true);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = overflow;
      previous?.focus?.({ preventScroll: true });
    };
  }, []);

  return (
    <div className="q-sheet-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={sheetRef} className="q-sheet" role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}>
        <div className="q-sheet-head">
          <div style={{ minWidth: 0 }}>{head}</div>
          <button type="button" className="q-icon-btn" onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>
        <div className="q-sheet-body">{children}</div>
      </div>
    </div>
  );
}

export function P3WordSheet({ wordId }: { wordId: string }) {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const close = useAppStore((s) => s.closeWordDrawer);
  const isStarred = useAppStore((s) => (s.starredWordIds[s.activeLanguageId] ?? []).includes(wordId));
  const toggleStar = useAppStore((s) => s.toggleStarWord);
  const mastery = useAppStore((s) => s.wordMastery[wordId] ?? "unexplored");
  const { openLesson } = useAppNavigation();
  const language = getLanguageDefinition(activeLanguageId);
  const compendium = useCompendium(activeLanguageId);
  const lessonIndex = useLessonIndex(activeLanguageId);
  const maps = useMemo(
    () => (compendium.data ? buildWordEntityMaps(activeLanguageId, compendium.data, lessonIndex.data ?? []) : null),
    [activeLanguageId, compendium.data, lessonIndex.data]
  );
  const word = maps ? lookupWordEntity(maps, wordId) : undefined;

  if (!maps || !word) {
    return (
      <P3Sheet label="Word" onClose={close} head={<p className="q-lead-strong">{compendium.error ? "Couldn’t load this word." : maps ? "Word not found." : "Loading…"}</p>}>
        <button type="button" className="q-btn" onClick={close}>
          Close
        </button>
      </P3Sheet>
    );
  }

  const plural = pluralForWord(activeLanguageId, word);
  const lessonId = maps.wordLesson[word.id];
  const lesson = lessonId ? lessonIndex.data?.find((item) => item.id === lessonId) : undefined;
  const family = word.sound_shift_ids[0] ? compendium.data?.shifts[word.sound_shift_ids[0]] : undefined;
  const masteryLabel =
    mastery === "mastered" ? "Mastered" : mastery === "encountered" ? "Met in a lesson" : mastery === "explored" ? "Looked up" : "New to you";

  return (
    <P3Sheet
      label={`${word.target_word}: word details`}
      onClose={close}
      head={
        <div style={{ display: "grid", gap: 6 }}>
          <p className="q-small q-strong">
            {word.english_cognate} → {language.name}
          </p>
          <p className="q-head" style={{ fontSize: "clamp(2.25rem, 1.5rem + 3vw, 3.5rem)" }}>
            {word.gender && (
              <span style={{ fontWeight: 600 }}>
                <span className="q-gender" data-g={word.gender} aria-hidden="true" />
                {word.gender}{" "}
              </span>
            )}
            <ShiftedWord english={word.english_cognate} target={word.target_word} rule={word.shift_rule} lang={activeLanguageId} />
          </p>
          <p className="q-body">“{word.english_meaning}”{plural ? ` · plural ${plural}` : ""}</p>
        </div>
      }
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <button
          type="button"
          className="q-btn"
          onClick={() => playTargetAudio(spokenWordEntity(word, activeLanguageId), language.ttsLocale)}
        >
          <Volume2 /> Listen
        </button>
        <button type="button" className="q-btn q-btn--soft" aria-pressed={isStarred} onClick={() => toggleStar(word.id)}>
          {isStarred ? "In My words" : "Add to My words"}
        </button>
        {word.ipa && <span className="q-body q-muted">/{word.ipa.replace(/^\/|\/$/g, "")}/</span>}
      </div>

      {word.context_phrase && (
        <figure style={{ margin: 0, display: "grid", gap: 6 }}>
          <blockquote className="q-lead-strong" lang={activeLanguageId} style={{ margin: 0 }}>
            {word.context_phrase}
          </blockquote>
          <figcaption className="q-body">{word.context_translation}</figcaption>
          <button
            type="button"
            className="q-btn q-btn--ghost q-btn--small"
            style={{ justifySelf: "start", paddingInline: 0 }}
            onClick={() => playTargetAudio(word.context_phrase, language.ttsLocale)}
          >
            Hear the sentence
          </button>
        </figure>
      )}

      {(word.shift_rule || word.etymology_derivation) && (
        <div className="q-note">
          <p className="q-note-title">How to remember it{word.shift_rule ? `: ${word.shift_rule}` : ""}</p>
          {word.etymology_derivation && <p className="q-body">{word.etymology_derivation}</p>}
          {family && <p className="q-small" style={{ marginTop: 8 }}>{family.word_ids.length} words share this pattern.</p>}
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <p className="q-small q-strong">{masteryLabel}</p>
        {lesson && (
          <button
            type="button"
            className="q-btn q-btn--ghost q-btn--small"
            onClick={() => {
              close();
              openLesson(activeLanguageId, lesson.id);
            }}
          >
            Taught in: {lesson.title}
          </button>
        )}
      </div>
    </P3Sheet>
  );
}
