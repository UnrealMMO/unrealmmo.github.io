import Link from "next/link";
import { notFound } from "next/navigation";
import {
  wikiCosmetics,
  cosmeticHref,
  seasonUnlocks,
} from "@/content/wiki-season";
import { RewardTurntable } from "@/components/reward-turntable";
export function generateStaticParams() {
  return wikiCosmetics.map((c) => ({ slug: c.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = wikiCosmetics.find((c) => c.id === slug);
  return {
    title: item?.name,
    description: item?.description,
    alternates: { canonical: cosmeticHref(slug) },
  };
}
export default async function CosmeticPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = wikiCosmetics.find((c) => c.id === slug);
  if (!item) notFound();
  const unlock = seasonUnlocks(item.rewardId)[0];
  return (
    <div className="parchment page-body">
      <article className="wrap wiki-article">
        <Link className="breadcrumb" href="/wiki/cosmetics/season-zero/">
          ← Season Zero collection
        </Link>
        <div className="wiki-cosmetic-detail">
          <div className="wiki-model">
            {item.model ? (
              <RewardTurntable
                id={item.rewardId}
                label={item.name}
                modelUrl={item.model}
                previewUrl={item.image}
                initialAngle={item.angle}
              />
            ) : (
              <img
                className="wiki-title-icon"
                src={item.image}
                alt=""
                width={160}
                height={160}
              />
            )}
          </div>
          <div>
            <p className="wiki-cosmetic-type">{item.type}</p>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
            <h2>How to unlock</h2>
            <p>
              Season Zero · {unlock.track} tier {unlock.tier}
              <br />
              {unlock.xp.toLocaleString("en-US")} Season XP
            </p>
            {item.id === "hollow-regent-regalia" && (
              <Link className="text-link" href={cosmeticHref("dread-lantern")}>
                See the Dread Lantern helmet ↗
              </Link>
            )}
            <p>Check your rewards in Hearthstone → Season 0.</p>
            <Link href="/season-pass/" className="text-link">
              Explore the Season Pass ↗
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
