import Link from "next/link";
import { ArrowRight, BadgeIndianRupee, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function PremiumPanels() {
  return (
    <section className="container-x py-20">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sell — wine, dark */}
        <Reveal className="group relative overflow-hidden rounded-[var(--radius-2xl)] bg-wine p-9 text-cream shadow-luxe md:p-11">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/5 blur-2xl" />
          <BadgeIndianRupee size={30} className="text-gold" strokeWidth={1.5} />
          <h3 className="mt-6 text-[clamp(1.7rem,2.4vw,2.4rem)] text-cream">
            Sell your car in 60 minutes
          </h3>
          <p className="mt-3 max-w-sm text-cream/70">
            A guaranteed price, free doorstep evaluation and the money in your
            account before we drive away. No haggling, no waiting.
          </p>
          <Link
            href="/sell"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-wine transition-transform group-hover:translate-x-1"
          >
            Get my price
            <ArrowRight size={16} />
          </Link>
        </Reveal>

        {/* Buy — paper, light */}
        <Reveal
          delay={100}
          className="group relative overflow-hidden rounded-[var(--radius-2xl)] border border-line bg-paper p-9 shadow-soft md:p-11"
        >
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/10 blur-2xl" />
          <ShieldCheck size={30} className="text-wine" strokeWidth={1.5} />
          <h3 className="mt-6 text-[clamp(1.7rem,2.4vw,2.4rem)]">
            Buy with total confidence
          </h3>
          <p className="mt-3 max-w-sm text-muted">
            Every car clears a 200-point inspection, comes with a 5-day
            money-back promise and free RC transfer handled end-to-end.
          </p>
          <Link
            href="/buy"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-wine px-6 py-3 text-sm font-semibold text-cream transition-transform group-hover:translate-x-1 hover:bg-wine-hot"
          >
            Explore inventory
            <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
