import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client (anon/publishable key — public by design).
 * The site is a static export, so ALL access control lives in RLS:
 * lead tables are INSERT-only, catalogue is read-only published rows.
 * Never import the service-role key anywhere in src/.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Null when env vars are absent (e.g. a fork building without secrets). */
export const supabase: SupabaseClient | null =
  url && anonKey
    ? createClient(url, anonKey, { auth: { persistSession: false } })
    : null;
