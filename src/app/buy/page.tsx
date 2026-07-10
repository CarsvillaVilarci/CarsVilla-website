import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { BuyExplorer } from "@/components/buy/BuyExplorer";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Buy Certified Used Cars in India",
  description:
    "Browse 200-point certified used cars with warranty and 7-day money-back. Filter by brand, budget, fuel and body type. RC-verified, doorstep test drives.",
  alternates: { canonical: "/buy" },
};

export default function BuyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Buy Cars", url: "/buy" },
        ])}
      />
      <PageHeader
        eyebrow="Buy a car"
        title="Find your certified pre-owned car"
        subtitle="Every car is 200-point inspected, RC-verified and backed by warranty. Filter, compare, and book a doorstep test drive."
      />
      <Suspense fallback={null}>
        <BuyExplorer />
      </Suspense>
    </>
  );
}
