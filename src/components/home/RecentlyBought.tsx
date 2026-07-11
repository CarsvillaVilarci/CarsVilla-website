import { CheckCircle2 } from "lucide-react";
import { recentlyBought, formatINR } from "@/lib/demo";
import { Reveal } from "@/components/ui/Reveal";

export function RecentlyBought() {
  return (
    <section className="my-12 bg-cream-2/70 py-16">
      <div className="container-x">
        <Reveal className="mb-9 max-w-2xl">
          <p className="kicker">Bought this week</p>
          <h2 className="mt-3 text-[clamp(2rem,3.2vw,3rem)]">
            Cars we recently paid top price for
          </h2>
          <p className="mt-3 text-muted">
            Real acquisitions from sellers across Tamluk and Purba Medinipur —
            the price CarsVilla paid, in cash, on the spot.
          </p>
        </Reveal>

        <div className="-mx-2 flex snap-x gap-4 overflow-x-auto px-2 pb-4">
          {recentlyBought.map((car, i) => (
            <Reveal
              key={`${car.model}-${i}`}
              delay={i * 60}
              className="w-[280px] shrink-0 snap-start"
            >
              <article className="flex h-full flex-col rounded-[var(--radius-xl)] border border-line bg-paper p-5 shadow-soft">
                <div className="flex items-center justify-between">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl font-display text-lg text-cream"
                    style={{ background: car.tint }}
                  >
                    {car.make[0]}
                  </span>
                  <span className="text-xs font-medium text-muted">
                    {car.daysAgo}d ago
                  </span>
                </div>
                <h4 className="mt-4 font-display text-xl text-ink">
                  {car.make} {car.model}
                </h4>
                <p className="text-sm text-muted">
                  {car.year} · {car.city}
                </p>
                <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
                  <div>
                    <p className="inline-flex items-center gap-1 text-[0.7rem] uppercase tracking-wider text-muted">
                      <CheckCircle2 size={12} className="text-emerald-600" /> We paid
                    </p>
                    <p className="font-display text-2xl text-wine">{formatINR(car.paid)}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
