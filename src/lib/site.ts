/** Central site configuration — single source of truth for brand + SEO. */
export const site = {
  name: "CarsVilla",
  legalName: "CarsVilla Motors",
  tagline: "Sell smart. Buy certified. Drive premium.",
  description:
    "CarsVilla is India's premium used-car marketplace. Sell your car in minutes at the best price, buy 200-point certified pre-owned cars, and get RC transfer, insurance & financing — all in one place.",
  url: "https://carsvilla.example.com", // TODO: replace with production domain
  locale: "en_IN",
  phone: "+91 90000 00000",
  email: "hello@carsvilla.example.com",
  address: {
    street: "MG Road",
    city: "Bengaluru",
    region: "Karnataka",
    postalCode: "560001",
    country: "IN",
  },
  social: {
    instagram: "https://instagram.com/carsvilla",
    youtube: "https://youtube.com/@carsvilla",
    twitter: "https://twitter.com/carsvilla",
    facebook: "https://facebook.com/carsvilla",
  },
} as const;

export const nav = [
  { label: "Buy Cars", href: "/buy" },
  { label: "Sell Car", href: "/sell" },
  { label: "Services", href: "/services" },
  { label: "RC Check", href: "/lookup" },
  { label: "About", href: "/about" },
] as const;
