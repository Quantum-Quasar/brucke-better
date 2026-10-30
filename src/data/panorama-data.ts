// ponytail: the panorama's static content — intros, grids and language metadata.
//
// Deliberately dependency-free: the panorama's client view imports this module,
// so it must not pull a language's curriculum (and with it ~3 MB of lessons)
// into that chunk. The "where this is taught" links live in panorama-links.ts,
// which resolves them from the curriculum on the server.

export type PanoramaLanguageId = "de" | "fr" | "es" | "nl";

export const PANORAMA_LANGUAGE_IDS: PanoramaLanguageId[] = ["de", "fr", "es", "nl"];

export function isPanoramaLanguageId(id: string): id is PanoramaLanguageId {
  return (PANORAMA_LANGUAGE_IDS as string[]).includes(id);
}

interface Cell {
  label: string;
  note?: string;
}

interface Grid {
  title: string;
  why: string;
  columnHead: string[];
  rowHead: string;
  rows: Array<{ head: string; cells: Cell[] }>;
}

interface LanguagePanorama {
  id: PanoramaLanguageId;
  name: string;
  intro: string;
  grids: Grid[];
}

const GERMAN_PANORAMA: LanguagePanorama = {
  id: "de",
  name: "German",
  intro:
    "The trail teaches German one thought at a time, horizontally — that is where learning happens. This page is the opposite view: everything stacked so you can see how the articles, the verb bracket, and the sound shifts fit together.",
  grids: [
    {
      title: "The words for 'the' are pronouns in disguise",
      why: "German built its articles out of the very pronouns you already speak. Once you can see the pronoun inside the article, the case tables stop being a table and become one sentence repeated.",
      columnHead: ["the", "he / him", "she / her", "it"],
      rowHead: "case",
      rows: [
        {
          head: "who does it (nominative)",
          cells: [
            { label: "der", note: "the" },
            { label: "er / ihn", note: "he / him" },
            { label: "sie", note: "she / her" },
            { label: "es", note: "it" },
          ],
        },
        {
          head: "who receives it (accusative)",
          cells: [
            { label: "den", note: "the" },
            { label: "ihn", note: "him" },
            { label: "sie", note: "her" },
            { label: "es", note: "it" },
          ],
        },
        {
          head: "who gets the result (dative)",
          cells: [
            { label: "dem", note: "the" },
            { label: "ihm", note: "him" },
            { label: "ihr", note: "her" },
            { label: "ihm", note: "it" },
          ],
        },
        {
          head: "whose it is (genitive)",
          cells: [
            { label: "des", note: "the" },
            { label: "seiner", note: "his" },
            { label: "ihrer", note: "her" },
            { label: "seiner", note: "its" },
          ],
        },
      ],
    },
    {
      title: "The verb bracket — German hates being interrupted",
      why: "Two verbs in one sentence make a sandwich: the conjugated one opens, the infinitive or participle closes the door, and everything else lands in the middle.",
      columnHead: ["shape", "what sits at the front", "what closes it"],
      rowHead: "sentence",
      rows: [
        {
          head: "Ich will morgen Deutsch lernen",
          cells: [
            { label: "modal + infinitive" },
            { label: "will", note: "position 2" },
            { label: "lernen", note: "the end" },
          ],
        },
        {
          head: "Ich habe das Buch gelesen",
          cells: [
            { label: "Perfekt" },
            { label: "habe", note: "position 2" },
            { label: "gelesen", note: "the end" },
          ],
        },
        {
          head: "Ich weiß, dass sie morgen kommt",
          cells: [
            { label: "dass-clause" },
            { label: "weiß", note: "position 2" },
            { label: "kommt", note: "the very end" },
          ],
        },
        {
          head: "Ich mache das Fenster auf",
          cells: [
            { label: "separable verb" },
            { label: "mache", note: "position 2" },
            { label: "auf", note: "the end — and it is still a verb" },
          ],
        },
      ],
    },
    {
      title: "The adjective carries the feeling of 'the'",
      why: "With a real article the adjective only waves a small flag; with no article it has to carry the whole definite feeling itself — and the endings it chooses mirror the articles it is standing in for.",
      columnHead: ["with 'the'", "with 'a'", "with no article at all"],
      rowHead: "noun",
      rows: [
        {
          head: "der Baum (m)",
          cells: [
            { label: "der groß-e Baum", note: "just -e" },
            { label: "ein groß-er Baum", note: "-er mirrors der" },
            { label: "groß-er Baum", note: "the adjective does it alone" },
          ],
        },
        {
          head: "das Haus (n)",
          cells: [
            { label: "das groß-e Haus", note: "just -e" },
            { label: "ein groß-es Haus", note: "-es mirrors das" },
            { label: "groß-es Haus", note: "the adjective does it alone" },
          ],
        },
        {
          head: "die Frau (f)",
          cells: [
            { label: "die groß-e Frau", note: "just -e" },
            { label: "eine groß-e Frau", note: "-e, as always" },
            { label: "groß-e Frau", note: "the adjective does it alone" },
          ],
        },
      ],
    },
    {
      title: "Time, and how German marks it",
      why: "German does most of its storytelling out loud in two tenses. The written past exists, but the Perfekt is where a learner lives.",
      columnHead: ["spoken everyday", "written / narrative", "built with"],
      rowHead: "meaning",
      rows: [
        {
          head: "I ate",
          cells: [
            { label: "Ich habe gegessen" },
            { label: "Ich aß" },
            { label: "haben + participle" },
          ],
        },
        {
          head: "I went",
          cells: [
            { label: "Ich bin gegangen" },
            { label: "Ich ging" },
            { label: "sein + participle (motion)" },
          ],
        },
        {
          head: "I could",
          cells: [
            { label: "Ich konnte" },
            { label: "Ich könnte" },
            { label: "ablaut, then würden" },
          ],
        },
      ],
    },
    {
      title: "The consonant bridges",
      why: "The same handful of correspondences that give you the vocabulary also give you the grammar — because the articles are pronouns and the pronouns took the same shifts as everything else.",
      columnHead: ["English kept", "German shifted", "proof pair"],
      rowHead: "shift",
      rows: [
        {
          head: "th → d",
          cells: [{ label: "th" }, { label: "d" }, { label: "think → denken, the → der" }],
        },
        {
          head: "p → f / pf",
          cells: [{ label: "p" }, { label: "f / pf" }, { label: "hope → hoffen, path → Pfad" }],
        },
        {
          head: "t → s / ss / z",
          cells: [{ label: "t" }, { label: "s / ss / z" }, { label: "water → Wasser, two → zwei" }],
        },
        {
          head: "k → ch",
          cells: [{ label: "k" }, { label: "ch" }, { label: "make → machen, book → Buch" }],
        },
        {
          head: "d → t",
          cells: [{ label: "d" }, { label: "t" }, { label: "day → Tag, door → Tür" }],
        },
      ],
    },
  ],
};

