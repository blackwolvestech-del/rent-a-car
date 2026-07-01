"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { vehicles } from "@/lib/vehicles";
import { formatCurrency } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";

export function FeaturedCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <section id="featured" className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Featured"
            title="Icons of the Road"
            description="Hand-picked highlights from the world's most coveted marques."
          />
          <div className="mb-14 flex gap-3">
            <CarouselButton onClick={() => scroll(-1)} aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </CarouselButton>
            <CarouselButton onClick={() => scroll(1)} aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </CarouselButton>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto scroll-pl-6 px-5 pb-6 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {vehicles.map((v, i) => (
          <motion.article
            key={v.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
            whileHover={{ y: -8 }}
            style={{ scrollSnapAlign: "start" }}
            className="group relative h-[440px] w-[330px] shrink-0 overflow-hidden rounded-3xl border border-white/[0.07]"
          >
            <Image
              src={v.image}
              alt={`${v.brand} ${v.name}`}
              fill
              sizes="330px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `radial-gradient(60% 50% at 50% 100%, ${v.accent}33, transparent)` }}
            />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">{v.brand}</p>
              <h3 className="mt-1 font-display text-2xl font-bold">{v.name}</h3>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-muted">from {formatCurrency(v.pricePerDay)}/day</span>
                <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] uppercase tracking-wider">
                  {v.topSpeed} km/h
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function CarouselButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="rounded-full border border-white/15 p-3 text-text transition-all duration-300 hover:border-gold hover:bg-gold hover:text-black"
    >
      {children}
    </button>
  );
}
