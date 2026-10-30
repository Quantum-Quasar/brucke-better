import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review — Brücke",
  description:
    "Spaced-repetition review for German, Dutch, French, and Spanish cognates: due cards, weakest words, sentence patterns, and article drills.",
};

export default function ReviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