const FRENCH_PANORAMA: LanguagePanorama = {
  id: "fr",
  name: "French",
  intro:
    "French is Latin spoken rapidly in northern Gaul — and Norman French gave English nearly half its vocabulary. This panorama stacks the sound bridges, the pre-verbal clitic slot, the ne … pas bracket, and the two-auxiliary past.",
  grids: [
    {
      title: "The pre-verbal clitic magnet — French puts objects before the verb",
      why: "English trails object pronouns after the verb ('I see it, I give it to him'). French pulls them directly in front of the conjugated verb.",
      columnHead: ["direct object", "indirect receiver", "locative / partitive"],
      rowHead: "person",
      rows: [
        {
          head: "him / it (m)",
          cells: [
            { label: "le (l')", note: "Je le vois (I see it)" },
            { label: "lui", note: "Je lui parle (I speak to him)" },
            { label: "y / en", note: "J'y vais / J'en veux" },
          ],
        },
        {
          head: "her / it (f)",
          cells: [
            { label: "la (l')", note: "Je la prends (I take it)" },
            { label: "lui", note: "Elle lui donne (She gives to her)" },
            { label: "y / en", note: "there / of it" },
          ],
        },
        {
          head: "them (pl)",
          cells: [
            { label: "les", note: "Je les écoute" },
            { label: "leur", note: "Je leur écris (to them)" },
            { label: "y / en", note: "replaces à+noun / de+noun" },
          ],
        },
      ],
    },
    {
      title: "The ne … pas clamp & the Passé Composé split",
      why: "French wraps negation tightly around the first verb (conjugated or auxiliary), leaving the infinitive or past participle outside the clamp.",
      columnHead: ["affirmative", "negated (ne … pas)", "what sits inside the clamp"],
      rowHead: "frame",
      rows: [
        {
          head: "Present tense",
          cells: [
            { label: "Je parle français" },
            { label: "Je ne parle pas français" },
            { label: "parle", note: "conjugated verb" },
          ],
        },
        {
          head: "Modal + infinitive",
          cells: [
            { label: "Je veux partir demain" },
            { label: "Je ne veux pas partir" },
            { label: "veux", note: "partir stays outside" },
          ],
        },
        {
          head: "Passé composé (avoir)",
          cells: [
            { label: "J'ai préparé le café" },
            { label: "Je n'ai pas préparé le café" },
            { label: "ai", note: "auxiliary only" },
          ],
        },
        {
          head: "Passé composé (être)",
          cells: [
            { label: "Elle est arrivée tôt" },
            { label: "Elle n'est pas arrivée" },
            { label: "est", note: "motion/state verbs take être" },
          ],
        },
      ],
    },
    {
      title: "The Norman-French cognate bridges",
      why: "Because 1066 imported Old French into English, thousands of French words differ from English by a single predictable suffix or consonant shift.",
      columnHead: ["English kept", "French evolved", "proof pair"],
      rowHead: "bridge",
      rows: [
        {
          head: "s + t → ˆ (circumflex)",
          cells: [
            { label: "st / s" },
            { label: "ˆ (circumflex)" },
            { label: "forest → forêt, hospital → hôpital, feast → fête" },
          ],
        },
        {
          head: "-ty → -ité",
          cells: [
            { label: "-ty" },
            { label: "-ité" },
            { label: "university → université, liberty → liberté" },
          ],
        },
        {
          head: "-or → -eur",
          cells: [
            { label: "-or / -our" },
            { label: "-eur" },
            { label: "color → couleur, doctor → docteur, actor → acteur" },
          ],
        },
        {
          head: "w- → gu- / g-",
          cells: [
            { label: "w-" },
            { label: "gu- / g-" },
            { label: "war → guerre, ward → garder, warrant → garantir" },
          ],
        },
      ],
    },
  ],
};

