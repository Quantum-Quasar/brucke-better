"use client";

import PracticeStudioPage from "@/app/practice/page";
import { TastePageFrame } from "@/components/taste/TastePageFrame";

export default function TastePracticePage() {
  return (
    <TastePageFrame eyebrow="Practice Studio" backHref="/taste" backLabel="Trail">
      <PracticeStudioPage />
    </TastePageFrame>
  );
}
