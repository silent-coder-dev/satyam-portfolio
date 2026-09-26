import React from "react";
import { FaGraduationCap } from "react-icons/fa";

export default function Education() {
  return (
    <section id="education" className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs uppercase tracking-widest font-mono text-cyan-400">
          Academic Background
        </span>
        <h2 className="text-3xl font-bold text-white mt-1">Education</h2>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="p-7 rounded-3xl bg-[#080d1a]/60 border border-slate-800/90 flex items-start gap-5 hover:border-cyan-500/30 transition">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
            <FaGraduationCap size={22} />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-mono text-cyan-400 font-semibold">2021 — 2026</span>
            <h3 className="text-lg font-bold text-white">
              Bachelor of Technology in Computer Engineering
            </h3>
            <p className="text-xs text-slate-400">University of Mumbai &bull; CGPA: 7.12 / 10</p>
            <p className="text-xs text-slate-400 pt-1 leading-relaxed">
              Core coursework in Object-Oriented Programming, Data Structures, Relational Databases, and Operating Systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}