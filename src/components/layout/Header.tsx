"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, Send, User } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { HeaderCar } from "@/components/layout/HeaderCar";
import { primaryNav } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`relative sticky top-0 z-50 overflow-hidden transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(253,248,244,0.82)] shadow-[0_1px_0_var(--color-line),0_18px_40px_-32px_rgba(84,15,31,0.4)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      {/* ── Tier 1: identity · search · actions ─────────────────────── */}
      <div className="container-x relative z-10 flex items-center gap-6 py-4">
        <Link href="/" aria-label="CarsVilla home" className="shrink-0">
          <Logo />
        </Link>

        <form
          role="search"
          action="/buy"
          className="group relative ml-2 hidden max-w-md flex-1 items-center lg:flex"
        >
          <Search
            size={17}
            className="pointer-events-none absolute left-4 text-muted transition-colors group-focus-within:text-wine"
          />
          <input
            type="search"
            name="q"
            placeholder="Search Creta, Fortuner, Swift…"
            className="h-11 w-full rounded-full border border-line bg-paper/70 pl-11 pr-4 text-sm text-ink placeholder:text-muted outline-none transition-all focus:border-wine/40 focus:bg-paper focus:shadow-soft"
          />
        </form>

        <div className="ml-auto flex items-center gap-2.5">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-wine px-5 py-2.5 text-sm font-semibold text-cream transition-all hover:bg-wine-hot hover:shadow-luxe"
          >
            <Send size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            Send Enquiry
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-wine/40 hover:text-wine"
          >
            <User size={15} />
            Login
          </Link>
        </div>
      </div>

      {/* ── Tier 2: primary navigation ──────────────────────────────── */}
      <nav className="relative z-10 border-t border-line/70">
        <div className="container-x flex items-center gap-9 py-3">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="u-line text-sm font-medium tracking-wide text-ink/80 transition-colors hover:text-wine"
            >
              {item.label}
            </Link>
          ))}
          <span className="ml-auto hidden items-center gap-2 text-xs font-medium text-muted xl:flex">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Certified pre-owned · Tamluk
          </span>
        </div>
      </nav>

      {/* decorative car driving across the header (desktop only) */}
      <HeaderCar />
    </header>
  );
}
