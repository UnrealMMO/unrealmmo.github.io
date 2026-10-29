"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type Skill, levelRows, bonuses, formatBonus } from "@/content/game";
export function SkillExplorer({ skill }: { skill: Skill }) {
  const [level, setLevel] = useState(1);
  const rows = levelRows(skill),
    selected = rows[level - 1];
  const unlocks = rows.filter((row) => row.traits.length > 0);
  return (
    <section className="progression" id="progression">
      <div className="progression-title">
        <div>
          <h2>Skill unlocks</h2>
        </div>
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
              <strong>{formatBonus(label, value)}</strong>
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
          {selected.traits.length > 0 && (
            <a href={`#level-${level}`}>Jump to this unlock ↓</a>
          )}
        </div>
      </div>
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
            {unlocks.map((r) => (
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
                      <strong>{formatBonus(name, value)}</strong>{" "}
                      <span>{name.toLowerCase()}</span>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link className="text-link" href="/skills/">
        Explore another skill <ArrowUpRight size={17} />
      </Link>
    </section>
  );
}
