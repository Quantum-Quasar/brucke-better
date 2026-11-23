export type GermanArticle = "der" | "die" | "das";

export type DutchArticle = "de" | "het";

export type GermanBridgeCorrespondence =
  | "ij↔ei"
  | "ui↔au"
  | "oe↔u"
  | "sch↔sch"
  | "d↔t"
  | "k↔ch"
  | "p↔pf/f"
  | "t↔s/ss/z"
  | "v↔f"
  | "z↔s"
  | "g↔g/ch"
  | "cognate"
  | "translation"
  | "false-friend";

export interface GermanBridgeEntry {
  /** Dutch compendium word ID (or standalone Dutch key such as "slim"). */
  dutchId: string;
  /** Canonical Dutch word. */
  dutchWord: string;
  /** Dutch article for nouns ("de" | "het"), or null for non-nouns. */
  dutchArticle: DutchArticle | null;
  /** German cognate/twin (or true German translation for false friends). */
  germanTwin: string;
  /** German article for nouns ("der" | "die" | "das"), or null for non-nouns. */
  germanArticle: GermanArticle | null;
  /** Primary German↔Dutch sound correspondence or category. */
  correspondence: GermanBridgeCorrespondence;
  /** True when the Dutch word resembles a different German word with another meaning. */
  falseFriend?: boolean;
  /** Misleading German lookalike for false friends (e.g. "wie (how)"). */
  germanLookalike?: string;
  /** Crisp 1-line German→Dutch bridge note. */
  note: string;
}

const B = (
  dutchId: string,
  dutchWord: string,
  dutchArticle: DutchArticle | null,
  germanTwin: string,
  germanArticle: GermanArticle | null,
  correspondence: GermanBridgeCorrespondence,
  note: string,
  options?: { falseFriend?: boolean; germanLookalike?: string }
): GermanBridgeEntry => ({
  dutchId,
  dutchWord,
  dutchArticle,
  germanTwin,
  germanArticle,
  correspondence,
  note,
  ...(options?.falseFriend ? { falseFriend: true } : {}),
  ...(options?.germanLookalike ? { germanLookalike: options.germanLookalike } : {}),
});

/**
 * German-to-Dutch bridge dataset for "Dutch for German speakers" mode.
 * Covers high-frequency Dutch compendium words, core DE↔NL sound correspondences
 * (ij↔ei, ui↔au, oe↔u, sch↔sch, d↔t, k↔ch, p↔pf/f, t↔s/ss/z), and famous false friends.
 */
