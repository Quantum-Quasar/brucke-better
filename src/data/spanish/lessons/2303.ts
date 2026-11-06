import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2303,
  "slug": "saber-vs-conocer",
  "title": "Saber vs Conocer",
  "subtitle": "Knowing facts and skills (sé nadar, sé dónde está) vs knowing people and places (conozco Madrid, conozco a María)",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "saber",
    "conocer",
    "dónde",
    "qué",
    "hablar",
    "hermano",
    "amigo",
    "ciudad",
    "a"
  ],
  "table_word_ids": [
    "saber",
    "conocer",
    "dónde",
    "qué",
    "hablar",
    "hermano",
    "amigo",
    "ciudad",
    "a"
  ],
  "hook": {
    "title": "Two Ways of 'Knowing' That English Blurs Together",
    "content": "In English, 'know' covers two completely different mental experiences: knowing a piece of information or a skill ('I know where it is, I know how to speak Spanish') vs being personally acquainted with a person or place ('I know María, I know Madrid'). Spanish gives each its own verb: **saber** (yo **sé** 'I know', tú sabes) for facts, information, and skills; and **conocer** (yo **conozco** 'I know/am familiar with', tú conoces) for people, places, and things you've met!",
    "footnotes": [
      {
        "marker": "1",
        "title": "What Happens When 'Saber' and 'Conocer' Enter the Preterite?",
        "content": "In the preterite (dot in time), conocí a María means 'I met María for the first time', and supe la verdad means 'I found out the truth'!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Two Golden Shortcuts: 'Sé + Infinitive' (No *Cómo!) & 'Conozco a + Person'",
    "content": "1) To say 'I know HOW to speak Spanish', Spanish uses **sé + bare infinitive** (Sé hablar español) — never insert *cómo!\n2) When conocer is followed by a person, always include the personal 'a' (Conozco a María); when followed by a city, no 'a' (Conozco Madrid)!",
    "trap_note": "Notice the tilde on yo sé ('I know'): with an accent, sé means 'I know'; without an accent, se is the reflexive/indirect pronoun!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "to know (facts, information, how to do something)",
          "german": "saber"
        },
        {
          "id": "p2",
          "english": "I know (fact / skill: 1st sg. of saber)",
          "german": "sé"
        },
        {
          "id": "p3",
          "english": "to know / be familiar with (people, places)",
          "german": "conocer"
        },
        {
          "id": "p4",
          "english": "I know / am acquainted with (1st sg. of conocer)",
          "german": "conozco"
        },
        {
          "id": "p5",
          "english": "I know where it is (fact/clause)",
          "german": "sé dónde está"
        },
        {
          "id": "p6",
          "english": "I know Madrid (place)",
          "german": "conozco Madrid"
        }
      ],
      "target_answer": "saber, sé, conocer, conozco, sé dónde está, conozco Madrid",
      "meaning": "to know (facts, information, how to do something), I know (fact / skill: 1st sg. of saber), to know / be familiar with (people, places), I know / am acquainted with (1st sg. of conocer), I know where it is (fact/clause), I know Madrid (place)",
      "explanation": "saber (sé) = facts, clauses, and skills (+ infinitive); conocer (conozco) = people (with 'a') and places.",
      "id": "es2303_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish conocer ('to be familiar/acquainted with', from Latin cognōscere) shares its root with which formal English adjective meaning 'aware or having knowledge of'?",
      "target_answer": "cognizant",
      "meaning": "cognizant and recognize come from the exact same Latin root as conocer!",
      "explanation": "Latin cognōscere gave Spanish conocer and English cognizant, recognize, reconnaissance.",
      "id": "es2303_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I know how to speak Spanish' in natural Spanish?",
      "options": [
        "*Conozco hablar español",
        "*Sé cómo hablar español",
        "Sé hablar español"
      ],
      "target_answer": "Sé hablar español",
      "meaning": "I know how to speak Spanish",
      "explanation": "saber + bare infinitive already means 'to know how to [verb]' — never add *cómo!",
      "id": "es2303_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I know Madrid and I know your brother'",
      "target_answer": "Conozco Madrid y conozco a tu hermano",
      "meaning": "I know Madrid and I know your brother",
      "word_bank": [
        "a",
        "el",
        "tú",
        "Madrid",
        "y",
        "tu",
        "Conozco",
        "hermano",
        "conozco",
        "Sé"
      ],
      "explanation": "Conozco Madrid (city = no 'a') y conozco a tu hermano (person = personal 'a'!).",
      "id": "es2303_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you don't know where the station is",
      "cues": [
        "I don't know (fact/question clause → saber) → No sé",
        "where is (location) → dónde está",
        "the station → la estación"
      ],
      "idea_parts": [
        "I don't know → No sé",
        "where the station is → dónde está la estación"
      ],
      "target_answer": "No sé dónde está la estación",
      "meaning": "I don't know where the station is",
      "word_bank": [
        "dónde",
        "No",
        "conozco",
        "se",
        "estación",
        "sé",
        "es",
        "la",
        "está"
      ],
      "explanation": "No sé dónde está la estación — notice sé ('I know') wears an accent mark to distinguish it from se ('himself/herself')!",
      "diagnosis": {
        "slip": "used conozco before dónde",
        "cue": "Before a question word or clause (qué, dónde, por qué, que...), always use saber (No sé dónde está)."
      },
      "id": "es2303_e5"
    }
  ],
  "summary": {
    "outcome": "Distinguish saber (sé: facts, clauses, and skills + infinitive) from conocer (conozco: people and places).",
    "use_example": {
      "german": "Conozco Madrid, conozco a tu amigo y sé dónde está el restaurante.",
      "english": "I know Madrid, I know your friend, and I know where the restaurant is."
    },
    "takeaway": "Facts, clauses, and infinitives take saber (sé); people and places take conocer (conozco).",
    "curiosity_teaser": "Up next ([24] Reflexives & Daily Life): see how me, te, se, nos turn actions back on the speaker in daily life."
  },
  "twist": {
    "prompt": "Assemble: 'Do you know where it is?'",
    "target_answer": "Sabes dónde está",
    "word_bank": [
      "dónde",
      "es",
      "Sé",
      "está",
      "Conoces",
      "Sabes"
    ],
    "explanation": "¿Sabes dónde está? uses saber before a clause."
  }
};

export default lesson;
