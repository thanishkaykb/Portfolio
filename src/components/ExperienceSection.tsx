import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Briefcase, Building2, Calendar, Sparkles } from "lucide-react";

interface Role {
  title: string;
  company: string;
  type: string;
  period: string;
  description?: string;
}

const experiences: Role[] = [
  { title: "Campus Ambassador Coordinator", company: "KM UniTech", type: "Full-time", period: "Feb 2026 – Present" },
  { title: "Marketing Team Lead", company: "KM UniTech", type: "Full-time", period: "Feb 2026 – Present" },
  { title: "Design Intern", company: "KM UniTech", type: "Internship", period: "Jan 2026 – Present" },
  { title: "Volunteer", company: "CodeSapiens - Student Community of Coders", type: "Volunteer", period: "Feb 2026 – Present" },
  { title: "Campus Ambassador", company: "HCL GUVI", type: "Internship", period: "Jan 2026 – Present" },
  { title: "Campus Ambassador", company: "Zyra Academy", type: "Internship", period: "Jan 2026 – Present" },
  { title: "Founder & Community Owner", company: "TS Hub", type: "Full-time", period: "Jan 2026 – Present", description: "A WhatsApp community sharing info about upcoming Events and Hackathons." },
  { title: "Event Coordinator & Social Media Manager", company: "IGNITERS", type: "Part-time", period: "Jan 2026 – Present" },
  { title: "Full-Stack Web Development Intern", company: "Prodigy InfoTech", type: "Internship", period: "Jan 2026 – Feb 2026" },
  { title: "Google Student Ambassador", company: "Google", type: "Internship", period: "Dec 2025 – Present" },
  { title: "Campus Ambassador", company: "HYPEDIN", type: "Part-time", period: "Dec 2025 – Present" },
  { title: "Campus Ambassador", company: "CampusCrew", type: "Part-time", period: "Dec 2025 – Present" },
  { title: "Campus Ambassador", company: "White Devils Tech Community™", type: "Part-time", period: "Dec 2025 – Present" },
  { title: "Campus Ambassador", company: "DAKH EDU SOLUTIONS", type: "Part-time", period: "Dec 2025 – Present" },
  { title: "Campus Ambassador", company: "SmartED Innovations", type: "Part-time", period: "Dec 2025 – Present" },
  { title: "Campus Ambassador for Backwaters'26", company: "IIM Kozhikode", type: "Part-time", period: "Dec 2025 – Present" },
  { title: "Web Dev & Designing Intern", company: "Oasis Infobyte", type: "Internship", period: "Dec 2025 – Jan 2026" },
  { title: "Python Programming Intern", company: "Oasis Infobyte", type: "Internship", period: "Dec 2025 – Jan 2026" },
  { title: "AI Intern", company: "CodeAlpha", type: "Internship", period: "Dec 2025 – Jan 2026" },
  { title: "App Development Intern", company: "CodeAlpha", type: "Internship", period: "Dec 2025 – Jan 2026" },
  { title: "HR Intern", company: "Missile Man Scientific & Research Publications", type: "Internship", period: "Dec 2025 – Present" },
  { title: "Design Team Member", company: "Unnat Bharat Abhiyan (UBA)", type: "Full-time", period: "Jan 2026 – Present" },
  { title: "UBA Member / Volunteer", company: "Unnat Bharat Abhiyan (UBA)", type: "Hybrid", period: "Oct 2025 – Present" },
  { title: "Poster Team Member", company: "Youth United Council of India (YUCI)", type: "Freelance", period: "Dec 2025 – Jan 2026" },
  { title: "YUCI Member", company: "Youth United Council of India (YUCI)", type: "Full-time", period: "Oct 2025 – Jan 2026" },
];

