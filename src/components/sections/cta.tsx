"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="noise relative overflow-hidden rounded-[2.5rem] border border-gold/20 bg-gradient-to-br from-[#141008] via-[#0f0f0f] to-[#0c0c0c] px-8 py-20 text-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_0%,rgba(212,175,55,0.15),transparent)]" />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Let&apos;s keep your world <span className="text-gradient-gold">running</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted">
            Tell us about your facility and we&apos;ll build a tailored proposal — clear scope, clear pricing, no obligation.
          </p>
          <div className="mt-10 flex justify-center">
            <Link href="/contact">
              <MagneticButton variant="gold" className="px-10 py-5 text-base">
                Request a Quote <ArrowRight className="h-5 w-5" />
              </MagneticButton>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
