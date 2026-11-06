import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 21,
  "slug": "comparatives",
  "title": "Comparatives & Superlatives",
  "subtitle": "groot → groter → grootst; goed → beter → best",
  "phase": 3,
  "categories": [
    "comparison"
  ],
  "words": [
    "groot",
    "klein",
    "goed",
    "beter",
    "best",
    "dan"
  ],
  "hookTitle": "More, Most — and the Irregulars",
  "hook": "Dutch adds -er and -st: groot → groter → grootst. The high-frequency irregulars are the same ones English has: goed → beter → best, veel → meer → meest.",
  "patternTitle": "-er compares, -st crowns",
  "pattern": "Groter dan ('bigger than'), het grootst ('the biggest'). Use dan for 'than' and als for 'as': even groot als. The adjective still takes -e when the phrase is definite.",
  "trap": "Do not say groter als for 'bigger than'. Dan compares, als equates.",
  "linguist": "The comparative -er and superlative -st are shared Germanic endings; the suppletion goed/beter/best mirrors good/better/best.",
  "sentences": [
    {
      "nl": "Het huis is groter dan het boek.",
      "en": "The house is bigger than the book.",
      "literal": "The house is bigger than the book.",
      "wrong": [
        "Het huis is groter als het boek.",
        "Het huis is meer groot dan het boek."
      ]
    },
    {
      "nl": "Mijn huis is groot, jouw huis is groter.",
      "en": "My house is big, your house is bigger.",
      "literal": "My house is big, your house is bigger."
    },
    {
      "nl": "Dit boek is beter dan dat boek.",
      "en": "This book is better than that book.",
      "literal": "This book is better than that book."
    },
    {
      "nl": "Zij is de beste.",
      "en": "She is the best."
    }
  ],
  "twist": {
    "nl": "De trein is sneller dan de fiets.",
    "en": "The train is faster than the bike.",
    "explanation": "Snel → sneller → snelst; dan marks the comparison."
  },
  "outcome": "Compare with -er/-st, dan and als, including the irregular goed/beter/best.",
  "takeaway": "Comparison is one ending plus two tiny words: dan for than, als for as."
};

export default lesson;
