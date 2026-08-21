/**
 * BUILD-TIME FALLBACK ONLY — not the live catalogue.
 *
 * The real inventory comes from Supabase via `@/lib/catalogue`. These rows are
 * used solely when the DB is unreachable during `next build` (the free tier
 * pauses after ~1 week idle, and a paused DB must never ship a blank site).
 * They mirror the seeded `cars` rows. See CARSVILLA_WEB_PIPELINE.md §13.5.
 */
import type { Car } from "./cars";

type SeedRow = Omit<Car, "ownerCount" | "colour" | "seats" | "mileageText">;

const rows: SeedRow[] = [
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

/** Detail specs are unknown offline — carSpecs() fills them deterministically. */
export const fallbackCars: Car[] = rows.map((r) => ({
  ...r,
  ownerCount: null,
  colour: null,
  seats: null,
  mileageText: null,
}));
