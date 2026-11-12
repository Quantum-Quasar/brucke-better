import { Volume2 } from "lucide-react";
import { ExampleSentence } from "@/components/common/ExampleSentence";
import { playTargetAudio } from "@/lib/audio";
import type { CompendiumData, WordEntity } from "@/lib/types";
import type { LanguageDefinition } from "@/data/languages";

export function WordCardShiftDetails({ word }: { word: WordEntity }) {
  return (
    <div className="p-4 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-2">
      <div className="text-xs font-mono uppercase tracking-wider text-[var(--main-color)]">shift rule</div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0 text-sm font-mono text-[var(--text-color)]">
          <span className="text-[var(--sub-color)]">{word.english_cognate}</span>
          <span className="mx-2 text-[var(--main-color)]">→</span>
          <span className="text-[var(--main-color)] font-bold">{word.target_word}</span>
        </div>
        <span className="shrink-0 whitespace-nowrap text-xs font-mono px-2 py-0.5 rounded bg-[var(--bg-color)] text-[var(--main-color)] border border-[var(--sub-color)]/20">
          {word.shift_rule}
        </span>
      </div>
      <p className="text-sm font-mono text-[var(--sub-color)] leading-relaxed pt-1">{word.etymology_derivation}</p>
    </div>
  );
}

export function WordCardContextDetails({ word, language, relatedCompounds }: {
  word: WordEntity;
  language: LanguageDefinition;
  relatedCompounds: CompendiumData["compounds"];
}) {
  return (
    <>
      <div className="p-4 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-1.5 font-mono">
        <div className="flex items-center justify-between">
          <div className="text-xs uppercase tracking-wider text-[var(--sub-color)]">context</div>
          <button
            type="button"
            onClick={() => playTargetAudio(word.context_phrase, language.ttsLocale)}
            className="p-1 rounded bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 text-[var(--main-color)] border border-[var(--sub-color)]/20 transition cursor-pointer"
            title={`Listen to full phrase: "${word.context_phrase}"`}
            aria-label={`Listen to ${language.name} context phrase: "${word.context_phrase}"`}
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>
        <ExampleSentence sentence={word.context_phrase} translation={word.context_translation} word={word.target_word} lang={language.id} />
      </div>
      {relatedCompounds.length > 0 && (
        <div className="space-y-2 font-mono">
          <div className="text-xs uppercase tracking-wider text-[var(--sub-color)]">related compounds</div>
          <div className="space-y-1.5">
            {relatedCompounds.map((comp) => (
              <div key={comp.id} className="p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--main-color)]">{comp.compound}</span>
                  <span className="text-[var(--sub-color)]">{comp.real_meaning}</span>
                </div>
                <p className="text-[var(--sub-color)] text-xs leading-relaxed">{comp.lore}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
