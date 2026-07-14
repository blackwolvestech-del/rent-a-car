"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check } from "lucide-react";
import { site } from "@/lib/site";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Placeholder: in production this posts to a server action or mail service
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="relative rounded-3xl border border-white/10 bg-bg-elevated/70 p-7 backdrop-blur-xl">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[480px] flex-col items-center justify-center text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold ring-8 ring-gold/[0.04]">
              <Check className="h-7 w-7" />
            </span>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight">
              Message received.
            </h2>
            <p className="mt-3 max-w-sm text-sm text-muted">
              We&apos;ll reply within the hour. If it&apos;s urgent, call{" "}
              {site.phone} — someone is always on shift.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="grid gap-4 sm:grid-cols-2"
          >
            <Field label="Your name" full>
              <input
                required
                placeholder="Your full name"
                className="input"
                autoComplete="name"
              />
            </Field>
            <Field label="Email">
              <input
                required
                type="email"
                placeholder="you@example.com"
                className="input"
                autoComplete="email"
              />
            </Field>
            <Field label="Phone">
              <input
                type="tel"
                placeholder="+357…"
                className="input"
                autoComplete="tel"
              />
            </Field>
            <Field label="What would you like to ask?" full>
              <textarea
                required
                rows={5}
                placeholder="Tell us about your trip — dates, pickup location, preferred car, anything else we should know."
                className="input min-h-[140px] resize-y"
              />
            </Field>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-gold px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#0a0a0a] shadow-[0_0_40px_-8px_rgba(212,175,55,0.6)] transition-all hover:shadow-[0_0_60px_-8px_rgba(212,175,55,0.85)] disabled:opacity-60 sm:w-auto"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0a0a0a]/40 border-t-[#0a0a0a]" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send message
                  </>
                )}
              </button>
              <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-muted">
                We typically reply within the hour, 24/7.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="block text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
