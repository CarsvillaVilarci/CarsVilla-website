/**
 * Placeholder inventory + brands for the demo home page. ..
 * Replaced by the Supabase-backed catalogue in a later phase.
 * `href` on each brand deep-links to /buy pre-filtered (works once /buy lands).
 */

export type Brand = { name: string; slug: string };

export const brands: Brand[] = [
  { name: "Maruti Suzuki", slug: "maruti-suzuki" },
  { name: "Hyundai", slug: "hyundai" },
  { name: "Tata", slug: "tata" },
  { name: "Mahindra", slug: "mahindra" },
  { name: "Toyota", slug: "toyota" },
  { name: "Honda", slug: "honda" },
  { name: "Kia", slug: "kia" },
  { name: "Volkswagen", slug: "volkswagen" },
  { name: "Skoda", slug: "skoda" },
  { name: "MG", slug: "mg" },
  { name: "BMW", slug: "bmw" },
  { name: "Mercedes-Benz", slug: "mercedes-benz" },
  { name: "Audi", slug: "audi" },
  { name: "Renault", slug: "renault" },
];

export const brandHref = (slug: string) => `/buy?brand=${slug}`;

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
};

/** Full demo catalogue (replaced by the Supabase-backed inventory later). */
export const allCars: Car[] = [
  { slug: "hyundai-creta-sx-2021", make: "Hyundai", model: "Creta", variant: "SX (O)", body: "SUV", year: 2021, km: 34000, fuel: "Petrol", transmission: "Automatic", city: "Tamluk", price: 1240000, tint: "#2b4a6f" },
  { slug: "toyota-fortuner-2019", make: "Toyota", model: "Fortuner", variant: "4x2 AT", body: "SUV", year: 2019, km: 61000, fuel: "Diesel", transmission: "Automatic", city: "Haldia", price: 2850000, tint: "#1f2a2e" },
  { slug: "tata-nexon-xz-2022", make: "Tata", model: "Nexon", variant: "XZ+ Dark", body: "Compact SUV", year: 2022, km: 21000, fuel: "Diesel", transmission: "Manual", city: "Mecheda", price: 980000, tint: "#3a2f4a" },
  { slug: "honda-city-vx-2021", make: "Honda", model: "City", variant: "VX CVT", body: "Sedan", year: 2021, km: 29000, fuel: "Petrol", transmission: "Automatic", city: "Tamluk", price: 1090000, tint: "#3d2b2b" },
  { slug: "mahindra-thar-lx-2022", make: "Mahindra", model: "Thar", variant: "LX Hard Top", body: "SUV", year: 2022, km: 18500, fuel: "Diesel", transmission: "Automatic", city: "Panskura", price: 1370000, tint: "#4a3b26" },
  { slug: "kia-seltos-htx-2021", make: "Kia", model: "Seltos", variant: "HTX IVT", body: "SUV", year: 2021, km: 40000, fuel: "Petrol", transmission: "Automatic", city: "Kolkata", price: 1320000, tint: "#243b34" },
  { slug: "maruti-swift-zxi-2020", make: "Maruti Suzuki", model: "Swift", variant: "ZXI", body: "Hatchback", year: 2020, km: 38000, fuel: "Petrol", transmission: "Manual", city: "Tamluk", price: 620000, tint: "#35506e" },
  { slug: "maruti-baleno-alpha-2021", make: "Maruti Suzuki", model: "Baleno", variant: "Alpha", body: "Hatchback", year: 2021, km: 27000, fuel: "Petrol", transmission: "Manual", city: "Contai", price: 710000, tint: "#2f6e5a" },
  { slug: "hyundai-venue-sx-2021", make: "Hyundai", model: "Venue", variant: "SX Turbo", body: "Compact SUV", year: 2021, km: 33000, fuel: "Petrol", transmission: "Manual", city: "Tamluk", price: 890000, tint: "#4a2f52" },
  { slug: "tata-harrier-xz-2020", make: "Tata", model: "Harrier", variant: "XZ", body: "SUV", year: 2020, km: 45000, fuel: "Diesel", transmission: "Manual", city: "Haldia", price: 1420000, tint: "#2f3a4a" },
  { slug: "honda-amaze-vx-2019", make: "Honda", model: "Amaze", variant: "VX", body: "Sedan", year: 2019, km: 52000, fuel: "Petrol", transmission: "Manual", city: "Tamluk", price: 560000, tint: "#4a2b2b" },
  { slug: "toyota-innova-crysta-2018", make: "Toyota", model: "Innova Crysta", variant: "2.4 GX", body: "MUV", year: 2018, km: 78000, fuel: "Diesel", transmission: "Manual", city: "Kolkata", price: 1680000, tint: "#26332e" },
  { slug: "volkswagen-polo-gt-2019", make: "Volkswagen", model: "Polo", variant: "GT TSI", body: "Hatchback", year: 2019, km: 41000, fuel: "Petrol", transmission: "Automatic", city: "Tamluk", price: 690000, tint: "#3a2f5a" },
  { slug: "mahindra-xuv700-ax7-2022", make: "Mahindra", model: "XUV700", variant: "AX7 L", body: "SUV", year: 2022, km: 24000, fuel: "Diesel", transmission: "Automatic", city: "Kolkata", price: 2150000, tint: "#402a2a" },
  { slug: "kia-sonet-htk-2021", make: "Kia", model: "Sonet", variant: "HTK+", body: "Compact SUV", year: 2021, km: 30000, fuel: "Diesel", transmission: "Manual", city: "Mecheda", price: 940000, tint: "#244a3b" },
  { slug: "hyundai-i20-asta-2020", make: "Hyundai", model: "i20", variant: "Asta", body: "Hatchback", year: 2020, km: 36000, fuel: "Petrol", transmission: "Manual", city: "Panskura", price: 720000, tint: "#2b4a6f" },
];

