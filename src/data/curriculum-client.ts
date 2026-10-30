"use client";

// Browser-side curriculum access. German (the default course) is bundled so the
// landing page and trail paint without a request; French and Spanish load as
// their own chunks the first time that course is opened. The server and tests
// keep using the synchronous curriculum-registry.

import { useAsyncResource } from "@/lib/async-resource";
import { GERMAN_CURRICULUM } from "./curriculum";
import { EMPTY_CURRICULUM, type CurriculumData } from "./curriculum-core";

const loaded = new Map<string, CurriculumData>([["de", GERMAN_CURRICULUM]]);
const pending = new Map<string, Promise<CurriculumData>>();

/** The curriculum if it is already in memory, else null. */
export function peekCurriculum(languageId: string): CurriculumData | null {
  return loaded.get(languageId) ?? null;
}

export function loadCurriculum(languageId: string): Promise<CurriculumData> {
  const ready = loaded.get(languageId);
  if (ready) return Promise.resolve(ready);
  let promise = pending.get(languageId);
  if (!promise) {
    if (languageId === "fr") {
      promise = import("./french/curriculum-fr").then((m) => m.FRENCH_CURRICULUM);
    } else if (languageId === "es") {
      promise = import("./spanish/curriculum-es").then((m) => m.SPANISH_CURRICULUM);
    } else if (languageId === "nl") {
      promise = import("./dutch/curriculum-nl").then((m) => m.DUTCH_CURRICULUM);
    } else {
      promise = Promise.resolve(EMPTY_CURRICULUM);
    }
    promise = promise.then((data) => {
      loaded.set(languageId, data);
      pending.delete(languageId);
      return data;
    });
    promise.catch(() => pending.delete(languageId));
    pending.set(languageId, promise);
  }
  return promise;
}

/**
 * Curriculum for a language. Returns the empty curriculum (ready = false)
 * until a non-German course's chunk arrives; `error`/`retry` cover a failed
 * chunk load (for example an old tab after a deploy).
 */
export function useCurriculum(languageId: string): {
  curriculum: CurriculumData;
  ready: boolean;
  error: Error | null;
  retry: () => void;
} {
  const { data, error, retry } = useAsyncResource(languageId, loadCurriculum, {
    peek: peekCurriculum,
  });
  return {
    curriculum: data ?? EMPTY_CURRICULUM,
    ready: data !== null,
    error,
    retry,
  };
}
