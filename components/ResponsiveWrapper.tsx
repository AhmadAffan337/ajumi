"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { responsivePadding, responsiveSpacing, container } from "@/lib/responsive";

interface ResponsiveWrapperProps {
  children: ReactNode;
  className?: string;
  size?: "section" | "sectionLarge" | "tight";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "content" | "full";
  noPadding?: boolean;
}

/**
 * ResponsiveWrapper - Ensures 100% responsive with 0% tolerance
 * Auto-applies responsive padding, spacing, and max-width
 */
export function ResponsiveWrapper({
  children,
  className = "",
  size = "section",
  maxWidth = "content",
  noPadding = false,
}: ResponsiveWrapperProps) {
  const spacingClass = size === "sectionLarge" 
    ? responsiveSpacing.sectionLarge 
    : size === "section"
    ? responsiveSpacing.section
    : "";

  const paddingClass = !noPadding ? responsivePadding.section : "";
  const maxWidthClass = container[maxWidth];

  return (
    <div className={cn(
      "relative w-full",
      spacingClass,
      paddingClass,
      maxWidthClass,
      "mx-auto",
      className
    )}>
      {children}
    </div>
  );
}

/**
 * ResponsiveGrid - Auto-responsive grid system
 */
interface ResponsiveGridProps {
  children: ReactNode;
  cols?: 2 | 3 | 4 | 6;
  gap?: "small" | "normal" | "large";
  className?: string;
}

export function ResponsiveGrid({
  children,
  cols = 3,
  gap = "normal",
  className = "",
}: ResponsiveGridProps) {
  const colsClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
  }[cols];

  const gapClass = {
    small: "gap-3 sm:gap-4 md:gap-5",
    normal: "gap-4 sm:gap-6 md:gap-8",
    large: "gap-6 sm:gap-8 md:gap-10 lg:gap-12",
  }[gap];

  return (
    <div className={cn("grid", colsClass, gapClass, className)}>
      {children}
    </div>
  );
}

/**
 * ResponsiveText - Ensures text is perfectly readable on all devices
 */
interface ResponsiveTextProps {
  children: ReactNode;
  variant?: "hero" | "h1" | "h2" | "h3" | "h4" | "body" | "small";
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function ResponsiveText({
  children,
  variant = "body",
  className = "",
  as: Component = "p",
}: ResponsiveTextProps) {
  const sizeClass = {
    hero: "text-[clamp(2.5rem,12vw,10rem)]",
    h1: "text-[clamp(2rem,6vw,6rem)]",
    h2: "text-[clamp(1.75rem,5vw,4.5rem)]",
    h3: "text-[clamp(1.5rem,4vw,3rem)]",
    h4: "text-[clamp(1.25rem,3vw,2rem)]",
    body: "text-base sm:text-lg md:text-xl",
    small: "text-sm sm:text-base",
  }[variant];

  return (
    <Component className={cn(sizeClass, className)}>
      {children}
    </Component>
  );
}

/**
 * MobileOnly - Show only on mobile
 */
export function MobileOnly({ children }: { children: ReactNode }) {
  return <div className="block md:hidden">{children}</div>;
}

/**
 * DesktopOnly - Show only on desktop
 */
export function DesktopOnly({ children }: { children: ReactNode }) {
  return <div className="hidden md:block">{children}</div>;
}

/**
 * TabletUp - Show on tablet and above
 */
export function TabletUp({ children }: { children: ReactNode }) {
  return <div className="hidden sm:block">{children}</div>;
}
