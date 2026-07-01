"use client";

import { useEffect, useRef } from "react";
import { type MotionValue } from "framer-motion";

/**
 * Perspective road that flows beneath the camera. Driven by a `speed` motion
 * value (0..1). Lane stripes scroll downward — the higher the speed, the
 * faster the world rushes past, which is how a tracking-shot commercial feels.
 *
 * Implementation: a flat plane tilted on rotateX so repeating linear-gradient
 * stripes naturally converge toward the horizon. We push a continuous
 * background-position offset via animation frame, decoupled from scroll
 * position so motion stays smooth at any scroll velocity.
 */
export function RoadTracker({ speed }: { speed: MotionValue<number> }) {
  const stripesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let last = performance.now();
    let offset = 0;
    let mounted = true;
    const tick = (now: number) => {
      if (!mounted) return;
      const delta = now - last;
      last = now;
      const s = speed.get();
      offset = (offset + s * delta * 1.4) % 240;
      const el = stripesRef.current;
      if (el) {
        el.style.transform = `translateY(${offset}px)`;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => {
      mounted = false;
    };
    // speed is a stable motion-value ref read via .get() each frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[48%] overflow-hidden"
      style={{ perspective: "700px", perspectiveOrigin: "50% 0%" }}
    >
      {/* The road plane — tilted to converge toward the horizon */}
      <div
        className="absolute left-1/2 top-0 h-[260%] w-[260%] -translate-x-1/2"
        style={{
          transform: "translateX(-50%) rotateX(72deg)",
          transformOrigin: "center top",
        }}
      >
        {/* Asphalt base */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 100% at 50% 0%, #1a1c20 0%, #0a0a0b 60%, #050506 100%)",
          }}
        />

        {/* Wet sheen */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(40% 80% at 50% 5%, rgba(180,200,240,0.18), transparent 70%)",
          }}
        />

        {/* Centre lane stripes (animated) */}
        <div
          ref={stripesRef}
          className="absolute left-1/2 top-0 h-[120%] w-[6%] -translate-x-1/2 will-change-transform"
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg, rgba(255,220,150,0.95) 0 80px, transparent 80px 240px)",
          }}
        />

        {/* Outer lane lines */}
        <div className="absolute inset-y-0 left-[30%] w-[2px] bg-white/15" />
        <div className="absolute inset-y-0 right-[30%] w-[2px] bg-white/15" />
        <div className="absolute inset-y-0 left-[14%] w-[1px] bg-white/8" />
        <div className="absolute inset-y-0 right-[14%] w-[1px] bg-white/8" />
      </div>

      {/* Horizon haze — covers the seam where the road meets the photo */}
      <div
        className="absolute inset-x-0 top-0 h-[35%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}

/**
 * Streetlight rig — N "poles" stream from the horizon past the camera on
 * either side. Each pole has a normalised depth `z` in [0, 1]; we project
 * that to a screen position with quadratic falloff (cinematic perspective)
 * and advance every frame by the current speed.
 */
export function StreetlightRig({ speed }: { speed: MotionValue<number> }) {
  const N = 10;
  const refsL = useRef<(HTMLDivElement | null)[]>([]);
  const refsR = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const zsL = Array.from({ length: N }, (_, i) => (i + 0.5) / N);
    const zsR = Array.from({ length: N }, (_, i) => i / N);
    let last = performance.now();
    let mounted = true;

    const project = (
      zs: number[],
      refs: (HTMLDivElement | null)[],
      side: -1 | 1
    ) => {
      for (let i = 0; i < N; i++) {
        const z = zs[i];
        const el = refs[i];
        if (!el) continue;
        const scale = 0.1 + Math.pow(z, 2.2) * 2.6;
        const xOffset = side * (4 + Math.pow(z, 1.6) * 55);
        const left = 50 + xOffset;
        const top = 30 + Math.pow(z, 1.4) * 70;
        const opacity =
          z < 0.08 ? z * 12 : z > 0.93 ? Math.max(0, (1 - z) * 14) : 1;
        el.style.left = `${left}%`;
        el.style.top = `${top}%`;
        el.style.transform = `translate(-50%, -100%) scale(${scale})`;
        el.style.opacity = String(Math.min(1, opacity));
      }
    };

    const tick = (now: number) => {
      if (!mounted) return;
      const delta = now - last;
      last = now;
      const s = speed.get();
      if (s > 0.001) {
        for (let i = 0; i < N; i++) {
          zsL[i] = (zsL[i] + (s * delta) / 2200) % 1;
          zsR[i] = (zsR[i] + (s * delta) / 2200) % 1;
        }
      }
      project(zsL, refsL.current, -1);
      project(zsR, refsR.current, 1);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[2] overflow-hidden mix-blend-screen">
      {Array.from({ length: N }).map((_, i) => (
        <div
          key={`L${i}`}
          ref={(el) => {
            refsL.current[i] = el;
          }}
          className="absolute will-change-transform"
          style={{ opacity: 0 }}
        >
          <Pole />
        </div>
      ))}
      {Array.from({ length: N }).map((_, i) => (
        <div
          key={`R${i}`}
          ref={(el) => {
            refsR.current[i] = el;
          }}
          className="absolute will-change-transform"
          style={{ opacity: 0 }}
        >
          <Pole />
        </div>
      ))}
    </div>
  );
}

/** A single lamp head + halo + arm — flexible enough to read at any scale. */
function Pole() {
  return (
    <div className="relative">
      <div
        className="absolute left-1/2 top-0 h-[80px] w-[3px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(80,80,90,0.6), rgba(40,40,46,0.9))",
        }}
      />
      <div
        className="absolute -top-1 left-1/2 h-[14px] w-[14px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,235,180,1), rgba(255,210,140,0.65) 35%, rgba(212,175,55,0.15) 65%, transparent 80%)",
          boxShadow:
            "0 0 30px 8px rgba(255,220,150,0.6), 0 0 80px 20px rgba(255,200,120,0.25)",
        }}
      />
    </div>
  );
}
