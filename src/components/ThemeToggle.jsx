import { useState, useRef, useEffect } from "react";
import { FaMoon, FaSun, FaPalette, FaDice, FaCheck } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { DARK_THEME_COLORS, LIGHT_THEME_COLORS } from "../utils/themeColors";

export default function ThemeToggle({ isDark, toggle, themeColors, onSelectColorIndex, onToggleShuffle }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const currentList = isDark ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;
  const activeIndex = isDark ? themeColors?.darkIndex : themeColors?.lightIndex;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 18, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 22, delay: 0.12 }}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute bottom-16 right-0 w-64 p-3.5 rounded-2xl border shadow-2xl backdrop-blur-xl ${
              isDark ? "bg-slate-900/85 border-slate-700/60" : "bg-white/90 border-slate-200 shadow-sky-100/80"
            }`}
          >
            <div className={`flex items-center justify-between mb-3 pb-2 border-b ${isDark ? "border-slate-700/60" : "border-slate-200"}`}>
              <span className={`text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 ${isDark ? "text-slate-100" : "text-slate-800"}`}>
                <FaPalette className="w-3.5 h-3.5 text-cyan-400" />
                Accent Palette
              </span>
              <button
                onClick={onToggleShuffle}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                  themeColors?.isShuffle
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : isDark
                      ? "bg-slate-800 text-slate-300 hover:text-white"
                      : "bg-slate-100 text-slate-600 hover:text-slate-900"
                }`}
                title="Shuffle accent color automatically on each reload"
              >
                <FaDice className={`w-3 h-3 ${themeColors?.isShuffle ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }} />
                <span>{themeColors?.isShuffle ? "Shuffle On" : "Shuffle Off"}</span>
              </button>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {currentList.map((item, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <button
                    key={item.name}
                    onClick={() => onSelectColorIndex(idx)}
                    title={item.name}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer shadow-md ${
                      isSelected ? "ring-2 ring-slate-200 scale-110" : ""
                    }`}
                    style={{ backgroundColor: item.hex }}
                    aria-label={`Select ${item.name}`}
                  >
                    {isSelected && <FaCheck className="w-3.5 h-3.5 text-white drop-shadow" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`rounded-full p-1.5 flex items-center gap-1 shadow-xl border backdrop-blur-xl ${
          isDark ? "bg-slate-900/90 border-slate-700/60" : "bg-white/90 border-slate-200 shadow-sky-100/80"
        }`}
      >
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`p-2.5 rounded-full transition-all duration-200 cursor-pointer ${
            isDark ? "hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-400" : "hover:bg-cyan-100 text-slate-600 hover:text-cyan-600"
          }`}
          aria-label="Customize accent colors"
          title="Customize Theme Colors"
        >
          <FaPalette className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
        </button>

        <div className={`w-[1px] h-4 ${isDark ? "bg-slate-700/60" : "bg-slate-200"}`} />

        <button
          onClick={toggle}
          className={`p-2.5 rounded-full transition-all duration-200 cursor-pointer ${
            isDark ? "hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-400" : "hover:bg-cyan-100 text-slate-600 hover:text-cyan-600"
          }`}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <div className="relative w-4 h-4 md:w-5 md:h-5">
            <motion.div
              animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <FaMoon className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
            </motion.div>
            <motion.div
              animate={{ rotate: isDark ? -180 : 0, scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <FaSun className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
            </motion.div>
          </div>
        </button>
      </motion.div>
    </motion.div>
  );
}
