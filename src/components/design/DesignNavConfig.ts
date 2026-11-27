import type React from "react";
import {
  Award,
  BookOpen,
  Compass,
  Dumbbell,
  Eye,
  FileWarning,
  Info,
  Layers,
  RotateCcw,
  Sliders,
} from "lucide-react";

export interface DesignNavItem {
  id: string;
  href: string;
  basePath: string;
  label: string;
  shortLabel: string;
  group: "studio" | "reference";
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

export const DESIGN_NAV_ITEMS: readonly DesignNavItem[] = [
  {
    id: "trail",
    href: "/design",
    basePath: "/",
    label: "Trail",
    shortLabel: "Trail",
    group: "studio",
    icon: BookOpen,
  },
  {
    id: "review",
    href: "/design/review",
    basePath: "/review",
    label: "Review",
    shortLabel: "Review",
    group: "studio",
    icon: RotateCcw,
  },
  {
    id: "atlas",
    href: "/design/atlas",
    basePath: "/atlas",
    label: "Atlas",
    shortLabel: "Atlas",
    group: "studio",
    icon: Compass,
  },
  {
    id: "practice",
    href: "/design/practice",
    basePath: "/practice",
    label: "Practice",
    shortLabel: "Practice",
    group: "studio",
    icon: Dumbbell,
  },
  {
    id: "read",
    href: "/design/read",
    basePath: "/read",
    label: "Reader",
    shortLabel: "Reader",
    group: "studio",
    icon: Eye,
  },
  {
    id: "mistakes",
    href: "/design/mistakes",
    basePath: "/mistakes",
    label: "Mistakes",
    shortLabel: "Mistakes",
    group: "reference",
    icon: FileWarning,
  },
  {
    id: "panorama",
    href: "/design/panorama",
    basePath: "/panorama",
    label: "Panorama",
    shortLabel: "Panorama",
    group: "reference",
    icon: Layers,
  },
  {
    id: "cando",
    href: "/design/cando",
    basePath: "/cando",
    label: "Can-Do",
    shortLabel: "Can-Do",
    group: "reference",
    icon: Award,
  },
  {
    id: "settings",
    href: "/design/settings",
    basePath: "/settings",
    label: "Settings",
    shortLabel: "Settings",
    group: "reference",
    icon: Sliders,
  },
  {
    id: "about",
    href: "/design/about",
    basePath: "/about",
    label: "About",
    shortLabel: "About",
    group: "reference",
    icon: Info,
  },
] as const;

export const DESIGN_MOBILE_PRIMARY_IDS = ["trail", "review", "atlas", "practice"] as const;
