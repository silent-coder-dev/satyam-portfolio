import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { navLinks, personalInfo } from "../data/portfolioData";
import { easeOutExpo } from "../utils/motion";

function ThemeButton({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-fg/[0.06] hover:text-fg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -60, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 60, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="grid place-items-center"
        >
          {isDark ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default function Navbar({ theme, onToggleTheme, activeSection }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    setHidden(latest > previous && latest > 320);
  });

  useEffect(() => {
    if (!menuOpen) return undefined;
    const root = document.documentElement;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    root.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const goTo = (event, id) => {
    event.preventDefault();
    setMenuOpen(false);
    // Wait a tick so the scroll lock is released before scrolling.
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 20);
  };

  return (
    <>
      <motion.header
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: easeOutExpo }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
          scrolled ? "border-fg/10 bg-bg/80 backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <div className="page flex h-16 items-center justify-between gap-6">
          <a href="#top" className="text-[15px] font-medium tracking-[-0.01em]">
            {personalInfo.name}
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative isolate block rounded-full px-3.5 py-1.5 text-[14px] transition-colors ${
                        isActive ? "text-fg" : "text-muted hover:text-fg"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full bg-fg/[0.07]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeButton theme={theme} onToggle={onToggleTheme} />
            <a
              href={personalInfo.resume}
              download={personalInfo.resumeFileName}
              className="hidden h-9 items-center rounded-full border border-fg/15 px-4 text-[14px] transition-colors hover:border-fg/40 lg:inline-flex"
            >
              Resume
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="h-9 rounded-full border border-fg/15 px-4 text-[14px] lg:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-bg lg:hidden"
          >
            <div className="page flex h-16 items-center justify-between">
              <span className="text-[15px] font-medium tracking-[-0.01em]">{personalInfo.name}</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="h-9 rounded-full border border-fg/15 px-4 text-[14px]"
                autoFocus
              >
                Close
              </button>
            </div>

            <nav aria-label="Mobile" className="page mt-6 flex-1">
              <ul>
                {navLinks.map((link, index) => (
                  <li key={link.id} className="border-b border-fg/10">
                    <motion.a
                      href={`#${link.id}`}
                      onClick={(event) => goTo(event, link.id)}
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.05 + index * 0.04, duration: 0.5, ease: easeOutExpo }}
                      className="flex items-baseline justify-between py-4 text-[2.25rem] font-medium leading-tight tracking-[-0.03em]"
                    >
                      {link.label}
                      <span className="label">{String(index + 1).padStart(2, "0")}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="page flex items-center justify-between pb-[max(2rem,env(safe-area-inset-bottom))] text-[14px] text-muted">
              <a href={`mailto:${personalInfo.email}`}>Email</a>
              <a href={personalInfo.resume} download={personalInfo.resumeFileName}>
                Resume (PDF)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
