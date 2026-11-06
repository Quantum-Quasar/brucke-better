import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5031,
  "slug": "umlaut-mouth-positions",
  "title": "ü, ö, ä — Mouth Positions",
  "subtitle": "Pronunciation clinic with minimal pairs — schon/schön, Bruder/Brüder",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "bruder",
    "morgen",
    "zwölf",
    "schön",
    "öl",
    "tüte",
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
    "bruder",
    "morgen",
    "zwölf",
    "schön",
    "öl",
    "tüte",
    "herr",
    "fabrik",
    "gymnasium",
    "rente",
    "dom",
    "art",
    "kaution",
    "eventuell",
    "abendbrot"
  ],
  "hook": {
    "title": "Three Vowels English Skipped",
    "content": "German has three front-rounded vowels English never kept: ü, ö, ä. The trick is mechanical, not magical: say the English vowel (e, o, a) and ROUND YOUR LIPS at the same time — say 'ee' with 'oo'-lips and you have ü. The minimal pairs prove the difference is meaning-level: schon (already) vs schön (beautiful) differ by one mouth position. Bruder (brother) vs Brüder (brothers) differ by umlaut — the plural dots you know from the i-mutation lesson are also a SOUND change. English once had these sounds (it kept them in French loanwords like 'curve' and 'rare'); German kept them native.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Three Positions",
        "content": "ü = say 'ee' with rounded lips (über — the V→B preposition!). ö = say 'ay' with rounded lips (schön, zwölf). ä = say 'eh' with slightly laxer tongue (Männer, Mädchen). ä is the easiest — many dialects merge it with plain e; ü and ö are the real work."
      }
    ]
  },
  "pattern": {
    "title": "Minimal Pair Drills",
    "content": "Pair one: schon (already — Schon gut! 'already fine') vs schön (beautiful — Schön! 'nice!'). Pair two: Bruder (brother) vs Brüder (brothers) — the umlaut you learned as spelling is this sound. Pair three: morgen (morning) vs Mörder (murderer — grim but unforgettable). Pair four: zwölf (twelve) — the ö inside the number you already count. Pair five: über (over) vs unter? — unter has none, but öl (oil) does. Drill the pairs aloud: the vowels are mouth POSITIONS, and your mouth can learn a position in an afternoon.",
    "footnotes": [],
    "linguist_note": "Front-rounded vowels are the Germanic umlaut made audible: historical i pulled the vowel forward AND English/German rounded what remained differently. English kept the roundness only in French loans (curve, urgent, purse) — the sounds exist in your mouth already, just unassigned."
  },
  "exercises": [
    {
      "id": "l5031_e1",
      "type": "shift_select",
      "prompt": "Minimal pair: 'Das ist schön!' — what does the ö change from 'schon'?",
      "options": [
        "They sound identical",
        "schön = beautiful (schon = already)",
        "schön = already (schon = beautiful)",
        "schön = soon"
      ],
      "target_answer": "schön = beautiful (schon = already)",
      "meaning": "The ü/ö minimal pair with real meaning stakes",
      "explanation": "One mouth position separates 'already' from 'beautiful' — say 'ay' with rounded lips for the ö."
    },
    {
      "id": "l5031_e2",
      "type": "shift_select",
      "prompt": "How do you make the ü sound?",
      "options": [
        "Say 'ay' wide",
        "There is no ü in German",
        "Say 'ee' while rounding your lips like for 'oo'",
        "Say 'oo' normally"
      ],
      "target_answer": "Say 'ee' while rounding your lips like for 'oo'",
      "meaning": "The ü recipe",
      "explanation": "Front tongue + rounded lips = ü. über, Tür, dünn — the vowel you have been reading all trail. Say the pair you meet in every shop: die Tüte, das Öl — the first held long, the second rounded long."
    },
    {
      "id": "l5031_e3",
      "type": "matching_pairs",
      "prompt": "Match each word with its umlaut story:",
      "matching_pairs": [
        {
          "id": "um3",
          "english": "Brüder (with ü)",
          "german": "the PLURAL of Bruder — umlaut as sound"
        },
        {
          "id": "um4",
          "english": "zwölf (with ö)",
          "german": "twelve — the tw→zw number"
        },
        {
          "id": "um5",
          "english": "Männer (with ä)",
          "german": "the PLURAL of Mann — the men-fossil"
        },
        {
          "id": "um6",
          "english": "schön (with ö)",
          "german": "beautiful — the minimal-pair star"
        }
      ],
      "target_answer": "the PLURAL of Bruder — umlaut as sound, twelve — the tw→zw number, the PLURAL of Mann — the men-fossil, beautiful — the minimal-pair star",
      "meaning": "the four umlaut showcases",
      "explanation": "The dots are not decoration — they are the vowel-pull you learned in the plurals lesson, made audible."
    },
    {
      "id": "l5031_e4",
      "type": "shift_select",
      "prompt": "Which word does NOT contain an umlaut vowel?",
      "options": [
        "zwölf",
        "über",
        "Mädchen",
        "unter"
      ],
      "target_answer": "unter",
      "meaning": "unter keeps its plain u",
      "explanation": "über (ü), zwölf (ö), Mädchen (ä) — but unter is the plain twin of under, no dots. Same for Herr, and for the trap-deck nouns riding along on this page: die Fabrik, das Gymnasium, die Rente, der Dom, die Art, die Kaution, eventuell."
    },
    {
      "id": "l5031_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'My brother is twelve' (with the ü-recipe in my...)",
      "target_answer": "Mein Bruder ist zwölf",
      "meaning": "Mein Bruder ist zwölf = My brother is twelve",
      "vocab_hints": [
        {
          "word": "Mein",
          "translation": "my",
          "note": "mein ↔ mine — the possessive twin from the Article Grid"
        }
      ],
      "word_bank": [
        "nicht",
        "zwölf",
        "mit",
        "Mein",
        "Bruder",
        "ist"
      ],
      "explanation": "Three old friends, one sentence — and zwölf wears the ö you just learned to round."
    }
  ],
  "summary": {
    "outcome": "Produce ü, ö, ä and distinguish the minimal pairs schon/schön, Bruder/Brüder.",
    "use_example": {
      "german": "Mein Bruder ist zwölf.",
      "english": "My brother is twelve."
    },
    "takeaway": "ü = 'ee' with round lips, ö = 'ay' with round lips, ä = lax 'eh' — the umlaut dots are sounds, not decorations.",
    "curiosity_teaser": "Next: the Ablaut Hall of Fame — a guided tour of all seven strong verb classes."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from ü, ö, ä — Mouth Positions (Mein Bruder ist zwölf = My brother is twelve):",
    "target_answer": "Mein Bruder ist zwölf",
    "word_bank": [
      "nicht",
      "ist",
      "Bruder",
      "zwölf",
      "Mein",
      "heute"
    ],
    "explanation": "Re-assembling \"Mein Bruder ist zwölf\" from scratch locks in the structural pattern of ü, ö, ä — Mouth Positions without relying on short-term echo."
  }
};

export default lesson;
