"use client";

import { useEffect, useId, useState } from "react";

/**
 * Decorative traffic that drives across the desktop header.
 *
 * Two moods, alternated by a cheap setTimeout scheduler (no per-frame JS):
 *  - "traffic": 9 cars with randomised speed/lane/size/colour → the road ebbs
 *    and flows (bursts, lone cars, empty stretches) and never loops on a short
 *    cycle. Positive delays → every car enters cleanly from the left.
 *  - "race": every ~25–45s the cars line up at the left, hold ~4s (starting
 *    grid), then launch together and accelerate across, overtaking each other.
 *    Plays exactly ONCE and parks off-screen, so it ends smoothly.
 *
 * Each car projects its own random-colour headlight beam forwards. A brief
 * crossfade hides the swap between moods. All motion is GPU-composited CSS
 * transforms — featherweight. Desktop only, aria-hidden, disabled under
 * prefers-reduced-motion.
 */

const COLORS = ["#540f1f", "#26191c", "#b0894f", "#7a1526", "#3a2f2a", "#8b4a56"];
// ease-in curves = accelerate from a standstill (a real launch); varied → overtaking
const RACE_EASING = [
  "cubic-bezier(.55,.02,.9,.28)",
  "cubic-bezier(.68,.01,.85,.35)",
  "cubic-bezier(.6,0,.75,.22)",
  "ease-in",
  "cubic-bezier(.5,.03,.8,.2)",
  "cubic-bezier(.72,.04,.9,.4)",
];
const RACE_LANES = [0, 1, 2, 3, 4, 5]; // lane indices; × laneStep per variant

