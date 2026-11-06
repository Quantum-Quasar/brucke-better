import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 902,
  "slug": "sprig-902",
  "title": "The vous Register",
  "subtitle": "When vous is required; vous voulez vs tu veux and the universal -ez ending.",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "vous",
    "tu",
    "voulez",
    "êtes",
    "avez",
    "allez",
    "parler",
    "français"
  ],
  "table_word_ids": [
    "vous",
    "tu",
    "voulez",
    "êtes",
    "avez",
    "allez",
    "parler",
    "français"
  ],
  "hook": {
    "title": "Switching Gears Between tu and vous in the Same Room",
    "content": "Flip between informal tu (-es/-s/-x) for a friend and polite/plural vous (-ez / êtes) for a stranger or any group of two or more people!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why vous is also the plural of tu",
        "content": "Addressing two or more friends at once always uses plural vous (tu + tu = vous)!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "The Instant Switch: tu (-s/-x) ↔ vous (-ez)",
    "content": "Flip sentences between tu parles ↔ vous parlez, tu veux ↔ vous voulez, tu as ↔ vous avez, tu vas ↔ vous allez, tu es ↔ vous êtes.",
    "linguist_note": "Second-person plural -ez (/e/) is the most regular inflectional suffix in the French verbal system.",
    "trap_note": "Don't mix tu with -ez (*tu parlez) or vous with -s (*vous parles)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each informal tu question with its polite/plural vous twin:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Tu parles français ?",
          "german": "Vous parlez français ?"
        },
        {
          "id": "p2",
          "english": "Tu veux partir ?",
          "german": "Vous voulez partir ?"
        },
        {
          "id": "p3",
          "english": "Tu as le billet ?",
          "german": "Vous avez le billet ?"
        },
        {
          "id": "p4",
          "english": "Tu vas à Paris ?",
          "german": "Vous allez à Paris ?"
        },
        {
          "id": "p5",
          "english": "Tu es ici ?",
          "german": "Vous êtes ici ?"
        }
      ],
      "target_answer": "Vous parlez français ?, Vous voulez partir ?, Vous avez le billet ?, Vous allez à Paris ?, Vous êtes ici ?",
      "meaning": "Tu parles français ?, Tu veux partir ?, Tu as le billet ?, Tu vas à Paris ?, Tu es ici ?",
      "explanation": "Four out of five simply end in -ez (/e/) with vous; only être uses êtes.",
      "id": "fr902_e1"
    },
    {
      "type": "shift_select",
      "prompt": "You are talking to two close friends at once. Which pronoun and verb do you use for 'Are you two going to the cinema?'",
      "options": [
        "Vous vas au cinéma",
        "Tu vas au cinéma",
        "Vous allez au cinéma"
      ],
      "target_answer": "Vous allez au cinéma",
      "meaning": "Are you (plural) going to the cinema?",
      "explanation": "Addressing two or more people always uses plural vous!",
      "id": "fr902_e2"
    },
    {
      "type": "derive",
      "prompt": "Convert from informal 'Tu parles anglais' to polite/plural vous:",
      "english_hint": "tu → vous, parles → parlez",
      "target_answer": "Vous parlez anglais",
      "meaning": "You speak English (polite/plural)",
      "explanation": "parles (/paʁl/) adds the /e/ sound in vous parlez (/vu paʁle/).",
      "id": "fr902_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "do you speak French or English (polite vous)",
      "cues": [
        "You speak French → Vous parlez français",
        "or English → ou anglais"
      ],
      "idea_parts": [
        "polite subject + verb → Vous parlez",
        "languages → français ou anglais"
      ],
      "target_answer": "Vous parlez français ou anglais",
      "meaning": "Do you speak French or English?",
      "word_bank": [
        "ou",
        "français",
        "parlez",
        "anglais",
        "où",
        "Vous",
        "parles"
      ],
      "explanation": "ou ('or') has no accent, whereas où ('where') has a grave accent!",
      "diagnosis": {
        "slip": "used où with an accent for 'or'",
        "cue": "ou without an accent means 'or'."
      },
      "id": "fr902_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Vous voulez aller au restaurant avec nous",
      "replays": 2,
      "target_answer": "Vous voulez aller au restaurant avec nous",
      "meaning": "Do you want to go to the restaurant with us?",
      "cues": [
        "Vous voulez aller",
        "au restaurant avec nous"
      ],
      "explanation": "voulez (-ez) pulls the bare infinitive aller (-er).",
      "affirmation": "You paired Vous voulez with aller and avec nous.",
      "id": "fr902_e5"
    }
  ],
  "summary": {
    "outcome": "Switch effortlessly between informal tu and polite/plural vous across regular and core verbs.",
    "use_example": {
      "german": "Tu viens ? — Oui ! Et vous, vous venez avec nous ?",
      "english": "Are you coming? — Yes! And you all, are you coming with us?"
    },
    "takeaway": "One friend is tu; one stranger is vous; two of anybody is vous.",
    "curiosity_teaser": "Up next on Le Pont ([10] avoir & the H It Lost): see how The vous Register leads directly into avoir & the H It Lost."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"Do you speak French or English\" in French:",
    "target_answer": "Vous parlez français ou anglais",
    "word_bank": [
      "pas",
      "ne",
      "Vous",
      "ou",
      "français",
      "anglais",
      "parlez"
    ],
    "explanation": "Re-constructing \"Vous parlez français ou anglais\" from the underlying rule cements the pattern of The vous Register."
  }
};

export default lesson;
