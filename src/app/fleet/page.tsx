import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FleetSection } from "@/components/fleet/fleet-section";

export const metadata = {
  title: "The Fleet",
  description:
    "Browse the full Al Hadana fleet — economy hatchbacks, sedans, SUVs, a hybrid and a convertible. All automatic, all bookable online.",
};

export default function FleetPage() {
  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-12">
        {/* Page intro */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-gold">
              The Fleet
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
              <span className="text-gradient-light">Every car. </span>
              <span className="text-gradient-gold">All automatic.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted sm:text-lg">
              From €30/day economy runabouts to premium SUVs and a convertible.
              Filter by type and book instantly.
            </p>
          </div>
        </section>

        <FleetSection showHeading={false} />
      </main>
      <Footer />
    </>
  );
}
