"use client";

import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./taste.css";
import { TasteNav } from "./TasteNav";
import { TasteMobileBar } from "./TasteMobileBar";
import { TasteSubviewOverlay } from "./TasteSubviewOverlay";
import { StorageWarningBanner } from "@/components/common/StorageWarningBanner";
import { BackupReminder } from "@/components/common/BackupReminder";
import { LazyLoadBoundary } from "@/components/common/LazyLoadBoundary";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { isModifiedClick } from "@/lib/app-navigation";

const SCHEME_STORAGE_KEY = "brucke-taste-scheme";

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

function TasteOverlayLoading({ label }: { label: string }) {
  return (
    <div className="taste-wrap py-20 text-center taste-mono" role="status">
      <p className="text-sm text-[var(--taste-muted)]">Loading {label}…</p>
    </div>
  );
}

const LessonView = dynamic(
  () => import("@/components/lesson/LessonView").then((m) => m.LessonView),
  { ssr: false, loading: () => <TasteOverlayLoading label="lesson" /> }
);
const ConstellationDetailClient = dynamic(
  () =>
    import("@/components/atlas/ConstellationDetailClient").then(
      (m) => m.ConstellationDetailClient
    ),
  { ssr: false, loading: () => <TasteOverlayLoading label="atlas family" /> }
);
const MasterView = dynamic(
  () => import("@/components/atlas/MasterView").then((m) => m.MasterView),
  { ssr: false, loading: () => <TasteOverlayLoading label="master web" /> }
);

function TasteViewNotice() {
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
      className="fixed left-1/2 bottom-20 lg:bottom-8 z-50 -translate-x-1/2 flex items-center gap-3 rounded-lg border border-[var(--taste-border-strong)] bg-[var(--taste-surface)] px-4 py-2.5 taste-mono text-xs text-[var(--taste-ink)] shadow-lg"
    >
      <span>{notice}</span>
      <button
        type="button"
        onClick={dismiss}
        className="text-[var(--taste-accent)] font-semibold underline underline-offset-2 cursor-pointer"
      >
        Dismiss
      </button>
    </div>
  );
}

export function TasteShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const subView = useViewStore((s) => s.subView);
  const closeSubview = useViewStore((s) => s.closeSubview);

  const isOnboardingOpen = useAppStore((s) => s.isOnboardingOpen);
  const isThemeSelectorOpen = useAppStore((s) => s.isThemeSelectorOpen);
  const isFontSelectorOpen = useAppStore((s) => s.isFontSelectorOpen);
  const activeWordDrawerId = useAppStore((s) => s.activeWordDrawerId);

  const [scheme, setScheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SCHEME_STORAGE_KEY);
      if (saved === "dark" || saved === "light") {
        setScheme(saved);
        return;
      }
      if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
        setScheme("dark");
      }
    } catch {
      // ignore storage restrictions
    }
  }, []);

  const toggleScheme = useCallback(() => {
    setScheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem(SCHEME_STORAGE_KEY, next);
      } catch {
        // ignore storage restrictions
      }
      return next;
    });
  }, []);

  // Keep internal navigation inside /taste/ even when reused engine components
  // render standard "/" links, unless the link explicitly opts into UI switching.
  const handleContainerClickCapture = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.defaultPrevented || event.button !== 0 || isModifiedClick(event)) return;
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      if (anchor.dataset.uiSwitch === "true") return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref || !rawHref.startsWith("/") || rawHref.startsWith("//")) return;
      if (
        rawHref === "/taste" ||
        rawHref.startsWith("/taste/") ||
        rawHref.startsWith("/taste?") ||
        rawHref === "/design" ||
        rawHref.startsWith("/design/") ||
        rawHref.startsWith("/api/")
      ) {
        return;
      }

      event.preventDefault();
      const prefixed = rawHref === "/" ? "/taste" : `/taste${rawHref}`;
      closeSubview();
      router.push(prefixed);
    },
    [closeSubview, router]
  );

  return (
    <div
      className="taste-ui"
      data-taste-scheme={scheme}
      onClickCapture={handleContainerClickCapture}
    >
      <a href="#taste-main" className="taste-skip-link">
        Skip to content
      </a>

      <StorageWarningBanner />
      <TasteNav scheme={scheme} onToggleScheme={toggleScheme} />
      {!subView && !isOnboardingOpen && <BackupReminder />}

      <main
        id="taste-main"
        className="flex-1 pb-24 lg:pb-12"
        inert={subView !== null}
        aria-hidden={subView !== null}
      >
        {children}
      </main>

      <footer className="border-t border-[var(--taste-border)] bg-[var(--taste-surface)]/60 pb-20 lg:pb-6">
        <div className="taste-wrap py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--taste-muted)]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <span className="font-semibold text-[var(--taste-ink)]">Brücke</span>
            <Link href="/taste/panorama" className="hover:text-[var(--taste-ink)] transition-colors">
              Panorama
            </Link>
            <Link href="/taste/cando" className="hover:text-[var(--taste-ink)] transition-colors">
              Can-Do
            </Link>
            <Link href="/taste/mistakes" className="hover:text-[var(--taste-ink)] transition-colors">
              Mistakes
            </Link>
            <Link href="/taste/about" className="hover:text-[var(--taste-ink)] transition-colors">
              About
            </Link>
          </div>
          <div className="flex items-center gap-3 taste-mono text-[11px]">
            <span>UI:</span>
            <Link
              href="/"
              data-ui-switch="true"
              className="hover:text-[var(--taste-ink)] underline underline-offset-2 transition-colors"
            >
              Original
            </Link>
            <Link
              href="/design"
              data-ui-switch="true"
              className="hover:text-[var(--taste-ink)] underline underline-offset-2 transition-colors"
            >
              Design
            </Link>
          </div>
        </div>
      </footer>

      <TasteMobileBar />

      {/* Global Drawers & Modals */}
      <LazyLoadBoundary label="panels">
        {activeWordDrawerId && <WordCardDrawer />}
        {isOnboardingOpen && <OnboardingModal />}
        {isThemeSelectorOpen && <ThemeSelectorModal />}
        {isFontSelectorOpen && <FontSelectorModal />}
      </LazyLoadBoundary>

      {/* In-page Subviews: Lesson, Atlas Family, Master Web */}
      <LazyLoadBoundary label="this view">
        {subView?.kind === "lesson" && (
          <TasteSubviewOverlay
            key={`lesson:${subView.languageId}:${subView.lessonId}`}
            label={`Lesson ${subView.lessonId}`}
            onClose={closeSubview}
          >
            <LessonView languageId={subView.languageId} lessonId={subView.lessonId} />
          </TasteSubviewOverlay>
        )}
        {subView?.kind === "atlasFamily" && (
          <TasteSubviewOverlay
            key={`family:${subView.familyId}`}
            label="Atlas family"
            onClose={closeSubview}
            dockClearance
          >
            <ConstellationDetailClient
              familyId={subView.familyId}
              ownerLanguageIds={subView.ownerLanguageIds}
              onBack={closeSubview}
            />
          </TasteSubviewOverlay>
        )}
        {subView?.kind === "atlasMaster" && (
          <TasteSubviewOverlay
            key="atlas-master"
            label="Master web"
            onClose={closeSubview}
            dockClearance
          >
            <MasterView onBack={closeSubview} />
          </TasteSubviewOverlay>
        )}
      </LazyLoadBoundary>

      {subView?.kind === "lesson" && !isOnboardingOpen && (
        <VoiceGuidanceSheet key={subView.languageId} languageId={subView.languageId} />
      )}

      <TasteViewNotice />
    </div>
  );
}
