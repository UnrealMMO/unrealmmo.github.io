"use client";
import { useState, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  X,
  RotateCcw,
  RotateCw,
  Sparkles,
  Crown,
  ArrowDown,
} from "lucide-react";
import season from "@/content/season-0.json";
import images from "@/content/season-previews.json";

type Reward = {
  label: string;
  kind: string;
  amount?: number;
  unit?: string;
  rarity?: string;
  minimumSkillLevel?: number;
  items?: Record<string, number>;
};
type Preview = {
  source: string;
  image: string;
  large: string;
  frames: number;
  models: string[];
};
const rewards: Record<string, Reward> = season.rewards;
const previews: Record<string, Preview> = images;
const chapters = [
  {
    name: "The lantern path",
    note: "Every journey starts with a spark.",
    art: "woodland",
    model: "little_lantern",
  },
  {
    name: "Through the graveglass",
    note: "Tools of a stranger trade.",
    art: "court",
    model: "graveglass_axe",
  },
  {
    name: "The court awakens",
    note: "Wear the mark of Hollow Harvest.",
    art: "woodland",
    model: "hollow_regent_crown",
  },
  {
    name: "A sovereign’s arrival",
    note: "Your season. Your signature.",
    art: "court",
    model: "nevermore_ghost",
  },
];
function Details({ reward: r }: { reward: Reward }) {
  return (
    <>
      {r.amount ? (
        <p>
          {r.amount.toLocaleString("en-US")} {r.unit}
          {r.rarity ? ` · ${r.rarity}` : ""}
        </p>
      ) : null}
      {r.minimumSkillLevel ? (
        <p>
          For a skill at level {r.minimumSkillLevel}+. Requires room for the
          full EXP.
        </p>
      ) : null}
      {r.kind === "supplies" ? (
        <ul>
          {Object.entries(r.items || {}).map(([k, n]) => (
            <li key={k}>
              {n} × {k.slice(10).replaceAll("_", " ")}
            </li>
          ))}
        </ul>
      ) : null}
      {r.kind === "title" ? <p>A title for your character.</p> : null}
      {r.kind === "cosmetic" ? <p>Cosmetic reward.</p> : null}
    </>
  );
}
export function SeasonRoad() {
  const [selected, setSelected] = useState<{
    id: string;
    tier: number;
    premium: boolean;
    count: number;
  } | null>(null);
  const [angle, setAngle] = useState(0);
  const returnFocus = useRef<HTMLElement | null>(null);
  const open = (id: string, tier: number, premium: boolean, count: number) => {
    returnFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setAngle(0);
    setSelected({ id, tier, premium, count });
  };
  const reward = selected ? rewards[selected.id] : null,
    preview = selected ? previews[selected.id] : null;
  function card(
    entry: { reward: string; count: number } | null,
    tier: number,
    premium: boolean,
  ) {
    if (!entry)
      return (
        <div
          className="road-rest"
          aria-label={`No premium reward at tier ${tier}`}
        >
          <span aria-hidden="true">✧</span>
        </div>
      );
    const r = rewards[entry.reward],
      p = previews[entry.reward];
    return (
      <button
        className={`road-card ${premium ? "road-premium" : "road-regular"} ${r.kind === "title" ? "road-title-card" : ""}`}
        onClick={() => open(entry.reward, tier, premium, entry.count)}
        aria-label={`Preview ${r.label}, ${premium ? "premium" : "regular"} tier ${tier}`}
      >
        <span className="road-card-track">
          {premium ? <Crown size={12} /> : <Sparkles size={12} />}{" "}
          {premium ? "PREMIUM" : "REGULAR"}
        </span>
        {p ? (
          <img
            src={p.image}
            width={360}
            height={360}
            loading="lazy"
            alt={r.label}
          />
        ) : (
          <div className="road-title-art">
            <span>〈</span>
            <b>{r.label}</b>
            <span>〉</span>
          </div>
        )}
        <div className="road-card-caption">
          <h3>{r.label}</h3>
          <span>
            {entry.count > 1 ? `${entry.count} rewards · ` : ""}
            {r.amount
              ? `${r.amount.toLocaleString("en-US")} ${r.unit}`
              : r.kind === "title"
                ? "Collectible title"
                : r.kind === "supplies"
                  ? "Supply pack"
                  : "Cosmetic"}
          </span>
          <small>View reward ↗</small>
        </div>
      </button>
    );
  }
  return (
    <>
      <nav className="road-jumps" aria-label="Reward chapters">
        <span>THE REWARD ROAD</span>
        {chapters.map((c, i) => (
          <a href={`#road-${i}`} key={c.name}>
            {i * 10 + 1}–{i * 10 + 10}
          </a>
        ))}
      </nav>
      <div className="road-legend wrap">
        <span>REGULAR · INCLUDED</span>
        <ArrowDown size={18} />
        <span>
          <Crown size={16} /> PREMIUM
        </span>
      </div>
      {chapters.map((c, index) => (
        <section
          id={`road-${index}`}
          className={`road-chapter road-${c.art}`}
          key={c.name}
          aria-labelledby={`chapter-${index}`}
        >
          <div className="road-scenery" aria-hidden="true">
            <img
              src={previews[c.model].large}
              alt=""
              loading="lazy"
              width={800}
              height={800}
            />
          </div>
          <header className="road-chapter-title">
            <p>
              CHAPTER {String(index + 1).padStart(2, "0")} · TIERS{" "}
              {index * 10 + 1}–{index * 10 + 10}
            </p>
            <h2 id={`chapter-${index}`}>{c.name}</h2>
            <span>{c.note}</span>
          </header>
          <div className="road-path wrap">
            <svg
              className="road-line"
              viewBox="0 0 1000 4000"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M476 0 C476 200 524 200 524 400 S476 600 476 800 S524 1000 524 1200 S476 1400 476 1600 S524 1800 524 2000 S476 2200 476 2400 S524 2600 524 2800 S476 3000 476 3200 S524 3400 524 3600 S476 3800 476 4000" />
            </svg>
            {season.tiers.slice(index * 10, index * 10 + 10).map((t) => (
              <div
                className={`road-row ${t.tier % 5 === 0 ? "road-milestone" : ""}`}
                key={t.tier}
              >
                {card(t.free, t.tier, false)}
                <div className="road-marker">
                  <span>TIER</span>
                  <b>{t.tier}</b>
                  <small>
                    {(t.tier * season.xpPerTier).toLocaleString("en-US")} XP
                  </small>
                </div>
                {card(t.premium, t.tier, true)}
              </div>
            ))}
          </div>
        </section>
      ))}
      <Dialog.Root
        open={selected !== null}
        onOpenChange={(v) => {
          if (!v) setSelected(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="reward-overlay" />
          <Dialog.Content
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              returnFocus.current?.focus();
            }}
            className={`reward-inspector ${selected?.premium ? "reward-inspector-premium" : ""}`}
          >
            <Dialog.Close
              className="reward-close"
              aria-label="Close reward preview"
            >
              <X />
            </Dialog.Close>
            {reward && selected && (
              <>
                <div className="reward-inspector-art">
                  {preview ? (
                    <img
                      src={`/season/rewards/${selected.id}-${angle}.webp`}
                      width={360}
                      height={360}
                      alt={`${reward.label}, view ${angle + 1} of 8`}
                    />
                  ) : (
                    <div className="road-title-art">
                      <b>〈{reward.label}〉</b>
                    </div>
                  )}
                  {preview && (
                    <div className="reward-turn">
                      <button
                        aria-label="Rotate preview left"
                        onClick={() => setAngle((angle + 7) % 8)}
                      >
                        <RotateCcw size={20} />
                      </button>
                      <span aria-live="polite">View {angle + 1} / 8</span>
                      <button
                        aria-label="Rotate preview right"
                        onClick={() => setAngle((angle + 1) % 8)}
                      >
                        <RotateCw size={20} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="reward-inspector-copy">
                  <p className="season-kicker">
                    {selected.premium ? "PREMIUM" : "REGULAR"} · TIER{" "}
                    {selected.tier}
                  </p>
                  <Dialog.Title>{reward.label}</Dialog.Title>
                  <Dialog.Description>
                    {selected.count > 1 ? `${selected.count} rewards. ` : ""}
                    {(selected.tier * season.xpPerTier).toLocaleString(
                      "en-US",
                    )}{" "}
                    Season XP
                  </Dialog.Description>
                  <Details reward={reward} />
                  <p className="reward-preview-note">
                    {preview?.source === "game-model"
                      ? "Game model preview"
                      : reward.kind === "title"
                        ? "Title preview"
                        : "Reward artwork · In-game appearance differs"}
                  </p>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
