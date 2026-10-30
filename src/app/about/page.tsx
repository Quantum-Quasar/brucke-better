import React from "react";
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
  title: "About — Brücke",
  description:
    "How Brücke teaches German, French, Spanish and Dutch through words you already know, using sound shifts, conversion bridges and spaced review.",
};

const SHIFT_SAMPLES = [
  { shift: "th → d", english: "brother / water", german: "Bruder / Wasser", note: "The dental fricative flattened into a hard plosive" },
  { shift: "p → f / ff", english: "ship / hope / open", german: "Schiff / hoffen / offen", note: "Voiceless bilabial plosive softened to fricatives" },
  { shift: "t → ss / s / z", english: "water / street / foot", german: "Wasser / Straße / Fuß", note: "Voiceless alveolar shifted post-vocalically" },
  { shift: "k → ch", english: "make / book / speak", german: "machen / Buch / sprechen", note: "Velar stop shifted to velar fricative" },
  { shift: "d → t", english: "day / daughter / dream", german: "Tag / Tochter / Traum", note: "Voiced alveolar plosive hardened to voiceless" },
  { shift: "v / b → b", english: "give / live / love", german: "geben / leben / lieben", note: "Germanic fricative preserved as voiced plosive" },
];

export default function AboutPage() {
  const germanLessons = LESSONS.length;
  const frenchLessons = FR_LESSONS.length;
  const dutchLessons = NL_LESSONS.length;
  const familyCount = getAtlasFamilies(compendium).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 font-sans">
      {/* Header & Back Link */}
      <div className="space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>return home</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-color)]">
          About Brücke
        </h1>
        <p className="text-sm text-[var(--sub-color)] font-mono leading-relaxed">
          Historical sound shifts and conversion bridges as a language acquisition engine — German, French, Spanish, and Dutch.
        </p>
        <p className="text-xs font-mono text-[var(--sub-color)]">
          An independent project · no account · progress stays in your browser.
        </p>
      </div>

      {/* Philosophy Section */}
      <section className="p-6 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-4">
        <h2 className="text-base font-bold text-[var(--main-color)] font-mono uppercase tracking-wider">
          The Philosophy
        </h2>
        <div className="text-sm leading-relaxed text-[var(--text-color)] space-y-3">
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
          <ul className="list-disc pl-5 space-y-1 font-mono text-xs text-[var(--text-color)]">
            <li><span className="text-[var(--main-color)]">Water</span> is <span className="text-[var(--main-color)]">Wasser</span> (T → SS)</li>
            <li><span className="text-[var(--main-color)]">Ship</span> is <span className="text-[var(--main-color)]">Schiff</span> (P → FF)</li>
            <li><span className="text-[var(--main-color)]">Brother</span> is <span className="text-[var(--main-color)]">Bruder</span> (TH → D)</li>
            <li><span className="text-[var(--main-color)]">Make</span> is <span className="text-[var(--main-color)]">machen</span> (K → CH)</li>
          </ul>
          <p>
            <strong>Brücke</strong> (German for &ldquo;bridge&rdquo;) reverses this historical divergence. By training your pattern
            recognition instead of raw rote memorization, you bridge thousands of cognates in days rather than months.
          </p>
          <p>
            The same engine now drives a <strong>French course</strong>: the Norman conquest of 1066 flooded English with
            French doublets, and the French trail decodes them the same way — conversion bridges instead of consonant
            shifts, one thought at a time. A <strong>Spanish course</strong> applies the same idea to Latin roots and
            Castilian sound changes (initial f- to silent h-, -ct- to -ch-, -tion to -ción).
          </p>
          <p>
            <strong>Dutch</strong> is the reverse case. It is a Low Franconian West Germanic sibling that never
            underwent the High German shift, so the consonants English kept are usually still there: <span className="font-mono">water</span> is{" "}
            <span className="font-mono">water</span>, <span className="font-mono">ship</span> is{" "}
            <span className="font-mono">schip</span>, <span className="font-mono">book</span> is{" "}
            <span className="font-mono">boek</span>. The Dutch trail spends its energy on the vowels, <span className="font-mono">de/het</span>,
            and the word-order machine that English lost.
          </p>
        </div>
      </section>

      {/* Shift Overview Table */}
      <section className="p-6 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-4">
        <h2 className="text-base font-bold text-[var(--main-color)] font-mono uppercase tracking-wider">
          Core Consonant Shifts
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[var(--sub-color)]/20 text-[var(--sub-color)]">
                <th className="py-2 pr-4">Shift</th>
                <th className="py-2 pr-4">English</th>
                <th className="py-2 pr-4">German</th>
                <th className="py-2">Phonetic Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--sub-color)]/10 text-[var(--text-color)]">
              {SHIFT_SAMPLES.map((row) => (
                <tr key={row.shift} className="hover:bg-[var(--bg-color)]/50 transition">
                  <td className="py-2.5 pr-4 font-bold text-[var(--main-color)]">{row.shift}</td>
                  <td className="py-2.5 pr-4">{row.english}</td>
                  <td className="py-2.5 pr-4 font-bold">{row.german}</td>
                  <td className="py-2.5 text-[var(--sub-color)] text-[11px]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Curriculum & Spaced Repetition */}
      <section className="p-6 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-4">
        <h2 className="text-base font-bold text-[var(--main-color)] font-mono uppercase tracking-wider">
          Learning Engine & SRS
        </h2>
        <div className="text-sm leading-relaxed text-[var(--text-color)] space-y-3">
          <p>
            Brücke combines structural curriculum with an active SuperMemo-2 (SM-2) spaced repetition algorithm:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/20 space-y-1">
              <div className="font-mono text-xs font-bold text-[var(--main-color)]">The Trail</div>
              <p className="text-sm text-[var(--sub-color)] leading-relaxed">
                {TOTAL_TOPICS} progressive topics and {germanLessons} authored German lessons
                scaffolding from direct cognates to modal verbs, compound calques, and complex syntax.
                French and Spanish add {frenchLessons} lessons each; Dutch adds {dutchLessons}.
              </p>
            </div>
            <div className="p-3.5 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/20 space-y-1">
              <div className="font-mono text-xs font-bold text-[var(--main-color)]">The Atlas</div>
              <p className="text-sm text-[var(--sub-color)] leading-relaxed">
                Deep exploration into {familyCount} phonetic shift families with morphological
                comparisons and literature citations.
              </p>
            </div>
            <div className="p-3.5 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/20 space-y-1">
              <div className="font-mono text-xs font-bold text-[var(--main-color)]">SM-2 Spaced Review</div>
              <p className="text-sm text-[var(--sub-color)] leading-relaxed">
                4 review styles (flashcards, MCQ, morpheme tiles, typing) with adaptive intervals to prevent memory decay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creator presence / trust */}
      <section className="p-6 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-3">
        <h2 className="text-base font-bold text-[var(--main-color)] font-mono uppercase tracking-wider">
          Who built this
        </h2>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--main-color)] text-[var(--bg-color)] font-bold font-mono flex items-center justify-center shrink-0">
            SK
          </div>
          <div className="space-y-2 text-sm leading-relaxed text-[var(--text-color)]">
            <p>
              Brücke is an independent project by <strong>Shaurya Kad</strong>. The German,
              French, Spanish and Dutch curricula are hand-authored, and every word links back to the
              same compendium.
            </p>
            <p className="text-[var(--sub-color)]">
              No accounts, ads, or tracking. Progress stays in your browser. The source and issue
              tracker are public.
            </p>
            <a
              href="https://github.com/Quantum-Quasar/brucke"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--main-color)] hover:underline"
            >
              View the source on GitHub
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <Link
          href="/"
          className="p-3.5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 hover:border-[var(--main-color)]/50 transition flex flex-col items-center text-center gap-1 group"
        >
          <BookOpen className="w-5 h-5 text-[var(--sub-color)] group-hover:text-[var(--main-color)] transition" />
          <span className="text-xs font-mono font-bold text-[var(--text-color)] mt-1">Trail</span>
          <span className="text-[11px] text-[var(--sub-color)]">
            {TOTAL_TOPICS} topics · {germanLessons} lessons
          </span>
        </Link>
        <Link
          href="/atlas"
          className="p-3.5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 hover:border-[var(--main-color)]/50 transition flex flex-col items-center text-center gap-1 group"
        >
          <Compass className="w-5 h-5 text-[var(--sub-color)] group-hover:text-[var(--main-color)] transition" />
          <span className="text-xs font-mono font-bold text-[var(--text-color)] mt-1">Atlas</span>
          <span className="text-[11px] text-[var(--sub-color)]">{familyCount} families</span>
        </Link>
        <Link
          href="/review"
          className="p-3.5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 hover:border-[var(--main-color)]/50 transition flex flex-col items-center text-center gap-1 group"
        >
          <RotateCcw className="w-5 h-5 text-[var(--sub-color)] group-hover:text-[var(--main-color)] transition" />
          <span className="text-xs font-mono font-bold text-[var(--text-color)] mt-1">Review</span>
          <span className="text-[11px] text-[var(--sub-color)]">SM-2 Spaced Hub</span>
        </Link>
        <Link
          href="/settings"
          className="p-3.5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 hover:border-[var(--main-color)]/50 transition flex flex-col items-center text-center gap-1 group"
        >
          <Sliders className="w-5 h-5 text-[var(--sub-color)] group-hover:text-[var(--main-color)] transition" />
          <span className="text-xs font-mono font-bold text-[var(--text-color)] mt-1">Settings</span>
          <span className="text-[11px] text-[var(--sub-color)]">Themes & Audio</span>
        </Link>
      </section>
    </div>
  );
}
