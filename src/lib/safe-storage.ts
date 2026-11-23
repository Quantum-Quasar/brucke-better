/**
 * Safe wrapper around localStorage that never throws during SSR,
 * private-browsing restrictions, or storage quota errors.
 */

function getStorage(): Storage | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage;
    }
    if (typeof globalThis !== "undefined" && "localStorage" in globalThis && globalThis.localStorage) {
      return globalThis.localStorage;
    }
    return null;
  } catch {
    return null;
  }
}

export function readStorageString(key: string): string | null {
  const storage = getStorage();
  if (!storage) return null;
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorageString(key: string, value: string): boolean {
  const storage = getStorage();
  if (!storage) return false;
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function removeStorageKey(key: string): boolean {
  const storage = getStorage();
  if (!storage) return false;
  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function readStorageJson<T>(key: string, fallback: T): T {
  const raw = readStorageString(key);
  if (!raw) return fallback;
  try {
    const parsed: unknown = JSON.parse(raw);
    return parsed === null || parsed === undefined ? fallback : (parsed as T);
  } catch {
    return fallback;
  }
}

export function writeStorageJson(key: string, value: unknown): boolean {
  try {
    return writeStorageString(key, JSON.stringify(value));
  } catch {
    return false;
  }
}
