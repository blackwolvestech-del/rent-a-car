import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { services } from "@/lib/company";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Services",
  description:
    "Integrated facility management, cleaning, pest control, maintenance, construction support, manpower supply, and industrial & environmental services.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-24">
        <section className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-gold">
              What we do
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
              <span className="text-gradient-light">Full-spectrum </span>
              <span className="text-gradient-gold">facility services.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted sm:text-lg">
              Eight integrated service lines, one accountable partner. Explore
              what each delivers and how we tailor it to your facility.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-card transition-all duration-500 hover:border-gold/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-display text-xl font-bold tracking-tight">
                      {s.title}
                    </h2>
                    <ArrowUpRight className="h-5 w-5 flex-none text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {s.short}
                  </p>
                  <span className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/80 transition-colors group-hover:text-gold">
                    Explore service
                  </span>
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
