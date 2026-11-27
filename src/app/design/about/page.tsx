import Link from "next/link";
import { ArrowLeft, BookOpen, Compass, ExternalLink, RotateCcw, Sliders } from "lucide-react";
import type { Metadata } from "next";
import { LESSONS } from "@/data/lessons";
import { FR_LESSONS } from "@/data/french/lessons-fr";
import { NL_LESSONS } from "@/data/dutch/lessons-nl";
import { TOTAL_TOPICS } from "@/data/curriculum";
import { compendium } from "@/data/compendium";
import { getAtlasFamilies } from "@/lib/atlas-families";

export const metadata: Metadata = {
  title: "About — Brücke Atelier",
  description:
    "How Brücke teaches German, French, Spanish, and Dutch through words you already know, using sound shifts, conversion bridges, and spaced review.",
};

const SHIFT_SAMPLES = [
  { shift: "th → d", english: "brother / water", german: "Bruder / Wasser", note: "The dental fricative flattened into a hard plosive" },
  { shift: "p → f / ff", english: "ship / hope / open", german: "Schiff / hoffen / offen", note: "Voiceless bilabial plosive softened to fricatives" },
  { shift: "t → ss / s / z", english: "water / street / foot", german: "Wasser / Straße / Fuß", note: "Voiceless alveolar shifted post-vocalically" },
  { shift: "k → ch", english: "make / book / speak", german: "machen / Buch / sprechen", note: "Velar stop shifted to velar fricative" },
  { shift: "d → t", english: "day / daughter / dream", german: "Tag / Tochter / Traum", note: "Voiced alveolar plosive hardened to voiceless" },
  { shift: "v / b → b", english: "give / live / love", german: "geben / leben / lieben", note: "Germanic fricative preserved as voiced plosive" },
];

