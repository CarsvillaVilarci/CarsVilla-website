import Link from "next/link";
import Image from "next/image";
import { Camera, Play, AtSign, Globe, Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Buy",
    links: [
      { label: "All cars", href: "/buy" },
      { label: "SUVs", href: "/buy?body=SUV" },
      { label: "Luxury", href: "/buy?body=Luxury" },
      { label: "Under ₹10 Lakh", href: "/buy" },
    ],
  },
  {
    title: "Sell",
    links: [
      { label: "Sell your car", href: "/sell" },
      { label: "Get car value", href: "/sell" },
      { label: "RC check", href: "/lookup" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
      { label: "My profile", href: "/profile" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line bg-ink-2">
      <div className="container-x mx-auto max-w-7xl py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {site.description}
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Camera, href: site.social.instagram },
                { Icon: Play, href: site.social.youtube },
                { Icon: AtSign, href: site.social.twitter },
                { Icon: Globe, href: site.social.facebook },
              ].map(({ Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-brand hover:text-brand"
                  aria-label="Social link"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm uppercase tracking-[0.16em] text-muted">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-paper/80 transition-colors hover:text-brand"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={`tel:${site.phone}`} className="inline-flex items-center gap-2 hover:text-paper">
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-paper">
              <Mail className="h-4 w-4" /> {site.email}
            </a>
          </div>
        </div>

        {/* Studio credit */}
        <div className="mt-8 flex justify-center">
          <a
            href="#"
            className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-4 py-2 text-sm text-muted transition-colors hover:border-brand/40 hover:text-paper"
          >
            <span>Crafted &amp; powered by</span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-paper">
              <VilarciMark />
              Vilarci
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

/** Small Vilarci logo mark. */
function VilarciMark() {
  return (
    <Image
      src="https://officialpic.vilarci.in/Icons/web-icon.png"
      alt="Vilarci"
      width={20}
      height={20}
      className="h-5 w-5 rounded-md object-contain"
    />
  );
}
