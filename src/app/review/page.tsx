"use client";

// ponytail: cohesive multi-modal review hub with 4 decks, selectable review styles, and unified SM-2 grading

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  RotateCcw,
  Flame,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Check,
  X,
  RefreshCw,
  Globe,
  HelpCircle,
  Volume2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { ExampleSentence } from "@/components/common/ExampleSentence";
import { clozeSentence } from "@/lib/sentence";
import { ShiftPair } from "@/components/common/ShiftPair";
import { GermanCharBar } from "@/components/common/GermanCharBar";
import { GenderGuideBanner } from "@/components/common/GenderGuideBanner";
import { useAppStore } from "@/lib/store";
import { lessonHref } from "@/lib/routes";
import { getDueCards, localDateKey, type ReviewGrade } from "@/lib/srs";
import {
  SESSION_SIZES,
  DECK_CAPABILITIES,
  ALL_FAMILIES_ID,
  getAtlasFamilyWordIds,
  resolveCardReviewMode,
  filterByLearned,
  getRecentLessonWordIds,
  prepareSession,
  rankWeakestCards,
  sortDueCards,
  type LearnedFilter,
  type SessionSize,
  type ReviewDeckType,
} from "@/lib/review-decks";
import { generateMCQOptions, generateWordTiles } from "@/lib/review-modes";
import { getAtlasFamilies, getAtlasFamily } from "@/lib/atlas-families";
import { playTargetAudio } from "@/lib/audio";
import { computeLetterDiff, evaluateAnswerAccuracy } from "@/lib/letter-diff";
import { soundEngine } from "@/lib/sound";
import { getLanguageDefinition } from "@/data/languages";
import { useCompendium, useLessonIndex } from "@/lib/content-client";
import { buildWordEntityMaps } from "@/lib/word-entities-core";
import type { CompendiumData, LessonIndexEntry, ReviewMode, SRSCard, WordEntity } from "@/lib/types";
import type { ReviewSnapshot } from "@/lib/store";
import { useDialogFocus } from "@/lib/use-dialog-focus";

type DeckType = ReviewDeckType;

/** Sentinel select value meaning "every family" / "every domain". */
const ALL_ID = ALL_FAMILIES_ID;

interface ReviewSessionStats {
  reviewed: number;
  correct: number;
  again: number;
  hard: number;
  easy: number;
}

const EMPTY_SESSION_STATS: ReviewSessionStats = {
  reviewed: 0,
  correct: 0,
  again: 0,
  hard: 0,
  easy: 0,
};

/**
 * Per-card log of the grades applied during this session, indexed by deck
 * position (null = not graded this session). SM-2 grading only moves a card in
 * one direction, so "back" restores the card's pre-session snapshot instead of
 * trying to invert the schedule math.
 */
type SessionGrades = (ReviewGrade | null)[];

/** A session log with every card ungraded. */
const blankSessionGrades = (length: number): SessionGrades => Array.from({ length }, () => null);

/** Session stats with one grade subtracted — the mirror of the increment in
 * handleGrade, used when a card is re-graded instead of graded for the first time. */
function undoGradeInStats(stats: ReviewSessionStats, grade: ReviewGrade): ReviewSessionStats {
  return {
    reviewed: Math.max(0, stats.reviewed - 1),
    correct: Math.max(0, stats.correct - (grade >= 3 ? 1 : 0)),
    again: Math.max(0, stats.again - (grade === 1 ? 1 : 0)),
    hard: Math.max(0, stats.hard - (grade === 3 ? 1 : 0)),
    easy: Math.max(0, stats.easy - (grade === 5 ? 1 : 0)),
  };
}

export default function ReviewPage() {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
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

  if (!compendium.data || !lessonIndex.data) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center font-mono" role="status">
        <p className="text-sm text-[var(--sub-color)]">loading review data…</p>
      </div>
    );
  }

  return (
    <ReviewHub
      key={activeLanguageId}
      activeLanguageId={activeLanguageId}
      data={compendium.data}
      lessons={lessonIndex.data}
    />
  );
}

