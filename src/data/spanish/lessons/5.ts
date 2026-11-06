import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5,
  "slug": "ser-estar-two-beings",
  "title": "Ser & Estar: The Two Beings",
  "subtitle": "es (characteristic) vs está (state/location) — the two ways Spanish sees existence",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "ser",
    "estar",
    "soy",
    "eres",
    "es",
    "estoy",
    "estás",
    "está",
    "muy",
    "bueno",
    "contento",
    "caliente"
  ],
  "table_word_ids": [
    "ser",
    "estar",
    "soy",
    "eres",
    "es",
    "estoy",
    "estás",
    "está",
    "muy",
    "bueno",
    "contento",
    "caliente"
  ],
  "hook": {
    "title": "Two Ways of Looking at Existence",
    "content": "English collapses two very different thoughts into one word: 'is'. 'Coffee is a plant' (its essential nature) and 'The coffee is hot' (its current state) use the exact same verb. Spanish makes a crystal-clear distinction: ser (soy, eres, es) for what something IS by nature or identity, and estar (estoy, estás, está) for how or where something STANDS right now!"
  },
  "pattern": {
    "title": "Forget 'Permanent vs Temporary' — Think Essence vs State",
    "content": "Language Transfer warns against the old textbook rule 'permanent vs temporary'. Why? Because a person who has died is permanently dead, yet Spanish says está muerto ('is dead' — a state resulting from change), and a stadium is permanently in Madrid, yet Spanish says está en Madrid ('stands in Madrid' — a location)! Instead, ask: Is it an identity/characteristic (ser → es), or is it a state/location (estar, from Latin stāre 'to stand' → está)?",
    "linguist_note": "Latin esse fused with sedēre to form ser; Latin stāre ('to stand') formed estar.",
    "trap_note": "Never use ser for physical location of people or objects! Even if a house never moves, its location takes estar: La casa está aquí."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "to be (identity / characteristic)",
          "german": "ser"
        },
        {
          "id": "p2",
          "english": "to be (state / location)",
          "german": "estar"
        },
        {
          "id": "p3",
          "english": "I am (identity: ser)",
          "german": "soy"
        },
        {
          "id": "p4",
          "english": "I am (state/location: estar)",
          "german": "estoy"
        },
        {
          "id": "p5",
          "english": "is (characteristic: ser)",
          "german": "es"
        },
        {
          "id": "p6",
          "english": "is (state/location: estar)",
          "german": "está"
        }
      ],
      "target_answer": "ser, estar, soy, estoy, es, está",
      "meaning": "to be (identity / characteristic), to be (state / location), I am (identity: ser), I am (state/location: estar), is (characteristic: ser), is (state/location: estar)",
      "explanation": "ser (soy, eres, es) names identity and inherent traits; estar (estoy, estás, está) names state and location.",
      "id": "es5_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish 'estar' ('to be in a condition or location') comes from Latin 'stāre' ('to stand'). Which common five-letter English noun meaning 'condition' comes from the exact same Latin root?",
      "target_answer": "state",
      "meaning": "estar literally tells you what 'state' or 'station' something is in!",
      "explanation": "Latin stāre ('to stand') gave English state, status, station, and Spanish estar.",
      "id": "es5_e2"
    },
    {
      "type": "shift_select",
      "prompt": "The coffee is hot right now (a thermal state). How do you say 'The coffee is hot'?",
      "options": [
        "El café está caliente",
        "El café está bueno",
        "El café es caliente"
      ],
      "target_answer": "El café está caliente",
      "meaning": "The coffee is hot",
      "explanation": "Hotness of a cup of coffee is its current state, so Spanish uses está: El café está caliente.",
      "id": "es5_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you are very happy (emotional state, masculine speaker)",
      "cues": [
        "happiness is a state, so use estoy ('I am')",
        "very is muy",
        "happy/content is contento"
      ],
      "idea_parts": [
        "I am (state) → Estoy",
        "very → muy",
        "happy → contento"
      ],
      "target_answer": "Estoy muy contento",
      "meaning": "I am very happy",
      "word_bank": [
        "contento",
        "es",
        "Soy",
        "Estoy",
        "muy",
        "caliente",
        "bueno"
      ],
      "explanation": "Estoy muy contento — emotions and moods are states, so they take estar.",
      "diagnosis": {
        "slip": "used Soy instead of Estoy",
        "cue": "Being happy/content is how you feel (your state), so use Estoy muy contento."
      },
      "id": "es5_e4"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish 'El café está caliente'?",
      "german": "El café está caliente",
      "natural": "The coffee is hot",
      "options": [
        "The coffee is essence hot",
        "The coffee stands hot",
        "The coffee is hot",
        "Hot is the coffee"
      ],
      "target_answer": "The coffee stands hot",
      "meaning": "The coffee is hot (literal Spanish blueprint: The coffee stands hot)",
      "explanation": "Because estar comes from Latin stāre ('to stand'), El café está caliente literally pictures the coffee standing in a hot state.",
      "id": "es5_e5"
    }
  ],
  "summary": {
    "outcome": "Distinguish identity/characteristic (ser: soy, eres, es) from state/location (estar: estoy, estás, está).",
    "use_example": {
      "german": "El café es bueno y está caliente.",
      "english": "The coffee is good (quality) and it is hot (state)."
    },
    "takeaway": "ser = what something is (essence); estar = how or where something stands (state and location).",
    "curiosity_teaser": "Up next ([501] Es vs Está Gym): contrast es and está across locations and traits."
  },
  "twist": {
    "prompt": "Assemble: 'It is not good (characteristic)'",
    "target_answer": "No es bueno",
    "word_bank": [
      "es",
      "caliente",
      "bueno",
      "muy",
      "está",
      "No"
    ],
    "explanation": "No es bueno negates characteristic es."
  },
  "payoff": {
    "ofLesson": 4,
    "text": "Negating ser and estar follows the exact same clean rule from Topic 4: simply put no first — no es, no está."
  }
};

export default lesson;
