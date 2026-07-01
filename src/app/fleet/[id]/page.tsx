import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getVehicle, vehicles } from "@/lib/vehicles";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VehicleDetail } from "@/components/vehicle-detail/vehicle-detail";

interface Params {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return vehicles.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const v = getVehicle(id);
  if (!v) return { title: "Vehicle not found" };
  return {
    title: `${v.brand} ${v.name}`,
    description: `${v.tagline} Rent the ${v.brand} ${v.name} from Al Hadana — concierge delivery, fully insured, instant booking.`,
  };
}

export default async function VehicleDetailPage({ params }: Params) {
  const { id } = await params;
  const vehicle = getVehicle(id);
  if (!vehicle) notFound();

  return (
    <>
      <Navbar />
      <main className="relative pt-24">
        <VehicleDetail vehicle={vehicle} />
      </main>
      <Footer />
    </>
  );
}
