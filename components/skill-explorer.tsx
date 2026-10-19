"use client";
import { useState } from "react";
import Link from "next/link";
import * as Tabs from "@radix-ui/react-tabs";
import { Search, ArrowUpRight } from "lucide-react";
import { type Skill, levelRows, bonuses, pct } from "@/content/game";
export function SkillExplorer({ skill }: { skill: Skill }) {
  const [mode, setMode] = useState("all"),
    [level, setLevel] = useState(1),
    [query, setQuery] = useState("");
  const rows = levelRows(skill),
    selected = rows[level - 1];
  const matches = rows.filter(
    (r) =>
      (mode === "all" || r.traits.length > 0) &&
      (String(r.level) === query.trim() ||
        [
          r.level,
          ...r.traits.map((t) => `${t.name} ${t.description}`),
          ...r.delta,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())),
  );
  return (
    <section className="progression" id="progression">
      <div className="progression-title">
        <div>
          <p className="eyebrow">Every step matters</p>
          <h2>Your path to 99</h2>
        </div>
        <span className="small-note">
          Exact XP thresholds · Default balance
        </span>
      </div>
      <div className="level-inspector">
        <div className="level-dial">
          <span>YOUR LEVEL</span>
          <strong>{level}</strong>
          <label htmlFor="level-range" className="sr-only">
            Preview level
          </label>
          <input
            id="level-range"
            type="range"
            min="1"
            max="99"
            value={level}
            onChange={(e) => setLevel(+e.target.value)}
          />
          <div>
            <span>1</span>
            <span>99</span>
          </div>
        </div>
        <div className="level-stats">
          <div>
            <span>TOTAL XP</span>
            <strong>{selected.total.toLocaleString("en-US")}</strong>
          </div>
          {Object.entries(bonuses(skill.id, level)).map(([label, value]) => (
            <div key={label}>
              <span>{label.toUpperCase()}</span>
              <strong>{pct(value)}</strong>
            </div>
          ))}
          <p>
            {selected.traits.length
              ? selected.traits.map((t) => t.name).join(" · ")
              : level === 1
                ? "Your journey begins. No passive bonus yet."
                : selected.delta.join(" · ") ||
                  "Your mastery bonuses remain active."}
          </p>
          <a
            href={`#level-${level}`}
            onClick={() => {
              setMode("all");
              setQuery("");
            }}
          >
            Jump to this level ↓
          </a>
        </div>
      </div>
      <Tabs.Root value={mode} onValueChange={setMode}>
        <div className="table-toolbar">
          <Tabs.List aria-label="Progression view" className="tab-list">
            <Tabs.Trigger value="all">All 99 levels</Tabs.Trigger>
            <Tabs.Trigger value="milestones">Unlocks only</Tabs.Trigger>
          </Tabs.List>
          <label className="search-field">
            <Search size={16} />
            <input
              aria-label="Search levels and traits"
              placeholder="Find a level or trait…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <p className="result-count" aria-live="polite">
          {matches.length} {matches.length === 1 ? "level" : "levels"} shown ·
          Percentages rounded to two decimals.
        </p>
        <Tabs.Content value={mode}>
          <div
            className="table-scroll"
            tabIndex={0}
            role="region"
            aria-label={`${skill.name} level progression`}
          >
            <table className="level-table">
              <caption className="sr-only">
                {skill.name} progression: level, cumulative XP, required XP and
                rewards
              </caption>
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Total XP</th>
                  <th>XP to reach</th>
                  <th>New rewards</th>
                  <th>Cumulative bonuses</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((r) => (
                  <tr
                    key={r.level}
                    id={`level-${r.level}`}
                    className={r.traits.length ? "milestone-row" : ""}
                  >
                    <th scope="row">
                      <a href={`#level-${r.level}`}>
                        {String(r.level).padStart(2, "0")}
                      </a>
                    </th>
                    <td>{r.total.toLocaleString("en-US")}</td>
                    <td>{r.needed.toLocaleString("en-US")}</td>
                    <td>
                      {r.traits.map((t) => (
                        <div className="table-trait" key={t.name}>
                          <strong>
                            {t.structure ? (
                              <Link href={`/structures/${t.structure}/`}>
                                {t.name} ↗
                              </Link>
                            ) : (
                              t.name
                            )}
                          </strong>
                          <p>{t.description}</p>
                        </div>
                      ))}
                      {r.delta.map((d) => (
                        <p className="delta" key={d}>
                          {d}
                        </p>
                      ))}
                      {r.level === 1 && <p>Begin your training</p>}
                    </td>
                    <td>
                      {Object.entries(r.bonuses).map(([name, value]) => (
                        <div key={name}>
                          <strong>{pct(value)}</strong>{" "}
                          <span>{name.toLowerCase()}</span>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!matches.length && (
              <div className="empty-state">
                No matching levels. Try a trait name, such as “Master”, or clear
                your search.
              </div>
            )}
          </div>
        </Tabs.Content>
      </Tabs.Root>
      <Link className="text-link" href="/skills/">
        Explore another skill <ArrowUpRight size={17} />
      </Link>
    </section>
  );
}
