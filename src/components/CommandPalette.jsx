import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTerminal, FaCode, FaPaperPlane, FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import { personalInfo } from "../data/portfolioData";
import { sound } from "../utils/audio";

export default function CommandPalette({ isOpen, setIsOpen, theme }) {
  const isDark = theme === "dark";
  const [query, setQuery] = useState("");

  const actions = [
    {
      id: "resume-builder",
      title: "Open AI Resume Builder (Live)",
      category: "Projects",
      icon: <FaExternalLinkAlt className="text-cyan-400" />,
      run: () => window.open(personalInfo.liveResumeBuilder || "https://ai-resume-builder-silent.vercel.app/", "_blank")
    },
    {
      id: "supportdesk",
      title: "View SupportDesk CRM API",
      category: "Projects",
      icon: <FaCode className="text-emerald-400" />,
      run: () => window.open("https://support-desk-crm-qs00.onrender.com/tickets", "_blank")
    },
    {
      id: "jump-projects",
      title: "Scroll to Featured Projects",
      category: "Navigation",
      icon: <FaTerminal className="text-blue-400" />,
      run: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "jump-skills",
      title: "Scroll to Tech Stack",
      category: "Navigation",
      icon: <FaTerminal className="text-cyan-400" />,
      run: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "download-cv",
      title: "Download Verified Resume (PDF)",
      category: "Actions",
      icon: <FaDownload className="text-teal-400" />,
      run: () => {
        const link = document.createElement("a");
        link.href = "/RESUME.pdf";
        link.download = "Satyam_Singh_Resume.pdf";
        link.click();
      }
    },
    {
      id: "contact",
      title: "Direct Email Form",
      category: "Contact",
      icon: <FaPaperPlane className="text-pink-400" />,
      run: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }
    }
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        sound.playClick();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className={`relative w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden z-10 ${
              isDark ? "bg-[#080d1a] border-cyan-500/30 shadow-cyan-950/80" : "bg-white border-cyan-200 shadow-cyan-200/70"
            }`}
          >
            <div className={`flex items-center gap-3 px-4 py-3.5 border-b ${isDark ? "border-slate-800" : "border-slate-200"}`}>
              <FaSearch className="text-cyan-400 text-sm" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or jump to section..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`w-full bg-transparent text-xs font-mono outline-none ${
                  isDark ? "text-white placeholder-slate-500" : "text-slate-800 placeholder-slate-500"
                }`}
              />
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                isDark ? "bg-slate-900 border border-slate-800 text-slate-400" : "bg-slate-100 border border-slate-200 text-slate-600"
              }`}>
                ESC
              </span>
            </div>

            <div className="max-h-72 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className={`p-6 text-center text-xs font-mono ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                  No commands matching &quot;{query}&quot;
                </div>
              ) : (
                filtered.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playSuccess();
                      item.run();
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition border ${
                      isDark ? "hover:bg-cyan-950/40 border-transparent hover:border-cyan-500/20" : "hover:bg-cyan-50 border-transparent hover:border-cyan-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${
                        isDark ? "bg-slate-900/80 border-slate-800 group-hover:border-cyan-500/40" : "bg-slate-100 border-slate-200"
                      }`}>
                        {item.icon}
                      </div>
                      <span className={isDark ? "text-slate-200 group-hover:text-white font-medium" : "text-slate-700 group-hover:text-slate-900 font-medium"}>
                        {item.title}
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono uppercase ${isDark ? "text-slate-500" : "text-slate-500"}`}>
                      {item.category}
                    </span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}