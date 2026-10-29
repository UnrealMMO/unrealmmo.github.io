import Link from "next/link";
import { ArrowDown, Crown, Sparkles } from "lucide-react";
import { SeasonRoad } from "@/components/season-road";
export const metadata = {
  title: "Season 0: Hollow Harvest · $15 Premium Pass",
  description:
    "Explore 40 tiers of Hollow Harvest rewards, from pets and outfits to Coins and EXP. Premium is $15. Coming soon.",
};
export default function SeasonPass() {
  return (
    <div className="season-page season-road-page">
      <section className="harvest-hero">
        <div className="harvest-hero-shade" />
        <div className="wrap harvest-hero-layout">
          <div className="harvest-hero-copy">
            <p className="season-kicker">SEASON 0 · OCT 28 — DEC 23, 2026</p>
            <h1>
              Hollow
              <br />
              <em>Harvest.</em>
            </h1>
            <p>Spooky companions. New outfits. Plenty to earn.</p>
            <span>Play your way through 40 reward tiers.</span>
            <a className="season-button" href="#reward-road">
              Explore the rewards <ArrowDown size={18} />
            </a>
          </div>
          <div className="harvest-hero-models" aria-hidden="true">
            <img
              className="hero-regent"
              src="/season/rewards/regent-hero.webp"
              width={1000}
              height={1000}
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
        </div>
        <span className="harvest-scene-label">HOLLOW HARVEST</span>
      </section>
      <section className="road-intro wrap" id="reward-road">
        <p className="season-kicker">THE REWARDS</p>
        <h2>See what’s waiting.</h2>
        <p>
          Free rewards on the left. Premium on the right. Pick one for a closer
          look.
        </p>
        <div className="road-facts">
          <span>40 tiers</span>
          <span>2,500 XP per tier</span>
        </div>
      </section>
      <SeasonRoad />
      <section className="road-progress wrap">
        <Sparkles size={28} />
        <h2>Play. Earn XP. Unlock rewards.</h2>
        <div>
          <p>
            Earn Season XP by training your skills—even at level 99. Each server
            vote adds <strong>500 XP</strong>.
          </p>
          <p>Check your progress in Hearthstone → Season 0.</p>
          <p className="reward-preview-note">
            Ends December 23 at midnight, New York time. Some rewards are still
            rolling out.
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
              alt="Hollow Regent armor with the Dread Lantern helmet"
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
              <Crown size={18} /> PREMIUM PASS
            </p>
            <h2>More looks to collect.</h2>
            <div className="season-price">
              $15 <span>USD · Season 0 Premium Pass</span>
            </div>
            <p>
              Add 16 cosmetic rewards, including Regent outfits, Graveglass
              tools, companions and titles.
            </p>
            <ul>
              <li>One XP track for both passes.</li>
              <li>
                Upgrade during the season to get the premium rewards you’ve
                already earned.
              </li>
            </ul>
            <a className="season-button" href="#checkout-placeholder">
              Premium · Coming soon
            </a>
            <p className="reward-preview-note">
              The regular pass is free, with Coins, EXP Scrolls, Repair Notes,
              supplies and cosmetics.
            </p>
          </div>
        </div>
        <div className="wrap road-checkout" id="checkout-placeholder">
          <p id="checkout-status">
            Checkout is coming soon. No payments are taken here.
          </p>
          <a
            className="season-text-link"
            href="#checkout-status"
            aria-describedby="checkout-status"
          >
            Checkout unavailable
          </a>
          <Link href="/skills/">Explore the skills →</Link>
        </div>
      </section>
    </div>
  );
}
