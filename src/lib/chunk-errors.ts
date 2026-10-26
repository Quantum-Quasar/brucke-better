const CHUNK_LOAD_ERROR =
  /ChunkLoadError|Loading chunk|Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|dynamically imported module/i;

/**
 * Distinguishes a missing/stale JS chunk (old tab after a deploy) from an
 * ordinary render error. A chunk error cannot be fixed by retrying the same
 * import — the versioned URL is gone — so the only recovery is a reload.
 */
export function isChunkLoadError(error: unknown): boolean {
  if (error == null) return false;
  const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  return CHUNK_LOAD_ERROR.test(message);
}
