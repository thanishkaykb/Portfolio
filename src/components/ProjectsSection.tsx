import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "CongestiQ-AI",
    desc: "AI-powered smart traffic intelligence platform with real-time map data, weather insights, and intelligent routing.",
    tech: ["TypeScript", "AI", "Maps API"],
    repo: "https://github.com/thanishkaykb/CongestiQ-AI",
    featured: true,
  },
  {
    name: "Anonymous Whispers",
    desc: "Privacy-first web app for sharing thoughts and confessions completely anonymously.",
    tech: ["TypeScript", "React", "Full Stack"],
    repo: "https://github.com/thanishkaykb/Anonymous_Whispers",
    featured: true,
  },
  {
    name: "Social Media Platform",
    desc: "Full-stack social platform with user profiles, posts, likes, and comments using Node.js, Express & MySQL.",
    tech: ["JavaScript", "Node.js", "MySQL"],
    repo: "https://github.com/thanishkaykb/Social-Media-Platform",
    featured: true,
  },
  {
    name: "Local Store E-Commerce",
    desc: "E-commerce platform for local stores with product browsing, cart management using Node.js & MySQL.",
    tech: ["JavaScript", "Express", "MySQL"],
    repo: "https://github.com/thanishkaykb/Local-Store-E-commerce-Platform",
  },
  {
    name: "Employee Management System",
    desc: "CRUD application with JWT-based authentication for managing employee records.",
    tech: ["JavaScript", "Node.js", "JWT"],
    repo: "https://github.com/thanishkaykb/Employee-Management-System-CRUD-Application-",
  },
  {
    name: "Secure Auth System",
    desc: "User authentication with bcrypt password hashing, JWT tokens, and protected routes.",
    tech: ["JavaScript", "Express", "bcrypt"],
    repo: "https://github.com/thanishkaykb/Secure-User-Authentication-System",
  },
  {
    name: "Language Translation Tool",
    desc: "Smart multilingual translator powered by modern translation APIs for accurate text conversion.",
    tech: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/thanishkaykb/LanguageTranslationTool",
  },
  {
    name: "FAQ Chatbot",
    desc: "Intelligent chatbot using text preprocessing and cosine similarity to answer FAQs.",
    tech: ["HTML", "JavaScript", "NLP"],
    repo: "https://github.com/thanishkaykb/ChatbotForFAQs",
  },
  {
    name: "VPN Landing Page",
    desc: "Modern, visually appealing landing page with clean layout design and responsive UI.",
    tech: ["HTML", "CSS"],
    repo: "https://github.com/thanishkaykb/LandingPage",
  },
  {
    name: "Weather App",
    desc: "Interactive weather application displaying real-time weather data for any city.",
    tech: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/thanishkaykb/BasicWeatherApp",
  },
  {
    name: "Temperature Converter",
    desc: "Responsive converter between Celsius, Fahrenheit, and Kelvin with clean UI.",
    tech: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/thanishkaykb/TemperatureConverterWebsite",
  },
  {
    name: "Flashcard Quiz App",
    desc: "Interactive study tool with flippable flashcards, navigation, and quiz management.",
    tech: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/thanishkaykb/FlashCardQuizApp",
  },
  {
    name: "Random Quote Generator",
    desc: "Elegant app displaying inspirational quotes with author attribution on each click.",
    tech: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/thanishkaykb/RandomQuoteGenerator",
  },
  {
    name: "Password Generator",
    desc: "Secure command-line tool for generating strong random passwords with customizable options.",
    tech: ["Python"],
    repo: "https://github.com/thanishkaykb/PasswardGenerator",
  },
  {
    name: "BMI Calculator",
    desc: "Simple BMI calculator that computes Body Mass Index and displays health categories.",
    tech: ["Python"],
    repo: "https://github.com/thanishkaykb/BMI_Calculator",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => (
  <motion.a
    href={project.repo}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
    className="group relative rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_4px_20px_hsl(var(--primary)/0.1)] cursor-pointer"
  >
    <div className="relative z-10 p-6">
      {project.featured && (
        <span className="absolute top-4 right-4 text-[10px] font-display font-bold tracking-widest uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">
          Featured
        </span>
      )}
      <div className="flex items-start gap-3 mb-3">
        <Github size={18} className="mt-0.5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
        <h3 className="font-display font-semibold text-sm leading-tight text-foreground group-hover:text-primary transition-colors">
          {project.name}
        </h3>
      </div>
      <p className="text-muted-foreground text-xs leading-relaxed mb-4 font-body">
        {project.desc}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="text-[10px] font-display font-medium px-2 py-0.5 rounded-full text-primary/80 bg-primary/5 border border-primary/10">
            {t}
          </span>
        ))}
      </div>
      <ExternalLink size={14} className="absolute bottom-5 right-5 text-muted-foreground/40 group-hover:text-primary/60 transition-colors" />
    </div>
  </motion.a>
);

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">Projects</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Things I've <span className="text-gradient">Built</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm mb-12 max-w-xl">
            A collection of projects spanning full-stack apps, AI tools, and frontend experiments — all open source on GitHub.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              isHovered={hoveredIndex === i}
              onHover={() => setHoveredIndex(i)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/thanishkaykb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-display text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={16} />
            View all on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
