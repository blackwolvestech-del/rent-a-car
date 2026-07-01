/**
 * Al Hadana Company Ltd — facility-management enterprise.
 * Central content model for services, industries, stats, values, testimonials.
 * Swap copy/images for production content; images use royalty-free Unsplash.
 */

export type ServiceIcon =
  | "building"
  | "sparkles"
  | "bug"
  | "wrench"
  | "hammer"
  | "users"
  | "factory"
  | "leaf";

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: ServiceIcon;
  image: string;
  features: string[];
}

export const services: Service[] = [
  {
    slug: "facility-management",
    title: "Facility Management",
    short: "End-to-end management of your built environment.",
    description:
      "Integrated facility management that keeps your buildings running at peak performance — from hard and soft services to energy, compliance, and helpdesk operations, all under one accountable partner.",
    icon: "building",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
    features: [
      "Integrated hard & soft services",
      "24/7 helpdesk & CAFM systems",
      "Energy & sustainability management",
      "Statutory compliance & audits",
    ],
  },
  {
    slug: "cleaning-services",
    title: "Cleaning Services",
    short: "Immaculate spaces, every single day.",
    description:
      "Professional commercial and industrial cleaning delivered by trained, vetted teams using hospital-grade products and modern equipment — daily contracts, deep cleans, and specialist facade and floor care.",
    icon: "sparkles",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80",
    features: [
      "Daily janitorial contracts",
      "Deep & post-construction cleaning",
      "Facade, glass & high-level cleaning",
      "Floor care & specialist restoration",
    ],
  },
  {
    slug: "pest-control",
    title: "Pest Control",
    short: "Certified, discreet, guaranteed protection.",
    description:
      "Licensed pest management protecting your people, property, and reputation. Preventive programmes, rapid response, and eco-responsible treatments backed by full documentation and audit trails.",
    icon: "bug",
    image:
      "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1400&q=80",
    features: [
      "Preventive treatment programmes",
      "Rodent, insect & termite control",
      "Fumigation & thermal solutions",
      "HACCP-compliant documentation",
    ],
  },
  {
    slug: "maintenance",
    title: "Maintenance",
    short: "Planned and reactive, always ready.",
    description:
      "Multi-trade planned preventive and reactive maintenance that maximises asset life and minimises downtime — MEP, HVAC, electrical, plumbing, and fabric, delivered against clear SLAs.",
    icon: "wrench",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1400&q=80",
    features: [
      "MEP & HVAC maintenance",
      "Planned preventive schedules",
      "24/7 reactive response",
      "Asset lifecycle management",
    ],
  },
  {
    slug: "construction-support",
    title: "Construction Support",
    short: "Reliable support across every project phase.",
    description:
      "Skilled trades, site services, and project support that keep construction programmes on schedule — from fit-out and finishing to snagging, handover, and post-completion care.",
    icon: "hammer",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
    features: [
      "Fit-out & finishing trades",
      "Site services & logistics",
      "Snagging & handover support",
      "Post-completion maintenance",
    ],
  },
  {
    slug: "manpower-supply",
    title: "Manpower Supply",
    short: "Vetted talent, deployed on demand.",
    description:
      "Flexible, fully compliant manpower solutions — skilled and semi-skilled staff supplied at scale, screened, trained, and managed so you get productive people without the administrative burden.",
    icon: "users",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=80",
    features: [
      "Skilled & semi-skilled staff",
      "Screened & trained personnel",
      "Payroll & compliance handled",
      "Rapid scale-up & deployment",
    ],
  },
  {
    slug: "industrial-services",
    title: "Industrial Services",
    short: "Heavy-duty solutions for demanding sites.",
    description:
      "Specialist industrial services for plants, warehouses, and processing facilities — high-pressure cleaning, tank and duct maintenance, waste handling, and shutdown support delivered to strict HSE standards.",
    icon: "factory",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1400&q=80",
    features: [
      "High-pressure & tank cleaning",
      "Duct & ventilation services",
      "Plant shutdown support",
      "HSE-compliant operations",
    ],
  },
  {
    slug: "environmental-solutions",
    title: "Environmental Solutions",
    short: "Sustainable, responsible, compliant.",
    description:
      "Environmental services that keep you compliant and sustainable — waste management, recycling programmes, water treatment, and green-cleaning initiatives that reduce your footprint and cost.",
    icon: "leaf",
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1400&q=80",
    features: [
      "Waste management & recycling",
      "Water & effluent treatment",
      "Green-cleaning programmes",
      "Sustainability reporting",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export interface Industry {
  name: string;
  icon: ServiceIcon | "home" | "briefcase" | "landmark" | "hotel" | "heart" | "school" | "warehouse";
  blurb: string;
}

export const industries: Industry[] = [
  { name: "Residential", icon: "home", blurb: "Communities, towers & compounds" },
  { name: "Commercial", icon: "briefcase", blurb: "Offices, retail & mixed-use" },
  { name: "Industrial", icon: "factory", blurb: "Plants, factories & logistics" },
  { name: "Government", icon: "landmark", blurb: "Public sector & institutions" },
  { name: "Hospitality", icon: "hotel", blurb: "Hotels, resorts & leisure" },
  { name: "Healthcare", icon: "heart", blurb: "Hospitals & clinics" },
  { name: "Education", icon: "school", blurb: "Schools, campuses & universities" },
  { name: "Warehousing", icon: "warehouse", blurb: "Distribution & cold storage" },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 1200, suffix: "+", label: "Projects Delivered" },
  { value: 3500, suffix: "+", label: "Trained Staff" },
  { value: 18, suffix: "+", label: "Years of Service" },
  { value: 99, suffix: "%", label: "Client Retention" },
];

export interface Value {
  title: string;
  body: string;
}

export const coreValues: Value[] = [
  {
    title: "Integrity",
    body: "We do what we say — transparent pricing, honest reporting, and accountability at every level.",
  },
  {
    title: "Excellence",
    body: "World-class standards, measured against SLAs and audited relentlessly so quality never slips.",
  },
  {
    title: "Safety",
    body: "Zero-harm culture. Every task is planned, risk-assessed, and executed to strict HSE standards.",
  },
  {
    title: "Sustainability",
    body: "Green processes, responsible waste, and energy efficiency built into everything we deliver.",
  },
];

export interface Testimonial {
  name: string;
  role: string;
  initials: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Khalid Al-Mansoori",
    role: "Facilities Director · Commercial Tower",
    initials: "KM",
    text: "Al Hadana took over our entire facility operation and standards jumped overnight. One partner, one point of contact, zero excuses. Exceptional.",
  },
  {
    name: "Sarah Bennett",
    role: "Operations Manager · Hospitality Group",
    initials: "SB",
    text: "Across five properties their teams are consistent, professional, and invisible in the best way. Guests only notice how spotless everything is.",
  },
  {
    name: "Ahmed Rashid",
    role: "Plant Manager · Industrial Facility",
    initials: "AR",
    text: "Their industrial and maintenance crews understand HSE better than most in-house teams. Downtime is down, compliance is airtight.",
  },
];

export const WHATSAPP = "+9710000000000";
export const PHONE = "+971 4 000 0000";
export const EMAIL = "info@alhadana.com";
