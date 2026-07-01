# AURUM — Luxury Car Rental

A cinematic, enterprise-grade luxury car rental platform. The centerpiece is a
**scroll-driven hero** where a sports car drives across the screen as you scroll,
with parallax skyline, rotating wheels, headlight glow, and a particle trail.

## Tech Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **Framer Motion** — UI transitions, scroll-linked motion, magnetic buttons
- **GSAP + ScrollTrigger** — registered for advanced scroll storytelling
- **Lenis** — buttery smooth scrolling (`lenis/react`)
- **React Hook Form + Zod** — typed, validated forms
- **Lucide** — icons

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Design System

Tokens live in [`src/app/globals.css`](src/app/globals.css) under `@theme`:

| Token | Value |
|-------|-------|
| `--color-bg` | `#090909` |
| `--color-card` | `#151515` |
| `--color-gold` | `#D4AF37` |
| `--color-blue` | `#3B82F6` |
| `--color-text` | `#F8F8F8` |
| `--color-muted` | `#9CA3AF` |

Fonts: **Space Grotesk** (display) + **Inter** (body), loaded via `next/font`.

## Project Structure

```
src/
  app/
    layout.tsx          # fonts, metadata, JSON-LD, providers
    page.tsx            # homepage composition
    globals.css         # design tokens + utilities
  components/
    hero/               # scroll-driven hero + SVG sports car
    booking/            # glassmorphism booking widget (RHF + Zod)
    fleet/              # filterable fleet, tilt cards, quick-view modal
    sections/           # featured carousel, stats, why-us, testimonials, CTA
    layout/             # navbar, marquee banner, footer
    ui/                 # magnetic button, cursor glow, scroll progress, headings
    providers/          # Lenis smooth-scroll provider
  lib/
    vehicles.ts         # fleet data (swap Unsplash URLs for licensed renders)
    utils.ts            # cn(), currency formatting
```

## Implemented (this pass)

- ✅ Scroll-driven cinematic hero (car drives L→R, spinning wheels, parallax
  mountains/skyline/road, headlight beam, dust trail, ambient particles)
- ✅ Seamless animated promo marquee
- ✅ Glassmorphism booking widget with validation
- ✅ Filterable luxury fleet (3D tilt, image zoom, shine, quick-view modal)
- ✅ Featured carousel, animated stat counters, why-choose-us, testimonials slider, CTA
- ✅ Magnetic buttons, cursor glow, scroll progress, Lenis smooth scroll
- ✅ SEO metadata + AutoRental JSON-LD, responsive, reduced-motion fallbacks

## Roadmap (next passes)

These are scaffolded conceptually but not yet built — each is a sizeable feature:

1. **Vehicle details page** (`/fleet/[id]`) — gallery, 360° placeholder, specs,
   price calculator, reviews, sticky Book Now sidebar.
2. **Booking flow** — 6-step wizard (vehicle → dates → customer info + document
   uploads → extras → summary → checkout).
3. **Premium checkout** — Stripe-grade two-column layout, promo codes, security badges.
4. **Viva Payments integration** — card/Apple Pay/Google Pay, webhooks, success/failure
   pages, booking IDs, email confirmation, transaction logging. Requires Viva merchant
   credentials (Smart Checkout API).
5. **Auth + User dashboard** — bookings, invoices (PDF), profile, documents, wishlist.
6. **Admin dashboard** — fleet, availability, bookings, customers, payments, coupons,
   reviews, analytics.
7. **Backend/DB** — persistence layer (e.g. Postgres + Prisma), API routes.

> Fleet images currently use royalty-free Unsplash URLs so the project runs out of
> the box. Replace with licensed studio renders for production.
