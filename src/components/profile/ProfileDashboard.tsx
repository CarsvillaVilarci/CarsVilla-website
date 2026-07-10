"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart, Car, MessageSquare, Settings, Bell, LogOut, CheckCircle2, Clock,
} from "lucide-react";
import { cars } from "@/lib/cars";
import { CarCard } from "@/components/CarCard";
import { formatINR } from "@/lib/utils";
import { Label, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

const tabs = [
  { id: "saved", label: "Saved cars", Icon: Heart },
  { id: "listings", label: "My listings", Icon: Car },
  { id: "enquiries", label: "Enquiries", Icon: MessageSquare },
  { id: "settings", label: "Profile", Icon: Settings },
] as const;

type TabId = (typeof tabs)[number]["id"];

const saved = cars.filter((c) => ["1", "8", "4"].includes(c.id));
const listings = [
  { car: cars[1], status: "Under review", stage: 1 },
  { car: cars[9], status: "Live · 42 views", stage: 2 },
];
const enquiries = [
  { car: cars[0], msg: "Test drive requested", when: "2 days ago", state: "Confirmed" },
  { car: cars[5], msg: "Price negotiation", when: "5 days ago", state: "Awaiting" },
];

export function ProfileDashboard() {
  const [tab, setTab] = useState<TabId>("saved");

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <aside className="h-fit rounded-[1.8rem] border border-line bg-surface p-6 lg:sticky lg:top-24">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-deep font-display text-2xl font-bold text-white">
            RS
          </div>
          <div>
            <p className="font-display text-lg text-paper">Rahul Sharma</p>
            <p className="text-sm text-muted">+91 90000 00000</p>
          </div>
        </div>

        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-sky/15 px-3 py-1 text-xs font-semibold text-sky">
          <CheckCircle2 className="h-3.5 w-3.5" /> KYC verified
        </span>

        <nav className="mt-6 flex flex-col gap-1 border-t border-line pt-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                tab === t.id ? "bg-brand text-white" : "text-muted hover:bg-white/5 hover:text-paper"
              }`}
            >
              <t.Icon className="h-5 w-5" /> {t.label}
            </button>
          ))}
          <button className="mt-1 flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-paper">
            <Bell className="h-5 w-5" /> Notifications
          </button>
          <button className="flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-brand transition-colors hover:bg-brand/10">
            <LogOut className="h-5 w-5" /> Sign out
          </button>
        </nav>
      </aside>

      {/* Content */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {tab === "saved" && (
          <Panel title="Saved cars" hint={`${saved.length} cars`}>
            <div className="grid gap-6 sm:grid-cols-2">
              {saved.map((c) => <CarCard key={c.id} car={c} />)}
            </div>
          </Panel>
        )}

        {tab === "listings" && (
          <Panel title="My car listings" hint={`${listings.length} active`}>
            <div className="flex flex-col gap-4">
              {listings.map(({ car, status, stage }) => (
                <div key={car.id} className="flex items-center gap-5 rounded-3xl border border-line bg-surface/60 p-4">
                  <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl">
                    <div className="h-full w-full" style={{ background: `linear-gradient(160deg, ${car.accent}55, #0a0a0c)` }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg text-paper">{car.make} {car.model}</p>
                    <p className="text-sm text-muted">{car.year} · {(car.km / 1000).toFixed(0)}k km</p>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      {stage >= 2 ? <CheckCircle2 className="h-4 w-4 text-sky" /> : <Clock className="h-4 w-4 text-gold" />}
                      <span className={stage >= 2 ? "text-sky" : "text-gold"}>{status}</span>
                    </div>
                  </div>
                  <p className="hidden font-display text-xl text-paper sm:block">{formatINR(car.price)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button href="/sell">List another car</Button>
            </div>
          </Panel>
        )}

        {tab === "enquiries" && (
          <Panel title="Your enquiries" hint={`${enquiries.length} recent`}>
            <div className="flex flex-col gap-4">
              {enquiries.map(({ car, msg, when, state }) => (
                <div key={car.id} className="flex items-center justify-between rounded-3xl border border-line bg-surface/60 p-6">
                  <div>
                    <p className="font-display text-lg text-paper">{car.make} {car.model}</p>
                    <p className="text-sm text-muted">{msg} · {when}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    state === "Confirmed" ? "bg-sky/15 text-sky" : "bg-gold/15 text-gold"
                  }`}>
                    {state}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        )}

        {tab === "settings" && (
          <Panel title="Profile details">
            <div className="grid max-w-xl gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div><Label>Full name</Label><Input defaultValue="Rahul Sharma" /></div>
                <div><Label>Mobile</Label><Input defaultValue="+91 90000 00000" /></div>
              </div>
              <div><Label>Email</Label><Input defaultValue="rahul@example.com" type="email" /></div>
              <div><Label>City</Label><Input defaultValue="Bengaluru" /></div>
              <div className="pt-2"><Button>Save changes</Button></div>
            </div>
          </Panel>
        )}
      </motion.div>
    </div>
  );
}

function Panel({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <h2 className="font-display text-2xl text-paper">{title}</h2>
        {hint && <span className="text-sm text-muted">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
