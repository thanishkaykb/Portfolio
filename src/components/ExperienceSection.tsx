import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Briefcase, Building2, Calendar, ChevronDown, Sparkles } from "lucide-react";

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

const typeColors: Record<string, string> = {
  "Full-time": "bg-primary/15 text-primary border-primary/30",
  "Internship": "bg-glow-secondary/15 text-glow-secondary border-glow-secondary/30",
  "Part-time": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "Volunteer": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Freelance": "bg-rose-500/15 text-rose-400 border-rose-500/30",
  "Hybrid": "bg-sky-500/15 text-sky-400 border-sky-500/30",
};

const allTypes = ["All", ...Array.from(new Set(experiences.map((e) => e.type)))];

const ExperienceCard = ({ exp, index }: { exp: Role; index: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-xl border border-border bg-card p-5 cursor-default transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_hsl(var(--primary)/0.08)] overflow-hidden"
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-glow-secondary/5 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <motion.div
              className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
              animate={{ rotate: hovered ? 5 : 0, scale: hovered ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Briefcase size={16} className="text-primary" />
            </motion.div>
            <div>
              <h3 className="font-display font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">
                {exp.title}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Building2 size={11} className="text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{exp.company}</p>
              </div>
            </div>
          </div>
          <span className={`text-[10px] font-display font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border shrink-0 ${typeColors[exp.type] || "bg-secondary text-secondary-foreground border-border"}`}>
            {exp.type}
          </span>
        </div>

        <div className="flex items-center gap-1.5 ml-[46px]">
          <Calendar size={11} className="text-muted-foreground/70" />
          <span className="text-[11px] text-muted-foreground/70 font-body">{exp.period}</span>
          {exp.period.includes("Present") && (
            <span className="relative flex h-2 w-2 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          )}
        </div>

        <AnimatePresence>
          {exp.description && hovered && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs text-muted-foreground mt-3 ml-[46px] leading-relaxed font-body"
            >
              {exp.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(
    () => activeFilter === "All" ? experiences : experiences.filter((e) => e.type === activeFilter),
    [activeFilter]
  );

  const displayed = showAll ? filtered : filtered.slice(0, 9);
  const hasMore = filtered.length > 9;

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
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

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {allTypes.map((type) => {
            const count = type === "All" ? experiences.length : experiences.filter((e) => e.type === type).length;
            return (
              <button
                key={type}
                onClick={() => { setActiveFilter(type); setShowAll(false); }}
                className={`relative px-4 py-2 rounded-full text-xs font-display font-medium transition-all duration-300 ${
                  activeFilter === type
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                {type}
                <span className="ml-1.5 opacity-60">{count}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Cards grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {displayed.map((exp, i) => (
              <ExperienceCard key={`${exp.title}-${exp.company}`} exp={exp} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show more */}
        {hasMore && !showAll && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-muted-foreground hover:text-foreground font-display text-sm transition-all hover:bg-secondary/80 hover:shadow-[0_0_15px_hsl(var(--primary)/0.1)]"
            >
              Show all {filtered.length} roles
              <ChevronDown size={14} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
