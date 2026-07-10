import { ArrowRight } from "lucide-react";
import { cars } from "@/lib/cars";
import { CarCard } from "@/components/CarCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function Featured() {
  const featured = cars.filter((c) => c.featured).slice(0, 6);
  return (
    <section className="container-x mx-auto max-w-7xl py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="Handpicked"
          title={<>Certified cars ready<br className="hidden sm:block" /> to drive home</>}
        />
        <Reveal delay={0.1}>
          <Button href="/buy" variant="outline">
            View all cars <ArrowRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((car, i) => (
          <Reveal key={car.id} delay={0.05 * i}>
            <CarCard car={car} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
