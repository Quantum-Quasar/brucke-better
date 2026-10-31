"use client";

// One place for opening in-page subviews. Subview changes never call the
// router; only crossing into another top-level tab pushes one history entry.

import { useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { getFamilyOwnerLanguageIds } from "@/lib/atlas-families";
import { prefetchLesson } from "@/lib/content-client";

export interface AppNavigation {
  openLesson: (languageId: string, lessonId: number) => void;
  openAtlasFamily: (familyId: string) => void;
  openAtlasMaster: () => void;
  openAtlasIndex: () => void;
  closeLesson: () => void;
  closeAtlas: () => void;
  closeSubview: () => void;
}

export function useAppNavigation(): AppNavigation {
  const router = useRouter();
  const pathname = usePathname();

  const openLesson = useCallback(
    (languageId: string, lessonId: number) => {
      const app = useAppStore.getState();
      if (app.activeLanguageId !== languageId) {
        // A lesson link is authoritative for the course, exactly as the old
        // language-scoped route was; skip the intro so the lesson is visible.
        app.setActiveLanguage(languageId);
        app.completeOnboarding();
      }
      prefetchLesson(languageId, lessonId);
      useViewStore.getState().openLesson(languageId, lessonId);
      if (pathname !== "/") router.push("/");
    },
    [pathname, router]
  );

  const openAtlasFamily = useCallback(
    (familyId: string) => {
      useViewStore.getState().openAtlasFamily(familyId, getFamilyOwnerLanguageIds(familyId));
      if (pathname !== "/atlas") router.push("/atlas");
    },
    [pathname, router]
  );

  const openAtlasMaster = useCallback(() => {
    useViewStore.getState().openAtlasMaster();
    if (pathname !== "/atlas") router.push("/atlas");
  }, [pathname, router]);

  const openAtlasIndex = useCallback(() => {
    useViewStore.getState().closeSubview();
    if (pathname !== "/atlas") router.push("/atlas");
  }, [pathname, router]);

  const closeSubview = useCallback(() => {
    useViewStore.getState().closeSubview();
  }, []);

  return useMemo(
    () => ({
      openLesson,
      openAtlasFamily,
      openAtlasMaster,
      openAtlasIndex,
      closeLesson: closeSubview,
      closeAtlas: closeSubview,
      closeSubview,
    }),
    [openLesson, openAtlasFamily, openAtlasMaster, openAtlasIndex, closeSubview]
  );
}
