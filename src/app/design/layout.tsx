import React from "react";
import type { Metadata } from "next";
import "@/components/design/design.css";
import { DesignShell } from "@/components/design/DesignShell";

export const metadata: Metadata = {
  title: "Brücke Atelier — Expressive Language Studio",
  description:
    "Warm Editorial Atelier interface for Brücke — decode German, Dutch, French, and Spanish through English cognates.",
};

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return <DesignShell>{children}</DesignShell>;
}
