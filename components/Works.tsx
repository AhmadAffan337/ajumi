"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const works = [
  {
    num: "01",
    title: "Handify",
    sub: "Home Services · DTC Campaign",
    desc: "Challenge: Stagnant local lead volume. Intervention: Technical SEO & multi-channel Meta/Google performance media. Result: 3.2× qualified booking growth in 90 days.",
    tags: ["Paid Media", "Technical SEO", "Conversion CRO"],
    image: "/home%20page%20images/home_services_dtc_compaign.avif",
    stat: "3.2×",
    statLabel: "Booking Growth",
    year: "2025",
    size: "big",      // spans 7 cols, tall
  },
  {
    num: "02",
    title: "Glim",
    sub: "Mobile App · Growth Sprint",
    desc: "Challenge: High App Store acquisition costs. Intervention: Creator whitelisting & TikTok Spark Ads sprint. Result: 180,000 viral app installs at 42% lower CPI.",
    tags: ["Creator Ads", "TikTok Growth", "Short-Form Video"],
    image: "/home%20page%20images/mobile_app_growth_sprint.avif",
    stat: "180k",
    statLabel: "Installs",
    year: "2025",
    size: "medium",   // spans 5 cols, tall
  },
  {
    num: "03",
    title: "Noctura",
    sub: "E-Commerce · Brand",
    desc: "Challenge: Low customer lifetime value. Intervention: Modern brand system relaunch & editorial content engine. Result: +240% YoY e-commerce revenue growth.",
    tags: ["Brand System", "Editorial Content", "DTC Revenue"],
    image: "/home%20page%20images/ecommerce_brand.webp",
    stat: "+240%",
    statLabel: "Revenue",
    year: "2026",
    size: "small",
  },
  {
    num: "04",
    title: "Velox SaaS",
    sub: "B2B · Lead Generation",
    desc: "Challenge: Too much spent to win each customer. What we did: Targeted the right companies directly and set up more accurate ad tracking. Result: 38% lower cost per customer and twice as many leads.",
    tags: ["B2B SaaS", "Targeted Outreach", "Accurate Ad Tracking"],
    image: "/home%20page%20images/b2b_lead_generation.avif",
    stat: "−38%",
    statLabel: "Lower Cost per Customer",
    year: "2025",
    size: "small",
  },
  {
    num: "05",
    title: "Aura Beauty",
    sub: "DTC · Email & Retention",
    desc: "Challenge: High one-time customer churn. Intervention: Automated Klaviyo lifecycle CRM & SMS sequences. Result: Repeat purchase rate increased from 18% to 41%.",
    tags: ["Klaviyo CRM", "Customer Retention", "LTV Scaling"],
    image: "/home%20page%20images/dtc_email_retention.avif",
    stat: "41%",
    statLabel: "Repeat Purchase",
    year: "2026",
    size: "small",
  },
];

function WorkCard({
  w,
  i,
  className = "",
  imgHeight = "h-[220px]",
  showDesc = true,
  titleSize = "text-2xl md:text-3xl",
}: {
  w: typeof works[0];
  i: number;
  className?: string;
  imgHeight?: string;
  showDesc?: boolean;
  titleSize?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
      className={`group relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0a0a0a] cursor-pointer flex flex-col ${className}`}
    >
      {/* Image Container with Padding */}
      <div className={`relative overflow-hidden flex-shrink-0 bg-[#0e0e0e] p-5 ${imgHeight} flex items-center justify-center`}>
        {/* Subtle grid pattern inside frame */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* The actual image framed */}
        <div className="relative w-full h-full overflow-hidden rounded-lg border border-white/10 shadow-2xl bg-black">
          <img
            src={w.image}
            alt={w.title}
            className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
          />
        </div>

        {/* Year tag */}
        <div className="absolute top-8 left-8">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/55 bg-black/75 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-full shadow-md">
            {w.year}
          </span>
        </div>

        {/* Arrow reveal on hover */}
        <div className="absolute top-8 right-8 w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-400 shadow-md">
          <ArrowUpRight className="w-3.5 h-3.5 text-black" />
        </div>

        {/* Ghost number */}
        <div className="absolute bottom-6 right-8 font-display text-5xl leading-none text-white/5 select-none pointer-events-none">
          {w.num}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {w.tags.map((t) => (
            <span key={t} className="text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border border-white/10 text-white/40">
              {t}
            </span>
          ))}
        </div>

        <h3 className={`font-display leading-tight tracking-tight group-hover:text-ember transition-colors duration-400 ${titleSize}`}>
          {w.title}
        </h3>
        <p className="text-white/30 text-[11px] mt-0.5 tracking-wide">{w.sub}</p>

        {showDesc && (
          <p className="mt-3 text-white/50 text-sm leading-relaxed line-clamp-2 flex-1">{w.desc}</p>
        )}

        {/* Stat */}
        <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-4">
          <div>
            <div className="font-display text-xl md:text-2xl text-ember leading-none">{w.stat}</div>
            <div className="text-[8px] uppercase tracking-widest text-white/30 mt-0.5">{w.statLabel}</div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-ember transition-colors duration-300" />
        </div>
      </div>
    </motion.article>
  );
}

export function Works() {
  const [big, medium, ...smalls] = works;

  return (
    <section id="works" className="relative py-20 md:py-24 px-8 md:px-14 max-w-[1500px] mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-6 mb-16">
        <div className="flex items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50 mb-2">
          <span className="text-ember">(03)</span>
          <span className="h-px w-8 bg-white/20" />
          <span>Our Work</span>
          <span className="h-px w-8 bg-white/20" />
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          className="font-display text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.0] tracking-tight text-white"
        >
          Selected <span className="text-ember italic">case studies</span> & growth results.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-white/60 max-w-2xl text-base leading-relaxed font-light"
        >
          Explore how our technical search campaigns, paid media scaling, and CRO frameworks generate compounding revenue.
        </motion.p>
      </div>

      {/* Row 1: Big + Medium */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <WorkCard
          w={big}
          i={0}
          imgHeight="h-[360px]"
          titleSize="text-3xl md:text-4xl"
          showDesc={true}
        />
        <WorkCard
          w={medium}
          i={1}
          imgHeight="h-[360px]"
          titleSize="text-3xl md:text-4xl"
          showDesc={true}
        />
      </div>

      {/* Row 2: 3 Small cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {smalls.map((w, i) => (
          <WorkCard
            key={w.num}
            w={w}
            i={i + 2}
            imgHeight="h-[220px]"
            titleSize="text-xl md:text-2xl"
            showDesc={false}
          />
        ))}
      </div>

      {/* See More CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-12 flex justify-center"
      >
        <Link
          href="/work"
          className="group inline-flex items-center gap-4 border border-white/15 hover:border-ember/40 rounded-full px-8 py-4 transition-all duration-500 hover:bg-ember/[0.04]"
        >
          <span className="font-display text-lg md:text-xl tracking-tight group-hover:text-ember transition-colors duration-300 text-white">
            See all case studies
          </span>
          <span className="w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:bg-ember group-hover:border-ember flex items-center justify-center transition-all duration-400">
            <ArrowUpRight className="w-4 h-4 group-hover:text-black transition-colors duration-300 text-white" />
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
