import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const skillGroups = [
  {
    category: "Development",
    emoji: "💻",
    skills: ["C", "Python", "HTML/CSS", "JavaScript", "TypeScript", "React", "Node.js", "Express", "MySQL", "Full Stack Development", "Web Development"],
  },
  {
    category: "Tools & Platforms",
    emoji: "🛠️",
    skills: ["Microsoft Office", "Canva", "Git & GitHub", "VS Code", "Figma"],
  },
  {
    category: "AI & Data",
    emoji: "🤖",
    skills: ["Artificial Intelligence", "Machine Learning", "Data Analytics", "GenAI", "Data Visualization", "SQL", "Data Preprocessing"],
  },
  {
    category: "Design",
    emoji: "🎨",
    skills: ["Graphic Design", "UI/UX Basics", "Digital Editing", "Drawing & Painting"],
  },
  {
    category: "Soft Skills",
    emoji: "🧠",
    skills: ["Team Management", "Problem Solving", "Verbal Communication", "Leadership", "Time Management", "Multitasking"],
  },
];

const SkillPill = ({ skill, delay }: { skill: string; delay: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.08, y: -2 }}
      className={`inline-block text-xs px-3.5 py-2 rounded-lg font-display cursor-default transition-all duration-300 ${
        hovered
          ? "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_15px_hsl(var(--primary)/0.15)]"
          : "bg-secondary text-secondary-foreground border border-transparent"
      }`}
    >
      {skill}
    </motion.span>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">Skills</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">
            My <span className="text-gradient">Toolkit</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              className="glow-border rounded-xl p-6 bg-card card-lift group"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-lg">{group.emoji}</span>
                <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">{group.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <SkillPill key={skill} skill={skill} delay={gi * 0.05 + si * 0.02} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
