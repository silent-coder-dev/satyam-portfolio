import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode, FaCheck, FaCopy } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { projectsData } from "../data/portfolioData";
import { sound } from "../utils/audio";

function ProjectCard({ proj, fadeInUp, setCursorHovered, copyCurl, copiedCurl }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["9deg", "-9deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-9deg", "9deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
    cardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
    cardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setCursorHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        sound.playClick();
        setCursorHovered(true);
      }}
      onMouseLeave={handleMouseLeave}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group relative rounded-3xl bg-[#080d1a]/80 border border-slate-800/90 shadow-2xl transition-all duration-200 flex flex-col overflow-hidden"
    >
      {/* Dynamic Cursor Torchlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(6, 182, 212, 0.15), transparent 80%)`
        }}
      />

      {/* MacOS Window Header */}
      <div className="px-5 py-3 bg-[#050914] border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[11px] font-mono text-slate-500 truncate max-w-[190px]">
          {proj.route}
        </span>
        <div className="w-4" />
      </div>

      <div className="p-6 sm:p-7 flex flex-col space-y-4 relative z-20">
        <div>
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${proj.badgeStyle}`}>
              {proj.badge}
            </span>

            <div className="flex items-center gap-2">
              {proj.github && (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg text-slate-400 bg-[#0b1222] border border-slate-800 hover:text-white hover:border-cyan-500/40 transition"
                  title="View Repository"
                >
                  <FaGithub size={13} />
                </a>
              )}
              {proj.live && (
                <a
                  href={proj.live}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg text-black bg-cyan-400 hover:bg-cyan-300 transition"
                  title="Open Live Website"
                >
                  <FaExternalLinkAlt size={11} />
                </a>
              )}
            </div>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition mb-1">
            {proj.title}
          </h3>
          <p className="text-xs text-slate-400 font-mono mb-3">{proj.subtitle}</p>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">{proj.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {proj.tags.map((t, tIdx) => (
              <span
                key={tIdx}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#040814] text-cyan-300/90 border border-cyan-500/20"
              >
                {t}
              </span>
            ))}
          </div>

          {proj.curl && (
            <div className="mt-3 p-3 rounded-xl bg-[#040814] border border-slate-800 font-mono text-[10px] relative group/curl">
              <div className="flex justify-between items-center text-slate-500 pb-1.5 border-b border-slate-800/70 mb-2">
                <span className="flex items-center gap-1 text-[9px]">
                  <FaCode size={10} className="text-cyan-400" /> API Test cURL
                </span>
                <button
                  onClick={copyCurl}
                  className="text-cyan-400 hover:text-white transition flex items-center gap-1 text-[9px] cursor-pointer"
                >
                  {copiedCurl ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                  {copiedCurl ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="text-slate-300 overflow-x-auto whitespace-pre-wrap leading-tight">
                {proj.curl}
              </pre>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-slate-800/80">
          <ul className="space-y-1.5 text-xs text-slate-400">
            {proj.points.map((pt, pIdx) => (
              <li key={pIdx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ fadeInUp, setCursorHovered, copyCurl, copiedCurl }) {
  return (
    <section id="projects" className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 flex items-center gap-1.5">
            <HiSparkles size={14} /> My Projects
          </span>
          <h2 className="text-3xl font-bold text-white mt-1">Featured Work</h2>
        </div>
        <span className="text-xs font-mono text-slate-500">01 — 03</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {projectsData.map((proj, idx) => (
          <ProjectCard
            key={idx}
            proj={proj}
            fadeInUp={fadeInUp}
            setCursorHovered={setCursorHovered}
            copyCurl={copyCurl}
            copiedCurl={copiedCurl}
          />
        ))}
      </div>
    </section>
  );
}