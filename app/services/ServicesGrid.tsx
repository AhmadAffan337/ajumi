"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const services = [
  {
    slug: "new-york-seo-services",
    n: "01",
    t: "SEO & Local SEO",
    d: "Increase online visibility through technical SEO, Local SEO, content optimization, and authority-building strategies that drive qualified organic traffic.",
    metric: "Higher Organic Rankings",
    deliverables: [
      "Technical SEO",
      "Local SEO",
      "Keyword Research",
      "Link Building",
    ],
    bgGradient: "from-[#ff5a2a]/10 to-[#2a0a05]/20",
    borderGlow: "group-hover:border-[#ff5a2a]/30",
  },
  {
    slug: "new-york-social-media-services",
    n: "02",
    t: "Social Media Marketing",
    d: "Grow your brand with strategic content, community management, paid social campaigns, and platform-specific marketing across major social networks.",
    metric: "Stronger Brand Engagement",
    deliverables: [
      "Content Strategy",
      "Social Management",
      "Paid Social Ads",
      "Performance Analytics",
    ],
    bgGradient: "from-amber-500/5 to-orange-950/20",
    borderGlow: "group-hover:border-amber-500/20",
  },
  {
    slug: "new-york-paid-ads-services",
    n: "03",
    t: "Paid Advertising",
    d: "Generate qualified leads through Google Ads and Meta Ads with conversion-focused campaigns, audience targeting, and continuous optimization.",
    metric: "More Revenue per Ad Dollar",
    deliverables: [
      "Google Ads",
      "Meta Ads",
      "Conversion Tracking",
      "Campaign Optimization",
    ],
    bgGradient: "from-zinc-800/10 to-zinc-900/40",
    borderGlow: "group-hover:border-white/25",
  },
 
  {
    slug: "new-york-ai-automation-services",
    n: "04",
    t: "AI Business Automation",
    d: "Automate repetitive business processes using AI-powered workflows that improve efficiency, reduce manual tasks, and help your team focus on high-value work.",
    metric: "40% Lower Operating Costs",
    deliverables: [
      "Workflow Automation",
      "AI Process Optimization",
      "CRM Integration",
      "Task Automation",
    ],
    bgGradient: "from-orange-600/10 to-[#2a0a05]/30",
    borderGlow: "group-hover:border-orange-500/30",
  },
  {
    slug: "new-york-ai-calling-services",
    n: "05",
    t: "AI Calling Services",
    d: "Deploy AI voice agents to answer calls, qualify leads, schedule appointments, and deliver seamless customer support around the clock.",
    metric: "24/7 Customer Availability",
    deliverables: [
      "AI Voice Agents",
      "Appointment Scheduling",
      "Lead Qualification",
      "Call Automation",
    ],
    bgGradient: "from-neutral-900/60 to-black/80",
    borderGlow: "group-hover:border-white/10",
  },
  {
    slug: "new-york-ai-chatbot-services",
    n: "06",
    t: "AI Chatbot Solutions",
    d: "Build intelligent AI chatbots that engage visitors, answer questions, capture leads, and automate customer interactions across multiple channels.",
    metric: "Instant Customer Responses",
    deliverables: [
      "AI Customer Support",
      "Lead Generation",
      "CRM Integration",
      "Live Chat Automation",
    ],
    bgGradient: "from-[#7a1a08]/15 to-[#2a0c06]/35",
    borderGlow: "group-hover:border-[#7a1a08]/30",
  },
  {
    slug: "new-york-website-development-services",
    n: "07",
    t: "Website Development",
    d: "Design and develop high-performance websites that combine modern UI/UX, responsive design, SEO best practices, and fast-loading architecture.",
    metric: "High-Performance Websites",
    deliverables: [
      "Custom Development",
      "Responsive Design",
      "SEO Ready",
      "CMS Integration",
    ],
    bgGradient: "from-[#ff8850]/10 to-[#3a1a10]/30",
    borderGlow: "group-hover:border-[#ff8850]/30",
  },
   {
    slug: "new-york-crm-services",
    n: "08",
    t: "CRM Automation",
    d: "Automate customer journeys, lead nurturing, sales pipelines, and follow-ups using intelligent CRM workflows that improve customer retention.",
    metric: "Faster Sales Pipeline",
    deliverables: [
      "Sales Automation",
      "Email Workflows",
      "Lead Nurturing",
      "CRM Integration",
    ],
    bgGradient: "from-[#ff5a2a]/5 to-neutral-900/40",
    borderGlow: "group-hover:border-[#ff5a2a]/20",
  },
];

export function ServicesGrid() {
  return (
    <section className="px-8 md:px-14 max-w-[1500px] mx-auto pb-32">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.08 }}
          >
            <Link href={`/services/${s.slug}`} className="group block h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`relative h-full rounded-2xl border border-white/10 bg-gradient-to-br ${s.bgGradient} p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 ${s.borderGlow}`}
              >
                {/* Background Grid Pattern Overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity duration-500"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Top Row: Number & Hover Link Circle */}
                <div className="relative z-10 flex items-center justify-between mb-8">
                  <span className="font-mono text-xs uppercase tracking-widest text-white/40">{s.n}</span>
                  <span className="w-10 h-10 rounded-full bg-white/5 backdrop-blur border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
                  </span>
                </div>

                {/* Middle Content */}
                <div className="relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl leading-snug group-hover:text-ember transition-colors duration-300">
                      {s.t}
                    </h3>
                    <p className="mt-4 text-white/50 text-sm leading-relaxed min-h-[4.5rem]">
                      {s.d}
                    </p>
                  </div>

                  {/* Core Deliverables & Key Metric */}
                  <div className="mt-8 pt-6 border-t border-white/5 space-y-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">Key Deliverables</div>
                      <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                        {s.deliverables.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-white/60">
                            <CheckCircle2 className="w-3.5 h-3.5 text-ember flex-shrink-0" />
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                      <span className="text-[10px] uppercase tracking-wider text-white/40">Primary Target</span>
                      <span className="text-xs font-semibold text-ember">{s.metric}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
