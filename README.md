# CarsVilla

India's premium used-car marketplace — buy certified pre-owned cars, sell your car
in minutes at the best price, and get RC transfer, insurance & financing in one place.

> **Demo build.** Frontend only, with mock data. Backend (Supabase) and real vehicle
> APIs are planned for later phases.

## Tech stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** — custom luxury-automotive design system
- **React Three Fiber / three** — 3D hero (desktop only, lazy-loaded)
- **Framer Motion** + **Lenis** — animation & smooth scroll
- **lucide-react** — icons

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

> The 3D hero renders on desktop-width screens (≥1024px). Mobile gets a fast,
> lightweight animated hero — same URL, device-detected.

## Build

```bash
npm run build    # static export → ./out
```

## Deployment

- **Now:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`).
  Static export with `basePath` set for the project subpath.
- **Planned:** Cloudflare Pages for production (custom domain, edge, optional SSR).

## Project structure

```
src/
  app/          # routes: home, buy, buy/[slug], sell, services, lookup, profile, about, contact
  components/   # UI, layout, home sections, feature widgets
  lib/          # mock data (cars, services), site config, SEO helpers, utils
```

## SEO

Per-page metadata, JSON-LD (AutoDealer, Vehicle, Breadcrumb, FAQ), dynamic
`sitemap.xml` and `robots.txt`, semantic HTML, and Core-Web-Vitals-safe 3D.

---

Crafted & powered by **Vilarci**.
