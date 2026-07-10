"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cars, makes, bodyTypes, fuels, type BodyType, type Fuel } from "@/lib/cars";
import { CarCard } from "@/components/CarCard";
import { formatINR, cn } from "@/lib/utils";

type Sort = "relevance" | "price-asc" | "price-desc" | "year-desc" | "km-asc";

const chipBase =
  "rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer";

export function BuyExplorer() {
  const initialBody = useSearchParams().get("body") ?? undefined;
  const [q, setQ] = useState("");
  const [make, setMake] = useState<string>("All");
  const [body, setBody] = useState<string>(
    bodyTypes.includes(initialBody as BodyType) ? (initialBody as string) : "All"
  );
  const [fuel, setFuel] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [sort, setSort] = useState<Sort>("relevance");
  const [openFilters, setOpenFilters] = useState(false);

  const results = useMemo(() => {
    let list = cars.filter((c) => {
      const matchQ =
        !q ||
        `${c.make} ${c.model} ${c.variant} ${c.city}`.toLowerCase().includes(q.toLowerCase());
      const matchMake = make === "All" || c.make === make;
      const matchBody = body === "All" || c.bodyType === body;
      const matchFuel = fuel === "All" || c.fuel === fuel;
      const matchPrice = c.price <= maxPrice;
      return matchQ && matchMake && matchBody && matchFuel && matchPrice;
    });

    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "year-desc": list = [...list].sort((a, b) => b.year - a.year); break;
      case "km-asc": list = [...list].sort((a, b) => a.km - b.km); break;
    }
    return list;
  }, [q, make, body, fuel, maxPrice, sort]);

  const reset = () => {
    setQ(""); setMake("All"); setBody("All"); setFuel("All"); setMaxPrice(5000000); setSort("relevance");
  };

  return (
    <div className="container-x mx-auto max-w-7xl py-12">
      {/* Search + sort bar */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by brand, model or city…"
            className="w-full rounded-full border border-line bg-ink-2 py-3.5 pl-12 pr-4 text-paper placeholder:text-muted/60 outline-none focus:border-brand"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="rounded-full border border-line bg-ink-2 px-5 py-3.5 text-paper outline-none focus:border-brand"
        >
          <option value="relevance">Sort: Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="year-desc">Newest first</option>
          <option value="km-asc">Lowest km</option>
        </select>
        <button
          onClick={() => setOpenFilters((v) => !v)}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-ink-2 px-5 py-3.5 text-paper lg:hidden"
        >
          <SlidersHorizontal className="h-5 w-5" /> Filters
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Filters */}
        <aside
          className={cn(
            "h-fit rounded-3xl border border-line bg-surface/50 p-6 lg:block lg:sticky lg:top-24",
            openFilters ? "block" : "hidden"
          )}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-paper">Filters</h2>
            <button onClick={reset} className="text-sm text-brand hover:underline">
              Reset
            </button>
          </div>

          <FilterGroup label="Brand">
            <div className="flex flex-wrap gap-2">
              {["All", ...makes].map((m) => (
                <button
                  key={m}
                  onClick={() => setMake(m)}
                  className={cn(chipBase, make === m
                    ? "border-brand bg-brand text-white"
                    : "border-line text-muted hover:text-paper")}
                >
                  {m}
                </button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="Body type">
            <div className="flex flex-wrap gap-2">
              {["All", ...bodyTypes].map((b) => (
                <button
                  key={b}
                  onClick={() => setBody(b)}
                  className={cn(chipBase, body === b
                    ? "border-sky bg-sky/15 text-sky"
                    : "border-line text-muted hover:text-paper")}
                >
                  {b}
                </button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="Fuel">
            <div className="flex flex-wrap gap-2">
              {(["All", ...fuels] as (Fuel | "All")[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFuel(f)}
                  className={cn(chipBase, fuel === f
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-line text-muted hover:text-paper")}
                >
                  {f}
                </button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label={`Max price · ${formatINR(maxPrice)}`}>
            <input
              type="range"
              min={500000}
              max={5000000}
              step={50000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[var(--color-brand)]"
            />
          </FilterGroup>
        </aside>

        {/* Results */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted">
              <span className="font-semibold text-paper">{results.length}</span> cars found
            </p>
          </div>

          {results.length === 0 ? (
            <div className="grid place-items-center rounded-3xl border border-line bg-surface/50 py-24 text-center">
              <X className="h-10 w-10 text-muted" />
              <p className="mt-4 text-lg text-paper">No cars match your filters</p>
              <button onClick={reset} className="mt-3 text-brand hover:underline">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 border-t border-line pt-5">
      <p className="mb-3 text-sm font-medium text-paper/80">{label}</p>
      {children}
    </div>
  );
}
