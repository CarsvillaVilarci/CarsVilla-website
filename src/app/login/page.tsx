import type { Metadata } from "next";
import { BadgeIndianRupee, Heart, ShieldCheck } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login or Sign up",
  description: "Log in or create your CarsVilla account to save cars, track enquiries and manage your listings.",
  robots: { index: false, follow: false },
};

const perks = [
  { icon: Heart, text: "Save cars to your shortlist" },
  { icon: BadgeIndianRupee, text: "Track your sell-car valuation" },
  { icon: ShieldCheck, text: "Manage enquiries in one place" },
];

export default function LoginPage() {
  return (
    <div className="grid min-h-[calc(100vh-8rem)] lg:grid-cols-2">
      {/* Left — brand panel (desktop) */}
      <div className="relative hidden overflow-hidden bg-wine p-12 text-cream lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <p className="kicker text-gold">CarsVilla · Tamluk</p>
        <div>
          <h2 className="max-w-sm text-[clamp(2rem,3vw,2.8rem)] text-cream">
            The refined way to buy &amp; sell your car.
          </h2>
          <ul className="mt-8 space-y-4">
            {perks.map((p) => (
              <li key={p.text} className="flex items-center gap-3 text-cream/85">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10">
                  <p.icon size={17} />
                </span>
                {p.text}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-cream/50">Crafted by Vilarci</p>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center px-5 py-14">
        <LoginForm />
      </div>
    </div>
  );
}
