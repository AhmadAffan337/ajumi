"use client";

import { motion } from "framer-motion";
import { PhoneMissed, TrendingDown, Wallet } from "lucide-react";

const problems = [
  { icon: PhoneMissed, title: "You're missing calls", desc: "Customers ring, nobody answers, and they call your competitor instead." },
  { icon: TrendingDown, title: "Too few leads", desc: "Your website and listings aren't bringing in enough people who want to buy." },
  { icon: Wallet, title: "Ad spend with no clear result", desc: "You're paying for clicks and can't tell which ones turn into customers." },
];

export function Problems() {
  return (
    <section id="problems" className="relative py-20 md:py-24 px-8 md:px-14 max-w-[1500px] mx-auto">
      <div className="text-center max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          className="font-display text-[clamp(2.2rem,4.5vw,4.5rem)] leading-[1.05] tracking-tight"
        >
          Does this sound <span className="text-ember italic pr-[0.15em]">like you</span>?
        </motion.h2>
        <p className="mt-4 text-white/60">These are the three problems we fix most often.</p>
      </div>
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {problems.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="hover-card p-8 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20"
            >
              <Icon className="hover-icon w-6 h-6 text-ember mb-5" />
              <h3 className="font-display text-2xl text-white">{p.title}</h3>
              <p className="mt-3 text-white/60 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
