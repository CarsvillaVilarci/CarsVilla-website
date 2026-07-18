"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Car, Tag, MessageCircle, LayoutGrid } from "lucide-react";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/buy", label: "Buy", icon: Car },
  { href: "/sell", label: "Sell", icon: Tag },
  { href: "/contact", label: "Enquiry", icon: MessageCircle },
  // "More" is the hub tab: every page (and future feature) hangs off /more.
  { href: "/more", label: "More", icon: LayoutGrid },
];

/** Fixed native-app tab bar — all tabs weighted equally. */
export function BottomNav() {
  // Normalise the exported trailing slash so "/buy/" matches "/buy",
  // and highlight parent tabs on subpages ("/buy/some-car" → Buy).
  const pathname = usePathname().replace(/\/+$/, "") || "/";
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-[rgba(253,248,244,0.92)] backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2 py-2">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className={`flex flex-col items-center gap-1 py-1 text-[0.65rem] font-medium transition-colors ${
                  active ? "text-wine" : "text-muted"
                }`}
              >
                <tab.icon size={21} strokeWidth={active ? 2.4 : 1.8} />
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
