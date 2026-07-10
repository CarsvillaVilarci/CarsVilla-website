export type Fuel = "Petrol" | "Diesel" | "CNG" | "Electric" | "Hybrid";
export type Transmission = "Manual" | "Automatic";
export type BodyType = "Hatchback" | "Sedan" | "SUV" | "MUV" | "Luxury";

export interface Car {
  id: string;
  slug: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  price: number; // in rupees
  km: number;
  fuel: Fuel;
  transmission: Transmission;
  owners: number;
  city: string;
  bodyType: BodyType;
  color: string; // display name
  accent: string; // hex used for the branded thumbnail
  certified: boolean;
  featured?: boolean;
  emi: number; // approx monthly EMI in rupees
}

export const cars: Car[] = [
  {
    id: "1", slug: "hyundai-creta-sx-2022", make: "Hyundai", model: "Creta",
    variant: "SX (O) Turbo DCT", year: 2022, price: 1685000, km: 24500,
    fuel: "Petrol", transmission: "Automatic", owners: 1, city: "Bengaluru",
    bodyType: "SUV", color: "Phantom Black", accent: "#e11d2a", certified: true,
    featured: true, emi: 32900,
  },
  {
    id: "2", slug: "maruti-swift-zxi-2021", make: "Maruti Suzuki", model: "Swift",
    variant: "ZXi+ AMT", year: 2021, price: 785000, km: 31200,
    fuel: "Petrol", transmission: "Automatic", owners: 1, city: "Pune",
    bodyType: "Hatchback", color: "Fire Red", accent: "#dc2626", certified: true,
    emi: 15300,
  },
  {
    id: "3", slug: "kia-seltos-htx-2023", make: "Kia", model: "Seltos",
    variant: "HTX Plus Diesel", year: 2023, price: 1749000, km: 18700,
    fuel: "Diesel", transmission: "Manual", owners: 1, city: "Bengaluru",
    bodyType: "SUV", color: "Gravity Grey", accent: "#334155", certified: true,
    featured: true, emi: 34100,
  },
  {
    id: "4", slug: "tata-nexon-ev-2022", make: "Tata", model: "Nexon EV",
    variant: "Max XZ+ Lux", year: 2022, price: 1425000, km: 21000,
    fuel: "Electric", transmission: "Automatic", owners: 1, city: "Hyderabad",
    bodyType: "SUV", color: "Intensi-Teal", accent: "#0ea5e9", certified: true,
    featured: true, emi: 27800,
  },
  {
    id: "5", slug: "honda-city-vx-2020", make: "Honda", model: "City",
    variant: "VX CVT", year: 2020, price: 1095000, km: 38400,
    fuel: "Petrol", transmission: "Automatic", owners: 2, city: "Mumbai",
    bodyType: "Sedan", color: "Platinum White", accent: "#64748b", certified: true,
    emi: 21400,
  },
  {
    id: "6", slug: "mahindra-thar-lx-2022", make: "Mahindra", model: "Thar",
    variant: "LX 4WD Hard Top", year: 2022, price: 1499000, km: 26800,
    fuel: "Diesel", transmission: "Manual", owners: 1, city: "Delhi",
    bodyType: "SUV", color: "Red Rage", accent: "#b91c1c", certified: true,
    featured: true, emi: 29300,
  },
  {
    id: "7", slug: "toyota-innova-crysta-2019", make: "Toyota", model: "Innova Crysta",
    variant: "2.4 ZX AT", year: 2019, price: 1875000, km: 52000,
    fuel: "Diesel", transmission: "Automatic", owners: 1, city: "Chennai",
    bodyType: "MUV", color: "Super White", accent: "#475569", certified: true,
    emi: 36600,
  },
  {
    id: "8", slug: "bmw-3-series-330i-2021", make: "BMW", model: "3 Series",
    variant: "330i M Sport", year: 2021, price: 4290000, km: 22400,
    fuel: "Petrol", transmission: "Automatic", owners: 1, city: "Bengaluru",
    bodyType: "Luxury", color: "Mineral Grey", accent: "#facc15", certified: true,
    featured: true, emi: 83700,
  },
  {
    id: "9", slug: "maruti-baleno-alpha-2022", make: "Maruti Suzuki", model: "Baleno",
    variant: "Alpha CVT", year: 2022, price: 865000, km: 19500,
    fuel: "Petrol", transmission: "Automatic", owners: 1, city: "Ahmedabad",
    bodyType: "Hatchback", color: "Nexa Blue", accent: "#38bdf8", certified: true,
    emi: 16900,
  },
  {
    id: "10", slug: "tata-harrier-xz-2021", make: "Tata", model: "Harrier",
    variant: "XZ+ Dark Edition", year: 2021, price: 1699000, km: 34100,
    fuel: "Diesel", transmission: "Manual", owners: 1, city: "Kolkata",
    bodyType: "SUV", color: "Oberon Black", accent: "#1e293b", certified: true,
    emi: 33200,
  },
  {
    id: "11", slug: "hyundai-i20-asta-2021", make: "Hyundai", model: "i20",
    variant: "Asta (O) Turbo", year: 2021, price: 895000, km: 27700,
    fuel: "Petrol", transmission: "Manual", owners: 1, city: "Jaipur",
    bodyType: "Hatchback", color: "Fiery Red", accent: "#ef4444", certified: true,
    emi: 17500,
  },
  {
    id: "12", slug: "mercedes-glc-300-2020", make: "Mercedes-Benz", model: "GLC 300",
    variant: "300 4MATIC", year: 2020, price: 4890000, km: 41000,
    fuel: "Petrol", transmission: "Automatic", owners: 1, city: "Delhi",
    bodyType: "Luxury", color: "Obsidian Black", accent: "#eab308", certified: true,
    emi: 95400,
  },
];

export function getCar(slug: string): Car | undefined {
  return cars.find((c) => c.slug === slug);
}

export const makes = [...new Set(cars.map((c) => c.make))].sort();
export const bodyTypes: BodyType[] = ["Hatchback", "Sedan", "SUV", "MUV", "Luxury"];
export const fuels: Fuel[] = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];

/** Popular brands for the sell-your-car estimator (with a rough base value). */
export const sellBrands: Record<string, string[]> = {
  "Maruti Suzuki": ["Swift", "Baleno", "Brezza", "Dzire", "WagonR"],
  Hyundai: ["Creta", "i20", "Venue", "Verna", "Grand i10"],
  Tata: ["Nexon", "Punch", "Harrier", "Altroz", "Safari"],
  Honda: ["City", "Amaze", "WR-V", "Jazz"],
  Kia: ["Seltos", "Sonet", "Carens"],
  Mahindra: ["Thar", "XUV700", "Scorpio-N", "Bolero"],
  Toyota: ["Innova Crysta", "Fortuner", "Glanza", "Urban Cruiser"],
};
