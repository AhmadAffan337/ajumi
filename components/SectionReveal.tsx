"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { EASE } from "@/lib/animations";

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  className?: string;
}

export function SectionReveal({ 
  children, 
  delay = 0, 
  direction = "up",
  className = ""
}: SectionRevealProps) {
  
  const variants = {
    up: {
      hidden: { opacity: 0, y: 60, filter: "blur(4px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" }
    },
    down: {
      hidden: { opacity: 0, y: -60, filter: "blur(4px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" }
    },
    left: {
      hidden: { opacity: 0, x: -60, filter: "blur(4px)" },
      visible: { opacity: 1, x: 0, filter: "blur(0px)" }
    },
    right: {
      hidden: { opacity: 0, x: 60, filter: "blur(4px)" },
      visible: { opacity: 1, x: 0, filter: "blur(0px)" }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9, filter: "blur(4px)" },
      visible: { opacity: 1, scale: 1, filter: "blur(0px)" }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants[direction]}
      transition={{
        duration: 1,
        delay,
        ease: EASE.premium
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Premium parallax effect for backgrounds
interface ParallaxBackgroundProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxBackground({ 
  children, 
  speed = 0.5,
  className = ""
}: ParallaxBackgroundProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: EASE.premium }}
      style={{
        willChange: "transform"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger children animation wrapper
interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({ 
  children, 
  staggerDelay = 0.1,
  className = ""
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Individual stagger item
export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, filter: "blur(3px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" }
      }}
      transition={{ duration: 0.8, ease: EASE.premium }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
