import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, BadgeCheck, Calendar, Fuel, Gauge, MapPin, Settings2,
  Users, Palette, Car as CarIcon, ShieldCheck, Check,
} from "lucide-react";
import { cars, getCar } from "@/lib/cars";
import { formatINR, formatINRFull } from "@/lib/utils";
import { carJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { CarThumb } from "@/components/CarThumb";
import { CarCard } from "@/components/CarCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return cars.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) return { title: "Car not found" };
  const title = `${car.year} ${car.make} ${car.model} ${car.variant}`;
  return {
    title: `${title} — ${formatINR(car.price)}`,
    description: `Buy a certified ${title} in ${car.city}. ${(car.km / 1000).toFixed(1)}k km, ${car.fuel}, ${car.transmission}, ${car.owners} owner. 200-point inspected with warranty.`,
    alternates: { canonical: `/buy/${car.slug}` },
  };
}

export default async function CarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) notFound();

  const specs = [
    { Icon: Calendar, label: "Year", value: car.year },
    { Icon: Gauge, label: "KM driven", value: `${car.km.toLocaleString("en-IN")} km` },
    { Icon: Fuel, label: "Fuel", value: car.fuel },
    { Icon: Settings2, label: "Transmission", value: car.transmission },
    { Icon: Users, label: "Ownership", value: `${car.owners} owner` },
    { Icon: Palette, label: "Colour", value: car.color },
    { Icon: CarIcon, label: "Body type", value: car.bodyType },
    { Icon: MapPin, label: "Location", value: car.city },
  ];

  const checklist = [
    "Engine & transmission verified", "No accident / flood history",
    "Odometer authenticity checked", "Full service records available",
    "RC & insurance validated", "Tyres & brakes inspected",
  ];

  const similar = cars.filter((c) => c.id !== car.id && c.bodyType === car.bodyType).slice(0, 3);
  const related = similar.length ? similar : cars.filter((c) => c.id !== car.id).slice(0, 3);

  return (
    <>
      <JsonLd data={carJsonLd(car)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Buy Cars", url: "/buy" },
          { name: `${car.make} ${car.model}`, url: `/buy/${car.slug}` },
        ])}
      />

      <div className="container-x mx-auto max-w-7xl pt-28 md:pt-32">
        <Link
          href="/buy"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-paper"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all cars
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left: visual + specs */}
          <div>
            <CarThumb car={car} className="aspect-[16/10]" rounded="rounded-[2rem]" />

            <div className="mt-4 grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <CarThumb key={i} car={car} className="aspect-[4/3] opacity-70" rounded="rounded-xl" />
              ))}
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl text-paper">Car overview</h2>
              <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-4">
                {specs.map((s) => (
                  <div key={s.label} className="bg-ink p-5">
                    <s.Icon className="h-5 w-5 text-brand" />
                    <p className="mt-3 text-xs uppercase tracking-wider text-muted">{s.label}</p>
                    <p className="mt-1 font-semibold text-paper">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-line bg-surface/50 p-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-sky" />
                <h2 className="font-display text-2xl text-paper">200-point certified</h2>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {checklist.map((c) => (
                  <div key={c} className="flex items-center gap-3 text-paper/85">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: price card */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-[2rem] border border-line bg-surface p-8">
              {car.certified && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky/15 px-3 py-1 text-sm font-semibold text-sky">
                  <BadgeCheck className="h-4 w-4" /> Certified
                </span>
              )}
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-muted">{car.make}</p>
              <h1 className="mt-1 font-display text-3xl leading-tight text-paper">
                {car.model} <span className="text-muted">{car.year}</span>
              </h1>
              <p className="mt-1 text-muted">{car.variant}</p>

              <div className="mt-6 border-t border-line pt-6">
                <p className="font-display text-4xl text-paper">{formatINRFull(car.price)}</p>
                <p className="mt-1 text-sm text-muted">
                  or EMI from{" "}
                  <span className="font-semibold text-paper">
                    ₹{car.emi.toLocaleString("en-IN")}/mo
                  </span>
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Button href="/contact" size="lg">Book a test drive</Button>
                <Button href="/lookup" variant="outline" size="lg">
                  Check RC & history
                </Button>
              </div>

              <p className="mt-5 text-center text-xs text-muted">
                Free doorstep test drive · 7-day money-back · Up to 1-yr warranty
              </p>
            </div>
          </div>
        </div>

        {/* Related */}
        <section className="mt-24">
          <h2 className="font-display text-3xl text-paper">Similar cars you may like</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
