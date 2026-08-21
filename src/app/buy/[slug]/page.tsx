import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarCheck,
  ChevronRight,
  Fuel,
  Gauge,
  MapPin,
  Phone,
  Send,
  Settings2,
  ShieldCheck,
  Check,
} from "lucide-react";
import {
  similarCars,
  carSpecs,
  estimateEmi,
  formatINR,
  kmFormat,
} from "@/lib/cars";
import { getCarBySlug, getCars } from "@/lib/catalogue";
import { site } from "@/lib/site";
import { CarCard } from "@/components/ui/CarCard";

export async function generateStaticParams() {
  return (await getCars()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) return { title: "Car not found" };
  const title = `${car.year} ${car.make} ${car.model} ${car.variant}`;
  return {
    title,
    description: `Buy a ${title} in ${car.city} — ${formatINR(car.price)}, ${kmFormat(car.km)}, ${car.fuel}, ${car.transmission}. CarsVilla 200-point certified with a 5-day money-back promise.`,
  };
}

const inspection = [
  "Engine & transmission",
  "Suspension & brakes",
  "Electricals & AC",
  "Exterior & tyres",
  "Interior & upholstery",
  "Documents & RC",
];

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cars = await getCars();
  const car = cars.find((c) => c.slug === slug);
  if (!car) notFound();

  const specs = carSpecs(car);
  const emi = estimateEmi(car.price);
  const similar = similarCars(car, cars);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${car.make} ${car.model} ${car.variant}`,
    brand: { "@type": "Brand", name: car.make },
    model: car.model,
    vehicleModelDate: String(car.year),
    fuelType: car.fuel,
    vehicleTransmission: car.transmission,
    mileageFromOdometer: { "@type": "QuantitativeValue", value: car.km, unitCode: "KMT" },
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "AutoDealer", name: site.name },
    },
  };

  const chips = [
    { icon: Gauge, label: kmFormat(car.km) },
    { icon: Fuel, label: car.fuel },
    { icon: Settings2, label: car.transmission },
    { icon: MapPin, label: car.city },
  ];

  return (
    <div className="container-x py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted">
        <Link href="/" className="hover:text-wine">Home</Link>
        <ChevronRight size={14} />
        <Link href="/buy" className="hover:text-wine">Buy</Link>
        <ChevronRight size={14} />
        <span className="text-ink">{car.model}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Gallery */}
        <div>
          <div
            className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-2xl)] border border-line shadow-luxe"
            style={{ background: `radial-gradient(120% 120% at 30% 0%, ${car.tint}, #14100f)` }}
          >
            <span className="absolute left-5 top-5 rounded-full bg-black/25 px-3 py-1 text-xs font-medium text-cream backdrop-blur">
              {car.year}
            </span>
            <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold text-wine">
              <ShieldCheck size={13} /> Certified
            </span>
            <span className="absolute bottom-5 left-5 font-display text-4xl text-cream/95">{car.make}</span>
          </div>
          {/* thumbnail strip (branded, no external photos) */}
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-xl border border-line"
                style={{ background: `radial-gradient(120% 120% at ${20 + i * 20}% 0%, ${car.tint}, #14100f)` }}
              />
            ))}
          </div>
        </div>

        {/* Summary + CTA (sticky on desktop) */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[var(--radius-2xl)] border border-line bg-paper p-6 shadow-soft md:p-7">
            <h1 className="font-display text-[1.9rem] leading-tight text-ink">
              {car.model} <span className="text-muted">{car.variant}</span>
            </h1>
            <p className="mt-1 text-sm text-muted">
              {car.year} · {car.make} · {car.city}
            </p>

            <div className="mt-5 border-y border-line py-4">
              <p className="font-display text-3xl text-wine">{formatINR(car.price)}</p>
              <p className="mt-1 text-sm text-muted">
                or from <span className="font-semibold text-ink">{formatINR(emi)}/mo</span> · EMI (60 mo)
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {chips.map((c) => (
                <span key={c.label} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-ink">
                  <c.icon size={13} className="text-wine" /> {c.label}
                </span>
              ))}
            </div>

            <div className="mt-6 space-y-2.5">
              <Link
                href={`/contact?car=${car.slug}`}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-wine px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-wine-hot"
              >
                <CalendarCheck size={16} /> Book a test drive
              </Link>
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href={`/contact?car=${car.slug}`}
                  className="flex items-center justify-center gap-2 rounded-full border border-line px-4 py-3 text-sm font-semibold text-ink hover:border-wine/40"
                >
                  <Send size={15} /> Enquire
                </Link>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-2 rounded-full border border-line px-4 py-3 text-sm font-semibold text-ink hover:border-wine/40"
                >
                  <Phone size={15} /> Call
                </a>
              </div>
            </div>

            <ul className="mt-6 grid gap-2 text-sm text-muted">
              {["200-point certified", "5-day money-back promise", "Free RC transfer"].map((a) => (
                <li key={a} className="flex items-center gap-2">
                  <Check size={15} className="text-emerald-600" /> {a}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Overview */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl">Overview</h2>
        <p className="mt-3 leading-relaxed text-muted">
          This {car.year} {car.make} {car.model} {car.variant} has covered {kmFormat(car.km)} and runs
          on {car.fuel.toLowerCase()} with a {car.transmission.toLowerCase()} gearbox. Sold and certified
          by {site.name} in {car.city} — inspected across 200 checkpoints, and backed by a 5-day
          money-back promise with free RC transfer handled at your doorstep.
        </p>
      </section>

      {/* Specifications */}
      <section className="mt-12">
        <h2 className="text-2xl">Specifications</h2>
        <dl className="mt-5 grid gap-x-10 rounded-[var(--radius-xl)] border border-line bg-paper p-6 sm:grid-cols-2 md:p-8">
          {specs.map((s) => (
            <div key={s.label} className="flex items-center justify-between gap-4 border-b border-line py-3 last:border-0 sm:[&:nth-last-child(2)]:border-0">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="text-right text-sm font-medium text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Inspection */}
      <section className="mt-12">
        <h2 className="text-2xl">200-point inspection</h2>
        <p className="mt-2 text-sm text-muted">Every area checked and cleared by a CarsVilla certified inspector.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {inspection.map((area) => (
            <div key={area} className="flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-50 text-emerald-700">
                <Check size={16} />
              </span>
              <span className="text-sm font-medium text-ink">{area}</span>
              <span className="ml-auto text-xs font-semibold text-emerald-700">Passed</span>
            </div>
          ))}
        </div>
      </section>

      {/* Similar cars */}
      {similar.length > 0 && (
        <section className="mt-14">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl">Similar cars</h2>
            <Link href="/buy" className="text-sm font-semibold text-wine hover:underline">
              View all
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((c) => (
              <CarCard key={c.slug} car={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
