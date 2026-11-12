import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5151,
  "slug": "dauer-termin-moment-dauern-termin-sekunde-datum",
  "title": "Dauer & Termin: der Moment, dauern, der Termin, die Sekunde, das Datum",
  "subtitle": "how long things last — and the Latin hiding inside the most German verb in the room",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "moment",
    "dauern",
    "termin",
    "sekunde",
    "datum",
    "minute",
    "stunde",
    "null",
    "zahl",
    "million",
    "jetzt",
    "später",
    "früh"
  ],
  "table_word_ids": [
    "moment",
    "dauern",
    "termin",
    "sekunde",
    "datum",
    "minute",
    "stunde",
    "null",
    "zahl",
    "million",
    "jetzt",
    "später",
    "früh",
    "elektriker",
    "sonnenbrille"
  ],
  "hook": {
    "title": "Even the Waiting Is Roman",
    "content": "You already say when (jetzt, sofort, später) and how often (oft, einmal). Today: how LONG. Der Moment is Latin momentum, 'movement' — a moment is one beat of the moving world, and English momentum in physics class is the same word in a lab coat. Der Termin is Latin terminus, the boundary stone a Roman planted where his land ended — a Termin is an end-point planted in your day, and English terminus and terminal are the same stone. Die Sekunde is Latin secundus, 'the following' — the minute's follower, sixty of them deep; English second is the same follower. Das Datum is Latin datum, 'the given' — the date is what the calendar hands you, and English data is literally the same word in the plural. And the sleeper: dauern looks like the most German verb alive, but it walked in from Latin durare, 'to last, to hold out' — dauern and English during, duration, durable are one verb in two coats.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Politeness Pair",
        "content": "Einen Moment, bitte and Eine Sekunde, bitte are the two standard 'one moment, please's — accusative, because the moment is the thing you are being handed. Moment buys you patience; Sekunde buys you urgency. Same frame, different clock."
      }
    ]
  },
  "pattern": {
    "title": "Dauern Eats the Accusative",
    "content": "One frame carries the lesson: Der Termin dauert zwanzig Minuten — the duration stands in the accusative with NO preposition, exactly like Ich warte zehn Minuten. The question is just the frame tilted: Wie lange dauert der Termin? The politeness pair rides the same accusative: Einen Moment, bitte! Eine Sekunde, bitte! The scale climbs — die Sekunde, die Minute, die Stunde — and the case never changes. And the date: Wie ist das Datum heute? — Heute ist der 3. Oktober. Zero fits the same clock: Es ist null Uhr — Mitternacht.",
    "footnotes": [],
    "linguist_note": "The accusative of duration is inherited, not invented: Latin measured time the same bare way (multos annos, 'for many years' — accusative, no preposition). German's dauern kept the old measurement; English needs a 'for' and moves on."
  },
  "exercises": [
    {
      "id": "l5151_e1",
      "type": "matching_pairs",
      "prompt": "Moments, seconds, appointments — match each sentence with its reading. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "mt1",
          "english": "One moment, please",
          "german": "Einen Moment, bitte"
        },
        {
          "id": "mt2",
          "english": "One second, please",
          "german": "Eine Sekunde, bitte"
        },
        {
          "id": "mt3",
          "english": "The appointment lasts twenty minutes",
          "german": "Der Termin dauert zwanzig Minuten"
        },
        {
          "id": "mt4",
          "english": "Zero is a number",
          "german": "Null ist eine Zahl"
        },
        {
          "id": "mt5",
          "english": "A million has six zeros",
          "german": "Eine Million hat sechs Nullen"
        },
        {
          "id": "mt6",
          "english": "The appointment is early in the morning",
          "german": "Der Termin ist früh am Morgen"
        },
        {
          "id": "mt7",
          "english": "See you later",
          "german": "Bis später"
        },
        {
          "id": "recall1",
          "german": "Es kann dauern",
          "english": "It can take time"
        }
      ],
      "target_answer": "Einen Moment, bitte, Eine Sekunde, bitte, Der Termin dauert zwanzig Minuten, Null ist eine Zahl, Eine Million hat sechs Nullen, Der Termin ist früh am Morgen, Bis später, Es kann dauern",
      "meaning": "One moment, please; One second, please; The appointment lasts twenty minutes; Zero is a number; A million has six zeros; The appointment is early in the morning; See you later; It can take time",
      "explanation": "The accusative is everywhere: einen Moment (der Moment), eine Sekunde (die Sekunde), zwanzig Minuten — duration and objects, no preposition in sight. And the numbers you drilled are already inside: null, eine Million, sechs Nullen."
    },
    {
      "id": "l5151_e2",
      "type": "shift_select",
      "prompt": "'Der Termin dauert zwanzig Minuten.' What case is 'zwanzig Minuten' — and what does that tell you about dauern?",
      "options": [
        "dative",
        "nominative subject",
        "accusative of duration",
        "genitive"
      ],
      "target_answer": "accusative of duration",
      "meaning": "dauern takes a bare accusative of duration",
      "explanation": "dauern measures its span with a bare accusative — zwanzig Minuten, keine Präposition. It is the same measurement as Ich warte zehn Minuten, and the same construction Latin used: the duration simply stands there, unmarked."
    },
    {
      "id": "l5151_e3",
      "type": "morpheme_tiles",
      "prompt": "Assemble the duration question: 'How long does the appointment last'",
      "tile_options": [
        "lange",
        "dauert",
        "Wie",
        "Moment",
        "Zahl",
        "Termin",
        "der"
      ],
      "target_answer": "Wie lange dauert der Termin",
      "meaning": "How long does the appointment last?",
      "vocab_hints": [
        {
          "word": "lange",
          "translation": "long / (for) how long",
          "note": "Wie lange asks about DURATION — how long it lasts, from start to finish."
        }
      ],
      "explanation": "Wie lange dauert ...? is the all-purpose duration question — swap the subject and it still works: Wie lange dauert der Kaffee, die Stunde, der Winter? The verb dauert sits in slot 2, as always."
    },
    {
      "id": "l5151_e4",
      "type": "reverse_cognate",
      "prompt": "'Das Datum' is Latin datum, 'the given'. Which English word is that same Latin word in the plural — the one you type every day?",
      "options": [
        "detail",
        "date",
        "dozen",
        "data"
      ],
      "target_answer": "data",
      "meaning": "Datum ↔ data: one Latin participle, two languages",
      "explanation": "Datum is the neuter past participle of Latin dare, 'to give' — 'the given'. English data is literally that same word in the plural, and English date came through the same medieval Latin channel. The calendar hands you data every time you write a Datum."
    },
    {
      "id": "l5151_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'Now I have an appointment'",
      "target_answer": "Jetzt habe ich einen Termin",
      "meaning": "Now I have an appointment",
      "word_bank": [
        "habe",
        "früh",
        "Jetzt",
        "Termin",
        "Moment",
        "der",
        "ich",
        "einen"
      ],
      "explanation": "Jetzt takes position 1, habe slides to slot 2 — the V2 swap from the time-adverb lesson. einen Termin is masculine accusative, the same case as einen Moment, bitte."
    }
  ],
  "summary": {
    "outcome": "Say how long something lasts with dauern + bare accusative, book a Termin, ask the date, and buy patience with Einen Moment, bitte.",
    "use_example": {
      "german": "Wie lange dauert der Termin? — Zwanzig Minuten.",
      "english": "How long does the appointment last? — Twenty minutes."
    },
    "takeaway": "Moment, Termin, Sekunde, Datum are Latin loans — and so, in disguise, is dauern (durare ↔ during). Duration takes a bare accusative: Der Termin dauert zwanzig Minuten.",
    "curiosity_teaser": "Next: Ort I — hier, dort, drüben, gegenüber, der Umweg — the words that tell you where."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Dauer & Termin: der Moment, dauern, der Termin, die Sekunde, das Datum (Now I have an appointment):",
    "target_answer": "Jetzt habe ich einen Termin",
    "word_bank": [
      "nicht",
      "Termin",
      "einen",
      "Jetzt",
      "heute",
      "habe",
      "ich"
    ],
    "explanation": "Re-assembling \"Jetzt habe ich einen Termin\" from scratch locks in the structural pattern of Dauer & Termin: der Moment, dauern, der Termin, die Sekunde, das Datum without relying on short-term echo."
  }
};

export default lesson;
