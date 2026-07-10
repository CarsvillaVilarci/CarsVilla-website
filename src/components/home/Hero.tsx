"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

// 3D scene is loaded ONLY on desktop, and never ships to mobile bundles.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-16 md:pt-20">
      {/* atmosphere */}
      <div className="glow-brand absolute inset-x-0 top-0 h-[70vh]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(125,211,252,0.12), transparent 40%), radial-gradient(circle at 15% 70%, rgba(251,191,36,0.08), transparent 40%)",
        }}
      />

      <div className="container-x mx-auto grid max-w-7xl items-center gap-8 pb-16 pt-10 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.05fr_0.95fr] lg:pt-0">
        {/* Copy */}
        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-1.5 text-sm text-sky backdrop-blur"
          >
            <Sparkles className="h-4 w-4" /> India&apos;s premium pre-owned marketplace
          </motion.span>

          <h1 className="mt-6 font-display text-[clamp(2.8rem,7vw,5.6rem)] font-bold leading-[0.95] text-paper">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.08 }}
            >
              Sell smart.
            </motion.span>
            <motion.span
              className="block text-brand"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.16 }}
            >
              Buy certified.
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.24 }}
            >
              Drive premium.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.34 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted text-balance"
          >
            Get the best price for your car in minutes, or drive home a 200-point
            certified car with warranty. Doorstep pickup, instant payment, zero stress.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.42 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button href="/sell" size="lg">
              Sell your car <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="/buy" size="lg" variant="outline">
              Browse cars
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-8"
          >
            {[
              { n: "50k+", l: "Cars sold" },
              { n: "200-pt", l: "Inspection" },
              { n: "4.8★", l: "Rated by owners" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-2xl text-paper md:text-3xl">{s.n}</p>
                <p className="mt-1 text-xs text-muted">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Visual */}
        <div className="relative h-[46vh] min-h-[320px] lg:h-full">
          {isDesktop ? (
            <HeroScene />
          ) : (
            <MobileHeroVisual />
          )}
          <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-ink/70 px-4 py-2 text-xs text-muted backdrop-blur md:flex">
            <ShieldCheck className="h-4 w-4 text-sky" /> Every car, RC-verified &amp; certified
          </div>
        </div>
      </div>
    </section>
  );
}

/** Fast, lightweight premium hero for phones — pure CSS, no Three.js. */
function MobileHeroVisual() {
  return (
    <div className="relative grid h-full place-items-center">
      <div className="absolute h-64 w-64 rounded-full bg-brand/25 blur-[70px]" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="relative grid h-60 w-60 place-items-center rounded-full border border-line"
        style={{ boxShadow: "inset 0 0 60px rgba(255,255,255,0.06)" }}
      >
        <div className="absolute inset-6 rounded-full border border-line" />
        <div className="absolute inset-12 rounded-full border border-dashed border-line" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-24 w-3 rounded-full bg-gradient-to-b from-white/70 to-white/10"
            style={{ transform: `rotate(${i * 72}deg) translateY(-30px)` }}
          />
        ))}
        <div className="relative h-12 w-12 rounded-full bg-brand shadow-[0_0_30px_rgba(225,29,42,0.8)]" />
      </motion.div>
    </div>
  );
}
