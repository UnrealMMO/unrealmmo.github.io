import type { Metadata } from "next";
import { site } from "@/config/site";
import Link from "next/link";
import "@fontsource/cinzel/600.css";
import "@fontsource/cinzel/700.css";
import "@fontsource/almendra/latin-700.css";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/500.css";
import "@fontsource/figtree/600.css";
import { Navigation } from "@/components/navigation";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "UnrealMMO — A new chapter in Minecraft",
    template: "%s | UnrealMMO",
  },
  description: site.description,
  icons: { icon: "/brand/emblem.svg" },
  openGraph: {
    title: "UnrealMMO — A new chapter in Minecraft",
    description: "A familiar world. An extraordinary journey.",
    images: [{ url: "/art/unreal-valley.webp", width: 1672, height: 941 }],
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Navigation />
        <main id="main">{children}</main>
        <footer className="footer">
          <div className="wrap footer-main">
            <Link href="/" className="brand">
              <img src="/brand/emblem.svg" width="38" height="42" alt="" />
              UNREAL<span className="brand-small">MMO</span>
            </Link>
            <p>Find your craft. Make your mark.</p>
            <nav aria-label="Footer navigation">
              <Link href="/skills/">Skills</Link>
              <Link href="/structures/">Structures</Link>
              <Link href="/about/">About & credits</Link>
              <a href="https://github.com/UnrealMMO/unrealmmo.github.io">
                GitHub ↗
              </a>
            </nav>
          </div>
          <div className="wrap footer-bottom">
            <span>© 2026 UnrealMMO · In development</span>
            <span>
              Not an official Minecraft product. Not approved by or associated
              with Mojang or Microsoft.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
