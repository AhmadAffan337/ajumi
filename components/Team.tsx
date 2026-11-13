"use client";

import { motion } from "framer-motion";
import { team } from "@/lib/team";



export function Team() {
  return (
    <section id="team" className="relative py-20 md:py-24 overflow-hidden">
      <div className="px-8 md:px-14 max-w-[1500px] mx-auto">
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
          <span className="text-ember">(05)</span>
          <span className="h-px w-8 bg-white/20" />
          <span>Our Team</span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          className="font-display text-[clamp(3rem,10vw,10rem)] leading-[0.9] tracking-tighter"
        >
          The <span className="text-ember italic">people</span>.
        </motion.h2>
      </div>

      <div className="mt-16 border-t border-white/5" />

      <div className="px-8 md:px-14 max-w-[1500px] mx-auto mt-20 grid md:grid-cols-3 gap-8">
        {team.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.12 }}
            className="group"
          >
            <motion.div
              whileHover="hover"
              initial="initial"
              className="relative aspect-[3/4] rounded-lg overflow-hidden border border-white/10 bg-[#0d0d0d] group cursor-pointer"
            >
              <motion.img
                src={m.image}
                alt={m.name}
                variants={{
                  hover: { scale: 1.05 }
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

              <div className="absolute inset-0 flex items-end justify-center p-8 pointer-events-none">
                <div className="font-display text-[7rem] md:text-[8rem] leading-none opacity-10 text-white select-none">
                  {m.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
              </div>
            </motion.div>
            <h3 className="mt-6 font-display text-2xl">{m.name}</h3>
            <p className="text-white/50 text-sm mt-1">{m.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

