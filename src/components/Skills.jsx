import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import useProfileStats from "../hooks/useProfileStats";
import { personalInfo, sectionNumber, stackGroups } from "../data/portfolioData";
import { easeOutExpo } from "../utils/motion";

function CountUp({ value }) {
  const ref = useRef(null);
  const shown = useRef(0);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduceMotion) {
      setDisplay(value);
      return undefined;
    }
    const controls = animate(shown.current, value, {
      duration: 1.6,
      ease: easeOutExpo,
      onUpdate: (latest) => {
        shown.current = latest;
        setDisplay(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return <span ref={ref}>{display}</span>;
}

function StatCard({ href, label, value, caption, detail }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group bg-bg p-6 transition-colors hover:bg-surface sm:p-8">
      <div className="flex items-start justify-between">
        <span className="label">{label}</span>
        <ArrowUpRight
          size={15}
          className="text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>
      <p className="mt-8 text-[3.5rem] font-medium leading-none tracking-[-0.05em] tabular-nums">
        <CountUp value={value} />
      </p>
      <p className="mt-3 text-[15px] text-muted">{caption}</p>
      <p className="label mt-5">{detail}</p>
    </a>
  );
}

export default function Skills() {
  const stats = useProfileStats();
  const { total, easy, medium, hard } = stats.leetcode;

  return (
    <section id="stack" className="border-t border-fg/10 py-24 sm:py-32">
      <div className="page grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <p className="label tabular-nums">{sectionNumber("stack")}</p>
          <h2 className="mt-4 text-[clamp(2.5rem,1.5rem+3.6vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.04em]">Stack</h2>
          <p className="mt-6 max-w-[34ch] text-[15px] leading-relaxed text-muted">
            Grouped by how well I know them, not alphabetically. The first row is where I&apos;m most at home.
          </p>
        </Reveal>

        <div className="lg:col-span-8">
          <dl>
            {stackGroups.map((group, index) => (
              <Reveal
                key={group.label}
                delay={index * 0.04}
                className="grid gap-4 border-t border-fg/10 py-7 first:border-t-0 first:pt-0 sm:grid-cols-[170px_1fr] sm:gap-8"
              >
                <dt className="label pt-2">{group.label}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className={`rounded-full border px-3.5 py-1.5 text-[14px] ${
                          index === 0 ? "border-fg/25 text-fg" : "border-fg/10 text-fg/75"
                        }`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.1} className="mt-12 grid gap-px overflow-hidden rounded-[14px] border border-fg/10 bg-fg/10 sm:grid-cols-2">
            <StatCard
              href={personalInfo.leetcode}
              label="LeetCode"
              value={total}
              caption="problems solved, mostly in Java"
              detail={`${easy} easy · ${medium} medium · ${hard} hard`}
            />
            <StatCard
              href={personalInfo.github}
              label="GitHub"
              value={stats.githubRepos}
              caption="public repositories"
              detail={`@${personalInfo.githubUsername}`}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
