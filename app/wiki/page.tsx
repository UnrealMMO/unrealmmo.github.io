import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WikiSearch } from "@/components/wiki-search";
import { wikiCategories } from "@/content/wiki";
export const metadata = {
  title: "Wiki",
  description:
    "Build guides, settlement rules and custom crafting recipes for UnrealMMO.",
  alternates: { canonical: "/wiki/" },
};
export default function WikiPage() {
  return (
    <div className="parchment page-body wiki-home">
      <header className="wrap wiki-intro">
        <h1>Your field guide.</h1>
        <p>Find a recipe, plan a build, make yourself at home.</p>
      </header>
      <div className="wrap">
        <WikiSearch>
          <div className="wiki-categories">
            {wikiCategories.map((c) => (
              <Link
                key={c.id}
                className={`wiki-category wiki-category-${c.id}`}
                href={`/wiki/${c.id}/`}
              >
                <img src={c.image} alt="" width={600} height={340} />
                <div>
                  <h2>{c.name}</h2>
                  <p>{c.description}</p>
                  <ArrowUpRight aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </WikiSearch>
      </div>
    </div>
  );
}
