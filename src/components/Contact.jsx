import { useState } from "react";
import { ArrowUpRight, Check, Copy, LoaderCircle } from "lucide-react";
import ParticleCanvas from "./ParticleCanvas";
import Reveal from "./Reveal";
import useCopy from "../hooks/useCopy";
import { personalInfo, sectionNumber } from "../data/portfolioData";

const socials = [
  { label: "GitHub", href: personalInfo.github },
  { label: "LinkedIn", href: personalInfo.linkedin },
  { label: "LeetCode", href: personalInfo.leetcode },
];

const emptyForm = { name: "", email: "", message: "" };

function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState(emptyForm);

  const update = (field) => (event) => setForm((previous) => ({ ...previous, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch(personalInfo.formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(`Formspree responded with ${response.status}`);
      setStatus("sent");
      setForm(emptyForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[18px] border border-fg/10 bg-surface p-6 sm:p-8">
      <p className="text-[1.125rem] font-medium tracking-[-0.01em]">Or leave a message</p>
      <p className="mt-1 text-[14px] text-muted">It goes straight to my inbox.</p>

      <div className="mt-8 space-y-7">
        <label className="block">
          <span className="label">Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={update("name")}
            className="field mt-1"
          />
        </label>
        <label className="block">
          <span className="label">Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={update("email")}
            className="field mt-1"
          />
        </label>
        <label className="block">
          <span className="label">Message</span>
          <textarea
            name="message"
            rows={4}
            required
            value={form.message}
            onChange={update("message")}
            className="field mt-1 resize-none"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-9 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-fg text-[15px] font-medium text-bg transition-colors hover:bg-accent disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <LoaderCircle size={16} className="animate-spin" /> Sending
          </>
        ) : (
          "Send message"
        )}
      </button>

      <p role="status" aria-live="polite" className="mt-4 min-h-[1.25rem] text-center text-[14px]">
        {status === "sent" && <span className="text-fg">Thanks, it&apos;s on its way. I&apos;ll reply by email.</span>}
        {status === "error" && (
          <span className="text-accent">
            That didn&apos;t go through. Please email me at {personalInfo.email} instead.
          </span>
        )}
      </p>
    </form>
  );
}

export default function Contact() {
  const [copied, copy] = useCopy();

  const copyEmail = async () => {
    const ok = await copy(personalInfo.email);
    if (!ok) window.location.href = `mailto:${personalInfo.email}`;
  };

  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-fg/10">
      <ParticleCanvas
        variant="contact"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[75%] w-full [mask-image:linear-gradient(to_bottom,transparent,#000_45%,#000)]"
      />

      <div className="page grid gap-16 py-24 sm:py-32 lg:grid-cols-12 lg:gap-10 lg:pb-44">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="label tabular-nums">{sectionNumber("contact")}</p>
            <h2 className="mt-4 text-[clamp(3.5rem,1.6rem+7vw,8rem)] font-medium leading-[0.92] tracking-[-0.05em]">
              Let&apos;s <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">talk.</span>
            </h2>
          </Reveal>

          <Reveal as="p" delay={0.05} className="mt-8 max-w-[44ch] text-[17px] leading-[1.65] text-muted">
            If you&apos;re hiring for a junior backend or Java role, or you&apos;d like to ask about one of the
            projects, email is the quickest way to reach me.
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <button type="button" onClick={copyEmail} className="group block text-left">
              <span className="link break-words text-[clamp(1.2rem,0.85rem+1.6vw,2rem)] font-medium tracking-[-0.02em]">
                {personalInfo.email}
              </span>
              <span className="label mt-3 flex items-center gap-2">
                {copied ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
                <span aria-live="polite">{copied ? "Copied to clipboard" : "Click to copy"}</span>
              </span>
            </button>
          </Reveal>

          <Reveal delay={0.15} className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-[15px]">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1"
              >
                <span className="link">{social.label}</span>
                <ArrowUpRight
                  size={14}
                  className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ))}
            <a href={personalInfo.resume} download={personalInfo.resumeFileName} className="group inline-flex items-center gap-1">
              <span className="link">Resume</span>
              <span className="font-mono text-[11px] text-muted">PDF</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
