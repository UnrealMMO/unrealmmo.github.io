import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, Icon } from "@/components/ui";
import { skills, traitsFor } from "@/content/game";
export const metadata = {
  title: "Skills",
  description:
    "Explore seven skills with 99 levels each: Sneak, Farming, Mining, Woodcutting, Fishing, Magic and Construction.",
};
export default function Skills() {
  return (
    <div className="parchment page-body">
      <PageIntro
        title="Choose your path. Grow your possibilities."
        description="Train seven skills as you play. See what each one unlocks on the way to level 99."
      />
      <div className="wrap skill-index">
        {skills.map((s, i) => (
          <Link
            key={s.id}
            href={`/skills/${s.id}/`}
            className="skill-index-card"
            style={{ "--accent": s.color } as React.CSSProperties}
          >
            <div className="skill-index-icon">
              <Icon name={s.icon} size={112} />
              <span>0{i + 1}</span>
            </div>
            <div>
              <h2>{s.name}</h2>
              <p>{s.description}</p>
              <span className="skill-teasers">
                {traitsFor(s)
                  .filter((t) => t.level > 1 && !t.name.includes("active"))
                  .slice(0, 3)
                  .map((t) => t.name)
                  .join(" · ")}
              </span>
            </div>
            <ArrowUpRight className="index-arrow" />
          </Link>
        ))}
      </div>
      <div className="wrap handbook-note">
        <h3>Your skills</h3>
        <p>
          Use <code>/skills</code> or the Skills button in the second row of
          your Hearthstone menu. Check your progress and turn unlocked abilities
          on or off. Balance may change before launch.
        </p>
      </div>
    </div>
  );
}
