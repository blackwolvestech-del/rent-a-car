import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Stats } from "@/components/sections/stats";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Sparkles } from "lucide-react";

import { coreValues } from "@/lib/company";

export const metadata = {
  title: "About",
  description:
    "Al Hadana Company Ltd — an integrated facility-management partner built on integrity, excellence, safety, and sustainability.",
};

const PILLARS = coreValues.map((v) => ({ title: v.title, body: v.body }));

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
            <span className="text-gradient-light">Built to keep </span>
            <span className="text-gradient-gold">operations running.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg">
            Al Hadana Company Ltd is an integrated facility-management partner.
            For nearly two decades we&apos;ve kept buildings clean, safe, and
            fully operational — combining trained people, disciplined processes,
            and modern systems under one accountable relationship.
          </p>
        </section>

        {/* Mission / Vision */}
        <section className="mx-auto mt-16 max-w-7xl px-5 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-3xl border border-white/[0.07] bg-bg-elevated p-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                Our mission
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                To deliver facility services so reliable our clients never have
                to think about them — freeing them to focus entirely on their
                core business.
              </p>
            </article>
            <article className="rounded-3xl border border-white/[0.07] bg-bg-elevated p-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                Our vision
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                To be the region&apos;s most trusted facility-management partner
                — the standard against which quality, safety, and sustainability
                are measured.
              </p>
            </article>
          </div>
        </section>

        {/* Core values */}
        <section className="mx-auto mt-14 max-w-7xl px-5 sm:px-8">
          <h2 className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Core values
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
              Let&apos;s work together.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-balance text-sm text-muted">
              Tell us about your facility and we&apos;ll build a tailored
              proposal.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#0a0a0a] shadow-[0_0_40px_-8px_rgba(212,175,55,0.6)] transition-all hover:shadow-[0_0_60px_-8px_rgba(212,175,55,0.85)]"
            >
              Request a Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
