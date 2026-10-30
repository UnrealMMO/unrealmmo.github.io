import type { MetadataRoute } from "next";
import { skills, structures } from "@/content/game";
import { wikiItems } from "@/content/wiki-items";
import { site } from "@/config/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "skills/",
    "season-pass/",
    "wiki/",
    "wiki/structures/",
    "wiki/settlements/",
    "wiki/items/",
    "about/",
    "privacy-policy/",
    ...skills.map((s) => `skills/${s.id}/`),
    ...wikiItems.map((i) => `wiki/items/${i.id}/`),
    ...structures.map((s) => `wiki/structures/${s.id}/`),
  ].map((p) => ({ url: `${site.url}/${p}` }));
}
