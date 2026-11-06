import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 23,
  "slug": "pronouns-walk-left",
  "title": "Pronouns Walk Left",
  "subtitle": "me, te, le, la, nous, vous, lui, leur — direct and indirect object pronouns walking left of the verb",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "me",
    "te",
    "le",
    "la",
    "nous",
    "vous",
    "lui",
    "leur",
    "voir",
    "parler",
    "comprendre",
    "donné"
  ],
  "table_word_ids": [
    "me",
    "te",
    "le",
    "la",
    "nous",
    "vous",
    "lui",
    "leur",
    "voir",
    "parler",
    "comprendre",
    "donné"
  ],
  "hook": {
    "title": "Completing the Left-Walk You Started in Lesson 1",
    "content": "In Lesson 1 you discovered that French puts 'it' before the verb: Je le veux ('I it want'). Now you can drop every human pronoun into that exact same slot! For 'me, you, us, you all', one set of pronouns does BOTH jobs (direct 'me' and indirect 'to me'): me ('me / to me'), te ('you / to you'), nous ('us / to us'), vous ('you / to you'). Je te vois ('I see you'). Tu me parles ('You speak to me'). Il nous comprend ('He understands us').",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why lui means BOTH 'to him' and 'to her'",
        "content": "In the 3rd person, French separates direct objects (le 'him/it', la 'her/it', les 'them') from indirect 'to' objects: lui means BOTH 'to him' AND 'to her', and leur means 'to them'! Je lui parle can mean 'I speak to him' or 'I speak to her'!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Direct (le/la/les) vs. Indirect 'To' (lui/leur)",
    "content": "Ask one question about the verb: does it act directly on the person (voir 'to see someone', écouter 'to listen to someone'), or does it send words/things TO the person (parler à 'to speak to', donner à 'to give to', répondre à 'to answer to')? Direct takes le (him), la (her), les (them): Je le vois, je la vois. Indirect 'to' takes gender-neutral lui (to him / to her) and leur (to them, never with an -s!): Je lui parle, je leur donne le livre.",
    "linguist_note": "Latin dative singular illī ('to that one', identical for masculine and feminine in Latin!) became French lui, which is why lui is completely gender-neutral.",
    "trap_note": "The shortcut your mind will offer: adding an -s to leur when it means 'to them' before a verb (*Je leurs parle). Before a verb, leur NEVER takes an -s!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each pre-verbal object pronoun with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "me (or m' before vowel)",
          "german": "me / to me"
        },
        {
          "id": "p2",
          "english": "te (or t' before vowel)",
          "german": "you / to you (informal)"
        },
        {
          "id": "p3",
          "english": "le / la / les",
          "german": "him, her, it, them (direct)"
        },
        {
          "id": "p4",
          "english": "lui (gender-neutral!)",
          "german": "to him / to her"
        },
        {
          "id": "p5",
          "english": "leur (no -s before a verb)",
          "german": "to them"
        }
      ],
      "target_answer": "me / to me, you / to you (informal), him, her, it, them (direct), to him / to her, to them",
      "meaning": "me (or m' before vowel), te (or t' before vowel), le / la / les, lui (gender-neutral!), leur (no -s before a verb)",
      "explanation": "me/te/nous/vous cover both direct and indirect; 3rd person splits le/la/les from lui/leur.",
      "id": "fr23_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word structure of 'Je te comprends très bien'?",
      "german": "Je te comprends très bien",
      "natural": "I understand you very well",
      "options": [
        "I to-you understand very well",
        "I understand you very well",
        "I you understand very well"
      ],
      "target_answer": "I you understand very well",
      "meaning": "Literal structure: I you understand very well",
      "explanation": "te ('you') steps left of comprends: 'I you understand very well'.",
      "id": "fr23_e2"
    },
    {
      "type": "shift_select",
      "prompt": "You want to say 'I am speaking to her' (parler à quelqu'un). Which pronoun goes before parle?",
      "options": [
        "Je lui parle",
        "Je elle parle",
        "Je la parle"
      ],
      "target_answer": "Je lui parle",
      "meaning": "I speak to her (or to him)",
      "explanation": "Because parler takes à ('speak TO someone'), it uses the indirect pronoun lui — which covers both 'to him' and 'to her'!",
      "id": "fr23_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "do you understand me",
      "cues": [
        "You me understand → Tu me comprends"
      ],
      "idea_parts": [
        "subject → Tu",
        "object pronoun before verb → me",
        "verb → comprends"
      ],
      "target_answer": "Tu me comprends",
      "meaning": "Do you understand me?",
      "word_bank": [
        "Tu",
        "comprends",
        "me",
        "moi",
        "comprendre"
      ],
      "explanation": "me walks left in front of comprends: Tu me comprends ?",
      "diagnosis": {
        "slip": "put moi after comprends",
        "cue": "Unstressed object pronouns walk before the verb: Tu me comprends."
      },
      "id": "fr23_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je lui ai donné le livre",
      "replays": 2,
      "target_answer": "Je lui ai donné le livre",
      "meaning": "I gave him/her the book",
      "cues": [
        "Subject + to-him/her + have: Je lui ai",
        "given the book: donné le livre"
      ],
      "explanation": "In the passé composé, the pronoun walks in front of the auxiliary avoir: Je lui ai donné.",
      "affirmation": "You placed lui right before ai donné!",
      "id": "fr23_e5"
    }
  ],
  "summary": {
    "outcome": "Place direct (me, te, le, la, nous, vous) and indirect (lui, leur) pronouns before the verb or auxiliary.",
    "use_example": {
      "german": "Je le vois et je lui parle.",
      "english": "I see him and I speak to him/her."
    },
    "takeaway": "le/la is direct ('him/her'); lui is indirect ('to him / to her') — and both walk left of the verb.",
    "curiosity_teaser": "Up next on Le Pont ([2301] The Full Left-Walk): see how Pronouns Walk Left leads directly into The Full Left-Walk."
  },
  "twist": {
    "prompt": "Ungraded — 'He does not see us' (wrap ne...pas around nous voit):",
    "target_answer": "Il ne nous voit pas",
    "word_bank": [
      "on",
      "pas",
      "voir",
      "nous",
      "ne",
      "Il",
      "voit"
    ],
    "explanation": "The negation sandwich hugs both the object pronoun and the verb: Il ne nous voit pas."
  },
  "foreshadow": {
    "line": "Having mastered Pronouns Walk Left, look ahead to Topic 24 (Reflexives & la Routine), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 24
  },
  "payoff": {
    "ofLesson": 22,
    "text": "The foundation from Topic 22 (en & y) now pays off directly inside Pronouns Walk Left: every sentence here builds on that earlier step."
  }
};

export default lesson;
