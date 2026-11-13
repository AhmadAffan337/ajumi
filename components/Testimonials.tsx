"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Ajumi AI transformed our paid media completely. Within a quarter our cost to win a customer dropped 40% while volume doubled — that's a rare combination.",
    name: "Daniel Timber",
    role: "CEO, Northwind",
    result: "−40% cost per customer",
  },
  {
    quote: "Working with Ajumi AI felt like adding a growth team overnight. Clear communication, sharp creative, and every campaign backed by numbers.",
    name: "Jason Miller",
    role: "Founder, Cadence",
    result: "2× Volume",
  },
  {
    quote: "The brand and content system they built elevated us out of price competition. Rare to find a team that owns strategy and execution equally well.",
    name: "Michelle Jordan",
    role: "CMO, Orbit Labs",
    result: "+180% LTV",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 md:py-24 px-8 md:px-14 max-w-[1500px] mx-auto">
      {/* Background subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,90,42,0.015),transparent_65%)] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 relative z-10">
        <div>
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50 mb-6">
            <span className="text-ember">(06)</span>
            <span className="h-px w-8 bg-white/20" />
            <span>Testimonials</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE }}
            className="font-display text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.0] tracking-tight text-white"
          >
            Verified client <span className="text-ember italic">growth proof</span>.
          </motion.h2>
        </div>
        
        {/* Fixed Rating Component */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="flex items-center gap-3 text-white/40 text-sm md:pb-2"
        >
          <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#ff5a2a] text-[#ff5a2a]" />
              ))}
            </div>
            <span className="text-[10px] font-mono tracking-wider uppercase text-white/60">5.0 Rating</span>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-white/30 font-mono">Avg. Client Rating</span>
        </motion.div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
            whileHover={{ y: -6 }}
            className="group relative p-8 rounded-2xl border border-white/[0.06] bg-[#090909]/80 backdrop-blur-sm hover:bg-[#0c0c0c] hover:border-white/10 transition-all duration-500 flex flex-col justify-between"
          >
            {/* Subtle light leak gradient inside card on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ff5a2a]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div>
              {/* Top result badge & Quote icon */}
              <div className="flex items-center justify-between mb-8">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center">
                  <Quote className="w-4 h-4 text-ember opacity-60 group-hover:rotate-12 transition-all duration-500" />
                </div>
                <span className="font-mono text-[10px] text-ember border border-ember/20 rounded-full px-3.5 py-1 bg-ember/[0.05] tracking-wider uppercase">
                  {t.result}
                </span>
              </div>

              {/* Quote */}
              <p className="text-white/70 leading-relaxed font-display text-lg md:text-xl group-hover:text-white transition-colors duration-300">
                "{t.quote}"
              </p>
            </div>

            {/* Author */}
            <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-display text-sm text-white flex-shrink-0 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #ff5a2a 0%, #3a1008 100%)" }}
              >
                <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-300" />
                <span className="relative z-10">{t.name.split(" ").map((n) => n[0]).join("")}</span>
              </div>
              <div>
                <div className="font-medium text-sm text-white group-hover:text-ember transition-colors duration-300">{t.name}</div>
                <div className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5 font-mono">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
