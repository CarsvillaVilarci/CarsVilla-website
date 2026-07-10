import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { orgJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Buy & Sell Used Cars in India | Certified Pre-Owned`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "used cars", "sell my car", "buy used cars India", "certified pre-owned cars",
    "second hand cars", "car valuation", "sell car online", "used car dealer",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Buy & Sell Used Cars in India`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Buy & Sell Used Cars in India`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${bricolage.variable} ${manrope.variable}`}>
      <body className="grain min-h-screen antialiased">
        <JsonLd data={orgJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
