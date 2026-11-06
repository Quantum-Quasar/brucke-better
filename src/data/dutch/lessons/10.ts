import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 10,
  "slug": "present-tense",
  "title": "The Present Tense",
  "subtitle": "one stem, two endings, and the t that disappears in inversion",
  "phase": 2,
  "categories": [
    "direct_twin"
  ],
  "words": [
    "werken",
    "maken",
    "komen",
    "gaan",
    "jij",
    "wij"
  ],
  "hookTitle": "One Stem, Two Endings",
  "hook": "Take the infinitive, remove -en, and you have the stem: werken → werk, maken → maak. Ik takes the bare stem; jij and hij add -t; wij, jullie and zij add -en.",
  "patternTitle": "The t moves with the pronoun",
  "pattern": "Jij werkt, but Werk jij? When jij follows the verb, the -t disappears. The t belongs to the subject-verb pair, not to the verb alone. This is the first place Dutch word order changes the shape of a word.",
  "trap": "Do not write werkt jij. In inversion, jij loses the -t: werk jij, kom jij, maak jij.",
  "linguist": "Dutch present-tense endings descend from older Germanic person markers; the inversion rule is a phonological repair, not a separate conjugation.",
  "sentences": [
    {
      "nl": "Ik werk hier.",
      "en": "I work here.",
      "literal": "I work here.",
      "wrong": [
        "Ik werkt hier.",
        "Ik hier werk."
      ]
    },
    {
      "nl": "Jij werkt daar.",
      "en": "You work there.",
      "literal": "You work there."
    },
    {
      "nl": "Wij komen samen.",
      "en": "We come together.",
      "literal": "We come together."
    },
    {
      "nl": "Hij maakt koffie.",
      "en": "He makes coffee."
    }
  ],
  "twist": {
    "nl": "Werk jij morgen?",
    "en": "Do you work tomorrow?",
    "explanation": "Inversion drops the -t on jij: werk jij, not werkt jij."
  },
  "outcome": "Conjugate regular present-tense verbs and drop the -t after jij in inversion.",
  "takeaway": "The stem is the launchpad; the endings follow the subject, and inversion changes the second-person shape."
};

export default lesson;
