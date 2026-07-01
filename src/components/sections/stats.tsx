"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 11, suffix: "", label: "Cars Available" },
  { value: 100, suffix: "%", label: "Automatic" },
  { value: 24, suffix: "/7", label: "Support" },
  { value: 0, suffix: "€", label: "Hidden Fees" },
];

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-white/[0.07] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(212,175,55,0.08),transparent)]" />
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-5 sm:px-8 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <Counter target={s.value} suffix={s.suffix} run={inView} />
            <span className="mt-3 text-sm uppercase tracking-[0.15em] text-muted">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Counter({ target, suffix, run }: { target: number; suffix: string; run: boolean }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const duration = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setVal(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);

  return (
    <span className="font-display text-5xl font-bold text-gradient-gold sm:text-6xl">
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}
