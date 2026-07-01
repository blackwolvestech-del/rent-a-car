"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useTransform,
  useReducedMotion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { ChevronRight, Sparkles, MousePointer2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { MarqueeBanner } from "@/components/layout/marquee-banner";
import {
  VolumetricFog,
  LightStreaks,
  Bokeh,
  LensFlare,
  Vignette,
  WetAsphalt,
} from "./cinematic-overlays";
import { RoadTracker, StreetlightRig } from "./road-tracker";

/**
 * Cinematic scroll-driven hero — "tracking shot" aesthetic.
 *
 * The hero photograph is the camera-car's view of the hero vehicle: the car
 * stays composed in frame while the world flows past. Scroll position is the
 * accelerator. We stage the experience across the scroll range:
 *
 *   0%   Parked — headline visible, world still
 *   5%   Headlights brighten (bottom warm bloom rises)
 *   10%  Engine starts — fine vibration begins
 *   15%  Car starts moving — road stripes begin flowing
 *   30%  Streetlights stream past, fog drifts faster
 *   50%  Camera locks on, copy has faded
 *   70%  Speed builds — light streaks lengthen, blur intensifies
 *   100% Full cruise — Mercedes-commercial frame
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Manual scroll-progress + derived stage values, all updated in a single
  // rAF tick. We avoid useScroll (doesn't observe Lenis) AND the lazy
  // useTransform chain (which only recomputes on subscribers and was
  // failing to propagate to .get() calls inside other rAFs).
  const rawProgress = useMotionValue(0);
  const headlights = useMotionValue(0);
  const engine = useMotionValue(0);
  const speed = useMotionValue(0);

  useEffect(() => {
    let mounted = true;
    const lerp = (
      x: number,
      inMin: number,
      inMax: number,
      outMin: number,
      outMax: number
    ) => {
      if (x <= inMin) return outMin;
      if (x >= inMax) return outMax;
      const t = (x - inMin) / (inMax - inMin);
      return outMin + t * (outMax - outMin);
    };
    let smooth = 0;
    let last = performance.now();
    const compute = (now: number) => {
      if (!mounted) return;
      const delta = now - last;
      last = now;
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = r.height - vh;
        const passed = -r.top;
        const v = total > 0 ? Math.max(0, Math.min(1, passed / total)) : 0;
        // Hand-rolled spring-like smoothing (stable & visible to .get()).
        const k = Math.min(1, delta * 0.012);
        smooth += (v - smooth) * k;
        rawProgress.set(smooth);
        headlights.set(lerp(smooth, 0, 0.12, 0, 1));
        engine.set(lerp(smooth, 0.08, 0.13, 0, 1));
        // Two-segment ramp matching original useTransform [0.15, 0.55, 1] -> [0, 0.55, 1]
        const sp =
          smooth <= 0.15
            ? 0
            : smooth <= 0.55
              ? lerp(smooth, 0.15, 0.55, 0, 0.55)
              : lerp(smooth, 0.55, 1, 0.55, 1);
        speed.set(sp);
      }
      requestAnimationFrame(compute);
    };
    requestAnimationFrame(compute);
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const p = rawProgress;
  /** Motion blur intensity in px on the car (subtle at low speed) */
  const carBlurPx = useTransform(speed, (v) => v * 6);
  const carFilter = useTransform(carBlurPx, (b) => `blur(${b}px)`);

  // Camera/photo motion: scroll-linked dolly + idle camera breathing
  const bgScale = useTransform(p, [0, 1], [1.05, 1.22]);
  const bgY = useTransform(p, [0, 1], ["0%", "-8%"]);

  // Parallax for atmosphere
  const fogY = useTransform(p, [0, 1], ["0%", "-18%"]);
  const streakY = useTransform(p, [0, 1], ["0%", "-30%"]);
  const flareY = useTransform(p, [0, 1], ["0%", "-22%"]);
  const flareX = useTransform(p, [0, 1], ["0%", "-6%"]);

  // Speed-coupled atmosphere intensities
  const fogOpacity = useTransform(speed, [0, 1], [0.6, 1.15]);
  const streakOpacity = useTransform(speed, [0, 0.4, 1], [0.2, 0.8, 1.4]);
  const flareOpacity = useTransform(speed, [0, 0.7, 1], [0.6, 1, 1.3]);
  const headlightOpacity = useTransform(headlights, [0, 1], [0.15, 1]);

  // Copy parallax + cinematic depth-of-field exit
  const copyY = useTransform(p, [0, 0.4], ["0%", "-28%"]);
  const copyOpacity = useTransform(p, [0, 0.32], [1, 0]);
  const copyFilter = useTransform(p, (v) => `blur(${Math.min(10, v * 28)}px)`);

  // ---- Engine/speed shake on the car frame --------------------------------
  // We drive the camera-shake transform manually each frame so it can mix
  // both engine rumble (low-freq, idle) and speed jitter (higher freq).
  const shakeX = useMotionValue(0);
  const shakeY = useMotionValue(0);

  useEffect(() => {
    if (reduced) return;
    let mounted = true;
    const tick = (time: number) => {
      if (!mounted) return;
      const e = engine.get();
      const s = speed.get();
      const rumble = e * (1 - s * 0.6);
      const rx =
        Math.sin(time * 0.018) * 0.6 * rumble +
        Math.sin(time * 0.072) * 0.25 * rumble;
      const ry =
        Math.cos(time * 0.022) * 0.5 * rumble +
        Math.cos(time * 0.09) * 0.2 * rumble;
      const jx = (Math.sin(time * 0.18) + Math.sin(time * 0.41)) * 0.6 * s;
      const jy = (Math.cos(time * 0.21) + Math.cos(time * 0.37)) * 0.5 * s;
      shakeX.set(rx + jx);
      shakeY.set(ry + jy);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const shakeTransform = useMotionTemplate`translate3d(${shakeX}px, ${shakeY}px, 0)`;

  return (
    <section
      ref={ref}
      className="relative h-[360vh] w-full"
      aria-label="Hero — drive luxury"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* ----- Photographic background — camera-car POV ----- */}
        <motion.div
          style={{ scale: reduced ? 1.05 : bgScale, y: reduced ? "0%" : bgY }}
          className="absolute inset-0 will-change-transform"
        >
          {/* Wrapper for engine/speed shake */}
          <motion.div
            style={{ transform: reduced ? undefined : shakeTransform }}
            className="absolute inset-0"
          >
            {/* Idle camera-breathing */}
            <motion.div
              animate={
                reduced
                  ? undefined
                  : {
                      scale: [1, 1.035, 1],
                      x: ["0%", "-0.8%", "0%"],
                      y: ["0%", "0.6%", "0%"],
                    }
              }
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-full w-full"
            >
              <motion.div
                style={{ filter: reduced ? "none" : carFilter }}
                className="absolute inset-0"
              >
                <video
                  src="/hero/hero.mp4"
                  poster="/hero/hero-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: "center center" }}
                  aria-hidden
                />
              </motion.div>

              {/* Cinematic colour grade */}
              <div
                className="absolute inset-0 mix-blend-color"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(15,30,55,0.55) 0%, rgba(0,0,0,0) 50%, rgba(80,55,15,0.4) 100%)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/15 to-black/70" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(65% 55% at 50% 45%, transparent 0%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.85) 100%)",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ----- Perspective road flowing beneath the camera ----- */}
        {!reduced && <RoadTracker speed={speed} />}

        {/* ----- Streetlights streaming past ----- */}
        {!reduced && <StreetlightRig speed={speed} />}

        {/* ----- Atmospheric overlays ----- */}
        <motion.div
          style={{ y: reduced ? "0%" : fogY, opacity: fogOpacity }}
          className="absolute inset-0"
        >
          <VolumetricFog />
        </motion.div>

        <Bokeh />

        <motion.div
          style={{ y: reduced ? "0%" : streakY, opacity: streakOpacity }}
          className="absolute inset-0"
        >
          <LightStreaks />
        </motion.div>

        <motion.div
          style={{ y: reduced ? "0%" : flareY, x: reduced ? "0%" : flareX, opacity: flareOpacity }}
          className="absolute inset-0"
        >
          <LensFlare />
        </motion.div>

        {/* Speed-coupled headlight bloom anchored low — pours forward as the
            car accelerates. */}
        <motion.div
          aria-hidden
          style={{ opacity: headlightOpacity }}
          className="pointer-events-none absolute inset-0 z-[2] mix-blend-screen"
        >
          <div
            className="absolute left-[-12%] bottom-[12%] h-[55%] w-[70%] blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,235,180,0.55), rgba(255,200,120,0.18) 35%, transparent 70%)",
            }}
          />
          <div
            className="absolute right-[-12%] bottom-[14%] h-[50%] w-[65%] blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,235,180,0.45), rgba(255,200,120,0.14) 35%, transparent 70%)",
            }}
          />
        </motion.div>

        <WetAsphalt />
        <Vignette />

        {/* ----- Promo marquee under the nav ----- */}
        <div className="absolute inset-x-0 top-[72px] z-[20]">
          <MarqueeBanner />
        </div>

        {/* ----- Hero copy ----- */}
        <motion.div
          style={{
            y: reduced ? 0 : copyY,
            opacity: reduced ? 1 : copyOpacity,
            filter: reduced ? "none" : copyFilter,
          }}
          className="relative z-[10] mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.28em] text-white/80 backdrop-blur-md animate-[fadeUp_1.2s_cubic-bezier(0.16,1,0.3,1)_both]">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            The world&apos;s finest fleet, on demand
          </div>

          <h1
            className="font-display text-[clamp(2.6rem,8vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.02em] animate-[fadeUp_1.4s_cubic-bezier(0.16,1,0.3,1)_0.15s_both]"
            style={{ textShadow: "0 4px 60px rgba(0,0,0,0.6)" }}
          >
            <span className="block text-gradient-light">Drive Luxury.</span>
            <span className="block text-gradient-gold">Experience Freedom.</span>
          </h1>

          <p
            className="mt-8 max-w-xl text-balance text-base leading-relaxed text-white/70 sm:text-lg animate-[fadeUp_1.2s_cubic-bezier(0.16,1,0.3,1)_0.45s_both]"
            style={{ textShadow: "0 2px 30px rgba(0,0,0,0.7)" }}
          >
            Choose from the world&apos;s finest luxury, sports, and executive
            vehicles — delivered with concierge precision.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row animate-[fadeUp_1.2s_cubic-bezier(0.16,1,0.3,1)_0.6s_both]">
            <Link href="/fleet">
              <MagneticButton variant="gold">
                Book Now <ChevronRight className="h-4 w-4" />
              </MagneticButton>
            </Link>
            <Link href="/fleet">
              <MagneticButton variant="outline">Explore Fleet</MagneticButton>
            </Link>
          </div>
        </motion.div>

        {/* ----- Scroll cue ----- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ opacity: reduced ? 1 : copyOpacity }}
          className="absolute bottom-10 left-1/2 z-[10] flex -translate-x-1/2 flex-col items-center gap-2 text-white/60"
        >
          <MousePointer2 className="h-4 w-4 animate-bounce text-gold" />
          <span className="text-[10px] uppercase tracking-[0.35em]">
            Scroll to drive
          </span>
        </motion.div>
      </div>
    </section>
  );
}
