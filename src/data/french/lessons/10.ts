import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 10,
  "slug": "avoir-and-the-lost-h",
  "title": "avoir & the H It Lost",
  "subtitle": "j'ai, tu as, il a, vous avez — plus the silent H doublets (hôtel/hospital, homme/human)",
  "phase": 1,
  "shift_categories": [
    "doublet"
  ],
  "word_ids": [
    "avoir",
    "jai",
    "as",
    "a",
    "avons",
    "avez",
    "hôtel",
    "hôpital",
    "homme",
    "hiver",
    "histoire",
    "pain",
    "eau",
    "ami"
  ],
  "table_word_ids": [
    "avoir",
    "jai",
    "as",
    "a",
    "avons",
    "avez",
    "hôtel",
    "hôpital",
    "homme",
    "hiver",
    "histoire",
    "pain",
    "eau",
    "ami"
  ],
  "hook": {
    "title": "The Letter French Writes Only for Memory",
    "content": "Latin habēre ('to have') lost its initial H and softened its b into v, becoming French avoir. In fact, French stopped pronouncing EVERY Latin H two thousand years ago — scribes only put the letter H back into spelling during the Middle Ages to remind readers of the Latin roots! Once you know that French H is silent, a whole row of words unlocks: l'homme (human), l'hôtel and l'hôpital (hospital), l'hiver (hibernate), l'histoire (history/story), l'heure (hour).",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why hôtel and hôpital wear a circumflex hat (ô)",
        "content": "Compare English 'hostel/hospital' with French hôtel/hôpital. Whenever Old French silenced an S before a T, scribes drew a tiny circumflex hat (ˆ) over the vowel to mark the vanished S!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "j'ai, tu as, il a, nous avons, vous avez",
    "content": "Because ai ('have') starts with a vowel, je drops its e: j'ai (/ʒe/, 'I have'). Then come tu as (/ty a/) and il/elle a (/il a/) — both pronounced /a/ because final -s is silent! In the plural, the v of avoir returns: nous avons ('we have') and vous avez ('you have'). And because French H is silent, words like hôtel, homme, and histoire trigger elision just like pure vowels: l'homme, l'hôtel, l'histoire.",
    "linguist_note": "Vulgar Latin *aio ('I have') contracted to ai; in liaison before a vowel, the dormant -s of nous avons and vous avez wakes up as /z/.",
    "trap_note": "The shortcut your mind will offer: saying 'je ai' as two words or breathing an English H into l'hôtel. Elide je + ai into one syllable j'ai (/ʒe/), and treat mute H exactly like a vowel!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each silent-H French word with its English cognate and meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "l'homme (man)",
          "german": "human / homage"
        },
        {
          "id": "p2",
          "english": "l'hôtel / l'hôpital",
          "german": "hostel / hospital"
        },
        {
          "id": "p3",
          "english": "l'hiver (winter)",
          "german": "hibernate"
        },
        {
          "id": "p4",
          "english": "l'histoire (story / history)",
          "german": "history"
        },
        {
          "id": "p5",
          "english": "l'heure (hour / time)",
          "german": "hour"
        }
      ],
      "target_answer": "human / homage, hostel / hospital, hibernate, history, hour",
      "meaning": "l'homme (man), l'hôtel / l'hôpital, l'hiver (winter), l'histoire (story / history), l'heure (hour / time)",
      "explanation": "Every Latin H is silent in French, so le/la elides to l' before all five.",
      "id": "fr10_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Fuse 'je' + 'ai' ('I have') using the elision rule:",
      "tile_options": [
        "je",
        "ai",
        "as",
        "j'"
      ],
      "target_answer": "j'ai",
      "meaning": "I have",
      "explanation": "je drops its vowel before ai → j'ai (/ʒe/).",
      "id": "fr10_e2"
    },
    {
      "type": "reverse_cognate",
      "prompt": "French hiver ('winter') shares its Latin root hībernum with which English verb for animals sleeping through winter?",
      "target_answer": "hibernate",
      "meaning": "hibernate ↔ l'hiver ('winter')",
      "explanation": "To hibernate is literally 'to winter' (Latin hībernāre).",
      "id": "fr10_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I have a good friend here",
      "cues": [
        "I have → J'ai (elided)",
        "a good friend → un bon ami",
        "here → ici"
      ],
      "idea_parts": [
        "possession → J'ai",
        "object → un bon ami",
        "location → ici"
      ],
      "target_answer": "J'ai un bon ami ici",
      "meaning": "I have a good friend here",
      "word_bank": [
        "Je",
        "bon",
        "J'ai",
        "ici",
        "ai",
        "un",
        "ami"
      ],
      "explanation": "J'ai un bon ami ici — in speech, the n of bon links smoothly onto ami.",
      "diagnosis": {
        "slip": "wrote Je ai without elision",
        "cue": "Always elide je + ai to J'ai."
      },
      "id": "fr10_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Vous avez une bonne histoire",
      "replays": 2,
      "target_answer": "Vous avez une bonne histoire",
      "meaning": "You have a good story",
      "cues": [
        "polite have: Vous avez",
        "feminine article + adj: une bonne",
        "silent-H noun: histoire"
      ],
      "explanation": "histoire means both 'history' and 'story'.",
      "affirmation": "You heard the /z/ liaison in Vous‿avez and the silent H of histoire.",
      "id": "fr10_e5"
    }
  ],
  "summary": {
    "outcome": "Conjugate avoir (j'ai, tu as, il a, nous avons, vous avez), negate it (je n'ai pas), and decode silent-H doublets.",
    "use_example": {
      "german": "J'ai rendez-vous à l'hôtel dans une heure.",
      "english": "I have an appointment at the hotel in an hour."
    },
    "takeaway": "French H is a silent ghost of Latin, and circumflex ˆ is the tombstone of a vanished S.",
    "curiosity_teaser": "Up next on Le Pont ([1001] The H-Drop Doublets): see how avoir & the H It Lost leads directly into The H-Drop Doublets."
  },
  "twist": {
    "prompt": "Ungraded — 'I don't have the confirmation' (wrap n'...pas around ai):",
    "target_answer": "Je n'ai pas la confirmation",
    "word_bank": [
      "la",
      "Je",
      "n'ai",
      "ne",
      "pas",
      "confirmation",
      "J'ai"
    ],
    "explanation": "When ne steps in before ai, je gets its vowel back and ne elides instead: Je n'ai pas!"
  },
  "foreshadow": {
    "line": "Having mastered avoir & the H It Lost, look ahead to Topic 11 (Adjectives & the Silent -s), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 11
  },
  "payoff": {
    "ofLesson": 9,
    "text": "The foundation from Topic 9 (vous & tu) now pays off directly inside avoir & the H It Lost: every sentence here builds on that earlier step."
  }
};

export default lesson;
