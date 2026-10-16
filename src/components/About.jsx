import Reveal from "./Reveal";
import { personalInfo, sectionNumber } from "../data/portfolioData";

const facts = [
  { label: "Based in", value: personalInfo.location },
  { label: "Degree", value: "B.Tech, Computer Engineering" },
  { label: "Looking for", value: "Backend / Java developer roles" },
];

export default function About() {
  return (
    <section id="about" className="border-t border-fg/10 py-24 sm:py-32">
      <div className="page grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="label tabular-nums">{sectionNumber("about")}</p>
            <h2 className="mt-4 text-[clamp(2.5rem,1.5rem+3.6vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.04em]">About</h2>
          </Reveal>
          <Reveal delay={0.05} className="mt-10 max-w-[360px] overflow-hidden rounded-[14px] bg-surface">
            <img
              src="/avatar.webp"
              alt="Satyam Singh"
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover object-top transition-transform duration-[1200ms] ease-out-expo hover:scale-[1.03]"
            />
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 lg:pt-[4.5rem]">
          <Reveal as="p" className="text-[clamp(1.5rem,1.05rem+1.5vw,2.25rem)] leading-[1.28] tracking-[-0.02em]">
            I&apos;m Satyam. I finished my B.Tech in Computer Engineering at the University of Mumbai in 2026, and
            I&apos;m looking for my first full-time job as a backend or Java developer.
          </Reveal>

          <Reveal delay={0.05} className="mt-10 max-w-[62ch] space-y-5 text-[17px] leading-[1.7] text-muted">
            <p>
              Most of what I know about Spring came from building something, watching it break, and working out why.
              SupportDesk started on SQLite. Once a few requests hit it at the same time, connections began timing
              out. Fixing that is how I learned how connection pools, row-level locks and optimistic locking actually
              behave.
            </p>
            <p>
              When I want to try an idea quickly, or work in a front-end stack I know less well, I vibe code: AI tools
              write the first draft, and I review, test and fix it. AI Resume Studio was built that way.
            </p>
            <p>
              These days I&apos;m spending my time on Spring Security, writing proper tests, and solving LeetCode
              problems in Java. I like working in a team, and I pick up new tools quickly.
            </p>
          </Reveal>

          <Reveal as="dl" delay={0.1} className="mt-14 grid gap-x-8 gap-y-7 border-t border-fg/10 pt-8 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="label">{fact.label}</dt>
                <dd className="mt-2.5 text-[15px] leading-snug">{fact.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
