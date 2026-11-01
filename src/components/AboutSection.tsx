import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Download } from "lucide-react";
import { RESUME_PATH, toolkit } from "@/data/content";

const details = [
  { label: "Degree", value: "B.E. Computer Science and Engineering" },
  { label: "College", value: "Sri Sairam Engineering College, Chennai" },
  { label: "Expected graduation", value: "2029" },
  { label: "CGPA", value: "8.60" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="editorial-label mb-4">01 — About</p>
          <h2 className="font-display text-5xl md:text-7xl mb-14">
            A LITTLE <span className="text-primary">ABOUT ME.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 md:gap-16">
          <motion.div
            className="md:col-span-3 space-y-8"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
              I'm a Computer Science Engineering undergraduate at Sri Sairam Engineering College, Chennai,
              with a strong interest in full-stack and web development. I enjoy turning ideas into functional,
              thoughtfully designed digital products, experimenting with technologies, and building solutions
              with a purpose.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
              {details.map((d, i) => (
                <motion.div
                  key={d.label}
                  className="hairline py-3 flex items-baseline justify-between gap-4"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                >
                  <span className="editorial-label shrink-0">{d.label}</span>
                  <span className="font-body text-sm text-foreground text-right">{d.value}</span>
                </motion.div>
              ))}
            </div>

            <a
              href={RESUME_PATH}
              download="Thanishka_Yogesh_Resume.pdf"
              className="inline-flex items-center gap-2 px-7 py-3 border border-primary/40 text-primary font-body font-semibold text-sm uppercase tracking-[0.15em] hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Download size={15} />
              Download Resume
            </a>
          </motion.div>

          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <p className="editorial-label mb-2">Technical Toolkit</p>
            <p className="font-hand text-accent text-lg mb-6 -rotate-1 inline-block">the tools I reach for —</p>
            <div>
              {toolkit.map((t) => (
                <div key={t.category} className="hairline py-4">
                  <p className="font-body text-[11px] uppercase tracking-[0.3em] text-primary mb-2">{t.category}</p>
                  <p className="font-body text-sm text-foreground/85 leading-relaxed">{t.items.join("  /  ")}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
