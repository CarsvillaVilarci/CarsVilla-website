/**
 * Central site configuration. Swap placeholder values (media URLs, contact
 * details) for real ones as they arrive — nothing else needs to change.
 */
export const site = {
  name: "CarsVilla",
  tagline: "India's boutique for pre-owned cars",
  locale: "en-IN",
  url: "https://carsvilla.in", // placeholder — set the real domain before launch

  phone: "+91 90000 00000",
  email: "hello@carsvilla.in",
  studio: "Vilarci",
} as const;

/**
 * Media lives on Cloudflare R2 (zero-egress). Drop the public R2 URLs in here.
 * While empty, the hero shows a refined poster fallback (no broken <video>).
 */
export const media = {
  heroVideo: "", // e.g. "https://cdn.carsvilla.in/hero-loop.mp4"
  heroVideoWebm: "", // optional smaller VP9 source
  heroPoster: "", // e.g. "https://cdn.carsvilla.in/hero-poster.jpg"
} as const;

export const primaryNav = [
  { label: "Buy Car", href: "/buy" },
  { label: "Sell your car", href: "/sell" },
  { label: "Contact us", href: "/contact" },
  { label: "About us", href: "/about" },
] as const;
