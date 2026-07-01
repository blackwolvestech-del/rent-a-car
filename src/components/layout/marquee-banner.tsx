"use client";

const ITEMS = [
  "Facility Management",
  "Cleaning Services",
  "Pest Control",
  "Maintenance",
  "Manpower Supply",
  "Industrial Services",
  "ISO Certified",
  "24/7 Support",
];

/**
 * Seamless infinite marquee. The track is duplicated and translated -50%,
 * so the second copy lines up exactly where the first started — no seam.
 */
export function MarqueeBanner() {
  return (
    <div className="relative z-40 w-full overflow-hidden border-y border-white/10 bg-gradient-to-r from-[#0c0c0c] via-[#141008] to-[#0c0c0c] py-3">
      <div className="flex w-max animate-marquee" style={{ ["--marquee-duration" as string]: "32s" }}>
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex items-center" aria-hidden={dup === 1}>
            {ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-6 px-6">
                <span className="text-sm font-medium uppercase tracking-[0.18em] text-text/90">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
