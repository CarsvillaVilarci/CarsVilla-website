import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProfileDashboard } from "@/components/profile/ProfileDashboard";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your saved cars, listings, enquiries and account details on CarsVilla.",
  robots: { index: false, follow: false }, // private page — keep out of search
  alternates: { canonical: "/profile" },
};

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        eyebrow="My account"
        title="Welcome back, Rahul"
        subtitle="Track your saved cars, listings and enquiries — all in one place."
      />
      <section className="container-x mx-auto max-w-7xl py-14">
        <ProfileDashboard />
      </section>
    </>
  );
}
