import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { BottomNav } from "@/components/mobile/BottomNav";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Buy and sell certified pre-owned cars with CarsVilla. Best price guaranteed, 200-point inspection, doorstep paperwork and instant payment.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${fraunces.variable} ${manrope.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="grain min-h-screen antialiased">
        {/* Desktop chrome (≥1024px) */}
        <div className="hidden lg:contents">
          <Header />
        </div>
        {/* Mobile app chrome (<1024px) */}
        <div className="lg:hidden">
          <MobileHeader />
        </div>

        <main className="pb-24 lg:pb-0">{children}</main>

        <div className="hidden lg:contents">
          <Footer />
        </div>
        <div className="lg:hidden">
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
