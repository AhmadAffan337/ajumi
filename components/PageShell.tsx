"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ParticleField } from "./ParticleField";

interface PageShellProps {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
}

export function PageShell({ eyebrow, title, intro, children }: PageShellProps) {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-x-clip">
      <ParticleField density={70} />
      <Navbar />

      <section className="relative pt-28 md:pt-36 pb-12 px-8 md:px-14 max-w-[1500px] mx-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50 mb-8"
        >
          <span className="text-ember">◉</span>
          <span className="h-px w-8 bg-white/20" />
          <span>{eyebrow}</span>
          <span className="h-px w-8 bg-white/20" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(3rem,7.5vw,7.5rem)] leading-[0.95] tracking-tight max-w-5xl mx-auto"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-8 max-w-3xl mx-auto text-white/60 text-lg leading-relaxed font-light"
          >
            {intro}
          </motion.p>
        )}
      </section>

      {children}

      <Footer />
    </main>
  );
}
