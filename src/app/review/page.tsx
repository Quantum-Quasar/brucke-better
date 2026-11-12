"use client";

import { CheckCircle2, Clock, RefreshCw, RotateCcw } from "lucide-react";
import { GenderGuideBanner } from "@/components/common/GenderGuideBanner";
import { useAppStore } from "@/lib/store";
import { useCompendium, useLessonIndex } from "@/lib/content-client";
import type { ReviewMode } from "@/lib/types";
import { useReviewController, type ReviewHubProps } from "@/components/review/use-review-controller";
import { ReviewSessionCard } from "@/components/review/ReviewSessionCard";
import { ReviewDeckSelector } from "@/components/review/ReviewDeckSelector";
import { ReviewStyleDialog } from "@/components/review/ReviewStyleDialog";
import { SentenceReviewDeck } from "@/components/review/SentenceReviewDeck";


export default function ReviewPage() {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const progressResetAt = useAppStore((s) => s.progressResetAt);
  const progressResetActor = useAppStore((s) => s.progressResetActor);
  const storeHydrated = useAppStore((s) => s.storeHydrated);
  const compendium = useCompendium(activeLanguageId);
  const lessonIndex = useLessonIndex(activeLanguageId);

  if (compendium.error || lessonIndex.error) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4 font-mono" role="alert">
        <p className="text-sm text-[var(--sub-color)]">
          review data could not be loaded. check your connection and try again.
        </p>
        <button
          type="button"
          onClick={() => {
            compendium.retry();
            lessonIndex.retry();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" /> retry
        </button>
      </div>
    );
  }

  if (!storeHydrated || !compendium.data || !lessonIndex.data) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center font-mono" role="status">
        <p className="text-sm text-[var(--sub-color)]">loading review data…</p>
      </div>
    );
  }

  return (
    <ReviewHub
      key={`${activeLanguageId}:${progressResetAt}:${progressResetActor}`}
      activeLanguageId={activeLanguageId}
      progressResetAt={progressResetAt}
      progressResetActor={progressResetActor}
      data={compendium.data}
      lessons={lessonIndex.data}
    />
  );
}

