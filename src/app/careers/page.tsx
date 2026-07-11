import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join CarsVilla in Tamluk — help build the most trusted way to buy and sell used cars.",
};

const roles = [
  { title: "Car Inspection Specialist", type: "Full-time", loc: "Tamluk" },
  { title: "Sales & Buying Advisor", type: "Full-time", loc: "Tamluk / Haldia" },
  { title: "Dealer Partnerships Lead", type: "Full-time", loc: "Kolkata" },
  { title: "Frontend Engineer", type: "Full-time", loc: "Remote / Kolkata" },
  { title: "Doorstep Operations Executive", type: "Full-time", loc: "Purba Medinipur" },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        kicker="Careers"
        title="Build the future of used cars."
        subtitle="We're a small, ambitious team in Tamluk making car buying and selling honest, fast and premium. Come build it with us."
      />
      <section className="container-x py-12">
        <Reveal className="mb-8">
          <h2 className="text-2xl">Open roles</h2>
        </Reveal>
        <div className="mx-auto grid gap-3">
          {roles.map((r, i) => (
            <Reveal
              key={r.title}
              delay={i * 60}
              className="group flex items-center justify-between gap-4 rounded-[var(--radius-xl)] border border-line bg-paper p-5 shadow-soft transition-colors hover:border-wine/40"
            >
              <div>
                <h3 className="font-display text-lg text-ink">{r.title}</h3>
                <p className="mt-1 flex items-center gap-3 text-xs text-muted">
                  <span>{r.type}</span>
                  <span className="inline-flex items-center gap-1"><MapPin size={12} /> {r.loc}</span>
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-wine px-4 py-2.5 text-sm font-semibold text-cream transition-transform group-hover:translate-x-0.5 hover:bg-wine-hot"
              >
                Apply <ArrowUpRight size={15} />
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted">
          Don&apos;t see your role? Write to us anyway via the{" "}
          <Link href="/contact" className="font-semibold text-wine hover:underline">contact page</Link>.
        </p>
      </section>
    </>
  );
}
