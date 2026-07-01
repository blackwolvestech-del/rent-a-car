import Link from "next/link";
import { Instagram, Twitter, Linkedin, Facebook } from "lucide-react";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Facility Management", href: "/services/facility-management" },
      { label: "Cleaning Services", href: "/services/cleaning-services" },
      { label: "Pest Control", href: "/services/pest-control" },
      { label: "Maintenance", href: "/services/maintenance" },
      { label: "All services", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Industries", href: "/#industries" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Get a Quote", href: "/contact" },
      { label: "24/7 Helpdesk", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-bg-elevated">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-baseline gap-2.5">
              <span className="font-display text-3xl font-bold leading-none">
                AL HA<span className="text-gold">DA</span>NA
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/45">
                Co. LTD
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Integrated facility management, cleaning, maintenance and manpower
              — one accountable partner for every building you operate.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-gold hover:text-gold"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-text">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-gold"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-8 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Al Hadana Company Ltd. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="font-semibold text-text">ISO 9001 · 14001 · 45001</span>
            <span className="h-1 w-1 rounded-full bg-gold" />
            Certified
          </p>
        </div>
      </div>
    </footer>
  );
}
