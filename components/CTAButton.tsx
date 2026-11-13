"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface CTAButtonProps {
  children: ReactNode;
  variant?: "primary" | "ghost";
  onClick?: () => void;
}

export function CTAButton({ children, variant = "primary", onClick }: CTAButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 sm:gap-3 rounded-full px-5 sm:px-6 md:px-7 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base font-medium tracking-wide transition-all duration-500 overflow-hidden w-full sm:w-auto";
  const styles =
    variant === "primary"
      ? "bg-white text-black hover:bg-[#ff5a2a] hover:text-white"
      : "border border-white/20 text-white hover:border-white/60";

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`${base} ${styles}`}
    >
      <span className="relative z-10">{children}</span>
      <span className={`relative z-10 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-all duration-500 group-hover:rotate-45 ${variant === "primary" ? "bg-black/10 group-hover:bg-white/20" : "bg-white/10 group-hover:bg-white/20"}`}>
        <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
      </span>
    </motion.button>
  );
}

