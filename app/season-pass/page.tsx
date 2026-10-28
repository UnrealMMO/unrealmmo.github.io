import Link from "next/link";
import {
  Crown,
  Feather,
  Moon,
  ArrowDown,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import season from "@/content/season-0.json";

export const metadata = {
  title: "Season 0: Hollow Harvest · $15 Premium Pass",
  description:
    "Explore 40 shared tiers, a free regular track and the $15 cosmetic-only Hollow Harvest Premium Pass. October 28–December 23, 2026. Checkout is not yet open.",
};
type Reward = {
  label: string;
  kind: string;
  amount?: number;
  unit?: string;
  rarity?: string;
  minimumSkillLevel?: number;
  items?: Record<string, number>;
};
const rewards: Record<string, Reward> = season.rewards;
function RewardLabel({
  entry,
}: {
  entry: { reward: string; count: number } | null;
}) {
  if (!entry) return <span className="season-empty">—</span>;
  const r = rewards[entry.reward];
  return (
    <>
      <strong>
        {entry.count > 1 ? `${entry.count} × ` : ""}
        {r.label}
      </strong>
      {r.amount && (
        <small>
          {r.amount.toLocaleString("en-US")} {r.unit}
          {r.minimumSkillLevel ? ` · Skill level ${r.minimumSkillLevel}+` : ""}
          {r.rarity ? ` · ${r.rarity}` : ""}
        </small>
      )}
      {r.kind === "title" && <small>Collectible title</small>}
      {r.kind === "cosmetic" && <small>Cosmetic reward</small>}
      {r.items && (
        <small>
          {Object.entries(r.items)
            .map(
              ([name, count]) =>
                `${count} ${name.slice(10).replaceAll("_", " ")}`,
            )
            .join(" · ")}
        </small>
      )}
    </>
  );
}
export default function SeasonPass() {
  return (
    <div className="season-page">
      <section className="season-hero">
        <img
          className="season-backdrop"
          src="/art/unreal-valley-v2-1920.webp"
          alt=""
          width={1920}
          height={1080}
        />
        <div className="wrap season-hero-grid">
          <div>
            <p className="season-kicker">SEASON 0 · OCT 28 — DEC 23, 2026</p>
            <h1>
              Hollow
              <br />
              <em>Harvest.</em>
            </h1>
            <p className="season-lead">
              A season of quiet magic. A collection worthy of the Hollow Court.
            </p>
            <p>
              Make every adventure part of your story. Follow 40 tiers of
              rewards, then give your journey a signature look with the Premium
              Pass.
            </p>
            <div className="season-actions">
              <a className="season-button" href="#premium">
                Explore Premium · $15 <Crown size={19} />
              </a>
              <a className="season-text-link" href="#reward-track">
                See every reward <ArrowDown size={17} />
              </a>
            </div>
            <p className="season-note">
              Preview the collection. Checkout is not open yet.
            </p>
          </div>
          <div className="season-seal" aria-hidden="true">
            <span>THE HOLLOW COURT</span>
            <Crown strokeWidth={0.8} />
            <b>0</b>
            <span>HOLLOW HARVEST</span>
          </div>
        </div>
      </section>
      <div className="season-ribbon">
        <div className="wrap">
          <span>40 shared tiers</span>
          <span>16 premium reward milestones</span>
          <span>Cosmetics only. Your power is earned.</span>
        </div>
      </div>
      <section className="wrap season-section" id="premium">
        <p className="season-kicker">MAKE THE SEASON YOUR OWN</p>
        <div className="season-section-heading">
          <h2>
            Enter the
            <br />
            <em>Hollow Court.</em>
          </h2>
          <p>
            From a pilgrim’s hood to a regent’s crown, the premium track follows
            a complete seasonal collection. One pass. One shared journey. A look
            that tells the story.
          </p>
        </div>
        <div className="season-collection">
          <article>
            <Crown size={46} strokeWidth={1} />
            <span>THE REGENT</span>
            <h3>Dress the part.</h3>
            <p>
              The Hollow Regent mask, mantle and crown lead to the three-piece
              Regalia at tier 40.
            </p>
            <small>Crown · Tier 30 / Regalia · Tier 40</small>
          </article>
          <article>
            <Moon size={46} strokeWidth={1} />
            <span>GRAVEGLASS</span>
            <h3>Carry the collection.</h3>
            <p>
              Pickaxe, axe, shovel and hoe cosmetics bring Graveglass to your
              everyday adventures. Add the Regent sword, bow and shield.
            </p>
            <small>Tool and weapon appearances</small>
          </article>
          <article>
            <Feather size={46} strokeWidth={1} />
            <span>NEVERMORE</span>
            <h3>Leave an impression.</h3>
            <p>
              Discover Nevermore and its Ghost Raven variant, plus the titles Of
              the Hollow Court and Sovereign of the Hollow.
            </p>
            <small>Ghost Raven · Tier 35</small>
          </article>
        </div>
        <p className="season-caption">
          Collection descriptions; the symbols above are decorative, not in-game
          previews. Reward delivery is still being enabled for parts of this
          lineup. Your Hearthstone menu shows the current saved status.
        </p>
      </section>
      <section className="season-compare-section">
        <div className="wrap season-compare">
          <div className="season-free">
            <p className="season-kicker">REGULAR PASS</p>
            <h2>
              Your adventure.
              <br />
              Already included.
            </h2>
            <p>
              Every player progresses through the regular track. Earn Coin
              Pouches, chosen-skill EXP Scrolls, Repair Notes, supply packs and
              cosmetic milestones.
            </p>
            <ul>
              <li>40 regular reward milestones</li>
              <li>920 Coins and 120,000 chosen-skill EXP across the track</li>
              <li>Six full Repair Notes and 11 supply-pack awards</li>
              <li>Earned through play, without a premium purchase</li>
            </ul>
          </div>
          <div className="season-premium">
            <Crown size={32} />
            <p className="season-kicker">PREMIUM PASS</p>
            <div className="season-price">
              $15 <span>USD · Season 0</span>
            </div>
            <h3>
              A second track.
              <br />
              The same adventure.
            </h3>
            <ul>
              <li>16 extra cosmetic reward milestones</li>
              <li>Regent apparel, Graveglass tools and more</li>
              <li>
                Includes already-earned premium tiers when upgraded during the
                season
              </li>
              <li>No paid XP boosts, tier skips or gameplay rewards</li>
            </ul>
            <a href="#checkout-placeholder" className="season-button">
              Premium checkout · Coming soon
            </a>
            <small>No payment is taken. This is a placeholder link.</small>
          </div>
        </div>
      </section>
      <section className="wrap season-section" id="reward-track">
        <p className="season-kicker">THE COMPLETE LINEUP</p>
        <div className="season-section-heading">
          <h2>
            Every tier.
            <br />
            <em>Both tracks.</em>
          </h2>
          <p>
            Earn 2,500 Season XP per tier. Both tracks use the same progress,
            for 100,000 XP to reach tier 40. Premium adds cosmetics at selected
            milestones.
          </p>
        </div>
        <div className="season-track">
          {[0, 10, 20, 30].map((start) => (
            <details key={start} open={start === 0}>
              <summary>
                Tiers {start + 1}–{start + 10}
                <span>
                  {((start + 1) * 2500).toLocaleString("en-US")}–
                  {((start + 10) * 2500).toLocaleString("en-US")} XP
                </span>
              </summary>
              <table>
                <caption className="sr-only">
                  Regular and premium rewards for tiers {start + 1} through{" "}
                  {start + 10}
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Tier</th>
                    <th scope="col">Regular · Included</th>
                    <th scope="col">Premium · $15</th>
                  </tr>
                </thead>
                <tbody>
                  {season.tiers.slice(start, start + 10).map((tier) => (
                    <tr key={tier.tier}>
                      <th scope="row">{tier.tier}</th>
                      <td>
                        <RewardLabel entry={tier.free} />
                      </td>
                      <td>
                        <RewardLabel entry={tier.premium} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          ))}
        </div>
      </section>
      <section className="wrap season-section season-how">
        <div>
          <Sparkles size={30} />
          <h2>
            Play your way.
            <br />
            <em>Keep progressing.</em>
          </h2>
        </div>
        <div>
          <h3>Your usual adventures count.</h3>
          <p>
            Eligible skill actions earn Season XP, even when that skill is
            already level 99. Each accepted real vote from a connected server
            list adds 500 Season XP. Reward scrolls and admin XP do not feed the
            pass.
          </p>
          <h3>Your progress lives in Hearthstone.</h3>
          <p>
            Open your Hearthstone Core and choose Season 0 in the second row.
            See the dates, rewards gained and each regular or premium reward’s
            granted, pending or locked status. Earned gift items wait in your
            mailbox; use <code>/gifts claim</code> with inventory space.
          </p>
          <h3>October 28 to December 23.</h3>
          <p>
            The initial Season 0 window ends at midnight at the start of
            December 23, 2026, America/New_York. Server-configured dates and
            in-game progress are authoritative.
          </p>
        </div>
      </section>
      <section className="season-checkout wrap" id="checkout-placeholder">
        <ShieldCheck size={35} />
        <p className="season-kicker">YOUR SEASON. YOUR SIGNATURE.</p>
        <h2>
          Hollow Harvest
          <br />
          <em>Premium Pass · $15</em>
        </h2>
        <p id="checkout-status">
          Checkout is not available yet. This preview cannot take payment or
          activate Premium. Return here when purchasing opens.
        </p>
        <a
          className="season-button"
          href="#checkout-status"
          aria-describedby="checkout-status"
        >
          Checkout unavailable · Placeholder
        </a>
        <Link href="/skills/" className="season-text-link">
          Explore the skills while you wait →
        </Link>
      </section>
    </div>
  );
}
