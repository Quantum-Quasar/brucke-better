export const FREQUENCY_REVISION = "525f9b560de45753a5ea01069454e72e9aa541c6";
export const FREQUENCY_LANGUAGES = ["de", "fr", "es", "nl"] as const;
export type FrequencyLanguage = typeof FREQUENCY_LANGUAGES[number];

export const FREQUENCY_CHECKSUMS: Record<FrequencyLanguage, string> = {
  de: "d9e50546fd7e8b6fe6542a2b33c51d1331092b2a3916ec09f80d97856068705b",
  fr: "f81f7c570b6433764da99aa30f4dfb08d81c5926301377b709af23a13b1f9596",
  es: "dcff3ad4316192f4dc4ff7d26e637c6ff314ef1ca0f3f720c5649018a71056c0",
  nl: "099bd0c27b514d54284360ad9ce2b4ef7b6903b22e848b67ab10f6aa2adb4baa",
};

export function frequencySourceUrl(language: FrequencyLanguage): string {
  return `https://raw.githubusercontent.com/hermitdave/FrequencyWords/${FREQUENCY_REVISION}/content/2018/${language}/${language}_50k.txt`;
}

/**
 * English is deliberately *not* a `FrequencyLanguage`: its pinned list only ranks
 * English hook words, deciding which "twin" a lesson may name as already-known.
 * Keeping it out of `FREQUENCY_LANGUAGES` stops English ranks leaking into the
 * course payloads or any other exported vocabulary artifact.
 */
export const ENGLISH_FREQUENCY_CHECKSUM = "5351ff405b1126ef555791dd4d9798a48e3e9a501a9fc481a9da957752cfb458";

/** How many of the ranked English forms a lesson hook may treat as already known. */
export const ENGLISH_HOOK_WORD_LIMIT = 5000;

export function englishFrequencySourceUrl(): string {
  return `https://raw.githubusercontent.com/hermitdave/FrequencyWords/${FREQUENCY_REVISION}/content/2018/en/en_50k.txt`;
}
