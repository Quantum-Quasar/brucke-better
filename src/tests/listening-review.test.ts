import { describe, it, expect } from "vitest";
import { DECK_CAPABILITIES, resolveCardReviewMode } from "../lib/review-decks";
import { createInitialCard } from "../lib/srs";
import { orderReviewDeck } from "../components/review/review-deck-ordering";
import { DISCRIMINATION_SPRIG_IDS, isDiscriminationSprig } from "../components/lesson/use-classic-exercise";

describe("Listening Review deck & audio-first discrimination sprigs", () => {
  it("registers listening deck as flashcard-only audio-first mode", () => {
    expect(DECK_CAPABILITIES.listening).toBeDefined();
    expect(DECK_CAPABILITIES.listening.supportedModes).toEqual(["flashcard"]);
    expect(DECK_CAPABILITIES.listening.defaultMode).toBe("flashcard");
    expect(resolveCardReviewMode(undefined, "typing", "listening")).toBe("flashcard");
  });

  it("orders listening deck cards via orderReviewDeck", () => {
    const cards = [createInitialCard("hoffen"), createInitialCard("helfen")];
    const ordered = orderReviewDeck("listening", {
      dueCards: [],
      weakestCards: [],
      learnedCards: [],
      recentWordIds: [],
      scopedCompoundCards: [],
      sentenceCards: [],
      articleCards: [],
      listeningCards: cards,
      starredCards: [],
      shiftIds: () => [],
      domainIds: () => [],
      everythingIds: () => [],
      blankCard: createInitialCard,
      sessionSize: 10,
      shuffleSession: false,
    });
    expect(ordered.map((c) => c.word_id)).toEqual(["hoffen", "helfen"]);
  });

  it("identifies discrimination sprigs 302, 402, 502, 602, 702 by lessonId or exerciseId", () => {
    for (const id of [302, 402, 502, 602, 702]) {
      expect(DISCRIMINATION_SPRIG_IDS.has(id)).toBe(true);
      expect(isDiscriminationSprig(id)).toBe(true);
      expect(isDiscriminationSprig(undefined, `l${id}_e2`)).toBe(true);
    }
    expect(isDiscriminationSprig(1, "l1_e1")).toBe(false);
    expect(isDiscriminationSprig(301, "l301_e1")).toBe(false);
    expect(isDiscriminationSprig(403, "l403_e1")).toBe(false);
  });
});
