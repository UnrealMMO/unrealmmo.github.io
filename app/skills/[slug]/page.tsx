import { notFound } from "next/navigation";
import Link from "next/link";
import { skills, traitsFor } from "@/content/game";
import { Icon } from "@/components/ui";
import { SkillExplorer } from "@/components/skill-explorer";
export function generateStaticParams() {
  return skills.map((s) => ({ slug: s.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = skills.find((s) => s.id === slug);
  return { title: s?.name, description: s?.description };
}
export default async function SkillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = skills.find((s) => s.id === slug);
  if (!s) notFound();
  return (
    <div className="parchment page-body">
      <header
        className="skill-hero wrap"
        style={{ "--accent": s.color } as React.CSSProperties}
      >
        <Link className="breadcrumb" href="/skills/">
          ← All skills
        </Link>
        <div>
          <div>
            <h1>{s.name}</h1>
            <h2>{s.tagline}</h2>
            <p>{s.description}</p>
          </div>
          <div className="skill-seal">
            <Icon name={s.icon} size={90} strokeWidth={0.8} />
          </div>
        </div>
        <nav className="anchor-nav" aria-label="On this skill page">
          <a href="#training">How to train</a>
          <a href="#traits">Signature traits</a>
          <a href="#progression">All 99 levels</a>
          <a href="#rules">Know before you go</a>
        </nav>
      </header>
      <div className="wrap">
        <section className="guide-split" id="training">
          <div>
            <h2>How to train</h2>
            <ul className="guide-list">
              {s.training.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <aside className="command-panel">
            <h3>Make it yours</h3>
            <p>
              {s.id === "sneak"
                ? "Sneak abilities activate automatically when their conditions are met. Open your journal to check your progress."
                : "Unlockable controls are available in your Skill Journal. Optional collection and mastery controls default off."}
            </p>
            {s.commands.map((c) => (
              <code key={c}>{c}</code>
            ))}
          </aside>
        </section>
        <section className="trait-section" id="traits">
          <h2>New ways to play</h2>
          <div className="trait-grid">
            {traitsFor(s)
              .filter((t) => t.level > 1)
              .map((t) => (
                <article key={t.name} className="trait-card">
                  <span className="level-badge">LEVEL {t.level}</span>
                  <h3>{t.name}</h3>
                  <p>{t.description}</p>
                  {t.structure && (
                    <Link href={`/structures/${t.structure}/`}>
                      View the build guide ↗
                    </Link>
                  )}
                </article>
              ))}
          </div>
        </section>
        <SkillExplorer key={s.id} skill={s} />
        <section id="rules" className="rules-panel">
          <h2>Know before you go</h2>
          <ul className="guide-list">
            {s.rules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="small-note">
            Development handbook · reviewed 19 October 2026 · Default balance
            values. Gameplay may change before launch.
          </p>
        </section>
      </div>
    </div>
  );
}
