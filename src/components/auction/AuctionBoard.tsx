"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Gavel, Users } from "lucide-react";
import { formatINR } from "@/lib/demo";
import { supabase } from "@/lib/supabase";

type BoardCar = {
  slug: string;
  make: string;
  model: string;
  variant: string | null;
  year: number;
  city: string;
  tint: string | null;
};

type BoardBid = { bidder_name: string; amount_inr: number; created_at: string };

type BoardAuction = {
  id: string;
  seller_name: string | null;
  reserve_inr: number | null;
  ends_at: string;
  status: string;
  cars: BoardCar | null;
  bids: BoardBid[];
};

type Item = {
  id: string;
  car: BoardCar;
  seller: string;
  reserve: number;
  bid: number;
  leader: string | null;
  bids: number;
  endsAt: string;
  version: number;
};

type LiveEvent = { text: string; carsvilla: boolean } | null;

function toItem(a: BoardAuction): Item | null {
  if (!a.cars) return null; // car hidden/unpublished — not shown publicly
  const top = a.bids.reduce<BoardBid | null>(
    (best, b) => (!best || b.amount_inr > best.amount_inr ? b : best),
    null,
  );
  const reserve = a.reserve_inr ?? 0;
  return {
    id: a.id,
    car: a.cars,
    seller: a.seller_name ?? "a CarsVilla customer",
    reserve,
    bid: top?.amount_inr ?? reserve,
    leader: top?.bidder_name ?? null,
    bids: a.bids.length,
    endsAt: a.ends_at,
    version: 0,
  };
}

function endsIn(iso: string, now: number): string {
  const ms = new Date(iso).getTime() - now;
  if (ms <= 0) return "ending…";
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return h > 48 ? `${Math.floor(h / 24)}d` : h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function AuctionBoard() {
  const [items, setItems] = useState<Item[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [event, setEvent] = useState<LiveEvent>(null);
  const [now, setNow] = useState(() => Date.now());

  // Load the live auctions once; realtime keeps them fresh afterwards.
  useEffect(() => {
    const t = setTimeout(async () => {
      if (!supabase) {
        setLoaded(true);
        return;
      }
      const { data } = await supabase
        .from("auctions")
        .select(
          "id, seller_name, reserve_inr, ends_at, status, cars(slug, make, model, variant, year, city, tint), bids(bidder_name, amount_inr, created_at)",
        )
        .eq("status", "live")
        .gt("ends_at", new Date().toISOString())
        .order("ends_at", { ascending: true });
      const rows = (data as unknown as BoardAuction[] | null) ?? [];
      setItems(rows.map(toItem).filter((x): x is Item => x !== null));
      setLoaded(true);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  // Live: every new bid anywhere updates its card and the ticker.
  useEffect(() => {
    if (!supabase) return;
    const sb = supabase;
    const channel = sb
      .channel("public-board-bids")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bids" },
        (payload) => {
          const bid = payload.new as { auction_id: string; bidder_name: string; amount_inr: number };
          setItems((prev) =>
            prev.map((it) => {
              if (it.id !== bid.auction_id || bid.amount_inr <= it.bid) return it;
              setEvent({
                text: `${bid.bidder_name} bid ${formatINR(bid.amount_inr)} on ${it.car.make} ${it.car.model}`,
                carsvilla: bid.bidder_name === "CarsVilla",
              });
              return { ...it, bid: bid.amount_inr, leader: bid.bidder_name, bids: it.bids + 1, version: it.version + 1 };
            }),
          );
        },
      )
      .subscribe();
    return () => {
      sb.removeChannel(channel);
    };
  }, []);

  // Countdown refresh.
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(t);
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

      {loaded && items.length === 0 && (
        <div className="rounded-[var(--radius-xl)] border border-dashed border-line py-16 text-center">
          <p className="font-display text-xl text-ink">No live auctions right now</p>
          <p className="mt-1 text-sm text-muted">
            New cars go under the hammer regularly — or list yours below.
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => {
          const up = it.reserve > 0 ? ((it.bid - it.reserve) / it.reserve) * 100 : 0;
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
                  style={{ background: `radial-gradient(120% 120% at 30% 0%, ${it.car.tint ?? "#333"}, #14100f)` }}
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
                    <p className="text-[0.7rem] uppercase tracking-wider text-muted">
                      {it.leader ? "Highest bid" : "Opening at"}
                    </p>
                    <p className="font-display text-2xl text-wine">{formatINR(it.bid)}</p>
                  </div>
                  {it.leader && up > 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      <ArrowUpRight size={13} /> +{up.toFixed(1)}%
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs text-muted">
                  Leading:{" "}
                  <span className={leading ? "font-semibold text-wine" : "font-medium text-ink"}>
                    {it.leader ?? "awaiting first bid"}
                  </span>
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-line px-4 py-3">
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="inline-flex items-center gap-1"><Users size={13} className="text-wine" /> {it.bids} bids</span>
                  <span className="inline-flex items-center gap-1"><Clock size={13} /> {endsIn(it.endsAt, now)}</span>
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
    </section>
  );
}
