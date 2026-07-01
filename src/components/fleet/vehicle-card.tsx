"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Gauge, Users, Zap, ArrowUpRight } from "lucide-react";
import type { Vehicle } from "@/lib/vehicles";
import { formatCurrency } from "@/lib/utils";

export function VehicleCard({
  vehicle,
  index,
  onQuickView,
}: {
  vehicle: Vehicle;
  index: number;
  onQuickView: (v: Vehicle) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // 3D tilt
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 14);
    rx.set((0.5 - py) * 14);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, ${vehicle.accent}22, transparent 60%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.article
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          reset();
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="shine group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-card transition-shadow duration-500 hover:border-white/15"
      >
        {/* dynamic glow */}
        <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          <span className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-text backdrop-blur">
            {vehicle.category}
          </span>
          <span className="absolute right-4 top-4 z-10 rounded-full bg-gold px-3 py-1 text-[11px] font-bold text-[#0a0a0a]">
            {formatCurrency(vehicle.pricePerDay)}/day
          </span>
        </div>

        {/* body */}
        <div className="relative z-20 flex flex-1 flex-col p-6" style={{ transform: "translateZ(40px)" }}>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">{vehicle.brand}</p>
          <h3 className="mt-1 font-display text-2xl font-bold">{vehicle.name}</h3>
          <p className="mt-1 text-sm text-muted">{vehicle.tagline}</p>

          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/[0.07] pt-5 text-center">
            <Spec icon={<Zap className="h-4 w-4" />} value={`${vehicle.power}`} label="HP" />
            <Spec icon={<Gauge className="h-4 w-4" />} value={`${vehicle.acceleration}s`} label="0-100" />
            <Spec icon={<Users className="h-4 w-4" />} value={`${vehicle.seats}`} label="Seats" />
          </div>

          <div className="mt-6 flex gap-2">
            <button
              onClick={() => onQuickView(vehicle)}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-xs font-medium uppercase tracking-wider transition-all duration-300 hover:border-white/40"
            >
              Quick View
            </button>
            <Link
              href={`/fleet/${vehicle.id}`}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#0a0a0a] transition-all duration-300 hover:bg-gold-soft"
            >
              Details
              <ArrowUpRight className={`h-3.5 w-3.5 transition-transform duration-300 ${hovered ? "translate-x-0.5 -translate-y-0.5" : ""}`} />
            </Link>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function Spec({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-gold">{icon}</span>
      <span className="font-display text-base font-bold leading-none">{value}</span>
      <span className="text-[10px] uppercase tracking-wider text-muted">{label}</span>
    </div>
  );
}
