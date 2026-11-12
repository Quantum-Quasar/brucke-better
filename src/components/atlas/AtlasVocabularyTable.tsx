"use client";

import { GenderBadge } from "@/components/common/GenderBadge";
import { getLanguageDefinition } from "@/data/languages";
import { useAppStore } from "@/lib/store";
import type { WordEntity } from "@/lib/types";

export function AtlasVocabularyTable({ words, caption }: { words: WordEntity[]; caption: string }) {
  const activeLanguageId = useAppStore((state) => state.activeLanguageId);
  const openWordDrawer = useAppStore((state) => state.openWordDrawer);
  const language = getLanguageDefinition(activeLanguageId);

  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--sub-color)]/25">
      <table className="w-full min-w-[620px] text-left text-xs">
        <caption className="p-3 text-left font-mono text-[var(--sub-color)]">{caption}</caption>
        <thead className="bg-[var(--sub-alt-color)] text-[var(--text-color)]">
          <tr>
            <th scope="col" className="p-3">English</th>
            <th scope="col" className="p-3">{language.name}</th>
            <th scope="col" className="p-3">Shift</th>
            <th scope="col" className="p-3">Example sentence</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr key={word.id} className="border-t border-[var(--sub-color)]/20 align-top">
              <th scope="row" className="p-3 font-normal">
                {word.english_meaning}
                {word.english_cognate !== word.english_meaning && (
                  <span className="block pt-1 text-[var(--sub-color)]">cognate: {word.english_cognate}</span>
                )}
              </th>
              <td className="p-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <GenderBadge gender={word.gender} size="sm" />
                  <button type="button" lang={activeLanguageId} onClick={() => openWordDrawer(word.id)} className="min-h-11 font-semibold underline decoration-[var(--sub-color)] underline-offset-4 hover:text-[var(--main-color)]">
                    {word.target_word}
                  </button>
                </div>
              </td>
              <td className="p-3 text-[var(--sub-color)]">{word.shift_rule}</td>
              <td className="p-3">
                <p lang={activeLanguageId}>{word.context_phrase}</p>
                <p className="pt-1 text-[var(--sub-color)]">{word.context_translation}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
