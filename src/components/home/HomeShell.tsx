"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Acquired, Brand, Car } from "@/lib/cars";

/** Live catalogue slices, fetched at build time by app/page.tsx. */
export type HomeData = {
  featured: Car[];
  brands: Brand[];
  acquisitions: Acquired[];
};

/**
 * Device-split home. Detects the viewport once on the client and dynamically
 * imports ONLY the matching tree — the desktop content chunk never downloads
 * on phones, and the mobile chunk never downloads on desktop. Keeps each
 * device light. (On Cloudflare later this can move to edge UA detection.)
 *
 * A small SSR/first-paint hero keeps content on screen (and crawlable) while
 * the matched chunk loads.
 */
const DesktopHome = dynamic(() => import("@/components/home/DesktopHome"), {
  ssr: false,
  loading: () => <HomeFallback />,
});
const MobileHome = dynamic(() => import("@/components/mobile/MobileHome"), {
  ssr: false,
  loading: () => <HomeFallback />,
});

export function HomeShell(data: HomeData) {
  const [device, setDevice] = useState<"desktop" | "mobile" | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setDevice(mq.matches ? "desktop" : "mobile");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (device === null) return <HomeFallback />;
  return device === "desktop" ? <DesktopHome {...data} /> : <MobileHome {...data} />;
}

/** Lightweight, always-available hero used for first paint + SEO baseline. */
function HomeFallback() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="kicker">Boutique pre-owned cars · India</p>
      <h1 className="mt-5 max-w-3xl text-balance text-[clamp(2.2rem,7vw,4rem)]">
        The refined way to <em className="not-italic text-gold">buy &amp; sell</em> your car.
      </h1>
      <p className="mt-5 max-w-md text-balance text-muted">
        Best price guaranteed, a 200-point inspection on every car, and paperwork
        handled at your doorstep.
      </p>
    </section>
  );
}
