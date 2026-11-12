import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2102,
  "slug": "compound-builder-workshop",
  "title": "Compound Builder Workshop",
  "subtitle": "Assemble compounds from taught nouns — and predict gender from the head",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "zahn",
    "donner",
    "tag",
    "buch",
    "haus",
    "apfel",
    "kind",
    "garten",
    "wasser",
    "glas",
    "geburtstag",
    "feiern",
    "zahnarzt",
    "hauptstadt",
    "fußball",
    "regenbogen",
    "heimweh"
  ],
  "table_word_ids": [
    "zahn",
    "donner",
    "tag",
    "apfel",
    "kind",
    "garten",
    "buch",
    "haus",
    "wasser",
    "glas",
    "geburtstag",
    "feiern",
    "zahnarzt",
    "hauptstadt",
    "fußball",
    "regenbogen",
    "heimweh"
  ],
  "hook": {
    "title": "You Are the Factory Now",
    "content": "You have split compounds; today you build them. The parts are all on your bench: Zahn, Donner, Tag, Apfel, Buch, Haus, Kind, Garten. The rules are two: glue the nouns in meaning order (the modifier first, the head last), and let the head word donate the gender. Zahn + Arzt = der Zahnarzt. Donner + Tag = der Donnerstag. Apfel + Kuchen (a hint-word) = der Apfelkuchen. Build wrong and German speakers will still understand you — compounding is productive grammar, not fixed vocabulary — but the head-word law keeps your articles honest.",
    "footnotes": [
      {
        "marker": "1",
        "title": "German Lets You Coin",
        "content": "Compound building is live grammar: a German can invent an absurdly long machine name and be understood. English does this too ('toothbrush holder') — German just never stopped showing the seams in writing."
      }
    ]
  },
  "pattern": {
    "title": "Build, Then Predict",
    "content": "Build: Kind + Garten = der Kindergarten (the head Garten donates der — and English borrowed it whole). Donner + Tag = der Donnerstag. Zahn + Arzt = der Zahnarzt. Haus + Tür = die Haustür (die Tür is the head — the door, not the house). Wasser + Glas = das Wasserglas (a glass of water as an object). Reverse-engineer: die Eisenbahn splits Eisen (iron) + Bahn (track) — der/die/das is your split hint. Then the workshop trick: if you know the head, you know the article before you know the compound.",
    "footnotes": [],
    "linguist_note": "Sometimes a linking -s- or -e- sneaks in between the parts. The glue is historical spelling, not grammar — learn compounds whole once they are coined."
  },
  "exercises": [
    {
      "id": "l2102_e1",
      "type": "morpheme_tiles",
      "prompt": "Build the birthday (birth + day):",
      "tile_options": [
        "Geburts",
        "haus",
        "donner",
        "zeit",
        "tag"
      ],
      "target_answer": "Geburtstag",
      "meaning": "der Geburtstag — the birthday",
      "vocab_hints": [
        {
          "word": "Geburt",
          "translation": "birth",
          "note": "birth-day takes der Tag's article — the day is the head"
        }
      ],
      "explanation": "Geburt + Tag = der Geburtstag — the head word Tag donates the masculine article. Then feiern carries the party: Wir feiern den Geburtstag. Zahnarzt built the same way last lesson."
    },
    {
      "id": "l2102_e2",
      "type": "shift_select",
      "prompt": "You coin 'Buchhaus' (a house of books). Which article?",
      "options": [
        "das — Haus is the head word",
        "no article",
        "der — books are masculine",
        "die — plural head"
      ],
      "target_answer": "das — Haus is the head word",
      "meaning": "das Buchhaus — the head donates the gender",
      "explanation": "Modifier first, head last: Haus runs the grammar, so das Buchhaus. Hauptstadt works the same way (die Stadt is the head), and Heimweh weaves a feeling: Heim + Weh, home-woe."
    },
    {
      "id": "l2102_e3",
      "type": "matching_pairs",
      "prompt": "Match the built compound with its English meaning. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "cw1",
          "english": "thunder-day",
          "german": "der Donnerstag"
        },
        {
          "id": "cw2",
          "english": "tooth-doctor",
          "german": "der Zahnarzt"
        },
        {
          "id": "cw3",
          "english": "apple-cake",
          "german": "der Apfelkuchen"
        },
        {
          "id": "cw4",
          "english": "children-garden",
          "german": "der Kindergarten"
        },
        {
          "id": "cw5",
          "english": "foot-ball (the game)",
          "german": "der Fußball"
        },
        {
          "id": "cw6",
          "english": "rain-bow",
          "german": "der Regenbogen"
        },
        {
          "id": "recall1",
          "german": "Wir können schmecken",
          "english": "We can taste"
        },
        {
          "id": "recall2",
          "german": "das Heimweh",
          "english": "homesickness"
        },
        {
          "id": "recall3",
          "german": "der Zahn",
          "english": "the tooth"
        },
        {
          "id": "recall4",
          "german": "Wir können feiern",
          "english": "We can celebrate"
        },
        {
          "id": "spaced1",
          "german": "mein Zahnarzt in der Hauptstadt",
          "english": "my dentist in the capital city"
        },
        {
          "id": "spaced2",
          "german": "Ich sehe einen Regenbogen",
          "english": "I see a rainbow"
        }
      ],
      "target_answer": "der Donnerstag, der Zahnarzt, der Apfelkuchen, der Kindergarten, der Fußball, der Regenbogen, Wir können schmecken, das Heimweh, der Zahn, Wir können feiern, mein Zahnarzt in der Hauptstadt, Ich sehe einen Regenbogen",
      "meaning": "thunder-day; tooth-doctor; apple-cake; children-garden; foot-ball (the game); rain-bow; We can taste; homesickness; the tooth; We can celebrate; my dentist in the capital city; I see a rainbow",
      "explanation": "All six end in masculine heads — Tag, Arzt, Kuchen, Garten, Ball, Bogen — so all six wear der."
    },
    {
      "id": "l2102_e4",
      "type": "shift_select",
      "prompt": "Split it: 'die Haustür' — what is the head word?",
      "options": [
        "das Haus — houses dominate",
        "die Tür (the door) — so it is die Haustür",
        "Neither — it is a loan",
        "Both equally"
      ],
      "target_answer": "die Tür (the door) — so it is die Haustür",
      "meaning": "die Haustür = the front door (house-door)",
      "explanation": "The door is the thing being named; the house only says which one. Head word = die Tür → die Haustür."
    },
    {
      "id": "l2102_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'The birthday is on Friday'",
      "target_answer": "Der Geburtstag ist am Freitag",
      "meaning": "The birthday is on Friday",
      "vocab_hints": [
        {
          "word": "am",
          "translation": "on the (time)",
          "note": "am = an + dem — the dative of time"
        }
      ],
      "word_bank": [
        "die",
        "ist",
        "Der",
        "Freitag",
        "am",
        "sind",
        "Geburtstag"
      ],
      "explanation": "Compound subject (der Geburtstag — Tag's article), dative of time (am Freitag), verb glued at 2."
    }
  ],
  "summary": {
    "outcome": "Coin compounds from taught nouns and predict their articles via the head word.",
    "use_example": {
      "german": "Der Geburtstag ist am Freitag.",
      "english": "The birthday is on Friday."
    },
    "takeaway": "Modifier first, head last — and the head word donates gender, plural, and meaning core.",
    "curiosity_teaser": "Next: reading compounds in the wild — six-word monsters, split into meaning."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Compound Builder Workshop (The birthday is on Friday):",
    "target_answer": "Der Geburtstag ist am Freitag",
    "word_bank": [
      "ist",
      "heute",
      "am",
      "nicht",
      "Geburtstag",
      "Der",
      "Freitag"
    ],
    "explanation": "Re-assembling \"Der Geburtstag ist am Freitag\" from scratch locks in the structural pattern of Compound Builder Workshop without relying on short-term echo."
  }
};

export default lesson;
