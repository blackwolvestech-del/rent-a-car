"use client";

import { motion } from "framer-motion";
import {
  Headphones,
  ShieldCheck,
  Infinity as InfinityIcon,
  Plane,
  Crown,
  Lock,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const FEATURES = [
  { icon: Headphones, title: "24/7 Concierge", text: "A dedicated team on call around the clock, anywhere you drive." },
  { icon: ShieldCheck, title: "Fully Insured", text: "Comprehensive cover on every booking, with zero hidden excess." },
  { icon: InfinityIcon, title: "Unlimited Mileage", text: "No limits, no surcharges. The whole road is yours." },
  { icon: Plane, title: "Airport Pickup", text: "Your car waiting at the terminal, the moment you land." },
  { icon: Crown, title: "Luxury Fleet", text: "Only the latest models from the world's finest marques." },
  { icon: Lock, title: "Secure Payments", text: "PCI-compliant checkout powered by Viva Payments." },
];

export function WhyChooseUs() {
  return (
    <section id="why" className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
      <SectionHeading
        eyebrow="Why Al Hadana"
        title="Engineered Around You"
        description="The details others overlook are the standard we start from."
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
