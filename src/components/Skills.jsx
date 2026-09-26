import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCodeBranch } from "react-icons/fa";
import { skillGroups, personalInfo } from "../data/portfolioData";

function AnimatedCounter({ target }) {
  const [val, setVal] = useState(0);
  const num = parseInt(target, 10) || 0;

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = num / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= num) {
        setVal(num);
        clearInterval(timer);
      } else {
        setVal(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [num]);

  return <span>{val}+</span>;
}

export default function Skills({ leetcodeSolved, githubRepos, setCursorHovered }) {
  return (
    <section id="skills" className="space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3.5 py-1 rounded-full">
          Tech Stack
        </span>
        <h2 className="text-3xl font-extrabold text-white">Skills &amp; Technologies</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {skillGroups.map((group, gIdx) => (
            <div
              key={gIdx}
              className="p-6 sm:p-7 rounded-2xl bg-[#080d1a]/70 border border-slate-800/80 space-y-4"
            >
              <h3 className="text-xs font-bold text-cyan-300 uppercase font-mono tracking-wider">
                {group.category}
              </h3>
              <div className="space-y-3.5">
                {group.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-300">
                      <span>{skill.name}</span>
                      <span className="text-cyan-400 font-mono">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.85, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${group.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Interactive Commit Activity Strip */}
          <div className="p-4 rounded-2xl bg-[#080d1a]/70 border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <FaCodeBranch className="text-cyan-400" />
              <span>Production Pipeline Status:</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Active CI/CD • Zero Downtime
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <motion.a
            href={personalInfo.leetcode}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group block p-6 rounded-2xl bg-[#080d1a]/70 border border-slate-800/80 hover:border-amber-500/50 transition duration-300 relative overflow-hidden shadow-lg hover:shadow-amber-500/10 cursor-pointer"
          >
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[9px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Sync
            </div>

            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 group-hover:border-amber-500/40 flex items-center justify-center text-amber-400 font-mono text-lg font-bold transition">
                LC
              </div>
              <div className="flex items-center gap-1">
                <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition">
                  LeetCode
                </h4>
                <FaExternalLinkAlt size={10} className="text-slate-500 group-hover:text-amber-400 transition" />
              </div>
              <p className="text-xs text-slate-500 font-mono">@{personalInfo.leetcodeUsername}</p>
              <div className="pt-2">
                <span className="text-3xl font-extrabold text-white group-hover:text-amber-300 transition">
                  <AnimatedCounter target={leetcodeSolved} />
                </span>
                <span className="block text-[11px] font-mono text-slate-400 uppercase">
                  DSA Problems Solved
                </span>
              </div>
            </div>
          </motion.a>

          <motion.a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group block p-6 rounded-2xl bg-[#080d1a]/70 border border-slate-800/80 hover:border-cyan-500/50 transition duration-300 relative overflow-hidden shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
          >
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[9px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Sync
            </div>

            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 group-hover:border-cyan-500/40 flex items-center justify-center text-cyan-400 transition">
                <FaGithub size={22} />
              </div>
              <div className="flex items-center gap-1">
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition">
                  GitHub
                </h4>
                <FaExternalLinkAlt size={10} className="text-slate-500 group-hover:text-cyan-400 transition" />
              </div>
              <p className="text-xs text-slate-500 font-mono">@{personalInfo.githubUsername}</p>
              <div className="pt-2">
                <span className="text-3xl font-extrabold text-white group-hover:text-cyan-300 transition">
                  <AnimatedCounter target={githubRepos} />
                </span>
                <span className="block text-[11px] font-mono text-slate-400 uppercase">
                  Public Repositories
                </span>
              </div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}