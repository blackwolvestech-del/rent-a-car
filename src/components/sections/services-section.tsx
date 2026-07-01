"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Sparkles,
  Bug,
  Wrench,
  Hammer,
  Users,
  Factory,
  Leaf,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { services, type ServiceIcon } from "@/lib/company";
import { SectionHeading } from "@/components/ui/section-heading";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  building: Building2,
  sparkles: Sparkles,
  bug: Bug,
  wrench: Wrench,
  hammer: Hammer,
  users: Users,
  factory: Factory,
  leaf: Leaf,
};

export function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
      <SectionHeading
        eyebrow="What we do"
        title="One partner for every service"
        description="Integrated solutions delivered by trained, accountable teams — so you manage one relationship, not twenty."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: (i % 4) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={`/services/${s.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-card p-7 transition-all duration-500 hover:border-gold/40 hover:bg-card/80"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-[#0a0a0a]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
                </div>

                <h3 className="relative mt-6 font-display text-xl font-bold tracking-tight">
                  {s.title}
                </h3>
                <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {s.short}
                </p>

                <span className="relative mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/80 transition-colors group-hover:text-gold">
                  Learn more
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
