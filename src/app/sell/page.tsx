import type { Metadata } from "next";
import { BadgeIndianRupee, Clock, FileCheck, Wallet } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SellFlow } from "@/components/sell/SellFlow";

export const metadata: Metadata = {
  title: "Sell Your Car in Tamluk",
  description:
    "Sell your used car to CarsVilla in Tamluk — get an instant online valuation, a free doorstep inspection, the best price guaranteed and payment within the hour.",
};

const perks = [
  { icon: BadgeIndianRupee, title: "Best price, guaranteed", body: "Bring any genuine offer and we'll beat it." },
  { icon: Clock, title: "Sold in 60 minutes", body: "From quote to cash, the same day." },
  { icon: Wallet, title: "Instant payment", body: "Money in your bank before we drive away." },
  { icon: FileCheck, title: "Zero paperwork", body: "Free RC transfer, handled end-to-end." },
];

const steps = [
  { n: "01", title: "Tell us about your car", body: "Brand, year, condition and kilometers — takes under a minute." },
  { n: "02", title: "Get an instant estimate", body: "See a fair market price range immediately, no waiting." },
  { n: "03", title: "Free doorstep inspection", body: "We come to you, confirm the exact price and pay on the spot." },
];

export default function SellPage() {
  return (
    <>
      <PageHeader
        kicker="Sell your car"
        title="Sell your car in 60 minutes."
        subtitle="An instant online valuation, a free doorstep inspection and money in your account the same day — the CarsVilla way."
      />

      <section className="container-x py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* left: value props + how it works */}
          <div>
            <Reveal>
              <div className="grid grid-cols-2 gap-4">
                {perks.map((p) => (
                  <div key={p.title} className="rounded-[var(--radius-xl)] border border-line bg-paper p-5 shadow-soft">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-wine/8 text-wine">
                      <p.icon size={20} strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-4 font-display text-lg text-ink">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted">{p.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120} className="mt-10">
              <h2 className="text-2xl">How it works</h2>
              <ol className="mt-5 space-y-5">
                {steps.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="font-display text-2xl text-wine/40">{s.n}</span>
                    <div>
                      <h3 className="font-display text-lg text-ink">{s.title}</h3>
                      <p className="mt-0.5 text-sm text-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          {/* right: the valuation wizard */}
          <Reveal delay={80} className="lg:sticky lg:top-28 lg:self-start">
            <SellFlow />
          </Reveal>
        </div>
      </section>
    </>
  );
}
