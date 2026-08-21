/**
 * CURATED MARKETING CONTENT — hand-maintained, deliberately not from the DB.
 *
 * `cars` has no "what we paid the seller" column, so this panel cannot be
 * derived from inventory without an `acquisitions` table (roadmap item).
 * Edit the rows here until that exists.
 */
import type { Acquired } from "./cars";

export const recentAcquisitions: Acquired[] = [
  { make: "Mercedes-Benz", model: "C-Class", year: 2018, city: "Kolkata", paid: 2450000, daysAgo: 2, tint: "#1f2a2e" },
  { make: "Hyundai", model: "Venue", year: 2021, city: "Tamluk", paid: 890000, daysAgo: 3, tint: "#2b4a6f" },
  { make: "Tata", model: "Harrier", year: 2020, city: "Haldia", paid: 1420000, daysAgo: 5, tint: "#3a2f4a" },
  { make: "Honda", model: "Amaze", year: 2019, city: "Tamluk", paid: 560000, daysAgo: 6, tint: "#3d2b2b" },
  { make: "Maruti Suzuki", model: "Baleno", year: 2020, city: "Contai", paid: 620000, daysAgo: 7, tint: "#4a3b26" },
];
