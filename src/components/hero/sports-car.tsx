"use client";

import { motion, type MotionValue } from "framer-motion";

/**
 * A side-profile supercar built entirely in SVG so the scroll animation works
 * with zero external assets. Wheels are separate groups driven by a shared
 * rotation MotionValue; the body carries gradient bodywork, glass, and a
 * headlight beam that can be toggled via opacity.
 */
export function SportsCar({
  wheelRotation,
  className,
}: {
  wheelRotation: MotionValue<number>;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 900 360"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Luxury sports car"
    >
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4f4f4" />
          <stop offset="22%" stopColor="#d8d8da" />
          <stop offset="55%" stopColor="#8d9098" />
          <stop offset="100%" stopColor="#3c3e44" />
        </linearGradient>
        <linearGradient id="bodyLower" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a5d64" />
          <stop offset="100%" stopColor="#1a1b1f" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfe4ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1b2a44" stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id="rim" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e9e9ee" />
          <stop offset="55%" stopColor="#9a9aa2" />
          <stop offset="100%" stopColor="#2b2b30" />
        </radialGradient>
        <linearGradient id="reflect" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="headlamp" cx="0%" cy="50%" r="100%">
          <stop offset="0%" stopColor="#fff7d6" />
          <stop offset="100%" stopColor="#fff7d6" stopOpacity="0" />
        </radialGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {/* Headlight beam */}
      <polygon
        points="120,210 -260,150 -260,300 120,250"
        fill="url(#headlamp)"
        opacity="0.7"
      />

      {/* Ground contact shadow */}
      <ellipse cx="450" cy="320" rx="380" ry="22" fill="#000" opacity="0.55" filter="url(#soft)" />

      {/* Lower body / sills */}
      <path
        d="M120 250 C 160 268, 740 268, 800 248 L 805 282 C 760 300, 150 300, 120 282 Z"
        fill="url(#bodyLower)"
      />

      {/* Main bodywork */}
      <path
        d="M70 248
           C 95 210, 150 205, 205 200
           C 245 165, 330 138, 430 138
           C 545 138, 615 165, 670 198
           C 730 200, 800 208, 835 232
           C 850 244, 845 255, 820 258
           L 120 258
           C 88 258, 60 258, 70 248 Z"
        fill="url(#body)"
      />

      {/* Greenhouse / cabin glass */}
      <path
        d="M270 168 C 320 146, 420 144, 480 150 C 540 156, 575 175, 600 196 L 250 196 C 250 184, 256 176, 270 168 Z"
        fill="url(#glass)"
        stroke="#0c1422"
        strokeWidth="2"
      />
      {/* A/B pillar */}
      <rect x="418" y="146" width="7" height="50" fill="#16181d" />

      {/* Door crease reflection */}
      <path
        d="M150 232 C 320 214, 560 214, 760 234"
        stroke="#ffffff"
        strokeOpacity="0.4"
        strokeWidth="2"
        fill="none"
      />

      {/* Side intake */}
      <path d="M610 210 L 668 206 L 660 234 L 612 236 Z" fill="#101114" />

      {/* Front splitter */}
      <path d="M70 252 C 60 262, 70 270, 96 270 L 130 262 Z" fill="#0d0e11" />

      {/* Tail light */}
      <rect x="816" y="226" width="20" height="10" rx="3" fill="#d4252f" />

      {/* Moving reflection sweep */}
      <rect
        x="120"
        y="150"
        width="700"
        height="110"
        fill="url(#reflect)"
        opacity="0.25"
      />

      {/* ---- Rear wheel ---- */}
      <g transform="translate(660,262)">
        <circle r="62" fill="#0a0a0b" />
        <circle r="58" fill="#161616" />
        <motion.g style={{ rotate: wheelRotation }}>
          <circle r="40" fill="url(#rim)" />
          {Array.from({ length: 10 }).map((_, i) => (
            <rect
              key={i}
              x="-3.5"
              y="-40"
              width="7"
              height="40"
              rx="3"
              fill="#3a3a40"
              transform={`rotate(${i * 36})`}
            />
          ))}
          <circle r="11" fill="#d4af37" />
          <circle r="5" fill="#1a1a1a" />
        </motion.g>
      </g>

      {/* ---- Front wheel ---- */}
      <g transform="translate(220,262)">
        <circle r="62" fill="#0a0a0b" />
        <circle r="58" fill="#161616" />
        <motion.g style={{ rotate: wheelRotation }}>
          <circle r="40" fill="url(#rim)" />
          {Array.from({ length: 10 }).map((_, i) => (
            <rect
              key={i}
              x="-3.5"
              y="-40"
              width="7"
              height="40"
              rx="3"
              fill="#3a3a40"
              transform={`rotate(${i * 36})`}
            />
          ))}
          <circle r="11" fill="#d4af37" />
          <circle r="5" fill="#1a1a1a" />
        </motion.g>
      </g>

      {/* Headlamp lens */}
      <path d="M84 232 C 96 222, 120 222, 132 230 L 126 244 L 90 244 Z" fill="#fff7d6" />
    </svg>
  );
}
