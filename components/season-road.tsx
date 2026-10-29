"use client";
import { useState, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Crown, ArrowDown } from "lucide-react";
import { RewardTurntable } from "@/components/reward-turntable";
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
const cosmeticTypes: Record<string, string> = {
  harvest_warden_mask: "Headwear Style",
  candlekeeper_pickaxe: "Pickaxe Style",
  little_lantern: "Pet",
  harvest_warden_sword: "Sword Style",
  harvest_warden_hat: "Headwear Style",
  harvest_warden_shield: "Shield Style",
  hollow_pilgrim_hood: "Headwear Style",
  hollow_regent_mask: "Headwear Style",
  graveglass_pickaxe: "Pickaxe Style",
  nevermore: "Pet",
  graveglass_axe: "Axe Style",
  hollow_regent_sword: "Sword Style",
  graveglass_shovel: "Shovel Style",
  hollow_regent_mantle: "Back Style",
  graveglass_hoe: "Hoe Style",
  hollow_regent_bow: "Bow Style",
  hollow_regent_shield: "Shield Style",
  hollow_regent_crown: "Headwear Style",
  nevermore_ghost: "Pet",
  harvest_warden_regalia: "Armor Style",
  hollow_regent_regalia: "Armor & Helmet Styles",
};
function Details({ reward: r, id }: { reward: Reward; id: string }) {
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
      {r.kind === "cosmetic" ? <p>{cosmeticTypes[id]}</p> : null}
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
  const returnFocus = useRef<HTMLElement | null>(null);
  const open = (id: string, tier: number, premium: boolean, count: number) => {
    returnFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
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
            <span aria-hidden="true">✧</span>
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
                  : cosmeticTypes[entry.reward]}
          </span>
        </div>
      </button>
    );
  }
  return (
    <>
      <div className="road-legend wrap">
        <span>REGULAR · INCLUDED</span>
        <ArrowDown size={18} />
        <span>
          <Crown size={16} /> PREMIUM
        </span>
      </div>
      <section
        className="road-lineup road-woodland"
        aria-label="Season rewards, tiers 1 to 40"
      >
        <div className="road-scenery" aria-hidden="true">
          <img
            src={previews.little_lantern.large}
            alt=""
            loading="lazy"
            width={800}
            height={800}
          />
        </div>
        <div className="road-path wrap">
          <svg
            className="road-line"
            viewBox="0 0 1000 16000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M476 0 C476 200 524 200 524 400 S476 600 476 800 S524 1000 524 1200 S476 1400 476 1600 S524 1800 524 2000 S476 2200 476 2400 S524 2600 524 2800 S476 3000 476 3200 S524 3400 524 3600 S476 3800 476 4000 S524 4200 524 4400 S476 4600 476 4800 S524 5000 524 5200 S476 5400 476 5600 S524 5800 524 6000 S476 6200 476 6400 S524 6600 524 6800 S476 7000 476 7200 S524 7400 524 7600 S476 7800 476 8000 S524 8200 524 8400 S476 8600 476 8800 S524 9000 524 9200 S476 9400 476 9600 S524 9800 524 10000 S476 10200 476 10400 S524 10600 524 10800 S476 11000 476 11200 S524 11400 524 11600 S476 11800 476 12000 S524 12200 524 12400 S476 12600 476 12800 S524 13000 524 13200 S476 13400 476 13600 S524 13800 524 14000 S476 14200 476 14400 S524 14600 524 14800 S476 15000 476 15200 S524 15400 524 15600 S476 15800 476 16000" />
          </svg>
          {season.tiers.map((t) => (
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
                    <RewardTurntable
                      key={selected.id}
                      id={selected.id}
                      label={reward.label}
                    />
                  ) : (
                    <div className="road-title-art">
                      <b>〈{reward.label}〉</b>
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
                  <Details reward={reward} id={selected.id} />
                  {preview?.source === "original-item-art" && (
                    <p className="reward-preview-note">
                      Reward artwork · In-game appearance differs
                    </p>
                  )}
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
