"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { EASE } from "@/lib/animations";
import { Search, Lightbulb, Rocket, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Technical Audit",
    description: "Exhaustive evaluation of technical SEO architecture, ad account history, how accurately your ads are tracked, and where competitors stand.",
    duration: "Week 1",
    features: [
      "Technical SEO Crawl",
      "Ad Tracking Accuracy Audit",
      "Competitor Keyword Gap",
      "Conversion Funnel Teardown"
    ],
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Topical & Media Architecture",
    description: "Building topical content maps, server-side tracking pipelines, and high-velocity ad creative testing roadmaps.",
    duration: "Week 2",
    features: [
      "Topical Content Silos",
      "Ad & Analytics Tracking Setup",
      "Media Budget Allocation",
      "Return & Cost-per-Customer Targets"
    ],
  },
  {
    number: "03",
    icon: Rocket,
    title: "Agile Launch & Creative Testing",
    description: "Deploying server-side paid campaigns, publishing intent-focused content pillars, and testing high-converting ad variations.",
    duration: "Week 3-4",
    features: [
      "Ad Creative Pod Launch",
      "Pillar Content Publishing",
      "Server-Side Tracking",
      "Rapid Ad Variant Testing"
    ],
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Attribution & Revenue Scale",
    description: "Ongoing page testing, clear revenue reporting, and putting more budget into what works into top-performing channels.",
    duration: "Ongoing",
    features: [
      "A/B Split Testing",
      "Live Revenue Dashboards",
      "Profitable Ad Scaling",
      "LTV Retention Automation"
    ],
  },
];

export function ProcessTimeline() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <section className="relative py-20 md:py-28 px-8 md:px-14 max-w-[1500px] mx-auto">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,90,42,0.04),transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE.premium }}
          >
            <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
              <span className="text-ember">(04)</span>
              <span className="h-px w-8 bg-white/20" />
              <span>How We Work</span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,5.5vw,6rem)] leading-[0.95] tracking-tight mb-6">
              Audit to <span className="text-ember italic">attribution</span> in 30 days.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Our proven 4-step execution framework takes every client from SEO and accurate ad tracking to clear revenue reporting and growth in the channels that pay off.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div ref={listRef} className="relative space-y-6 md:pl-10">
          {/* Scroll-filled progress line */}
          <div aria-hidden className="hidden md:block absolute left-0 top-0 bottom-0 w-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div className="w-full h-full bg-ember origin-top" style={{ scaleY: fill }} />
          </div>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: EASE.premium }}
              className="group relative"
            >
              <div className="relative grid md:grid-cols-12 gap-6 p-6 md:p-8 rounded-2xl border border-white/10 bg-black/20 hover:bg-black/30 hover:border-white/20 transition-all duration-500">
                {/* Timeline connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute left-[4.5rem] top-full w-[2px] h-6 bg-gradient-to-b from-white/20 to-transparent" />
                )}

                {/* Left side - Number & Icon */}
                <div className="md:col-span-3 flex items-start gap-4">
                  {/* Large number */}
                  <div className="font-display text-6xl md:text-7xl leading-none text-white/10 group-hover:text-ember/20 transition-colors duration-500">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-ember/10 group-hover:border-ember/30 transition-all duration-500">
                    <step.icon className="w-6 h-6 text-white/60 group-hover:text-ember transition-colors duration-500" />
                  </div>
                </div>

                {/* Middle - Content */}
                <div className="md:col-span-6">
                  <div className="mb-3">
                    <h3 className="font-display text-2xl md:text-3xl text-white mb-2 group-hover:text-ember transition-colors duration-500">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/40 uppercase tracking-widest">
                      {step.duration}
                    </p>
                  </div>
                  <p className="text-white/65 leading-relaxed mb-6">
                    {step.description}
                  </p>
                  
                  {/* Features list */}
                  <div className="grid grid-cols-2 gap-2">
                    {step.features.map((feature, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-sm text-white/50">
                        <div className="w-1 h-1 rounded-full bg-ember/60" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side - Visual element */}
                <div className="md:col-span-3 flex items-center justify-center">
                  <div className="relative w-24 h-24 rounded-full border-2 border-white/10 group-hover:border-ember/30 transition-all duration-500">
                    {/* Animated circle */}
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="44"
                        fill="none"
                        stroke="rgba(255,90,42,0.2)"
                        strokeWidth="2"
                        strokeDasharray="277"
                        strokeDashoffset={277 - (277 * (i + 1)) / steps.length}
                        className="group-hover:stroke-ember transition-all duration-700"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-display text-xl text-white/40 group-hover:text-ember transition-colors duration-500">
                      {Math.round(((i + 1) / steps.length) * 100)}%
                    </div>
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-ember/0 via-ember/5 to-ember/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 hover:border-ember/40 bg-white/5 hover:bg-ember/10 text-white hover:text-ember transition-all duration-500"
          >
            <span className="text-sm uppercase tracking-[0.25em]">Start Your Journey</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
