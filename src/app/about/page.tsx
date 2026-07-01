import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Stats } from "@/components/sections/stats";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "Al Hadana Company LTD — the concierge approach to luxury car rental. Hand-picked fleet, transparent pricing, white-glove delivery worldwide.",
};

const PILLARS = [
  {
    title: "Hand-curated fleet",
    body: "Every car is selected, maintained, and delivered in showroom condition. We refuse what doesn't meet our standard.",
  },
  {
    title: "Transparent pricing",
    body: "What you see is what you pay. No hidden fees, no airport surcharges, no fuel-fill tricks. The total on screen is the total you pay.",
  },
  {
    title: "Concierge-first",
    body: "A real person on the other end of the line, 24/7. Need a car delivered to a hotel at 2 a.m.? That's the job.",
  },
  {
    title: "Globally insured",
    body: "Comprehensive cover with zero-excess upgrade available. Drive across borders without paperwork hesitation.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-24">
        {/* Intro */}
        <section className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-white/80 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            About Al Hadana
          </span>
          <h1 className="mt-7 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
            <span className="text-gradient-light">Luxury, </span>
            <span className="text-gradient-gold">unbureaucratic.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg">
            Al Hadana Company LTD was founded on a simple idea: renting an exceptional
            car should feel as exceptional as driving one. No fluorescent counters.
            No twelve-page agreements. No surprises at drop-off. Just the car, the
            keys, and the road.
          </p>
        </section>

        {/* Pillars */}
        <section className="mx-auto mt-20 max-w-7xl px-5 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((p) => (
              <article
                key={p.title}
                className="rounded-3xl border border-white/[0.07] bg-bg-elevated p-7"
              >
                <h2 className="font-display text-xl font-bold tracking-tight">
                  {p.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        <Stats />
        <WhyChooseUs />

        {/* Outbound CTA */}
        <section className="mx-auto mt-12 max-w-7xl px-5 sm:px-8">
          <div className="rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/[0.05] to-transparent p-10 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to drive?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-balance text-sm text-muted">
              Browse the fleet, pick your car, and have it delivered.
            </p>
            <Link
              href="/fleet"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#0a0a0a] shadow-[0_0_40px_-8px_rgba(212,175,55,0.6)] transition-all hover:shadow-[0_0_60px_-8px_rgba(212,175,55,0.85)]"
            >
              View the fleet
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
