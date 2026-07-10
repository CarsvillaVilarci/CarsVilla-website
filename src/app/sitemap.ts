import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { cars } from "@/lib/cars";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/buy", "/sell", "/services", "/lookup", "/about", "/contact"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const carRoutes = cars.map((c) => ({
    url: `${site.url}/buy/${c.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [...routes, ...carRoutes];
}
