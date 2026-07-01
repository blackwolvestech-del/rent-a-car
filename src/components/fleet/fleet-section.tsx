"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { vehicles, categories, type Vehicle, type VehicleCategory } from "@/lib/vehicles";
import { VehicleCard } from "./vehicle-card";
import { QuickViewModal } from "./quick-view-modal";
import { SectionHeading } from "@/components/ui/section-heading";

export function FleetSection({ showHeading = true }: { showHeading?: boolean }) {
  const [filter, setFilter] = useState<VehicleCategory | "All">("All");
  const [active, setActive] = useState<Vehicle | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? vehicles : vehicles.filter((v) => v.category === filter)),
    [filter]
  );

  return (
    <section id="fleet" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8">
      {showHeading && (
        <SectionHeading
          eyebrow="The Collection"
          title="Our Fleet"
          description="Clean, fully automatic cars from economy to premium — every one ready to book."
        />
      )}

      {/* Filters */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              filter === c ? "text-[#0a0a0a]" : "text-muted hover:text-text"
            }`}
          >
            {filter === c && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-gold"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{c}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((v, i) => (
          <VehicleCard key={v.id} vehicle={v} index={i} onQuickView={setActive} />
        ))}
      </div>

      <QuickViewModal vehicle={active} onClose={() => setActive(null)} />
    </section>
  );
}
