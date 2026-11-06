import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 24,
  "slug": "reflexives-and-daily-life",
  "title": "Reflexives & Daily Life",
  "subtitle": "me llamo, levantarse, acostarse — reflexives as self-action and daily routine",
  "phase": 4,
  "shift_categories": [
    "pl_cl_fl_to_ll"
  ],
  "word_ids": [
    "levantarse",
    "acostarse",
    "llamar",
    "me_llamo",
    "me",
    "te",
    "se",
    "nos",
    "ocho",
    "siete"
  ],
  "table_word_ids": [
    "levantarse",
    "acostarse",
    "llamar",
    "me_llamo",
    "me",
    "te",
    "se",
    "nos",
    "ocho",
    "siete"
  ],
  "hook": {
    "title": "You Have Spoken Reflexive Spanish Since Day One!",
    "content": "Remember Me llamo Alex ('I call myself Alex') from your very first greeting branch? That is a reflexive verb! Whenever the dictionary form of a verb has **-se** hooked onto the end — like llamarse ('to call oneself'), levantarse ('to lift oneself / get up'), or acostarse ('to lay oneself down / go to bed') — the action reflects back onto the subject using **me** ('myself'), **te** ('yourself'), **se** ('himself/herself/usted/themselves'), and **nos** ('ourselves / each other')!"
  },
  "pattern": {
    "title": "Peeling Off '-se' and Putting It in Front",
    "content": "To conjugate levantarse ('to get up'): peel off -se, move it in front of the verb to match the person, and conjugate levantar normally: Yo **me levanto** ('I get up'), Tú **te levantas** ('You get up'), Él/Ella/Usted **se levanta**, Nosotros **nos levantamos**! And notice acostarse ('to go to bed'): it's an o→ue boot verb, so yo **me acuesto** ('I go to bed'), but nosotros **nos acostamos**!",
    "linguist_note": "Romance pronominal verbs cover true reflexives, reciprocals (nos vemos), and middle-voice changes of state (levantarse, dormirse).",
    "trap_note": "When a reflexive verb is an infinitive after quiero or voy a ('I want to get up' / 'I am going to get up'), remember to change -se to match the speaker: Quiero levantarme (or Me quiero levantar)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "to get up (lit. lift oneself)",
          "german": "levantarse"
        },
        {
          "id": "p2",
          "english": "I get up",
          "german": "me levanto"
        },
        {
          "id": "p3",
          "english": "to go to bed (lit. lay oneself down, o→ue)",
          "german": "acostarse"
        },
        {
          "id": "p4",
          "english": "I go to bed",
          "german": "me acuesto"
        },
        {
          "id": "p5",
          "english": "my name is (lit. I call myself)",
          "german": "me llamo"
        },
        {
          "id": "p6",
          "english": "we see each other",
          "german": "nos vemos"
        }
      ],
      "target_answer": "levantarse, me levanto, acostarse, me acuesto, me llamo, nos vemos",
      "meaning": "to get up (lit. lift oneself), I get up, to go to bed (lit. lay oneself down, o→ue), I go to bed, my name is (lit. I call myself), we see each other",
      "explanation": "Reflexive pronouns (me, te, se, nos) walk in front of conjugated verbs or hook onto infinitives.",
      "id": "es24_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish levantar ('to lift/raise', levantarse 'to get up from bed') comes from Latin levāre ('to make light / raise up'). Which English verb meaning 'to float or rise into the air' comes from the exact same root?",
      "target_answer": "levitate",
      "meaning": "when you 'me levanto' in the morning, you are literally 'levitating / elevating' yourself out of bed!",
      "explanation": "Latin levāre gave Spanish levantar (plus el levante 'where the sun rises') and English levitate and elevate.",
      "id": "es24_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I get up at seven o'clock'?",
      "options": [
        "Me levanto a las siete",
        "*Se levanto a las siete",
        "*Levanto a las siete"
      ],
      "target_answer": "Me levanto a las siete",
      "meaning": "I get up at seven o'clock",
      "explanation": "Without me, levanto means 'I lift [something else]'; to get yourself up, you need Me levanto!",
      "id": "es24_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I get up at eight'",
      "target_answer": "Me levanto a las ocho",
      "meaning": "I get up at eight o'clock",
      "word_bank": [
        "las",
        "Te",
        "ocho",
        "Me",
        "a",
        "levanto",
        "se",
        "el"
      ],
      "explanation": "Me + levanto + a las ocho ('at eight o'clock').",
      "id": "es24_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that we will see each other tomorrow ('We see each other tomorrow')",
      "cues": [
        "Each other / ourselves (1st pl.) → Nos",
        "we see (1st pl. of ver) → vemos",
        "tomorrow → mañana"
      ],
      "idea_parts": [
        "We see each other → Nos vemos",
        "tomorrow → mañana"
      ],
      "target_answer": "Nos vemos mañana",
      "meaning": "See you tomorrow (lit. We see each other tomorrow)",
      "word_bank": [
        "Nos",
        "mañana",
        "Se",
        "vemos",
        "ayer",
        "Me"
      ],
      "explanation": "¡Nos vemos mañana! — in plural, nos and se also express reciprocal 'each other'!",
      "diagnosis": {
        "slip": "used Me vemos",
        "cue": "For 'we see each other', pair 1st-person plural nos with vemos: Nos vemos mañana."
      },
      "id": "es24_e5"
    }
  ],
  "summary": {
    "outcome": "Conjugate reflexive verbs (levantarse, acostarse, llamarse) and use nos/se for reciprocal 'each other'.",
    "use_example": {
      "german": "Me levanto a las siete y nos vemos mañana.",
      "english": "I get up at seven and we'll see each other tomorrow."
    },
    "takeaway": "Without me/te/se/nos, you lift or lay someone else; with me/te/se/nos, you get up and go to bed yourself!",
    "curiosity_teaser": "Up next ([2401] Morning to Night Routine): chain reflexive verbs across a full day and hook pronouns onto infinitives."
  },
  "twist": {
    "prompt": "Assemble: 'What is your name? (How do you call yourself?)'",
    "target_answer": "Cómo te llamas",
    "word_bank": [
      "se",
      "me",
      "llamas",
      "llamo",
      "te",
      "Cómo"
    ],
    "explanation": "¿Cómo te llamas?"
  },
  "foreshadow": {
    "line": "Next in Topic 25: the famous inverted verb gustar ('me gusta el café' = 'the coffee pleases me')!",
    "resolvedIn": 25
  },
  "payoff": {
    "ofLesson": 23,
    "text": "The object pronouns me, te, nos from Topics 22–23 are the exact same pronouns used in reflexive verbs — only 3rd person changes to se!"
  }
};

export default lesson;
