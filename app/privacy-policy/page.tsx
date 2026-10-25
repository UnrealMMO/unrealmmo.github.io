import { PageIntro } from "@/components/ui";
export const metadata = {
  title: "Privacy policy",
  description:
    "How UnrealMMO handles information on its website and Minecraft server, and how to contact us about privacy.",
};
export default function PrivacyPolicy() {
  return (
    <div className="parchment page-body">
      <PageIntro
        title="Privacy policy"
        description="Your information on the UnrealMMO website and Minecraft server."
      />
      <article className="wrap prose">
        <p>Last updated: 25 October 2026</p>
        <p>
          This policy describes how the UnrealMMO server team (“we”, “us”)
          handles information when you browse our guides, play on our Minecraft
          server, or contact support. Minecraft, Microsoft, GitHub and other
          external services have their own privacy policies.
        </p>
        <h2>Information we handle</h2>
        <ul>
          <li>
            <strong>Website visits.</strong> Our public handbook is hosted on
            GitHub Pages. GitHub may receive connection information, including
            your IP address, when delivering the site. This website has no
            account registration, advertising or analytics scripts. Fonts and
            artwork are served with the site; guide controls and checklists run
            in your browser.
          </li>
          <li>
            <strong>Minecraft identity and connections.</strong> The server uses
            your Minecraft username and player UUID to identify your character.
            Connections and server logs can include IP addresses, connection
            times, client information and diagnostic events. We do not ask for
            your Microsoft account password.
          </li>
          <li>
            <strong>Gameplay.</strong> World saves and plugins store information
            needed to continue your game: location, inventory, skills and
            progress, territory ownership and memberships, settlement
            structures, livestock associations, Coins balances and transaction
            history. Records can include actions, timestamps and in-game
            purchases.
          </li>
          <li>
            <strong>Communication and moderation.</strong> Chat, commands and
            moderation actions may appear in server logs. If you email support,
            we receive your email address, message and anything you attach.
            Please avoid including passwords or unnecessary personal details.
          </li>
        </ul>
        <h2>Why we use it</h2>
        <p>
          We use this information to save and restore gameplay, apply territory
          permissions, account for Coins, investigate bugs and abuse, enforce
          server rules, and answer support requests. Backups help us recover
          worlds and records after failures. Coins transactions described in the
          game are virtual gameplay records, not bank or card details.
        </p>
        <h2>Visibility and service providers</h2>
        <p>
          Your username, public chat, signs, builds and other shared-world
          activity can be seen by other players. Territory and settlement
          features may expose relevant names and roles to players using them. Do
          not put private information in public game content.
        </p>
        <p>
          Authorized server administrators may access records for operation,
          troubleshooting, moderation and support. Hosting, email and Minecraft
          authentication or profile services process information needed to
          provide their services. Information may also be disclosed when
          required by law or needed to investigate abuse and protect players or
          the service.
        </p>
        <p>
          For information about the website host and Minecraft account services,
          see{" "}
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
            GitHub’s privacy statement
          </a>{" "}
          and the{" "}
          <a href="https://privacy.microsoft.com/en-us/privacystatement">
            Microsoft privacy statement
          </a>
          . External links take you to services governed by their own policies;
          their processing may occur in other countries.
        </p>
        <h2>Cookies and browser controls</h2>
        <p>
          The current handbook does not set advertising or analytics cookies.
          Its interactive guides do not require a tracking profile. Your browser
          still makes ordinary requests to the website host, and external sites
          you choose to visit may use cookies of their own.
        </p>
        <h2>Retention and security</h2>
        <p>
          Player progress and world records persist between sessions.
          Transaction and moderation records may need to remain available to
          resolve disputes, prevent duplicate payments and investigate abuse.
          Backups can retain earlier copies after live data changes. Retention
          depends on the record and its operational or legal purpose; leaving
          the server does not automatically erase it.
        </p>
        <p>
          We use access restrictions and backups to help protect the server and
          its records. No online service or backup system can guarantee complete
          security. If you believe information has been exposed, contact us
          using the address below.
        </p>
        <h2>Your choices and requests</h2>
        <p>
          You can ask about information associated with your player identity,
          request a correction or deletion, or raise a privacy concern.
          Depending on where you live, you may also have rights to access,
          obtain a copy of, restrict or object to processing, or complain to a
          privacy authority. We assess requests under applicable law and may
          need to verify your identity. Some records may need to be retained for
          security, legal obligations or the integrity of shared worlds and
          transaction history.
        </p>
        <p>
          Contact <a href="mailto:support@smartify.ai">support@smartify.ai</a>{" "}
          with “UnrealMMO privacy” in the subject and your Minecraft username or
          UUID, if relevant. Never send your account password.
        </p>
        <h2>Children and families</h2>
        <p>
          Players should avoid sharing real names, addresses, school details or
          other private information in chat or signs. A parent or guardian who
          has concerns about a child’s information can contact support so we can
          review the circumstances and any action required by applicable law.
        </p>
        <h2>Policy updates</h2>
        <p>
          We will update this page when our data practices change and revise the
          date above. Where required, we will provide additional notice of
          significant changes.
        </p>
      </article>
    </div>
  );
}
