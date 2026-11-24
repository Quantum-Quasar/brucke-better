"use client";

import { useSyncExternalStore } from "react";

export type StorageHealth = "ok" | "failed" | "corrupt";

export const QUARANTINED_STORAGE_KEY = "brucke_quarantined_corrupt_state";

// Kept outside the zustand store: saveState() runs inside other store updates,
// and a nested set() there would race the update that triggered the save.
let health: StorageHealth = "ok";
let quarantinedPayload: string | null = null;
const listeners = new Set<() => void>();

function notify(): void {
  for (const listener of listeners) listener();
}

export function reportStorageWrite(succeeded: boolean): void {
  // Don't silently clear a corruption alert when a subsequent save succeeds;
  // the user must explicitly dismiss or download the quarantined backup.
  if (health === "corrupt" && succeeded) return;
  const next: StorageHealth = succeeded ? "ok" : "failed";
  if (health === next) return;
  health = next;
  notify();
}

export function reportStorageCorruption(rawPayload: string): void {
  quarantinedPayload = rawPayload;
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(QUARANTINED_STORAGE_KEY, rawPayload);
    }
  } catch {
    // Best-effort quarantine; in-memory copy still lets the user download it.
  }
  if (health !== "corrupt") {
    health = "corrupt";
    notify();
  }
}

export function getQuarantinedStoragePayload(): string | null {
  if (quarantinedPayload !== null) return quarantinedPayload;
  try {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(QUARANTINED_STORAGE_KEY);
    }
  } catch {
    return null;
  }
  return null;
}

export function dismissStorageCorruption(): void {
  quarantinedPayload = null;
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(QUARANTINED_STORAGE_KEY);
    }
  } catch {
    // Ignore storage removal errors
  }
  if (health === "corrupt") {
    health = "ok";
    notify();
  }
}

export function getStorageHealth(): StorageHealth {
  return health;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** The server has no storage; render "ok" so hydration cannot mismatch. */
export function useStorageHealth(): StorageHealth {
  return useSyncExternalStore(subscribe, getStorageHealth, () => "ok");
}
