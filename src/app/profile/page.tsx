import type { Metadata } from "next";
import { ProfileDashboard } from "@/components/profile/ProfileDashboard";

export const metadata: Metadata = {
  title: "My Account",
  description: "Your CarsVilla dashboard — saved cars, listings, enquiries and settings.",
  robots: { index: false, follow: false },
};

export default function ProfilePage() {
  return <ProfileDashboard />;
}
