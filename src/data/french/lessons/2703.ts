import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2703,
  "slug": "sprig-2703",
  "title": "Savoir vs Connaître",
  "subtitle": "Knowing facts and skills (je sais nager) vs being familiar with people and places (je connais Paris).",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "savoir",
    "connaître",
    "ville",
    "docteur",
    "parler",
    "où",
    "pourquoi",
    "ami"
  ],
  "table_word_ids": [
    "savoir",
    "connaître",
    "ville",
    "docteur",
    "parler",
    "où",
    "pourquoi",
    "ami"
  ],
  "hook": {
    "title": "Why French Has Two Verbs for 'To Know': savoir vs. connaître",
    "content": "savoir (je sais, cousin of savant/savvy) is for FACTS, CLAUSES, and SKILLS (Je sais où il est, Je sais parler français — with NO word for 'how'!). connaître (je connais, cousin of reconnaissance) is for PEOPLE, PLACES, and NOUNS you are acquainted with (Je connais Marie, Je connais Paris)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why French never translates 'how' in 'I know how to speak'",
        "content": "savoir chains directly to the bare infinitive with NO 'comment': Je sais nager ('I know [how] to swim')!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Clause or Bare Infinitive → savoir (je sais); Person or Place Noun → connaître (je connais)",
    "content": "Check what follows 'know': a noun takes connaître; a clause, bare infinitive, or nothing at all (Je ne sais pas) takes savoir!",
    "linguist_note": "Latin sapere ('be wise') vs. cognōscere ('be acquainted with') divides propositional knowledge from entity familiarity.",
    "trap_note": "Never say *Je connais où il est or *Je sais Marie — nouns take connais, clauses and infinitives take sais!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each 'know' sentence with savoir (je sais) or connaître (je connais):",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I know Paris very well (place noun)",
          "german": "Je connais très bien Paris"
        },
        {
          "id": "p2",
          "english": "I know your brother (person noun)",
          "german": "Je connais ton frère"
        },
        {
          "id": "p3",
          "english": "I know where he is (clause with où)",
          "german": "Je sais où il est"
        },
        {
          "id": "p4",
          "english": "I know how to speak French (bare infinitive)",
          "german": "Je sais parler français"
        },
        {
          "id": "p5",
          "english": "I don't know (standing alone)",
          "german": "Je ne sais pas"
        }
      ],
      "target_answer": "Je connais très bien Paris, Je connais ton frère, Je sais où il est, Je sais parler français, Je ne sais pas",
      "meaning": "I know Paris very well (place noun), I know your brother (person noun), I know where he is (clause with où), I know how to speak French (bare infinitive), I don't know (standing alone)",
      "explanation": "connaître always takes a direct noun object; savoir takes clauses, infinitives, or stands alone.",
      "id": "fr2703_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "French connaître ('to be familiar with') shares its Latin root cognōscere with which English word for a military scouting mission?",
      "target_answer": "reconnaissance",
      "meaning": "reconnaissance / cognizant ↔ connaître",
      "explanation": "Reconnaissance is literally 'getting to know (reconnaître) the terrain'.",
      "id": "fr2703_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'Do you know this restaurant?' vs. 'Do you know where the restaurant is?'",
      "options": [
        "Tu connais ce restaurant ? / Tu sais où est le restaurant ?",
        "Tu sais ce restaurant ? / Tu connais où est le restaurant ?",
        "Tu connais ce restaurant ? / Tu connais où est le restaurant ?"
      ],
      "target_answer": "Tu connais ce restaurant ? / Tu sais où est le restaurant ?",
      "meaning": "Noun object takes connais; où-clause takes sais",
      "explanation": "ce restaurant is a noun (connais); où est le restaurant is a clause (sais).",
      "id": "fr2703_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I know your friend and I know where he lives",
      "cues": [
        "I know your friend → Je connais ton ami",
        "and I know where he lives → et je sais où il habite"
      ],
      "idea_parts": [
        "person acquaintance → Je connais ton ami",
        "fact clause → et je sais où il habite"
      ],
      "target_answer": "Je connais ton ami et je sais où il habite",
      "meaning": "I know your friend and I know where he lives",
      "word_bank": [
        "je",
        "sais",
        "et",
        "ton",
        "le",
        "il",
        "connais",
        "habite",
        "où",
        "ami",
        "la",
        "Je"
      ],
      "explanation": "ton ami (noun) takes connais; où il habite (clause) takes sais.",
      "diagnosis": {
        "slip": "swapped connais and sais",
        "cue": "Use connais before ton ami and sais before où il habite."
      },
      "id": "fr2703_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je ne sais pas pourquoi il est parti",
      "replays": 2,
      "target_answer": "Je ne sais pas pourquoi il est parti",
      "meaning": "I don't know why he left",
      "cues": [
        "Je ne sais pas",
        "pourquoi il est parti"
      ],
      "explanation": "savoir is used before pourquoi and in Je ne sais pas.",
      "affirmation": "You used Je ne sais pas before pourquoi il est parti.",
      "id": "fr2703_e5"
    }
  ],
  "summary": {
    "outcome": "Distinguish savoir (facts, clauses, bare infinitives for skills) from connaître (people, places, and noun objects).",
    "use_example": {
      "german": "Je connais bien cette ville, donc je sais où aller.",
      "english": "I know this city well, so I know where to go."
    },
    "takeaway": "connaître + Noun (people/places); savoir + Clause or Bare Infinitive (facts/skills).",
    "curiosity_teaser": "Up next on Le Pont ([28] qui & que): see how Savoir vs Connaître leads directly into qui & que."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I know your friend and I know where he lives\" in French:",
    "target_answer": "Je connais ton ami et je sais où il habite",
    "word_bank": [
      "sais",
      "connais",
      "où",
      "ton",
      "habite",
      "Je",
      "il",
      "pas",
      "je",
      "ami",
      "et",
      "ne"
    ],
    "explanation": "Re-constructing \"Je connais ton ami et je sais où il habite\" from the underlying rule cements the pattern of Savoir vs Connaître."
  }
};

export default lesson;
