import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function ServicesTeaser() {
  return (
    <section className="container-x mx-auto max-w-7xl py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="Beyond buying & selling"
          title="One garage for everything your car needs"
        />
        <Reveal delay={0.1}>
          <Button href="/services" variant="outline">
            Explore services <ArrowRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={0.04 * i}>
            <Link
              href="/services"
              className="group flex h-full flex-col gap-4 rounded-3xl border border-line bg-surface/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-sky/40"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-ink text-sky">
                  <s.Icon className="h-6 w-6" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                  {s.price}
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl text-paper">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
