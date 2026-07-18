import { supabase } from "@/lib/supabase";

/**
 * Lead submissions (enquiries + sell requests).
 * The lead tables are write-only: insert WITHOUT `.select()` — there is no
 * SELECT policy, so asking for the row back would fail every submit.
 */

export type LeadResult = { ok: boolean };

/** UI intent labels → short DB keys (enquiries.intent CHECK). */
const INTENT_KEY: Record<string, string> = {
  "Buy a car": "buy",
  "Sell my car": "sell",
  "Book a service": "service",
  "Something else": "other",
};

/** Keep only what the DB phone CHECK accepts: digits, spaces, dashes, one leading +. */
const cleanPhone = (raw: string) =>
  (raw.trim().startsWith("+") ? "+" : "") + raw.replace(/[^\d -]/g, "").trim();

export async function submitEnquiry(input: {
  name: string;
  phone: string;
  intentLabel: string;
  message: string;
  website: string; // honeypot — must stay empty
}): Promise<LeadResult> {
  if (!supabase) return { ok: false };
  const { error } = await supabase.from("enquiries").insert({
    name: input.name.trim(),
    phone: cleanPhone(input.phone),
    intent: INTENT_KEY[input.intentLabel] ?? "other",
    message: input.message.trim() || null,
    page_path: window.location.pathname.slice(0, 120),
    website: input.website,
  });
  return { ok: !error };
}

export async function submitSellRequest(input: {
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
  quoteLow: number;
  quoteHigh: number;
  website: string; // honeypot — must stay empty
}): Promise<LeadResult> {
  if (!supabase) return { ok: false };
  const { error } = await supabase.from("sell_requests").insert({
    brand: input.brand,
    model: input.model.trim(),
    year: Number(input.year),
    fuel: input.fuel,
    transmission: input.transmission,
    km: Number(input.km),
    owner: input.owner,
    condition: input.condition,
    city: input.city,
    name: input.name.trim(),
    phone: cleanPhone(input.phone),
    quote_low: input.quoteLow,
    quote_high: input.quoteHigh,
    website: input.website,
  });
  return { ok: !error };
}
