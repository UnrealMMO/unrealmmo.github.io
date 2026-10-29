import Link from "next/link";
import { ArrowUpRight, Shield, Layers, Sparkles } from "lucide-react";
import { ButtonLink, Icon } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ServerSign } from "@/components/server-sign";
import { SneakScene } from "@/components/sneak-scene";
import { FirestormScene } from "@/components/firestorm-scene";
import { DiamondTreeScene } from "@/components/diamond-tree-scene";
import { skills } from "@/content/game";
export default function Home() {
  return (
    <>
      <section className="hero">
        <img
          className="hero-art"
          src="/art/unreal-valley-v2-1920.webp"
          srcSet="/art/unreal-valley-v2-1920.webp 1920w, /art/unreal-valley-v2-3840.webp 3840w"
          sizes="max(100vw, 177.69svh)"
          width={3840}
          height={2161}
          alt="An imagined Minecraft valley of forested mountains, a riverside homestead and ancient stone arches"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-content wrap">
          <div className="hero-fog" aria-hidden="true" />
          <h1 className="hero-logo">
            <img
              src="/brand/hearthmark/logo-stacked.webp"
              alt="UnrealMMO"
              width={1190}
              height={1010}
              fetchPriority="high"
            />
          </h1>
          <div className="hero-rule" aria-hidden="true" />
          <h2>
            A familiar world.
            <br />
            <em>An extraordinary journey.</em>
          </h2>
          <p>
            The freedom of Minecraft. The depth of an MMORPG.
            <br className="desktop-break" /> Discover a new way to grow, build
            and belong.
          </p>
          <ServerSign />
        </div>
        <div className="hero-bottom wrap">
          <span>MINECRAFT JAVA</span>
        </div>
      </section>
      <div className="feature-ribbon">
        <div className="wrap">
          <span>
            <Sparkles size={18} /> Seven skills to master.
          </span>
          <span>
            <Layers size={18} /> Progression that changes how you play.
          </span>
          <span>
            <Shield size={18} /> A place to call your own.
          </span>
        </div>
      </div>
      <section className="section parchment" id="discover">
        <Reveal className="wrap intro-split">
          <div>
            <h2>
              Your next chapter
              <br />
              starts with <em>you.</em>
            </h2>
          </div>
          <div className="intro-copy">
            <p>
              UnrealMMO brings skills, spells and protected settlements to
              Minecraft survival.
            </p>
            <p>
              Train as you explore, unlock new abilities and build a home with
              friends.
            </p>
            <Link className="text-link" href="/skills/">
              Meet the skills <ArrowUpRight size={18} />
            </Link>
          </div>
        </Reveal>
      </section>
      <section className="section forest">
        <div className="wrap">
          <Reveal className="section-heading">
            <div>
              <h2>
                Small beginnings.
                <br />
                <em>Remarkable abilities.</em>
              </h2>
            </div>
            <p>
              Train seven skills by playing. Each level brings new bonuses and
              abilities.
            </p>
          </Reveal>
          <div className="skill-grid">
            {skills.map((s, i) => (
              <Link
                href={`/skills/${s.id}/`}
                key={s.id}
                className="skill-card"
                style={{ "--accent": s.color } as React.CSSProperties}
              >
                <span className="card-number">0{i + 1}</span>
                <Icon name={s.icon} size={76} />
                <h3>{s.name}</h3>
                <p>{s.tagline}</p>
                <span className="card-bottom">
                  Explore the skill <ArrowUpRight size={17} />
                </span>
              </Link>
            ))}
          </div>
          <div className="section-foot">
            <span>99 levels of discovery in every skill</span>
            <Link className="text-link" href="/skills/">
              Open the skill handbook <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section parchment orchard">
        <div className="wrap spotlight reverse">
          <Reveal className="spotlight-copy">
            <h2>
              What if your garden
              <br />
              grew <em>diamonds?</em>
            </h2>
            <p>
              Build ore trees that produce resources as your Farming skill
              grows.
            </p>
            <p>
              Start with Coal Trees and work toward Diamond Trees at Farming
              level 99.
            </p>
            <ButtonLink href="/structures/">Discover ore trees</ButtonLink>
          </Reveal>
          <Reveal className="tree-showcase">
            <DiamondTreeScene />
            <span className="specimen-tag">
              <span>VIII</span> DIAMOND TREE <small>FARMING 99</small>
            </span>
            <Link href="/structures/diamond-tree/" className="text-link">
              Inspect the build in 3D <ArrowUpRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>
      <FirestormScene />
      <section className="section parchment">
        <div className="wrap spotlight">
          <Reveal>
            <SneakScene />
          </Reveal>
          <Reveal className="spotlight-copy">
            <h2>
              Some legends
              <br />
              move <em>unseen.</em>
            </h2>
            <p>
              Slip beyond another player’s sight. Strike from an unexpected
              angle. Sense a threat before it finds you.
            </p>
            <p>
              Level up Sneak to stay hidden at closer range: from 25 blocks down
              to 10.
            </p>
            <ButtonLink href="/skills/sneak/">Walk the hidden path</ButtonLink>
          </Reveal>
        </div>
      </section>
      <section className="section hearth-backdrop">
        <img
          className="hearth-backdrop-art"
          src="/art/wardtower-shield-wide-v1.webp"
          width={2172}
          height={724}
          loading="lazy"
          alt="A fire-crowned Wardtower beneath a vast protective shield over a Minecraft valley"
        />
        <div className="hearth-backdrop-shade" aria-hidden="true" />
        <div className="wrap home-callout">
          <Reveal className="hearth-copy">
            <h2>
              Adventure out.
              <br />
              <em>Come home.</em>
            </h2>
            <p>
              Build a Hearthstone to protect your home. Choose who can use
              doors, access storage or build with you.
            </p>
            <Link className="text-link" href="/structures/hearthstone/">
              Build your Hearthstone <ArrowUpRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="closing">
        <div className="wrap">
          <h2>
            The world is familiar.
            <br />
            <em>Your story will be Unreal.</em>
          </h2>
          <p>
            We’re building a deeper kind of Minecraft SMP.
            <br />
            Explore the handbook while the next chapter takes shape.
          </p>
          <ButtonLink href="/skills/">Find your first skill</ButtonLink>
        </div>
      </section>
    </>
  );
}
