import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 602,
  "slug": "sprig-602",
  "title": "Liberté & Society Sentences",
  "subtitle": "La liberté est… — build sentences converting -ité and -ance nouns into the wild.",
  "phase": 1,
  "shift_categories": [
    "ite",
    "ance"
  ],
  "word_ids": [
    "liberté",
    "société",
    "ville",
    "réalité",
    "qualité",
    "différence",
    "être",
    "très"
  ],
  "table_word_ids": [
    "liberté",
    "société",
    "ville",
    "réalité",
    "qualité",
    "différence",
    "être",
    "très"
  ],
  "hook": {
    "title": "Abstract Ideas in Everyday Conversation",
    "content": "Where English says bare 'Freedom is important' or 'Society changes', French always gives the abstract concept its definite article: La liberté est importante, La société est grande, La réalité est différente. Alongside them sits la ville ('the city', cousin of villa and village).",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why French uses 'the' before abstract nouns",
        "content": "When talking about a concept as a whole category (freedom, patience, reality, society, music), French never leaves the subject noun naked!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Always Keep La Before General Abstract Concepts",
    "content": "Start general statements with La liberté, La société, La réalité, La qualité + est + feminine adjective.",
    "linguist_note": "Generic definite articles are mandatory in Romance for mass and abstract nouns used as subjects.",
    "trap_note": "Never drop La at the start of 'Freedom is precious' (*Liberté est précieuse) — always say La liberté!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each general statement with its French rendering (keeping the article!):",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Freedom is important",
          "german": "La liberté est importante"
        },
        {
          "id": "p2",
          "english": "Society is big",
          "german": "La société est grande"
        },
        {
          "id": "p3",
          "english": "The city is beautiful",
          "german": "La ville est belle"
        },
        {
          "id": "p4",
          "english": "Reality is different",
          "german": "La réalité est différente"
        }
      ],
      "target_answer": "La liberté est importante, La société est grande, La ville est belle, La réalité est différente",
      "meaning": "Freedom is important, Society is big, The city is beautiful, Reality is different",
      "explanation": "French keeps La before abstract nouns when talking about them in general.",
      "id": "fr602_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the word-for-word structure of 'La liberté est importante'?",
      "german": "La liberté est importante",
      "natural": "Freedom is important",
      "options": [
        "The liberty is important",
        "Liberty be important",
        "Freedom is important"
      ],
      "target_answer": "The liberty is important",
      "meaning": "Literal structure: The liberty is important",
      "explanation": "French requires the definite article La before abstract subject nouns.",
      "id": "fr602_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'The city is very big'",
      "target_answer": "La ville est très grande",
      "meaning": "The city is very big",
      "word_bank": [
        "ville",
        "La",
        "Le",
        "est",
        "grand",
        "très",
        "grande"
      ],
      "explanation": "la ville is feminine, so grande takes -e.",
      "id": "fr602_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "reality is very different here",
      "cues": [
        "The reality → La réalité",
        "is very different → est très différente",
        "here → ici"
      ],
      "idea_parts": [
        "subject → La réalité",
        "verb + adverb + adj → est très différente",
        "place → ici"
      ],
      "target_answer": "La réalité est très différente ici",
      "meaning": "Reality is very different here",
      "word_bank": [
        "réalité",
        "très",
        "différente",
        "est",
        "ici",
        "La",
        "la",
        "différent"
      ],
      "explanation": "La réalité requires the article La and feminine différente.",
      "diagnosis": {
        "slip": "omitted La or feminine -e",
        "cue": "Start with La réalité and end différente with -e."
      },
      "id": "fr602_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "La société et la ville sont grandes",
      "replays": 2,
      "target_answer": "La société et la ville sont grandes",
      "meaning": "The society and the city are big",
      "cues": [
        "La société et la ville",
        "sont grandes"
      ],
      "explanation": "Two feminine nouns joined by et take plural sont grandes.",
      "affirmation": "You wrote sont grandes with the feminine plural -es.",
      "id": "fr602_e5"
    }
  ],
  "summary": {
    "outcome": "Construct general statements about society, freedom, quality, and the city using mandatory definite articles.",
    "use_example": {
      "german": "La qualité est très importante dans cette ville.",
      "english": "Quality is very important in this city."
    },
    "takeaway": "Never leave an abstract noun bare in French: 'Freedom' is always La liberté.",
    "curiosity_teaser": "Up next on Le Pont ([603] The -ment & -able Twin Bridges): see how Liberté & Society Sentences leads directly into The -ment & -able Twin Bridges."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"The city is very big\" in French:",
    "target_answer": "La ville est très grande",
    "word_bank": [
      "pas",
      "ville",
      "ne",
      "La",
      "est",
      "très",
      "grande"
    ],
    "explanation": "Re-constructing \"La ville est très grande\" from the underlying rule cements the pattern of Liberté & Society Sentences."
  }
};

export default lesson;
