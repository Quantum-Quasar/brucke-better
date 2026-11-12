import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1602,
  "slug": "lesson-1602",
  "title": "En janvier Gym",
  "subtitle": "Months with en (en janvier, en juillet), dates with le, and aujourd'hui / demain / hier.",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "janvier",
    "juillet",
    "aujourdhui",
    "demain",
    "hier",
    "semaine",
    "en_pron"
  ],
  "table_word_ids": [
    "janvier",
    "juillet",
    "aujourdhui",
    "demain",
    "hier",
    "semaine",
    "en_pron"
  ],
  "hook": {
    "title": "Months with en, Dates with le, and the Time Anchors",
    "content": "To say 'in [Month]', always use en: en janvier, en juillet. To state a date, use le + cardinal number + month: le quatorze juillet ('July 14th').",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why only the 1st of the month uses an ordinal (le premier)",
        "content": "French uses le premier ('the first') ONLY on the 1st (le premier janvier), and switches to plain cardinal numbers for the 2nd through the 31st (le deux janvier, le quatorze juillet)!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "en + Month; le + Number + Month",
    "content": "Pair months with en and dates with le, anchored by hier ('yesterday'), aujourd'hui ('today'), and demain ('tomorrow').",
    "linguist_note": "Cardinal numerals for dates (except premier) replaced Old French ordinals from the 16th century onward.",
    "trap_note": "Never say *dans janvier for 'in January' — use en janvier and le quatorze juillet!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each calendar expression with its French structure:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "in January",
          "german": "en janvier"
        },
        {
          "id": "p2",
          "english": "in July",
          "german": "en juillet"
        },
        {
          "id": "p3",
          "english": "on July 14th (cardinal number!)",
          "german": "le quatorze juillet"
        },
        {
          "id": "p4",
          "english": "yesterday / today / tomorrow",
          "german": "hier / aujourd'hui / demain"
        }
      ],
      "target_answer": "en janvier, en juillet, le quatorze juillet, hier / aujourd'hui / demain",
      "meaning": "in January, in July, on July 14th (cardinal number!), yesterday / today / tomorrow",
      "explanation": "Months take en; specific dates take le + cardinal number.",
      "id": "fr1602_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'in January' vs. 'on January 10th'?",
      "options": [
        "dans janvier / le dix de janvier",
        "en janvier / le dixième janvier",
        "en janvier / le dix janvier"
      ],
      "target_answer": "en janvier / le dix janvier",
      "meaning": "en + month; le + number + month (with no 'de'!)",
      "explanation": "French puts no 'of' (de) between the number and the month: le dix janvier!",
      "id": "fr1602_e2"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal historical breakdown of 'aujourd'hui'?",
      "german": "aujourd'hui",
      "natural": "today",
      "options": [
        "on-the-day of-today",
        "at the hour of now",
        "today"
      ],
      "target_answer": "on-the-day of-today",
      "meaning": "Literal structure: on-the-day of-today",
      "explanation": "au ('on-the') + jour ('day') + d'hui ('of today', Latin hodiē).",
      "id": "fr1602_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I am going to visit Paris in July",
      "cues": [
        "I am going to visit Paris → Je vais visiter Paris",
        "in July → en juillet"
      ],
      "idea_parts": [
        "near future → Je vais visiter Paris",
        "month → en juillet"
      ],
      "target_answer": "Je vais visiter Paris en juillet",
      "meaning": "I am going to visit Paris in July",
      "word_bank": [
        "vais",
        "Je",
        "dans",
        "visiter",
        "juillet",
        "la",
        "en",
        "Paris"
      ],
      "explanation": "Months always take en: en juillet.",
      "diagnosis": {
        "slip": "used dans instead of en",
        "cue": "Use en before a month: en juillet."
      },
      "id": "fr1602_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Aujourd'hui, nous sommes en janvier",
      "replays": 2,
      "target_answer": "Aujourd'hui, nous sommes en janvier",
      "meaning": "Today, we are in January",
      "cues": [
        "Aujourd'hui",
        "nous sommes en janvier"
      ],
      "explanation": "en janvier = 'in January'.",
      "affirmation": "You spelled Aujourd'hui and en janvier accurately.",
      "id": "fr1602_e5"
    }
  ],
  "summary": {
    "outcome": "Express months with en, dates with le + number + month, and anchor timelines with hier, aujourd'hui, demain.",
    "use_example": {
      "german": "Mon frère est né en juillet.",
      "english": "My brother was born in July."
    },
    "takeaway": "en + month ('en juillet'); le + number + month ('le quatorze juillet').",
    "curiosity_teaser": "Up next on Le Pont ([1603] The Full Date: le 14 juillet): see how En janvier Gym leads directly into The Full Date: le 14 juillet."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I am going to visit Paris in July\" in French:",
    "target_answer": "Je vais visiter Paris en juillet",
    "word_bank": [
      "en",
      "pas",
      "vais",
      "visiter",
      "ne",
      "Je",
      "Paris",
      "juillet"
    ],
    "explanation": "Re-constructing \"Je vais visiter Paris en juillet\" from the underlying rule cements the pattern of En janvier Gym."
  }
};

export default lesson;
