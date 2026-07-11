import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EnquiryBox } from "@/components/home/EnquiryBox";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with CarsVilla, Tamluk. Call, email or send an enquiry to buy, sell or service your car — a real advisor responds within the hour.",
};

const details = [
  { icon: Phone, label: "Call us", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: "Showroom", value: "Nimtouri, Tamluk, Purba Medinipur, WB 721636" },
  { icon: Clock, label: "Open", value: "Mon–Sun · 9:30 AM – 8:00 PM" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        kicker="Contact us"
        title="Talk to a real CarsVilla advisor."
        subtitle="Buying, selling or servicing — reach out any way you like. No call centres, no bots."
      />

      <section className="container-x py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((d, i) => {
            const inner = (
              <>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-wine/8 text-wine">
                  <d.icon size={20} strokeWidth={1.6} />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">{d.label}</p>
                <p className="mt-1 font-medium text-ink">{d.value}</p>
              </>
            );
            return (
              <Reveal
                key={d.label}
                delay={i * 70}
                className="rounded-[var(--radius-xl)] border border-line bg-paper p-6 shadow-soft"
              >
                {d.href ? (
                  <a href={d.href} className="block transition-colors hover:text-wine">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      <EnquiryBox />
    </>
  );
}
