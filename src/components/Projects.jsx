import { ArrowUpRight } from "lucide-react";
import ProjectEntry from "./ProjectEntry";
import Reveal from "./Reveal";
import { otherProjects, personalInfo, projects, sectionNumber } from "../data/portfolioData";

function SmallerProjects() {
  return (
    <div className="mt-28 sm:mt-36">
      <Reveal className="flex items-baseline justify-between gap-4 pb-4">
        <h3 className="text-[1.375rem] font-medium tracking-[-0.02em]">Smaller things</h3>
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noreferrer"
          className="label group inline-flex items-center gap-1 transition-colors hover:text-fg"
        >
          <span className="link">All repositories</span>
          <ArrowUpRight size={12} />
        </a>
      </Reveal>

      <Reveal as="ul" className="border-t border-fg/10">
        {otherProjects.map((project) => (
          <li key={project.name} className="border-b border-fg/10">
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="group -mx-3 grid grid-cols-12 items-baseline gap-x-4 gap-y-1.5 rounded-lg px-3 py-5 transition-colors hover:bg-fg/[0.03] sm:py-6"
            >
              <span className="col-span-9 font-medium transition-colors group-hover:text-accent sm:col-span-3">
                {project.name}
              </span>
              <span className="label col-span-3 flex items-center justify-end gap-1.5 tabular-nums sm:order-last sm:col-span-1">
                {project.year}
                <ArrowUpRight
                  size={13}
                  className="text-accent opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </span>
              <span className="col-span-12 text-[15px] leading-relaxed text-muted sm:col-span-5">{project.description}</span>
              <span className="label col-span-12 leading-relaxed sm:col-span-3">{project.stack}</span>
            </a>
          </li>
        ))}
      </Reveal>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="py-24 sm:py-32">
      <div className="page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="label tabular-nums">{sectionNumber("work")}</p>
            <h2 className="mt-4 text-[clamp(2.5rem,1.5rem+3.6vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.04em]">
              Selected work
            </h2>
          </Reveal>
          <Reveal delay={0.05} as="p" className="max-w-[40ch] text-[15px] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            Two full projects from this year, each with a Spring Boot backend. Both are live, and the code is on GitHub.
          </Reveal>
        </div>

        <div className="mt-16 space-y-24 sm:mt-24 sm:space-y-32">
          {projects.map((project, index) => (
            <ProjectEntry key={project.slug} project={project} flipped={index % 2 === 1} />
          ))}
        </div>

        <SmallerProjects />
      </div>
    </section>
  );
}
