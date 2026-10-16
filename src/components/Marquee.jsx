import { marqueeItems } from "../data/portfolioData";

function Row({ hidden = false }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {marqueeItems.map((item) => (
        <li
          key={item}
          className="flex items-center gap-[clamp(1.25rem,2.6vw,2.75rem)] pr-[clamp(1.25rem,2.6vw,2.75rem)] text-[clamp(1.75rem,1.1rem+2.4vw,3.25rem)] font-medium tracking-[-0.035em] text-fg/80"
        >
          {item}
          {/* Square, like the dots in the particle field. */}
          <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-accent sm:h-2.5 sm:w-2.5" />
        </li>
      ))}
    </ul>
  );
}

// Endless strip of the stack between the hero and the work. Pauses on hover.
export default function Marquee() {
  return (
    <div
      role="marquee"
      aria-label="Technologies I work with"
      className="marquee relative overflow-hidden border-y border-fg/10 py-6 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] sm:py-8"
    >
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
