import type { MetadataRoute } from "next";
import { skills, structures } from "@/content/game";
import { site } from "@/config/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "skills/",
    "rewards/",
    "season-pass/",
    "structures/",
    "settlements/",
    "about/",
    "privacy-policy/",
    ...skills.map((s) => `skills/${s.id}/`),
    ...structures.map((s) => `structures/${s.id}/`),
  ].map((p) => ({ url: `${site.url}/${p}` }));
}
