"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { getFamilyOwnerLanguageIds } from "@/lib/atlas-families";
import { isValidLanguageId } from "@/data/languages";

export function DeepLinkRestorer() {
  const storeHydrated = useAppStore((s) => s.storeHydrated);
  const pathname = usePathname();

  useEffect(() => {
    if (!storeHydrated) return;

    const syncUrl = () => {
      const url = new URL(window.location.href);
      if (url.pathname !== "/" && url.pathname !== "/atlas") return;
      const view = useViewStore.getState().subView;
      // A cross-tab open waits for the router to reach its destination.
      if (view && (view.kind === "lesson" ? url.pathname !== "/" : url.pathname !== "/atlas")) return;
      for (const key of ["lesson", "family", "master", "lang"]) url.searchParams.delete(key);
      if (view?.kind === "lesson") {
        url.searchParams.set("lesson", String(view.lessonId));
        url.searchParams.set("lang", view.languageId);
      } else if (view) {
        if (view.kind === "atlasFamily") url.searchParams.set("family", view.familyId);
        else url.searchParams.set("master", "1");
        url.searchParams.set("lang", useAppStore.getState().activeLanguageId);
      }
      if (url.href === window.location.href) return;
      try {
        // Preserve Next's routing state and unrelated query parameters/hash.
        window.history.replaceState(window.history.state, "", url);
      } catch {
        // Sandboxed frames may forbid history writes; the overlay remains usable.
      }
    };

    const restoreUrl = () => {
      const url = new URL(window.location.href);
      const app = useAppStore.getState();
      const view = useViewStore.getState();
      const rawLesson = url.pathname === "/" ? url.searchParams.get("lesson") : null;
      const rawFamily = url.pathname === "/atlas" ? url.searchParams.get("family") : null;
      const isMaster = url.pathname === "/atlas" && url.searchParams.get("master") === "1";
      if (rawLesson === null && rawFamily === null && !isMaster) {
        view.closeSubview();
        return;
      }
      const lessonId = rawLesson !== null && /^\d+$/.test(rawLesson) ? Number(rawLesson) : NaN;
      if (rawLesson !== null && (!Number.isSafeInteger(lessonId) || lessonId <= 0)) {
        view.closeSubview();
        view.showNotice("That lesson link isn't valid.");
        syncUrl();
        return;
      }
      const languageId = url.searchParams.get("lang");
      if (languageId && isValidLanguageId(languageId) && languageId !== app.activeLanguageId) {
        app.setActiveLanguage(languageId);
      }
      app.completeOnboarding();
      if (rawLesson !== null) {
        view.openLesson(useAppStore.getState().activeLanguageId, lessonId);
      } else if (rawFamily !== null) {
        view.closeSubview();
        view.openAtlasFamily(rawFamily, getFamilyOwnerLanguageIds(rawFamily));
      } else {
        view.openAtlasMaster();
      }
      syncUrl();
    };

    // Restore before subscribing: a copied URL takes precedence over stale UI state.
    restoreUrl();
    const unsubscribe = useViewStore.subscribe((state, previous) => {
      if (state.subView !== previous.subView) syncUrl();
    });
    window.addEventListener("popstate", restoreUrl);
    return () => {
      unsubscribe();
      window.removeEventListener("popstate", restoreUrl);
    };
  }, [storeHydrated, pathname]);

  return null;
}
