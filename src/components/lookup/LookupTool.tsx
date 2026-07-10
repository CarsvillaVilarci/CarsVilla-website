"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, ShieldCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface RcResult {
  plate: string;
  make: string;
  model: string;
  fuel: string;
  regYear: string;
  rto: string;
  owner: string;
  insurance: string;
  challans: number;
  blacklist: boolean;
}

const MAKES = [
  ["Maruti Suzuki", "Baleno Alpha"], ["Hyundai", "Creta SX"], ["Tata", "Nexon XZ+"],
  ["Honda", "City VX"], ["Kia", "Seltos HTX"], ["Mahindra", "XUV700 AX7"],
];
const RTOS = ["KA-01 Koramangala", "MH-12 Pune", "DL-03 Delhi", "TS-09 Hyderabad", "TN-10 Chennai"];
const FUELS = ["Petrol", "Diesel", "CNG", "Electric"];

/** Deterministic pseudo-random from a string so the same plate = same result. */
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function mockLookup(plate: string): RcResult {
  const h = hash(plate.toUpperCase());
  const [make, model] = MAKES[h % MAKES.length];
  return {
    plate: plate.toUpperCase(),
    make, model,
    fuel: FUELS[(h >> 3) % FUELS.length],
    regYear: String(2016 + (h % 9)),
    rto: RTOS[(h >> 5) % RTOS.length],
    owner: `${1 + (h % 3)}${["st", "nd", "rd"][(h % 3)]} owner`,
    insurance: (h >> 7) % 5 === 0 ? "Expired" : "Valid till Mar 2027",
    challans: (h >> 2) % 4,
    blacklist: false,
  };
}

export function LookupTool() {
  const [plate, setPlate] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RcResult | null>(null);

  const run = () => {
    if (plate.trim().length < 4) return;
    setLoading(true);
    setResult(null);
    // Simulated API latency — swap for a real RTO API (Surepass / APISetu) later.
    setTimeout(() => {
      setResult(mockLookup(plate.trim()));
      setLoading(false);
    }, 1400);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase().slice(0, 12))}
            onKeyDown={(e) => e.key === "Enter" && run()}
            placeholder="Enter number plate e.g. KA01AB1234"
            className="w-full rounded-full border border-line bg-ink-2 py-4 pl-12 pr-4 font-mono tracking-wider text-paper placeholder:font-sans placeholder:tracking-normal placeholder:text-muted/60 outline-none focus:border-brand"
          />
        </div>
        <Button onClick={run} size="lg" disabled={loading || plate.trim().length < 4}>
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Check details"}
        </Button>
      </div>

      <p className="mt-3 text-center text-xs text-muted">
        Demo lookup — returns sample data. In production this connects to a live RTO / VAHAN API.
      </p>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 rounded-3xl border border-line bg-surface/50 p-10 text-center"
          >
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-brand" />
            <p className="mt-4 text-muted">Fetching records from RTO database…</p>
          </motion.div>
        )}

        {result && !loading && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 overflow-hidden rounded-3xl border border-line bg-surface"
          >
            <div className="flex items-center justify-between border-b border-line bg-ink-2 p-6">
              <div>
                <p className="font-mono text-xl tracking-widest text-paper">{result.plate}</p>
                <p className="mt-1 text-sm text-muted">{result.make} · {result.model}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky/15 px-3 py-1.5 text-sm font-semibold text-sky">
                <ShieldCheck className="h-4 w-4" /> Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3">
              {[
                ["Registration year", result.regYear],
                ["Fuel type", result.fuel],
                ["RTO", result.rto],
                ["Ownership", result.owner],
                ["Insurance", result.insurance],
                ["Pending challans", String(result.challans)],
              ].map(([k, v]) => (
                <div key={k} className="bg-surface p-5">
                  <p className="text-xs uppercase tracking-wider text-muted">{k}</p>
                  <p className="mt-1 font-semibold text-paper">{v}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 border-t border-line p-6">
              <span className="inline-flex items-center gap-2 text-sm text-paper/85">
                <ShieldCheck className="h-4 w-4 text-sky" /> Not blacklisted / not stolen
              </span>
              {result.insurance === "Expired" && (
                <span className="inline-flex items-center gap-2 text-sm text-gold">
                  <AlertTriangle className="h-4 w-4" /> Insurance renewal recommended
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
