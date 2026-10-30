import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/ui";
import { WikiItemIcon } from "@/components/wiki-item-icon";
import { wikiItems } from "@/content/wiki-items";
export const metadata = {
  title: "Items & Crafting — Wiki",
  description:
    "Custom recipes, Coin Pouches, EXP Scrolls and other useful UnrealMMO items.",
  alternates: { canonical: "/wiki/items/" },
};
export default function ItemsPage() {
  return (
    <div className="parchment page-body">
      <PageIntro
        title="Items & Crafting"
        description="Make something useful, or find your next reward."
      />
      <div className="wrap">
        {[
          { name: "Crafting recipes", craftable: true },
          { name: "Useful items", craftable: false },
        ].map((group) => (
          <section className="wiki-item-group" key={group.name}>
            <h2>{group.name}</h2>
            <div className="wiki-item-grid">
              {wikiItems
                .filter((i) => !!i.recipe === group.craftable)
                .map((i) => (
                  <Link
                    key={i.id}
                    href={`/wiki/items/${i.id}/`}
                    className="wiki-item-card"
                  >
                    <div className={`wiki-item-art wiki-tone-${i.icon}`}>
                      <WikiItemIcon icon={i.icon} />
                    </div>
                    <div>
                      <h3>{i.name}</h3>
                      <p>{i.description}</p>
                      {i.requirement && (
                        <span className="wiki-requirement">
                          {i.requirement}
                        </span>
                      )}
                    </div>
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
