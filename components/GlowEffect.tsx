"use client";

export function GlowEffect({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        background:
          "radial-gradient(circle at 70% 50%, rgba(255,90,42,0.25) 0%, rgba(255,90,42,0.08) 25%, transparent 55%)",
        filter: "blur(60px)",
      }}
    />
  );
}

