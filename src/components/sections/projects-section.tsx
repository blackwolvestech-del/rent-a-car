"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, ArrowLeftRight } from "lucide-react";
import {
  projects,
  projectCategories,
  type Project,
  type ProjectCategory,
} from "@/lib/company";
import { SectionHeading } from "@/components/ui/section-heading";
import { BeforeAfter } from "@/components/projects/before-after";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const [active, setActive] = useState<Project | null>(null);

  const visible =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
      <SectionHeading
        eyebrow="Our work"
        title="Delivered across the region"
        description="A selection of facilities we keep running — from grade-A towers to industrial plants."
      />

      {/* Filters */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {projectCategories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300",
              filter === c
                ? "bg-gold text-[#0a0a0a]"
                : "border border-white/15 text-muted hover:border-white/30 hover:text-text"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <motion.div
        layout
        className="grid auto-rows-[220px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.button
              layout
              key={p.title}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActive(p)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/[0.07] text-left",
                p.span === "tall" && "row-span-2",
                p.span === "wide" && "sm:col-span-2"
              )}
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {(p.before && p.after) && (
                <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-gold backdrop-blur">
                  <ArrowLeftRight className="h-3 w-3" /> Before / After
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-gold">
                  {p.category}
                </span>
                <h3 className="mt-1 font-display text-lg font-bold leading-tight">
                  {p.title}
                </h3>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/60">
                  <MapPin className="h-3 w-3" /> {p.location}
                </p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-5 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-bg-elevated"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-black/80"
              >
                <X className="h-5 w-5" />
              </button>

              {active.before && active.after ? (
                <BeforeAfter
                  before={active.before}
                  after={active.after}
                  alt={active.title}
                />
              ) : (
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-7">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                  {active.category}
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
                  {active.title}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <MapPin className="h-4 w-4" /> {active.location}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/80">
                  {active.summary}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