export default function DesignAboutPage() {
  const germanLessons = LESSONS.length;
  const frenchLessons = FR_LESSONS.length;
  const dutchLessons = NL_LESSONS.length;
  const familyCount = getAtlasFamilies(compendium).length;

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      <header className="space-y-3 pb-4 border-b border-[var(--design-border)]">
        <Link
          href="/design"
          className="min-h-11 inline-flex items-center gap-1.5 px-3 rounded-full bg-[var(--design-well)] border border-[var(--design-border)] text-xs font-semibold text-[var(--design-ink-muted)] hover:text-[var(--design-sapphire)] transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Return to Trail</span>
        </Link>
        <div className="space-y-1.5">
          <span className="block design-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--design-sapphire)]">
            Manifesto &amp; Method
          </span>
          <h1 className="design-serif text-3xl sm:text-4xl font-bold text-[var(--design-ink)]">
            About Brücke
          </h1>
          <p className="text-sm sm:text-base text-[var(--design-ink-muted)] leading-relaxed">
            Historical sound shifts and conversion bridges as a language acquisition engine — German, French, Spanish, and Dutch.
          </p>
          <p className="text-xs design-mono text-[var(--design-ink-muted)]">
            An independent project · no account · progress stays in your browser.
          </p>
        </div>
      </header>

      <section className="design-card p-6 space-y-4">
        <h2 className="design-serif text-xl font-bold text-[var(--design-ink)]">
          The Philosophy
        </h2>
        <div className="text-sm leading-relaxed text-[var(--design-ink)] space-y-3">
          <p>
            English and German are sister West Germanic languages. For centuries they shared nearly identical
            vocabularies until a massive phonetic shift swept across southern Germany between 500 and 700 AD:
            the <strong>Second High German Consonant Shift</strong> (<em>Zweite Lautverschiebung</em>).
          </p>
          <p>
            English, protected across the North Sea, preserved the ancient Germanic sounds. High German pushed them
            forward. When you learn German traditionally, you are forced to memorize hundreds of words from scratch as if
            they were alien. In reality, you already know them:
          </p>
          <ul className="grid sm:grid-cols-2 gap-2 design-mono text-xs pt-1">
            <li className="design-well px-3.5 py-2.5">
              <span className="text-[var(--design-sapphire)] font-bold">Water</span> →{" "}
              <span className="font-bold">Wasser</span> (T → SS)
            </li>
            <li className="design-well px-3.5 py-2.5">
              <span className="text-[var(--design-sapphire)] font-bold">Ship</span> →{" "}
              <span className="font-bold">Schiff</span> (P → FF)
            </li>
            <li className="design-well px-3.5 py-2.5">
              <span className="text-[var(--design-sapphire)] font-bold">Brother</span> →{" "}
              <span className="font-bold">Bruder</span> (TH → D)
            </li>
            <li className="design-well px-3.5 py-2.5">
              <span className="text-[var(--design-sapphire)] font-bold">Make</span> →{" "}
              <span className="font-bold">machen</span> (K → CH)
            </li>
          </ul>
          <p>
            <strong>Brücke</strong> (German for &ldquo;bridge&rdquo;) reverses this historical divergence. By training your pattern
            recognition instead of raw rote memorization, you learn to spot familiar roots and sound patterns across hundreds of everyday words.
          </p>
          <p>
            The same engine drives a <strong>French course</strong> (decoding Norman doublets), a <strong>Spanish course</strong>{" "}
            (Latin roots and Castilian shifts), and a <strong>Dutch course</strong> (preserving Germanic consonants while focusing on vowels,{" "}
            <span className="design-mono">de/het</span>, and word order).
          </p>
        </div>
      </section>

      <section className="design-card p-6 space-y-4">
        <h2 className="design-serif text-xl font-bold text-[var(--design-ink)]">
          Core Consonant Shifts
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs design-mono border-collapse">
            <thead>
              <tr className="border-b border-[var(--design-border)] text-[var(--design-ink-muted)]">
                <th className="py-2 pr-4">Shift</th>
                <th className="py-2 pr-4">English</th>
                <th className="py-2 pr-4">German</th>
                <th className="py-2">Phonetic Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--design-border)] text-[var(--design-ink)]">
              {SHIFT_SAMPLES.map((row) => (
                <tr key={row.shift} className="hover:bg-[var(--design-well)]/40 transition">
                  <td className="py-2.5 pr-4 font-bold text-[var(--design-sapphire)]">{row.shift}</td>
                  <td className="py-2.5 pr-4">{row.english}</td>
                  <td className="py-2.5 pr-4 font-bold">{row.german}</td>
                  <td className="py-2.5 text-[var(--design-ink-muted)] text-[11px]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="design-card p-6 space-y-4">
        <h2 className="design-serif text-xl font-bold text-[var(--design-ink)]">
          Learning Engine &amp; Spaced Repetition
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="design-well p-4 space-y-1.5">
            <div className="design-mono text-xs font-bold text-[var(--design-sapphire)]">The Trail</div>
            <p className="text-sm text-[var(--design-ink-muted)] leading-relaxed">
              {TOTAL_TOPICS} progressive topics and {germanLessons} authored German lessons. French and Spanish add {frenchLessons} lessons each; Dutch adds {dutchLessons}.
            </p>
          </div>
          <div className="design-well p-4 space-y-1.5">
            <div className="design-mono text-xs font-bold text-[var(--design-sapphire)]">The Atlas</div>
            <p className="text-sm text-[var(--design-ink-muted)] leading-relaxed">
              Deep exploration into {familyCount} phonetic shift families with morphological comparisons and literature citations.
            </p>
          </div>
          <div className="design-well p-4 space-y-1.5">
            <div className="design-mono text-xs font-bold text-[var(--design-emerald)]">Adaptive Review</div>
            <p className="text-sm text-[var(--design-ink-muted)] leading-relaxed">
              4 review styles (flashcards, MCQ, morpheme tiles, typing) powered by FSRS-4.5 spaced scheduling.
            </p>
          </div>
        </div>
      </section>

      <section className="design-card p-6 space-y-3">
        <h2 className="design-serif text-xl font-bold text-[var(--design-ink)]">
          Who built this
        </h2>
        <div className="flex items-start gap-3.5">
          <div
            className="w-11 h-11 rounded-2xl font-bold design-mono flex items-center justify-center shrink-0"
            style={{
              backgroundColor: "var(--design-sapphire)",
              color: "var(--design-on-accent)",
            }}
          >
            SK
          </div>
          <div className="space-y-2 text-sm leading-relaxed text-[var(--design-ink)]">
            <p>
              Brücke is an independent project by <strong>Shaurya Kad</strong>. The German,
              French, Spanish, and Dutch curricula are hand-authored, and every word links back to the
              same compendium.
            </p>
            <p className="text-[var(--design-ink-muted)]">
              No accounts, ads, or tracking. Progress stays in your browser.
            </p>
            <a
              href="https://github.com/Quantum-Quasar/brucke"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs design-mono font-semibold text-[var(--design-sapphire)] hover:underline"
            >
              <span>View the source on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/design"
          className="design-card design-card-interactive p-4 flex flex-col items-center text-center gap-1.5"
        >
          <BookOpen className="w-5 h-5 text-[var(--design-sapphire)]" aria-hidden="true" />
          <span className="text-xs design-mono font-bold text-[var(--design-ink)]">Trail</span>
          <span className="text-[11px] text-[var(--design-ink-muted)]">
            {TOTAL_TOPICS} topics · {germanLessons} lessons
          </span>
        </Link>
        <Link
          href="/design/atlas"
          className="design-card design-card-interactive p-4 flex flex-col items-center text-center gap-1.5"
        >
          <Compass className="w-5 h-5 text-[var(--design-sapphire)]" aria-hidden="true" />
          <span className="text-xs design-mono font-bold text-[var(--design-ink)]">Atlas</span>
          <span className="text-[11px] text-[var(--design-ink-muted)]">{familyCount} families</span>
        </Link>
        <Link
          href="/design/review"
          className="design-card design-card-interactive p-4 flex flex-col items-center text-center gap-1.5"
        >
          <RotateCcw className="w-5 h-5 text-[var(--design-emerald)]" aria-hidden="true" />
          <span className="text-xs design-mono font-bold text-[var(--design-ink)]">Review</span>
          <span className="text-[11px] text-[var(--design-ink-muted)]">FSRS Spaced Hub</span>
        </Link>
        <Link
          href="/design/settings"
          className="design-card design-card-interactive p-4 flex flex-col items-center text-center gap-1.5"
        >
          <Sliders className="w-5 h-5 text-[var(--design-sapphire)]" aria-hidden="true" />
          <span className="text-xs design-mono font-bold text-[var(--design-ink)]">Settings</span>
          <span className="text-[11px] text-[var(--design-ink-muted)]">Themes &amp; Audio</span>
        </Link>
      </section>
    </div>
  );
}
