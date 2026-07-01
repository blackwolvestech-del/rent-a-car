import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/hero/hero";
import { ServicesSection } from "@/components/sections/services-section";
import { IndustriesSection } from "@/components/sections/industries-section";
import { ProjectsSection } from "@/components/sections/projects-section";
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
        <ServicesSection />
        <IndustriesSection />
        <ProjectsSection />
        <Stats />
        <WhyChooseUs />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
