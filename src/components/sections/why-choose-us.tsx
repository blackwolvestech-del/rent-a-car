"use client";

import { motion } from "framer-motion";
import {
  Headphones,
  ShieldCheck,
  Award,
  Clock,
  BadgeCheck,
  Leaf,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const FEATURES = [
  { icon: Headphones, title: "24/7 Support", text: "A dedicated helpdesk and rapid-response teams on call around the clock." },
  { icon: ShieldCheck, title: "Fully Compliant", text: "Licensed, insured, and audited against strict HSE and statutory standards." },
  { icon: Award, title: "ISO Certified", text: "Quality, environmental, and safety management certified end to end." },
  { icon: Clock, title: "SLA-Driven", text: "Clear service levels, measured and reported — accountability you can see." },
  { icon: BadgeCheck, title: "Trained Teams", text: "Screened, vetted, and continuously trained personnel across every trade." },
  { icon: Leaf, title: "Sustainable", text: "Green processes and responsible waste built into every contract." },
];

export function WhyChooseUs() {
  return (
    <section id="why" className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
      <SectionHeading
        eyebrow="Why Al Hadana"
        title="Standards others aspire to"
        description="The details others overlook are the baseline we start from."
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