const SPANISH_PANORAMA: LanguagePanorama = {
  id: "es",
  name: "Spanish",
  intro:
    "Spanish is spoken Vulgar Latin with crisp five-vowel acoustics and transparent Latin suffixes. This panorama stacks the ser vs. estar split, pre-verbal & enclitic object pronouns, and the Castilian sound shifts.",
  grids: [
    {
      title: "Two ways 'to be' — ser (essence) vs. estar (state & location)",
      why: "Latin esse (identity/essence) and stare (to stand in a state or place) both survived in Spanish. Picking between them changes whether you are naming what something IS or how/where it STANDS.",
      columnHead: ["ser (essence / identity)", "estar (state / location)", "why they split"],
      rowHead: "context",
      rows: [
        {
          head: "Origin vs. Location",
          cells: [
            { label: "Soy de Madrid", note: "permanent origin" },
            { label: "Estoy en Madrid", note: "where I am standing now" },
            { label: "estar always handles physical location" },
          ],
        },
        {
          head: "Character vs. Condition",
          cells: [
            { label: "El café es bueno", note: "good quality coffee" },
            { label: "El café está frío", note: "cold right now" },
            { label: "trait vs. current temperature/state" },
          ],
        },
        {
          head: "Meaning-shifting adjectives",
          cells: [
            { label: "es listo", note: "he is clever" },
            { label: "está listo", note: "he is ready" },
            { label: "essence vs. readiness" },
          ],
        },
      ],
    },
    {
      title: "Object pronouns — before the conjugated verb, or welded to the infinitive",
      why: "Spanish places object pronouns before a conjugated verb (Lo compro), or welds them onto the tail of an infinitive (Quiero comprarlo). When le meets lo/la, it shifts to se lo.",
      columnHead: ["direct object", "indirect receiver", "double pronoun (se lo)"],
      rowHead: "person",
      rows: [
        {
          head: "him / it (m)",
          cells: [
            { label: "lo", note: "Lo veo / Quiero verlo" },
            { label: "le", note: "Le hablo (I speak to him)" },
            { label: "se lo", note: "Se lo doy (never *le lo)" },
          ],
        },
        {
          head: "her / it (f)",
          cells: [
            { label: "la", note: "La tengo / Voy a verla" },
            { label: "le", note: "Le doy la llave" },
            { label: "se la", note: "Se la doy (I give it to her)" },
          ],
        },
        {
          head: "them (pl)",
          cells: [
            { label: "los / las", note: "Los compro hoy" },
            { label: "les", note: "Les escribo" },
            { label: "se los / se las", note: "les → se before lo/la" },
          ],
        },
      ],
    },
    {
      title: "The Castilian sound bridges",
      why: "Once you know how Castilian melted Latin consonant clusters and stressed short vowels, thousands of English Latinate words turn into Spanish on sight.",
      columnHead: ["Latin / English", "Spanish shifted", "proof pair"],
      rowHead: "bridge",
      rows: [
        {
          head: "f- → silent h-",
          cells: [
            { label: "f-" },
            { label: "h- (silent)" },
            { label: "fact/make → hacer, filial → hijo, furnace → horno" },
          ],
        },
        {
          head: "-ct- → -ch-",
          cells: [
            { label: "-ct-" },
            { label: "-ch-" },
            { label: "nocturnal → noche, lacteal → leche, octo → ocho" },
          ],
        },
        {
          head: "pl- / cl- / fl- → ll-",
          cells: [
            { label: "pl- / cl- / fl-" },
            { label: "ll-" },
            { label: "clavicle/clef → llave, pleno → lleno, flamma → llama" },
          ],
        },
        {
          head: "stressed e / o → ie / ue",
          cells: [
            { label: "e / o" },
            { label: "ie / ue" },
            { label: "tempo → tiempo, porta → puerta, dormire → duermo" },
          ],
        },
      ],
    },
  ],
};

