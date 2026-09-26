import React from "react";
import { personalInfo } from "../data/portfolioData";

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-slate-800/80 py-8 bg-[#030712] text-center text-xs font-mono text-slate-500">
      &copy; {new Date().getFullYear()} {personalInfo.name} &bull; Built with React, Tailwind CSS &amp; Framer Motion
    </footer>
  );
}