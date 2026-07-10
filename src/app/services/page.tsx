import type { Metadata } from "next";
import { Check } from "lucide-react";
import { services } from "@/lib/services";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Car Services — RC Transfer, Insurance, Financing & More",
  description:
    "Everything your car needs in one place: RC transfer, car insurance, used-car loans, 200-point inspection, servicing & detailing, and assured buyback.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Services", url: "/services" }])} />
      <PageHeader
        eyebrow="Services"
        title="One garage for everything your car needs"
        subtitle="From paperwork to protection, we handle the parts of car ownership nobody enjoys — so you can just drive."
      />

      <section className="container-x mx-auto max-w-7xl py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={0.05 * i}>
              <div className="group flex h-full flex-col rounded-[1.8rem] border border-line bg-surface/60 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/40">
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-ink text-brand transition-colors group-hover:border-brand">
                    <s.Icon className="h-7 w-7" />
                  </span>
                  <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-sky">
                    {s.price}
                  </span>
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  {s.tagline}
                </p>
                <h2 className="mt-1 font-display text-2xl text-paper">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.description}</p>

                <ul className="mt-6 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm text-paper/85">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                        <Check className="h-3 w-3" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-2">
                  <Button href="/contact" variant="outline" size="sm" className="w-full">
                    Book {s.title}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
