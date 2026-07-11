import Link from "next/link";
import {
  ArrowRight,
  BadgeIndianRupee,
  CheckCircle2,
  ChevronRight,
  Play,
  Send,
  ShieldCheck,
  Tag,
  Truck,
  Wallet,
} from "lucide-react";
import { media } from "@/lib/site";
import {
  brands,
  brandHref,
  featuredCars,
  recentlyBought,
  formatINR,
} from "@/lib/demo";
import { CarCard } from "@/components/ui/CarCard";

const quickActions = [
  { label: "Buy a Car", sub: "3,000+ certified", href: "/buy", icon: BadgeIndianRupee },
  { label: "Sell your car", sub: "Paid in 60 min", href: "/sell", icon: Tag },
  { label: "Send Enquiry", sub: "We call you", href: "/contact", icon: Send },
  { label: "About us", sub: "The CarsVilla story", href: "/about", icon: ShieldCheck },
];

const reasons = [
  { icon: BadgeIndianRupee, title: "Best price", body: "We beat any genuine offer." },
  { icon: ShieldCheck, title: "200-pt check", body: "Certified on every car." },
  { icon: Truck, title: "Doorstep", body: "Pickup & paperwork at home." },
  { icon: Wallet, title: "Instant pay", body: "Money within the hour." },
];

/** App-style mobile home — only loaded on small screens (see HomeShell). */
export default function MobileHome() {
  const hasVideo = Boolean(media.heroVideo);

  return (
    <div className="pb-4">
      {/* Hero video card */}
      <section className="px-4 pt-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-2xl)] border border-line bg-wine shadow-luxe">
          {hasVideo ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={media.heroPoster || undefined}
            >
              <source src={media.heroVideo} type="video/mp4" />
              {media.heroVideoWebm && <source src={media.heroVideoWebm} type="video/webm" />}
            </video>
          ) : (
            <div className="hero-fallback h-full w-full" aria-hidden>
              <span className="absolute inset-0 grid place-items-center">
                <span className="flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs font-medium text-cream/90 backdrop-blur">
                  <Play size={13} className="fill-current" /> Showreel
                </span>
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h1 className="font-display text-[1.7rem] leading-tight text-cream">
              Buy &amp; sell your car, the refined way.
            </h1>
            <div className="mt-4 flex gap-2.5">
              <Link href="/buy" className="flex-1 rounded-full bg-cream py-2.5 text-center text-sm font-semibold text-wine">
                Browse cars
              </Link>
              <Link href="/sell" className="flex-1 rounded-full border border-cream/40 py-2.5 text-center text-sm font-semibold text-cream">
                Sell now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="grid grid-cols-2 gap-3 px-4 pt-5">
        {quickActions.map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className="flex items-center gap-3 rounded-2xl border border-line bg-paper p-3.5 shadow-soft active:scale-[0.98]"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-wine/8 text-wine">
              <a.icon size={19} strokeWidth={1.7} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-ink">{a.label}</span>
              <span className="block truncate text-xs text-muted">{a.sub}</span>
            </span>
          </Link>
        ))}
      </section>

      {/* Brand marquee — auto-scrolls; tap a brand to open /buy pre-filtered */}
      <section className="pt-7">
        <SectionHead title="Shop by brand" />
        <div className="marquee-mask overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
          <div className="marquee-track items-center gap-2.5">
            {[...brands, ...brands].map((b, i) => (
              <Link
                key={`${b.slug}-${i}`}
                href={brandHref(b.slug)}
                className="shrink-0 rounded-full border border-line bg-paper px-4 py-2 font-display text-base text-ink/70 active:border-wine/40"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cars to buy */}
      <section className="pt-7">
        <SectionHead title="Cars to buy" href="/buy" />
        <div className="flex snap-x gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featuredCars.map((car) => (
            <div key={car.slug} className="w-[248px] shrink-0 snap-start">
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </section>

      {/* Recently bought */}
      <section className="mt-7 bg-cream-2/70 py-7">
        <SectionHead title="Recently bought by us" />
        <div className="flex gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {recentlyBought.map((car, i) => (
            <article
              key={`${car.model}-${i}`}
              className="w-[220px] shrink-0 rounded-2xl border border-line bg-paper p-4 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span
                  className="grid h-9 w-9 place-items-center rounded-lg font-display text-cream"
                  style={{ background: car.tint }}
                >
                  {car.make[0]}
                </span>
                <span className="text-xs text-muted">{car.daysAgo}d ago</span>
              </div>
              <h4 className="mt-3 font-display text-lg text-ink">
                {car.make} {car.model}
              </h4>
              <p className="text-xs text-muted">{car.year} · {car.city}</p>
              <p className="mt-3 inline-flex items-center gap-1 text-[0.65rem] uppercase tracking-wider text-muted">
                <CheckCircle2 size={11} className="text-emerald-600" /> We paid
              </p>
              <p className="font-display text-xl text-wine">{formatINR(car.paid)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Why CarsVilla */}
      <section className="px-4 pt-7">
        <SectionHead title="Why CarsVilla" bare />
        <div className="mt-1 grid grid-cols-2 gap-3">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-2xl border border-line bg-paper p-4 shadow-soft">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-wine/8 text-wine">
                <r.icon size={18} strokeWidth={1.7} />
              </span>
              <h4 className="mt-3 font-display text-base text-ink">{r.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-muted">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="px-4 pt-7">
        <div className="relative overflow-hidden rounded-[var(--radius-2xl)] bg-wine p-6 text-cream shadow-luxe">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
          <p className="kicker text-gold">Send an enquiry</p>
          <h3 className="mt-3 font-display text-2xl text-cream">
            Tell us what you need — we call within the hour.
          </h3>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-wine"
          >
            Start enquiry
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function SectionHead({
  title,
  href,
  bare,
}: {
  title: string;
  href?: string;
  bare?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between ${bare ? "" : "px-4"} pb-3`}>
      <h2 className="text-[1.25rem]">{title}</h2>
      {href && (
        <Link href={href} className="inline-flex items-center text-sm font-semibold text-wine">
          See all <ChevronRight size={15} />
        </Link>
      )}
    </div>
  );
}
