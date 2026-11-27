"use client";

import React from "react";
import { Star, Volume2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useCompendium, useLessonIndex } from "@/lib/content-client";
import { useReviewController, type ReviewController, type ReviewHubProps } from "@/components/review/use-review-controller";
import { SentenceReviewDeck } from "@/components/review/SentenceReviewDeck";
import { ReviewCardManagement } from "@/components/review/ReviewCardManagement";
import { SESSION_SIZES, ALL_FAMILIES_ID } from "@/lib/review-decks";
import { computeLetterDiff } from "@/lib/letter-diff";
import { playTargetAudio } from "@/lib/audio";
import { spokenWordEntity } from "@/lib/gender";
import type { ReviewMode } from "@/lib/types";
import { ExpBar } from "./ExpChrome";
import { ExpFooter } from "./ExpHome";
import { ExpCharBar } from "./lesson/ExpExercise";
import { ArrowRightIcon, ShiftedWord, useReveal } from "./exp-kit";

const MODE_LABEL: Record<ReviewMode, string> = { flashcard: "Recall", mcq: "Choose", tiles: "Tiles", typing: "Type" };
const FIELD = { ["--x-field" as string]: "#a4f6f8", ["--x-field-ink" as string]: "#0a0a0a" } as React.CSSProperties;

export function ExpReview() {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const resetAt = useAppStore((s) => s.progressResetAt);
  const resetActor = useAppStore((s) => s.progressResetActor);
  const hydrated = useAppStore((s) => s.storeHydrated);
  const compendium = useCompendium(activeLanguageId);
  const lessons = useLessonIndex(activeLanguageId);

  if (compendium.error || lessons.error) {
    return (
      <>
        <ExpBar />
        <section className="x-wrap" style={{ paddingBlock: 120 }} role="alert">
          <h1 className="x-head">Review didn’t load.</h1>
          <button type="button" className="x-btn" style={{ marginTop: 32 }} onClick={() => { compendium.retry(); lessons.retry(); }}>
            Try again
          </button>
        </section>
      </>
    );
  }
  if (!hydrated || !compendium.data || !lessons.data) {
    return (
      <>
        <ExpBar />
        <section className="x-review-hero x-field" style={FIELD} role="status">
          <div className="x-wrap">
            <h1 className="x-display">Review</h1>
            <p className="x-lead" style={{ marginTop: 24 }}>Loading your cards…</p>
          </div>
        </section>
      </>
    );
  }
  return (
    <ExpReviewHub
      key={`${activeLanguageId}:${resetAt}:${resetActor}`}
      activeLanguageId={activeLanguageId}
      progressResetAt={resetAt}
      progressResetActor={resetActor}
      data={compendium.data}
      lessons={lessons.data}
    />
  );
}

