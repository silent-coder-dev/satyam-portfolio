import { useState, useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from "framer-motion";

// Data
import { personalInfo } from "./data/portfolioData";
import {
  initializeThemeColors,
  applyThemeColor,
  getRandomThemeColors,
  DARK_THEME_COLORS,
  LIGHT_THEME_COLORS,
} from "./utils/themeColors";

// Components
import ParticleCanvas from "./components/ParticleCanvas";
import TerminalLoader from "./components/TerminalLoader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import Pillars from "./components/Pillars";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const getPreferredTheme = () => {
    if (typeof window === "undefined") return "dark";
    const storedTheme = localStorage.getItem("portfolio-theme");
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  };

  const [theme, setTheme] = useState(getPreferredTheme);
  const [themeColors, setThemeColors] = useState(() => initializeThemeColors());
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);

  const isDark = theme === "dark";
  const prefersReducedMotion = useReducedMotion();
  const activeAccentColor = isDark ? themeColors.darkColor.hex : themeColors.lightColor.hex;

  // Dynamic API Stats
  const [githubRepos, setGithubRepos] = useState("15");
  const [leetcodeSolved, setLeetcodeSolved] = useState("100");

  // Custom Cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { stiffness: 700, damping: 25, mass: 0.1 });
  const cursorYSpring = useSpring(cursorY, { stiffness: 700, damping: 25, mass: 0.1 });
  const [cursorHovered, setCursorHovered] = useState(false);

  // Top Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("portfolio-theme", theme);
    applyThemeColor(theme === "dark", themeColors);
  }, [theme, themeColors]);

  const handleSelectColorIndex = (index) => {
    const isDarkTheme = theme === "dark";
    const colors = isDarkTheme ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;
    const selectedColor = colors[index];
    if (!selectedColor) return;

    setThemeColors((prev) => ({
      ...prev,
      [isDarkTheme ? "darkIndex" : "lightIndex"]: index,
      [isDarkTheme ? "darkColor" : "lightColor"]: selectedColor,
      isShuffle: false,
    }));

  };

  const handleToggleShuffle = () => {
    if (themeColors.isShuffle) {
      setThemeColors((prev) => ({ ...prev, isShuffle: false }));
      return;
    }

    const randomColors = getRandomThemeColors();
    setThemeColors({ ...randomColors, isShuffle: true });
  };

  // Fetch Live Metrics
  useEffect(() => {
    fetch(`https://api.github.com/users/${personalInfo.githubUsername}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.public_repos !== undefined) {
          setGithubRepos(data.public_repos.toString());
        }
      })
      .catch(() => {});

    fetch(`https://leetcode-stats-api.herokuapp.com/${personalInfo.leetcodeUsername}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.totalSolved) {
          setLeetcodeSolved(data.totalSolved.toString());
        }
      })
      .catch(() => {});
  }, []);

  // Cursor Tracker
  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const updatePointerCapability = () => setIsFinePointer(pointerQuery.matches);
    updatePointerCapability();
    pointerQuery.addEventListener("change", updatePointerCapability);
    return () => pointerQuery.removeEventListener("change", updatePointerCapability);
  }, []);

  useEffect(() => {
    if (!isFinePointer || prefersReducedMotion) return undefined;

    const handlePointerMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", handlePointerMove);
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, [cursorX, cursorY, isFinePointer, prefersReducedMotion]);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyCurl = () => {
    const curlCommand = `curl -X POST https://support-desk-crm-qs00.onrender.com/tickets \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Login Bug","priority":"HIGH"}'`;
    navigator.clipboard.writeText(curlCommand);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div
      onMouseEnter={() => setCursorHovered(false)}
      className={`relative min-h-screen font-sans antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-black transition-colors duration-300 ${
        isDark ? "bg-[#030712] text-slate-300" : "bg-[#f5f9ff] text-slate-700"
      }`}
    >
      <CommandPalette isOpen={isPaletteOpen} setIsOpen={setIsPaletteOpen} theme={theme} />

      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 origin-left z-50 shadow-md shadow-cyan-500/50"
      />

      {isFinePointer && !prefersReducedMotion && (
        <>
          <motion.div
            className="fixed pointer-events-none z-50"
            style={{ x: cursorXSpring, y: cursorYSpring }}
          >
            <div className="w-2 h-2 -ml-1 -mt-1 rounded-full bg-[var(--primary-color)] shadow-sm shadow-cyan-300" />
          </motion.div>

          <motion.div
            className="fixed pointer-events-none z-40"
            style={{ x: cursorXSpring, y: cursorYSpring }}
            animate={{
              scale: cursorHovered ? 1.7 : 1,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div
              className="w-7 h-7 -ml-3.5 -mt-3.5 rounded-full border border-[var(--primary-color)]/40"
              style={{ backgroundColor: cursorHovered ? "rgba(var(--primary-rgb), 0.1)" : "transparent" }}
            />
          </motion.div>
        </>
      )}

      {!prefersReducedMotion && (
        <div className="fixed inset-0 z-[5] overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className="ambient-orb ambient-orb-one absolute -left-40 top-[12%] h-80 w-80 rounded-full"
            style={{ backgroundColor: "rgba(var(--primary-rgb), 0.13)" }}
          />
          <div
            className="ambient-orb ambient-orb-two absolute -right-40 top-[48%] h-96 w-96 rounded-full"
            style={{ backgroundColor: "rgba(var(--primary-rgb), 0.09)" }}
          />
        </div>
      )}
      <ParticleCanvas theme={theme} activeColor={activeAccentColor} />
      <TerminalLoader fullName={personalInfo.name} onComplete={() => setIsPageReady(true)} />

      <div
        className={`fixed inset-0 pointer-events-none ${
          isDark
            ? "bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(14,165,233,0.14),transparent)]"
            : "bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(56,189,248,0.18),transparent)]"
        }`}
      />
      <div
        className={`fixed inset-0 pointer-events-none ${
          isDark
            ? "bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:36px_36px]"
            : "bg-[linear-gradient(to_right,#0f172a0d_1px,transparent_1px),linear-gradient(to_bottom,#0f172a0d_1px,transparent_1px)] bg-[size:36px_36px]"
        }`}
      />

      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        copyEmail={copyEmail}
        copiedEmail={copiedEmail}
        setCursorHovered={setCursorHovered}
        name={personalInfo.name}
        onOpenPalette={() => setIsPaletteOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {isPageReady && (
        <ThemeToggle
          isDark={isDark}
          toggle={toggleTheme}
          themeColors={themeColors}
          onSelectColorIndex={handleSelectColorIndex}
          onToggleShuffle={handleToggleShuffle}
        />
      )}

      <main className="relative z-20 max-w-5xl mx-auto px-6 pt-32 pb-24 space-y-28">
        <Hero
          personalInfo={personalInfo}
          copyEmail={copyEmail}
          copiedEmail={copiedEmail}
          setCursorHovered={setCursorHovered}
          fadeInUp={fadeInUp}
          theme={theme}
        />

        <Metrics theme={theme} />
        <Pillars theme={theme} />

        <Skills
          leetcodeSolved={leetcodeSolved}
          githubRepos={githubRepos}
          setCursorHovered={setCursorHovered}
          theme={theme}
        />

        <Projects
          fadeInUp={fadeInUp}
          setCursorHovered={setCursorHovered}
          copyCurl={copyCurl}
          copiedCurl={copiedCurl}
          theme={theme}
        />

        <Education theme={theme} />
        <Contact setCursorHovered={setCursorHovered} theme={theme} />
      </main>

      <Footer theme={theme} />
    </div>
  );
}