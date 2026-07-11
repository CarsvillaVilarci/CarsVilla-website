import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How CarsVilla collects, uses and protects your personal information.",
};

const sections = [
  { h: "Information we collect", p: "When you buy, sell, enquire or bid, we collect your name, phone number, email and details about your vehicle. We may collect usage data to improve the service." },
  { h: "How we use it", p: "To provide valuations, arrange inspections and test drives, process transactions, respond to enquiries, and keep you updated about your cars and bids. We do not sell your personal data." },
  { h: "Sharing", p: "We share necessary details with verified dealers and partners (financing, insurance, RC transfer) only to complete a service you have requested." },
  { h: "Data security", p: "Your data is stored securely and access is restricted. Payments are processed over encrypted, secure channels." },
  { h: "Your rights", p: "You can request access to, correction of, or deletion of your personal data at any time by contacting us." },
  { h: "Contact", p: `Questions about this policy? Email ${site.email} or call ${site.phone}.` },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader kicker="Legal" title="Privacy Policy" subtitle="Last updated 11 July 2026. This is a preview policy and will be finalised before public launch." />
      <section className="container-x py-12">
        <div className="mx-auto max-w-3xl space-y-8">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-xl">{s.h}</h2>
              <p className="mt-2 leading-relaxed text-muted">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
