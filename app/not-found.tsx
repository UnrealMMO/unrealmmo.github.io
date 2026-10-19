import { ButtonLink } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="not-found parchment">
      <h1>This trail ends here.</h1>
      <p>Let’s find your way back to the adventure.</p>
      <ButtonLink href="/">Return home</ButtonLink>
    </section>
  );
}
