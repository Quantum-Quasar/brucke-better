"use client";

// Legacy /trail/... and /atlas/... URLs are redirected to the parent tab with
// query parameters. Restore the matching in-page view once progress has
// hydrated, then replace the URL with the clean tab path so nothing extra
// lands in the browser history.

import { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { getFamilyOwnerLanguageIds } from "@/lib/atlas-families";
import { isValidLanguageId } from "@/data/languages";

export function DeepLinkRestorer() {
  const storeHydrated = useAppStore((s) => s.storeHydrated);
  const handled = useRef(false);

  useEffect(() => {
    if (!storeHydrated || handled.current) return;

    // Clean the query synchronously. router.replace is a transition that can
    // commit after the subview's history sentinel is pushed, overwriting it
    // and breaking Back; replaceState keeps routing state intact because the
    // pathname is already the destination.
    const cleanUrl = (path: string) => {
      try {
        window.history.replaceState(window.history.state, "", path);
      } catch {
        // history can be unavailable in sandboxed frames; the view still opens
      }
    };

    const params = new URLSearchParams(window.location.search);
    const rawLesson = params.get("lesson");
    const rawFamily = params.get("family");
    const isMaster = params.get("master") === "1";
    if (rawLesson === null && rawFamily === null && !isMaster) return;

    handled.current = true;
    const app = useAppStore.getState();
    const view = useViewStore.getState();

    if (rawLesson !== null) {
      const lessonId = /^\d+$/.test(rawLesson) ? Number.parseInt(rawLesson, 10) : Number.NaN;
      if (Number.isInteger(lessonId) && lessonId > 0) {
        const rawLanguage = params.get("lang");
        const languageId =
          rawLanguage && isValidLanguageId(rawLanguage) ? rawLanguage : app.activeLanguageId;
        if (languageId !== app.activeLanguageId) {
          app.setActiveLanguage(languageId);
          app.completeOnboarding();
        }
        cleanUrl("/");
        view.openLesson(languageId, lessonId);
      } else {
        view.showNotice("That lesson link isn't valid.");
        cleanUrl("/");
      }
      return;
    }

    if (rawFamily !== null) {
      cleanUrl("/atlas");
      if (rawFamily) view.openAtlasFamily(rawFamily, getFamilyOwnerLanguageIds(rawFamily));
      return;
    }

    cleanUrl("/atlas");
    view.openAtlasMaster();
  }, [storeHydrated]);

  return null;
}
