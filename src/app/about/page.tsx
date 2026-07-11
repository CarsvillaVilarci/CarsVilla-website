import type { Metadata } from "next";
import { BadgeIndianRupee, Handshake, ShieldCheck, Truck } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "CarsVilla is a boutique pre-owned car dealership in Tamluk — transparent pricing, certified quality and a concierge approach to buying and selling cars.",
};

const stats = [
  { value: "4,200+", label: "cars re-homed" },
  { value: "60 min", label: "sell & get paid" },
  { value: "200-pt", label: "inspection" },
  { value: "4.9/5", label: "seller rating" },
];

const values = [
  { icon: BadgeIndianRupee, title: "Fair, transparent pricing", body: "One honest price — no hidden charges, no last-minute renegotiation. What we quote is what you get." },
  { icon: ShieldCheck, title: "Certified quality", body: "Every car passes a 200-point mechanical and paperwork check before it earns the CarsVilla badge." },
  { icon: Truck, title: "We come to you", body: "Evaluation, test drives, pickup and RC transfer — all handled at your doorstep across Purba Medinipur." },
  { icon: Handshake, title: "Relationships, not transactions", body: "A single advisor stays with you end-to-end. No call centres, no being passed around." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="About us"
        title="A dealership that acts like a concierge."
        subtitle={`${site.name} began in Tamluk with one belief: buying and selling a used car should feel effortless, honest and a little bit premium.`}
      />

      {/* Stats */}
      <section className="container-x py-14">
        <div className="grid grid-cols-2 gap-6 rounded-[var(--radius-2xl)] border border-line bg-paper p-8 shadow-soft md:grid-cols-4 md:p-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70} className="text-center">
              <p className="font-display text-[clamp(2rem,4vw,3rem)] text-wine">{s.value}</p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="container-x grid gap-10 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="kicker">Our story</p>
          <h2 className="mt-3 text-[clamp(1.9rem,3vw,2.8rem)]">Built in Tamluk, for the way people really buy cars.</h2>
        </Reveal>
        <Reveal delay={100} className="space-y-4 text-[1.02rem] leading-relaxed text-muted">
          <p>
            The used-car market runs on guesswork and haggling. We wanted the
            opposite — a place where a fair price, a properly inspected car and
            clean paperwork are simply the default.
          </p>
          <p>
            So {site.name} does the heavy lifting: we buy cars from owners in
            minutes with instant payment, recondition and certify them, and hand
            the next owner a car they can trust — with everything from finance to
            RC transfer handled for them.
          </p>
          <p>
            Today we serve sellers and buyers across Tamluk, Haldia, Mecheda,
            Panskura, Contai and greater Kolkata — one honest deal at a time.
          </p>
        </Reveal>
      </section>

      {/* Values */}
      <section className="container-x py-14">
        <Reveal className="mb-9">
          <p className="kicker">What we stand for</p>
          <h2 className="mt-3 text-[clamp(1.9rem,3vw,2.8rem)]">Our values</h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal
              key={v.title}
              delay={i * 80}
              className="rounded-[var(--radius-xl)] border border-line bg-paper p-6 shadow-soft"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-wine/8 text-wine">
                <v.icon size={22} strokeWidth={1.6} />
              </span>
              <h3 className="mt-5 font-display text-xl text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
