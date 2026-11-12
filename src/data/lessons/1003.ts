import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1003,
  "slug": "articles-are-pronouns-in-disguise",
  "title": "The Articles Are Pronouns in Disguise",
  "subtitle": "die is D- + sie, der is D- + er, das is D- + es — and the pronoun test never stops working",
  "phase": 2,
  "shift_categories": [
    "th_to_d"
  ],
  "word_ids": [
    "der",
    "die",
    "das",
    "tisch",
    "hand",
    "buch"
  ],
  "table_word_ids": [
    "der",
    "die",
    "das",
    "tisch",
    "hand",
    "buch",
    "gras",
    "dieb",
    "denn",
    "schulter",
    "bitte",
    "erst",
    "tauen",
    "dann",
    "stiefvater",
    "freundschaft"
  ],
  "hook": {
    "title": "Every German 'the' is somebody you already know",
    "content": "You have spent two lessons meeting the accusative through pronouns: er becomes ihn, just as English 'he' becomes 'him'. Here is the bigger secret underneath it. The three German words for 'the' are not three unrelated words to memorise — they are the pronouns you already speak, wearing a D- hat.\n\nLong ago, English said the so softly that it rhymed with 'thee' — the same throaty TH you still hear if you insist on it. German took that sound and hardened it into D, exactly as it did in think → denken and thank → danken. So the first half of every German article is a D, and the second half is a pronoun you own outright:\n\n· die = D- + sie (she / they)\n· der = D- + er (he)\n· das = D- + es (it)\n\nThat is the whole nominative grid. Three words, no memorising — and the reason it matters is that it never stops working. The pronoun test you used for the accusative is the same test the dative, the genitive and every adjective ending will use again. Today you install the decoder; topics 11 and 19 spend the rest of the trail cashing it in.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why a D?",
        "content": "The Proto-Indo-European demonstrative that became English 'the' had an initial dental fricative. High German hardened it to a stop — the very same shift that gives think/denken and thou/du. So the D- in der/die/das is the TH- of 'the', hardened."
      }
    ],
    "linguist_note": "Read it aloud the literal way: 'the woman' is the-she, 'the man' is the-he, 'the child' is the-it. That is genuinely how the forms are built."
  },
  "pattern": {
    "title": "Read the article as D- plus a pronoun",
    "content": "Take the noun, ask which pronoun German would use in its place, and the article answers itself:\n\n· die Hand — she → D- + sie → die\n· der Tisch — he → D- + er → der\n· das Buch — it → D- + es → das\n\nYou already did this for the accusative without noticing: 'can you clean the kitchen?' — can you clean *her*? She, not her, so the article stays die. 'I see the man' — I see *him*? Him, not he, so the article moves to den. That is the Him-Case from topic 10, and it is the same pronoun test, pointed at a different job.\n\nNotice what you are *not* doing: you are not memorising a three-column table. German speakers did not memorise one either — they built these words out of parts they already had. One D, three pronouns, done.\n\nTwo more load-bearing laws sit right inside this same D- + pronoun frame: first, 'die' deliberately does two jobs at once — it is the feminine singular article (die Frau = D- + sie 'she') AND the universal plural article for all three genders (die Bücher = D- + sie 'they'). Second, the Genitive case ('of the') follows the exact same D- + pronoun recipe: masculine and neuter take 'des' (D- + seiner/es, adding -s/-es to the noun: das Haus des Bruders = 'the house of the brother'), while feminine and plural take 'der' (D- + ihrer: das Buch der Frau = 'the book of the woman').",
    "footnotes": [
      {
        "marker": "1",
        "title": "The plural rides along",
        "content": "Because English 'they' and 'she' both collapse into German sie, the feminine article die ends up doing two jobs: die Hand (the hand), and later the plural of every she-word. One article, two numbers. That is not an irregularity to fear — it is the sie-does-both-jobs thing you already accept in the pronoun."
      }
    ],
    "trap_note": "Your mind will offer: “the article depends on whether the thing is male or female.” It does not. German gender is a word class, not a description of the world — die Hand is a she-word and so is die Tür, and neither of them is female. Ask what pronoun German would use for the word, never what the thing is."
  },
  "exercises": [
    {
      "id": "l1003_e1",
      "type": "shift_select",
      "prompt": "'The' hardens to D exactly like think → denken. Which half of der is the old TH- of 'the'?",
      "options": [
        "the -er — it is a verb ending",
        "the D — it is the hardened TH of 'the'",
        "the whole word is one unbreakable piece",
        "the D is French, German took 'the' from Latin"
      ],
      "target_answer": "the D — it is the hardened TH of 'the'",
      "meaning": "the D- prefix, from English TH",
      "shift_hint": "TH → D",
      "vocab_hints": [
        {
          "word": "der",
          "translation": "the (masculine)",
          "note": "D- + er (he)"
        }
      ],
      "explanation": "th_to_d strikes again: the English TH of 'the' (say it slowly: 'thee') is German D. Everything after the D is a pronoun — er, sie, es.",
      "affirmation": "You heard the shift before you read it — that D is 'the' saying itself the German way."
    },
    {
      "id": "l1003_e2",
      "type": "matching_pairs",
      "prompt": "Match each article to the English pronoun hiding inside it:",
      "matching_pairs": [
        {
          "id": "art1",
          "english": "she / they",
          "german": "die"
        },
        {
          "id": "art2",
          "english": "he",
          "german": "der"
        },
        {
          "id": "art3",
          "english": "it",
          "german": "das"
        }
      ],
      "target_answer": "die = she/they, der = he, das = it",
      "meaning": "die = sie, der = er, das = es",
      "vocab_hints": [
        {
          "word": "sie",
          "translation": "she / they"
        }
      ],
      "explanation": "die is D- + sie, der is D- + er, das is D- + es. The D is shared; the tail tells you the noun class. No third list to memorise.",
      "affirmation": "D- plus sie, er, es — you just derived the whole nominative grid from three words you already speak."
    },
    {
      "id": "l1003_e3",
      "type": "morpheme_tiles",
      "prompt": "Build the article for 'the hand'. English would say 'the hand' — but which pronoun does German use for this word?",
      "tile_options": [
        "d",
        "er",
        "as",
        "en",
        "ie"
      ],
      "target_answer": "die",
      "meaning": "the hand — a she-word in German",
      "explanation": "Hand is a she-word in German, even though English treats it as an 'it'. Ask the pronoun question about the *word* — she — and she + D- gives die. Tür and Milch behave the same way: German decided their class centuries ago, and the article simply remembers it.",
      "affirmation": "You picked die for a thing English calls 'it' — that is gender as a word class, not as a description of the world."
    },
    {
      "id": "l1003_e4",
      "type": "dictation",
      "prompt": "Listen and write. Three articles, three nouns, one system.",
      "spoken": "Der Tisch und die Hand und das Buch",
      "replays": 3,
      "target_answer": "Der Tisch und die Hand und das Buch",
      "meaning": "the woman and the man and the child",
      "cues": [
        "Three nouns, three different articles — each one is D- plus a pronoun",
        "she → die, he → der, it → das",
        "und never changes. The capital letters are nouns and articles, never und"
      ],
      "explanation": "Each article is the pronoun that would replace its noun, with a D- in front. Write the German with its real capitals — every noun takes one.",
      "affirmation": "You heard the three articles in the ear and wrote them from the pronoun, not from memory."
    },
    {
      "id": "l1003_e5",
      "type": "transcribe",
      "prompt": "Put into German: the thought that the book is good",
      "idea": "you are handing someone a book and saying it is a good one",
      "idea_parts": [
        "which book? → the book → das Buch (an it-word: das)",
        "what about it? → good → gut",
        "ist takes position 2 right after the noun — nothing moves"
      ],
      "cues": [
        "das = D- + es, the pronoun that would replace Buch",
        "ist is position 2 after a noun in position 1",
        "A describing word after ist takes no ending — gut stays gut"
      ],
      "word_bank": [
        "ist",
        "ein",
        "dem",
        "Das",
        "gut",
        "der",
        "die",
        "Buch"
      ],
      "target_answer": "Das Buch ist gut",
      "meaning": "The book is good",
      "vocab_hints": [
        {
          "word": "hier",
          "translation": "here",
          "note": "dort is 'there' — a distractor on purpose"
        }
      ],
      "explanation": "das is D- + es because the pronoun test says 'it'. After a noun in position 1 the verb takes position 2, and a describing word after ist stays bare — gut, not gutes. English does the same thing: 'the book is good', never 'the book is a good'.",
      "affirmation": "You built that from the pronoun test and the position-2 rule — two laws, zero memorising.",
      "diagnosis": {
        "slip": "the article picked the wrong pronoun",
        "cue": "Ask which pronoun German uses for Buch: he or it? It — so das, not der. The word's class decides, not what the thing is."
      }
    }
  ],
  "twist": {
    "prompt": "Same three nouns, but now something is being done to them: I see the table, the hand, the book. The pronoun test now says him, her, it — watch what the D- tail does.",
    "target_answer": "Ich sehe den Tisch und die Hand und das Buch",
    "word_bank": [
      "Ich",
      "sehe",
      "und",
      "den",
      "Tisch",
      "dem",
      "Buch",
      "und",
      "das",
      "die",
      "Hand",
      "der"
    ],
    "explanation": "Accusative only touches the masculine tail: der → den, because er → ihn. The feminine and the neuter stay exactly where they were — die Hand, das Buch. One tail moves; two do not. That asymmetry is the whole Him-Case from topic 10, and it is why the pronoun test is worth installing."
  },
  "foreshadow": {
    "line": "Keep the pronoun test in your pocket. You have not met the case that moves die either — and when you do, you will need to know that die can become der without warning.",
    "resolvedIn": 20
  },
  "summary": {
    "outcome": "Read der/die/das as D- plus a pronoun, and choose the article with the pronoun test rather than a table.",
    "use_example": {
      "german": "Das Kind ist klein.",
      "english": "The child is small."
    },
    "takeaway": "German built its articles out of its pronouns. Learn the pronouns and the articles are free — for the rest of the language, not just today.",
    "curiosity_teaser": "Next: the article grid proper — the whole determiner family at once, and possessive mein is simply mine."
  }
};

export default lesson;
