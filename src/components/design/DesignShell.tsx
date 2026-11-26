"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { DesignRail } from "@/components/design/DesignRail";
import { DesignMobileDock } from "@/components/design/DesignMobileDock";
import { DesignSubviewSheet } from "@/components/design/DesignSubviewSheet";
import { StorageWarningBanner } from "@/components/common/StorageWarningBanner";
import { BackupReminder } from "@/components/common/BackupReminder";
import { LazyLoadBoundary } from "@/components/common/LazyLoadBoundary";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { readStorageString, writeStorageString } from "@/lib/safe-storage";

const DESIGN_MODE_STORAGE_KEY = "brucke.design.mode.v1";

const WordCardDrawer = dynamic(
  () => import("@/components/common/WordCardDrawer").then((m) => m.WordCardDrawer),
  { ssr: false }
);
const OnboardingModal = dynamic(
  () => import("@/components/common/OnboardingModal").then((m) => m.OnboardingModal),
  { ssr: false }
);
const ThemeSelectorModal = dynamic(
  () => import("@/components/common/ThemeSelectorModal").then((m) => m.ThemeSelectorModal),
  { ssr: false }
);
const FontSelectorModal = dynamic(
  () => import("@/components/common/FontSelectorModal").then((m) => m.FontSelectorModal),
  { ssr: false }
);
const VoiceGuidanceSheet = dynamic(
  () => import("@/components/common/VoiceGuidanceSheet").then((m) => m.VoiceGuidanceSheet),
  { ssr: false }
);
const SearchDialog = dynamic(
  () => import("@/components/navigation/SearchDialog"),
  { ssr: false }
);

function SheetLoading({ label }: { label: string }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center design-mono" role="status">
      <p className="text-sm text-[var(--design-ink-muted)]">Loading {label}…</p>
    </div>
  );
}

const LessonView = dynamic(
  () => import("@/components/lesson/LessonView").then((m) => m.LessonView),
  { ssr: false, loading: () => <SheetLoading label="lesson" /> }
);
const ConstellationDetailClient = dynamic(
  () =>
    import("@/components/atlas/ConstellationDetailClient").then(
      (m) => m.ConstellationDetailClient
    ),
  { ssr: false, loading: () => <SheetLoading label="atlas family" /> }
);
const MasterView = dynamic(
  () => import("@/components/atlas/MasterView").then((m) => m.MasterView),
  { ssr: false, loading: () => <SheetLoading label="master web" /> }
);

function DesignViewNotice() {
  const notice = useViewStore((s) => s.notice);
  const dismiss = useViewStore((s) => s.dismissNotice);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(dismiss, 5000);
    return () => window.clearTimeout(timer);
  }, [notice, dismiss]);

  if (!notice) return null;
  return (
    <div
      role="status"
      className="fixed left-1/2 bottom-24 lg:bottom-6 z-50 -translate-x-1/2 rounded-full border border-[var(--design-border-strong)] bg-[var(--design-surface)] px-4 py-2.5 text-xs font-medium text-[var(--design-ink)] shadow-lg flex items-center gap-3 max-w-[calc(100vw-2rem)]"
    >
      <span>{notice}</span>
      <button
        type="button"
        onClick={dismiss}
        className="design-mono text-[11px] font-bold text-[var(--design-sapphire)] underline underline-offset-2 cursor-pointer shrink-0"
      >
        Dismiss
      </button>
    </div>
  );
}

export function DesignShell({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [searchOpen, setSearchOpen] = useState(false);

  const subView = useViewStore((s) => s.subView);
  const closeSubview = useViewStore((s) => s.closeSubview);
  const isOnboardingOpen = useAppStore((s) => s.isOnboardingOpen);
  const isThemeSelectorOpen = useAppStore((s) => s.isThemeSelectorOpen);
  const isFontSelectorOpen = useAppStore((s) => s.isFontSelectorOpen);
  const activeWordDrawerId = useAppStore((s) => s.activeWordDrawerId);

  // Restore saved Daylight/Twilight preference
  useEffect(() => {
    const saved = readStorageString(DESIGN_MODE_STORAGE_KEY);
    if (saved === "dark" || saved === "light") {
      setMode(saved);
    }
  }, []);

  // Global Cmd/Ctrl+K shortcut for Atelier SearchDialog
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      writeStorageString(DESIGN_MODE_STORAGE_KEY, next);
      return next;
    });
  };

  return (
    <div className="design-ui" data-design-mode={mode}>
      <a href="#design-main" className="skip-link">
        Skip to content
      </a>

      <div className="design-shell-grid">
        <DesignRail
          mode={mode}
          onToggleMode={toggleMode}
          onOpenSearch={() => setSearchOpen(true)}
        />

        <div className="design-main-column">
          <StorageWarningBanner />

          <DesignMobileDock
            mode={mode}
            onToggleMode={toggleMode}
            onOpenSearch={() => setSearchOpen(true)}
          />

          {!subView && !isOnboardingOpen && <BackupReminder />}

          <main
            id="design-main"
            className="flex-1 pb-28 lg:pb-12 min-w-0"
            inert={subView !== null}
            aria-hidden={subView !== null}
          >
            {children}
          </main>
        </div>
      </div>

      {/* Global Drawers & Modals inside .design-ui so they inherit Atelier CSS variables */}
      <LazyLoadBoundary label="some panels">
        {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
        {activeWordDrawerId && <WordCardDrawer />}
        {isOnboardingOpen && <OnboardingModal />}
        {isThemeSelectorOpen && <ThemeSelectorModal />}
        {isFontSelectorOpen && <FontSelectorModal />}
      </LazyLoadBoundary>

      <LazyLoadBoundary label="this view">
        {subView?.kind === "lesson" && (
          <DesignSubviewSheet
            key={`lesson:${subView.languageId}:${subView.lessonId}`}
            eyebrow="Interactive Lesson"
            label={`Lesson ${subView.lessonId}`}
            onClose={closeSubview}
          >
            <LessonView languageId={subView.languageId} lessonId={subView.lessonId} />
          </DesignSubviewSheet>
        )}

        {subView?.kind === "atlasFamily" && (
          <DesignSubviewSheet
            key={`family:${subView.familyId}`}
            eyebrow="Phonological Atlas"
            label="Cognate Family"
            onClose={closeSubview}
            dockClearance
          >
            <ConstellationDetailClient
              familyId={subView.familyId}
              ownerLanguageIds={subView.ownerLanguageIds}
              onBack={closeSubview}
            />
          </DesignSubviewSheet>
        )}

        {subView?.kind === "atlasMaster" && (
          <DesignSubviewSheet
            key="atlas-master"
            eyebrow="Phonological Atlas"
            label="Master Cognate Web"
            onClose={closeSubview}
            dockClearance
          >
            <MasterView onBack={closeSubview} />
          </DesignSubviewSheet>
        )}
      </LazyLoadBoundary>

      {subView?.kind === "lesson" && !isOnboardingOpen && (
        <VoiceGuidanceSheet key={subView.languageId} languageId={subView.languageId} />
      )}

      <DesignViewNotice />
    </div>
  );
}
