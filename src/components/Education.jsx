import { FaGraduationCap } from "react-icons/fa";

export default function Education({ theme }) {
  const isDark = theme === "dark";

  return (
    <section id="education" className="space-y-8">
      <div className={`border-b pb-4 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
        <span className={`text-xs uppercase tracking-widest font-mono ${isDark ? "text-cyan-400" : "text-cyan-700"}`}>
          Academic Background
        </span>
        <h2 className={`text-3xl font-bold mt-1 ${isDark ? "text-white" : "text-slate-900"}`}>Education</h2>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className={`p-7 rounded-3xl border flex items-start gap-5 transition ${
          isDark ? "bg-[#080d1a]/60 border-slate-800/90 hover:border-cyan-500/30" : "bg-white/80 border-slate-200 hover:border-cyan-300 shadow-lg shadow-sky-100/60"
        }`}>
          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${
            isDark ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" : "bg-cyan-50 border-cyan-200 text-cyan-600"
          }`}>
            <FaGraduationCap size={22} />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-mono text-cyan-400 font-semibold">2021 — 2026</span>
            <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
              Bachelor of Technology in Computer Engineering
            </h3>
            <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              University of Mumbai &bull; CGPA: 7.12 / 10
            </p>
            <p className={`text-xs pt-1 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Core coursework in Object-Oriented Programming, Data Structures, Relational Databases, and Operating Systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}