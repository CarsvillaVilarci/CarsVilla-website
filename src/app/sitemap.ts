import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getCars } from "@/lib/catalogue";

// force-static so it's emitted during `next build` static export
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url;
  const staticRoutes = ["", "/buy", "/sell", "/services", "/auction", "/about", "/contact", "/faqs", "/privacy", "/careers"];

  const pages: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${base}${r}`,
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.8,
  }));

  const cars: MetadataRoute.Sitemap = (await getCars()).flatMap((c) => [
    { url: `${base}/buy/${c.slug}`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/auction/${c.slug}`, changeFrequency: "hourly", priority: 0.6 },
  ]);

  return [...pages, ...cars];
}
