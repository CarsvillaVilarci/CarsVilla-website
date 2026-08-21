import Link from "next/link";
import { brandHref, type Brand } from "@/lib/cars";

/**
 * Infinite horizontal brand scroller. Each brand deep-links to /buy pre-filtered
 * (e.g. clicking Toyota → /buy?brand=toyota). Pure-CSS marquee, pauses on hover.
 */
export function BrandMarquee({ brands }: { brands: Brand[] }) {
  const loop = [...brands, ...brands];

  return (
    <section aria-label="Shop by brand" className="border-y border-line/70 py-6">
      <div className="marquee-mask relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track items-center gap-3">
          {loop.map((brand, i) => (
            <Link
              key={`${brand.slug}-${i}`}
              href={brandHref(brand.slug)}
              className="group flex shrink-0 items-center gap-2 rounded-full border border-transparent px-5 py-2 transition-colors hover:border-line hover:bg-paper"
            >
              <span className="font-display text-xl text-ink/55 transition-colors group-hover:text-wine">
                {brand.name}
              </span>
              <span className="h-1 w-1 rounded-full bg-gold/60" aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
