import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1601,
  "slug": "lesson-1601",
  "title": "The Sky Calendar",
  "subtitle": "lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche — the Roman planetary week.",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
    "semaine"
  ],
  "table_word_ids": [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
    "semaine"
  ],
  "hook": {
    "title": "Walking the Planetary Week From Moon to Sun",
    "content": "The first five weekdays end in -di (Latin diēs 'day') after the Moon (lundi), Mars (mardi), Mercury (mercredi), Jupiter/Jove (jeudi), and Venus (vendredi). Then samedi puts -di at the end of Sabbath, and dimanche opens with di- (Dominica, the Lord's Day)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How to remember jeudi (Thursday) vs. mardi (Tuesday) and mercredi (Wednesday)",
        "content": "Mercredi has three syllables like Wed-nes-day (both sit in the middle of the week); jeudi starts with J like Jupiter/Jove (the Roman Thor)!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "lundi (On Monday) vs. le lundi (Every Monday)",
    "content": "Use the bare weekday for a single day (On se voit jeudi), and place le in front for a weekly routine (le lundi = 'every Monday').",
    "linguist_note": "Latin planetary week calqued Hellenistic astrological day names.",
    "trap_note": "Remember: never capitalize French weekdays in the middle of a sentence!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match all seven French weekdays in calendar order:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "lundi & mardi",
          "german": "Monday & Tuesday"
        },
        {
          "id": "p2",
          "english": "mercredi",
          "german": "Wednesday"
        },
        {
          "id": "p3",
          "english": "jeudi",
          "german": "Thursday"
        },
        {
          "id": "p4",
          "english": "vendredi",
          "german": "Friday"
        },
        {
          "id": "p5",
          "english": "samedi & dimanche",
          "german": "Saturday & Sunday"
        }
      ],
      "target_answer": "Monday & Tuesday, Wednesday, Thursday, Friday, Saturday & Sunday",
      "meaning": "lundi & mardi, mercredi, jeudi, vendredi, samedi & dimanche",
      "explanation": "lundi through samedi end in -di; dimanche starts with di-.",
      "id": "fr1601_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I arrive on Friday' vs. 'I work on Fridays (every Friday)'?",
      "options": [
        "J'arrive sur vendredi / Je travaille chaque le vendredi",
        "J'arrive vendredi / Je travaille le vendredi",
        "J'arrive le vendredi / Je travaille vendredi"
      ],
      "target_answer": "J'arrive vendredi / Je travaille le vendredi",
      "meaning": "Bare weekday = this Friday; le + weekday = every Friday",
      "explanation": "le before a weekday turns a single day into a weekly habit.",
      "id": "fr1601_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the French weekday named after Jupiter/Jove ('Thursday'):",
      "english_hint": "Jove + di",
      "target_answer": "jeudi",
      "meaning": "Thursday",
      "explanation": "Latin Iovis diēs → jeudi.",
      "id": "fr1601_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "we are going to the cinema on Saturday (use On va)",
      "cues": [
        "We go to the cinema → On va au cinéma + Saturday → samedi"
      ],
      "idea_parts": [
        "clause → On va au cinéma",
        "bare weekday → samedi"
      ],
      "target_answer": "On va au cinéma samedi",
      "meaning": "We're going to the cinema on Saturday",
      "word_bank": [
        "On",
        "au",
        "dimanche",
        "samedi",
        "va",
        "sur",
        "cinéma"
      ],
      "explanation": "samedi stands bare at the end with no preposition.",
      "diagnosis": {
        "slip": "added a preposition before samedi",
        "cue": "Keep samedi bare for 'on Saturday'."
      },
      "id": "fr1601_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Le dimanche, le restaurant est fermé",
      "replays": 2,
      "target_answer": "Le dimanche, le restaurant est fermé",
      "meaning": "On Sundays, the restaurant is closed",
      "cues": [
        "Le dimanche",
        "le restaurant est fermé"
      ],
      "explanation": "Le dimanche = 'on Sundays / every Sunday'.",
      "affirmation": "You used Le dimanche for the weekly schedule.",
      "id": "fr1601_e5"
    }
  ],
  "summary": {
    "outcome": "Use all seven weekdays in single-event and habitual (le + weekday) schedules.",
    "use_example": {
      "german": "On se voit mercredi ou jeudi ?",
      "english": "Shall we see each other Wednesday or Thursday?"
    },
    "takeaway": "Five Roman gods + Sabbath + Lord's Day = the French week.",
    "curiosity_teaser": "Up next on Le Pont ([1602] En janvier Gym): see how The Sky Calendar leads directly into En janvier Gym."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"We're going to the cinema on Saturday\" in French:",
    "target_answer": "On va au cinéma samedi",
    "word_bank": [
      "ne",
      "pas",
      "On",
      "samedi",
      "au",
      "va",
      "cinéma"
    ],
    "explanation": "Re-constructing \"On va au cinéma samedi\" from the underlying rule cements the pattern of The Sky Calendar."
  }
};

export default lesson;
