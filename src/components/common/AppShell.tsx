"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { TopNav } from "@/components/navigation/TopNav";
import { BottomNav } from "@/components/navigation/BottomNav";
import { StorageWarningBanner } from "@/components/common/StorageWarningBanner";
import { LazyLoadBoundary } from "@/components/common/LazyLoadBoundary";
import { SubviewOverlay } from "@/components/common/SubviewOverlay";
import { DeepLinkRestorer } from "@/components/common/DeepLinkRestorer";
import { useAppStore, STORAGE_KEY, flushSave } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";

// ponytail: code-split idle modals, drawer and in-page views so root chunk doesn't bundle content readers
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
const LessonView = dynamic(
  () => import("@/components/lesson/LessonView").then((m) => m.LessonView),
  { ssr: false }
);
const ConstellationDetailClient = dynamic(
  () =>
    import("@/components/atlas/ConstellationDetailClient").then(
      (m) => m.ConstellationDetailClient
    ),
  { ssr: false }
);
const MasterView = dynamic(
  () => import("@/components/atlas/MasterView").then((m) => m.MasterView),
  { ssr: false }
);

/**
 * Client half of the root layout: hydrates persisted progress, keeps other tabs
 * in sync, and renders the navigation chrome plus the lazy global overlays.
 * The Server Component layout owns <html>/<body>, metadata and the pre-paint
 * boot script; this shell is the part that needs browser state.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const subView = useViewStore((s) => s.subView);
  const closeSubview = useViewStore((s) => s.closeSubview);

  // Mount lazy overlays only when they are actually open. Otherwise their
  // chunks (the theme table in particular) download during hydration even
  // though the learner never opens them.
  const isOnboardingOpen = useAppStore((s) => s.isOnboardingOpen);
  const isThemeSelectorOpen = useAppStore((s) => s.isThemeSelectorOpen);
  const isFontSelectorOpen = useAppStore((s) => s.isFontSelectorOpen);
  const activeWordDrawerId = useAppStore((s) => s.activeWordDrawerId);

  // Hydrate local progress from localStorage and cookies on client mount
  useEffect(() => {
    useAppStore.getState().hydrateFromStorage();
    useViewStore.getState().hydrateViewState();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        useAppStore.getState().hydrateFromStorage({ reread: true });
      }
    };
    const unsubscribeLanguage = useAppStore.subscribe((state, previous) => {
      if (state.activeLanguageId !== previous.activeLanguageId) {
        useViewStore.getState().closeSubview();
      }
    });
    window.addEventListener("storage", handleStorage);
    document.documentElement.setAttribute("data-app-ready", "true");
    return () => {
      unsubscribeLanguage();
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // A subview belongs to one tab. Leaving that tab (including browser Back
  // from a pushed parent tab) closes it without adding another history entry.
  useEffect(() => {
    const view = useViewStore.getState();
    if (!view.subView) return;
    if (view.subView.kind === "lesson") {
      if (pathname !== "/") view.closeSubview();
    } else if (pathname !== "/atlas") {
      view.closeSubview();
    }
  }, [pathname]);

  // Deferred writes are flushed on route changes so a navigation can never
  // outrun the snapshot it was triggered by.
  useEffect(() => {
    flushSave();
  }, [pathname]);

  return (
    <>
      <StorageWarningBanner />
      <TopNav />

      {/* Main Content Viewport (bottom padding clears the fixed game-style dock) */}
      <main
        className="flex-1 pb-28"
        inert={subView !== null}
        aria-hidden={subView !== null}
      >
        {children}
      </main>

      <BottomNav />

      {/* Global Drawers & Modals */}
      <LazyLoadBoundary label="some panels">
        {activeWordDrawerId && <WordCardDrawer />}
        {isOnboardingOpen && <OnboardingModal />}
        {isThemeSelectorOpen && <ThemeSelectorModal />}
        {isFontSelectorOpen && <FontSelectorModal />}
      </LazyLoadBoundary>

      <LazyLoadBoundary label="this view">
        {subView?.kind === "lesson" && (
          <SubviewOverlay label={`Lesson ${subView.lessonId}`}>
            <LessonView languageId={subView.languageId} lessonId={subView.lessonId} />
          </SubviewOverlay>
        )}
        {subView?.kind === "atlasFamily" && (
          <SubviewOverlay label="Atlas family" dockClearance>
            <ConstellationDetailClient
              familyId={subView.familyId}
              ownerLanguageIds={subView.ownerLanguageIds}
              onBack={closeSubview}
            />
          </SubviewOverlay>
        )}
        {subView?.kind === "atlasMaster" && (
          <SubviewOverlay label="Master web" dockClearance>
            <MasterView onBack={closeSubview} />
          </SubviewOverlay>
        )}
      </LazyLoadBoundary>

      <DeepLinkRestorer />
    </>
  );
}
