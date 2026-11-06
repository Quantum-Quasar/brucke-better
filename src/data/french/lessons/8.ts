import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 8,
  "slug": "the-eur-bridge",
  "title": "The -eur Bridge",
  "subtitle": "doctor → docteur, actor → acteur — and why la couleur and l'erreur rebel against masculine gender",
  "phase": 1,
  "shift_categories": [
    "eur"
  ],
  "word_ids": [
    "docteur",
    "acteur",
    "directeur",
    "professeur",
    "honneur",
    "couleur",
    "erreur",
    "peur",
    "chaleur",
    "bonheur"
  ],
  "table_word_ids": [
    "docteur",
    "acteur",
    "directeur",
    "professeur",
    "honneur",
    "couleur",
    "erreur",
    "peur",
    "chaleur",
    "bonheur"
  ],
  "hook": {
    "title": "Where English -or and -er Re-Merge",
    "content": "English splits Latin -or words across three spellings: doctor, actor, director, professor, error, color, honour. French merges every single one of them into -eur (/œʁ/): le docteur, l'acteur, le directeur, le professeur, l'erreur, la couleur, l'honneur. Round your lips as if to say 'oo' while pronouncing 'eh' — that warm front-rounded vowel is /œʁ/.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why people in -eur are masculine but feelings/qualities in -eur are feminine",
        "content": "Latin had two different -or groups: human agents (doctor, actor, director) which are naturally masculine (le docteur), and abstract sensations/qualities (color, error, calor 'heat', pavor 'fear') which became feminine in Gallo-Romance (la couleur, l'erreur, la chaleur, la peur)!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "The Agent vs. Quality Split in -eur",
    "content": "Here is the rule that beats rote memorization: if an -eur word names a person doing a job (le docteur, l'acteur, le directeur, le professeur), it takes masculine le. If it names an abstract quality, sensation, or state (la couleur, l'erreur, la peur, la chaleur), it takes feminine la! (Only two common non-person words stay masculine: l'honneur and le bonheur 'happiness'.)",
    "linguist_note": "Latin stressed free vowel ō/ŏ before r diphthongized in Old French to -ou- and then fronted to -eu- /œ/, while British English spelling 'colour/honour' still preserves the Old French -our stage!",
    "trap_note": "The shortcut your mind will offer: treating all -eur nouns as masculine because le docteur and l'acteur come first. Always check whether the noun is an abstract quality: la couleur and l'erreur are feminine!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each -eur noun with its article using the Person (le) vs. Quality (la) law:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the doctor (person)",
          "german": "le docteur"
        },
        {
          "id": "p2",
          "english": "the director (person)",
          "german": "le directeur"
        },
        {
          "id": "p3",
          "english": "the color (quality)",
          "german": "la couleur"
        },
        {
          "id": "p4",
          "english": "the error / mistake (quality)",
          "german": "l'erreur"
        },
        {
          "id": "p5",
          "english": "the heat / warmth (quality)",
          "german": "la chaleur"
        }
      ],
      "target_answer": "le docteur, le directeur, la couleur, l'erreur, la chaleur",
      "meaning": "the doctor (person), the director (person), the color (quality), the error / mistake (quality), the heat / warmth (quality)",
      "explanation": "Human agents in -eur take le; abstract qualities and sensations take la.",
      "id": "fr8_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "la chaleur ('heat, warmth') shares its Latin root calor with which English nutrition unit?",
      "target_answer": "calorie",
      "meaning": "calorie ↔ chaleur (Latin calor 'heat')",
      "explanation": "A calorie is literally a unit of heat (Latin calor → French chaleur).",
      "id": "fr8_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Which article belongs with 'couleur' ('color') in 'I like the color'?",
      "options": [
        "la couleur",
        "l'couleur",
        "le couleur"
      ],
      "target_answer": "la couleur",
      "meaning": "the color (feminine quality noun)",
      "explanation": "couleur is the famous feminine -eur quality noun: la couleur.",
      "id": "fr8_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "the doctor is here and the director is there",
      "cues": [
        "The doctor is here → Le docteur est ici",
        "and the director is there → et le directeur est là"
      ],
      "idea_parts": [
        "first clause → Le docteur est ici",
        "connector + second clause → et le directeur est là"
      ],
      "target_answer": "Le docteur est ici et le directeur est là",
      "meaning": "The doctor is here and the director is there",
      "word_bank": [
        "et",
        "est",
        "Le",
        "la",
        "ici",
        "La",
        "directeur",
        "docteur",
        "le",
        "est",
        "là"
      ],
      "explanation": "Both docteur and directeur are human agent nouns in -eur, so both take le.",
      "diagnosis": {
        "slip": "used la for an agent noun",
        "cue": "Human agents in -eur take masculine le."
      },
      "id": "fr8_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "C'est une grande erreur",
      "replays": 2,
      "target_answer": "C'est une grande erreur",
      "meaning": "It is a big mistake",
      "cues": [
        "pointer: C'est",
        "feminine article + adjective: une grande",
        "-eur rebel: erreur"
      ],
      "explanation": "erreur is feminine, so grande pronounces its final d!",
      "affirmation": "You heard grande in the feminine before erreur.",
      "id": "fr8_e5"
    }
  ],
  "summary": {
    "outcome": "Convert English -or/-our nouns into French -eur and separate masculine human agents (le docteur) from feminine qualities (la couleur, l'erreur).",
    "use_example": {
      "german": "Le professeur explique l'erreur.",
      "english": "The teacher explains the mistake."
    },
    "takeaway": "British spelling 'colour' is a fossil of Old French — modern French moved on to -eur.",
    "curiosity_teaser": "Up next on Le Pont ([801] Couleur: The Famous Rebel): see how The -eur Bridge leads directly into Couleur: The Famous Rebel."
  },
  "twist": {
    "prompt": "Ungraded — 'Happiness is simple' (use le bonheur):",
    "target_answer": "Le bonheur est simple",
    "word_bank": [
      "La",
      "simple",
      "bon",
      "est",
      "Le",
      "bonheur"
    ],
    "explanation": "bonheur (bon 'good' + heur 'fortune/augury') is masculine: Le bonheur est simple."
  },
  "foreshadow": {
    "line": "Having mastered The -eur Bridge, look ahead to Topic 9 (vous & tu), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 9
  },
  "payoff": {
    "ofLesson": 7,
    "text": "The foundation from Topic 7 (Questions à la Française) now pays off directly inside The -eur Bridge: every sentence here builds on that earlier step."
  }
};

export default lesson;
