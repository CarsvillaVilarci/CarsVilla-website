/**
 * THE live catalogue — read from Supabase at BUILD TIME.
 *
 * Why build-time and not in the browser: the site is a static export, so the
 * catalogue has to exist when `next build` runs in order to emit /buy/[slug]
 * pages, their Vehicle JSON-LD and the sitemap. It also means a paused
 * free-tier DB can never blank the live site. Trade-off: admin edits only
 * reach the site on the next rebuild (deploy hook — roadmap Phase C).
 *
 * Server/build use only — do NOT import this from a "use client" component.
 * Pages fetch it and pass the rows down as props.
 */
import { supabase } from "./supabase";
import { fallbackCars } from "./fallback";
import type { BodyType, Car, Fuel, Transmission } from "./cars";

type CarRow = {
  slug: string;
  make: string;
  model: string;
  variant: string | null;
  body: string;
  year: number;
  km: number;
  fuel: string;
  transmission: string;
  city: string;
  price_inr: number;
  tint: string | null;
  owner_count: number | null;
  colour: string | null;
  seats: number | null;
  mileage_text: string | null;
};

const DEFAULT_TINT = "#2b4a6f";

const toCar = (r: CarRow): Car => ({
  slug: r.slug,
  make: r.make,
  model: r.model,
  variant: r.variant ?? "",
  body: r.body as BodyType,
  year: r.year,
  km: r.km,
  fuel: r.fuel as Fuel,
  transmission: r.transmission as Transmission,
  city: r.city,
  price: r.price_inr,
  tint: r.tint ?? DEFAULT_TINT,
  ownerCount: r.owner_count,
  colour: r.colour,
  seats: r.seats,
  mileageText: r.mileage_text,
});

export type Catalogue = {
  cars: Car[];
  /** "db" = live inventory, "fallback" = DB was unreachable during the build. */
  source: "db" | "fallback";
};

async function load(): Promise<Catalogue> {
  if (!supabase) {
    console.warn(
      "[catalogue] NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY missing — building with fallback cars.",
    );
    return { cars: fallbackCars, source: "fallback" };
  }

  // RLS already restricts public reads to published+active rows; the explicit
  // filters keep the intent readable and survive a policy change.
  const { data, error } = await supabase
    .from("cars")
    .select(
      "slug, make, model, variant, body, year, km, fuel, transmission, city, price_inr, tint, owner_count, colour, seats, mileage_text",
    )
    .eq("status", "published")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .order("slug", { ascending: true });

  if (error || !data || data.length === 0) {
    console.warn(
      `[catalogue] DB read failed or empty (${error?.message ?? "0 rows"}) — building with fallback cars.`,
    );
    return { cars: fallbackCars, source: "fallback" };
  }

  console.log(`[catalogue] ${data.length} published cars loaded from Supabase.`);
  return { cars: (data as CarRow[]).map(toCar), source: "db" };
}

/** Cached for the whole build so ~40 static pages share a single round-trip. */
let cached: Promise<Catalogue> | null = null;

export function getCatalogue(): Promise<Catalogue> {
  cached ??= load();
  return cached;
}

/** Convenience for the many callers that only need the rows. */
export async function getCars(): Promise<Car[]> {
  return (await getCatalogue()).cars;
}

export async function getCarBySlug(slug: string): Promise<Car | undefined> {
  return (await getCars()).find((c) => c.slug === slug);
}
