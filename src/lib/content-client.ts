"use client";

// On-demand content loading. The heavy per-language data lives under
// public/data and is fetched once per language, then shared from an in-memory
// promise cache. Curriculum and insights stay bundled because they are small.

import { useAsyncResource, type AsyncResource } from "@/lib/async-resource";
import { EMPTY_COMPENDIUM } from "@/data/empty-compendium";
import type { CompendiumData, LessonIndexEntry, LessonPayload } from "@/lib/types";

type CompendiumPayload = Omit<CompendiumData, "wordList">;

const AVAILABLE_LANGUAGES = new Set(["de", "fr", "es", "nl"]);

// Content hash baked in at build time (next.config.mjs). Versioned URLs let
// the server mark /data/* immutable without risking stale content after a deploy.
const CONTENT_VERSION = process.env.NEXT_PUBLIC_CONTENT_VERSION;

function dataUrl(languageId: string, file: string): string {
  const base = `/data/${languageId}/${file}`;
  return CONTENT_VERSION ? `${base}?v=${CONTENT_VERSION}` : base;
}

const cache = new Map<string, Promise<unknown>>();

const RELOAD_GUARD_KEY = "brucke_content_reload";

/**
 * A 404 on a versioned /data URL usually means the tab outlived a deploy, but
 * a genuinely missing export produces the same response. Reload at most once
 * per content version so the latter degrades to the retry button instead of
 * reloading on every attempt.
 */
export function attemptMissingContentReload(key: string): boolean {
  if (typeof window === "undefined") return false;
  const marker = `${CONTENT_VERSION ?? "dev"}:${key}`;
  try {
    if (window.sessionStorage.getItem(RELOAD_GUARD_KEY) === marker) return false;
    window.sessionStorage.setItem(RELOAD_GUARD_KEY, marker);
  } catch {
    return false;
  }
  window.location.reload();
  return true;
}

function loadJson<T>(url: string): Promise<T> {
  const cached = cache.get(url) as Promise<T> | undefined;
  if (cached) return cached;
  const promise = fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        const error = new Error(`failed to load ${url} (${response.status})`) as Error & {
          status?: number;
        };
        error.status = response.status;
        throw error;
      }
      return (await response.json()) as T;
    })
    .catch((error: unknown) => {
      cache.delete(url);
      throw error;
    });
  cache.set(url, promise);
  return promise;
}

export function loadCompendium(languageId: string): Promise<CompendiumData> {
  if (!AVAILABLE_LANGUAGES.has(languageId)) return Promise.resolve(EMPTY_COMPENDIUM);
  return loadJson<CompendiumPayload>(dataUrl(languageId, "compendium.json")).then((payload) => ({
    ...payload,
    wordList: Object.values(payload.words),
  }));
}

export function loadLessonIndex(languageId: string): Promise<LessonIndexEntry[]> {
  if (!AVAILABLE_LANGUAGES.has(languageId)) return Promise.resolve([]);
  return loadJson<LessonIndexEntry[]>(dataUrl(languageId, "lesson-index.json"));
}

/**
 * One lesson plus only the words it renders. Resolves null for a language the
 * app does not ship, so callers can render their "unavailable" state.
 */
export function loadLesson(languageId: string, lessonId: number): Promise<LessonPayload | null> {
  if (!AVAILABLE_LANGUAGES.has(languageId)) return Promise.resolve(null);
  if (!Number.isInteger(lessonId) || lessonId <= 0) return Promise.resolve(null);
  return loadJson<LessonPayload>(dataUrl(languageId, `lessons/${lessonId}.json`));
}

function useContentResource<T>(key: string, load: (key: string) => Promise<T>): AsyncResource<T> {
  return useAsyncResource(key, load, {
    onRetry: (retryKey, error) => {
      clearContentCache(retryKey);
      // A 404 on a versioned /data URL means this tab outlived a deploy; the
      // file it is asking for may no longer exist. Reload once, then surface
      // the error again and retry in place.
      const status = (error as (Error & { status?: number }) | null)?.status;
      if (typeof window !== "undefined" && status === 404) {
        attemptMissingContentReload(retryKey);
      }
    },
  });
}

function contentKeyPath(key: string): { languageId: string; file: string } | null {
  const [kind, languageId, lessonId] = key.split(":");
  if (!languageId) return null;
  if (kind === "compendium") return { languageId, file: "compendium.json" };
  if (kind === "lesson-index") return { languageId, file: "lesson-index.json" };
  if (kind === "lesson" && /^\d+$/.test(lessonId ?? "")) {
    return { languageId, file: `lessons/${lessonId}.json` };
  }
  return null;
}

function clearContentCache(key: string) {
  const target = contentKeyPath(key);
  if (!target) return;
  cache.delete(dataUrl(target.languageId, target.file));
}

function loadCompendiumKey(key: string): Promise<CompendiumData> {
  return loadCompendium(key.slice("compendium:".length));
}

function loadLessonIndexKey(key: string): Promise<LessonIndexEntry[]> {
  return loadLessonIndex(key.slice("lesson-index:".length));
}

function loadLessonKey(key: string): Promise<LessonPayload | null> {
  const [, languageId, rawId] = key.split(":");
  return loadLesson(languageId, Number.parseInt(rawId, 10));
}

export function useCompendium(languageId: string): AsyncResource<CompendiumData> {
  return useContentResource(`compendium:${languageId}`, loadCompendiumKey);
}

export function useLessonIndex(languageId: string): AsyncResource<LessonIndexEntry[]> {
  return useContentResource(`lesson-index:${languageId}`, loadLessonIndexKey);
}

export function useLesson(languageId: string, lessonId: number): AsyncResource<LessonPayload | null> {
  return useContentResource(`lesson:${languageId}:${lessonId}`, loadLessonKey);
}

/**
 * Warm the JSON a route will need when the learner shows intent (hover, touch,
 * keyboard focus). Failures are swallowed: the route's own loader still reports
 * them with a retry affordance.
 */
export function prefetchReviewContent(languageId: string): void {
  void loadCompendium(languageId).catch(() => {});
  void loadLessonIndex(languageId).catch(() => {});
}

export function prefetchAtlasContent(languageId: string): void {
  void loadCompendium(languageId).catch(() => {});
}

/** Warm one lesson payload before the learner commits to opening it. */
export function prefetchLesson(languageId: string, lessonId: number): void {
  void loadLesson(languageId, lessonId).catch(() => {});
}
