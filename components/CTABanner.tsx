"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CTAButton } from "./CTAButton";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function CTABanner() {
  const router = useRouter();

  const handleStartProject = () => {
    router.push('/contact');
  };

  const handleTalkToTeam = () => {
    router.push('/contact');
  };

  return (
    <section id="cta" className="relative py-20 md:py-24 px-8 md:px-14">
      <div className="max-w-[1500px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE }}
          className="relative overflow-hidden rounded-2xl border border-white/[0.08] p-8 md:p-16"
          style={{ background: "linear-gradient(135deg, rgba(255,90,42,0.09), rgba(255,90,42,0.02) 50%, transparent 100%)" }}
        >
          {/* Glow */}
          <div
            aria-hidden
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,90,42,0.3), transparent 65%)", filter: "blur(60px)" }}
          />
          {/* Grid texture */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
              <span className="text-ember">(05)</span>
              <span className="h-px w-8 bg-white/20" />
              <span>Let's Work Together</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
                  className="font-display text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.98] tracking-tight"
                >
                  Ready to scale
                  <br />
                  <span className="shine-text italic">market share?</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2, ease: EASE }}
                  className="mt-6 max-w-xl text-white/65 leading-relaxed text-base md:text-lg font-light"
                >
                  Book a free growth strategy audit with our technical SEO architects and performance media buying team to unlock your next level of compounding online revenue.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="flex flex-wrap gap-4 flex-shrink-0"
              >
                <CTAButton onClick={handleStartProject}>Start a project</CTAButton>
                <CTAButton variant="ghost" onClick={handleTalkToTeam}>Talk to our team</CTAButton>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

