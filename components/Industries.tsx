"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/lib/industries";

export function Industries() {
  return (
    <section id="industries" className="relative py-20 md:py-24 px-8 md:px-14 max-w-[1500px] mx-auto">
      <div className="text-center max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          className="font-display text-[clamp(2.2rem,4.5vw,4.5rem)] leading-[1.05] tracking-tight"
        >
          Built for <span className="text-ember italic">your industry</span>.
        </motion.h2>
        <p className="mt-4 text-white/60">Pick your business to see how we help.</p>
      </div>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {industries.map((i, idx) => (
          <motion.div
            key={i.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.08 }}
          >
            <Link
              href={`/industries/${i.slug}`}
              className="hover-card group flex h-full flex-col justify-between p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-ember/50"
            >
              <h3 className="font-display text-xl text-white group-hover:text-ember transition-colors">{i.name}</h3>
              <p className="mt-3 text-white/55 text-sm leading-relaxed">{i.headline}</p>
              <ArrowUpRight className="mt-5 w-4 h-4 text-ember" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
