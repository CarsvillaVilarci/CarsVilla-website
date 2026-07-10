import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes without conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as Indian Rupees (e.g. 725000 -> "₹7.25 Lakh"). */
export function formatINR(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} Lakh`;
  return `₹${value.toLocaleString("en-IN")}`;
}

/** Full rupee format with grouping (e.g. "₹7,25,000"). */
export function formatINRFull(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}
