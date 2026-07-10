import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact CarsVilla — We're Here to Help",
  description:
    "Get in touch with CarsVilla for buying, selling, RC transfer, insurance or financing. Call, email or drop us a message — we respond within hours.",
  alternates: { canonical: "/contact" },
};

const info = [
  { Icon: Phone, label: "Call us", value: site.phone, href: `tel:${site.phone}` },
  { Icon: Mail, label: "Email us", value: site.email, href: `mailto:${site.email}` },
  { Icon: MapPin, label: "Visit us", value: `${site.address.street}, ${site.address.city}` },
  { Icon: Clock, label: "Hours", value: "Mon–Sun · 9am to 9pm" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }])} />
      <PageHeader
        eyebrow="Contact"
        title="Let's talk cars"
        subtitle="Whether you're buying, selling or just have a question — our team is one message away."
      />

      <section className="container-x mx-auto max-w-7xl py-14">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col gap-4">
            {info.map((it) => {
              const inner = (
                <div className="flex items-center gap-4 rounded-3xl border border-line bg-surface/60 p-6 transition-colors hover:border-brand/40">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-line bg-ink text-brand">
                    <it.Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted">{it.label}</p>
                    <p className="mt-0.5 font-semibold text-paper">{it.value}</p>
                  </div>
                </div>
              );
              return it.href ? (
                <a key={it.label} href={it.href}>{inner}</a>
              ) : (
                <div key={it.label}>{inner}</div>
              );
            })}
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
