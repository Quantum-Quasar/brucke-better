import { prepareSession, type ReviewDeckType, type SessionSize } from "@/lib/review-decks";
import type { SRSCard } from "@/lib/types";
import { isReviewable } from "@/lib/srs";

interface DeckSources {
  dueCards: SRSCard[];
  weakestCards: SRSCard[];
  learnedCards: SRSCard[];
  recentWordIds: string[];
  scopedCompoundCards: SRSCard[];
  sentenceCards: SRSCard[];
  articleCards: SRSCard[];
  shiftIds: () => string[];
  domainIds: () => string[];
  everythingIds: () => string[];
  blankCard: (id: string) => SRSCard;
  sessionSize: SessionSize;
  shuffleSession: boolean;
}
/** Every vocabulary deck shares one cap; due/weakest/recent preserve priority. */
export function orderReviewDeck(deck: ReviewDeckType, sources: DeckSources, customCards?: SRSCard[]): SRSCard[] {
  const { dueCards, weakestCards, learnedCards, recentWordIds, scopedCompoundCards, sentenceCards, articleCards, shiftIds, domainIds, everythingIds, blankCard, sessionSize, shuffleSession } = sources;
  const cards = customCards ?? (() => {
    switch (deck) {
      case "due": return dueCards;
      case "weakest": return weakestCards;
      case "learned": return learnedCards;
      case "shift": return shiftIds().map(blankCard);
      case "recent": return recentWordIds.map(blankCard);
      case "compounds": return scopedCompoundCards;
      case "sentences": return sentenceCards;
      case "articles": return articleCards;
      case "domain": return domainIds().map(blankCard);
      case "everything": return [...everythingIds().map(blankCard), ...scopedCompoundCards, ...sentenceCards, ...articleCards];
    }
  })();
  return prepareSession(cards.filter((card) => isReviewable(card)), sessionSize, shuffleSession && !["due", "weakest", "recent"].includes(deck));
}
