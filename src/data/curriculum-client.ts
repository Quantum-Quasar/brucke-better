"use client";

// Browser-side curriculum access. German (the default course) is bundled so the
// landing page and trail paint without a request; French and Spanish load as
// their own chunks the first time that course is opened. The server and tests
// keep using the synchronous curriculum-registry.

import { useEffect, useState } from "react";
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
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<{
    languageId: string;
    data: CurriculumData | null;
    error: Error | null;
  }>(() => ({ languageId, data: peekCurriculum(languageId), error: null }));

  useEffect(() => {
    let cancelled = false;
    const cached = peekCurriculum(languageId);
    if (cached) {
      setState((prev) =>
        prev.languageId === languageId && prev.data === cached && prev.error === null
          ? prev
          : { languageId, data: cached, error: null }
      );
      return;
    }
    setState((prev) =>
      prev.languageId === languageId && prev.data === null && prev.error === null
        ? prev
        : { languageId, data: null, error: null }
    );
    loadCurriculum(languageId)
      .then((data) => {
        if (!cancelled) setState({ languageId, data, error: null });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            languageId,
            data: null,
            error: error instanceof Error ? error : new Error(String(error)),
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [languageId, attempt]);

  const current =
    state.languageId === languageId
      ? state
      : { languageId, data: peekCurriculum(languageId), error: null };
  const data = current.data;

  return {
    curriculum: data ?? EMPTY_CURRICULUM,
    ready: data !== null,
    error: current.error,
    retry: () => setAttempt((value) => value + 1),
  };
}
