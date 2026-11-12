import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 2002,
  "slug": "plans-for-tomorrow",
  "title": "Plans for Tomorrow",
  "subtitle": "gaan + infinitive for plans, graag for wishes — tomorrow in two moves",
  "phase": 3,
  "categories": [
    "future"
  ],
  "words": [
    "morgen",
    "kopen",
    "winkel",
    "boek",
    "gaan",
    "willen"
  ],
  "hookTitle": "Tomorrow Needs Two Verbs",
  "hook": "Dutch plans take two verbs: morgen ga ik kopen — tomorrow go I buy. The motion verb gaan carries the future; the real action waits at the end as a bare infinitive. Want something instead? Ik wil graag kopen — wil takes the wish, graag makes it friendly.",
  "patternTitle": "The second verb waits at the end",
  "pattern": "morgen ga ik naar de winkel (motion), ik wil graag een boek kopen (wish + action). When two verbs appear, the first one conjugates and the second waits, bare, at the end.",
  "trap": "Do not conjugate the second verb: ik wil graag een boek kopen, never *ik wil graag koopt — kopen stays a bare infinitive until Topic 13 gives it its full stage.",
  "sentences": [
    {
      "nl": "Morgen ga ik naar de winkel.",
      "en": "I am going to the shop tomorrow.",
      "literal": "Tomorrow go I to the shop.",
      "wrong": [
        "Morgen ik ga naar de winkel.",
        "Morgen gaan ik naar de winkel."
      ],
      "note": "Front a time word and the verb still comes second: morgen ga IK — the V2 flip you will drill in Topic 12."
    },
    {
      "nl": "Ik wil graag een boek kopen.",
      "en": "I would like to buy a book.",
      "literal": "I want gladly a book to buy.",
      "note": "Word for word: I want gladly a book to buy — graag is the friendliness inside the wish."
    },
    {
      "nl": "Ik ga morgen een brood kopen.",
      "en": "I am going to buy bread tomorrow.",
      "literal": "I go tomorrow a bread buy."
    },
    {
      "nl": "Zij kopen morgen een huis.",
      "en": "They are buying a house tomorrow.",
      "literal": "They buy tomorrow a house."
    }
  ],
  "twist": {
    "nl": "Wij willen graag spelen.",
    "en": "We would like to play.",
    "explanation": "wij willen graag spelen — the wish verb conjugates, the action verb waits bare."
  },
  "outcome": "Say tomorrow's plans with gaan + infinitive and polite wishes with wil graag + infinitive.",
  "takeaway": "Two verbs, one sentence: the first conjugates, the second waits at the end."
};

export default lesson;
