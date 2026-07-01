"use client";

import { motion } from "framer-motion";

/**
 * Soft confetti burst — used once on the booking-success page. Single-shot
 * animation, kept gentle so it reads as luxury (gold/cream particles), not
 * children's-party. Pre-computed so SSR + client render identical strings.
 */
const PARTICLES = Array.from({ length: 36 }).map((_, i) => {
  const r = (n: number) =>
    Math.abs(Math.sin(i * 12.9898 * (n + 1)) * 43758.5453) % 1;
  const round = (n: number, d = 2) => Number(n.toFixed(d));
  return {
    left: round(r(1) * 100),
    delay: round(r(2) * 0.6, 2),
    drift: round(-30 + r(3) * 60),
    duration: round(2.2 + r(4) * 1.8, 2),
    rotate: round(r(5) * 540),
    size: round(5 + r(6) * 7),
    gold: r(7) > 0.4,
  };
});

export function ConfettiBurst() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] overflow-hidden"
    >
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          initial={{ y: -20, x: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: "70vh",
            x: p.drift,
            opacity: [1, 1, 0],
            rotate: p.rotate,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute top-0 rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.gold
              ? "linear-gradient(135deg, #f4d870, #d4af37)"
              : "linear-gradient(135deg, #f8f8f8, #c9c4b4)",
            boxShadow: p.gold
              ? "0 0 10px rgba(212,175,55,0.6)"
              : "0 0 8px rgba(255,255,255,0.4)",
          }}
        />
      ))}
    </div>
  );
}
