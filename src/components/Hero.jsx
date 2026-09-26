import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTerminal, FaDownload, FaCopy, FaCheck, FaMapMarkerAlt } from "react-icons/fa";

export default function Hero({ personalInfo, copyEmail, copiedEmail, setCursorHovered, fadeInUp }) {
  return (
    <section id="about" className="pt-4">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12"
      >
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 shadow-sm shadow-cyan-500/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {personalInfo.subHeadline}
          </div>

          <div className="space-y-1">
            <p className="text-sm font-mono text-cyan-400 tracking-wider">Hi there, I am</p>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              {personalInfo.name}.
            </h1>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 tracking-tight pt-1">
              {personalInfo.title}
            </h2>
          </div>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
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
              href="/resume.pdf"
              download="Satyam_Singh_Resume.pdf"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="px-5 py-3 rounded-xl bg-[#0b1222] hover:bg-[#111c35] border border-cyan-500/40 text-cyan-300 hover:text-white font-medium text-xs tracking-wide transition flex items-center gap-2 active:scale-95 shadow-md shadow-cyan-950/50"
            >
              <FaDownload size={12} className="text-cyan-400" /> Download CV
            </a>

            <button
              onClick={copyEmail}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="px-4 py-3 rounded-xl bg-[#0b1222] hover:bg-[#111c35] border border-slate-800 text-slate-300 font-medium text-xs tracking-wide transition flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              {copiedEmail ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
              {copiedEmail ? "Copied!" : "Copy Email"}
            </button>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-3 pt-2 text-slate-400">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="p-3 rounded-xl bg-[#0b1222] border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 hover:scale-105 transition"
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
              className="p-3 rounded-xl bg-[#0b1222] border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 hover:scale-105 transition"
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
              className="p-3 rounded-xl bg-[#0b1222] border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 hover:scale-105 transition"
              title="LeetCode"
            >
              <FaTerminal size={15} />
            </a>
          </div>
        </div>

        <div className="relative shrink-0 group">
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-500/30 to-blue-600/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition duration-500" />
          <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-3xl overflow-hidden border-2 border-cyan-500/30 bg-[#080d1a] p-2.5 shadow-2xl">
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
            className="absolute -bottom-3 -left-3 px-3.5 py-1.5 rounded-full bg-[#080d1a]/95 border border-cyan-500/30 shadow-xl text-[11px] font-mono text-slate-300 flex items-center gap-1.5 backdrop-blur-md"
          >
            <FaMapMarkerAlt className="text-cyan-400" size={11} /> {personalInfo.location}
          </motion.div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 -right-3 px-3.5 py-1.5 rounded-full bg-[#080d1a]/95 border border-emerald-500/30 shadow-xl text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {personalInfo.status}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}