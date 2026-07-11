import { BadgeIndianRupee, ShieldCheck, Truck, Wallet } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const reasons = [
  {
    icon: BadgeIndianRupee,
    title: "Best price, guaranteed",
    body: "Bring any genuine written offer and we'll beat it — whether you're buying or selling.",
  },
  {
    icon: ShieldCheck,
    title: "200-point inspection",
    body: "Engine, chassis, electricals and paperwork — every car is certified before it's listed.",
  },
  {
    icon: Truck,
    title: "Doorstep everything",
    body: "Evaluation, test drive, pickup and RC transfer, all handled at your home.",
  },
  {
    icon: Wallet,
    title: "Instant payment",
    body: "Sell to us and the money lands in your bank account within the hour. No delays.",
  },
];

export function WhyCarsVilla() {
  return (
    <section className="container-x py-20">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="kicker">Why CarsVilla</p>
          <h2 className="mt-3 text-[clamp(2rem,3.4vw,3.2rem)]">
            A dealership that acts like a concierge.
          </h2>
          <p className="mt-5 max-w-md text-muted">
            We built CarsVilla to strip the anxiety out of used cars — transparent
            pricing, certified quality, and a team that comes to you.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <Reveal
              key={r.title}
              delay={i * 80}
              className="rounded-[var(--radius-xl)] border border-line bg-paper p-6 shadow-soft transition-colors hover:border-wine/30"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-wine/8 text-wine">
                <r.icon size={22} strokeWidth={1.6} />
              </span>
              <h4 className="mt-5 font-display text-xl text-ink">{r.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
