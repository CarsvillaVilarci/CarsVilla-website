import type { Metadata } from "next";
import Link from "next/link";
import {
  Bell,
  Briefcase,
  Building2,
  Car,
  ChevronRight,
  Gavel,
  HelpCircle,
  LogIn,
  MessageCircle,
  PhoneCall,
  Shield,
  Tag,
  User,
  Wrench,
} from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "More",
  robots: { index: false, follow: true },
};

type Item = {
  href: string;
  label: string;
  body: string;
  icon: typeof Car;
};

const groups: { title: string; items: Item[] }[] = [
  {
    title: "Marketplace",
    items: [
      { href: "/buy", label: "Buy a car", body: "Certified pre-owned inventory", icon: Car },
      { href: "/sell", label: "Sell your car", body: "Instant estimate, paid same day", icon: Tag },
      { href: "/auction", label: "Live auction", body: "Dealers bid on listed cars", icon: Gavel },
      { href: "/services", label: "Services", body: "RC check, insurance, financing", icon: Wrench },
    ],
  },
  {
    title: "Your account",
    items: [
      { href: "/profile", label: "My dashboard", body: "Saved cars, listings, enquiries", icon: User },
      { href: "/notifications", label: "Notifications", body: "Bids, replies and price drops", icon: Bell },
      { href: "/login", label: "Login / Sign up", body: "One account for everything", icon: LogIn },
    ],
  },
  {
    title: "Company & help",
    items: [
      { href: "/contact", label: "Contact us", body: "Talk to a CarsVilla advisor", icon: MessageCircle },
      { href: "/faqs", label: "FAQs", body: "Quick answers, no jargon", icon: HelpCircle },
      { href: "/about", label: "About CarsVilla", body: "Our story and promise", icon: Building2 },
      { href: "/careers", label: "Careers", body: "Work with us in Tamluk", icon: Briefcase },
      { href: "/privacy", label: "Privacy policy", body: "How we handle your data", icon: Shield },
    ],
  },
];

/** App-style hub: every corner of CarsVilla, one tap away (mobile "More" tab). */
export default function MorePage() {
  return (
    <div className="container-x max-w-2xl py-8 lg:py-14">
      <Reveal>
        {/* Account banner */}
        <Link
          href="/login"
          className="relative flex items-center gap-4 overflow-hidden rounded-[var(--radius-2xl)] bg-wine p-6 text-cream shadow-luxe transition-colors hover:bg-wine-hot"
        >
          <div className="absolute -right-10 -top-14 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cream/10">
            <User size={22} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-xl">Welcome to CarsVilla</span>
            <span className="mt-0.5 block text-sm text-cream/70">
              Log in to save cars, list yours and bid live.
            </span>
          </span>
          <ChevronRight size={18} className="shrink-0 text-cream/60" />
        </Link>
      </Reveal>

      {groups.map((group, gi) => (
        <Reveal key={group.title} delay={80 + gi * 60} className="mt-8">
          <h2 className="kicker">{group.title}</h2>
          <div className="mt-3 overflow-hidden rounded-[var(--radius-xl)] border border-line bg-paper shadow-soft">
            {group.items.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 p-4 transition-colors hover:bg-cream/60 ${
                  i > 0 ? "border-t border-line" : ""
                }`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-wine/8 text-wine">
                  <item.icon size={18} strokeWidth={1.8} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-ink">{item.label}</span>
                  <span className="block text-xs text-muted">{item.body}</span>
                </span>
                <ChevronRight size={16} className="shrink-0 text-muted" />
              </Link>
            ))}
          </div>
        </Reveal>
      ))}

      <Reveal delay={260} className="mt-8">
        <a
          href={`tel:${site.phone.replace(/\s/g, "")}`}
          className="flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-wine transition-colors hover:border-wine/40"
        >
          <PhoneCall size={16} /> {site.phone}
        </a>
        <p className="mt-6 text-center text-xs text-muted">
          {site.name} · {site.tagline}
        </p>
      </Reveal>
    </div>
  );
}
