import Link from "next/link";
import { wikiCosmetics, cosmeticGroups } from "@/content/wiki-season";
import { WikiCosmeticCard } from "@/components/wiki-cosmetic-card";
import { WikiItemIcon } from "@/components/wiki-item-icon";
import { wikiItems } from "@/content/wiki-items";
export const metadata = {
  title: "Season Zero Cosmetics",
  description:
    "Hollow Harvest outfits, pets, tools and titles, with their Season Zero unlock tiers.",
  alternates: { canonical: "/wiki/cosmetics/season-zero/" },
};
export default function SeasonCollection() {
  return (
    <div className="parchment page-body">
      <div className="wrap">
        <header className="wiki-intro">
          <Link href="/wiki/cosmetics/" className="breadcrumb">
            ← Cosmetics
          </Link>
          <h1>Season Zero</h1>
          <h2>Hollow Harvest</h2>
          <p>October 28 – December 23, 2026</p>
          <Link href="/season-pass/" className="text-link">
            See the full reward track ↗
          </Link>
        </header>
        <nav className="wiki-collection-nav" aria-label="Collection sections">
          {cosmeticGroups.map((g, i) => (
            <a key={g} href={`#collection-${i}`}>
              {g}
            </a>
          ))}
          <a href="#useful-rewards">Useful rewards</a>
        </nav>
        {cosmeticGroups.map((g, i) => (
          <section
            key={g}
            id={`collection-${i}`}
            className="wiki-collection-section"
          >
            <h2>{g}</h2>
            <div className="wiki-cosmetic-grid">
              {wikiCosmetics
                .filter((c) => c.group === g)
                .map((c) => (
                  <WikiCosmeticCard item={c} key={c.id} />
                ))}
            </div>
          </section>
        ))}
        <section id="useful-rewards" className="wiki-collection-section">
          <h2>Useful rewards</h2>
          <div className="wiki-results">
            {wikiItems
              .filter((i) =>
                [
                  "coin-pouches",
                  "exp-scrolls",
                  "repair-notes",
                  "supply-packs",
                ].includes(i.id),
              )
              .map((i) => (
                <Link
                  className="wiki-result"
                  href={`/wiki/items/${i.id}/`}
                  key={i.id}
                >
                  <WikiItemIcon icon={i.icon} />
                  <div>
                    <h3>{i.name}</h3>
                    <p>{i.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
