import type { UnlockAllLessonsResult } from "./lib/dev-lesson-access";

declare global {
  interface Window {
    /** Development-only helper for manual lesson testing. */
    unlockAllLessons?: () => Promise<UnlockAllLessonsResult>;
  }
}

// Next.js replaces NODE_ENV at build time, so the helper and its implementation
// are excluded from production bundles.
if (process.env.NODE_ENV === "development") {
  window.unlockAllLessons ??= async () => {
    const { unlockAllLessons } = await import("./lib/dev-lesson-access");
    return unlockAllLessons();
  };
  console.info("[dev] Run `await unlockAllLessons()` to make every lesson in the active course replayable.");
}

export {};
