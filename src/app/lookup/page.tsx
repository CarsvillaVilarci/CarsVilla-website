import type { Metadata } from "next";
import { FileSearch, History, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { LookupTool } from "@/components/lookup/LookupTool";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "RC Check — Verify Any Car by Number Plate",
  description:
    "Instantly check any car's RC details, ownership history, insurance status and pending challans by number plate. Free vehicle verification by CarsVilla.",
  alternates: { canonical: "/lookup" },
};

const perks = [
  { Icon: FileSearch, t: "Full RC details", d: "Make, model, fuel, registration year & RTO." },
  { Icon: History, t: "Ownership & challans", d: "Number of owners, insurance status and pending fines." },
  { Icon: ShieldCheck, t: "Theft & blacklist check", d: "Confirm the car isn't reported stolen or blacklisted." },
];

export default function LookupPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "RC Check", url: "/lookup" }])} />
      <PageHeader
        eyebrow="RC Check"
        title="Verify any car in seconds"
        subtitle="Enter a number plate to pull RC details, ownership history, insurance and challans — before you buy or sell."
      />

      <section className="container-x mx-auto max-w-7xl py-14">
        <LookupTool />

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {perks.map((p) => (
            <div key={p.t} className="rounded-3xl border border-line bg-surface/50 p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-ink text-sky">
                <p.Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl text-paper">{p.t}</h3>
              <p className="mt-2 text-sm text-muted">{p.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
