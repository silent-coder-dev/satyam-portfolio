import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// Data
import { personalInfo } from "./data/portfolioData";

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

export default function App() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Dynamic API Stats
  const [githubRepos, setGithubRepos] = useState("15");
  const [leetcodeSolved, setLeetcodeSolved] = useState("100");

  // Custom Cursor
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);

  // Top Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

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
    const handlePointerMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handlePointerMove);
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, []);

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

  return (
    <div
      onMouseEnter={() => setCursorHovered(false)}
      className="relative min-h-screen bg-[#030712] text-slate-300 font-sans antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-black"
    >
      <CommandPalette isOpen={isPaletteOpen} setIsOpen={setIsPaletteOpen} />

      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 origin-left z-50 shadow-md shadow-cyan-500/50"
      />

      <div
        className="fixed pointer-events-none z-50 hidden lg:block transition-transform duration-75 ease-out"
        style={{ transform: `translate3d(${cursorPos.x - 4}px, ${cursorPos.y - 4}px, 0)` }}
      >
        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-300" />
      </div>

      <div
        className={`fixed pointer-events-none z-40 hidden lg:block rounded-full border border-cyan-400/40 transition-all duration-300 ease-out ${
          cursorHovered ? "w-12 h-12 -ml-6 -mt-6 bg-cyan-500/10" : "w-7 h-7 -ml-3.5 -mt-3.5"
        }`}
        style={{ transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)` }}
      />

      <ParticleCanvas />
      <TerminalLoader fullName={personalInfo.name} />

      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(14,165,233,0.14),transparent)]" />
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:36px_36px]" />

      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        copyEmail={copyEmail}
        copiedEmail={copiedEmail}
        setCursorHovered={setCursorHovered}
        name={personalInfo.name}
        onOpenPalette={() => setIsPaletteOpen(true)}
      />

      <main className="relative z-20 max-w-5xl mx-auto px-6 pt-32 pb-24 space-y-28">
        <Hero
          personalInfo={personalInfo}
          copyEmail={copyEmail}
          copiedEmail={copiedEmail}
          setCursorHovered={setCursorHovered}
          fadeInUp={fadeInUp}
        />

        <Metrics />
        <Pillars />

        <Skills
          leetcodeSolved={leetcodeSolved}
          githubRepos={githubRepos}
          setCursorHovered={setCursorHovered}
        />

        <Projects
          fadeInUp={fadeInUp}
          setCursorHovered={setCursorHovered}
          copyCurl={copyCurl}
          copiedCurl={copiedCurl}
        />

        <Education />
        <Contact setCursorHovered={setCursorHovered} />
      </main>

      <Footer />
    </div>
  );
}