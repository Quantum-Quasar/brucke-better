"use client";

import { useState, useEffect, useRef, useMemo, useCallback, type Dispatch, type SetStateAction, type RefObject } from "react";
import { clozeSentence } from "@/lib/sentence";
import { useBackDismiss } from "@/lib/use-back-dismiss";
import { useAppStore } from "@/lib/store";
import { useAppNavigation } from "@/lib/app-navigation";
import { readReviewSession } from "@/lib/review-session";
import { getDueCards, isReviewable, needsRelearn, localDateKey, type ReviewGrade } from "@/lib/srs";
import { DECK_CAPABILITIES, ALL_FAMILIES_ID, getAtlasFamilyWordIds, resolveCardReviewMode, filterByLearned, getRecentLessonWordIds, rankWeakestCards, sortDueCards, type LearnedFilter, type SessionSize, type ReviewDeckType } from "@/lib/review-decks";
import { generateMCQOptions, generateWordTiles } from "@/lib/review-modes";
import { getAtlasFamilies, getAtlasFamily } from "@/lib/atlas-families";
import { playTargetAudio } from "@/lib/audio";
import { getLanguageDefinition, type LanguageDefinition } from "@/data/languages";
import { buildWordEntityMaps } from "@/lib/word-entities-core";
import type { CompendiumData, LessonIndexEntry, MasteryState, ReviewMode, ShiftFamily, SRSCard, WordEntity } from "@/lib/types";
import type { ReviewSnapshot } from "@/lib/store/types";
import { hasBlockingKeyboardDialog, useDialogFocus } from "@/lib/use-dialog-focus";
import type { CustomizationSettings } from "@/data/settings";
import { useReviewAnswers } from "./use-review-answers";
import { createReviewGrading, EMPTY_SESSION_STATS, blankSessionGrades, type ReviewSessionStats, type SessionGrades } from "./review-grading";
import { useReviewLifecycle } from "./use-review-lifecycle";
import { orderReviewDeck } from "./review-deck-ordering";
import { buildTeachingLessonMap } from "@/lib/teaching-lessons";
type DeckType = ReviewDeckType;

/** Sentinel select value meaning "every family" / "every domain". */
const ALL_ID = ALL_FAMILIES_ID;


export interface ReviewHubProps {
  activeLanguageId: string;
  progressResetAt: number;
  progressResetActor: string;
  data: CompendiumData;
  lessons: LessonIndexEntry[];
}