const shuffle = <T,>(arr: readonly T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/**
 * ── SPEED (tune here) ───────────────────────────────────────────────────────
 * Numbers are the full CYCLE length in seconds (a car crosses in the first 30%,
 * then parks off-screen). Bigger = slower. Mobile screens are narrow, so cars
 * are given longer cycles — otherwise they'd shoot across the short width.
 */
const SPEED = {
  // widthMin/Max = car size in px (mobile cars are smaller so they sit in the
  // slim strip under the search bar instead of hiding behind it)
  desktop: { trafficMin: 24, trafficMax: 40, race: 11, widthMin: 38, widthMax: 62, lane: 6, laneStep: 3 },
  mobile: { trafficMin: 34, trafficMax: 54, race: 15, widthMin: 24, widthMax: 38, lane: 3, laneStep: 2 },
} as const;

export type CarVariant = keyof typeof SPEED;

type Mode = "traffic" | "race";

type CarConfig = {
  id: number;
  width: number;
  color: string;
  light: string; // per-car headlight colour (random hue)
  name: "carDrive" | "carRace";
  duration: number;
  delay: number;
  bottom: number;
  easing?: string;
};

const rnd = (min: number, max: number) => min + Math.random() * (max - min);
// a vivid, saturated colour for each car's headlight beam
const randomLight = () => `hsl(${Math.floor(rnd(0, 360))} 95% 62%)`;

function buildTraffic(variant: CarVariant): CarConfig[] {
  const s = SPEED[variant];
  return Array.from({ length: 9 }, (_, id) => {
    const width = Math.round(rnd(s.widthMin, s.widthMax));
    return {
      id,
      width,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      light: randomLight(),
      name: "carDrive" as const,
      duration: +rnd(s.trafficMin, s.trafficMax).toFixed(2), // non-harmonic → never repeats
      delay: +rnd(0, 34).toFixed(2), // positive → always enters from the left
      bottom: Math.round(rnd(0, s.lane)),
    };
  });
}

function buildRace(variant: CarVariant): CarConfig[] {
  const s = SPEED[variant];
  // Randomise every race: how many cars, their lanes, colours, launch curves
  // and overall pace — so no two races look the same.
  const count = Math.floor(rnd(3, 6.99)); // 3–6 racers
  const raceDur = +(s.race * rnd(0.85, 1.15)).toFixed(2); // varying pace per race
  const easings = shuffle(RACE_EASING).slice(0, count); // who accelerates hardest
  const lanes = shuffle(RACE_LANES).slice(0, count); // random vertical order
  return Array.from({ length: count }, (_, id) => ({
    id,
    width: Math.round(rnd(s.widthMin + 6, s.widthMax)),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    light: randomLight(),
    name: "carRace" as const,
    duration: raceDur, // shared → they gather & launch in sync
    delay: 0,
    bottom: lanes[id] * s.laneStep, // spacing tightened on small screens
    easing: easings[id], // different acceleration → different overtakes/winner
  }));
}

export function HeaderCar({ variant = "desktop" }: { variant?: CarVariant }) {
  const [fleet, setFleet] = useState<CarConfig[]>([]);
  const [visible, setVisible] = useState(false);

  // Cheap scheduler that also owns the crossfade. All state updates happen in
  // deferred timer callbacks (never synchronously in the effect body), so the
  // road ebbs between organic traffic and the occasional race.
  useEffect(() => {
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const at = (ms: number, fn: () => void) => {
      const id = setTimeout(fn, ms);
      timers.add(id);
      return id;
    };

    // show a fresh fleet for the given mood (crossfade), no rescheduling
    const populate = (mood: Mode) => {
      setVisible(false); // fade out
      at(260, () => {
        setFleet(mood === "race" ? buildRace(variant) : buildTraffic(variant));
        setVisible(true); // fade in fresh fleet
      });
    };
    // a race must stay on screen long enough for the slowest lap (race ×1.15)
    // to finish + a short empty buffer before traffic returns
    const raceHold = Math.ceil(SPEED[variant].race * 1.15) * 1000 + 1500;
    // single alternating chain: race → traffic → race …
    const flip = (mood: Mode) => {
      populate(mood);
      const hold = mood === "race" ? raceHold : rnd(25000, 45000);
      at(hold, () => flip(mood === "race" ? "traffic" : "race"));
    };

    at(30, () => populate("traffic")); // traffic on mount (holds until first race)
    at(rnd(12000, 20000), () => flip("race")); // first race starts the chain
    return () => timers.forEach(clearTimeout);
  }, [variant]);

  return (
    <div
      className="header-cars"
      aria-hidden
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.35s ease" }}
    >
      {fleet.map((c) => (
        <div
          key={`${c.name}-${c.id}`}
          className="hcar"
          style={{
            bottom: c.bottom,
            zIndex: c.width,
            animationName: c.name,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
            animationTimingFunction: c.easing,
            // race = one-shot that parks off-screen when done; traffic uses
            // "backwards" so during its start delay it stays off-screen left
            // (0% keyframe) instead of sitting at the visible left edge.
            animationIterationCount: c.name === "carRace" ? 1 : undefined,
            animationFillMode: c.name === "carRace" ? "forwards" : "backwards",
          }}
        >
          <div className="car-bob">
            <Car color={c.color} width={c.width} light={c.light} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Car({ color, width, light }: { color: string; width: number; light: string }) {
  // extra room on the right (60 → 92) for the forward headlight beam
  const w = Math.round((width * 92) / 60);
  const h = Math.round((width * 26) / 60);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const beamId = `beam-${uid}`;
  const glowId = `glow-${uid}`;

  return (
    <svg width={w} height={h} viewBox="0 0 92 26" fill="none">
      <defs>
        <linearGradient id={beamId} x1="58" y1="0" x2="92" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={light} stopOpacity="0.5" />
          <stop offset="1" stopColor={light} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={glowId}>
          <stop offset="0" stopColor={light} stopOpacity="0.85" />
          <stop offset="1" stopColor={light} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* headlight beam + glow (projected forward) */}
      <path d="M58 15.8 L90 10 L90 24 L58 19.6 Z" fill={`url(#${beamId})`} />
      <circle cx="58" cy="17.5" r="6.5" fill={`url(#${glowId})`} />

      {/* ground shadow */}
      <ellipse cx="30" cy="25" rx="25" ry="1.4" fill="#540f1f" opacity="0.1" />

      {/* body */}
      <path
        d="M2 19 C2 15.5 4 14.5 7 14.5 L14 14.5 C17 9 21 8 28 8 L37 8 C43 8 46 11 48 14.5 L55 15 C58 15.5 59 16.5 59 19 L59 19.5 C59 20.6 58 21 57 21 L4 21 C2.5 21 2 20.6 2 19 Z"
        fill={color}
      />
      {/* windows */}
      <path d="M18.5 13.8 C20.5 10.4 23.5 10 28 10 L28 13.8 Z" fill="#f6ece3" opacity="0.55" />
      <path d="M30 10 L36 10 C40 10 42.5 11.6 44 13.8 L30 13.8 Z" fill="#f6ece3" opacity="0.55" />

      {/* headlight bulb */}
      <circle cx="57.6" cy="17.5" r="1.5" fill={light} />
      <circle cx="57.6" cy="17.5" r="0.7" fill="#fffdf5" />

      {/* wheels */}
      {[15, 46].map((cx) => (
        <g key={cx} className="wheel-roll">
          <circle cx={cx} cy="21" r="4.6" fill="#17110f" />
          <circle cx={cx} cy="21" r="1.6" fill="#f6ece3" />
          <g stroke="#f6ece3" strokeWidth="0.7" opacity="0.85">
            <line x1={cx} y1="16.8" x2={cx} y2="25.2" />
            <line x1={cx - 4.2} y1="21" x2={cx + 4.2} y2="21" />
            <line x1={cx - 3} y1="18" x2={cx + 3} y2="24" />
            <line x1={cx + 3} y1="18" x2={cx - 3} y2="24" />
          </g>
        </g>
      ))}
    </svg>
  );
}
