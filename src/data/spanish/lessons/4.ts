import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 4,
  "slug": "negation-the-clean-no",
  "title": "Negation: The Clean 'No'",
  "subtitle": "Spanish negation is one direct word: no quiero, no lo quiero",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "no",
    "nada",
    "nunca",
    "nadie",
    "querer",
    "lo",
    "pastel",
    "comprender"
  ],
  "table_word_ids": [
    "no",
    "nada",
    "nunca",
    "nadie",
    "querer",
    "lo",
    "pastel",
    "comprender"
  ],
  "hook": {
    "title": "The Simplicity of Spanish Negation",
    "content": "English requires auxiliary helpers ('I do not want'); French wraps verbs in a two-part sandwich (ne...pas). Spanish is disarmingly direct: place no right in front of the verb cluster. No quiero ('I don't want'). No comprendo ('I don't understand'). That is all!"
  },
  "pattern": {
    "title": "Negative Shielding and Double Negation",
    "content": "When an object pronoun is present, no stands guard in front of the pronoun too: No lo quiero ('Not it I-want'). And when expressing 'nothing' (nada), 'never' (nunca), or 'nobody' (nadie) after the verb, Spanish uses negative concord (double negation): No quiero nada ('I don't want anything', lit. 'I not want nothing'). The second negative reinforces the refusal rather than canceling it!",
    "linguist_note": "Latin nōn became Spanish no. Negative concord is standard across all Romance languages.",
    "trap_note": "Never split the pronoun from the verb (*lo no quiero). The pronoun is glued to the verb, so no goes first: No lo quiero."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "no / not",
          "german": "no"
        },
        {
          "id": "p2",
          "english": "nothing / anything (after no)",
          "german": "nada"
        },
        {
          "id": "p3",
          "english": "never",
          "german": "nunca"
        },
        {
          "id": "p4",
          "english": "nobody",
          "german": "nadie"
        },
        {
          "id": "p5",
          "english": "I don't want",
          "german": "no quiero"
        },
        {
          "id": "p6",
          "english": "I don't want it",
          "german": "no lo quiero"
        }
      ],
      "target_answer": "no, nada, nunca, nadie, no quiero, no lo quiero",
      "meaning": "no / not, nothing / anything (after no), never, nobody, I don't want, I don't want it",
      "explanation": "no stands at the front of the verb cluster; nada, nunca, and nadie reinforce the negation.",
      "id": "es4_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Where does 'no' go when an object pronoun like 'lo' is present?",
      "options": [
        "After the verb: *Lo quiero no",
        "Between pronoun and verb: *Lo no quiero",
        "Before the pronoun: No lo quiero"
      ],
      "target_answer": "Before the pronoun: No lo quiero",
      "meaning": "I don't want it",
      "explanation": "lo quiero is a welded unit; no stands in front of both: No lo quiero.",
      "id": "es4_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I don't want the cake'",
      "target_answer": "No quiero el pastel",
      "meaning": "I don't want the cake",
      "word_bank": [
        "lo",
        "No",
        "la",
        "quiero",
        "pastel",
        "el",
        "nada"
      ],
      "explanation": "No + quiero + el pastel.",
      "id": "es4_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "refuse completely: say you don't want anything",
      "cues": [
        "start with No quiero",
        "reinforce at the end with nada: No quiero nada"
      ],
      "idea_parts": [
        "I don't want → No quiero",
        "anything/nothing → nada"
      ],
      "target_answer": "No quiero nada",
      "meaning": "I don't want anything",
      "word_bank": [
        "No",
        "quiero",
        "nunca",
        "nada",
        "lo",
        "pastel"
      ],
      "explanation": "No quiero nada — double negation is standard and mandatory in Spanish when nada follows the verb.",
      "diagnosis": {
        "slip": "omitted no before quiero",
        "cue": "When nada follows the verb, no must still stand before the verb: No quiero nada."
      },
      "id": "es4_e4"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish 'No lo quiero'?",
      "german": "No lo quiero",
      "natural": "I don't want it",
      "options": [
        "It not I want",
        "Not it I-want",
        "I don't want it",
        "I not want it"
      ],
      "target_answer": "Not it I-want",
      "meaning": "I don't want it (literal Spanish blueprint: Not it I-want)",
      "explanation": "No ('Not') + lo ('it') + quiero ('I-want'): the negative marker leads the pronoun-verb block.",
      "id": "es4_e5"
    }
  ],
  "summary": {
    "outcome": "Negate Spanish verbs and pronoun-verb clusters with 'no' and reinforce refusals with nada and nunca.",
    "use_example": {
      "german": "No lo quiero — no quiero nada, gracias.",
      "english": "I don't want it — I don't want anything, thank you."
    },
    "takeaway": "Spanish negation needs zero helper verbs — place no before the entire pronoun-verb cluster.",
    "curiosity_teaser": "Up next ([401] Refusal Gym: no quiero nada): drill double negation with nada and nunca across converted verbs."
  },
  "twist": {
    "prompt": "Assemble: 'I don't understand'",
    "target_answer": "No comprendo",
    "word_bank": [
      "quiero",
      "No",
      "nada",
      "comprendo",
      "lo"
    ],
    "explanation": "No comprendo negates comprendo with one clean word."
  },
  "foreshadow": {
    "line": "Actions are one thing; being is another. In Topic 5, Spanish reveals why it has two completely different verbs for 'to be'.",
    "resolvedIn": 5
  },
  "payoff": {
    "ofLesson": 3,
    "text": "Negating any of the -ar, -er, or -ir verbs you unlocked in Topic 3 requires just one word in front: no."
  }
};

export default lesson;
