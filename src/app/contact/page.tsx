import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/contact/contact-form";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PHONE, EMAIL } from "@/lib/company";

export const metadata = {
  title: "Contact",
  description:
    "Reach the Al Hadana team. 24/7 helpdesk, rapid response, and tailored facility-management proposals.",
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
              <span className="text-gradient-light">Let&apos;s talk about </span>
              <span className="text-gradient-gold">your facility.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted">
              Tell us what you operate and what you need. Our team responds
              within one business day with a tailored proposal — or immediately
              via our 24/7 helpdesk.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-16 grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Channels */}
          <div className="grid h-fit gap-4">
            <Channel
              icon={<Phone className="h-5 w-5" />}
              label="24/7 helpdesk"
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
              label="Head office"
              value="Business Bay, Dubai, UAE"
            />
            <Channel
              icon={<Clock className="h-5 w-5" />}
              label="Response time"
              value="Within one business day"
            />
          </div>

          {/* Form */}
          <ContactForm />
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
