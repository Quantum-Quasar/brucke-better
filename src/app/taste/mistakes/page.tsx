"use client";

import MistakesPage from "@/app/mistakes/page";
import { TastePageFrame } from "@/components/taste/TastePageFrame";

export default function TasteMistakesPage() {
  return (
    <TastePageFrame eyebrow="Mistake Notebook" backHref="/taste" backLabel="Trail">
      <MistakesPage />
    </TastePageFrame>
  );
}
