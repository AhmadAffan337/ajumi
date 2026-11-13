"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { blogPosts as posts } from "@/lib/blog-posts";


export function BlogGrid() {
  return (
    <section className="px-8 md:px-14 max-w-[1500px] mx-auto pb-32">
      <div className="grid md:grid-cols-3 gap-x-6 gap-y-16">
        {posts.map((p, i) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group block"
          >
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/10"
            >
              {/* Blog Image */}
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute top-6 left-6 px-3 py-1 rounded-full border border-white/25 bg-black/40 backdrop-blur text-xs uppercase tracking-widest text-white/80">
                {p.category}
              </div>
              <div className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>
            <div className="mt-6 text-xs uppercase tracking-widest text-white/40">{p.date}</div>
            <h3 className="mt-3 font-display text-2xl leading-snug group-hover:text-ember transition-colors">{p.title}</h3>
            <p className="mt-2 text-white/55 text-sm leading-relaxed">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
