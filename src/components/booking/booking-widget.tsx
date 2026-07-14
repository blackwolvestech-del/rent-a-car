"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, CalendarDays, Car, Search } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { pickupLocations } from "@/lib/site";

const schema = z
  .object({
    pickup: z.string().min(2, "Required"),
    dropoff: z.string(),
    pickupDate: z.string().min(1, "Required"),
    returnDate: z.string().min(1, "Required"),
    vehicleType: z.string().min(1, "Required"),
  })
  .refine((d) => d.returnDate >= d.pickupDate, {
    message: "Return must be after pickup",
    path: ["returnDate"],
  });

type BookingForm = z.infer<typeof schema>;

const fieldBase =
  "w-full bg-transparent text-sm text-text placeholder:text-muted/70 focus:outline-none";

export function BookingWidget() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingForm>({
    resolver: zodResolver(schema),
    defaultValues: { pickup: pickupLocations[0], dropoff: "", vehicleType: "" },
  });

  const router = useRouter();
  const onSubmit = (data: BookingForm) => {
    const params = new URLSearchParams();
    if (data.vehicleType) params.set("category", data.vehicleType);
    if (data.pickupDate) params.set("from", data.pickupDate);
    if (data.returnDate) params.set("to", data.returnDate);
    router.push(`/fleet${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-30 mx-auto -mt-24 w-[92%] max-w-6xl"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="glass-strong grid grid-cols-1 gap-px overflow-hidden rounded-3xl p-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] md:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]"
      >
        <Field
          icon={<MapPin className="h-4 w-4 text-gold" />}
          label="Pickup Location"
          error={errors.pickup?.message}
        >
          <select className={`${fieldBase} [&>option]:bg-[#151515]`} {...register("pickup")}>
            {pickupLocations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </Field>

        <Field
          icon={<MapPin className="h-4 w-4 text-gold" />}
          label="Drop-off Location"
          error={errors.dropoff?.message}
        >
          <select className={`${fieldBase} [&>option]:bg-[#151515]`} {...register("dropoff")}>
            <option value="">Same as pickup</option>
            {pickupLocations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </Field>

        <Field
          icon={<CalendarDays className="h-4 w-4 text-gold" />}
          label="Pickup Date"
          error={errors.pickupDate?.message}
        >
          <input type="date" className={`${fieldBase} [color-scheme:dark]`} {...register("pickupDate")} />
        </Field>

        <Field
          icon={<CalendarDays className="h-4 w-4 text-gold" />}
          label="Return Date"
          error={errors.returnDate?.message}
        >
          <input type="date" className={`${fieldBase} [color-scheme:dark]`} {...register("returnDate")} />
        </Field>

        <Field
          icon={<Car className="h-4 w-4 text-gold" />}
          label="Vehicle Type"
          error={errors.vehicleType?.message}
        >
          <select className={`${fieldBase} [&>option]:bg-[#151515]`} {...register("vehicleType")}>
            <option value="">Any</option>
            <option value="Economy">Economy</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Convertible">Convertible</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </Field>

        <div className="flex items-center justify-center p-2">
          <MagneticButton type="submit" variant="gold" className="h-full w-full px-7">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
          </MagneticButton>
        </div>
      </form>
    </motion.div>
  );
}

function Field({
  icon,
  label,
  error,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="group relative flex flex-col gap-1 rounded-2xl px-4 py-3 transition-colors hover:bg-white/5">
      <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
        {icon}
        {label}
      </span>
      {children}
      {error && <span className="text-[10px] text-red-400">{error}</span>}
    </label>
  );
}
