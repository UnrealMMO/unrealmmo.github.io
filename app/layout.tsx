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
  icons: {
    icon: [
      { url: "/brand/hearthmark/favicon.ico", sizes: "any" },
      {
        url: "/brand/hearthmark/icon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/brand/hearthmark/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: { url: "/brand/hearthmark/icon-180.png", sizes: "180x180" },
  },
  openGraph: {
    title: "UnrealMMO — A new chapter in Minecraft",
    description: "A familiar world. An extraordinary journey.",
    images: [
      {
        url: "/brand/hearthmark/banner-1200x630.png",
        width: 1200,
        height: 630,
        alt: "UnrealMMO — mc.unrealmmo.com",
      },
    ],
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
            <Link href="/" className="brand" aria-label="UnrealMMO home">
              <img
                className="brand-logo"
                src="/brand/hearthmark/logo-horizontal.webp"
                width={1200}
                height={280}
                alt=""
              />
            </Link>
            <p>Find your craft. Make your mark.</p>
            <nav aria-label="Footer navigation">
              <Link href="/skills/">Skills</Link>
              <Link href="/wiki/">Wiki</Link>
              <Link href="/about/">About & credits</Link>
              <Link href="/privacy-policy/">Privacy policy</Link>
            </nav>
          </div>
          <div className="wrap footer-bottom">
            <span>© 2026 UnrealMMO</span>
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
