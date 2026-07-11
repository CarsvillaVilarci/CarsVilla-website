"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Gavel, Users } from "lucide-react";
import { allCars, formatINR, type Car } from "@/lib/demo";

// Dealers (+ CarsVilla itself) who bid on customers' cars.
const BIDDERS = [
  "Tamluk Motors",
  "Haldia Auto Hub",
  "Coastal Cars",
  "Medinipur Wheels",
  "Kolkata Kar Bazaar",
  "Panskura Pre-Owned",
  "CarsVilla",
];
const SELLERS = ["Aarav S.", "Priya D.", "Rahul M.", "Sneha B.", "Imran K.", "Ananya G.", "Vikram R.", "Debjit S."];

type Item = {
  id: string;
  car: Car;
  seller: string;
  reserve: number;
  bid: number;
  leader: string;
  bids: number;
  endsIn: string;
  version: number;
};

function initialItems(): Item[] {
  return allCars.map((car, i) => {
    const reserve = Math.round((car.price * 0.85) / 1000) * 1000;
    return {
      id: car.slug,
      car,
      seller: SELLERS[i % SELLERS.length],
      reserve,
      bid: reserve,
      leader: BIDDERS[i % BIDDERS.length],
      bids: 3 + ((i * 2) % 12),
      endsIn: `${1 + (i % 6)}h ${((i * 7) % 60).toString().padStart(2, "0")}m`,
      version: 0,
    };
  });
}

type LiveEvent = { text: string; carsvilla: boolean } | null;

export function AuctionBoard() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [event, setEvent] = useState<LiveEvent>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setItems((prev) => {
        const next = [...prev];
        const i = Math.floor(Math.random() * next.length);
        const it = next[i];
        const cap = it.car.price * 1.08;
        const raise = (5 + Math.floor(Math.random() * 20)) * 1000;
        const bid = it.bid + raise;
        if (bid > cap) return next;
        const leader = BIDDERS[Math.floor(Math.random() * BIDDERS.length)];
        next[i] = { ...it, bid, leader, bids: it.bids + 1, version: it.version + 1 };
        setEvent({
          text: `${leader} bid ${formatINR(bid)} on ${it.car.make} ${it.car.model}`,
          carsvilla: leader === "CarsVilla",
        });
        return next;
      });
    }, 2000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <section className="container-x py-10">
      {/* live status bar */}
      <div className="mb-6 flex flex-col gap-3 rounded-[var(--radius-xl)] border border-line bg-paper p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="live-dot inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="text-sm font-semibold text-ink">Live auction</span>
          <span className="text-sm text-muted">· {items.length} cars under bidding</span>
        </div>
        <p className="min-h-5 text-sm" aria-live="polite">
          {event ? (
            <span className={event.carsvilla ? "font-semibold text-wine" : "text-ink"}>{event.text}</span>
          ) : (
            <span className="text-muted">Waiting for the next bid…</span>
          )}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => {
          const up = ((it.bid - it.reserve) / it.reserve) * 100;
          const leading = it.leader === "CarsVilla";
          return (
            <Link
              key={it.id}
              href={`/auction/${it.car.slug}`}
              className="group block overflow-hidden rounded-[var(--radius-xl)] border border-line bg-paper shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxe"
            >
              <div className="flex items-center gap-3 p-4">
                <span
                  className="h-14 w-20 shrink-0 rounded-lg"
                  style={{ background: `radial-gradient(120% 120% at 30% 0%, ${it.car.tint}, #14100f)` }}
                />
                <div className="min-w-0">
                  <h3 className="truncate font-display text-lg text-ink">
                    {it.car.model} <span className="text-muted">{it.car.variant}</span>
                  </h3>
                  <p className="mt-0.5 truncate text-xs text-muted">
                    Listed by {it.seller} · {it.car.city} · {it.car.year}
                  </p>
                </div>
              </div>

              <div key={it.version} className={`px-4 ${it.version > 0 ? "tick-up" : ""}`}>
                <div className="flex items-end justify-between border-t border-line pt-3">
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-wider text-muted">Highest bid</p>
                    <p className="font-display text-2xl text-wine">{formatINR(it.bid)}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    <ArrowUpRight size={13} /> +{up.toFixed(1)}%
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted">
                  Leading:{" "}
                  <span className={leading ? "font-semibold text-wine" : "font-medium text-ink"}>{it.leader}</span>
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-line px-4 py-3">
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="inline-flex items-center gap-1"><Users size={13} className="text-wine" /> {it.bids} bids</span>
                  <span className="inline-flex items-center gap-1"><Clock size={13} /> {it.endsIn}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-wine px-4 py-2 text-xs font-semibold text-cream group-hover:bg-wine-hot">
                  <Gavel size={13} /> Bid
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* two CTAs: sellers list, dealers bid */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col items-start gap-2 rounded-[var(--radius-2xl)] border border-line bg-cream-2/60 p-7">
          <h2 className="text-xl">Selling your car?</h2>
          <p className="text-sm text-muted">List it for bidding and let verified dealers — and CarsVilla — compete for it. Highest bid wins.</p>
          <Link href="/sell" className="mt-2 inline-flex items-center gap-2 rounded-full bg-wine px-5 py-2.5 text-sm font-semibold text-cream hover:bg-wine-hot">
            List my car
          </Link>
        </div>
        <div className="flex flex-col items-start gap-2 rounded-[var(--radius-2xl)] border border-line bg-cream-2/60 p-7">
          <h2 className="text-xl">Are you a dealer?</h2>
          <p className="text-sm text-muted">Browse full car details and bid live. Just log in — no separate dealer portal.</p>
          <Link href="/login" className="mt-2 inline-flex items-center gap-2 rounded-full bg-wine px-5 py-2.5 text-sm font-semibold text-cream hover:bg-wine-hot">
            Log in to bid
          </Link>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-muted">
        Demo — bids are simulated and update every couple of seconds. Live dealer bidding goes
        live with the backend (Supabase Realtime, Phase 4).
      </p>
    </section>
  );
}
