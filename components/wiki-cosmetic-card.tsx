import Link from "next/link";
import {
  cosmeticHref,
  seasonUnlocks,
  type WikiCosmetic,
} from "@/content/wiki-season";
export function WikiCosmeticCard({ item }: { item: WikiCosmetic }) {
  const unlock = seasonUnlocks(item.rewardId)[0];
  return (
    <Link className="wiki-cosmetic-card" href={cosmeticHref(item.id)}>
      <img src={item.image} alt="" width={360} height={360} loading="lazy" />
      <div>
        <h3>{item.name}</h3>
        <p>{item.type}</p>
        <span>
          {unlock.track} · Tier {unlock.tier}
        </span>
      </div>
    </Link>
  );
}
