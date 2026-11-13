import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  id?: string;
}

const sizeVariants = {
  sm: "py-16 md:py-20",
  md: "py-20 md:py-24", 
  lg: "py-24 md:py-28",
  xl: "py-28 md:py-32",
};

export function Section({ 
  children, 
  className, 
  size = "md",
  id 
}: SectionProps) {
  return (
    <section 
      id={id}
      className={cn(
        "relative px-8 md:px-14 max-w-[1500px] mx-auto",
        sizeVariants[size],
        className
      )}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  index: string;
  title: string;
  className?: string;
}

export function SectionHeader({ index, title, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50 mb-8", className)}>
      <span className="text-ember">({index})</span>
      <span className="h-px w-8 bg-white/20" />
      <span>{title}</span>
    </div>
  );
}