export function useReviewController({ activeLanguageId, progressResetAt, progressResetActor, data, lessons }: ReviewHubProps): ReviewController {
  const language = getLanguageDefinition(activeLanguageId);
  const { openLesson } = useAppNavigation();
  // A session survives tab switches; the component remounts per language.
  const [restoredReview] = useState(() => readReviewSession(activeLanguageId, progressResetAt, progressResetActor));
  const restoredFamilies = getAtlasFamilies(data);
  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState(localDateKey);
  useEffect(() => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const refresh = () => setToday(localDateKey());
    const timer = window.setTimeout(refresh, midnight.getTime() - Date.now() + 50);
    window.addEventListener("focus", refresh);
    return () => { window.clearTimeout(timer); window.removeEventListener("focus", refresh); };
  }, [today]);
  const [activeDeck, setActiveDeck] = useState<DeckType | null>(restoredReview?.activeDeck ?? null);
  // Seeded from the active compendium's first atlas family: German, French and
  // Spanish each have their own family ids, so a hard-coded German id left the
  // select blank (and the deck disabled) for every non-German learner.
  const [selectedShiftId, setSelectedShiftId] = useState<string>(() => {
    const restored = restoredReview?.selectedShiftId;
    return restored && restoredFamilies.some((family) => family.id === restored)
      ? restored
      : restoredFamilies[0]?.id ?? ALL_ID;
  });
  const [selectedDomainId, setSelectedDomainId] = useState<string>(
    restoredReview?.selectedDomainId ?? ""
  );
  // The saved preference caps every vocabulary deck, not only discovery decks.
  const [learnedFilter, setLearnedFilter] = useState<LearnedFilter>(
    restoredReview?.learnedFilter ?? "all"
  );
  const sessionSize = useAppStore((s) => s.settings.reviewSessionLimit);
  const setSessionSize: Dispatch<SetStateAction<SessionSize>> = (value) => {
    useAppStore.getState().updateSetting("reviewSessionLimit", typeof value === "function" ? value(sessionSize) : value);
  };
  const [shuffleSession, setShuffleSession] = useState(restoredReview?.shuffleSession ?? true);
  const [sessionCards, setSessionCards] = useState<SRSCard[]>(restoredReview?.sessionCards ?? []);
  /**
   * Bumped on every deck start / exit. The per-card reset effect keys on the
   * card id, index and tile data — none of which change when a new session opens
   * on the same card the previous one ended on — so without this the tile rack
   * kept the old session's picked/unpicked tiles.
   */
  const [sessionEpoch, setSessionEpoch] = useState(restoredReview?.sessionEpoch ?? 0);
  const [currentIndex, setCurrentIndex] = useState(restoredReview?.currentIndex ?? 0);
  const [isRevealed, setIsRevealed] = useState(restoredReview?.isRevealed ?? false);
  const [isCapsLock, setIsCapsLock] = useState(false);
  const [sessionStats, setSessionStats] = useState<ReviewSessionStats>(
    restoredReview?.sessionStats ?? EMPTY_SESSION_STATS
  );
  const [sessionComplete, setSessionComplete] = useState(false);
  const [completedDeck, setCompletedDeck] = useState<DeckType | null>(null);

  /**
   * Grades applied to each deck position during this session, parallel to
   * sessionCards. Drives both "back" (undo the grade) and the per-card
   * re-grade semantics: going back to a word you already graded restores its
   * pre-session card so the next grade is a fresh SM-2 step, not a second one
   * stacked on top.
   */
  const [sessionGrades, setSessionGrades] = useState<SessionGrades>(
    restoredReview?.sessionGrades ?? []
  );
  /**
   * Each graded card's state before this session touched it, keyed by wordId.
   * Written on the card's first grade only, so stepping back and re-grading the
   * same word restores the same pre-session state every time.
   */
  const preGradeSnapshots = useRef<Record<string, ReviewSnapshot>>(
    restoredReview?.preGradeSnapshots ?? {}
  );

  // Review Style Mode State
  const preferredReviewMode = useAppStore((s) => s.preferredReviewMode);
  const setPreferredReviewMode = useAppStore((s) => s.setPreferredReviewMode);
  const settings = useAppStore((s) => s.settings);
  const hasSeenGenderIntro = useAppStore((s) => s.hasSeenGenderIntro);
  const [reviewMode, setReviewMode] = useState<ReviewMode>(
    restoredReview?.reviewMode ?? useAppStore.getState().preferredReviewMode ?? "flashcard"
  );
  const [isModeSelectorOpen, setIsModeSelectorOpen] = useState(false);
  const [rememberPreference, setRememberPreference] = useState(true);

  useBackDismiss(isModeSelectorOpen, () => setIsModeSelectorOpen(false));

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


  const sessionRef = useRef<HTMLDivElement>(null);


  const srsCards = useAppStore((s) => s.srsCards);
  const wordMastery = useAppStore((s) => s.wordMastery);
  const recordReview = useAppStore((s) => s.recordReview);
  const restoreSrsCard = useAppStore((s) => s.restoreSrsCard);

  // Durable card controls win over disposable sessionStorage and old tab snapshots.
  useEffect(() => {
    if (!activeDeck) return;
    const retained = sessionCards.map((card, index) => ({ card, index }))
      .filter(({ card }) => isReviewable(srsCards[card.word_id] ?? card, today));
    if (retained.length === sessionCards.length) return;
    setSessionCards(retained.map(({ card }) => card));
    setSessionGrades(retained.map(({ index }) => sessionGrades[index] ?? null));
    setCurrentIndex(retained.filter(({ index }) => index < currentIndex).length);
    setIsRevealed(false);
    setSessionEpoch((epoch) => epoch + 1);
    if (!retained.length || !retained.some(({ index }) => index >= currentIndex)) setActiveDeck(null);
  }, [srsCards, activeDeck, sessionCards, sessionGrades, currentIndex, today]);

  const completedLessons = useAppStore((s) => s.completedLessons);
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
  const weakestCards = useMemo(() => rankWeakestCards(srsCards, Infinity, today), [srsCards, today]);

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

  // Sync the preferred review mode from the store when the hub is idle; an
  // active (or restored) session owns the mode it was started with.
  useEffect(() => {
    if (!preferredReviewMode || activeDeck) return;
    setReviewMode(preferredReviewMode);
  }, [preferredReviewMode, activeDeck]);

  useReviewLifecycle(activeLanguageId, {
    progressResetAt, progressResetActor, activeDeck, selectedShiftId, selectedDomainId,
    learnedFilter, sessionSize, shuffleSession, sessionCards, sessionEpoch, currentIndex,
    isRevealed, sessionStats, sessionGrades, preGradeSnapshots: preGradeSnapshots.current, reviewMode,
  }, sessionRef);

  // Shared map keeps core words, compound calques, and false friends on the same detail path.
  const wordEntityMaps = useMemo(
    () => buildWordEntityMaps(activeLanguageId, data, lessons),
    [activeLanguageId, data, lessons]
  );
  const allWordsMap: Record<string, WordEntity> = wordEntityMaps.entities;
  const dueCards = useMemo(() => sortDueCards(getDueCards(srsCards, today), allWordsMap), [srsCards, allWordsMap, today]);

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
        srsCards,
        today
      ).map((entry) => entry.card),
    [compoundCards, learnedFilter, wordMastery, srsCards, today]
  );

  const sentenceEntities: WordEntity[] = wordEntityMaps.sentences;

  const sentenceCards: SRSCard[] = useMemo(() => {
    const completedSet = new Set(completedLessons);
    const filtered = sentenceEntities.filter((s) => {
      if (!isReviewable(srsCards[s.id], today)) return false;
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
  }, [sentenceEntities, completedLessons, wordMastery, srsCards, learnedFilter, blankCard, today]);

  const articleEntities: WordEntity[] = wordEntityMaps.articles;

  const articleCards: SRSCard[] = useMemo(() => {
    const filtered = articleEntities.filter((a) => {
      if (!isReviewable(srsCards[a.id], today)) return false;
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
  }, [articleEntities, wordMastery, srsCards, learnedFilter, blankCard, today]);

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
        srsCards,
        today
      ).map((w) => w.id),
    [learnedFilter, wordMastery, srsCards, today]
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
      ).filter((id) => isReviewable(srsCards[id], today)),
    [lessons, completedLessons, data, srsCards, today]
  );
  const learnedCards = useMemo(
    () => filterByLearned(data.wordList, "learned", wordMastery, srsCards, today).map((word) => blankCard(word.id)),
    [data.wordList, wordMastery, srsCards, blankCard, today]
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

    const cards = orderReviewDeck(deck, {
      dueCards, weakestCards, learnedCards, recentWordIds, scopedCompoundCards,
      sentenceCards, articleCards, blankCard, sessionSize, shuffleSession,
      shiftIds: () => shiftWordIds(selectedShiftId), domainIds: () => domainWordIds(selectedDomainId),
      everythingIds: () => scopeIds(data.wordList.map((word) => word.id)),
    }, customCards?.map((card) => srsCards[card.word_id] ?? card));
    setSessionCards(cards);
    setSessionGrades(blankSessionGrades(cards.length));
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
  const {
    inputGuess, setInputGuess, selectedOption, setSelectedOption, selectedTiles, setSelectedTiles,
    availableTiles, setAvailableTiles, currentAutoGrade, setCurrentAutoGrade, currentFeedbackNote,
    setCurrentFeedbackNote, inputRef, handleSelectMCQ, handlePickTile, handleUnpickTile,
    handleResetTiles, handleCheckTiles, handleCheckTyping, handleTypingInputChange,
  } = useReviewAnswers({ currentWord, currentCardId: currentCard?.word_id, currentIndex,
    sessionEpoch, tileData, isRevealed, setIsRevealed, settings, activeDeck, effectiveReviewMode });

  const { handleGrade, goBack, goForward, canGoBack, canGoForward } = createReviewGrading({
    currentCard, isRevealed, settings, currentIndex, sessionStats, wordMastery, sessionCards,
    activeDeck, sessionGrades, srsCards, preGradeSnapshots, blankCard, restoreSrsCard, recordReview,
    setSessionGrades, setSessionStats, setIsRevealed, setInputGuess, setSelectedOption,
    setSelectedTiles, setCurrentAutoGrade, setCurrentFeedbackNote, setCurrentIndex,
    setCompletedDeck, setSessionComplete, setActiveDeck,
  });


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
      if (e.defaultPrevented || hasBlockingKeyboardDialog(isModeSelectorOpen ? modeDialogRef.current : undefined)) return;
      const editable = e.target instanceof Element && e.target.closest("input, textarea, select, [contenteditable='true']");
      if (editable && e.target !== inputRef.current) return;
      if (e.target === inputRef.current && isRevealed && !["Escape", "Enter"].includes(e.key)) return;
      if (e.getModifierState) setIsCapsLock(e.getModifierState("CapsLock"));

      // Quick restart hotkey
      if (
        activeDeck &&
        !isModeSelectorOpen &&
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

      if ((e.key === "Enter" || e.key === " ") && e.target instanceof Element &&
          e.target.closest("button, a, select, [role='button']")) return;

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
  const activeCount = Object.values(srsCards).filter((card) => isReviewable(card)).length;

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
  const teachingLessons = useMemo(() => buildTeachingLessonMap(lessons), [lessons]);
  return {
    managedCards: mounted ? Object.values(srsCards).filter((card) => card.suspended || needsRelearn(card) || (card.buriedUntil && card.buriedUntil >= localDateKey())) : [],
    allWordsMap, wordLesson: teachingLessons,
    suspendCurrent: () => { if (currentCard) useAppStore.getState().suspendCard(currentCard.word_id, true); },
    buryCurrent: () => { if (currentCard) useAppStore.getState().buryCard(currentCard.word_id); },
    learnedCount: mounted ? learnedCards.length : 0,
    recallSource, mounted, language, activeDeck, hasAnyCards, completedLessons, activeLanguageId, lessons, openLesson,
    masteredCount, activeCount, dueCards, hasSeenGenderIntro, reviewMode, setReviewMode, setPreferredReviewMode, setIsModeSelectorOpen,
    currentCard, currentWord, sessionRef, currentIndex, sessionCards, supportedModesForCard, effectiveReviewMode,
    goBack, canGoBack, settings, goForward, canGoForward, exitDeck, wordMastery, isRevealed, currentCloze, setIsRevealed,
    mcqOptions, selectedOption, handleSelectMCQ, selectedTiles, handleUnpickTile, availableTiles, handlePickTile, handleResetTiles,
    handleCheckTiles, isCapsLock, inputRef, inputGuess, handleTypingInputChange, setIsCapsLock, setInputGuess, handleCheckTyping,
    currentFeedbackNote, handleGrade, sessionComplete, sessionStats, completedDeck, dueCount, weakestCount, startDeck, requestDeckStart,
    learnedFilter, setLearnedFilter, sessionSize, setSessionSize, shuffleSession, setShuffleSession, familyNoun,
    selectedShiftId, setSelectedShiftId, allFamilyWordIds, atlasFamilies, selectedShiftFamily, shiftCount, selectedDomainId,
    setSelectedDomainId, data, domainGroups, domainCount, recentCount, compoundExamples, trapExamples, compoundCount,
    sentenceCount, articleCount, everythingTotal, isModeSelectorOpen, modeDialogRef, selectReviewStyle, rememberPreference, setRememberPreference,
  };
}

type StateSetter<T> = Dispatch<SetStateAction<T>>;

export interface ReviewController extends Pick<ReviewHubProps, "activeLanguageId" | "data" | "lessons"> {
  managedCards: SRSCard[];
  allWordsMap: Record<string, WordEntity>;
  wordLesson: Map<string, number[]>;
  suspendCurrent: () => void;
  buryCurrent: () => void;
  language: LanguageDefinition;
  mounted: boolean;
  activeDeck: DeckType | null;
  hasAnyCards: boolean;
  completedLessons: number[];
  openLesson: (languageId: string, lessonId: number) => void;
  masteredCount: number;
  activeCount: number;
  dueCards: SRSCard[];
  hasSeenGenderIntro: boolean;
  reviewMode: ReviewMode;
  setReviewMode: StateSetter<ReviewMode>;
  setPreferredReviewMode: (mode: ReviewMode) => void;
  setIsModeSelectorOpen: StateSetter<boolean>;
  currentCard: SRSCard | undefined;
  currentWord: WordEntity | undefined;
  sessionRef: RefObject<HTMLDivElement | null>;
  currentIndex: number;
  sessionCards: SRSCard[];
  supportedModesForCard: ReviewMode[];
  effectiveReviewMode: ReviewMode;
  goBack: () => void;
  canGoBack: boolean;
  settings: CustomizationSettings;
  goForward: () => void;
  canGoForward: boolean;
  exitDeck: () => void;
  wordMastery: Record<string, MasteryState>;
  isRevealed: boolean;
  currentCloze: string | null;
  setIsRevealed: StateSetter<boolean>;
  mcqOptions: string[];
  selectedOption: string | null;
  handleSelectMCQ: (option: string) => void;
  selectedTiles: string[];
  handleUnpickTile: (tile: string, index: number) => void;
  availableTiles: string[];
  handlePickTile: (tile: string, index: number) => void;
  handleResetTiles: () => void;
  handleCheckTiles: () => void;
  isCapsLock: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  inputGuess: string;
  handleTypingInputChange: (value: string) => void;
  setIsCapsLock: StateSetter<boolean>;
  setInputGuess: StateSetter<string>;
  handleCheckTyping: () => void;
  currentFeedbackNote: string | null;
  handleGrade: (grade: ReviewGrade) => void;
  sessionComplete: boolean;
  sessionStats: ReviewSessionStats;
  completedDeck: DeckType | null;
  dueCount: number;
  weakestCount: number;
  learnedCount: number;
  startDeck: (deck: DeckType, customCards?: SRSCard[]) => void;
  requestDeckStart: (deck: DeckType, customCards?: SRSCard[]) => void;
  learnedFilter: LearnedFilter;
  setLearnedFilter: StateSetter<LearnedFilter>;
  sessionSize: SessionSize;
  setSessionSize: StateSetter<SessionSize>;
  shuffleSession: boolean;
  setShuffleSession: StateSetter<boolean>;
  familyNoun: string;
  selectedShiftId: string;
  setSelectedShiftId: StateSetter<string>;
  allFamilyWordIds: string[];
  atlasFamilies: ShiftFamily[];
  selectedShiftFamily: ShiftFamily | undefined;
  shiftCount: number;
  selectedDomainId: string;
  setSelectedDomainId: StateSetter<string>;
  domainGroups: Array<{ id: string; label: string; words: WordEntity[] }>;
  domainCount: number;
  recentCount: number;
  compoundExamples: string;
  trapExamples: string;
  compoundCount: number;
  sentenceCount: number;
  articleCount: number;
  everythingTotal: number;
  isModeSelectorOpen: boolean;
  modeDialogRef: RefObject<HTMLDivElement | null>;
  selectReviewStyle: (mode: ReviewMode) => void;
  rememberPreference: boolean;
  setRememberPreference: StateSetter<boolean>;
  recallSource: string;
}
