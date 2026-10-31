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
import { useViewStore, flushViewState } from "@/lib/view-store";
import { useScrollMemory } from "@/lib/scroll-memory";
import { syncThemeColor } from "@/lib/theme-runtime";

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
function ViewNotice() {
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
      className="fixed left-1/2 bottom-24 z-50 -translate-x-1/2 rounded-lg border border-[var(--sub-color)]/30 bg-[var(--sub-alt-color)] px-4 py-2 font-mono text-xs text-[var(--text-color)] shadow-lg"
    >
      {notice}
      <button
        type="button"
        onClick={dismiss}
        className="ml-3 text-[var(--main-color)] underline underline-offset-2 cursor-pointer"
      >
        dismiss
      </button>
    </div>
  );
}

function OverlayLoading({ label }: { label: string }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center font-mono" role="status">
      <p className="text-sm text-[var(--sub-color)]">loading {label}…</p>
    </div>
  );
}

const LessonView = dynamic(
  () => import("@/components/lesson/LessonView").then((m) => m.LessonView),
  { ssr: false, loading: () => <OverlayLoading label="the lesson" /> }
);
const ConstellationDetailClient = dynamic(
  () =>
    import("@/components/atlas/ConstellationDetailClient").then(
      (m) => m.ConstellationDetailClient
    ),
  { ssr: false, loading: () => <OverlayLoading label="the atlas family" /> }
);
const MasterView = dynamic(
  () => import("@/components/atlas/MasterView").then((m) => m.MasterView),
  { ssr: false, loading: () => <OverlayLoading label="the master web" /> }
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
  useScrollMemory(pathname);

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
    // The first visit paints from globals.css without loading the palette
    // table, so align the browser chrome with whatever --bg-color is active.
    syncThemeColor();

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

  // View positions are debounced too; flush them before the tab goes away.
  useEffect(() => {
    const flush = () => flushViewState();
    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
    };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

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
          <SubviewOverlay
            key={`lesson:${subView.languageId}:${subView.lessonId}`}
            label={`Lesson ${subView.lessonId}`}
            onClose={closeSubview}
          >
            <LessonView languageId={subView.languageId} lessonId={subView.lessonId} />
          </SubviewOverlay>
        )}
        {subView?.kind === "atlasFamily" && (
          <SubviewOverlay
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
          </SubviewOverlay>
        )}
        {subView?.kind === "atlasMaster" && (
          <SubviewOverlay key="atlas-master" label="Master web" onClose={closeSubview} dockClearance>
            <MasterView onBack={closeSubview} />
          </SubviewOverlay>
        )}
      </LazyLoadBoundary>

      <DeepLinkRestorer />
      <ViewNotice />
    </>
  );
}
