import ProjectEntry from "./ProjectEntry";
import Reveal from "./Reveal";
import { sectionNumber, vibeCoding, vibeProjects } from "../data/portfolioData";

export default function VibeCoding() {
  return (
    <section id="vibe-coding" className="border-t border-fg/10 bg-surface/60 py-24 sm:py-32">
      <div className="page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="label tabular-nums">{sectionNumber("vibe-coding")}</p>
            <h2 className="mt-4 text-[clamp(2.5rem,1.5rem+3.6vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.04em]">
              Vibe <span className="font-serif font-normal italic tracking-[-0.01em] text-accent">coding</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05} as="p" className="max-w-[46ch] text-[15px] leading-relaxed text-muted lg:col-span-5 lg:col-start-8">
            {vibeCoding.intro}
          </Reveal>
        </div>

        <Reveal as="dl" delay={0.1} className="mt-14 grid gap-x-10 gap-y-7 border-t border-fg/10 pt-8 sm:grid-cols-3">
          {vibeCoding.details.map((item) => (
            <div key={item.label}>
              <dt className="label">{item.label}</dt>
              <dd className="mt-2.5 text-[15px] leading-relaxed">{item.value}</dd>
            </div>
          ))}
        </Reveal>

        <div className="mt-20 space-y-24 sm:mt-24 sm:space-y-32">
          {vibeProjects.map((project, index) => (
            <ProjectEntry key={project.slug} project={project} flipped={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
