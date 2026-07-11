import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

/** Branded, animated 404 — a spinning alloy wheel stands in for the "0". */
export default function NotFound() {
  return (
    <section className="glow-wine relative flex min-h-[calc(100vh-9rem)] items-center justify-center overflow-hidden px-5 py-20 text-center">
      {/* soft floating accents */}
      <span className="float-soft pointer-events-none absolute left-[12%] top-[22%] h-2 w-2 rounded-full bg-gold/60" aria-hidden />
      <span className="float-soft pointer-events-none absolute right-[16%] top-[30%] h-3 w-3 rounded-full bg-wine/20 [animation-delay:1.2s]" aria-hidden />
      <span className="float-soft pointer-events-none absolute bottom-[24%] left-[20%] h-2.5 w-2.5 rounded-full bg-wine/15 [animation-delay:.6s]" aria-hidden />

      <div className="relative w-full max-w-xl">
        {/* 4 ⊙ 4 */}
        <div className="float-soft flex items-center justify-center gap-3 sm:gap-6">
          <span className="rise font-display text-[clamp(6rem,22vw,13rem)] leading-none text-wine [animation-delay:.05s]">
            4
          </span>

          <span className="rise [animation-delay:.2s]">
            <Wheel />
          </span>

          <span className="rise font-display text-[clamp(6rem,22vw,13rem)] leading-none text-wine [animation-delay:.35s]">
            4
          </span>
        </div>

        {/* moving road */}
        <div className="mx-auto mt-2 h-[3px] w-3/4 overflow-hidden rounded-full opacity-70">
          <div className="nf-road h-full w-full" />
        </div>

        <h1 className="rise mt-9 text-[clamp(1.8rem,4vw,2.8rem)] [animation-delay:.5s]">
          You&apos;ve taken a wrong turn.
        </h1>
        <p className="rise mx-auto mt-4 max-w-md text-balance text-muted [animation-delay:.62s]">
          This page doesn&apos;t exist — but the road home is clear. Let&apos;s get you back
          to the cars.
        </p>

        <div className="rise mt-8 flex flex-wrap items-center justify-center gap-3 [animation-delay:.74s]">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-wine px-6 py-3 text-sm font-semibold text-cream transition-all hover:bg-wine-hot hover:shadow-luxe"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to home
          </Link>
          <Link
            href="/buy"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-wine transition-colors hover:border-wine/40"
          >
            <Search size={16} />
            Browse cars
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Alloy-wheel SVG that spins continuously. */
function Wheel() {
  const spokes = [0, 72, 144, 216, 288];
  return (
    <svg
      viewBox="0 0 100 100"
      className="wheel-spin h-[clamp(6rem,22vw,13rem)] w-[clamp(6rem,22vw,13rem)] drop-shadow-[0_20px_30px_rgba(84,15,31,0.35)]"
      role="img"
      aria-label="0"
    >
      {/* tyre */}
      <circle cx="50" cy="50" r="48" fill="#17110f" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#2a1c1c" strokeWidth="5" />
      {/* rim */}
      <circle cx="50" cy="50" r="35" fill="var(--color-wine)" />
      {/* spokes */}
      <g fill="#fdf8f4">
        {spokes.map((deg) => (
          <rect
            key={deg}
            x="45.5"
            y="17"
            width="9"
            height="30"
            rx="4.5"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}
      </g>
      {/* hub */}
      <circle cx="50" cy="50" r="10" fill="#fdf8f4" />
      <circle cx="50" cy="50" r="4.5" fill="var(--color-wine)" />
    </svg>
  );
}
