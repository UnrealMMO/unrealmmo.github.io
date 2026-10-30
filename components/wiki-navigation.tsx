"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  ["/wiki/", "All guides"],
  ["/wiki/structures/", "Structures"],
  ["/wiki/settlements/", "Settlements"],
  ["/wiki/items/", "Items & Crafting"],
  ["/wiki/cosmetics/", "Cosmetics"],
];
export function WikiNavigation() {
  const path = usePathname().replace(
    /^\/(structures|settlements)(?=\/|$)/,
    "/wiki/$1",
  );
  return (
    <div className="wiki-bar">
      <div className="wrap wiki-bar-inner">
        <Link className="wiki-wordmark" href="/wiki/">
          Wiki
        </Link>
        <nav aria-label="Wiki categories">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                (
                  href === "/wiki/"
                    ? path === href || path === "/wiki"
                    : path.startsWith(href)
                )
                  ? "page"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
