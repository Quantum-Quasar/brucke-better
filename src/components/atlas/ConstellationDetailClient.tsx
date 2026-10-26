"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Info, Search } from "lucide-react";
import { ConstellationWeb } from "@/components/atlas/ConstellationWeb";
import { BranchDrillModal } from "@/components/atlas/BranchDrillModal";
import { ShiftPair } from "@/components/common/ShiftPair";
import { useAppStore } from "@/lib/store";
import { getLanguageDefinition } from "@/data/languages";
import { useCompendium } from "@/lib/content-client";
import { getAtlasFamily, UNSHIFTED_FAMILY_ID } from "@/lib/atlas-families";
import type { ShiftFamily } from "@/lib/types";

interface ConstellationDetailClientProps {
  familyId: string;
  /**
   * Language ids whose compendium defines this family id, computed on the
   * server. The route is prerendered with the default language active, so a
   * family belonging to another atlas must still render a real page.
   */
  ownerLanguageIds: string[];
  /**
   * The owning family's identity, resolved on the server. The compendium JSON
   * is fetched on the client, so without this the prerendered HTML for a
   * family page was a loading skeleton with no heading or description.
   */
  serverFamily?: { symbol: string; name: string; phonetic_rule: string };
}

export function ConstellationDetailClient({
  familyId,
  ownerLanguageIds,
  serverFamily,
}: ConstellationDetailClientProps) {
  const [isDrillOpen, setIsDrillOpen] = useState(false);
  const [rosterQuery, setRosterQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(60);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const setActiveLanguage = useAppStore((s) => s.setActiveLanguage);
  // A shared family URL may belong to another course. When the active course
  // owns it we reuse the same compendium (the loader dedupes); otherwise fetch
  // the owning course so the fallback preview is real.
  const ownerLanguageId = ownerLanguageIds.includes(activeLanguageId)
    ? activeLanguageId
    : ownerLanguageIds[0] ?? activeLanguageId;
  const activeCompendium = useCompendium(activeLanguageId);
  const ownerCompendium = useCompendium(ownerLanguageId);

  if (activeCompendium.error || ownerCompendium.error) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4 font-mono" role="alert">
        <p className="text-sm text-[var(--sub-color)]">atlas data could not be loaded.</p>
        <button
          type="button"
          onClick={() => {
            activeCompendium.retry();
            ownerCompendium.retry();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-xs"
        >
          <Info className="w-3.5 h-3.5" /> retry
        </button>
      </div>
    );
  }

  if (!activeCompendium.data || !ownerCompendium.data) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 font-sans">
        <div className="space-y-2">
          <Link
            href="/atlas"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> back to atlas
          </Link>
          {serverFamily && (
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[var(--main-color)] font-bold px-2 py-0.5 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25">
                  {serverFamily.symbol}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-color)] tracking-tight">
                  {serverFamily.name}
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-[var(--sub-color)] mt-0.5 font-mono">
                {serverFamily.phonetic_rule}
              </p>
            </div>
          )}
        </div>
        <div className="max-w-xl mx-auto py-10 text-center font-mono" role="status">
          <p className="text-sm text-[var(--sub-color)]">loading constellation…</p>
        </div>
      </div>
    );
  }

  const data = activeCompendium.data;
  const family: ShiftFamily | undefined = getAtlasFamily(data, familyId || "");

  if (!family) {
    // The active atlas does not own this route. Show the owning language's
    // family metadata and offer to switch, so a shared URL (or a prerendered
    // page for another atlas) is never a dead end.
    const ownerLanguage = getLanguageDefinition(ownerLanguageId);
    const ownerData = ownerCompendium.data;
    const ownerFamily = getAtlasFamily(ownerData, familyId);
    const ownerWords = ownerFamily
      ? ownerFamily.word_ids
          .map((id) => ownerData.words[id])
          .filter(Boolean)
          .slice(0, 6)
      : [];

    return (
      <div className="max-w-2xl mx-auto px-4 py-16 space-y-6 font-sans">
        <Link
          href="/atlas"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> back to atlas
        </Link>

        {ownerFamily && ownerLanguage ? (
          <>
            <div className="space-y-2">
              <span className="inline-block text-xs font-mono text-[var(--main-color)] font-bold px-2 py-0.5 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25">
                {ownerFamily.symbol}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-color)] tracking-tight">
                {ownerFamily.name}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--sub-color)] font-mono">{ownerFamily.phonetic_rule}</p>
            </div>

            <p className="text-xs text-[var(--text-color)]/80 leading-relaxed">
              This sound shift belongs to the {ownerLanguage.name} atlas.{" "}
              {ownerLanguage.nativeName} is a different branch of the same cognate engine, so its families live
              in their own atlas rather than in the one currently open.
            </p>

            {ownerWords.length > 0 && (
              <div className="p-4 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--main-color)] font-semibold">
                  <BookOpen className="w-3.5 h-3.5" /> sample from the {ownerLanguage.name} atlas
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-mono">
                  {ownerWords.map((w) => (
                    <li key={w.id} className="flex items-center justify-between gap-2">
                      <span className="text-[var(--sub-color)] truncate">{w.english_cognate}</span>
                      <span aria-hidden="true" className="text-[var(--sub-color)]/60">
                        →
                      </span>
                      <span className="text-[var(--text-color)] font-semibold truncate">
                        {w.gender ? `${w.gender} ${w.target_word}` : w.target_word}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] font-mono text-[var(--sub-color)]">
                  {ownerFamily.word_ids.length} words in this {ownerLanguage.name} family.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setActiveLanguage(ownerLanguageId)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-xs font-mono cursor-pointer hover:opacity-90 transition"
            >
              switch to the {ownerLanguage.name} atlas
            </button>
          </>
        ) : (
          <div className="space-y-3">
            <h1 className="text-xl font-bold text-[var(--text-color)]">Atlas family unavailable</h1>
            <p className="text-xs font-mono text-[var(--sub-color)]">
              No authored course defines this shift family on this route.
            </p>
            <Link
              href="/atlas"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-xs font-mono"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Atlas
            </Link>
          </div>
        )}
      </div>
    );
  }

  const words = family.word_ids.map((id) => data.words[id]).filter(Boolean);
  // Keep the default roster small, but let the learner search the family and
  // load it in batches instead of mounting hundreds of cards at once.
  const rosterQueryText = rosterQuery.trim().toLowerCase();
  const filteredWords = rosterQueryText
    ? words.filter(
        (word) =>
          word.english_cognate.toLowerCase().includes(rosterQueryText) ||
          word.target_word.toLowerCase().includes(rosterQueryText)
      )
    : words;
  const rosterWords = filteredWords.slice(0, visibleCount);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 font-sans">
      {/* Header & Back Link */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Link
            href="/atlas"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> back to atlas
          </Link>
          <span className="text-xs font-mono text-[var(--main-color)] font-bold px-2 py-0.5 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25">
            {family.symbol}
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-color)] tracking-tight">
            {family.name}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--sub-color)] mt-0.5 font-mono">{family.phonetic_rule}</p>
        </div>
      </div>

      {/* Web Constellation (Desktop) & List (Mobile) */}
      <ConstellationWeb family={family} data={data} onPracticeBranch={() => setIsDrillOpen(true)} />

      {/* Philological & Historical Linguistics Deep-Dive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--main-color)] font-semibold">
            <Info className="w-3.5 h-3.5" /> historical linguistics
          </div>
          <p className="text-xs text-[var(--text-color)]/80 leading-relaxed">{family.historical_linguistics}</p>
          <p className="text-xs text-[var(--sub-color)] leading-relaxed pt-1">{family.philological_note}</p>
        </div>

        <div className="p-4 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--main-color)] font-semibold">
            <BookOpen className="w-3.5 h-3.5" /> literature reference
          </div>
          <p className="text-xs text-[var(--text-color)]/80 leading-relaxed">{family.literature_source}</p>
          <div className="pt-2 border-t border-[var(--sub-color)]/15">
            <span className="text-[11px] font-mono text-[var(--sub-color)]">
              {family.id === UNSHIFTED_FAMILY_ID
                ? `${words.length} dictionary words outside the shift families.`
                : `${words.length} vocabulary roots participating in this sound shift.`}
            </span>
          </div>
        </div>
      </div>

      {/* Full Word Roster */}
      <div className="space-y-3 pt-2">
        <h2 className="text-base font-bold text-[var(--text-color)] flex items-center justify-between font-mono">
          <span>Participating Vocabulary</span>
          <span className="text-xs text-[var(--sub-color)] font-normal">{words.length} words</span>
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-3.5 h-3.5 text-[var(--sub-color)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={rosterQuery}
              onChange={(event) => {
                setRosterQuery(event.target.value);
                setVisibleCount(60);
              }}
              placeholder={`Filter ${words.length} words...`}
              className="w-full pl-9 pr-3 py-1.5 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 text-xs text-[var(--text-color)] placeholder-[var(--sub-color)] outline-none focus:border-[var(--main-color)] transition font-mono"
            />
          </div>
          <span className="text-[11px] font-mono text-[var(--sub-color)]">
            {filteredWords.length} {filteredWords.length === 1 ? "word" : "words"}
          </span>
          {filteredWords.length > visibleCount && (
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + 60)}
              className="px-3 py-1.5 rounded bg-[var(--sub-alt-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/20 text-[var(--text-color)] hover:text-[var(--main-color)] transition cursor-pointer text-[11px] font-mono"
            >
              show 60 more
            </button>
          )}
          {visibleCount > 60 && (
            <button
              type="button"
              onClick={() => setVisibleCount(60)}
              className="px-3 py-1.5 rounded bg-[var(--sub-alt-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/20 text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer text-[11px] font-mono"
            >
              show first 60
            </button>
          )}
        </div>

        {filteredWords.length === 0 && (
          <p className="text-xs font-mono text-[var(--sub-color)] py-4 text-center">
            No words match “{rosterQuery}”.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {rosterWords.map((w) => (
            <div
              key={w.id}
              className="p-2.5 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20"
            >
              <ShiftPair
                english={w.english_cognate}
                german={w.target_word}
                gender={w.gender}
                rule={w.shift_rule}
                wordId={w.id}
                className="w-full justify-between"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 5-Question Branch Practice Drill Modal */}
      <BranchDrillModal
        family={family}
        data={data}
        isOpen={isDrillOpen}
        onClose={() => setIsDrillOpen(false)}
      />
    </div>
  );
}
