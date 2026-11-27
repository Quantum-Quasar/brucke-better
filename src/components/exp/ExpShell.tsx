"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { isValidLanguageId } from "@/data/languages";
import { EXP_ROOT } from "@/lib/exp-routes";
import { ExpDock } from "./ExpChrome";

const ExpWordSheet = dynamic(() => import("./ExpWordSheet").then((m) => m.ExpWordSheet), { ssr: false });

/**
 * Restores `/exp-ui?lesson=N&lang=xx` into the shared view store and keeps the
 * address bar in step with the open lesson (replaceState, no history spam) —
 * the same contract the classic UI keeps for `/?lesson=N&lang=xx`.
 */
export function ExpUrlSync({ root = EXP_ROOT }: { root?: string }) {
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

export function ExpShell({ children }: { children: React.ReactNode }) {
  const subView = useViewStore((s) => s.subView);
  const wordId = useAppStore((s) => s.activeWordDrawerId);
  const inLesson = subView?.kind === "lesson";

  useEffect(() => {
    document.documentElement.classList.add("x-js");
    return () => document.documentElement.classList.remove("x-js");
  }, []);

  return (
    <div className="xp" data-dock={inLesson ? "off" : "on"}>
      {children}
      {!inLesson && <ExpDock />}
      {wordId && <ExpWordSheet wordId={wordId} />}
      <ExpUrlSync root={EXP_ROOT} />
    </div>
  );
}
