"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import { site } from "@/lib/site";
import { submitEnquiry } from "@/lib/leads";

const intents = ["Buy a car", "Sell my car", "Book a service", "Something else"];

/** ?intent= deep-link values (e.g. /contact?intent=sell from the sell flow). */
const INTENT_PARAM: Record<string, string> = {
  buy: "Buy a car",
  sell: "Sell my car",
  service: "Book a service",
  other: "Something else",
};

type Status = "idle" | "sending" | "sent" | "error";

export function EnquiryBox() {
  const [status, setStatus] = useState<Status>("idle");
  const [intent, setIntent] = useState(intents[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — humans never see it
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
    const param = new URLSearchParams(window.location.search).get("intent");
    const label = param && INTENT_PARAM[param];
    if (label) {
      const id = setTimeout(() => setIntent(label), 0);
      return () => clearTimeout(id);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    // Bot heuristics: filled honeypot or an instant submit → pretend success.
    if (website !== "" || Date.now() - mountedAt.current < 3000) {
      setStatus("sent");
      return;
    }
    setStatus("sending");
    const { ok } = await submitEnquiry({ name, phone, intentLabel: intent, message, website });
    setStatus(ok ? "sent" : "error");
  }

  function reset() {
    setStatus("idle");
    setName("");
    setPhone("");
    setMessage("");
    mountedAt.current = Date.now();
  }

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
          {status === "sent" ? (
            <div className="flex h-full min-h-[18rem] flex-col items-center justify-center text-center">
              <CheckCircle2 size={44} className="text-emerald-600" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-2xl text-ink">Enquiry received</h3>
              <p className="mt-2 max-w-sm text-muted">
                Thanks — a CarsVilla advisor will reach out shortly.
              </p>
              <button
                onClick={reset}
                className="mt-6 text-sm font-semibold text-wine underline-offset-4 hover:underline"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name">
                  <input
                    required
                    type="text"
                    minLength={2}
                    maxLength={80}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aarav Sharma"
                    className={inputCls}
                  />
                </Field>
                <Field label="Phone">
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 90000 00000"
                    className={inputCls}
                  />
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
                  maxLength={1000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us the car, budget or anything else…"
                  className={`${inputCls} resize-none`}
                />
              </Field>

              {/* Honeypot — hidden from humans, bots fill it and get rejected. */}
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              {status === "error" && (
                <p className="text-sm text-wine">
                  Couldn&apos;t send your enquiry right now — please try again, or call
                  us directly at{" "}
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-semibold underline underline-offset-4">
                    {site.phone}
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-wine px-6 py-3.5 text-sm font-semibold text-cream transition-all hover:bg-wine-hot hover:shadow-luxe disabled:opacity-40"
              >
                {status === "sending" ? "Sending…" : "Send enquiry"}
                {status !== "sending" && (
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                )}
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
