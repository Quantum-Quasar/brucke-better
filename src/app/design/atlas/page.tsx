"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, Search, ChevronRight } from "lucide-react";
import { DonutChart } from "@/components/common/DonutChart";
import { DesignFrame } from "@/components/design/DesignFrame";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { isModifiedClick, useAppNavigation } from "@/lib/app-navigation";
import { getLanguageDefinition } from "@/data/languages";
import { useCompendium } from "@/lib/content-client";
import { getAtlasFamilies } from "@/lib/atlas-families";

export default function DesignAtlasPage() {
  const [mounted, setMounted] = useState(false);
  const wordMastery = useAppStore((s) => s.wordMastery);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const filterQuery = useViewStore(
    (s) => s.atlasFilterByLanguage[activeLanguageId] ?? ""
  );
  const storeSetFilter = useViewStore((s) => s.setAtlasFilter);
  const setFilterQuery = (value: string) => storeSetFilter(activeLanguageId, value);
  const { openAtlasFamily, openAtlasMaster } = useAppNavigation();
  const language = getLanguageDefinition(activeLanguageId);
  const compendium = useCompendium(activeLanguageId);

  useEffect(() => {
    setMounted(true);
  }, []);

  const atlasTitle =
    activeLanguageId === "fr"
      ? "Conversion Bridge Families"
      : activeLanguageId === "es"
      ? "Castilian Sound Shift Families"
      : activeLanguageId === "nl"
      ? "English–Dutch Correspondence Families"
      : "Sound Shift Families";

  const familyWord =
    activeLanguageId === "fr"
      ? "conversion families"
      : activeLanguageId === "nl"
      ? "correspondence families"
      : "sound shifts";

  const masterFamilyWord =
    activeLanguageId === "fr"
      ? "conversion families"
      : activeLanguageId === "nl"
      ? "correspondence families"
      : "shift families";

  if (compendium.error) {
    return (
      <DesignFrame eyebrow="Phonological Atlas" title={atlasTitle}>
        <div className="design-card p-8 text-center space-y-4" role="alert">
          <p className="text-sm text-[var(--design-ink-muted)]">
            Atlas data could not be loaded.
          </p>
          <button
            type="button"
            onClick={compendium.retry}
            className="min-h-11 inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold cursor-pointer"
            style={{
              backgroundColor: "var(--design-sapphire)",
              color: "var(--design-on-accent)",
            }}
          >
            <Compass className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Retry</span>
          </button>
        </div>
      </DesignFrame>
    );
  }

  if (!compendium.data) {
    return (
      <DesignFrame eyebrow="Phonological Atlas" title={atlasTitle}>
        <div className="design-card p-12 text-center design-mono text-sm text-[var(--design-ink-muted)]" role="status">
          Loading atlas…
        </div>
      </DesignFrame>
    );
  }

  const data = compendium.data;
  const shiftList = getAtlasFamilies(data);

  const filteredShifts = shiftList.filter((s) => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.symbol.toLowerCase().includes(q) ||
      s.phonetic_rule.toLowerCase().includes(q) ||
      s.word_ids.some((wid) => {
        if (wid.toLowerCase().includes(q)) return true;
        const word = data.words[wid];
        return Boolean(
          word &&
            (word.english_cognate.toLowerCase().includes(q) ||
              word.target_word.toLowerCase().includes(q))
        );
      })
    );
  });

  let totalMastered = 0;
  let totalEncountered = 0;
  let totalExplored = 0;
  const totalWords = data.wordList.length;

  if (mounted) {
    for (const w of data.wordList) {
      const m = wordMastery[w.id];
      if (m === "mastered") totalMastered++;
      else if (m === "encountered") totalEncountered++;
      else if (m === "explored") totalExplored++;
    }
  }
  const totalUnseen = totalWords - (totalMastered + totalEncountered + totalExplored);

  const atlasSub =
    activeLanguageId === "fr"
      ? `The ${shiftList.length} conversion bridge families linking English cognates to French vocabulary — plus every dictionary word that sits outside them.`
      : activeLanguageId === "es"
      ? `The ${shiftList.length} historical sound and suffix shift families linking English & Latin cognates to Spanish vocabulary.`
      : activeLanguageId === "nl"
      ? `The ${shiftList.length} English↔Dutch correspondence families — the consonants Dutch kept and the vowels it turned.`
      : `The ${shiftList.length} historical sound shift families linking English cognates to High German vocabulary.`;

  return (
    <DesignFrame
      eyebrow="Phonological Atlas"
      title={atlasTitle}
      subtitle={atlasSub}
      headerRight={
        language.status === "available" ? (
          <div className="relative w-full sm:w-56">
            <Search
              className="w-3.5 h-3.5 text-[var(--design-ink-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              aria-label={`Filter ${familyWord}`}
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={`Filter ${familyWord}…`}
              className="min-h-10 w-full pl-9 pr-3 py-1.5 rounded-full bg-[var(--design-surface)] border border-[var(--design-border)] text-xs text-[var(--design-ink)] placeholder:text-[var(--design-ink-muted)] outline-none focus:border-[var(--design-sapphire)] transition"
            />
          </div>
        ) : undefined
      }
    >
      {language.status !== "available" ? (
        <div className="design-card p-8 text-center space-y-3">
          <Compass className="w-8 h-8 text-[var(--design-sapphire)] mx-auto" aria-hidden="true" />
          <h2 className="design-serif text-lg font-bold text-[var(--design-ink)]">
            The {language.name} atlas is under construction
          </h2>
          <p className="text-sm text-[var(--design-ink-muted)] max-w-md mx-auto">
            Sound-shift constellations arrive with the {language.name} trail.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Global Mastery Summary Bar */}
          <div className="design-well px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs design-mono">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <span className="font-bold text-[var(--design-emerald)]">
                {totalMastered} mastered
              </span>
              <span className="font-semibold text-[var(--design-sapphire)]">
                {totalEncountered} in course
              </span>
              <span className="font-semibold text-[var(--design-ink)]">
                {totalExplored} explored
              </span>
              <span className="text-[var(--design-ink-muted)]">{totalUnseen} unseen</span>
            </div>
            <span className="text-[var(--design-ink-muted)]">{totalWords} total indexed</span>
          </div>

          {/* Master Web Feature Banner */}
          <Link
            href={`/design/atlas?master=1&lang=${encodeURIComponent(activeLanguageId)}`}
            onClick={(event) => {
              if (isModifiedClick(event)) return;
              event.preventDefault();
              openAtlasMaster();
            }}
            className="design-card design-card-interactive p-5 flex items-center justify-between gap-4 group"
            style={{ borderColor: "var(--design-sapphire-border)" }}
          >
            <div className="space-y-1">
              <span className="design-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--design-sapphire)]">
                Interactive Graph
              </span>
              <h2 className="design-serif text-lg sm:text-xl font-bold text-[var(--design-ink)] group-hover:text-[var(--design-sapphire)] transition">
                Master Web — every word, phrase &amp; shift, linked
              </h2>
              <p className="text-sm text-[var(--design-ink-muted)] leading-relaxed">
                One graph joining all {masterFamilyWord}, compounds, false friends, and expressions to the words within them.
              </p>
            </div>
            <ChevronRight
              className="w-5 h-5 text-[var(--design-sapphire)] shrink-0 group-hover:translate-x-0.5 transition"
              aria-hidden="true"
            />
          </Link>

          {filteredShifts.length === 0 ? (
            <div className="design-card p-8 text-center space-y-2">
              <p className="text-sm text-[var(--design-ink)]">
                No families match &ldquo;{filterQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setFilterQuery("")}
                className="design-mono text-xs font-semibold text-[var(--design-sapphire)] underline underline-offset-4 cursor-pointer"
              >
                Clear filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredShifts.map((family) => {
                const words = family.word_ids.map((id) => data.words[id]).filter(Boolean);
                const mastered = mounted
                  ? words.filter((w) => wordMastery[w.id] === "mastered").length
                  : 0;
                const encountered = mounted
                  ? words.filter((w) => wordMastery[w.id] === "encountered").length
                  : 0;
                const explored = mounted
                  ? words.filter((w) => wordMastery[w.id] === "explored").length
                  : 0;
                const unexplored = words.length - (mastered + encountered + explored);
                const previewWords = words.slice(0, 3);

                return (
                  <Link
                    key={family.id}
                    href={`/design/atlas?family=${encodeURIComponent(family.id)}&lang=${encodeURIComponent(activeLanguageId)}`}
                    onClick={(event) => {
                      if (isModifiedClick(event)) return;
                      event.preventDefault();
                      openAtlasFamily(family.id);
                    }}
                    className="design-card design-card-interactive p-5 flex flex-col justify-between gap-4 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span
                            className="inline-block design-mono text-xs font-bold px-2.5 py-0.5 rounded-full"
                            style={{
                              backgroundColor: "var(--design-sapphire-soft)",
                              color: "var(--design-sapphire)",
                            }}
                          >
                            {family.symbol}
                          </span>
                          <h3 className="design-serif text-base sm:text-lg font-bold text-[var(--design-ink)] mt-2 group-hover:text-[var(--design-sapphire)] transition">
                            {family.name}
                          </h3>
                        </div>

                        <DonutChart
                          mastered={mastered}
                          encountered={encountered}
                          explored={explored}
                          unexplored={unexplored}
                          size={44}
                        />
                      </div>

                      <p className="text-sm text-[var(--design-ink-muted)] line-clamp-2 leading-relaxed">
                        {family.phonetic_rule}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {previewWords.map((w) => (
                          <span
                            key={w.id}
                            className="px-2 py-0.5 rounded-lg bg-[var(--design-well)] text-[11px] design-mono text-[var(--design-ink)]"
                          >
                            {w.english_cognate} →{" "}
                            <span className="text-[var(--design-sapphire)] font-semibold">
                              {w.target_word}
                            </span>
                          </span>
                        ))}
                        {words.length > 3 && (
                          <span className="text-[11px] design-mono text-[var(--design-ink-muted)] self-center">
                            +{words.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[var(--design-border)] flex items-center justify-between text-xs design-mono text-[var(--design-ink-muted)]">
                      <span>
                        {mastered + encountered}/{words.length} known
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-[var(--design-sapphire)] group-hover:translate-x-0.5 transition">
                        <span>Explore</span>
                        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </DesignFrame>
  );
}
