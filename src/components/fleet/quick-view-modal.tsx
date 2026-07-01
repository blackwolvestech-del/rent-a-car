"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Gauge, Users, Zap, Cog, Check } from "lucide-react";
import type { Vehicle } from "@/lib/vehicles";
import { formatCurrency } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function QuickViewModal({
  vehicle,
  onClose,
}: {
  vehicle: Vehicle | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {vehicle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-card md:grid-cols-2"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-text backdrop-blur transition-colors hover:bg-gold hover:text-black"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-[4/3] md:aspect-auto">
              <Image
                src={vehicle.image}
                alt={`${vehicle.brand} ${vehicle.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent md:bg-gradient-to-r" />
            </div>

            <div className="flex flex-col p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">{vehicle.brand}</p>
              <h3 className="mt-2 font-display text-3xl font-bold">{vehicle.name}</h3>
              <p className="mt-2 text-sm text-muted">{vehicle.tagline}</p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Stat icon={<Zap className="h-4 w-4" />} label="Power" value={`${vehicle.power} hp`} />
                <Stat icon={<Gauge className="h-4 w-4" />} label="0–100 km/h" value={`${vehicle.acceleration}s`} />
                <Stat icon={<Cog className="h-4 w-4" />} label="Transmission" value={vehicle.transmission} />
                <Stat icon={<Users className="h-4 w-4" />} label="Seats" value={`${vehicle.seats}`} />
              </div>

              <ul className="mt-6 space-y-2 text-sm text-muted">
                {["Unlimited mileage", "Fully insured", "Free airport delivery"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold" /> {f}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center justify-between pt-8">
                <div>
                  <span className="font-display text-3xl font-bold text-gold">
                    {formatCurrency(vehicle.pricePerDay)}
                  </span>
                  <span className="text-sm text-muted"> / day</span>
                </div>
                <MagneticButton variant="gold">Book This Car</MagneticButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-bg-elevated p-4">
      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted">
        <span className="text-gold">{icon}</span>
        {label}
      </span>
      <p className="mt-1 font-display text-lg font-bold">{value}</p>
    </div>
  );
}
