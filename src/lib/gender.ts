// ponytail: centralized, high-contrast gender styling and linguistic metadata

import type { Gender } from "./types";

export interface GenderInfo {
  gender: Gender;
  label: string;
  article: string;
  colorName: string;
  badgeClass: string;
  dotColor: string;
}

export function getGenderInfo(gender: Gender | string | null | undefined): GenderInfo | null {
  if (!gender) return null;
  const g = gender.toLowerCase().trim();

  if (g === "der") {
    return {
      gender: "der",
      label: "Masculine",
      article: "der",
      colorName: "Azure Blue",
      badgeClass: "text-blue-700 dark:text-blue-300 bg-blue-500/10 dark:bg-blue-500/15 border-blue-500/30",
      dotColor: "#60A5FA",
    };
  }

  if (g === "die") {
    return {
      gender: "die",
      label: "Feminine",
      article: "die",
      colorName: "Vivid Rose",
      badgeClass: "text-rose-700 dark:text-rose-300 bg-rose-500/10 dark:bg-rose-500/15 border-rose-500/30",
      dotColor: "#FB7185",
    };
  }

  if (g === "das") {
    return {
      gender: "das",
      label: "Neuter",
      article: "das",
      colorName: "Emerald Green",
      badgeClass: "text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/30",
      dotColor: "#34D399",
    };
  }

  if (g === "le") {
    return {
      gender: "le",
      label: "Masculine",
      article: "le",
      colorName: "Azure Blue",
      badgeClass: "text-blue-700 dark:text-blue-300 bg-blue-500/10 dark:bg-blue-500/15 border-blue-500/30",
      dotColor: "#60A5FA",
    };
  }

  if (g === "la") {
    return {
      gender: "la",
      label: "Feminine",
      article: "la",
      colorName: "Vivid Rose",
      badgeClass: "text-rose-700 dark:text-rose-300 bg-rose-500/10 dark:bg-rose-500/15 border-rose-500/30",
      dotColor: "#FB7185",
    };
  }

  if (g === "el") {
    return {
      gender: "el",
      label: "Masculine",
      article: "el",
      colorName: "Azure Blue",
      badgeClass: "text-blue-700 dark:text-blue-300 bg-blue-500/10 dark:bg-blue-500/15 border-blue-500/30",
      dotColor: "#60A5FA",
    };
  }

  if (g === "de") {
    return {
      gender: "de",
      label: "Common",
      article: "de",
      colorName: "Azure Blue",
      badgeClass: "text-blue-700 dark:text-blue-300 bg-blue-500/10 dark:bg-blue-500/15 border-blue-500/30",
      dotColor: "#60A5FA",
    };
  }

  if (g === "het") {
    return {
      gender: "het",
      label: "Neuter",
      article: "het",
      colorName: "Emerald Green",
      badgeClass: "text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/30",
      dotColor: "#34D399",
    };
  }

  return null;
}

const ELISION_RE = /^[aeiouàâäéèêëîïôöùûüœh]/i;

/**
 * The article to speak/write in front of a word, elided where the language does.
 * French drops the vowel of le/la before a vowel or mute h (l'opinion, l'hôtel);
 * German never elides. Returns null when the word has no gender.
 */
export function displayArticle(
  gender: Gender | string | null | undefined,
  targetWord: string,
  languageId: string
): string | null {
  const info = getGenderInfo(gender);
  if (!info) return null;
  if (languageId === "fr" && (info.article === "le" || info.article === "la")) {
    if (ELISION_RE.test(targetWord.trim())) return "l'";
  }
  return info.article;
}
