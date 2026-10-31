"use client";

// UI position and the current in-page overlay. Deliberately separate from the
// progress store: importing/exporting progress must never carry view state,
// and losing this store must never touch a learner's lesson or SRS data.

import { create } from "zustand";
import { VIEW_STORAGE_KEY } from "./storage-keys";

const LANGUAGE_IDS = ["de", "fr", "es", "nl"] as const;
const LANGUAGE_ID_SET = new Set<string>(LANGUAGE_IDS);

const MAX_TEXT = 200;
const MIN_VISIBLE = 60;
const MAX_VISIBLE = 1000;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 2.6;
const WRITE_DELAY_MS = 250;

export type SubView =
  | { kind: "lesson"; languageId: string; lessonId: number }
  | { kind: "atlasFamily"; familyId: string; ownerLanguageIds: string[] }
  | { kind: "atlasMaster" };

export interface TrailPosition {
  nodeId: number | null;
  gateId: number | null;
}

export interface MasterPosition {
  zoom: number | null;
  nodeId: string | null;
}

export interface RosterPosition {
  query: string;
  visible: number;
}

export interface PersistedViewState {
  trailByLanguage: Record<string, TrailPosition>;
  atlasFilterByLanguage: Record<string, string>;
  rosterByFamily: Record<string, RosterPosition>;
  masterByLanguage: Record<string, MasterPosition>;
}

export const EMPTY_TRAIL_POSITION: TrailPosition = { nodeId: null, gateId: null };
export const EMPTY_MASTER_POSITION: MasterPosition = { zoom: null, nodeId: null };
export const EMPTY_ROSTER_POSITION: RosterPosition = { query: "", visible: MIN_VISIBLE };

interface ViewStoreState extends PersistedViewState {
  subView: SubView | null;
  viewHydrated: boolean;
  hydrateViewState: () => void;
  openLesson: (languageId: string, lessonId: number) => void;
  openAtlasFamily: (familyId: string, ownerLanguageIds: string[]) => void;
  openAtlasMaster: () => void;
  closeSubview: () => void;
  setTrailPosition: (languageId: string, patch: Partial<TrailPosition>) => void;
  setAtlasFilter: (languageId: string, query: string) => void;
  setRosterPosition: (familyId: string, patch: Partial<RosterPosition>) => void;
  setMasterPosition: (languageId: string, patch: Partial<MasterPosition>) => void;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isSafeKey(key: string): boolean {
  return key.length > 0 && key.length <= 100 && key !== "__proto__" && key !== "constructor" && key !== "prototype";
}

function finiteInt(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && Number.isInteger(value) && value >= 0
    ? value
    : null;
}

function clampVisible(value: number): number {
  if (!Number.isFinite(value)) return MIN_VISIBLE;
  return Math.min(MAX_VISIBLE, Math.max(MIN_VISIBLE, Math.floor(value)));
}

function clampZoom(value: number | null): number | null {
  if (value === null || !Number.isFinite(value)) return null;
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
}

function cleanText(value: unknown): string {
  return typeof value === "string" ? value.slice(0, MAX_TEXT) : "";
}

/** Validate a raw localStorage snapshot. Anything unexpected falls back to defaults. */
export function parseStoredView(raw: string | null): PersistedViewState {
  const empty: PersistedViewState = {
    trailByLanguage: {},
    atlasFilterByLanguage: {},
    rosterByFamily: {},
    masterByLanguage: {},
  };
  if (!raw) return empty;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return empty;
  }
  if (!isRecord(parsed)) return empty;

  const next: PersistedViewState = {
    trailByLanguage: {},
    atlasFilterByLanguage: {},
    rosterByFamily: {},
    masterByLanguage: {},
  };

  if (isRecord(parsed.trailByLanguage)) {
    for (const [languageId, value] of Object.entries(parsed.trailByLanguage)) {
      if (!LANGUAGE_ID_SET.has(languageId) || !isRecord(value)) continue;
      next.trailByLanguage[languageId] = {
        nodeId: finiteInt(value.nodeId),
        gateId: finiteInt(value.gateId),
      };
    }
  }

  if (isRecord(parsed.atlasFilterByLanguage)) {
    for (const [languageId, value] of Object.entries(parsed.atlasFilterByLanguage)) {
      if (!LANGUAGE_ID_SET.has(languageId) || typeof value !== "string") continue;
      next.atlasFilterByLanguage[languageId] = value.slice(0, MAX_TEXT);
    }
  }

  if (isRecord(parsed.rosterByFamily)) {
    for (const [familyId, value] of Object.entries(parsed.rosterByFamily)) {
      if (!isSafeKey(familyId) || !isRecord(value)) continue;
      next.rosterByFamily[familyId] = {
        query: cleanText(value.query),
        visible:
          typeof value.visible === "number" && Number.isFinite(value.visible)
            ? clampVisible(value.visible)
            : MIN_VISIBLE,
      };
    }
  }

