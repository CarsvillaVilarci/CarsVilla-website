import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { AuctionBoard } from "@/components/auction/AuctionBoard";

export const metadata: Metadata = {
  title: "Live Car Auction",
  description:
    "List your car for bidding on CarsVilla. Verified dealers and CarsVilla bid live on your car — the highest bid wins. Watch every auction in real time.",
};

export default function AuctionPage() {
  return (
    <>
      <PageHeader
        kicker="Auction · live bidding"
        title="List your car. Let dealers bid."
        subtitle="Customers list their car for auction; verified dealers — and CarsVilla — bid on it live. The highest bid wins. Anyone can watch, bids update in real time."
      />
      <AuctionBoard />
    </>
  );
}
