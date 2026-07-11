"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Eye,
  Heart,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  Pencil,
  Phone,
  Tag,
} from "lucide-react";
import { allCars, formatINR } from "@/lib/demo";
import { CarCard } from "@/components/ui/CarCard";

const user = {
  name: "Aarav Sharma",
  phone: "+91 90000 00000",
  email: "aarav@example.com",
  since: "Mar 2024",
  city: "Tamluk",
};

const saved = [allCars[0], allCars[3], allCars[8]];

type Status = "Live" | "Under review" | "Sold";
const listings: { make: string; model: string; year: number; asking: number; status: Status; views: number; enquiries: number; tint: string }[] = [
  { make: "Hyundai", model: "Grand i10", year: 2017, asking: 320000, status: "Live", views: 214, enquiries: 6, tint: "#2b4a6f" },
  { make: "Ford", model: "EcoSport", year: 2018, asking: 640000, status: "Under review", views: 0, enquiries: 0, tint: "#3a2f4a" },
  { make: "Maruti Suzuki", model: "Alto K10", year: 2015, asking: 210000, status: "Sold", views: 540, enquiries: 19, tint: "#4a3b26" },
];

type EnqStatus = "Test drive booked" | "Replied" | "Awaiting reply";
const enquiries: { car: string; date: string; status: EnqStatus }[] = [
  { car: "Toyota Fortuner 4x2 AT", date: "2 days ago", status: "Test drive booked" },
  { car: "Kia Seltos HTX IVT", date: "5 days ago", status: "Replied" },
  { car: "Honda City VX CVT", date: "1 week ago", status: "Awaiting reply" },
];

