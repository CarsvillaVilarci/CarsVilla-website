import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SellFlow } from "@/components/sell/SellFlow";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sell Your Car — Free Instant Valuation & Best Price",
  description:
    "Sell your car online in minutes. Get a free instant valuation, free doorstep evaluation and same-day payment. Best price for used cars in India, guaranteed.",
  alternates: { canonical: "/sell" },
};

const faqs = [
  { q: "How is my car's price calculated?", a: "We value your car against thousands of live market transactions, factoring in brand, model, year, kilometres, ownership and condition." },
  { q: "Is the doorstep evaluation free?", a: "Yes, our evaluation and car pickup are completely free with no hidden charges." },
  { q: "How soon do I get paid?", a: "Once you accept the final price, payment is transferred to your bank account the same day." },
];

export default function SellPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Sell Car", url: "/sell" }])} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHeader
        eyebrow="Sell your car"
        title="Get the best price for your car in minutes"
        subtitle="Free instant valuation, free doorstep evaluation, and same-day payment. No haggling, no hassle."
      />
      <div className="container-x mx-auto max-w-7xl py-14">
        <SellFlow />
      </div>
    </>
  );
}
