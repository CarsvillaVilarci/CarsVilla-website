"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BadgeIndianRupee, CalendarCheck, RotateCcw } from "lucide-react";
import { brands, fuels, transmissions, formatINR } from "@/lib/demo";
import { submitSellRequest } from "@/lib/leads";
import { site } from "@/lib/site";

type Fields = {
  brand: string;
  model: string;
  year: string;
  fuel: string;
  transmission: string;
  km: string;
  owner: string;
  condition: string;
  city: string;
  name: string;
  phone: string;
};

const EMPTY: Fields = {
  brand: "",
  model: "",
  year: "",
  fuel: "Petrol",
  transmission: "Manual",
  km: "",
  owner: "First",
  condition: "Good",
  city: "Tamluk",
  name: "",
  phone: "",
};

const YEARS = Array.from({ length: 17 }, (_, i) => 2026 - i);
const CITIES = ["Tamluk", "Haldia", "Mecheda", "Panskura", "Contai", "Kolkata"];
const OWNERS = ["First", "Second", "Third+"];
const CONDITIONS = ["Excellent", "Good", "Fair"];

const BRAND_BASE: Record<string, number> = {
  "Maruti Suzuki": 700000, Hyundai: 950000, Tata: 800000, Mahindra: 900000,
  Toyota: 1200000, Honda: 950000, Kia: 1000000, Volkswagen: 900000,
  Skoda: 950000, MG: 1000000, BMW: 2600000, "Mercedes-Benz": 2800000,
  Audi: 2600000, Renault: 650000,
};

function valuate(f: Fields): { low: number; high: number } {
  const base = BRAND_BASE[f.brand] ?? 800000;
  const age = Math.max(0, 2026 - (Number(f.year) || 2026));
  const yearF = Math.max(0.3, 1 - age * 0.08);
  const kmF = Math.max(0.5, 1 - (Number(f.km) || 0) / 100000 * 0.15);
  const condF = f.condition === "Excellent" ? 1 : f.condition === "Fair" ? 0.78 : 0.9;
  const ownF = f.owner === "First" ? 1 : f.owner === "Third+" ? 0.85 : 0.93;
  const fuelF = f.fuel === "Diesel" ? 1.02 : f.fuel === "Electric" ? 1.05 : f.fuel === "CNG" ? 0.95 : 1;
  const mid = base * yearF * kmF * condF * ownF * fuelF;
  const round = (n: number) => Math.round(n / 10000) * 10000;
  return { low: round(mid * 0.94), high: round(mid * 1.06) };
}

const STEPS = ["Your car", "Condition", "Your details"];

