import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

function ProjectMedia({ project }) {
  const frameRef = useRef(null);
  const labelRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  // The screenshot drifts a little inside its frame as the page scrolls.
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["-2.5%", "2.5%"]);

  // Position the label straight from the pointer event, without a re-render.
  const followPointer = (event) => {
    const frame = frameRef.current;
    const label = labelRef.current;
    if (!frame || !label) return;
    const rect = frame.getBoundingClientRect();
    label.style.transform = `translate3d(${event.clientX - rect.left}px, ${event.clientY - rect.top}px, 0)`;
  };

  return (
    <a
      ref={frameRef}
      href={project.live}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open the ${project.name} live site`}
      onPointerMove={followPointer}
      onPointerEnter={(event) => {
        followPointer(event);
        setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      className="media-hover group relative block overflow-hidden rounded-[14px] border border-fg/10 bg-surface"
    >
      <div className="flex items-center justify-between gap-4 border-b border-fg/10 px-4 py-2.5">
        <span className="truncate font-mono text-[11px] text-muted">{project.domain}</span>
        <ArrowUpRight size={13} className="shrink-0 text-faint" aria-hidden="true" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-fg/[0.04]">
        <motion.div className="absolute inset-x-0 -inset-y-[3%]" style={{ y: reduceMotion ? 0 : drift }}>
          <img
            src={project.image}
            alt={`Screenshot of ${project.name}`}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: project.imagePosition }}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.03]"
          />
        </motion.div>
      </div>

      <span ref={labelRef} aria-hidden="true" className="cursor-label pointer-events-none absolute left-0 top-0 z-10">
        <span
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-fg px-4 py-2 text-[13px] font-medium text-bg shadow-xl shadow-black/20 transition-[opacity,transform] duration-300 ease-out-expo ${
            hovered ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        >
          Visit site <ArrowUpRight size={14} />
        </span>
      </span>
    </a>
  );
}

function ProjectLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 font-medium">
      <span className="link">{children}</span>
      <ArrowUpRight
        size={16}
        className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}

export default function ProjectEntry({ project, flipped = false }) {
  return (
    <article aria-labelledby={`${project.slug}-title`}>
      <Reveal className="label flex items-center justify-between border-t border-fg/10 pt-5">
        <span>{project.kind}</span>
        <span className="tabular-nums">{project.year}</span>
      </Reveal>

      <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className={`lg:sticky lg:top-24 lg:col-span-7 lg:self-start ${flipped ? "lg:order-2" : ""}`}>
          <ProjectMedia project={project} />
        </Reveal>

        <Reveal delay={0.08} className={`flex flex-col lg:col-span-5 ${flipped ? "lg:order-1" : ""}`}>
          <h3 id={`${project.slug}-title`} className="text-[2.25rem] font-medium leading-none tracking-[-0.035em] sm:text-[2.75rem]">
            {project.name}
          </h3>
          <p className="mt-5 text-[17px] leading-[1.6] text-fg/85">{project.summary}</p>

          <ul className="mt-7 space-y-3.5 border-t border-fg/10 pt-6">
            {project.highlights.map((point) => (
              <li key={point} className="flex gap-3.5 text-[15px] leading-[1.6] text-muted">
                <span aria-hidden="true" className="mt-[0.8em] h-px w-3 shrink-0 bg-accent" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <ul aria-label="Built with" className="mt-7 flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <li key={item} className="rounded-full border border-fg/10 px-2.5 py-1 font-mono text-[11px] text-muted">
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-[15px]">
            <ProjectLink href={project.live}>Live site</ProjectLink>
            <ProjectLink href={project.source}>Source code</ProjectLink>
          </div>

          {project.note && <p className="mt-6 text-[13px] leading-relaxed text-muted">{project.note}</p>}
        </Reveal>
      </div>
    </article>
  );
}
