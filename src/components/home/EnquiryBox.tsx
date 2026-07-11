"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import { site } from "@/lib/site";

const intents = ["Buy a car", "Sell my car", "Book a service", "Something else"];

export function EnquiryBox() {
  const [sent, setSent] = useState(false);
  const [intent, setIntent] = useState(intents[0]);

  return (
    <section className="container-x py-20">
      <div className="overflow-hidden rounded-[var(--radius-2xl)] border border-line bg-paper shadow-luxe lg:grid lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left — wine info panel */}
        <div className="relative overflow-hidden bg-wine p-9 text-cream md:p-11">
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <p className="kicker text-gold">Send an enquiry</p>
          <h2 className="mt-4 text-[clamp(1.9rem,2.6vw,2.6rem)] text-cream">
            Tell us what you need. We&apos;ll call within the hour.
          </h2>
          <p className="mt-4 max-w-sm text-cream/70">
            One form for buying, selling or servicing — a real CarsVilla advisor
            takes it from here, no call centres.
          </p>
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-cream/25 px-5 py-3 text-sm font-semibold transition-colors hover:bg-cream/10"
          >
            <PhoneCall size={16} className="text-gold" />
            {site.phone}
          </a>
        </div>

        {/* Right — form */}
        <div className="p-9 md:p-11">
          {sent ? (
            <div className="flex h-full min-h-[18rem] flex-col items-center justify-center text-center">
              <CheckCircle2 size={44} className="text-emerald-600" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-2xl text-ink">Enquiry received</h3>
              <p className="mt-2 max-w-sm text-muted">
                Thanks — a CarsVilla advisor will reach out shortly. (Demo form:
                nothing is stored yet.)
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 text-sm font-semibold text-wine underline-offset-4 hover:underline"
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="grid gap-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name">
                  <input required type="text" placeholder="Aarav Sharma" className={inputCls} />
                </Field>
                <Field label="Phone">
                  <input required type="tel" placeholder="+91 90000 00000" className={inputCls} />
                </Field>
              </div>

              <Field label="I want to">
                <div className="flex flex-wrap gap-2">
                  {intents.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setIntent(opt)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        intent === opt
                          ? "border-wine bg-wine text-cream"
                          : "border-line text-ink hover:border-wine/40"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Message (optional)">
                <textarea
                  rows={3}
                  placeholder="Tell us the car, budget or anything else…"
                  className={`${inputCls} resize-none`}
                />
              </Field>

              <button
                type="submit"
                className="group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-wine px-6 py-3.5 text-sm font-semibold text-cream transition-all hover:bg-wine-hot hover:shadow-luxe"
              >
                Send enquiry
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-line bg-cream/50 px-4 py-3 text-sm text-ink placeholder:text-muted outline-none transition-all focus:border-wine/40 focus:bg-paper";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
