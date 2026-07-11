import type { Metadata } from "next";
import { Zap } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { RcCheck } from "@/components/services/RcCheck";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services & Vehicle Tools",
  description:
    "RC / vehicle check, challan lookup, instant valuation, RC transfer, insurance, financing and more — all of CarsVilla's car services and API tools in one place.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        kicker="Services & vehicle tools"
        title="Everything your car needs, in one place."
        subtitle="From an instant RC check to insurance, financing and doorstep RC transfer — the full CarsVilla toolkit, several powered by live APIs."
      />

      {/* Flagship: RC check tool */}
      <section className="container-x py-14">
        <Reveal>
          <RcCheck />
        </Reveal>
      </section>

      {/* All services */}
      <section className="container-x pb-16">
        <Reveal className="mb-9">
          <p className="kicker">All services</p>
          <h2 className="mt-3 text-[clamp(1.9rem,3vw,2.8rem)]">Pick what you need</h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal
              key={s.slug}
              delay={i * 60}
              className="group flex flex-col rounded-[var(--radius-xl)] border border-line bg-paper p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxe"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-wine/8 text-wine">
                  <s.icon size={22} strokeWidth={1.6} />
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold ${
                    s.api ? "bg-wine text-cream" : "border border-line text-muted"
                  }`}
                >
                  {s.api && <Zap size={11} />}
                  {s.badge}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl text-ink">{s.name}</h3>
              <p className="mt-0.5 text-sm font-medium text-wine-soft">{s.tagline}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.description}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
