/**
 * Car domain types + PURE helpers. No data, no I/O — safe to import from
 * client components. The catalogue itself comes from `@/lib/catalogue`
 * (build-time Supabase fetch) and is passed down as props.
 */

export type BodyType = "SUV" | "Compact SUV" | "Sedan" | "Hatchback" | "MUV";
export type Fuel = "Petrol" | "Diesel" | "CNG" | "Electric";
export type Transmission = "Manual" | "Automatic";

export type Car = {
  slug: string;
  make: string;
  model: string;
  variant: string;
  body: BodyType;
  year: number;
  km: number;
  fuel: Fuel;
  transmission: Transmission;
  city: string;
  price: number; // in ₹
  tint: string; // brand-tinted gradient for the thumbnail
  /* Real spec columns from the DB — null on older/partial rows, in which case
     carSpecs() falls back to a deterministic guess so the sheet never has holes. */
  ownerCount: number | null;
  colour: string | null;
  seats: number | null;
  mileageText: string | null;
};

export type Brand = { name: string; slug: string; count: number };

/** A car CarsVilla bought from a customer (the "recently bought" panel). */
export type Acquired = {
  make: string;
  model: string;
  year: number;
  city: string;
  paid: number; // what CarsVilla paid the seller
  daysAgo: number;
  tint: string;
};

/** Filter option lists — these mirror the DB CHECK constraints on `cars`. */
export const bodyTypes: BodyType[] = ["SUV", "Compact SUV", "Sedan", "Hatchback", "MUV"];
export const fuels: Fuel[] = ["Petrol", "Diesel", "CNG", "Electric"];
export const transmissions: Transmission[] = ["Automatic", "Manual"];

/**
 * Brands offered in the SELL wizard. Deliberately NOT derived from inventory —
 * a customer can sell us a brand we don't currently stock.
 */
export const sellBrands: string[] = [
  "Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Toyota", "Honda", "Kia",
  "Volkswagen", "Skoda", "Renault", "Nissan", "MG", "Ford", "Mercedes-Benz",
  "BMW", "Audi", "Jeep", "Other",
];

export const makeSlug = (make: string) => make.toLowerCase().replace(/\s+/g, "-");
export const brandHref = (slug: string) => `/buy?brand=${slug}`;

/** ₹ formatting: compact Indian lakh/crore notation. */
export function formatINR(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

export const kmFormat = (km: number) => `${(km / 1000).toFixed(0)}k km`;

/* ------------------------------ Derived views ----------------------------- */

/** Brands present in the live inventory, most-stocked first. */
export function brandsOf(cars: Car[]): Brand[] {
  const counts = new Map<string, number>();
  for (const c of cars) counts.set(c.make, (counts.get(c.make) ?? 0) + 1);
  return [...counts.entries()]
    .map(([name, count]) => ({ name, slug: makeSlug(name), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Budget-slider bounds. Guards the empty-inventory case (Math.min() → Infinity). */
export function priceBoundsOf(cars: Car[]): { min: number; max: number } {
  if (cars.length === 0) return { min: 0, max: 5000000 };
  const prices = cars.map((c) => c.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

/**
 * Home-page showcase. Takes the list in catalogue order (newest first) but
 * prefers one car per brand, so the grid reads as a range rather than five of
 * the same make — then backfills if there aren't enough distinct brands.
 */
export function featuredCars(cars: Car[], n = 6): Car[] {
  const seen = new Set<string>();
  const picked: Car[] = [];
  for (const c of cars) {
    if (picked.length === n) break;
    if (seen.has(c.make)) continue;
    seen.add(c.make);
    picked.push(c);
  }
  for (const c of cars) {
    if (picked.length === n) break;
    if (!picked.includes(c)) picked.push(c);
  }
  return picked;
}

/** Cars sharing the body type or brand, excluding the current one. */
export const similarCars = (car: Car, pool: Car[], n = 3) =>
  pool
    .filter((c) => c.slug !== car.slug && (c.body === car.body || c.make === car.make))
    .slice(0, n);

/* ------------------------------- Detail page ------------------------------ */

const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const COLORS_LIST = ["Pearl White", "Metallic Grey", "Fiery Red", "Midnight Black", "Starry Blue"];

const ordinal = (n: number) =>
  n === 1 ? "First owner" : n === 2 ? "Second owner" : n === 3 ? "Third owner" : `${n}th owner`;

/**
 * Spec sheet. Prefers the REAL columns the admin portal maintains
 * (owner_count / colour / seats / mileage_text); only falls back to a
 * deterministic guess when a row hasn't been filled in yet.
 */
export function carSpecs(car: Car): { label: string; value: string }[] {
  const h = hash(car.slug);
  const seats = car.seats ?? (car.body === "MUV" ? 7 : car.model === "Thar" ? 4 : 5);
  const mileage =
    car.mileageText ??
    (car.fuel === "Electric"
      ? "—"
      : car.fuel === "CNG"
        ? "26 km/kg"
        : `${(car.fuel === "Diesel" ? 18 : 14) + (h % 5)} km/l`);
  return [
    { label: "Registration year", value: String(car.year) },
    { label: "Fuel type", value: car.fuel },
    { label: "Transmission", value: car.transmission },
    { label: "Kilometers driven", value: `${car.km.toLocaleString("en-IN")} km` },
    { label: "Ownership", value: ordinal(car.ownerCount ?? (h % 2 === 0 ? 1 : 2)) },
    { label: "Body type", value: car.body },
    { label: "Seating capacity", value: `${seats} seater` },
    { label: "Mileage", value: mileage },
    { label: "Colour", value: car.colour ?? COLORS_LIST[h % COLORS_LIST.length] },
    { label: "RTO location", value: car.city },
    { label: "Insurance", value: "Comprehensive · valid" },
    { label: "CarsVilla certified", value: "200-point passed" },
  ];
}

/** Rough monthly EMI: 85% on-road financed, ~9.5% p.a., 60 months. */
export function estimateEmi(price: number): number {
  const principal = price * 0.85;
  const r = 0.095 / 12;
  const n = 60;
  const emi = (principal * r * (1 + r) ** n) / ((1 + r) ** n - 1);
  return Math.round(emi / 100) * 100;
}
