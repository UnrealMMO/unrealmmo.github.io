import { seasonSupplies } from "@/content/wiki-season";
import { notFound } from "next/navigation";
import Link from "next/link";
import { wikiItems } from "@/content/wiki-items";
import { WikiItemIcon } from "@/components/wiki-item-icon";
export function generateStaticParams() {
  return wikiItems.map((i) => ({ slug: i.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = wikiItems.find((i) => i.id === slug);
  return {
    title: item?.name,
    description: item?.description,
    alternates: { canonical: `/wiki/items/${slug}/` },
  };
}
export default async function ItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = wikiItems.find((i) => i.id === slug);
  if (!item) notFound();
  return (
    <div className="parchment page-body">
      <article className="wrap wiki-article">
        <header className="wiki-item-heading">
          <div>
            <Link className="breadcrumb" href="/wiki/items/">
              ← Items & Crafting
            </Link>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
            {item.requirement && (
              <Link href="/skills/magic/" className="wiki-requirement">
                {item.requirement}
              </Link>
            )}
          </div>
          <div className="wiki-heading-icon">
            <WikiItemIcon icon={item.icon} />
          </div>
        </header>
        {item.recipe && (
          <section className="wiki-recipe-section">
            <div>
              <h2>Recipe</h2>
              <p>
                {item.recipe.shapeless
                  ? "Any arrangement · inventory or crafting table"
                  : "Use this arrangement at a crafting table."}
              </p>
              <div
                className="wiki-recipe"
                role="group"
                aria-label={`${item.name} crafting recipe`}
              >
                <div className="wiki-recipe-grid">
                  {item.recipe.cells.map((c, index) => (
                    <div className="wiki-recipe-cell" key={index}>
                      <span className="sr-only">
                        {["Top", "Middle", "Bottom"][Math.floor(index / 3)]}{" "}
                        row, {["left", "center", "right"][index % 3]}:{" "}
                      </span>
                      {c ? (
                        <>
                          <WikiItemIcon icon={c.icon} />
                          {c.href ? (
                            <Link href={c.href}>{c.name}</Link>
                          ) : (
                            <span>{c.name}</span>
                          )}
                        </>
                      ) : (
                        <span className="sr-only">Empty</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="wiki-recipe-output">
                  Makes <strong>{item.recipe.output}</strong>
                </p>
              </div>
            </div>
            <div className="wiki-recipe-notes">
              <h3>What you need</h3>
              {item.recipe.notes?.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </section>
        )}
        {item.obtain && (
          <section className="wiki-prose">
            <h2>Where to find it</h2>
            <p>{item.obtain}</p>
          </section>
        )}
        {item.variants && (
          <div className="table-scroll wiki-variants">
            <table>
              <caption className="sr-only">
                {item.name} types and benefits
              </caption>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Benefit</th>
                  {item.variants.some((v) => v.requirement) && (
                    <th>Requires</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {item.variants.map((v) => (
                  <tr key={v.name}>
                    <th scope="row">{v.name}</th>
                    <td>{v.benefit}</td>
                    {item.variants?.some((v) => v.requirement) && (
                      <td>{v.requirement}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <section className="wiki-prose">
          <h2>How to use it</h2>
          {item.use.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
        {item.id === "supply-packs" && (
          <div className="wiki-supply-grid">
            {seasonSupplies.map((pack) => (
              <section className="wiki-supply" id={pack.id} key={pack.id}>
                <h2>{pack.name}</h2>
                <p>
                  Regular ·{" "}
                  {pack.unlocks
                    .map(
                      (u) =>
                        `Tier ${u.tier}${u.count > 1 ? ` × ${u.count}` : ""}`,
                    )
                    .join(" · ")}
                </p>
                <ul>
                  {Object.entries(pack.items).map(([name, count]) => (
                    <li key={name}>
                      {count}{" "}
                      {name.replace("minecraft:", "").replaceAll("_", " ")}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
        <nav className="wiki-related" aria-label="Related guides">
          <h2>Related guides</h2>
          {item.related.map((r) => (
            <Link className="text-link" key={r.href} href={r.href}>
              {r.label} ↗
            </Link>
          ))}
        </nav>
      </article>
    </div>
  );
}
