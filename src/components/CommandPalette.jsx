import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTerminal, FaCode, FaPaperPlane, FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import { personalInfo } from "../data/portfolioData";
import { sound } from "../utils/audio";

export default function CommandPalette({ isOpen, setIsOpen }) {
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
        link.href = "/resume.pdf";
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
            className="relative w-full max-w-lg rounded-2xl bg-[#080d1a] border border-cyan-500/30 shadow-2xl shadow-cyan-950/80 overflow-hidden z-10"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800">
              <FaSearch className="text-cyan-400 text-sm" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or jump to section..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-slate-500 text-xs font-mono outline-none"
              />
              <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-400">
                ESC
              </span>
            </div>

            <div className="max-h-72 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="p-6 text-center text-xs font-mono text-slate-500">
                  No commands matching "{query}"
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
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-cyan-950/40 text-left text-xs transition border border-transparent hover:border-cyan-500/20 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 group-hover:border-cyan-500/40">
                        {item.icon}
                      </div>
                      <span className="text-slate-200 group-hover:text-white font-medium">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
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