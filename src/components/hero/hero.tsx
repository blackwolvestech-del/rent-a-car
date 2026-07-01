"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useTransform,
  useReducedMotion,
  useMotionValue,
} from "framer-motion";
import { ChevronRight, Sparkles, MousePointer2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { MarqueeBanner } from "@/components/layout/marquee-banner";

/**
 * Cinematic video hero — clean.
 *
 * The source clip is a portrait recording, so we present it the way premium
 * sites present vertical video inside a wide frame:
 *   1. A heavily blurred COVER copy fills the whole hero (ambient backdrop,
 *      no black letterbox bars).
 *   2. The full, sharp video sits centered via object-contain so nothing is
 *      cropped — the entire frame is always visible.
 *
 * No fog / streetlights / bokeh / lens-flare / road overlays — just the video,
 * with a light top + bottom scrim so the nav and copy stay legible.
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Scroll progress across the hero (Lenis-safe: read layout each frame).
  const progress = useMotionValue(0);
  useEffect(() => {
    let mounted = true;
    const tick = () => {
      if (!mounted) return;
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const passed = -r.top;
        progress.set(total > 0 ? Math.max(0, Math.min(1, passed / total)) : 0);
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => {
      mounted = false;
    };
  }, [progress]);

  // Gentle scroll-linked zoom on the video + copy parallax/fade.
  const videoScale = useTransform(progress, [0, 1], [1, 1.08]);
  const copyY = useTransform(progress, [0, 0.5], ["0%", "-22%"]);
  const copyOpacity = useTransform(progress, [0, 0.45], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[180vh] w-full"
      aria-label="Hero"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Full-bleed video — covers the entire banner edge to edge */}
        <motion.div
          style={{ scale: reduced ? 1 : videoScale }}
          className="absolute inset-0 will-change-transform"
        >
          <video
            src="/hero/hero.mp4"
            poster="/hero/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>

        {/* Light legibility scrims only */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/70 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/45 to-transparent"
        />

        {/* Promo marquee under the nav */}
        <div className="absolute inset-x-0 top-[72px] z-[20]">
          <MarqueeBanner />
        </div>

        {/* Hero copy */}
        <motion.div
          style={{
            y: reduced ? 0 : copyY,
            opacity: reduced ? 1 : copyOpacity,
          }}
          className="relative z-[10] mx-auto flex h-full max-w-6xl flex-col items-center justify-end px-6 pb-24 text-center sm:justify-center sm:pb-0"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.28em] text-white/80 backdrop-blur-md animate-[fadeUp_1.2s_cubic-bezier(0.16,1,0.3,1)_both]">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            Premium & economy car rental
          </div>

          <h1
            className="font-display text-[clamp(2.6rem,8vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.02em] animate-[fadeUp_1.4s_cubic-bezier(0.16,1,0.3,1)_0.15s_both]"
            style={{ textShadow: "0 4px 60px rgba(0,0,0,0.7)" }}
          >
            <span className="block text-gradient-light">Rent the drive.</span>
            <span className="block text-gradient-gold">Own the road.</span>
          </h1>

          <p
            className="mt-8 max-w-xl text-balance text-base leading-relaxed text-white/75 sm:text-lg animate-[fadeUp_1.2s_cubic-bezier(0.16,1,0.3,1)_0.45s_both]"
            style={{ textShadow: "0 2px 30px rgba(0,0,0,0.8)" }}
          >
            From economy runabouts to premium SUVs — a clean, fully automatic
            fleet from Al Hadana, with instant booking, insurance included, and
            free airport pickup.
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

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ opacity: reduced ? 1 : copyOpacity }}
          className="absolute bottom-10 left-1/2 z-[10] flex -translate-x-1/2 flex-col items-center gap-2 text-white/60"
        >
          <MousePointer2 className="h-4 w-4 animate-bounce text-gold" />
          <span className="text-[10px] uppercase tracking-[0.35em]">
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </section>
  );
}
