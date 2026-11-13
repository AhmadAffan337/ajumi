"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Exact coordinates of the cursor
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the outer ring follower
  const springConfig = { stiffness: 220, damping: 26, mass: 0.4 };
  const followerX = useSpring(mouseX, springConfig);
  const followerY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    
    // Only enable on desktop/non-touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest('[role="button"]') ||
        target.classList.contains("cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovered(!!isInteractive);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [mouseX, mouseY]);

  // Prevent hydration mismatch
  if (!isMounted || !isVisible) return null;

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          body.custom-cursor-active,
          body.custom-cursor-active a,
          body.custom-cursor-active button,
          body.custom-cursor-active [role="button"],
          body.custom-cursor-active input,
          body.custom-cursor-active textarea,
          body.custom-cursor-active select,
          body.custom-cursor-active .cursor-pointer {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Outer follow ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 will-change-transform mix-blend-screen"
        style={{
          x: followerX,
          y: followerY,
          borderColor: isHovered ? "#ff5a2a" : "rgba(255, 255, 255, 0.25)",
          backgroundColor: isHovered ? "rgba(255, 90, 42, 0.08)" : "rgba(0, 0, 0, 0)",
          boxShadow: isHovered ? "0 0 16px rgba(255, 90, 42, 0.4)" : "none",
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 20, mass: 0.2 }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 bg-[#ff5a2a] will-change-transform"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
      />
    </>
  );
}
