import React from "react";
import { motion } from "framer-motion";
import { metricsData } from "../data/portfolioData";

export default function Metrics() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metricsData.map((item, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -3, borderColor: "rgba(14, 165, 233, 0.4)" }}
          className="p-5 rounded-2xl bg-[#080d1a]/70 border border-slate-800/80 backdrop-blur-sm text-center transition duration-200"
        >
          <span className="text-[10px] font-mono uppercase text-cyan-400 block mb-1">
            {item.label}
          </span>
          <span className="text-sm sm:text-base font-bold text-white">{item.val}</span>
        </motion.div>
      ))}
    </section>
  );
}