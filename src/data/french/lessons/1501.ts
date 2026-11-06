import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1501,
  "slug": "lesson-1501",
  "title": "Counting Cognates Gym",
  "subtitle": "un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix, vingt — Latin roots in everyday counting.",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "un",
    "deux",
    "trois",
    "quatre",
    "cinq",
    "six",
    "sept",
    "huit",
    "neuf",
    "dix",
    "vingt"
  ],
  "table_word_ids": [
    "un",
    "deux",
    "trois",
    "quatre",
    "cinq",
    "six",
    "sept",
    "huit",
    "neuf",
    "dix",
    "vingt"
  ],
  "hook": {
    "title": "Every French Number Has an English Twin",
    "content": "Every number 1 to 20 shares its Latin root with an English word you already know: un (unit), deux (duo/deuce), trois (trio), quatre (quartet), cinq (quintet), six (six), sept (September), huit (octopus/October), neuf (November), dix (decimal), vingt (vigesimal).",
    "footnotes": [
      {
        "marker": "1",
        "title": "How six, huit, and dix change their final sound by context",
        "content": "Standing alone, six (/sis/) and dix (/dis/) end in /s/, and huit (/ɥit/) ends in /t/. Before a consonant (six jours, huit livres, dix minutes), their final consonant goes silent! Before a vowel (six‿ans, huit‿heures, dix‿euros), S/X buzzes as /z/ and T taps as /t/!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Count With Cognates and Watch Liaison Before Vowels",
    "content": "Practice pairing numbers with minutes, hours, euros, and days: cinq minutes, sept jours, huit heures, dix euros, vingt ans.",
    "linguist_note": "Sandhi alternation on six, huit, dix preserves three distinct historical environments.",
    "trap_note": "Don't pronounce the p of sept (/sɛt/) or the gt of vingt (/vɛ̃/) when standing alone!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each French number phrase with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "deux cafés (duo)",
          "german": "two coffees"
        },
        {
          "id": "p2",
          "english": "quatre personnes (quartet)",
          "german": "four people"
        },
        {
          "id": "p3",
          "english": "cinq minutes (quintet)",
          "german": "five minutes"
        },
        {
          "id": "p4",
          "english": "sept jours (September)",
          "german": "seven days"
        },
        {
          "id": "p5",
          "english": "dix euros (decimal)",
          "german": "ten euros"
        }
      ],
      "target_answer": "two coffees, four people, five minutes, seven days, ten euros",
      "meaning": "deux cafés (duo), quatre personnes (quartet), cinq minutes (quintet), sept jours (September), dix euros (decimal)",
      "explanation": "Every number 1–10 connects to an English Latinate cognate.",
      "id": "fr1501_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "French cinq ('five') shares its Latin root quinque with which English word for a five-musician group?",
      "target_answer": "quintet",
      "meaning": "quintet ↔ cinq ('five')",
      "explanation": "Latin quinque gave English quintet/quintessential and French cinq.",
      "id": "fr1501_e2"
    },
    {
      "type": "shift_select",
      "prompt": "In 'sept jours' ('seven days'), which letter in 'sept' is completely silent?",
      "options": [
        "The t (/sɛp/)",
        "The s (/ɛpt/)",
        "The p (/sɛt/, never /sɛpt/)"
      ],
      "target_answer": "The p (/sɛt/, never /sɛpt/)",
      "meaning": "The p of sept is always silent; the t is always pronounced (/sɛt/)!",
      "explanation": "Just like English 'receipt', the p in sept is an etymological ghost.",
      "id": "fr1501_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I have five minutes and ten euros",
      "cues": [
        "I have five minutes → J'ai cinq minutes",
        "and ten euros → et dix euros"
      ],
      "idea_parts": [
        "first object → J'ai cinq minutes",
        "second object → et dix euros"
      ],
      "target_answer": "J'ai cinq minutes et dix euros",
      "meaning": "I have five minutes and ten euros",
      "word_bank": [
        "euros",
        "cinq",
        "sept",
        "la",
        "J'ai",
        "dix",
        "minutes",
        "et"
      ],
      "explanation": "dix‿euros links with a /z/ buzz.",
      "diagnosis": {
        "slip": "confused cinq and sept",
        "cue": "Use cinq (5) and dix (10)."
      },
      "id": "fr1501_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Nous avons sept jours à Paris",
      "replays": 2,
      "target_answer": "Nous avons sept jours à Paris",
      "meaning": "We have seven days in Paris",
      "cues": [
        "Nous avons",
        "sept jours à Paris"
      ],
      "explanation": "sept jours = one week (une semaine).",
      "affirmation": "You wrote Nous avons sept jours à Paris cleanly.",
      "id": "fr1501_e5"
    }
  ],
  "summary": {
    "outcome": "Count with 1–20 in real contexts and apply liaison on six, huit, dix, and vingt.",
    "use_example": {
      "german": "J'attends depuis cinq minutes.",
      "english": "I've been waiting for five minutes."
    },
    "takeaway": "Numbers 1–20 are Latin cognates you already own in English.",
    "curiosity_teaser": "Up next on Le Pont ([1502] Four Score & Seven): see how Counting Cognates Gym leads directly into Four Score & Seven."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I have five minutes and ten euros\" in French:",
    "target_answer": "J'ai cinq minutes et dix euros",
    "word_bank": [
      "minutes",
      "et",
      "ne",
      "J'ai",
      "cinq",
      "pas",
      "dix",
      "euros"
    ],
    "explanation": "Re-constructing \"J'ai cinq minutes et dix euros\" from the underlying rule cements the pattern of Counting Cognates Gym."
  }
};

export default lesson;
