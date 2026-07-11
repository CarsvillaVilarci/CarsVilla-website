import { site } from "@/lib/site";

/** Wordmark + monogram. Pure SVG/CSS — swap for the client's real logo later. */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 select-none">
      <span
        aria-hidden
        className="relative grid h-9 w-9 place-items-center rounded-[0.7rem] bg-wine text-cream shadow-soft"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
          {/* stylised car silhouette */}
          <path
            d="M3 14.5c0-.7.4-1.3 1-1.6l1.7-3.3C6 8.9 6.6 8.5 7.3 8.5h9.4c.7 0 1.3.4 1.6 1.1l1.7 3.3c.6.3 1 .9 1 1.6V17a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-.5H6V17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2.5Z"
            fill="currentColor"
          />
          <circle cx="7.5" cy="15" r="1.1" fill="var(--color-wine)" />
          <circle cx="16.5" cy="15" r="1.1" fill="var(--color-wine)" />
        </svg>
      </span>
      {!compact && (
        <span
          className="font-display text-[1.35rem] leading-none tracking-tight text-wine"
          style={{ fontWeight: 600 }}
        >
          {site.name}
        </span>
      )}
    </span>
  );
}
