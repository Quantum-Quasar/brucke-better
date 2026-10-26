"use client";

// Three-step intro: pick a language, see the core sound-law idea, then start.
// Everything else (notation, pillars, posture) is taught in context inside the
// first lesson instead of gating the first German word behind six screens.

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Check,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { LANGUAGES, getLanguageDefinition, isValidLanguageId } from "@/data/languages";
import { getCourseCounts } from "@/data/word-counts";
import { THEME_COUNT } from "@/lib/theme-runtime";
import { FONT_LIST } from "@/data/fonts";
import { ShiftPair } from "@/components/common/ShiftPair";
import { useDialogFocus } from "@/lib/use-dialog-focus";

export const OnboardingModal: React.FC = () => {
  const isOpen = useAppStore((s) => s.isOnboardingOpen);
  const hasCompletedOnboarding = useAppStore((s) => s.hasCompletedOnboarding);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const closeOnboarding = useAppStore((s) => s.closeOnboarding);
  const setActiveLanguage = useAppStore((s) => s.setActiveLanguage);
  const onboardingIntroLanguage = useAppStore((s) => s.onboardingIntroLanguage);
  const storeLanguageId = useAppStore((s) => s.activeLanguageId);
  const router = useRouter();
  const pathname = usePathname();

  const TOTAL_STEPS = 3;
  const [step, setStep] = useState(0);
  const [introLanguageId, setIntroLanguageId] = useState<string | null>(null);
  const [activeShiftDemo, setActiveShiftDemo] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);

  const effectiveLanguageId = introLanguageId || storeLanguageId;
  const language = getLanguageDefinition(effectiveLanguageId);
  const intro = language.onboarding;
  const counts = getCourseCounts(effectiveLanguageId);
  const lessonCount = counts.lessons;
  const topicCount = counts.topics;
  const wordCount = counts.words;
  const familyCount = counts.families;
  const familyWord = effectiveLanguageId === "fr" ? "conversion families" : "sound-shift families";

  const availableLanguages = LANGUAGES.filter((l) => l.status === "available");
  const singleLanguage = availableLanguages.length === 1;
  const firstStep = singleLanguage ? 1 : 0;

  useDialogFocus({
    open: isOpen,
    containerRef: dialogRef,
    onEscape: closeOnboarding,
  });

  // Every fresh opening starts clean. A completed learner using the guide
  // re-enters at the language's core idea, not the picker they already know.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (isOpen && !wasOpen.current) {
      if (onboardingIntroLanguage && isValidLanguageId(onboardingIntroLanguage)) {
        setIntroLanguageId(onboardingIntroLanguage);
        setStep(1);
      } else if (hasCompletedOnboarding) {
        setIntroLanguageId(storeLanguageId);
        setStep(1);
      } else if (singleLanguage) {
        setIntroLanguageId(availableLanguages[0].id);
        setStep(1);
      } else {
        setIntroLanguageId(null);
        setStep(0);
      }
      setActiveShiftDemo(0);
    }
    wasOpen.current = isOpen;
  }, [isOpen, onboardingIntroLanguage, hasCompletedOnboarding, storeLanguageId, singleLanguage, availableLanguages]);

  const selectLanguage = (id: string) => {
    setIntroLanguageId(id);
    setActiveShiftDemo(0);
    setActiveLanguage(id);
  };

  const finishOnboarding = () => {
    const wasFirstRun = !hasCompletedOnboarding;
    completeOnboarding();
    // Starting the course is only the right move when the visitor is already
    // on the homepage. A shared /trail/5 link keeps them on the shared lesson.
    if (wasFirstRun && pathname === "/" && language.status === "available") {
      router.push(`/trail/${effectiveLanguageId}/1`);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || (e.key === "Enter" && !e.shiftKey)) {
        const target = e.target as HTMLElement | null;
        if (e.key === "Enter" && target?.closest("button, a, input, select, textarea")) return;
        e.preventDefault();
        if (step < TOTAL_STEPS - 1) {
          setStep((s) => s + 1);
        } else {
          finishOnboarding();
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (step > firstStep) {
          setStep((s) => s - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, step, closeOnboarding, language.id, hasCompletedOnboarding, pathname]);

  if (!isOpen) return null;

  const isAvailable = language.status === "available";
  const isGuide = hasCompletedOnboarding;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-200">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Brücke introduction"
        className="w-full max-w-2xl rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        <div className="px-6 py-4 flex items-center justify-between border-b border-[var(--sub-color)]/20 bg-[var(--sub-alt-color)]">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--main-color)] font-semibold">
            brücke • {isGuide ? "quick guide" : `step ${step + 1} / ${TOTAL_STEPS}`}
            {step > 0 && (
              <span className="text-[var(--sub-color)]">
                {" "}
                • {language.flag} {language.nativeName}
              </span>
            )}
          </span>

          <button
            type="button"
            onClick={closeOnboarding}
            className="text-xs font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] transition flex items-center gap-1.5 cursor-pointer"
            title={isGuide ? "Close guide (Esc)" : "Skip introduction (Esc)"}
          >
            <span>{isGuide ? "close" : "skip"}</span>
            <span className="keycap text-[10px]">esc</span>
          </button>
        </div>

        <div className="px-6 sm:px-8 py-6 overflow-y-auto space-y-6 flex-1">
          {/* STEP 0 — LANGUAGE */}
          {step === 0 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[var(--main-color)] uppercase tracking-wider font-semibold">
                  welcome to brücke
                </span>
                <h2 className="text-2xl font-bold font-mono text-[var(--text-color)] tracking-tight">
                  which language do you want to learn?
                </h2>
                <p className="text-sm font-mono text-[var(--sub-color)] leading-relaxed">
                  every language gets its own trail, its own cognate engine, and its own introduction.
                  you can switch anytime — each language keeps its own progress.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => selectLanguage(lang.id)}
                    aria-pressed={effectiveLanguageId === lang.id}
                    className={`p-3 sm:p-4 rounded-lg border text-left space-y-2 transition cursor-pointer group ${
                      effectiveLanguageId === lang.id
                        ? "bg-[var(--main-color)]/10 border-[var(--main-color)]/60"
                        : "bg-[var(--sub-alt-color)] border-[var(--sub-color)]/20 hover:border-[var(--main-color)]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl" aria-hidden>{lang.flag}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--main-color)]/15 text-[var(--main-color)] font-bold uppercase tracking-wider">
                        <Check className="w-3 h-3" /> available
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-sm font-bold font-mono text-[var(--text-color)] group-hover:text-[var(--main-color)] transition">
                        {lang.name}
                      </div>
                      <div className="text-[10px] font-mono text-[var(--sub-color)] uppercase tracking-wider">
                        {lang.nativeName}
                      </div>
                    </div>
                    <p className="hidden sm:block text-[11px] font-mono text-[var(--sub-color)] leading-relaxed">
                      {lang.blurb}
                    </p>
                  </button>
                ))}
              </div>

            </div>
          )}

          {/* STEP 1 — CORE IDEA + DEMO */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[var(--main-color)] uppercase tracking-wider font-semibold">
                  {language.flag} {language.name} • core principle
                </span>
                <h2 className="text-2xl font-bold font-mono text-[var(--text-color)] tracking-tight">
                  {intro.philosophy.heading}
                </h2>
                <p className="text-sm font-mono text-[var(--sub-color)] leading-relaxed">
                  {intro.philosophy.body}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-3">
                <div className="text-xs font-mono text-[var(--sub-color)] uppercase tracking-wider">
                  {intro.philosophy.demoTitle}
                </div>

                <div className="flex flex-wrap gap-2">
                  {intro.philosophy.demos.map((demo, idx) => (
                    <button
                      key={demo.english}
                      type="button"
                      onClick={() => setActiveShiftDemo(idx)}
                      className={`px-3 py-1.5 rounded text-xs font-mono transition cursor-pointer ${
                        activeShiftDemo === idx
                          ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold"
                          : "bg-[var(--bg-color)] text-[var(--sub-color)] hover:text-[var(--text-color)] border border-[var(--sub-color)]/20"
                      }`}
                    >
                      {demo.english} → {demo.target}
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 text-center space-y-2">
                  <ShiftPair
                    english={intro.philosophy.demos[activeShiftDemo].english}
                    german={intro.philosophy.demos[activeShiftDemo].target}
                    gender={intro.philosophy.demos[activeShiftDemo].gender}
                    rule={intro.philosophy.demos[activeShiftDemo].rule}
                    wordId={intro.philosophy.demos[activeShiftDemo].wordId}
                    showDetailsOnClick={Boolean(intro.philosophy.demos[activeShiftDemo].wordId)}
                    className="text-lg px-3 py-1.5"
                  />
                  <p className="text-xs font-mono text-[var(--sub-color)] max-w-md mx-auto italic">
                    &quot;{intro.philosophy.demos[activeShiftDemo].note}&quot;
                  </p>
                </div>
              </div>

              <p className="text-xs font-mono text-[var(--sub-color)] leading-relaxed">
                That&apos;s the whole premise. The trail turns this into {topicCount} topics of
                pattern practice, each with short exercises and a review queue.
              </p>
            </div>
          )}

          {/* STEP 2 — READY */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-2 max-w-lg font-mono">
                <div className="text-3xl" aria-hidden>{language.flag}</div>
                <h2 className="text-2xl font-bold text-[var(--text-color)] tracking-tight">
                  ready to begin {language.flag} {language.name}
                </h2>
                <p className="text-sm text-[var(--sub-color)] leading-relaxed">{intro.ready.body}</p>
              </div>

              <div className="p-4 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-sm font-mono text-[var(--sub-color)] space-y-2">
                <div className="flex items-center gap-2 text-[var(--main-color)] font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>the short version</span>
                </div>
                <p className="text-[var(--text-color)] leading-relaxed">
                  Pause, say the answer out loud, then type it. Wrong answers become reps in the
                  retry queue — nothing here is graded against you.
                </p>
                <p className="leading-relaxed">
                  Forget a word? Let it go. Review brings it back at the right moment; rewinding a
                  lesson is not the move.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-[var(--main-color)] font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>trail</span>
                  </div>
                  <p className="text-[var(--sub-color)] leading-relaxed">
                    {isAvailable
                      ? `${topicCount} topics · ${lessonCount} lessons, plus optional extra practice.`
                      : "the trail for this language is still being authored."}
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-[var(--main-color)] font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>atlas &amp; review</span>
                  </div>
                  <p className="text-[var(--sub-color)] leading-relaxed">
                    {isAvailable
                      ? `${familyCount} ${familyWord}, ${wordCount} indexed words, and an sm-2 review queue.`
                      : "atlas and review unlock when the language content lands."}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-[var(--sub-color)]/20 bg-[var(--bg-color)] font-mono text-xs text-[var(--sub-color)] space-y-1.5">
                <div className="text-[var(--main-color)] font-bold">quick guide</div>
                <p>
                  • <strong className="text-[var(--text-color)]">themes</strong>: {THEME_COUNT} colour
                  schemes in the top-right palette control, with {FONT_LIST.length} fonts in settings.
                </p>
                <p>
                  • <strong className="text-[var(--text-color)]">keyboard</strong>: esc, space and 1–4 work
                  inside lessons and review; they are not global shortcuts.
                </p>
                <p>
                  • <strong className="text-[var(--text-color)]">progress</strong>: stored in this browser,
                  no account needed. each language keeps its own trail and review queue.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-[var(--sub-alt-color)] border-t border-[var(--sub-color)]/20 flex items-center justify-between gap-4 font-mono">
          <div className="flex items-center gap-1.5" aria-hidden>
            {Array.from({ length: TOTAL_STEPS }, (_, i) => i).map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStep(i)}
                disabled={i < firstStep}
                tabIndex={-1}
                className={`h-1.5 rounded transition-all ${i < firstStep ? "opacity-30 cursor-default" : "cursor-pointer"} ${
                  step === i ? "w-5 bg-[var(--main-color)]" : "w-1.5 bg-[var(--sub-color)]/30 hover:bg-[var(--sub-color)]/60"
                }`}
                title={`Go to step ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            {step > firstStep && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="px-3 py-1.5 rounded bg-[var(--bg-color)] hover:border-[var(--sub-color)] border border-[var(--sub-color)]/20 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] transition flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>back</span>
              </button>
            )}

            {step === 0 ? (
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={!effectiveLanguageId}
                className="px-4 py-1.5 rounded bg-[var(--main-color)] hover:opacity-90 disabled:opacity-40 text-[var(--bg-color)] font-bold text-xs font-mono transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>continue with {language.flag} {language.name}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ) : step < TOTAL_STEPS - 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="px-4 py-1.5 rounded bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-bold text-xs font-mono transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>next</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ) : (
              <button
                type="button"
                onClick={finishOnboarding}
                className="px-5 py-1.5 rounded bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-bold text-xs font-mono transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>
                  {isGuide
                    ? "close guide"
                    : pathname !== "/"
                    ? "keep exploring this page"
                    : isAvailable
                    ? "start lesson 1"
                    : "explore the app"}
                </span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
