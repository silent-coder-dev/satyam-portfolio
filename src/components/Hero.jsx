import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, Copy } from "lucide-react";
import Magnetic from "./Magnetic";
import ParticleCanvas from "./ParticleCanvas";
import useCopy from "../hooks/useCopy";
import { personalInfo, projects } from "../data/portfolioData";
import { easeOutExpo } from "../utils/motion";

const headline = [
  { text: "Java" },
  { text: "developer" },
  { text: "building" },
  { text: "backends" },
  { text: "that" },
  { text: "hold", serif: true },
  { text: "up.", serif: true },
];

const formatTime = (timeZone) =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone }).format(new Date());

function LocalTime({ timeZone }) {
  const [time, setTime] = useState(() => formatTime(timeZone));

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTime(timeZone)), 15000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return <time className="tabular-nums">{time}</time>;
}

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: easeOutExpo },
});

export default function Hero() {
  const [copied, copy] = useCopy();
  const latest = projects.find((project) => project.slug === "nutriscan");

  const copyEmail = async () => {
    const ok = await copy(personalInfo.email);
    if (!ok) window.location.href = `mailto:${personalInfo.email}`;
  };

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <ParticleCanvas
        variant="hero"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full [mask-image:linear-gradient(to_bottom,transparent_0%,#000_42%,#000_82%,transparent_100%)]"
      />

      <div className="page flex flex-1 flex-col pb-8 pt-24 sm:pt-28">
        <motion.div {...fadeUp(0.05)} className="flex items-center justify-between gap-4">
          <p className="label flex items-center gap-2.5">
            <span className="status-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {personalInfo.availability}
          </p>
          <p className="label hidden sm:block">
            {personalInfo.location} · <LocalTime timeZone={personalInfo.timeZone} /> IST
          </p>
        </motion.div>

        <div className="mt-14 sm:mt-16">
          <motion.p {...fadeUp(0.1)} className="flex items-center gap-3 text-[15px] text-muted">
            <img
              src="/avatar.webp"
              alt=""
              width="36"
              height="36"
              className="h-9 w-9 rounded-full object-cover object-top ring-1 ring-fg/15"
            />
            <span>
              <span className="text-fg">{personalInfo.name}</span> / Software developer
            </span>
          </motion.p>

          <h1 className="mt-5 max-w-[13ch] text-[clamp(2.75rem,1.1rem+6vw,6rem)] font-medium leading-[0.98] tracking-[-0.045em]">
            {headline.map((word, index) => (
              <Fragment key={word.text}>
                <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] pr-[0.06em] align-bottom">
                  <motion.span
                    className={`inline-block ${word.serif ? "font-serif text-[1.08em] font-normal italic tracking-[-0.01em] text-accent" : ""}`}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, delay: 0.15 + index * 0.05, ease: easeOutExpo }}
                  >
                    {word.text}
                  </motion.span>
                </span>
                {index < headline.length - 1 && " "}
              </Fragment>
            ))}
          </h1>

          <motion.p {...fadeUp(0.55)} className="mt-8 max-w-[54ch] text-[17px] leading-[1.6] text-muted sm:text-[18px]">
            I&apos;m a Computer Engineering graduate from the University of Mumbai (2026), looking for my first
            full-time backend role. Most of my work is in Java and Spring Boot, and I also{" "}
            <a href="#vibe-coding" className="text-fg underline decoration-fg/30 underline-offset-4 transition-colors hover:decoration-accent">
              vibe code
            </a>
            : building with AI tools, then reviewing and fixing what they write.
          </motion.p>

          <motion.div {...fadeUp(0.65)} className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-[15px] font-medium text-bg transition-colors hover:bg-accent"
              >
                See my work
                <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={personalInfo.resume}
                download={personalInfo.resumeFileName}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-fg/20 bg-bg/40 px-6 text-[15px] backdrop-blur-sm transition-colors hover:border-fg/50"
              >
                Resume <span className="font-mono text-[11px] text-muted">PDF</span>
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={copyEmail}
              className="group ml-1 inline-flex h-12 items-center gap-2 text-[15px] text-muted transition-colors hover:text-fg"
            >
              <span className="link">{personalInfo.email}</span>
              {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied" : ""}
              </span>
            </button>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.9)} className="mt-auto flex items-end justify-between gap-6 pt-12">
          <a href="#work" className="label flex items-center gap-3 transition-colors hover:text-fg">
            <span className="relative h-10 w-px overflow-hidden bg-fg/15" aria-hidden="true">
              <span className="scroll-line absolute inset-0 bg-fg" />
            </span>
            Scroll
          </a>
          {latest && (
            <a
              href={latest.live}
              target="_blank"
              rel="noreferrer"
              className="label group inline-flex items-center gap-1.5 text-right transition-colors hover:text-fg"
            >
              <span>
                Latest: <span className="text-fg">{latest.name}</span> is live
              </span>
              <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
