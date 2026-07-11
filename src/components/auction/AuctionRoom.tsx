"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Clock, Gavel, ShieldCheck, Users } from "lucide-react";
import { carSpecs, formatINR, type Car } from "@/lib/demo";

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

type Bid = { id: number; dealer: string; amount: number; age: number };

const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

// Deterministic seed → identical on server + client (no hydration gap).
function seedBids(car: Car): Bid[] {
  const reserve = Math.round((car.price * 0.85) / 1000) * 1000;
  const h = hash(car.slug);
  let amt = reserve;
  const oldToNew: Bid[] = [];
  for (let i = 0; i < 6; i++) {
    amt += (8 + ((h >> i) & 7)) * 1000;
    oldToNew.push({ id: i, dealer: BIDDERS[(i + h) % BIDDERS.length], amount: amt, age: (6 - i) * 40 });
  }
  return oldToNew.reverse(); // newest (highest) first
}

const timeAgo = (age: number) =>
  age < 3 ? "just now" : age < 60 ? `${age}s ago` : `${Math.floor(age / 60)}m ago`;

export function AuctionRoom({ car }: { car: Car }) {
  const [bids, setBids] = useState<Bid[]>(() => seedBids(car));
  const nextId = useRef(1000);
  const specs = carSpecs(car);
  const h = hash(car.slug);
  const reserve = Math.round((car.price * 0.85) / 1000) * 1000;
  const seller = SELLERS[h % SELLERS.length];
  const endsIn = `${1 + (h % 6)}h ${((h * 7) % 60).toString().padStart(2, "0")}m`;
  const cap = car.price * 1.08;

  useEffect(() => {
    const t = setInterval(() => {
      setBids((prev) => {
        const aged = prev.map((b) => ({ ...b, age: b.age + 3 }));
        if (Math.random() < 0.72) {
          const top = aged[0]?.amount ?? reserve;
          const amount = top + (5 + Math.floor(Math.random() * 20)) * 1000;
          if (amount <= cap) {
            const dealer = BIDDERS[Math.floor(Math.random() * BIDDERS.length)];
            return [{ id: nextId.current++, dealer, amount, age: 0 }, ...aged].slice(0, 40);
          }
        }
        return aged;
      });
    }, 2500);
    return () => clearInterval(t);
  }, [cap, reserve]);

  const highest = bids[0];
  const up = ((highest.amount - reserve) / reserve) * 100;

  return (
    <div className="container-x py-8">
      {/* breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted">
        <Link href="/" className="hover:text-wine">Home</Link>
        <ChevronRight size={14} />
        <Link href="/auction" className="hover:text-wine">Auction</Link>
        <ChevronRight size={14} />
        <span className="text-ink">{car.model}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Car */}
        <div>
          <div
            className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-2xl)] border border-line shadow-luxe"
            style={{ background: `radial-gradient(120% 120% at 30% 0%, ${car.tint}, #14100f)` }}
          >
            <span className="absolute left-5 top-5 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold text-white">
              <span className="live-dot inline-flex h-1.5 w-1.5 rounded-full bg-white" /> Live
            </span>
            <span className="absolute bottom-5 left-5 font-display text-4xl text-cream/95">{car.make}</span>
          </div>

          <h1 className="mt-6 font-display text-3xl text-ink">
            {car.year} {car.model} <span className="text-muted">{car.variant}</span>
          </h1>
          <p className="mt-1 text-sm text-muted">Listed by {seller} · {car.city}</p>

          <h2 className="mt-8 text-xl">Car details</h2>
          <dl className="mt-4 grid gap-x-10 rounded-[var(--radius-xl)] border border-line bg-paper p-6 sm:grid-cols-2">
            {specs.map((s) => (
              <div key={s.label} className="flex items-center justify-between gap-4 border-b border-line py-3 last:border-0 sm:[&:nth-last-child(2)]:border-0">
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="text-right text-sm font-medium text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Auction panel */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[var(--radius-2xl)] border border-line bg-paper p-6 shadow-luxe md:p-7">
            <p className="text-[0.7rem] uppercase tracking-wider text-muted">Highest bid</p>
            <div className="flex items-end gap-3">
              <p className="font-display text-4xl leading-none text-wine">{formatINR(highest.amount)}</p>
              <span className="mb-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                +{up.toFixed(1)}%
              </span>
            </div>
            <p className="mt-2 text-sm text-muted">
              Leading:{" "}
              <span className={highest.dealer === "CarsVilla" ? "font-semibold text-wine" : "font-medium text-ink"}>
                {highest.dealer}
              </span>
            </p>

            <div className="mt-4 flex gap-4 border-y border-line py-3 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5"><Users size={14} className="text-wine" /> {bids.length} bids</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={14} className="text-wine" /> Ends in {endsIn}</span>
            </div>

            <Link
              href="/login"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-wine px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-wine-hot"
            >
              <Gavel size={16} /> Log in to place a bid
            </Link>

            {/* live bid list */}
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-lg text-ink">Live bids</h3>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                  <span className="live-dot inline-flex h-2 w-2 rounded-full bg-emerald-500" /> updating
                </span>
              </div>
              <ul className="max-h-80 space-y-1 overflow-y-auto pr-1">
                {bids.map((b) => (
                  <li
                    key={b.id}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 ${b.age < 3 ? "tick-up" : ""}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`grid h-7 w-7 place-items-center rounded-full text-[0.7rem] font-semibold ${b.dealer === "CarsVilla" ? "bg-wine text-cream" : "bg-cream-2 text-ink"}`}>
                        {b.dealer[0]}
                      </span>
                      <span className={`text-sm ${b.dealer === "CarsVilla" ? "font-semibold text-wine" : "text-ink"}`}>
                        {b.dealer}
                      </span>
                    </span>
                    <span className="text-right">
                      <span className="block text-sm font-semibold text-ink">{formatINR(b.amount)}</span>
                      <span className="block text-[0.7rem] text-muted">{timeAgo(b.age)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-5 inline-flex items-center gap-1.5 text-xs text-muted">
              <ShieldCheck size={13} className="text-emerald-600" /> Demo — bids simulated (live via Supabase, Phase 4)
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
