import { prepareSession, type ReviewDeckType, type SessionSize } from "@/lib/review-decks";
import type { SRSCard } from "@/lib/types";

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
/** Queue decks preserve priority; discovery decks apply the learner's scope and cap. */
export function orderReviewDeck(deck: ReviewDeckType, sources: DeckSources, customCards?: SRSCard[]): SRSCard[] {
  if (customCards) return customCards;
  const { dueCards, weakestCards, learnedCards, recentWordIds, scopedCompoundCards, sentenceCards, articleCards, shiftIds, domainIds, everythingIds, blankCard, sessionSize, shuffleSession } = sources;
  switch (deck) {
    case "due": return dueCards;
    case "weakest": return weakestCards;
    case "learned": return prepareSession(learnedCards, 20, true);
    case "shift": return prepareSession(shiftIds().map(blankCard), sessionSize, shuffleSession);
    case "recent": return recentWordIds.map(blankCard);
    case "compounds": return prepareSession(scopedCompoundCards, 0, shuffleSession);
    case "sentences": return prepareSession(sentenceCards, sessionSize, shuffleSession);
    case "articles": return prepareSession(articleCards, sessionSize, shuffleSession);
    case "domain": return prepareSession(domainIds().map(blankCard), sessionSize, shuffleSession);
    case "everything": return prepareSession([...everythingIds().map(blankCard), ...scopedCompoundCards, ...sentenceCards, ...articleCards], sessionSize, shuffleSession);
  }
}
