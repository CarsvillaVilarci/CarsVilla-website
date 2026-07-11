import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { site, primaryNav } from "@/lib/site";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact us", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Cars",
    links: [
      { label: "Buy a car", href: "/buy" },
      { label: "Sell your car", href: "/sell" },
      { label: "Live auction", href: "/auction" },
      { label: "Services", href: "/services" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Login", href: "/login" },
      { label: "FAQs", href: "/faqs" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-8 border-t border-line bg-cream-2/60">
      <div className="container-x grid gap-10 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {site.tagline}. Buy and sell certified pre-owned cars with total
            confidence.
          </p>
          <p className="mt-5 text-sm text-muted">{site.phone}</p>
          <p className="text-sm text-muted">{site.email}</p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-lg text-ink">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-wine"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-4">
            {primaryNav.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-wine">
                {n.label}
              </Link>
            ))}
          </p>
          <p>
            Crafted by <span className="font-semibold text-wine">{site.studio}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
