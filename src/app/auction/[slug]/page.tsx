import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allCars, getCar } from "@/lib/demo";
import { AuctionRoom } from "@/components/auction/AuctionRoom";

export function generateStaticParams() {
  return allCars.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = getCar(slug);
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
  const car = getCar(slug);
  if (!car) notFound();
  return <AuctionRoom car={car} />;
}
