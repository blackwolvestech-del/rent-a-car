"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "gold" | "ghost" | "outline";
  onClick?: () => void;
  type?: "button" | "submit";
  strength?: number;
}

/**
 * Button that gently pulls toward the cursor while hovered, then springs back.
 */
export function MagneticButton({
  children,
  className,
  variant = "gold",
  onClick,
  type = "button",
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    setPos({ x, y });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const variants = {
    gold: "bg-gradient-to-br from-gold-soft to-gold text-[#0a0a0a] shadow-[var(--shadow-glow-gold)] hover:shadow-[0_0_80px_-10px_rgba(212,175,55,0.7)]",
    ghost: "bg-white/5 text-text hover:bg-white/10 border border-white/10",
    outline:
      "bg-transparent text-text border border-white/20 hover:border-gold hover:text-gold",
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.4 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-shadow duration-500 will-change-transform",
        variants[variant],
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
