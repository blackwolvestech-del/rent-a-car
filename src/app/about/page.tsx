import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Stats } from "@/components/sections/stats";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "Al Hadana Company Ltd — straightforward car rental with a clean automatic fleet, transparent pricing, and genuine 24/7 support.",
};

const PILLARS = [
  {
    title: "Transparent pricing",
    body: "The price you see is the price you pay. No hidden fees, no airport surcharges, no fuel tricks.",
  },
  {
    title: "A fleet you can trust",
    body: "Every car is regularly serviced, spotless, and fully automatic — ready the moment you are.",
  },
  {
    title: "Insurance included",
    body: "Comprehensive cover comes standard on every rental, with a zero-excess upgrade available.",
  },
  {
    title: "Real 24/7 support",
    body: "A real person on the line whenever you need us — before, during, and after your trip.",
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
            <span className="text-gradient-light">Car rental, </span>
            <span className="text-gradient-gold">without the hassle.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg">
            Al Hadana Company Ltd makes renting a car simple and honest. A clean,
            fully automatic fleet — from economy runabouts to premium SUVs and
            convertibles — with transparent pricing, insurance included, and a
            team that actually answers the phone.
          </p>
        </section>

        {/* Mission / Vision */}
        <section className="mx-auto mt-16 max-w-7xl px-5 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-3xl border border-white/[0.07] bg-bg-elevated p-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                What we promise
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                A well-maintained car, ready when you are, at a price with no
                surprises — booked in minutes and delivered where you need it.
              </p>
            </article>
            <article className="rounded-3xl border border-white/[0.07] bg-bg-elevated p-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                Who we serve
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                Visitors, business travellers, and locals alike — anyone who
                wants a dependable automatic car and a rental process that just
                works.
              </p>
            </article>
          </div>
        </section>

        {/* Values */}
        <section className="mx-auto mt-14 max-w-7xl px-5 sm:px-8">
          <h2 className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            What sets us apart
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <article
                key={p.title}
                className="rounded-3xl border border-white/[0.07] bg-bg-elevated p-7"
              >
                <h3 className="font-display text-xl font-bold tracking-tight">
                  {p.title}
                </h3>
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
              Ready to hit the road?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-balance text-sm text-muted">
              Browse the fleet, pick your dates, and book in minutes.
            </p>
            <Link
              href="/fleet"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#0a0a0a] shadow-[0_0_40px_-8px_rgba(212,175,55,0.6)] transition-all hover:shadow-[0_0_60px_-8px_rgba(212,175,55,0.85)]"
            >
              Browse the Fleet
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
