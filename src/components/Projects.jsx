import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode, FaCheck, FaCopy } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { projectsData } from "../data/portfolioData";
import { sound } from "../utils/audio";

function ProjectCard({ proj, fadeInUp, setCursorHovered, copyCurl, copiedCurl, isDark }) {
  const cardRef = useRef(null);
  const [imageFailed, setImageFailed] = useState(false);
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
      className={`group relative rounded-3xl border shadow-2xl transition-all duration-200 flex flex-col overflow-hidden ${
        isDark ? "bg-[#080d1a]/80 border-slate-800/90" : "bg-white/80 border-slate-200 shadow-sky-100/70"
      }`}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(6, 182, 212, 0.15), transparent 80%)`
        }}
      />

      <div className={`px-5 py-3 border-b flex items-center justify-between ${
        isDark ? "bg-[#050914] border-slate-800/80" : "bg-slate-50 border-slate-200"
      }`}>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className={`text-[11px] font-mono truncate max-w-[190px] ${isDark ? "text-slate-500" : "text-slate-500"}`}>
          {proj.route}
        </span>
        <div className="w-4" />
      </div>

      <div className={`relative aspect-[16/9] overflow-hidden border-b ${
        isDark ? "border-slate-800/80 bg-slate-950" : "border-slate-200 bg-slate-100"
      }`}>
        {!imageFailed ? (
          <img
            src={proj.image}
            alt={`${proj.title} project preview`}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className={`flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br ${
            isDark ? "from-slate-900 via-slate-950 to-cyan-950/60" : "from-white via-slate-50 to-cyan-100"
          }`}>
            <FaCode className="text-[var(--primary-color)]" size={22} />
            <span className={`text-[10px] font-mono uppercase tracking-[0.2em] ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}>Project preview</span>
            <code className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-500"}`}>{proj.image}</code>
          </div>
        )}
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
                  className={`p-2 rounded-lg border transition ${
                    isDark ? "text-slate-400 bg-[#0b1222] border-slate-800 hover:text-white hover:border-cyan-500/40" : "text-slate-600 bg-slate-50 border-slate-200 hover:text-slate-900 hover:border-cyan-300"
                  }`}
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

          <h3 className={`text-lg font-bold transition mb-1 ${isDark ? "text-white group-hover:text-cyan-400" : "text-slate-900 group-hover:text-cyan-500"}`}>
            {proj.title}
          </h3>
          <p className={`text-xs font-mono mb-3 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{proj.subtitle}</p>
          <p className={`text-xs leading-relaxed mb-4 ${isDark ? "text-slate-300" : "text-slate-600"}`}>{proj.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {proj.tags.map((t, tIdx) => (
              <span
                key={tIdx}
                className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                  isDark ? "bg-[#040814] text-cyan-300/90 border-cyan-500/20" : "bg-cyan-50 text-cyan-700 border-cyan-200"
                }`}
              >
                {t}
              </span>
            ))}
          </div>

          {proj.curl && (
            <div className={`mt-3 p-3 rounded-xl border font-mono text-[10px] relative group/curl ${
              isDark ? "bg-[#040814] border-slate-800" : "bg-slate-50 border-slate-200"
            }`}>
              <div className={`flex justify-between items-center pb-1.5 border-b mb-2 ${
                isDark ? "text-slate-500 border-slate-800/70" : "text-slate-500 border-slate-200"
              }`}>
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
              <pre className={`overflow-x-auto whitespace-pre-wrap leading-tight ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                {proj.curl}
              </pre>
            </div>
          )}
        </div>

        <div className={`pt-3 border-t ${isDark ? "border-slate-800/80" : "border-slate-200"}`}>
          <ul className={`space-y-1.5 text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
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

export default function Projects({ fadeInUp, setCursorHovered, copyCurl, copiedCurl, theme }) {
  const isDark = theme === "dark";

  return (
    <section id="projects" className="space-y-8">
      <div className={`flex items-center justify-between border-b pb-4 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
        <div>
          <span className={`text-xs uppercase tracking-widest font-mono flex items-center gap-1.5 ${isDark ? "text-cyan-400" : "text-cyan-700"}`}>
            <HiSparkles size={14} /> My Projects
          </span>
          <h2 className={`text-3xl font-bold mt-1 ${isDark ? "text-white" : "text-slate-900"}`}>Featured Work</h2>
        </div>
        <span className={`text-xs font-mono ${isDark ? "text-slate-500" : "text-slate-500"}`}>01 — 03</span>
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
            isDark={isDark}
          />
        ))}
      </div>
    </section>
  );
}