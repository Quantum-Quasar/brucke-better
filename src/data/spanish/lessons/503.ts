import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 503,
  "slug": "chameleon-adjectives-ser-estar",
  "title": "Chameleon Adjectives: listo, aburrido & rico",
  "subtitle": "How ser vs estar flips adjective meaning: es listo (clever) vs está listo (ready), es aburrido (boring) vs está aburrido (bored), es rico (rich) vs está rico (delicious)",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "listo",
    "aburrido",
    "rico",
    "seguro",
    "bueno",
    "ser",
    "estar",
    "es",
    "está",
    "estoy"
  ],
  "table_word_ids": [
    "listo",
    "aburrido",
    "rico",
    "seguro",
    "bueno",
    "ser",
    "estar",
    "es",
    "está",
    "estoy"
  ],
  "hook": {
    "title": "When the Verb Flips the Adjective's Meaning",
    "content": "Here is where the philosophy of ser (characteristic/essence) vs estar (current state) shines brightest. Take a single Spanish adjective like listo, aburrido, rico, or seguro. Pair it with ser and it names a trait; pair it with estar and it names a state — creating two completely different English words!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why English Needs '-ing' and '-ed' Where Spanish Uses Ser/Estar",
        "content": "In English, 'boring' (what causes the quality) and 'bored' (how you feel right now) require two different participle endings. In Spanish, one word (aburrido) does both jobs simply by switching from es to está!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Four Famous Chameleons",
    "content": "1) listo: es listo = 'he is clever/sharp' (trait) vs está listo = 'he is ready' (state).\n2) aburrido: es aburrido = 'he is boring' (trait — what he is like) vs está aburrido = 'he is bored' (state — how he feels).\n3) rico: es rico = 'he is rich/wealthy' vs ¡está rico! = 'it tastes delicious!'\n4) seguro: es seguro = 'it is safe' vs estoy seguro = 'I am sure/certain'!",
    "trap_note": "If you want to say 'I am bored', never say *Soy aburrido — that announces to the room 'I am a boring person'! Always say Estoy aburrido/a."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "he is clever / smart (trait)",
          "german": "es listo"
        },
        {
          "id": "p2",
          "english": "he is ready (state)",
          "german": "está listo"
        },
        {
          "id": "p3",
          "english": "it is boring (trait)",
          "german": "es aburrido"
        },
        {
          "id": "p4",
          "english": "he is bored (state)",
          "german": "está aburrido"
        },
        {
          "id": "p5",
          "english": "he is wealthy (trait)",
          "german": "es rico"
        },
        {
          "id": "p6",
          "english": "it tastes delicious! (state)",
          "german": "está rico"
        }
      ],
      "target_answer": "es listo, está listo, es aburrido, está aburrido, es rico, está rico",
      "meaning": "he is clever / smart (trait), he is ready (state), it is boring (trait), he is bored (state), he is wealthy (trait), it tastes delicious! (state)",
      "explanation": "ser vs estar does the work that English does with completely different words (clever/ready, boring/bored, rich/delicious).",
      "id": "es503_e1"
    },
    {
      "type": "shift_select",
      "prompt": "You are at the door with your coat on. How do you say 'I am ready' (male speaker)?",
      "options": [
        "Soy listo",
        "Estoy listo",
        "Estoy rico"
      ],
      "target_answer": "Estoy listo",
      "meaning": "I am ready",
      "explanation": "Being ready is a current state (Estoy listo); saying Soy listo claims 'I am clever/smart'!",
      "id": "es503_e2"
    },
    {
      "type": "shift_select",
      "prompt": "You take a bite of cake and want to say 'The cake is delicious!'. Which verb makes rico mean 'delicious'?",
      "options": [
        "El pastel soy rico",
        "El pastel es muy rico",
        "El pastel está muy rico"
      ],
      "target_answer": "El pastel está muy rico",
      "meaning": "The cake is delicious",
      "explanation": "With food, está rico / está bueno means 'it tastes delicious'; es rico means 'wealthy'.",
      "id": "es503_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I am sure (male speaker)'",
      "target_answer": "Estoy seguro",
      "meaning": "I am sure / certain",
      "word_bank": [
        "Soy",
        "aburrido",
        "seguro",
        "listo",
        "Estoy"
      ],
      "explanation": "Estoy seguro = 'I am sure/certain' (state of mind); Es seguro = 'It is safe'.",
      "id": "es503_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you are ready (female speaker: lista)",
      "cues": [
        "ready takes estar → Estoy",
        "feminine of listo → lista"
      ],
      "idea_parts": [
        "I am (state) → Estoy",
        "ready (fem.) → lista"
      ],
      "target_answer": "Estoy lista",
      "meaning": "I am ready (female speaker)",
      "word_bank": [
        "listo",
        "segura",
        "Soy",
        "Estoy",
        "rica",
        "lista"
      ],
      "explanation": "Estoy lista — estar makes lista mean 'ready' rather than 'clever'.",
      "diagnosis": {
        "slip": "used Soy lista",
        "cue": "Soy lista means 'I am clever'; for 'I am ready', use Estoy lista."
      },
      "id": "es503_e5"
    }
  ],
  "summary": {
    "outcome": "Flip adjective meaning between trait and state by pairing listo, aburrido, rico, and seguro with ser vs estar.",
    "use_example": {
      "german": "Estoy listo y el pastel está muy rico.",
      "english": "I am ready and the cake is delicious."
    },
    "takeaway": "Where English uses -ing vs -ed ('boring' vs 'bored'), Spanish uses es aburrido vs está aburrido!",
    "curiosity_teaser": "Up next ([6] The -dad & -mente Bridges): convert -ty nouns to -dad and -ly adverbs to -mente."
  },
  "twist": {
    "prompt": "Assemble: 'He is bored'",
    "target_answer": "Está aburrido",
    "word_bank": [
      "Es",
      "Está",
      "rico",
      "aburrido",
      "listo"
    ],
    "explanation": "Está aburrido = 'He is bored' (current feeling); Es aburrido = 'He is boring'."
  }
};

export default lesson;
