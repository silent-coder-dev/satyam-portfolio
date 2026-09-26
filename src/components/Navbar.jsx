import React, { useState } from "react";
import { FaCopy, FaCheck, FaVolumeUp, FaVolumeMute, FaSearch } from "react-icons/fa";
import { sound } from "../utils/audio";

export default function Navbar({ activeSection, setActiveSection, copyEmail, copiedEmail, setCursorHovered, name, onOpenPalette }) {
  const [muted, setMuted] = useState(false);

  const toggleSound = () => {
    sound.muted = !muted;
    setMuted(!muted);
    if (muted) sound.playClick();
  };

  return (
    <header className="fixed top-4 inset-x-0 z-40 flex justify-center px-4">
      <nav className="flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-2.5 rounded-full bg-[#080d1a]/85 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-950/40 text-xs font-medium text-slate-400">
        <a
          href="#about"
          onMouseEnter={() => setCursorHovered(true)}
          onMouseLeave={() => setCursorHovered(false)}
          className="text-white font-mono font-bold tracking-wider hover:text-cyan-400 transition flex items-center gap-1 text-[13px]"
        >
          <span className="text-cyan-400">&lt;</span>
          <span>{name}</span>
          <span className="text-cyan-400">/&gt;</span>
        </a>

        <span className="w-px h-3.5 bg-slate-800 hidden sm:block" />

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
                activeSection === sec.toLowerCase() ? "text-cyan-400 font-semibold" : ""
              }`}
            >
              {sec}
            </a>
          ))}
        </div>

        <span className="w-px h-3.5 bg-slate-800" />

        {/* Command Palette Trigger */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenPalette();
          }}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-400 hover:text-white transition cursor-pointer"
          title="Open Command Palette"
        >
          <FaSearch size={10} />
          <span className="hidden sm:inline">Ctrl+K</span>
        </button>

        {/* Audio Synthesizer Toggle */}
        <button
          onClick={toggleSound}
          className="text-slate-400 hover:text-cyan-400 transition p-1 cursor-pointer"
          title={muted ? "Unmute Audio" : "Mute Audio"}
        >
          {muted ? <FaVolumeMute size={12} className="text-rose-400" /> : <FaVolumeUp size={12} className="text-emerald-400" />}
        </button>

        <button
          onClick={() => {
            sound.playSuccess();
            copyEmail();
          }}
          className="flex items-center gap-1 text-cyan-300 hover:text-white transition font-mono cursor-pointer"
        >
          {copiedEmail ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
          <span className="hidden sm:inline">{copiedEmail ? "Copied" : "Email"}</span>
        </button>
      </nav>
    </header>
  );
}