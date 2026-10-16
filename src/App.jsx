import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";

import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Projects from "./components/Projects";
import VibeCoding from "./components/VibeCoding";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import useActiveSection from "./hooks/useActiveSection";
import { navLinks } from "./data/portfolioData";

const THEME_KEY = "portfolio-theme";
const sectionIds = ["top", ...navLinks.map((link) => link.id)];

// index.html sets data-theme before React loads, so we start from whatever it chose.
const readInitialTheme = () => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

const readStoredTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
};

export default function App() {
  const [theme, setTheme] = useState(readInitialTheme);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Follow the OS setting until the visitor picks a theme themselves.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (event) => {
      if (!readStoredTheme()) setTheme(event.matches ? "light" : "dark");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.add("theme-switching");
    window.setTimeout(() => root.classList.remove("theme-switching"), 400);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Private mode or blocked storage: the choice just won't persist.
    }
    setTheme(next);
  }, [theme]);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-[14px] focus:text-bg"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggleTheme} activeSection={activeSection} />

      <main>
        <Hero />
        <Marquee />
        <Projects />
        <VibeCoding />
        <About />
        <Skills />
        <Education />
        <Contact />
      </main>

      <Footer />
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  );
}
