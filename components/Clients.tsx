"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "AETHER", logo: "A E T H E R" },
  { name: "APEX", logo: "A P E X" },
  { name: "VORTEX", logo: "V O R T E X" },
  { name: "LUMEN", logo: "L U M E N" },
  { name: "SYNERGY", logo: "S Y N E R G Y" },
  { name: "ELEVATE", logo: "E L E V A T E" }
];

export function Clients() {
  return (
    <section className="border-b border-white/5 bg-[#050505] py-20 px-8 md:px-14">
      <div className="max-w-[1500px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40">
            Trusted by ambitious teams worldwide
          </span>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, color: "#ff5a2a" }}
              className="text-white/30 text-sm md:text-base font-bold tracking-[0.3em] font-sans transition-all duration-300 hover:text-ember cursor-default"
            >
              {p.logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

