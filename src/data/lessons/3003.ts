import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 3003,
  "slug": "whole-trail-review-game",
  "title": "The Whole-Trail Review Game",
  "subtitle": "Thirty topics, mixed modes, one final synthesis sprint",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "sein",
    "haben",
    "können",
    "wollen",
    "müssen",
    "geben",
    "nehmen",
    "kommen",
    "gehen",
    "sagen",
    "nacht",
    "morgen",
    "zug",
    "buch",
    "haus",
    "kind"
  ],
  "table_word_ids": [
    "sein",
    "haben",
    "geben",
    "nehmen",
    "sagen",
    "nacht",
    "können",
    "wollen",
    "müssen",
    "kommen",
    "gehen",
    "morgen",
    "zug",
    "buch",
    "haus",
    "kind"
  ],
  "hook": {
    "title": "The Full Court",
    "content": "Everything you own, on the table at once: the shifts (PF-, TH-, T-, K-, D-, V-, GH-, Y-), the brackets, the cases, the ablaut melodies, the compounds, the idioms. This game mixes every exercise type across every topic — no labels, no warm-up, the real test of reflex. A flawless run earns the purple star; a missed question feeds the retry queue until the reflex is permanent. After this, the hollow shells you have not visited are pure bonus — the spine is yours.",
    "footnotes": [
      {
        "marker": "1",
        "title": "How to Keep It",
        "content": "The Review Hub decks (words, compounds, false friends, insights) run spaced repetition on everything you have met. The trail taught the system; the Review Hub keeps it — thirty minutes a week keeps the whole engine warm."
      }
    ]
  },
  "pattern": {
    "title": "Mixed Rapid Fire",
    "content": "Round one — shifts: tief? tief/deep (D→T+P→F), Nacht/night (gh→ch), sagen/say (y→g), geben/give (v→b). Round two — grammar: den/einen/ihn, mir/dir/ihm, weil/dass basements, V2 walls. Round three — verbs: singen/sang, denken/dachte, tun/tat? (hint — tat is tun's past), war/was. Round four — words: Zug/Zwilling/Zwerg, groß/ß-words, compounds. Round five — production: build sentences from prompts, no word bank. You have seen every item at least twice. This is the lap of honor, run at speed.",
    "footnotes": [],
    "linguist_note": "If you want one sentence to test the whole system: 'Gestern haben wir dem Kind ein großes Geschenk gegeben' — V2, Perfekt bracket, dative receiver, accusative gift, adjective ending, compound, and the geben dynasty in seven words."
  },
  "exercises": [
    {
      "id": "l3003_e1",
      "type": "matching_pairs",
      "prompt": "Mixed round — match at full speed:",
      "matching_pairs": [
        {
          "id": "rg1",
          "english": "deep (double shift)",
          "german": "tief"
        },
        {
          "id": "rg2",
          "english": "said (y→g past)",
          "german": "sagte"
        },
        {
          "id": "rg3",
          "english": "seven (v→b)",
          "german": "sieben"
        },
        {
          "id": "rg4",
          "english": "took (nim's past)",
          "german": "nahm"
        }
      ],
      "target_answer": "tief, sagte, sieben, nahm",
      "meaning": "deep, said, seven, took",
      "explanation": "Four shift families in one round — the decode engine at full speed."
    },
    {
      "id": "l3003_e2",
      "type": "shift_select",
      "prompt": "Grammar gauntlet: 'Ich weiß, dass er mir das Buch _____.' (geben — present tense, er-form!):",
      "options": [
        "gegeben hat",
        "geben",
        "gab",
        "gibt"
      ],
      "target_answer": "gibt",
      "meaning": "...dass er mir das Buch gibt",
      "explanation": "The dass-basement with a mutating verb: er gibt lands at the end, vowel mutated, dative mir inside."
    },
    {
      "id": "l3003_e3",
      "type": "shift_select",
      "prompt": "Culture round: 'Donnerstag, Mittwoch, Sonntag' — what system are these from?",
      "options": [
        "The Germanic god-calendar, calqued from the Latin planetary week",
        "The Greek Olympics",
        "Random German names",
        "The French revolutionary calendar"
      ],
      "target_answer": "The Germanic god-calendar, calqued from the Latin planetary week",
      "meaning": "Thunder-day, mid-week, sun-day",
      "explanation": "One pantheon, two calendars — and you know the story of every single day."
    },
    {
      "id": "l3003_e4",
      "type": "reverse_cognate",
      "prompt": "Final reverse: 'gestern' — which English word, one last time?",
      "target_answer": "yesterday",
      "meaning": "yesterday ↔ gestern (y→g)",
      "explanation": "The trail's first lesson taught free will; this one ends with the y→g twins — the whole bridge in one word pair."
    },
    {
      "id": "l3003_e5",
      "type": "syntax_builder",
      "prompt": "The graduation sentence: 'Yesterday we gave the child a big present'",
      "target_answer": "Gestern haben wir dem Kind ein großes Geschenk gegeben",
      "meaning": "Yesterday we gave the child a big present",
      "vocab_hints": [
        {
          "word": "dem",
          "translation": "the (dative — the receiver)",
          "note": "das Kind → dem Kind: the receiver takes dative"
        },
        {
          "word": "großes",
          "translation": "big (neuter accusative adjective)",
          "note": "ein großes Geschenk — the adjective waves the neuter flag"
        }
      ],
      "word_bank": [
        "dem",
        "haben",
        "ein",
        "Gestern",
        "mit",
        "nicht",
        "Geschenk",
        "großes",
        "wir",
        "gegeben",
        "Kind"
      ],
      "explanation": "V2, Perfekt bracket, dative receiver, accusative gift, adjective ending, the geben dynasty — the whole trail in one sentence. Willkommen auf der anderen Seite der Brücke."
    }
  ],
  "summary": {
    "outcome": "Pass the whole-trail synthesis: shifts, grammar, verbs, words, production.",
    "use_example": {
      "german": "Gestern haben wir dem Kind ein großes Geschenk gegeben.",
      "english": "Yesterday we gave the child a big present."
    },
    "takeaway": "The trail is behind you: every shift, every case, every bracket — and the Review Hub keeps it warm.",
    "curiosity_teaser": "You crossed the bridge. The Atlas, the Review Hub, and every hollow shell you skipped are waiting — but nothing here is locked anymore."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from The Whole-Trail Review Game (Yesterday we gave the child a big present):",
    "target_answer": "Gestern haben wir dem Kind ein großes Geschenk gegeben",
    "word_bank": [
      "Geschenk",
      "ein",
      "gegeben",
      "nicht",
      "Kind",
      "heute",
      "großes",
      "dem",
      "wir",
      "haben",
      "Gestern"
    ],
    "explanation": "Re-assembling \"Gestern haben wir dem Kind ein großes Geschenk gegeben\" from scratch locks in the structural pattern of The Whole-Trail Review Game without relying on short-term echo."
  }
};

export default lesson;
