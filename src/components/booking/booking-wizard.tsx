"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  User,
  Plus,
  ListChecks,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  Check,
  Lock,
  Upload,
  X,
  ShieldCheck,
  Wifi,
  Baby,
  Navigation,
  Users,
  Sparkles,
} from "lucide-react";
import {
  type Vehicle,
  type Extra,
  extras as ALL_EXTRAS,
  daysBetween,
} from "@/lib/vehicles";
import { formatCurrency, cn } from "@/lib/utils";

interface Props {
  vehicle: Vehicle;
  defaultPickup?: string;
  defaultDropoff?: string;
}

interface Customer {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  licenceNumber: string;
  licenceExpiry: string;
  address: string;
  city: string;
  postalCode: string;
}

const STEPS = [
  { id: 1, label: "Dates", icon: Calendar },
  { id: 2, label: "Driver", icon: User },
  { id: 3, label: "Extras", icon: Plus },
  { id: 4, label: "Review", icon: ListChecks },
  { id: 5, label: "Payment", icon: CreditCard },
];

export function BookingWizard({
  vehicle,
  defaultPickup,
  defaultDropoff,
}: Props) {
  const router = useRouter();
  const today = useMemo(() => new Date(), []);
  const defaultStart =
    defaultPickup || toISO(new Date(today.getTime() + 86400000));
  const defaultEnd =
    defaultDropoff || toISO(new Date(today.getTime() + 86400000 * 4));

  const [step, setStep] = useState(1);
  const [pickup, setPickup] = useState(defaultStart);
  const [dropoff, setDropoff] = useState(defaultEnd);
  const [pickupLocation, setPickupLocation] = useState("Dublin Airport (DUB)");
  const [dropoffLocation, setDropoffLocation] =
    useState("Dublin Airport (DUB)");
  const [customer, setCustomer] = useState<Customer>({
    fullName: "",
    email: "",
    phone: "",
    country: "Ireland",
    licenceNumber: "",
    licenceExpiry: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [licenceFile, setLicenceFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const days = daysBetween(pickup, dropoff);
  const subtotal = days * vehicle.pricePerDay;
  const extrasTotal = ALL_EXTRAS.filter((e) => selectedExtras.has(e.id)).reduce(
    (s, e) => s + e.pricePerDay * days,
    0
  );
  const preTax = subtotal + extrasTotal - promoApplied;
  const tax = Math.round(preTax * 0.13);
  const total = preTax + tax;

  const canAdvance = (() => {
    if (step === 1) return days > 0;
    if (step === 2)
      return (
        customer.fullName.trim().length > 1 &&
        /.+@.+\..+/.test(customer.email) &&
        customer.phone.trim().length > 5 &&
        customer.licenceNumber.trim().length > 3 &&
        customer.licenceExpiry &&
        customer.address.trim().length > 2 &&
        customer.city.trim().length > 1 &&
        customer.postalCode.trim().length > 1
      );
    return true;
  })();

  const next = () => setStep((s) => Math.min(5, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (code === "AURUM10") setPromoApplied(Math.round(subtotal * 0.1));
    else if (code === "VIP") setPromoApplied(Math.round(subtotal * 0.2));
    else setPromoApplied(0);
  };

  const handlePay = async () => {
    setSubmitting(true);
    // Placeholder: in production this hands off to Viva Payments. We mock a
    // quick latency so the UI clearly transitions before navigating.
    await new Promise((r) => setTimeout(r, 1200));
    const ref = `AH-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    router.push(`/book/${vehicle.id}/success?ref=${ref}&total=${total}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      {/* Stepper */}
      <Stepper currentStep={step} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* Left: step content */}
        <div className="min-h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 1 && (
                <StepDates
                  pickup={pickup}
                  dropoff={dropoff}
                  pickupLocation={pickupLocation}
                  dropoffLocation={dropoffLocation}
                  onChange={(p) => {
                    if (p.pickup !== undefined) setPickup(p.pickup);
                    if (p.dropoff !== undefined) setDropoff(p.dropoff);
                    if (p.pickupLocation !== undefined)
                      setPickupLocation(p.pickupLocation);
                    if (p.dropoffLocation !== undefined)
                      setDropoffLocation(p.dropoffLocation);
                  }}
                  minDate={toISO(today)}
                  days={days}
                />
              )}
              {step === 2 && (
                <StepDriver
                  customer={customer}
                  onChange={(patch) =>
                    setCustomer((c) => ({ ...c, ...patch }))
                  }
                  licenceFile={licenceFile}
                  idFile={idFile}
                  onLicenceFile={setLicenceFile}
                  onIdFile={setIdFile}
                />
              )}
              {step === 3 && (
                <StepExtras
                  selected={selectedExtras}
                  onToggle={(id) =>
                    setSelectedExtras((s) => {
                      const n = new Set(s);
                      n.has(id) ? n.delete(id) : n.add(id);
                      return n;
                    })
                  }
                  days={days}
                />
              )}
              {step === 4 && (
                <StepReview
                  vehicle={vehicle}
                  pickup={pickup}
                  dropoff={dropoff}
                  pickupLocation={pickupLocation}
                  dropoffLocation={dropoffLocation}
                  customer={customer}
                  selectedExtras={selectedExtras}
                  promo={promo}
                  promoApplied={promoApplied}
                  onPromoChange={setPromo}
                  onApplyPromo={applyPromo}
                  onEdit={setStep}
                />
              )}
              {step === 5 && <StepPayment total={total} />}
            </motion.div>
          </AnimatePresence>

          {/* Step controls */}
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={prev}
              disabled={step === 1}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium uppercase tracking-wider transition-colors hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>

            {step < 5 ? (
              <button
                onClick={next}
                disabled={!canAdvance}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-gold px-7 py-3 text-sm font-bold uppercase tracking-wider text-[#0a0a0a] shadow-[0_0_40px_-8px_rgba(212,175,55,0.6)] transition-all hover:shadow-[0_0_60px_-8px_rgba(212,175,55,0.85)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              >
                Continue <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handlePay}
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-gold px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0a0a0a] shadow-[0_0_40px_-8px_rgba(212,175,55,0.6)] transition-all hover:shadow-[0_0_60px_-8px_rgba(212,175,55,0.85)] disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Spinner /> Processing…
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" /> Pay {formatCurrency(total)}
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Right: sticky summary */}
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <Summary
            vehicle={vehicle}
            days={days}
            pickup={pickup}
            dropoff={dropoff}
            extrasTotal={extrasTotal}
            selectedExtras={selectedExtras}
            promoApplied={promoApplied}
            subtotal={subtotal}
            tax={tax}
            total={total}
          />
        </aside>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Stepper
// ════════════════════════════════════════════════════════════════════════════

function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <ol className="flex items-center gap-2 overflow-x-auto pb-2 sm:gap-4">
      {STEPS.map((s, i) => {
        const Icon = s.icon;
        const done = s.id < currentStep;
        const active = s.id === currentStep;
        return (
          <li
            key={s.id}
            className="flex flex-1 items-center gap-3 whitespace-nowrap"
          >
            <div
              className={cn(
                "flex h-10 w-10 flex-none items-center justify-center rounded-full border transition-all duration-500",
                done
                  ? "border-gold bg-gold text-[#0a0a0a]"
                  : active
                    ? "border-gold bg-gold/10 text-gold ring-4 ring-gold/20"
                    : "border-white/15 text-muted"
              )}
            >
              {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
            </div>
            <span
              className={cn(
                "hidden text-xs font-semibold uppercase tracking-[0.18em] sm:inline",
                active ? "text-text" : "text-muted"
              )}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "ml-1 mr-1 h-px flex-1 sm:ml-2 sm:mr-2",
                  done ? "bg-gold" : "bg-white/10"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Step 1 — Dates
// ════════════════════════════════════════════════════════════════════════════

function StepDates({
  pickup,
  dropoff,
  pickupLocation,
  dropoffLocation,
  minDate,
  days,
  onChange,
}: {
  pickup: string;
  dropoff: string;
  pickupLocation: string;
  dropoffLocation: string;
  minDate: string;
  days: number;
  onChange: (p: Partial<{
    pickup: string;
    dropoff: string;
    pickupLocation: string;
    dropoffLocation: string;
  }>) => void;
}) {
  return (
    <Panel title="When do you need it?" subtitle="Choose pickup and return.">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Pickup location">
          <select
            value={pickupLocation}
            onChange={(e) => onChange({ pickupLocation: e.target.value })}
            className="input"
          >
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Drop-off location">
          <select
            value={dropoffLocation}
            onChange={(e) => onChange({ dropoffLocation: e.target.value })}
            className="input"
          >
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Pickup date">
          <input
            type="date"
            value={pickup}
            min={minDate}
            onChange={(e) => onChange({ pickup: e.target.value })}
            className="input"
          />
        </Field>
        <Field label="Return date">
          <input
            type="date"
            value={dropoff}
            min={pickup}
            onChange={(e) => onChange({ dropoff: e.target.value })}
            className="input"
          />
        </Field>
      </div>

      <div className="mt-7 flex items-center justify-between rounded-2xl border border-gold/30 bg-gold/[0.04] px-6 py-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-gold" />
          <span className="text-sm">
            {days > 0 ? (
              <>
                <strong className="text-text">
                  {days} day{days === 1 ? "" : "s"}
                </strong>{" "}
                <span className="text-muted">selected</span>
              </>
            ) : (
              <span className="text-muted">
                Choose a return date after the pickup date
              </span>
            )}
          </span>
        </div>
        {days > 0 && (
          <span className="text-xs uppercase tracking-[0.22em] text-gold">
            Available
          </span>
        )}
      </div>
    </Panel>
  );
}

const LOCATIONS = [
  "Dublin Airport (DUB)",
  "Dublin City Centre",
  "Cork Airport (ORK)",
  "Shannon Airport (SNN)",
  "Belfast International (BFS)",
];

// ════════════════════════════════════════════════════════════════════════════
// Step 2 — Driver / customer info
// ════════════════════════════════════════════════════════════════════════════

function StepDriver({
  customer,
  onChange,
  licenceFile,
  idFile,
  onLicenceFile,
  onIdFile,
}: {
  customer: Customer;
  onChange: (patch: Partial<Customer>) => void;
  licenceFile: File | null;
  idFile: File | null;
  onLicenceFile: (f: File | null) => void;
  onIdFile: (f: File | null) => void;
}) {
  return (
    <Panel
      title="Driver details"
      subtitle="The licence holder picking up the car."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" full>
          <input
            value={customer.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="Aoife O'Connor"
            className="input"
            autoComplete="name"
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={customer.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="aoife@example.com"
            className="input"
            autoComplete="email"
          />
        </Field>
        <Field label="Phone">
          <input
            type="tel"
            value={customer.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="+353 …"
            className="input"
            autoComplete="tel"
          />
        </Field>
        <Field label="Country">
          <input
            value={customer.country}
            onChange={(e) => onChange({ country: e.target.value })}
            className="input"
            autoComplete="country-name"
          />
        </Field>
        <Field label="Driving licence number">
          <input
            value={customer.licenceNumber}
            onChange={(e) => onChange({ licenceNumber: e.target.value })}
            className="input"
          />
        </Field>
        <Field label="Licence expiry">
          <input
            type="date"
            value={customer.licenceExpiry}
            onChange={(e) => onChange({ licenceExpiry: e.target.value })}
            className="input"
          />
        </Field>
        <Field label="Address" full>
          <input
            value={customer.address}
            onChange={(e) => onChange({ address: e.target.value })}
            className="input"
            autoComplete="street-address"
          />
        </Field>
        <Field label="City">
          <input
            value={customer.city}
            onChange={(e) => onChange({ city: e.target.value })}
            className="input"
            autoComplete="address-level2"
          />
        </Field>
        <Field label="Postal code">
          <input
            value={customer.postalCode}
            onChange={(e) => onChange({ postalCode: e.target.value })}
            className="input"
            autoComplete="postal-code"
          />
        </Field>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <FileDrop
          label="Driving licence"
          hint="Front side photo or scan"
          file={licenceFile}
          onFile={onLicenceFile}
        />
        <FileDrop
          label="Passport / ID"
          hint="Photo page"
          file={idFile}
          onFile={onIdFile}
        />
      </div>
    </Panel>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Step 3 — Extras
// ════════════════════════════════════════════════════════════════════════════

const EXTRA_ICON: Record<Extra["icon"], React.ComponentType<{ className?: string }>> = {
  gps: Navigation,
  wifi: Wifi,
  baby: Baby,
  driver: Users,
  insurance: ShieldCheck,
};

function StepExtras({
  selected,
  onToggle,
  days,
}: {
  selected: Set<string>;
  onToggle: (id: string) => void;
  days: number;
}) {
  return (
    <Panel
      title="Add the extras"
      subtitle="Optional, but they make a real difference."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {ALL_EXTRAS.map((e) => {
          const Icon = EXTRA_ICON[e.icon];
          const isOn = selected.has(e.id);
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => onToggle(e.id)}
              className={cn(
                "group relative flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300",
                isOn
                  ? "border-gold bg-gold/[0.06] shadow-[0_0_40px_-15px_rgba(212,175,55,0.6)]"
                  : "border-white/[0.07] bg-bg-elevated hover:border-white/20"
              )}
            >
              <span
                className={cn(
                  "flex h-11 w-11 flex-none items-center justify-center rounded-xl transition-colors",
                  isOn
                    ? "bg-gold/20 text-gold"
                    : "bg-white/[0.06] text-muted group-hover:text-text"
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-base font-bold">{e.name}</h3>
                  <span className="text-sm font-semibold text-gold">
                    {formatCurrency(e.pricePerDay)}/day
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {e.description}
                </p>
                {days > 0 && isOn && (
                  <p className="mt-2 text-[11px] uppercase tracking-wider text-gold">
                    + {formatCurrency(e.pricePerDay * days)} for {days} day
                    {days === 1 ? "" : "s"}
                  </p>
                )}
              </div>
              <span
                className={cn(
                  "absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
                  isOn
                    ? "border-gold bg-gold text-[#0a0a0a]"
                    : "border-white/20"
                )}
              >
                {isOn && <Check className="h-3 w-3" />}
              </span>
            </button>
          );
        })}
      </div>
    </Panel>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Step 4 — Review
// ════════════════════════════════════════════════════════════════════════════

function StepReview({
  vehicle,
  pickup,
  dropoff,
  pickupLocation,
  dropoffLocation,
  customer,
  selectedExtras,
  promo,
  promoApplied,
  onPromoChange,
  onApplyPromo,
  onEdit,
}: {
  vehicle: Vehicle;
  pickup: string;
  dropoff: string;
  pickupLocation: string;
  dropoffLocation: string;
  customer: Customer;
  selectedExtras: Set<string>;
  promo: string;
  promoApplied: number;
  onPromoChange: (v: string) => void;
  onApplyPromo: () => void;
  onEdit: (step: number) => void;
}) {
  const chosen = ALL_EXTRAS.filter((e) => selectedExtras.has(e.id));
  return (
    <Panel
      title="Review and confirm"
      subtitle="Last look before we hand you the keys."
    >
      <ReviewBlock title="Vehicle" onEdit={() => onEdit(1)}>
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-32 flex-none overflow-hidden rounded-xl">
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              {vehicle.brand}
            </p>
            <h3 className="font-display text-xl font-bold">{vehicle.name}</h3>
            <p className="text-sm text-muted">
              {formatCurrency(vehicle.pricePerDay)}/day
            </p>
          </div>
        </div>
      </ReviewBlock>

      <ReviewBlock title="Schedule" onEdit={() => onEdit(1)}>
        <div className="grid gap-3 sm:grid-cols-2">
          <KV k="Pickup" v={`${prettyDate(pickup)} · ${pickupLocation}`} />
          <KV k="Return" v={`${prettyDate(dropoff)} · ${dropoffLocation}`} />
        </div>
      </ReviewBlock>

      <ReviewBlock title="Driver" onEdit={() => onEdit(2)}>
        <div className="grid gap-3 sm:grid-cols-2">
          <KV k="Name" v={customer.fullName || "—"} />
          <KV k="Email" v={customer.email || "—"} />
          <KV k="Phone" v={customer.phone || "—"} />
          <KV
            k="Licence"
            v={
              customer.licenceNumber
                ? `${customer.licenceNumber}${customer.licenceExpiry ? ` · expires ${prettyDate(customer.licenceExpiry)}` : ""}`
                : "—"
            }
          />
        </div>
      </ReviewBlock>

      <ReviewBlock title="Extras" onEdit={() => onEdit(3)}>
        {chosen.length === 0 ? (
          <p className="text-sm text-muted">No extras selected.</p>
        ) : (
          <ul className="grid gap-2 text-sm">
            {chosen.map((e) => (
              <li
                key={e.id}
                className="flex items-center justify-between gap-3"
              >
                <span className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-gold" /> {e.name}
                </span>
                <span className="text-muted">
                  {formatCurrency(e.pricePerDay)}/day
                </span>
              </li>
            ))}
          </ul>
        )}
      </ReviewBlock>

      <div className="mt-6 rounded-2xl border border-white/[0.07] bg-bg-elevated p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-muted">
          Have a promo code?
        </p>
        <div className="mt-3 flex gap-2">
          <input
            value={promo}
            onChange={(e) => onPromoChange(e.target.value)}
            placeholder="e.g. AURUM10"
            className="input flex-1"
          />
          <button
            type="button"
            onClick={onApplyPromo}
            className="rounded-xl border border-gold/40 bg-gold/10 px-5 text-xs font-semibold uppercase tracking-wider text-gold transition-colors hover:bg-gold/20"
          >
            Apply
          </button>
        </div>
        {promoApplied > 0 && (
          <p className="mt-3 text-xs text-gold">
            <Check className="mr-1 inline h-3 w-3" /> Code applied — −
            {formatCurrency(promoApplied)}
          </p>
        )}
      </div>
    </Panel>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Step 5 — Payment
// ════════════════════════════════════════════════════════════════════════════

function StepPayment({ total }: { total: number }) {
  return (
    <Panel
      title="Secure payment"
      subtitle="Encrypted and PCI-DSS compliant via Viva Payments."
    >
      {/* Card preview */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a1a1a] via-[#0c0c0c] to-[#000] p-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
        <div className="absolute inset-0 opacity-50" style={{
          background:
            "radial-gradient(80% 60% at 80% 20%, rgba(212,175,55,0.25), transparent 60%)",
        }} />
        <div className="relative flex items-start justify-between">
          <Sparkles className="h-7 w-7 text-gold" />
          <span className="text-xs uppercase tracking-[0.28em] text-white/60">
            Al Hadana · VIP
          </span>
        </div>
        <p className="relative mt-10 font-mono text-xl tracking-[0.32em] text-white/85">
          •••• •••• •••• 4242
        </p>
        <div className="relative mt-6 flex items-end justify-between text-xs uppercase tracking-[0.18em] text-white/55">
          <span>Card preview</span>
          <span>12/28</span>
        </div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <Field label="Card number" full>
          <input
            placeholder="4242 4242 4242 4242"
            className="input font-mono"
            inputMode="numeric"
            autoComplete="cc-number"
          />
        </Field>
        <Field label="Expiry (MM/YY)">
          <input
            placeholder="12/28"
            className="input"
            autoComplete="cc-exp"
          />
        </Field>
        <Field label="CVC">
          <input
            placeholder="123"
            className="input"
            inputMode="numeric"
            autoComplete="cc-csc"
          />
        </Field>
        <Field label="Name on card" full>
          <input
            placeholder="As shown on card"
            className="input"
            autoComplete="cc-name"
          />
        </Field>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-bg-elevated px-4 py-3 text-xs text-muted">
        <Lock className="h-4 w-4 flex-none text-gold" />
        <span>
          You will be charged{" "}
          <strong className="text-text">{formatCurrency(total)}</strong> to
          confirm this booking. A refundable €5,000 hold will be placed on
          pickup.
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.22em] text-muted">
        <span className="flex items-center gap-1.5">
          <Lock className="h-3 w-3 text-gold" /> SSL Secure
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3 w-3 text-gold" /> PCI-DSS
        </span>
        <span>Powered by Viva Payments</span>
      </div>
    </Panel>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Summary sidebar
// ════════════════════════════════════════════════════════════════════════════

function Summary({
  vehicle,
  days,
  pickup,
  dropoff,
  extrasTotal,
  selectedExtras,
  promoApplied,
  subtotal,
  tax,
  total,
}: {
  vehicle: Vehicle;
  days: number;
  pickup: string;
  dropoff: string;
  extrasTotal: number;
  selectedExtras: Set<string>;
  promoApplied: number;
  subtotal: number;
  tax: number;
  total: number;
}) {
  const chosen = ALL_EXTRAS.filter((e) => selectedExtras.has(e.id));
  return (
    <div className="rounded-3xl border border-white/10 bg-bg-elevated/70 p-7 backdrop-blur-xl">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          sizes="(min-width: 1024px) 30vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/70">
            {vehicle.brand}
          </p>
          <h3 className="font-display text-xl font-bold leading-none">
            {vehicle.name}
          </h3>
        </div>
      </div>

      <dl className="mt-5 space-y-1.5 text-xs">
        <SumRow k="Pickup" v={prettyDate(pickup)} />
        <SumRow k="Return" v={prettyDate(dropoff)} />
        <SumRow
          k="Duration"
          v={`${days} day${days === 1 ? "" : "s"}`}
          accent
        />
      </dl>

      <dl className="mt-5 space-y-2 border-t border-white/[0.07] pt-5 text-sm">
        <SumRow
          k={`${formatCurrency(vehicle.pricePerDay)} × ${days}`}
          v={formatCurrency(subtotal)}
        />
        {chosen.length > 0 && (
          <SumRow
            k={`Extras (${chosen.length})`}
            v={formatCurrency(extrasTotal)}
          />
        )}
        {promoApplied > 0 && (
          <SumRow k="Promo" v={`− ${formatCurrency(promoApplied)}`} gold />
        )}
        <SumRow k="VAT (13%)" v={formatCurrency(tax)} />
        <SumRow k="Deposit (refundable)" v={formatCurrency(5000)} muted />

        <div className="mt-3 flex items-end justify-between border-t border-white/[0.07] pt-4">
          <span className="text-xs uppercase tracking-[0.22em] text-muted">
            Total due now
          </span>
          <span className="font-display text-2xl font-bold">
            {formatCurrency(total)}
          </span>
        </div>
      </dl>

      <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/[0.07] bg-black/30 px-3 py-2.5 text-[11px] uppercase tracking-[0.18em] text-muted">
        <Lock className="h-3 w-3 text-gold" /> Encrypted · Free cancellation
        72h+
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Generic UI atoms (panel, field, file drop, etc.)
// ════════════════════════════════════════════════════════════════════════════

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="mb-7">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
        )}
      </header>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={cn("block", full && "sm:col-span-2")}>
      <span className="block text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function FileDrop({
  label,
  hint,
  file,
  onFile,
}: {
  label: string;
  hint: string;
  file: File | null;
  onFile: (f: File | null) => void;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-5 py-7 text-center transition-all",
        file
          ? "border-gold/50 bg-gold/[0.04]"
          : "border-white/15 bg-bg-elevated hover:border-white/30"
      )}
    >
      <input
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0] || null)}
      />
      {file ? (
        <>
          <Check className="h-6 w-6 text-gold" />
          <p className="text-sm font-medium">{file.name}</p>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onFile(null);
            }}
            className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-muted hover:text-gold"
          >
            <X className="h-3 w-3" /> Remove
          </button>
        </>
      ) : (
        <>
          <Upload className="h-6 w-6 text-muted" />
          <p className="text-sm font-medium">{label}</p>
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
            {hint}
          </p>
        </>
      )}
    </label>
  );
}

function ReviewBlock({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 rounded-2xl border border-white/[0.07] bg-bg-elevated p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
          {title}
        </h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-[11px] uppercase tracking-[0.22em] text-gold hover:underline"
        >
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.22em] text-muted">{k}</p>
      <p className="mt-0.5 text-sm">{v}</p>
    </div>
  );
}

function SumRow({
  k,
  v,
  muted,
  gold,
  accent,
}: {
  k: string;
  v: string;
  muted?: boolean;
  gold?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        muted && "text-muted",
        gold && "text-gold",
        accent && "font-semibold"
      )}
    >
      <span>{k}</span>
      <span>{v}</span>
    </div>
  );
}

function Spinner() {
  return (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0a0a0a]/40 border-t-[#0a0a0a]" />
  );
}

function prettyDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function toISO(d: Date) {
  return d.toISOString().slice(0, 10);
}