function ReviewHub(props: ReviewHubProps) {
  const controller = useReviewController(props);
  const {
    recallSource, mounted, language, activeDeck, hasAnyCards, masteredCount, activeCount, dueCards,
    hasSeenGenderIntro, reviewMode, setReviewMode, setPreferredReviewMode, setIsModeSelectorOpen,
    currentCard, currentWord, sessionComplete, sessionStats, completedDeck, dueCount, weakestCount, startDeck,
  } = controller;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--main-color)] font-semibold">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>spaced repetition</span>
        </div>
        <h1 className="text-2xl font-bold font-mono text-[var(--text-color)] tracking-tight">review</h1>
        <p className="text-[var(--sub-color)] text-sm font-mono">
          recall practice powered by {recallSource} — hard words come back sooner, easy ones later.
        </p>
      </div>


      {language.status !== "available" && (
        <div className="p-8 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-center space-y-3">
          <Clock className="w-8 h-8 text-[var(--main-color)] mx-auto" />
          <h2 className="text-base font-bold font-mono text-[var(--text-color)]">
            review comes with the {language.name.toLowerCase()} trail
          </h2>
          <p className="text-sm font-mono text-[var(--sub-color)] max-w-md mx-auto leading-relaxed">
            spaced repetition unlocks as soon as {language.name} content is authored. switch languages
            from settings — each language keeps its own review queue.
          </p>
        </div>
      )}

      {language.status === "available" && (
      <>
      {!activeDeck && <SentenceReviewDeck languageId={props.activeLanguageId} resetAt={props.progressResetAt} resetActor={props.progressResetActor} data={props.data} />}
      {/* Stats Bar — day zero has its own empty state instead of three zeros */}
      {!activeDeck && hasAnyCards && (
      <div className="p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-6">
          <span className="text-[var(--main-color)] font-bold">{mounted ? masteredCount : 0} mastered</span>
          <span className="text-[var(--sub-color)] font-bold">{mounted ? activeCount : 0} in queue</span>
          <span className="text-[var(--text-color)] font-bold">{mounted ? dueCards.length : 0} due today</span>
        </div>
        <div className="flex items-center gap-4">
          {hasSeenGenderIntro && <GenderGuideBanner compact />}
          <div className="flex items-center gap-2 text-[var(--sub-color)]">
            <span>style:</span>
            <select
              value={reviewMode}
              onChange={(e) => {
                const mode = e.target.value as ReviewMode;
                setReviewMode(mode);
                setPreferredReviewMode(mode);
              }}
              className="min-h-11 bg-[var(--bg-color)] border border-[var(--sub-color)]/25 hover:border-[var(--main-color)] rounded px-2 py-1 font-mono text-[var(--main-color)] outline-none cursor-pointer transition"
              title="Set default review style"
            >
              <option value="flashcard" className="bg-[var(--bg-color)] text-[var(--text-color)]">recall</option>
              <option value="mcq" className="bg-[var(--bg-color)] text-[var(--text-color)]">mcq</option>
              <option value="tiles" className="bg-[var(--bg-color)] text-[var(--text-color)]">tiles</option>
              <option value="typing" className="bg-[var(--bg-color)] text-[var(--text-color)]">typing</option>
            </select>
            <button
              type="button"
              onClick={() => setIsModeSelectorOpen(true)}
              className="ml-1 inline-flex min-h-11 items-center text-[11px] font-mono text-[var(--sub-color)] underline underline-offset-2 hover:text-[var(--main-color)] cursor-pointer"
              title="Select review style"
            >
              change style
            </button>
          </div>
        </div>
      </div>
      )}

      {/* ACTIVE REVIEW SESSION MODAL / CARD */}
      {activeDeck && currentCard && currentWord ? (
        <ReviewSessionCard controller={controller} />

      ) : (
        <>
          {sessionComplete && (
            <section className="p-6 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/40 space-y-4" role="status">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--main-color)] font-semibold">
                <CheckCircle2 className="w-4 h-4" /> review complete
              </div>
              <div>
                <h2 className="text-lg font-bold text-[var(--text-color)]">Nice work — session logged</h2>
                <p className="text-xs text-[var(--sub-color)] mt-1">
                  You completed {sessionStats.reviewed} {sessionStats.reviewed === 1 ? "card" : "cards"} in this session.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/20">
                  <div className="text-lg font-bold text-[var(--main-color)] font-mono">{sessionStats.correct}</div>
                  <div className="text-[10px] font-mono text-[var(--sub-color)]">successful</div>
                </div>
                <div className="p-3 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/20">
                  <div className="text-lg font-bold text-[var(--text-color)] font-mono">{sessionStats.again}</div>
                  <div className="text-[10px] font-mono text-[var(--sub-color)]">again</div>
                </div>
                <div className="p-3 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/20">
                  <div className="text-lg font-bold text-[var(--text-color)] font-mono">{sessionStats.hard + sessionStats.easy}</div>
                  <div className="text-[10px] font-mono text-[var(--sub-color)]">easy/hard</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {completedDeck === "due" && dueCount === 0 ? (
                  <>
                    <span className="text-xs font-mono text-[var(--sub-color)]">
                      All due cards are scheduled. Your next intervals are saved.
                    </span>
                    {weakestCount > 0 && (
                      <button
                        type="button"
                        onClick={() => startDeck("weakest")}
                        className="px-4 py-2 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-xs font-mono hover:opacity-90 transition"
                      >
                        review weakest instead
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      disabled={!completedDeck}
                      onClick={() => {
                        if (completedDeck) startDeck(completedDeck);
                      }}
                      className="px-4 py-2 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-xs font-mono hover:opacity-90 transition disabled:opacity-40"
                    >
                      review again
                    </button>
                    <span className="text-[11px] font-mono text-[var(--sub-color)]">
                      Your next intervals are saved automatically.
                    </span>
                  </>
                )}
              </div>
            </section>
          )}

          {/* DECK SELECTOR */}
          <ReviewDeckSelector controller={controller} />
        </>
      )}
      </>
      )}

      {/* REVIEW STYLE SELECTION MODAL */}
      <ReviewStyleDialog controller={controller} />
    </div>
  );
}
