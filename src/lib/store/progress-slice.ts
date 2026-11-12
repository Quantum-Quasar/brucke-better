import type { AppState, StoreSlice } from "./types";
import { saveState } from "./persistence";
import type { MasteryState, LessonStar } from "../types";
import { createInitialCard } from "../srs";
import { isValidLanguageId } from "@/data/languages";
import { emptyVersions, sliceFromMirrors, getWeekString } from "./progress-state";
import { sanitizeLessonProgressEntry } from "./schema";

export const createProgressSlice: StoreSlice<"setActiveLanguage" | "markWordExplored" | "markWordEncountered" | "seedSrsCards" | "markWordsEncountered" | "markWordMastered" | "passGate" | "completeLesson" | "setLessonProgress" | "logDailyActivity"> = (set, get) => ({
  setActiveLanguage: (languageId) => {
    if (!isValidLanguageId(languageId)) return;
    set((s) => {
      if (s.activeLanguageId === languageId) return s;
      // park the outgoing language's mirrored progress, then restore the
      // incoming language's slice (or a fresh one for a first-time language)
      const progressByLanguage = {
        ...s.progressByLanguage,
        [s.activeLanguageId]: sliceFromMirrors(s),
      };
      const incoming = progressByLanguage[languageId];
      // the intro is not marked seen at selection time — only completing the
      // wizard (completeOnboarding) marks it, so an early dismissal replays it
      const next: AppState = {
        ...s,
        activeLanguageId: languageId,
        progressByLanguage,
        progressVersions: incoming?.progressVersions ?? emptyVersions(),
        completedLessons: incoming?.completedLessons || [],
        currentLessonId: incoming?.currentLessonId || 1,
        lessonProgress: incoming?.lessonProgress || {},
        lessonStars: incoming?.lessonStars || {},
        passedGateIds: incoming?.passedGateIds || [],
        wordMastery: incoming?.wordMastery || {},
        srsCards: incoming?.srsCards || {},
        sentenceCards: incoming?.sentenceCards || {},
        weeklyActivity: incoming?.weeklyActivity || [false, false, false, false, false, false, false],
        lastActivityWeek: incoming?.lastActivityWeek,
        activeWordDrawerId: null,
        // a language's introduction plays the first time it is chosen
        isOnboardingOpen: !s.seenIntroLanguages.includes(languageId),
        onboardingIntroLanguage: s.seenIntroLanguages.includes(languageId) ? null : languageId,
      };
      saveState(next);
      return next;
    });
  },

  markWordExplored: (wordId) => {
    const id = wordId.trim();
    set((s) => {
      const current = s.wordMastery[id];
      if (current === "explored" || current === "encountered" || current === "mastered") return s;
      const updated = { ...s.wordMastery, [id]: "explored" as MasteryState };
      const next = { ...s, wordMastery: updated };
      saveState(next);
      return next;
    });
  },

  markWordEncountered: (wordId) => {
    const id = wordId.trim();
    set((s) => {
      const current = s.wordMastery[id];
      if (current === "mastered" || (current === "encountered" && s.srsCards[id])) return s;
      const updated = { ...s.wordMastery, [id]: "encountered" as MasteryState };
      // Also register card in SRS if not present
      const srsCards = { ...s.srsCards };
      if (!srsCards[id]) {
        srsCards[id] = createInitialCard(id);
      }
      const next = { ...s, wordMastery: updated, srsCards };
      saveState(next);
      return next;
    });
  },

  seedSrsCards: (wordIds) => {
    set((s) => {
      const missing = Array.from(new Set(wordIds.map((w) => w.trim()))).filter((id) => id && !s.srsCards[id]);
      if (missing.length === 0) return s;
      const srsCards = { ...s.srsCards };
      const wordMastery = { ...s.wordMastery };
      for (const id of missing) {
        srsCards[id] = createInitialCard(id);
        // Finished-lesson words are "encountered", not mastered. This keeps the
        // header progress counter moving without pretending review is done.
        if (!id.startsWith("sentence_") && !id.startsWith("article_") && wordMastery[id] !== "mastered") {
          wordMastery[id] = "encountered";
        }
      }
      const next = { ...s, srsCards, wordMastery };
      saveState(next);
      return next;
    });
  },

  markWordsEncountered: (wordIds) => {
    set((s) => {
      const updatedMastery = { ...s.wordMastery };
      const srsCards = { ...s.srsCards };
      let changed = false;

      for (const rawId of wordIds) {
        const wordId = rawId.trim();
        const current = updatedMastery[wordId];
        if (current !== "mastered") {
          if (current !== "encountered") {
            updatedMastery[wordId] = "encountered";
            changed = true;
          }
          if (!srsCards[wordId]) {
            srsCards[wordId] = createInitialCard(wordId);
            changed = true;
          }
        }
      }

      if (!changed) return s;
      const next = { ...s, wordMastery: updatedMastery, srsCards };
      saveState(next);
      return next;
    });
  },

  markWordMastered: (wordId) => {
    const id = wordId.trim();
    set((s) => {
      if (s.wordMastery[id] === "mastered") return s;
      const updated = { ...s.wordMastery, [id]: "mastered" as MasteryState };
      const next = { ...s, wordMastery: updated };
      saveState(next);
      return next;
    });
  },

  passGate: (gateId) => {
    if (!Number.isSafeInteger(gateId) || gateId <= 0) return;
    set((s) => {
      if (s.passedGateIds.includes(gateId)) return s;
      const next = { ...s, passedGateIds: [...s.passedGateIds, gateId] };
      saveState(next);
      return next;
    });
  },

  completeLesson: (lessonId, opts) => {
    set((s) => {
      const nextStars =
        opts?.perfect || s.lessonStars[lessonId] === "purple"
          ? { ...s.lessonStars, [lessonId]: "purple" as LessonStar }
          : s.lessonStars[lessonId]
          ? s.lessonStars
          : { ...s.lessonStars, [lessonId]: "gold" as LessonStar };
      const completed = s.completedLessons.includes(lessonId)
        ? s.completedLessons
        : [...s.completedLessons, lessonId];
      const nextLesson =
        opts?.nextLessonId === null
          ? Math.max(s.currentLessonId, lessonId)
          : opts?.nextLessonId !== undefined
            ? Math.max(s.currentLessonId, opts.nextLessonId)
            : Math.max(s.currentLessonId, lessonId + 1);
      if (completed === s.completedLessons && s.currentLessonId >= nextLesson && nextStars === s.lessonStars) return s;
      const next = { ...s, completedLessons: completed, currentLessonId: nextLesson, lessonStars: nextStars };
      saveState(next);
      return next;
    });
    get().logDailyActivity();
  },

  setLessonProgress: (lessonId, progress) => {
    // a caller (or a restored payload) must not be able to wedge resume state
    // with an entry missing completedSegments
    const safeProgress = sanitizeLessonProgressEntry(progress);
    if (!safeProgress) return;
    set((s) => {
      const current = s.lessonProgress[lessonId];
      if (
        current &&
        current.segment === safeProgress.segment &&
        current.practiceIndex === safeProgress.practiceIndex &&
        current.everQueued === safeProgress.everQueued &&
        current.completedSegments.length === safeProgress.completedSegments.length &&
        current.completedSegments.every((segment, index) => segment === safeProgress.completedSegments[index]) &&
        current.inRetryPhase === safeProgress.inRetryPhase &&
        current.retryIndex === safeProgress.retryIndex &&
        (current.retryExerciseIds ?? []).length === (safeProgress.retryExerciseIds ?? []).length &&
        (current.retryExerciseIds ?? []).every((id, index) => id === safeProgress.retryExerciseIds?.[index])
      ) {
        return s;
      }
      const next = {
        ...s,
        lessonProgress: { ...s.lessonProgress, [lessonId]: safeProgress },
      };
      saveState(next);
      return next;
    });
  },

  logDailyActivity: () => {
    set((s) => {
      const now = new Date();
      const currentWeek = getWeekString(now);
      const isNewWeek = Boolean(s.lastActivityWeek && s.lastActivityWeek !== currentWeek);
      const day = (now.getDay() + 6) % 7; // Monday = 0
      const updated = isNewWeek ? [false, false, false, false, false, false, false] : [...s.weeklyActivity];
      updated[day] = true;
      const next = { ...s, weeklyActivity: updated, lastActivityWeek: currentWeek };
      saveState(next);
      return next;
    });
  },
});
