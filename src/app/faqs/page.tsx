import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers to common questions about buying, selling and auctioning used cars with CarsVilla — inspection, payment, RC transfer, financing and more.",
};

const faqs = [
  { q: "How does buying a car from CarsVilla work?", a: "Browse the catalogue, book a free test drive, and buy with a 5-day money-back promise. Every car clears a 200-point inspection and comes with free RC transfer handled at your doorstep." },
  { q: "How do I sell my car?", a: "Use the Sell flow to get an instant valuation range, then book a free doorstep inspection. We confirm the exact price and pay you on the spot — usually within the hour." },
  { q: "What is the live Auction?", a: "You list your car for bidding and verified dealers — plus CarsVilla — bid on it live. The highest bid wins. Anyone can watch the bids update in real time; dealers just log in to bid." },
  { q: "Is the RC / vehicle check accurate?", a: "The Services page lets you look up registration, ownership, insurance and RTO details. In production this is powered by the official VAHAN/RTO data." },
  { q: "How is the car price decided?", a: "Prices reflect model, year, kilometers, condition, ownership and live market data. For selling, we guarantee to beat any genuine written offer." },
  { q: "Do you offer financing and insurance?", a: "Yes — pre-approved used-car loans up to 90% from leading banks/NBFCs, plus insurance comparison and renewal, all handled through CarsVilla." },
  { q: "Which areas do you serve?", a: "Tamluk and across Purba Medinipur — Haldia, Mecheda, Panskura, Contai — and greater Kolkata." },
  { q: "Is my payment safe?", a: "Payments are made through secure bank transfer. For sellers, money reaches your account before we take the car." },
];

export default function FaqsPage() {
  return (
    <>
      <PageHeader
        kicker="Help centre"
        title="Frequently asked questions"
        subtitle="Everything you need to know about buying, selling and bidding with CarsVilla."
      />
      <section className="container-x py-12">
        <div className="mx-auto max-w-3xl divide-y divide-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus size={18} className="shrink-0 text-wine transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="mt-3 max-w-2xl text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
