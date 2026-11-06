import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2601,
  "slug": "lesson-2601",
  "title": "Je voudrais",
  "subtitle": "vouloir, pouvoir, faire in the conditional (je voudrais, tu pourrais, je ferais).",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "voudrais",
    "pourrais",
    "ferais",
    "vouloir",
    "sil_vous_plait",
    "table",
    "café",
    "vin",
    "addition"
  ],
  "table_word_ids": [
    "voudrais",
    "pourrais",
    "ferais",
    "vouloir",
    "sil_vous_plait",
    "table",
    "café",
    "vin",
    "addition"
  ],
  "hook": {
    "title": "Climbing the Politeness Escalator with je voudrais and tu pourrais",
    "content": "Replace blunt Je veux ('I want') with conditional Je voudrais ('I would like') and Tu pourrais ('Could you') whenever ordering or asking a favor!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why je voudrais and tu voudrais sound identical (/vudʁɛ/)",
        "content": "Because the conditional uses the -ais, -ais, -ait endings of the imparfait, je voudrais, tu voudrais, and il/elle/on voudrait all sound like /vudʁɛ/!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Je voudrais + Noun OR Bare Infinitive",
    "content": "Use Je voudrais before a noun (Je voudrais l'addition) or before a bare infinitive (Je voudrais réserver une table).",
    "linguist_note": "Conditional mood attenuates directive speech acts by framing desires politely.",
    "trap_note": "Never insert à or de after je voudrais before an infinitive — chain the infinitive bare: Je voudrais partir!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each conditional request with its English meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Je voudrais un café, s'il vous plaît",
          "german": "I would like a coffee, please"
        },
        {
          "id": "p2",
          "english": "Je voudrais l'addition",
          "german": "I would like the bill / check"
        },
        {
          "id": "p3",
          "english": "Je voudrais vous demander quelque chose",
          "german": "I would like to ask you something"
        },
        {
          "id": "p4",
          "english": "Tu pourrais m'aider ?",
          "german": "Could you help me?"
        },
        {
          "id": "p5",
          "english": "On voudrait deux billets",
          "german": "We would like two tickets"
        }
      ],
      "target_answer": "I would like a coffee, please, I would like the bill / check, I would like to ask you something, Could you help me?, We would like two tickets",
      "meaning": "Je voudrais un café, s'il vous plaît, Je voudrais l'addition, Je voudrais vous demander quelque chose, Tu pourrais m'aider ?, On voudrait deux billets",
      "explanation": "voudrais / voudrait and pourrais turn blunt demands into warm courtesy.",
      "id": "fr2601_e1"
    },
    {
      "type": "shift_select",
      "prompt": "You want to ask the waiter for the bill (l'addition). Which phrasing is most polite and natural?",
      "options": [
        "Donnez-moi l'addition",
        "Je voudrais l'addition, s'il vous plaît",
        "Je veux l'addition maintenant"
      ],
      "target_answer": "Je voudrais l'addition, s'il vous plaît",
      "meaning": "I would like the bill, please",
      "explanation": "Je voudrais is the universal polite standard in restaurants and shops.",
      "id": "fr2601_e2"
    },
    {
      "type": "derive",
      "prompt": "Soften 'Je veux voir le directeur' ('I want to see the director') using the conditional of vouloir:",
      "english_hint": "veux → voudrais",
      "target_answer": "Je voudrais voir le directeur",
      "meaning": "I would like to see the director",
      "explanation": "Je voudrais + bare infinitive voir.",
      "id": "fr2601_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "could you come with me today (informal tu)",
      "cues": [
        "You could come → Tu pourrais venir",
        "with me today → avec moi aujourd'hui"
      ],
      "idea_parts": [
        "conditional request → Tu pourrais venir",
        "companion + time → avec moi aujourd'hui"
      ],
      "target_answer": "Tu pourrais venir avec moi aujourd'hui",
      "meaning": "Could you come with me today?",
      "word_bank": [
        "peux",
        "moi",
        "la",
        "Tu",
        "aujourd'hui",
        "pourrais",
        "avec",
        "venir"
      ],
      "explanation": "Tu pourrais + bare infinitive venir.",
      "diagnosis": {
        "slip": "used peux",
        "cue": "Use conditional pourrais for 'could you'."
      },
      "id": "fr2601_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Nous voudrions réserver une table pour quatre personnes",
      "replays": 2,
      "target_answer": "Nous voudrions réserver une table pour quatre personnes",
      "meaning": "We would like to reserve a table for four people",
      "cues": [
        "Nous voudrions réserver",
        "une table pour quatre personnes"
      ],
      "explanation": "Nous voudrions + réserver.",
      "affirmation": "You wrote Nous voudrions réserver and quatre personnes cleanly.",
      "id": "fr2601_e5"
    }
  ],
  "summary": {
    "outcome": "Use je voudrais, on voudrait, and tu pourrais to order and make polite requests.",
    "use_example": {
      "german": "Bonjour, je voudrais deux billets pour Lyon, s'il vous plaît.",
      "english": "Hello, I would like two tickets to Lyon, please."
    },
    "takeaway": "Swap je veux for je voudrais whenever you order or ask a favor.",
    "curiosity_teaser": "Up next on Le Pont ([2602] The -ai Future): see how Je voudrais leads directly into The -ai Future."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"Could you come with me today\" in French:",
    "target_answer": "Tu pourrais venir avec moi aujourd'hui",
    "word_bank": [
      "pas",
      "Tu",
      "ne",
      "venir",
      "avec",
      "aujourd'hui",
      "moi",
      "pourrais"
    ],
    "explanation": "Re-constructing \"Tu pourrais venir avec moi aujourd'hui\" from the underlying rule cements the pattern of Je voudrais."
  }
};

export default lesson;
