import { ButtonLink } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="not-found parchment">
      <p className="eyebrow" style={{ justifyContent: "center" }}>
        An uncharted path
      </p>
      <h1>This trail ends here.</h1>
      <p>Let’s find your way back to the adventure.</p>
      <ButtonLink href="/">Return home</ButtonLink>
    </section>
  );
}
