"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Phone, Mail, MessageCircle, MessageSquareText } from "lucide-react";
import { PHONE_DISPLAY, TEL_HREF, SMS_HREF, WHATSAPP_HREF } from "@/lib/contact";

const faqs = [
  {
    q: "How long until I see results?",
    a: "It depends on the service. Paid ads can start bringing in leads within the first few weeks. SEO builds over time, and most businesses see steady movement after a few months. We'll give you a realistic timeline for your business and industry before you start, and you'll get a monthly report on progress.",
  },
  {
    q: "Is there a contract?",
    a: "Our plans are billed monthly. We confirm the exact term and how to cancel in writing before you start, so there are no surprises. Ask us on the call and we'll walk you through it.",
  },
  {
    q: "Is ad spend included in the price?",
    a: "No. Our fee covers the work of setting up and managing your campaigns. The money you spend on Google or Meta ads is paid directly to those platforms, and it's always under your control.",
  },
  {
    q: "Who will I be working with?",
    a: "You get a dedicated point of contact who knows your business, plus the specialists for each service. You'll always know who to call.",
  },
  {
    q: "How will I know it's working?",
    a: "You'll get a plain-English monthly report showing calls, leads and cost per lead, plus a call to go through it. No jargon and no vanity numbers.",
  },
  {
    q: "What services does Ajumi AI offer?",
    a: "Ajumi AI is a full-service digital marketing agency providing SEO and Local SEO, Google and Meta advertising, social media marketing, AI business automation, AI calling solutions, AI chatbots, CRM automation, website development, and conversion optimization."
  },
  {
    q: "Where is Ajumi AI based, and do you work with businesses outside New York?",
    a: "Ajumi AI is based in New York and serves businesses all over the United States. Everything we do, from meetings to reporting, works just as well remotely, so your location doesn't matter. Our solutions focus on search visibility, lead generation, customer acquisition, conversion, and measurable business growth."
  },
  {
    q: "What does a digital marketing agency do?",
    a: "A digital marketing agency helps businesses attract and convert customers through SEO, Local SEO, paid advertising, social media, websites, content, and CRM automation. Ajumi AI combines these services with AI and automation to build connected digital growth systems."
  },
  {
    q: "What makes Ajumi AI different from other online marketing agencies?",
    a: "We connect marketing with technology. Instead of treating SEO, advertising, websites, CRM, and automation as separate services, we build integrated systems that help businesses attract, convert, retain, and better serve customers."
  },
  {
    q: "Does Ajumi AI provide Local SEO and paid advertising?",
    a: "Yes. We provide Local SEO, Google Ads, and Meta Ads to improve search visibility, generate qualified leads, and increase campaign performance through technical optimization, audience targeting, creative testing, conversion tracking, and budget optimization."
  },
  {
    q: "Can Ajumi AI automate business processes and customer interactions?",
    a: "Yes. Our AI business automation, AI chatbot, and AI voice solutions can automate repetitive workflows, qualify leads, answer customer questions, schedule appointments, manage communication, and reduce manual operational work."
  },
  {
    q: "Can Ajumi AI manage one service or provide full-service marketing?",
    a: "Both. Businesses can choose a single service such as SEO, Local SEO, paid advertising, social media, website development, CRM automation, or AI solutions, or combine multiple services into a complete digital marketing and automation strategy."
  },
];

export function Contact() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="contact" className="relative py-20 md:py-24 px-8 md:px-14 max-w-[1500px] mx-auto">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="md:sticky md:top-28 md:self-start">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1 }}
            className="font-display text-[clamp(2.2rem,4vw,4rem)] leading-[1.05] tracking-tight text-balance"
          >
            Book your free <span className="text-ember italic">growth audit</span>.
          </motion.h2>
          <div className="mt-10 p-8 rounded-lg border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/50 mb-4"><span className="status-dot" aria-hidden />Quick Support</div>
            <p className="text-white/60 leading-relaxed">
              Missing calls, getting too few leads, or not sure your ad spend is working?
              Tell us what's going on and we'll show you what to fix first.
            </p>
            <div className="mt-8 space-y-4 text-sm">
              <a href={TEL_HREF} className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-ember group-hover:text-ember transition-colors">
                  <Phone className="w-4 h-4" />
                </span>
                <span className="text-white/80 group-hover:text-ember transition-colors">{PHONE_DISPLAY}</span>
              </a>
              <a href="mailto:sales@ajumiai.com" className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-ember group-hover:text-ember transition-colors">
                  <Mail className="w-4 h-4" />
                </span>
                <span className="text-white/80 group-hover:text-ember transition-colors">sales@ajumiai.com</span>
              </a>
              <a href={SMS_HREF} className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-ember group-hover:text-ember transition-colors">
                  <MessageSquareText className="w-4 h-4" />
                </span>
                <span className="text-white/80 group-hover:text-ember transition-colors">Text us</span>
              </a>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-ember group-hover:text-ember transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </span>
                <span className="text-white/80 group-hover:text-ember transition-colors">Message us on WhatsApp</span>
              </a>
              <a href="#" className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-ember group-hover:text-ember transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </span>
                <span className="text-white/80 group-hover:text-ember transition-colors">24/7 Live Chat</span>
              </a>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50 mb-6">
            <span className="text-ember">(09)</span>
            <span className="h-px w-8 bg-white/20" />
            <span>FAQs</span>
          </div>
          <h3 className="font-display text-3xl md:text-4xl leading-tight tracking-tight">Frequently asked questions</h3>
          <p className="mt-4 text-white/55 max-w-md">Quick answers to the most common questions about our services, process and collaboration.</p>

          <div className="mt-10 border-t border-white/10">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-b border-white/10">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between text-left py-6 group"
                >
                  <span className="font-display text-lg md:text-xl group-hover:text-ember transition-colors pr-6">{f.q}</span>
                  <span className={`w-9 h-9 rounded-full border border-white/15 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${open === i ? "rotate-45" : ""}`} style={open === i ? { background: "#ff5a2a", borderColor: "#ff5a2a", color: "#000" } : {}}>
                    <Plus className="w-4 h-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-14 text-white/60 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

