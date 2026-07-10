import { Hero } from "@/components/home/Hero";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { TwoPaths } from "@/components/home/TwoPaths";
import { Featured } from "@/components/home/Featured";
import { WhyUs } from "@/components/home/WhyUs";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { CtaBand } from "@/components/home/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";

const faqs = [
  {
    q: "How do I sell my car on CarsVilla?",
    a: "Enter your car details for a free instant valuation, book a doorstep evaluation, and get paid the same day if you accept the price.",
  },
  {
    q: "Are CarsVilla used cars certified?",
    a: "Yes. Every car passes a 200-point inspection, is RC-verified against RTO records, and comes with up to a 1-year warranty and 7-day money-back guarantee.",
  },
  {
    q: "Does CarsVilla offer car loans and RC transfer?",
    a: "Yes. We offer pre-approved used-car financing, insurance, RC transfer, servicing and assured buyback — all in one place.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <Hero />
      <BrandMarquee />
      <TwoPaths />
      <Featured />
      <WhyUs />
      <ServicesTeaser />
      <CtaBand />
    </>
  );
}
