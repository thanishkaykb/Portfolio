import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, ExternalLink } from "lucide-react";

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

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">Experience</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">
            Where I've <span className="text-gradient">Contributed</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border md:left-1/2 md:-translate-x-px" />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.title}-${exp.company}-${i}`}
                className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:gap-12`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(i * 0.05, 1) }}
              >
                {/* Dot */}
                <div className="absolute left-0 top-2 w-6 h-6 rounded-full border-2 border-primary bg-background z-10 md:left-1/2 md:-translate-x-1/2" />

                <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:text-right" : ""} glow-border rounded-lg p-5 bg-card`}>
                  <span className="text-xs text-primary font-display tracking-wider uppercase">{exp.type}</span>
                  <h3 className="font-display font-semibold text-foreground mt-1">{exp.title}</h3>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="text-xs text-muted-foreground mt-1">{exp.period}</p>
                  {exp.description && <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