export function SellFlow() {
  const [step, setStep] = useState(0);
  const [f, setF] = useState<Fields>(EMPTY);
  const [quote, setQuote] = useState<{ low: number; high: number } | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const set = (k: keyof Fields, v: string) => setF((prev) => ({ ...prev, [k]: v }));

  async function getPrice() {
    if (!canNext || saving) return;
    const q = valuate(f);
    // An instant three-step run is a bot — show the quote, skip the save.
    if (Date.now() - mountedAt.current < 3000) {
      setQuote(q);
      return;
    }
    setSaving(true);
    const { ok } = await submitSellRequest({
      ...f,
      quoteLow: q.low,
      quoteHigh: q.high,
      website: "",
    });
    // The quote is client-computed: never let a failed save block it.
    setSaveFailed(!ok);
    setSaving(false);
    setQuote(q);
  }

  const canNext =
    step === 0
      ? f.brand && f.model.trim() && f.year
      : step === 1
        ? f.km.trim()
        : f.name.trim() && f.phone.replace(/\D/g, "").length >= 10;

  if (quote) {
    return (
      <div className="rounded-[var(--radius-2xl)] border border-line bg-paper p-8 shadow-luxe md:p-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-wine/8 px-3 py-1 text-xs font-semibold text-wine">
          <BadgeIndianRupee size={14} /> Estimated value
        </span>
        <p className="mt-5 text-sm text-muted">Your {f.year} {f.brand} {f.model} could fetch</p>
        <p className="mt-1 font-display text-[clamp(2.2rem,6vw,3.4rem)] leading-none text-wine">
          {formatINR(quote.low)} – {formatINR(quote.high)}
        </p>
        <p className="mt-4 max-w-md text-sm text-muted">
          This is an instant estimate. Book a free 60-minute doorstep inspection to lock your exact
          price and get paid on the spot.
        </p>
        {saveFailed && (
          <p className="mt-3 max-w-md text-sm text-wine">
            We couldn&apos;t save your request just now — book below anyway, or call us at{" "}
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-semibold underline underline-offset-4">
              {site.phone}
            </a>{" "}
            and quote this estimate.
          </p>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/contact?intent=sell"
            className="inline-flex items-center gap-2 rounded-full bg-wine px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-wine-hot"
          >
            <CalendarCheck size={16} /> Book free pickup
          </Link>
          <button
            onClick={() => {
              setQuote(null);
              setStep(0);
              setF(EMPTY);
              setSaveFailed(false);
              mountedAt.current = Date.now();
            }}
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-ink hover:border-wine/40"
          >
            <RotateCcw size={15} /> Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-2xl)] border border-line bg-paper p-6 shadow-luxe md:p-8">
      {/* progress */}
      <ol className="mb-7 flex items-center gap-2">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                i <= step ? "bg-wine text-cream" : "border border-line text-muted"
              }`}
            >
              {i + 1}
            </span>
            <span className={`hidden text-sm font-medium sm:block ${i === step ? "text-ink" : "text-muted"}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && <span className="h-px flex-1 bg-line" />}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="space-y-5">
          <Row>
            <Field label="Brand">
              <Select value={f.brand} onChange={(v) => set("brand", v)} placeholder="Select brand">
                {brands.map((b) => (
                  <option key={b.slug} value={b.name}>{b.name}</option>
                ))}
              </Select>
            </Field>
            <Field label="Model">
              <input className={input} value={f.model} onChange={(e) => set("model", e.target.value)} placeholder="e.g. Creta" />
            </Field>
          </Row>
          <Row>
            <Field label="Year">
              <Select value={f.year} onChange={(v) => set("year", v)} placeholder="Select year">
                {YEARS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </Select>
            </Field>
            <Field label="Fuel">
              <Chips value={f.fuel} onChange={(v) => set("fuel", v)} options={fuels} />
            </Field>
          </Row>
          <Field label="Transmission">
            <Chips value={f.transmission} onChange={(v) => set("transmission", v)} options={transmissions} />
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <Field label="Kilometers driven">
            <input
              className={input}
              inputMode="numeric"
              value={f.km}
              onChange={(e) => set("km", e.target.value.replace(/[^\d]/g, ""))}
              placeholder="e.g. 42000"
            />
          </Field>
          <Field label="Ownership">
            <Chips value={f.owner} onChange={(v) => set("owner", v)} options={OWNERS} />
          </Field>
          <Field label="Overall condition">
            <Chips value={f.condition} onChange={(v) => set("condition", v)} options={CONDITIONS} />
          </Field>
          <Field label="City">
            <Select value={f.city} onChange={(v) => set("city", v)}>
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <Field label="Full name">
            <input className={input} value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Aarav Sharma" />
          </Field>
          <Field label="Phone">
            <input
              className={input}
              type="tel"
              value={f.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+91 90000 00000"
            />
          </Field>
          <p className="text-xs text-muted">We&apos;ll only use this to share your valuation and schedule pickup.</p>
        </div>
      )}

      {/* nav */}
      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-wine">
            <ArrowLeft size={16} /> Back
          </button>
        ) : (
          <span />
        )}
        {step < STEPS.length - 1 ? (
          <button
            onClick={() => canNext && setStep((s) => s + 1)}
            disabled={!canNext}
            className="inline-flex items-center gap-2 rounded-full bg-wine px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-wine-hot disabled:opacity-40"
          >
            Continue <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={getPrice}
            disabled={!canNext || saving}
            className="inline-flex items-center gap-2 rounded-full bg-wine px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-wine-hot disabled:opacity-40"
          >
            {saving ? "Getting your price…" : "Get my price"} <BadgeIndianRupee size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

const input =
  "w-full rounded-xl border border-line bg-cream/50 px-4 py-3 text-sm text-ink placeholder:text-muted outline-none transition-all focus:border-wine/40 focus:bg-paper";

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">{label}</span>
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  children,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${input} cursor-pointer appearance-none pr-9 ${!value ? "text-muted" : ""}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">▾</span>
    </div>
  );
}

function Chips({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            value === o ? "border-wine bg-wine text-cream" : "border-line text-ink hover:border-wine/40"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
