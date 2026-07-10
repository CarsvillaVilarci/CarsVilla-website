"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav } from "@/lib/site";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-line/80 bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="container-x mx-auto flex h-16 max-w-7xl items-center justify-between md:h-20">
        <Link href="/" className="relative z-10">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "text-paper" : "text-muted hover:text-paper"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/8 ring-hairline"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/profile"
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-brand hover:text-brand sm:flex"
            aria-label="Profile"
          >
            <User className="h-5 w-5" />
          </Link>
          <Button href="/sell" size="sm" className="hidden sm:inline-flex">
            Sell your car
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-paper lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-x mx-auto flex max-w-7xl flex-col gap-1 py-5">
              {[...nav, { label: "Profile", href: "/profile" }].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={item.href}
                    className="block rounded-2xl px-4 py-3 text-lg font-medium text-paper hover:bg-white/5"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Button href="/sell" className="mt-3 w-full">
                Sell your car
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