const typeConfig: Record<string, { bg: string; dot: string; border: string; text: string; glow: string }> = {
  "Full-time": { bg: "bg-primary/10", dot: "bg-primary", border: "border-primary/30", text: "text-primary", glow: "shadow-[0_0_12px_hsl(var(--primary)/0.4)]" },
  "Internship": { bg: "bg-violet-500/10", dot: "bg-violet-400", border: "border-violet-400/30", text: "text-violet-400", glow: "shadow-[0_0_12px_hsl(260,60%,60%,0.4)]" },
  "Part-time": { bg: "bg-amber-500/10", dot: "bg-amber-400", border: "border-amber-400/30", text: "text-amber-400", glow: "shadow-[0_0_12px_hsl(38,92%,50%,0.4)]" },
  "Volunteer": { bg: "bg-emerald-500/10", dot: "bg-emerald-400", border: "border-emerald-400/30", text: "text-emerald-400", glow: "shadow-[0_0_12px_hsl(160,84%,39%,0.4)]" },
  "Freelance": { bg: "bg-rose-500/10", dot: "bg-rose-400", border: "border-rose-400/30", text: "text-rose-400", glow: "shadow-[0_0_12px_hsl(350,89%,60%,0.4)]" },
  "Hybrid": { bg: "bg-sky-500/10", dot: "bg-sky-400", border: "border-sky-400/30", text: "text-sky-400", glow: "shadow-[0_0_12px_hsl(199,89%,48%,0.4)]" },
};

const fallbackConfig = { bg: "bg-secondary", dot: "bg-muted-foreground", border: "border-border", text: "text-muted-foreground", glow: "" };

const allTypes = ["All", ...Array.from(new Set(experiences.map((e) => e.type)))];

const roleDescriptions: Record<string, string> = {
  "Campus Ambassador Coordinator": "Coordinating campus ambassador activities, managing outreach programs, and building partnerships across colleges for KM UniTech.",
  "Marketing Team Lead": "Leading marketing strategies, content campaigns, and brand positioning for KM UniTech across digital platforms.",
  "Design Intern": "Creating visual assets, social media graphics, and brand collateral for KM UniTech's digital presence.",
  "Volunteer": "Contributing to CodeSapiens community events, peer programming sessions, and collaborative coding initiatives.",
  "Campus Ambassador|HCL GUVI": "Promoting GUVI's tech courses and bootcamps, organizing campus workshops, and bridging student-industry connections.",
  "Campus Ambassador|Zyra Academy": "Representing Zyra Academy on campus, driving student enrollments and awareness for their tech education programs.",
  "Founder & Community Owner": "A WhatsApp community sharing info about upcoming Events and Hackathons — connecting students with opportunities.",
  "Event Coordinator & Social Media Manager": "Planning and executing tech events, managing social media presence, and growing IGNITERS' community engagement.",
  "Full-Stack Web Development Intern": "Built full-stack web applications, worked with modern frameworks, and delivered production-ready code at Prodigy InfoTech.",
  "Google Student Ambassador": "Official Google Student Ambassador — promoting Google technologies, organizing workshops, and mentoring peers.",
  "Web Dev & Designing Intern": "Developed responsive websites and designed UI/UX interfaces during internship at Oasis Infobyte.",
  "Python Programming Intern": "Developed Python-based solutions and automation scripts during internship at Oasis Infobyte.",
  "AI Intern": "Explored AI/ML models, built intelligent solutions, and contributed to AI research projects at CodeAlpha.",
  "App Development Intern": "Designed and developed mobile application prototypes and features during internship at CodeAlpha.",
  "HR Intern": "Managing recruitment workflows, coordinating with teams, and handling documentation at Missile Man Scientific Publications.",
  "Design Team Member": "Creating posters, event visuals, and promotional content for Unnat Bharat Abhiyan (UBA) initiatives.",
  "UBA Member / Volunteer": "Volunteering for rural development and community outreach programs under Unnat Bharat Abhiyan.",
  "Poster Team Member": "Designing event posters and marketing visuals for Youth United Council of India (YUCI) events.",
  "YUCI Member": "Active member contributing to YUCI's mission of youth empowerment and social development initiatives.",
};

const getDescription = (exp: Role): string => {
  return exp.description || roleDescriptions[`${exp.title}|${exp.company}`] || roleDescriptions[exp.title] || 
    `${exp.type} role at ${exp.company} — contributing to organizational goals and professional growth.`;
};

