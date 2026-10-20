import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export { SkillIcon as Icon } from "./skill-icon";
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
