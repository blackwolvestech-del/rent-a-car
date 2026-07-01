import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/hero/hero";
import { BookingWidget } from "@/components/booking/booking-widget";
import { FleetSection } from "@/components/fleet/fleet-section";
import { FeaturedCarousel } from "@/components/sections/featured-carousel";
import { Stats } from "@/components/sections/stats";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <BookingWidget />
        <FleetSection />
        <FeaturedCarousel />
        <Stats />
        <WhyChooseUs />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