function ReviewHub({
  activeLanguageId,
  data,
  lessons,
}: {
  activeLanguageId: string;
  data: CompendiumData;
  lessons: LessonIndexEntry[];
}) {
  const language = getLanguageDefinition(activeLanguageId);
  const [mounted, setMounted] = useState(false);
  const [activeDeck, setActiveDeck] = useState<DeckType | null>(null);
  // Seeded from the active compendium's first atlas family: German, French and
  // Spanish each have their own family ids, so a hard-coded German id left the
  // select blank (and the deck disabled) for every non-German learner.
  const [selectedShiftId, setSelectedShiftId] = useState<string>(
    () => getAtlasFamilies(data)[0]?.id ?? ALL_ID
  );
  const [selectedDomainId, setSelectedDomainId] = useState<string>("");
  // Scope + size for the open-ended decks (shift family, domain, everything)
  const [learnedFilter, setLearnedFilter] = useState<LearnedFilter>("all");
  const [sessionSize, setSessionSize] = useState<SessionSize>(20);
  const [shuffleSession, setShuffleSession] = useState(true);
  const [sessionCards, setSessionCards] = useState<SRSCard[]>([]);
  /**
   * Bumped on every deck start / exit. The per-card reset effect keys on the
   * card id, index and tile data — none of which change when a new session opens
   * on the same card the previous one ended on — so without this the tile rack
   * kept the old session's picked/unpicked tiles.
   */
  const [sessionEpoch, setSessionEpoch] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCapsLock, setIsCapsLock] = useState(false);
  const [sessionStats, setSessionStats] = useState<ReviewSessionStats>(EMPTY_SESSION_STATS);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [completedDeck, setCompletedDeck] = useState<DeckType | null>(null);

  /**
   * Grades applied to each deck position during this session, parallel to
   * sessionCards. Drives both "back" (undo the grade) and the per-card
   * re-grade semantics: going back to a word you already graded restores its
   * pre-session card so the next grade is a fresh SM-2 step, not a second one
   * stacked on top.
   */
  const [sessionGrades, setSessionGrades] = useState<SessionGrades>([]);
  /**
   * Each graded card's state before this session touched it, keyed by wordId.
   * Written on the card's first grade only, so stepping back and re-grading the
   * same word restores the same pre-session state every time.
   */
  const preGradeSnapshots = useRef<Record<string, ReviewSnapshot>>({});

  // Review Style Mode State
  const preferredReviewMode = useAppStore((s) => s.preferredReviewMode);
  const setPreferredReviewMode = useAppStore((s) => s.setPreferredReviewMode);
  const settings = useAppStore((s) => s.settings);
  const hasSeenGenderIntro = useAppStore((s) => s.hasSeenGenderIntro);
  const [reviewMode, setReviewMode] = useState<ReviewMode>(preferredReviewMode || "flashcard");
  const [isModeSelectorOpen, setIsModeSelectorOpen] = useState(false);
  const [rememberPreference, setRememberPreference] = useState(true);
  const modeDialogRef = useRef<HTMLDivElement>(null);

  const closeModeSelector = () => {
    setIsModeSelectorOpen(false);
  };

  useDialogFocus({
    open: isModeSelectorOpen,
    containerRef: modeDialogRef,
    onEscape: closeModeSelector,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mode-Specific Interactive State
  const [inputGuess, setInputGuess] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const [availableTiles, setAvailableTiles] = useState<string[]>([]);
  const [currentAutoGrade, setCurrentAutoGrade] = useState<ReviewGrade | null>(null);
  const [currentFeedbackNote, setCurrentFeedbackNote] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const sessionRef = useRef<HTMLDivElement>(null);

  // Starting a deck replaced the setup screen below the fold: scroll the card
  // into view so the prompt, not the gender explainer, is what the learner sees.
  useEffect(() => {
    if (!activeDeck) return;
    const id = window.requestAnimationFrame(() => {
      sessionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(id);
  }, [activeDeck]);

  const srsCards = useAppStore((s) => s.srsCards);
  const wordMastery = useAppStore((s) => s.wordMastery);
  const recordReview = useAppStore((s) => s.recordReview);
  const restoreSrsCard = useAppStore((s) => s.restoreSrsCard);

  const completedLessons = useAppStore((s) => s.completedLessons);
  const dueCards = useMemo(() => sortDueCards(getDueCards(srsCards)), [srsCards]);
  const hasAnyCards = Object.keys(srsCards).length > 0;

  // Language-aware chrome: French uses conversion bridges, Spanish sound
  // shifts, German consonant shifts. The review mechanics are identical.
  const familyNoun =
    activeLanguageId === "fr"
      ? "conversion family"
      : activeLanguageId === "nl"
      ? "correspondence family"
      : "shift family";
  const recallSource =
    activeLanguageId === "fr"
      ? "French conversion bridges"
      : activeLanguageId === "es"
      ? "Spanish cognate patterns"
      : activeLanguageId === "nl"
      ? "English–Dutch correspondences"
      : "historical sound shifts";
  const compoundExamples =
    data.compounds.slice(0, 2).map((c) => c.compound.toLowerCase()).join(", ") || "compound words";
  const trapExamples =
    data.falseFriends.slice(0, 2).map((f) => f.german_word.toLowerCase()).join(", ") || "false friends";
  const weakestCards = useMemo(() => rankWeakestCards(srsCards), [srsCards]);

  /** Fresh un-seen SM-2 card, so a word with no history is still reviewable. */
  const blankCard = useCallback(
    (wordId: string): SRSCard =>
      srsCards[wordId] || {
        word_id: wordId,
        interval: 1,
        repetitions: 0,
        ease_factor: 2.5,
        due_date: localDateKey(),
        lapses: 0,
        last_reviewed: null,
      },
    [srsCards]
  );

  // Atlas families include the nine authored shifts plus the unshifted layer,
  // so "all families" genuinely spans the whole dictionary.
  const atlasFamilies = useMemo(() => getAtlasFamilies(data), [data]);

  // Sync preferred review mode from store when hydrated
  useEffect(() => {
    if (preferredReviewMode) {
      setReviewMode(preferredReviewMode);
    }
  }, [preferredReviewMode]);

  // Shared map keeps core words, compound calques, and false friends on the same detail path.
  const wordEntityMaps = useMemo(
    () => buildWordEntityMaps(activeLanguageId, data, lessons),
    [activeLanguageId, data, lessons]
  );
  const allWordsMap: Record<string, WordEntity> = wordEntityMaps.entities;

  const compoundCards: SRSCard[] = useMemo(() => {
    const fallback = (): SRSCard => ({
      word_id: "",
      interval: 1,
      repetitions: 0,
      ease_factor: 2.5,
      due_date: localDateKey(),
      lapses: 0,
      last_reviewed: null,
    });
    const items: SRSCard[] = [];
    data.compounds.forEach((c) => {
      const id = `compound_${c.id}`;
      items.push(srsCards[id] || { ...fallback(), word_id: id });
    });
    data.falseFriends.forEach((f) => {
      const id = `trap_${f.id}`;
      items.push(srsCards[id] || { ...fallback(), word_id: id });
    });
    return items;
  }, [srsCards, data]);

  /**
   * Compounds/traps honour the same learned / not-yet-learned scope as the other
   * open-ended decks — the scope bar promises it applies to "shift family, domain
   * and everything". They carry synthetic `compound_*` / `trap_*` ids, so they
   * are scoped by card `word_id` rather than by a compendium word id.
   */
  const scopedCompoundCards: SRSCard[] = useMemo(
    () =>
      filterByLearned(
        compoundCards.map((card) => ({ id: card.word_id, card })),
        learnedFilter,
        wordMastery,
        srsCards
      ).map((entry) => entry.card),
    [compoundCards, learnedFilter, wordMastery, srsCards]
  );

  const sentenceEntities: WordEntity[] = wordEntityMaps.sentences;

  const sentenceCards: SRSCard[] = useMemo(() => {
    const completedSet = new Set(completedLessons);
    const filtered = sentenceEntities.filter((s) => {
      const lessonNum = Number(s.id.replace("sentence_", ""));
      const isLearned =
        completedSet.has(lessonNum) ||
        wordMastery[s.id] === "encountered" ||
        wordMastery[s.id] === "mastered" ||
        Boolean(srsCards[s.id]?.last_reviewed);
      if (learnedFilter === "learned") return isLearned;
      if (learnedFilter === "new") return !isLearned;
      return true;
    });
    return filtered.map((s) => blankCard(s.id));
  }, [sentenceEntities, completedLessons, wordMastery, srsCards, learnedFilter, blankCard]);

  const articleEntities: WordEntity[] = wordEntityMaps.articles;

  const articleCards: SRSCard[] = useMemo(() => {
    const filtered = articleEntities.filter((a) => {
      const baseWordId = a.id.replace(/^article_/, "");
      const isLearned =
        wordMastery[baseWordId] === "encountered" ||
        wordMastery[baseWordId] === "mastered" ||
        wordMastery[a.id] === "encountered" ||
        wordMastery[a.id] === "mastered" ||
        Boolean(srsCards[baseWordId]?.last_reviewed) ||
        Boolean(srsCards[a.id]?.last_reviewed);
      if (learnedFilter === "learned") return isLearned;
      if (learnedFilter === "new") return !isLearned;
      return true;
    });
    return filtered.map((a) => blankCard(a.id));
  }, [articleEntities, wordMastery, srsCards, learnedFilter, blankCard]);

  // Thematic domain decks: the full compendium sliced by each word's domain.
  // Deliberately NOT gated by encounter history — every word in the compendium
  // is reviewable immediately, even if it never appeared in a lesson.
  const domainGroups: Array<{ id: string; label: string; words: WordEntity[] }> = useMemo(() => {
    const map = new Map<string, WordEntity[]>();
    for (const word of data.wordList) {
      const d = word.domain || "general";
      const bucket = map.get(d);
      if (bucket) bucket.push(word);
      else map.set(d, [word]);
    }
    const label = (id: string) =>
      ({
        body: "Body & Health",
        colors: "Colors",
        core: "Core Shift Words",
        countries: "Countries",
        directions: "Directions",
        emotions: "Emotions",
        family: "Family",
        food: "Food & Drink",
        general: "General",
        hobbies: "Hobbies",
        home: "Home",
        months: "Months",
        nature: "Nature & Animals",
        numbers: "Numbers",
        people: "People & Places",
        professions: "Professions",
        seasons: "Seasons",
        shopping: "Shopping & Money",
        survival: "Survival Phrases",
        time: "Time",
        travel: "Travel & Town",
        weather: "Weather",
        clothing: "Clothing",
        adjectives: "Adjectives",
      }[id] || id.charAt(0).toUpperCase() + id.slice(1));
    return Array.from(map.entries())
      .map(([id, words]) => ({ id, label: label(id), words }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [data]);

  // Re-validate the family / domain picks whenever the language (and therefore
  // the atlas family list or domain groups) changes. Keeping a selection that no
  // longer exists would render a blank select, an empty rule line and a disabled
  // deck — exactly what a German-only default did for French/Spanish learners.
  useEffect(() => {
    const ids = atlasFamilies.map((f) => f.id);
    setSelectedShiftId((prev) =>
      prev === ALL_ID || ids.includes(prev) ? prev : ids[0] ?? ALL_ID
    );
  }, [atlasFamilies]);

  useEffect(() => {
    const ids = domainGroups.map((g) => g.id);
    setSelectedDomainId((prev) =>
      prev === ALL_ID || ids.includes(prev) ? prev : ids[0] ?? ALL_ID
    );
  }, [domainGroups]);

  /** Every word covered by the atlas, de-duplicated across overlapping families. */
  const allFamilyWordIds = useMemo(
    () => Array.from(new Set(atlasFamilies.flatMap((f) => f.word_ids))),
    [atlasFamilies]
  );

  /** Applies the learned / not-yet-learned scope to a list of word ids. */
  const scopeIds = useCallback(
    (ids: string[]): string[] =>
      filterByLearned(
        ids.map((id) => ({ id })),
        learnedFilter,
        wordMastery,
        srsCards
      ).map((w) => w.id),
    [learnedFilter, wordMastery, srsCards]
  );

  /**
   * The selected family resolved through the atlas. `data.shifts` only holds the
   * authored families; the virtual `unshifted` family exists only in the atlas
   * and covers every dictionary word outside them, so reading `data.shifts`
   * directly made that deck permanently empty.
   */
  const selectedShiftFamily = useMemo(
    () => (selectedShiftId === ALL_ID ? undefined : getAtlasFamily(data, selectedShiftId)),
    [data, selectedShiftId]
  );

  const shiftWordIds = (shiftId: string): string[] =>
    scopeIds(getAtlasFamilyWordIds(data, shiftId));

  const domainWordIds = (domainId: string): string[] =>
    scopeIds(
      domainId === ALL_ID
        ? data.wordList.map((w) => w.id)
        : (domainGroups.find((g) => g.id === domainId)?.words.map((w) => w.id) ?? [])
    );

  const shiftDeckSize = shiftWordIds(selectedShiftId).length;
  const domainDeckSize = domainWordIds(selectedDomainId).length;
  const everythingCount = useMemo(
    () =>
      scopeIds(data.wordList.map((w) => w.id)).length +
      scopedCompoundCards.length +
      sentenceCards.length +
      articleCards.length,
    [scopeIds, data, scopedCompoundCards, sentenceCards, articleCards]
  );

  // "Recent lessons": words from the last few lessons you actually completed.
  const recentWordIds = useMemo(
    () =>
      getRecentLessonWordIds(
        lessons,
        completedLessons,
        3,
        new Set(data.wordList.map((w) => w.id))
      ),
    [lessons, completedLessons, data]
  );

  // 1-Click direct deck start
  const startDeck = (deck: DeckType, customCards?: SRSCard[]) => {
    // After a due session every card is rescheduled; never open an empty shell.
    if (deck === "due" && dueCards.length === 0) return;
    setActiveDeck(deck);
    setCurrentIndex(0);
    setSessionEpoch((epoch) => epoch + 1);
    setIsRevealed(false);
    setInputGuess("");
    setSelectedOption(null);
    setSelectedTiles([]);
    setCurrentAutoGrade(null);
    setCurrentFeedbackNote(null);
    setSessionStats(EMPTY_SESSION_STATS);
    setSessionComplete(false);
    setCompletedDeck(null);
    preGradeSnapshots.current = {};

    const begin = (cards: SRSCard[]) => {
      setSessionCards(cards);
      setSessionGrades(blankSessionGrades(cards.length));
    };
    // Queue-driven decks (due / weakest / compounds / recent) keep their own
    // order; open-ended scoped decks are shuffled and capped to the chosen size.
    const scoped = (ids: string[]) =>
      begin(prepareSession(ids.map(blankCard), sessionSize, shuffleSession));

    if (customCards) return begin(customCards);

    if (deck === "due") begin(dueCards);
    else if (deck === "weakest") begin(weakestCards);
    else if (deck === "shift") scoped(shiftWordIds(selectedShiftId));
    else if (deck === "recent") begin(recentWordIds.map(blankCard));
    else if (deck === "compounds") begin(prepareSession(scopedCompoundCards, 0, shuffleSession));
    else if (deck === "sentences") begin(prepareSession(sentenceCards, sessionSize, shuffleSession));
    else if (deck === "articles") begin(prepareSession(articleCards, sessionSize, shuffleSession));
    else if (deck === "domain") scoped(domainWordIds(selectedDomainId));
    else if (deck === "everything") {
      const ids = scopeIds(data.wordList.map((w) => w.id));
      begin(prepareSession([...ids.map(blankCard), ...scopedCompoundCards, ...sentenceCards, ...articleCards], sessionSize, shuffleSession));
    }
  };

  // Deck start is immediate: the current style (or the deck's only supported
  // style) runs the session — the style picker is an explicit "change style"
  // action, never a roadblock between a click and the first card.
  const requestDeckStart = (deck: DeckType, customCards?: SRSCard[]) => {
    const spec = DECK_CAPABILITIES[deck];
    if (spec && spec.supportedModes.length === 1) {
      setReviewMode(spec.supportedModes[0]);
    }
    startDeck(deck, customCards);
  };

  // Apply a style chosen in the preference picker (or via its 1–4 hotkeys).
  const selectReviewStyle = (mode: ReviewMode) => {
    setReviewMode(mode);
    if (rememberPreference) {
      setPreferredReviewMode(mode);
    }
    setIsModeSelectorOpen(false);
  };

  const currentCard = sessionCards[currentIndex];
  const currentWord: WordEntity | undefined = currentCard ? allWordsMap[currentCard.word_id] : undefined;
  const supportedModesForCard: ReviewMode[] = useMemo(() => {
    if (currentWord?.supportedModes && currentWord.supportedModes.length > 0) {
      return currentWord.supportedModes;
    }
    if (activeDeck && DECK_CAPABILITIES[activeDeck]) {
      return DECK_CAPABILITIES[activeDeck].supportedModes;
    }
    return ["flashcard", "mcq", "tiles", "typing"];
  }, [currentWord, activeDeck]);
  const effectiveReviewMode: ReviewMode = useMemo(
    () => resolveCardReviewMode(currentWord, reviewMode, activeDeck),
    [currentWord, reviewMode, activeDeck]
  );

  // Example sentence with the answer blanked out: a context clue before reveal.
  const currentCloze = useMemo(
    () => (currentWord && !currentWord.id.startsWith("sentence_") && !currentWord.id.startsWith("article_") ? clozeSentence(currentWord.context_phrase, currentWord.target_word) : null),
    [currentWord]
  );

  // MCQ Options for current card
  const mcqOptions = useMemo(() => {
    if (!currentWord) return [];
    const pool = currentWord.id.startsWith("sentence_") && sentenceEntities.length >= 4 ? sentenceEntities : data.wordList;
    return generateMCQOptions(currentWord, pool, 4);
  }, [currentWord, data, sentenceEntities]);

  // Tiles for current card
  const tileData = useMemo(() => {
    if (!currentWord) return { tiles: [], targetChunks: [], targetAnswer: "" };
    return generateWordTiles(currentWord, data.wordList);
  }, [currentWord, data]);

  // Reset interactive state per card
  useEffect(() => {
    setIsRevealed(false);
    setInputGuess("");
    setSelectedOption(null);
    setSelectedTiles([]);
    setCurrentAutoGrade(null);
    setCurrentFeedbackNote(null);
    if (tileData) {
      setAvailableTiles(tileData.tiles);
    }
  }, [currentCard?.word_id, currentIndex, tileData, sessionEpoch]);

  // SM-2 Review Grade Handler
  const handleGrade = (grade: ReviewGrade) => {
    if (!currentCard || !isRevealed) return;

    if (grade === 1) {
      void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
    } else {
      void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    }

    // A card this session already graded has moved away from its pre-session
    // state; undo that first so the new grade schedules from where the session
    // started rather than compounding on top of the previous one.
    const previousGrade = sessionGrades[currentIndex] ?? null;
    if (previousGrade === null && !(currentCard.word_id in preGradeSnapshots.current)) {
      // first grade this session: remember where the card — and the word's
      // mastery entry — started, so "back" can restore them
      preGradeSnapshots.current[currentCard.word_id] = {
        card: srsCards[currentCard.word_id] ?? blankCard(currentCard.word_id),
        mastery: wordMastery[currentCard.word_id] ?? null,
      };
    }

    const stats: ReviewSessionStats = previousGrade === null ? { ...sessionStats } : undoGradeInStats(sessionStats, previousGrade);
    if (previousGrade !== null) {
      const snapshot = preGradeSnapshots.current[currentCard.word_id];
      if (snapshot) restoreSrsCard(currentCard.word_id, snapshot);
    }

    recordReview(currentCard.word_id, grade);
    setSessionGrades((prev) => {
      const next = [...prev];
      next[currentIndex] = grade;
      return next;
    });

    stats.reviewed += 1;
    stats.correct += grade >= 3 ? 1 : 0;
    stats.again += grade === 1 ? 1 : 0;
    stats.hard += grade === 3 ? 1 : 0;
    stats.easy += grade === 5 ? 1 : 0;
    setSessionStats(stats);

    setIsRevealed(false);
    setInputGuess("");
    setSelectedOption(null);
    setSelectedTiles([]);
    setCurrentAutoGrade(null);
    setCurrentFeedbackNote(null);

    if (currentIndex + 1 < sessionCards.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCompletedDeck(activeDeck);
      setSessionComplete(true);
      setActiveDeck(null); // Finish session
    }
  };

  const exitDeck = () => {
    setActiveDeck(null);
    setSessionComplete(false);
    setCompletedDeck(null);
    setSessionStats(EMPTY_SESSION_STATS);
    setIsRevealed(false);
    setCurrentAutoGrade(null);
    setCurrentFeedbackNote(null);
    // drop the tile rack too, so reopening the same non-shuffled deck cannot
    // start from the previous session's picked/unpicked state
    setSelectedTiles([]);
    if (tileData) setAvailableTiles(tileData.tiles);
    setSessionEpoch((epoch) => epoch + 1);
  };

  /**
   * Step back to the previous card in this session. The card's SM-2 state is
   * restored to what it was before the session graded it, so the learner sees
   * the word un-revealed and can answer again — the re-grade then lands as the
   * card's only graded step this session, not one stacked on the earlier one.
   * The session stats drop the previous grade so a re-graded card is counted once.
   */
  const goBack = () => {
    if (currentIndex <= 0 || sessionCards.length === 0) return;
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);

    // Leaving the current card: undo the grade it may have received this session.
    const leavingGrade = sessionGrades[currentIndex] ?? null;
    if (leavingGrade !== null) {
      const leaving = sessionCards[currentIndex];
      const snapshot = preGradeSnapshots.current[leaving.word_id];
      if (snapshot) restoreSrsCard(leaving.word_id, snapshot);
      setSessionGrades((prev) => {
        const next = [...prev];
        next[currentIndex] = null;
        return next;
      });
      setSessionStats((prev) => undoGradeInStats(prev, leavingGrade));
    }

    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  /** Step forward again after going back (same behaviour as advancing). */
  const goForward = () => {
    if (currentIndex + 1 >= sessionCards.length) return;
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    setCurrentIndex((i) => Math.min(sessionCards.length - 1, i + 1));
  };

  const canGoBack = activeDeck !== null && currentIndex > 0;
  const canGoForward = activeDeck !== null && currentIndex < sessionCards.length - 1;

  // MCQ Selection Handler
  const handleSelectMCQ = (option: string) => {
    if (isRevealed || !currentWord) return;
    setSelectedOption(option);
    const isCorrect = option.toLowerCase() === currentWord.target_word.toLowerCase();
    if (isCorrect) {
      void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    } else {
      void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
    }
    setCurrentAutoGrade(isCorrect ? 4 : 1);
    setCurrentFeedbackNote(null);
    setIsRevealed(true);
  };

  // Tile Selection Handlers
  const handlePickTile = (tile: string, index: number) => {
    if (isRevealed) return;
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    const nextAvailable = [...availableTiles];
    nextAvailable.splice(index, 1);
    setAvailableTiles(nextAvailable);
    setSelectedTiles((prev) => [...prev, tile]);
  };

  const handleUnpickTile = (tile: string, index: number) => {
    if (isRevealed) return;
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    const nextSelected = [...selectedTiles];
    nextSelected.splice(index, 1);
    setSelectedTiles(nextSelected);
    setAvailableTiles((prev) => [...prev, tile]);
  };

  const handleResetTiles = () => {
    if (isRevealed || !tileData) return;
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    setSelectedTiles([]);
    setAvailableTiles(tileData.tiles);
  };

  const handleCheckTiles = () => {
    if (isRevealed || !currentWord) return;
    const isSentenceCard = currentWord.id.startsWith("sentence_") || currentWord.target_word.includes(" ");
    const assembled = isSentenceCard ? selectedTiles.join(" ") : selectedTiles.join("");
    const evalResult = evaluateAnswerAccuracy(assembled, currentWord.target_word, {
      umlautTolerance: Boolean(settings.lazyMode),
      capitalizationTolerance: Boolean(settings.capitalizationTolerance),
    });
    const isCorrect = evalResult.accuracy === "exact" || evalResult.accuracy === "almost";
    if (isCorrect) {
      void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    } else {
      void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
    }
    setCurrentAutoGrade(isCorrect ? 4 : 1);
    setCurrentFeedbackNote(null);
    setIsRevealed(true);
  };

  const handleCheckTyping = () => {
    if (isRevealed || !currentWord) return;
    const guess = inputGuess.trim();
    if (!guess) {
      setCurrentFeedbackNote("Type an answer before checking.");
      return;
    }

    const evalOptions = {
      umlautTolerance: Boolean(settings.lazyMode),
      capitalizationTolerance: Boolean(settings.capitalizationTolerance),
    };
    const evaluation = evaluateAnswerAccuracy(guess, currentWord.target_word, evalOptions);
    if (evaluation.accuracy === "exact") {
      void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
      setCurrentAutoGrade(4);
      setCurrentFeedbackNote(null);
    } else if (evaluation.accuracy === "almost") {
      // A near miss should be corrected, not punished like a completely wrong answer.
      void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
      setCurrentAutoGrade(3);
      setCurrentFeedbackNote(evaluation.warningNote || "Almost right — review the standard spelling.");
    } else {
      void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
      setCurrentAutoGrade(1);
      setCurrentFeedbackNote(null);
    }
    setIsRevealed(true);
  };

  const handleTypingInputChange = (val: string) => {
    if (val.length > inputGuess.length) {
      if (settings.stopOnError === "letter" && currentWord) {
        const nextCharIndex = inputGuess.length;
        const expectedTarget = currentWord.target_word;
        if (nextCharIndex < expectedTarget.length) {
          const valChar = val[nextCharIndex].toLowerCase();
          const targetChar = expectedTarget[nextCharIndex].toLowerCase();
          const normalizeChar = (c: string) =>
            c.replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "s");
          const isMatch =
            valChar === targetChar ||
            (settings.lazyMode && normalizeChar(valChar) === normalizeChar(targetChar));
          if (!isMatch) {
            void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
            return;
          }
        }
      }
      void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    } else if (val.length < inputGuess.length) {
      void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    }
    setInputGuess(val);
    setCurrentFeedbackNote(null);
  };

  // Auto-focus input when in typing mode unrevealed
  useEffect(() => {
    if (activeDeck && !isRevealed && effectiveReviewMode === "typing") {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeDeck, currentIndex, isRevealed, effectiveReviewMode]);

  // Global review keyboard controls:
  // - In Modal: 1-4 chooses style, Esc cancels
  // - In Session:
  //   - Escape: Exit review session cleanly
  //   - Unrevealed:
  //     - Flashcard: Space/Enter reveals
  //     - MCQ: 1-4 selects options
  //     - Tiles: Enter checks, Space reveals
  //     - Typing: Enter checks the typed answer
  //   - Revealed: 1-4 grades, Space/Enter quick-advances with auto-grade or Good (4)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.getModifierState) {
        setIsCapsLock(e.getModifierState("CapsLock"));
      }

      // Quick restart hotkey
      if (
        activeDeck &&
        settings.quickRestart === "esc" &&
        e.key === "Escape" &&
        isRevealed
      ) {
        e.preventDefault();
        setIsRevealed(false);
        setInputGuess("");
        setSelectedOption(null);
        setSelectedTiles([]);
        setCurrentAutoGrade(null);
    setCurrentFeedbackNote(null);
        if (tileData) setAvailableTiles(tileData.tiles);
        return;
      }

      // 1. Mode selector modal hotkeys
      if (isModeSelectorOpen) {
        if (e.key === "1") {
          e.preventDefault();
          selectReviewStyle("flashcard");
        } else if (e.key === "2") {
          e.preventDefault();
          selectReviewStyle("mcq");
        } else if (e.key === "3") {
          e.preventDefault();
          selectReviewStyle("tiles");
        } else if (e.key === "4") {
          e.preventDefault();
          selectReviewStyle("typing");
        } else if (e.key === "Escape") {
          e.preventDefault();
          setIsModeSelectorOpen(false);
        }
        return;
      }

      // 2. No active session
      if (!activeDeck || sessionCards.length === 0) return;

      // Escape exits session
      if (e.key === "Escape") {
        e.preventDefault();
        exitDeck();
        return;
      }

      // Back / forward through the cards of this session. Arrow keys are left
      // alone while the typing input has focus so caret movement still works.
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        if (e.target === inputRef.current) return;
        e.preventDefault();
        if (e.key === "ArrowLeft") goBack();
        else goForward();
        return;
      }

      // If user is inside an input other than our review input, ignore
      if (e.target instanceof HTMLInputElement && e.target !== inputRef.current) {
        return;
      }

      // Confidence mode: blocks backspacing in typing review
      if (e.target === inputRef.current && settings.confidenceMode === "on" && e.key === "Backspace") {
        e.preventDefault();
        return;
      }

      // 3. Card is UNREVEALED
      if (!isRevealed) {
        if (effectiveReviewMode === "flashcard") {
          if (e.key === "Enter" || e.key === " " || e.code === "Space") {
            e.preventDefault();
            setIsRevealed(true);
          }
        } else if (effectiveReviewMode === "mcq") {
          if (e.key === "1" || e.code === "Digit1" || e.code === "Numpad1") {
            e.preventDefault();
            if (mcqOptions[0]) handleSelectMCQ(mcqOptions[0]);
          } else if (e.key === "2" || e.code === "Digit2" || e.code === "Numpad2") {
            e.preventDefault();
            if (mcqOptions[1]) handleSelectMCQ(mcqOptions[1]);
          } else if (e.key === "3" || e.code === "Digit3" || e.code === "Numpad3") {
            e.preventDefault();
            if (mcqOptions[2]) handleSelectMCQ(mcqOptions[2]);
          } else if (e.key === "4" || e.code === "Digit4" || e.code === "Numpad4") {
            e.preventDefault();
            if (mcqOptions[3]) handleSelectMCQ(mcqOptions[3]);
          } else if (e.key === "Enter" || e.key === " " || e.code === "Space") {
            e.preventDefault();
            setIsRevealed(true);
          }
        } else if (effectiveReviewMode === "tiles") {
          if (e.key === "Enter") {
            e.preventDefault();
            if (selectedTiles.length > 0) {
              handleCheckTiles();
            } else {
              setIsRevealed(true);
            }
          } else if (e.key === " " || e.code === "Space") {
            e.preventDefault();
            setIsRevealed(true);
          } else if (e.key === "Backspace") {
            e.preventDefault();
            if (selectedTiles.length > 0) {
              const lastIdx = selectedTiles.length - 1;
              const lastTile = selectedTiles[lastIdx];
              handleUnpickTile(lastTile, lastIdx);
            }
          } else if (/^[1-9]$/.test(e.key)) {
            const idx = parseInt(e.key, 10) - 1;
            if (idx >= 0 && idx < availableTiles.length) {
              e.preventDefault();
              handlePickTile(availableTiles[idx], idx);
            }
          } else if (/^[a-zA-ZäöüÄÖÜßéèêëàâùûîïôçáíóúñ]$/.test(e.key)) {
            const matchIdx = availableTiles.findIndex((t) =>
              t.toLowerCase().startsWith(e.key.toLowerCase())
            );
            if (matchIdx !== -1) {
              e.preventDefault();
              handlePickTile(availableTiles[matchIdx], matchIdx);
            }
          }
        } else if (effectiveReviewMode === "typing") {
          if (e.key === "Enter") {
            e.preventDefault();
            handleCheckTyping();
          } else if ((e.key === " " || e.code === "Space") && e.target !== inputRef.current) {
            e.preventDefault();
            handleCheckTyping();
          }
        }
      } else {
        // 4. Card is REVEALED: Pronunciation audio hotkey
        if (e.key === "r" || e.key === "R" || e.key === "a" || e.key === "A") {
          e.preventDefault();
          if (currentWord) {
            const spoken = currentWord.gender ? `${currentWord.gender} ${currentWord.target_word}` : currentWord.target_word;
            playTargetAudio(spoken, language.ttsLocale);
          }
          return;
        }

        // SM-2 1-4 grading & quick advance
        if (e.key === "1" || e.code === "Digit1" || e.code === "Numpad1") {
          e.preventDefault();
          handleGrade(1);
        } else if (e.key === "2" || e.code === "Digit2" || e.code === "Numpad2") {
          e.preventDefault();
          handleGrade(3);
        } else if (e.key === "3" || e.code === "Digit3" || e.code === "Numpad3") {
          e.preventDefault();
          handleGrade(4);
        } else if (e.key === "4" || e.code === "Digit4" || e.code === "Numpad4") {
          e.preventDefault();
          handleGrade(5);
        } else if (e.key === "Enter" || e.key === " " || e.code === "Space") {
          e.preventDefault();
          handleGrade(currentAutoGrade || 4);
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [
    isModeSelectorOpen,
    activeDeck,
    sessionCards,
    sessionGrades,
    isRevealed,
    reviewMode,
    mcqOptions,
    selectedTiles,
    availableTiles,
    currentWord,
    currentAutoGrade,
    currentIndex,
    sessionStats,
    settings,
    restoreSrsCard,
    srsCards,
    blankCard,
    goBack,
    goForward,
  ]);

  const masteredCount = Object.values(wordMastery).filter((m) => m === "mastered").length;
  const activeCount = Object.keys(srsCards).length - masteredCount;

  // Store-derived counts are only trustworthy after hydration. Render the same
  // "0 / nothing to review" state on the server and on the first client pass so
  // the markup can never differ, and drive each button's `disabled` from the
  // same gated value its count span shows.
  const dueCount = mounted ? dueCards.length : 0;
  const weakestCount = mounted ? weakestCards.length : 0;
  const recentCount = mounted ? recentWordIds.length : 0;
  const everythingTotal = mounted ? everythingCount : 0;
  const shiftCount = mounted ? shiftDeckSize : 0;
  const domainCount = mounted ? domainDeckSize : 0;
  const sentenceCount = mounted ? sentenceCards.length : 0;
  const articleCount = mounted ? articleCards.length : 0;
  const compoundCount = mounted ? scopedCompoundCards.length : 0;

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

      {mounted && language.status === "available" && !activeDeck && !hasAnyCards && (
        <section className="p-5 sm:p-6 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/35 space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--main-color)] font-semibold">
            nothing to review yet
          </div>
          <h2 className="text-lg font-bold text-[var(--text-color)]">
            {completedLessons.length === 0
              ? "Finish lesson 1 and your first cards appear here."
              : "Finish another lesson to add cards to the queue."}
          </h2>
          <p className="text-sm text-[var(--sub-color)] leading-relaxed max-w-2xl">
            Every word you meet on the trail becomes an sm-2 card. Review brings each one back just
            before you would forget it — no cards are created until a lesson is finished, so this
            page stays quiet until you have something to practise.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={lessonHref(activeLanguageId, lessons[0]?.id ?? 1)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-xs font-mono hover:opacity-90 transition"
            >
              Start lesson 1 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[11px] font-mono text-[var(--sub-color)]">
              the decks below are still browseable.
            </span>
          </div>
        </section>
      )}

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
              className="bg-[var(--bg-color)] border border-[var(--sub-color)]/25 hover:border-[var(--main-color)] rounded px-2 py-0.5 text-xs font-mono text-[var(--main-color)] outline-none cursor-pointer transition"
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
              className="text-[11px] font-mono text-[var(--sub-color)] hover:text-[var(--main-color)] underline underline-offset-2 ml-1 cursor-pointer"
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
        <div
          ref={sessionRef}
          tabIndex={-1}
          className="scroll-mt-20 p-6 sm:p-8 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 shadow-md space-y-6 animate-in fade-in duration-150 focus:outline-none"
        >
          {/* Card Header: Counter, Style Switcher, Exit */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--sub-color)]/15 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-[var(--sub-color)] uppercase tracking-wider">
                card {currentIndex + 1} / {sessionCards.length}
              </span>

              {/* Mid-Session Style Switcher (filtered by card/deck supportedModes) */}
              <div className="flex items-center gap-1.5 bg-[var(--bg-color)] border border-[var(--sub-color)]/25 px-2 py-0.5 rounded">
                <span className="text-[11px] font-mono text-[var(--sub-color)]">style:</span>
                {supportedModesForCard.length === 1 ? (
                  <span className="text-xs font-mono text-[var(--main-color)] font-bold">
                    {supportedModesForCard[0]} only
                  </span>
                ) : (
                  <select
                    value={effectiveReviewMode}
                    onChange={(e) => {
                      const mode = e.target.value as ReviewMode;
                      setReviewMode(mode);
                      setPreferredReviewMode(mode);
                    }}
                    className="bg-transparent text-xs font-mono text-[var(--main-color)] outline-none cursor-pointer"
                    title="Switch Review Style mid-session"
                  >
                    {supportedModesForCard.includes("flashcard") && (
                      <option value="flashcard" className="bg-[var(--bg-color)] text-[var(--text-color)]">
                        recall
                      </option>
                    )}
                    {supportedModesForCard.includes("mcq") && (
                      <option value="mcq" className="bg-[var(--bg-color)] text-[var(--text-color)]">
                        mcq
                      </option>
                    )}
                    {supportedModesForCard.includes("tiles") && (
                      <option value="tiles" className="bg-[var(--bg-color)] text-[var(--text-color)]">
                        tiles
                      </option>
                    )}
                    {supportedModesForCard.includes("typing") && (
                      <option value="typing" className="bg-[var(--bg-color)] text-[var(--text-color)]">
                        typing
                      </option>
                    )}
                  </select>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                tabIndex={-1}
                onClick={goBack}
                disabled={!canGoBack}
                className="text-sm font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] px-2.5 py-1 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/20 transition flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Previous card (←)"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>back</span>
                {settings.showKeyTips && <span className="keycap text-[10px]">←</span>}
              </button>

              <button
                type="button"
                tabIndex={-1}
                onClick={goForward}
                disabled={!canGoForward}
                className="text-sm font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] px-2.5 py-1 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/20 transition flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Next card (→)"
              >
                <span>next</span>
                {settings.showKeyTips && <span className="keycap text-[10px]">→</span>}
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                type="button"
                tabIndex={-1}
                onClick={exitDeck}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") e.preventDefault();
                }}
                className="text-sm font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] px-2.5 py-1 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/20 transition cursor-pointer flex items-center gap-1.5"
                title="Exit Session (Esc)"
              >
                <span>exit</span>
                <span className="keycap text-[10px]">esc</span>
              </button>
            </div>
          </div>

          {/* Front Prompt */}
          <div className="text-center space-y-2 py-2">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm font-mono text-[var(--sub-color)] uppercase tracking-widest">
                shift: {currentWord.shift_rule}
              </span>
              {currentWord.gender && language.genderSystem && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--sub-color)]/20 bg-[var(--bg-color)] text-[var(--sub-color)]">
                  gender: [ {language.genderSystem.articles.join(" / ")} ? ]
                </span>
              )}
              {!wordMastery[currentCard.word_id] && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--main-color)]/30 bg-[var(--main-color)]/10 text-[var(--main-color)]">
                  new word
                </span>
              )}
            </div>
            <h2 className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text-color)]">
              {currentWord.english_cognate}
            </h2>
            <p className="text-sm font-mono text-[var(--sub-color)]">&quot;{currentWord.english_meaning}&quot;</p>
            {!isRevealed && currentCloze && (
              <div className="mx-auto max-w-md pt-2 text-sm font-mono text-[var(--sub-color)]">
                <p lang={language.ttsLocale} className="text-[var(--text-color)]">{currentCloze}</p>
                {currentWord.context_translation && <p>{currentWord.context_translation}</p>}
              </div>
            )}
          </div>

          {/* MODE 1: QUICK FLIP (FLASHCARD) */}
          {effectiveReviewMode === "flashcard" && !isRevealed && (
            <div className="space-y-4 max-w-md mx-auto text-center py-4">
              <p className="text-sm font-mono text-[var(--sub-color)]">
                recall the {language.name.toLowerCase()} twin in your mind, then reveal.
              </p>
              <button
                type="button"
                onClick={() => setIsRevealed(true)}
                className="w-full py-3.5 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-mono font-bold text-sm transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>show answer</span>
                {settings.showKeyTips && (
                  <span className="keycap text-[11px]">space</span>
                )}
              </button>
            </div>
          )}

          {/* MODE 2: MULTIPLE CHOICE (MCQ) */}
          {effectiveReviewMode === "mcq" && (
            <div className="space-y-4 max-w-lg mx-auto py-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {mcqOptions.map((opt, idx) => {
                  const isTarget = opt.toLowerCase() === currentWord.target_word.toLowerCase();
                  const isSelected = selectedOption === opt;

                  let buttonStyle = "bg-[var(--bg-color)] hover:border-[var(--main-color)]/50 border-[var(--sub-color)]/20 text-[var(--text-color)]";
                  if (isRevealed) {
                    if (isTarget) {
                      buttonStyle = "bg-[var(--main-color)]/15 border-[var(--main-color)] text-[var(--main-color)] font-bold";
                    } else if (isSelected && !isTarget) {
                      buttonStyle = "bg-[var(--error-color)]/15 border-[var(--error-color)] text-[var(--error-color)] line-through";
                    } else {
                      buttonStyle = "bg-[var(--bg-color)]/50 border-[var(--sub-color)]/10 text-[var(--sub-color)] opacity-40";
                    }
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={isRevealed}
                      onClick={() => handleSelectMCQ(opt)}
                      className={`p-3 rounded-lg border text-left flex items-center justify-between transition cursor-pointer font-mono ${buttonStyle}`}
                    >
                      <span className="font-semibold text-sm">{opt}</span>
                      <div className="flex items-center gap-1.5">
                        {isRevealed && isTarget && <Check className="w-4 h-4 text-[var(--main-color)]" />}
                        {isRevealed && isSelected && !isTarget && <X className="w-4 h-4 text-[var(--error-color)]" />}
                        {settings.showKeyTips && (
                          <span className="keycap text-[10px]">
                            {idx + 1}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {!isRevealed && settings.showKeyTips && (
                <div className="text-center text-[11px] font-mono text-[var(--sub-color)] pt-1 flex items-center justify-center gap-1">
                  <span>press</span>
                  <span className="keycap text-[10px]">1</span>
                  <span className="keycap text-[10px]">2</span>
                  <span className="keycap text-[10px]">3</span>
                  <span className="keycap text-[10px]">4</span>
                  <span>to select</span>
                </div>
              )}
            </div>
          )}

          {/* MODE 3: TILE BUILDER */}
          {effectiveReviewMode === "tiles" && (
            <div className="space-y-4 max-w-lg mx-auto py-2">
              {/* Selected Tiles Assembly Rack */}
              <div className="p-3.5 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/25 min-h-[60px] flex flex-wrap items-center justify-center gap-2">
                {selectedTiles.length === 0 ? (
                  <span className="text-sm font-mono text-[var(--sub-color)]/60 italic">{currentWord.id.startsWith("sentence_") ? "tap word tiles below in sentence order (or press 1–9)..." : "tap tiles below to assemble word..."}</span>
                ) : (
                  selectedTiles.map((tile, idx) => (
                    <button
                      key={`${tile}-${idx}`}
                      type="button"
                      disabled={isRevealed}
                      onClick={() => handleUnpickTile(tile, idx)}
                      className="px-3 py-1.5 rounded bg-[var(--main-color)]/15 hover:bg-[var(--error-color)]/20 border border-[var(--main-color)]/40 hover:border-[var(--error-color)]/40 text-[var(--main-color)] hover:text-[var(--error-color)] font-bold font-mono text-sm transition cursor-pointer"
                      title="Tap to remove"
                    >
                      {tile}
                    </button>
                  ))
                )}
              </div>

              {/* Available Tile Bank */}
              {!isRevealed && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {availableTiles.map((tile, idx) => (
                      <button
                        key={`${tile}-${idx}`}
                        type="button"
                        onClick={() => handlePickTile(tile, idx)}
                        className="px-3.5 py-2 rounded-lg bg-[var(--bg-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/25 text-[var(--text-color)] font-bold font-mono text-sm transition cursor-pointer active:scale-95"
                      >
                        {tile}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleResetTiles}
                      disabled={selectedTiles.length === 0}
                      className="px-3 py-1.5 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--sub-color)]/10 border border-[var(--sub-color)]/20 text-sm font-mono text-[var(--sub-color)] transition cursor-pointer disabled:opacity-40"
                    >
                      reset
                    </button>

                    <button
                      type="button"
                      onClick={handleCheckTiles}
                      disabled={selectedTiles.length === 0}
                      className="px-5 py-1.5 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-bold text-xs font-mono transition cursor-pointer disabled:opacity-40 flex items-center gap-1.5"
                    >
                      <span>check</span>
                      {settings.showKeyTips && (
                        <span className="keycap text-[10px]">enter</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsRevealed(true)}
                      className="px-3 py-1.5 rounded-lg bg-[var(--bg-color)] hover:bg-[var(--sub-color)]/10 border border-[var(--sub-color)]/20 text-sm font-mono text-[var(--sub-color)] transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span>show</span>
                      {settings.showKeyTips && (
                        <span className="keycap text-[10px]">space</span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODE 4: DERIVATION TYPING (LAST) */}
          {effectiveReviewMode === "typing" && !isRevealed && (
            <div className="space-y-4 max-w-md mx-auto">
              {settings.capsLockWarning && isCapsLock && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--error-color)] font-mono animate-pulse">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>caps lock is on</span>
                </div>
              )}
              <input
                ref={inputRef}
                type="text"
                value={inputGuess}
                onChange={(e) => handleTypingInputChange(e.target.value)}
                lang={language.id}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                onKeyDown={(e) => {
                  if (e.getModifierState) {
                    setIsCapsLock(e.getModifierState("CapsLock"));
                  }
                  if (settings.confidenceMode === "on" && e.key === "Backspace") {
                    e.preventDefault();
                    return;
                  }
                  if (settings.quickRestart === "esc" && e.key === "Escape") {
                    e.preventDefault();
                    setInputGuess("");
                    return;
                  }
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCheckTyping();
                  }
                }}
                placeholder={`type ${language.name.toLowerCase()} derivation...`}
                className="w-full px-4 py-3 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/30 text-[var(--main-color)] text-center font-mono font-bold text-lg outline-none focus:border-[var(--main-color)] placeholder:text-[var(--sub-color)]/40 transition"
              />
              {(settings.showCharBar === "always" || settings.showCharBar === "on_focus") && (
                <GermanCharBar onInsert={(c) => handleTypingInputChange(inputGuess + c)} />
              )}
              {currentFeedbackNote && (
                <p role="alert" className="text-center text-xs font-mono text-[var(--main-color)]">
                  {currentFeedbackNote}
                </p>
              )}
              <button
                type="button"
                onClick={handleCheckTyping}
                className="w-full py-3 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-mono font-bold text-sm transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>check answer</span>
                {settings.showKeyTips && (
                  <span className="keycap text-[10px]">enter</span>
                )}
              </button>
            </div>
          )}

          {/* REVEALED CARD CONTENT & SM-2 GRADING (COMMON TO ALL MODES) */}
          {isRevealed && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {currentFeedbackNote && (
                <p
                  role="status"
                  className="text-center text-xs font-mono text-[var(--main-color)] border border-[var(--main-color)]/30 bg-[var(--main-color)]/10 rounded px-3 py-2"
                >
                  {currentFeedbackNote}
                </p>
              )}
              <div className="p-5 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 text-center space-y-3">
                <ShiftPair
                  english={currentWord.english_cognate}
                  german={currentWord.target_word}
                  gender={currentWord.gender}
                  rule={currentWord.shift_rule}
                  wordId={currentWord.id}
                  className="text-lg px-4 py-2"
                />

                {/* Character-level Diff for Typing Mode */}
                {effectiveReviewMode === "typing" && inputGuess.trim().length > 0 && (
                  <div className="p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-center space-y-1 max-w-md mx-auto">
                    <span className="text-[11px] font-mono text-[var(--sub-color)] uppercase tracking-wider block">
                      your attempt:
                    </span>
                    <div className="text-base font-mono tracking-wide flex items-center justify-center gap-0.5">
                      {computeLetterDiff(inputGuess.trim(), currentWord.target_word).userChars.map((c, i) => (
                        <span
                          key={i}
                          className={
                            c.status === "correct"
                              ? "text-[var(--main-color)] font-bold"
                              : "text-[var(--error-color)] font-bold underline decoration-[var(--error-color)] decoration-2 bg-[var(--error-color)]/10 px-0.5 rounded"
                          }
                        >
                          {c.char}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const spoken = currentWord.gender ? `${currentWord.gender} ${currentWord.target_word}` : currentWord.target_word;
                      playTargetAudio(spoken, language.ttsLocale);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[var(--sub-alt-color)] hover:bg-[var(--main-color)]/10 text-[var(--main-color)] border border-[var(--sub-color)]/20 text-xs font-mono transition cursor-pointer"
                    title="Listen to pronunciation [R]"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>listen</span>
                    {settings.showKeyTips && (
                      <span className="keycap text-[10px]">r</span>
                    )}
                  </button>
                  <span className="text-sm font-mono text-[var(--sub-color)]">{currentWord.ipa}</span>
                </div>
                <p className="text-sm font-mono text-[var(--sub-color)] max-w-md mx-auto">{currentWord.etymology_derivation}</p>
                <div className="p-3 rounded bg-[var(--sub-alt-color)] font-mono max-w-md mx-auto border border-[var(--sub-color)]/15 text-left">
                  <div className="flex items-start justify-between gap-2">
                    <ExampleSentence
                      sentence={currentWord.context_phrase}
                      translation={currentWord.context_translation}
                      word={currentWord.target_word}
                      lang={language.id}
                    />
                    <button
                      type="button"
                      onClick={() => playTargetAudio(currentWord.context_phrase, language.ttsLocale)}
                      className="shrink-0 p-1 rounded bg-[var(--bg-color)] hover:bg-[var(--main-color)]/10 text-[var(--main-color)] border border-[var(--sub-color)]/20 transition cursor-pointer"
                      title="Listen to the example sentence"
                      aria-label="Listen to the example sentence"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* SM-2 Grade Buttons — sticky on phones so “good” is always reachable */}
              <div className="space-y-2 pt-2 sticky bottom-20 z-20 -mx-2 px-2 pb-2 rounded-lg bg-[var(--sub-alt-color)]/95 backdrop-blur sm:static sm:mx-0 sm:px-0 sm:pb-0 sm:bg-transparent sm:backdrop-blur-none">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => handleGrade(1)}
                    className="p-3.5 rounded-lg bg-[var(--error-color)]/10 hover:bg-[var(--error-color)]/20 border border-[var(--error-color)]/30 text-[var(--error-color)] font-semibold text-xs flex flex-col items-center gap-1.5 transition cursor-pointer"
                  >
                    <span className="text-sm font-bold font-mono">again</span>
                    {settings.showKeyTips && (
                      <span className="keycap text-[10px]">1</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGrade(3)}
                    className="p-3.5 rounded-lg bg-[var(--sub-color)]/10 hover:bg-[var(--sub-color)]/20 border border-[var(--sub-color)]/30 text-[var(--sub-color)] font-semibold text-xs flex flex-col items-center gap-1.5 transition cursor-pointer"
                  >
                    <span className="text-sm font-bold font-mono">hard</span>
                    {settings.showKeyTips && (
                      <span className="keycap text-[10px]">2</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGrade(4)}
                    className="p-3.5 rounded-lg bg-[var(--main-color)]/15 hover:bg-[var(--main-color)]/25 border-2 border-[var(--main-color)] text-[var(--main-color)] font-semibold text-xs flex flex-col items-center gap-1.5 transition cursor-pointer"
                  >
                    <span className="text-sm font-bold font-mono">good</span>
                    {settings.showKeyTips && (
                      <span className="keycap text-[10px]">3 / space</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGrade(5)}
                    className="p-3.5 rounded-lg bg-[var(--text-color)]/10 hover:bg-[var(--text-color)]/20 border border-[var(--text-color)]/30 text-[var(--text-color)] font-semibold text-xs flex flex-col items-center gap-1.5 transition cursor-pointer"
                  >
                    <span className="text-sm font-bold font-mono">easy</span>
                    {settings.showKeyTips && (
                      <span className="keycap text-[10px]">4</span>
                    )}
                  </button>
                </div>
                {settings.showKeyTips && (
                  <div className="text-center text-[11px] font-mono text-[var(--sub-color)] flex items-center justify-center gap-1">
                    <span>shortcuts:</span>
                    <span className="keycap text-[10px]">1</span>
                    <span className="keycap text-[10px]">2</span>
                    <span className="keycap text-[10px]">3</span>
                    <span className="keycap text-[10px]">4</span>
                    <span>(or</span>
                    <span className="keycap text-[10px]">space</span>
                    <span>for good)</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
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
          <div className="space-y-6">
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
                  className={`px-3 py-1 rounded-lg border transition cursor-pointer ${
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
                  className={`px-3 py-1 rounded-lg border transition cursor-pointer ${
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
                  className="w-full mt-2 px-3 py-1.5 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 text-xs font-mono text-[var(--text-color)] outline-none"
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
                  className="w-full mt-2 px-3 py-1.5 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 text-xs font-mono text-[var(--text-color)] outline-none"
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
                  rapid-fire 4-option article mcq ({language.genderSystem ? language.genderSystem.articles.join(" / ") : "der / die / das"}) for every gendered {language.name.toLowerCase()} noun. launches directly into mcq.
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
        </div>
        </>
      )}
      </>
      )}

      {/* REVIEW STYLE SELECTION MODAL */}
      {isModeSelectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-150">
          <div
            ref={modeDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-style-title"
            className="w-full max-w-xl rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/30 shadow-2xl p-6 sm:p-8 space-y-6"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono text-[var(--main-color)] uppercase tracking-widest font-semibold">
                review style
              </span>
              <h2 id="review-style-title" className="text-xl font-bold font-mono text-[var(--text-color)]">
                pick your review style
              </h2>
              <p className="text-sm font-mono text-[var(--sub-color)]">
                every style runs the same schedule, and you can switch mid-session at any time.
              </p>
            </div>

            <div className="space-y-2.5">
              {/* Option 1: Free recall (flashcards) */}
              <button
                type="button"
                onClick={() => selectReviewStyle("flashcard")}
                className={`w-full text-left p-4 rounded-lg bg-[var(--sub-alt-color)] hover:border-[var(--main-color)] border transition cursor-pointer flex items-center justify-between group ${
                  reviewMode === "flashcard"
                    ? "border-[var(--main-color)] ring-1 ring-[var(--main-color)]/40"
                    : "border-[var(--sub-color)]/20"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-sm text-[var(--text-color)] group-hover:text-[var(--main-color)] transition">
                      recall (flashcard)
                    </span>
                    {reviewMode === "flashcard" ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/30">
                        active
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[var(--sub-color)] bg-[var(--bg-color)] border border-[var(--sub-color)]/20">
                        recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-mono text-[var(--sub-color)]">
                    zero typing. recall in your mind, press space to reveal, rate 1–4.
                  </p>
                </div>
                <span className="keycap text-xs">
                  1
                </span>
              </button>

              {/* Option 2: Multiple Choice (MCQ) */}
              <button
                type="button"
                onClick={() => selectReviewStyle("mcq")}
                className={`w-full text-left p-4 rounded-lg bg-[var(--sub-alt-color)] hover:border-[var(--main-color)] border transition cursor-pointer flex items-center justify-between group ${
                  reviewMode === "mcq"
                    ? "border-[var(--main-color)] ring-1 ring-[var(--main-color)]/40"
                    : "border-[var(--sub-color)]/20"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-sm text-[var(--text-color)] group-hover:text-[var(--main-color)] transition">
                      multiple choice (mcq)
                    </span>
                    {effectiveReviewMode === "mcq" && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/30">
                        active
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-mono text-[var(--sub-color)]">
                    pick the {language.name.toLowerCase()} word from 4 options. press 1–4 keys or click.
                  </p>
                </div>
                <span className="keycap text-xs">
                  2
                </span>
              </button>

              {/* Option 3: Tile Builder */}
              <button
                type="button"
                onClick={() => selectReviewStyle("tiles")}
                className={`w-full text-left p-4 rounded-lg bg-[var(--sub-alt-color)] hover:border-[var(--main-color)] border transition cursor-pointer flex items-center justify-between group ${
                  reviewMode === "tiles"
                    ? "border-[var(--main-color)] ring-1 ring-[var(--main-color)]/40"
                    : "border-[var(--sub-color)]/20"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-sm text-[var(--text-color)] group-hover:text-[var(--main-color)] transition">
                      tile builder
                    </span>
                    {effectiveReviewMode === "tiles" && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/30">
                        active
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-mono text-[var(--sub-color)]">
                    tap letter and morpheme tiles into place to assemble the cognate.
                  </p>
                </div>
                <span className="keycap text-xs">
                  3
                </span>
              </button>

              {/* Option 4: Derivation Typing (Last) */}
              <button
                type="button"
                onClick={() => selectReviewStyle("typing")}
                className={`w-full text-left p-4 rounded-lg bg-[var(--sub-alt-color)] hover:border-[var(--main-color)] border transition cursor-pointer flex items-center justify-between group ${
                  reviewMode === "typing"
                    ? "border-[var(--main-color)] ring-1 ring-[var(--main-color)]/40"
                    : "border-[var(--sub-color)]/20"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-sm text-[var(--text-color)] group-hover:text-[var(--main-color)] transition">
                      derivation typing
                    </span>
                    {reviewMode === "typing" && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/30">
                        active
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-mono text-[var(--sub-color)]">
                    type the {language.name.toLowerCase()} word letter-by-letter with diacritic shortcuts.
                  </p>
                </div>
                <span className="keycap text-xs">
                  4
                </span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[var(--sub-color)]/20">
              <label className="flex items-center gap-2 text-sm font-mono text-[var(--sub-color)] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberPreference}
                  onChange={(e) => setRememberPreference(e.target.checked)}
                  className="rounded border-[var(--sub-color)]/30 bg-[var(--bg-color)] text-[var(--main-color)] focus:ring-0"
                />
                remember as default style
              </label>

              <button
                type="button"
                onClick={() => {
                  setIsModeSelectorOpen(false);
                }}
                className="text-sm font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] px-3 py-1.5 rounded hover:bg-[var(--sub-alt-color)] transition cursor-pointer flex items-center gap-1.5"
              >
                <span>cancel</span>
                <span className="keycap text-[10px]">esc</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
