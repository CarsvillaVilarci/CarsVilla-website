import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredCars } from "@/lib/demo";
import { CarCard } from "@/components/ui/CarCard";
import { Reveal } from "@/components/ui/Reveal";

export function BuyShowcase() {
  return (
    <section className="container-x py-12">
      <Reveal className="mb-9 flex items-end justify-between gap-6">
        <div>
          <p className="kicker">Ready to drive home</p>
          <h2 className="mt-3 text-[clamp(2rem,3.2vw,3rem)]">Handpicked cars to buy</h2>
        </div>
        <Link
          href="/buy"
          className="group hidden shrink-0 items-center gap-2 text-sm font-semibold text-wine sm:inline-flex"
        >
          View all inventory
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredCars.map((car, i) => (
          <Reveal key={car.slug} delay={i * 70}>
            <CarCard car={car} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
