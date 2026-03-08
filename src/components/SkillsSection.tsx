import { motion, useInView, AnimatePresence } from "framer-motion";
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
  {
    category: "Languages",
    emoji: "🌐",
    skills: ["English", "Tamil", "Hindi", "Telugu"],
  },
];

const SkillPill = ({ skill, delay }: { skill: string; delay: number }) => {
  const [tapped, setTapped] = useState(false);

  return (
    <motion.span
      onClick={() => setTapped((p) => !p)}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.12, y: -3 }}
      whileTap={{ scale: 0.95 }}
      animate={tapped ? { scale: 1.1, y: -2 } : {}}
      className={`inline-block text-xs px-3.5 py-2 rounded-lg font-display cursor-pointer select-none transition-all duration-300 ${
        tapped
          ? "bg-primary/20 text-primary border border-primary/40 shadow-[0_0_20px_hsl(var(--primary)/0.2)]"
          : "bg-secondary text-secondary-foreground border border-transparent hover:bg-primary/15 hover:text-primary hover:border-primary/30 hover:shadow-[0_0_15px_hsl(var(--primary)/0.15)]"
      }`}
    >
      {skill}
    </motion.span>
  );
};

const SkillCard = ({ group, gi, inView }: { group: typeof skillGroups[0]; gi: number; inView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-xl bg-card overflow-hidden cursor-default"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ scale: 1.03, zIndex: 20 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8, delay: gi * 0.08 }}
      style={{ transformOrigin: "center center" }}
    >
      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? "inset 0 0 0 1px hsl(var(--primary) / 0.4), 0 8px 40px hsl(var(--primary) / 0.12), 0 0 0 1px hsl(var(--primary) / 0.15)"
            : "inset 0 0 0 1px hsl(var(--border) / 1), 0 0 20px hsl(var(--primary) / 0.04)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-glow-secondary/5 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />

      <div className="relative z-10 p-6">
        <div className="flex items-center gap-2.5 mb-4">
          <motion.span
            className="text-lg"
            animate={isHovered ? { scale: 1.2, rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            {group.emoji}
          </motion.span>
          <h3 className={`font-display font-semibold transition-colors duration-300 ${isHovered ? "text-primary" : "text-foreground"}`}>
            {group.category}
          </h3>
          <motion.span
            className="ml-auto text-[10px] font-display font-bold tracking-widest uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
            transition={{ duration: 0.25 }}
          >
            {group.skills.length} skills
          </motion.span>
        </div>
        <div className="flex flex-wrap gap-2">
          {group.skills.map((skill, si) => (
            <SkillPill key={skill} skill={skill} delay={gi * 0.04 + si * 0.015} />
          ))}
        </div>
      </div>
    </motion.div>
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
            <SkillCard key={group.category} group={group} gi={gi} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
