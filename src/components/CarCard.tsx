import Link from "next/link";
import { BadgeCheck, Fuel, Gauge, MapPin, Settings2 } from "lucide-react";
import { CarThumb } from "./CarThumb";
import { formatINR } from "@/lib/utils";
import type { Car } from "@/lib/cars";

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      href={`/buy/${car.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-[1.6rem] border border-line bg-surface/60 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-brand/50 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
    >
      <div className="relative p-2">
        <CarThumb car={car} className="aspect-[16/10]" />
        {car.certified && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-sky backdrop-blur">
            <BadgeCheck className="h-3.5 w-3.5" /> Certified
          </span>
        )}
        <span className="absolute right-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
          {car.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 pt-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">{car.make}</p>
          <h3 className="mt-1 font-display text-xl leading-tight text-paper">
            {car.model}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-sm text-muted">{car.variant}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-paper/80">
          <span className="inline-flex items-center gap-1.5">
            <Gauge className="h-4 w-4 text-muted" /> {(car.km / 1000).toFixed(1)}k km
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Fuel className="h-4 w-4 text-muted" /> {car.fuel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Settings2 className="h-4 w-4 text-muted" /> {car.transmission}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-muted" /> {car.city}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-line pt-4">
          <div>
            <p className="font-display text-2xl text-paper">{formatINR(car.price)}</p>
            <p className="text-xs text-muted">EMI ₹{car.emi.toLocaleString("en-IN")}/mo</p>
          </div>
          <span className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-paper transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
            View
          </span>
        </div>
      </div>
    </Link>
  );
}
