import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2401,
  "slug": "morning-to-night-routine",
  "title": "Morning to Night Routine",
  "subtitle": "levantarse (me levanto), lavarse, vestirse, acostarse (me acuesto) across a full day",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "levantarse",
    "acostarse",
    "me",
    "te",
    "se",
    "nos",
    "siete",
    "ocho",
    "diez",
    "mañana",
    "noche"
  ],
  "table_word_ids": [
    "levantarse",
    "acostarse",
    "me",
    "te",
    "se",
    "nos",
    "siete",
    "ocho",
    "diez",
    "mañana",
    "noche"
  ],
  "hook": {
    "title": "From 'Me Levanto' to 'Me Acuesto'",
    "content": "Follow the rhythm of a Spanish day: Por la mañana me levanto a las siete ('In the morning I get up at seven'), and por la noche me acuesto a las diez ('at night I go to bed at ten')."
  },
  "pattern": {
    "title": "Matching the Pronoun on Infinitives: Voy a Levantarme",
    "content": "Watch what happens when you put voy a or quiero in front of levantarse or acostarse: if the subject is 'I' (yo), the -se on the infinitive MUST change to -me! Voy a levantarme temprano ('I am going to get up early') or Me voy a levantar!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I get up",
          "german": "me levanto"
        },
        {
          "id": "p2",
          "english": "you get up (tú)",
          "german": "te levantas"
        },
        {
          "id": "p3",
          "english": "I go to bed (o→ue)",
          "german": "me acuesto"
        },
        {
          "id": "p4",
          "english": "I want to get up (hooked -me!)",
          "german": "quiero levantarme"
        },
        {
          "id": "p5",
          "english": "at seven in the morning",
          "german": "a las siete de la mañana"
        }
      ],
      "target_answer": "me levanto, te levantas, me acuesto, quiero levantarme, a las siete de la mañana",
      "meaning": "I get up, you get up (tú), I go to bed (o→ue), I want to get up (hooked -me!), at seven in the morning",
      "explanation": "Match the reflexive pronoun to the subject whether it stands before the verb or hooks onto the infinitive!",
      "id": "es2401_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Hook the 1st-person reflexive pronoun ('myself') onto 'levantar' to say 'to get (myself) up':",
      "tile_options": [
        "se",
        "te",
        "levantar",
        "me"
      ],
      "target_answer": "levantarme",
      "meaning": "levantarme (to get myself up)",
      "explanation": "When the subject is 'I', levantarse changes -se to -me: quiero levantarme.",
      "id": "es2401_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I want to go to bed now'?",
      "options": [
        "*Quiero acostarse ahora",
        "Quiero acostarme ahora (or Me quiero acostar ahora)",
        "*Quiero acuesto ahora"
      ],
      "target_answer": "Quiero acostarme ahora (or Me quiero acostar ahora)",
      "meaning": "I want to go to bed now",
      "explanation": "Because 'I' am the one going to bed, -se becomes -me: Quiero acostarme.",
      "id": "es2401_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I get up at seven in the morning'",
      "target_answer": "Me levanto a las siete de la mañana",
      "meaning": "I get up at seven in the morning",
      "word_bank": [
        "Te",
        "mañana",
        "la",
        "por",
        "de",
        "Me",
        "a",
        "las",
        "siete",
        "noche",
        "levanto"
      ],
      "explanation": "Me levanto + a las siete + de la mañana (use de la mañana when a specific clock hour is stated!).",
      "id": "es2401_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Me levanto a las siete",
      "replays": 2,
      "target_answer": "Me levanto a las siete",
      "meaning": "I get up at seven o'clock",
      "cues": [
        "Myself: Me",
        "I get up: levanto",
        "at seven: a las siete"
      ],
      "explanation": "Me levanto a las siete.",
      "affirmation": "Daily routine reflexive locked in!",
      "id": "es2401_e5"
    }
  ],
  "summary": {
    "outcome": "Describe morning-to-night routines and adapt reflexive pronouns on infinitives (levantarme, acostarme).",
    "use_example": {
      "german": "Me levanto a las siete de la mañana y quiero acostarme a las diez.",
      "english": "I get up at seven in the morning and I want to go to bed at ten."
    },
    "takeaway": "With a clock hour, 'in the morning / at night' uses de (a las siete de la mañana); without a clock hour, it uses por (por la mañana)!",
    "curiosity_teaser": "Up next ([2402] Non-Literal & Reciprocal Reflexives): see how irse means 'to leave' and nos vemos means 'we see each other'."
  },
  "twist": {
    "prompt": "Assemble: 'I am going to get up'",
    "target_answer": "Voy a levantarme",
    "word_bank": [
      "te",
      "levantarme",
      "Voy",
      "de",
      "a",
      "levantarse"
    ],
    "explanation": "Voy a levantarme (or Me voy a levantar)."
  }
};

export default lesson;
