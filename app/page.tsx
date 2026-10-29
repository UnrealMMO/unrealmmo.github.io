import Link from "next/link";
import { ArrowUpRight, Shield, Layers, Sparkles } from "lucide-react";
import { ButtonLink, Icon } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ServerSign } from "@/components/server-sign";
import { SneakScene } from "@/components/sneak-scene";
import { FirestormScene } from "@/components/firestorm-scene";
import { DiamondTreeScene } from "@/components/diamond-tree-scene";
import { SceneWindow } from "@/components/scene-window";
import { HeroWindow } from "@/components/hero-window";
import { skills } from "@/content/game";
export default function Home() {
  return (
    <>
      <HeroWindow>
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
      </HeroWindow>
      <div className="feature-ribbon">
        <div className="wrap">
          <span>
            <Sparkles size={18} aria-hidden="true" />
            <span className="feature-label">Seven skills to master.</span>
          </span>
          <span>
            <Layers size={18} aria-hidden="true" />
            <span className="feature-label">
              Progression that changes how you play.
            </span>
          </span>
          <span>
            <Shield size={18} aria-hidden="true" />
            <span className="feature-label">A place to call your own.</span>
          </span>
        </div>
      </div>
      <SceneWindow className="discover-scene" id="discover">
        <div className="discover-art-window">
          <img
            className="discover-scene-art"
            src="/art/discover-valley-v1.webp"
            srcSet="/art/discover-valley-v1-768.webp 768w, /art/discover-valley-v1.webp 1536w"
            sizes="100vw"
            width={1536}
            height={1024}
            loading="lazy"
            alt="A sunny Minecraft-style settlement with players mining, farming, fishing and casting water magic beside an ore tree and horse stable. Original concept artwork."
          />
        </div>
        <div className="wrap intro-split">
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
        </div>
      </SceneWindow>
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
      <SceneWindow className="section hearth-backdrop">
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
          <div className="hearth-copy">
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
          </div>
        </div>
      </SceneWindow>
      <SceneWindow className="harvest-promo">
        <div className="harvest-promo-backdrop" aria-hidden="true" />
        <div className="wrap harvest-promo-layout">
          <div className="harvest-promo-copy">
            <p className="harvest-promo-season">
              Season Zero
              <span>Hollow Harvest</span>
              <span className="harvest-promo-dates">
                October 28 – December 23, 2026
              </span>
            </p>
            <h2 id="harvest-promo-title">
              A little haunting.
              <br />
              <em>A lot to collect.</em>
            </h2>
            <p className="harvest-promo-description">
              Ghostly companions. Regal armor. One wicked pumpkin helmet. Play
              your way through 40 tiers of Hollow Harvest rewards.
            </p>
            <ButtonLink href="/season-pass/">
              Explore the Season Pass
            </ButtonLink>
          </div>
          <div className="harvest-promo-rewards">
            <img
              className="harvest-promo-regent"
              src="/season/rewards/hollow_regent_regalia-large.webp"
              alt="Hollow Regent armor worn with the Dread Lantern pumpkin helmet"
              width={800}
              height={800}
              loading="lazy"
            />
            <img
              className="harvest-promo-raven"
              src="/season/rewards/nevermore_ghost-large.webp"
              alt="Nevermore ghost raven in flight"
              width={800}
              height={800}
              loading="lazy"
            />
            <img
              className="harvest-promo-lantern"
              src="/season/rewards/little_lantern-large.webp"
              alt="Little Lantern companion"
              width={800}
              height={800}
              loading="lazy"
            />
          </div>
        </div>
      </SceneWindow>
    </>
  );
}
