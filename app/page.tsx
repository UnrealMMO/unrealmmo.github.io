import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";
import { ButtonLink, Icon } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { StructurePreview } from "@/components/structure-preview";
import { skills, structures } from "@/content/game";
export default function Home() {
  return (
    <>
      <section className="hero">
        <img
          className="hero-art"
          src="/art/unreal-valley.webp"
          alt="An imagined Minecraft valley of forested mountains, a riverside homestead and ancient stone arches"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-content wrap">
          <div className="hero-fog" aria-hidden="true" />
          <h1 className="hero-logo">
            UNREAL<span>MMO</span>
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
          <div className="server-sign" aria-label="Minecraft server address">
            <img
              src="/art/server-placard-v2.webp"
              alt=""
              width="1400"
              height="467"
              draggable="false"
            />
            <span>mc.unrealmmo.com</span>
          </div>
        </div>
        <div className="hero-bottom wrap">
          <span>MINECRAFT JAVA · IN DEVELOPMENT</span>
          <a href="#discover">
            Venture further <ArrowDown size={15} />
          </a>
          <span className="concept-label">Original concept artwork</span>
        </div>
      </section>
      <div className="feature-ribbon">
        <div className="wrap">
          <span>
            <Sparkles size={18} /> Five skills. Countless possibilities.
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
              UnrealMMO is an upcoming Minecraft MMORPG that grows from
              everything you love about SMP: shared adventures, ambitious builds
              and the satisfaction of making something your own.
            </p>
            <p>
              Now, the way you play shapes what you can become. Train real
              skills. Unlock abilities that open new possibilities. Turn a quiet
              patch of land into something extraordinary.
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
              Five paths to mastery. Train by doing, and discover what the next
              level makes possible.
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
                <Icon name={s.icon} size={40} strokeWidth={1} />
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
      <section className="section parchment">
        <div className="wrap spotlight">
          <Reveal className="stealth-scene">
            <img src="/art/unreal-valley.webp" alt="" loading="lazy" />
            <div className="stealth-ring ring-one" />
            <div className="stealth-ring ring-two" />
            <div className="stealth-figure">
              <Icon name="eye" size={62} strokeWidth={1} />
            </div>
            <span className="scene-label">SNEAK · THE UNSEEN PATH</span>
            <span className="scene-note">Concealment improves as you grow</span>
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
              Sneak turns patience into possibility. As you level, your
              concealment distance closes from 25 blocks to just 10—making the
              shadows a place you can learn to master.
            </p>
            <ButtonLink href="/skills/sneak/">Walk the hidden path</ButtonLink>
          </Reveal>
        </div>
      </section>
      <section className="section orchard">
        <div className="wrap spotlight reverse">
          <Reveal className="spotlight-copy">
            <h2>
              What if your garden
              <br />
              grew <em>diamonds?</em>
            </h2>
            <p>
              Beyond the wheat fields lies a different kind of orchard. Build
              ore trees from precious materials, unlock new varieties and tend a
              living source of resources.
            </p>
            <p>
              From your first Coal Tree to a Diamond Tree at level 99, each one
              is something to work toward—and something you build with your own
              hands.
            </p>
            <ButtonLink href="/structures/">Discover ore trees</ButtonLink>
          </Reveal>
          <Reveal className="tree-showcase">
            <div className="orbital" />
            <StructurePreview structure={structures[7]} />
            <span className="specimen-tag">
              <span>VIII</span> DIAMOND TREE <small>FARMING 99</small>
            </span>
            <Link href="/structures/diamond-tree/" className="text-link">
              Inspect the build in 3D <ArrowUpRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="section parchment">
        <Reveal className="wrap home-callout">
          <div className="hearth-emblem">
            <StructurePreview structure={structures[8]} />
          </div>
          <div>
            <h2>
              Adventure out.
              <br />
              <em>Come home.</em>
            </h2>
            <p>
              Build a Hearthstone pedestal, claim your first protected home and
              choose who can open its doors, share its stores or build beside
              you.
            </p>
            <Link className="text-link" href="/structures/hearthstone/">
              Build your Hearthstone <ArrowUpRight size={18} />
            </Link>
          </div>
        </Reveal>
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
