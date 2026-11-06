import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5021,
  "slug": "gift-rat-and-co",
  "title": "Gift, Rat & Co.",
  "subtitle": "The six highest-value false friends — contrastive recall drills",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "gift",
    "bekommen",
    "chef",
    "rat",
    "fast",
    "bald",
    "herr",
    "fabrik",
    "gymnasium",
    "rente",
    "dom",
    "art",
    "kaution",
    "eventuell"
  ],
  "table_word_ids": [
    "gift",
    "bekommen",
    "chef",
    "rat",
    "fast",
    "bald",
    "herr",
    "fabrik",
    "gymnasium",
    "rente",
    "dom",
    "art",
    "kaution",
    "eventuell",
    "patient"
  ],
  "hook": {
    "title": "The Six Most Dangerous Words",
    "content": "The full trap deck waits in the Review Hub, but six traps deserve early warning. das Gift = POISON (present: das Geschenk — and Gift really is gift's twin: both meant 'a giving', German kept the dose). bekommen = GET (become = werden). der Chef = BOSS (cook = der Koch). der Rat = ADVICE (rodent = die Ratte). fast = ALMOST (quick = schnell). bald = SOON (hairless = kahl). Each one is a true cognate that drifted — which is why the traps feel so natural. Drill the antidotes until the trap fires the correction automatically.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Rat and Read Are Twins",
        "content": "der Rat (advice) and English 'read' are the same ancient verb — *rēdanō, 'to advise, to interpret'. A counselor was a reader of situations. So der Rat is not just a trap: it is a hidden cognate pair (Rat/read) wearing a false-friend costume (Rat/rat)."
      }
    ]
  },
  "pattern": {
    "title": "The Antidote Table",
    "content": "Poison → das Gift; present → das Geschenk. Get → bekommen; become → werden. Boss → der Chef; cook → der Koch. Advice → der Rat; rodent → die Ratte. Almost → fast; quick → schnell. Soon → bald; hairless → kahl. The memory trick is the drift story: Gift once meant any administered dose (a gift can kill); bekommen is 'come by' (packages come by); bald was 'boldly soon' (*balþaz, kin to bold). Know the story and the trap disarms itself.",
    "footnotes": [],
    "linguist_note": "False friends cluster in high-frequency function words precisely because those words had time to drift. The rare words stayed put. Guard the small words hardest."
  },
  "exercises": [
    {
      "id": "l5021_e1",
      "type": "shift_select",
      "prompt": "'Vorsicht, das ist Gift!' — what is the warning about?",
      "options": [
        "A rat",
        "A present",
        "A boss",
        "Poison"
      ],
      "target_answer": "Poison",
      "meaning": "das Gift = poison",
      "explanation": "Vorsicht (caution!) + Gift = the poison warning. The present is das Geschenk."
    },
    {
      "id": "l5021_e2",
      "type": "shift_select",
      "prompt": "'Der Chef sagt: bald!' — what did the boss communicate?",
      "options": [
        "Soon! (get it done soon)",
        "A rat is coming",
        "Almost!",
        "I am becoming the boss"
      ],
      "target_answer": "Soon! (get it done soon)",
      "meaning": "der Chef (boss) + bald (soon)",
      "explanation": "Two traps in one sentence: the boss (not cook) wants it soon (not hairless)."
    },
    {
      "id": "l5021_e3",
      "type": "matching_pairs",
      "prompt": "Match each trap with its true meaning — and its antidote:",
      "matching_pairs": [
        {
          "id": "gr1",
          "english": "to get (NOT to become)",
          "german": "bekommen"
        },
        {
          "id": "gr2",
          "english": "advice (NOT the rodent)",
          "german": "der Rat"
        },
        {
          "id": "gr3",
          "english": "almost (NOT quick)",
          "german": "fast"
        },
        {
          "id": "gr4",
          "english": "boss (NOT the cook)",
          "german": "der Chef"
        },
        {
          "id": "gr5",
          "english": "factory (NOT cloth)",
          "german": "die Fabrik"
        },
        {
          "id": "gr6",
          "english": "grammar-school (NOT the gym)",
          "german": "das Gymnasium"
        },
        {
          "id": "gr7",
          "english": "pension (NOT rent)",
          "german": "die Rente"
        },
        {
          "id": "gr8",
          "english": "cathedral (NOT a dome)",
          "german": "der Dom"
        }
      ],
      "target_answer": "bekommen, der Rat, fast, der Chef, die Fabrik, das Gymnasium, die Rente, der Dom",
      "meaning": "get, advice, almost, boss, factory, grammar-school, pension, cathedral",
      "explanation": "Eight traps, each wearing an English look-alike. The first four come with antidotes: bekommen is get (werden is become), der Rat is advice (die Ratte is the rodent), fast is almost (schnell is quick), der Chef is boss (der Koch is the cook). The last four have look-alikes too — fabric, gym, rent, dome — but die Fabrik is a factory, das Gymnasium a grammar school, die Rente a pension and der Dom a cathedral."
    },
    {
      "id": "l5021_e4",
      "type": "reverse_cognate",
      "prompt": "Which everyday English verb is the HIDDEN twin of 'der Rat' (via *rēdanō, to advise)?",
      "target_answer": "read",
      "meaning": "read ↔ Rat (to advise/interpret)",
      "explanation": "The counselor read the situation: Rat and read are one verb. The trap is a cognate in disguise. And eventuell means possibly, not eventually — that one is schließlich."
    },
    {
      "id": "l5021_e5",
      "type": "syntax_builder",
      "prompt": "Assemble the safe sentence: 'I am getting advice from the boss'",
      "target_answer": "Ich bekomme Rat vom Chef",
      "meaning": "I am getting advice from the boss",
      "vocab_hints": [
        {
          "word": "vom",
          "translation": "from the (von + dem)",
          "note": "vom = von + dem — the dative contraction"
        },
        {
          "word": "Herr",
          "translation": "Mister",
          "note": "the honorific that fronts a surname — Herr Chef, or Herr Braun when no job title fits"
        },
        {
          "word": "die Art",
          "translation": "the kind / type",
          "note": "die Art = KIND, not art — art is die Kunst"
        }
      ],
      "word_bank": [
        "Ich",
        "sie",
        "Chef",
        "Rat",
        "vom",
        "bekomme",
        "eine"
      ],
      "explanation": "All three traps used CORRECTLY: bekomme (get), Rat (advice), Chef (boss) — the minefield, disarmed. The hints carry two more small ones: die Art is the kind (art is die Kunst), and Herr is the Mister in front of a surname."
    }
  ],
  "summary": {
    "outcome": "Recall the six highest-value traps and their antidotes on sight.",
    "use_example": {
      "german": "Ich bekomme Rat vom Chef.",
      "english": "I am getting advice from the boss."
    },
    "takeaway": "Gift=poison (Geschenk=present), bekommen=get, Chef=boss, Rat=advice, fast=almost, bald=soon — drill the antidotes.",
    "curiosity_teaser": "Next: ü, ö, ä — the three mouth positions English never taught you."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Gift, Rat & Co. (I am getting advice from the boss):",
    "target_answer": "Ich bekomme Rat vom Chef",
    "word_bank": [
      "Chef",
      "heute",
      "nicht",
      "Ich",
      "Rat",
      "bekomme",
      "vom"
    ],
    "explanation": "Re-assembling \"Ich bekomme Rat vom Chef\" from scratch locks in the structural pattern of Gift, Rat & Co. without relying on short-term echo."
  }
};

export default lesson;
