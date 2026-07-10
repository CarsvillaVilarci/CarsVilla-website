import type { Metadata } from "next";
import { Target, Gem, HeartHandshake, Leaf } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CtaBand } from "@/components/home/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About CarsVilla — India's Trusted Used-Car Marketplace",
  description:
    "CarsVilla is on a mission to make buying and selling used cars transparent, fair and effortless for every Indian. Learn our story, values and promise.",
  alternates: { canonical: "/about" },
};

const stats = [
  { n: "50,000+", l: "Cars transacted" },
  { n: "18", l: "Cities served" },
  { n: "₹1,200 Cr", l: "Paid to sellers" },
  { n: "4.8/5", l: "Customer rating" },
];

const values = [
  { Icon: Gem, t: "Radical transparency", d: "Every price, every report, every fee — out in the open. No surprises, ever." },
  { Icon: HeartHandshake, t: "Customer obsession", d: "We win only when you drive away happy. That guides every decision we make." },
  { Icon: Target, t: "Fair for all", d: "Sellers get the best price, buyers get certified quality. A genuinely fair market." },
  { Icon: Leaf, t: "Sustainable driving", d: "Giving great cars a second life is good for your wallet and the planet." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "About", url: "/about" }])} />
      <PageHeader
        eyebrow="About us"
        title="Reinventing how India buys & sells cars"
        subtitle="We started CarsVilla with one belief: a used car should be bought and sold with the same confidence as a new one."
      />

      {/* Stats */}
      <section className="container-x mx-auto max-w-7xl py-16">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="bg-ink p-8 text-center">
              <p className="font-display text-3xl text-paper md:text-4xl">{s.n}</p>
              <p className="mt-2 text-sm text-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="container-x mx-auto max-w-7xl py-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeader
            eyebrow="Our story"
            title="Built by car people, for car people"
          />
          <Reveal delay={0.1}>
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              <p>
                Buying a used car in India used to mean uncertainty — hidden damage, unclear
                paperwork and endless haggling. Selling was no better: lowball offers and days of
                stress.
              </p>
              <p>
                We built CarsVilla to fix that. A 200-point inspection you can trust, RC-verified
                history, transparent pricing, and doorstep convenience for buyers and sellers alike.
              </p>
              <p className="text-paper">
                Today, tens of thousands of Indians trust us with the second-biggest purchase of
                their lives. We don&apos;t take that lightly.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-line bg-ink-2/50 py-20">
        <div className="container-x mx-auto max-w-7xl">
          <SectionHeader eyebrow="What we stand for" title="Our values" align="center" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={0.05 * i}>
                <div className="h-full rounded-3xl border border-line bg-surface/60 p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-ink text-brand">
                    <v.Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl text-paper">{v.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
