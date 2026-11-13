"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, ArrowUpRight, HelpCircle, Award, Target, Layers, Stethoscope, Scale, DollarSign, Building2, HardHat, Factory, Truck, ShoppingBag, Briefcase, GraduationCap, UtensilsCrossed, Megaphone, Code2, Wrench, Heart, MapPin } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";

type ServiceDetail = {
  title: string;
  eyebrow: string;
  intro: string;
  overviewHeading?: string;
  overviewText?: string;
  what: string[];
  process: { n: string; t: string; d: string }[];
  deliverables?: { title: string; desc: string }[];
  kpis?: { value: string; label: string }[];
  caseStudy?: { title: string; metric: string; desc: string };
  faqs?: { q: string; a: string }[];
  techStack?: { name: string; category: string }[];
  strategicApproach?: { title: string; desc: string }[];
  comparisonTable?: { feature: string; us: string; traditional: string }[];
  teamExpertise?: { role: string; bio: string; experience: string }[];
  tiers?: { name: string; price: string; desc: string; features: string[]; highlight?: boolean }[];
  guarantees?: { title: string; desc: string }[];
  industries?: string[];
  locations?: string[];
  image?: string;
  tone: string;
};

interface ServiceContentProps {
  detail: ServiceDetail;
  others: string[];
  allDetails: Record<string, ServiceDetail>;
}

