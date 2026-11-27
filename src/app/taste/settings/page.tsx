"use client";

import SettingsPage from "@/app/settings/page";
import { TastePageFrame } from "@/components/taste/TastePageFrame";

export default function TasteSettingsPage() {
  return (
    <TastePageFrame eyebrow="Preferences" backHref="/taste" backLabel="Trail">
      <SettingsPage />
    </TastePageFrame>
  );
}
