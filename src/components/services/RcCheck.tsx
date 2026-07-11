"use client";

import { useState } from "react";
import { CircleAlert, FileSearch, Loader2, ShieldCheck } from "lucide-react";

const MAKES = [
  { make: "Maruti Suzuki", models: ["Swift", "Baleno", "Dzire", "Brezza"] },
  { make: "Hyundai", models: ["i20", "Creta", "Venue", "Verna"] },
  { make: "Tata", models: ["Nexon", "Punch", "Harrier", "Tiago"] },
  { make: "Honda", models: ["City", "Amaze", "WR-V"] },
  { make: "Toyota", models: ["Innova Crysta", "Fortuner", "Glanza"] },
  { make: "Mahindra", models: ["Thar", "XUV700", "Scorpio-N"] },
];
const FUELS = ["Petrol", "Diesel", "CNG", "Electric"];
const COLORS = ["Pearl White", "Metallic Grey", "Fiery Red", "Midnight Black", "Sky Blue"];
const STATES: Record<string, string> = {
  WB: "West Bengal", DL: "Delhi", MH: "Maharashtra", KA: "Karnataka",
  TN: "Tamil Nadu", UP: "Uttar Pradesh", GJ: "Gujarat", RJ: "Rajasthan",
  PB: "Punjab", HR: "Haryana", KL: "Kerala", AP: "Andhra Pradesh",
};

type Result = {
  reg: string;
  makeModel: string;
  year: number;
  fuel: string;
  color: string;
  rto: string;
  regDate: string;
  insurance: string;
  owner: string;
};

const hash = (s: string) =>
  [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

function lookup(raw: string): Result {
  const reg = raw.toUpperCase().replace(/\s+/g, "");
  const h = hash(reg);
  const brand = MAKES[h % MAKES.length];
  const model = brand.models[(h >> 3) % brand.models.length];
  const year = 2013 + (h % 11);
  const stateCode = reg.slice(0, 2);
  const rtoNum = reg.slice(2, 4).replace(/\D/g, "") || String((h % 90) + 10);
  const state = STATES[stateCode] ?? "India";
  return {
    reg,
    makeModel: `${brand.make} ${model}`,
    year,
    fuel: FUELS[(h >> 5) % FUELS.length],
    color: COLORS[(h >> 7) % COLORS.length],
    rto: `${state} · RTO ${stateCode}-${rtoNum}`,
    regDate: `${String((h % 28) + 1).padStart(2, "0")}/${String((h % 12) + 1).padStart(2, "0")}/${year}`,
    insurance: `Valid till ${String((h % 28) + 1).padStart(2, "0")}/${String(((h >> 2) % 12) + 1).padStart(2, "0")}/2026`,
    owner: `${stateCode[0] ?? "A"}•••• ${(reg[4] ?? "S")}••••`,
  };
}

export function RcCheck() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const run = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = value.toUpperCase().replace(/\s+/g, "");
    if (clean.length < 6) {
      setError("Enter a valid registration number, e.g. WB29AB1234.");
      setResult(null);
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    // simulate the API round-trip
    setTimeout(() => {
      setResult(lookup(clean));
      setLoading(false);
    }, 650);
  };

  return (
    <div className="overflow-hidden rounded-[var(--radius-2xl)] border border-line bg-paper shadow-luxe lg:grid lg:grid-cols-[1fr_1fr]">
      {/* Left — the tool */}
      <div className="border-b border-line p-8 md:p-10 lg:border-b-0 lg:border-r">
        <span className="inline-flex items-center gap-2 rounded-full bg-wine/8 px-3 py-1 text-xs font-semibold text-wine">
          <FileSearch size={14} /> RC / Vehicle Check
        </span>
        <h3 className="mt-4 font-display text-2xl text-ink">
          Check any car&apos;s full history
        </h3>
        <p className="mt-2 text-sm text-muted">
          Registration, owner, insurance and RTO details in seconds — before you buy.
        </p>

        <form onSubmit={run} className="mt-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value.toUpperCase())}
              placeholder="WB 29 AB 1234"
              className="h-12 flex-1 rounded-xl border border-line bg-cream/50 px-4 text-center font-display text-lg tracking-widest text-ink placeholder:tracking-normal placeholder:font-sans placeholder:text-sm placeholder:text-muted outline-none focus:border-wine/40 focus:bg-paper"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-wine px-6 text-sm font-semibold text-cream transition-colors hover:bg-wine-hot disabled:opacity-70"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <FileSearch size={16} />}
              {loading ? "Checking…" : "Check now"}
            </button>
          </div>
          {error && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-wine">
              <CircleAlert size={14} /> {error}
            </p>
          )}
        </form>

        <p className="mt-5 text-xs text-muted">
          Preview using sample data — live VAHAN / RTO API connects in Phase 2.
        </p>
      </div>

      {/* Right — the result */}
      <div className="grid place-items-center p-8 md:p-10">
        {result ? (
          <div className="w-full">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display text-2xl tracking-widest text-wine">{result.reg}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <ShieldCheck size={13} /> Verified
              </span>
            </div>
            <dl className="divide-y divide-line rounded-xl border border-line">
              <Row k="Make & Model" v={result.makeModel} />
              <Row k="Mfg. year" v={String(result.year)} />
              <Row k="Fuel" v={result.fuel} />
              <Row k="Colour" v={result.color} />
              <Row k="Registered at" v={result.rto} />
              <Row k="Reg. date" v={result.regDate} />
              <Row k="Insurance" v={result.insurance} />
              <Row k="Owner" v={result.owner} />
            </dl>
          </div>
        ) : (
          <div className="text-center text-muted">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-cream-2">
              {loading ? <Loader2 size={26} className="animate-spin text-wine" /> : <FileSearch size={26} className="text-wine/60" />}
            </div>
            <p className="mt-4 max-w-[16rem] text-sm">
              {loading ? "Fetching vehicle records…" : "Enter a number plate to see the full vehicle report here."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <dt className="text-xs uppercase tracking-wider text-muted">{k}</dt>
      <dd className="text-right text-sm font-medium text-ink">{v}</dd>
    </div>
  );
}
