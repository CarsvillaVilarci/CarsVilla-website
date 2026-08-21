import type { Metadata } from "next";
import { ProfileDashboard } from "@/components/profile/ProfileDashboard";
import { getCars } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "My Account",
  description: "Your CarsVilla dashboard — saved cars, listings, enquiries and settings.",
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  const cars = await getCars();
  return <ProfileDashboard cars={cars} />;
}
