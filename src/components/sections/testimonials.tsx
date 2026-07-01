"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const REVIEWS = [
  {
    name: "Yannis P.",
    role: "Weekend trip",
    initials: "YP",
    text: "Booked the Peugeot 3008 for a family weekend. Spotless car, delivered to the airport on time, and the price was exactly what I saw online. Zero surprises.",
  },
  {
    name: "Elena K.",
    role: "Business rental",
    initials: "EK",
    text: "The E-Class was perfect for client meetings — comfortable, immaculate, fully automatic. Pickup and return took two minutes each.",
  },
  {
    name: "Marco D.",
    role: "Summer holiday",
    initials: "MD",
    text: "Took the E-Class Cabrio along the coast. Best decision of the trip. Insurance was included and the team answered every call instantly.",
  },
  {
    name: "Sofia R.",
    role: "City rental",
    initials: "SR",
    text: "Needed something cheap and easy for a week in the city. The Yaris was ideal — economical, automatic, and effortless to park.",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  const review = REVIEWS[index];

  return (
    <section id="reviews" className="mx-auto max-w-5xl px-5 py-28 sm:px-8">
      <SectionHeading eyebrow="Testimonials" title="What our drivers say" />

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Quote className="mx-auto mb-6 h-12 w-12 text-gold/30" />
        <div className="relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="max-w-2xl text-balance font-display text-2xl font-medium leading-snug sm:text-3xl">
                “{review.text}”
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-soft to-gold font-display font-bold text-black">
                  {review.initials}
                </span>
                <div className="text-left">
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-muted">{review.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Review ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-gold" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
