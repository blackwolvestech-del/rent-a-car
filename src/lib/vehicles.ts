export type VehicleCategory =
  | "Sports"
  | "SUV"
  | "Sedan"
  | "Electric"
  | "Luxury";

export type Transmission = "Automatic" | "Manual";

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  category: VehicleCategory;
  transmission: Transmission;
  pricePerDay: number;
  seats: number;
  topSpeed: number; // km/h
  power: number; // hp
  acceleration: number; // 0-100 km/h seconds
  image: string;
  accent: string; // accent color for card glow
  tagline: string;
}

export function getVehicle(id: string): Vehicle | undefined {
  return vehicles.find((v) => v.id === id);
}

/**
 * Extra gallery shots reused across all vehicles when a per-car gallery isn't
 * defined. Each entry is an Unsplash URL focused on a generic luxury-car
 * angle (interior, dash, wheel close-up) so the gallery feels editorial.
 */
export const galleryBackdrops: string[] = [
  "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80",
];

export function vehicleGallery(v: Vehicle): string[] {
  return [v.image, ...galleryBackdrops];
}

/**
 * Standard kit included with every rental. Surfaced on the details page.
 */
export const includedFeatures = [
  "Unlimited mileage",
  "Comprehensive insurance",
  "24/7 roadside concierge",
  "Free airport pickup & drop-off",
  "Premium fuel — first tank on us",
  "Two named drivers included",
];

/**
 * Optional add-ons. Daily price applies to the entire booking duration.
 */
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
    description: "Premium guided navigation with live traffic.",
    pricePerDay: 9,
    icon: "gps",
  },
  {
    id: "wifi",
    name: "In-Car WiFi",
    description: "Unlimited 5G hotspot, up to 10 devices.",
    pricePerDay: 12,
    icon: "wifi",
  },
  {
    id: "baby-seat",
    name: "Baby Seat",
    description: "Premium infant or toddler seat, professionally fitted.",
    pricePerDay: 8,
    icon: "baby",
  },
  {
    id: "additional-driver",
    name: "Additional Driver",
    description: "Extend the policy to a second named driver.",
    pricePerDay: 14,
    icon: "driver",
  },
  {
    id: "premium-insurance",
    name: "Zero-Excess Insurance",
    description: "Full damage cover with €0 excess and no deposit hold.",
    pricePerDay: 22,
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
 * Fleet data. Images use Unsplash source URLs (royalty-free) so the project
 * renders out of the box. Swap for licensed studio renders in production.
 */
export const vehicles: Vehicle[] = [
  {
    id: "ferrari-296",
    name: "296 GTB",
    brand: "Ferrari",
    category: "Sports",
    transmission: "Automatic",
    pricePerDay: 1450,
    seats: 2,
    topSpeed: 330,
    power: 830,
    acceleration: 2.9,
    image:
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1400&q=80",
    accent: "#d4252f",
    tagline: "Hybrid V6 fury, reimagined.",
  },
  {
    id: "lambo-huracan",
    name: "Huracán EVO",
    brand: "Lamborghini",
    category: "Sports",
    transmission: "Automatic",
    pricePerDay: 1390,
    seats: 2,
    topSpeed: 325,
    power: 640,
    acceleration: 2.9,
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1400&q=80",
    accent: "#e8a317",
    tagline: "Naturally aspirated theatre.",
  },
  {
    id: "rolls-spectre",
    name: "Spectre",
    brand: "Rolls-Royce",
    category: "Luxury",
    transmission: "Automatic",
    pricePerDay: 1980,
    seats: 4,
    topSpeed: 250,
    power: 577,
    acceleration: 4.5,
    image:
      "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1400&q=80",
    accent: "#6f7d92",
    tagline: "Silent, electric grandeur.",
  },
  {
    id: "bentley-conti",
    name: "Continental GT",
    brand: "Bentley",
    category: "Luxury",
    transmission: "Automatic",
    pricePerDay: 1240,
    seats: 4,
    topSpeed: 335,
    power: 650,
    acceleration: 3.6,
    image:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=80",
    accent: "#1f6f54",
    tagline: "Grand touring, perfected.",
  },
  {
    id: "porsche-911",
    name: "911 Turbo S",
    brand: "Porsche",
    category: "Sports",
    transmission: "Automatic",
    pricePerDay: 980,
    seats: 4,
    topSpeed: 330,
    power: 650,
    acceleration: 2.7,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
    accent: "#3b82f6",
    tagline: "The benchmark, untouchable.",
  },
  {
    id: "merc-sclass",
    name: "S 580 4MATIC",
    brand: "Mercedes-Benz",
    category: "Sedan",
    transmission: "Automatic",
    pricePerDay: 720,
    seats: 5,
    topSpeed: 250,
    power: 503,
    acceleration: 4.4,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=80",
    accent: "#9ca3af",
    tagline: "First class on four wheels.",
  },
  {
    id: "tesla-plaid",
    name: "Model S Plaid",
    brand: "Tesla",
    category: "Electric",
    transmission: "Automatic",
    pricePerDay: 640,
    seats: 5,
    topSpeed: 322,
    power: 1020,
    acceleration: 2.1,
    image:
      "https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=1400&q=80",
    accent: "#3b82f6",
    tagline: "1,020 hp of silent violence.",
  },
  {
    id: "range-rover",
    name: "Range Rover Autobiography",
    brand: "Range Rover",
    category: "SUV",
    transmission: "Automatic",
    pricePerDay: 690,
    seats: 5,
    topSpeed: 250,
    power: 530,
    acceleration: 4.6,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=80",
    accent: "#1f6f54",
    tagline: "Command every road.",
  },
  {
    id: "bmw-m8",
    name: "M8 Competition",
    brand: "BMW",
    category: "Sports",
    transmission: "Automatic",
    pricePerDay: 760,
    seats: 4,
    topSpeed: 305,
    power: 625,
    acceleration: 3.2,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80",
    accent: "#3b82f6",
    tagline: "Brutal elegance.",
  },
  {
    id: "audi-rs7",
    name: "RS 7 Sportback",
    brand: "Audi",
    category: "Sedan",
    transmission: "Automatic",
    pricePerDay: 710,
    seats: 5,
    topSpeed: 305,
    power: 600,
    acceleration: 3.4,
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=1400&q=80",
    accent: "#d4252f",
    tagline: "The autobahn weapon.",
  },
];

export const brands = [
  "Ferrari",
  "Lamborghini",
  "Rolls-Royce",
  "Bentley",
  "Mercedes-Benz",
  "BMW",
  "Porsche",
  "Audi",
  "Tesla",
  "Range Rover",
];

export const categories: (VehicleCategory | "All")[] = [
  "All",
  "Sports",
  "SUV",
  "Sedan",
  "Electric",
  "Luxury",
];
