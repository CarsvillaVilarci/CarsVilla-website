import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand",
        className
      )}
    >
      <span className="h-px w-8 bg-brand" />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow className={align === "center" ? "justify-center" : ""}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1] text-paper text-balance">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-lg leading-relaxed text-muted text-balance">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
