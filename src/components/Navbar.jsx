import { useState } from "react";
import { FaCopy, FaCheck, FaVolumeUp, FaVolumeMute, FaSearch, FaSun, FaMoon } from "react-icons/fa";
import { sound } from "../utils/audio";

export default function Navbar({ activeSection, setActiveSection, copyEmail, copiedEmail, setCursorHovered, name, onOpenPalette, theme, toggleTheme }) {
  const [muted, setMuted] = useState(false);
  const isDark = theme === "dark";

  const toggleSound = () => {
    sound.muted = !muted;
    setMuted(!muted);
    if (muted) sound.playClick();
  };

  return (
    <header className="fixed top-4 inset-x-0 z-40 flex justify-center px-4">
      <nav className={`flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-2.5 rounded-full backdrop-blur-xl border shadow-2xl text-xs font-medium transition-colors duration-300 ${
        isDark
          ? "bg-[#080d1a]/85 border-cyan-500/20 shadow-cyan-950/40 text-slate-400"
          : "bg-white/80 border-slate-200 shadow-sky-200/60 text-slate-600"
      }`}>
        <a
          href="#about"
          onMouseEnter={() => setCursorHovered(true)}
          onMouseLeave={() => setCursorHovered(false)}
          className={`font-mono font-bold tracking-wider hover:text-cyan-400 transition flex items-center gap-1 text-[13px] ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          <span className="text-cyan-400">&lt;</span>
          <span>{name}</span>
          <span className="text-cyan-400">/&gt;</span>
        </a>

        <span className={`w-px h-3.5 hidden sm:block ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />

        <div className="hidden md:flex items-center gap-4">
          {["About", "Skills", "Projects", "Education", "Contact"].map((sec) => (
            <a
              key={sec}
              href={`#${sec.toLowerCase()}`}
              onMouseEnter={() => {
                sound.playClick();
                setCursorHovered(true);
              }}
              onMouseLeave={() => setCursorHovered(false)}
              onClick={() => setActiveSection(sec.toLowerCase())}
              className={`transition-colors hover:text-cyan-400 ${
                activeSection === sec.toLowerCase()
                  ? "text-cyan-400 font-semibold"
                  : isDark
                    ? "text-slate-400"
                    : "text-slate-600"
              }`}
            >
              {sec}
            </a>
          ))}
        </div>

        <span className={`w-px h-3.5 ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />

        <button
          onClick={() => {
            sound.playClick();
            onOpenPalette();
          }}
          className={`flex items-center gap-1.5 px-2 py-1 rounded-md border text-[11px] font-mono transition cursor-pointer ${
            isDark
              ? "bg-slate-900 border-slate-800 text-cyan-400 hover:text-white"
              : "bg-slate-50 border-slate-200 text-cyan-600 hover:text-cyan-700"
          }`}
          title="Open Command Palette"
        >
          <FaSearch size={10} />
          <span className="hidden sm:inline">Ctrl+K</span>
        </button>

        <button
          onClick={toggleTheme}
          className={`p-1.5 rounded-md transition ${
            isDark ? "text-slate-300 hover:text-cyan-400" : "text-slate-700 hover:text-cyan-500"
          }`}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <FaSun size={12} /> : <FaMoon size={12} />}
        </button>

        <button
          onClick={toggleSound}
          className={`transition p-1 cursor-pointer ${
            isDark ? "text-slate-400 hover:text-cyan-400" : "text-slate-600 hover:text-cyan-500"
          }`}
          title={muted ? "Unmute Audio" : "Mute Audio"}
        >
          {muted ? <FaVolumeMute size={12} className="text-rose-400" /> : <FaVolumeUp size={12} className="text-emerald-400" />}
        </button>

        <button
          onClick={() => {
            sound.playSuccess();
            copyEmail();
          }}
          className={`flex items-center gap-1 transition font-mono cursor-pointer ${
            isDark ? "text-cyan-300 hover:text-white" : "text-cyan-700 hover:text-cyan-900"
          }`}
        >
          {copiedEmail ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
          <span className="hidden sm:inline">{copiedEmail ? "Copied" : "Email"}</span>
        </button>
      </nav>
    </header>
  );
}