function Segmented<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="x-seg-control">
      <span className="x-small x-strong">{label}</span>
      <div>
        {options.map((option) => (
          <button
            key={String(option.value)}
            type="button"
            role="radio"
            aria-checked={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ExpReviewHub(props: ReviewHubProps) {
  const c = useReviewController(props);
  if (c.language.status !== "available") {
    return (
      <>
        <ExpBar />
        <section className="x-review-hero x-field" style={FIELD}>
          <div className="x-wrap">
            <h1 className="x-head">Review opens with the {c.language.name} course.</h1>
          </div>
        </section>
      </>
    );
  }
  if (c.activeDeck && c.currentCard && c.currentWord) {
    return <ExpReviewSession c={c} />;
  }
  return <ExpDeckList c={c} {...props} />;
}

function ExpDeckList({ c, ...props }: { c: ReviewController } & ReviewHubProps) {
  const ref = useReveal<HTMLDivElement>();
  const capBlocking = c.dailyBudget.capReached && !c.dailyCapOverridden;
  const due = c.mounted ? c.dueCount : 0;

  type Row = { deck: Parameters<ReviewController["requestDeckStart"]>[0]; name: string; count: number; note: string; extra?: React.ReactNode };
  const rows: Row[] = [
    { deck: "weakest", name: "Weak words", count: c.weakestCount, note: "Missed or guessed, hardest first" },
    { deck: "recent", name: "Recent lessons", count: c.recentCount, note: "Words from your last few lessons" },
    { deck: "learned", name: "Learned", count: c.learnedCount, note: "Everything you’ve met in lessons" },
    { deck: "starred", name: "My words", count: c.starredCount, note: "The words you starred" },
    { deck: "listening", name: "Listening", count: c.listeningCount, note: "Hear it first, then recall it" },
    { deck: "sentences", name: "Sentences", count: c.sentenceCount, note: "Whole example sentences from lessons" },
    ...(c.language.genderSystem ? [{ deck: "articles" as const, name: "Articles", count: c.articleCount, note: "der, die or das — in context" }] : []),
    { deck: "compounds", name: "Compounds & traps", count: c.compoundCount, note: c.compoundExamples || c.trapExamples || "Word-building and false friends" },
    {
      deck: "shift",
      name: "One sound family",
      count: c.shiftCount,
      note: "Words that change the same way",
      extra: (
        <select
          className="x-select"
          aria-label="Sound family"
          value={c.selectedShiftId}
          onChange={(event) => c.setSelectedShiftId(event.target.value)}
        >
          <option value={ALL_FAMILIES_ID}>All families</option>
          {c.atlasFamilies.map((family) => (
            <option key={family.id} value={family.id}>
              {family.symbol} — {family.name}
            </option>
          ))}
        </select>
      ),
    },
    {
      deck: "domain",
      name: "One topic",
      count: c.domainCount,
      note: "Food, family, time…",
      extra: (
        <select className="x-select" aria-label="Topic" value={c.selectedDomainId} onChange={(event) => c.setSelectedDomainId(event.target.value)}>
          {c.domainGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.label}
            </option>
          ))}
        </select>
      ),
    },
    { deck: "everything", name: "Everything", count: c.everythingTotal, note: "The whole course vocabulary" },
  ];

  return (
    <>
      <ExpBar />
      <section className="x-review-hero x-field" style={FIELD} aria-labelledby="x-review-title">
        <div className="x-wrap x-grid">
          <div className="x-review-main">
            <h1 id="x-review-title" className="x-display">Review</h1>
            <p className="x-head x-review-due">
              {!c.hasAnyCards
                ? "Nothing to review yet."
                : due === 0
                  ? "All caught up."
                  : `${due} ${due === 1 ? "card" : "cards"} due today.`}
            </p>
            <p className="x-lead">
              {!c.hasAnyCards
                ? "Finish a lesson and its words join your deck tomorrow."
                : "Words come back just before you’d forget them — sooner when they’re hard, later when they’re easy."}
            </p>
            <div className="x-stepnav">
              <button type="button" className="x-btn x-btn--go" disabled={due === 0 || capBlocking} onClick={() => c.requestDeckStart("due")}>
                {capBlocking ? "Today’s limit reached" : due ? "Start review" : "Nothing due"}
                {due > 0 && !capBlocking && <ArrowRightIcon />}
              </button>
              {capBlocking && (
                <button type="button" className="x-btn" onClick={c.overrideDailyCap}>
                  Keep going anyway
                </button>
              )}
            </div>
          </div>
          <div className="x-review-side">
            <p className="x-lead-strong x-num">
              {c.mounted ? c.masteredCount : 0} mastered · {c.mounted ? c.activeCount : 0} in your deck
            </p>
            <p className="x-body x-num">
              {c.dailyBudget.reviewedToday} of {c.dailyBudget.dailyCap} cards today ({c.dailyBudget.dailyMinutes} min a day)
            </p>
            <Segmented
              label="Cards per session"
              value={c.sessionSize}
              options={SESSION_SIZES.map((size) => ({ value: size, label: size === 0 ? "All" : String(size) }))}
              onChange={c.setSessionSize}
            />
            <Segmented
              label="How to answer"
              value={c.reviewMode}
              options={(Object.keys(MODE_LABEL) as ReviewMode[]).map((mode) => ({ value: mode, label: MODE_LABEL[mode] }))}
              onChange={(mode) => {
                c.setReviewMode(mode);
                c.setPreferredReviewMode(mode);
              }}
            />
            <label className="x-check">
              <input type="checkbox" checked={c.shuffleSession} onChange={(event) => c.setShuffleSession(event.target.checked)} />
              Shuffle the order
            </label>
          </div>
        </div>
      </section>

      {c.sessionComplete && (
        <section className="x-done-band" role="status">
          <div className="x-wrap">
            <h2 className="x-head">Session done.</h2>
            <p className="x-lead x-num" style={{ marginTop: 16 }}>
              {c.sessionStats.reviewed} cards: {c.sessionStats.correct} remembered, {c.sessionStats.again} to see again soon. Your next dates are saved.
            </p>
            {c.completedDeck && !(c.completedDeck === "due" && c.dueCount === 0) && (
              <button type="button" className="x-btn x-btn--paper" style={{ marginTop: 24 }} onClick={() => c.startDeck(c.completedDeck!)}>
                Go again
              </button>
            )}
          </div>
        </section>
      )}

      <section ref={ref} className="x-decks" aria-labelledby="x-decks-title">
        <div className="x-wrap">
          <h2 id="x-decks-title" className="x-head x-reveal">Other decks</h2>
          <ol className="x-deck-list">
            {rows.map((row, index) => (
              <li key={row.deck} className="x-reveal" style={{ ["--i" as string]: Math.min(index, 6) }}>
                <button
                  type="button"
                  className="x-deck"
                  disabled={row.count === 0 || capBlocking}
                  onClick={() => c.requestDeckStart(row.deck)}
                >
                  <span className="x-deck-name">{row.name}</span>
                  <span className="x-deck-note x-body">{row.note}</span>
                  <span className="x-deck-count x-num">{row.count}</span>
                </button>
                {row.extra && <div className="x-deck-extra">{row.extra}</div>}
              </li>
            ))}
          </ol>
          <Segmented
            label="Which cards"
            value={c.learnedFilter}
            options={[
              { value: "all", label: "All" },
              { value: "learned", label: "Learned only" },
              { value: "new", label: "New only" },
            ]}
            onChange={c.setLearnedFilter}
          />
        </div>
      </section>

      <section className="x-wrap x-legacy x-review-legacy" aria-label="More review tools">
        <SentenceReviewDeck languageId={props.activeLanguageId} resetAt={props.progressResetAt} resetActor={props.progressResetActor} data={props.data} />
        <ReviewCardManagement controller={c} />
      </section>
      <ExpFooter />
    </>
  );
}

function ExpReviewSession({ c }: { c: ReviewController }) {
  const word = c.currentWord!;
  const card = c.currentCard!;
  const lang = c.language;
  const spoken = spokenWordEntity(word, lang.id);
  const isArticle = word.id.startsWith("article_");
  const recognition = Boolean(c.recognitionReason);
  const mode = c.effectiveReviewMode;
  const englishAnswer = isArticle && word.english_cognate.startsWith("- ");
  const progress = (c.currentIndex + (c.isRevealed ? 1 : 0)) / Math.max(1, c.sessionCards.length);

  return (
    <div className="x-session x-field" style={FIELD} ref={c.sessionRef} tabIndex={-1}>
      <header className="x-bar" data-tone="field">
        <button type="button" className="x-btn x-btn--ghost x-btn--small" onClick={c.exitDeck}>
          End session
        </button>
        <p className="x-small x-strong x-num" aria-live="polite">
          Card {c.currentIndex + 1} of {c.sessionCards.length}
        </p>
        <div className="x-session-tools">
          {c.supportedModesForCard.length > 1 && (
            <select
              className="x-select"
              aria-label="How to answer"
              value={mode}
              onChange={(event) => {
                const next = event.target.value as ReviewMode;
                c.setReviewMode(next);
                c.setPreferredReviewMode(next);
              }}
            >
              {c.supportedModesForCard.map((m) => (
                <option key={m} value={m}>
                  {MODE_LABEL[m]}
                </option>
              ))}
            </select>
          )}
          <button type="button" className="x-icon-btn" aria-pressed={c.isCurrentStarred} onClick={c.toggleStarCurrent} aria-label={c.isCurrentStarred ? "Remove from My words" : "Add to My words"}>
            <Star fill={c.isCurrentStarred ? "currentColor" : "none"} />
          </button>
          <button type="button" className="x-btn x-btn--ghost x-btn--small" onClick={c.buryCurrent} title="Hide until tomorrow">
            Skip today
          </button>
          <button type="button" className="x-btn x-btn--ghost x-btn--small" onClick={c.suspendCurrent} title="Hide until you bring it back">
            Pause card
          </button>
        </div>
      </header>
      <div className="x-session-progress" style={{ ["--p" as string]: progress }} aria-hidden="true" />

      <div className="x-wrap x-session-body">
        <div className="x-session-card" key={card.word_id}>
          {recognition ? (
            <>
              <p className="x-small x-strong">{lang.name} → English. What does it mean?</p>
              <h2 className="x-display x-session-prompt" lang={lang.ttsLocale}>
                {spoken}
              </h2>
              <button type="button" className="x-btn x-btn--ghost" style={{ justifySelf: "start", paddingInline: 0 }} onClick={() => playTargetAudio(spoken, lang.ttsLocale)}>
                Listen
              </button>
            </>
          ) : c.isListeningDeck && !c.isRevealed ? (
            <>
              <p className="x-small x-strong">Listen, then recall the spelling and the meaning.</p>
              <button type="button" className="x-btn" style={{ justifySelf: "start" }} onClick={() => playTargetAudio(spoken, lang.ttsLocale)}>
                <Volume2 /> Play the word
              </button>
            </>
          ) : (
            <>
              <p className="x-small x-strong">
                {word.promptLabel ?? (isArticle ? "Pick the article" : `In ${lang.name}?`)}
                {word.gender && lang.genderSystem && !isArticle ? ` · ${lang.genderSystem.articles.join(" / ")}?` : ""}
                {!c.wordMastery[card.word_id] ? " · new" : ""}
              </p>
              <h2 className="x-display x-session-prompt">
                {isArticle
                  ? (word.articleCloze ?? `___ ${word.english_cognate.replace(/^_\s*/, "")}`).replace("___", "____")
                  : word.english_cognate}
              </h2>
              {(isArticle || word.english_meaning.toLowerCase() !== word.english_cognate.toLowerCase()) && (
                <p className="x-lead">
                  {isArticle ? word.context_translation || word.english_meaning : `“${word.english_meaning}”`}
                </p>
              )}
              {!c.isRevealed && c.currentCloze && (
                <p className="x-body" lang={lang.ttsLocale}>
                  {c.currentCloze}
                </p>
              )}
            </>
          )}

          {!c.isRevealed && !(c.isListeningDeck && !recognition) && (
            <ExpAnswerEntry c={c} recognition={recognition} />
          )}
          {!c.isRevealed && c.isListeningDeck && !recognition && (
            <button type="button" className="x-btn x-btn--go" style={{ justifySelf: "start" }} onClick={() => c.setIsRevealed(true)}>
              Show it
            </button>
          )}
        </div>
      </div>

      {c.isRevealed && (
        <section className="x-feedback x-session-answer" data-kind="right" aria-label="Answer">
          <div className="x-feedback-inner">
            <div style={{ display: "grid", gap: 12 }}>
              {c.currentFeedbackNote && <p className="x-body x-strong" role="status">{c.currentFeedbackNote}</p>}
              {recognition ? (
                <p className="x-head">{word.english_meaning}</p>
              ) : (
                <p className="x-head">
                  {word.gender && !englishAnswer && (
                    <span style={{ fontWeight: 600 }}>
                      <span className="x-gender" data-g={word.gender} aria-hidden="true" />
                      {word.gender}{" "}
                    </span>
                  )}
                  {englishAnswer ? (
                    word.english_cognate.replace(/^-\s*/, "")
                  ) : (
                    <ShiftedWord english={word.english_cognate} target={word.target_word} rule={word.shift_rule} lang={lang.id} />
                  )}
                </p>
              )}
              {mode === "typing" && c.inputGuess.trim() && !recognition && (
                <p className="x-body">
                  <span className="x-strong">You wrote </span>
                  {computeLetterDiff(c.inputGuess.trim(), word.target_word).userChars.map((ch, i) =>
                    ch.status === "correct" ? <React.Fragment key={i}>{ch.char}</React.Fragment> : <span key={i} className="x-diff-bad">{ch.char}</span>
                  )}
                </p>
              )}
              {word.context_phrase && (
                <p className="x-body">
                  <span lang={lang.ttsLocale} className="x-strong">{word.context_phrase}</span> — {word.context_translation}
                </p>
              )}
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" className="x-btn x-btn--paper x-btn--small" onClick={() => playTargetAudio(spoken, lang.ttsLocale)}>
                  <Volume2 /> Word
                </button>
                {word.context_phrase && (
                  <button type="button" className="x-btn x-btn--paper x-btn--small" onClick={() => playTargetAudio(word.context_phrase, lang.ttsLocale)}>
                    <Volume2 /> Sentence
                  </button>
                )}
              </div>
            </div>
            <div className="x-grades" role="group" aria-label="How well did you remember it?">
              <button type="button" className="x-btn x-btn--paper" onClick={() => c.handleGrade(1)}>
                Again {c.settings.showKeyTips && <span className="x-small">1</span>}
              </button>
              {!recognition && (
                <button type="button" className="x-btn x-btn--paper" onClick={() => c.handleGrade(3)}>
                  Hard {c.settings.showKeyTips && <span className="x-small">2</span>}
                </button>
              )}
              <button type="button" className="x-btn x-btn--go" onClick={() => c.handleGrade(4)} autoFocus>
                Good {c.settings.showKeyTips && <span className="x-small">3</span>}
              </button>
              <button type="button" className="x-btn" onClick={() => c.handleGrade(5)}>
                Easy {c.settings.showKeyTips && <span className="x-small">4</span>}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function ExpAnswerEntry({ c, recognition }: { c: ReviewController; recognition: boolean }) {
  const word = c.currentWord!;
  const mode = c.effectiveReviewMode;
  if (recognition || mode === "flashcard") {
    return (
      <div className="x-stepnav">
        <button type="button" className="x-btn x-btn--go" onClick={() => c.setIsRevealed(true)}>
          {recognition ? "Show the meaning" : "Show the answer"}
          {c.settings.showKeyTips && <span className="x-small">Space</span>}
        </button>
        <span className="x-body">Say it in your head first.</span>
      </div>
    );
  }
  if (mode === "mcq") {
    return (
      <div className="x-choice-list" style={{ maxWidth: 880 }}>
        {c.mcqOptions.map((option, index) => (
          <button key={option} type="button" className="x-choice" onClick={() => c.handleSelectMCQ(option)} lang={c.language.ttsLocale}>
            <span>{option}</span>
            {c.settings.showKeyTips && <span className="x-tile-key">{index + 1}</span>}
          </button>
        ))}
      </div>
    );
  }
  if (mode === "tiles") {
    return (
      <div style={{ maxWidth: 1040, display: "grid", gap: 16 }}>
        <div className="x-slot">
          {c.selectedTiles.length === 0 ? (
            <span className="x-slot-empty">{word.id.startsWith("sentence_") ? "Tap the words in order" : "Tap the pieces in order"}</span>
          ) : (
            c.selectedTiles.map((tile, index) => (
              <button key={`${tile}-${index}`} type="button" className="x-tile" data-picked="true" onClick={() => c.handleUnpickTile(tile, index)} lang={c.language.ttsLocale}>
                {tile}
              </button>
            ))
          )}
        </div>
        <div className="x-tiles">
          {c.availableTiles.map((tile, index) => (
            <button key={`${tile}-${index}`} type="button" className="x-tile" onClick={() => c.handlePickTile(tile, index)} lang={c.language.ttsLocale}>
              {tile}
            </button>
          ))}
        </div>
        <div className="x-stepnav" style={{ marginTop: 0 }}>
          <button type="button" className="x-btn x-btn--go" disabled={!c.selectedTiles.length} onClick={c.handleCheckTiles}>
            Check
          </button>
          <button type="button" className="x-btn x-btn--ghost" disabled={!c.selectedTiles.length} onClick={c.handleResetTiles}>
            Clear
          </button>
          <button type="button" className="x-btn x-btn--ghost" onClick={() => c.setIsRevealed(true)}>
            Show the answer
          </button>
        </div>
      </div>
    );
  }
  return (
    <div style={{ maxWidth: 880, display: "grid", gap: 16 }}>
      {c.settings.capsLockWarning && c.isCapsLock && <p className="x-small x-strong">Caps Lock is on</p>}
      <input
        ref={c.inputRef}
        className="x-input"
        value={c.inputGuess}
        onChange={(event) => c.handleTypingInputChange(event.target.value)}
        lang={c.language.ttsLocale}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        aria-label={`Type the ${c.language.name} word`}
        placeholder={`Type it in ${c.language.name}`}
        onKeyDown={(event) => {
          c.setIsCapsLock(event.getModifierState?.("CapsLock") ?? false);
          if (c.settings.confidenceMode === "on" && event.key === "Backspace") {
            event.preventDefault();
            return;
          }
          if (c.settings.quickRestart === "esc" && event.key === "Escape") {
            event.preventDefault();
            c.setInputGuess("");
            return;
          }
          if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            c.handleCheckTyping();
          }
        }}
      />
      {c.settings.showCharBar !== "off" && <ExpCharBar inputRef={c.inputRef} value={c.inputGuess} onChange={c.handleTypingInputChange} />}
      {c.currentFeedbackNote && <p role="alert" className="x-body x-strong">{c.currentFeedbackNote}</p>}
      <div className="x-stepnav" style={{ marginTop: 0 }}>
        <button type="button" className="x-btn x-btn--go" onClick={c.handleCheckTyping}>
          Check
        </button>
        <button type="button" className="x-btn x-btn--ghost" onClick={() => c.setIsRevealed(true)}>
          Show the answer
        </button>
      </div>
    </div>
  );
}
