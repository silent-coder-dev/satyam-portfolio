import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { personalInfo } from "../data/portfolioData";
import { easeOutExpo } from "../utils/motion";

// The name set as large as the page is wide. The font size is measured rather than
// guessed so it lines up with the grid edges at every width.
function Wordmark({ text }) {
  const boxRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const element = textRef.current;
    if (!box || !element) return undefined;

    let cancelled = false;
    const fit = () => {
      if (cancelled) return;
      element.style.fontSize = "100px";
      const naturalWidth = element.getBoundingClientRect().width;
      if (naturalWidth > 0) element.style.fontSize = `${(box.clientWidth / naturalWidth) * 100}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    document.fonts?.ready.then(fit);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={boxRef} aria-hidden="true" className="overflow-hidden">
      <motion.span
        ref={textRef}
        initial={{ y: "35%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.2, ease: easeOutExpo }}
        className="inline-block whitespace-nowrap bg-gradient-to-b from-fg to-fg/25 bg-clip-text pb-[0.12em] font-medium leading-[0.9] tracking-[-0.06em] text-transparent"
      >
        {text}
      </motion.span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-fg/10">
      <div className="page pt-16 sm:pt-24">
        <Wordmark text={personalInfo.name} />
        <div className="mt-6 flex flex-col gap-3 border-t border-fg/10 py-8 text-[13px] text-muted sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {personalInfo.name}
          </p>
          <p>Built with React and Vite. Set in Geist and Instrument Serif.</p>
          <a href="#top" className="group inline-flex items-center gap-1.5 transition-colors hover:text-fg">
            <span className="link">Back to top</span>
            <ArrowUp size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
