import Link from "next/link";
import { ArrowUpRight, IndianRupee, KeyRound } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const paths = [
  {
    href: "/sell",
    tag: "For sellers",
    Icon: IndianRupee,
    title: "Sell your car",
    lines: ["Free instant valuation", "Doorstep evaluation", "Same-day payment"],
    accent: "from-brand/30",
    cta: "Get car price",
  },
  {
    href: "/buy",
    tag: "For buyers",
    Icon: KeyRound,
    title: "Buy a car",
    lines: ["200-point certified", "Up to 1-year warranty", "7-day money-back"],
    accent: "from-sky/25",
    cta: "Browse inventory",
  },
];

export function TwoPaths() {
  return (
    <section className="container-x mx-auto max-w-7xl py-12">
      <div className="grid gap-6 md:grid-cols-2">
        {paths.map((p, i) => (
          <Reveal key={p.href} delay={0.08 * i}>
            <Link
              href={p.href}
              className={`group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-[2rem] border border-line bg-surface p-8 transition-all duration-500 hover:-translate-y-1 hover:border-paper/30 md:p-10`}
            >
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${p.accent} to-transparent blur-2xl transition-opacity duration-500 group-hover:opacity-80`}
              />
              <div className="relative flex items-start justify-between">
                <div>
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                    {p.tag}
                  </span>
                  <h3 className="mt-3 font-display text-4xl text-paper md:text-5xl">
                    {p.title}
                  </h3>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-full border border-line text-paper transition-all duration-500 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>

              <div className="relative mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {p.lines.map((l) => (
                  <span key={l} className="inline-flex items-center gap-2 text-sm text-paper/80">
                    <p.Icon className="h-4 w-4 text-brand" /> {l}
                  </span>
                ))}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
