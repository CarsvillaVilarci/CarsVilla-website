import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { media } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  const hasVideo = Boolean(media.heroVideo);

  return (
    <section className="glow-wine relative pt-10 pb-16">
      <div className="container-x">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="kicker">Boutique pre-owned cars · India</p>
          <h1 className="mt-5 text-balance text-[clamp(2.6rem,5.2vw,5rem)]">
            The refined way to <em className="not-italic text-gold">buy &amp; sell</em> your car.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-[1.05rem] leading-relaxed text-muted">
            Best price guaranteed, a 200-point inspection on every car, and
            paperwork handled at your doorstep — the CarsVilla standard.
          </p>
        </Reveal>

        {/* 90%-width cinematic hero video */}
        <Reveal delay={120} className="relative mx-auto mt-12 w-[90%]">
          <div className="relative aspect-[21/9] overflow-hidden rounded-[var(--radius-2xl)] border border-line bg-wine shadow-luxe">
            {hasVideo ? (
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={media.heroPoster || undefined}
              >
                <source src={media.heroVideo} type="video/mp4" />
                {media.heroVideoWebm && (
                  <source src={media.heroVideoWebm} type="video/webm" />
                )}
              </video>
            ) : (
              /* Refined placeholder shown until the R2 video URL is set */
              <div className="hero-fallback h-full w-full" aria-hidden>
                <span className="absolute inset-0 grid place-items-center">
                  <span className="flex items-center gap-3 rounded-full border border-white/20 bg-black/20 px-5 py-2.5 text-sm font-medium text-cream/90 backdrop-blur">
                    <Play size={15} className="fill-current" />
                    Showreel — R2 video loads here
                  </span>
                </span>
              </div>
            )}

            {/* legibility wash + caption overlay */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-9">
              <p className="max-w-sm font-display text-[1.4rem] leading-tight text-cream">
                Every car, inspected. Every deal, in your favour.
              </p>
              <div className="pointer-events-auto flex shrink-0 gap-3">
                <Link
                  href="/buy"
                  className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-wine transition-transform hover:-translate-y-0.5"
                >
                  Browse cars
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  href="/sell"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
                >
                  Sell your car
                </Link>
              </div>
            </div>
          </div>

          {/* floating stat chips */}
          <div className="absolute -left-3 top-8 hidden rotate-[-4deg] rounded-2xl border border-line bg-paper px-4 py-3 shadow-luxe lg:block">
            <p className="font-display text-2xl text-wine">4,200+</p>
            <p className="text-xs text-muted">cars re-homed</p>
          </div>
          <div className="absolute -right-3 bottom-16 hidden rotate-[4deg] rounded-2xl border border-line bg-paper px-4 py-3 shadow-luxe lg:block">
            <p className="font-display text-2xl text-wine">60 min</p>
            <p className="text-xs text-muted">sell &amp; get paid</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
