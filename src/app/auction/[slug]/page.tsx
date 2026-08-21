import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCarBySlug, getCars } from "@/lib/catalogue";
import { AuctionRoom } from "@/components/auction/AuctionRoom";

export async function generateStaticParams() {
  return (await getCars()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) return { title: "Auction" };
  const title = `${car.year} ${car.make} ${car.model} — live auction`;
  return {
    title,
    description: `Bid live on this ${car.year} ${car.make} ${car.model} at CarsVilla. Verified dealers and CarsVilla compete — the highest bid wins.`,
  };
}

export default async function AuctionCarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) notFound();
  return <AuctionRoom car={car} />;
}
