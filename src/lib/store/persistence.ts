import type { AppState, LanguageProgress } from "./types";
import { STORAGE_KEY, STORAGE_COOKIE_KEY } from "../storage-keys";
import { DEFAULT_LANGUAGE_ID, isValidLanguageId } from "@/data/languages";
import { reportStorageWrite } from "../storage-health";
import { sliceFromMirrors } from "./progress-state";
import { isPlausibleStateObject, normalizeParsedState } from "./schema";
import { applyTheme, applyAppearanceSettings, DEFAULT_THEME } from "../theme-runtime";
import { applyFont, DEFAULT_FONT } from "@/data/fonts";
import { DEFAULT_SETTINGS } from "@/data/settings";

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)" + name + "=([^;]*)"));
  if (!match) return null;
  // A stray "%" in the raw cookie (written by another app, an older build, or
  // an extension) makes decodeURIComponent throw a URIError. This runs at
  // module load via loadSavedState, so an unguarded throw is a white screen
  // before React can mount. Fall back to the captured bytes instead.
  try {
    return decodeURIComponent(match[2]);
  } catch {
    return match[2];
  }
}

export function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const isSecure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${isSecure}`;
}

export function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}
export function parseStoredJson(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Storage access can throw (privacy modes, blocked cookies/storage). This runs
 * at module load via `loadSavedState`, so an unguarded getItem would white-screen
 * the app before React mounts; degrade to "no saved state" instead. */
export function safeStorageGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function loadSavedState(): Partial<AppState> {
  if (typeof window === "undefined") return {};

  // Parse BOTH stores before choosing a base: a valid-but-truncated
  // localStorage payload must not bury recoverable cookie data. The cookie
  // write runs in the same saveState pass as localStorage, so it is never
  // staler than the localStorage snapshot it accompanies.
  const local = parseStoredJson(safeStorageGet(STORAGE_KEY));
  const cookie = parseStoredJson(getCookie(STORAGE_COOKIE_KEY));

  let parsed: Record<string, unknown> | null = null;
  if (isPlausibleStateObject(local) && isPlausibleStateObject(cookie)) {
    // Field-level merge: localStorage wins for every field it actually has;
    // the cookie fills whatever the localStorage payload is missing. Exception:
    // a lean cookie (the one carrying progress) written after localStorage
    // rejected a write is newer than the stale local snapshot, so letting
    // localStorage win would resurrect the old progress on every reload. The
    // tiny prefs-only cookie is always written alongside a successful local
    // write, so it never overrides a local payload that has progress.
    const localSavedAt = typeof local.savedAt === "number" ? local.savedAt : 0;
    const cookieSavedAt = typeof cookie.savedAt === "number" ? cookie.savedAt : 0;
    const cookieHasProgress = cookie.progressByLanguage !== undefined;
    const localResetAt = typeof local.progressResetAt === "number" ? local.progressResetAt : 0;
    const cookieResetAt = typeof cookie.progressResetAt === "number" ? cookie.progressResetAt : 0;
    const localActor = typeof local.progressResetActor === "string" ? local.progressResetActor : "";
    const cookieActor = typeof cookie.progressResetActor === "string" ? cookie.progressResetActor : "";
    const cookieHasNewerReset = cookieResetAt > localResetAt || (cookieResetAt === localResetAt && cookieActor > localActor);
    parsed = cookieSavedAt > localSavedAt && (cookieHasProgress || (cookieHasNewerReset && cookie.storageFailed === true))
      ? { ...local, ...cookie, ...(cookieHasNewerReset && !cookieHasProgress ? { progressByLanguage: { [isValidLanguageId(cookie.activeLanguageId) ? cookie.activeLanguageId : DEFAULT_LANGUAGE_ID]: {} } } : {}) }
      : { ...cookie, ...local };
  } else if (isPlausibleStateObject(local)) {
    parsed = local;
  } else if (isPlausibleStateObject(cookie)) {
    parsed = cookie;
  }

  if (parsed) {
    return normalizeParsedState(parsed);
  }
  return {};
}
let getCurrentState: (() => AppState) | undefined;
// Strictly increasing per tab, so a cookie written after localStorage rejected
// a write is unambiguously newer than the stale copy it could not replace.
let lastSavedAt = 0;

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

// Rapid actions (grading, typing-adjacent progress) coalesce into one write per
// idle period instead of serializing the whole profile on every action. Node
// test environments have no requestIdleCallback, so saveState() stays
// synchronous there and the persistence tests keep their deterministic reads.
let pendingSave: AppState | null = null;
let idleHandle: number | null = null;

export function cancelPendingSave() {
  pendingSave = null;
  if (idleHandle !== null) {
    if (typeof window !== "undefined") {
      const cancel = (window as IdleWindow).cancelIdleCallback;
      if (typeof cancel === "function") cancel(idleHandle);
    }
    idleHandle = null;
  }
}

/** Write any deferred snapshot right now (unload, route change, reset/import). */
export function flushSave() {
  const state = pendingSave;
  cancelPendingSave();
  if (state) writeState(state);
}

export function saveState(state: AppState, options?: { immediate?: boolean }) {
  if (typeof window === "undefined") return;
  // Child effects can run before hydration. Keep their in-memory changes but
  // do not overwrite either the boot snapshot or another tab's newer write.
  if (!persistenceRuntime.hasHydratedFromStorage && persistenceRuntime.bootSavedState && Object.keys(persistenceRuntime.bootSavedState).length > 0) return;
  const current = getCurrentState?.();
  if (current && (persistenceRuntime.hasHydratedFromStorage || !persistenceRuntime.bootSavedState || Object.keys(persistenceRuntime.bootSavedState).length === 0) && current.activeLanguageId === state.activeLanguageId && current.progressResetAt === state.progressResetAt) {
    let versions = state.progressVersions;
    for (const entries of Object.values(versions)) {
      for (const version of Object.values(entries)) progressClock = Math.max(progressClock, Number(version.slice(0, 16)));
    }
    for (const field of ["lessonProgress", "wordMastery", "srsCards"] as const) {
      const before = current[field];
      const after = state[field];
      if (before === after) continue;
      for (const key of new Set([...Object.keys(before), ...Object.keys(after)])) {
        if (JSON.stringify(before[key as keyof typeof before]) === JSON.stringify(after[key as keyof typeof after])) continue;
        versions = { ...versions, [field]: { ...versions[field], [key]: nextProgressVersion() } };
      }
    }
    state.progressVersions = versions;
  }
  const requestIdle = (window as IdleWindow).requestIdleCallback;
  if (!options?.immediate && typeof requestIdle === "function") {
    pendingSave = state;
    if (idleHandle === null) {
      idleHandle = requestIdle(
        () => {
          idleHandle = null;
          flushSave();
        },
        { timeout: 500 }
      );
    }
    return;
  }
  cancelPendingSave();
  writeState(state);
}

// Read once, before React mounts, so the first hydrate still has the learner's
// saved state even if a child mount effect has already written defaults back to
// storage (see hydrateFromStorage). Declared here rather than seeded into the
// store's initial state: the store must start from deterministic defaults or
// the client's first render disagrees with the server-rendered HTML.
export const persistenceRuntime = {
  bootSavedState: typeof window === "undefined" ? null : loadSavedState(),
  hasHydratedFromStorage: false,
  hasAutoOpenedOnboarding: false,
  lastSerialized: "",
};
export const progressActor = Math.random().toString(36).slice(2) || "0";
let progressClock = 0;
function nextProgressVersion(): string {
  progressClock = Math.max(Date.now(), progressClock + 1);
  return `${String(progressClock).padStart(16, "0")}:${progressActor}`;
}

// the auto-open of onboarding on first visit must only ever happen once per
// page load — cross-tab `storage` events re-run hydrateFromStorage and must
// not yank the intro open over whatever the user is doing now


function writeState(state: AppState) {
  if (typeof window === "undefined") return;
  // the active language's slice is derived from the mirrored top-level fields
  const progressByLanguage: Record<string, LanguageProgress> = {
    ...state.progressByLanguage,
    [state.activeLanguageId]: sliceFromMirrors(state),
  };
  // The active language's progress lives only in its progressByLanguage
  // slice; the top-level mirrors are rebuilt on load (normalizeParsedState),
  // and older saves that still carry them keep loading.
  const toPersist = {
    activeLanguageId: state.activeLanguageId,
    progressByLanguage,
    seenIntroLanguages: state.seenIntroLanguages,
    progressResetAt: state.progressResetAt,
    progressResetActor: state.progressResetActor,
    tolerance: state.tolerance,
    preferredReviewMode: state.preferredReviewMode,
    hasCompletedOnboarding: state.hasCompletedOnboarding,
    hasSeenGenderIntro: state.hasSeenGenderIntro,
    theme: state.theme,
    font: state.font,
    settings: state.settings,
  };
  const serialized = JSON.stringify(toPersist);
  if (serialized === persistenceRuntime.lastSerialized) {
    const stored = parseStoredJson(safeStorageGet(STORAGE_KEY));
    if (isPlausibleStateObject(stored)) {
      delete stored.savedAt;
      if (JSON.stringify(stored) === serialized) return;
    }
  }

  const savedAt = Math.max(Date.now(), lastSavedAt + 1);
  lastSavedAt = savedAt;

  // 1. Save to localStorage
  let localOk = true;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...toPersist, savedAt }));
    persistenceRuntime.lastSerialized = serialized;
    reportStorageWrite(true);
  } catch {
    localOk = false;
    reportStorageWrite(false);
  }

  // 2. Cookie (sent with every document request, so kept <= 2048 encoded
  // bytes to avoid HTTP 431). The progress copy is only a fallback for when
  // localStorage is unavailable (privacy modes); otherwise only the small
  // prefs/theme/onboarding payload is written.
  try {
    const minimal = JSON.stringify({
      savedAt,
      progressResetAt: state.progressResetAt,
      progressResetActor: state.progressResetActor,
      theme: state.theme,
      font: state.font,
      activeLanguageId: state.activeLanguageId,
      seenIntroLanguages: state.seenIntroLanguages,
      // keep the onboarding flags so losing the larger payload cannot
      // re-open the wizard for a learner who finished it
      hasCompletedOnboarding: state.hasCompletedOnboarding,
      hasSeenGenderIntro: state.hasSeenGenderIntro,
    });
    if (localOk) {
      setCookie(STORAGE_COOKIE_KEY, minimal, 365);
    } else {
      const leanJson = JSON.stringify({
        savedAt,
        progressResetAt: state.progressResetAt,
        progressResetActor: state.progressResetActor,
        activeLanguageId: state.activeLanguageId,
        progressByLanguage,
        seenIntroLanguages: state.seenIntroLanguages,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        hasSeenGenderIntro: state.hasSeenGenderIntro,
        theme: state.theme,
        font: state.font,
      });
      setCookie(
        STORAGE_COOKIE_KEY,
        encodeURIComponent(leanJson).length <= 2048 ? leanJson : JSON.stringify({ ...JSON.parse(minimal), storageFailed: true }),
        365
      );
    }
  } catch {}
}

export function initializePersistence(getState: () => AppState) {
  getCurrentState = getState;
  if (typeof window === "undefined") return;
  const initial = persistenceRuntime.bootSavedState ?? {};
  applyTheme(initial.theme || DEFAULT_THEME);
  applyFont(initial.font || DEFAULT_FONT);
  if (initial.settings) {
    applyAppearanceSettings({ ...DEFAULT_SETTINGS, ...initial.settings });
  } else {
    applyAppearanceSettings(DEFAULT_SETTINGS);
  }

  // The debounced write must never be the thing a tab close loses.
  if (typeof window.addEventListener === "function") {
    window.addEventListener("pagehide", flushSave);
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flushSave();
    });
  }
}
