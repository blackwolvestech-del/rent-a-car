"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Fuel,
  Settings2,
  ShieldCheck,
  DoorOpen,
  Briefcase,
  Check,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import {
  type Vehicle,
  vehicleGallery,
  includedFeatures,
  daysBetween,
  vehicles,
} from "@/lib/vehicles";
import { formatCurrency } from "@/lib/utils";
import { VAT_RATE } from "@/lib/site";
import { MagneticButton } from "@/components/ui/magnetic-button";

/**
 * Detail view for a single vehicle. Editorial gallery + specs + features on
 * the left, sticky booking calculator on the right. Mobile collapses to a
 * single column with the calculator pinned to the bottom of the page.
 */
export function VehicleDetail({ vehicle }: { vehicle: Vehicle }) {
  const gallery = vehicleGallery(vehicle);
  const [active, setActive] = useState(0);

  // ISO date strings (YYYY-MM-DD) — bind to native date inputs
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 86400000);
  const threeDaysOut = new Date(today.getTime() + 86400000 * 4);
  const [pickup, setPickup] = useState(toISO(tomorrow));
  const [dropoff, setDropoff] = useState(toISO(threeDaysOut));
  const days = daysBetween(pickup, dropoff);
  const subtotal = days * vehicle.pricePerDay;
  const tax = Math.round(subtotal * VAT_RATE);
  const total = subtotal + tax;

  const similar = vehicles
    .filter((v) => v.id !== vehicle.id && v.category === vehicle.category)
    .slice(0, 3);

  const bookingHref = `/book/${vehicle.id}?from=${pickup}&to=${dropoff}`;

  return (
    <>
      {/* Crumb */}
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <Link
          href="/#fleet"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" /> Back to fleet
        </Link>
      </div>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-10 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        {/* ─── Left: gallery + content ─── */}
        <div>
          {/* Gallery */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-bg-elevated">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={gallery[active]}
                alt={`${vehicle.brand} ${vehicle.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </motion.div>
            {/* Gradient grade */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* Accent glow tint */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-50"
              style={{
                background: `radial-gradient(40% 50% at 80% 20%, ${vehicle.accent}55, transparent 70%)`,
              }}
            />
            {/* Brand + tagline */}
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs uppercase tracking-[0.32em] text-white/70">
                {vehicle.brand}
              </p>
              <h1 className="mt-2 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                {vehicle.name}
              </h1>
              <p className="mt-2 text-sm text-white/80">{vehicle.tagline}</p>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative h-20 w-32 flex-none overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                  active === i
                    ? "border-gold opacity-100"
                    : "border-white/10 opacity-60 hover:opacity-90"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Specs */}
          <div className="mt-12">
            <SectionTitle>Specifications</SectionTitle>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Spec
                icon={<Calendar className="h-5 w-5" />}
                label="Year"
                value={vehicle.year ? `${vehicle.year}` : "—"}
              />
              <Spec
                icon={<Settings2 className="h-5 w-5" />}
                label="Transmission"
                value={vehicle.transmission}
              />
              <Spec
                icon={<Fuel className="h-5 w-5" />}
                label="Fuel"
                value={vehicle.fuel}
              />
              <Spec
                icon={<Users className="h-5 w-5" />}
                label="Seats"
                value={`${vehicle.seats}`}
              />
              <Spec
                icon={<DoorOpen className="h-5 w-5" />}
                label="Doors"
                value={`${vehicle.doors}`}
              />
              <Spec
                icon={<Briefcase className="h-5 w-5" />}
                label="Luggage"
                value={`${vehicle.luggage} bags`}
              />
              <Spec
                icon={<ShieldCheck className="h-5 w-5" />}
                label="Category"
                value={vehicle.category}
              />
            </div>
          </div>

          {/* Included */}
          <div className="mt-12">
            <SectionTitle>What&apos;s included</SectionTitle>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {includedFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-bg-elevated px-4 py-3 text-sm"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Rental policy */}
          <div className="mt-12">
            <SectionTitle>Rental policy</SectionTitle>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <PolicyCard
                title="Minimum age"
                body="25 years with a valid driving licence held for over 2 years."
              />
              <PolicyCard
                title="Documents"
                body="Passport, driving licence, and ID card are required at pickup."
              />
              <PolicyCard
                title="Cancellation"
                body="Free cancellation up to 72 hours before pickup. After that, 30% applies."
              />
            </div>
          </div>
        </div>

        {/* ─── Right: sticky booking sidebar ─── */}
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="rounded-3xl border border-white/10 bg-bg-elevated/70 p-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-muted">
                  From
                </p>
                <p className="mt-1 font-display text-4xl font-bold leading-none">
                  {formatCurrency(vehicle.pricePerDay)}
                  <span className="text-base font-medium text-muted">
                    {" "}
                    / day
                  </span>
                </p>
              </div>
              <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold">
                Available
              </span>
            </div>

            <div className="mt-6 grid gap-3">
              <DateField
                label="Pick up"
                value={pickup}
                onChange={setPickup}
                min={toISO(today)}
              />
              <DateField
                label="Drop off"
                value={dropoff}
                onChange={setDropoff}
                min={pickup}
              />
            </div>

            <dl className="mt-6 space-y-2 border-t border-white/[0.07] pt-5 text-sm">
              <Row
                k={`${formatCurrency(vehicle.pricePerDay)} × ${days} day${days === 1 ? "" : "s"}`}
                v={formatCurrency(subtotal)}
              />
              <Row k="VAT (19%)" v={formatCurrency(tax)} />
              <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-4">
                <span className="text-xs uppercase tracking-[0.22em] text-muted">
                  Total
                </span>
                <span className="font-display text-3xl font-bold">
                  {formatCurrency(total)}
                </span>
              </div>
            </dl>

            <Link href={bookingHref} className="mt-7 block">
              <MagneticButton variant="gold" className="w-full">
                Book this car <ChevronRight className="h-4 w-4" />
              </MagneticButton>
            </Link>

            <p className="mt-4 text-center text-[11px] uppercase tracking-[0.22em] text-muted">
              Secure checkout · Free cancellation
            </p>
          </div>
        </aside>
      </section>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <SectionTitle>Similar vehicles</SectionTitle>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((s) => (
              <Link
                key={s.id}
                href={`/fleet/${s.id}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-bg-elevated"
              >
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/70">
                    {s.brand}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-sm text-gold">
                    {formatCurrency(s.pricePerDay)} / day
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
      {children}
    </h2>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-bg-elevated p-5">
      <span className="text-gold">{icon}</span>
      <p className="mt-3 font-display text-xl font-bold leading-none">{value}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">
        {label}
      </p>
    </div>
  );
}

function PolicyCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-bg-elevated p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wider">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
  min,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  min?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.28em] text-muted">
        {label}
      </span>
      <input
        type="date"
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-text outline-none transition-colors focus:border-gold"
      />
    </label>
  );
}

function Row({ k, v, muted }: { k: string; v: string; muted?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between ${muted ? "text-muted" : ""}`}
    >
      <span className="text-sm">{k}</span>
      <span className="text-sm font-medium">{v}</span>
    </div>
  );
}

function toISO(d: Date) {
  return d.toISOString().slice(0, 10);
}
