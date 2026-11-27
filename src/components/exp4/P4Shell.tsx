"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { isValidLanguageId } from "@/data/languages";
import { EXP4_ROOT } from "@/lib/exp-routes";
import { P4Dock } from "./P4Chrome";

const P4WordSheet = dynamic(() => import("./P4WordSheet").then((m) => m.P4WordSheet), { ssr: false });

/**
 * Restores `/exp-ui?lesson=N&lang=xx` into the shared view store and keeps the
 * address bar in step with the open lesson (replaceState, no history spam) —
 * the same contract the classic UI keeps for `/?lesson=N&lang=xx`.
 */
export function P4UrlSync({ root = EXP4_ROOT }: { root?: string }) {
  const storeHydrated = useAppStore((s) => s.storeHydrated);
  const pathname = usePathname();

  useEffect(() => {
    if (!storeHydrated) return;

    const sync = () => {
      const url = new URL(window.location.href);
      if (url.pathname.replace(/\/$/, "") !== root) return;
      const view = useViewStore.getState().subView;
      url.searchParams.delete("lesson");
      url.searchParams.delete("lang");
      if (view?.kind === "lesson") {
        url.searchParams.set("lesson", String(view.lessonId));
        url.searchParams.set("lang", view.languageId);
      }
      if (url.href === window.location.href) return;
      try {
        window.history.replaceState(window.history.state, "", url);
      } catch {
        // sandboxed frames may forbid history writes
      }
    };

    const restore = () => {
      const url = new URL(window.location.href);
      const view = useViewStore.getState();
      if (url.pathname.replace(/\/$/, "") !== root) {
        if (view.subView) view.closeSubview();
        return;
      }
      const raw = url.searchParams.get("lesson");
      if (raw === null) {
        view.closeSubview();
        return;
      }
      const lessonId = /^\d+$/.test(raw) ? Number(raw) : NaN;
      if (!Number.isSafeInteger(lessonId) || lessonId <= 0) {
        view.closeSubview();
        sync();
        return;
      }
      const app = useAppStore.getState();
      const lang = url.searchParams.get("lang");
      if (lang && isValidLanguageId(lang) && lang !== app.activeLanguageId) app.setActiveLanguage(lang);
      app.completeOnboarding();
      view.openLesson(useAppStore.getState().activeLanguageId, lessonId);
      sync();
    };

    restore();
    const unsubscribe = useViewStore.subscribe((state, previous) => {
      if (state.subView !== previous.subView) sync();
    });
    window.addEventListener("popstate", restore);
    return () => {
      unsubscribe();
      window.removeEventListener("popstate", restore);
    };
  }, [storeHydrated, pathname, root]);

  return null;
}

export function P4Shell({ children }: { children: React.ReactNode }) {
  const subView = useViewStore((s) => s.subView);
  const wordId = useAppStore((s) => s.activeWordDrawerId);
  const inLesson = subView?.kind === "lesson";

  useEffect(() => {
    document.documentElement.classList.add("m-js");
    return () => document.documentElement.classList.remove("m-js");
  }, []);

  return (
    <div className="mp4" data-dock={inLesson ? "off" : "on"}>
      {children}
      {!inLesson && <P4Dock />}
      {wordId && <P4WordSheet wordId={wordId} />}
      <P4UrlSync root={EXP4_ROOT} />
    </div>
  );
}