/** Home page shows a handpicked subset. */
export const featuredCars: Car[] = allCars.slice(0, 6);

/** Filter option lists + helpers used by the /buy explorer. */
export const bodyTypes: BodyType[] = ["SUV", "Compact SUV", "Sedan", "Hatchback", "MUV"];
export const fuels: Fuel[] = ["Petrol", "Diesel", "CNG", "Electric"];
export const transmissions: Transmission[] = ["Automatic", "Manual"];

export const makeSlug = (make: string) => make.toLowerCase().replace(/\s+/g, "-");

export const priceBounds = {
  min: Math.min(...allCars.map((c) => c.price)),
  max: Math.max(...allCars.map((c) => c.price)),
};

export type Acquired = {
  make: string;
  model: string;
  year: number;
  city: string;
  paid: number; // what CarsVilla paid the seller
  daysAgo: number;
  tint: string;
};

export const recentlyBought: Acquired[] = [
  { make: "Mercedes-Benz", model: "C-Class", year: 2018, city: "Kolkata", paid: 2450000, daysAgo: 2, tint: "#1f2a2e" },
  { make: "Hyundai", model: "Venue", year: 2021, city: "Tamluk", paid: 890000, daysAgo: 3, tint: "#2b4a6f" },
  { make: "Tata", model: "Harrier", year: 2020, city: "Haldia", paid: 1420000, daysAgo: 5, tint: "#3a2f4a" },
  { make: "Honda", model: "Amaze", year: 2019, city: "Tamluk", paid: 560000, daysAgo: 6, tint: "#3d2b2b" },
  { make: "Maruti Suzuki", model: "Baleno", year: 2020, city: "Contai", paid: 620000, daysAgo: 7, tint: "#4a3b26" },
];

/** ₹ formatting: compact Indian lakh/crore notation. */
export function formatINR(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

export const kmFormat = (km: number) => `${(km / 1000).toFixed(0)}k km`;

/* ------------------------------- Detail page ------------------------------ */

const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const COLORS_LIST = ["Pearl White", "Metallic Grey", "Fiery Red", "Midnight Black", "Starry Blue"];

export const getCar = (slug: string) => allCars.find((c) => c.slug === slug);

/** Cars sharing the body type or brand, excluding the current one. */
export const similarCars = (car: Car, n = 3) =>
  allCars
    .filter((c) => c.slug !== car.slug && (c.body === car.body || c.make === car.make))
    .slice(0, n);

/** Plausible, deterministic spec sheet derived from the (mock) car. */
export function carSpecs(car: Car): { label: string; value: string }[] {
  const h = hash(car.slug);
  const seats = car.body === "MUV" ? 7 : car.model === "Thar" ? 4 : 5;
  const mileage =
    car.fuel === "Electric"
      ? "—"
      : car.fuel === "CNG"
        ? "26 km/kg"
        : `${(car.fuel === "Diesel" ? 18 : 14) + (h % 5)} km/l`;
  return [
    { label: "Registration year", value: String(car.year) },
    { label: "Fuel type", value: car.fuel },
    { label: "Transmission", value: car.transmission },
    { label: "Kilometers driven", value: `${car.km.toLocaleString("en-IN")} km` },
    { label: "Ownership", value: h % 2 === 0 ? "First owner" : "Second owner" },
    { label: "Body type", value: car.body },
    { label: "Seating capacity", value: `${seats} seater` },
    { label: "Mileage", value: mileage },
    { label: "Colour", value: COLORS_LIST[h % COLORS_LIST.length] },
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
