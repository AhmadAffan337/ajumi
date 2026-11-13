"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MessageCircle,
  MessageSquareText,
  ShieldCheck,
  Award
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PHONE_DISPLAY, TEL_HREF, SMS_HREF, WHATSAPP_HREF } from "@/lib/contact";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Footer() {
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/ajumiai",
      icon: InstagramIcon,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/1BfHbWt22v/",
      icon: FacebookIcon,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/ajumi-ai/",
      icon: LinkedinIcon,
    },
    {
      name: "YouTube",
      url: "https://youtube.com",
      icon: YoutubeIcon,
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: TwitterIcon,
    },
    {
      name: "GitHub",
      url: "https://github.com",
      icon: GithubIcon,
    },
  ];

  return (
    <footer className="relative pt-24 pb-12 px-8 md:px-14 border-t border-white/10 bg-[#040404]">
      <div className="max-w-[1500px] mx-auto">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-10 text-sm items-start">
          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1 }}
            >
              <Image
                src="/images/ajumi-logo-orange.png"
                alt="Ajumi Logo"
                width={500}
                height={150}
                className="h-28 md:h-36 w-auto object-contain shrink-0"
              />
            </motion.div>

            <p className="text-white/50 text-xs leading-relaxed font-light">
              Engineering full-stack digital growth through technical SEO, AI agents, cloud software, and performance media.
            </p>

            {/* Visual Partner Badges */}
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[10px] text-white/60">
                <ShieldCheck className="w-3 h-3 text-ember" /> Google Partner
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[10px] text-white/60">
                <Award className="w-3 h-3 text-ember" /> Accurate Ad Tracking
              </span>
            </div>
          </div>

          {/* Col 2: Studio Location */}
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4 font-semibold">Studio</div>
            <p className="text-white/60 leading-relaxed mb-4 font-light">
            876 70th Street,<br /> Brooklyn, NY 11228-1013,<br /> United States
            </p>
            <a href="mailto:sales@ajumiai.com" className="inline-flex items-center gap-2 text-white/80 hover:text-ember transition-colors">
              <Mail className="w-3.5 h-3.5 text-ember" /> sales@ajumiai.com
            </a>
            <div className="mt-3 flex flex-col gap-2 text-white/80">
              <a href={TEL_HREF} className="inline-flex items-center gap-2 hover:text-ember transition-colors">
                <Phone className="w-3.5 h-3.5 text-ember" /> {PHONE_DISPLAY}
              </a>
              <a href={SMS_HREF} className="inline-flex items-center gap-2 hover:text-ember transition-colors">
                <MessageSquareText className="w-3.5 h-3.5 text-ember" /> Text us
              </a>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-ember transition-colors">
                <MessageCircle className="w-3.5 h-3.5 text-ember" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Col 3: Sitemap */}
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4 font-semibold">Sitemap</div>
            <ul className="space-y-2.5 text-white/70">
              {[
                { to: "/about", label: "About Us" },
                { to: "/services", label: "Our Services" },
                { to: "/work", label: "Case Studies" },
                { to: "/pricing", label: "Pricing Plans" },
                { to: "/blog", label: "Insights & Blog" },
                { to: "/contact", label: "Contact Us" },
              ].map((l) => (
                <li key={l.to}>
                  <Link href={l.to} className="hover:text-ember transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Social Channels & Icons */}
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4 font-semibold">Connect With Us</div>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="p-3 rounded-full border border-white/10 bg-white/[0.02] hover:bg-ember/10 hover:border-ember/40 text-white/70 hover:text-ember transition-all duration-300 group"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
            <div className="mt-6 space-y-2">
              {socialLinks.slice(0, 3).map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-xs text-white/60 hover:text-ember transition-colors py-1 border-b border-white/5"
                >
                  <span>Follow on {s.name}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 5: Newsletter */}
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4 font-semibold">Growth Newsletter</div>
            <p className="text-white/60 mb-4 text-xs leading-relaxed font-light">
              Get a short, practical email every two weeks on getting found in AI search, ads that pay off, and growing with technology.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <input
                type="email"
                placeholder="enter your email..."
                className="w-full bg-transparent border-b border-white/20 py-3 pr-10 text-xs text-white placeholder:text-white/30 focus:border-ember outline-none transition-colors"
                suppressHydrationWarning
              />
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60 hover:text-ember transition-colors p-1"
                aria-label="Subscribe"
              >
                <ArrowUpRight className="w-5 h-5 text-ember" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-white/40">
          <span>© 2026 Ajumi AI. All rights reserved.</span>
          {/* <span className="flex gap-6">
            <a href="#" className="hover:text-ember transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-ember transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-ember transition-colors">Cookies</a>
          </span> */}
        </div>
      </div>
    </footer>
  );
}
