"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { searchWiki, wikiCategories } from "@/content/wiki";
export function WikiSearch({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const results = searchWiki(query, category);
  return (
    <section className="wiki-search" aria-label="Find a guide">
      <div className="wiki-search-field">
        <Search aria-hidden="true" />
        <label className="sr-only" htmlFor="wiki-search">
          Search the wiki
        </label>
        <input
          id="wiki-search"
          type="search"
          placeholder="Search recipes, structures, items…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button aria-label="Clear search" onClick={() => setQuery("")}>
            <X />
          </button>
        )}
      </div>
      {!query.trim() && category === "all" && children}
      <div className="wiki-filters" aria-label="Filter guides">
        {[{ id: "all", name: "All guides" }, ...wikiCategories].map((c) => (
          <button
            key={c.id}
            aria-pressed={category === c.id}
            onClick={() => setCategory(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>
      <p role="status" className="sr-only">
        {results.length} {results.length === 1 ? "guide" : "guides"} found
      </p>
      <div className="wiki-results">
        {results.map((e) => (
          <Link href={e.href} className="wiki-result" key={e.href}>
            <img
              className="wiki-result-image"
              src={e.image}
              alt=""
              width={112}
              height={112}
              loading="lazy"
            />
            <div className="wiki-result-copy">
              <h3>{e.name}</h3>
              <p>{e.description}</p>
            </div>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        ))}
      </div>
      {!results.length && (
        <div className="wiki-empty">
          <h3>No guides found</h3>
          <p>Try an item name, a building, or a word like “claim”.</p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
          >
            Show all guides
          </button>
        </div>
      )}
    </section>
  );
}
