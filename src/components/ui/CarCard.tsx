import Link from "next/link";
import { ArrowUpRight, Fuel, Gauge, MapPin, Settings2 } from "lucide-react";
import { formatINR, kmFormat, type Car } from "@/lib/demo";

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      href={`/buy/${car.slug}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-line bg-paper shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe"
    >
      {/* Branded gradient thumbnail — no external car photos needed */}
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{
          background: `radial-gradient(120% 120% at 30% 0%, ${car.tint}, #14100f)`,
        }}
      >
        <span className="absolute left-4 top-4 rounded-full bg-black/25 px-3 py-1 text-xs font-medium text-cream backdrop-blur">
          {car.year}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold text-wine">
          {car.transmission === "Automatic" ? "AT" : "MT"}
        </span>
        <span className="absolute bottom-4 left-4 font-display text-2xl text-cream/95">
          {car.make}
        </span>
        <span className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h4 className="font-display text-xl text-ink">
          {car.model} <span className="text-muted">{car.variant}</span>
        </h4>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5"><Gauge size={13} /> {kmFormat(car.km)}</span>
          <span className="inline-flex items-center gap-1.5"><Fuel size={13} /> {car.fuel}</span>
          <span className="inline-flex items-center gap-1.5"><Settings2 size={13} /> {car.transmission}</span>
          <span className="inline-flex items-center gap-1.5"><MapPin size={13} /> {car.city}</span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
          <div>
            <p className="text-[0.7rem] uppercase tracking-wider text-muted">CarsVilla price</p>
            <p className="font-display text-2xl text-wine">{formatINR(car.price)}</p>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-wine transition-colors group-hover:bg-wine group-hover:text-cream">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
