import { Languages, TriangleAlert, Volume2 } from "lucide-react";
import { ExampleSentence } from "@/components/common/ExampleSentence";
import { playTargetAudio } from "@/lib/audio";
import type { CompendiumData, WordEntity } from "@/lib/types";
import type { LanguageDefinition } from "@/data/languages";
import {
  formatGermanDutchPair,
  lookupGermanBridge,
} from "@/data/dutch/german-bridge";
import { useWordDetails } from "@/lib/content-client";
import { useAppStore } from "@/lib/store";

export function WordCardShiftDetails({ word }: { word: WordEntity }) {
  const languageId = useAppStore((s) => s.activeLanguageId);
  const dutchFromGerman = useAppStore((s) => s.settings.dutchFromGerman);
  const details = useWordDetails(languageId, !word.etymology_derivation);
  const etymologyText = word.etymology_derivation || details[word.id] || "";
  const germanBridge =
    languageId === "nl" && dutchFromGerman
      ? lookupGermanBridge(word.id) ?? lookupGermanBridge(word.target_word)
      : null;

  return (
    <div className="space-y-3">
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
        <p className="text-sm font-mono text-[var(--sub-color)] leading-relaxed pt-1">{etymologyText}</p>
      </div>

      {germanBridge && (
        <div
          data-testid="german-bridge-callout"
          className={`p-4 rounded-lg bg-[var(--sub-alt-color)] space-y-2 font-mono ${
            germanBridge.falseFriend
              ? "border border-dashed border-[var(--error-color)]/60"
              : "border border-[var(--main-color)]/35"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div
              className={`flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold ${
                germanBridge.falseFriend ? "text-[var(--error-color)]" : "text-[var(--main-color)]"
              }`}
            >
              {germanBridge.falseFriend ? (
                <TriangleAlert className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <Languages className="w-3.5 h-3.5 shrink-0" />
              )}
              <span>{germanBridge.falseFriend ? "german false friend" : "german bridge"}</span>
            </div>
            <span
              className={`shrink-0 whitespace-nowrap text-[11px] px-2 py-0.5 rounded bg-[var(--bg-color)] border ${
                germanBridge.falseFriend
                  ? "text-[var(--error-color)] border-[var(--error-color)]/30"
                  : "text-[var(--main-color)] border-[var(--sub-color)]/20"
              }`}
            >
              {germanBridge.correspondence}
            </span>
          </div>

          <div className="text-sm text-[var(--text-color)] font-semibold">
            {formatGermanDutchPair(germanBridge)}
            {germanBridge.falseFriend && germanBridge.germanLookalike && (
              <span className="ml-2 text-xs font-normal text-[var(--error-color)]">
                (not &quot;{germanBridge.germanLookalike}&quot;)
              </span>
            )}
          </div>
          <p className="text-xs text-[var(--sub-color)] leading-relaxed">{germanBridge.note}</p>
        </div>
      )}
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
