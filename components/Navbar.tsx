"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Menu,
  X,
  ChevronDown,
  Bot,
  Globe,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Zap,
  Layers,
  Search,
  MessageSquare,
  ShieldCheck
} from "lucide-react";

interface ServiceItem {
  slug: string;
  title: string;
  desc: string;
  badge?: string;
}

interface ServiceCategory {
  title: string;
  icon: any;
  items: ServiceItem[];
}

const serviceCategories: ServiceCategory[] = [
  {
    title: "AI & Automation",
    icon: Bot,
    items: [
      {
        slug: "new-york-ai-automation-services",
        title: "AI Business Automation",
        desc: "Work Smarter, Grow Faster with Intelligent AI Automation",
        badge: "New",
      },
      {
        slug: "new-york-ai-calling-services",
        title: "AI Calling Solutions",
        desc: "Never Miss a Call with AI Voice Agents That Answer, Qualify, and Convert 24/7",
      },
      {
        slug: "new-york-ai-chatbot-services",
        title: "AI Chatbot Solutions",
        desc: "Boost Customer Engagement with AI Chatbots That Respond, Qualify, and Convert Instantly",
      },
    ],
  },
 
  {
    title: "Growth & Marketing",
    icon: TrendingUp,
    items: [
      {
        slug: "new-york-seo-services",
        title: "SEO & Local SEO",
        desc: "Dominate Search Results and Turn Local Searches into Paying Customers",
        badge: "Popular",
      },
      {
        slug: "new-york-paid-ads-services",
        title: "Paid Advertising (Google & Meta)",
        desc: "Scale Faster with High-Impact Google & Meta Ad Campaigns",
      },
      {
        slug: "new-york-social-media-services",
        title: "Social Media Marketing",
        desc: "Turn Scrolls into Sales with Content That Converts",
      },
    ],
  },
   {
    title: "Software & Dev",
    icon: Globe,
    items: [
      {
        slug: "new-york-crm-services",
        title: "CRM Automation",
        desc: "Transform Every Lead into Opportunity with Smart CRM Automation",
      },
      {
        slug: "new-york-website-development-services",
        title: "Website Development",
        desc: "Launch Stunning, High-Performance Websites Built to Engage and Convert",
      },
    
    ],
  },
];

const mainLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
  { to: "/pricing", label: "Pricing" },
  { to: "/industries/restaurants", label: "Industries" },
  { to: "/blog", label: "Blog" },
];

