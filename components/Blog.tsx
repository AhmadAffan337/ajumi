"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";

export function Blog() {
  return (
    <section id="blog" className="relative py-20 md:py-24 px-8 md:px-14 max-w-[1500px] mx-auto">
      <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
        <span className="text-ember">(08)</span>
        <span className="h-px w-8 bg-white/20" />
        <span>Journal</span>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[1.02] tracking-tight"
        >
          Latest <span className="text-ember italic">journal</span>.
        </motion.h2>
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-white/70 hover:text-ember transition-colors">
          More articles <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-8">
        {blogPosts.slice(0, 3).map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.1 }}
          >
            <Link href={`/blog/${p.slug}`} className="group block">
              <motion.div
                whileHover="hover"
                initial="initial"
                className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/10"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.div>
              <div className="mt-6 text-xs uppercase tracking-widest text-white/40">{p.date}</div>
              <h3 className="mt-3 font-display text-2xl leading-snug group-hover:text-ember transition-colors">{p.title}</h3>
              <p className="mt-2 text-white/55 text-sm leading-relaxed">{p.excerpt}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
