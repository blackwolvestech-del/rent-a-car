/**
 * Al Hadana business details — single source of truth for address, contact,
 * map links, pickup locations, and tax rate.
 */
export const site = {
  name: "Al Hadana Company Ltd",
  phone: "+357 95 766266",
  email: "alhadana@gmx.de",
  instagram: "https://www.instagram.com/carrentalhadana",
  address: {
    street: "Apostolou Kourri, Shop 2",
    city: "Pervolia",
    postalCode: "7560",
    country: "Cyprus",
    full: "Apostolou Kourri, Shop 2, 7560 Pervolia, Cyprus",
  },
  maps: {
    /** The share link the owner provided. */
    link: "https://maps.app.goo.gl/UK2jiJgZT2EKQcRh7",
    /** Directions to the exact address. */
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Apostolou%20Kourri%20Shop%202%2C%207560%20Pervolia%2C%20Cyprus",
    /** No-API-key iframe embed centred on the address. */
    embed:
      "https://maps.google.com/maps?q=Apostolou%20Kourri%20Shop%202%2C%207560%20Pervolia%2C%20Cyprus&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
} as const;

/** Cyprus VAT applied to rentals. */
export const VAT_RATE = 0.19;

/** Pickup / drop-off points across Cyprus. Return is at the same location. */
export const pickupLocations = [
  "Larnaca Airport",
  "Larnaca City",
  "Al Hadana Office (Pervolia)",
  "Ayia Napa",
  "Limassol",
  "Nicosia",
] as const;

/** Documents every driver must present at pickup. */
export const requiredDocuments = ["Passport", "Driving licence", "ID card"] as const;
