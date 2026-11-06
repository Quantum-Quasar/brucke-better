import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5011,
  "slug": "bonjour-merci",
  "title": "Bonjour & Merci",
  "subtitle": "Greetings, thanks, and ça va — the politeness set in dialogue",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "bonjour",
    "merci",
    "oui",
    "sil_vous_plait",
    "vous",
    "tu"
  ],
  "table_word_ids": [
    "bonjour",
    "merci",
    "sil_vous_plait",
    "vous",
    "oui",
    "tu"
  ],
  "hook": {
    "title": "Words You Must Never Convert",
    "content": "Bonjour is not 'good journey' and merci is not 'merchant's fee' in this context — some words you simply take as whole items. Bonjour (good day), merci (thanks — mercy's coin), oui (yes), s'il vous plaît (if it pleases you). These are the handshake of the language: small, fixed, and everywhere.",
    "footnotes": [
      {
        "marker": "1",
        "title": "merci and mercy",
        "content": "Latin mercēs 'wages, reward' gave French merci and English mercy. Thanking someone is acknowledging what you owe — the coin is the same in both languages.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "ça va — the Conversation That Answers Itself",
    "content": "Ça va ? — 'it goes?' — is the everyday how-are-you. The answer is the same two words: ça va. Greeting culture also has the bise (cheek kisses, count varies by region) and the tu/vous decision — vous for strangers and formality, tu for friends. When in doubt: vous. Nobody was ever fired for vous.",
    "footnotes": [
      {
        "marker": "2",
        "title": "The T–V line",
        "content": "tu/vous is the same politeness ladder as German du/Sie and English's lost thou/ye. French kept the ladder standing; English knocked its own down.",
        "interest": true
      }
    ],
    "trap_note": "Don't over-convert: bonjour is one word, not 'bon jour' to be rebuilt. Idioms are items, not formulas."
  },
  "exercises": [
    {
      "id": "fr5011_e1",
      "type": "matching_pairs",
      "prompt": "Match each politeness formula with its use:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "hello / good day",
          "german": "Bonjour"
        },
        {
          "id": "p2",
          "english": "thank you",
          "german": "Merci"
        },
        {
          "id": "p3",
          "english": "please (formal)",
          "german": "S'il vous plaît"
        },
        {
          "id": "p4",
          "english": "yes",
          "german": "Oui"
        },
        {
          "id": "p5",
          "english": "how's it going?",
          "german": "Ça va ?"
        }
      ],
      "target_answer": "Bonjour, Merci, S'il vous plaît, Oui, Ça va ?",
      "meaning": "the handshake set",
      "explanation": "Five fixed items — taken whole, used whole."
    },
    {
      "id": "fr5011_e2",
      "type": "shift_select",
      "prompt": "A stranger at the bakery — which pronoun do you reach for?",
      "options": [
        "vous",
        "on",
        "tu"
      ],
      "target_answer": "vous",
      "meaning": "vous — the safe formal default",
      "explanation": "Strangers, elders, officials: vous. Friends, children, dogs: tu. When in doubt, vous."
    },
    {
      "id": "fr5011_e3",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you're ordering politely: a coffee, please (formal)",
      "cues": [
        "the item: un café",
        "the politeness tag: s'il vous plaît",
        "Un café, s'il vous plaît"
      ],
      "target_answer": "Un café, s'il vous plaît",
      "meaning": "A coffee, please",
      "word_bank": [
        "plaît",
        "café",
        "vous",
        "Un",
        "s'il",
        "tu",
        "la"
      ],
      "idea_parts": [
        "the thing → un café",
        "the tag → s'il vous plaît",
        "register → formal (vous)"
      ],
      "explanation": "The politeness escalator starts here — topic 26 will upgrade it to je voudrais."
    },
    {
      "id": "fr5011_e4",
      "type": "literal_gloss",
      "prompt": "Which English sentence is built the French way?",
      "german": "Ça va ? — Ça va, merci",
      "natural": "How's it going? — Fine, thanks",
      "options": [
        "How are you? — I am fine, thanks",
        "It goes? — It goes, thanks",
        "It goes? — I go, thanks"
      ],
      "target_answer": "It goes? — It goes, thanks",
      "meaning": "The odd English is the lesson: aller (to go) carries the greeting.",
      "explanation": "ça va is literally 'it goes'. The question and the answer are the same sentence, tilted."
    },
    {
      "id": "fr5011_e5",
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Bonjour, merci beaucoup",
      "replays": 2,
      "target_answer": "Bonjour, merci beaucoup",
      "meaning": "Hello, thanks a lot",
      "cues": [
        "bon — the bonus word",
        "jour — the day",
        "beaucoup: 'many coups' — the beau-family amplifier"
      ],
      "explanation": "beaucoup (from beau 'beautiful' + coup 'stroke') — thanks, amplified.",
      "affirmation": "You spelled beaucoup as one word — the amplifier stays welded."
    }
  ],
  "summary": {
    "outcome": "Deploy the handshake set, choose vous under pressure, and answer ça va with itself.",
    "use_example": {
      "german": "Bonjour ! Ça va ? — Ça va, merci.",
      "english": "Hello! How's it going? — Fine, thanks."
    },
    "takeaway": "Idioms are items, not formulas — and vous is the pronoun you can't be fired for.",
    "curiosity_teaser": "Up next on Le Pont ([5012] The Alphabet & Je m'appelle): see how Bonjour & Merci leads directly into The Alphabet & Je m'appelle."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"A coffee, please\" in French:",
    "target_answer": "Un café, s'il vous plaît",
    "word_bank": [
      "s'il",
      "café",
      "ne",
      "Un",
      "vous",
      "pas",
      "plaît"
    ],
    "explanation": "Re-constructing \"Un café, s'il vous plaît\" from the underlying rule cements the pattern of Bonjour & Merci."
  }
};

export default lesson;