const DUTCH_PANORAMA: LanguagePanorama = {
  id: "nl",
  name: "Dutch",
  intro:
    "Dutch is the West Germanic twin English kept closest: it skipped the High German consonant shift, so the consonants often line up and the work moves to vowels, articles and word order. This panorama stacks the de/het split, the verb's two homes, the tense map and the pronoun machine.",
  grids: [
    {
      title: "Two articles, one adjective ending — de/het without noun case",
      why: "Dutch merged the old masculine and feminine into common de and kept neuter het. Nouns do not inflect for case; the adjective -e marks definiteness, not gender.",
      columnHead: ["de (common)", "het (neuter)", "the rule"],
      rowHead: "context",
      rows: [
        {
          head: "the noun",
          cells: [
            { label: "de tafel", note: "common noun" },
            { label: "het huis", note: "neuter noun" },
            { label: "the article is lexical" },
          ],
        },
        {
          head: "definite adjective",
          cells: [
            { label: "de grote tafel" },
            { label: "het grote huis" },
            { label: "-e after de/het or a possessive" },
          ],
        },
        {
          head: "indefinite adjective",
          cells: [
            { label: "een grote tafel" },
            { label: "een groot huis" },
            { label: "no -e after een + a het-word" },
          ],
        },
        {
          head: "diminutive",
          cells: [
            { label: "—" },
            { label: "het huisje" },
            { label: "every diminutive is het" },
          ],
        },
      ],
    },
    {
      title: "The verb's two homes — V2 in main clauses, final in subordinates",
      why: "Dutch main clauses keep the finite verb second; front something and it inverts. Subordinate clauses send the verb to the end. English question inversion is the same instinct, generalised.",
      columnHead: ["main clause", "fronted element", "subordinate clause"],
      rowHead: "pattern",
      rows: [
        {
          head: "statement",
          cells: [
            { label: "Ik werk vandaag" },
            { label: "Vandaag werk ik" },
            { label: "…omdat ik vandaag werk" },
          ],
        },
        {
          head: "modal",
          cells: [
            { label: "Ik kan komen" },
            { label: "Morgen kan ik komen" },
            { label: "…omdat ik morgen kan komen" },
          ],
        },
        {
          head: "separable verb",
          cells: [
            { label: "Ik bel je op" },
            { label: "Morgen bel ik je op" },
            { label: "…omdat ik je opbel" },
          ],
        },
        {
          head: "perfect",
          cells: [
            { label: "Ik heb gewerkt" },
            { label: "Gisteren heb ik gewerkt" },
            { label: "…omdat ik gewerkt heb" },
          ],
        },
      ],
    },
    {
      title: "Time travel — one present, two pasts, a perfect and a future",
      why: "Dutch marks the past twice: a dental suffix for weak verbs, a vowel change for strong verbs, and a have/be perfect for conversation. The future is a stance choice: gaan, zullen or zou.",
      columnHead: ["present", "past", "perfect / future"],
      rowHead: "verb type",
      rows: [
        {
          head: "weak",
          cells: [
            { label: "ik werk" },
            { label: "ik werkte" },
            { label: "ik heb gewerkt" },
          ],
        },
        {
          head: "strong",
          cells: [
            { label: "ik kom" },
            { label: "ik kwam" },
            { label: "ik ben gekomen" },
          ],
        },
        {
          head: "modal",
          cells: [
            { label: "ik kan" },
            { label: "ik kon" },
            { label: "ik zou kunnen" },
          ],
        },
        {
          head: "future",
          cells: [
            { label: "ik ga werken" },
            { label: "ik zou werken" },
            { label: "ik zal werken" },
          ],
        },
      ],
    },
    {
      title: "The pronoun machine — subjects, objects, reflexives",
      why: "Nouns lost case; pronouns kept it. Dutch adds a reflexive set (me/je/ons/zich) and the little word er for existence, place and quantity.",
      columnHead: ["subject", "object", "reflexive / possessive"],
      rowHead: "person",
      rows: [
        {
          head: "I",
          cells: [
            { label: "ik" },
            { label: "mij / me" },
            { label: "me / mijn" },
          ],
        },
        {
          head: "you (informal)",
          cells: [
            { label: "jij / je" },
            { label: "jou / je" },
            { label: "je / jouw" },
          ],
        },
        {
          head: "he / she",
          cells: [
            { label: "hij / zij" },
            { label: "hem / haar" },
            { label: "zich / zijn, haar" },
          ],
        },
        {
          head: "we / they",
          cells: [
            { label: "wij / zij" },
            { label: "ons / hen" },
            { label: "ons, zich / ons, hun" },
          ],
        },
      ],
    },
  ],
};

export const PANORAMA_BY_LANG: Record<PanoramaLanguageId, LanguagePanorama> = {
  de: GERMAN_PANORAMA,
  fr: FRENCH_PANORAMA,
  es: SPANISH_PANORAMA,
  nl: DUTCH_PANORAMA,
};
