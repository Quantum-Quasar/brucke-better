"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { lessonHref } from "@/lib/routes";

/**
 * Old unscoped /trail/<id> links predate language-scoped routes. Wait for the
 * persisted course to hydrate, then replace with the canonical URL so the
 * lesson opens in the learner's active language.
 */
export function LegacyLessonRedirect({ lessonId }: { lessonId: number }) {
  const router = useRouter();
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const storeHydrated = useAppStore((s) => s.storeHydrated);

  useEffect(() => {
    if (!storeHydrated) return;
    router.replace(lessonHref(activeLanguageId, lessonId));
  }, [storeHydrated, activeLanguageId, lessonId, router]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-3 font-mono">
      <p className="text-sm text-[var(--sub-color)]">opening lesson…</p>
      <Link
        href={lessonHref(activeLanguageId, lessonId)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-xs transition hover:opacity-90"
      >
        continue to lesson {lessonId}
      </Link>
    </div>
  );
}
