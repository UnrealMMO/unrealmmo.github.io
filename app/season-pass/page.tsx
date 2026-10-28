import Link from "next/link";
import { ArrowDown, Crown, Sparkles } from "lucide-react";
import { SeasonRoad } from "@/components/season-road";
export const metadata = {
  title: "Season 0: Hollow Harvest · $15 Premium Pass",
  description:
    "Walk the Hollow Harvest reward road: 40 tiers of real model previews, pets, apparel, Coins and EXP. Explore the cosmetic-only $15 Premium Pass. Checkout is not open yet.",
};
export default function SeasonPass() {
  return (
    <div className="season-page season-road-page">
      <section className="harvest-hero">
        <div className="harvest-hero-shade" />
        <div className="harvest-hero-models" aria-hidden="true">
          <img
            className="hero-crown"
            src="/season/rewards/hollow_regent_crown-large.webp"
            width={800}
            height={800}
            alt=""
            fetchPriority="high"
          />
          <img
            className="hero-raven"
            src="/season/rewards/nevermore_ghost-large.webp"
            width={800}
            height={800}
            alt=""
          />
          <img
            className="hero-lantern"
            src="/season/rewards/little_lantern-large.webp"
            width={800}
            height={800}
            alt=""
          />
        </div>
        <div className="wrap harvest-hero-copy">
          <p className="season-kicker">SEASON 0 · OCT 28 — DEC 23, 2026</p>
          <h1>
            Hollow
            <br />
            <em>Harvest.</em>
          </h1>
          <p>
            Follow the lanterns.
            <br />
            Find your next obsession.
          </p>
          <span>
            Forty tiers. Two reward tracks.
            <br />A collection from the other side of the woods.
          </span>
          <a className="season-button" href="#reward-road">
            Walk the reward road <ArrowDown size={18} />
          </a>
        </div>
        <span className="harvest-scene-label">
          HOLLOW HARVEST · ORIGINAL SCENERY & GAME MODEL PREVIEWS
        </span>
      </section>
      <section className="road-intro wrap" id="reward-road">
        <p className="season-kicker">SOMETHING WORTH THE JOURNEY</p>
        <h2>
          A little candlelight.
          <br />
          <em>A touch of the uncanny.</em>
        </h2>
        <p>
          From your first Coin Pouch to the Hollow Regent’s regalia, discover
          every reward along the way. Regular rewards wait on the left.
          Gold-framed premium rewards wait on the right.
        </p>
        <div className="road-facts">
          <span>40 shared tiers</span>
          <span>2,500 XP per tier</span>
          <span>Premium is cosmetic only</span>
        </div>
      </section>
      <SeasonRoad />
      <section className="road-progress wrap">
        <Sparkles size={28} />
        <h2>
          Your adventures
          <br />
          <em>move you forward.</em>
        </h2>
        <div>
          <p>
            Eligible skill actions count even at level 99. Each accepted real
            vote from a connected server list adds{" "}
            <strong>500 Season XP</strong>. Reach tier 40 at{" "}
            <strong>100,000 XP</strong>; reward scrolls and admin XP do not feed
            the pass.
          </p>
          <p>
            Your Hearthstone Core → Season 0 shows dates and granted, pending or
            locked rewards. Earned gift items wait in your mailbox; use{" "}
            <code>/gifts claim</code> with inventory space.
          </p>
          <p className="reward-preview-note">
            The initial season ends at midnight at the start of December 23,
            2026, America/New_York. In-game dates are authoritative. Some supply
            and cosmetic deliveries are still being enabled.
          </p>
        </div>
      </section>
      <section className="road-purchase" id="premium">
        <div className="wrap road-purchase-grid">
          <div className="purchase-models">
            <img
              src="/season/rewards/hollow_regent_regalia-large.webp"
              width={800}
              height={800}
              alt="Hollow Regent chest, leggings and boots worn together on a neutral mannequin"
              loading="lazy"
            />
            <img
              className="purchase-crown"
              src="/season/rewards/hollow_regent_crown-large.webp"
              width={800}
              height={800}
              alt="Hollow Regent Crown"
              loading="lazy"
            />
          </div>
          <div>
            <p className="season-kicker">
              <Crown size={18} /> THE HOLLOW COURT AWAITS
            </p>
            <h2>
              Make the season
              <br />
              <em>your own.</em>
            </h2>
            <div className="season-price">
              $15 <span>USD · Season 0 Premium Pass</span>
            </div>
            <p>
              Unlock the premium track’s 16 cosmetic milestones: Regent apparel,
              Graveglass tools, companions and collectible titles.
            </p>
            <ul>
              <li>The same shared progression as the regular pass.</li>
              <li>
                Already-earned premium tiers included when you upgrade during
                the season.
              </li>
              <li>No paid XP boosts, tier skips or gameplay advantages.</li>
            </ul>
            <a className="season-button" href="#checkout-placeholder">
              Premium checkout · Coming soon
            </a>
            <p className="reward-preview-note">
              The regular pass is included for everyone: 920 Coins, 120,000
              chosen-skill EXP, six full Repair Notes, 11 supply-pack awards and
              cosmetic milestones across the full track.
            </p>
          </div>
        </div>
        <div className="wrap road-checkout" id="checkout-placeholder">
          <p id="checkout-status">
            Checkout is not available yet. This preview cannot take payment or
            activate Premium.
          </p>
          <a
            className="season-text-link"
            href="#checkout-status"
            aria-describedby="checkout-status"
          >
            Checkout unavailable · Placeholder
          </a>
          <Link href="/skills/">Explore the skills →</Link>
        </div>
      </section>
    </div>
  );
}
