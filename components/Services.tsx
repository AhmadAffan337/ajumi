"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    slug: "new-york-seo-services",
    n: "01",
    t: "SEO & Local SEO",
    d: "Improve visibility across Google and AI search with local SEO, content and AI-search optimization, helping your business show up on Google and in AI answers and bring in people ready to buy.",
    tags: ["Local SEO", "Google Rankings", "AI Search Visibility", "Content"],
  },
  {
    slug: "new-york-social-media-services",
    n: "02",
    t: "Social Media Marketing",
    d: "Build your social presence with short-form content, creator campaigns, and platform-specific strategies that increase engagement, strengthen your brand, and drive measurable growth.",
    tags: ["Social Strategy","Short-Form Video", "Creator Marketing","Community"],
  },
  {
    slug: "new-york-paid-ads-services",
    n: "03",
    t: "Paid Advertising",
    d: "Drive qualified traffic and leads with Google and Meta Ads, with ad testing, accurate tracking and budget control, so you get more from every ad dollar and waste less.",
    tags: ["Google Ads", "Meta Ads","Performance Marketing","Conversion Tracking"],
  },
  {
    slug: "new-york-ai-automation-services",
    n: "04",
    t: "AI Busniess Automation",
    d: "Automate repetitive workflows with AI systems that connect your tools and teams, reduce manual work, improve productivity, and streamline business operations.",
    tags: ["AI Agents", "Workflow Automation", " AI Integrations","Process Optimization"],
  },
    {
    slug: "new-york-website-development-services",
    n: "05",
    t: "Website Development Services",
    d: "Build high-performance websites optimized for search, speed, user experience, and conversions, designed to attract more customers and support long-term business growth.",
    tags: ["Custom Web Development", "Responsive Experiences","Conversion Optimization"],
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Services() {
  return (
    <section id="services" className="relative py-20 md:py-24 px-8 md:px-14 max-w-[1500px] mx-auto">
      {/* Header row */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-6 mb-16">
        <div className="flex items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50 mb-2">
          <span className="text-ember">(02)</span>
          <span className="h-px w-8 bg-white/20" />
          <span>Our Services</span>
          <span className="h-px w-8 bg-white/20" />
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE }}
          className="font-display text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.0] tracking-tight"
        >
          Technical search, paid media, and{" "}
          <span className="text-ember italic">conversion systems</span>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-white/60 text-base leading-relaxed max-w-2xl font-light"
        >
         Ajumi AI brings marketing, technology, and automation together under one growth strategy. As a full-service digital marketing agency, we help US businesses increase visibility, generate qualified leads, improve customer experiences, and automate repetitive operations.
        </motion.p>
      </div>

      {/* Service rows */}
      <div className="border-t border-white/[0.08]">
        {services.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.75, delay: i * 0.07, ease: EASE }}
          >
            <Link
              href={`/services/${s.slug}`}
              className="group flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-4 sm:gap-6 py-8 md:py-10 border-b border-white/[0.08] hover:bg-white/[0.015] transition-colors duration-300 rounded-sm px-2"
            >
              {/* Number */}
              <div className="sm:col-span-1 text-xs text-white/30 tracking-widest font-mono">{s.n}</div>

              {/* Title */}
              <div className="sm:col-span-4 font-display text-2xl sm:text-3xl md:text-4xl tracking-tight group-hover:text-ember transition-colors duration-400">
                {s.t}
              </div>

              {/* Tags */}
              <div className="sm:col-span-3 flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-white/10 text-white/35">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Desc */}
              <div className="sm:col-span-3 text-white/50 text-sm leading-relaxed">{s.d}</div>

              {/* Arrow */}
              <div className="sm:col-span-1 flex sm:justify-end">
                <span className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:bg-ember group-hover:border-ember group-hover:text-black transition-all duration-400 flex-shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-12 flex justify-center"
      >
        <Link
          href="/services"
          className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-white/50 hover:text-ember transition-colors duration-300"
        >
          Explore all services
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </Link>
      </motion.div>
    </section>
  );
}
