"use client";

import { motion } from "framer-motion";

const items = [
  "AJUMI AI", "◉", "STUDIO", "★", "AI SYSTEMS", "◉",
  "AUTONOMOUS", "★", "AGENCY", "◉", "EST. 2026", "★",
];

export function Marquee() {
  return (
    <section className="relative py-10 border-y border-white/5 overflow-hidden">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-14 pr-14 text-3xl md:text-5xl font-display text-white/60"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...items, ...items, ...items, ...items].map((t, i) => (
            <span key={i} className={t === "◉" || t === "★" ? "text-ember" : ""}>
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

