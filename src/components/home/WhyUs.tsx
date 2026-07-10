import { BadgeCheck, Banknote, RefreshCw, ScanLine, ShieldCheck, Truck } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const items = [
  { Icon: ScanLine, title: "200-point inspection", desc: "Every car passes a rigorous mechanical, electrical & structural check before listing." },
  { Icon: ShieldCheck, title: "RC-verified history", desc: "Ownership, accident & insurance records validated against government RTO data." },
  { Icon: Banknote, title: "Instant payment", desc: "Sell and get paid the same day, straight to your bank — no waiting, no haggling." },
  { Icon: Truck, title: "Doorstep everything", desc: "Free home evaluation for sellers and doorstep test drives for buyers." },
  { Icon: RefreshCw, title: "7-day money-back", desc: "Changed your mind? Return within 7 days for a full, no-questions refund." },
  { Icon: BadgeCheck, title: "Up to 1-year warranty", desc: "Drive worry-free with comprehensive warranty on engine & transmission." },
];

export function WhyUs() {
  return (
    <section className="relative border-y border-line bg-ink-2/50 py-24">
      <div className="container-x mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Why CarsVilla"
          title="Built on trust, engineered for peace of mind"
          subtitle="We remove every risk from buying and selling used cars — so you only deal with the good part."
          align="center"
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={0.04 * i}>
              <div className="group h-full bg-ink p-8 transition-colors duration-500 hover:bg-surface">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-surface text-brand transition-colors group-hover:border-brand">
                  <it.Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-xl text-paper">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
