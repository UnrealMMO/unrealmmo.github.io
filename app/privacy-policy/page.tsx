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
          server, make a real-money purchase through our website, or contact
          support. Minecraft, Microsoft, GitHub and other external services have
          their own privacy policies.
        </p>
        <h2>Information we handle</h2>
        <ul>
          <li>
            <strong>Website visits.</strong> Our public handbook is hosted on
            GitHub Pages. GitHub may receive connection information, including
            your IP address, when delivering the site. The handbook itself has
            no account registration or analytics scripts. Fonts and artwork are
            served with the site; guide controls and checklists run in your
            browser. Purchase and payment services may process additional
            information as described below.
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
        <h2>Website purchases and payments</h2>
        <p>
          We offer real-money purchases through our website. To process and
          deliver an order, we and our payment service providers may handle your
          contact and billing details, Minecraft username or UUID, purchased
          items, amount and currency, transaction identifiers, payment status,
          and refund or dispute history. Payment providers may collect payment
          credentials and device or connection information directly for payment
          authorization, fraud prevention and their legal obligations.
        </p>
        <p>
          We use order information to deliver purchases to the correct player,
          send receipts or service messages, provide purchase support, handle
          refunds and disputes, and maintain accounting records. The payment
          provider’s privacy notice applies to information it processes,
          including when you use its hosted checkout. Do not send card details
          or account passwords to our support email.
        </p>
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
          troubleshooting, moderation and support. We share relevant information
          with providers supporting hosting, payment processing, order
          fulfillment, email, Minecraft authentication or profiles, and customer
          support, as needed for those functions. Payment and authentication
          providers may also process information for their own legal, security
          and account-management purposes under their privacy notices.
          Information may also be disclosed when required by law or needed to
          investigate abuse and protect players or the service.
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
        <h2>Advertising UnrealMMO</h2>
        <p>
          We promote UnrealMMO on other websites and platforms. We do not
          display third-party advertisements to players on our website or
          server. Platforms where our advertisements appear may process
          information about your interactions with those advertisements under
          their own privacy notices and your choices on those platforms.
        </p>
        <h2>Cookies and consent</h2>
        <p>
          Cookies and similar technologies may support checkout sessions,
          payment security, fraud prevention, authentication, preferences and
          consent choices. The current handbook does not set advertising or
          analytics cookies; third-party checkout and other services may use
          their own technologies.
        </p>
        <p>
          Where applicable law requires consent for non-essential cookies or
          similar tracking, that consent must be obtained before those
          technologies are used. Optional tracking should remain disabled unless
          you choose to enable it. Where a service offers cookie settings, you
          can use them to change or withdraw your choices. You can also block or
          delete cookies in your browser, although this may interrupt checkout
          or other features that rely on essential cookies.
        </p>
        <p>
          Buying something or playing on the server does not itself constitute
          consent to optional tracking or marketing. For third-party services,
          consult their cookie notices and privacy controls. Contact us if you
          need help understanding a choice.
        </p>
        <h2>Retention and security</h2>
        <p>
          Player progress and world records persist between sessions.
          Transaction and moderation records may need to remain available to
          resolve disputes, prevent duplicate payments and investigate abuse.
          Real-money order records may also be retained for accounting, tax,
          refund and payment-provider obligations. Backups can retain earlier
          copies after live data changes. Retention depends on the record and
          its operational or legal purpose; leaving the server does not
          automatically erase it.
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
        <h2>Age requirements and children’s privacy</h2>
        <p>
          The UnrealMMO website is intended for people aged 13 and older.
          Children under 13 should not use the website or submit personal
          information through it. The Minecraft server does not perform age
          verification or use automated checks to prevent younger players from
          joining. This age policy should not be understood as a technical age
          gate on the server.
        </p>
        <p>
          Minecraft accounts, payment services and other providers may have
          their own age and parental-permission requirements. Players under the
          age of majority should involve a parent or guardian before making
          purchases or providing personal information.
        </p>
        <p>
          If you believe a child under 13 has provided personal information,
          contact support@smartify.ai so we can review and address it, including
          deletion where required. An age statement alone does not replace any
          parental notice, consent or other protections required by applicable
          law.
        </p>
        <p>
          Players should avoid sharing real names, addresses, school details or
          other private information in chat or signs. Parents or guardians can
          contact support to ask about a child’s information, request access or
          deletion, or raise concerns about collection or purchases. We may need
          to verify the requester’s identity and authority before acting.
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
