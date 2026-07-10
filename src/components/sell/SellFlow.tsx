"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, BadgeCheck, Banknote, Car, Sparkles } from "lucide-react";
import { sellBrands } from "@/lib/cars";
import { formatINR } from "@/lib/utils";
import { Label, Input, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 15 }, (_, i) => currentYear - i);
const fuels = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];

// Rough brand tiers to make the mock valuation feel plausible.
const brandBase: Record<string, number> = {
  "Maruti Suzuki": 900000, Hyundai: 1100000, Tata: 1150000, Honda: 1200000,
  Kia: 1400000, Mahindra: 1500000, Toyota: 1700000,
};

function estimate(brand: string, year: number, km: number, owners: number) {
  const base = brandBase[brand] ?? 1000000;
  const age = Math.max(0, currentYear - year);
  const depreciation = Math.pow(0.86, age); // ~14% / yr
  const kmFactor = Math.max(0.6, 1 - km / 400000);
  const ownerFactor = owners === 1 ? 1 : owners === 2 ? 0.93 : 0.85;
  const mid = base * depreciation * kmFactor * ownerFactor;
  return { low: Math.round(mid * 0.94), high: Math.round(mid * 1.06) };
}

export function SellFlow() {
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [km, setKm] = useState<number | "">("");
  const [owners, setOwners] = useState(1);
  const [fuel, setFuel] = useState("Petrol");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  const canNext =
    (step === 0 && brand && model) ||
    (step === 1 && year && km !== "" && fuel) ||
    (step === 2 && city && phone.length >= 10);

  const quote =
    year && km !== ""
      ? estimate(brand, Number(year), Number(km), owners)
      : null;

  const steps = ["Your car", "Details", "Contact"];

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
      {/* Form */}
      <div className="rounded-[2rem] border border-line bg-surface p-8 md:p-10">
        {/* progress */}
        <div className="mb-8 flex items-center gap-3">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  i <= step ? "bg-brand text-white" : "bg-ink-2 text-muted"
                }`}
              >
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`h-px flex-1 ${i < step ? "bg-brand" : "bg-line"}`} />
              )}
            </div>
          ))}
        </div>

        {done ? (
          <SubmittedState />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-display text-2xl text-paper">{steps[step]}</h2>

              {step === 0 && (
                <div className="mt-6 grid gap-5">
                  <div>
                    <Label>Brand</Label>
                    <Select
                      value={brand}
                      onChange={(e) => { setBrand(e.target.value); setModel(""); }}
                    >
                      <option value="">Select brand</option>
                      {Object.keys(sellBrands).map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Label>Model</Label>
                    <Select value={model} onChange={(e) => setModel(e.target.value)} disabled={!brand}>
                      <option value="">{brand ? "Select model" : "Choose brand first"}</option>
                      {brand && sellBrands[brand]?.map((m) => <option key={m}>{m}</option>)}
                    </Select>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label>Year</Label>
                    <Select value={year} onChange={(e) => setYear(Number(e.target.value))}>
                      <option value="">Select year</option>
                      {years.map((y) => <option key={y}>{y}</option>)}
                    </Select>
                  </div>
                  <div>
                    <Label>KM driven</Label>
                    <Input
                      type="number" inputMode="numeric" placeholder="e.g. 32000"
                      value={km} onChange={(e) => setKm(e.target.value === "" ? "" : Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Fuel type</Label>
                    <Select value={fuel} onChange={(e) => setFuel(e.target.value)}>
                      {fuels.map((f) => <option key={f}>{f}</option>)}
                    </Select>
                  </div>
                  <div>
                    <Label>Owners</Label>
                    <Select value={owners} onChange={(e) => setOwners(Number(e.target.value))}>
                      <option value={1}>1st owner</option>
                      <option value={2}>2nd owner</option>
                      <option value={3}>3rd owner or more</option>
                    </Select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="mt-6 grid gap-5">
                  <div>
                    <Label>City</Label>
                    <Input placeholder="e.g. Bengaluru" value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>
                  <div>
                    <Label>Mobile number</Label>
                    <Input
                      type="tel" inputMode="numeric" placeholder="10-digit mobile"
                      value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    />
                  </div>
                  <p className="text-xs text-muted">
                    By continuing you agree to receive a call from a CarsVilla advisor. Demo only — no data is stored.
                  </p>
                </div>
              )}

              <div className="mt-8 flex gap-3">
                {step > 0 && (
                  <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                )}
                {step < 2 ? (
                  <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext} className="flex-1">
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={() => setDone(true)} disabled={!canNext} className="flex-1">
                    Get my price <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Live quote panel */}
      <div className="lg:sticky lg:top-24 lg:h-fit">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-surface to-ink p-8">
          <div className="glow-brand absolute inset-0" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-sky">
              <Sparkles className="h-3.5 w-3.5" /> Live estimate
            </span>
            {quote ? (
              <>
                <p className="mt-6 text-sm text-muted">Estimated selling price</p>
                <p className="mt-1 font-display text-4xl text-paper">
                  {formatINR(quote.low)} – {formatINR(quote.high)}
                </p>
                <p className="mt-2 text-sm text-muted">
                  {brand} {model} {year && `· ${year}`}
                </p>
              </>
            ) : (
              <>
                <p className="mt-6 font-display text-3xl leading-tight text-paper">
                  Fill in your car details for an instant price
                </p>
                <p className="mt-3 text-muted">
                  Our pricing engine values your car against thousands of live market data points.
                </p>
              </>
            )}

            <div className="mt-8 space-y-4 border-t border-line pt-6">
              {[
                { Icon: Banknote, t: "Same-day payment", d: "Money in your account instantly" },
                { Icon: Car, t: "Free doorstep pickup", d: "We come to you, anywhere in the city" },
                { Icon: BadgeCheck, t: "No hidden charges", d: "The price we quote is what you get" },
              ].map((f) => (
                <div key={f.t} className="flex gap-3">
                  <f.Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <p className="font-semibold text-paper">{f.t}</p>
                    <p className="text-sm text-muted">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubmittedState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-8 text-center"
    >
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand/15 text-brand">
        <BadgeCheck className="h-8 w-8" />
      </div>
      <h2 className="mt-6 font-display text-3xl text-paper">You&apos;re all set!</h2>
      <p className="mx-auto mt-3 max-w-sm text-muted">
        A CarsVilla advisor will call you shortly to confirm your car&apos;s final price and
        schedule a free doorstep evaluation.
      </p>
      <p className="mt-6 text-xs text-muted">Demo submission — no data was stored.</p>
    </motion.div>
  );
}
