"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Methodology() {
  return (
    <section id="methodology" className="relative py-20 md:py-24 px-8 md:px-14 max-w-[1500px] mx-auto border-t border-white/5">
      <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
        <span className="text-ember">(05)</span>
        <span className="h-px w-8 bg-white/20" />
        <span>Our Methodology</span>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1 }}
        className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[1.02] tracking-tight max-w-4xl"
      >
        Data science precision. <span className="text-ember italic">Engineered</span> for revenue.
      </motion.h2>

      <div className="mt-16 grid md:grid-cols-3 gap-8">
        {/* Column 1: Attribution Modeling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0 }}
          className="group relative p-8 rounded-lg border border-white/10 bg-white/[0.01] hover:bg-white/[0.02] transition-colors"
        >
          <div className="h-40 w-full mb-6 border border-white/5 rounded bg-black/40 p-4 flex flex-col justify-between overflow-hidden relative">
            <span className="text-[10px] font-mono text-white/40 uppercase">Attribution Engine Precision</span>
            {/* Attribution chart comparison */}
            <div className="space-y-3 mt-4">
              <div>
                <div className="flex justify-between text-[10px] text-white/60 mb-1">
                  <span>Standard Pixel</span>
                  <span>58% Accuracy</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "58%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-white/30"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-ember mb-1">
                  <span>Ajumi AI Server-Side</span>
                  <span className="font-bold">96% Accuracy</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "96%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-ember shadow-[0_0_8px_rgba(255,90,42,0.4)]"
                  />
                </div>
              </div>
            </div>
          </div>
          <h3 className="font-display text-2xl group-hover:text-ember transition-colors">Server-Side Attribution</h3>
          <p className="mt-3 text-white/55 text-sm leading-relaxed">
            Eliminate dark social gaps and iOS tracking limitations. Our deterministic model tracks 96% of cross-channel touchpoints correctly.
          </p>
        </motion.div>

        {/* Column 2: High-Velocity Creative Testing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="group relative p-8 rounded-lg border border-white/10 bg-white/[0.01] hover:bg-white/[0.02] transition-colors"
        >
          <div className="h-40 w-full mb-6 border border-white/5 rounded bg-black/40 p-4 flex justify-center items-center overflow-hidden relative">
            <span className="absolute top-4 left-4 text-[10px] font-mono text-white/40 uppercase">Creative Velocity Loop</span>
            <div className="flex gap-3 items-end mt-4">
              {[60, 100, 80].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-8 bg-white/5 border border-white/10 rounded-t p-1 flex flex-col justify-end" style={{ height: 80 }}>
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.1 }}
                      className="w-full rounded-t bg-ember"
                    />
                  </div>
                  <span className="text-[8px] font-mono text-white/30">V{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
          <h3 className="font-display text-2xl group-hover:text-ember transition-colors">High-Velocity Creative</h3>
          <p className="mt-3 text-white/55 text-sm leading-relaxed">
            Scale spend without creative fatigue. Our model iterates layout versions, hooks, and creators to optimize CTR dynamically.
          </p>
        </motion.div>

        {/* Column 3: Auto-Bidding Bypasses */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="group relative p-8 rounded-lg border border-white/10 bg-white/[0.01] hover:bg-white/[0.02] transition-colors"
        >
          <div className="h-40 w-full mb-6 border border-white/5 rounded bg-black/40 p-4 flex flex-col justify-between overflow-hidden relative">
            <span className="text-[10px] font-mono text-white/40 uppercase">Scale Optimization (Budget)</span>
            <div className="flex justify-between items-end mt-4">
              <div className="space-y-1">
                <span className="text-[8px] uppercase tracking-wider text-white/30">Budget Cap</span>
                <span className="text-xl font-display font-semibold block text-white/90">$140k/mo</span>
              </div>
              <div className="text-right space-y-1">
                <span className="text-[8px] uppercase tracking-wider text-white/30">Efficiency</span>
                <span className="text-xl font-display font-semibold block text-ember">4.8× return on ad spend</span>
              </div>
            </div>
            {/* Sparkline */}
            <svg className="w-full h-8 text-ember opacity-60" viewBox="0 0 100 20" preserveAspectRatio="none">
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                d="M0 20 L20 15 L40 18 L60 8 L80 12 L100 2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <h3 className="font-display text-2xl group-hover:text-ember transition-colors">Predictive Bid Triggers</h3>
          <p className="mt-3 text-white/55 text-sm leading-relaxed">
            Stop losing budget on down days. Our system adjusts bidding tiers automatically based on early-hour conversions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

