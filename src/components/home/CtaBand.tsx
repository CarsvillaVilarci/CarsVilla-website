import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function CtaBand() {
  return (
    <section className="container-x mx-auto max-w-7xl py-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-gradient-to-br from-surface to-ink p-10 md:p-16">
          <div className="glow-brand absolute inset-0" />
          <div
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "rgba(225,29,42,0.25)" }}
          />
          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.02] text-paper text-balance">
                Ready to get the best price for your car?
              </h2>
              <p className="mt-4 text-lg text-muted">
                Free valuation in 60 seconds. No obligation, no spam — just an honest,
                data-backed price for your car.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button href="/sell" size="lg">
                Get car value <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="/lookup" size="lg" variant="outline">
                Check RC details
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
