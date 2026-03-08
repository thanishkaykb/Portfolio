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

const TimelineCard = ({ exp, index, isLeft }: { exp: Role; index: number; isLeft: boolean }) => {
  const [expanded, setExpanded] = useState(false);
  const config = typeConfig[exp.type] || fallbackConfig;
  const isPresent = exp.period.includes("Present");

  return (
    <motion.div
      className={`relative flex ${isLeft ? "md:justify-end" : "md:justify-start"} md:w-[calc(50%-20px)] ${isLeft ? "md:ml-0" : "md:ml-auto"}`}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.03 }}
    >
      {/* Connector line to center - desktop */}
      <div className={`hidden md:block absolute top-6 ${isLeft ? "right-0 translate-x-[20px]" : "left-0 -translate-x-[20px]"} w-[20px] h-px bg-border`} />

      <motion.div
        onClick={() => exp.description && setExpanded(!expanded)}
        className={`relative w-full ml-8 md:ml-0 group rounded-xl border ${config.border} bg-card/80 backdrop-blur-sm p-5 transition-all duration-300 hover:bg-card ${exp.description ? "cursor-pointer" : "cursor-default"}`}
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
      >
        {/* Type badge */}
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg} ${config.border} border mb-3`}>
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot} ${isPresent ? config.glow : ""}`} />
          <span className={`text-[10px] font-display font-bold tracking-wider uppercase ${config.text}`}>
            {exp.type}
          </span>
        </div>

        <h3 className="font-display font-semibold text-foreground text-[15px] leading-snug group-hover:text-primary transition-colors mb-1.5">
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
          {exp.description && expanded && (
            <motion.p
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="text-xs text-muted-foreground leading-relaxed font-body overflow-hidden"
            >
              {exp.description}
            </motion.p>
          )}
        </AnimatePresence>
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
