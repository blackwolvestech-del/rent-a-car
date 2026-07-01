"use client";

import { motion } from "framer-motion";
import {
  Home,
  Briefcase,
  Factory,
  Landmark,
  Hotel,
  Heart,
  School,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { industries, type Industry } from "@/lib/company";
import { SectionHeading } from "@/components/ui/section-heading";

const ICONS: Record<Industry["icon"], LucideIcon> = {
  home: Home,
  briefcase: Briefcase,
  factory: Factory,
  landmark: Landmark,
  hotel: Hotel,
  heart: Heart,
  school: School,
  warehouse: Warehouse,
  // ServiceIcon members that could appear — mapped to sensible defaults
  building: Briefcase,
  sparkles: Briefcase,
  bug: Briefcase,
  wrench: Briefcase,
  hammer: Briefcase,
  users: Briefcase,
  leaf: Briefcase,
};

export function IndustriesSection() {
  return (
    <section
      id="industries"
      className="relative overflow-hidden border-y border-white/[0.07] bg-bg-elevated py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Industries we serve"
          title="Trusted across every sector"
          description="From residential communities to heavy industry, our teams adapt to the standards and compliance each environment demands."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {industries.map((ind, i) => {
            const Icon = ICONS[ind.icon];
            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: (i % 4) * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col items-start gap-4 rounded-2xl border border-white/[0.07] bg-card p-6 transition-all duration-500 hover:border-gold/40 hover:bg-card/70"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-all duration-500 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold leading-tight">
                    {ind.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{ind.blurb}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