export const GERMAN_BRIDGE_ENTRIES: readonly GermanBridgeEntry[] = [
  // --- Famous German↔Dutch false friends -----------------------------------
  B("wie", "wie", null, "wer", null, "false-friend",
    "False friend: Dutch 'wie' means German 'wer' (who); German 'wie' (how) is Dutch 'hoe'.",
    { falseFriend: true, germanLookalike: "wie (how)" }),
  B("meer", "meer", null, "mehr (adv.) / der See (het meer)", null, "false-friend",
    "Adverb 'meer' = German 'mehr' (more, straight cognate); as a noun, 'het meer' is a false friend meaning 'der See' (lake), not 'das Meer' (sea = 'de zee').",
    { falseFriend: true, germanLookalike: "das Meer (sea)" }),
  B("zee", "zee", "de", "Meer", "das", "false-friend",
    "Classic DE↔NL swap: 'de zee' means 'das Meer' (sea), whereas 'het meer' means 'der See' (lake).",
    { falseFriend: true, germanLookalike: "der See (lake)" }),
  B("winkel", "winkel", "de", "Geschäft", "das", "false-friend",
    "False friend: 'de winkel' is 'das Geschäft' (shop), not German 'der Winkel' (angle).",
    { falseFriend: true, germanLookalike: "der Winkel (angle)" }),
  B("bellen", "bellen", null, "anrufen", null, "false-friend",
    "False friend: Dutch 'bellen' means 'anrufen' (to phone), not German 'bellen' (to bark = 'blaffen').",
    { falseFriend: true, germanLookalike: "bellen (to bark)" }),
  B("opbellen", "opbellen", null, "anrufen", null, "false-friend",
    "False friend: 'opbellen' means 'anrufen' (to call on the phone), not barking.",
    { falseFriend: true, germanLookalike: "bellen (to bark)" }),
  B("slim", "slim", null, "klug", null, "false-friend",
    "False friend: Dutch 'slim' means 'klug / schlau' (smart), not German 'schlimm' (bad = 'erg').",
    { falseFriend: true, germanLookalike: "schlimm (bad)" }),
  B("klaar", "klaar", null, "fertig", null, "false-friend",
    "False friend: Dutch 'klaar' usually means 'fertig' (ready/finished), not just German 'klar'.",
    { falseFriend: true, germanLookalike: "klar (clear)" }),
  B("mogen", "mogen", null, "dürfen / mögen", null, "false-friend",
    "Partial false friend: as a modal verb, Dutch 'mogen' means 'dürfen' (may / be allowed to), though it also means 'mögen' (to like a person or thing); 'I like to do' is 'graag doen'.",
    { falseFriend: true, germanLookalike: "mögen (as modal)" }),
  B("uur", "uur", "het", "Stunde", "die", "false-friend",
    "Watch out: 'een uur' means 'eine Stunde' (an hour), though clock time 'drie uur' = 'drei Uhr'.",
    { falseFriend: true, germanLookalike: "die Uhr (clock)" }),
  B("lopen", "lopen", null, "gehen", null, "false-friend",
    "Subtle trap: Dutch 'lopen' means 'gehen' (to walk); German 'laufen' (to run) is Dutch 'rennen'.",
    { falseFriend: true, germanLookalike: "laufen (to run)" }),
  B("vloer", "vloer", "de", "Boden", "der", "false-friend",
    "False friend: 'de vloer' is 'der Boden' (floor), not German 'der Flur' (hallway = 'de gang').",
    { falseFriend: true, germanLookalike: "der Flur (hallway)" }),
  B("vaak", "vaak", null, "oft", null, "translation",
    "Everyday adverb: Dutch 'vaak' means German 'oft' (often) — historically kin to 'Fach' (as in 'vielfach')."),
  B("tuin", "tuin", "de", "Garten", "der", "false-friend",
    "Cognate with German 'der Zaun' (fence), but Dutch 'de tuin' means 'der Garten' (garden).",
    { falseFriend: true, germanLookalike: "der Zaun (fence)" }),
  B("wachten", "wachten", null, "warten", null, "false-friend",
    "Watch the meaning: Dutch 'wachten' = German 'warten' (to wait), not 'wachen'.",
    { falseFriend: true, germanLookalike: "wachen (to watch)" }),
  B("dicht", "dicht", null, "geschlossen", null, "false-friend",
    "Everyday trap: Dutch 'dicht' usually means 'zu / geschlossen' (closed), e.g. 'De winkel is dicht'.",
    { falseFriend: true, germanLookalike: "dicht (dense)" }),
  B("raam", "raam", "het", "Fenster", "das", "false-friend",
    "Same root as German 'der Rahmen' (frame), but Dutch 'het raam' means 'das Fenster' (window).",
    { falseFriend: true, germanLookalike: "der Rahmen (frame)" }),
  B("kamer", "kamer", "de", "Zimmer", "das", "false-friend",
    "Dutch 'de kamer' is an ordinary 'Zimmer' (room), broader than German 'die Kammer'.",
    { falseFriend: true, germanLookalike: "die Kammer (small room)" }),
  B("of", "of", null, "oder / ob", null, "false-friend",
    "Watch out: Dutch 'of' means 'oder' (or) and 'ob' (whether) — never German 'oft' (often = 'vaak').",
    { falseFriend: true, germanLookalike: "oft (often)" }),

  // --- ij ↔ ei -------------------------------------------------------------
  B("mijn", "mijn", null, "mein", null, "ij↔ei",
    "Dutch 'ij' regularly matches German 'ei': mein → mijn."),
  B("bij", "bij", null, "bei", null, "ij↔ei",
    "Direct ij↔ei pair: German 'bei' → Dutch 'bij'."),
  B("ijs", "ijs", "het", "Eis", "das", "ij↔ei",
    "Same neuter gender (das → het) with ij↔ei: das Eis → het ijs."),
  B("wijn", "wijn", "de", "Wein", "der", "ij↔ei",
    "German masculine 'der' maps to Dutch 'de' with ij↔ei: der Wein → de wijn."),
  B("tijd", "tijd", "de", "Zeit", "die", "ij↔ei",
    "Double shift (ij↔ei + t↔z + d↔t): die Zeit → de tijd."),
  B("vrij", "vrij", null, "frei", null, "ij↔ei",
    "v↔f + ij↔ei: German 'frei' → Dutch 'vrij'."),
  B("schrijven", "schrijven", null, "schreiben", null, "ij↔ei",
    "ij↔ei + v↔b: German 'schreiben' → Dutch 'schrijven' (pronounce sch- as /sx/)."),
  B("blijven", "blijven", null, "bleiben", null, "ij↔ei",
    "ij↔ei + v↔b: German 'bleiben' → Dutch 'blijven'."),
  B("zijn", "zijn", null, "sein", null, "ij↔ei",
    "z↔s + ij↔ei: German 'sein' (to be) → Dutch 'zijn'."),
  B("zijn_poss", "zijn", null, "sein", null, "ij↔ei",
    "z↔s + ij↔ei: German possessive 'sein' (his) → Dutch 'zijn'."),
  B("pijn", "pijn", "de", "Pein", "die", "ij↔ei",
    "ij↔ei: cognate with 'die Pein', used as everyday German 'der Schmerz' (pain)."),
  B("altijd", "altijd", null, "immer", null, "ij↔ei",
    "Literally 'all-Zeit' (ij↔ei): Dutch 'altijd' = German 'immer'."),
  B("bijna", "bijna", null, "beinahe", null, "ij↔ei",
    "ij↔ei + na↔nah: German 'beinahe' → Dutch 'bijna' (almost)."),
  B("krijgen", "krijgen", null, "kriegen", null, "cognate",
    "Standard Dutch 'krijgen' mirrors colloquial German 'kriegen' (to get/receive)."),

  // --- ui ↔ au -------------------------------------------------------------
  B("huis", "huis", "het", "Haus", "das", "ui↔au",
    "Classic ui↔au pair with matching neuter gender (das → het): das Haus → het huis."),
  B("muis", "muis", "de", "Maus", "die", "ui↔au",
    "ui↔au with feminine→de gender: die Maus → de muis."),
  B("uit", "uit", null, "aus", null, "ui↔au",
    "ui↔au + t↔s: German 'aus' → Dutch 'uit'."),
  B("bruin", "bruin", null, "braun", null, "ui↔au",
    "Direct ui↔au pair: German 'braun' → Dutch 'bruin'."),
  B("duizend", "duizend", null, "tausend", null, "ui↔au",
    "d↔t + ui↔au + z↔s: German 'tausend' → Dutch 'duizend'."),
  B("buiten", "buiten", null, "außen", null, "ui↔au",
    "ui↔au + t↔ß: German 'außen / draußen' → Dutch 'buiten' (b- + uit)."),
  B("thuis", "thuis", null, "zu Hause", null, "ui↔au",
    "Contracted 'te huis' (ui↔au): Dutch 'thuis' = German 'zu Hause'."),

  // --- oe ↔ u --------------------------------------------------------------
  B("boek", "boek", "het", "Buch", "das", "oe↔u",
    "oe↔u + k↔ch with matching neuter gender: das Buch → het boek."),
  B("voet", "voet", "de", "Fuß", "der", "oe↔u",
    "v↔f + oe↔u + t↔ß: der Fuß → de voet."),
  B("goed", "goed", null, "gut", null, "oe↔u",
    "oe↔u + d↔t: German 'gut' → Dutch 'goed' (Dutch g is a soft/hard fricative)."),
  B("bloed", "bloed", "het", "Blut", "das", "oe↔u",
    "oe↔u + d↔t with matching neuter gender: das Blut → het bloed."),
  B("stoel", "stoel", "de", "Stuhl", "der", "oe↔u",
    "Direct oe↔u pair: der Stuhl → de stoel."),
  B("moeder", "moeder", "de", "Mutter", "die", "oe↔u",
    "oe↔u + d↔tt: die Mutter → de moeder."),
  B("broer", "broer", "de", "Bruder", "der", "oe↔u",
    "oe↔u (shortened from 'broeder'): der Bruder → de broer."),
  B("koe", "koe", "de", "Kuh", "die", "oe↔u",
    "Direct oe↔u pair: die Kuh → de koe."),
  B("bloem", "bloem", "de", "Blume", "die", "oe↔u",
    "Direct oe↔u pair: die Blume → de bloem."),
  B("doen", "doen", null, "tun", null, "oe↔u",
    "d↔t + oe↔u: German 'tun' → Dutch 'doen'."),
  B("zoeken", "zoeken", null, "suchen", null, "oe↔u",
    "z↔s + oe↔u + k↔ch: German 'suchen' → Dutch 'zoeken'."),
  B("groen", "groen", null, "grün", null, "oe↔u",
    "Dutch 'oe' answers to German 'ü' here: grün → groen."),
  B("voelen", "voelen", null, "fühlen", null, "oe↔u",
    "v↔f + oe↔ü: German 'fühlen' → Dutch 'voelen'."),
  B("moeten", "moeten", null, "müssen", null, "oe↔u",
    "oe↔ü + t↔ss: German 'müssen' → Dutch 'moeten'."),
  B("hoe", "hoe", null, "wie", null, "false-friend",
    "Question-word swap: Dutch 'hoe' = German 'wie' (how), while Dutch 'wie' = German 'wer' (who).",
    { falseFriend: true, germanLookalike: "wie (how)" }),

  // --- sch ↔ sch -----------------------------------------------------------
  B("schip", "schip", "het", "Schiff", "das", "sch↔sch",
    "sch↔sch + p↔ff (das → het): das Schiff → het schip; pronounce Dutch sch- as /sx/, not /ʃ/."),
  B("schoen", "schoen", "de", "Schuh", "der", "sch↔sch",
    "sch↔sch + oe↔u: der Schuh → de schoen (pronounce sch- as /sx/)."),
  B("schaap", "schaap", "het", "Schaf", "das", "sch↔sch",
    "sch↔sch + p↔f (das → het): das Schaf → het schaap; Dutch sch- is /sx/."),
  B("schouder", "schouder", "de", "Schulter", "die", "sch↔sch",
    "sch↔sch + ou↔ul + d↔t: die Schulter → de schouder."),
  B("scherp", "scherp", null, "scharf", null, "sch↔sch",
    "sch↔sch + p↔f: German 'scharf' → Dutch 'scherp'."),
  B("schaduw", "schaduw", "de", "Schatten", "der", "sch↔sch",
    "sch↔sch + d↔tt: der Schatten → de schaduw."),
  B("school", "school", "de", "Schule", "die", "sch↔sch",
    "sch↔sch: die Schule → de school (pronounce Dutch sch- as /sx/)."),
  B("scheren", "scheren", null, "rasieren", null, "sch↔sch",
    "Cognate with German 'scheren' (shear), used in Dutch for 'sich rasieren' (to shave)."),

  // --- d ↔ t ---------------------------------------------------------------
  B("dag", "dag", "de", "Tag", "der", "d↔t",
    "Classic d↔t shift: der Tag → de dag (also used as 'Tschüss!')."),
  B("deur", "deur", "de", "Tür", "die", "d↔t",
    "d↔t + eu↔ü: die Tür → de deur."),
  B("dier", "dier", "het", "Tier", "das", "d↔t",
    "d↔t with matching neuter gender: das Tier → het dier."),
  B("dochter", "dochter", "de", "Tochter", "die", "d↔t",
    "Direct d↔t shift: die Tochter → de dochter."),
  B("dorp", "dorp", "het", "Dorf", "das", "p↔pf/f",
    "p↔f with matching neuter gender: das Dorf → het dorp."),
  B("drinken", "drinken", null, "trinken", null, "d↔t",
    "Direct d↔t shift: German 'trinken' → Dutch 'drinken'."),
  B("brood", "brood", "het", "Brot", "das", "d↔t",
    "d↔t with matching neuter gender: das Brot → het brood."),
  B("rood", "rood", null, "rot", null, "d↔t",
    "Direct d↔t shift: German 'rot' → Dutch 'rood'."),
  B("vader", "vader", "de", "Vater", "der", "d↔t",
    "Direct d↔t shift: der Vater → de vader."),
  B("bed", "bed", "het", "Bett", "das", "d↔t",
    "d↔tt with matching neuter gender: das Bett → het bed."),
  B("stad", "stad", "de", "Stadt", "die", "d↔t",
    "d↔dt: die Stadt → de stad."),
  B("koud", "koud", null, "kalt", null, "d↔t",
    "ou↔al + d↔t: German 'kalt' → Dutch 'koud'."),
  B("oud", "oud", null, "alt", null, "d↔t",
    "ou↔al + d↔t: German 'alt' → Dutch 'oud'."),
  B("goud", "goud", "het", "Gold", "das", "cognate",
    "ou↔ol with matching neuter gender: das Gold → het goud."),
  B("onder", "onder", null, "unter", null, "d↔t",
    "d↔t: German 'unter' → Dutch 'onder'."),
  B("dorst", "dorst", "de", "Durst", "der", "cognate",
    "o↔u: der Durst → de dorst."),

  // --- k ↔ ch --------------------------------------------------------------
  B("ik", "ik", null, "ich", null, "k↔ch",
    "Core k↔ch shift: German 'ich' → Dutch 'ik'."),
  B("ook", "ook", null, "auch", null, "k↔ch",
    "oo↔au + k↔ch: German 'auch' → Dutch 'ook'."),
  B("maken", "maken", null, "machen", null, "k↔ch",
    "Direct k↔ch shift: German 'machen' → Dutch 'maken'."),
  B("spreken", "spreken", null, "sprechen", null, "k↔ch",
    "Direct k↔ch shift: German 'sprechen' → Dutch 'spreken'."),
  B("week", "week", "de", "Woche", "die", "k↔ch",
    "k↔ch: die Woche → de week."),
  B("keuken", "keuken", "de", "Küche", "die", "k↔ch",
    "eu↔ü + k↔ch: die Küche → de keuken."),
  B("melk", "melk", "de", "Milch", "die", "k↔ch",
    "k↔ch: die Milch → de melk."),
  B("kerk", "kerk", "de", "Kirche", "die", "k↔ch",
    "k↔ch: die Kirche → de kerk."),
  B("rekening", "rekening", "de", "Rechnung", "die", "k↔ch",
    "k↔ch: die Rechnung → de rekening."),

  // --- p ↔ pf/f ------------------------------------------------------------
  B("appel", "appel", "de", "Apfel", "der", "p↔pf/f",
    "Classic p↔pf shift: der Apfel → de appel."),
  B("op", "op", null, "auf", null, "p↔pf/f",
    "o↔au + p↔f: German 'auf' → Dutch 'op'."),
  B("slapen", "slapen", null, "schlafen", null, "p↔pf/f",
    "sl↔schl + p↔f: German 'schlafen' → Dutch 'slapen'."),
  B("kopen", "kopen", null, "kaufen", null, "p↔pf/f",
    "oo↔au + p↔f: German 'kaufen' → Dutch 'kopen'."),
  B("helpen", "helpen", null, "helfen", null, "p↔pf/f",
    "Direct p↔f shift: German 'helfen' → Dutch 'helpen'."),
  B("paard", "paard", "het", "Pferd", "das", "p↔pf/f",
    "p↔pf with matching neuter gender: das Pferd → het paard."),
  B("open", "open", null, "offen", null, "p↔pf/f",
    "Direct p↔ff shift: German 'offen' → Dutch 'open'."),
  B("soep", "soep", "de", "Suppe", "die", "oe↔u",
    "oe↔u + p↔pp: die Suppe → de soep."),

  // --- t ↔ s/ss/z ----------------------------------------------------------
  B("water", "water", "het", "Wasser", "das", "t↔s/ss/z",
    "Classic t↔ss shift with matching neuter gender: das Wasser → het water."),
  B("eten", "eten", null, "essen", null, "t↔s/ss/z",
    "Direct t↔ss shift: German 'essen' → Dutch 'eten'."),
  B("straat", "straat", "de", "Straße", "die", "t↔s/ss/z",
    "t↔ß: die Straße → de straat (pronounce st- as /st/, not /ʃt/)."),
  B("groot", "groot", null, "groß", null, "t↔s/ss/z",
    "Direct t↔ß shift: German 'groß' → Dutch 'groot'."),
  B("wit", "wit", null, "weiß", null, "t↔s/ss/z",
    "t↔ß: German 'weiß' → Dutch 'wit'."),
  B("wat", "wat", null, "was", null, "t↔s/ss/z",
    "Direct t↔s shift: German 'was' → Dutch 'wat'."),
  B("dat", "dat", null, "das", null, "t↔s/ss/z",
    "Direct t↔s shift: German 'das / dass' → Dutch 'dat'."),
  B("het", "het", null, "es / das", null, "cognate",
    "Neuter pronoun & article: Dutch 'het' pairs with German 'es' (t↔s) and also serves as the neuter 'the' ('das')."),
  B("zitten", "zitten", null, "sitzen", null, "t↔s/ss/z",
    "z↔s + tt↔tz: German 'sitzen' → Dutch 'zitten'."),
  B("zout", "zout", "het", "Salz", "das", "t↔s/ss/z",
    "z↔s + ou↔al + t↔z (das → het): das Salz → het zout."),
  B("zwart", "zwart", null, "schwarz", null, "t↔s/ss/z",
    "zw↔schw + t↔z: German 'schwarz' → Dutch 'zwart'."),
  B("twee", "twee", null, "zwei", null, "t↔s/ss/z",
    "t↔z + ee↔ei: German 'zwei' → Dutch 'twee'."),
  B("tien", "tien", null, "zehn", null, "t↔s/ss/z",
    "t↔z: German 'zehn' → Dutch 'tien'."),
  B("twintig", "twintig", null, "zwanzig", null, "t↔s/ss/z",
    "t↔z: German 'zwanzig' → Dutch 'twintig'."),
  B("tand", "tand", "de", "Zahn", "der", "t↔s/ss/z",
    "t↔z: der Zahn → de tand."),
  B("kat", "kat", "de", "Katze", "die", "t↔s/ss/z",
    "t↔tz: die Katze → de kat."),
  B("hart", "hart", "het", "Herz", "das", "t↔s/ss/z",
    "t↔z with matching neuter gender: das Herz → het hart."),
  B("weten", "weten", null, "wissen", null, "t↔s/ss/z",
    "Direct t↔ss shift: German 'wissen' → Dutch 'weten'."),
  B("betalen", "betalen", null, "bezahlen", null, "t↔s/ss/z",
    "Direct t↔z shift: German 'bezahlen' → Dutch 'betalen'."),
  B("beter", "beter", null, "besser", null, "t↔s/ss/z",
    "Direct t↔ss shift: German 'besser' → Dutch 'beter'."),
  B("tussen", "tussen", null, "zwischen", null, "t↔s/ss/z",
    "t↔zw: German 'zwischen' → Dutch 'tussen'."),

  // --- High-frequency cognates & grammar bridges ---------------------------
  B("man", "man", "de", "Mann", "der", "cognate",
    "German 'der/die' both merge into Dutch 'de': der Mann → de man."),
  B("vrouw", "vrouw", "de", "Frau", "die", "v↔f",
    "v↔f + ouw↔au: die Frau → de vrouw."),
  B("kind", "kind", "het", "Kind", "das", "cognate",
    "Identical spelling and neuter gender (das → het): das Kind → het kind."),
  B("vriend", "vriend", "de", "Freund", "der", "v↔f",
    "v↔f + ie↔eu: der Freund → de vriend."),
  B("hand", "hand", "de", "Hand", "die", "cognate",
    "Identical word (die → de): die Hand → de hand."),
  B("oog", "oog", "het", "Auge", "das", "cognate",
    "oo↔au with matching neuter gender: das Auge → het oog."),
  B("oor", "oor", "het", "Ohr", "das", "cognate",
    "Matching neuter gender (das → het): das Ohr → het oor."),
  B("mond", "mond", "de", "Mund", "der", "cognate",
    "o↔u: der Mund → de mond."),
  B("hoofd", "hoofd", "het", "Kopf", "der", "cognate",
    "Cognate with 'das Haupt' (hence neuter 'het hoofd'), everyday German 'der Kopf'."),
  B("haar", "haar", "het", "Haar", "das", "cognate",
    "Identical word and neuter gender: das Haar → het haar."),
  B("naam", "naam", "de", "Name", "der", "cognate",
    "der Name → de naam (long vowel doubled in closed syllable)."),
  B("woord", "woord", "het", "Wort", "das", "d↔t",
    "d↔t with matching neuter gender: das Wort → het woord."),
  B("land", "land", "het", "Land", "das", "cognate",
    "Identical word and neuter gender: das Land → het land."),
  B("zon", "zon", "de", "Sonne", "die", "z↔s",
    "z↔s: die Sonne → de zon."),
  B("maan", "maan", "de", "Mond", "der", "cognate",
    "der Mond → de maan."),
  B("lucht", "lucht", "de", "Luft", "die", "cognate",
    "Dutch 'cht' regularly answers to German 'ft': die Luft → de lucht."),
  B("sneeuw", "sneeuw", "de", "Schnee", "der", "cognate",
    "sn↔schn: der Schnee → de sneeuw."),
  B("vuur", "vuur", "het", "Feuer", "das", "v↔f",
    "v↔f + uu↔eu with matching neuter gender: das Feuer → het vuur."),
  B("boom", "boom", "de", "Baum", "der", "cognate",
    "oo↔au: der Baum → de boom."),
  B("hond", "hond", "de", "Hund", "der", "cognate",
    "o↔u: der Hund → de hond."),
  B("vogel", "vogel", "de", "Vogel", "der", "cognate",
    "Identical spelling: der Vogel → de vogel."),
  B("vis", "vis", "de", "Fisch", "der", "v↔f",
    "v↔f + s↔sch: der Fisch → de vis."),
  B("kaas", "kaas", "de", "Käse", "der", "cognate",
    "der Käse → de kaas."),
  B("ei", "ei", "het", "Ei", "das", "cognate",
    "Identical word and neuter gender: das Ei → het ei."),
  B("bier", "bier", "het", "Bier", "das", "cognate",
    "Identical word and neuter gender: das Bier → het bier."),
  B("geld", "geld", "het", "Geld", "das", "cognate",
    "Identical word and neuter gender: das Geld → het geld."),
  B("werk", "werk", "het", "Werk", "das", "cognate",
    "Matching neuter gender (das Werk → het werk), used for everyday 'die Arbeit'."),
  B("brug", "brug", "de", "Brücke", "die", "cognate",
    "die Brücke → de brug."),
  B("vliegtuig", "vliegtuig", "het", "Flugzeug", "das", "v↔f",
    "Same fly+gear compound (das → het): das Flugzeug → het vliegtuig."),
  B("jaar", "jaar", "het", "Jahr", "das", "cognate",
    "Matching neuter gender: das Jahr → het jaar."),
  B("maand", "maand", "de", "Monat", "der", "cognate",
    "der Monat → de maand."),
  B("nacht", "nacht", "de", "Nacht", "die", "cognate",
    "Identical word (die → de): die Nacht → de nacht."),
  B("licht", "licht", "het", "Licht", "das", "cognate",
    "Identical word and neuter gender: das Licht → het licht."),
  B("recht", "recht", "het", "Recht", "das", "cognate",
    "Identical word and neuter gender: das Recht → het recht."),
  B("geluk", "geluk", "het", "Glück", "das", "cognate",
    "Matching neuter gender: das Glück → het geluk."),
  B("hebben", "hebben", null, "haben", null, "cognate",
    "Core verb: German 'haben' → Dutch 'hebben'."),
  B("gaan", "gaan", null, "gehen", null, "cognate",
    "Core verb: German 'gehen' → Dutch 'gaan'."),
  B("komen", "komen", null, "kommen", null, "cognate",
    "Core verb: German 'kommen' → Dutch 'komen' (single m in open syllable)."),
  B("zien", "zien", null, "sehen", null, "z↔s",
    "z↔s: German 'sehen' → Dutch 'zien'."),
  B("horen", "horen", null, "hören", null, "cognate",
    "German 'hören' → Dutch 'horen'."),
  B("zeggen", "zeggen", null, "sagen", null, "z↔s",
    "z↔s: German 'sagen' → Dutch 'zeggen'."),
  B("denken", "denken", null, "denken", null, "cognate",
    "Identical verb: German 'denken' → Dutch 'denken'."),
  B("vinden", "vinden", null, "finden", null, "v↔f",
    "v↔f: German 'finden' → Dutch 'vinden'."),
  B("geven", "geven", null, "geben", null, "cognate",
    "v↔b: German 'geben' → Dutch 'geven'."),
  B("nemen", "nemen", null, "nehmen", null, "cognate",
    "German 'nehmen' → Dutch 'nemen'."),
  B("lezen", "lezen", null, "lesen", null, "z↔s",
    "z↔s: German 'lesen' → Dutch 'lezen'."),
  B("wonen", "wonen", null, "wohnen", null, "cognate",
    "German 'wohnen' → Dutch 'wonen'."),
  B("worden", "worden", null, "werden", null, "cognate",
    "German 'werden' → Dutch 'worden' (also passive auxiliary)."),
  B("kunnen", "kunnen", null, "können", null, "cognate",
    "German 'können' → Dutch 'kunnen'."),
  B("willen", "willen", null, "wollen", null, "cognate",
    "German 'wollen' → Dutch 'willen'."),
  B("niet", "niet", null, "nicht", null, "cognate",
    "German 'nicht' → Dutch 'niet' (same negator position rules as German)."),
  B("geen", "geen", null, "kein", null, "cognate",
    "German 'kein' → Dutch 'geen' (negates indefinite nouns, just like German)."),
  B("met", "met", null, "mit", null, "cognate",
    "German 'mit' → Dutch 'met'."),
  B("voor", "voor", null, "für / vor", null, "v↔f",
    "Dutch 'voor' covers both German 'für' (for) and 'vor' (before/in front of)."),
  B("na", "na", null, "nach", null, "cognate",
    "Time 'nach' → 'na' ('na het werk'); direction 'nach' → 'naar' ('naar huis')."),
  B("naar", "naar", null, "nach / zu", null, "cognate",
    "Direction preposition: German 'nach / zu' → Dutch 'naar' ('naar de stad')."),
  B("door", "door", null, "durch", null, "cognate",
    "German 'durch' → Dutch 'door'."),
  B("tegen", "tegen", null, "gegen", null, "cognate",
    "German 'gegen' → Dutch 'tegen'."),
  B("waar", "waar", null, "wo", null, "cognate",
    "German 'wo' → Dutch 'waar' (don't confuse with German 'wahr' = Dutch 'waar' true!)."),
  B("waarom", "waarom", null, "warum", null, "cognate",
    "German 'warum' → Dutch 'waarom'."),
  B("omdat", "omdat", null, "weil", null, "translation",
    "Subordinating conjunction (sends verb to the end, just like German 'weil')."),
  B("hoewel", "hoewel", null, "obwohl", null, "translation",
    "Subordinating conjunction: German 'obwohl' → Dutch 'hoewel'."),
  B("veel", "veel", null, "viel", null, "cognate",
    "German 'viel' → Dutch 'veel'."),
  B("snel", "snel", null, "schnell", null, "cognate",
    "sn↔schn: German 'schnell' → Dutch 'snel'."),
  B("slecht", "slecht", null, "schlecht", null, "cognate",
    "sl↔schl: German 'schlecht' → Dutch 'slecht'."),
  B("toch", "toch", null, "doch", null, "cognate",
    "Modal particle: German 'doch' → Dutch 'toch'."),
  B("nog", "nog", null, "noch", null, "g↔g/ch",
    "g↔ch: German 'noch' → Dutch 'nog'."),
];

