import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaExternalLinkAlt,
  FaTerminal,
  FaServer,
  FaDocker,
  FaPaperPlane,
  FaGraduationCap,
  FaCopy,
  FaCheck,
  FaMapMarkerAlt,
  FaDownload,
  FaSpinner,
  FaCode
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { BiCodeAlt } from "react-icons/bi";
import { BsShieldCheck } from "react-icons/bs";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [typedName, setTypedName] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  // Dynamic API Stats
  const [githubRepos, setGithubRepos] = useState("15+");
  const [leetcodeSolved, setLeetcodeSolved] = useState("100+");

  // Custom Cursor Coordinates
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);

  // Contact Form State
  const [formStatus, setFormStatus] = useState("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const canvasRef = useRef(null);
  const fullName = "Satyam Singh";

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  // Fetch Live GitHub & LeetCode Metrics
  useEffect(() => {
    fetch("https://api.github.com/users/silently-feel")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.public_repos !== undefined) {
          setGithubRepos(data.public_repos.toString());
        }
      })
      .catch(() => {});

    fetch("https://leetcode-stats-api.herokuapp.com/silently_code")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.totalSolved) {
          setLeetcodeSolved(data.totalSolved.toString());
        }
      })
      .catch(() => {});
  }, []);

  // Custom Cursor Tracker
  useEffect(() => {
    const handlePointerMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handlePointerMove);
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, []);

  // Particle Canvas & Mouse Tethering Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: null,
      y: null,
      radius: 140
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const particleCount = width > 768 ? 65 : 28;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.45)";
        ctx.fill();

        if (mouse.x !== null && mouse.y !== null) {
          const mouseDist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (mouseDist < mouse.radius) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            const opacity = 0.55 * (1 - mouseDist / mouse.radius);
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 105) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.18 * (1 - dist / 105)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Terminal Typing Loader Sequence
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullName.length) {
        setTypedName(fullName.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 700);
      }
    }, 75);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("satyam.singh261103@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyCurl = () => {
    const curlCommand = `curl -X POST https://support-desk-crm-qs00.onrender.com/tickets \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Login Bug","priority":"HIGH"}'`;
    navigator.clipboard.writeText(curlCommand);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const response = await fetch("https://formspree.io/f/xaenjroy", {
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
  };

  const skillGroups = [
    {
      category: "Backend & Core",
      color: "from-cyan-400 to-blue-600",
      skills: [
        { name: "Java / Core Java", level: 88 },
        { name: "Spring Boot", level: 82 },
        { name: "Spring Security", level: 78 },
        { name: "Hibernate / JPA", level: 80 },
        { name: "RESTful APIs", level: 85 }
      ]
    },
    {
      category: "Databases & Tools",
      color: "from-emerald-400 to-cyan-500",
      skills: [
        { name: "MySQL", level: 82 },
        { name: "Docker", level: 75 },
        { name: "Cloudinary", level: 80 },
        { name: "MongoDB", level: 72 },
        { name: "Git & GitHub", level: 85 }
      ]
    }
  ];

  const projects = [
    {
      title: "SupportDesk — Customer Support CRM",
      subtitle: "Full-Stack Ticketing & Media Management Application",
      badge: "Production Live",
      badgeStyle: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      route: "api.supportdesk.internal/v1/tickets",
      description:
        "Full-stack CRM web application with role-based agent authentication, secure image uploads via Cloudinary, and relational database management.",
      tags: ["Java", "Spring Boot", "Spring Security", "MySQL", "Hibernate", "Cloudinary", "Docker", "Render"],
      points: [
        "Implemented agent authentication and secure role-based access using Spring Security.",
        "Integrated Cloudinary Java SDK via a Spring singleton bean for safe ticket attachment uploads.",
        "Designed relational database schemas with Hibernate/JPA, enforcing optimistic locking for ticket status updates.",
        "Configured automatic email alerts upon ticket creation using Gmail SMTP.",
        "Containerized the application using Docker and deployed it live to Render."
      ],
      curl: `curl -X POST https://support-desk-crm-qs00.onrender.com/tickets \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Login Bug","priority":"HIGH"}'`,
      github: "https://github.com/silently-feel/support-desk-crm",
      live: "https://support-desk-crm-qs00.onrender.com/tickets"
    },
    {
      title: "NutriScan — Food Health & Sustainability Scanner",
      subtitle: "Nutritional Assessment & Ecological Scoring Web Platform",
      badge: "Web Platform",
      badgeStyle: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      route: "api.nutriscan.internal/v1/analyze",
      description:
        "Full-stack web application built to analyze food products, display nutritional scores, and evaluate environmental impact.",
      tags: ["React.js", "Node.js", "Express.js", "REST APIs", "MongoDB"],
      points: [
        "Developed REST API endpoints to process, validate, and serve nutritional data in JSON format.",
        "Built dynamic search and display components using React with responsive UI state management.",
        "Collaborated on API design, MongoDB collection planning, and end-to-end testing."
      ],
      curl: null,
      github: "https://github.com/silently-feel",
      live: null
    }
  ];

  return (
    <div
      onMouseEnter={() => setCursorHovered(false)}
      className="relative min-h-screen bg-[#030712] text-slate-300 font-sans antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-black"
    >
      {/* 1. TOP SCROLL PROGRESS BAR */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 origin-left z-50 shadow-md shadow-cyan-500/50"
      />

      {/* 2. CUSTOM FLUID SPRING CURSOR */}
      <div
        className="fixed pointer-events-none z-50 hidden lg:block transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${cursorPos.x - 4}px, ${cursorPos.y - 4}px, 0)`
        }}
      >
        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-300" />
      </div>

      <div
        className={`fixed pointer-events-none z-40 hidden lg:block rounded-full border border-cyan-400/40 transition-all duration-300 ease-out ${
          cursorHovered ? "w-12 h-12 -ml-6 -mt-6 bg-cyan-500/10" : "w-7 h-7 -ml-3.5 -mt-3.5"
        }`}
        style={{
          transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`
        }}
      />

      {/* 3. INTERACTIVE CANVAS PARTICLE MESH */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      />

      {/* 4. TERMINAL INTRO LOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712]"
          >
            <div className="relative mb-6">
              <div className="w-28 h-28 rounded-full border-2 border-cyan-500/60 p-1 shadow-2xl shadow-cyan-500/30">
                <img
                  src="/avatar.jpg"
                  alt="Satyam Singh"
                  onError={(e) => {
                    e.target.src = "/favicon.jpg";
                  }}
                  className="w-full h-full rounded-full object-cover object-top"
                />
              </div>
            </div>

            <p className="text-xs font-mono text-cyan-400 mb-2 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              user@portfolio : ~ $ whoami
            </p>

            <h1 className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight flex items-center">
              {typedName}
              <span className="w-3 h-7 bg-cyan-400 ml-1.5 animate-pulse" />
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Grid Background */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(14,165,233,0.14),transparent)]" />
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:36px_36px]" />

      {/* Floating Island Navigation */}
      <header className="fixed top-4 inset-x-0 z-40 flex justify-center px-4">
        <nav className="flex items-center gap-4 sm:gap-6 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#080d1a]/85 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-950/40 text-xs font-medium text-slate-400">
          <a
            href="#about"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
            className="text-white font-mono font-bold tracking-wider hover:text-cyan-400 transition flex items-center gap-1 text-[13px]"
          >
            <span className="text-cyan-400">&lt;</span>
            <span>Satyam Singh</span>
            <span className="text-cyan-400">/&gt;</span>
          </a>

          <span className="w-px h-3.5 bg-slate-800 hidden sm:block" />

          <div className="hidden md:flex items-center gap-5">
            {["About", "Skills", "Projects", "Education", "Contact"].map((sec) => (
              <a
                key={sec}
                href={`#${sec.toLowerCase()}`}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                onClick={() => setActiveSection(sec.toLowerCase())}
                className={`transition-colors hover:text-cyan-400 ${
                  activeSection === sec.toLowerCase() ? "text-cyan-400 font-semibold" : ""
                }`}
              >
                {sec}
              </a>
            ))}
          </div>

          <span className="w-px h-3.5 bg-slate-800" />
          <button
            onClick={copyEmail}
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
            className="flex items-center gap-1.5 text-cyan-300 hover:text-white transition font-mono cursor-pointer"
          >
            {copiedEmail ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
            {copiedEmail ? "Copied" : "Email"}
          </button>
        </nav>
      </header>

      <main className="relative z-20 max-w-5xl mx-auto px-6 pt-32 pb-24 space-y-28">
        {/* HERO SECTION */}
        <section id="about" className="pt-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12"
          >
            {/* Left Content */}
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 shadow-sm shadow-cyan-500/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Aspiring Software Developer &bull; Entry-Level Engineer
              </div>

              <div className="space-y-1">
                <p className="text-sm font-mono text-cyan-400 tracking-wider">
                  Hi there, I am
                </p>
                <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                  Satyam Singh.
                </h1>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 tracking-tight pt-1">
                  Building Clean Code &amp; Reliable Web Solutions.
                </h2>
              </div>

              <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Computer Engineering graduate with a solid foundation in <span className="text-white font-semibold">Java</span>, <span className="text-white font-semibold">Spring Boot</span>, object-oriented design, and database management. Dedicated to writing maintainable code and solving real-world backend challenges.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <a
                  href="#projects"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs tracking-wide transition shadow-lg shadow-cyan-500/25 active:scale-95"
                >
                  View My Work &rarr;
                </a>

                {/* Download CV */}
                <a
                  href="/resume.pdf"
                  download="Satyam_Singh_Resume.pdf"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  className="px-5 py-3 rounded-xl bg-[#0b1222] hover:bg-[#111c35] border border-cyan-500/40 text-cyan-300 hover:text-white font-medium text-xs tracking-wide transition flex items-center gap-2 active:scale-95 shadow-md shadow-cyan-950/50"
                >
                  <FaDownload size={12} className="text-cyan-400" /> Download CV
                </a>

                <button
                  onClick={copyEmail}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  className="px-4 py-3 rounded-xl bg-[#0b1222] hover:bg-[#111c35] border border-slate-800 text-slate-300 font-medium text-xs tracking-wide transition flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  {copiedEmail ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                  {copiedEmail ? "Copied!" : "Copy Email"}
                </button>
              </div>

              {/* Social Connections */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-2 text-slate-400">
                <a
                  href="https://github.com/silently-feel"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  className="p-3 rounded-xl bg-[#0b1222] border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 hover:scale-105 transition"
                  title="GitHub"
                >
                  <FaGithub size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/satyam-singh-05b369376/"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  className="p-3 rounded-xl bg-[#0b1222] border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 hover:scale-105 transition"
                  title="LinkedIn"
                >
                  <FaLinkedin size={16} />
                </a>
                <a
                  href="https://leetcode.com/u/silently_code/"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  className="p-3 rounded-xl bg-[#0b1222] border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/40 hover:scale-105 transition"
                  title="LeetCode"
                >
                  <FaTerminal size={15} />
                </a>
              </div>
            </div>

            {/* Right Photo Card with Satyam Singh Nameplate */}
            <div className="relative shrink-0 group">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-500/30 to-blue-600/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition duration-500" />
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-3xl overflow-hidden border-2 border-cyan-500/30 bg-[#080d1a] p-2.5 shadow-2xl">
                <img
                  src="/avatar.jpg"
                  alt="Satyam Singh"
                  onError={(e) => {
                    e.target.src = "/favicon.jpg";
                  }}
                  className="w-full h-full rounded-2xl object-cover object-top filter contrast-105 group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-x-2.5 bottom-2.5 py-2 px-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-b-2xl text-center">
                  <p className="text-white font-mono font-bold text-xs tracking-wider">
                    Satyam Singh
                  </p>
                </div>
              </div>

              {/* Floating Pill: Location */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-3 -left-3 px-3.5 py-1.5 rounded-full bg-[#080d1a]/95 border border-cyan-500/30 shadow-xl text-[11px] font-mono text-slate-300 flex items-center gap-1.5 backdrop-blur-md"
              >
                <FaMapMarkerAlt className="text-cyan-400" size={11} /> Mumbai, India
              </motion.div>

              {/* Floating Pill: Status */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-3 px-3.5 py-1.5 rounded-full bg-[#080d1a]/95 border border-emerald-500/30 shadow-xl text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Open to Opportunities
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* METRICS STRIP */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "CORE FOCUS", val: "Java & Spring Boot" },
            { label: "DATABASE", val: "MySQL & JPA" },
            { label: "EDUCATION", val: "B.Tech Graduate" },
            { label: "STATUS", val: "Ready to Join" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3, borderColor: "rgba(14, 165, 233, 0.4)" }}
              className="p-5 rounded-2xl bg-[#080d1a]/70 border border-slate-800/80 backdrop-blur-sm text-center transition duration-200"
            >
              <span className="text-[10px] font-mono uppercase text-cyan-400 block mb-1">
                {item.label}
              </span>
              <span className="text-sm sm:text-base font-bold text-white">{item.val}</span>
            </motion.div>
          ))}
        </section>

        {/* CORE PILLARS */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3.5 py-1 rounded-full">
              What I Bring
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Strong Fundamentals &amp; Quick Learning
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            {[
              {
                icon: <FaServer className="text-cyan-400" size={20} />,
                title: "Backend Development",
                desc: "Building RESTful web services, structuring clean service layers, and managing relational databases with Spring Boot."
              },
              {
                icon: <BiCodeAlt className="text-teal-400" size={20} />,
                title: "Problem Solving",
                desc: "Solid grasp of Data Structures and Algorithms with regular problem practice on LeetCode for optimized logic."
              },
              {
                icon: <FaDocker className="text-blue-400" size={20} />,
                title: "Modern Dev Workflow",
                desc: "Proficient with Git version control, multi-stage Docker packaging, Postman API testing, and Render deployments."
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, borderColor: "rgba(14, 165, 233, 0.5)" }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl bg-[#080d1a]/60 border border-slate-800/80 shadow-lg hover:bg-[#0c1426] transition"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SKILLS SECTION WITH CLICKABLE BENTO CARDS */}
        <section id="skills" className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3.5 py-1 rounded-full">
              Tech Stack
            </span>
            <h2 className="text-3xl font-extrabold text-white">Skills &amp; Technologies</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Skill Bars */}
            <div className="lg:col-span-2 space-y-6">
              {skillGroups.map((group, gIdx) => (
                <div
                  key={gIdx}
                  className="p-6 sm:p-7 rounded-2xl bg-[#080d1a]/70 border border-slate-800/80 space-y-4"
                >
                  <h3 className="text-xs font-bold text-cyan-300 uppercase font-mono tracking-wider">
                    {group.category}
                  </h3>
                  <div className="space-y-3.5">
                    {group.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-300">
                          <span>{skill.name}</span>
                          <span className="text-cyan-400 font-mono">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.85, ease: "easeOut" }}
                            className={`h-full rounded-full bg-gradient-to-r ${group.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Clickable Bento Cards */}
            <div className="space-y-6">
              {/* LeetCode Clickable Card */}
              <motion.a
                href="https://leetcode.com/u/silently_code/"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group block p-6 rounded-2xl bg-[#080d1a]/70 border border-slate-800/80 hover:border-amber-500/50 transition duration-300 relative overflow-hidden shadow-lg hover:shadow-amber-500/10 cursor-pointer"
              >
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[9px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Sync
                </div>

                <div className="flex flex-col items-center justify-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 group-hover:border-amber-500/40 flex items-center justify-center text-amber-400 font-mono text-lg font-bold transition">
                    LC
                  </div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition">
                      LeetCode
                    </h4>
                    <FaExternalLinkAlt size={10} className="text-slate-500 group-hover:text-amber-400 transition" />
                  </div>
                  <p className="text-xs text-slate-500 font-mono">@silently_code</p>
                  <div className="pt-2">
                    <span className="text-3xl font-extrabold text-white group-hover:text-amber-300 transition">
                      {leetcodeSolved}
                    </span>
                    <span className="block text-[11px] font-mono text-slate-400 uppercase">
                      DSA Problems Solved
                    </span>
                  </div>
                </div>
              </motion.a>

              {/* GitHub Clickable Card */}
              <motion.a
                href="https://github.com/silently-feel"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group block p-6 rounded-2xl bg-[#080d1a]/70 border border-slate-800/80 hover:border-cyan-500/50 transition duration-300 relative overflow-hidden shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
              >
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[9px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Sync
                </div>

                <div className="flex flex-col items-center justify-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 group-hover:border-cyan-500/40 flex items-center justify-center text-cyan-400 transition">
                    <FaGithub size={22} />
                  </div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition">
                      GitHub
                    </h4>
                    <FaExternalLinkAlt size={10} className="text-slate-500 group-hover:text-cyan-400 transition" />
                  </div>
                  <p className="text-xs text-slate-500 font-mono">@silently-feel</p>
                  <div className="pt-2">
                    <span className="text-3xl font-extrabold text-white group-hover:text-cyan-300 transition">
                      {githubRepos}
                    </span>
                    <span className="block text-[11px] font-mono text-slate-400 uppercase">
                      Public Repositories
                    </span>
                  </div>
                </div>
              </motion.a>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION WITH MACOS TERMINAL FRAMES & CURL */}
        <section id="projects" className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 flex items-center gap-1.5">
                <HiSparkles size={14} /> My Projects
              </span>
              <h2 className="text-3xl font-bold text-white mt-1">Featured Work</h2>
            </div>
            <span className="text-xs font-mono text-slate-500">01 — 02</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group relative rounded-3xl bg-[#080d1a]/60 border border-slate-800/90 shadow-2xl hover:border-cyan-500/40 transition duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* MacOS Chrome Header */}
                <div className="px-5 py-3 bg-[#050914] border-b border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 truncate max-w-[200px]">
                    {proj.route}
                  </span>
                  <div className="w-8" />
                </div>

                <div className="p-7 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${proj.badgeStyle}`}>
                        {proj.badge}
                      </span>

                      <div className="flex items-center gap-2">
                        {proj.github && (
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noreferrer"
                            onMouseEnter={() => setCursorHovered(true)}
                            onMouseLeave={() => setCursorHovered(false)}
                            className="p-2 rounded-lg text-slate-400 bg-[#0b1222] border border-slate-800 hover:text-white hover:border-cyan-500/40 transition"
                            title="View Repository"
                          >
                            <FaGithub size={13} />
                          </a>
                        )}
                        {proj.live && (
                          <a
                            href={proj.live}
                            target="_blank"
                            rel="noreferrer"
                            onMouseEnter={() => setCursorHovered(true)}
                            onMouseLeave={() => setCursorHovered(false)}
                            className="p-2 rounded-lg text-black bg-cyan-400 hover:bg-cyan-300 transition"
                            title="Live Demo"
                          >
                            <FaExternalLinkAlt size={11} />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition mb-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mb-3">{proj.subtitle}</p>

                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {proj.tags.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#040814] text-cyan-300/90 border border-cyan-500/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Backend cURL Terminal Preview */}
                    {proj.curl && (
                      <div className="mb-5 p-3 rounded-xl bg-[#040814] border border-slate-800 font-mono text-[11px] relative group/curl">
                        <div className="flex justify-between items-center text-slate-500 pb-1.5 border-b border-slate-800/70 mb-2">
                          <span className="flex items-center gap-1 text-[10px]">
                            <FaCode size={11} className="text-cyan-400" /> API Test cURL
                          </span>
                          <button
                            onClick={copyCurl}
                            onMouseEnter={() => setCursorHovered(true)}
                            onMouseLeave={() => setCursorHovered(false)}
                            className="text-cyan-400 hover:text-white transition flex items-center gap-1 text-[10px] cursor-pointer"
                          >
                            {copiedCurl ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                            {copiedCurl ? "Copied" : "Copy"}
                          </button>
                        </div>
                        <pre className="text-slate-300 overflow-x-auto whitespace-pre-wrap leading-tight">
                          {proj.curl}
                        </pre>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-800/80">
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      {proj.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="space-y-8">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs uppercase tracking-widest font-mono text-cyan-400">
              Academic Background
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">Education</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="p-7 rounded-3xl bg-[#080d1a]/60 border border-slate-800/90 flex items-start gap-5 hover:border-cyan-500/30 transition">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <FaGraduationCap size={22} />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-cyan-400 font-semibold">2021 — 2026</span>
                <h3 className="text-lg font-bold text-white">
                  Bachelor of Technology in Computer Engineering
                </h3>
                <p className="text-xs text-slate-400">University of Mumbai &bull; CGPA: 7.12 / 10</p>
                <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                  Core coursework in Object-Oriented Programming, Data Structures, Relational Databases, and Operating Systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
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
                  &times; Something went wrong. Please email directly at satyam.singh261103@gmail.com
                </p>
              )}
            </form>

            <div className="space-y-3">
              {[
                { label: "Email", val: "satyam.singh261103@gmail.com", href: "mailto:satyam.singh261103@gmail.com" },
                { label: "LinkedIn", val: "satyam-singh-05b369376", href: "https://www.linkedin.com/in/satyam-singh-05b369376/" },
                { label: "GitHub", val: "silently-feel", href: "https://github.com/silently-feel" },
                { label: "Location", val: "Mumbai, India", href: null },
                { label: "Availability", val: "Immediate / Open to Roles", href: null }
              ].map((item, idx) => (
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
      </main>

      {/* FOOTER */}
      <footer className="relative z-20 border-t border-slate-800/80 py-8 bg-[#030712] text-center text-xs font-mono text-slate-500">
        &copy; {new Date().getFullYear()} Satyam Singh &bull; Built with React, Tailwind CSS &amp; Framer Motion
      </footer>
    </div>
  );
}