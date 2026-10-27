import Link from "next/link";
import rewards from "@/content/rewards.json";
import { PageIntro } from "@/components/ui";
export const metadata = {
  title: "Titles & colors",
  description:
    "Earn mastery titles and chat colors through skills, settlement building and boss victories.",
};
export default function Rewards() {
  return (
    <div className="parchment page-body">
      <PageIntro
        title="Make your name your own."
        description="Choose your title and name color from the Hearthstone menu. Earned rewards are permanent; selecting one never spends it."
      />
      <div className="wrap">
        <section className="trait-section">
          <h2>Master every path</h2>
          <p>
            Reach level 99 to earn a unique title. Titles appear as
            &lt;Title&gt; before your name. Newcomer and No title are available
            from the start.
          </p>
          <div className="trait-grid">
            {rewards.mastery.map((r) => (
              <article key={r.skill} className="trait-card">
                <span className="level-badge">LEVEL 99</span>
                <h3>{r.title}</h3>
                <Link href={`/skills/${r.skill}/`}>Explore {r.skill} →</Link>
              </article>
            ))}
          </div>
        </section>
        <section className="rules-panel">
          <h2>Build your reputation</h2>
          <p>
            Complete an Inn in your settlement to unlock Innkeeper. Complete a
            Stable to unlock Stablemaster. Complete both in the same settlement
            to unlock Gold. These rewards belong to the settlement owner;
            existing valid structures can qualify when rechecked.
          </p>
        </section>
        <section className="trait-section">
          <h2>Colors with a story</h2>
          <p>
            Your selected color applies to both your title and name. Red and
            purple require a current staff role and cannot be earned through
            gameplay.
          </p>
          <div className="trait-grid">
            {rewards.colors.map((c) => (
              <article key={c.name} className="trait-card">
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    width: 24,
                    height: 24,
                    border: "1px solid #777",
                    background: c.hex,
                    borderRadius: "50%",
                  }}
                />
                <h3>{c.name}</h3>
                <p>{c.requirement}</p>
              </article>
            ))}
          </div>
          <p>
            Boss colors go to the credited killer. Earlier boss kills are not
            retroactively reconstructed.
          </p>
        </section>
      </div>
    </div>
  );
}
