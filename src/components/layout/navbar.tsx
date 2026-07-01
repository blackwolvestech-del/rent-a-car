"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";

const LINKS = [
  { label: "Fleet", href: "/fleet" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8",
          scrolled
            ? "my-3 rounded-full border border-white/10 bg-black/50 py-3 backdrop-blur-xl"
            : "py-5"
        )}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span className="font-display text-xl font-bold leading-none tracking-tight sm:text-[1.4rem]">
            AL HA<span className="text-gold">DA</span>NA
          </span>
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.32em] text-white/45 sm:inline">
            Co. LTD
          </span>
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "group relative text-sm font-medium transition-colors",
                    active ? "text-text" : "text-muted hover:text-text"
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:+35315550142"
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
          >
            <Phone className="h-4 w-4" /> 24/7
          </a>
          <Link href="/fleet">
            <MagneticButton variant="gold" className="px-6 py-3 text-xs">
              Book Now
            </MagneticButton>
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-text md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-4 mt-2 rounded-2xl border border-white/10 bg-black/80 p-6 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-lg",
                      isActive(l.href) ? "text-gold" : "text-text"
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/fleet" onClick={() => setOpen(false)}>
              <MagneticButton variant="gold" className="mt-6 w-full">
                Book Now
              </MagneticButton>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
