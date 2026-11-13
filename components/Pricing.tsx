"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Check,
  Sparkles,
  Globe,
  Search,
  Share2,
  Bot,
  PlusCircle,
  Zap,
  ShieldCheck,
  Layers,
  ArrowRight
} from "lucide-react";
import { CTAButton } from "./CTAButton";

type CategoryKey = "bundles" | "website" | "seo" | "social" | "automation" | "addons";

interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  popular?: boolean;
  badge?: string;
  desc?: string;
  features: string[];
}

export function Pricing() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("bundles");
  const router = useRouter();

  const handleChoosePlan = (planName: string) => {
    router.push(`/contact?plan=${encodeURIComponent(planName)}`);
  };

  const categories = [
    { key: "bundles" as CategoryKey, label: "Growth Bundles", icon: Sparkles },
    { key: "website" as CategoryKey, label: "Website Dev", icon: Globe },
    { key: "seo" as CategoryKey, label: "SEO & Growth", icon: Search },
    { key: "social" as CategoryKey, label: "Social & Paid Ads", icon: Share2 },
    { key: "automation" as CategoryKey, label: "AI & Automation", icon: Bot },
    { key: "addons" as CategoryKey, label: "Additional Services", icon: PlusCircle },
  ];

  // 1. Recommended Growth Bundles
  const bundles: PricingPlan[] = [
    {
      name: "Ajumi Starter Plan",
      price: "$2,497",
      period: "/month",
      desc: "Perfect foundation for small businesses scaling local authority and organic search.",
      features: [
        "Basic SEO (10 Keywords, On-Page & Local)",
        "Google Business Profile Management",
        "1 Social Media Platform Management",
        "Monthly Strategy & Performance Reports",
        "Dedicated Account Coordinator"
      ],
    },
    {
      name: "Ajumi Growth Plan",
      price: "$3,997",
      period: "/month",
      popular: true,
      badge: "Most Popular",
      desc: "High-impact growth engine built for scaling market share across search and social.",
      features: [
        "Growth SEO (20 Keywords, Technical & Blogs)",
        "Google Business Profile Management",
        "2 Social Media Platforms Management",
        "Website Maintenance & Performance Care",
        "Competitor Gap Analysis & Citation Building"
      ],
    },
    {
      name: "Ajumi Scale Plan",
      price: "$6,997",
      period: "/month",
      badge: "High Velocity",
      desc: "Comprehensive multi-channel dominance powered by advanced search, ads, and AI.",
      features: [
        "Advanced SEO (30 Keywords & Authority Links)",
        "Paid Advertising Management (Google & Meta)",
        "Google Business Profile Management",
        "2 Social Media Platforms Management",
        "24/7 AI Lead Qualification Chatbot"
      ],
    },
    {
      name: "Ajumi AI Growth Suite",
      price: "$11,997",
      period: "/month",
      badge: "Full Ecosystem",
      desc: "Unrestricted digital marketing ecosystem including all services + AI Automation & Executive Strategy.",
      features: [
        "Full Ecosystem - All Services Included",
        "Advanced SEO & Authority Link Building",
        "Omnichannel Paid Ads & Social Management",
        "AI Chatbots, Voice Agents & CRM Automation",
        "Custom Software / AI Strategy & Advisory",
        "24/7 Priority Support & Dedicated Growth Board"
      ],
    },
  ];

  // 2. Website Development
  const websitePlans: PricingPlan[] = [
    {
      name: "Ajumi Starter Website",
      price: "$2,000",
      period: "one-time",
      desc: "Professional online presence for startups and small businesses.",
      features: [
        "Up to 5 Custom Pages",
        "Professional & Mobile-Responsive Design",
        "Basic SEO Optimization",
        "Fast Performance Tuning",
        "Contact Forms & Google Maps Integration"
      ],
    },
    {
      name: "Ajumi Business Website",
      price: "$3,500",
      period: "one-time",
      popular: true,
      badge: "Best Value",
      desc: "High-converting web architecture for growing brands and agencies.",
      features: [
        "Up to 10 Custom Pages",
        "Advanced UI/UX Design Tokens",
        "High-Intent Lead Gen Forms",
        "Enhanced On-Page & Schema SEO",
        "Service Pages & Portfolio Showcase Gallery"
      ],
    },
    {
      name: "Ajumi Advanced Website",
      price: "$4,500",
      period: "one-time",
      desc: "Feature-rich dynamic platform with CRM & booking integrations.",
      features: [
        "CRM Integration (GoHighLevel, HubSpot, etc.)",
        "Automated Booking & Scheduling Systems",
        "Custom API Integrations",
        "Advanced Automation & Workflows",
        "SSL, Analytics & Speed Optimization"
      ],
    },
    {
      name: "Ajumi Enterprise Website",
      price: "$5,000+",
      period: "custom quote",
      badge: "Enterprise",
      desc: "Scalable multi-location infrastructure for enterprise organizations.",
      features: [
        "Multi-Location / Multi-Tenant Architecture",
        "Enterprise Architecture & Custom Codebase",
        "Custom Feature Development",
        "Scalable Cloud Infrastructure",
        "Dedicated SLA & Maintenance Support"
      ],
    },
  ];

  // 3. SEO & Organic Growth
  const seoPlans: PricingPlan[] = [
    {
      name: "Ajumi Basic SEO",
      price: "$1,000",
      period: "/month",
      desc: "Essential search visibility setup for local businesses.",
      features: [
        "10 Target Keyword Ranking Strategy",
        "On-Page SEO & Meta Data Optimization",
        "Google Search Console Setup & Monitoring",
        "Local SEO Optimization",
        "Monthly Ranking & Traffic Reports"
      ],
    },
    {
      name: "Ajumi Growth SEO",
      price: "$1,750",
      period: "/month",
      popular: true,
      badge: "Recommended",
      desc: "Aggressive organic growth targeting high-converting search intent.",
      features: [
        "20 Target Keyword Ranking Strategy",
        "Technical SEO & Code Architecture Tuning",
        "Google Business Profile Optimization",
        "Citation Building & Directory Submissions",
        "Monthly Blog Content Pillars",
        "In-depth Competitor Gap Analysis"
      ],
    },
    {
      name: "Ajumi Advanced SEO",
      price: "$3,000",
      period: "/month",
      badge: "Authority Scale",
      desc: "Dominant organic search authority for competitive national industries.",
      features: [
        "30+ Target Keyword Ranking Strategy",
        "High-Authority Backlink Acquisition & Digital PR",
        "Editorial Guest Posting Placements",
        "Multi-Area Location Pages",
        "Monthly Strategic Advisory & Conversion Tracking",
        "24/7 Priority Support & Rank Guarantee"
      ],
    },
  ];

  // 4. Social Media & Paid Advertising
  const socialPlans: PricingPlan[] = [
    {
      name: "Ajumi Social Media Management",
      price: "$1,000",
      period: "/platform/mo",
      desc: "Multi-platform options: 2 Platforms = $1,750/mo | 3 Platforms = $2,500/mo.",
      features: [
        "Brand Social Strategy & Content Pillars",
        "High-Craft Graphic Design & AI Visuals",
        "Trending Short-Form Video & Reels Production",
        "Monthly Editorial Content Calendar",
        "Proactive Community Engagement & Reporting"
      ],
    },
    {
      name: "Ajumi Paid Advertising Management",
      price: "$1,000 - $2,000",
      period: "/month",
      popular: true,
      badge: "Ad Spend Billed Separately",
      desc: "Full-funnel campaign management across Google Ads, Meta, and TikTok.",
      features: [
        "Omnichannel Campaign Architecture & Setup",
        "Audience Research & Demographic Targeting",
        "Landing Page Conversion Advice",
        "Server-Side Conversion Tracking & Pixel Setup",
        "Daily Bid Optimization & Creative Iteration"
      ],
    },
  ];

  // 5. AI & Business Automation
  const automationPlans: PricingPlan[] = [
    {
      name: "Ajumi Google Business Profile",
      price: "$750",
      period: "/month",
      desc: "Optimize and maintain your local map pack presence to dominate local search.",
      features: [
        "Daily GBP Posts & Offer Updates",
        "Local Photo & Video Geo-Tagging",
        "Review Management & Automated Responses",
        "Spam Edit Defense & Listing Protection",
        "Local Map Pack Ranking Analytics"
      ],
    },
    {
      name: "Ajumi AI Chatbot Solutions",
      price: "$1,150",
      period: "/month",
      popular: true,
      badge: "24/7 Lead Qual",
      desc: "Intelligent conversational agent integrated directly into your website & CRM.",
      features: [
        "Custom Trained AI Knowledge Base",
        "24/7 Instant Lead Qualification",
        "CRM Integration (GoHighLevel, HubSpot, Zapier)",
        "Automated Meeting Scheduling",
        "Multi-language Conversational Support"
      ],
    },
    {
      name: "Ajumi AI Receptionist & Voice Agent",
      price: "$1,000 - $3,000",
      period: "/month",
      badge: "24/7 Answering",
      desc: "Human-sounding AI voice agent answering phone calls, scheduling, and sending text-backs.",
      features: [
        "24/7 Phone Call Answering & Routing",
        "Natural Voice Conversational AI",
        "Instant Missed-Call Text-Back Automation",
        "Real-Time Calendar Appointment Booking",
        "Call Transcript & Sentiment Analysis Dashboard"
      ],
    },
    {
      name: "Ajumi CRM & Business Automation",
      price: "Starting at $3,000",
      period: "one-time setup",
      desc: "Complete business workflow automation setup on GoHighLevel, HubSpot, or custom APIs.",
      features: [
        "Complete CRM Onboarding & Pipelines",
        "Email & SMS Automated Nurture Sequences",
        "Lead Tagging, Scoring & Assignment Rules",
        "Zapier / Make.com Custom Integrations",
        "Team Staff Training & Documentation"
      ],
    },
  ];

  // 6. Additional Services
  const additionalServices = [
    {
      category: "Creative Services",
      icon: Zap,
      items: [
        { title: "Drone Photography & Video", price: "$1,000 – $6,000", detail: "High-resolution aerial footage and video production." },
        { title: "Professional Copywriting", price: "$800 – $2,000", detail: "Sales landing pages, brand messaging, and ad copy." },
      ],
    },
    {
      category: "Retention & Customer Lifetime Value",
      icon: ShieldCheck,
      items: [
        { title: "Reputation Management", price: "$500 – $2,000/mo", detail: "Active brand monitoring, sentiment control & PR protection." },
        { title: "Review Generation", price: "$500 – $2,000/mo", detail: "Automated customer review request sequences (Google, Yelp, Trustpilot)." },
        { title: "Email & SMS Marketing", price: "$750 – $5,000/mo", detail: "Automated retention flows, campaigns, and subscriber list growth." },
      ],
    },
    {
      category: "Tech & Specialized Custom Work",
      icon: Layers,
      items: [
        { title: "Landing Page Design", price: "$500 – $1,000 / page", detail: "High-converting standalone sales pages designed for ad campaigns." },
        { title: "Conversion Optimization (CRO)", price: "$500 – $2,000/mo", detail: "A/B testing, heatmap auditing, and checkout friction tuning." },
        { title: "Custom Software & AI Solutions", price: "Custom Quote", detail: "Bespoke web applications, AI models, and enterprise API integrations." },
      ],
    },
  ];

  return (
    <section id="pricing" className="relative py-20 md:py-24 px-8 md:px-14 max-w-[1500px] mx-auto text-center flex flex-col items-center">
      {/* Header Badge */}
      <div className="flex items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
        <span className="text-ember">(07)</span>
        <span className="h-px w-8 bg-white/20" />
        <span>Comprehensive Pricing & Services Guide</span>
        <span className="h-px w-8 bg-white/20" />
      </div>

      {/* Main Heading */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-6 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[1.02] tracking-tight max-w-4xl"
        >
          Transparent, ROI-focused solutions for every <span className="text-ember italic">growth stage</span>.
        </motion.h2>

        <p className="text-white/60 text-base max-w-2xl leading-relaxed font-light">
          Choose the level of support that fits your business, from local SEO and social media management to full-service digital marketing, AI automation, CRM systems, and technology solutions.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-16 scrollbar-none border-b border-white/10">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`relative flex items-center gap-2.5 px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold transition-all whitespace-nowrap ${
                isActive ? "text-black" : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="pricingTabPill"
                  className="absolute inset-0 bg-ember rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-ember"}`} />
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        {/* CATEGORY 1: BUNDLES */}
        {activeCategory === "bundles" && (
          <motion.div
            key="bundles"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bundles.map((p, i) => (
                <div
                  key={p.name}
                  className={`hover-card relative p-8 rounded-xl border flex flex-col justify-between ${
                    p.popular
                      ? "border-ember bg-ember/[0.05] shadow-2xl shadow-ember/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  <div>
                    <div className="h-6 mb-4 flex items-center justify-center">
                      {p.badge && (
                      <span className="inline-block px-3 py-1 rounded-full bg-ember text-black text-[10px] uppercase tracking-widest font-bold">
                        {p.badge}
                      </span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl text-white">{p.name}</h3>
                    <div className="mt-6 flex items-end gap-2">
                      <span className="font-display text-4xl md:text-5xl leading-none text-white">{p.price}</span>
                      <span className="text-white/50 text-xs mb-1">{p.period}</span>
                    </div>
                    <p className="mt-4 text-white/60 text-xs leading-relaxed min-h-[3.75rem]">{p.desc}</p>
                    <div className="my-6 h-px bg-white/10" />
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-4">Included Features</div>
                    <ul className="space-y-3">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-xs text-white/80">
                          <Check className="w-4 h-4 text-ember flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8">
                    <CTAButton
                      variant={p.popular ? "primary" : "ghost"}
                      onClick={() => handleChoosePlan(p.name)}
                    >
                      Select Bundle
                    </CTAButton>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CATEGORY 2: WEBSITE DEV */}
        {activeCategory === "website" && (
          <motion.div
            key="website"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.01] text-center max-w-3xl mx-auto mb-8">
              <h3 className="font-display text-xl text-white mb-2">High-Performance Website Development</h3>
              <p className="text-white/60 text-xs leading-relaxed">
                Build a high-speed, SEO-optimized website engineered as your primary sales and lead generation engine.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {websitePlans.map((p) => (
                <div
                  key={p.name}
                  className={`relative p-8 rounded-xl border flex flex-col justify-between ${
                    p.popular ? "border-ember bg-ember/[0.05]" : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <div>
                    <div className="h-6 mb-4 flex items-center justify-center">
                      {p.badge && (
                      <span className="inline-block px-3 py-1 rounded-full bg-ember text-black text-[10px] uppercase tracking-widest font-bold">
                        {p.badge}
                      </span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl text-white">{p.name}</h3>
                    <div className="mt-6 flex items-end gap-2">
                      <span className="font-display text-4xl leading-none text-white">{p.price}</span>
                      <span className="text-white/50 text-xs mb-1">{p.period}</span>
                    </div>
                    <p className="mt-4 text-white/60 text-xs leading-relaxed min-h-[2.5rem]">{p.desc}</p>
                    <div className="my-6 h-px bg-white/10" />
                    <ul className="space-y-3">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-xs text-white/80">
                          <Check className="w-4 h-4 text-ember flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8">
                    <CTAButton
                      variant={p.popular ? "primary" : "ghost"}
                      onClick={() => handleChoosePlan(p.name)}
                    >
                      Get Started
                    </CTAButton>
                  </div>
                </div>
              ))}
            </div>

            {/* Included in All Website Plans Bar */}
            <div className="p-8 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="text-xs uppercase tracking-widest text-ember font-semibold mb-4 text-center">
                Included in All Website Development Plans
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 text-center text-xs text-white/70">
                {[
                  "Fast Performance",
                  "Contact Forms",
                  "Service Pages",
                  "Portfolio Gallery",
                  "Testimonials",
                  "Maps Integration",
                  "SSL Certificate",
                  "Google Analytics"
                ].map((feat) => (
                  <div key={feat} className="p-3 rounded-lg border border-white/5 bg-white/[0.01]">
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* CATEGORY 3: SEO */}
        {activeCategory === "seo" && (
          <motion.div
            key="seo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {seoPlans.map((p) => (
              <div
                key={p.name}
                className={`relative p-8 rounded-xl border flex flex-col justify-between ${
                  p.popular ? "border-ember bg-ember/[0.05]" : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div>
                  <div className="h-6 mb-4 flex items-center justify-center">
                    {p.badge && (
                    <span className="inline-block px-3 py-1 rounded-full bg-ember text-black text-[10px] uppercase tracking-widest font-bold">
                      {p.badge}
                    </span>
                    )}
                  </div>
                  <h3 className="font-display text-2xl text-white">{p.name}</h3>
                  <div className="mt-6 flex items-end gap-2">
                    <span className="font-display text-5xl leading-none text-white">{p.price}</span>
                    <span className="text-white/50 text-xs mb-1">{p.period}</span>
                  </div>
                  <p className="mt-4 text-white/60 text-xs leading-relaxed min-h-[2.5rem]">{p.desc}</p>
                  <div className="my-6 h-px bg-white/10" />
                  <ul className="space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-xs text-white/80">
                        <Check className="w-4 h-4 text-ember flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <CTAButton
                    variant={p.popular ? "primary" : "ghost"}
                    onClick={() => handleChoosePlan(p.name)}
                  >
                    Start SEO Campaign
                  </CTAButton>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* CATEGORY 4: SOCIAL & PAID ADS */}
        {activeCategory === "social" && (
          <motion.div
            key="social"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {socialPlans.map((p) => (
              <div
                key={p.name}
                className="relative p-8 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col justify-between hover:border-white/20 transition-all"
              >
                <div>
                  <div className="h-6 mb-4 flex items-center justify-center">
                    {p.badge && (
                    <span className="inline-block px-3 py-1 rounded-full bg-ember/20 border border-ember/40 text-ember text-[10px] uppercase tracking-widest font-bold">
                      {p.badge}
                    </span>
                    )}
                  </div>
                  <h3 className="font-display text-3xl text-white">{p.name}</h3>
                  <div className="mt-6 flex items-end gap-2">
                    <span className="font-display text-4xl md:text-5xl leading-none text-white">{p.price}</span>
                    <span className="text-white/50 text-xs mb-1">{p.period}</span>
                  </div>
                  <p className="mt-4 text-white/60 text-sm leading-relaxed">{p.desc}</p>
                  <div className="my-6 h-px bg-white/10" />
                  <div className="text-xs uppercase tracking-widest text-white/40 mb-4">Service Scope</div>
                  <ul className="space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-xs text-white/80">
                        <Check className="w-4 h-4 text-ember flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <CTAButton
                    variant="primary"
                    onClick={() => handleChoosePlan(p.name)}
                  >
                    Inquire for Campaign
                  </CTAButton>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* CATEGORY 5: AI & AUTOMATION */}
        {activeCategory === "automation" && (
          <motion.div
            key="automation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {automationPlans.map((p) => (
              <div
                key={p.name}
                className={`relative p-8 rounded-xl border flex flex-col justify-between ${
                  p.popular ? "border-ember bg-ember/[0.05]" : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div>
                  <div className="h-6 mb-4 flex items-center justify-center">
                    {p.badge && (
                    <span className="inline-block px-3 py-1 rounded-full bg-ember text-black text-[10px] uppercase tracking-widest font-bold">
                      {p.badge}
                    </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl text-white">{p.name}</h3>
                  <div className="mt-6 flex items-end gap-2">
                    <span className="font-display text-3xl leading-none text-white">{p.price}</span>
                    <span className="text-white/50 text-[10px] mb-1">{p.period}</span>
                  </div>
                  <p className="mt-4 text-white/60 text-xs leading-relaxed min-h-[3rem]">{p.desc}</p>
                  <div className="my-6 h-px bg-white/10" />
                  <ul className="space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-xs text-white/80">
                        <Check className="w-4 h-4 text-ember flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <CTAButton
                    variant={p.popular ? "primary" : "ghost"}
                    onClick={() => handleChoosePlan(p.name)}
                  >
                    Deploy AI
                  </CTAButton>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* CATEGORY 6: ADDITIONAL SERVICES */}
        {activeCategory === "addons" && (
          <motion.div
            key="addons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            <div className="grid md:grid-cols-3 gap-8">
              {additionalServices.map((sec) => {
                const SecIcon = sec.icon;
                return (
                  <div
                    key={sec.category}
                    className="p-8 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 rounded-lg bg-ember/10 border border-ember/20 text-ember">
                          <SecIcon className="w-5 h-5" />
                        </div>
                        <h3 className="font-display text-xl text-white">{sec.category}</h3>
                      </div>
                      <div className="space-y-6">
                        {sec.items.map((item) => (
                          <div key={item.title} className="p-4 rounded-lg border border-white/5 bg-white/[0.01]">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-semibold text-sm text-white">{item.title}</span>
                              <span className="text-xs font-display text-ember">{item.price}</span>
                            </div>
                            <p className="text-xs text-white/55 leading-relaxed">{item.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8">
                      <CTAButton
                        variant="ghost"
                        onClick={() => handleChoosePlan(sec.category)}
                      >
                        Request Add-on Quote
                      </CTAButton>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
