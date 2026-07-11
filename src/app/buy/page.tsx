import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { BuyExplorer } from "@/components/buy/BuyExplorer";

export const metadata: Metadata = {
  title: "Buy Used Cars in Tamluk",
  description:
    "Browse certified pre-owned cars at CarsVilla, Tamluk. Filter by brand, body type, fuel, transmission and budget — every car inspected and best-price guaranteed.",
};

export default function BuyPage() {
  return (
    <>
      <PageHeader
        kicker="Buy a car"
        title="Certified used cars, ready to drive."
        subtitle="Every car clears a 200-point inspection and comes with a 5-day money-back promise. Filter to find yours."
      />
      {/* useSearchParams (brand / q deep-links) must run on the client under
          Suspense so the page still works with static export. */}
      <Suspense
        fallback={<div className="container-x py-20 text-center text-muted">Loading inventory…</div>}
      >
        <BuyExplorer />
      </Suspense>
    </>
  );
}
