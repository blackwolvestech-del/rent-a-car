"use client";

import { motion } from "framer-motion";
import {
  Headphones,
  ShieldCheck,
  Infinity as InfinityIcon,
  Plane,
  Cog,
  Tag,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const FEATURES = [
  { icon: Headphones, title: "24/7 Support", text: "A real person on the line whenever you need us — before, during, and after your rental." },
  { icon: ShieldCheck, title: "Insurance Included", text: "Comprehensive cover on every booking, with a zero-excess upgrade available." },
  { icon: InfinityIcon, title: "Unlimited Mileage", text: "No per-kilometre charges. Drive as far as the road takes you." },
  { icon: Plane, title: "Airport Pickup", text: "Your car waiting at the terminal, or delivered wherever you need it." },
  { icon: Cog, title: "All Automatic", text: "Every car in the fleet is automatic — easy, comfortable, stress-free driving." },
  { icon: Tag, title: "No Hidden Charges", text: "The price you see is the price you pay. Transparent, to the cent." },
];

export function WhyChooseUs() {
  return (
    <section id="why" className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
      <SectionHeading
        eyebrow="Why Al Hadana"
        title="Renting made effortless"
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
