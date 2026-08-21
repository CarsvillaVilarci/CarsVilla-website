"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Clock, Gavel, ShieldCheck, Users } from "lucide-react";
import { carSpecs, formatINR, type Car } from "@/lib/cars";
import { supabase } from "@/lib/supabase";

type Auction = {
  id: string;
  seller_name: string | null;
  reserve_inr: number | null;
  min_increment_inr: number;
  ends_at: string;
  status: string;
};

type Bid = {
  id: string;
  bidder_name: string;
  amount_inr: number;
  created_at: string;
};

function endsIn(iso: string, now: number): string {
  const ms = new Date(iso).getTime() - now;
  if (ms <= 0) return "ending…";
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return h > 48 ? `${Math.floor(h / 24)}d` : h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function timeAgo(iso: string, now: number): string {
  const s = Math.max(0, Math.floor((now - new Date(iso).getTime()) / 1000));
  return s < 5 ? "just now" : s < 60 ? `${s}s ago` : s < 3600 ? `${Math.floor(s / 60)}m ago` : `${Math.floor(s / 3600)}h ago`;
}

export function AuctionRoom({ car }: { car: Car }) {
  const [auction, setAuction] = useState<Auction | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const specs = carSpecs(car);

  // Load this car's live auction + its bids.
  useEffect(() => {
    const t = setTimeout(async () => {
      if (!supabase) {
        setLoaded(true);
        return;
      }
      const { data: a } = await supabase
        .from("auctions")
        .select("id, seller_name, reserve_inr, min_increment_inr, ends_at, status, cars!inner(slug)")
        .eq("cars.slug", car.slug)
        .eq("status", "live")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (a) {
        setAuction(a as unknown as Auction);
        const { data: b } = await supabase
          .from("bids")
          .select("id, bidder_name, amount_inr, created_at")
          .eq("auction_id", (a as unknown as Auction).id)
          .order("amount_inr", { ascending: false })
          .limit(40);
        setBids(b ?? []);
      }
      setLoaded(true);
    }, 0);
    return () => clearTimeout(t);
  }, [car.slug]);

  // Live bid feed for this auction.
  useEffect(() => {
    if (!supabase || !auction) return;
    const sb = supabase;
    const channel = sb
      .channel(`room-bids-${auction.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bids", filter: `auction_id=eq.${auction.id}` },
        (payload) => {
          const bid = payload.new as Bid;
          setBids((prev) => [bid, ...prev].sort((x, y) => y.amount_inr - x.amount_inr).slice(0, 40));
        },
      )
      .subscribe();
    return () => {
      sb.removeChannel(channel);
    };
  }, [auction]);

  // Clock for "ends in" and bid ages.
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 5000);
    return () => clearInterval(t);
  }, []);

  const highest = bids[0] ?? null;
  const reserve = auction?.reserve_inr ?? 0;
  const up = highest && reserve > 0 ? ((highest.amount_inr - reserve) / reserve) * 100 : 0;

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
            {auction && (
              <span className="absolute left-5 top-5 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold text-white">
                <span className="live-dot inline-flex h-1.5 w-1.5 rounded-full bg-white" /> Live
              </span>
            )}
            <span className="absolute bottom-5 left-5 font-display text-4xl text-cream/95">{car.make}</span>
          </div>

          <h1 className="mt-6 font-display text-3xl text-ink">
            {car.year} {car.model} <span className="text-muted">{car.variant}</span>
          </h1>
          <p className="mt-1 text-sm text-muted">
            Listed by {auction?.seller_name ?? "a CarsVilla customer"} · {car.city}
          </p>

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
            {!loaded ? (
              <p className="py-10 text-center text-sm text-muted">Loading auction…</p>
            ) : !auction ? (
              <div className="py-6 text-center">
                <p className="font-display text-xl text-ink">No live auction for this car</p>
                <p className="mt-2 text-sm text-muted">
                  It may have ended, or bidding hasn&apos;t started yet.
                </p>
                <Link
                  href="/auction"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-wine px-6 py-3 text-sm font-semibold text-cream hover:bg-wine-hot"
                >
                  <Gavel size={15} /> See live auctions
                </Link>
              </div>
            ) : (
              <>
                <p className="text-[0.7rem] uppercase tracking-wider text-muted">
                  {highest ? "Highest bid" : "Opening at"}
                </p>
                <div className="flex items-end gap-3">
                  <p className="font-display text-4xl leading-none text-wine">
                    {formatINR(highest?.amount_inr ?? reserve)}
                  </p>
                  {highest && up > 0 && (
                    <span className="mb-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      +{up.toFixed(1)}%
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted">
                  Leading:{" "}
                  <span className={highest?.bidder_name === "CarsVilla" ? "font-semibold text-wine" : "font-medium text-ink"}>
                    {highest?.bidder_name ?? "awaiting first bid"}
                  </span>
                </p>

                <div className="mt-4 flex gap-4 border-y border-line py-3 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5"><Users size={14} className="text-wine" /> {bids.length} bids</span>
                  <span className="inline-flex items-center gap-1.5"><Clock size={14} className="text-wine" /> Ends in {endsIn(auction.ends_at, now)}</span>
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
                      <span className="live-dot inline-flex h-2 w-2 rounded-full bg-emerald-500" /> live
                    </span>
                  </div>
                  <ul className="max-h-80 space-y-1 overflow-y-auto pr-1">
                    {bids.length === 0 && (
                      <li className="px-3 py-2.5 text-sm text-muted">No bids yet — be the first.</li>
                    )}
                    {bids.map((b) => (
                      <li
                        key={b.id}
                        className={`flex items-center justify-between rounded-lg px-3 py-2.5 ${now - new Date(b.created_at).getTime() < 5000 ? "tick-up" : ""}`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`grid h-7 w-7 place-items-center rounded-full text-[0.7rem] font-semibold ${b.bidder_name === "CarsVilla" ? "bg-wine text-cream" : "bg-cream-2 text-ink"}`}>
                            {b.bidder_name[0]}
                          </span>
                          <span className={`text-sm ${b.bidder_name === "CarsVilla" ? "font-semibold text-wine" : "text-ink"}`}>
                            {b.bidder_name}
                          </span>
                        </span>
                        <span className="text-right">
                          <span className="block text-sm font-semibold text-ink">{formatINR(b.amount_inr)}</span>
                          <span className="block text-[0.7rem] text-muted">{timeAgo(b.created_at, now)}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-5 inline-flex items-center gap-1.5 text-xs text-muted">
                  <ShieldCheck size={13} className="text-emerald-600" /> Live bids — every bid is
                  validated and recorded by the CarsVilla platform.
                </p>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
