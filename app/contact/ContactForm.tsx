"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";

const services = ["SEO", "Paid Advertising", "Social Media", "Content Marketing", "Email & CRM", "Brand & Creative", "Not sure yet"];
const budgets = ["< $5k / month", "$5k – $15k / month", "$15k – $30k / month", "$30k+ / month"];

export function ContactForm() {
  return (
    <section className="px-8 md:px-14 max-w-[1500px] mx-auto pb-32 grid md:grid-cols-5 gap-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="md:col-span-2 space-y-8"
      >
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-white/50 mb-4">Studio</div>
          <p className="text-white/80 leading-relaxed">876 70th Street,<br /> Brooklyn, NY 11228-1013<br />United States</p>
        </div>
        <div className="space-y-4 text-sm">
          {[
            { icon: Phone, label: "+1 (888) 511-9194", href: "tel:+18885119194" },
            { icon: Mail, label: "sales@ajumiai.com", href: "mailto:sales@ajumiai.com" },
            { icon: MapPin, label: "Book a video call", href: "#" },
          ].map((c) => (
            <a key={c.label} href={c.href} className="flex items-center gap-4 group">
              <span className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-ember group-hover:text-ember transition-colors">
                <c.icon className="w-4 h-4" />
              </span>
              <span className="text-white/80 group-hover:text-ember transition-colors">{c.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-ember transition-colors" />
            </a>
          ))}
        </div>
        <div className="pt-8 border-t border-white/10 text-xs uppercase tracking-[0.25em] text-white/40">
          Response time: within 1 business day
        </div>
      </motion.div>

      <motion.form
        onSubmit={(e) => { e.preventDefault(); alert("Thanks — we'll be in touch shortly."); }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="md:col-span-3 space-y-8"
      >
        <div className="grid sm:grid-cols-2 gap-6">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.25em] text-white/50">Your name</span>
            <input required type="text" className="mt-2 w-full bg-transparent border-b border-white/20 py-3 focus:border-ember outline-none transition-colors" />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.25em] text-white/50">Work email</span>
            <input required type="email" className="mt-2 w-full bg-transparent border-b border-white/20 py-3 focus:border-ember outline-none transition-colors" />
          </label>
        </div>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.25em] text-white/50">Company</span>
          <input type="text" className="mt-2 w-full bg-transparent border-b border-white/20 py-3 focus:border-ember outline-none transition-colors" />
        </label>

        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-white/50">What do you need?</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {services.map((s) => (
              <label key={s} className="cursor-pointer">
                <input type="checkbox" className="peer sr-only" />
                <span className="inline-block px-4 py-2 rounded-full border border-white/15 text-sm text-white/70 hover:border-ember peer-checked:bg-ember peer-checked:text-black peer-checked:border-ember transition-colors">
                  {s}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-white/50">Budget</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {budgets.map((b) => (
              <label key={b} className="cursor-pointer">
                <input type="radio" name="budget" className="peer sr-only" />
                <span className="inline-block px-4 py-2 rounded-full border border-white/15 text-sm text-white/70 hover:border-ember peer-checked:bg-ember peer-checked:text-black peer-checked:border-ember transition-colors">
                  {b}
                </span>
              </label>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="text-xs uppercase tracking-[0.25em] text-white/50">Tell us about your project</span>
          <textarea rows={4} className="mt-2 w-full bg-transparent border-b border-white/20 py-3 focus:border-ember outline-none transition-colors resize-none" />
        </label>

        <div className="pt-4">
          <CTAButton>Send message</CTAButton>
        </div>
      </motion.form>
    </section>
  );
}
