import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/contact/contact-form";
import { Phone, Mail, MapPin, Clock, Navigation } from "lucide-react";
import { site } from "@/lib/site";

const PHONE = site.phone;
const EMAIL = site.email;

export const metadata = {
  title: "Contact",
  description:
    "Reach the Al Hadana team to book a car or ask a question. 24/7 support, instant booking, free airport pickup.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-24">
        <section className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-gold">
              Get in touch
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
              <span className="text-gradient-light">Book a car or </span>
              <span className="text-gradient-gold">ask us anything.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted">
              Questions about a car, your dates, or delivery? Message us and
              we&apos;ll reply fast — or call any time, day or night.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-16 grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Channels */}
          <div className="grid h-fit gap-4">
            <Channel
              icon={<Phone className="h-5 w-5" />}
              label="24/7 phone"
              value={PHONE}
              href={`tel:${PHONE.replace(/\s/g, "")}`}
            />
            <Channel
              icon={<Mail className="h-5 w-5" />}
              label="Email"
              value={EMAIL}
              href={`mailto:${EMAIL}`}
            />
            <Channel
              icon={<MapPin className="h-5 w-5" />}
              label="Visit us"
              value={site.address.full}
              href={site.maps.link}
            />
            <Channel
              icon={<Clock className="h-5 w-5" />}
              label="Opening hours"
              value="Every day, around the clock"
            />
          </div>

          {/* Form */}
          <ContactForm />
        </section>

        {/* Map + address */}
        <section className="mx-auto mt-16 max-w-7xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-bg-elevated">
            <div className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
                    Our location
                  </p>
                  <p className="mt-1 font-display text-lg font-bold leading-tight">
                    {site.address.street}
                  </p>
                  <p className="text-sm text-muted">
                    {site.address.city} {site.address.postalCode},{" "}
                    {site.address.country}
                  </p>
                </div>
              </div>
              <a
                href={site.maps.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-gold px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#0a0a0a] shadow-[0_0_40px_-8px_rgba(212,175,55,0.6)] transition-all hover:shadow-[0_0_60px_-8px_rgba(212,175,55,0.85)]"
              >
                <Navigation className="h-4 w-4" /> Get directions
              </a>
            </div>
            <iframe
              title="Al Hadana location map"
              src={site.maps.embed}
              className="h-[420px] w-full border-0 grayscale-[0.2] contrast-110"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Channel({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gold/15 text-gold">
        {icon}
      </span>
      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
          {label}
        </p>
        <p className="mt-1 text-sm font-medium">{value}</p>
      </div>
    </>
  );
  const className =
    "flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-bg-elevated p-5 transition-all";
  return href ? (
    <a href={href} className={`${className} hover:border-gold/40`}>
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
}
