"use client";

import { useState } from "react";
import {
  Clock,
  Layers,
  Sparkles,
  Flame,
  CheckCircle2,
  HelpCircle,
  Globe,
  ArrowRight,
  Headphones,
  Star,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from "lucide-react";
import { GenderGuideBanner } from "@/components/common/GenderGuideBanner";
import { SESSION_SIZES, ALL_FAMILIES_ID as ALL_ID, type LearnedFilter } from "@/lib/review-decks";
import { useCourseRecommendation } from "@/lib/use-course-recommendation";
import type { ReviewController } from "./use-review-controller";
import { ReviewCardManagement } from "./ReviewCardManagement";

export function ReviewDeckSelector({ controller }: { controller: ReviewController }) {
  const {
    activeLanguageId,
    openLesson,
    dueCount,
    requestDeckStart,
    hasAnyCards,
    hasSeenGenderIntro,
    learnedFilter,
    setLearnedFilter,
    sessionSize,
    setSessionSize,
    shuffleSession,
    setShuffleSession,
    familyNoun,
    selectedShiftId,
    setSelectedShiftId,
    allFamilyWordIds,
    atlasFamilies,
    selectedShiftFamily,
    shiftCount,
    selectedDomainId,
    setSelectedDomainId,
    data,
    domainGroups,
    domainCount,
    weakestCount,
    recentCount,
    compoundExamples,
    trapExamples,
    compoundCount,
    language,
    sentenceCount,
    articleCount,
    listeningCount,
    starredCount,
    everythingTotal,
    learnedCount,
    dailyBudget,
    dailyCapOverridden,
    overrideDailyCap,
  } = controller;

  const [showAllDecks, setShowAllDecks] = useState(false);
  const { nextLesson } = useCourseRecommendation(activeLanguageId);
  const capBlocking = dailyBudget.capReached && !dailyCapOverridden;

  return (
    <div className="space-y-6">
      {/* Daily Review Cap Banner */}
      <div className="p-4 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-[var(--text-color)]">
              Daily budget ({dailyBudget.dailyMinutes} min/day):
            </span>
            <span className={capBlocking ? "text-[var(--main-color)] font-bold" : "text-[var(--sub-color)]"}>
              {dailyBudget.reviewedToday} / {dailyBudget.dailyCap} cards today
            </span>
          </div>
          {capBlocking && (
            <p className="text-[var(--sub-color)]">
              You hit today&apos;s review cap — great stopping point to let memories consolidate, or keep going if you want extra practice.
            </p>
          )}
          {dailyCapOverridden && dailyBudget.capReached && (
            <p className="text-[var(--main-color)]">
              Daily cap overridden for this session — extra reviews unlocked.
            </p>
          )}
        </div>
        {capBlocking && (
          <button
            type="button"
            onClick={overrideDailyCap}
            className="shrink-0 min-h-10 px-4 py-1.5 rounded-lg bg-[var(--bg-color)] border border-[var(--main-color)]/40 text-[var(--main-color)] hover:bg-[var(--main-color)]/10 font-bold transition cursor-pointer"
          >
            Keep going anyway
          </button>
        )}
      </div>

      {/* Primary Default Decks: Due today + Weak words */}
      <section aria-label="Primary review decks" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Deck 1: Due Today */}
        <div className="p-6 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/35 hover:border-[var(--main-color)]/60 transition flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[var(--main-color)]" />
              <h3 className="text-lg font-bold font-sans text-[var(--text-color)]">Due today</h3>
              <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/30">
                {dueCount} cards
              </span>
            </div>
            <p className="text-sm font-sans text-[var(--sub-color)]">
              {dueCount === 0
                ? "nothing due right now — words you meet today join this queue tomorrow."
                : "cards come back right before you'd forget them — sooner when hard, later when easy."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => requestDeckStart("due")}
            disabled={dueCount === 0 || capBlocking}
            className={`w-full sm:w-auto self-start px-5 py-2.5 rounded-lg font-mono font-bold text-xs transition ${
              dueCount > 0 && !capBlocking
                ? "bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] cursor-pointer"
                : "bg-[var(--bg-color)] text-[var(--sub-color)] opacity-40 cursor-not-allowed border border-[var(--sub-color)]/20"
            }`}
          >
            {capBlocking ? "daily cap reached" : dueCount > 0 ? "start due review" : "no due reviews"}
          </button>
        </div>

        {/* Deck 2: Weak Words */}
        <div className="p-6 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 hover:border-[var(--main-color)]/40 transition flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[var(--error-color)]" />
              <h3 className="text-lg font-bold font-sans text-[var(--text-color)]">Weak words</h3>
              <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[var(--error-color)]/10 text-[var(--error-color)] border border-[var(--error-color)]/30">
                {weakestCount} cards
              </span>
            </div>
            <p className="text-sm font-sans text-[var(--sub-color)]">
              {weakestCount > 0
                ? "words you forgot or only guessed, ordered hardest first."
                : "no weak words yet — they appear here after a miss or a guess."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => requestDeckStart("weakest")}
            disabled={weakestCount === 0 || capBlocking}
            className={`w-full sm:w-auto self-start px-5 py-2.5 rounded-lg font-mono font-bold text-xs transition ${
              weakestCount > 0 && !capBlocking
                ? "bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 border border-[var(--main-color)]/40 text-[var(--text-color)] hover:text-[var(--main-color)] cursor-pointer"
                : "bg-[var(--bg-color)] text-[var(--sub-color)] opacity-40 cursor-not-allowed border border-[var(--sub-color)]/20"
            }`}
          >
            {capBlocking ? "daily cap reached" : weakestCount > 0 ? "practise weak words" : "no weak words"}
          </button>
        </div>
      </section>

      {/* Continue lesson banner */}
      {nextLesson && (
        <div className="rounded-lg border border-[var(--sub-color)]/20 bg-[var(--sub-alt-color)] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h2 className="text-sm font-semibold text-[var(--text-color)]">Continue your lesson</h2>
            <p className="text-sm text-[var(--sub-color)]">{nextLesson.title}</p>
          </div>
          <button
            type="button"
            onClick={() => openLesson(activeLanguageId, nextLesson.id)}
            className="inline-flex min-h-11 items-center gap-2 rounded bg-[var(--main-color)] px-4 text-sm font-bold text-[var(--bg-color)] hover:opacity-90 transition cursor-pointer"
          >
            {!hasAnyCards && nextLesson.id === 1 ? "Start lesson 1" : "Continue lesson"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Gender guide after the due action; compact-only once dismissed. */}
      {hasAnyCards && !hasSeenGenderIntro && <GenderGuideBanner />}
      <ReviewCardManagement controller={controller} />

      <fieldset className="flex flex-wrap items-center gap-2 rounded-lg border border-[var(--sub-color)]/20 p-4">
        <legend className="px-1 text-sm font-semibold">Review session length</legend>
        {SESSION_SIZES.map((size) => (
          <button
            key={size}
            type="button"
            aria-pressed={sessionSize === size}
            onClick={() => setSessionSize(size)}
            className={`min-h-11 rounded border px-4 text-sm cursor-pointer ${
              sessionSize === size
                ? "border-[var(--main-color)] bg-[var(--main-color)] text-[var(--bg-color)]"
                : "border-[var(--sub-color)]/30 text-[var(--text-color)]"
            }`}
          >
            {size === 0 ? "All" : size}
          </button>
        ))}
        <p className="w-full text-sm text-[var(--sub-color)]">
          Applies to every vocabulary deck. The separate failed-sentence process queue has its own 15-item cap.
        </p>
      </fieldset>

      {/* Expandable Secondary Decks Toggle */}
      <div className="space-y-4">
        <button
          type="button"
          aria-expanded={showAllDecks}
          onClick={() => setShowAllDecks((prev) => !prev)}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[var(--sub-color)]/25 bg-[var(--sub-alt-color)] px-4 py-2 text-sm font-mono font-semibold text-[var(--text-color)] hover:border-[var(--main-color)] hover:text-[var(--main-color)] transition cursor-pointer"
        >
          {showAllDecks ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          <span>{showAllDecks ? "Hide extra decks" : "Show all decks"}</span>
        </button>

        {showAllDecks && (
          <div className="space-y-4">
            {/* Scope & shuffle for the open-ended decks */}
            <div className="p-4 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 flex flex-col lg:flex-row lg:items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[var(--sub-color)]">which words</span>
                {(
                  [
                    ["all", "all"],
                    ["learned", "learned"],
                    ["new", "not yet learned"],
                  ] as Array<[LearnedFilter, string]>
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={learnedFilter === id}
                    onClick={() => setLearnedFilter(id)}
                    className={`min-h-11 px-3 py-1 rounded-lg border transition cursor-pointer ${
                      learnedFilter === id
                        ? "bg-[var(--main-color)] text-[var(--bg-color)] border-[var(--main-color)] font-bold"
                        : "bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--sub-color)]/20 hover:border-[var(--main-color)]/40"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <label className="flex items-center gap-1.5 ml-2 text-[var(--text-color)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shuffleSession}
                    onChange={(e) => setShuffleSession(e.target.checked)}
                    className="accent-[var(--main-color)]"
                  />
                  shuffle
                </label>
              </div>
              <p className="text-[var(--sub-color)] lg:ml-auto">
                word scope applies to {familyNoun}, domain and everything; session length applies to all decks.
              </p>
            </div>

            {/* Secondary Decks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Learned Words Deck */}
              <div className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-3 flex flex-col justify-between hover:border-[var(--main-color)]/30 transition">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[var(--main-color)]">
                    <BookOpen className="w-4 h-4" />
                    <h4 className="text-sm font-bold font-sans text-[var(--text-color)]">Learned words</h4>
                  </div>
                  <p className="text-sm font-sans text-[var(--sub-color)]">
                    review everything you have met in completed lessons or previous review sessions.
                  </p>
                  <div className="text-xs font-mono text-[var(--main-color)] pt-1">
                    {learnedCount ? `${learnedCount} learned words` : "finish a lesson to unlock"}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => requestDeckStart("learned")}
                  disabled={learnedCount === 0 || capBlocking}
                  className="w-full py-2 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 border border-[var(--sub-color)]/20 text-xs font-mono font-bold text-[var(--text-color)] hover:text-[var(--main-color)] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {capBlocking ? "daily cap reached" : "review learned words"}
                </button>
              </div>

              {/* My Words (Starred) Deck */}
              <div className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/35 space-y-3 flex flex-col justify-between hover:border-[var(--main-color)]/60 transition">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[var(--main-color)]">
                    <Star className="w-4 h-4" />
                    <h4 className="text-sm font-bold font-sans text-[var(--text-color)]">My words (starred)</h4>
                  </div>
                  <p className="text-sm font-sans text-[var(--sub-color)]">
                    words you starred in dictionary drawers or review sessions.
                  </p>
                  <div className="text-xs font-mono text-[var(--main-color)] pt-1">
                    {starredCount > 0 ? `${starredCount} starred words` : "star any word to add it here"}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => requestDeckStart("starred")}
                  disabled={starredCount === 0 || capBlocking}
                  className="w-full py-2 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 border border-[var(--main-color)]/30 text-xs font-mono font-bold text-[var(--main-color)] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {capBlocking ? "daily cap reached" : "review my words"}
                </button>
              </div>

              {/* Listening Review Deck */}
              <div className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/35 space-y-3 flex flex-col justify-between hover:border-[var(--main-color)]/60 transition">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[var(--main-color)]">
                    <Headphones className="w-4 h-4" />
                    <h4 className="text-sm font-bold font-sans text-[var(--text-color)]">Listening review</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/30">
                      audio first
                    </span>
                  </div>
                  <p className="text-sm font-sans text-[var(--sub-color)]">
                    hear spoken {language.name.toLowerCase()} words first and recall their spelling and meaning before revealing.
                  </p>
                  <div className="text-xs font-mono text-[var(--main-color)] pt-1">
                    {listeningCount} words ready
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => requestDeckStart("listening")}
                  disabled={listeningCount === 0 || capBlocking}
                  className="w-full py-2 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 border border-[var(--main-color)]/30 text-xs font-mono font-bold text-[var(--main-color)] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {capBlocking ? "daily cap reached" : "start listening"}
                </button>
              </div>

              {/* By Shift Deck */}
              <div className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-3 flex flex-col justify-between hover:border-[var(--main-color)]/30 transition">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[var(--main-color)]">
                    <Layers className="w-4 h-4" />
                    <h4 className="text-sm font-bold font-sans text-[var(--text-color)]">By {familyNoun}</h4>
                  </div>
                  <p className="text-sm font-sans text-[var(--sub-color)] leading-relaxed">
                    review all words belonging to a single {familyNoun} — or every family at once.
                  </p>

                  <select
                    value={selectedShiftId}
                    onChange={(e) => setSelectedShiftId(e.target.value)}
                    aria-label={`Choose a ${familyNoun} to review`}
                    className="min-h-11 w-full mt-2 px-3 py-1.5 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 text-xs font-mono text-[var(--text-color)] outline-none"
                  >
                    <option value={ALL_ID}>
                      All families ({allFamilyWordIds.length} words)
                    </option>
                    {atlasFamilies.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.symbol} — {s.name} ({s.word_ids.length})
                      </option>
                    ))}
                  </select>
                  <div className="text-[11px] font-mono text-[var(--main-color)]">
                    {selectedShiftId === ALL_ID
                      ? `all ${atlasFamilies.length} families selected`
                      : `${selectedShiftFamily?.phonetic_rule ?? ""}`}
                  </div>
                  <div className="text-[11px] font-mono text-[var(--sub-color)]">
                    {shiftCount} {learnedFilter === "all" ? "" : learnedFilter === "new" ? "unlearned " : "learned "}words in scope
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => requestDeckStart("shift")}
                  disabled={shiftCount === 0 || capBlocking}
                  className="w-full py-2 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 border border-[var(--sub-color)]/20 text-xs font-mono font-bold text-[var(--text-color)] hover:text-[var(--main-color)] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {capBlocking ? "daily cap reached" : `review ${familyNoun}`}
                </button>
              </div>

              {/* Thematic Domain Deck */}
              <div className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-3 flex flex-col justify-between hover:border-[var(--main-color)]/30 transition">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[var(--main-color)]">
                    <Sparkles className="w-4 h-4" />
                    <h4 className="text-sm font-bold font-sans text-[var(--text-color)]">By domain</h4>
                  </div>
                  <p className="text-sm font-sans text-[var(--sub-color)]">
                    themed decks from the full compendium — new words appear here even before you meet them in a lesson.
                  </p>

                  <select
                    value={selectedDomainId}
                    onChange={(e) => setSelectedDomainId(e.target.value)}
                    aria-label="Choose a thematic domain to review"
                    className="min-h-11 w-full mt-2 px-3 py-1.5 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 text-xs font-mono text-[var(--text-color)] outline-none"
                  >
                    <option value={ALL_ID}>All domains ({data.wordList.length} words)</option>
                    {domainGroups.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.label} ({g.words.length} words)
                      </option>
                    ))}
                  </select>
                  <div className="text-[11px] font-mono text-[var(--sub-color)]">
                    {domainCount} {learnedFilter === "all" ? "" : learnedFilter === "new" ? "unlearned " : "learned "}words in scope
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => requestDeckStart("domain")}
                  disabled={domainCount === 0 || capBlocking}
                  className="w-full py-2 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 border border-[var(--sub-color)]/20 text-xs font-mono font-bold text-[var(--text-color)] hover:text-[var(--main-color)] transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {capBlocking ? "daily cap reached" : "review domain"}
                </button>
              </div>

              {/* Recent Lessons Deck */}
              <div className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-3 flex flex-col justify-between hover:border-[var(--main-color)]/30 transition">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[var(--main-color)]">
                    <CheckCircle2 className="w-4 h-4" />
                    <h4 className="text-sm font-bold font-sans text-[var(--text-color)]">Recent lessons</h4>
                  </div>
                  <p className="text-sm font-sans text-[var(--sub-color)]">
                    words from the last three trail lessons you completed, newest first.
                  </p>
                  <div className="text-xs font-mono text-[var(--main-color)] pt-1">
                    {recentCount > 0 ? `${recentCount} words` : "finish a lesson to unlock"}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => requestDeckStart("recent")}
                  disabled={recentCount === 0 || capBlocking}
                  className="w-full py-2 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 border border-[var(--sub-color)]/20 text-xs font-mono font-bold text-[var(--text-color)] hover:text-[var(--main-color)] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {capBlocking ? "daily cap reached" : "review recent"}
                </button>
              </div>

              {/* Compound Calques & Traps Deck */}
              <div className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-3 flex flex-col justify-between hover:border-[var(--main-color)]/30 transition">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[var(--sub-color)]">
                    <Sparkles className="w-4 h-4" />
                    <h4 className="text-sm font-bold font-sans text-[var(--text-color)]">Compounds &amp; traps</h4>
                  </div>
                  <p className="text-sm font-sans text-[var(--sub-color)] leading-relaxed">
                    review literal calques ({compoundExamples}) and false friends ({trapExamples}).
                  </p>
                  <div className="text-sm font-mono text-[var(--sub-color)] pt-1">
                    {compoundCount} items
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => requestDeckStart("compounds")}
                  disabled={compoundCount === 0 || capBlocking}
                  className="w-full py-2 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 border border-[var(--sub-color)]/20 text-xs font-mono font-bold text-[var(--text-color)] hover:text-[var(--main-color)] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {capBlocking ? "daily cap reached" : "review compounds"}
                </button>
              </div>

              {/* Sentence Patterns SRS Deck */}
              <div className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/35 space-y-3 flex flex-col justify-between hover:border-[var(--main-color)]/60 transition">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[var(--main-color)]">
                    <Layers className="w-4 h-4" />
                    <h4 className="text-sm font-bold font-sans text-[var(--text-color)]">Sentence patterns</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/30">
                      full clauses
                    </span>
                  </div>
                  <p className="text-sm font-sans text-[var(--sub-color)]">
                    spaced repetition for full {language.name.toLowerCase()} sentences from every trail lesson — practice word order, brackets, and pronouns in context.
                  </p>
                  <div className="text-xs font-mono text-[var(--main-color)] pt-1">
                    {sentenceCount} sentences in scope
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => requestDeckStart("sentences")}
                  disabled={sentenceCount === 0 || capBlocking}
                  className="w-full py-2 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 border border-[var(--main-color)]/30 text-xs font-mono font-bold text-[var(--main-color)] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {capBlocking ? "daily cap reached" : "review sentences"}
                </button>
              </div>

              {/* Article & Gender MCQ Drill Deck */}
              <div className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/35 space-y-3 flex flex-col justify-between hover:border-[var(--main-color)]/60 transition">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[var(--main-color)]">
                    <HelpCircle className="w-4 h-4" />
                    <h4 className="text-sm font-bold font-sans text-[var(--text-color)]">Article &amp; gender drill</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/30">
                      mcq only
                    </span>
                  </div>
                  <p className="text-sm font-sans text-[var(--sub-color)]">
                    choose the right definite article ({language.genderSystem ? language.genderSystem.articles.join(" / ") : "article"}) in sentence-context clozes and noun drills.
                  </p>
                  <div className="text-xs font-mono text-[var(--main-color)] pt-1">
                    {articleCount} nouns in scope
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => requestDeckStart("articles")}
                  disabled={articleCount === 0 || capBlocking}
                  className="w-full py-2 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 border border-[var(--main-color)]/30 text-xs font-mono font-bold text-[var(--main-color)] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {capBlocking ? "daily cap reached" : "start article mcq"}
                </button>
              </div>

              {/* Everything Deck */}
              <div className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/40 space-y-3 flex flex-col justify-between transition">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[var(--main-color)]">
                    <Globe className="w-4 h-4" />
                    <h4 className="text-sm font-bold font-sans text-[var(--text-color)]">Everything</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/30">
                      full run
                    </span>
                  </div>
                  <p className="text-sm font-sans text-[var(--sub-color)]">
                    every word in every family and domain, plus compounds, false friends, sentence patterns, and article drills (each card automatically uses its supported review modes).
                  </p>
                  <div className="text-xs font-mono text-[var(--main-color)] pt-1">
                    {everythingTotal} cards
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => requestDeckStart("everything")}
                  disabled={everythingTotal === 0 || capBlocking}
                  className="w-full py-2 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] text-xs font-mono font-bold transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {capBlocking ? "daily cap reached" : "review everything"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
