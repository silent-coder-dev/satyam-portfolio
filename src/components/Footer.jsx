import { personalInfo } from "../data/portfolioData";

export default function Footer({ theme }) {
  const isDark = theme === "dark";

  return (
    <footer className={`relative z-20 border-t py-8 text-center text-xs font-mono transition-colors duration-300 ${
      isDark ? "border-slate-800/80 bg-[#030712] text-slate-500" : "border-slate-200 bg-[#f8fbff] text-slate-500"
    }`}>
      &copy; {new Date().getFullYear()} {personalInfo.name} &bull; Built with React, Tailwind CSS &amp; Framer Motion
    </footer>
  );
}