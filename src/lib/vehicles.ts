export type VehicleCategory =
  | "Economy"
  | "SUV"
  | "Sedan"
  | "Convertible"
  | "Hybrid";

export type Transmission = "Automatic" | "Manual";
export type Fuel = "Petrol" | "Diesel" | "Hybrid" | "Electric";

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  year?: number;
  category: VehicleCategory;
  transmission: Transmission;
  fuel: Fuel;
  seats: number;
  doors: number;
  luggage: number; // large bags
  pricePerDay: number; // EUR / day
  image: string;
  accent: string; // accent color for card glow
  tagline: string;
  featured?: boolean;
}

export function getVehicle(id: string): Vehicle | undefined {
  return vehicles.find((v) => v.id === id);
}

/** Gallery for the details page. One real photo per car for now — add more
 *  angles per car (e.g. `/cars/<id>-2.webp`) to extend the thumbnail strip. */
export function vehicleGallery(v: Vehicle): string[] {
  return [v.image];
}

/** Standard kit included with every rental. Surfaced on the details page. */
export const includedFeatures = [
  "Automatic transmission",
  "Comprehensive insurance",
  "24/7 roadside assistance",
  "Unlimited mileage",
  "Free airport pickup & drop-off",
  "Additional driver on request",
];

/** Optional add-ons. Daily price applies to the entire booking duration. */
export interface Extra {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  icon: "gps" | "wifi" | "baby" | "driver" | "insurance";
}

export const extras: Extra[] = [
  {
    id: "gps",
    name: "GPS Navigation",
    description: "Guided navigation with live traffic.",
    pricePerDay: 5,
    icon: "gps",
  },
  {
    id: "wifi",
    name: "In-Car WiFi",
    description: "Unlimited 4G hotspot, up to 10 devices.",
    pricePerDay: 6,
    icon: "wifi",
  },
  {
    id: "baby-seat",
    name: "Baby Seat",
    description: "Infant or toddler seat, professionally fitted.",
    pricePerDay: 4,
    icon: "baby",
  },
  {
    id: "additional-driver",
    name: "Additional Driver",
    description: "Add a second named driver to the policy.",
    pricePerDay: 7,
    icon: "driver",
  },
  {
    id: "premium-insurance",
    name: "Zero-Excess Insurance",
    description: "Full damage cover with €0 excess and no deposit hold.",
    pricePerDay: 12,
    icon: "insurance",
  },
];

/**
 * Days between two ISO date strings (inclusive of the start day).
 * Returns 0 for invalid or reversed ranges.
 */
export function daysBetween(start: string, end: string): number {
  if (!start || !end) return 0;
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  if (Number.isNaN(s) || Number.isNaN(e) || e < s) return 0;
  return Math.max(1, Math.round((e - s) / 86400000));
}

/**
 * Al Hadana fleet — real vehicles and pricing. Images are real, model-matched
 * WebP photos in /public/cars. To use your own studio photos, replace the
 * matching `/cars/<id>.webp` file (keep the same filename).
 */
export const vehicles: Vehicle[] = [
  {
    id: "bmw-x6",
    name: "X6",
    brand: "BMW",
    year: 2023,
    category: "SUV",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    doors: 5,
    luggage: 4,
    pricePerDay: 210,
    image: "/cars/bmw-x6.webp",
    accent: "#3b82f6",
    tagline: "Bold coupé-SUV presence.",
    featured: true,
  },
  {
    id: "bmw-x5",
    name: "X5",
    brand: "BMW",
    year: 2021,
    category: "SUV",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: 5,
    doors: 5,
    luggage: 4,
    pricePerDay: 180,
    image: "/cars/bmw-x5.webp",
    accent: "#3b82f6",
    tagline: "Space, comfort, command.",
    featured: true,
  },
  {
    id: "mercedes-eclass-cabrio",
    name: "E-Class Cabrio",
    brand: "Mercedes-Benz",
    year: 2019,
    category: "Convertible",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 4,
    doors: 2,
    luggage: 2,
    pricePerDay: 110,
    image: "/cars/mercedes-eclass-cabrio.webp",
    accent: "#d4af37",
    tagline: "Top down, spirits up.",
    featured: true,
  },
  {
    id: "mercedes-eclass",
    name: "E-Class",
    brand: "Mercedes-Benz",
    year: 2016,
    category: "Sedan",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: 5,
    doors: 4,
    luggage: 3,
    pricePerDay: 85,
    image: "/cars/mercedes-eclass.webp",
    accent: "#9ca3af",
    tagline: "Executive comfort, refined.",
    featured: true,
  },
  {
    id: "peugeot-3008",
    name: "3008",
    brand: "Peugeot",
    year: undefined,
    category: "SUV",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: 5,
    doors: 5,
    luggage: 3,
    pricePerDay: 60,
    image: "/cars/peugeot-3008.webp",
    accent: "#1f6f54",
    tagline: "Stylish, practical crossover.",
    featured: true,
  },
  {
    id: "vw-golf-7",
    name: "Golf 7",
    brand: "Volkswagen",
    year: 2017,
    category: "Economy",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    doors: 5,
    luggage: 2,
    pricePerDay: 40,
    image: "/cars/vw-golf-7.webp",
    accent: "#3b82f6",
    tagline: "The all-rounder benchmark.",
  },
  {
    id: "mazda-2",
    name: "Mazda 2",
    brand: "Mazda",
    year: 2021,
    category: "Economy",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    doors: 5,
    luggage: 1,
    pricePerDay: 40,
    image: "/cars/mazda-2.webp",
    accent: "#d4252f",
    tagline: "Nimble and efficient.",
  },
  {
    id: "toyota-aqua",
    name: "Aqua Hybrid",
    brand: "Toyota",
    year: 2022,
    category: "Hybrid",
    transmission: "Automatic",
    fuel: "Hybrid",
    seats: 5,
    doors: 5,
    luggage: 2,
    pricePerDay: 35,
    image: "/cars/toyota-aqua.webp",
    accent: "#22c55e",
    tagline: "Sip fuel, save more.",
  },
  {
    id: "nissan-note",
    name: "Note",
    brand: "Nissan",
    year: undefined,
    category: "Economy",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    doors: 5,
    luggage: 2,
    pricePerDay: 35,
    image: "/cars/nissan-note.webp",
    accent: "#3b82f6",
    tagline: "Roomy, easy, economical.",
  },
  {
    id: "nissan-march",
    name: "March",
    brand: "Nissan",
    year: undefined,
    category: "Economy",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    doors: 5,
    luggage: 1,
    pricePerDay: 30,
    image: "/cars/nissan-march.webp",
    accent: "#9ca3af",
    tagline: "The city-friendly runabout.",
  },
  {
    id: "toyota-yaris",
    name: "Yaris",
    brand: "Toyota",
    year: undefined,
    category: "Economy",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    doors: 5,
    luggage: 2,
    pricePerDay: 30,
    image: "/cars/toyota-yaris.webp",
    accent: "#d4252f",
    tagline: "Dependable and frugal.",
  },
];

export const brands = [
  "BMW",
  "Mercedes-Benz",
  "Volkswagen",
  "Peugeot",
  "Toyota",
  "Nissan",
  "Mazda",
];

export const categories: (VehicleCategory | "All")[] = [
  "All",
  "Economy",
  "SUV",
  "Sedan",
  "Convertible",
  "Hybrid",
];
