"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ServerSign } from "@/components/server-sign";
const links = [
  ["/", "Home"],
  ["/skills/", "Skills"],
  ["/wiki/", "Wiki"],
  ["/season-pass/", "Season Pass"],
];
export function Navigation() {
  const path = usePathname().replace(
    /^\/(structures|settlements)(?=\/|$)/,
    "/wiki/$1",
  );
  const [open, setOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="nav">
        <div className="nav-inner">
          <Link href="/" className="brand" aria-label="UnrealMMO home">
            <img
              className="brand-logo"
              src="/brand/hearthmark/logo-horizontal.webp"
              alt=""
              width={1200}
              height={280}
            />
          </Link>
          <nav aria-label="Main navigation" className="desktop-nav">
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                aria-current={
                  (href === "/" ? path === "/" : path.startsWith(href))
                    ? "page"
                    : undefined
                }
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="nav-community">
            <ServerSign compact />
            <a
              className="discord-link"
              href="https://discord.gg/8XWgxefdmg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join the UnrealMMO Discord (opens in a new tab)"
              title="Join our Discord"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.609 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.618-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.675 4.37a.07.07 0 0 0-.032.027C.533 9.043-.32 13.575.099 18.051a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.653a.061.061 0 0 0-.031-.03ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.211 0 2.176 1.095 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.211 0 2.176 1.095 2.157 2.418 0 1.334-.946 2.419-2.157 2.419Z"
                />
              </svg>
            </a>
          </div>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              className="mobile-toggle"
              aria-label="Open navigation"
            >
              <Menu />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="dialog-overlay" />
              <Dialog.Content className="mobile-menu">
                <Dialog.Title>Explore UnrealMMO</Dialog.Title>
                <Dialog.Description>
                  Your next adventure starts here.
                </Dialog.Description>
                <Dialog.Close
                  aria-label="Close navigation"
                  className="menu-close"
                >
                  <X />
                </Dialog.Close>
                <nav aria-label="Mobile navigation">
                  {links.map(([href, label]) => (
                    <Link href={href} key={href} onClick={() => setOpen(false)}>
                      {label}
                    </Link>
                  ))}
                </nav>
                <ServerSign compact />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </header>
    </>
  );
}
