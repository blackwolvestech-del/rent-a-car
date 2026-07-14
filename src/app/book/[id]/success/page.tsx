import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, Mail, Phone, Calendar, MapPin } from "lucide-react";
import { getVehicle, vehicles } from "@/lib/vehicles";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ConfettiBurst } from "@/components/booking/confetti-burst";
import { formatCurrency } from "@/lib/utils";
import { site } from "@/lib/site";

interface Params {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ref?: string; total?: string }>;
}

export function generateStaticParams() {
  return vehicles.map((v) => ({ id: v.id }));
}

export const metadata = {
  title: "Booking confirmed",
};

export default async function SuccessPage({ params, searchParams }: Params) {
  const { id } = await params;
  const { ref, total } = await searchParams;
  const vehicle = getVehicle(id);
  if (!vehicle) notFound();

  const totalNum = Number(total) || 0;
  const reference = ref || "AH-CONFIRMED";

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-32 pb-24">
        <ConfettiBurst />

        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold ring-8 ring-gold/[0.04]">
              <Check className="h-8 w-8" />
            </span>
            <h1 className="mt-7 font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              <span className="text-gradient-light">Booking</span>{" "}
              <span className="text-gradient-gold">confirmed.</span>
            </h1>
            <p className="mt-4 text-base text-muted">
              We&apos;ve sent a receipt and pickup instructions to your inbox.
            </p>

            <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-bg-elevated px-5 py-2.5">
              <span className="text-[10px] uppercase tracking-[0.28em] text-muted">
                Reference
              </span>
              <span className="font-mono text-sm font-semibold tracking-wider text-gold">
                {reference}
              </span>
            </div>
          </div>

          {/* Receipt card */}
          <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-bg-elevated/70 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            <div className="relative aspect-[16/7] overflow-hidden">
              <Image
                src={vehicle.image}
                alt={vehicle.name}
                fill
                priority
                sizes="(min-width: 768px) 720px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated via-bg-elevated/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs uppercase tracking-[0.32em] text-white/70">
                  {vehicle.brand}
                </p>
                <h2 className="mt-1 font-display text-3xl font-bold leading-none">
                  {vehicle.name}
                </h2>
              </div>
            </div>

            <div className="grid gap-4 p-7 sm:grid-cols-2">
              <Detail
                icon={<Calendar className="h-4 w-4" />}
                label="Pickup"
                value="At your selected date · 09:00 onwards"
              />
              <Detail
                icon={<MapPin className="h-4 w-4" />}
                label="Where"
                value="Concierge delivery to your chosen location"
              />
              <Detail
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value="A confirmation is in your inbox"
              />
              <Detail
                icon={<Phone className="h-4 w-4" />}
                label="24/7 support"
                value={site.phone}
              />
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.07] px-7 py-5">
              <span className="text-xs uppercase tracking-[0.22em] text-muted">
                Charged today
              </span>
              <span className="font-display text-2xl font-bold">
                {totalNum > 0 ? formatCurrency(totalNum) : "—"}
              </span>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3 text-sm font-medium uppercase tracking-wider transition-colors hover:border-white/30"
            >
              Back to home
            </Link>
            <Link
              href="/#fleet"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-soft to-gold px-7 py-3 text-sm font-bold uppercase tracking-wider text-[#0a0a0a] shadow-[0_0_40px_-8px_rgba(212,175,55,0.6)] transition-all hover:shadow-[0_0_60px_-8px_rgba(212,175,55,0.85)]"
            >
              Book another car
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-black/30 p-4">
      <span className="mt-0.5 text-gold">{icon}</span>
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
          {label}
        </p>
        <p className="mt-0.5 text-sm">{value}</p>
      </div>
    </div>
  );
}
