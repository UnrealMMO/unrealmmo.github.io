import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/ui";
import { StructurePreview } from "@/components/structure-preview";
import { structures } from "@/content/game";
import { HearthstoneProgression } from "@/components/hearthstone-progression";
export const metadata = {
  title: "Structures",
  description:
    "Build eight ore trees and two Hearthstone stages with interactive 3D guides and accurate materials lists.",
};
export default function Structures() {
  return (
    <div className="parchment page-body">
      <PageIntro
        title="Extraordinary things. Built block by block."
        description="Every great creation starts with a few well-placed blocks. Explore the recipes, turn them around in 3D and bring them to life in your world."
      />
      <div className="wrap">
        <div className="catalogue-heading">
          <h2>The ore orchard</h2>
          <span>8 varieties · Farming levels 25–99</span>
        </div>
        <div className="structure-grid">
          {structures
            .filter((s) => s.kind === "tree")
            .map((s) => (
              <Link
                className="structure-card"
                key={s.id}
                href={`/structures/${s.id}/`}
              >
                <div className="structure-card-art">
                  <span className="level-badge">FARMING {s.level}</span>
                  <StructurePreview structure={s} />
                </div>
                <div className="structure-card-copy">
                  <h3>{s.name}</h3>
                  <p>{s.description}</p>
                  <span>
                    Open build guide <ArrowUpRight size={17} />
                  </span>
                </div>
              </Link>
            ))}
        </div>
        <div className="catalogue-heading">
          <h2>A place of your own</h2>
          <span>Four stages · From a home to a settlement</span>
        </div>
        {structures
          .filter((s) => s.kind === "hearthstone")
          .map((s) => (
            <Link
              key={s.id}
              href={`/structures/${s.id}/`}
              className="hearth-card"
            >
              <StructurePreview structure={s} />
              <div>
                <h2>{s.name}</h2>
                <p>{s.description}</p>
                <p>
                  {s.claimSize} × {s.claimSize} × {s.claimSize} protected volume
                </p>
                <span className="text-link">
                  Open build guide <ArrowUpRight size={17} />
                </span>
              </div>
            </Link>
          ))}
        <HearthstoneProgression />
        <p className="handbook-note">
          The catalogue will grow as new custom structures arrive. Each guide
          includes a model, material checklist and practical instructions.
        </p>
      </div>
    </div>
  );
}
