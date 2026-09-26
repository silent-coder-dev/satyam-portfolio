import React from "react";
import { motion } from "framer-motion";
import { FaServer, FaRobot, FaDocker } from "react-icons/fa";

export default function Pillars() {
  const cards = [
    {
      icon: <FaServer className="text-cyan-400" size={20} />,
      title: "Backend Development",
      desc: "Building RESTful web services, structuring clean service layers, and managing relational databases with Spring Boot."
    },
    {
      icon: <FaRobot className="text-emerald-400" size={20} />,
      title: "AI Integration & Full Stack",
      desc: "Connecting LLMs (like Gemini API) to frontend interfaces to build smart workflows like ATS resume generators."
    },
    {
      icon: <FaDocker className="text-blue-400" size={20} />,
      title: "Modern Dev Workflow",
      desc: "Proficient with Git version control, multi-stage Docker packaging, Postman API testing, and Vercel/Render deployments."
    }
  ];

  return (
    <section className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3.5 py-1 rounded-full">
          What I Bring
        </span>
        <h2 className="text-3xl font-extrabold text-white">Strong Fundamentals &amp; Quick Learning</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4, borderColor: "rgba(14, 165, 233, 0.5)" }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-2xl bg-[#080d1a]/60 border border-slate-800/80 shadow-lg hover:bg-[#0c1426] transition"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center mb-4">
              {card.icon}
            </div>
            <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}