const TABS = [
  { key: "saved", label: "Saved cars", icon: Heart },
  { key: "listings", label: "My listings", icon: Tag },
  { key: "enquiries", label: "Enquiries", icon: MessageCircle },
  { key: "settings", label: "Settings", icon: Pencil },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const badgeTone = (s: Status | EnqStatus) =>
  s === "Live" || s === "Replied" || s === "Test drive booked"
    ? "bg-emerald-50 text-emerald-700"
    : s === "Sold"
      ? "bg-cream-2 text-muted"
      : "bg-amber-50 text-amber-700";

export function ProfileDashboard() {
  const [tab, setTab] = useState<TabKey>("saved");

  return (
    <div className="container-x py-10">
      {/* Profile header */}
      <div className="flex flex-col gap-6 rounded-[var(--radius-2xl)] border border-line bg-paper p-6 shadow-soft md:flex-row md:items-center md:p-8">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-wine font-display text-2xl text-cream">
          {user.name[0]}
        </span>
        <div className="flex-1">
          <h1 className="font-display text-2xl text-ink">{user.name}</h1>
          <div className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5"><Phone size={13} /> {user.phone}</span>
            <span className="inline-flex items-center gap-1.5"><Mail size={13} /> {user.email}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin size={13} /> {user.city}</span>
          </div>
          <p className="mt-1 text-xs text-muted">Member since {user.since}</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-ink hover:border-wine/40">
            <Pencil size={15} /> Edit
          </button>
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-wine hover:border-wine/40">
            <LogOut size={15} /> Log out
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-3 gap-4">
        {[
          { n: saved.length, l: "Saved cars" },
          { n: listings.length, l: "Listings" },
          { n: enquiries.length, l: "Enquiries" },
        ].map((s) => (
          <div key={s.l} className="rounded-[var(--radius-xl)] border border-line bg-paper p-5 text-center shadow-soft">
            <p className="font-display text-3xl text-wine">{s.n}</p>
            <p className="mt-1 text-xs text-muted">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-1 overflow-x-auto border-b border-line [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              tab === t.key ? "border-wine text-wine" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "saved" && (
          saved.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {saved.map((c) => (
                <CarCard key={c.slug} car={c} />
              ))}
            </div>
          ) : (
            <Empty icon={Heart} title="No saved cars yet" body="Tap the heart on any car to save it here." />
          )
        )}

        {tab === "listings" && (
          <div className="grid gap-4">
            {listings.map((l, i) => (
              <div key={i} className="flex items-center gap-4 rounded-[var(--radius-xl)] border border-line bg-paper p-4 shadow-soft">
                <span
                  className="hidden h-16 w-24 shrink-0 rounded-xl sm:block"
                  style={{ background: `radial-gradient(120% 120% at 30% 0%, ${l.tint}, #14100f)` }}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg text-ink">
                    {l.make} {l.model} <span className="text-muted">{l.year}</span>
                  </h3>
                  <p className="text-sm text-wine">{formatINR(l.asking)}</p>
                  <div className="mt-1 flex gap-4 text-xs text-muted">
                    <span className="inline-flex items-center gap-1"><Eye size={12} /> {l.views} views</span>
                    <span className="inline-flex items-center gap-1"><MessageCircle size={12} /> {l.enquiries} enquiries</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeTone(l.status)}`}>{l.status}</span>
                  <button className="text-xs font-semibold text-wine hover:underline">Manage</button>
                </div>
              </div>
            ))}
            <Link href="/sell" className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-wine px-6 py-3 text-sm font-semibold text-cream hover:bg-wine-hot">
              <Tag size={15} /> List another car
            </Link>
          </div>
        )}

        {tab === "enquiries" && (
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-line bg-paper shadow-soft">
            {enquiries.map((e, i) => (
              <div key={i} className={`flex items-center justify-between gap-4 p-4 ${i > 0 ? "border-t border-line" : ""}`}>
                <div>
                  <p className="font-medium text-ink">{e.car}</p>
                  <p className="text-xs text-muted">Enquired {e.date}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeTone(e.status)}`}>{e.status}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "settings" && <Settings />}
      </div>

      <p className="mt-10 text-center text-xs text-muted">
        Preview dashboard — accounts &amp; saved data go live with the backend (Phase 3).
      </p>
    </div>
  );
}

function Settings() {
  const [prefs, setPrefs] = useState({ priceDrops: true, replies: true, offers: false });
  const input = "w-full rounded-xl border border-line bg-cream/50 px-4 py-3 text-sm text-ink outline-none focus:border-wine/40 focus:bg-paper";

  return (
    <div className="max-w-xl space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Full name</span>
          <input className={input} defaultValue={user.name} />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Phone</span>
          <input className={input} defaultValue={user.phone} />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Email</span>
          <input className={input} defaultValue={user.email} />
        </label>
      </div>

      <div>
        <h3 className="mb-3 flex items-center gap-2 font-display text-lg text-ink">
          <Bell size={17} className="text-wine" /> Notifications
        </h3>
        <div className="divide-y divide-line rounded-xl border border-line">
          {[
            { key: "priceDrops" as const, label: "Price drops on saved cars" },
            { key: "replies" as const, label: "Replies to my enquiries" },
            { key: "offers" as const, label: "CarsVilla offers & news" },
          ].map((p) => (
            <div key={p.key} className="flex items-center justify-between px-4 py-3.5">
              <span className="text-sm text-ink">{p.label}</span>
              <button
                onClick={() => setPrefs((s) => ({ ...s, [p.key]: !s[p.key] }))}
                className={`relative h-6 w-11 rounded-full transition-colors ${prefs[p.key] ? "bg-wine" : "bg-line"}`}
                aria-pressed={prefs[p.key]}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-cream transition-all ${prefs[p.key] ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button className="rounded-full bg-wine px-6 py-3 text-sm font-semibold text-cream hover:bg-wine-hot">
        Save changes
      </button>
    </div>
  );
}

function Empty({ icon: Icon, title, body }: { icon: typeof Heart; title: string; body: string }) {
  return (
    <div className="grid place-items-center rounded-[var(--radius-2xl)] border border-dashed border-line py-16 text-center">
      <Icon size={36} className="text-wine/40" />
      <p className="mt-4 font-display text-xl text-ink">{title}</p>
      <p className="mt-1 text-sm text-muted">{body}</p>
    </div>
  );
}
