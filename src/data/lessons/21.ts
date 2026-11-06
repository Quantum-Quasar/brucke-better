import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 21,
  "slug": "compound-noun-engineering",
  "title": "Compound Noun Engineering",
  "subtitle": "Handschuh = hand-shoe. German builds words like Lego — and English does too.",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "haus",
    "wasser",
    "buch",
    "wort",
    "zeit",
    "mann",
    "frau",
    "kind",
    "zahnarzt",
    "hauptstadt",
    "glück",
    "mut",
    "wunsch",
    "schmecken"
  ],
  "table_word_ids": [
    "haus",
    "wasser",
    "buch",
    "mann",
    "frau",
    "kind",
    "wort",
    "zeit",
    "zahnarzt",
    "hauptstadt",
    "glück",
    "mut",
    "wunsch",
    "schmecken",
    "witwe",
    "raum"
  ],
  "hook": {
    "title": "The Lego Grammar",
    "content": "German has a reputation for impossible long words. It has actually just refused to forget how English words used to be built. Handschuh is hand-shoe (a glove). Zahnarzt is tooth-doctor (a dentist). Krankenhaus is sick-people-house (a hospital). English once built exactly the same way — and still does, half asleep: cup-board became cupboard, break-fast became breakfast. The difference: German writes its Lego without dropping pieces. When you meet a German monster word, you do not translate it. You take it apart.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Head Word Wears the Pants",
        "content": "The LAST piece of a compound runs the show — its gender, its plural, its meaning core. das Haus → das Krankenhaus (neuter). der Zug → der Aufzug (masculine). Learn the last piece and you own the whole word."
      }
    ]
  },
  "pattern": {
    "title": "Split, Read, Predict",
    "content": "Splitting: Handschuh = Hand + Schuh. Feuerzeug = Feuer + Zeug ('fire-stuff' — a lighter). Fernseher = fern + Seher ('far-seer' — a television). Staubsauger = Staub + Sauger ('dust-sucker' — a vacuum cleaner). Reading rule: split at the last plausible noun, then ask what a 'X-Y' would literally be. Gender rule: der Apfel + der Kuchen = der Apfelkuchen — the head (Kuchen) donates the article. Your own vocabulary compounds for free: Haus + Tür? Tür is taught — Haustür, the front door, literally house-door.",
    "footnotes": [],
    "trap_note": "Your mind will offer: “a compound's gender is a new thing to learn.” It is not. The LAST word is the head and it donates its gender to the whole compound: das Krankenhaus, because Haus is das. Never memorise a compound's article — read the tail.",
    "linguist_note": "English and German both inherited compounding from Proto-Germanic; English then wore its compounds smooth (lord ← hlāf-weard, 'loaf-ward' — the bread-keeper!). German's transparent writing system is the conservative option, not the strange one."
  },
  "exercises": [
    {
      "id": "l21_e1",
      "type": "shift_select",
      "prompt": "Compound gender rule: der Apfel + der Kuchen = ?",
      "options": [
        "die Apfelkuchen — food is feminine",
        "der Apfelkuchen — the last noun donates the gender",
        "das Apfelkuchen — compounds are neuter",
        "no article — compounds reject articles"
      ],
      "target_answer": "der Apfelkuchen — the last noun donates the gender",
      "meaning": "The head word rules",
      "explanation": "The final piece is the grammatical head: its article, its plural, its meaning core. das Haus → das Krankenhaus."
    },
    {
      "id": "l21_e2",
      "type": "reverse_cognate",
      "prompt": "Split it: 'Handschuh' is literally 'hand-shoe' — what is the real word in English?",
      "target_answer": "glove",
      "meaning": "Handschuh = glove (hand-shoe)",
      "explanation": "German describes the function; English kept a Norse word. Both languages agree a glove is footwear for your hand. And when the compound cake schmeckt — taste ↔ schmecken, smack's cousin — the compound rule still holds: der Kuchen donates the gender."
    },
    {
      "id": "l21_e3",
      "type": "matching_pairs",
      "prompt": "Match each transparent compound with its literal reading:",
      "matching_pairs": [
        {
          "id": "cn1",
          "english": "tooth-doctor",
          "german": "der Zahnarzt"
        },
        {
          "id": "cn2",
          "english": "fire-stuff",
          "german": "das Feuerzeug"
        },
        {
          "id": "cn3",
          "english": "dust-sucker",
          "german": "der Staubsauger"
        },
        {
          "id": "cn4",
          "english": "far-seer",
          "german": "der Fernseher"
        },
        {
          "id": "cn5",
          "english": "head-city",
          "german": "die Hauptstadt"
        }
      ],
      "target_answer": "der Zahnarzt, das Feuerzeug, der Staubsauger, der Fernseher, die Hauptstadt",
      "meaning": "dentist, lighter, vacuum cleaner, television, capital (city)",
      "explanation": "German calqued the Greek/Latin science words from native parts — read the parts and the meaning is free. The head word donates the gender: Arzt → der, Stadt → die."
    },
    {
      "id": "l21_e4",
      "type": "morpheme_tiles",
      "prompt": "Build the dentist from Lego parts (tooth + doctor):",
      "tile_options": [
        "arzt",
        "Zahn",
        "schuh",
        "haus",
        "zeug"
      ],
      "target_answer": "Zahnarzt",
      "meaning": "dentist (tooth-doctor)",
      "explanation": "Zahn + Arzt = Zahnarzt. Same factory: Augenarzt (eye-doctor), Tierarzt (animal-doctor). And the compound feelings ride the same shelf: der Mut (mood's twin), der Wunsch, das Glück — luck, the one English borrowed back."
    },
    {
      "id": "l21_e5",
      "type": "transcribe",
      "prompt": "Put into German:",
      "idea": "you're introducing your neighbors to a friend: the man and the woman have a child",
      "cues": [
        "Flags first: der Mann, die Frau — then the plural verb joins them: haben ein Kind"
      ],
      "target_answer": "Der Mann und die Frau haben ein Kind",
      "meaning": "The man and the woman have a child",
      "word_bank": [
        "ein",
        "und",
        "Frau",
        "Kind",
        "haben",
        "die",
        "Der",
        "Mann",
        "hat"
      ],
      "explanation": "Two subjects, plural verb, ein Kind — the family trio with their flags: der, die, das."
    }
  ],
  "summary": {
    "outcome": "Split compounds, read them literally, and predict gender from the head noun.",
    "use_example": {
      "german": "Der Mann und die Frau haben ein Kind.",
      "english": "The man and the woman have a child."
    },
    "takeaway": "Compounds are Lego: split at the last noun, read literally, and let the head word donate the gender.",
    "curiosity_teaser": "Next: the 32 Calques Deep-Dive — the curated compound gallery from Kühlschrank to Backpfeife."
  },
  "twist": {
    "prompt": "Hearing check — negate the noun: they have a child becomes they have NO child. (kein, declined like ein.)",
    "target_answer": "Sie haben kein Kind",
    "word_bank": [
      "haben",
      "nicht",
      "Sie",
      "Kind",
      "kein"
    ],
    "explanation": "Kind is neuter, so kein stays bare: kein Kind. nicht is for verbs — the noun loses its 'one' instead. And the plural verb tells you Sie is 'they', not the formal 'you'."
  }
};

export default lesson;
