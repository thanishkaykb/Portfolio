import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    category: "Development",
    skills: ["C", "Python", "HTML/CSS", "JavaScript", "TypeScript", "React", "Node.js", "Express", "MySQL", "Full Stack Development", "Web Development"],
  },
  {
    category: "Tools & Platforms",
    skills: ["Microsoft Office", "Canva", "Git & GitHub", "VS Code", "Figma"],
  },
  {
    category: "AI & Data",
    skills: ["Artificial Intelligence", "Machine Learning", "Data Analytics", "GenAI", "Data Visualization", "SQL", "Data Preprocessing"],
  },
  {
    category: "Design",
    skills: ["Graphic Design", "UI/UX Basics", "Digital Editing", "Drawing & Painting"],
  },
  {
    category: "Soft Skills",
    skills: ["Team Management", "Problem Solving", "Verbal Communication", "Leadership", "Time Management", "Multitasking"],
  },
];

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
              className="glow-border rounded-lg p-6 bg-card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
            >
              <h3 className="font-display font-semibold text-foreground mb-4">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground font-display"
                  >
                    {skill}
                  </span>
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
