import Reveal from "./Reveal";
import { certifications, education, sectionNumber } from "../data/portfolioData";

export default function Education() {
  return (
    <section id="education" className="border-t border-fg/10 py-24 sm:py-32">
      <div className="page grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <p className="label tabular-nums">{sectionNumber("education")}</p>
          <h2 className="mt-4 text-[clamp(2.5rem,1.5rem+3.6vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.04em]">
            Education
          </h2>
        </Reveal>

        <div className="lg:col-span-8">
          <ol>
            {education.map((item, index) => (
              <Reveal
                as="li"
                key={item.title}
                delay={index * 0.04}
                className="grid gap-2 border-t border-fg/10 py-7 first:border-t-0 first:pt-0 sm:grid-cols-[170px_1fr_auto] sm:gap-8"
              >
                <span className="label pt-1.5 tabular-nums">{item.period}</span>
                <div>
                  <h3 className="text-[1.25rem] font-medium tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-1 text-[15px] text-muted">{item.place}</p>
                </div>
                <span className="text-[15px] tabular-nums text-muted sm:pt-1 sm:text-right">{item.score}</span>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-16">
            <h3 className="label">Certifications</h3>
            <ul className="mt-5 grid gap-px overflow-hidden rounded-[14px] border border-fg/10 bg-fg/10 sm:grid-cols-2">
              {certifications.map((cert) => (
                <li key={cert.title} className="bg-bg p-5 sm:p-6">
                  <p className="text-[15px] font-medium leading-snug">{cert.title}</p>
                  <p className="mt-1.5 text-[14px] text-muted">{cert.issuer}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
