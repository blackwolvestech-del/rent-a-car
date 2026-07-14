"use client";

import { motion } from "framer-motion";
import {
  Headphones,
  CalendarRange,
  Plane,
  Cog,
  Tag,
  Wrench,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const FEATURES = [
  { icon: Plane, title: "Airport Convenience", text: "Minutes from Larnaca Airport, with fast pickup and drop-off so your trip starts the moment you land." },
  { icon: Tag, title: "Transparent Pricing", text: "No hidden fees, no last-minute surprises — the price you see is the price you pay." },
  { icon: Wrench, title: "Well-Maintained Fleet", text: "Every vehicle is regularly serviced, cleaned, and inspected before it reaches you." },
  { icon: CalendarRange, title: "Flexible Rental Options", text: "Daily, weekly, or long-term rentals tailored to your travel plans." },
  { icon: Headphones, title: "24/7 Support", text: "Real help, whenever you need it, throughout your rental period." },
  { icon: Cog, title: "All Automatic", text: "Every car in the fleet is automatic — easy, comfortable, stress-free driving." },
];

export function WhyChooseUs() {
  return (
    <section id="why" className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
      <SectionHeading
        eyebrow="Why Choose Al Hadana"
        title="The smart way to rent a car in Cyprus"
        description="Renting a car near Larnaca Airport should be simple — and with Al Hadana, it is. We combine reliable service, honest pricing, and a well-maintained fleet to get you on the road fast, with zero hassle."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-card p-8 transition-colors hover:border-gold/30"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/5 blur-2xl transition-all duration-500 group-hover:bg-gold/10" />
            <div className="relative">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 text-gold transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
