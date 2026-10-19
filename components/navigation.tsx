"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
const links = [
  ["/", "Home"],
  ["/skills/", "Skills"],
  ["/structures/", "Structures"],
];
export function Navigation() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="nav">
        <div className="nav-inner">
          <Link href="/" className="brand" aria-label="UnrealMMO home">
            <img src="/brand/emblem.svg" alt="" width="37" height="42" />
            <span>
              UNREAL<span className="brand-small">MMO</span>
            </span>
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
          <Link href="/skills/" className="nav-cta">
            Begin your journey <ArrowUpRight size={15} />
          </Link>
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
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </header>
    </>
  );
}
