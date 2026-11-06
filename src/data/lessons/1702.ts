import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1702,
  "slug": "days-of-thunder",
  "title": "Days of Thunder",
  "subtitle": "The weekday etymologies — Donner, Mitte, Sonne — in one calendar",
  "phase": 3,
  "shift_categories": [
    "th_to_d"
  ],
  "word_ids": [
    "donner",
    "montag",
    "dienstag",
    "freitag",
    "sonntag",
    "tag",
    "woche"
  ],
  "table_word_ids": [
    "montag",
    "dienstag",
    "freitag",
    "sonntag",
    "donner",
    "tag",
    "woche",
    "stein",
    "orange",
    "karotte",
    "genau",
    "dumm",
    "badezimmer",
    "leder",
    "einkauf"
  ],
  "hook": {
    "title": "One Pantheon, Two Calendars",
    "content": "English and German named the days after the SAME gods — they just split the credit differently. Monday/Montag: the moon's day, both languages. Tuesday/Dienstag: the sky-god's day — English kept his Norse name Tiw, German kept his function as lord of the thing (the assembly), and hardened his th to d on the way. Wednesday broke the pattern: English kept Woden, German gave up and said 'mid-week' (Mittwoch). Thursday/Donnerstag you know: Thor's name against his hammer-storm. Friday/Freitag: the love goddess, Frigg or Freia, spelled two ways. Sunday/Sonntag: the sun, t → z. Seven days, one Germanic calendar.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Samstag, the Sabbath Spy",
        "content": "The seventh day is the odd one: German south says Samstag — a borrowed word from Greek sambaton (Sabbath) — while the north says Sonnabend ('Sunday-eve'). The sun's day slot ended up with two names, neither of them calqued."
      }
    ]
  },
  "pattern": {
    "title": "The Calendar Grid",
    "content": "Montag (moon-day) — der, like every weekday. Dienstag (the thing-god's day; th → d). Mittwoch (mid-week — Mitte + Woche, the only one without -tag). Donnerstag (thunder-day — Thor's element where English kept Thor's name). Freitag (the goddess's day). Samstag/Sonnabend (the borrowed day). Sonntag (sun-day, t → z). All weekdays are der, all capitalize, and the calendar formula you already own slots them in: Am Montag lerne ich Deutsch — 'am' is an + dem, 'on the', the dative of time wearing a contraction.",
    "footnotes": [],
    "linguist_note": "The Germanic weekday names are calques of the Latin planetary week (dies Lunae, dies Martis...), which is why both languages match god-for-god. Mittwoch replaced Woden deliberately: the church preferred 'mid-week' to a pagan god's name — and English is the only Germanic language that kept Woden."
  },
  "exercises": [
    {
      "id": "l1702_e1",
      "type": "matching_pairs",
      "prompt": "Match the weekdays with their godly twins:",
      "matching_pairs": [
        {
          "id": "dy1",
          "english": "Monday (moon-day)",
          "german": "Montag"
        },
        {
          "id": "dy2",
          "english": "Friday (goddess-day)",
          "german": "Freitag"
        },
        {
          "id": "dy3",
          "english": "Sunday (sun-day)",
          "german": "Sonntag"
        },
        {
          "id": "dy4",
          "english": "Thursday (thunder-day)",
          "german": "Donnerstag"
        }
      ],
      "target_answer": "Montag, Freitag, Sonntag, Donnerstag",
      "meaning": "Monday, Friday, Sunday, Thursday",
      "explanation": "Same gods, same order, one shift: the languages split the naming but kept the calendar."
    },
    {
      "id": "l1702_e2",
      "type": "shift_select",
      "prompt": "Which German weekday swapped its god-name for plain geography?",
      "options": [
        "Sonntag",
        "Montag",
        "Mittwoch (mid-week) — the church replaced Woden",
        "Freitag"
      ],
      "target_answer": "Mittwoch (mid-week) — the church replaced Woden",
      "meaning": "Mittwoch = Mitte + Woche",
      "explanation": "English kept Woden's name; German swapped it for geography. It is also the only weekday not ending in -tag."
    },
    {
      "id": "l1702_e3",
      "type": "shift_select",
      "prompt": "Why do English 'Tuesday' and German 'Dienstag' both start with a T/D sound?",
      "options": [
        "Pure coincidence",
        "Tuesday is a French loan",
        "Both come from Latin dies (day)",
        "Both honor the same god (Tīwaz/Thingsus) — and th hardened to d in German"
      ],
      "target_answer": "Both honor the same god (Tīwaz/Thingsus) — and th hardened to d in German",
      "meaning": "Tuesday ↔ Dienstag: one god, two names, one shift",
      "explanation": "The same sky-god under two titles, plus the TH→D hardening — a mythological and phonological double twin."
    },
    {
      "id": "l1702_e4",
      "type": "reverse_cognate",
      "prompt": "What English weekday is the twin of 'Sonntag'?",
      "target_answer": "Sunday",
      "meaning": "Sunday ↔ Sonntag (sun-day)",
      "explanation": "The identical calque: the sun's day — with Sonntag shifting the sun's t to z."
    },
    {
      "id": "l1702_e5",
      "type": "transcribe",
      "prompt": "Say in German: \"On Thursday we drink beer\"",
      "target_answer": "Am Donnerstag trinken wir Bier",
      "meaning": "On Thursday we drink beer",
      "vocab_hints": [
        {
          "word": "am",
          "translation": "on the / in the (time)",
          "note": "am = an + dem — 'on the Thursday', dative of time, all in one syllable"
        }
      ],
      "word_bank": [
        "zu",
        "Bier",
        "wir",
        "Am",
        "ohne",
        "Donnerstag",
        "trinken"
      ],
      "explanation": "Time phrase first (am Donnerstag), verb glued to position 2: 'Am Donnerstag trinken wir Bier'.",
      "idea": "On Thursday we drink beer",
      "idea_parts": [
        "On Thursday",
        "we drink beer (verb in position 2)"
      ],
      "cues": [
        "Start with \"Am\" and anchor \"Donnerstag\" in position 2.",
        "Close the frame with \"Bier\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Name the weekdays and tell the god-story behind each pair.",
    "use_example": {
      "german": "Am Donnerstag trinken wir Bier.",
      "english": "On Thursday we drink beer."
    },
    "takeaway": "One Germanic pantheon runs both calendars — moon, thing-god, Woden/mid-week, thunder, goddess, sun.",
    "curiosity_teaser": "Next: Clock & Calendar Gym — telling time both the colloquial and the formal way."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Days of Thunder (On Thursday we drink beer):",
    "target_answer": "Am Donnerstag trinken wir Bier",
    "word_bank": [
      "heute",
      "wir",
      "Donnerstag",
      "nicht",
      "trinken",
      "Bier",
      "Am"
    ],
    "explanation": "Re-assembling \"Am Donnerstag trinken wir Bier\" from scratch locks in the structural pattern of Days of Thunder without relying on short-term echo."
  }
};

export default lesson;
