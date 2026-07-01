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

export type ProjectCategory =
  | "Commercial"
  | "Residential"
  | "Industrial"
  | "Hospitality"
  | "Healthcare";

export interface Project {
  title: string;
  category: ProjectCategory;
  location: string;
  summary: string;
  image: string;
  /** Optional before/after pair for the comparison slider. */
  before?: string;
  after?: string;
  /** Masonry emphasis — "tall" spans two rows, "wide" spans two columns. */
  span?: "tall" | "wide" | "normal";
}

export const projectCategories: (ProjectCategory | "All")[] = [
  "All",
  "Commercial",
  "Residential",
  "Industrial",
  "Hospitality",
  "Healthcare",
];

export const projects: Project[] = [
  {
    title: "Grade-A Office Tower",
    category: "Commercial",
    location: "Business Bay, Dubai",
    summary:
      "Integrated FM across 42 floors — cleaning, MEP maintenance, and 24/7 helpdesk under a single SLA.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    span: "tall",
  },
  {
    title: "Luxury Residential Community",
    category: "Residential",
    location: "Palm District",
    summary:
      "Common-area cleaning, landscaping support, and pest control for 900+ units.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    before:
      "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&w=1200&q=80",
    after:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Manufacturing Plant",
    category: "Industrial",
    location: "Industrial Zone 3",
    summary:
      "High-pressure cleaning, duct maintenance, and shutdown support to strict HSE standards.",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80",
    span: "wide",
  },
  {
    title: "Five-Star Resort",
    category: "Hospitality",
    location: "Marina Waterfront",
    summary:
      "Round-the-clock housekeeping support and specialist facade cleaning across the property.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Private Hospital",
    category: "Healthcare",
    location: "Medical City",
    summary:
      "Infection-control cleaning, waste management, and compliant environmental services.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Corporate Headquarters",
    category: "Commercial",
    location: "Financial District",
    summary:
      "Soft-services package with daily janitorial teams and planned preventive maintenance.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Logistics Warehouse",
    category: "Industrial",
    location: "Distribution Hub",
    summary:
      "Floor care, high-level cleaning, and manpower supply for a 60,000 m² facility.",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Boutique Hotel Refurbishment",
    category: "Hospitality",
    location: "Old Town",
    summary:
      "Post-construction deep clean and handover before a full re-opening.",
    image:
      "https://images.unsplash.com/photo-1590725140246-20acdee442be?auto=format&fit=crop&w=1200&q=80",
    before:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
    after:
      "https://images.unsplash.com/photo-1590725140246-20acdee442be?auto=format&fit=crop&w=1200&q=80",
  },
];

export const WHATSAPP = "+9710000000000";
export const PHONE = "+971 4 000 0000";
export const EMAIL = "info@alhadana.com";
