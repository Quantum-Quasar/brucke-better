import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 3002,
  "slug": "trap-watch-false-friends",
  "title": "Trap Watch: False Friends in the Wild",
  "subtitle": "The sixteen curated traps, embedded in context sentences",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "gift",
    "bekommen",
    "chef",
    "handy",
    "aktuell",
    "rat",
    "brav",
    "fast",
    "bald",
    "übel"
  ],
  "table_word_ids": [
    "gift",
    "bekommen",
    "chef",
    "rat",
    "fast",
    "bald",
    "handy",
    "aktuell",
    "brav",
    "übel",
    "melone",
    "still",
    "bluten",
    "tablette",
    "brezel"
  ],
  "hook": {
    "title": "The Minefield, Mapped",
    "content": "The compendium keeps sixteen false friends — words that look like English and mean something else. Now that you can read German, they are the last real danger, because your guard is down. das Gift is poison (the present is das Geschenk). bekommen is GET (become is werden). der Chef is the BOSS (the cook is der Koch). fast means ALMOST (quick is schnell). bald means SOON (hairless is kahl). der Rat is ADVICE (the rodent is die Ratte). Sixteen traps, sixteen context sentences, zero excuses after today.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Why False Friends Happen",
        "content": "Sibling languages drift: Gift and gift both descend from 'a giving' — English kept the friendly branch, German the deadly dose (a 'gift' was once a dose of anything, including poison). False friends are true cognates with divergent stories — the drift is the history."
      }
    ]
  },
  "pattern": {
    "title": "The Trap Walk",
    "content": " das Handy is the MOBILE PHONE (a German 1990s coinage — 'the handy thing in your hand'). aktuell means CURRENT (actual is tatsächlich). brav means WELL-BEHAVED (brave is mutig). die Fabrik is the FACTORY (fabric is der Stoff). das Gymnasium is the ACADEMIC HIGH SCHOOL (the gym is die Turnhalle). die Rente is the PENSION (apartment rent is die Miete). der Dom is the CATHEDRAL (a dome is die Kuppel). die Art is KIND/TYPE (art is die Kunst). eventuell means POSSIBLY (eventually is schließlich). die Kaution is the SECURITY DEPOSIT (caution is die Vorsicht). Read each in a sentence, feel the bite, remember the antidote.",
    "footnotes": [],
    "linguist_note": "bekommen vs become is the deepest trap: both are be + come, but English drifted the compound to 'turn into' while German kept 'come by, receive'. The word histories are identical — only the journeys differ."
  },
  "exercises": [
    {
      "id": "l3002_e1",
      "type": "shift_select",
      "prompt": "Trap one: 'Ich bekomme ein Paket.' What happens?",
      "options": [
        "I buy a package",
        "I GET a package",
        "I become a package",
        "I return a package"
      ],
      "target_answer": "I GET a package",
      "meaning": "bekommen = to get/receive",
      "explanation": "The most famous trap in German: bekommen means receive. Becoming something is werden. And if the package were poison, you would say Mir ist übel — it goes badly with me."
    },
    {
      "id": "l3002_e2",
      "type": "shift_select",
      "prompt": "Trap two: 'Das Kind ist heute brav.' What did the child do?",
      "options": [
        "Was brave and fearless",
        "Got a gift",
        "Was well-behaved",
        "Ran fast"
      ],
      "target_answer": "Was well-behaved",
      "meaning": "brav = well-behaved, not brave",
      "explanation": "brav means obedient/good — the fearless child is mutig. A braves Kind is every parent's dream, no courage required."
    },
    {
      "id": "l3002_e3",
      "type": "shift_select",
      "prompt": "Trap three: 'Ich bin fast fertig.' How far along are you?",
      "options": [
        "Completely done",
        "Not done at all",
        "Quickly done",
        "ALMOST done — fast means nearly"
      ],
      "target_answer": "ALMOST done — fast means nearly",
      "meaning": "fast = almost (quick is schnell)",
      "explanation": "fast da = almost there. Speed is schnell — another shift-family word you already own."
    },
    {
      "id": "l3002_e4",
      "type": "shift_select",
      "prompt": "Trap four: 'Bis bald!' What are you promising?",
      "options": [
        "See you SOON — bald means soon",
        "See you hairless",
        "See you eventually (maybe)",
        "See you at the cathedral"
      ],
      "target_answer": "See you SOON — bald means soon",
      "meaning": "bald = soon",
      "explanation": "Bis bald = until soon. The hairless word is kahl. And eventuell means 'possibly' — eventually is schließlich."
    },
    {
      "id": "l3002_e5",
      "type": "dictation",
      "prompt": "Listen and write the German sentence you hear:",
      "target_answer": "Ich bekomme ein Geschenk für das Kind",
      "meaning": "I am getting a present for the child",
      "vocab_hints": [
        {
          "word": "für",
          "translation": "for",
          "note": "governs the accusative — für das Kind (kind = das Kind here, the child)"
        },
        {
          "word": "das Geschenk",
          "translation": "the present",
          "note": "the SAFE gift — das Gift is poison!"
        }
      ],
      "word_bank": [
        "wenn",
        "Geschenk",
        "Kind",
        "ein",
        "das",
        "Ich",
        "bekomme",
        "für",
        "sie"
      ],
      "explanation": "Two traps dodged in one sentence: bekomme (get, not become) and Geschenk (present, not poison).",
      "spoken": "Ich bekomme ein Geschenk für das Kind",
      "replays": 3,
      "cues": [
        "Meaning: \"I am getting a present for the child\"",
        "Opens with \"Ich bekomme\" and ends with \"Kind\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Identify all sixteen false friends in context and reach for the antidotes.",
    "use_example": {
      "german": "Ich bekomme ein Geschenk.",
      "english": "I am getting a present (not becoming one — and not a poison!)."
    },
    "takeaway": "False friends are true cognates with divergent stories — Gift/Gift, bekommen/become: know the drift, dodge the trap.",
    "curiosity_teaser": "Next: the Whole-Trail Review Game — thirty topics, mixed modes, one last sprint."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Trap Watch: False Friends in the Wild (I am getting a present for the child):",
    "target_answer": "Ich bekomme ein Geschenk für das Kind",
    "word_bank": [
      "für",
      "nicht",
      "das",
      "Ich",
      "Geschenk",
      "ein",
      "bekomme",
      "Kind",
      "heute"
    ],
    "explanation": "Re-assembling \"Ich bekomme ein Geschenk für das Kind\" from scratch locks in the structural pattern of Trap Watch: False Friends in the Wild without relying on short-term echo."
  }
};

export default lesson;
