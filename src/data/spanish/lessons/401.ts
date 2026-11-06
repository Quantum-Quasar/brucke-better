import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 401,
  "slug": "refusal-gym-no-quiero-nada",
  "title": "Refusal Gym: no quiero nada",
  "subtitle": "Double negation in Spanish: no quiero nada and no voy nunca reinforce the refusal",
  "phase": 1,
  "shift_categories": [
    "ar_engine"
  ],
  "word_ids": [
    "no",
    "nada",
    "nunca",
    "nadie",
    "celebrar",
    "participar",
    "invitar",
    "comer",
    "querer"
  ],
  "table_word_ids": [
    "no",
    "nada",
    "nunca",
    "nadie",
    "celebrar",
    "participar",
    "invitar",
    "comer",
    "querer"
  ],
  "hook": {
    "title": "Double Negation Is Good Grammar in Spanish",
    "content": "In English schoolrooms, 'I don't want nothing' is scolded as a double negative. In Spanish, when nada ('nothing'), nunca ('never'), or nadie ('nobody') comes after the verb, you MUST put no before the verb: No quiero nada, No como nada!"
  },
  "pattern": {
    "title": "Negating Stacked Verb Chains",
    "content": "When two verbs are stacked (quiero participar), no stands at the very front of the train: No quiero participar ('I don't want to participate')."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I don't want anything",
          "german": "no quiero nada"
        },
        {
          "id": "p2",
          "english": "I don't eat anything",
          "german": "no como nada"
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
          "english": "to celebrate",
          "german": "celebrar"
        },
        {
          "id": "p6",
          "english": "to participate",
          "german": "participar"
        }
      ],
      "target_answer": "no quiero nada, no como nada, nunca, nadie, celebrar, participar",
      "meaning": "I don't want anything, I don't eat anything, never, nobody, to celebrate, to participate",
      "explanation": "Double negation (no + verb + nada/nunca/nadie) is the standard Spanish pattern.",
      "id": "es401_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I don't eat anything' in natural Spanish?",
      "options": [
        "Como nada",
        "No como nada",
        "No como algo"
      ],
      "target_answer": "No como nada",
      "meaning": "I don't eat anything",
      "explanation": "Spanish echoes the negation at both ends of the verb: No como nada.",
      "id": "es401_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I don't want to participate'",
      "target_answer": "No quiero participar",
      "meaning": "I don't want to participate",
      "word_bank": [
        "participar",
        "No",
        "celebrar",
        "lo",
        "quiero",
        "nada"
      ],
      "explanation": "No + quiero + participar.",
      "id": "es401_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say you don't want to celebrate",
      "cues": [
        "no goes before quiero",
        "to celebrate is celebrar"
      ],
      "idea_parts": [
        "I don't want → No quiero",
        "to celebrate → celebrar"
      ],
      "target_answer": "No quiero celebrar",
      "meaning": "I don't want to celebrate",
      "word_bank": [
        "participar",
        "No",
        "quiero",
        "celebrar",
        "el",
        "nada"
      ],
      "explanation": "No quiero celebrar — clean refusal of a stacked infinitive.",
      "id": "es401_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "No quiero nada",
      "replays": 2,
      "target_answer": "No quiero nada",
      "meaning": "I don't want anything",
      "cues": [
        "negation: No",
        "I want: quiero",
        "nothing/anything: nada"
      ],
      "explanation": "No quiero nada — the classic polite or firm refusal.",
      "affirmation": "Double negation mastered!",
      "id": "es401_e5"
    }
  ],
  "summary": {
    "outcome": "Build double-negative sentences with nada/nunca and negate stacked infinitives.",
    "use_example": {
      "german": "No quiero participar y no quiero comer nada.",
      "english": "I don't want to participate and I don't want to eat anything."
    },
    "takeaway": "In Spanish, two negatives after the verb don't cancel out — they harmonize.",
    "curiosity_teaser": "Up next ([402] Negating the Pronoun): practice placing no before walking pronouns and hooked infinitives."
  },
  "twist": {
    "prompt": "Assemble: 'You don't want to participate'",
    "target_answer": "No quieres participar",
    "word_bank": [
      "celebrar",
      "quieres",
      "participar",
      "quiero",
      "No",
      "nada"
    ],
    "explanation": "No quieres participar switches the verb to informal tú."
  }
};

export default lesson;