  if (isRecord(parsed.masterByLanguage)) {
    for (const [languageId, value] of Object.entries(parsed.masterByLanguage)) {
      if (!LANGUAGE_ID_SET.has(languageId) || !isRecord(value)) continue;
      next.masterByLanguage[languageId] = {
        zoom: clampZoom(typeof value.zoom === "number" ? value.zoom : null),
        nodeId: typeof value.nodeId === "string" ? value.nodeId.slice(0, MAX_TEXT) : null,
      };
    }
  }

  return next;
}

function persistedSnapshot(state: ViewStoreState): PersistedViewState {
  return {
    trailByLanguage: state.trailByLanguage,
    atlasFilterByLanguage: state.atlasFilterByLanguage,
    rosterByFamily: state.rosterByFamily,
    masterByLanguage: state.masterByLanguage,
  };
}

let hasHydrated = false;
let lastSerialized = "";
let writeTimer: ReturnType<typeof setTimeout> | null = null;

function persistViewState(state: ViewStoreState) {
  if (!hasHydrated || typeof window === "undefined") return;
  if (writeTimer) clearTimeout(writeTimer);
  writeTimer = setTimeout(() => {
    writeTimer = null;
    if (typeof window === "undefined") return;
    const serialized = JSON.stringify(persistedSnapshot(state));
    if (serialized === lastSerialized) return;
    lastSerialized = serialized;
    try {
      localStorage.setItem(VIEW_STORAGE_KEY, serialized);
    } catch {
      // A full or blocked localStorage must never break navigation.
    }
  }, WRITE_DELAY_MS);
}

export const useViewStore = create<ViewStoreState>((set, get) => ({
  subView: null,
  viewHydrated: false,
  trailByLanguage: {},
  atlasFilterByLanguage: {},
  rosterByFamily: {},
  masterByLanguage: {},

  hydrateViewState: () => {
    if (hasHydrated) return;
    hasHydrated = true;
    let parsed: PersistedViewState = {
      trailByLanguage: {},
      atlasFilterByLanguage: {},
      rosterByFamily: {},
      masterByLanguage: {},
    };
    if (typeof window !== "undefined") {
      try {
        parsed = parseStoredView(localStorage.getItem(VIEW_STORAGE_KEY));
      } catch {
        // treat unreadable storage as empty
      }
    }
    lastSerialized = JSON.stringify(parsed);
    set({ ...parsed, viewHydrated: true });
  },

  openLesson: (languageId, lessonId) => {
    if (!LANGUAGE_ID_SET.has(languageId) || !Number.isInteger(lessonId) || lessonId <= 0) return;
    set({ subView: { kind: "lesson", languageId, lessonId } });
  },

  openAtlasFamily: (familyId, ownerLanguageIds) => {
    if (!isSafeKey(familyId)) return;
    set({
      subView: {
        kind: "atlasFamily",
        familyId,
        ownerLanguageIds: [...new Set(ownerLanguageIds)].slice(0, 8),
      },
    });
  },

  openAtlasMaster: () => set({ subView: { kind: "atlasMaster" } }),

  closeSubview: () => {
    if (get().subView !== null) set({ subView: null });
  },

  setTrailPosition: (languageId, patch) =>
    set((state) => {
      if (!LANGUAGE_ID_SET.has(languageId)) return state;
      const current = state.trailByLanguage[languageId] ?? EMPTY_TRAIL_POSITION;
      return {
        trailByLanguage: {
          ...state.trailByLanguage,
          [languageId]: {
            nodeId: patch.nodeId !== undefined ? patch.nodeId : current.nodeId,
            gateId: patch.gateId !== undefined ? patch.gateId : current.gateId,
          },
        },
      };
    }),

  setAtlasFilter: (languageId, query) =>
    set((state) => {
      if (!LANGUAGE_ID_SET.has(languageId)) return state;
      return {
        atlasFilterByLanguage: {
          ...state.atlasFilterByLanguage,
          [languageId]: query.slice(0, MAX_TEXT),
        },
      };
    }),

  setRosterPosition: (familyId, patch) =>
    set((state) => {
      if (!isSafeKey(familyId)) return state;
      const current = state.rosterByFamily[familyId] ?? EMPTY_ROSTER_POSITION;
      return {
        rosterByFamily: {
          ...state.rosterByFamily,
          [familyId]: {
            query: patch.query !== undefined ? patch.query.slice(0, MAX_TEXT) : current.query,
            visible: patch.visible !== undefined ? clampVisible(patch.visible) : current.visible,
          },
        },
      };
    }),

  setMasterPosition: (languageId, patch) =>
    set((state) => {
      if (!LANGUAGE_ID_SET.has(languageId)) return state;
      const current = state.masterByLanguage[languageId] ?? EMPTY_MASTER_POSITION;
      return {
        masterByLanguage: {
          ...state.masterByLanguage,
          [languageId]: {
            zoom: patch.zoom !== undefined ? clampZoom(patch.zoom) : current.zoom,
            nodeId:
              patch.nodeId !== undefined
                ? patch.nodeId === null
                  ? null
                  : patch.nodeId.slice(0, MAX_TEXT)
                : current.nodeId,
          },
        },
      };
    }),
}));

useViewStore.subscribe((state) => persistViewState(state));
