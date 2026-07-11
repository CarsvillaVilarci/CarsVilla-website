import { Reveal } from "@/components/ui/Reveal";

/** Shared hero band for inner pages. */
export function PageHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="glow-wine border-b border-line/70">
      <div className="container-x py-14 md:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="kicker">{kicker}</p>
          <h1 className="mt-4 text-balance text-[clamp(2.2rem,5vw,4rem)]">{title}</h1>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-xl text-balance text-[1.05rem] leading-relaxed text-muted">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
