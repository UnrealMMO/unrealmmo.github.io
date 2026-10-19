import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, Icon } from "@/components/ui";
import { skills, traitsFor } from "@/content/game";
export const metadata = {
  title: "Skills",
  description:
    "Explore five skills with 99 levels each: Sneak, Farming, Mining, Woodcutting and Fishing.",
};
export default function Skills() {
  return (
    <div className="parchment page-body">
      <PageIntro
        title="Choose your path. Grow your possibilities."
        description="Five skills, trained through the way you play. Discover their defining abilities, then follow every step from level 1 to mastery."
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
              <Icon name={s.icon} size={62} strokeWidth={1} />
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
        <h3>Your Skill Journal</h3>
        <p>
          Craft it with one paper and one stick, or open <code>/skills</code>.
          View your progression, read traits and toggle unlocked abilities.
          These guides describe the current development build and shipped
          balance defaults; numbers may change before launch.
        </p>
      </div>
    </div>
  );
}
