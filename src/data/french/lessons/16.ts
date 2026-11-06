import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 16,
  "slug": "days-months-and-dates",
  "title": "Days, Months & Dates",
  "subtitle": "The planetary weekdays (lundi to dimanche), months with en, dates with le, and aujourd'hui",
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
    "janvier",
    "juillet",
    "aujourdhui",
    "demain",
    "hier",
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
    "janvier",
    "juillet",
    "aujourdhui",
    "demain",
    "hier",
    "semaine"
  ],
  "hook": {
    "title": "Five Roman Gods, the Sabbath, and the Lord's Day",
    "content": "English swapped the Roman gods of the week for Norse ones (Mars → Tiw's Tuesday, Mercury → Woden's Wednesday, Jupiter → Thor's Thursday, Venus → Freya's Friday). French kept the Roman sky calendar intact with Latin diēs ('day') fused onto the tail as -di: lundi (Moon-day), mardi (Mars-day), mercredi (Mercury-day), jeudi (Jove/Jupiter-day), vendredi (Venus-day), plus samedi (Sabbath-day) and dimanche (Dominica, the Lord's day).",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why aujourd'hui means 'on the day of today's day'",
        "content": "Latin hodiē ('today') wore down to Old French hui. That felt too short, so speakers padded it into au jour d'hui ('on the day of today') — making aujourd'hui a double 'today'!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Bare Weekdays vs. Habitual le, and Months with en",
    "content": "In French, you never say 'on Monday' — the weekday stands bare: J'arrive lundi ('I arrive on Monday'). But if you put le in front of a weekday (le lundi), it means 'EVERY Monday'! For months, French uses en ('in'): en janvier, en juillet. And for exact dates, French uses le + cardinal number: le quatorze juillet ('the 14th of July'), using premier ('first') only on the 1st of the month (le premier janvier).",
    "linguist_note": "French weekdays and months are never capitalized inside a sentence because they are treated as common temporal nouns rather than proper names.",
    "trap_note": "The shortcut your mind will offer: putting a preposition before a weekday (*sur lundi) or using dans for months (*dans janvier). Weekdays stand bare (lundi), and months take en (en janvier)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each French day of the week with its planetary or historical origin:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "lundi (Monday)",
          "german": "Moon-day (lunar)"
        },
        {
          "id": "p2",
          "english": "mardi (Tuesday)",
          "german": "Mars-day (martial)"
        },
        {
          "id": "p3",
          "english": "mercredi (Wednesday)",
          "german": "Mercury-day"
        },
        {
          "id": "p4",
          "english": "jeudi (Thursday)",
          "german": "Jove / Jupiter-day"
        },
        {
          "id": "p5",
          "english": "vendredi (Friday)",
          "german": "Venus-day"
        }
      ],
      "target_answer": "Moon-day (lunar), Mars-day (martial), Mercury-day, Jove / Jupiter-day, Venus-day",
      "meaning": "lundi (Monday), mardi (Tuesday), mercredi (Wednesday), jeudi (Thursday), vendredi (Friday)",
      "explanation": "The ending -di is Latin diēs ('day').",
      "id": "fr16_e1"
    },
    {
      "type": "shift_select",
      "prompt": "What is the difference between 'Je travaille samedi' and 'Je travaille le samedi'?",
      "options": [
        "'last Saturday' vs. 'next Saturday'",
        "They mean the exact same thing",
        "'on Saturday' (this once) vs. 'on Saturdays' (every Saturday)"
      ],
      "target_answer": "'on Saturday' (this once) vs. 'on Saturdays' (every Saturday)",
      "meaning": "le + weekday expresses a recurring habit",
      "explanation": "A bare weekday means that single day; le + weekday means 'every [weekday]'.",
      "id": "fr16_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'in July' in French?",
      "options": [
        "en juillet",
        "à juillet",
        "dans juillet"
      ],
      "target_answer": "en juillet",
      "meaning": "in July",
      "explanation": "All twelve months take en: en janvier, en juillet.",
      "id": "fr16_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "today is Monday and tomorrow is Tuesday",
      "cues": [
        "Today it is Monday → Aujourd'hui, c'est lundi",
        "and tomorrow it is Tuesday → et demain, c'est mardi"
      ],
      "idea_parts": [
        "first clause → Aujourd'hui, c'est lundi",
        "second clause → et demain, c'est mardi"
      ],
      "target_answer": "Aujourd'hui, c'est lundi et demain, c'est mardi",
      "meaning": "Today is Monday and tomorrow is Tuesday",
      "word_bank": [
        "c'est",
        "la",
        "Aujourd'hui",
        "et",
        "mardi",
        "lundi",
        "hier",
        "demain",
        "c'est"
      ],
      "explanation": "French uses c'est + weekday to state what day it is.",
      "diagnosis": {
        "slip": "capitalized lundi/mardi or omitted c'est",
        "cue": "Use c'est lundi and c'est mardi."
      },
      "id": "fr16_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je vais partir vendredi en juillet",
      "replays": 2,
      "target_answer": "Je vais partir vendredi en juillet",
      "meaning": "I am going to leave on Friday in July",
      "cues": [
        "near future: Je vais partir",
        "bare weekday: vendredi",
        "in July: en juillet"
      ],
      "explanation": "vendredi stands bare with no 'on'; juillet takes en.",
      "affirmation": "You kept vendredi bare and paired juillet with en.",
      "id": "fr16_e5"
    }
  ],
  "summary": {
    "outcome": "Name all seven weekdays and key months, contrast bare lundi ('on Monday') with le lundi ('every Monday'), and use en with months.",
    "use_example": {
      "german": "Le dimanche, je reste chez moi.",
      "english": "On Sundays, I stay at home."
    },
    "takeaway": "Weekdays take no 'on' (lundi = on Monday, le lundi = every Monday), and months take en.",
    "curiosity_teaser": "Up next on Le Pont ([1601] The Sky Calendar): see how Days, Months & Dates leads directly into The Sky Calendar."
  },
  "twist": {
    "prompt": "Ungraded — 'A week has seven days' (use jours):",
    "target_answer": "Une semaine a sept jours",
    "word_bank": [
      "a",
      "est",
      "Un",
      "jours",
      "Une",
      "sept",
      "semaine"
    ],
    "explanation": "la semaine (from Latin septimāna, 'group of seven') + a ('has') + sept jours."
  },
  "foreshadow": {
    "line": "Having mastered Days, Months & Dates, look ahead to Topic 17 (The -é Past), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 17
  },
  "payoff": {
    "ofLesson": 15,
    "text": "The foundation from Topic 15 (Numbers & the Four-Twenties) now pays off directly inside Days, Months & Dates: every sentence here builds on that earlier step."
  }
};

export default lesson;
