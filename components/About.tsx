"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, animate } from "framer-motion";
import { Target, Eye, MessageSquareText, Handshake } from "lucide-react";
import { industries } from "@/lib/industries";

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
      <span className="text-ember">({index})</span>
      <span className="h-px w-8 bg-white/20" />
      <span>{title}</span>
    </div>
  );
}

function AnimatedCounter({
  to,
  decimals = 0,
  suffix,
}: {
  to: number;
  decimals?: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isMountedRef = useRef(true);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        if (isMountedRef.current) {
          setDisplayed(decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString());
        }
      },
    });
    return () => controls.stop();
  }, [isInView, to, decimals]);

  return (
    <span ref={ref}>
      {displayed}
      <span className="text-ember">{suffix}</span>
    </span>
  );
}

const values = [
  { icon: Target, title: "Results first", desc: "We measure our work by the calls, leads and customers you get, not by clicks and impressions." },
  { icon: Eye, title: "Straight talk", desc: "Plain-English reports and honest advice, including when something isn't working and what we'll change." },
  { icon: MessageSquareText, title: "Always reachable", desc: "You have a real person to call or text, not a ticket queue. Quick answers keep campaigns moving." },
  { icon: Handshake, title: "Partners, not vendors", desc: "We learn your business, your customers and your goals, and we plan around them." },
];

const approach = [
  { n: "01", t: "We listen first", d: "We start by understanding your business, your customers and where leads are slipping away." },
  { n: "02", t: "We build the plan", d: "You get a clear plan with priorities, timelines and costs before any work begins." },
  { n: "03", t: "We do the work", d: "SEO, ads, social, websites and AI automation, handled by one team that works together." },
  { n: "04", t: "We report and improve", d: "Every month you see what worked, what didn't and what we're doing next." },
];

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-24 px-8 md:px-14 max-w-[1500px] mx-auto">
      <div className="flex items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
        <span className="text-ember">(01)</span>
        <span className="h-px w-8 bg-white/20" />
        <span>About Us</span>
        <span className="h-px w-8 bg-white/20" />
      </div>
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.98] tracking-tight"
        >
          Engineering AI-Powered <span className="text-ember italic">Digital Growth</span> for US Businesses 
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white/75 text-base md:text-lg leading-relaxed font-light max-w-3xl"
        >
          Ajumi AI is a digital marketing company based in New York, serving businesses all over the US. We combine artificial intelligence, automation, marketing, and technology to help businesses compete in an increasingly digital market. We build growth systems around search visibility, paid acquisition, customer engagement, and operational efficiency. <br/>
From technical SEO and local search to AI agents, CRM automation, paid media, and custom websites, our approach connects marketing performance with real business outcomes. Every strategy is designed to attract the right audience, convert more opportunities, improve efficiency, and create sustainable growth.

        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-20 border-t border-white/10 pt-14">
        {[
          { to: 120, decimals: 0, suffix: "+", label: "Brands scaled across DTC e-commerce, B2B SaaS, and lifestyle verticals.", delay: 0 },
          { to: 340, decimals: 0, suffix: "+", label: "Campaigns delivered, each tracked from first click to sale.", delay: 0.15 },
          { to: 4.8, decimals: 1, suffix: "×", label: "Average revenue for every ad dollar across active Meta and Google Ads accounts.", delay: 0.3 },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: s.delay }}
            className="flex gap-6 items-start"
          >
            <div className="font-display text-6xl md:text-7xl leading-none tabular-nums">
              <AnimatedCounter to={s.to} decimals={s.decimals} suffix={s.suffix} />
            </div>
            <p className="text-white/50 max-w-xs pt-3 text-sm">{s.label}</p>
          </motion.div>
        ))}
      </div>
      {/* Mission */}
      <div className="grid md:grid-cols-12 gap-10 mt-24 border-t border-white/10 pt-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="md:col-span-5"
        >
          <SectionLabel index="02" title="Our Mission" />
          <h3 className="font-display text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.05] tracking-tight">
            Make great marketing <span className="text-ember italic">simple</span> for busy business owners.
          </h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="md:col-span-7 space-y-5 text-white/65 leading-relaxed"
        >
          <p>
            Most business owners don&apos;t have time to learn search engines, ad platforms and new technology. They
            just want the phone to ring, the calendar to fill and the money they spend on marketing to pay off.
          </p>
          <p>
            That&apos;s what we do. We&apos;re based in New York and work with businesses all over the US. We combine
            proven marketing with AI and automation, so fewer calls are missed, fewer leads fall through and more of
            your ad budget turns into customers.
          </p>
          <p>
            Because everything runs through one team, your SEO, ads, website and follow-up work together instead of
            pulling in different directions.
          </p>
        </motion.div>
      </div>

      {/* Values */}
      <div className="mt-24">
        <SectionLabel index="03" title="What We Stand For" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="hover-card p-8 rounded-xl border border-white/10 bg-white/[0.02]"
              >
                <Icon className="hover-icon w-6 h-6 text-ember mb-5" />
                <h4 className="font-display text-2xl text-white">{v.title}</h4>
                <p className="mt-3 text-white/60 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* How we work with you */}
      <div className="mt-24">
        <SectionLabel index="04" title="How We Work With You" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {approach.map((a, i) => (
            <motion.div
              key={a.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="border-t border-white/15 pt-6"
            >
              <div className="font-display text-5xl text-white/15">{a.n}</div>
              <h4 className="mt-3 font-display text-xl text-white">{a.t}</h4>
              <p className="mt-2 text-white/60 text-sm leading-relaxed">{a.d}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Who we work with */}
      <div className="mt-24 p-8 md:p-12 rounded-2xl border border-white/10 bg-white/[0.02] text-center">
        <h3 className="font-display text-[clamp(1.8rem,3vw,3rem)] leading-tight tracking-tight">
          Who we <span className="text-ember italic">work with</span>
        </h3>
        <p className="mt-4 text-white/60 max-w-2xl mx-auto">
          Local and growing businesses that want more customers, including restaurants, clinics, law firms,
          contractors and real estate teams.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {industries.map((i) => (
            <Link
              key={i.slug}
              href={`/industries/${i.slug}`}
              className="px-5 py-2.5 rounded-full border border-white/15 text-sm text-white/75 hover:border-ember/50 hover:text-ember transition-colors"
            >
              {i.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