const TimelineCard = ({ exp, index, isLeft }: { exp: Role; index: number; isLeft: boolean }) => {
  const [hovered, setHovered] = useState(false);
  const config = typeConfig[exp.type] || fallbackConfig;
  const isPresent = exp.period.includes("Present");
  const description = getDescription(exp);

  return (
    <motion.div
      className={`relative flex ${isLeft ? "md:justify-end" : "md:justify-start"} md:w-[calc(50%-20px)] ${isLeft ? "md:ml-0" : "md:ml-auto"}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
    >
      {/* Connector line to center - desktop */}
      <motion.div
        className={`hidden md:block absolute top-6 ${isLeft ? "right-0 translate-x-[20px]" : "left-0 -translate-x-[20px]"} h-px bg-border`}
        initial={{ width: 0 }}
        whileInView={{ width: 20 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.3, delay: 0.2 }}
      />

      <motion.div
        layout
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative w-full ml-8 md:ml-0 group rounded-xl border bg-card/80 backdrop-blur-sm cursor-default transition-colors duration-300 hover:bg-card overflow-hidden ${config.border}`}
        animate={{
          scale: hovered ? 1.04 : 1,
          zIndex: hovered ? 20 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
      >
        {/* Glow backdrop on select */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-glow-secondary/5`}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10 p-5">
          {/* Type badge */}
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg} ${config.border} border mb-3`}>
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot} ${isPresent ? config.glow : ""}`} />
            <span className={`text-[10px] font-display font-bold tracking-wider uppercase ${config.text}`}>
              {exp.type}
            </span>
          </div>

          <h3 className={`font-display font-semibold text-[15px] leading-snug mb-1.5 transition-colors ${selected ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
            {exp.title}
          </h3>

          <div className="flex items-center gap-1.5 mb-1">
            <Building2 size={12} className="text-muted-foreground/60" />
            <span className="text-xs text-muted-foreground font-body">{exp.company}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-muted-foreground/40" />
            <span className="text-[11px] text-muted-foreground/60 font-body">{exp.period}</span>
            {isPresent && (
              <span className="relative flex h-1.5 w-1.5 ml-1">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.dot} opacity-75`} />
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${config.dot}`} />
              </span>
            )}
          </div>

          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-3 border-t border-border/50">
                  <p className="text-xs text-muted-foreground leading-relaxed font-body">
                    {description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(
    () => activeFilter === "All" ? experiences : experiences.filter((e) => e.type === activeFilter),
    [activeFilter]
  );

  return (
    <section id="experience" className="section-padding overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Sparkles size={16} className="text-primary" />
            <p className="text-primary font-display text-sm tracking-[0.3em] uppercase">Experience</p>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Where I've <span className="text-gradient">Contributed</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm mb-8 max-w-xl">
            {experiences.length} roles across tech, design, and community leadership — from Google to grassroots communities.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {allTypes.map((type) => {
            const config = typeConfig[type] || fallbackConfig;
            const count = type === "All" ? experiences.length : experiences.filter((e) => e.type === type).length;
            const isActive = activeFilter === type;

            return (
              <motion.button
                key={type}
                onClick={() => setActiveFilter(type)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-semibold transition-all duration-300 border ${
                  isActive
                    ? type === "All"
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                      : `${config.bg} ${config.text} ${config.border} ${config.glow}`
                    : "bg-card text-muted-foreground border-border hover:border-muted-foreground/30"
                }`}
              >
                {type !== "All" && (
                  <span className={`w-2 h-2 rounded-full ${isActive ? config.dot : "bg-muted-foreground/40"}`} />
                )}
                {type}
                <span className="opacity-50 text-[10px]">{count}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-[15px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px">
            <div className="w-full h-full bg-gradient-to-b from-primary/40 via-border to-border" />
          </div>

          {/* Timeline start dot */}
          <div className="absolute left-[9px] md:left-1/2 md:-translate-x-[6px] -top-1 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.5)]" />

          <div className="space-y-5 relative">
            <AnimatePresence mode="popLayout">
              {filtered.map((exp, i) => (
                <div key={`${exp.title}-${exp.company}`} className="relative">
                  {/* Timeline dot - mobile */}
                  <div className="md:hidden absolute left-[9px] top-6 z-10">
                    <div className={`w-3 h-3 rounded-full border-2 border-background ${(typeConfig[exp.type] || fallbackConfig).dot}`} />
                  </div>
                  {/* Timeline dot - desktop */}
                  <div className="hidden md:block absolute left-1/2 -translate-x-[6px] top-6 z-10">
                    <div className={`w-3 h-3 rounded-full border-2 border-background ${(typeConfig[exp.type] || fallbackConfig).dot} transition-all`} />
                  </div>
                  <TimelineCard exp={exp} index={i} isLeft={i % 2 === 0} />
                </div>
              ))}
            </AnimatePresence>
          </div>

          {/* Timeline end dot */}
          <div className="absolute left-[9px] md:left-1/2 md:-translate-x-[6px] -bottom-1 w-3 h-3 rounded-full bg-border" />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
