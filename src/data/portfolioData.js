export const personalInfo = {
  name: "Satyam Singh",
  title: "Building Clean Code, AI Tools & Reliable Web Solutions.",
  subHeadline: "Aspiring Software Developer • Backend & AI Systems",
  bio: "Computer Engineering graduate with a solid foundation in Java, Spring Boot, object-oriented design, AI integrations, and database management. Dedicated to writing maintainable code and solving real-world challenges.",
  location: "Mumbai, India",
  status: "Open to Opportunities",
  email: "satyam.singh261103@gmail.com",
  github: "https://github.com/silent-coder-dev",
  githubUsername: "silent-coder-dev",
  linkedin: "https://www.linkedin.com/in/satyam-singh-05b369376/",
  leetcode: "https://leetcode.com/u/silently_code/",
  leetcodeUsername: "silently_code",
  formspreeEndpoint: "https://formspree.io/f/xaenjroy"
};

export const metricsData = [
  { label: "CORE FOCUS", val: "Java & Spring Boot" },
  { label: "AI & DATABASE", val: "Gemini AI & MySQL" },
  { label: "EDUCATION", val: "B.Tech Graduate" },
  { label: "STATUS", val: "Ready to Join" }
];

export const skillGroups = [
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
    category: "Databases, AI & Tools",
    color: "from-emerald-400 to-cyan-500",
    skills: [
      { name: "MySQL & MongoDB", level: 82 },
      { name: "Docker", level: 75 },
      { name: "Gemini AI API / LLM Prompting", level: 84 },
      { name: "Cloudinary", level: 80 },
      { name: "Git & GitHub", level: 85 }
    ]
  }
];

export const projectsData = [
  {
    title: "AI Resume Builder — Smart ATS Resume Generator",
    subtitle: "Full-Stack AI Application with Real-Time Preview & Export",
    badge: "Production Live",
    badgeStyle: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    route: "ai-resume-builder-silent.vercel.app",
    description:
      "An AI-powered web platform that generates and optimizes ATS-compliant professional resumes. Features prompt-driven summaries, work experience refinement, live responsive templates, and instant PDF download.",
    tags: ["React.js", "Tailwind CSS", "Gemini AI", "Node.js", "Express", "Vercel", "PDF Export"],
    points: [
      "Integrated AI prompting to analyze raw user experience and output high-impact, ATS-optimized bullet points.",
      "Built reactive state management allowing instant real-time live preview across multiple layout templates.",
      "Engineered client-side print-ready PDF export with precision styling.",
      "Deployed live on Vercel with responsive desktop and mobile layouts."
    ],
    curl: null,
    github: "https://github.com/silent-coder-dev/ai-resume-builder",
    live: "https://ai-resume-builder-silent.vercel.app/"
  },
  {
    title: "SupportDesk — Customer Support CRM",
    subtitle: "Full-Stack Ticketing & Media Management Application",
    badge: "Production Live",
    badgeStyle: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    route: "support-desk-crm-qs00.onrender.com/tickets",
    description:
      "Full-stack CRM web application with role-based agent authentication, secure image uploads via Cloudinary, and relational database management deployed live on Render.",
    tags: ["Java", "Spring Boot", "Spring Security", "MySQL", "Hibernate", "Cloudinary", "Docker", "Render"],
    points: [
      "Implemented agent authentication and secure role-based access using Spring Security.",
      "Integrated Cloudinary Java SDK via a Spring singleton bean for safe ticket attachment uploads.",
      "Designed relational database schemas with Hibernate/JPA, enforcing optimistic locking for ticket status updates.",
      "Configured automatic email alerts upon ticket creation using Gmail SMTP.",
      "Containerized the entire application using Docker and deployed it live to Render."
    ],
    curl: `curl -X POST https://support-desk-crm-qs00.onrender.com/tickets \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Login Bug","priority":"HIGH"}'`,
    github: "https://github.com/silent-coder-dev/satyam-portfolio",
    live: "https://support-desk-crm-qs00.onrender.com/tickets"
  },
  {
    title: "NutriScan — Food Health & Sustainability Scanner",
    subtitle: "Nutritional Assessment & Ecological Scoring Web Platform",
    badge: "Web Platform",
    badgeStyle: "bg-teal-500/10 text-teal-400 border-teal-500/30",
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
    github: "https://github.com/silent-coder-dev",
    live: null
  }
];