export function ServiceContent({ detail, others, allDetails }: ServiceContentProps) {
  const router = useRouter();

  const handleStartProject = () => {
    router.push('/contact');
  };

  return (
    <>
      {/* Overview & Key Features Section */}
      <section className="px-8 md:px-14 max-w-[1500px] mx-auto pb-24 grid md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {detail.overviewHeading && (
            <h3 className="font-display text-3xl md:text-4xl text-white mb-6 leading-tight">
              {detail.overviewHeading}
            </h3>
          )}
          {detail.overviewText && (
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              {detail.overviewText}
            </p>
          )}

          <div className="text-xs uppercase tracking-[0.25em] text-ember font-semibold mb-6 flex items-center gap-2">
            <Target className="w-4 h-4" /> Strategic Scope & Capabilities
          </div>
          <ul className="space-y-4 mb-10">
            {detail.what.map((w) => (
              <li key={w} className="flex items-start gap-3 text-white/85 text-base md:text-md">
                <Check className="w-5 h-5 text-ember mt-1 flex-shrink-0" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
          <div>
            <CTAButton onClick={handleStartProject}>Start a project</CTAButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <div
            className="relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group"
            style={{ background: detail.tone }}
          >
            {detail.image ? (
              <img
                src={detail.image}
                alt={detail.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                <span className="font-display text-[8rem] md:text-[12rem] leading-none opacity-15 select-none">
                  {detail.eyebrow.split(" · ")[0]}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 z-20">
              <div className="text-xs uppercase tracking-widest text-ember font-semibold">Service Focus</div>
              <div className="text-xl font-display text-white mt-1">{detail.title}</div>
            </div>
          </div>

          {/* Case Study Feature Highlight */}
          {detail.caseStudy && (
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden group hover:border-ember/40 transition-colors">
              <div className="flex items-center gap-2 text-ember text-xs uppercase tracking-widest font-semibold mb-3">
                <Award className="w-4 h-4" /> Proven Impact Benchmark
              </div>
              <div className="text-3xl md:text-4xl font-display text-white font-bold mb-2">
                {detail.caseStudy.metric}
              </div>
              <h4 className="text-lg font-semibold text-white/90 mb-2">{detail.caseStudy.title}</h4>
              <p className="text-white/60 text-sm leading-relaxed">{detail.caseStudy.desc}</p>
            </div>
          )}
        </motion.div>
      </section>

      {/* KPI Performance Metrics */}
      {detail.kpis && detail.kpis.length > 0 && (
        <section className="px-8 md:px-14 max-w-[1500px] mx-auto pb-24">
          <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {detail.kpis.map((kpi, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-center md:text-left"
              >
                <div className="font-display text-3xl md:text-5xl font-bold text-ember">{kpi.value}</div>
                <div className="text-white/60 text-xs md:text-sm mt-2 leading-snug">{kpi.label}</div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Strategic Approach Deep-Dive Section */}
      {detail.strategicApproach && detail.strategicApproach.length > 0 && (
        <section className="px-8 md:px-14 max-w-[1500px] mx-auto pb-32">
          <div className="text-xs uppercase tracking-[0.25em] text-white/50 mb-4">Why Choose Us</div>
          <h3 className="font-display text-3xl md:text-5xl mb-12 text-white">
            {detail.strategicApproach.length > 3
              ? "Why US Businesses Choose Our Services"
              : "Our Strategic Approach"}
          </h3>
          <div className={`grid gap-8 ${detail.strategicApproach.length > 3 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
            {detail.strategicApproach.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 relative hover:border-ember/30 transition-colors"
              >
                <div className="text-ember font-mono text-xs uppercase tracking-widest mb-4">0{idx + 1}</div>
                <h4 className="font-display text-2xl text-white mb-4">{pillar.title}</h4>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Core Deliverables Breakdown */}
      {detail.deliverables && detail.deliverables.length > 0 && (
        <section className="px-8 md:px-14 max-w-[1500px] mx-auto pb-32">
          <div className="text-xs uppercase tracking-[0.25em] text-white/50 mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-ember" /> Key Deliverables & Artifacts
          </div>
          <h3 className="font-display text-3xl md:text-5xl mb-12 text-white">What We Build For You</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {detail.deliverables.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="p-8 rounded-xl bg-white/[0.02] border border-white/10 hover:border-ember/30 transition-all"
              >
                <div className="text-ember font-display text-xl mb-3 font-semibold">0{idx + 1}. {item.title}</div>
                <p className="text-white/65 text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Technologies & Tools Stack Grid */}
      {detail.techStack && detail.techStack.length > 0 && (
        <section className="px-8 md:px-14 max-w-[1500px] mx-auto pb-32">
          <div className="text-xs uppercase tracking-[0.25em] text-white/50 mb-4">Tooling Ecosystem</div>
          <h3 className="font-display text-3xl md:text-5xl mb-12 text-white">Platforms & Technologies We Utilize</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {detail.techStack.map((tech, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/10 text-center hover:border-ember/40 transition-colors"
              >
                <div className="text-white font-semibold text-base">{tech.name}</div>
                <div className="text-white/40 text-xs mt-1 uppercase tracking-wider">{tech.category}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Comparative Analysis: Us vs Traditional Agencies */}
      {detail.comparisonTable && detail.comparisonTable.length > 0 && (
        <section className="px-8 md:px-14 max-w-[1500px] mx-auto pb-32">
          <div className="text-xs uppercase tracking-[0.25em] text-white/50 mb-4">The Differentiator</div>
          <h3 className="font-display text-3xl md:text-5xl mb-12 text-white">Ajumi AI vs. Legacy Agencies</h3>
          <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.01]">
            <div className="grid grid-cols-3 p-6 bg-white/[0.04] border-b border-white/10 font-display text-lg font-bold text-white">
              <div>Strategic Vector</div>
              <div className="text-ember">Ajumi AI Framework</div>
              <div className="text-white/40">Traditional Agencies</div>
            </div>
            {detail.comparisonTable.map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 p-6 border-b border-white/5 items-center text-sm md:text-base">
                <div className="font-semibold text-white/90">{row.feature}</div>
                <div className="text-white font-medium flex items-center gap-2">
                  <Check className="w-4 h-4 text-ember flex-shrink-0" />
                  <span>{row.us}</span>
                </div>
                <div className="text-white/40">{row.traditional}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Dedicated Team Specialists Pod */}
      {detail.teamExpertise && detail.teamExpertise.length > 0 && (
        <section className="px-8 md:px-14 max-w-[1500px] mx-auto pb-32">
          <div className="text-xs uppercase tracking-[0.25em] text-white/50 mb-4">Domain Leadership</div>
          <h3 className="font-display text-3xl md:text-5xl mb-12 text-white">Your Dedicated Execution Pod</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {detail.teamExpertise.map((member, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="text-xs uppercase tracking-widest text-ember font-mono font-semibold mb-2">{member.experience} Experience</div>
                <h4 className="font-display text-2xl text-white mb-3">{member.role}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Execution Methodology & Process */}
      <section className="px-8 md:px-14 max-w-[1500px] mx-auto pb-32">
        <div className="text-xs uppercase tracking-[0.25em] text-white/50 mb-4">Methodology</div>
        <h3 className="font-display text-3xl md:text-5xl mb-12 text-white">How We Execute</h3>
        <div className="grid md:grid-cols-4 gap-8">
          {detail.process.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="border-t border-white/10 pt-6 group hover:border-ember transition-colors"
            >
              <div className="text-ember text-sm tracking-widest font-mono font-bold">{p.n}</div>
              <h4 className="font-display text-2xl mt-3 text-white group-hover:text-ember transition-colors">{p.t}</h4>
              <p className="text-white/55 mt-3 text-sm leading-relaxed">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Service Tiers & Engagement Models */}
      {detail.tiers && detail.tiers.length > 0 && (
        <section className="px-8 md:px-14 max-w-[1500px] mx-auto pb-32">
          <div className="text-xs uppercase tracking-[0.25em] text-white/50 mb-4 flex items-center gap-2">
            <Check className="w-4 h-4 text-ember" /> Service Investment Tiers
          </div>
          <h3 className="font-display text-3xl md:text-5xl mb-4 text-white">Select Your Engagement Level</h3>
          <p className="text-white/60 text-lg mb-12 max-w-2xl">Flexible scope options tailored for growing startups, scaling mid-market brands, and enterprise clients.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {detail.tiers.map((tier, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`p-8 rounded-2xl border relative flex flex-col justify-between ${
                  tier.highlight
                    ? "bg-white/[0.04] border-ember shadow-2xl shadow-ember/10"
                    : "bg-white/[0.02] border-white/10"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3.5 left-8 px-4 py-1 rounded-full bg-ember text-black text-xs font-bold uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/50 mb-2">{tier.name}</div>
                  <div className="font-display text-3xl font-bold text-white mb-3">{tier.price}</div>
                  <p className="text-white/60 text-sm mb-6 leading-relaxed">{tier.desc}</p>
                  <div className="border-t border-white/10 pt-6 mb-8">
                    <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">Included Scope:</div>
                    <ul className="space-y-3">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="text-sm text-white/80 flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-ember flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button
                  onClick={handleStartProject}
                  className={`w-full py-3.5 rounded-full font-medium text-sm transition-all duration-300 ${
                    tier.highlight
                      ? "bg-ember text-black hover:bg-ember/90 shadow-lg"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Choose {tier.name}
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* SLA & Partnership Guarantees */}
      {detail.guarantees && detail.guarantees.length > 0 && (
        <section className="px-8 md:px-14 max-w-[1500px] mx-auto pb-32">
          <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-ember/10 via-white/[0.03] to-transparent border border-ember/30 grid md:grid-cols-3 gap-8">
            {detail.guarantees.map((guarantee, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-ember font-display text-2xl font-semibold">{guarantee.title}</div>
                <p className="text-white/65 text-sm leading-relaxed">{guarantee.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Industries We Serve */}
      {detail.industries && detail.industries.length > 0 && (
        <section className="px-8 md:px-14 max-w-[1500px] mx-auto pb-32">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ember font-semibold mb-4">
                <Briefcase className="w-4 h-4" /> Industries We Serve
              </div>
              <h3 className="font-display text-3xl md:text-5xl text-white leading-tight">
                Industries We Automate<br className="hidden md:block" /> Across the US
              </h3>
            </div>
            <p className="text-white/45 text-sm max-w-xs leading-relaxed md:text-right">
              Tailored AI automation for every sector that runs on workflows, data, and scale.
            </p>
          </div>

          {/* Two-column list — editorial style */}
          <div className="grid md:grid-cols-3 gap-0 border border-white/[0.08] rounded-2xl overflow-hidden">
            {detail.industries.map((industry, idx) => {
              const icons = [
                Stethoscope, Scale, DollarSign, Building2, HardHat,
                Factory, Truck, ShoppingBag, Briefcase, GraduationCap,
                UtensilsCrossed, Megaphone, Code2, Wrench, Heart,
              ];
              const Icon = icons[idx % icons.length];
              const isLastRow =
                idx >= detail.industries!.length - (detail.industries!.length % 3 === 0 ? 3 : detail.industries!.length % 3);
              const col = idx % 3;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: col === 0 ? -16 : col === 2 ? 16 : 0 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.03 }}
                  className={[
                    "group flex items-center gap-5 px-7 py-5 bg-white/[0.01] hover:bg-white/[0.04] transition-all duration-300 cursor-default",
                    col < 2 ? "md:border-r border-white/[0.08]" : "",
                    !isLastRow ? "border-b border-white/[0.08]" : "",
                  ].join(" ")}
                >
                  {/* Index number */}
                  <span className="font-mono text-xs text-white/20 group-hover:text-ember/60 transition-colors duration-300 w-6 flex-shrink-0 text-right">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Divider line */}
                  <div className="w-px h-8 bg-white/[0.08] group-hover:bg-ember/30 transition-colors duration-300 flex-shrink-0" />

                  {/* Icon */}
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:border-ember/40 group-hover:bg-ember/[0.08] transition-all duration-300">
                    <Icon className="w-4 h-4 text-white/35 group-hover:text-ember transition-colors duration-300" />
                  </div>

                  {/* Label */}
                  <span className="text-white/65 text-sm font-medium leading-snug group-hover:text-white transition-colors duration-300 flex-1">
                    {industry}
                  </span>

                  {/* Arrow on hover */}
                  <ArrowUpRight className="w-3.5 h-3.5 text-ember/0 group-hover:text-ember/60 transition-all duration-300 flex-shrink-0 -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100" />
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* Locations We Serve */}
      {detail.locations && detail.locations.length > 0 && (
        <section className="px-8 md:px-14 max-w-[1500px] mx-auto pb-32 overflow-hidden">
          <div className="relative rounded-3xl border border-white/[0.08] overflow-hidden">

            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.025] via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-ember/[0.04] blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-ember/[0.03] blur-[80px] pointer-events-none translate-x-1/3 translate-y-1/3" />

            {/* Large decorative "NY" watermark */}
            <div className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden">
              <span className="font-display font-black text-[14rem] md:text-[18rem] leading-none text-white/[0.018] translate-x-10 translate-y-8 block">
                NY
              </span>
            </div>

            <div className="relative z-10 p-10 md:p-14">

              {/* Header */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ember font-semibold mb-5">
                <MapPin className="w-4 h-4" /> Service Coverage
              </div>
              <h3 className="font-display text-3xl md:text-4xl mb-3 text-white leading-tight">
                Supporting Businesses Across the US
              </h3>
              <p className="text-white/45 text-base mb-10 max-w-xl leading-relaxed">
                AI Workflow Automation delivered to every major commercial hub throughout the US.
              </p>

              {/* Location pills */}
              <div className="flex flex-wrap gap-2.5 mb-12">
                {detail.locations.map((location, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/[0.1] bg-white/[0.03] hover:border-ember/50 hover:bg-ember/[0.07] transition-all duration-300 cursor-default"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-ember/50 group-hover:bg-ember transition-colors duration-300 flex-shrink-0" />
                    <span className="text-white/60 text-xs font-medium tracking-wide group-hover:text-white transition-colors duration-300">
                      {location}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Stats row — below pills, horizontal */}
              <div className="border-t border-white/[0.07] pt-10 grid grid-cols-2 sm:grid-cols-4 gap-0">
                {[
                  { value: `${detail.locations.length}+`, label: "Locations" },
                  { value: "NYC", label: "Headquarters" },
                  { value: "24/7", label: "Uptime" },
                  { value: "USA", label: "Nationwide" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.1 }}
                    className={[
                      "py-4 pr-8",
                      i < 3 ? "border-r border-white/[0.07]" : "",
                      i > 0 ? "pl-8" : "",
                    ].join(" ")}
                  >
                    <div className="font-display text-3xl md:text-4xl font-bold text-ember leading-none">{stat.value}</div>
                    <div className="text-white/35 text-[10px] uppercase tracking-[0.2em] mt-2">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Frequently Asked Questions */}
      {detail.faqs && detail.faqs.length > 0 && (
        <section className="px-8 md:px-14 max-w-[1500px] mx-auto pb-32">
          <div className="text-xs uppercase tracking-[0.25em] text-white/50 mb-4 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-ember" /> Clarity & Expectations
          </div>
          <h3 className="font-display text-3xl md:text-5xl mb-12 text-white">Frequently Asked Questions</h3>
          <div className="space-y-6 max-w-4xl">
            {detail.faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 rounded-xl bg-white/[0.02] border border-white/10"
              >
                <h4 className="font-display text-xl text-white mb-3 flex items-start gap-3">
                  <span className="text-ember font-sans font-semibold">Q.</span> {faq.q}
                </h4>
                <p className="text-white/60 leading-relaxed text-sm md:text-base pl-7">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Related Services */}
      <section className="px-8 md:px-14 max-w-[1500px] mx-auto pb-24 border-t border-white/10 pt-20">
        <div className="text-xs uppercase tracking-[0.25em] text-white/50 mb-6">Explore complementary services</div>
        <div className="grid md:grid-cols-3 gap-6">
          {others.map((s) => {
            const o = allDetails[s];
            return (
              <Link
                key={s}
                href={`/services/${s}`}
                className="group p-6 rounded-lg border border-white/10 hover:border-ember/50 hover:bg-white/[0.02] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-white/40">{o.eyebrow.split(" · ")[0]}</span>
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-ember group-hover:rotate-45 transition-all duration-500" />
                </div>
                <h4 className="font-display text-2xl mt-4 group-hover:text-ember transition-colors">{o.title}</h4>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
