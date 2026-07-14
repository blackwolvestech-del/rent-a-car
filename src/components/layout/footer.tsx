import Link from "next/link";
import { Instagram, MapPin, Phone, Mail } from "lucide-react";
import { site } from "@/lib/site";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Fleet",
    links: [
      { label: "All cars", href: "/fleet" },
      { label: "Economy", href: "/fleet?category=Economy" },
      { label: "SUV", href: "/fleet?category=SUV" },
      { label: "Convertible", href: "/fleet?category=Convertible" },
      { label: "Hybrid", href: "/fleet?category=Hybrid" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Book Now", href: "/fleet" },
      { label: "24/7 Support", href: "/contact" },
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
              Premium and economy car rental — a clean, fully automatic fleet
              with instant booking, insurance included, and free airport pickup.
            </p>
            <div className="mt-5 space-y-2 text-sm text-muted">
              <a
                href={site.maps.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 transition-colors hover:text-gold"
              >
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-gold" />
                {site.address.full}
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 transition-colors hover:text-gold"
              >
                <Phone className="h-4 w-4 flex-none text-gold" />
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 transition-colors hover:text-gold"
              >
                <Mail className="h-4 w-4 flex-none text-gold" />
                {site.email}
              </a>
            </div>
            <div className="mt-6 flex gap-3">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-gold hover:text-gold"
                aria-label="Al Hadana on Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
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
            <span className="font-semibold text-text">All cars automatic</span>
            <span className="h-1 w-1 rounded-full bg-gold" />
            Fully insured
          </p>
        </div>
      </div>
    </footer>
  );
}
