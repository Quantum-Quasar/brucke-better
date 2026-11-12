import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2903,
  "slug": "mir-ist-kalt-dative-feelings",
  "title": "Mir ist kalt: Dative Feelings",
  "subtitle": "Dative-experiencer expressions — five drills for cold, bored, and sorry",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "mir",
    "dir",
    "ihm",
    "sein",
    "kalt",
    "gut",
    "tun",
    "übel",
    "schlecht",
    "fertig",
    "lustig",
    "langweilig",
    "leute",
    "himmel",
    "mensch",
    "meer",
    "urlaub"
  ],
  "table_word_ids": [
    "mir",
    "dir",
    "ihm",
    "kalt",
    "sein",
    "gut",
    "tun",
    "übel",
    "schlecht",
    "fertig",
    "lustig",
    "langweilig",
    "leute",
    "himmel",
    "mensch",
    "meer",
    "urlaub"
  ],
  "hook": {
    "title": "Feelings Happen To You",
    "content": "English says I AM cold. German says it is cold TO ME: Mir ist kalt. I am bored? — Mir ist langweilig (to-me it is boring). I am sorry? — Es tut mir leid (it does me sorrow). The pattern is ancient: the experiencer is a receiver, not an actor — feelings arrive, they are not performed. English used to agree: methinks, 'me seems', 'it grieves me'. German kept the whole grammar of being-affected: mir, dir, ihm — and twelve expressions you will use every week.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Weather Is Also Dative",
        "content": "Notice what is really cold: ES ist kalt — 'it', the impersonal subject. The German sentence has no 'I' as subject at all: Es (the situation) ist (is) mir (to-me) kalt (cold). You are not the cold thing; you are the one the cold happens to. Exactly like methinks: it thinks itself to me."
      }
    ]
  },
  "pattern": {
    "title": "The Feeling Fridge",
    "content": "Temperature: Mir ist kalt / warm / heiß (to-me it is cold/warm/hot). States: Mir ist langweilig (bored), Mir ist schlecht (I feel sick), Mir ist schwindlig (dizzy); for well-being say 'es geht mir gut'. Sorrow: Es tut mir leid (it does me sorrow — I am sorry). Recipient: Das tut mir weh (that does me pain — that hurts). Grammar recipe: [Es] + ist/tut + [dative pronoun] + [the feeling]. Swap mir for dir/ihm and you can diagnose anyone: Ist dir kalt? (are YOU cold — to-thee?).",
    "footnotes": [],
    "linguist_note": "These are the same dative-experiencer constructions English kept only in fossils ('me seems', 'it grieves me to say'). German's everyday emotional vocabulary is grammatically archaic English — and fully alive."
  },
  "exercises": [
    {
      "id": "l2903_e1",
      "type": "matching_pairs",
      "prompt": "The feeling fridge — match each expression with its literal reading. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "mk1",
          "english": "It is cold to me (I'm cold)",
          "german": "Mir ist kalt"
        },
        {
          "id": "mk2",
          "english": "It is boring to me (I'm bored)",
          "german": "Mir ist langweilig"
        },
        {
          "id": "mk3",
          "english": "It does me sorrow (I'm sorry)",
          "german": "Es tut mir leid"
        },
        {
          "id": "mk4",
          "english": "It does me pain (that hurts)",
          "german": "Das tut mir weh"
        },
        {
          "id": "mk5",
          "english": "It is unwell to me (I feel sick)",
          "german": "Mir ist übel"
        },
        {
          "id": "recall1",
          "german": "Die Leute sind hier",
          "english": "The people are here"
        },
        {
          "id": "recall1b",
          "german": "ein Mensch mit Hoffnung",
          "english": "a person with hope"
        },
        {
          "id": "recall2",
          "german": "Das Wetter ist schlecht",
          "english": "The weather is bad"
        },
        {
          "id": "recall2b",
          "german": "Ich bin fertig",
          "english": "I am finished"
        },
        {
          "id": "recall3",
          "german": "lustig und langweilig",
          "english": "funny and boring"
        },
        {
          "id": "recall4",
          "german": "Wir können tun",
          "english": "We can do"
        }
      ],
      "target_answer": "Mir ist kalt, Mir ist langweilig, Es tut mir leid, Das tut mir weh, Mir ist übel, Die Leute sind hier, ein Mensch mit Hoffnung, Das Wetter ist schlecht, Ich bin fertig, lustig und langweilig, Wir können tun",
      "meaning": "It is cold to me (I'm cold); It is boring to me (I'm bored); It does me sorrow (I'm sorry); It does me pain (that hurts); It is unwell to me (I feel sick); The people are here; a person with hope; The weather is bad; I am finished; funny and boring; We can do",
      "explanation": "Feelings arrive at the dative — you are the receiver, never the performer. übel is the oldest of the lot: evil, unwell."
    },
    {
      "id": "l2903_e2",
      "type": "shift_select",
      "prompt": "Diagnose a friend: 'Ist _____ kalt?' (Are YOU cold — to-thee?):",
      "options": [
        "du",
        "dein",
        "dir",
        "dich"
      ],
      "target_answer": "dir",
      "meaning": "Ist dir kalt? = Are you cold (is it cold to-thee)?",
      "explanation": "The experiencer dative swaps with the person: mir → dir → ihm. dich would make you the object — nobody 'coldens' you. The dative judges state: mir ist schlecht, mir ist lustig — Bist du fertig? stays sein's."
    },
    {
      "id": "l2903_e3",
      "type": "shift_select",
      "prompt": "'Es tut mir leid' — which ancient verb hides in 'tut'?",
      "options": [
        "guilt",
        "dare",
        "good",
        "do (tun ↔ do — 'it does me sorrow')"
      ],
      "target_answer": "do (tun ↔ do — 'it does me sorrow')",
      "meaning": "tun ↔ do: the oldest verb twin",
      "explanation": "The apology is an English sentence: 'it does me sorrow'. The do-support English invented — this is the same verb."
    },
    {
      "id": "l2903_e4",
      "type": "derive",
      "prompt": "Swap the experiencer: 'Mir ist kalt' for him (TO HIM it is cold):",
      "english_hint": "the dative of er",
      "target_answer": "ihm",
      "meaning": "Ihm ist kalt = He is cold (to-him it is cold)",
      "explanation": "Ihm — the dative of er, the twin of English 'give it him'. Feelings transfer person to person with one word. Der Mensch is the experiencer, die Leute the crowd, der Himmel the sky — the whole dative cast."
    },
    {
      "id": "l2903_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'I am sorry, but it is boring'",
      "target_answer": "Es tut mir leid aber es ist langweilig",
      "meaning": "I am sorry, but it is boring",
      "vocab_hints": [
        {
          "word": "am Meer",
          "translation": "at the sea",
          "note": "am Meer — the place the wind comes from, and the place the Urlaub goes: Am Meer ist mir kalt, im Urlaub ist mir gut."
        }
      ],
      "word_bank": [
        "langweilig",
        "aus",
        "leid",
        "gut",
        "ist",
        "es",
        "tut",
        "mir",
        "Es",
        "aber"
      ],
      "explanation": "Two experiencer frames in one sentence — tut mir leid (it does me sorrow) and ist langweilig (it is boring to-me, mir implied). Add the place and the same frame covers the coast: Am Meer ist mir kalt — at the sea it is cold to me; im Urlaub ist mir gut — on holiday it goes well for me."
    }
  ],
  "summary": {
    "outcome": "Use the dative-experiencer expressions for cold, bored, sorry, and hurt.",
    "use_example": {
      "german": "Es tut mir leid, aber mir ist kalt.",
      "english": "I'm sorry, but I'm cold."
    },
    "takeaway": "Feelings happen TO you: mir ist kalt/langweilig, es tut mir leid — the methinks grammar, alive and daily.",
    "curiosity_teaser": "Next: the Capstone sprigs — the full Berlin reading with tap-to-inspect words and the whole-trail review game."
  },
  "twist": {
    "prompt": "Without looking back — build in German: \"Today that is very good\"",
    "target_answer": "Heute ist das sehr gut",
    "word_bank": [
      "nicht",
      "das",
      "sehr",
      "gut",
      "ist",
      "sehr",
      "Heute"
    ],
    "explanation": "Building \"Heute ist das sehr gut\" from the lesson's core pattern locks in Mir ist kalt: Dative Feelings."
  }
};

export default lesson;
