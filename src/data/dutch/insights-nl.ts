import type { DailyInsight } from "@/lib/types";

// 28 Dutch expressions, each teaching a structural or cultural habit.
// Entries follow the shared DailyInsight shape (the german_* field names are
// historical; the content is Dutch). All expressions and example sentences are
// attested standard Dutch; uncertain folk etymologies are hedged.
export const DUTCH_INSIGHTS: DailyInsight[] = [
  {
    day: 1,
    german_expression: "de kat uit de boom kijken",
    english_meaning: "to wait and see (lit. to look the cat out of the tree)",
    cultural_etymology:
      "The image is a dog staring up at a cat that has fled into a tree; Carolus Tuinman recorded the belief in 1726 that steady staring would make the cat come down. Example: Ik kijk de kat nog even uit de boom voordat ik reageer.",
    takeaway_principle: "Dutch often thinks through concrete animal scenes rather than abstract nouns.",
  },
  {
    day: 2,
    german_expression: "een appeltje voor de dorst",
    english_meaning: "a nest egg, something saved for a rainy day (lit. a little apple for the thirst)",
    cultural_etymology:
      "Apples keep well, so storing one against later thirst became a metaphor for a reserve; the diminutive makes it modest and everyday. Example: Ze heeft een appeltje voor de dorst achter de hand.",
    takeaway_principle: "The diminutive is not only 'small' — it can make a concept unpretentious and friendly.",
  },
  {
    day: 3,
    german_expression: "de spijker op de kop slaan",
    english_meaning: "to hit the nail on the head (lit. to hit the nail on the head)",
    cultural_etymology:
      "From carpentry: a nail goes in straight only if you strike the head squarely. Example: Je sloeg de spijker op de kop met die opmerking.",
    takeaway_principle: "Dutch and English share many Germanic craft metaphors almost word for word.",
  },
  {
    day: 4,
    german_expression: "iets onder de knie krijgen",
    english_meaning: "to master something (lit. to get something under the knee)",
    cultural_etymology:
      "From wrestling: the winner pins the opponent with a knee on the chest; Tuinman defined it as 'to subdue completely' before it spread to skills. Example: Nu heb ik de grammatica onder de knie.",
    takeaway_principle: "Body-part idioms map abstract learning onto physical control.",
  },
  {
    day: 5,
    german_expression: "het heft in eigen handen nemen",
    english_meaning: "to take charge (lit. to take the handle in one's own hands)",
    cultural_etymology:
      "Heft is the grip of a knife or sword, attested in this sense since 1480; gripping the hilt pictures seizing control. Example: Na haar ontslag nam ze het heft in eigen handen.",
    takeaway_principle: "Eigen ('own') is a heavily used Dutch word, and reflexive possession is central to its view of agency.",
  },
  {
    day: 6,
    german_expression: "van de regen in de drup",
    english_meaning: "out of the frying pan into the fire (lit. from the rain into the drip)",
    cultural_etymology:
      "Drup is water dripping from eaves or branches; German has the same image in vom Regen in die Traufe. Example: Ik wilde de file vermijden en belandde van de regen in de drup.",
    takeaway_principle: "Cognate languages often share a metaphor but not the individual fossil word — drup survives mainly inside this idiom.",
  },
  {
    day: 7,
    german_expression: "boter bij de vis",
    english_meaning: "cash on delivery, payment up front (lit. butter with the fish)",
    cultural_etymology:
      "The usual explanation is kitchen practice: have the butter ready when the fish goes into the pan; a 17th-century variant is geld bij de vis. Example: Geen credit, boter bij de vis.",
    takeaway_principle: "An instruction about cooking can harden into a rule about money.",
  },
  {
    day: 8,
    german_expression: "zo ziek als een hond",
    english_meaning: "as sick as a dog (lit. as sick as a dog)",
    cultural_etymology:
      "The comparison is an intensifier rather than an observation; Dutch has a family of 'as ... as an animal' intensifiers. Example: Ik was gisteren zo ziek als een hond.",
    takeaway_principle: "Similes can signal intensity without being literally true.",
  },
  {
    day: 9,
    german_expression: "met de deur in huis vallen",
    english_meaning: "to come straight to the point (lit. to fall into the house with the door)",
    cultural_etymology:
      "The image is someone entering and immediately stating their business instead of making small talk; the precise origin is undocumented. Example: Ze viel met de deur in huis: 'Ik ga verhuizen.'",
    takeaway_principle: "Dutch directness is encoded in everyday idioms, not only in manners.",
  },
  {
    day: 10,
    german_expression: "de bloemetjes buiten zetten",
    english_meaning: "to paint the town red, to let one's hair down (lit. to put the little flowers outside)",
    cultural_etymology:
      "Probably from decorating the street or façade with flowers for a feast; the origin is not firmly documented. Example: We hebben gisteren de bloemetjes buiten gezet.",
    takeaway_principle: "A diminutive plural makes even wild celebration sound light and harmless.",
  },
  {
    day: 11,
    german_expression: "voor een appel en een ei",
    english_meaning: "for a song, dirt cheap (lit. for an apple and an egg)",
    cultural_etymology:
      "Both foods were ordinary and cheap; the expression is recorded in the 18th century. Example: Ik heb die fiets voor een appel en een ei gekocht.",
    takeaway_principle: "Basic foodstuffs are a natural measuring stick for money.",
  },
  {
    day: 12,
    german_expression: "een dubbeltje op zijn kant",
    english_meaning: "a close call, touch and go (lit. a ten-cent coin on its edge)",
    cultural_etymology:
      "A dubbeltje was a 10-cent coin, a tenth of a guilder; balanced on its edge, it could fall either way. Example: Het was een dubbeltje op zijn kant.",
    takeaway_principle: "Pre-euro currency survives inside fixed expressions.",
  },
  {
    day: 13,
    german_expression: "gezellig",
    english_meaning: "cosy, convivial, sociable — the warmth of shared company",
    cultural_etymology:
      "From gezel ('companion'); first attested in the sense 'snug' in 1240. It describes the atmosphere people create together, not just a room. Example: Het was echt gezellig.",
    takeaway_principle: "Untranslatable words are cultural evidence — teach the situations, not a single English gloss.",
  },
  {
    day: 14,
    german_expression: "lekker",
    english_meaning: "tasty; nice, pleasant (from an old sense of lekken, to lick)",
    cultural_etymology:
      "It reaches far beyond food: lekker slapen ('sleep well'), lekker weer ('nice weather'), even ironic lekker belangrijk. Example: We hebben lekker gegeten.",
    takeaway_principle: "Sensory adjectives routinely broaden into general evaluators.",
  },
  {
    day: 15,
    german_expression: "uitwaaien",
    english_meaning: "to clear one's head by walking in the wind (lit. to blow out)",
    cultural_etymology:
      "A separable verb: ik waai uit, ik ben uitgeraaiwd. The literal sense 'to blow out a flame' also exists. Example: Ik ga even uitwaaien op het strand.",
    takeaway_principle: "Separable prefixes carry direction, and Dutch productively builds new verbs from them.",
  },
  {
    day: 16,
    german_expression: "borrel",
    english_meaning: "informal drinks with snacks; a shot of jenever",
    cultural_etymology:
      "Probably from Middle Dutch borre/borne ('spring, drinking water') plus -el; the word shifted from water to strong drink. Example: Kom je naar de borrel?",
    takeaway_principle: "Etymology can be humble while the cultural ritual becomes elaborate.",
  },
  {
    day: 17,
    german_expression: "doe normaal",
    english_meaning: "act normal, don't show off (lit. do normal)",
    cultural_etymology:
      "A deeply Dutch injunction with Calvinist and egalitarian overtones; tone decides whether it is affectionate advice or a rebuke. Example: Doe normaal, je hoeft niet op te scheppen.",
    takeaway_principle: "Bare imperatives reveal social norms more directly than polite formulas.",
  },
  {
    day: 18,
    german_expression: "komt goed",
    english_meaning: "it'll be fine, no worries (lit. comes good)",
    cultural_etymology:
      "The subject het is dropped in this fixed reassuring formula; komt wel goed is a warmer variant. Example: Maak je geen zorgen, het komt goed.",
    takeaway_principle: "Dutch frequently drops subjects in colloquial set phrases.",
  },
  {
    day: 19,
    german_expression: "geen probleem",
    english_meaning: "no problem, not at all (lit. no problem)",
    cultural_etymology:
      "A transparent negation with geen before an indefinite noun, behaving as a fixed social formula. Example: 'Sorry dat ik laat ben.' 'Geen probleem.'",
    takeaway_principle: "The choice between niet and geen is grammatical, not stylistic.",
  },
  {
    day: 20,
    german_expression: "het is maar net",
    english_meaning: "it depends, it's all relative (lit. it is just exactly)",
    cultural_etymology:
      "Usually expanded as het is maar net hoe je het bekijkt; maar and net are modal particles that soften and relativise. Example: Het is maar net hoe je het bekijkt.",
    takeaway_principle: "Small modal particles carry much of Dutch conversational tone.",
  },
  {
    day: 21,
    german_expression: "eerlijk is eerlijk",
    english_meaning: "fair is fair (lit. honest is honest)",
    cultural_etymology:
      "A tautological proverb used to concede a point; the related eerlijk duurt het langst means 'honesty is the best policy'. Example: Eerlijk is eerlijk: hij had gelijk.",
    takeaway_principle: "X-is-X tautologies are a common Dutch way of closing an argument.",
  },
  {
    day: 22,
    german_expression: "de koe bij de horens vatten",
    english_meaning: "to take the bull by the horns (lit. to grab the cow by the horns)",
    cultural_etymology:
      "Dutch says koe (cow) where English says bull, but the image and meaning are identical. Example: We moeten de koe bij de horens vatten.",
    takeaway_principle: "Same metaphor, different animal — a classic idiom false friend.",
  },
  {
    day: 23,
    german_expression: "water naar de zee dragen",
    english_meaning: "to carry coals to Newcastle (lit. to carry water to the sea)",
    cultural_etymology:
      "An image of pointless effort, natural in a country defined by water management. Example: Meer regels maken is water naar de zee dragen.",
    takeaway_principle: "Landscape shapes which metaphors feel obvious.",
  },
  {
    day: 24,
    german_expression: "een gat in de dag slapen",
    english_meaning: "to sleep half the day away (lit. to sleep a hole in the day)",
    cultural_etymology:
      "Gat ('hole') pictures the missing chunk of daylight; there is no exact English idiom. Example: Hij slaapt op zondag een gat in de dag.",
    takeaway_principle: "Concrete nouns plus a verb can create vivid idiom without any abstraction.",
  },
  {
    day: 25,
    german_expression: "nu breekt mijn klomp",
    english_meaning: "well, blow me down! (lit. now my clog breaks)",
    cultural_etymology:
      "An exclamation of astonishment built on the wooden clog as a symbol of Dutchness; the origin is uncertain. Example: Nu breekt mijn klomp!",
    takeaway_principle: "Culture-specific objects can become pure exclamations.",
  },
  {
    day: 26,
    german_expression: "een broodje aap",
    english_meaning: "an urban legend (lit. a monkey sandwich)",
    cultural_etymology:
      "Popularised by Ethel Portnoy's 1978 book Broodje aap, which collected such stories; the name comes from a tale about a sandwich made of monkey meat. Example: Dat verhaal is een broodje aap.",
    takeaway_principle: "Modern coinages can become idioms within a generation.",
  },
  {
    day: 27,
    german_expression: "de kogel is door de kerk",
    english_meaning: "the decision is made, the die is cast (lit. the bullet is through the church)",
    cultural_etymology:
      "Traditionally linked to the rule that churches should be spared in war; a cannonball fired through Haarlem's St Bavo in 1573 is still shown, but Stoett doubted the story. Example: De kogel is door de kerk: we verhuizen.",
    takeaway_principle: "A vivid folk etymology can outlive the evidence — teach the idiom, hedge the story.",
  },
  {
    day: 28,
    german_expression: "zoals het klokje thuis tikt, tikt het nergens",
    english_meaning: "there's no place like home (lit. as the clock ticks at home, it ticks nowhere)",
    cultural_etymology:
      "A proverb built on a domestic diminutive (klokje) rather than an abstract claim about belonging. Example: Na drie weken reizen dacht ik: zoals het klokje thuis tikt, tikt het nergens.",
    takeaway_principle: "Dutch proverbs often prefer a homely image to a general truth.",
  },
];
