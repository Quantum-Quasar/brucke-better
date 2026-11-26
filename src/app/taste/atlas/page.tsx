"use client";

import AtlasPage from "@/app/atlas/page";
import { TastePageFrame } from "@/components/taste/TastePageFrame";

export default function TasteAtlasPage() {
  return (
    <TastePageFrame eyebrow="Phonological Atlas" backHref="/taste" backLabel="Trail">
      <AtlasPage />
    </TastePageFrame>
  );
}
