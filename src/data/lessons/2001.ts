import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2001,
  "slug": "methinks-and-dative-survivors",
  "title": "methinks & Dative Survivors",
  "subtitle": "English dative fossils mirrored in German — and the dem/den/dem grid row",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "mir",
    "ihm",
    "helfen",
    "danken",
    "geben",
    "gefallen",
    "glück",
    "mut",
    "wunsch",
    "wünschen",
    "jung",
    "stark",
    "schwach",
    "gesund"
  ],
  "table_word_ids": [
    "mir",
    "ihm",
    "helfen",
    "danken",
    "geben",
    "gefallen",
    "glück",
    "mut",
    "wunsch",
    "wünschen",
    "jung",
    "stark",
    "schwach",
    "gesund",
    "türkisch"
  ],
  "hook": {
    "title": "The Case English Buries and German Lives In",
    "content": "English keeps dative fossils the way amber keeps insects. Methinks — 'it seems TO ME'. 'Give it me' — the British phrasing where me is the receiver. 'Give it him' — Chaucer's still-living dative. Methinks' partner 'me seems' survives as 'seems to me'. German never buried the case: it is a load-bearing wall. Mir ist kalt (it is cold TO ME), Es gefällt mir (it falls well TO ME), Ich helfe dir (I help TO thee). Today you collect the fossils and set them beside their living German relatives.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The dem/den/dem Row",
        "content": "The dative article row: dem (masculine), der (feminine), dem (neuter), den (+ -n) plural. Masculine and neuter SHARE dem — and dem keeps the ancient m that the accusative softened to n (ihn, wen). English him, whom, and 'em all still wear that m."
      }
    ]
  },
  "pattern": {
    "title": "Fossil ↔ Living Word",
    "content": "Fossil one: methinks = mir dünkt's: 'it seems TO me' — the experiencer dative, alive in German as Mir ist kalt, Mir ist schlecht. Fossil two: 'give it me' ↔ Gib es mir — the receiver marked by case, not by preposition. Fossil three: 'me seems' / 'seems to me' ↔ Es scheint mir. Fossil four: wham — 'give it him' ↔ Gib es ihm. The pattern: wherever English once let the pronoun alone mark the receiver, German still does — mir, dir, ihm are the entire living system, three words doing the work of English prepositions.",
    "footnotes": [],
    "linguist_note": "The dative experiencer is German's favorite feeling-grammar: Mir ist kalt/langweilig/schlecht — cold, bored, and bad all happen TO you. English needs 'I am' phrases; German keeps the ancient 'it is X to-me' frame."
  },
  "exercises": [
    {
      "id": "l2001_e1",
      "type": "matching_pairs",
      "prompt": "Match each English fossil with its living German form:",
      "matching_pairs": [
        {
          "id": "md1",
          "english": "methinks (it seems to me)",
          "german": "Es scheint mir (it seems TO ME)"
        },
        {
          "id": "md2",
          "english": "give it me",
          "german": "Gib es mir"
        },
        {
          "id": "md3",
          "english": "give it him",
          "german": "Gib es ihm"
        },
        {
          "id": "md4",
          "english": "I give it thee",
          "german": "Ich gebe es dir"
        },
        {
          "id": "md5",
          "english": "luck",
          "german": "das Glück"
        },
        {
          "id": "md6",
          "english": "courage (mood's twin)",
          "german": "der Mut"
        }
      ],
      "target_answer": "Es scheint mir, Gib es mir, Gib es ihm, Ich gebe es dir, das Glück, der Mut",
      "meaning": "it seems to me, give it me, give it him, I give it thee, luck, courage",
      "explanation": "Every English dative fossil has a working German relative — the case never died on the continent. Glück and Mut are plain nouns; the dative sits on the person they reach: Ich wünsche dir Glück."
    },
    {
      "id": "l2001_e2",
      "type": "shift_select",
      "prompt": "Which article completes the dative row: 'mit _____ Mann' (with the man — masculine)?",
      "options": [
        "dem",
        "den",
        "der",
        "des"
      ],
      "target_answer": "dem",
      "meaning": "mit dem Mann — with the man (dative)",
      "explanation": "Masculine dative = dem — the same m you hear in him, whom, and 'em. Wünschen (wish — the twin) hands its gift TO someone: Ich wünsche dir Glück — the wish travels dative."
    },
    {
      "id": "l2001_e3",
      "type": "shift_select",
      "prompt": "'Ich helfe _____ Frau.' (I help the woman — dative):",
      "options": [
        "den",
        "der",
        "dem",
        "die"
      ],
      "target_answer": "der",
      "meaning": "Ich helfe der Frau = I help the woman",
      "explanation": "Feminine dative = der — the article that does double duty as 'to the' and 'the' (feminine). The fortress adjectives wait outside the case: jung, stark, schwach, gesund — they decline only before a noun; after sein (er ist jung) they stay bare."
    },
    {
      "id": "l2001_e4",
      "type": "pronoun_compression",
      "prompt": "Fold the repeated noun phrase into its compact pronoun:",
      "shift_hint": "Dative & Accusative Pronouns",
      "full_sentence": "Ich sehe das Buch und ich gebe dem Bruder das Buch",
      "compressed_parts": [
        {
          "noun": "dem Bruder",
          "pronoun": "ihm",
          "role": "dative receiver"
        },
        {
          "noun": "das Buch",
          "pronoun": "es",
          "role": "neuter object"
        }
      ],
      "word_bank": [
        "dem",
        "es",
        "gebe",
        "Bruder",
        "ihn",
        "Ich",
        "ihm"
      ],
      "target_answer": "Ich gebe es ihm",
      "meaning": "I give it to him",
      "explanation": "When both objects are pronouns, the accusative thing (es) steps ahead of the dative receiver (ihm): Ich gebe es ihm."
    },
    {
      "id": "l2001_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'I give it to him' (the German way — no 'to')",
      "target_answer": "Ich gebe es ihm",
      "meaning": "I give it him / to him",
      "word_bank": [
        "gebe",
        "Mut",
        "Ich",
        "es",
        "ihm",
        "Wunsch"
      ],
      "explanation": "The dative ihm does the job of English 'to him' — the case IS the preposition."
    }
  ],
  "summary": {
    "outcome": "Read English dative fossils and build German dative sentences with dem/der articles.",
    "use_example": {
      "german": "Ich gebe es ihm.",
      "english": "I give it him (to him)."
    },
    "takeaway": "methinks, 'give it me', 'give it him' — the dative never died in English, it just went fossil; German keeps it employed.",
    "curiosity_teaser": "Next: mir / dir / ihm Pronoun Gym — twenty give/tell/thank drills with the receiver pronouns."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from methinks & Dative Survivors (I give it him / to him):",
    "target_answer": "Ich gebe es ihm",
    "word_bank": [
      "ihm",
      "nicht",
      "gebe",
      "es",
      "heute",
      "Ich"
    ],
    "explanation": "Re-assembling \"Ich gebe es ihm\" from scratch locks in the structural pattern of methinks & Dative Survivors without relying on short-term echo."
  }
};

export default lesson;
