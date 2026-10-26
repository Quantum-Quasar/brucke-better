"use client";

import { useSyncExternalStore } from "react";

export type StorageHealth = "ok" | "failed";

// Kept outside the zustand store: saveState() runs inside other store updates,
// and a nested set() there would race the update that triggered the save.
let health: StorageHealth = "ok";
const listeners = new Set<() => void>();

export function reportStorageWrite(succeeded: boolean): void {
  const next: StorageHealth = succeeded ? "ok" : "failed";
  if (health === next) return;
  health = next;
  for (const listener of listeners) listener();
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
