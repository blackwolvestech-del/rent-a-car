import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FleetSection } from "@/components/fleet/fleet-section";

export const metadata = {
  title: "The Fleet",
  description:
    "Hand-picked supercars, executive saloons, and exotic SUVs — every vehicle in the Al Hadana fleet, ready to book.",
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
              The Collection
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
              <span className="text-gradient-light">Every car. </span>
              <span className="text-gradient-gold">No compromise.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted sm:text-lg">
              Browse our complete fleet of supercars, executive saloons, and exotic
              SUVs. Filter by category, transmission, or price — book instantly.
            </p>
          </div>
        </section>

        <FleetSection />
      </main>
      <Footer />
    </>
  );
}
