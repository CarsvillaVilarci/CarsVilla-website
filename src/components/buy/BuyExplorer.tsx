"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { Car, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import {
  bodyTypes,
  fuels,
  transmissions,
  makeSlug,
  priceBoundsOf,
  formatINR,
  type Car as CarType,
} from "@/lib/cars";
import { CarCard } from "@/components/ui/CarCard";

const SORTS = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "year-desc", label: "Year: newest first" },
  { value: "km-asc", label: "Km: lowest first" },
];

/** `cars` is the live Supabase inventory, fetched at build time by /buy. */
export function BuyExplorer({ cars }: { cars: CarType[] }) {
  const params = useSearchParams();
  const makes = useMemo(() => Array.from(new Set(cars.map((c) => c.make))), [cars]);
  const priceBounds = useMemo(() => priceBoundsOf(cars), [cars]);
  const [q, setQ] = useState(params.get("q") ?? "");
  const [brand, setBrand] = useState(params.get("brand") ?? "all");
  const [body, setBody] = useState("all");
  const [fuel, setFuel] = useState("all");
  const [transmission, setTransmission] = useState("all");
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [sort, setSort] = useState("relevance");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const results = useMemo(() => {
    const list = cars.filter((c) => {
      if (q && !`${c.make} ${c.model} ${c.variant}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (brand !== "all" && makeSlug(c.make) !== brand) return false;
      if (body !== "all" && c.body !== body) return false;
      if (fuel !== "all" && c.fuel !== fuel) return false;
      if (transmission !== "all" && c.transmission !== transmission) return false;
      if (c.price > maxPrice) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "year-desc") sorted.sort((a, b) => b.year - a.year);
    else if (sort === "km-asc") sorted.sort((a, b) => a.km - b.km);
    return sorted;
  }, [cars, q, brand, body, fuel, transmission, maxPrice, sort]);

  const activeCount =
    (brand !== "all" ? 1 : 0) +
    (body !== "all" ? 1 : 0) +
    (fuel !== "all" ? 1 : 0) +
    (transmission !== "all" ? 1 : 0) +
    (maxPrice < priceBounds.max ? 1 : 0);

  const reset = () => {
    setBrand("all");
    setBody("all");
    setFuel("all");
    setTransmission("all");
    setMaxPrice(priceBounds.max);
    setQ("");
  };

  const filters = (
    <div className="space-y-7">
      <FilterGroup title="Brand">
        <Chips
          value={brand}
          onChange={setBrand}
          options={[{ label: "All", value: "all" }, ...makes.map((m) => ({ label: m, value: makeSlug(m) }))]}
        />
      </FilterGroup>
      <FilterGroup title="Body type">
        <Chips
          value={body}
          onChange={setBody}
          options={[{ label: "All", value: "all" }, ...bodyTypes.map((b) => ({ label: b, value: b }))]}
        />
      </FilterGroup>
      <FilterGroup title="Fuel">
        <Chips
          value={fuel}
          onChange={setFuel}
          options={[{ label: "All", value: "all" }, ...fuels.map((f) => ({ label: f, value: f }))]}
        />
      </FilterGroup>
      <FilterGroup title="Transmission">
        <Chips
          value={transmission}
          onChange={setTransmission}
          options={[{ label: "All", value: "all" }, ...transmissions.map((t) => ({ label: t, value: t }))]}
        />
      </FilterGroup>
      <FilterGroup title={`Budget · up to ${formatINR(maxPrice)}`}>
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          step={10000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(+e.target.value)}
          className="w-full accent-[var(--color-wine)]"
        />
        <div className="mt-1 flex justify-between text-xs text-muted">
          <span>{formatINR(priceBounds.min)}</span>
          <span>{formatINR(priceBounds.max)}</span>
        </div>
      </FilterGroup>
    </div>
  );

  return (
    <section className="container-x py-10">
      {/* control bar */}
      <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by make, model or variant…"
            className="h-12 w-full rounded-full border border-line bg-paper pl-11 pr-4 text-sm text-ink placeholder:text-muted outline-none focus:border-wine/40"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDrawerOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-3 text-sm font-semibold text-ink lg:hidden"
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeCount > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-wine px-1 text-xs text-cream">
                {activeCount}
              </span>
            )}
          </button>
          <label className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-12 cursor-pointer appearance-none rounded-full border border-line bg-paper pl-4 pr-9 text-sm font-medium text-ink outline-none focus:border-wine/40"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">▾</span>
          </label>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
        {/* desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-32">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl text-ink">Filters</h2>
              {activeCount > 0 && (
                <button onClick={reset} className="inline-flex items-center gap-1 text-xs font-semibold text-wine">
                  <RotateCcw size={13} /> Reset
                </button>
              )}
            </div>
            {filters}
          </div>
        </aside>

        {/* results */}
        <div>
          <p className="mb-5 text-sm text-muted">
            <span className="font-semibold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "car" : "cars"} available
          </p>

          {results.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((car) => (
                <CarCard key={car.slug} car={car} />
              ))}
            </div>
          ) : (
            <div className="grid place-items-center rounded-[var(--radius-2xl)] border border-dashed border-line py-20 text-center">
              <Car size={40} className="text-wine/40" />
              <p className="mt-4 font-display text-xl text-ink">No cars match those filters</p>
              <p className="mt-1 text-sm text-muted">Try widening your budget or clearing a filter.</p>
              <button
                onClick={reset}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-wine px-5 py-2.5 text-sm font-semibold text-cream hover:bg-wine-hot"
              >
                <RotateCcw size={15} /> Reset filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[var(--radius-2xl)] bg-cream p-6 pb-8 shadow-luxe">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-2xl text-ink">Filters</h2>
              <button onClick={() => setDrawerOpen(false)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink">
                <X size={18} />
              </button>
            </div>
            {filters}
            <div className="mt-7 flex gap-3">
              <button onClick={reset} className="flex-1 rounded-full border border-line py-3 text-sm font-semibold text-ink">
                Reset
              </button>
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex-[2] rounded-full bg-wine py-3 text-sm font-semibold text-cream"
              >
                Show {results.length} {results.length === 1 ? "car" : "cars"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">{title}</h3>
      {children}
    </div>
  );
}

function Chips({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
            value === o.value
              ? "border-wine bg-wine text-cream"
              : "border-line text-ink hover:border-wine/40"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
