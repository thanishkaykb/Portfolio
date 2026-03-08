import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";

const education = [
  {
    school: "Sri Sairam Engineering College",
    degree: "Bachelor of Engineering — Computer Science",
    period: "2025 – Expected 2029",
    details: [
      "First Semester: 8.50 CGPA",
      "IEEE Computer Society & Reliability Society Member",
      "YUCI & UBA Volunteer",
      "Designer at YUCI, IEEE CS & Reliability Society",
      "Coursework: AI, Python, AWS, UI/UX, CATIA, GenAI, and more",
    ],
  },
  {
    school: "Alwin Memorial Public School",
    degree: "High School — Computer Science with Math",
    period: "Graduated March 2024",
    details: ["10th: 71%", "12th: 74.8%", "School Bus Management System — Team Lead (Capstone Project)"],
  },
  {
    school: "The Lords' International School",
    degree: "Middle School Graduation",
    period: "June 2021",
    details: ["Final Grade: A"],
  },
];

const EducationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">Education</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">
            Academic <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              className="glow-border rounded-lg p-6 bg-card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <GraduationCap size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">{edu.school}</h3>
                  <p className="text-sm text-primary">{edu.degree}</p>
                  <p className="text-xs text-muted-foreground mb-3">{edu.period}</p>
                  <ul className="space-y-1">
                    {edu.details.map((d) => (
                      <li key={d} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
