import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTerminal, FaDownload, FaCopy, FaCheck, FaMapMarkerAlt } from "react-icons/fa";

export default function Hero({ personalInfo, copyEmail, copiedEmail, setCursorHovered, fadeInUp, theme }) {
  const isDark = theme === "dark";

  return (
    <section id="about" className="pt-4">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12"
      >
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono shadow-sm ${
            isDark
              ? "bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 shadow-cyan-500/10"
              : "bg-cyan-50 border border-cyan-200 text-cyan-700 shadow-cyan-200/50"
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {personalInfo.subHeadline}
          </div>

          <div className="space-y-1">
            <p className="text-sm font-mono text-cyan-400 tracking-wider">Hi there, I am</p>
            <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              {personalInfo.name}.
            </h1>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 tracking-tight pt-1">
              {personalInfo.title}
            </h2>
          </div>

          <p className={`text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}>
            {personalInfo.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
            <a
              href="#projects"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs tracking-wide transition shadow-lg shadow-cyan-500/25 active:scale-95"
            >
              View My Work &rarr;
            </a>

            <a
              href="/resume.pdf?v=20261006"
              download="Satyam_Singh_Resume.pdf"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className={`px-5 py-3 rounded-xl border font-medium text-xs tracking-wide transition flex items-center gap-2 active:scale-95 shadow-md ${
                isDark
                  ? "bg-[#0b1222] hover:bg-[#111c35] border-cyan-500/40 text-cyan-300 hover:text-white shadow-cyan-950/50"
                  : "bg-white hover:bg-slate-50 border-cyan-200 text-cyan-700 hover:text-cyan-900 shadow-cyan-200/60"
              }`}
            >
              <FaDownload size={12} className="text-cyan-400" /> Download CV
            </a>

            <button
              onClick={copyEmail}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className={`px-4 py-3 rounded-xl border font-medium text-xs tracking-wide transition flex items-center gap-2 active:scale-95 cursor-pointer ${
                isDark
                  ? "bg-[#0b1222] hover:bg-[#111c35] border-slate-800 text-slate-300"
                  : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
              }`}
            >
              {copiedEmail ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
              {copiedEmail ? "Copied!" : "Copy Email"}
            </button>
          </div>

          <div className={`flex items-center justify-center lg:justify-start gap-3 pt-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className={`p-3 rounded-xl border hover:text-cyan-400 hover:border-cyan-500/40 hover:scale-105 transition ${
                isDark ? "bg-[#0b1222] border-slate-800" : "bg-white border-slate-200"
              }`}
              title="GitHub"
            >
              <FaGithub size={16} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className={`p-3 rounded-xl border hover:text-cyan-400 hover:border-cyan-500/40 hover:scale-105 transition ${
                isDark ? "bg-[#0b1222] border-slate-800" : "bg-white border-slate-200"
              }`}
              title="LinkedIn"
            >
              <FaLinkedin size={16} />
            </a>
            <a
              href={personalInfo.leetcode}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className={`p-3 rounded-xl border hover:text-cyan-400 hover:border-cyan-500/40 hover:scale-105 transition ${
                isDark ? "bg-[#0b1222] border-slate-800" : "bg-white border-slate-200"
              }`}
              title="LeetCode"
            >
              <FaTerminal size={15} />
            </a>
          </div>
        </div>

        <div className="relative shrink-0 group">
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-500/30 to-blue-600/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition duration-500" />
          <div className={`relative w-64 h-72 sm:w-72 sm:h-80 rounded-3xl overflow-hidden border-2 p-2.5 shadow-2xl ${
            isDark ? "border-cyan-500/30 bg-[#080d1a]" : "border-cyan-200 bg-white shadow-cyan-200/60"
          }`}>
            <img
              src="/avatar.jpg"
              alt={personalInfo.name}
              onError={(e) => {
                e.target.src = "/favicon.jpg";
              }}
              className="w-full h-full rounded-2xl object-cover object-top filter contrast-105 group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-x-2.5 bottom-2.5 py-2 px-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-b-2xl text-center">
              <p className="text-white font-mono font-bold text-xs tracking-wider">{personalInfo.name}</p>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute -bottom-3 -left-3 px-3.5 py-1.5 rounded-full border shadow-xl text-[11px] font-mono flex items-center gap-1.5 backdrop-blur-md ${
              isDark
                ? "bg-[#080d1a]/95 border-cyan-500/30 text-slate-300"
                : "bg-white/90 border-cyan-200 text-slate-700 shadow-cyan-100/80"
            }`}
          >
            <FaMapMarkerAlt className="text-cyan-400" size={11} /> {personalInfo.location}
          </motion.div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute -top-3 -right-3 px-3.5 py-1.5 rounded-full border shadow-xl text-[11px] font-mono flex items-center gap-1.5 backdrop-blur-md ${
              isDark
                ? "bg-[#080d1a]/95 border-emerald-500/30 text-emerald-400"
                : "bg-white/90 border-emerald-200 text-emerald-600 shadow-emerald-100/80"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {personalInfo.status}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}