import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/ui";
import { StructurePreview } from "@/components/structure-preview";
import { structures } from "@/content/game";
export const metadata = {
  alternates: { canonical: "/wiki/structures/" },
  title: "Structures",
  description:
    "Build eight ore trees and four Hearthstone stages with interactive 3D guides and accurate materials lists.",
};
export default function Structures() {
  return (
    <div className="parchment page-body">
      <PageIntro
        title="Structures"
        description="Explore the builds in 3D, gather the materials and follow the layer guides."
      />
      <div className="wrap">
        <div className="catalogue-heading">
          <h2>The ore orchard</h2>
        </div>
        <div className="structure-grid">
          {structures
            .filter((s) => s.kind === "tree")
            .map((s) => (
              <Link
                className="structure-card"
                key={s.id}
                href={`/wiki/structures/${s.id}/`}
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
        </div>
        {structures
          .filter((s) => s.kind === "hearthstone")
          .map((s) => (
            <Link
              key={s.id}
              href={`/wiki/structures/${s.id}/`}
              className="hearth-card"
            >
              <StructurePreview structure={s} />
              <div>
                <h2>{s.name}</h2>
                <p>{s.description}</p>
                <p>
                  {s.fullWorldHeight
                    ? `${s.claimSize} × ${s.claimSize} footprint · full world height`
                    : `${s.claimSize} × ${s.claimSize} × ${s.claimSize} protected volume`}
                </p>
                <span className="text-link">
                  Open build guide <ArrowUpRight size={17} />
                </span>
              </div>
            </Link>
          ))}
        <div className="handbook-note">
          <h3>Inns &amp; Stables</h3>
          <p>
            Build inside your territory and earn Coins. Each guide includes
            requirements, layout examples and registration steps.
          </p>
          <Link className="text-link" href="/wiki/settlements/">
            Open the settlement guides <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}
