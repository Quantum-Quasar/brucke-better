import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 22,
  "slug": "pronouns-possessives",
  "title": "Pronouns & Possessives",
  "subtitle": "mij, jou, hem, haar — the object set with a polite u",
  "phase": 4,
  "categories": [
    "pronouns"
  ],
  "words": [
    "mij",
    "jou",
    "hem",
    "haar_obj",
    "ons",
    "hen"
  ],
  "hookTitle": "The Object Set Is Small",
  "hook": "Dutch subject pronouns are close to English; the object set is six short forms: mij, jou, hem, haar, ons, hen. The polite u serves as both subject and object.",
  "patternTitle": "Subject before the verb, object after it",
  "pattern": "Hij ziet mij, ik zie jou, zij ziet hem, wij zien haar. The object follows the verb in a simple main clause. The same forms return inside prepositional phrases.",
  "trap": "Haar is both 'her' (object/possessive) and 'hair'. Context and position tell you which; the article does the rest.",
  "linguist": "Dutch pronouns retain case distinctions (ik/mij, hij/hem) even though nouns lost case; English does the same with I/me, he/him.",
  "sentences": [
    {
      "nl": "Hij ziet mij.",
      "en": "He sees me.",
      "literal": "He sees me.",
      "wrong": [
        "Hij ziet ik.",
        "Hij mij ziet."
      ]
    },
    {
      "nl": "Ik zie jou.",
      "en": "I see you.",
      "literal": "I see you."
    },
    {
      "nl": "Zij ziet hem.",
      "en": "She sees him.",
      "literal": "She sees him."
    },
    {
      "nl": "Wij zien haar.",
      "en": "We see her."
    }
  ],
  "twist": {
    "nl": "Ik zie hen.",
    "en": "I see them.",
    "explanation": "Hen is the object form for people; ze is the neutral alternative."
  },
  "outcome": "Use the Dutch object pronouns and keep them after the verb in simple clauses.",
  "takeaway": "Nouns lost case; pronouns kept it. Dutch and English share that division."
};

export default lesson;
