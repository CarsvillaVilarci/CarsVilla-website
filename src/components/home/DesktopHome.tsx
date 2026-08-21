import { Hero } from "@/components/home/Hero";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { PremiumPanels } from "@/components/home/PremiumPanels";
import { BuyShowcase } from "@/components/home/BuyShowcase";
import { RecentlyBought } from "@/components/home/RecentlyBought";
import { WhyCarsVilla } from "@/components/home/WhyCarsVilla";
import { EnquiryBox } from "@/components/home/EnquiryBox";
import type { HomeData } from "@/components/home/HomeShell";

/** Full desktop home — only loaded on large screens (see HomeShell). */
export default function DesktopHome({ featured, brands, acquisitions }: HomeData) {
  return (
    <>
      <Hero />
      <BrandMarquee brands={brands} />
      <PremiumPanels />
      <BuyShowcase cars={featured} />
      <RecentlyBought items={acquisitions} />
      <WhyCarsVilla />
      <EnquiryBox />
    </>
  );
}
