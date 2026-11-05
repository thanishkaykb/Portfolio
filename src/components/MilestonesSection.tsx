import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { milestones } from "@/data/content";

const MilestonesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="milestones" className="section-padding" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="editorial-label mb-4">05 · Achievements &amp; Certifications</p>
          <h2 className="font-display text-5xl md:text-7xl mb-14">
            MILESTONES<span className="text-primary">.</span>
          </h2>
        </motion.div>

        <div>
          {milestones.map((m, i) => (
            <motion.div
              key={m.label + m.detail}
              className="hairline py-5 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 group"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="font-display text-xl text-primary w-36 shrink-0 group-hover:tracking-wide transition-all">
                {m.label}
              </span>
              <span className="font-body text-sm text-foreground/85">{m.detail}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MilestonesSection;
