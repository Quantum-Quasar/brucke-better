import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1603,
  "slug": "lesson-1603",
  "title": "The Full Date: le 14 juillet",
  "subtitle": "le + number + month: say any date, from le 1 janvier to le 31 décembre",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "janvier",
    "juillet",
    "trois",
    "quatre",
    "cinq",
    "trente",
    "aujourdhui",
    "hier",
    "demain",
    "semaine"
  ],
  "table_word_ids": [
    "janvier",
    "juillet",
    "trois",
    "quatre",
    "cinq",
    "trente",
    "aujourdhui",
    "hier",
    "demain",
    "semaine"
  ],
  "hook": {
    "title": "One Structure for Every Date",
    "content": "English says 'July 14th' or 'the 14th of July' — two orders for two habits. French picks one lane and stays in it: le 14 juillet. Number first, month second, le up front. The national day is le 14 juillet — the date is famous enough to name the holiday.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The one ordinal that survives",
        "content": "Written dates use bare numbers (le 3 janvier), and speech spells them out (le trois janvier). Only the 1st keeps its old ordinal: le premier janvier — French never says le un janvier.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "le + Number + Month",
    "content": "le trois janvier, le 21 juin, le 14 juillet — the article le carries the day, the number does the counting, the month closes the phrase. No ordinal endings anywhere.",
    "linguist_note": "French calendars keep the Arabic numerals on paper but the mouth spells the number: le trois mai.",
    "trap_note": "Don't build an English ordinal: it's le trois janvier, never *le troisième janvier — and the 1st is le premier, the single survivor."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English date or anchor with its French form:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the 3rd of January",
          "german": "le 3 janvier"
        },
        {
          "id": "p2",
          "english": "the 30th of July",
          "german": "le 30 juillet"
        },
        {
          "id": "p3",
          "english": "today",
          "german": "aujourd'hui"
        },
        {
          "id": "p4",
          "english": "yesterday",
          "german": "hier"
        },
        {
          "id": "p5",
          "english": "tomorrow",
          "german": "demain"
        }
      ],
      "target_answer": "le 3 janvier, le 30 juillet, aujourd'hui, hier, demain",
      "meaning": "the 3rd of January, the 30th of July, today, yesterday, tomorrow",
      "explanation": "Dates walk number-first under le; the anchors aujourd'hui, hier, demain need no article at all.",
      "id": "fr1603_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you SAY 'the 3rd of January'?",
      "options": [
        "le trois janvier",
        "le troisième janvier",
        "le 3 de janvier"
      ],
      "target_answer": "le trois janvier",
      "meaning": "the 3rd of January",
      "explanation": "Spoken dates spell the number plainly: le trois janvier. The mouth has no ordinals here.",
      "id": "fr1603_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the one ordinal French keeps for dates — 'the first (of the month)':",
      "english_hint": "Latin primarius — first in rank",
      "target_answer": "premier",
      "meaning": "first",
      "explanation": "le premier janvier — the only date that gets an ordinal, because 'one' refuses to be counted.",
      "id": "fr1603_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "we are going to Paris on the 14th of July",
      "cues": [
        "on va = we go",
        "the date: le + number + month"
      ],
      "idea_parts": [
        "we are going → On va",
        "on the 14th of July → le 14 juillet"
      ],
      "target_answer": "On va à Paris le 14 juillet",
      "meaning": "We are going to Paris on the 14th of July",
      "word_bank": [
        "On",
        "va",
        "à",
        "Paris",
        "le",
        "14",
        "juillet",
        "janvier",
        "demain"
      ],
      "explanation": "The date lands at the end with its own le: le 14 juillet — no preposition needed.",
      "diagnosis": {
        "slip": "added a preposition before the date",
        "cue": "le already does the work of 'on' — le 14 juillet stands bare."
      },
      "id": "fr1603_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Le 14 juillet, on est à Paris",
      "replays": 2,
      "target_answer": "Le 14 juillet, on est à Paris",
      "meaning": "On the 14th of July, we are in Paris",
      "cues": [
        "It starts with the date",
        "It means: On the 14th of July, we are in Paris"
      ],
      "explanation": "Le 14 juillet, on est à Paris — a full date anchoring a whole sentence.",
      "affirmation": "You wrote a complete French date doing front-of-sentence work.",
      "id": "fr1603_e5"
    }
  ],
  "summary": {
    "outcome": "Say any date with le + number + month, and anchor days with aujourd'hui, hier and demain.",
    "use_example": {
      "german": "On va à Paris le 14 juillet",
      "english": "We are going to Paris on the 14th of July"
    },
    "takeaway": "French dates walk number-first: le 14 juillet — and the 1st walks alone: le premier.",
    "curiosity_teaser": "Up next on Le Pont ([17] The -é Past): see how The Full Date: le 14 juillet leads directly into The -é Past."
  },
  "twist": {
    "prompt": "One more, no safety net — say we are in Paris on the 14th of July:",
    "target_answer": "Le 14 juillet, on est à Paris",
    "word_bank": [
      "Le",
      "14",
      "juillet",
      "on",
      "est",
      "à",
      "Paris",
      "janvier"
    ],
    "explanation": "Reconstructing \"Le 14 juillet, on est à Paris\" cements the le + number + month frame."
  }
};

export default lesson;
