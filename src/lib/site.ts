/**
 * Al Hadana business details — single source of truth for address, contact,
 * and map links. Phone is a placeholder until the real number is provided.
 */
export const site = {
  name: "Al Hadana Company Ltd",
  phone: "+357 24 000 000", // TODO: replace with the real number
  email: "info@alhadana.com",
  address: {
    street: "Apostolou Kourri 2",
    city: "Larnaca",
    postalCode: "7560",
    country: "Cyprus",
    full: "Apostolou Kourri 2, Larnaca 7560, Cyprus",
  },
  maps: {
    /** The share link the owner provided. */
    link: "https://maps.app.goo.gl/UK2jiJgZT2EKQcRh7",
    /** Directions to the exact address. */
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Apostolou%20Kourri%202%2C%20Larnaca%207560%2C%20Cyprus",
    /** No-API-key iframe embed centred on the address. */
    embed:
      "https://maps.google.com/maps?q=Apostolou%20Kourri%202%2C%20Larnaca%207560%2C%20Cyprus&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
} as const;
