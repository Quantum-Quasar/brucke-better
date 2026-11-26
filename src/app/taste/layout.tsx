import React from "react";
import type { Metadata } from "next";
import { TasteShell } from "@/components/taste/TasteShell";

export const metadata: Metadata = {
  title: "Brücke — Learn German, Dutch, French & Spanish through English cognates",
  description:
    "Decode European languages through the English words you already know — sound shifts, conversion bridges, and spaced review.",
};

export default function TasteLayout({ children }: { children: React.ReactNode }) {
  return <TasteShell>{children}</TasteShell>;
}
