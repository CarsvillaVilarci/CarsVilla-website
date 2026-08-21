import { HomeShell } from "@/components/home/HomeShell";
import { getCars } from "@/lib/catalogue";
import { brandsOf, featuredCars } from "@/lib/cars";
import { recentAcquisitions } from "@/lib/content";

export default async function Home() {
  const cars = await getCars();

  return (
    <HomeShell
      featured={featuredCars(cars)}
      brands={brandsOf(cars)}
      acquisitions={recentAcquisitions}
    />
  );
}
