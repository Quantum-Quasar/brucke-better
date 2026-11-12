import type { MetadataRoute } from "next";
import { getPublishedLessonRoutes } from "@/lib/lesson-catalog";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return ["/", "/about", "/atlas", "/panorama", ...getPublishedLessonRoutes().map((route) => route.href)]
    .map((path) => ({ url: new URL(path, base).href }));
}