const BY_ID: Record<string, GermanBridgeEntry> = Object.fromEntries(
  GERMAN_BRIDGE_ENTRIES.map((entry) => [entry.dutchId.toLowerCase(), entry])
);

const BY_WORD: Record<string, GermanBridgeEntry> = {};
for (const entry of GERMAN_BRIDGE_ENTRIES) {
  const key = entry.dutchWord.toLowerCase();
  if (!BY_WORD[key]) {
    BY_WORD[key] = entry;
  }
}

export const GERMAN_BRIDGE_MAP: Readonly<Record<string, GermanBridgeEntry>> = BY_ID;

/** Look up a German-to-Dutch bridge entry by Dutch compendium word ID or Dutch word. */
export function lookupGermanBridge(wordOrId: string): GermanBridgeEntry | null {
  const key = wordOrId.trim().toLowerCase();
  if (!key) return null;
  return BY_ID[key] ?? BY_WORD[key] ?? null;
}

export function formatGermanWithArticle(
  entry: Pick<GermanBridgeEntry, "germanArticle" | "germanTwin">
): string {
  return entry.germanArticle ? `${entry.germanArticle} ${entry.germanTwin}` : entry.germanTwin;
}

export function formatDutchWithArticle(
  entry: Pick<GermanBridgeEntry, "dutchArticle" | "dutchWord">
): string {
  return entry.dutchArticle ? `${entry.dutchArticle} ${entry.dutchWord}` : entry.dutchWord;
}

export function formatGermanDutchPair(entry: GermanBridgeEntry): string {
  return `DE: ${formatGermanWithArticle(entry)} ↔ NL: ${formatDutchWithArticle(entry)}`;
}
