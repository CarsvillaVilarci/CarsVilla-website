"use client";

import { useState } from "react";
import { BadgeCheck, BellOff, CalendarCheck, Gavel, MessageCircle, Tag, TrendingDown } from "lucide-react";

type Note = {
  id: number;
  icon: typeof Gavel;
  text: string;
  time: string;
  read: boolean;
};

const initial: Note[] = [
  { id: 1, icon: Gavel, text: "You've been outbid on the Tata Nexon — new high bid ₹9.90 L.", time: "3m ago", read: false },
  { id: 2, icon: MessageCircle, text: "CarsVilla replied to your Toyota Fortuner enquiry.", time: "1h ago", read: false },
  { id: 3, icon: TrendingDown, text: "Price dropped on your saved Hyundai Creta — now ₹12.20 L.", time: "4h ago", read: false },
  { id: 4, icon: Tag, text: "Your listing 'Grand i10 2017' is now live.", time: "1d ago", read: true },
  { id: 5, icon: BadgeCheck, text: "You won the auction for the Honda City VX.", time: "2d ago", read: true },
  { id: 6, icon: CalendarCheck, text: "Test drive confirmed for the Kia Seltos — Sat, 4:00 PM.", time: "3d ago", read: true },
];

export function NotificationsList() {
  const [notes, setNotes] = useState(initial);
  const unread = notes.filter((n) => !n.read).length;

  return (
    <section className="container-x py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-muted">
            {unread > 0 ? (
              <><span className="font-semibold text-ink">{unread}</span> unread</>
            ) : (
              "You're all caught up"
            )}
          </p>
          {unread > 0 && (
            <button
              onClick={() => setNotes((prev) => prev.map((n) => ({ ...n, read: true })))}
              className="text-sm font-semibold text-wine hover:underline"
            >
              Mark all read
            </button>
          )}
        </div>

        {notes.length > 0 ? (
          <ul className="space-y-2">
            {notes.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => setNotes((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}
                  className={`flex w-full items-start gap-3 rounded-[var(--radius-xl)] border p-4 text-left transition-colors ${
                    n.read ? "border-line bg-paper" : "border-wine/20 bg-wine/5"
                  }`}
                >
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${n.read ? "bg-cream-2 text-muted" : "bg-wine/10 text-wine"}`}>
                    <n.icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-ink">{n.text}</span>
                    <span className="mt-0.5 block text-xs text-muted">{n.time}</span>
                  </span>
                  {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-wine" />}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid place-items-center rounded-[var(--radius-2xl)] border border-dashed border-line py-16 text-center">
            <BellOff size={34} className="text-wine/40" />
            <p className="mt-4 font-display text-xl text-ink">No notifications</p>
            <p className="mt-1 text-sm text-muted">Price drops, enquiry replies and bid alerts will show up here.</p>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-muted">Preview — real alerts arrive with the backend (Phase 3).</p>
      </div>
    </section>
  );
}
