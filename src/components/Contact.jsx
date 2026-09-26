import React, { useState } from "react";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import { personalInfo } from "../data/portfolioData";

export default function Contact({ setCursorHovered }) {
  const [formStatus, setFormStatus] = useState("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const response = await fetch(personalInfo.formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const contactList = [
    { label: "Email", val: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { label: "LinkedIn", val: "satyam-singh-05b369376", href: personalInfo.linkedin },
    { label: "GitHub", val: personalInfo.githubUsername, href: personalInfo.github },
    { label: "Location", val: personalInfo.location, href: null },
    { label: "Availability", val: "Immediate / Open to Roles", href: null }
  ];

  return (
    <section id="contact" className="space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3.5 py-1 rounded-full">
          Contact
        </span>
        <h2 className="text-3xl font-extrabold text-white">Let's Connect</h2>
        <p className="text-xs text-slate-400">
          Actively looking for entry-level Software Developer / Java Backend roles. Send a message directly to my inbox!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form
          onSubmit={handleFormSubmit}
          className="p-7 rounded-3xl bg-[#080d1a]/60 border border-slate-800/90 space-y-4 shadow-xl relative"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Name"
              className="w-full px-4 py-2.5 rounded-xl bg-[#030712] border border-slate-800 focus:outline-none focus:border-cyan-500 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-[#030712] border border-slate-800 focus:outline-none focus:border-cyan-500 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
            <textarea
              rows="4"
              name="message"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Your message..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#030712] border border-slate-800 focus:outline-none focus:border-cyan-500 text-xs text-white"
            />
          </div>

          <button
            type="submit"
            disabled={formStatus === "submitting"}
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs tracking-wide transition flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
          >
            {formStatus === "submitting" ? (
              <>
                <FaSpinner className="animate-spin" size={13} /> Sending...
              </>
            ) : (
              <>
                <FaPaperPlane size={12} /> Send Message
              </>
            )}
          </button>

          {formStatus === "success" && (
            <p className="text-xs font-mono text-emerald-400 text-center pt-1">
              &check; Thank you! Your message was sent directly to my email.
            </p>
          )}
          {formStatus === "error" && (
            <p className="text-xs font-mono text-rose-400 text-center pt-1">
              &times; Something went wrong. Please email directly at {personalInfo.email}
            </p>
          )}
        </form>

        <div className="space-y-3">
          {contactList.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#080d1a]/60 border border-slate-800/90 flex items-center justify-between hover:border-cyan-500/30 transition"
            >
              <span className="text-xs text-slate-400 font-medium">{item.label}</span>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  className="text-xs font-semibold text-cyan-400 hover:underline"
                >
                  {item.val}
                </a>
              ) : (
                <span className="text-xs font-semibold text-slate-200">{item.val}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}