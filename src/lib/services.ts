import {
  FileCheck2, ShieldPlus, Landmark, Wrench, RefreshCcw, ScanSearch,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  Icon: LucideIcon;
  points: string[];
  price: string;
}

export const services: Service[] = [
  {
    slug: "rc-transfer",
    title: "RC Transfer",
    tagline: "Paperwork, sorted",
    description:
      "End-to-end ownership transfer handled by our RTO experts. Track every step online until the RC lands in your name.",
    Icon: FileCheck2,
    points: ["Doorstep document pickup", "Live RTO status tracking", "Insurance name change included"],
    price: "From ₹1,999",
  },
  {
    slug: "insurance",
    title: "Car Insurance",
    tagline: "Cover in minutes",
    description:
      "Compare and buy comprehensive or third-party insurance from top insurers at exclusive CarsVilla rates.",
    Icon: ShieldPlus,
    points: ["Instant policy issuance", "Cashless garage network", "Zero-dep add-ons"],
    price: "From ₹6,499/yr",
  },
  {
    slug: "financing",
    title: "Car Loan & Financing",
    tagline: "Drive now, pay easy",
    description:
      "Pre-approved used-car loans up to 90% of value with tenures up to 7 years and interest from 9.5%.",
    Icon: Landmark,
    points: ["Approval in 30 minutes", "EMI from ₹9,999/mo", "Minimal documentation"],
    price: "Rates from 9.5%",
  },
  {
    slug: "inspection",
    title: "200-Point Inspection",
    tagline: "Know before you buy",
    description:
      "Book a certified engineer to inspect any car — ours or elsewhere — with a full digital condition report.",
    Icon: ScanSearch,
    points: ["Engine to electronics", "Photo-backed report", "Resale value estimate"],
    price: "From ₹1,499",
  },
  {
    slug: "servicing",
    title: "Service & Detailing",
    tagline: "Showroom shine",
    description:
      "Periodic servicing, denting-painting and premium detailing at partner workshops with genuine parts.",
    Icon: Wrench,
    points: ["Genuine spare parts", "Ceramic coating", "Pickup & drop"],
    price: "From ₹2,999",
  },
  {
    slug: "buyback",
    title: "Assured Buyback",
    tagline: "Value protected",
    description:
      "Lock a guaranteed buyback price when you purchase, so upgrading your next car is always effortless.",
    Icon: RefreshCcw,
    points: ["Price locked upfront", "No depreciation shock", "Upgrade anytime"],
    price: "Complimentary",
  },
];
