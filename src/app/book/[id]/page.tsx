import { notFound } from "next/navigation";
import { getVehicle, vehicles } from "@/lib/vehicles";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BookingWizard } from "@/components/booking/booking-wizard";

interface Params {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string; to?: string }>;
}

export function generateStaticParams() {
  return vehicles.map((v) => ({ id: v.id }));
}

export const metadata = {
  title: "Complete your booking",
};

export default async function BookPage({ params, searchParams }: Params) {
  const { id } = await params;
  const { from, to } = await searchParams;
  const vehicle = getVehicle(id);
  if (!vehicle) notFound();

  return (
    <>
      <Navbar />
      <main className="relative pt-24 pb-24">
        <BookingWizard
          vehicle={vehicle}
          defaultPickup={from}
          defaultDropoff={to}
        />
      </main>
      <Footer />
    </>
  );
}
