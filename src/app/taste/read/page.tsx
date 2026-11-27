"use client";

import ReadingLensPage from "@/app/read/page";
import { TastePageFrame } from "@/components/taste/TastePageFrame";

export default function TasteReadPage() {
  return (
    <TastePageFrame eyebrow="Reading Lens" backHref="/taste" backLabel="Trail">
      <ReadingLensPage />
    </TastePageFrame>
  );
}
