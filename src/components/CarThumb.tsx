import { cn } from "@/lib/utils";
import type { Car } from "@/lib/cars";

/** A clean side-profile car silhouette (SUV-ish, works for all body types). */
function CarSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 240" className={className} aria-hidden fill="currentColor">
      <path d="M40 176c-9 0-16-7-16-16v-14c0-8 5-15 13-17l58-16 44-42c8-8 19-12 30-12h120c9 0 18 3 25 9l52 41 96 12c22 3 39 21 42 43l2 12c1 9-6 17-15 17h-40a34 34 0 00-68 0H172a34 34 0 00-68 0H40z" />
      <circle cx="138" cy="176" r="26" fill="#0a0a0c" />
      <circle cx="138" cy="176" r="12" fill="currentColor" />
      <circle cx="450" cy="176" r="26" fill="#0a0a0c" />
      <circle cx="450" cy="176" r="12" fill="currentColor" />
    </svg>
  );
}

export function CarThumb({
  car,
  className,
  rounded = "rounded-2xl",
}: {
  car: Car;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden ring-hairline",
        rounded,
        className
      )}
      style={{
        backgroundImage: `radial-gradient(120% 120% at 20% 0%, ${car.accent}55, transparent 55%), linear-gradient(160deg, #16161c, #0a0a0c)`,
      }}
    >
      {/* grid texture */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage: "radial-gradient(80% 80% at 50% 40%, #000, transparent)",
        }}
      />
      {/* accent glow */}
      <div
        className="absolute -bottom-16 left-1/2 h-40 w-3/4 -translate-x-1/2 blur-2xl"
        style={{ background: car.accent, opacity: 0.35 }}
      />
      {/* the car, tinted with its accent colour */}
      <div className="absolute inset-0" style={{ color: car.accent }}>
        <CarSilhouette className="absolute bottom-[15%] left-1/2 w-[78%] -translate-x-1/2 opacity-95 drop-shadow-[0_18px_25px_rgba(0,0,0,0.55)]" />
      </div>
      {/* top shine */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent" />
    </div>
  );
}
