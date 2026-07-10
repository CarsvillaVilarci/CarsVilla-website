import { cn } from "@/lib/utils";

/** CarsVilla wordmark with a speed-mark motif. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-brand shadow-[0_8px_24px_-8px_rgba(225,29,42,0.9)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M3 15l2-6a3 3 0 013-2h8a3 3 0 013 2l2 6M6 15h12M7 15v2M17 15v2"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-paper">
        Cars<span className="text-brand">Villa</span>
      </span>
    </span>
  );
}
