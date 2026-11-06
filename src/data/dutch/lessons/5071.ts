import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 5071,
  "slug": "past-in-the-wild",
  "title": "Werkte Je Niet?",
  "subtitle": "negation and questions inside the past tense",
  "phase": 3,
  "categories": [
    "past_tense",
    "negation"
  ],
  "words": [
    "werken",
    "komen",
    "niet",
    "geen",
    "gisteren",
    "kopen"
  ],
  "hookTitle": "The Past Goes Negative",
  "hook": "Once the past is available, negation and questions ride on top of it. Ik werkte gisteren niet, wij kwamen niet, hij kocht geen brood. The tense stays; the negator changes the sentence.",
  "patternTitle": "Past stem + negator",
  "pattern": "Weak past: werkte, kwamen. Strong past: kocht. Niet negates the verb or predicate; geen negates an indefinite noun. The past form does not change when you negate.",
  "trap": "Do not switch to the present when you negate. Ik werkte niet stays past; only the negator is new.",
  "sentences": [
    {
      "nl": "Ik werkte gisteren niet.",
      "en": "I did not work yesterday.",
      "literal": "I worked yesterday not."
    },
    {
      "nl": "Wij kwamen niet.",
      "en": "We did not come.",
      "literal": "We came not."
    },
    {
      "nl": "Hij kocht geen brood.",
      "en": "He did not buy bread.",
      "literal": "He bought no bread."
    },
    {
      "nl": "Zij werkte hier.",
      "en": "She worked here."
    }
  ],
  "twist": {
    "nl": "Ik kocht geen koffie.",
    "en": "I did not buy coffee.",
    "explanation": "Kocht is the strong past of kopen; geen negates the indefinite noun."
  },
  "outcome": "Negate past-tense sentences with niet or geen without changing the tense.",
  "takeaway": "Tense and negation are independent layers; the past stays past."
};

export default lesson;