export function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 120 && !servicesOpen && !mobileOpen);
  });

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: hidden ? "-100%" : 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/50 border-b border-white/[0.08]"
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-14">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Left Side */}
            <Link href="/" className="group flex items-center gap-2 relative z-10">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="relative flex items-center"
              >
                <Image
                  src="/images/ajumi-logo-orange.png"
                  alt="Ajumi Logo"
                  width={400}
                  height={160}
                  priority
                  className="h-28 md:h-28 w-auto object-contain shrink-0"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation - Center */}
            <ul className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {mainLinks.slice(0, 2).map((l) => (
                <li key={l.to}>
                  <Link
                    href={l.to}
                    className={`relative text-sm font-medium tracking-wide transition-all duration-300 hover:text-white group ${
                      pathname === l.to ? "text-white" : "text-white/70"
                    }`}
                  >
                    {l.label}
                    {pathname === l.to && (
                      <motion.span
                        layoutId="navbar-indicator"
                        className="absolute -bottom-7 left-0 right-0 h-[2px] bg-ember"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="absolute -bottom-7 left-0 w-0 h-[2px] bg-white/30 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}

              {/* Services Mega-Menu Dropdown */}
              <li
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={`relative inline-flex items-center gap-1.5 text-sm font-medium tracking-wide transition-all duration-300 hover:text-white group ${
                    pathname.startsWith("/services") ? "text-white" : "text-white/70"
                  }`}
                >
                  Services
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      servicesOpen ? "rotate-180 text-ember" : ""
                    }`}
                  />
                  {pathname.startsWith("/services") && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute -bottom-7 left-0 right-0 h-[2px] bg-ember"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-7 w-[860px] p-2"
                    >
                      <div className="rounded-2xl border border-white/10 bg-black/95 backdrop-blur-3xl shadow-2xl shadow-black/80 overflow-hidden">
                        {/* Mega Menu Layout: 3 Columns + Highlight Spotlight Card */}
                        <div className="p-6 grid grid-cols-12 gap-6">
                          {/* Main Service Pillars (9 Columns) */}
                          <div className="col-span-9 grid grid-cols-3 gap-6 border-r border-white/10 pr-6">
                            {serviceCategories.map((cat) => {
                              const CatIcon = cat.icon;
                              return (
                                <div key={cat.title} className="space-y-3">
                                  {/* Pillar Category Header */}
                                  <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                                    <div className="p-1 rounded bg-ember/10 border border-ember/20 text-ember">
                                      <CatIcon className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-xs uppercase tracking-wider font-semibold text-white/90">
                                      {cat.title}
                                    </span>
                                  </div>

                                  {/* Services List */}
                                  <div className="space-y-1.5">
                                    {cat.items.map((item) => (
                                      <Link
                                        key={item.title}
                                        href={`/services/${item.slug}`}
                                        onClick={() => setServicesOpen(false)}
                                        className="group block p-2.5 rounded-lg hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all duration-200"
                                      >
                                        <div className="flex items-center justify-between gap-1 text-xs font-medium text-white group-hover:text-ember transition-colors">
                                          <span className="flex items-center gap-1.5">
                                            {item.title}
                                            {item.badge && (
                                              <span className="px-1.5 py-0.5 rounded text-[9px] uppercase tracking-widest font-bold bg-ember text-black">
                                                {item.badge}
                                              </span>
                                            )}
                                          </span>
                                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-ember" />
                                        </div>
                                        <p className="text-[10px] text-white/45 mt-1 leading-snug font-light">
                                          {item.desc}
                                        </p>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Featured Spotlight Card (3 Columns) */}
                          <div className="col-span-3 flex flex-col justify-between p-4 rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-ember/[0.05] relative overflow-hidden">
                            <div className="space-y-2 relative z-10">
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ember/20 border border-ember/30 text-ember text-[9px] uppercase tracking-widest font-bold">
                                <Sparkles className="w-3 h-3" />
                                Spotlight
                              </div>
                              <h4 className="font-display text-base text-white leading-tight">
                                Growth Suite
                              </h4>
                              <p className="text-[10px] text-white/60 leading-relaxed font-light">
                                Full ecosystem: AI Chatbots, SEO, Paid Ads & Strategy under one retainer.
                              </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-white/10 relative z-10">
                              <Link
                                href="/pricing"
                                onClick={() => setServicesOpen(false)}
                                className="group inline-flex items-center gap-1.5 text-xs font-semibold text-ember hover:text-white transition-colors"
                              >
                                View All Pricing
                                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                              </Link>
                            </div>

                            {/* Background glow effect */}
                            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-ember/20 rounded-full blur-xl pointer-events-none" />
                          </div>
                        </div>

                        {/* Footer Bar */}
                        <div className="px-6 py-3 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
                          <span className="text-[11px] text-white/50">
                            Looking for custom enterprise software or AI integration?
                          </span>
                          <Link
                            href="/contact"
                            onClick={() => setServicesOpen(false)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-ember transition-colors"
                          >
                            Book Technical Consultation
                            <ChevronRight className="w-3.5 h-3.5 text-ember" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {mainLinks.slice(2).map((l) => (
                <li key={l.to}>
                  <Link
                    href={l.to}
                    className={`relative text-sm font-medium tracking-wide transition-all duration-300 hover:text-white group ${
                      pathname === l.to ? "text-white" : "text-white/70"
                    }`}
                  >
                    {l.label}
                    {pathname === l.to && (
                      <motion.span
                        layoutId="navbar-indicator"
                        className="absolute -bottom-7 left-0 right-0 h-[2px] bg-ember"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="absolute -bottom-7 left-0 w-0 h-[2px] bg-white/30 group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Side - CTA & Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Contact CTA - Desktop */}
              <Link
                href="/contact"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-ember/10 border border-white/10 hover:border-ember/30 text-sm font-medium text-white/90 hover:text-ember transition-all duration-300 group"
              >
                Contact Us
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-[61] w-full max-w-sm bg-black border-l border-white/10 lg:hidden overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <Image
                    src="/images/ajumi-logo-orange.png"
                    alt="Ajumi Logo"
                    width={120}
                    height={38}
                    className="h-8 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="p-6 space-y-2">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-lg font-medium text-white/80 hover:text-white hover:bg-white/5"
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-lg font-medium text-white/80 hover:text-white hover:bg-white/5"
                >
                  About
                </Link>

                {/* Mobile Expandable Services Accordion */}
                <div>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-lg font-medium text-white/80 hover:text-white hover:bg-white/5"
                  >
                    <span>Services</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        mobileServicesOpen ? "rotate-180 text-ember" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 space-y-3 mt-2 overflow-hidden border-l border-white/10 ml-4"
                      >
                        {serviceCategories.map((cat) => (
                          <div key={cat.title} className="space-y-1">
                            <div className="text-[10px] uppercase tracking-widest text-ember font-bold px-2 py-1">
                              {cat.title}
                            </div>
                            {cat.items.map((item) => (
                              <Link
                                key={item.title}
                                href={`/services/${item.slug}`}
                                onClick={() => {
                                  setMobileOpen(false);
                                  setMobileServicesOpen(false);
                                }}
                                className="block px-2 py-1.5 text-xs text-white/70 hover:text-ember transition-colors"
                              >
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/work"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-lg font-medium text-white/80 hover:text-white hover:bg-white/5"
                >
                  Work
                </Link>

                <Link
                  href="/pricing"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-lg font-medium text-white/80 hover:text-white hover:bg-white/5"
                >
                  Pricing
                </Link>

                <Link
                  href="/blog"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-lg font-medium text-white/80 hover:text-white hover:bg-white/5"
                >
                  Blog
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 mt-4 rounded-lg bg-ember text-black text-center font-semibold text-sm uppercase tracking-wider"
                >
                  Contact Us
                </Link>
              </div>

              {/* Footer Info */}
              <div className="p-6 border-t border-white/10 bg-white/[0.02]">
                <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Get in Touch</p>
                <a href="mailto:sales@ajumiai.com" className="text-sm text-white/70 hover:text-ember transition-colors">
                  sales@ajumiai.com
                </a>
                <p className="text-sm text-white/70 mt-1">+1 (888) 511-9194</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
