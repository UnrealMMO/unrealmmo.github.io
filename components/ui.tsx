import Link from "next/link";
import {
  ArrowUpRight,
  Eye,
  Sprout,
  Pickaxe,
  Axe,
  Fish,
  Compass,
  type LucideProps,
} from "lucide-react";
export function Icon({ name, ...props }: LucideProps & { name: string }) {
  const I =
    (
      {
        eye: Eye,
        sprout: Sprout,
        pickaxe: Pickaxe,
        axe: Axe,
        fish: Fish,
      } as const
    )[name as "eye"] || Compass;
  return <I {...props} />;
}
export function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? "secondary" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function PageIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="page-intro wrap">
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
