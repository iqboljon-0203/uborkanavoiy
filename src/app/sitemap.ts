import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const c = await getContent();
  const lastModified = new Date(c.updatedAt);
  const paths: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/xizmatlar", priority: 0.9, freq: "weekly" },
    ...c.services.map((s) => ({ path: `/xizmatlar/${s.slug}`, priority: 0.8, freq: "monthly" as const })),
  ];

  return paths.flatMap(({ path, priority, freq }) =>
    locales.map((l) => ({
      url: `${SITE_URL}/${l}${path}`,
      lastModified,
      changeFrequency: freq,
      priority,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${SITE_URL}/${x}${path}`])) },
    })),
  );
}
