"use client";

import { Clock, Layers, Sparkles, Flame, CheckCircle2, HelpCircle, Globe, ArrowRight } from "lucide-react";
import { GenderGuideBanner } from "@/components/common/GenderGuideBanner";
import { SESSION_SIZES, ALL_FAMILIES_ID as ALL_ID, type LearnedFilter } from "@/lib/review-decks";
import { useCourseRecommendation } from "@/lib/use-course-recommendation";
import type { ReviewController } from "./use-review-controller";

export function ReviewDeckSelector({ controller }: { controller: ReviewController }) {
  const { activeLanguageId, openLesson, dueCount, requestDeckStart, hasAnyCards, hasSeenGenderIntro, learnedFilter, setLearnedFilter, sessionSize, setSessionSize, shuffleSession, setShuffleSession, familyNoun, selectedShiftId, setSelectedShiftId, allFamilyWordIds, atlasFamilies, selectedShiftFamily, shiftCount, selectedDomainId, setSelectedDomainId, data, domainGroups, domainCount, weakestCount, recentCount, compoundExamples, trapExamples, compoundCount, language, sentenceCount, articleCount, everythingTotal } = controller;
  const { learnedCount } = controller;
  const { nextLesson } = useCourseRecommendation(activeLanguageId);
  return (
          <div className="space-y-6">
            <section aria-label="Your next practice" className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-[var(--main-color)]/30 bg-[var(--sub-alt-color)] p-4 space-y-3">
                <h2 className="font-semibold text-[var(--text-color)]">Continue your lesson</h2>
                <p className="text-sm text-[var(--sub-color)]">{nextLesson?.title ?? "You’re caught up with your recommendations."}</p>
                <button type="button" disabled={!nextLesson} onClick={() => { if (nextLesson) openLesson(activeLanguageId, nextLesson.id); }} className="inline-flex min-h-11 items-center gap-2 rounded bg-[var(--main-color)] px-3 text-sm font-bold text-[var(--bg-color)] disabled:opacity-40">
                  {!hasAnyCards && nextLesson?.id === 1 ? "Start lesson 1" : "Continue lesson"}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="rounded-lg border border-[var(--sub-color)]/20 bg-[var(--sub-alt-color)] p-4 space-y-3">
                <h2 className="font-semibold text-[var(--text-color)]">Review what you learned</h2>
                <p className="text-sm text-[var(--sub-color)]">{learnedCount ? `${learnedCount} learned words · up to 20 per session` : "Finish a lesson to add your first words."}</p>
                <button type="button" disabled={learnedCount === 0} onClick={() => requestDeckStart("learned")} className="min-h-11 rounded border border-[var(--sub-color)]/30 px-3 text-sm font-semibold text-[var(--text-color)] hover:border-[var(--main-color)] disabled:opacity-40">Review learned words</button>
              </div>
              <div className="rounded-lg border border-[var(--sub-color)]/20 bg-[var(--sub-alt-color)] p-4 space-y-3">
                <h2 className="font-semibold text-[var(--text-color)]">Your difficult words</h2>
                <p className="text-sm text-[var(--sub-color)]">{weakestCount ? `${weakestCount} forgotten or guessed words` : "No difficult words yet. They’ll appear after a miss or a guess."}</p>
                <button type="button" disabled={weakestCount === 0} onClick={() => requestDeckStart("weakest")} className="min-h-11 rounded border border-[var(--sub-color)]/30 px-3 text-sm font-semibold text-[var(--text-color)] hover:border-[var(--main-color)] disabled:opacity-40">Practise difficult words</button>
              </div>
            </section>
          {/* Deck 1: Due Today */}
          <div className="p-6 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 hover:border-[var(--main-color)]/40 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--main-color)]" />
                <h3 className="text-lg font-bold font-mono text-[var(--text-color)]">due today</h3>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/30">
                  {dueCount} cards
                </span>
              </div>
              <p className="text-sm font-mono text-[var(--sub-color)]">
                {dueCount === 0
                  ? "nothing due right now — words you meet today join this queue tomorrow."
                  : "cards come back right before you'd forget them — sooner when hard, later when easy."}
              </p>
            </div>

            <button
              onClick={() => requestDeckStart("due")}
              disabled={dueCount === 0}
              className={`px-5 py-2.5 rounded-lg font-mono font-bold text-xs transition ${
                dueCount > 0
                  ? "bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] cursor-pointer"
                  : "bg-[var(--bg-color)] text-[var(--sub-color)] opacity-40 cursor-not-allowed border border-[var(--sub-color)]/20"
              }`}
            >
              {dueCount > 0 ? "start due review" : "no due reviews"}
            </button>
          </div>

          {/* Gender guide after the due action; compact-only once dismissed. */}
          {hasAnyCards && !hasSeenGenderIntro && <GenderGuideBanner />}

          <details className="space-y-4">
            <summary className="min-h-11 cursor-pointer text-sm font-semibold text-[var(--text-color)]">More practice options</summary>
          {/* Scope & session size for the open-ended decks */}
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
              <span className="text-[var(--sub-color)]">session</span>
              {SESSION_SIZES.map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-pressed={sessionSize === n}
                  onClick={() => setSessionSize(n)}
                  className={`min-h-11 px-3 py-1 rounded-lg border transition cursor-pointer ${
                    sessionSize === n
                      ? "bg-[var(--main-color)] text-[var(--bg-color)] border-[var(--main-color)] font-bold"
                      : "bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--sub-color)]/20 hover:border-[var(--main-color)]/40"
                  }`}
                >
                  {n === 0 ? "all" : n}
                </button>
              ))}
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
              applies to {familyNoun}, domain and everything.
            </p>
          </div>

          {/* 5 Secondary Decks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* By Shift Deck */}
            <div className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-3 flex flex-col justify-between hover:border-[var(--main-color)]/30 transition">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--main-color)]">
                  <Layers className="w-4 h-4" />
                  <h4 className="text-sm font-bold font-mono text-[var(--text-color)]">by {familyNoun}</h4>
                </div>
                <p className="text-sm font-mono text-[var(--sub-color)] leading-relaxed">
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
                onClick={() => requestDeckStart("shift")}
                disabled={shiftCount === 0}
                className="w-full py-2 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 border border-[var(--sub-color)]/20 text-xs font-mono font-bold text-[var(--text-color)] hover:text-[var(--main-color)] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                review {familyNoun}
              </button>
            </div>

            {/* Thematic Domain Deck */}
            <div className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-3 flex flex-col justify-between hover:border-[var(--main-color)]/30 transition">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--main-color)]">
                  <Sparkles className="w-4 h-4" />
                  <h4 className="text-sm font-bold font-mono text-[var(--text-color)]">by domain</h4>
                </div>
                <p className="text-sm font-mono text-[var(--sub-color)]">
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
                onClick={() => requestDeckStart("domain")}
                disabled={domainCount === 0}
                className="w-full py-2 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 border border-[var(--sub-color)]/20 text-xs font-mono font-bold text-[var(--text-color)] hover:text-[var(--main-color)] transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                review domain
              </button>
            </div>

            {/* Weakest Words Deck */}
            <div className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-3 flex flex-col justify-between hover:border-[var(--main-color)]/30 transition">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--error-color)]">
                  <Flame className="w-4 h-4" />
                  <h4 className="text-sm font-bold font-mono text-[var(--text-color)]">weakest words</h4>
                </div>
                <p className="text-sm font-mono text-[var(--sub-color)]">
                  words you forgot or only guessed, hardest first.
                </p>
                <div className="text-xs font-mono text-[var(--error-color)] pt-1">
                  {weakestCount} tricky words
                </div>
              </div>

              <button
                onClick={() => requestDeckStart("weakest")}
                disabled={weakestCount === 0}
                className="w-full py-2 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 border border-[var(--sub-color)]/20 text-xs font-mono font-bold text-[var(--text-color)] hover:text-[var(--main-color)] transition disabled:opacity-40 cursor-pointer"
              >
                review weakest
              </button>
            </div>

            {/* Recent Lessons Deck */}
            <div className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-3 flex flex-col justify-between hover:border-[var(--main-color)]/30 transition">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--main-color)]">
                  <CheckCircle2 className="w-4 h-4" />
                  <h4 className="text-sm font-bold font-mono text-[var(--text-color)]">recent lessons</h4>
                </div>
                <p className="text-sm font-mono text-[var(--sub-color)]">
                  words from the last three trail lessons you completed, newest first.
                </p>
                <div className="text-xs font-mono text-[var(--main-color)] pt-1">
                  {recentCount > 0
                    ? `${recentCount} words`
                    : "finish a lesson to unlock"}
                </div>
              </div>

              <button
                onClick={() => requestDeckStart("recent")}
                disabled={recentCount === 0}
                className="w-full py-2 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 border border-[var(--sub-color)]/20 text-xs font-mono font-bold text-[var(--text-color)] hover:text-[var(--main-color)] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                review recent
              </button>
            </div>

            {/* Compound Calques & Traps Deck */}
            <div className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-3 flex flex-col justify-between hover:border-[var(--main-color)]/30 transition">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--sub-color)]">
                  <Sparkles className="w-4 h-4" />
                  <h4 className="text-sm font-bold font-mono text-[var(--text-color)]">compounds & traps</h4>
                </div>
                <p className="text-sm font-mono text-[var(--sub-color)] leading-relaxed">
                  review literal calques ({compoundExamples}) and false friends ({trapExamples}).
                </p>
                <div className="text-sm font-mono text-[var(--sub-color)] pt-1">
                  {compoundCount} items
                </div>
              </div>

              <button
                onClick={() => requestDeckStart("compounds")}
                disabled={compoundCount === 0}
                className="w-full py-2 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 border border-[var(--sub-color)]/20 text-xs font-mono font-bold text-[var(--text-color)] hover:text-[var(--main-color)] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                review compounds
              </button>
            </div>

            {/* Sentence Patterns SRS Deck */}
            <div className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/35 space-y-3 flex flex-col justify-between hover:border-[var(--main-color)]/60 transition">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--main-color)]">
                  <Layers className="w-4 h-4" />
                  <h4 className="text-sm font-bold font-mono text-[var(--text-color)]">sentence patterns</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/30">
                    full clauses
                  </span>
                </div>
                <p className="text-sm font-mono text-[var(--sub-color)]">
                  spaced repetition for full {language.name.toLowerCase()} sentences from every trail lesson — practice word order, brackets, and pronouns in context.
                </p>
                <div className="text-xs font-mono text-[var(--main-color)] pt-1">
                  {sentenceCount} sentences in scope
                </div>
              </div>

              <button
                onClick={() => requestDeckStart("sentences")}
                disabled={sentenceCount === 0}
                className="w-full py-2 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 border border-[var(--main-color)]/30 text-xs font-mono font-bold text-[var(--main-color)] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                review sentences
              </button>
            </div>

            {/* Article & Gender MCQ Drill Deck */}
            <div className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/35 space-y-3 flex flex-col justify-between hover:border-[var(--main-color)]/60 transition">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--main-color)]">
                  <HelpCircle className="w-4 h-4" />
                  <h4 className="text-sm font-bold font-mono text-[var(--text-color)]">article &amp; gender drill</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/30">
                    mcq only
                  </span>
                </div>
                <p className="text-sm font-mono text-[var(--sub-color)]">
                  choose the usual singular definite article for a {language.name.toLowerCase()} noun ({language.genderSystem ? language.genderSystem.articles.join(" / ") : "article"}). this drill does not practise articles in sentence context or grammatical cases.
                </p>
                <div className="text-xs font-mono text-[var(--main-color)] pt-1">
                  {articleCount} nouns in scope
                </div>
              </div>

              <button
                onClick={() => requestDeckStart("articles")}
                disabled={articleCount === 0}
                className="w-full py-2 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 border border-[var(--main-color)]/30 text-xs font-mono font-bold text-[var(--main-color)] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                start article mcq
              </button>
            </div>

            {/* Everything Deck */}
            <div className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/40 space-y-3 flex flex-col justify-between transition">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--main-color)]">
                  <Globe className="w-4 h-4" />
                  <h4 className="text-sm font-bold font-mono text-[var(--text-color)]">everything</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/30">
                    full run
                  </span>
                </div>
                <p className="text-sm font-mono text-[var(--sub-color)]">
                  every word in every family and domain, plus compounds, false friends, sentence patterns, and article drills (each card automatically uses its supported review modes).
                </p>
                <div className="text-xs font-mono text-[var(--main-color)] pt-1">
                  {everythingTotal} cards
                </div>
              </div>

              <button
                onClick={() => requestDeckStart("everything")}
                disabled={everythingTotal === 0}
                className="w-full py-2 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] text-xs font-mono font-bold transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                review everything
              </button>
            </div>
          </div>
          </details>
        </div>
  );
}
