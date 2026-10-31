"use client";

// Legacy /trail/... and /atlas/... URLs are redirected to the parent tab with
// query parameters. Restore the matching in-page view once progress has
// hydrated, then replace the URL with the clean tab path so nothing extra
// lands in the browser history.

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { getFamilyOwnerLanguageIds } from "@/lib/atlas-families";
import { isValidLanguageId } from "@/data/languages";

export function DeepLinkRestorer() {
  const router = useRouter();
  const pathname = usePathname();
  const storeHydrated = useAppStore((s) => s.storeHydrated);
  const handled = useRef(false);

  useEffect(() => {
    if (!storeHydrated || handled.current) return;

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
        view.openLesson(languageId, lessonId);
      }
      router.replace("/", { scroll: false });
      return;
    }

    if (rawFamily !== null) {
      if (rawFamily) view.openAtlasFamily(rawFamily, getFamilyOwnerLanguageIds(rawFamily));
      router.replace("/atlas", { scroll: false });
      return;
    }

    view.openAtlasMaster();
    router.replace("/atlas", { scroll: false });
  }, [storeHydrated, pathname, router]);

  return null;
}
