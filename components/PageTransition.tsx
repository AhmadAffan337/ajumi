"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { EASE } from "@/lib/animations";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE.premium }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Smooth section divider with animation
export function SectionDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: EASE.premium }}
      className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-20"
    />
  );
}

// Premium glow effect for sections
export function SectionGlow({ color = "ember" }: { color?: string }) {
  const colors = {
    ember: "rgba(255, 90, 42, 0.03)",
    purple: "rgba(168, 85, 247, 0.03)",
    blue: "rgba(59, 130, 246, 0.03)",
    green: "rgba(34, 197, 94, 0.03)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2, ease: EASE.premium }}
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse at center, ${colors[color as keyof typeof colors] || colors.ember}, transparent 70%)`,
        filter: "blur(60px)"
      }}
    />
  );
}

// Floating animation wrapper
export function FloatingElement({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotate: [0, 2, 0, -2, 0]
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

// Shimmer effect for premium feel
export function ShimmerEffect() {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "200%" }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
        repeatDelay: 2
      }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
      style={{
        transform: "skewX(-20deg)"
      }}
    />
  );
}
