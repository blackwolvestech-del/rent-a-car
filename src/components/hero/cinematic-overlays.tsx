"use client";

import { motion } from "framer-motion";

/**
 * Cinematic atmospheric overlays — each is a stack of blurred gradients
 * animated with translate3d/opacity on the GPU. No flat shapes. Layered in
 * order back→front; the page composes them around the hero photograph.
 */

/** Volumetric fog: two large blurred gradient slabs drifting in opposite
 *  directions, blended with screen so they read as light scattering. */
export function VolumetricFog() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen">
      <motion.div
        animate={{ x: ["-15%", "15%", "-15%"], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-[-30%] bottom-[8%] h-[65%] blur-3xl"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255,210,150,0.35) 0%, rgba(200,170,120,0.15) 35%, transparent 70%)",
          willChange: "transform, opacity",
        }}
      />
      <motion.div
        animate={{ x: ["10%", "-12%", "10%"], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute inset-x-[-30%] bottom-[0%] h-[50%] blur-[80px]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 60%, rgba(100,140,200,0.4) 0%, rgba(60,80,140,0.15) 40%, transparent 75%)",
          willChange: "transform, opacity",
        }}
      />
      {/* Ground haze */}
      <div
        className="absolute inset-x-0 bottom-0 h-[35%] blur-2xl"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,0.06), transparent)",
        }}
      />
    </div>
  );
}

/** Anamorphic light streaks — long, thin, slightly tilted highlights that
 *  drift slowly across, like camera lens bleed. */
export function LightStreaks() {
  const streaks = [
    { top: "22%", delay: 0, hue: "212,175,55", duration: 18, opacity: 0.55, rotate: -8 },
    { top: "44%", delay: 5, hue: "180,200,240", duration: 22, opacity: 0.35, rotate: -6 },
    { top: "68%", delay: 9, hue: "255,210,150", duration: 16, opacity: 0.5, rotate: -10 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen">
      {streaks.map((s, i) => (
        <motion.div
          key={i}
          initial={{ x: "-120%", opacity: 0 }}
          animate={{ x: "120%", opacity: [0, s.opacity, s.opacity, 0] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
            times: [0, 0.2, 0.8, 1],
          }}
          className="absolute h-[2px] w-[60%] blur-[3px]"
          style={{
            top: s.top,
            transform: `rotate(${s.rotate}deg)`,
            background: `linear-gradient(90deg, transparent, rgba(${s.hue},0.9), transparent)`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}

/** Bokeh / dust particles — soft circles of varying size, opacity and blur.
 *  Pre-baked at module load and rounded so SSR + client emit identical CSS
 *  strings (avoids React hydration mismatch on float precision). */
const BOKEH = Array.from({ length: 28 }).map((_, i) => {
  const seed = i * 12.9898;
  const r = (n: number) => Math.abs(Math.sin(seed * (n + 1)) * 43758.5453) % 1;
  const round = (n: number, d = 2) => Number(n.toFixed(d));
  return {
    left: round(r(1) * 100),
    top: round(r(2) * 100),
    size: round(4 + r(3) * 14),
    blur: round(2 + r(4) * 6),
    opacity: round(0.15 + r(5) * 0.35, 3),
    duration: round(8 + r(6) * 10),
    delay: round(r(7) * 6),
    gold: r(8) > 0.55,
  };
});

export function Bokeh() {
  const dots = BOKEH;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -40, 0], opacity: [d.opacity * 0.4, d.opacity, d.opacity * 0.4] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            filter: `blur(${d.blur}px)`,
            background: d.gold
              ? "radial-gradient(circle, rgba(255,220,150,0.9), transparent 70%)"
              : "radial-gradient(circle, rgba(220,230,255,0.9), transparent 70%)",
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}

/** Lens flare — anchored top-right; gentle pulse to feel like a real camera. */
export function LensFlare() {
  return (
    <motion.div
      aria-hidden
      animate={{ opacity: [0.7, 0.95, 0.7], scale: [1, 1.06, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute right-[6%] top-[10%] z-[2] h-[560px] w-[560px] mix-blend-screen"
      style={{
        background:
          "radial-gradient(closest-side, rgba(255,235,180,0.8), rgba(212,175,55,0.3) 30%, rgba(180,140,80,0.1) 55%, transparent 75%)",
        filter: "blur(4px)",
        willChange: "transform, opacity",
      }}
    />
  );
}

/** Heavy cinematic vignette + subtle film grain overlay. */
export function Vignette() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[3]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 45%, transparent 50%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0.92) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

/** Wet-asphalt reflection band — soft mirrored gradient evoking puddle reflection. */
export function WetAsphalt() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[28%]">
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      {/* horizontal highlights, suggesting wet reflectivity */}
      {[0.3, 0.55, 0.78].map((y, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          className="absolute inset-x-[-5%] h-[1px] blur-[2px]"
          style={{
            top: `${y * 100}%`,
            background:
              "linear-gradient(90deg, transparent, rgba(255,220,170,0.7), rgba(255,255,255,0.4), rgba(180,200,240,0.6), transparent)",
          }}
        />
      ))}
    </div>
  );
}
