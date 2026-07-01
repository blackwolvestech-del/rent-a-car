import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getService, services } from "@/lib/company";
import { Check, ArrowLeft, ArrowUpRight, ChevronRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return { title: "Service not found" };
  return { title: s.title, description: s.short };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="relative pt-24">
        {/* Hero band */}
        <section className="relative">
          <div className="relative h-[46vh] min-h-[360px] w-full overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-bg/70 to-transparent" />
          </div>

          <div className="mx-auto -mt-32 max-w-7xl px-5 sm:px-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" /> All services
            </Link>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              {service.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">{service.short}</p>
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-lg leading-relaxed text-white/80">
              {service.description}
            </p>

            <h2 className="mt-12 font-display text-2xl font-bold tracking-tight">
              What&apos;s included
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-bg-elevated px-4 py-3.5 text-sm"
                >
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-gold/15 text-gold">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 font-display text-2xl font-bold tracking-tight">
              How we deliver
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { n: "01", t: "Assess", b: "We survey your site, scope the work, and agree clear SLAs." },
                { n: "02", t: "Mobilise", b: "Trained, vetted teams and equipment deployed to plan." },
                { n: "03", t: "Deliver", b: "Ongoing service, audited and reported against agreed KPIs." },
              ].map((step) => (
                <div
                  key={step.n}
                  className="rounded-2xl border border-white/[0.07] bg-bg-elevated p-5"
                >
                  <span className="font-display text-2xl font-bold text-gold/70">
                    {step.n}
                  </span>
                  <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider">
                    {step.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.b}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky quote CTA */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-3xl border border-gold/25 bg-gradient-to-br from-gold/[0.06] to-transparent p-7">
              <h3 className="font-display text-2xl font-bold tracking-tight">
                Need {service.title.toLowerCase()}?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Tell us about your facility and we&apos;ll prepare a tailored
                proposal — clear scope, clear pricing, no obligation.
              </p>
              <Link href="/contact" className="mt-6 block">
                <MagneticButton variant="gold" className="w-full">
                  Request a Quote <ChevronRight className="h-4 w-4" />
                </MagneticButton>
              </Link>
              <p className="mt-4 text-center text-[11px] uppercase tracking-[0.22em] text-muted">
                Response within one business day
              </p>
            </div>
          </aside>
        </section>

        {/* Other services */}
        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Other services
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-bg-elevated"
              >
                <Image
                  src={o.image}
                  alt={o.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <h3 className="font-display text-xl font-bold">{o.title}</h3>
                  <ArrowUpRight className="h-5 w-5 text-gold" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
