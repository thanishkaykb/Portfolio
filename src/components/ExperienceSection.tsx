import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { experience, leadership } from "@/data/content";

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="editorial-label mb-4">03 — Experience</p>
          <h2 className="font-display text-5xl md:text-7xl mb-14">
            WHERE I'VE <span className="text-primary">CONTRIBUTED.</span>
          </h2>
        </motion.div>

        {/* Compact vertical timeline */}
        <div className="relative pl-6 md:pl-10">
          <div className="absolute left-[3px] md:left-[7px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />

          {experience.map((item, i) => (
            <motion.div
              key={item.role}
              className="relative pb-10 last:pb-0"
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="absolute -left-6 md:-left-10 top-1.5 w-[7px] h-[7px] rounded-full bg-primary" aria-hidden="true" />
              <h3 className="font-display text-2xl md:text-3xl text-foreground">{item.role}</h3>
              <p className="font-accent italic text-primary text-base mb-2">{item.org}</p>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Student leadership — compact editorial lines */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="editorial-label mb-4">Student Leadership</p>
          <div>
            {leadership.map((l) => (
              <p key={l} className="hairline py-3 font-body text-sm text-foreground/85 flex items-baseline gap-3">
                <span className="text-primary">→</span>
                {l}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
