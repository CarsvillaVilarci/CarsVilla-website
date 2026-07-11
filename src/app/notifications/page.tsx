import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { NotificationsList } from "@/components/notifications/NotificationsList";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Your CarsVilla alerts — price drops, enquiry replies and auction bids.",
  robots: { index: false, follow: false },
};

export default function NotificationsPage() {
  return (
    <>
      <PageHeader kicker="Your alerts" title="Notifications" />
      <NotificationsList />
    </>
  );
}
