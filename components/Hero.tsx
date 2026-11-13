"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { CTAButton } from "./CTAButton";
import { GlowEffect } from "./GlowEffect";
import { EASE } from "@/lib/animations";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const enhancedFadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(3px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: EASE.premium } },
};

const stats = [
  { label: "Client Revenue Generated", value: "$42M+" },
  { label: "Avg. Revenue per Ad Dollar", value: "4.8×" },
  { label: "Organic Search Lift", value: "+310%" },
];

const lineReveal: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: 0,
    transition: { duration: 1, ease: EASE.premium, delay: 0.2 + i * 0.13 },
  }),
};

export function Hero() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0vh", reduce ? "0vh" : "30vh"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.75]);

  const handleStartProject = () => {
    router.push('/contact');
  };

  const handleSeeWork = () => {
    router.push('/work');
  };

  return (
    <section ref={sectionRef} className="relative w-full min-h-[95vh] overflow-hidden flex flex-col p-8">
      <GlowEffect />

      {/* Subtle grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: "radial-gradient(ellipse at 50% 100%, transparent 45%, rgba(0,0,0,0.95) 100%)" }}
      />

      {/* Top fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 right-0 h-24 z-10"
        style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.6), transparent)" }}
      />

      {/* Enhanced amber glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 rounded-full"
        style={{
          width: 800,
          height: 800,
          top: "5%",
          right: "-15%",
          background: "radial-gradient(circle, rgba(255,90,42,0.12) 0%, rgba(255,90,42,0.04) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Scroll-darkening overlay */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-10 bg-black" style={{ opacity: overlayOpacity }} />

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-20 flex-1 flex flex-col justify-center items-center text-center px-8 md:px-14 max-w-[1500px] mx-auto w-full pt-24 pb-32"
      >
        {/* Eyebrow */}
        <motion.div
          variants={enhancedFadeUp}
          className="flex items-center justify-center gap-3 mb-6 text-[11px] uppercase tracking-[0.35em] text-white/50 font-medium"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-ember animate-pulse flex-shrink-0" />
          Based in New York · Serving Businesses Across the US
        </motion.div>

        {/* Heading */}
        <h1 className="font-display leading-[0.9] tracking-tight text-[clamp(3rem,7.5vw,8.5rem)] font-normal mb-6 max-w-5xl">
          <span className="block overflow-hidden pb-[0.2em] -mb-[0.1em]">
            <motion.span variants={lineReveal} custom={0} className="block">
              Missing calls?
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.2em] -mb-[0.1em]">
            <motion.span variants={lineReveal} custom={1} className="block">
              Get more <span className="text-ember italic">customers</span>.
            </motion.span>
          </span>
        </h1>

        {/* Sub */}
        <motion.p
          variants={enhancedFadeUp}
          className="max-w-3xl mx-auto text-white/75 text-lg md:text-xl leading-relaxed mb-8 font-light"
        >
          We help US businesses get more calls, more leads and less wasted ad spend.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={enhancedFadeUp} className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <CTAButton onClick={handleStartProject}>Book a Free Call</CTAButton>
          <CTAButton variant="ghost" onClick={handleSeeWork}>See Our Work</CTAButton>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={enhancedFadeUp}
          className="absolute bottom-8 left-8 md:left-14 right-8 md:right-14 flex flex-wrap items-end justify-between gap-6"
        >
          <div className="flex flex-col gap-1.5 text-xs uppercase tracking-[0.3em] text-white/40">
            <div className="scroll-cue-line mb-2" aria-hidden />
            <span className="text-white/30 text-[10px]">scroll</span>
            <span className="text-white/70 font-medium">to explore</span>
          </div>

          <div className="flex gap-10 sm:gap-14">
            {stats.map((s) => (
              <div key={s.label} className="text-right">
                <div className="text-[9px] uppercase tracking-[0.4em] text-white/35 mb-1">{s.label}</div>
                <div className="font-display text-lg md:text-xl text-white">{s.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
