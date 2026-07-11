import {
  ArrowLeftRight,
  BadgeCheck,
  ClipboardCheck,
  FileSearch,
  Landmark,
  ReceiptText,
  TrendingUp,
  Umbrella,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  /** true = powered by a live third-party API (VAHAN / RTO / insurer, wired in Phase 2) */
  api: boolean;
  badge: string;
};

export const services: Service[] = [
  {
    slug: "rc-check",
    name: "RC / Vehicle Check",
    tagline: "Instant registration lookup",
    description:
      "Enter any number plate to pull make, model, year, fuel, RTO, insurance status and owner details — straight from the VAHAN database.",
    icon: FileSearch,
    api: true,
    badge: "Live API",
  },
  {
    slug: "challan-check",
    name: "Challan / Fine Check",
    tagline: "Pending traffic e-challans",
    description:
      "Check outstanding traffic challans and fines against a vehicle before you buy — no surprises after the deal.",
    icon: ReceiptText,
    api: true,
    badge: "Live API",
  },
  {
    slug: "valuation",
    name: "Instant Valuation",
    tagline: "Know the fair market price",
    description:
      "Get a data-backed price estimate for any car in seconds, based on model, year, km and condition.",
    icon: TrendingUp,
    api: true,
    badge: "Instant",
  },
  {
    slug: "rc-transfer",
    name: "RC Transfer",
    tagline: "Ownership, handled for you",
    description:
      "End-to-end registration-certificate transfer — forms, RTO visits and follow-ups managed by the CarsVilla team.",
    icon: ArrowLeftRight,
    api: false,
    badge: "Doorstep",
  },
  {
    slug: "insurance",
    name: "Car Insurance",
    tagline: "Compare & renew in minutes",
    description:
      "Compare quotes from top insurers and renew or buy a new policy without the paperwork or waiting.",
    icon: Umbrella,
    api: true,
    badge: "Partners",
  },
  {
    slug: "financing",
    name: "Car Loan & Financing",
    tagline: "Pre-approved, up to 90%",
    description:
      "Instant pre-approved used-car loans from leading banks and NBFCs with flexible tenures and quick disbursal.",
    icon: Landmark,
    api: true,
    badge: "Partners",
  },
  {
    slug: "warranty",
    name: "Extended Warranty",
    tagline: "Peace of mind, extended",
    description:
      "Cover engine, gearbox and major components for up to 3 years on any certified CarsVilla car.",
    icon: BadgeCheck,
    api: false,
    badge: "Add-on",
  },
  {
    slug: "inspection",
    name: "Doorstep Inspection",
    tagline: "200-point certified check",
    description:
      "Book a certified inspector to a 200-point evaluation at your home and get a full condition report.",
    icon: ClipboardCheck,
    api: false,
    badge: "Doorstep",
  },
];
