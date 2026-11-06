/**
 * Single source of truth for site content.
 * Facts come from Thanishka's brief and resume · nothing is invented here.
 */

export const RESUME_PATH = "/Thanishka_Yogesh_Resume.pdf";

export const LINKS = {
  linkedin: "https://www.linkedin.com/in/thanishka-yogesh/",
  github: "https://github.com/thanishkaykb",
  email: "thanishka.ykb@gmail.com",
};

export interface Project {
  index: string;
  name: string;
  title: string;
  description: string;
  features: string[];
  stack: string[];
  link: string;
  achievement?: string;
}

export const projects: Project[] = [
  {
    index: "01",
    name: "PAIMANA-AI",
    title: "Infrastructure Risk Intelligence Platform",
    description:
      "An AI-powered project monitoring platform designed to identify cost, schedule, and execution risks across infrastructure projects.",
    features: [
      "Predictive risk scoring and portfolio analytics",
      "AI-driven insights and alerts",
      "SHAP-based explainability",
      "Risk trend dashboards and What-If simulations",
      "RAG-assisted insights",
    ],
    stack: ["React", "Vite", "FastAPI", "Python", "Scikit-learn", "SHAP", "Pandas"],
    link: "https://paimana-ai-tau.vercel.app/",
  },
  {
    index: "02",
    name: "SILENT VOICES SEEN",
    title: "Accessibility & Communication Platform",
    description:
      "An accessibility-focused platform designed to support communication through speech, text, and sign language.",
    features: [
      "Text-to-sign, voice-to-sign, and sign-to-text workflows",
      "Camera-based sign recognition and fingerspelling",
      "Responsive interfaces and real-time interaction",
      "Team leadership and development integration",
    ],
    stack: ["React", "Next.js", "Node.js", "Computer Vision", "Speech Recognition", "Vercel"],
    link: "https://silent-voice-seen.vercel.app/",
  },
  {
    index: "03",
    name: "CONGESTIQ-AI",
    title: "AI-Powered Urban Traffic Intelligence",
    description:
      "A predictive traffic intelligence system that combines traffic, weather, incident, and safety information to identify potential congestion risks.",
    features: [
      "Explainable low, medium, and high risk predictions",
      "Traffic intelligence dashboards",
      "Signal timing recommendations",
      "Route suggestions",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Vercel", "Custom Rule Engine"],
    link: "https://congestiq-ai.vercel.app/",
    achievement: "2ND PRIZE · CODE CARNIVAL 2K26 · SIMATS ENGINEERING",
  },
];

export interface ExperienceItem {
  role: string;
  org: string;
  description: string;
}

export const experience: ExperienceItem[] = [
  {
    role: "Full-Stack Web Development Intern",
    org: "Prodigy InfoTech",
    description: "Built full-stack web applications using HTML, CSS, JavaScript, and Node.js.",
  },
  {
    role: "Software Development Intern",
    org: "Oasis Infobyte",
    description: "Developed and styled web interfaces using modern front-end frameworks.",
  },
  {
    role: "AI & App Development Intern",
    org: "CodeAlpha",
    description:
      "Worked on AI algorithms using machine-learning techniques and contributed to open-source AI projects.",
  },
  {
    role: "Student Coordinator & Event Organizer",
    org: "Sri Sairam Engineering College",
    description:
      "Coordinated INTELLECT HACK 2026, Design Sprint, Innovate to Impact, Portfolio Workshop, and GEN-A-THON, contributing to registrations, communications, promotions, and event execution.",
  },
];

export const leadership: string[] = [
  "Outreach and Multimedia Committee Lead · IEEE TEMS",
  "Advocate · MAGIC Member · UBA",
  "Mastermind · MAGIC Member · UI Autonomistic Club",
];

export interface Milestone {
  label: string;
  detail: string;
}

export const milestones: Milestone[] = [
  { label: "2ND PRIZE", detail: "Code Carnival 2K26, SIMATS Engineering · CongestiQ-AI" },
  { label: "FINALIST", detail: "SAI HACK FEST 2026 · Top 40 teams" },
  { label: "FINALIST", detail: "IEEE Xtreme 19.0 · Global Rank 228 · India Rank 113 · 6th at Sri Sairam (Team TECHXKUZHU)" },
  { label: "FINALIST", detail: "technoVIT'26, VIT Chennai · 24-hour hackathon, team selected for the final round (Green Pin Nexus)" },
  { label: "FINALIST", detail: "Sairam SDG Ideathon 6.0 · presented Silent Voices, Seen" },
  { label: "FINALIST", detail: "ByteBlaze · 12-hour national level hackathon, SIMATS Engineering" },
  { label: "IBM", detail: "1M1B Think Beyond" },
  { label: "CISCO", detail: "Introduction to Modern AI" },
  { label: "SKILLSOFT", detail: "Python Concurrent Programming" },
  { label: "FORAGE", detail: "Tata GenAI Powered Data Analytics Job Simulation" },
];

export const toolkit = [
  { category: "Languages", items: ["Python", "Java", "C", "JavaScript", "SQL"] },
  { category: "Web Development", items: ["HTML", "CSS", "React.js", "Node.js", "Express.js"] },
  { category: "Backend & Databases", items: ["FastAPI", "MySQL", "Supabase", "REST APIs"] },
  { category: "Tools", items: ["Git", "GitHub", "Vercel", "VS Code", "Figma"] },
];
