import Link from "next/link";
import { Bell, MapPin, Search } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { HeaderCar } from "@/components/layout/HeaderCar";

/** Compact app-style top bar: identity + location, then a prominent search. */
export function MobileHeader() {
  return (
    <header className="relative sticky top-0 z-40 overflow-hidden border-b border-line bg-[rgba(253,248,244,0.9)] backdrop-blur-xl">
      <div className="relative z-10 flex items-center justify-between px-4 pb-2 pt-3">
        <Link href="/" aria-label="CarsVilla home">
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink">
            <MapPin size={13} className="text-wine" /> Tamluk
          </span>
          <Link
            href="/notifications"
            aria-label="Notifications"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink"
          >
            <Bell size={17} />
          </Link>
        </div>
      </div>

      <form role="search" action="/buy" className="relative z-10 px-4 pb-5">
        <Search size={17} className="pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="search"
          name="q"
          placeholder="Search Creta, Fortuner, Swift…"
          className="h-11 w-full rounded-full border border-line bg-paper pl-11 pr-4 text-sm text-ink placeholder:text-muted outline-none focus:border-wine/40"
        />
      </form>

      {/* decorative traffic along the header base (slower on small screens) */}
      <HeaderCar variant="mobile" />
    </header>
  );
}
