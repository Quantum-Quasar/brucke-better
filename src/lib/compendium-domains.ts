/** Closed vocabulary for the §2 Domain column. A typo here silently creates a
 *  phantom Review Hub deck, so the parser rejects anything outside this list. */
export const COMPENDIUM_DOMAINS = [
  "core",
  "body",
  "food",
  "home",
  "nature",
  "adjectives",
  "time",
  "travel",
  "shopping",
  "emotions",
  "weather",
  "hobbies",
  "family",
  "professions",
  "clothing",
  "survival",
  "numbers",
  "directions",
  "countries",
  "people",
  "colors",
  "months",
  "seasons",
] as const;

export type CompendiumDomain = (typeof COMPENDIUM_DOMAINS)[number];

export const COMPENDIUM_DOMAIN_SET: ReadonlySet<string> = new Set(COMPENDIUM_DOMAINS);

export const COMPENDIUM_DOMAIN_HINT = COMPENDIUM_DOMAINS.join(", ");
