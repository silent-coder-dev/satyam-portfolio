export const personalInfo = {
  name: "Satyam Singh",
  role: "Java & Spring Boot developer",
  location: "Mumbai, India",
  timeZone: "Asia/Kolkata",
  availability: "Open to full-time roles",
  email: "satyam.singh261103@gmail.com",
  resume: "/resume.pdf",
  resumeFileName: "Satyam_Singh_Resume.pdf",
  github: "https://github.com/silent-coder-dev",
  githubUsername: "silent-coder-dev",
  linkedin: "https://www.linkedin.com/in/satyam-singh-05b369376/",
  leetcode: "https://leetcode.com/u/silently_code/",
  leetcodeUsername: "silently_code",
  formspreeEndpoint: "https://formspree.io/f/xaenjroy",
};

export const navLinks = [
  { id: "work", label: "Work" },
  { id: "vibe-coding", label: "Vibe coding" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const projects = [
  {
    slug: "supportdesk",
    name: "SupportDesk",
    kind: "Customer support CRM",
    year: "2026",
    summary:
      "A ticketing system for small support teams. Customers raise and track tickets from a public portal without making an account, agents work a shared queue that updates live, and admins can see every ticket in one place.",
    highlights: [
      "Moved the database from SQLite to MySQL after concurrent requests started timing out on SQLite's file-level write lock.",
      "Added optimistic locking with JPA @Version, so if two agents edit the same ticket the second save gets a 409 instead of quietly overwriting the first.",
      "Open dashboards get queue changes through Server-Sent Events, so nobody has to refresh.",
      "Customers get an email when a ticket is created and again when it's resolved. Agent roles are handled with Spring Security.",
    ],
    stack: ["Java 21", "Spring Boot 3", "Spring Security", "JPA / Hibernate", "MySQL", "Thymeleaf", "Docker"],
    live: "https://support-desk-crm-qs00.onrender.com/",
    source: "https://github.com/silent-coder-dev/support-desk-crm",
    domain: "support-desk-crm-qs00.onrender.com",
    image: "/supportdesk-crm.webp",
    imagePosition: "center top",
    note: "Hosted on Render's free tier, so the first visit can take up to a minute while the server wakes up.",
  },
  {
    slug: "nutriscan",
    name: "NutriScan",
    kind: "Food label scanner",
    year: "2026",
    summary:
      "Scan a packaged food's barcode and get a plain-English read on the sugar, salt, fat and additives in it, with allergy and diet warnings, a veg / non-veg mark, and better-rated alternatives from the same shelf.",
    highlights: [
      "Spring Boot API with JWT auth and PostgreSQL. Products are looked up in the local database first, then Open Food Facts, with an optional AI estimate as a last resort.",
      "Guests get five free scans a day, rate-limited in Redis, with an in-memory fallback when Redis isn't available.",
      "61 unit and integration tests on the backend. The Docker image is tuned to run in 512 MB.",
    ],
    stack: ["Java 21", "Spring Boot 4", "PostgreSQL", "Redis", "JWT", "Next.js", "TypeScript"],
    live: "https://nutriscan-web-pi.vercel.app/",
    source: "https://github.com/silent-coder-dev/nutriscan",
    domain: "nutriscan-web-pi.vercel.app",
    image: "/nutriscan.webp",
    imagePosition: "center top",
    note: "Started as a team project in college. This version is a rebuild on Spring Boot and Next.js. Product data comes from Open Food Facts.",
  },
];

export const vibeCoding = {
  intro:
    "Besides the Java work, I build with AI coding tools. I describe what I want, let the AI write a first version, then read it, run it and fix what's wrong. It's a quick way to try an idea, and to work in front-end tools I know less well, like Next.js and TypeScript.",
  details: [
    { label: "Tools", value: "GitHub Copilot, Claude Code" },
    { label: "Good for", value: "Prototypes, UI work, boilerplate and first drafts" },
    { label: "What I still do myself", value: "Decide what to build, review every change, test it, and keep API keys out of the code" },
  ],
};

export const vibeProjects = [
  {
    slug: "resume-studio",
    name: "AI Resume Studio",
    kind: "Resume editor · Vibe coded",
    year: "2026",
    summary:
      "A resume editor with a live A4 preview, eleven print templates and PDF export. The AI features (Gemini or OpenRouter) proofread, draft summaries and compare a resume against a job description, without inventing skills or numbers.",
    highlights: [
      "PDF import only fills in what's actually in the file. Missing sections stay empty instead of being guessed.",
      "The job-description matcher separates required gaps from nice-to-haves instead of just showing a percentage.",
      "Export renders a cleaned copy of the resume in a hidden iframe, so zoom and editor controls never end up in the PDF.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Gemini API", "OpenRouter"],
    live: "https://ai-resume-builder-silent.vercel.app/",
    source: "https://github.com/silent-coder-dev/ai-resume-builder",
    domain: "ai-resume-builder-silent.vercel.app",
    image: "/ai-resume-builder.webp",
    imagePosition: "left top",
    note: "Vibe coded with AI tools, then tested and fixed by hand.",
  },
];

export const marqueeItems = [
  "Java",
  "Spring Boot",
  "Spring Security",
  "Hibernate",
  "MySQL",
  "PostgreSQL",
  "REST APIs",
  "Docker",
  "Redis",
  "Next.js",
  "Vibe coding",
];

export const otherProjects = [
  {
    name: "Student Vault",
    description: "Desktop app for student records, with photos stored in MySQL and CSV export.",
    stack: "Java Swing · JDBC · MySQL",
    year: "2026",
    href: "https://github.com/silent-coder-dev/student-vault-desktop",
  },
  {
    name: "Online Diary",
    description: "Journal app with create, edit and delete for text, image and video entries.",
    stack: "TypeScript",
    year: "2025",
    href: "https://github.com/silent-coder-dev/Dairy",
  },
  {
    name: "Weather",
    description: "City weather lookup on the OpenWeather API, with matching Unsplash backgrounds.",
    stack: "HTML · CSS · JavaScript",
    year: "2025",
    href: "https://github.com/silent-coder-dev/Weather_Website",
  },
];

export const stackGroups = [
  {
    label: "Most of my work",
    items: ["Java", "Spring Boot", "Spring Security", "Spring Data JPA / Hibernate", "MySQL", "REST APIs"],
  },
  {
    label: "Comfortable with",
    items: ["PostgreSQL", "Docker", "Maven", "JUnit", "Thymeleaf", "Git & GitHub"],
  },
  {
    label: "Used in projects",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redis", "Cloudinary", "Gemini & OpenRouter APIs", "Render", "Vercel"],
  },
  {
    label: "Fundamentals",
    items: ["OOP", "Data structures & algorithms", "Collections", "Exception handling", "HTTP & JSON", "MVC"],
  },
];

export const education = [
  {
    period: "2021 – 2026",
    title: "B.Tech, Computer Engineering",
    place: "University of Mumbai",
    score: "CGPA 7.12 / 10",
  },
  {
    period: "2021",
    title: "Higher Secondary Certificate (HSC)",
    place: "Maharashtra State Board",
    score: "86.83%",
  },
  {
    period: "2019",
    title: "Secondary School Certificate (SSC)",
    place: "Maharashtra State Board",
    score: "74.60%",
  },
];

export const certifications = [
  { title: "Java, Python, C, PHP & MySQL", issuer: "Spoken Tutorial, IIT Bombay" },
  { title: "Programming and Data Structures test", issuer: "AICTE PARAKH" },
  { title: "Python Essentials 2", issuer: "Cisco Networking Academy" },
  { title: "Full Stack, Cloud Computing, Tableau & Virtualization", issuer: "Infosys" },
];

// "01", "02", ... in the order sections appear in the nav.
export const sectionNumber = (id) => String(navLinks.findIndex((link) => link.id === id) + 1).padStart(2, "0");

// Shown until the live numbers load, or if the stats services are down.
export const fallbackStats = {
  githubRepos: 9,
  leetcode: { total: 234, easy: 141, medium: 89, hard: 4 },
};
