import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 8,
  "slug": "zijn-hebben",
  "title": "Zijn & Hebben",
  "subtitle": "to be, to have, and the Dutch way to say your age",
  "phase": 2,
  "categories": [
    "direct_twin"
  ],
  "words": [
    "zijn",
    "hebben",
    "ik",
    "jij",
    "hij",
    "twintig"
  ],
  "hookTitle": "The Two Verbs Every Sentence Leans On",
  "hook": "Zijn (to be) and hebben (to have) carry most of the weight. Ik ben, jij bent, hij is; ik heb, jij hebt, hij heeft. With these two verbs, the early vocabulary turns into real sentences.",
  "patternTitle": "Age is something you are",
  "pattern": "Dutch says ik ben twintig for 'I am twenty'. Age belongs to zijn, not hebben. Possession belongs to hebben: ik heb een boek. Keep the two frames apart and the rest of the tense system will stand on them.",
  "trap": "Never say ik heb twintig jaar for your age. Dutch uses zijn for age, even though English sometimes says 'I have twenty years' in other languages.",
  "linguist": "Zijn and hebben are the Dutch reflexes of the same West Germanic being and having verbs that gave English is and have.",
  "sentences": [
    {
      "nl": "Ik ben twintig.",
      "en": "I am twenty.",
      "literal": "I am twenty.",
      "wrong": [
        "Ik heb twintig.",
        "Ik ben twintig jaar oud."
      ]
    },
    {
      "nl": "Jij hebt een boek.",
      "en": "You have a book.",
      "literal": "You have a book."
    },
    {
      "nl": "Hij is hier.",
      "en": "He is here.",
      "literal": "He is here."
    },
    {
      "nl": "Wij hebben water.",
      "en": "We have water."
    }
  ],
  "twist": {
    "nl": "Ik heb honger.",
    "en": "I am hungry.",
    "explanation": "Dutch says 'I have hunger' for being hungry; honger is the noun inside the hebben frame."
  },
  "outcome": "Use zijn and hebben in the singular and plural and say your age with zijn.",
  "takeaway": "Two verbs, two frames: being takes zijn, possession takes hebben, and age belongs to being.",
  "foreshadow": {
    "line": "Both verbs will need an article system to stand on. De and het are next.",
    "resolvedIn": 9
  }
};

export default lesson;
