import { Eyebrow } from "./SectionHeader";

/** Consistent hero band for inner pages. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-28 md:pt-36">
      <div className="glow-brand absolute inset-x-0 top-0 h-full" />
      <div className="container-x mx-auto max-w-7xl pb-14">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.4rem)] font-bold leading-[0.98] text-paper text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted text-balance">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
