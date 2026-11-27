import type { Metadata } from "next";
import AboutPage from "@/app/about/page";
import { TastePageFrame } from "@/components/taste/TastePageFrame";

export const metadata: Metadata = {
  title: "About — Brücke",
  description:
    "How Brücke teaches German, French, Spanish and Dutch through words you already know, using sound shifts, conversion bridges and spaced review.",
};

export default function TasteAboutPage() {
  return (
    <TastePageFrame eyebrow="Methodology" backHref="/taste" backLabel="Trail">
      <AboutPage />
    </TastePageFrame>
  );
}
