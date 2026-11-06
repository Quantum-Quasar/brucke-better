import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 5131,
  "slug": "reizen",
  "title": "De Trein & Het Ticket",
  "subtitle": "trains, tickets and Dutch stations",
  "phase": 3,
  "categories": [
    "travel"
  ],
  "words": [
    "trein",
    "station",
    "ticket",
    "fiets",
    "overstappen",
    "aankomen"
  ],
  "hookTitle": "Platform Dutch",
  "hook": "De trein komt aan, het station is hier, ik heb een ticket, wij stappen over. Travel Dutch is a set of arrival and transfer frames.",
  "patternTitle": "Arrive, have, transfer",
  "pattern": "Aankomen is separable: de trein komt aan. Overstappen is separable: wij stappen over. Hebben covers the ticket; zijn covers the location.",
  "trap": "Overstappen means changing trains, not stepping over something. The separable prefix over carries the meaning.",
  "sentences": [
    {
      "nl": "De trein komt aan.",
      "en": "The train arrives.",
      "literal": "The train comes at."
    },
    {
      "nl": "Het station is hier.",
      "en": "The station is here.",
      "literal": "The station is here."
    },
    {
      "nl": "Ik heb een ticket.",
      "en": "I have a ticket.",
      "literal": "I have a ticket."
    },
    {
      "nl": "Wij stappen over.",
      "en": "We change trains.",
      "literal": "We step over."
    }
  ],
  "twist": {
    "nl": "Ik ga met de fiets.",
    "en": "I go by bike.",
    "explanation": "Met + transport is the Dutch 'by' phrase; fiets is the everyday bicycle."
  },
  "outcome": "Navigate a Dutch station with arrival, ticket and transfer sentences.",
  "takeaway": "Travel verbs are often separable; the prefix carries the direction."
};

export default lesson;
