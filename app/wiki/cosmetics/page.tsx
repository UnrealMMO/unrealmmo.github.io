import Link from "next/link";
export const metadata = {
  title: "Cosmetics Wiki",
  description: "Explore UnrealMMO outfits, pets, equipment styles and titles.",
  alternates: { canonical: "/wiki/cosmetics/" },
};
export default function CosmeticsPage() {
  return (
    <div className="parchment page-body">
      <div className="wrap wiki-article">
        <header className="wiki-intro">
          <h1>Cosmetics</h1>
          <p>Find your next look, or a companion for the road.</p>
        </header>
        <Link href="/wiki/cosmetics/season-zero/" className="wiki-collection">
          <img
            src="/wiki/cosmetics/hollow_regent_regalia.webp"
            alt="Regent armor with the Dread Lantern helmet"
            width={360}
            height={360}
          />
          <div>
            <h2>Season Zero</h2>
            <h3>Hollow Harvest</h3>
            <p>Outfits, eerie companions and Graveglass tools.</p>
            <span className="text-link">Explore the collection ↗</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
